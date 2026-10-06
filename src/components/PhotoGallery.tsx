import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { memories } from '../data/memories';

export function PhotoGallery() {
  const [selectedImg, setSelectedImg] = useState<number | null>(null);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  // Only show images that haven't failed to load
  const validMemories = memories.map((m, index) => ({ ...m, originalIndex: index })).filter(m => !failedImages.has(m.originalIndex));

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImg !== null) {
      const currentIndex = validMemories.findIndex(m => m.originalIndex === selectedImg);
      const nextIndex = currentIndex === validMemories.length - 1 ? 0 : currentIndex + 1;
      setSelectedImg(validMemories[nextIndex].originalIndex);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImg !== null) {
      const currentIndex = validMemories.findIndex(m => m.originalIndex === selectedImg);
      const prevIndex = currentIndex === 0 ? validMemories.length - 1 : currentIndex - 1;
      setSelectedImg(validMemories[prevIndex].originalIndex);
    }
  };

  const selectedMemory = selectedImg !== null ? memories[selectedImg] : null;

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

        {/* Masonry-style Grid - Naturally prevents cropping because height is auto */}
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>div:not(:first-child)]:mt-6">
          {memories.map((memory, index) => {
            if (failedImages.has(index)) return null;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative cursor-pointer overflow-hidden bg-[#111] break-inside-avoid rounded-sm shadow-xl"
                onClick={() => setSelectedImg(index)}
              >
                <img 
                  src={memory.image} 
                  alt={memory.caption || `Memory from ${memory.year}`} 
                  className="w-full h-auto block opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                  onError={() => {
                    setFailedImages(prev => {
                      const newSet = new Set(prev);
                      newSet.add(index);
                      return newSet;
                    });
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {validMemories.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-serif text-xl italic text-white/30">Your memories will appear here.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedMemory !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl"
            onClick={() => setSelectedImg(null)}
          >
            <button 
              className="absolute right-6 top-6 z-50 text-white/50 hover:text-white p-4"
              onClick={() => setSelectedImg(null)}
            >
              <X size={32} />
            </button>

            {validMemories.length > 1 && (
              <>
                <button 
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-4 text-white/50 hover:text-white"
                  onClick={handlePrev}
                >
                  <ChevronLeft size={48} strokeWidth={1} />
                </button>

                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-4 text-white/50 hover:text-white"
                  onClick={handleNext}
                >
                  <ChevronRight size={48} strokeWidth={1} />
                </button>
              </>
            )}

            <motion.div 
              key={selectedImg}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative flex flex-col items-center max-h-[90vh] max-w-[90vw] md:max-w-[80vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedMemory.image} 
                alt={selectedMemory.caption} 
                className="max-w-full max-h-[75vh] object-contain shadow-2xl rounded-sm"
              />
              <div className="mt-8 text-center px-4 w-full max-w-2xl">
                <span className="font-sans text-xs tracking-[0.3em] text-[#D4AF37] block mb-3">{selectedMemory.year}</span>
                <span className="font-serif text-lg md:text-2xl text-white/90 leading-relaxed block">{selectedMemory.caption}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
