import React from 'react';
import { FloralDivider, LotusIcon } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';

export const SectionCeremony = () => {
  const schedule = invitationData.schedule;

  return (
    <section
      id="ceremony"
      className="relative py-24 px-4 sm:px-6 md:px-12 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FAF5ED 0%, #F4EBE0 50%, #ECE0CF 100%)',
      }}
    >
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-serif italic text-xs sm:text-sm uppercase tracking-widest text-gold-700 font-semibold">
            Order of Celebration
          </span>
          <h2 className="font-royal text-3xl sm:text-5xl font-bold text-burgundy-950">
            Ceremony & Auspicious Schedule
          </h2>
          <FloralDivider className="my-3" />
          <p className="font-serif italic text-burgundy-900/80 text-base sm:text-lg">
            "Join us as we perform sacred rituals and exchange promises of a lifetime."
          </p>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {schedule.map((item, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl border border-gold-400/50 shadow-royal-card hover:border-gold-500 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              style={{
                background: 'linear-gradient(135deg, #FFFDF9 0%, #FAF6EE 50%, #F5EDE2 100%)',
              }}
            >
              {/* Top Time Pill with Burgundy Gradient */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className="px-3 py-1 rounded-full text-gold-200 font-mono text-xs font-bold shadow-sm border border-gold-400/30"
                  style={{
                    background: 'linear-gradient(135deg, #4A0E1A 0%, #25040A 100%)',
                  }}
                >
                  {item.time}
                </span>
                <LotusIcon className="w-5 h-5 text-gold-500 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Title & Marathi */}
              <div className="space-y-2">
                <h3 className="font-royal text-lg font-bold text-burgundy-950">
                  {item.title}
                </h3>
                <span className="font-sanskrit text-xs text-gold-700 font-semibold block">
                  {item.marathi}
                </span>
                <p className="font-serif text-xs sm:text-sm text-burgundy-800/80 leading-relaxed pt-1">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Decorative Line */}
              <div className="mt-6 pt-3 border-t border-gold-300/30 flex justify-between items-center text-gold-500 text-xs">
                <span>Phase 0{idx + 1}</span>
                <span>✦</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
