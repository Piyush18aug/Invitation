import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { invitationData } from '../data/invitation';
import palaceImg from '../assets/royal_palace_entrance.jpg';
import curtainsImg from '../assets/closed_royal_curtains.jpg';

export const OpeningScreen = ({ onOpenInvitation }) => {
  // states: 'idle' | 'zooming' | 'curtains_fading_in' | 'curtains_closed' | 'curtains_opening' | 'unmounted'
  const [stage, setStage] = useState('idle');

  const handleStartZoom = () => {
    if (stage !== 'idle') return;
    
    setStage('zooming');

    // 1. Zoom for 3 seconds. Glow fades in at 1.5s.
    // 2. At 2s, start fading in the closed curtains so they are fully visible by 3s.
    setTimeout(() => {
      setStage('curtains_fading_in');
    }, 2000);

    // 3. At 3.2s, we can safely allow interactions on the curtains.
    setTimeout(() => {
      setStage('curtains_closed');
    }, 3200);
  };

  const handleOpenCurtains = () => {
    if (stage !== 'curtains_closed') return;

    setStage('curtains_opening');
    onOpenInvitation();

    // The curtains take 3 seconds to open.
    // Give an extra 0.5s for everything to settle before unmounting.
    setTimeout(() => {
      setStage('unmounted');
    }, 3500);
  };

  if (stage === 'unmounted') return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none pointer-events-none">
      
      {/* 1. PALACE ENTRANCE LAYER */}
      {/* Hide completely once curtains are closed to save performance */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          stage === 'idle' || stage === 'zooming' || stage === 'curtains_fading_in' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* The Palace Image with Cinematic Zoom */}
        <div
          className={`absolute inset-0 w-full h-full bg-cover bg-no-repeat transition-transform ${
            stage !== 'idle' ? 'duration-[3s] ease-in' : 'duration-0'
          }`}
          style={{
            backgroundImage: `url(${palaceImg})`,
            backgroundPosition: 'center 70%',
            transformOrigin: '50% 70%',
            transform: stage !== 'idle' ? 'scale(15)' : 'scale(1)',
          }}
        />

        {/* Bright glowing overlay during zoom to act as a light portal */}
        <div
          className={`absolute inset-0 transition-opacity duration-[1.5s] ease-in-out ${
            stage === 'zooming' || stage === 'curtains_fading_in' ? 'opacity-100 delay-1500' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(135deg, rgba(255, 240, 189, 1) 0%, #FAF6EE 60%, rgba(255, 253, 249, 1) 100%)',
          }}
        />

        {/* UI Overlay - Fades out immediately when zooming starts */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-opacity duration-700 pointer-events-auto ${
            stage !== 'idle' ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-black/80 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center mt-[-10vh]">
            <p className="font-serif italic text-sm sm:text-base text-gold-300 tracking-widest uppercase mb-4 drop-shadow-md">
              You Are Cordially Invited
            </p>
            
            <h1 className="font-royal text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] tracking-wide">
              THE GRAND ROYAL PALACE
            </h1>
            
            <p className="font-script text-3xl sm:text-4xl text-roseGold-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mt-2 mb-12">
              Our Engagement Ceremony
            </p>
          </div>

          <div className="absolute bottom-16 sm:bottom-24 w-full flex justify-center z-10 px-4">
            <button
              onClick={handleStartZoom}
              className="group relative flex items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-full overflow-hidden text-burgundy-950 font-bold font-royal tracking-widest text-sm sm:text-base shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.6)] transition-all duration-500 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #C59B27 0%, #ECC872 30%, #FFF0BD 50%, #D4AF37 75%, #AA8232 100%)',
              }}
            >
              <span className="absolute inset-0 w-full h-full bg-white/30 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <div className="relative flex items-center gap-3">
                <span>ENTER THE GRAND ROYAL PALACE</span>
                <ArrowRight className="w-5 h-5 text-burgundy-950 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
              <div className="absolute -inset-1 rounded-full border border-gold-200/50 animate-ping opacity-50" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. ROYAL CURTAINS LAYER */}
      {/* Fades in starting at 2s, stays visible until unmounted */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          stage === 'curtains_fading_in' || stage === 'curtains_closed' || stage === 'curtains_opening' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Left Curtain */}
        <div 
          className={`absolute top-0 left-0 w-1/2 h-full overflow-hidden transition-transform duration-[3s] ease-in-out ${
            stage === 'curtains_opening' ? '-translate-x-full' : 'translate-x-0'
          }`}
          style={{ transformOrigin: 'left center' }}
        >
          <img 
            src={curtainsImg} 
            alt="Left Royal Curtain" 
            className="absolute top-0 left-0 w-[100vw] h-full max-w-none object-cover object-center" 
          />
          {/* Inner shadow for 3D depth as it opens */}
          <div className="absolute inset-0 shadow-[inset_-30px_0_50px_rgba(0,0,0,0.6)] pointer-events-none" />
        </div>

        {/* Right Curtain */}
        <div 
          className={`absolute top-0 right-0 w-1/2 h-full overflow-hidden transition-transform duration-[3s] ease-in-out ${
            stage === 'curtains_opening' ? 'translate-x-full' : 'translate-x-0'
          }`}
          style={{ transformOrigin: 'right center' }}
        >
          <img 
            src={curtainsImg} 
            alt="Right Royal Curtain" 
            className="absolute top-0 right-0 w-[100vw] h-full max-w-none object-cover object-center" 
          />
          <div className="absolute inset-0 shadow-[inset_30px_0_50px_rgba(0,0,0,0.6)] pointer-events-none" />
        </div>

        {/* Curtain Central Content & Royal Seal */}
        <div 
          className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-700 ${
            stage === 'curtains_closed' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Subtle dark backdrop to ensure high contrast */}
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg mx-auto">
            {/* Auspicious Rotating Golden Shree Mandala Seal */}
            <div className="relative mb-5 group cursor-pointer pointer-events-auto" onClick={handleOpenCurtains}>
              {/* Outer Radiant Glow */}
              <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-r from-gold-400/40 via-amber-400/60 to-gold-600/40 blur-2xl animate-pulse" />
              
              {/* Ornate Gold Frame with Rotating Mandala */}
              <div className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full p-1.5 sm:p-2 bg-gradient-to-tr from-gold-600 via-amber-300 to-gold-700 shadow-[0_0_50px_rgba(212,175,55,0.7)] border-2 border-gold-300 transform transition-transform duration-500 hover:scale-105 active:scale-95">
                <img
                  src="/assets/images/mandala_bg.jpg"
                  alt="Sacred Shree Mandala"
                  className="w-full h-full object-cover rounded-full animate-spin-mandala shadow-inner"
                />
                {/* Golden Sheen Overlay */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
              </div>
            </div>

            <h2 className="font-royal text-2xl sm:text-4xl md:text-5xl text-gold-200 tracking-wider drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] font-bold">
              Something Beautiful Awaits...
            </h2>
            
            <div 
              onClick={handleOpenCurtains}
              className="mt-5 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-gold-400/80 bg-burgundy-950/85 backdrop-blur-md shadow-gold-glow animate-pulse cursor-pointer pointer-events-auto flex items-center gap-2 hover:bg-burgundy-900 transition-colors"
            >
              <span className="font-serif italic text-xs sm:text-base text-gold-200 font-semibold tracking-wide">
                Tap to Reveal the Auspicious Invitation
              </span>
              <ArrowRight className="w-4 h-4 text-gold-300" />
            </div>
          </div>
        </div>

        {/* Interactive Tap Zone */}
        {stage === 'curtains_closed' && (
          <div 
            className="absolute inset-0 cursor-pointer pointer-events-auto" 
            onClick={handleOpenCurtains} 
          />
        )}
      </div>

    </div>
  );
};

export default OpeningScreen;
