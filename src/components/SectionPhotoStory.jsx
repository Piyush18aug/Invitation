import React from 'react';
import { FloralDivider, LotusIcon } from './OrnamentalIcons';

export const SectionPhotoStory = () => {
  return (
    <section
      className="relative py-24 px-4 sm:px-6 md:px-12 text-ivory-100 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1A0207 0%, #350811 40%, #4A0E1A 70%, #150205 100%)',
      }}
    >
      {/* Background Mandala Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full border-[2px] border-gold-400/40 animate-spin-mandala" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-serif italic text-xs sm:text-sm uppercase tracking-widest text-gold-300 font-semibold">
            Cherished Memories
          </span>
          <h2 className="font-royal text-3xl sm:text-5xl font-bold gold-gradient-text">
            Written in the Stars
          </h2>
          <FloralDivider className="my-3" />
          <p className="font-serif italic text-ivory-200/80 text-base sm:text-lg">
            "We took a photograph to freeze the heartbeat of a memory."
          </p>
        </div>

        {/* Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Large Portrait (Photo 17) */}
          <div className="lg:col-span-7 relative group">
            <div
              className="relative aspect-[4/5] rounded-3xl overflow-hidden p-2 shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 35%, #FFF0BD 65%, #946618 100%)',
              }}
            >
              <div
                className="w-full h-full rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #2D050D 0%, #140206 100%)',
                }}
              >
                <img
                  src="/assets/images/photo_17.jpeg"
                  alt="Prathamesh and Revati"
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                {/* Gradient Shadow Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, rgba(20, 2, 6, 0.1) 0%, transparent 40%, rgba(20, 2, 6, 0.9) 100%)',
                  }}
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="font-serif italic text-xs uppercase tracking-widest text-gold-300 block">
                    Together Forever
                  </span>
                  <h3 className="font-royal text-2xl sm:text-3xl text-ivory-50 font-bold mt-1">
                    Prathamesh & Revati
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Side Editorial Stack */}
          <div className="lg:col-span-5 space-y-6">
            {/* Top Secondary Photo */}
            <div
              className="relative aspect-[16/10] rounded-2xl overflow-hidden p-1.5 shadow-xl group"
              style={{
                background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #946618 100%)',
              }}
            >
              <div
                className="w-full h-full rounded-xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #2D050D 0%, #140206 100%)',
                }}
              >
                <img
                  src="/assets/images/photo_01.jpeg"
                  alt="Joyful Moment"
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            {/* Quote Card with Diagonal Burgundy to Wine Glass Gradient */}
            <div
              className="p-6 sm:p-8 rounded-2xl border border-gold-500/30 backdrop-blur-md space-y-3"
              style={{
                background: 'linear-gradient(135deg, rgba(74, 14, 26, 0.8) 0%, rgba(35, 4, 10, 0.95) 100%)',
              }}
            >
              <div className="flex items-center gap-2 text-gold-400">
                <LotusIcon className="w-5 h-5" />
                <span className="font-sanskrit text-sm">॥ शुभ मंगलम् ॥</span>
              </div>
              <p className="font-serif italic text-ivory-200 text-sm sm:text-base leading-relaxed">
                "May your love be like a sacred flame, unwavering in the breeze of time, illuminating your path together forever."
              </p>
              <div className="pt-2 flex items-center justify-between text-xs text-gold-300/80 font-serif">
                <span>Engagement Ceremony</span>
                <span>24.10.2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
