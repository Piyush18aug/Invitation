import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, MapPin } from 'lucide-react';
import { DivineGanesha } from './DivineGanesha';
import { FloralDivider } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';
import {
  TextStagger,
  RiseAndSettle,
  OrnamentReveal,
  RoyalFlyIn,
  CINEMATIC_EASE,
} from './motion/CinematicMotion';

export const SectionFinal = ({ onTriggerCelebration }) => {
  const { event, couple, family } = invitationData;

  return (
    <section
      className="relative min-h-screen py-14 sm:py-24 px-3 sm:px-6 md:px-12 text-ivory-100 flex items-center justify-center overflow-hidden bg-royal-jaali-dark"
    >
      {/* Background Rotating Gold Shree Mandala & Ambient Radiance */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="absolute w-[400px] sm:w-[650px] h-[400px] sm:h-[650px] rounded-full bg-gold-400/15 blur-3xl animate-pulse" />
        <div className="relative w-[500px] sm:w-[700px] md:w-[1000px] h-[500px] sm:h-[700px] md:h-[1000px] opacity-25 flex items-center justify-center">
          <img
            src="/assets/images/mandala_bg.jpg"
            alt="Gold Shree Mandala Background"
            className="w-full h-full object-cover rounded-full animate-spin-mandala filter contrast-125 drop-shadow-[0_0_60px_rgba(212,175,55,0.45)]"
          />
          {/* Radial dark gradient mask */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_transparent_40%,_rgba(26,2,7,0.85)_75%,_#1A0207_100%)] pointer-events-none" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10 text-center space-y-6 sm:space-y-8 p-4 sm:p-12 transform-gpu">
        {/* Divine Ganesh Medallion */}
        <div className="flex justify-center">
          <OrnamentReveal type="scale-rotate" delay={0.1}>
            <DivineGanesha variant="medallion" />
          </OrnamentReveal>
        </div>

        {/* Sanskrit Conclusion Shloka */}
        <RiseAndSettle delay={0.2}>
          <div className="space-y-1">
            <span className="font-sanskrit text-gold-300 text-sm sm:text-xl tracking-widest block font-semibold">
              ॥ शुभं भवतु • मंगलम् भूयात् ॥
            </span>
            <p className="font-serif italic text-[11px] sm:text-sm text-gold-200/80 uppercase tracking-widest">
              "May auspiciousness prevail and happiness multiply"
            </p>
          </div>
        </RiseAndSettle>

        <FloralDivider className="my-2 sm:my-4" />

        {/* Core Emotion with Text Stagger */}
        <div className="space-y-2 sm:space-y-4 px-2">
          <TextStagger
            text="Your Presence Will Make Our Celebration Truly Special"
            tag="h2"
            className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold gold-gradient-text leading-tight tracking-wide"
            delay={0.25}
          />
          <RiseAndSettle delay={0.35}>
            <p className="font-serif italic text-ivory-200/90 text-xs sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              We eagerly look forward to welcoming you with folded hands, warm smiles, and joyful hearts.
            </p>
          </RiseAndSettle>
        </div>

        {/* Couple Names Headline: Prathamesh & Revati (Horizontal Convergence) */}
        <div className="py-2 sm:py-4 space-y-2">
          <RoyalFlyIn direction="left" distance={60} delay={0.3}>
            <h3 className="font-royal text-3xl sm:text-6xl md:text-7xl font-bold tracking-wider gold-gradient-text">
              {couple.groom.name}
            </h3>
          </RoyalFlyIn>

          <div className="flex items-center justify-center gap-2.5 sm:gap-3 py-1">
            <span className="w-8 sm:w-16 h-[1px] bg-gold-400/50" />
            <OrnamentReveal type="scale-rotate" delay={0.4}>
              <Heart className="w-5 h-5 sm:w-7 sm:h-7 text-roseGold-400 fill-roseGold-400 animate-pulse" />
            </OrnamentReveal>
            <span className="w-8 sm:w-16 h-[1px] bg-gold-400/50" />
          </div>

          <RoyalFlyIn direction="right" distance={60} delay={0.35}>
            <h3 className="font-royal text-3xl sm:text-6xl md:text-7xl font-bold tracking-wider gold-gradient-text">
              {couple.bride.name}
            </h3>
          </RoyalFlyIn>
        </div>

        {/* Event Summary Stamp with Deep Burgundy Gradient */}
        <RiseAndSettle delay={0.45}>
          <div
            className="inline-block p-4 sm:p-6 rounded-2xl border border-gold-400/50 shadow-gold-glow max-w-md mx-auto hover:scale-105 transition-transform"
            style={{
              background: 'linear-gradient(135deg, rgba(61, 10, 20, 0.92) 0%, rgba(32, 3, 8, 0.95) 100%)',
            }}
          >
            <p className="font-royal text-base sm:text-xl font-bold text-gold-200">
              {event.displayDate} • {event.time}
            </p>
            <a
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-serif text-xs sm:text-sm text-ivory-200/90 hover:text-gold-200 mt-1.5 transition-colors underline decoration-gold-400/50 hover:decoration-gold-300"
            >
              <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>{event.venue}, {event.city} — View on Google Maps</span>
            </a>
          </div>
        </RiseAndSettle>

        {/* Celebration Button with Metallic Gold Gradient */}
        <div className="pt-2 sm:pt-4 w-full max-w-xs sm:max-w-none mx-auto">
          <OrnamentReveal type="fade-glow" delay={0.5}>
            <button
              onClick={onTriggerCelebration}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-10 py-3.5 sm:py-4 rounded-full text-burgundy-950 font-royal font-bold text-xs sm:text-base tracking-widest shadow-gold-glow hover:shadow-gold-glow-lg active:scale-95 transition-all duration-300 touch-manipulation min-h-[48px]"
              style={{
                background: 'linear-gradient(135deg, #C59B27 0%, #ECC872 30%, #FFF0BD 50%, #D4AF37 75%, #AA8232 100%)',
              }}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-burgundy-950 mr-2 animate-spin-slow" />
              <span>SHOWER BLESSINGS & CELEBRATE</span>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-burgundy-950 ml-2 animate-bounce" />
            </button>
          </OrnamentReveal>
        </div>

        {/* Signoff */}
        <RiseAndSettle delay={0.55}>
          <div className="pt-6 sm:pt-8 border-t border-gold-500/20 text-center space-y-2">
            <p className="font-script text-2xl sm:text-4xl text-gold-300">
              With Love,
            </p>
            <p className="font-royal text-sm sm:text-lg text-gold-200 font-bold tracking-widest uppercase">
              Navangul Family & Erande Family
            </p>
          </div>
        </RiseAndSettle>

        {/* Creator Attribution & LinkedIn Profile */}
        <RiseAndSettle delay={0.65}>
          <div className="pt-8 pb-3 flex flex-col items-center justify-center gap-2">
            <a
              href="https://www.linkedin.com/in/piyush-navangul-4aba1127b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Piyush Navangul LinkedIn Profile"
              className="group inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full border border-gold-400/40 bg-burgundy-950/70 hover:bg-burgundy-900/90 hover:border-gold-300 text-gold-200 hover:text-gold-100 transition-all duration-300 shadow-md hover:shadow-gold-glow active:scale-95"
            >
              <span className="font-royal text-xs sm:text-sm font-semibold tracking-wider">
                Made by Piyush Navangul
              </span>
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#0A66C2] text-white p-0.5 group-hover:scale-110 transition-transform shadow">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </span>
            </a>
          </div>
        </RiseAndSettle>
      </div>
    </section>
  );
};

export default SectionFinal;
