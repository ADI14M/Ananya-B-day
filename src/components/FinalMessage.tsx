import { motion } from 'framer-motion';
import { siteConfig } from '../data/config';
import { Lock, RotateCcw } from 'lucide-react';

export function FinalMessage() {
  const handleReplay = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    // Give it a tiny bit of time to scroll before reloading to reset state if needed
    // Or we just rely on smooth scrolling and the user can experience the animations again
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleSecret = () => {
    // Navigate to /secret
    window.history.pushState({}, '', '/secret');
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative bg-black text-white">
      {/* 1. AND BEFORE YOU GO... */}
      <section className="relative flex min-h-screen flex-col items-center justify-center py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.5 }}
          className="text-center"
        >
          <h2 className="mb-12 font-sans text-xs tracking-[0.4em] text-[#D4AF37]">
            {siteConfig.ending.beforeYouGo}
          </h2>
          
          <p className="font-serif text-3xl font-light leading-relaxed text-white/80 md:text-5xl md:leading-relaxed whitespace-pre-wrap">
            {siteConfig.ending.oneLastThing}
          </p>
        </motion.div>
      </section>

      {/* 2. A LITTLE MESSAGE */}
      <section className="relative flex min-h-screen flex-col items-center justify-center py-32 px-6 bg-[#030303]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.5 }}
          className="mx-auto w-full max-w-3xl text-center"
        >
          <h2 className="mb-16 font-serif text-2xl tracking-widest text-[#D4AF37] opacity-80">
            {siteConfig.ending.messageHeading}
          </h2>
          
          <div className="space-y-8 font-serif text-xl leading-loose text-white/90 md:text-2xl md:leading-[2.5] whitespace-pre-wrap">
            {siteConfig.ending.personalMessage}
          </div>
        </motion.div>
      </section>

      {/* 3. FINAL MEMORY */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src={siteConfig.ending.finalMemoryImage} 
            alt="Final memory" 
            className="h-full w-full object-cover opacity-40 mix-blend-luminosity"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxMTEiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM3NzciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5GaW5hbCBNZW1vcnk8L3RleHQ+PC9zdmc+';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.5 }}
          >
            <h3 className="font-serif text-3xl font-light text-white md:text-5xl">
              {siteConfig.ending.finalMemoryText1}
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.5, delay: 1 }}
            className="mt-12"
          >
            <h3 className="font-serif text-3xl italic text-[#D4AF37] md:text-5xl">
              {siteConfig.ending.finalMemoryText2}
            </h3>
          </motion.div>
        </div>
      </section>

      {/* 4. ENDING & ACTIONS */}
      <section className="relative flex flex-col items-center justify-center py-40 px-6 bg-black">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="text-center"
        >
          <p className="font-serif text-2xl text-white/50 mb-4">
            {siteConfig.ending.closingText1}
          </p>
          <p className="font-serif text-xl italic text-white/30 mb-20">
            {siteConfig.ending.closingText2}
          </p>

          <div className="flex flex-col items-center gap-6 md:flex-row justify-center">
            <button 
              onClick={handleReplay}
              className="flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-sans text-xs tracking-[0.2em] text-white transition-all hover:bg-white/10 hover:border-white/40"
            >
              <RotateCcw size={16} />
              EXPERIENCE AGAIN
            </button>
            
            <button 
              onClick={handleSecret}
              className="group flex items-center gap-3 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 px-8 py-4 font-sans text-xs tracking-[0.2em] text-[#D4AF37] transition-all hover:bg-[#D4AF37]/10"
            >
              <Lock size={16} className="transition-transform group-hover:scale-110" />
              ONE LAST SECRET
            </button>
          </div>

          <p className="mt-32 font-sans text-xs tracking-widest text-white/20">
            {siteConfig.ending.signOff}
          </p>
        </motion.div>
      </section>
    </div>
  );
}
