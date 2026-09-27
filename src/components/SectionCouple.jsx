import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { FloralDivider, LotusIcon, DiyaIcon } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';

export const SectionCouple = () => {
  const { bride, groom } = invitationData.couple;

  return (
    <section
      id="couple"
      className="relative py-24 px-4 sm:px-6 md:px-12 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FBF8F2 0%, #F5EAE0 50%, #ECE0D0 100%)',
      }}
    >
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
            {/* Arch Portrait Frame with Metallic Antique Gold Linear Gradient */}
            <div
              className="relative w-full max-w-sm aspect-[4/5] rounded-t-[140px] rounded-b-2xl overflow-hidden p-2.5 shadow-royal-card transition-transform duration-500 group-hover:-translate-y-2"
              style={{
                background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 35%, #FFF0BD 65%, #946618 100%)',
              }}
            >
              {/* Inner Frame with Dark Burgundy Gradient */}
              <div
                className="relative w-full h-full rounded-t-[130px] rounded-b-xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #2D050D 0%, #170206 100%)',
                }}
              >
                <img
                  src={groom.image}
                  alt={groom.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.03]"
                />
                {/* Gradient Shadow Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, transparent 40%, rgba(35, 4, 10, 0.85) 100%)',
                  }}
                />

                {/* Bottom Tag */}
                <div className="absolute bottom-4 inset-x-0 text-center">
                  <span
                    className="inline-block px-4 py-1 rounded-full backdrop-blur-md border border-gold-400/40 text-xs font-serif uppercase tracking-widest text-gold-200"
                    style={{
                      background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.25) 0%, rgba(59, 10, 20, 0.4) 100%)',
                    }}
                  >
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
            {/* Arch Portrait Frame with Metallic Antique Gold Linear Gradient */}
            <div
              className="relative w-full max-w-sm aspect-[4/5] rounded-t-[140px] rounded-b-2xl overflow-hidden p-2.5 shadow-royal-card transition-transform duration-500 group-hover:-translate-y-2"
              style={{
                background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 35%, #FFF0BD 65%, #946618 100%)',
              }}
            >
              {/* Inner Frame */}
              <div
                className="relative w-full h-full rounded-t-[130px] rounded-b-xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #2D050D 0%, #170206 100%)',
                }}
              >
                <img
                  src={bride.image}
                  alt={bride.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.03]"
                />
                {/* Gradient Shadow Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, transparent 40%, rgba(35, 4, 10, 0.85) 100%)',
                  }}
                />

                {/* Bottom Tag */}
                <div className="absolute bottom-4 inset-x-0 text-center">
                  <span
                    className="inline-block px-4 py-1 rounded-full backdrop-blur-md border border-gold-400/40 text-xs font-serif uppercase tracking-widest text-gold-200"
                    style={{
                      background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.25) 0%, rgba(59, 10, 20, 0.4) 100%)',
                    }}
                  >
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
