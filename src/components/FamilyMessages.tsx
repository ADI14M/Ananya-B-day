import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';
import { siteConfig } from '../data/config';

export function FamilyMessages() {
  const [selectedPerson, setSelectedPerson] = useState<typeof siteConfig.people[0] | null>(null);

  return (
    <section id="people" className="relative bg-[#020202] py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24 text-center"
        >
          <h2 className="font-sans text-xs tracking-[0.4em] text-[#D4AF37]">THE TRIBE</h2>
          <h3 className="mt-4 font-serif text-3xl font-light tracking-wider text-white sm:text-5xl">
            THE PEOPLE WHO LOVE HER
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.people.map((person, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer overflow-hidden bg-white/5 border border-white/10"
              onClick={() => setSelectedPerson(person)}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={person.image} 
                  alt={person.name}
                  className="h-full w-full object-cover opacity-70 mix-blend-luminosity transition-all duration-700 group-hover:scale-105 group-hover:mix-blend-normal group-hover:opacity-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMzMzMiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM3NzciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5QZXJzb248L3RleHQ+PC9zdmc+';
                  }}
                />
              </div>
              <div className="p-6 text-center">
                <h4 className="font-serif text-xl text-white">{person.name}</h4>
                <p className="mt-2 font-sans text-xs tracking-[0.2em] text-[#D4AF37] uppercase">{person.relationship}</p>
                <p className="mt-4 text-xs text-white/40 tracking-wider">TAP TO READ MESSAGE</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal for message */}
      <AnimatePresence>
        {selectedPerson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedPerson(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg overflow-hidden bg-[#111] border border-white/20 p-8 shadow-2xl md:p-12"
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="absolute right-6 top-6 text-white/50 hover:text-white transition-colors"
                onClick={() => setSelectedPerson(null)}
              >
                <X size={24} />
              </button>
              
              <div className="mb-8 border-b border-white/10 pb-6 text-center">
                <p className="font-sans text-xs tracking-[0.2em] text-[#D4AF37] mb-2">A MESSAGE FROM</p>
                <h4 className="font-serif text-2xl text-white">{selectedPerson.name}</h4>
              </div>
              
              <div className="relative">
                <span className="absolute -left-4 -top-6 font-serif text-6xl text-white/10">"</span>
                <p className="relative z-10 font-serif text-lg leading-relaxed text-white/90 whitespace-pre-wrap italic">
                  {selectedPerson.message}
                </p>
                <span className="absolute -right-4 -bottom-10 font-serif text-6xl text-white/10">"</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
