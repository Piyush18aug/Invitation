import React, { useState, useEffect } from 'react';
import { FloralDivider, DiyaIcon } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';

export const SectionCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(invitationData.event.isoDateTime).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'DAYS', marathi: 'दिवस', value: timeLeft.days },
    { label: 'HOURS', marathi: 'तास', value: timeLeft.hours },
    { label: 'MINUTES', marathi: 'मिनिटे', value: timeLeft.minutes },
    { label: 'SECONDS', marathi: 'सेकंद', value: timeLeft.seconds },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 md:px-12 bg-burgundy-texture text-ivory-100 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-serif italic text-xs sm:text-sm uppercase tracking-widest text-gold-300 font-semibold">
            The Countdown
          </span>
          <h2 className="font-royal text-3xl sm:text-5xl font-bold gold-gradient-text">
            Counting Every Sacred Moment
          </h2>
          <FloralDivider className="my-3" />
          <p className="font-serif italic text-ivory-200/80 text-base sm:text-lg">
            "Until two souls embark on their eternal journey together."
          </p>
        </div>

        {/* Countdown Dials */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {timeUnits.map((unit, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-burgundy-900 via-burgundy-950 to-burgundy-950 border border-gold-400/50 shadow-gold-glow flex flex-col items-center justify-center group hover:border-gold-400 transition-all duration-300"
            >
              {/* Corner accent */}
              <span className="absolute top-2 right-2 text-gold-500/40 text-xs">✦</span>

              {/* Number with Rolling Transition */}
              <span className="font-royal text-4xl sm:text-6xl font-black gold-gradient-text tracking-tight block">
                {String(unit.value).padStart(2, '0')}
              </span>

              {/* English Label */}
              <span className="font-serif text-xs sm:text-sm uppercase tracking-widest text-gold-200/90 font-bold mt-2">
                {unit.label}
              </span>

              {/* Marathi Sub-label */}
              <span className="font-sanskrit text-xs text-gold-400/60 mt-0.5">
                {unit.marathi}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Diya Accent */}
        <div className="mt-12 flex justify-center items-center gap-4">
          <DiyaIcon className="w-8 h-8" />
          <span className="text-xs text-gold-300 uppercase tracking-widest font-serif font-medium">
            24 October 2026 • 11:00 AM IST
          </span>
          <DiyaIcon className="w-8 h-8" />
        </div>
      </div>
    </section>
  );
};
