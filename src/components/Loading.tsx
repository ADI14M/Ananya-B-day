import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LoadingProps {
  onComplete: () => void;
}

export function Loading({ onComplete }: LoadingProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2500; // 2.5 seconds
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 800); // Wait a bit at 100% before completing
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-[#FDFBF7]"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="mb-8 font-serif text-2xl tracking-[0.2em] text-white/70 sm:text-4xl">
            PREPARING
            <br />
            HER STORY
          </h2>
          
          <div className="flex flex-col items-center space-y-4">
            {/* Minimalist Progress Indicator */}
            <div className="h-[1px] w-48 overflow-hidden bg-white/10 sm:w-64">
              <motion.div
                className="h-full bg-white/80"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.05 }}
              />
            </div>
            
            <div className="font-sans text-xs tracking-[0.3em] text-white/50">
              {Math.round(progress).toString().padStart(2, '0')} %
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
