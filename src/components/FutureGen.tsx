import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { siteConfig } from '../data/config';

export function FutureGen() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [activePrediction, setActivePrediction] = useState(0);

  const revealFuture = () => {
    setIsRevealed(true);
    let current = 0;
    
    // Cycle through predictions slowly
    const interval = setInterval(() => {
      current++;
      if (current >= siteConfig.predictions.length) {
        clearInterval(interval);
      } else {
        setActivePrediction(current);
      }
    }, 4000);
  };

  return (
    <section id="future" className="relative flex min-h-[80vh] flex-col items-center justify-center bg-[#030303] py-32 px-6">
      <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
        <div className="absolute top-1/2 left-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
        <div className="absolute top-1/2 left-1/2 h-[40vh] w-[40vh] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="font-sans text-xs tracking-[0.4em] text-[#D4AF37]">THE ORACLE</h2>
          <h3 className="mt-4 font-serif text-3xl font-light tracking-wider text-white sm:text-5xl">
            WHAT DOES THE FUTURE HOLD?
          </h3>
          <p className="mt-6 font-sans text-sm tracking-widest text-white/40">
            We asked the highly questionable Birthday Prediction Machine.
          </p>
        </motion.div>

        <div className="mt-20 h-64">
          <AnimatePresence mode="wait">
            {!isRevealed ? (
              <motion.div
                key="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                className="flex h-full items-center justify-center"
              >
                <button
                  onClick={revealFuture}
                  className="group relative overflow-hidden rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 px-8 py-4 font-sans text-xs tracking-[0.3em] text-[#D4AF37] transition-all hover:bg-[#D4AF37]/20"
                >
                  REVEAL HER FUTURE
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={activePrediction}
                initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                transition={{ duration: 1 }}
                className="flex h-full flex-col items-center justify-center"
              >
                <span className="mb-6 font-sans text-xl tracking-[0.3em] text-[#D4AF37]">
                  {siteConfig.predictions[activePrediction].year}
                </span>
                <p className="font-serif text-2xl text-white md:text-4xl leading-relaxed">
                  {siteConfig.predictions[activePrediction].text}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
