import { motion } from 'framer-motion';

export function VideoMoment() {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-black py-32 px-6">
      <div className="absolute inset-0 z-0 opacity-50 bg-gradient-to-b from-black via-transparent to-black" />
      
      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl font-light tracking-wider text-white sm:text-5xl">
            SOME MEMORIES
            <br />
            <span className="italic text-white/50">ARE BETTER MOVING.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="aspect-video w-full overflow-hidden rounded-sm border border-white/10 bg-white/5 shadow-2xl"
        >
          {/* Replace src with actual video or keep as placeholder */}
          <video 
            controls 
            poster="/images/hero/portrait.jpg"
            className="h-full w-full object-cover"
          >
            <source src="/videos/montage.mp4" type="video/mp4" />
            <p className="text-white/50 pt-32 font-sans tracking-widest text-sm">
              Video placeholder. Add 'montage.mp4' to public/videos/
            </p>
          </video>
        </motion.div>
      </div>
    </section>
  );
}
