import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { siteConfig } from '../data/config';

export function Stats() {
  return (
    <section className="relative bg-black py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24 text-center"
        >
          <h2 className="font-sans text-xs tracking-[0.4em] text-[#D4AF37]">THE DATA</h2>
          <h3 className="mt-4 font-serif text-3xl font-light tracking-wider text-white sm:text-5xl">
            SCIENTIFICALLY PROVEN FACTS
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.statistics.map((stat, index) => (
            <StatCounter key={index} stat={stat} delay={index * 0.2} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCounter({ stat, delay }: { stat: typeof siteConfig.statistics[0]; delay: number }) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = stat.value;
    const duration = 2000;
    const incrementTime = Math.abs(Math.floor(duration / end)) || 10;
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [stat.value, inView]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      onViewportEnter={() => setInView(true)}
      transition={{ duration: 0.8, delay }}
      className="flex flex-col items-center text-center"
    >
      <div className="flex items-baseline justify-center">
        <span className="font-serif text-6xl text-white md:text-8xl">{count}</span>
        <span className="font-sans text-2xl text-[#D4AF37] md:text-4xl">{stat.suffix}</span>
      </div>
      <p className="mt-6 max-w-[200px] font-sans text-xs font-semibold tracking-widest text-white/50 leading-loose">
        {stat.label}
      </p>
    </motion.div>
  );
}
