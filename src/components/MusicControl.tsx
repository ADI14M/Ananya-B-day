import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState, useMemo } from 'react';

interface MusicControlProps {
  isVisible: boolean;
}

export function MusicControl({ isVisible }: MusicControlProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const bars = useMemo(() => {
    return [...Array(4)].map((_, i) => ({
      duration: 0.8 + Math.random() * 0.5,
      delay: i * 0.1
    }));
  }, []);

  useEffect(() => {
    // We create the audio element once and keep it in ref
    if (!audioRef.current) {
      const audio = new Audio('/audio/background.mp3');
      audio.loop = true;
      audio.volume = 0.5;
      audioRef.current = audio;
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Add a catch block in case browser blocks autoplay
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
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
        aria-label={isPlaying ? "Pause music" : "Play music"}
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
