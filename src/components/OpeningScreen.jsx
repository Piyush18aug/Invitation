import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { GaneshaIcon, LotusIcon, DiyaIcon, CornerOrnament } from './OrnamentalIcons';
import { DivineGanesha } from './DivineGanesha';
import { invitationData } from '../data/invitation';

export const OpeningScreen = ({ onOpenInvitation }) => {
  // Animation states: 'closed' -> 'unsealing' -> 'opening-flap' -> 'sliding-card' -> 'zooming-card' -> 'opened'
  const [animState, setAnimState] = useState('closed');

  const handleOpen = () => {
    if (animState !== 'closed') return;

    // Step 1: Release seal
    setAnimState('unsealing');

    // Step 2: Open top flap 180 degrees upwards
    setTimeout(() => {
      setAnimState('opening-flap');
    }, 400);

    // Step 3: Slide card up out of the pocket
    setTimeout(() => {
      setAnimState('sliding-card');
    }, 1100);

    // Step 4: Elevate card and zoom to fill screen
    setTimeout(() => {
      setAnimState('zooming-card');
    }, 2000);

    // Step 5: Transition into website
    setTimeout(() => {
      setAnimState('opened');
      onOpenInvitation();
    }, 3000);
  };

  const isClosed = animState === 'closed';
  const isOpening = animState !== 'closed';
  const isFlapOpen =
    animState === 'opening-flap' ||
    animState === 'sliding-card' ||
    animState === 'zooming-card' ||
    animState === 'opened';
  const isCardSliding =
    animState === 'sliding-card' ||
    animState === 'zooming-card' ||
    animState === 'opened';
  const isCardZooming = animState === 'zooming-card' || animState === 'opened';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none transition-opacity duration-1000 ${
        animState === 'opened' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: 'linear-gradient(135deg, #180206 0%, #350810 40%, #4A0E1A 70%, #1A0307 100%)',
      }}
    >
      {/* Background Rotating Gold Mandala */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full border-[1px] border-gold-400/40 animate-spin-mandala flex items-center justify-center">
          <div className="w-[85%] h-[85%] rounded-full border border-dashed border-gold-300/30 animate-spin-mandala-rev flex items-center justify-center">
            <div className="w-[70%] h-[70%] rounded-full border border-gold-500/20" />
          </div>
        </div>
      </div>

      {/* Floating Diyas at corners */}
      <div className="absolute top-6 left-6 md:top-12 md:left-12 opacity-80 pointer-events-none">
        <DiyaIcon className="w-10 h-10 md:w-12 md:h-12" />
      </div>
      <div className="absolute top-6 right-6 md:top-12 md:right-12 opacity-80 pointer-events-none">
        <DiyaIcon className="w-10 h-10 md:w-12 md:h-12" />
      </div>
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 opacity-80 pointer-events-none">
        <DiyaIcon className="w-10 h-10 md:w-12 md:h-12" />
      </div>
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 opacity-80 pointer-events-none">
        <DiyaIcon className="w-10 h-10 md:w-12 md:h-12" />
      </div>

      {/* Center Presentation Container */}
      <div className="relative z-10 w-full max-w-xl mx-4 flex flex-col items-center justify-center">
        
        {/* Sanskrit Header Tag */}
        <div
          className={`mb-6 text-center transition-all duration-500 ${
            isOpening ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
          }`}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-400/40 shadow-gold-glow mb-2"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(74, 14, 26, 0.4) 100%)',
            }}
          >
            <GaneshaIcon className="w-5 h-5 text-gold-300" />
            <span className="font-sanskrit text-gold-300 text-sm tracking-widest">
              {invitationData.event.sanskritMotto}
            </span>
          </div>
          <p className="font-serif italic text-xs sm:text-sm text-gold-200/80 tracking-widest uppercase">
            A Royal Indian Engagement Invitation
          </p>
        </div>

        {/* ========================================================================= */}
        {/* PHYSICAL 3D ENVELOPE CONTAINER                                            */}
        {/* ========================================================================= */}
        <div
          className="relative w-[340px] sm:w-[480px] md:w-[540px] h-[230px] sm:h-[310px] md:h-[340px] cursor-pointer group"
          style={{ perspective: '1400px' }}
          onClick={handleOpen}
        >
          {/* ================= 1. ENVELOPE BACK INTERIOR WALL ================= */}
          <div
            className="absolute inset-0 rounded-2xl border-2 border-gold-500/40 shadow-2xl overflow-hidden z-0"
            style={{
              background: 'linear-gradient(135deg, #2A050D 0%, #1A0207 100%)',
            }}
          >
            {/* Interior Gold Silk Lining pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_#ECC872_0%,_transparent_70%)]" />
            <div className="absolute inset-3 border border-dashed border-gold-400/25 rounded-xl pointer-events-none" />
          </div>

          {/* ================= 2. THE INVITATION CARD (INSIDE THE POCKET) ================= */}
          {/* When closed, it is sitting completely inside the envelope pocket.             */}
          {/* On open, it slides UP out of the pocket, then zooms to full screen!          */}
          <div
            className={`absolute inset-x-4 sm:inset-x-6 top-3 sm:top-4 bottom-3 sm:bottom-4 rounded-2xl border-2 border-gold-400 p-4 sm:p-6 text-center flex flex-col justify-between transition-all duration-800 ease-in-out ${
              isCardZooming
                ? 'z-50 -translate-y-[8%] scale-[1.75] sm:scale-[1.95] opacity-100 shadow-[0_0_100px_rgba(212,175,55,0.7)]'
                : isCardSliding
                ? 'z-40 -translate-y-[72%] sm:-translate-y-[78%] scale-100 opacity-100 shadow-2xl'
                : 'z-10 translate-y-0 scale-95 opacity-0 pointer-events-none'
            }`}
            style={{
              background: 'linear-gradient(135deg, #FFFDF9 0%, #FAF5EC 50%, #F3EAE0 100%)',
            }}
          >
            {/* Card Corner Ornaments */}
            <div className="absolute top-1.5 left-1.5">
              <CornerOrnament className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <div className="absolute top-1.5 right-1.5 rotate-90">
              <CornerOrnament className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <div className="absolute bottom-1.5 left-1.5 -rotate-90">
              <CornerOrnament className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <div className="absolute bottom-1.5 right-1.5 rotate-180">
              <CornerOrnament className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            {/* Inner Card Content */}
            <div className="pt-2 flex flex-col items-center">
              <DivineGanesha variant="compact" className="scale-75 sm:scale-90 -my-1" />
              <p className="font-sanskrit text-gold-700 text-xs sm:text-sm font-semibold">
                ॥ श्री गणेशाय नमः ॥
              </p>
              <p className="font-serif italic text-[10px] sm:text-xs text-burgundy-800/80 uppercase tracking-widest mt-0.5">
                With blessings of our families
              </p>
            </div>

            <div className="py-1 space-y-0.5">
              <h3 className="font-royal text-xl sm:text-3xl font-bold text-burgundy-950">
                {invitationData.couple.groom.name}
              </h3>
              <div className="flex items-center justify-center gap-2">
                <span className="w-8 h-[1px] bg-gold-400" />
                <span className="font-script text-lg sm:text-2xl text-roseGold-500">&</span>
                <span className="w-8 h-[1px] bg-gold-400" />
              </div>
              <h3 className="font-royal text-xl sm:text-3xl font-bold text-burgundy-950">
                {invitationData.couple.bride.name}
              </h3>
            </div>

            <div className="pb-1">
              <span
                className="inline-block px-3 py-1 rounded-full text-gold-200 font-royal font-bold text-[10px] sm:text-xs tracking-wider border border-gold-400/40"
                style={{
                  background: 'linear-gradient(135deg, #3B0A14 0%, #200308 100%)',
                }}
              >
                ENGAGEMENT CEREMONY
              </span>
              <p className="font-serif text-[10px] sm:text-xs text-burgundy-900 font-semibold mt-1">
                24 October 2026 • Royal Palace, Sangli
              </p>
            </div>
          </div>

          {/* ================= 3. ENVELOPE FRONT POCKET & SIDE FOLDS ================= */}
          {/* This forms the realistic physical front of the envelope.                  */}
          {/* It is solid opaque burgundy, fully covering the bottom/middle when closed.*/}
          <div
            className={`absolute inset-0 rounded-2xl overflow-hidden z-20 pointer-events-none transition-all duration-700 ${
              isCardZooming ? 'opacity-0 translate-y-8 scale-95' : 'opacity-100 translate-y-0'
            }`}
          >
            {/* Realistic Pocket Shape & Fold Lines */}
            <svg viewBox="0 0 540 340" className="w-full h-full drop-shadow-xl" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pocketBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4A0E1A" />
                  <stop offset="50%" stopColor="#350810" />
                  <stop offset="100%" stopColor="#1E0307" />
                </linearGradient>
                <linearGradient id="goldPocketBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF0BD" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#8B7020" />
                </linearGradient>
              </defs>

              {/* Main Pocket Body (Solid opaque burgundy paper) */}
              <path
                d="M 0 340 L 0 135 L 270 235 L 540 135 L 540 340 Z"
                fill="url(#pocketBaseGrad)"
                stroke="url(#goldPocketBorder)"
                strokeWidth="2"
              />

              {/* Left Triangular Fold shadow line */}
              <path
                d="M 0 0 L 0 340 L 230 185 Z"
                fill="url(#pocketBaseGrad)"
                stroke="#D4AF37"
                strokeWidth="1.2"
                opacity="0.95"
              />

              {/* Right Triangular Fold shadow line */}
              <path
                d="M 540 0 L 540 340 L 310 185 Z"
                fill="url(#pocketBaseGrad)"
                stroke="#D4AF37"
                strokeWidth="1.2"
                opacity="0.95"
              />

              {/* Bottom Triangular Fold */}
              <path
                d="M 0 340 L 270 170 L 540 340 Z"
                fill="url(#pocketBaseGrad)"
                stroke="url(#goldPocketBorder)"
                strokeWidth="1.5"
                opacity="0.98"
              />

              {/* Gold Filigree Accent on Bottom Fold */}
              <path
                d="M 30 325 L 270 185 L 510 325"
                fill="none"
                stroke="#ECC872"
                strokeWidth="1"
                strokeDasharray="4 3"
                opacity="0.5"
              />
            </svg>

            {/* Typography on the Outside of the Closed Envelope */}
            <div
              className={`absolute bottom-4 sm:bottom-6 inset-x-0 text-center px-4 transition-opacity duration-300 ${
                isOpening ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <div className="space-y-0.5">
                <p className="font-sanskrit text-gold-300 text-[10px] sm:text-xs tracking-widest font-semibold">
                  ॥ श्री गणेशाय नमः ॥
                </p>
                <h2 className="font-royal text-xl sm:text-2xl md:text-3xl font-bold tracking-wider gold-gradient-text drop-shadow-md">
                  {invitationData.couple.groom.name} & {invitationData.couple.bride.name}
                </h2>
                <p className="font-serif uppercase tracking-widest text-[9px] sm:text-[11px] text-gold-200/90 font-medium">
                  Engagement Invitation
                </p>
                <p className="font-serif text-[9px] sm:text-[10px] text-gold-400/80 tracking-wider pt-0.5">
                  24 October 2026 • Sangli
                </p>
              </div>
            </div>
          </div>

          {/* ================= 4. THE 3D TOP FLAP ================= */}
          {/* Hinged at the top (transform-origin: top).             */}
          {/* Closed: folds DOWN covering the top & center.          */}
          {/* Open: rotates 180° UPWARD realistically in 3D.        */}
          <div
            className={`absolute top-0 inset-x-0 h-[58%] origin-top rounded-t-2xl transition-transform duration-700 ease-in-out ${
              isCardZooming ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlapOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
              zIndex: isFlapOpen ? 5 : 30, // Drop behind emerging card once open
            }}
          >
            <div className="relative w-full h-full">
              <svg viewBox="0 0 540 200" className="w-full h-full drop-shadow-2xl overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="topFlapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#54111E" />
                    <stop offset="50%" stopColor="#3D0A14" />
                    <stop offset="100%" stopColor="#25040A" />
                  </linearGradient>
                  <linearGradient id="topFlapGoldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF0BD" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#8B7020" />
                  </linearGradient>
                </defs>

                {/* Triangular Top Flap pointing downwards to the seal */}
                <path
                  d="M 0 0 L 270 195 L 540 0 Z"
                  fill="url(#topFlapGrad)"
                  stroke="url(#topFlapGoldBorder)"
                  strokeWidth="2.5"
                />

                {/* Inner Gold Foil Tracing Line */}
                <path
                  d="M 25 10 L 270 178 L 515 10"
                  fill="none"
                  stroke="#ECC872"
                  strokeWidth="1"
                  strokeDasharray="4 3"
                  opacity="0.65"
                />

                {/* Top Corner Ornaments on Flap */}
                <circle cx="270" cy="165" r="3" fill="#D4AF37" />
              </svg>
            </div>
          </div>

          {/* ================= 5. ROYAL WAX SEAL (P ♥ R) ================= */}
          {/* Sits right at the tip of the top flap sealing it closed.     */}
          <div
            className={`absolute top-[56%] left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-400 ${
              isOpening
                ? 'opacity-0 scale-150 pointer-events-none'
                : 'opacity-100 scale-100 z-35 group-hover:scale-110'
            }`}
          >
            {/* Wax Seal Disk with 3D Bevel & Metallic Gold Rim */}
            <div
              className="relative w-15 h-15 sm:w-16 sm:h-16 rounded-full p-1 shadow-[0_8px_30px_rgba(0,0,0,0.7)] flex items-center justify-center border-2 border-amber-300/80 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #AA8232 0%, #E5C158 35%, #FFF0BD 65%, #8B7020 100%)',
              }}
            >
              {/* Inner Crimson Wax Center */}
              <div
                className="w-full h-full rounded-full flex items-center justify-center border border-gold-400/60 shadow-inner"
                style={{
                  background: 'linear-gradient(135deg, #8B1A24 0%, #5A0F17 50%, #35060C 100%)',
                }}
              >
                {/* Monogram P ♥ R */}
                <div className="flex items-center gap-0.5 text-gold-200 font-royal font-black text-xs sm:text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  <span>P</span>
                  <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-roseGold-400 fill-roseGold-400" />
                  <span>R</span>
                </div>
              </div>

              {/* Pulsing Aura */}
              <div className="absolute -inset-1.5 rounded-full border border-gold-300/50 animate-ping opacity-30 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* "OPEN INVITATION" BUTTON                                                  */}
        {/* ========================================================================= */}
        <div
          className={`mt-10 text-center transition-all duration-500 ${
            isOpening ? 'opacity-0 translate-y-6 pointer-events-none' : 'opacity-100 translate-y-0'
          }`}
        >
          <button
            onClick={handleOpen}
            className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 rounded-full overflow-hidden text-burgundy-950 font-bold font-royal tracking-widest text-sm sm:text-base shadow-gold-glow hover:shadow-gold-glow-lg active:scale-95 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #C59B27 0%, #ECC872 30%, #FFF0BD 50%, #D4AF37 75%, #AA8232 100%)',
            }}
          >
            {/* Shimmer Effect */}
            <span className="absolute inset-0 w-full h-full bg-white/25 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            <span className="absolute inset-1 rounded-full border border-burgundy-950/30" />

            <div className="relative flex items-center gap-3">
              <LotusIcon className="w-5 h-5 text-burgundy-950" />
              <span>OPEN INVITATION</span>
              <Sparkles className="w-5 h-5 text-burgundy-950 animate-pulse" />
            </div>
          </button>

          <p className="mt-3 font-serif italic text-xs text-gold-300/80">
            Click the seal or button to open
          </p>
        </div>
      </div>
    </div>
  );
};
