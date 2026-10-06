import { motion } from 'framer-motion';
import { siteConfig } from '../data/config';

export function Timeline() {
  return (
    <section id="story" className="relative bg-black py-32 px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32 text-center"
        >
          <h2 className="font-sans text-xs tracking-[0.4em] text-[#D4AF37]">HER STORY</h2>
          <h3 className="mt-4 font-serif text-3xl font-light tracking-wider text-white sm:text-5xl">
            A LIFE IN MOMENTS
          </h3>
        </motion.div>

        <div className="relative border-l border-white/10 pl-8 sm:pl-16">
          {siteConfig.timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="mb-24 relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[37px] sm:-left-[69px] top-2 h-3 w-3 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" />

              <div className="flex flex-col gap-8 md:flex-row md:items-center">
                <div className="md:w-1/2">
                  <span className="font-sans text-sm tracking-[0.2em] text-[#D4AF37]">{item.year}</span>
                  <h4 className="mt-2 font-serif text-2xl text-white">{item.title}</h4>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-white/60">
                    {item.description}
                  </p>
                </div>
                
                <div className="md:w-1/2">
                  <div className="group overflow-hidden rounded-sm bg-white/5">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="aspect-video w-full object-cover opacity-80 mix-blend-luminosity transition-all duration-700 group-hover:scale-105 group-hover:mix-blend-normal group-hover:opacity-100"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMzMzMiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM3NzciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZTwvdGV4dD48L3N2Zz4=';
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
