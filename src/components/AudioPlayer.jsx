import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { invitationData } from '../data/invitation';

export const AudioPlayer = ({ isPlaying, setIsPlaying, hasInteracted }) => {
  const audioRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;
    // Set gentle soft volume (not loud)
    audioRef.current.volume = invitationData.music.volume || 0.28;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log('Audio playback notice:', err);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const toggleMusic = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip */}
      <div
        className={`transition-all duration-300 text-xs font-medium px-3 py-1.5 rounded-full bg-burgundy-900/90 border border-gold-500/40 text-gold-200 shadow-gold-glow backdrop-blur-md ${
          showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        {isPlaying ? 'Playing: Engagement Music ♪' : 'Play Music'}
      </div>

      {/* Floating Audio Button */}
      <button
        onClick={toggleMusic}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        className="relative group p-3.5 rounded-full bg-gradient-to-tr from-burgundy-900 via-burgundy-800 to-burgundy-950 border-2 border-gold-400 text-gold-300 shadow-gold-glow hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {/* Animated Rotating Ring when playing */}
        {isPlaying && (
          <span className="absolute -inset-1.5 rounded-full border border-dashed border-gold-400/60 animate-spin-mandala pointer-events-none" />
        )}

        {/* Outer Glow Pulse */}
        <span
          className={`absolute inset-0 rounded-full bg-gold-400/20 blur-sm transition-opacity duration-500 ${
            isPlaying ? 'opacity-100 animate-pulse' : 'opacity-0'
          }`}
        />

        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-5 w-5 justify-center">
              <span className="w-1 bg-gold-300 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3"></span>
              <span className="w-1 bg-gold-300 rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.2s] h-5"></span>
              <span className="w-1 bg-gold-300 rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.4s] h-2"></span>
              <span className="w-1 bg-gold-300 rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.1s] h-4"></span>
            </div>
          ) : (
            <VolumeX className="w-5 h-5 text-gold-400/80" />
          )}
        </div>
      </button>

      {/* Background Audio Element */}
      <audio
        ref={audioRef}
        src={invitationData.music.src}
        loop
        preload="auto"
      />
    </div>
  );
};
