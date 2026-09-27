import React from 'react';
import { FloralDivider, LotusIcon } from './OrnamentalIcons';

export const SectionPhotoStory = () => {
  return (
    <section className="relative py-24 px-4 sm:px-6 md:px-12 bg-burgundy-texture text-ivory-100 overflow-hidden">
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
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden p-2 bg-gradient-to-tr from-gold-500 via-amber-400 to-gold-600 shadow-2xl">
              <div className="w-full h-full rounded-2xl overflow-hidden bg-burgundy-950">
                <img
                  src="/assets/images/photo_17.jpeg"
                  alt="Prathamesh and Revati"
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/80 via-transparent to-transparent" />
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
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden p-1.5 bg-gradient-to-tr from-gold-400 to-amber-600 shadow-xl group">
              <div className="w-full h-full rounded-xl overflow-hidden bg-burgundy-950">
                <img
                  src="/assets/images/photo_01.jpeg"
                  alt="Joyful Moment"
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            {/* Quote Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-burgundy-900/80 border border-gold-500/30 backdrop-blur-md space-y-3">
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
