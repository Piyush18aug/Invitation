import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { invitationData } from '../data/invitation';

export const AudioPlayer = ({ isPlaying, setIsPlaying, hasInteracted }) => {
  const audioRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = invitationData.music.volume || 0.28;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log('Mobile audio autoplay notice (waiting for gesture):', err);
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
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 pb-safe z-50 flex items-center gap-2 sm:gap-3 select-none">
      {/* Tooltip (visible on desktop hover or brief interaction) */}
      <div
        className={`hidden sm:block transition-all duration-300 text-xs font-medium px-3 py-1.5 rounded-full bg-burgundy-900/90 border border-gold-500/40 text-gold-200 shadow-gold-glow backdrop-blur-md ${
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
        className="relative group p-3 sm:p-3.5 rounded-full bg-gradient-to-tr from-burgundy-900 via-burgundy-800 to-burgundy-950 border-2 border-gold-400 text-gold-300 shadow-gold-glow hover:scale-105 active:scale-90 transition-all duration-300 touch-manipulation min-w-[48px] min-h-[48px] flex items-center justify-center"
      >
        {/* Animated Rotating Ring when playing */}
        {isPlaying && (
          <span className="absolute -inset-1 sm:-inset-1.5 rounded-full border border-dashed border-gold-400/60 animate-spin-mandala pointer-events-none" />
        )}

        {/* Outer Glow Pulse */}
        <span
          className={`absolute inset-0 rounded-full bg-gold-400/20 blur-sm transition-opacity duration-500 ${
            isPlaying ? 'opacity-100 animate-pulse' : 'opacity-0'
          }`}
        />

        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-4 w-4 sm:h-5 sm:w-5 justify-center">
              <span className="w-1 bg-gold-300 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-2.5 sm:h-3"></span>
              <span className="w-1 bg-gold-300 rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.2s] h-4 sm:h-5"></span>
              <span className="w-1 bg-gold-300 rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.4s] h-2 sm:h-2.5"></span>
              <span className="w-1 bg-gold-300 rounded-full animate-[pulse_0.9s_ease-in-out_infinite_0.1s] h-3 sm:h-4"></span>
            </div>
          ) : (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400/80" />
          )}
        </div>
      </button>

      {/* Background Audio Element */}
      <audio
        ref={audioRef}
        src={invitationData.music.src}
        loop
        preload="auto"
        playsInline
      />
    </div>
  );
};

export default AudioPlayer;
