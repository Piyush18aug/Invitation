import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { FloralDivider, LotusIcon, DiyaIcon } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';

export const SectionCouple = () => {
  const { bride, groom } = invitationData.couple;

  return (
    <section id="couple" className="relative py-24 px-4 sm:px-6 md:px-12 bg-ivory-gradient overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-roseGold-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-serif italic text-xs sm:text-sm uppercase tracking-widest text-gold-700 font-semibold">
            Meet The Couple
          </span>
          <h2 className="font-royal text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-950">
            Two Hearts. One Journey.
          </h2>
          <FloralDivider className="my-3" />
          <p className="font-serif italic text-burgundy-900/80 text-base sm:text-lg">
            "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
          </p>
        </div>

        {/* Couple Portraits Grid (Groom First, Bride Second) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Groom Card: Prathamesh */}
          <div className="group relative flex flex-col items-center text-center">
            {/* Arch Portrait Frame */}
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-t-[140px] rounded-b-2xl overflow-hidden p-2.5 bg-gradient-to-b from-gold-300 via-gold-500 to-amber-700 shadow-royal-card transition-transform duration-500 group-hover:-translate-y-2">
              {/* Inner Frame */}
              <div className="relative w-full h-full rounded-t-[130px] rounded-b-xl overflow-hidden bg-burgundy-950">
                <img
                  src={groom.image}
                  alt={groom.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.03]"
                />
                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/80 via-transparent to-transparent" />

                {/* Bottom Tag */}
                <div className="absolute bottom-4 inset-x-0 text-center">
                  <span className="inline-block px-4 py-1 rounded-full bg-gold-500/20 backdrop-blur-md border border-gold-400/40 text-xs font-serif uppercase tracking-widest text-gold-200">
                    {groom.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="mt-6 space-y-2 max-w-xs">
              <h3 className="font-royal text-3xl font-bold text-burgundy-950 tracking-wide">
                {groom.name}
              </h3>
              <p className="font-serif text-sm text-burgundy-800/80 leading-relaxed italic">
                "{groom.bio}"
              </p>
            </div>
          </div>

          {/* Bride Card: Revati */}
          <div className="group relative flex flex-col items-center text-center">
            {/* Arch Portrait Frame */}
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-t-[140px] rounded-b-2xl overflow-hidden p-2.5 bg-gradient-to-b from-gold-300 via-gold-500 to-amber-700 shadow-royal-card transition-transform duration-500 group-hover:-translate-y-2">
              {/* Inner Frame */}
              <div className="relative w-full h-full rounded-t-[130px] rounded-b-xl overflow-hidden bg-burgundy-950">
                <img
                  src={bride.image}
                  alt={bride.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.03]"
                />
                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/80 via-transparent to-transparent" />

                {/* Bottom Tag */}
                <div className="absolute bottom-4 inset-x-0 text-center">
                  <span className="inline-block px-4 py-1 rounded-full bg-gold-500/20 backdrop-blur-md border border-gold-400/40 text-xs font-serif uppercase tracking-widest text-gold-200">
                    {bride.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="mt-6 space-y-2 max-w-xs">
              <h3 className="font-royal text-3xl font-bold text-burgundy-950 tracking-wide">
                {bride.name}
              </h3>
              <p className="font-serif text-sm text-burgundy-800/80 leading-relaxed italic">
                "{bride.bio}"
              </p>
            </div>
          </div>
        </div>

        {/* Center Connecting Motif */}
        <div className="mt-12 flex justify-center items-center gap-4 text-gold-600">
          <DiyaIcon className="w-8 h-8" />
          <div className="flex items-center gap-2">
            <span className="w-8 h-[1px] bg-gold-400" />
            <Heart className="w-5 h-5 text-roseGold-500 fill-roseGold-500 animate-pulse" />
            <span className="w-8 h-[1px] bg-gold-400" />
          </div>
          <DiyaIcon className="w-8 h-8" />
        </div>
      </div>
    </section>
  );
};
