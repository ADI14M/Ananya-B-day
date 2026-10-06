import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { siteConfig } from '../data/config';

export function BirthdayReveal() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [step, setStep] = useState(0);

  const handleReveal = () => {
    setIsRevealed(true);
    
    // Smoothly scroll the container perfectly into view
    setTimeout(() => {
      document.getElementById('surprise')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    
    // Sequence the big reveal
    setTimeout(() => setStep(1), 2000); // Light expands
    setTimeout(() => setStep(2), 4000); // HAPPY
    setTimeout(() => setStep(3), 5500); // BIRTHDAY
    setTimeout(() => setStep(4), 7000); // NAME
  };

  return (
    <section id="surprise" className="relative flex min-h-screen flex-col items-center justify-center bg-black">
      {!isRevealed ? (
        <div className="flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-serif text-3xl text-white/80 md:text-5xl">WAIT.</h2>
            <h3 className="mt-8 font-serif text-xl italic text-white/50 md:text-3xl">THERE'S ONE LAST THING.</h3>
            <p className="mt-16 font-sans text-xs tracking-[0.4em] text-[#D4AF37]">READY?</p>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReveal}
            className="rounded-full border border-white/20 bg-white/5 px-12 py-4 font-sans text-sm tracking-[0.3em] text-white transition-colors hover:bg-white/10 hover:text-[#D4AF37]"
          >
            YES.
          </motion.button>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div 
            key="reveal"
            className="absolute inset-0 z-40 flex items-center justify-center bg-black overflow-hidden"
          >
            {/* Confetti particles - simplified for performance */}
            {step >= 2 && (
              <Confetti />
            )}

            {/* Expanding Light */}
            {step === 1 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 100, opacity: 1 }}
                transition={{ duration: 2, ease: "easeIn" }}
                className="absolute h-4 w-4 rounded-full bg-white blur-md"
              />
            )}

            <div className="relative z-10 flex flex-col items-center justify-center text-center mix-blend-difference">
              {step >= 2 && (
                <motion.h1 
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="font-serif text-6xl font-black text-white sm:text-8xl md:text-9xl lg:text-[12rem]"
                >
                  HAPPY
                </motion.h1>
              )}
              {step >= 3 && (
                <motion.h1 
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="font-serif text-6xl font-black text-white sm:text-8xl md:text-9xl lg:text-[12rem]"
                >
                  BIRTHDAY
                </motion.h1>
              )}
              {step >= 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="mt-8 flex flex-col items-center"
                >
                  <h2 className="font-serif text-5xl italic text-[#D4AF37] sm:text-7xl md:text-8xl">
                    {siteConfig.name}
                  </h2>
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="mt-8 text-4xl text-red-500"
                  >
                    ❤️
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
}

function Confetti() {
  const particles = useMemo(() => {
    return [...Array(50)].map(() => ({
      left: `${Math.random() * 100}%`,
      scale: Math.random() * 1.5 + 0.5,
      rotateEnd: 360 * (Math.random() > 0.5 ? 1 : -1),
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      color: ['#D4AF37', '#FDFBF7', '#888'][Math.floor(Math.random() * 3)]
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ top: "-10%", left: p.left, opacity: 1, scale: p.scale, rotate: 0 }}
          animate={{ top: "110%", rotate: p.rotateEnd }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "linear", delay: p.delay }}
          className="absolute h-3 w-2 rounded-sm"
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  );
}

