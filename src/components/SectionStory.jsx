import React from 'react';
import { FloralDivider, LotusIcon } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';
import { Sparkles, Heart } from 'lucide-react';

export const SectionStory = () => {
  const story = invitationData.story;

  return (
    <section
      id="story"
      className="relative py-24 px-4 sm:px-6 md:px-12 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FAF4EB 0%, #F4ECE0 50%, #ECE0D0 100%)',
      }}
    >
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
          <span className="font-serif italic text-xs sm:text-sm uppercase tracking-widest text-gold-700 font-semibold">
            Our Journey
          </span>
          <h2 className="font-royal text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-950">
            How Forever Began
          </h2>
          <FloralDivider className="my-3" />
          <p className="font-serif italic text-burgundy-900/80 text-base sm:text-lg">
            "Every love story is beautiful, but ours is our favorite."
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Golden Thread Line with Vertical Gold Gradient */}
          <div
            className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] shadow-[0_0_8px_rgba(212,175,55,0.4)]"
            style={{
              background: 'linear-gradient(180deg, #F3E5AB 0%, #D4AF37 30%, #AA8232 70%, #6E4815 100%)',
            }}
          />

          {/* Timeline Milestones */}
          <div className="space-y-16 md:space-y-24">
            {story.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } gap-8 md:gap-16`}
                >
                  {/* Central Node Badge with Burgundy to Wine linear gradient */}
                  <div
                    className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-gold-400 items-center justify-center text-gold-300 font-royal font-bold text-xs shadow-gold-glow z-20"
                    style={{
                      background: 'linear-gradient(135deg, #4A0E1A 0%, #2D050D 100%)',
                    }}
                  >
                    {item.step}
                  </div>

                  {/* Card Content Side with Champagne Cream Gradient */}
                  <div className="w-full md:w-1/2 text-center md:text-left">
                    <div
                      className="p-6 sm:p-8 rounded-2xl border border-gold-400/40 shadow-royal-card space-y-3 hover:border-gold-500 transition-all duration-300 group"
                      style={{
                        background: 'linear-gradient(135deg, #FFFDF9 0%, #FAF5EC 50%, #F5EDE2 100%)',
                      }}
                    >
                      <div className="flex items-center justify-center md:justify-start gap-2 text-gold-600">
                        <LotusIcon className="w-4 h-4" />
                        <span className="font-serif text-xs uppercase tracking-widest font-semibold">
                          {item.date}
                        </span>
                      </div>

                      <h3 className="font-royal text-2xl font-bold text-burgundy-950 group-hover:text-gold-700 transition-colors">
                        {item.title}
                      </h3>

                      <p className="font-serif text-sm sm:text-base text-burgundy-900/80 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Image Side */}
                  <div className="w-full md:w-1/2 flex justify-center">
                    <div
                      className="relative w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden p-1.5 shadow-royal-card group"
                      style={{
                        background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #946618 100%)',
                      }}
                    >
                      <div
                        className="w-full h-full rounded-xl overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #2D050D 0%, #150205 100%)',
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
