import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { montagePhotos } from '../data/memories';

export function PhotoMontage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEnding, setShowEnding] = useState(false);
  const [endingStep, setEndingStep] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.5 }); // Start when 50% visible

  useEffect(() => {
    if (!isInView || showEnding || montagePhotos.length === 0) return;

    const timer = setInterval(() => {
      if (currentIndex < montagePhotos.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setShowEnding(true);
      }
    }, 4000); // 4 seconds per photo for a cinematic feel

    return () => clearInterval(timer);
  }, [isInView, currentIndex, showEnding]);

  // Handle the final message sequence
  useEffect(() => {
    if (showEnding) {
      const t1 = setTimeout(() => setEndingStep(1), 1000);
      const t2 = setTimeout(() => setEndingStep(2), 3500);
      const t3 = setTimeout(() => setEndingStep(3), 6000);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [showEnding]);

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center justify-center bg-black py-32 px-6">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
      
      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl font-light tracking-wider text-white sm:text-5xl">
            MEMORIES IN MOTION
          </h2>
          <div className="mt-8 font-sans text-sm tracking-[0.2em] text-white/50 leading-loose">
            <p>Some memories</p>
            <p>don't need a video.</p>
            <br />
            <p>They just need</p>
            <p>to be remembered.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative aspect-[4/5] w-full max-w-2xl mx-auto overflow-hidden rounded-sm border border-white/10 bg-[#050505] shadow-2xl md:aspect-video"
        >
          {montagePhotos.length === 0 ? (
            <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
              <p className="font-serif text-2xl italic text-white/40">
                Your memories will appear here.
              </p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {!showEnding ? (
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    opacity: { duration: 1.5, ease: "easeInOut" },
                    scale: { duration: 6, ease: "easeOut" } 
                  }}
                  className="absolute inset-0 h-full w-full"
                >
                  <img
                    src={montagePhotos[currentIndex].src}
                    alt="Montage memory"
                    className="h-full w-full object-cover mix-blend-luminosity opacity-80"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxMTEiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM3NzciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5NZW1vcnk8L3RleHQ+PC9zdmc+';
                    }}
                  />
                  {/* Dark overlay for cinematic effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                  
                  {/* Caption */}
                  {montagePhotos[currentIndex].caption && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 1 }}
                      className="absolute bottom-12 left-0 right-0 px-8 text-center"
                    >
                      <p className="font-serif text-xl md:text-3xl italic text-white/90 text-shadow-md">
                        {montagePhotos[currentIndex].caption}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="ending"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-[#020202] px-6 text-center"
                >
                  {endingStep >= 1 && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.5 }}
                      className="mb-8 font-serif text-2xl md:text-4xl text-white/80"
                    >
                      Every picture has a story.
                    </motion.p>
                  )}
                  {endingStep >= 2 && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.5 }}
                      className="mb-12 font-serif text-2xl md:text-4xl italic text-[#D4AF37]"
                    >
                      And somehow,
                      <br />
                      you've been part of all of mine.
                    </motion.p>
                  )}
                  {endingStep >= 3 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1 }}
                      className="text-4xl text-red-500"
                    >
                      ❤️
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </section>
  );
}
