import { motion } from 'framer-motion';
import { siteConfig } from '../data/config';
import { useState, useEffect } from 'react';

interface HeroProps {
  onEnter: () => void;
  hasEntered: boolean;
}

export function Hero({ onEnter, hasEntered }: HeroProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (hasEntered) return;
    
    // Sequence the text reveals
    const timer1 = setTimeout(() => setStep(1), 1500);
    const timer2 = setTimeout(() => setStep(2), 3500);
    const timer3 = setTimeout(() => setStep(3), 6000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [hasEntered]);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-6">
      {/* Subtle Noise overlay */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{ backgroundImage: 'url("/noise.png")', backgroundRepeat: 'repeat' }}
      />
      
      {/* Dynamic gradients in background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] left-[10%] h-[50vh] w-[50vh] rounded-full bg-white/5 blur-[100px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.05, 0.1, 0.05] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[20%] right-[10%] h-[60vh] w-[60vh] rounded-full bg-[#D4AF37]/10 blur-[120px]"
        />
      </div>

      <div className="z-10 flex flex-col items-center justify-center text-center">
        {!hasEntered ? (
          <div className="flex h-64 flex-col items-center justify-center">
            {step === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute text-center"
              >
                <h1 className="font-serif text-3xl font-light tracking-widest text-[#FDFBF7]/90 sm:text-5xl md:text-7xl">
                  THIS ISN'T
                  <br />
                  <span className="mt-4 block italic text-white/50">JUST A</span>
                  <br />
                  BIRTHDAY.
                </h1>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute text-center"
              >
                <h1 className="font-serif text-4xl font-light tracking-widest text-[#FDFBF7] sm:text-6xl md:text-8xl">
                  IT'S
                  <br />
                  <span className="mt-4 block text-[#D4AF37]">HER STORY.</span>
                </h1>
              </motion.div>
            )}

            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute flex flex-col items-center text-center"
              >
                <h1 className="mb-6 font-serif text-6xl font-normal tracking-wider text-[#FDFBF7] text-shadow-lg sm:text-8xl md:text-9xl">
                  {siteConfig.name.toUpperCase()}
                </h1>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="mb-16 max-w-sm font-sans text-sm tracking-[0.2em] text-white/60 sm:text-base"
                >
                  {siteConfig.tagline}
                </motion.p>

                {step >= 3 && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    onClick={onEnter}
                    className="group relative overflow-hidden rounded-full border border-white/20 bg-white/5 px-8 py-4 font-sans text-xs tracking-[0.3em] text-white transition-all hover:bg-white/10 hover:border-white/40"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      ENTER HER WORLD
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
