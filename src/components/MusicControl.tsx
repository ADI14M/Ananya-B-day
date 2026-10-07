import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';

// Create one persistent audio instance for the entire website
const audioInstance = new Audio('/audio/background.mp3');
audioInstance.loop = true;
audioInstance.volume = 0.5;
audioInstance.muted = false; // Intended default state
let hasAttemptedAutoplay = false;

interface MusicControlProps {
  isVisible: boolean;
}

export function MusicControl({ isVisible }: MusicControlProps) {
  const [isPlaying, setIsPlaying] = useState(!audioInstance.paused && !audioInstance.muted);

  const bars = useMemo(() => {
    return [...Array(4)].map((_, i) => ({
      duration: 0.8 + Math.random() * 0.5,
      delay: i * 0.1
    }));
  }, []);

  useEffect(() => {
    if (hasAttemptedAutoplay) {
      // If we remount, just sync state with the existing global instance
      setIsPlaying(!audioInstance.paused && !audioInstance.muted);
      return;
    }
    
    hasAttemptedAutoplay = true;
    audioInstance.muted = false;

    // Attempt to start music immediately
    audioInstance.play().then(() => {
      setIsPlaying(true);
    }).catch((error) => {
      console.warn("Autoplay blocked by browser. Waiting for first interaction...", error);
      setIsPlaying(false);

      // Register one-time interaction listener for graceful fallback
      const handleFirstInteraction = () => {
        // If already playing (e.g., from another event), do nothing
        if (!audioInstance.paused && !audioInstance.muted) return;

        audioInstance.muted = false;
        audioInstance.play().then(() => {
          setIsPlaying(true);
        }).catch(err => console.error("Playback failed on interaction:", err));
        
        removeListeners();
      };

      const removeListeners = () => {
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('pointerdown', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
        document.removeEventListener('scroll', handleFirstInteraction);
      };

      document.addEventListener('click', handleFirstInteraction, { once: true });
      document.addEventListener('pointerdown', handleFirstInteraction, { once: true });
      document.addEventListener('touchstart', handleFirstInteraction, { once: true });
      document.addEventListener('keydown', handleFirstInteraction, { once: true });
      document.addEventListener('scroll', handleFirstInteraction, { once: true });
    });
  }, []);

  const togglePlay = () => {
    if (!audioInstance.paused && !audioInstance.muted) {
      audioInstance.pause();
      setIsPlaying(false);
    } else {
      audioInstance.muted = false;
      audioInstance.play().then(() => setIsPlaying(true)).catch(e => console.error("Audio play failed:", e));
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="fixed right-6 top-6 z-50 flex items-center gap-3"
    >
      <button 
        onClick={togglePlay}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/80 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white"
        aria-label={isPlaying ? "Mute music" : "Unmute music"}
      >
        {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>
      
      {isPlaying && (
        <div className="flex h-4 items-end gap-[2px]">
          {bars.map((bar, i) => (
            <motion.div
              key={i}
              animate={{ height: ["20%", "100%", "20%"] }}
              transition={{
                duration: bar.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: bar.delay
              }}
              className="w-1 bg-[#D4AF37]"
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
