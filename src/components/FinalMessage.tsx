import { motion } from 'framer-motion';
import { siteConfig } from '../data/config';

export function FinalMessage() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-black py-32 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <h2 className="mb-16 font-sans text-xs tracking-[0.4em] text-[#D4AF37]">
            {siteConfig.finalMessage.heading}
          </h2>
          
          <p className="font-serif text-xl leading-loose text-white/80 md:text-3xl md:leading-loose whitespace-pre-wrap">
            {siteConfig.finalMessage.text}
          </p>
          
          <div className="mt-24">
            <p className="font-serif text-lg italic text-[#D4AF37] whitespace-pre-wrap">
              {siteConfig.finalMessage.signOff}
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 2, delay: 1 }}
        className="mt-32 w-full text-center"
      >
        <p className="font-sans text-xs tracking-widest text-white/20">
          KEEP THIS MOMENT. ❤️
        </p>
      </motion.div>
    </section>
  );
}
