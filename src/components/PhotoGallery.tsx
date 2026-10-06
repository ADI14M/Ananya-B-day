import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  { id: 1, src: "/images/childhood/baby.jpg", category: "CHILDHOOD", year: "1999" },
  { id: 2, src: "/images/memories/teen.jpg", category: "CHAOS", year: "2015" },
  { id: 3, src: "/images/hero/portrait.jpg", category: "TODAY", year: "2026" },
  { id: 4, src: "/images/family/parents.jpg", category: "FAMILY", year: "2020" },
  { id: 5, src: "/images/family/adi.jpg", category: "SIBLINGS", year: "2022" },
  { id: 6, src: "/images/memories/adventure.jpg", category: "TRIPS", year: "2024" },
];

export function PhotoGallery() {
  const [selectedImg, setSelectedImg] = useState<number | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImg !== null) {
      setSelectedImg(selectedImg === images.length - 1 ? 0 : selectedImg + 1);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImg !== null) {
      setSelectedImg(selectedImg === 0 ? images.length - 1 : selectedImg - 1);
    }
  };

  return (
    <section id="memories" className="relative bg-[#0a0a0a] py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24 text-center"
        >
          <h2 className="font-sans text-xs tracking-[0.4em] text-[#D4AF37]">THE ARCHIVE</h2>
          <h3 className="mt-4 font-serif text-3xl font-light tracking-wider text-white sm:text-5xl">
            EVIDENCE OF A LIFE LIVED
          </h3>
        </motion.div>

        {/* Masonry-style Grid */}
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>div:not(:first-child)]:mt-6">
          {images.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative cursor-pointer overflow-hidden bg-white/5 break-inside-avoid"
              onClick={() => setSelectedImg(index)}
            >
              <img 
                src={img.src} 
                alt={img.category} 
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjQwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzIyMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzQ0NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlBob3RvPC90ZXh0Pjwvc3ZnPg==';
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100 backdrop-blur-sm">
                <span className="font-sans text-xs tracking-[0.3em] text-[#D4AF37]">{img.category}</span>
                <span className="mt-2 font-serif text-lg text-white">{img.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={() => setSelectedImg(null)}
          >
            <button 
              className="absolute right-6 top-6 z-50 text-white/50 hover:text-white"
              onClick={() => setSelectedImg(null)}
            >
              <X size={32} />
            </button>

            <button 
              className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-4 text-white/50 hover:text-white"
              onClick={handlePrev}
            >
              <ChevronLeft size={48} strokeWidth={1} />
            </button>

            <button 
              className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-4 text-white/50 hover:text-white"
              onClick={handleNext}
            >
              <ChevronRight size={48} strokeWidth={1} />
            </button>

            <motion.div 
              key={selectedImg}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[80vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={images[selectedImg].src} 
                alt="Enlarged view" 
                className="max-h-[80vh] object-contain shadow-2xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNDQ0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UGhvdG88L3RleHQ+PC9zdmc+';
                }}
              />
              <div className="absolute -bottom-16 left-0 right-0 text-center">
                <span className="font-sans text-xs tracking-[0.3em] text-[#D4AF37]">{images[selectedImg].category}</span>
                <span className="mx-3 text-white/30">•</span>
                <span className="font-serif text-sm text-white/80">{images[selectedImg].year}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
