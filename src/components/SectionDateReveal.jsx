import React from 'react';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import { FloralDivider, DiyaIcon, LotusIcon, CornerOrnament } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';

export const SectionDateReveal = () => {
  const { event } = invitationData;

  return (
    <section id="date" className="relative py-24 px-4 sm:px-6 md:px-12 bg-paper-texture overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-serif italic text-xs sm:text-sm uppercase tracking-widest text-gold-700 font-semibold">
            Mark Your Calendar
          </span>
          <h2 className="font-royal text-3xl sm:text-5xl font-bold text-burgundy-950">
            Save The Auspicious Date
          </h2>
          <FloralDivider className="my-3" />
        </div>

        {/* Date Calendar Monumental Card */}
        <div className="relative p-8 sm:p-12 md:p-16 rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EC] to-[#F5EFEB] border-2 border-gold-400 shadow-royal-card text-center">
          {/* Corner Ornaments */}
          <div className="absolute top-3 left-3">
            <CornerOrnament className="w-12 h-12" />
          </div>
          <div className="absolute top-3 right-3 rotate-90">
            <CornerOrnament className="w-12 h-12" />
          </div>
          <div className="absolute bottom-3 left-3 -rotate-90">
            <CornerOrnament className="w-12 h-12" />
          </div>
          <div className="absolute bottom-3 right-3 rotate-180">
            <CornerOrnament className="w-12 h-12" />
          </div>

          {/* Sanskrit Header Tag */}
          <div className="inline-block px-5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-700 font-sanskrit text-sm mb-6">
            ॥ शुभ विवाह निश्चिती / वाङ्निश्चय ॥
          </div>

          {/* Date Grid Presentation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center my-6">
            {/* Day */}
            <div className="p-4 rounded-2xl bg-white/60 border border-gold-300/40">
              <span className="font-serif text-xs uppercase tracking-widest text-burgundy-800/70 block">
                Day
              </span>
              <span className="font-royal text-2xl sm:text-3xl font-bold text-burgundy-950">
                {event.day}
              </span>
            </div>

            {/* Giant Number */}
            <div className="relative p-6 rounded-3xl bg-gradient-to-b from-burgundy-900 to-burgundy-950 border-2 border-gold-400 text-gold-200 shadow-gold-glow">
              <span className="font-serif text-xs uppercase tracking-widest text-gold-400 block mb-1">
                Auspicious Day
              </span>
              <span className="font-royal text-6xl sm:text-7xl md:text-8xl font-black gold-gradient-text tracking-tight block">
                {event.dayNum}
              </span>
              <span className="font-royal text-lg sm:text-xl font-bold tracking-widest text-gold-300 block mt-1">
                {event.month} {event.year}
              </span>
            </div>

            {/* Time */}
            <div className="p-4 rounded-2xl bg-white/60 border border-gold-300/40">
              <span className="font-serif text-xs uppercase tracking-widest text-burgundy-800/70 block">
                Muhurat Time
              </span>
              <span className="font-royal text-2xl sm:text-3xl font-bold text-burgundy-950">
                {event.time}
              </span>
              <span className="text-xs font-sanskrit text-gold-700 block mt-0.5">
                (सकाळी ११:०० वा.)
              </span>
            </div>
          </div>

          {/* Muhurat & Venue footer within card */}
          <div className="mt-8 pt-6 border-t border-gold-300/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-burgundy-900 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold-600" />
              <span className="font-medium">{event.timeDetail}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold-600" />
              <span className="font-medium">{event.venue}, {event.city}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
