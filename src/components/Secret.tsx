import { motion } from 'framer-motion';
import { useState } from 'react';
import { siteConfig } from '../data/config';
import { Lock, Unlock } from 'lucide-react';

export function SecretPage() {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === siteConfig.secretPassword.toLowerCase()) {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md text-center"
        >
          <Lock className="mx-auto mb-8 h-12 w-12 text-white/20" />
          <h1 className="mb-4 font-serif text-3xl text-white">FOR HER EYES ONLY</h1>
          <p className="mb-8 font-sans text-xs tracking-widest text-white/40">
            Enter the password to access the secret page.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-white/20 bg-transparent py-4 text-center font-sans text-xl tracking-widest text-white outline-none transition-colors focus:border-[#D4AF37]"
              placeholder="PASSWORD"
            />
            {error && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-xs text-red-500 tracking-widest"
              >
                INCORRECT PASSWORD
              </motion.p>
            )}
            <button
              type="submit"
              className="mt-4 w-full rounded-sm bg-white/5 py-4 font-sans text-xs tracking-[0.2em] text-white transition-colors hover:bg-white/10"
            >
              UNLOCK
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto max-w-4xl px-6 py-32 flex flex-col min-h-[calc(100vh-100px)]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Unlock className="mb-12 h-12 w-12 text-[#D4AF37]" />
          <h1 className="font-serif text-5xl font-light md:text-7xl">
            YOU FOUND IT.
          </h1>
          <p className="mt-6 font-serif text-2xl italic text-white/50">
            {siteConfig.secretContent.title}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-32 flex-1"
        >
          <div className="prose prose-invert prose-lg md:prose-xl font-serif text-white/80 whitespace-pre-wrap">
            {siteConfig.secretContent.message}
          </div>

          <div className="mt-24 grid gap-8 sm:grid-cols-2">
            {siteConfig.secretContent.photos.map((photo, index) => (
              <div key={index} className="aspect-square bg-white/5 p-4 rounded-sm border border-white/10">
                <img src={photo} alt={`Secret Memory ${index + 1}`} className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all" 
                  onError={(e) => { (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMzMzMiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM3NzciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TZWNyZXQgUGhvdG8gMjwvdGV4dD48L3N2Zz4='; }}
                />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="mt-32 text-center border-t border-white/10 pt-20"
        >
          <div className="text-4xl text-red-500 mb-6">❤️</div>
          <p className="font-serif text-xl italic text-white/50 mb-4">
            That's the real end.
          </p>
          <p className="font-sans text-xs tracking-widest text-[#D4AF37] mb-20">
            Made with love, Adi
          </p>

          <button
            onClick={() => {
              window.history.pushState({}, '', '/');
              const navEvent = new PopStateEvent('popstate');
              window.dispatchEvent(navEvent);
              window.scrollTo(0, 0);
            }}
            className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-transparent px-8 py-4 font-sans text-xs tracking-[0.2em] text-white transition-all hover:bg-white/5 hover:border-white/40"
          >
            ← BACK TO THE EXPERIENCE
          </button>
        </motion.div>
      </div>
    </div>
  );
}
