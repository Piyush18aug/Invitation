import React from 'react';
import { motion } from 'framer-motion';
import { DivineGanesha } from './DivineGanesha';
import { DiyaIcon, CornerOrnament, FloralDivider, LotusIcon } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';
import {
  Layered3DCard,
  TextStagger,
  OrnamentReveal,
  RiseAndSettle,
} from './motion/CinematicMotion';

export const SectionInvitation = () => {
  return (
    <section
      id="invitation"
      className="relative min-h-screen py-10 sm:py-20 px-3 sm:px-6 md:px-12 flex items-center justify-center overflow-hidden bg-royal-jaali-light"
    >
      {/* Background Palace Arch & Mandala Ambient Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(255,240,189,0.35)_0%,_transparent_70%)]" />
        <img
          src="/assets/images/palace_arch.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-[0.035] mix-blend-multiply filter contrast-125"
        />
        {/* Slow Rotating Golden Shree Mandala Watermark */}
        <div className="relative w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] md:w-[950px] md:h-[950px] opacity-[0.08] mix-blend-multiply flex items-center justify-center">
          <img
            src="/assets/images/mandala_bg.jpg"
            alt=""
            className="w-full h-full object-cover rounded-full animate-spin-mandala"
          />
        </div>
      </div>

      {/* Decorative Traditional Toran at the top */}
      <div className="absolute top-0 inset-x-0 h-10 sm:h-12 flex justify-center items-center pointer-events-none opacity-85 z-10">
        <div className="w-full max-w-4xl flex items-center justify-around">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="w-[1.5px] h-4 sm:h-6 bg-gradient-to-b from-gold-600 to-amber-500" />
              <div
                className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full shadow-sm animate-float-gentle"
                style={{
                  background: 'linear-gradient(135deg, #D97706 0%, #F59E0B 50%, #FCD34D 100%)',
                  animationDelay: `${i * 0.25}s`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Royal Invitation Parchment Card (Animation B: Layered 3D Entrance) */}
      <div className="relative w-full max-w-3xl mx-auto">
        <Layered3DCard tilt={7} duration={0.95}>
          <div
            className="relative w-full p-5 sm:p-12 md:p-16 rounded-3xl border-2 border-gold-400/60 shadow-royal-card hover:border-gold-500 hover:shadow-gold-glow overflow-hidden transition-all duration-300 transform-gpu"
            style={{
              background: 'linear-gradient(135deg, #FFFDF9 0%, #FAF5EC 50%, #F3EAE0 100%)',
            }}
          >
            {/* Subtle Background Shree Mandala Watermark inside card */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.045] pointer-events-none">
              <img
                src="/assets/images/mandala_bg.jpg"
                alt=""
                className="w-[350px] sm:w-[520px] h-[350px] sm:h-[520px] rounded-full object-cover animate-spin-mandala"
              />
            </div>

            {/* Four Corner Ornaments (Animation G: Ornament Reveal) */}
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
              <OrnamentReveal type="scale-rotate" delay={0.35}>
                <CornerOrnament className="w-8 h-8 sm:w-16 sm:h-16" />
              </OrnamentReveal>
            </div>
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 rotate-90">
              <OrnamentReveal type="scale-rotate" delay={0.4}>
                <CornerOrnament className="w-8 h-8 sm:w-16 sm:h-16" />
              </OrnamentReveal>
            </div>
            <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 -rotate-90">
              <OrnamentReveal type="scale-rotate" delay={0.45}>
                <CornerOrnament className="w-8 h-8 sm:w-16 sm:h-16" />
              </OrnamentReveal>
            </div>
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 rotate-180">
              <OrnamentReveal type="scale-rotate" delay={0.5}>
                <CornerOrnament className="w-8 h-8 sm:w-16 sm:h-16" />
              </OrnamentReveal>
            </div>

            {/* Card Content */}
            <div className="relative z-10 text-center space-y-4 sm:space-y-6">
              {/* Divine Ganpati Shrine & Shloka */}
              <RiseAndSettle delay={0.15}>
                <DivineGanesha variant="full" className="mb-1 sm:mb-2" />
              </RiseAndSettle>

              <FloralDivider className="my-2 sm:my-3" />

              {/* Blessing Pre-title */}
              <RiseAndSettle delay={0.25} blur={false}>
                <span className="font-serif italic text-[11px] sm:text-sm uppercase tracking-widest text-burgundy-900 font-semibold drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                  {invitationData.event.blessingText}
                </span>
              </RiseAndSettle>

              {/* Couple Names Headline: Prathamesh & Revati with Animation J: Text Stagger */}
              <div className="py-1 sm:py-2 space-y-1 sm:space-y-2">
                <TextStagger
                  text={invitationData.couple.groom.name}
                  tag="h2"
                  className="font-royal text-2xl sm:text-5xl md:text-6xl font-bold tracking-wide text-burgundy-950 drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]"
                  delay={0.2}
                />
                <div className="flex items-center justify-center gap-3 sm:gap-4">
                  <span className="w-8 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
                  <span className="font-script text-2xl sm:text-4xl text-roseGold-500 font-semibold animate-pulse">&</span>
                  <span className="w-8 sm:w-20 h-[1px] bg-gradient-to-l from-transparent via-gold-500 to-transparent" />
                </div>
                <TextStagger
                  text={invitationData.couple.bride.name}
                  tag="h2"
                  className="font-royal text-2xl sm:text-5xl md:text-6xl font-bold tracking-wide text-burgundy-950 drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]"
                  delay={0.35}
                />
              </div>

              {/* Cordial Invitation Text */}
              <RiseAndSettle delay={0.35}>
                <p className="font-serif text-xs sm:text-base md:text-lg text-burgundy-900 font-medium max-w-lg mx-auto leading-relaxed drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)] px-2">
                  cordially invite you to grace the auspicious occasion of their
                </p>
              </RiseAndSettle>

              {/* Event Badge with Deep Burgundy Linear Gradient */}
              <RiseAndSettle delay={0.45}>
                <div
                  className="inline-block px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-gold-400/50 shadow-md hover:scale-105 transition-transform"
                  style={{
                    background: 'linear-gradient(135deg, #3B0A14 0%, #520E1C 50%, #25040A 100%)',
                  }}
                >
                  <span className="font-royal text-sm sm:text-xl font-bold tracking-wider gold-gradient-text uppercase">
                    {invitationData.event.title}
                  </span>
                  <span className="block font-sanskrit text-[11px] sm:text-xs text-gold-300 tracking-widest mt-0.5">
                    ({invitationData.event.marathiTitle})
                  </span>
                </div>
              </RiseAndSettle>

              {/* Diyas at the bottom of the card */}
              <div className="pt-3 sm:pt-4 flex justify-between items-center px-2 sm:px-4">
                <OrnamentReveal type="scale-rotate" delay={0.5}>
                  <DiyaIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                </OrnamentReveal>
                <div className="flex items-center gap-1.5 sm:gap-2 text-gold-700 text-[11px] sm:text-xs font-serif italic">
                  <LotusIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>शुभ मुहूर्त</span>
                  <LotusIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <OrnamentReveal type="scale-rotate" delay={0.5}>
                  <DiyaIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                </OrnamentReveal>
              </div>
            </div>
          </div>
        </Layered3DCard>
      </div>
    </section>
  );
};

export default SectionInvitation;
