import React from 'react';
import { GaneshaIcon, DiyaIcon, CornerOrnament, FloralDivider, LotusIcon } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';

export const SectionInvitation = () => {
  return (
    <section id="invitation" className="relative min-h-screen py-20 px-4 sm:px-6 md:px-12 flex items-center justify-center bg-paper-texture overflow-hidden">
      {/* Decorative Traditional Toran at the top */}
      <div className="absolute top-0 inset-x-0 h-12 flex justify-center items-center pointer-events-none opacity-85 z-10">
        <div className="w-full max-w-4xl flex items-center justify-around">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="w-[1.5px] h-6 bg-gradient-to-b from-gold-600 to-amber-500" />
              <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 shadow-sm animate-float-gentle" style={{ animationDelay: `${i * 0.25}s` }} />
            </div>
          ))}
        </div>
      </div>

      {/* Main Royal Invitation Parchment Card */}
      <div className="relative w-full max-w-3xl mx-auto p-6 sm:p-12 md:p-16 rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F7EFE4] border-2 border-gold-400/60 shadow-royal-card overflow-hidden">
        {/* Subtle Background Mandala Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full border-[30px] border-gold-600 animate-spin-mandala" />
        </div>

        {/* Four Corner Ornaments */}
        <div className="absolute top-3 left-3">
          <CornerOrnament className="w-12 h-12 sm:w-16 sm:h-16" />
        </div>
        <div className="absolute top-3 right-3 rotate-90">
          <CornerOrnament className="w-12 h-12 sm:w-16 sm:h-16" />
        </div>
        <div className="absolute bottom-3 left-3 -rotate-90">
          <CornerOrnament className="w-12 h-12 sm:w-16 sm:h-16" />
        </div>
        <div className="absolute bottom-3 right-3 rotate-180">
          <CornerOrnament className="w-12 h-12 sm:w-16 sm:h-16" />
        </div>

        {/* Card Content */}
        <div className="relative z-10 text-center space-y-6">
          {/* Ganesh Shloka */}
          <div className="flex flex-col items-center justify-center">
            <GaneshaIcon className="w-12 h-12 sm:w-14 sm:h-14 text-gold-600 mb-2 drop-shadow-sm" />
            <p className="font-sanskrit text-gold-700 text-sm sm:text-base tracking-wider font-semibold">
              {invitationData.event.sanskritMotto}
            </p>
            <p className="font-sanskrit text-burgundy-900/80 text-xs sm:text-sm mt-1 max-w-md mx-auto leading-relaxed">
              ॥ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
            </p>
          </div>

          <FloralDivider className="my-3" />

          {/* Blessing Pre-title */}
          <div>
            <span className="font-serif italic text-xs sm:text-sm uppercase tracking-widest text-burgundy-800/80 font-medium">
              {invitationData.event.blessingText}
            </span>
          </div>

          {/* Couple Names Headline: Prathamesh & Revati */}
          <div className="py-2 space-y-2">
            <h2 className="font-royal text-3xl sm:text-5xl md:text-6xl font-bold tracking-wide text-burgundy-950">
              {invitationData.couple.groom.name}
            </h2>
            <div className="flex items-center justify-center gap-4">
              <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
              <span className="font-script text-3xl sm:text-4xl text-roseGold-500 font-semibold">&</span>
              <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent via-gold-500 to-transparent" />
            </div>
            <h2 className="font-royal text-3xl sm:text-5xl md:text-6xl font-bold tracking-wide text-burgundy-950">
              {invitationData.couple.bride.name}
            </h2>
          </div>

          {/* Cordial Invitation Text */}
          <p className="font-serif text-sm sm:text-base md:text-lg text-burgundy-900/90 max-w-lg mx-auto leading-relaxed">
            cordially invite you to grace the auspicious occasion of their
          </p>

          {/* Event Badge */}
          <div className="inline-block px-6 py-2.5 rounded-full bg-gradient-to-r from-burgundy-900 via-burgundy-800 to-burgundy-900 border border-gold-400/50 shadow-md">
            <span className="font-royal text-base sm:text-xl font-bold tracking-wider gold-gradient-text uppercase">
              {invitationData.event.title}
            </span>
            <span className="block font-sanskrit text-xs text-gold-300 tracking-widest">
              ({invitationData.event.marathiTitle})
            </span>
          </div>

          {/* Date & Time Highlights */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-burgundy-900">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-500" />
              <span className="font-serif font-bold text-sm sm:text-base tracking-wider">
                {invitationData.event.displayDate}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-500" />
              <span className="font-serif font-bold text-sm sm:text-base tracking-wider">
                {invitationData.event.time}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-500" />
              <span className="font-serif font-bold text-sm sm:text-base tracking-wider">
                {invitationData.event.venue}, Sangli
              </span>
            </div>
          </div>

          {/* Diyas at the bottom of the card */}
          <div className="pt-4 flex justify-between items-center px-4">
            <DiyaIcon className="w-8 h-8" />
            <div className="flex items-center gap-2 text-gold-600 text-xs font-serif italic">
              <LotusIcon className="w-4 h-4" />
              <span>शुभ मुहूर्त • ११:०० वा.</span>
              <LotusIcon className="w-4 h-4" />
            </div>
            <DiyaIcon className="w-8 h-8" />
          </div>
        </div>
      </div>
    </section>
  );
};
