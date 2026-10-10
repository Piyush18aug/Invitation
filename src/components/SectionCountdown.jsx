import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FloralDivider, DiyaIcon } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';
import {
  TextStagger,
  RiseAndSettle,
  Layered3DCard,
  OrnamentReveal,
  CINEMATIC_EASE,
} from './motion/CinematicMotion';

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
    <section
      className="relative py-14 sm:py-24 px-3 sm:px-6 md:px-12 text-ivory-100 overflow-hidden bg-burgundy-texture"
    >
      {/* Background Rotating Gold Shree Mandala & Ambient Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="relative w-[500px] sm:w-[700px] md:w-[900px] h-[500px] sm:h-[700px] md:h-[900px] opacity-25 flex items-center justify-center">
          <img
            src="/assets/images/mandala_bg.jpg"
            alt="Gold Shree Mandala Background"
            className="w-full h-full object-cover rounded-full animate-spin-mandala filter contrast-125 drop-shadow-[0_0_50px_rgba(212,175,55,0.4)]"
          />
          {/* Radial mask to blend naturally with dark burgundy */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_transparent_45%,_rgba(21,2,5,0.85)_80%,_#150205_100%)] pointer-events-none" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-10 sm:mb-16 space-y-2 sm:space-y-3 px-2">
          <RiseAndSettle delay={0.1}>
            <span className="font-serif italic text-xs sm:text-sm uppercase tracking-widest text-gold-300 font-semibold">
              The Countdown
            </span>
          </RiseAndSettle>

          <TextStagger
            text="Counting Every Sacred Moment"
            tag="h2"
            className="font-royal text-2xl sm:text-5xl font-bold gold-gradient-text"
            delay={0.2}
          />

          <FloralDivider className="my-2 sm:my-3" />
          <RiseAndSettle delay={0.35}>
            <p className="font-serif italic text-ivory-200/80 text-sm sm:text-lg">
              "Until two souls embark on their eternal journey together."
            </p>
          </RiseAndSettle>
        </div>

        {/* Countdown Dials with Layered 3D Perspective Pop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto">
          {timeUnits.map((unit, idx) => (
            <Layered3DCard
              key={idx}
              delay={idx * 0.1}
              tilt={idx < 2 ? 7 : -7}
              duration={0.7}
            >
              <div
                className="relative p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-gold-400/50 shadow-gold-glow flex flex-col items-center justify-center group hover:border-gold-300 transition-all duration-300 transform-gpu"
                style={{
                  background: 'linear-gradient(135deg, #3D0A14 0%, #29040C 60%, #170206 100%)',
                }}
              >
                {/* Corner accent */}
                <span className="absolute top-2 right-2 text-gold-500/40 text-xs">✦</span>

                {/* Number */}
                <span className="font-royal text-3xl sm:text-6xl font-black gold-gradient-text tracking-tight block">
                  {String(unit.value).padStart(2, '0')}
                </span>

                {/* English Label */}
                <span className="font-serif text-[10px] sm:text-sm uppercase tracking-widest text-gold-200/90 font-bold mt-1 sm:mt-2">
                  {unit.label}
                </span>

                {/* Marathi Sub-label */}
                <span className="font-sanskrit text-[10px] sm:text-xs text-gold-400/60 mt-0.5">
                  {unit.marathi}
                </span>
              </div>
            </Layered3DCard>
          ))}
        </div>

        {/* Bottom Diya Accent */}
        <div className="mt-8 sm:mt-12 flex justify-center items-center gap-3 sm:gap-4 px-2">
          <OrnamentReveal type="scale-rotate" delay={0.4}>
            <DiyaIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          </OrnamentReveal>
          <RiseAndSettle delay={0.45}>
            <span className="text-[11px] sm:text-xs text-gold-300 uppercase tracking-widest font-serif font-medium">
              24 October 2026 • 10:00 AM IST (शुभ मुहूर्त 11:00 AM)
            </span>
          </RiseAndSettle>
          <OrnamentReveal type="scale-rotate" delay={0.4}>
            <DiyaIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          </OrnamentReveal>
        </div>
      </div>
    </section>
  );
};

export default SectionCountdown;
