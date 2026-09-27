import React from 'react';
import { Sparkles } from 'lucide-react';

export const DivineGanesha = ({ variant = 'full', className = '' }) => {
  if (variant === 'compact') {
    return (
      <div className={`relative flex flex-col items-center ${className}`}>
        {/* Glow Halo */}
        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-gold-400/30 via-amber-300/40 to-gold-500/30 blur-md opacity-80 animate-pulse" />
        
        {/* Divine Image Container */}
        <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-t-full rounded-b-lg overflow-hidden border-2 border-gold-400 shadow-md bg-stone-900">
          <img
            src="/assets/images/ganpati_divine.jpg"
            alt="Lord Ganesha"
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
          />
          {/* Subtle Golden Sheen */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-gold-400/20 pointer-events-none" />
        </div>
      </div>
    );
  }

  if (variant === 'medallion') {
    return (
      <div className={`relative flex flex-col items-center ${className}`}>
        {/* Outer Radiant Glow */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-gold-400/25 via-amber-400/35 to-gold-600/25 blur-xl animate-pulse pointer-events-none" />
        
        {/* Ornate Gold Ring Frame */}
        <div className="relative p-1.5 rounded-full border-2 border-gold-400/80 shadow-[0_0_25px_rgba(212,175,55,0.45)] bg-gradient-to-br from-gold-300 via-amber-500 to-gold-700">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-gold-200/60 bg-stone-950">
            <img
              src="/assets/images/ganpati_divine.jpg"
              alt="Lord Ganesha"
              className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    );
  }

  // Default 'full' variant: Sacred Temple Jharokha Shrine with hanging lamps & glowing aura
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Background Divine Aura */}
      <div className="absolute -inset-6 sm:-inset-10 rounded-full bg-[radial-gradient(circle,_rgba(245,158,11,0.22)_0%,_rgba(212,175,55,0.12)_50%,_transparent_75%)] blur-2xl pointer-events-none animate-pulse" />

      {/* Decorative Hanging Temple Lamps on Left & Right */}
      <div className="relative w-full max-w-lg flex items-center justify-center px-4">
        {/* Left Hanging Brass Diya Lamp */}
        <div className="hidden sm:flex flex-col items-center absolute -left-2 top-0 pointer-events-none">
          {/* Chain */}
          <div className="w-[1.5px] h-14 bg-gradient-to-b from-transparent via-gold-400 to-gold-600 relative">
            <div className="absolute top-3 -left-1 w-2.5 h-2.5 rounded-full border border-gold-400/70" />
            <div className="absolute top-8 -left-1 w-2.5 h-2.5 rounded-full border border-gold-400/70" />
          </div>
          {/* Diya Lamp */}
          <div className="relative flex flex-col items-center -mt-1">
            {/* Flame */}
            <div className="w-2.5 h-4 bg-gradient-to-t from-amber-500 via-yellow-300 to-white rounded-full animate-flame shadow-[0_0_12px_#FFA500]" />
            {/* Lamp base */}
            <div className="w-6 h-3 rounded-b-full bg-gradient-to-r from-gold-600 via-amber-400 to-gold-700 border border-gold-300 shadow-sm" />
          </div>
        </div>

        {/* Center Shrine Arch */}
        <div className="relative group">
          {/* Outer Arch Border with Gold Trimming */}
          <div className="p-1 sm:p-1.5 rounded-t-[4rem] sm:rounded-t-[5.5rem] rounded-b-3xl bg-gradient-to-b from-gold-300 via-amber-500 to-gold-700 shadow-[0_10px_35px_rgba(212,175,55,0.35)] border border-gold-200/50">
            {/* Inner Gold Inset Frame */}
            <div className="relative w-36 h-48 sm:w-48 sm:h-64 rounded-t-[3.7rem] sm:rounded-t-[5.2rem] rounded-b-2xl overflow-hidden bg-stone-950 border border-gold-300/40">
              {/* Divine Ganpati Image */}
              <img
                src="/assets/images/ganpati_divine.jpg"
                alt="Divine Lord Ganesha"
                className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Radiant Light Sheen & Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-amber-400/15 pointer-events-none" />
              
              {/* Sacred Corner Sparkles */}
              <div className="absolute top-2 right-2 text-gold-300/80 animate-spin-slow pointer-events-none">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Golden Pedestal Arch Crown / Crest */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-gold-300 via-amber-400 to-gold-600 border border-gold-200 shadow-gold-glow flex items-center justify-center">
              <span className="font-sanskrit text-burgundy-950 font-bold text-[10px] sm:text-xs">ॐ</span>
            </div>
          </div>
        </div>

        {/* Right Hanging Brass Diya Lamp */}
        <div className="hidden sm:flex flex-col items-center absolute -right-2 top-0 pointer-events-none">
          {/* Chain */}
          <div className="w-[1.5px] h-14 bg-gradient-to-b from-transparent via-gold-400 to-gold-600 relative">
            <div className="absolute top-3 -left-1 w-2.5 h-2.5 rounded-full border border-gold-400/70" />
            <div className="absolute top-8 -left-1 w-2.5 h-2.5 rounded-full border border-gold-400/70" />
          </div>
          {/* Diya Lamp */}
          <div className="relative flex flex-col items-center -mt-1">
            {/* Flame */}
            <div className="w-2.5 h-4 bg-gradient-to-t from-amber-500 via-yellow-300 to-white rounded-full animate-flame shadow-[0_0_12px_#FFA500]" />
            {/* Lamp base */}
            <div className="w-6 h-3 rounded-b-full bg-gradient-to-r from-gold-600 via-amber-400 to-gold-700 border border-gold-300 shadow-sm" />
          </div>
        </div>
      </div>

      {/* Auspicious Sacred Shlokas */}
      <div className="mt-4 text-center space-y-1 z-10 px-2">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-gold-400/50 bg-gradient-to-r from-amber-500/15 via-gold-400/25 to-amber-500/15 shadow-sm">
          <span className="font-sanskrit text-gold-700 font-bold text-sm sm:text-base tracking-widest drop-shadow-xs">
            ॥ श्री गणेशाय नमः ॥
          </span>
        </div>
        
        <p className="font-sanskrit text-burgundy-900/90 text-xs sm:text-sm font-medium max-w-lg mx-auto leading-relaxed pt-1">
          ॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
        </p>
      </div>
    </div>
  );
};
