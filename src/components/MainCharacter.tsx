import { motion } from 'framer-motion';
import { siteConfig } from '../data/config';

export function MainCharacter() {
  return (
    <section className="relative flex min-h-[150vh] flex-col items-center justify-center bg-black py-32 px-6">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24 text-center"
        >
          <h2 className="font-sans text-xs tracking-[0.4em] text-[#D4AF37]">CHAPTER 01</h2>
          <h3 className="mt-4 font-serif text-3xl font-light tracking-wider text-white sm:text-5xl">
            THE MAIN CHARACTER
          </h3>
        </motion.div>

        <div className="flex w-full max-w-4xl flex-col gap-12 text-center md:gap-20">
          {siteConfig.personalityTraits.map((trait, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-20%" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h4 className="font-serif text-3xl italic text-[#FDFBF7] md:text-5xl lg:text-6xl">
                {trait}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative portrait at the end of the section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative mt-32 h-[60vh] w-full max-w-lg overflow-hidden rounded-sm md:h-[80vh]"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        {/* Placeholder image, falls back gracefully */}
        <div className="h-full w-full bg-white/5">
          <img 
            src="/images/hero/portrait.jpg" 
            alt={siteConfig.name}
            className="h-full w-full object-cover object-center opacity-80 mix-blend-luminosity transition-all duration-1000 hover:mix-blend-normal hover:opacity-100"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMzMzMiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM3NzciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Qb3J0cmFpdCBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=';
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
