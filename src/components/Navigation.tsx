import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { id: 'story', label: 'STORY' },
  { id: 'memories', label: 'MEMORIES' },
  { id: 'people', label: 'PEOPLE' },
  { id: 'chaos', label: 'CHAOS' },
  { id: 'future', label: 'FUTURE' },
  { id: 'surprise', label: 'SURPRISE' }
];

export function Navigation({ isVisible }: { isVisible: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Find the current active section
      let current = '';
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = item.id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-6 lg:flex"
      >
        {navItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className={`group flex items-center gap-4 text-xs tracking-[0.2em] transition-all duration-300 ${
              activeSection === item.id ? 'text-[#D4AF37]' : 'text-white/30 hover:text-white/70'
            }`}
          >
            <span className="font-sans">0{index + 1}</span>
            <span 
              className={`font-sans transition-all duration-300 ${
                activeSection === item.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </motion.nav>

      {/* Mobile Navigation Toggle */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed left-6 top-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/80 backdrop-blur-md lg:hidden"
      >
        <Menu size={18} />
      </motion.button>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg lg:hidden"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-6 top-6 p-4 text-white/50 hover:text-white"
            >
              <X size={24} />
            </button>
            
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="font-sans text-xl tracking-[0.3em] text-white/70 transition-colors hover:text-[#D4AF37]"
                >
                  <span className="mr-4 text-white/30">0{index + 1}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
