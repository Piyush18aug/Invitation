import React, { useState, useEffect } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { GaneshaIcon, LotusIcon, DiyaIcon } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';

export const OpeningScreen = ({ onOpenInvitation }) => {
  const [stage, setStage] = useState(0); // 0: Ganesh, 1: Blessings, 2: Prathamesh, 3: &, 4: Revati, 5: Ready to Open

  useEffect(() => {
    const t0 = setTimeout(() => setStage(1), 700);
    const t1 = setTimeout(() => setStage(2), 1800);
    const t2 = setTimeout(() => setStage(3), 2900);
    const t3 = setTimeout(() => setStage(4), 3800);
    const t4 = setTimeout(() => setStage(5), 4800);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-burgundy-texture overflow-hidden select-none">
      {/* Background Rotating Gold Mandala */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full border-[1px] border-gold-400/40 animate-spin-mandala flex items-center justify-center">
          <div className="w-[85%] h-[85%] rounded-full border border-dashed border-gold-300/30 animate-spin-mandala-rev flex items-center justify-center">
            <div className="w-[70%] h-[70%] rounded-full border border-gold-500/20" />
          </div>
        </div>
      </div>

      {/* Floating Diyas at corners */}
      <div className="absolute top-6 left-6 md:top-12 md:left-12 opacity-80">
        <DiyaIcon className="w-12 h-12" />
      </div>
      <div className="absolute top-6 right-6 md:top-12 md:right-12 opacity-80">
        <DiyaIcon className="w-12 h-12" />
      </div>
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 opacity-80">
        <DiyaIcon className="w-12 h-12" />
      </div>
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 opacity-80">
        <DiyaIcon className="w-12 h-12" />
      </div>

      {/* Center Cinematic Container */}
      <div className="relative z-10 w-full max-w-2xl mx-4 p-6 sm:p-10 md:p-12 text-center flex flex-col items-center justify-center">
        {/* Ornamental Frame */}
        <div className="absolute inset-0 border border-gold-500/40 rounded-2xl md:rounded-3xl p-4 pointer-events-none shadow-gold-glow">
          <div className="w-full h-full border border-dashed border-gold-400/30 rounded-xl md:rounded-2xl" />
        </div>

        {/* Ganesh Mantra with Glowing Aura */}
        <div
          className={`transition-all duration-1000 transform ${
            stage >= 0 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
          }`}
        >
          <div className="flex justify-center mb-3">
            <div className="p-3 rounded-full bg-gold-500/10 border border-gold-400/40 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <GaneshaIcon className="w-10 h-10 md:w-12 md:h-12 text-gold-300" />
            </div>
          </div>
          <p className="font-sanskrit text-gold-300 text-base sm:text-xl md:text-2xl tracking-widest drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]">
            {invitationData.event.sanskritMotto}
          </p>
        </div>

        {/* Blessings Subtitle */}
        <div
          className={`mt-4 transition-all duration-1000 delay-150 transform ${
            stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="font-serif italic text-xs sm:text-sm md:text-base text-gold-200/90 tracking-widest uppercase">
            With the blessings of our families
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-2" />
        </div>

        {/* Dramatic Names Reveal */}
        <div className="my-6 md:my-8 space-y-1">
          {/* Groom Name (Prathamesh First) */}
          <div
            className={`transition-all duration-1000 transform ${
              stage >= 2
                ? 'opacity-100 translate-y-0 scale-100 blur-0'
                : 'opacity-0 translate-y-6 scale-90 blur-sm'
            }`}
          >
            <h1 className="font-royal text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider gold-gradient-text drop-shadow-2xl">
              {invitationData.couple.groom.name}
            </h1>
          </div>

          {/* Ampersand */}
          <div
            className={`transition-all duration-700 transform ${
              stage >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          >
            <div className="flex items-center justify-center gap-3 my-1">
              <span className="w-8 sm:w-16 h-[1px] bg-gold-400/50" />
              <span className="font-script text-3xl sm:text-4xl text-roseGold-400 font-semibold">&</span>
              <span className="w-8 sm:w-16 h-[1px] bg-gold-400/50" />
            </div>
          </div>

          {/* Bride Name (Revati Second) */}
          <div
            className={`transition-all duration-1000 transform ${
              stage >= 4
                ? 'opacity-100 translate-y-0 scale-100 blur-0'
                : 'opacity-0 translate-y-6 scale-90 blur-sm'
            }`}
          >
            <h1 className="font-royal text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider gold-gradient-text drop-shadow-2xl">
              {invitationData.couple.bride.name}
            </h1>
          </div>
        </div>

        {/* Invitation Text & Seal Button */}
        <div
          className={`transition-all duration-1000 transform ${
            stage >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
          }`}
        >
          <p className="font-serif text-ivory-200/90 text-sm sm:text-base md:text-lg mb-6 max-w-md mx-auto leading-relaxed">
            An invitation to celebrate
            <br />
            <span className="text-gold-300 font-medium">a beautiful beginning</span>
          </p>

          {/* Royal Wax Seal Button */}
          <button
            onClick={onOpenInvitation}
            className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 rounded-full overflow-hidden bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 text-burgundy-950 font-bold font-royal tracking-widest text-sm sm:text-base shadow-gold-glow hover:shadow-gold-glow-lg active:scale-95 transition-all duration-300"
          >
            {/* Shimmer Effect */}
            <span className="absolute inset-0 w-full h-full bg-white/25 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

            {/* Inner border */}
            <span className="absolute inset-1 rounded-full border border-burgundy-950/30" />

            <div className="relative flex items-center gap-3">
              <LotusIcon className="w-5 h-5 text-burgundy-950" />
              <span>OPEN INVITATION</span>
              <Sparkles className="w-5 h-5 text-burgundy-950 animate-pulse" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
