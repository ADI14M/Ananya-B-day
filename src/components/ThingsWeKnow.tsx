import { motion } from 'framer-motion';
import { useState } from 'react';
import { siteConfig } from '../data/config';

export function ThingsWeKnow() {
  return (
    <section id="chaos" className="relative bg-[#050505] py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24 text-center"
        >
          <h2 className="font-sans text-xs tracking-[0.4em] text-[#D4AF37]">THE TRUTH</h2>
          <h3 className="mt-4 font-serif text-3xl font-light tracking-wider text-white sm:text-5xl">
            THINGS ONLY WE KNOW
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.jokes.map((joke, index) => (
            <FlipCard key={index} question={joke.question} answer={joke.answer} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlipCard({ question, answer, delay }: { question: string; answer: string; delay: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="group relative h-64 w-full cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative h-full w-full transition-all duration-500"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center border border-white/10 bg-white/5 backdrop-blur-sm"
          style={{ backfaceVisibility: "hidden" }}
        >
          <h4 className="font-sans text-sm font-semibold tracking-widest text-[#D4AF37]">
            {question}
          </h4>
          <span className="absolute bottom-6 text-xs text-white/30 tracking-[0.2em] transition-opacity group-hover:opacity-100 opacity-50">
            TAP TO REVEAL
          </span>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center border border-[#D4AF37]/30 bg-[#D4AF37]/5 backdrop-blur-sm"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="font-serif text-lg text-white md:text-xl">
            {answer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
