import React from 'react';
import { motion } from 'framer-motion';
import { FloralDivider, LotusIcon } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';
import { Sparkles, Heart } from 'lucide-react';
import {
  TextStagger,
  RiseAndSettle,
  ImageMaskReveal,
  CINEMATIC_EASE,
} from './motion/CinematicMotion';

export const SectionStory = () => {
  const story = invitationData.story;

  return (
    <section
      id="story"
      className="relative pt-4 sm:pt-8 pb-14 sm:pb-24 px-3 sm:px-6 md:px-12 overflow-hidden bg-paper-texture-sand"
    >
      {/* Background Subtle Gold Mandala Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
        <div className="w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] rounded-full border-[20px] border-gold-600 animate-spin-mandala" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2 sm:space-y-3 px-2">
          <RiseAndSettle delay={0.1}>
            <span className="font-serif italic text-xs sm:text-sm uppercase tracking-widest text-gold-700 font-semibold">
              Our Journey
            </span>
          </RiseAndSettle>

          <TextStagger
            text="How Forever Began"
            tag="h2"
            className="font-royal text-2xl sm:text-4xl md:text-5xl font-bold text-burgundy-950"
            delay={0.2}
          />

          <FloralDivider className="my-2 sm:my-3" />
          <RiseAndSettle delay={0.35}>
            <p className="font-serif italic text-burgundy-900/80 text-sm sm:text-lg">
              "Every love story is beautiful, but ours is our favorite."
            </p>
          </RiseAndSettle>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Golden Thread Line for Desktop */}
          <div
            className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] shadow-[0_0_8px_rgba(212,175,55,0.4)]"
            style={{
              background: 'linear-gradient(180deg, #F3E5AB 0%, #D4AF37 30%, #AA8232 70%, #6E4815 100%)',
            }}
          />

          {/* Timeline Milestones */}
          <div className="space-y-10 sm:space-y-16 md:space-y-24">
            {story.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 35, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.8, ease: CINEMATIC_EASE }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  } gap-6 sm:gap-10 md:gap-16 transform-gpu`}
                >
                  {/* Central Node Badge with Ornamental Sacred Lotus Icon for Desktop */}
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: 'backOut' }}
                    className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-11 h-11 rounded-full border-2 border-gold-400 items-center justify-center text-gold-300 shadow-gold-glow z-20"
                    style={{
                      background: 'linear-gradient(135deg, #4A0E1A 0%, #2D050D 100%)',
                    }}
                  >
                    <LotusIcon className="w-5 h-5 text-gold-300" />
                  </motion.div>

                  {/* Card Content Side (Animation E: Horizontal Fly-In) */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 60 : -60, scale: 0.94 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.85, delay: 0.1, ease: CINEMATIC_EASE }}
                    className="w-full md:w-1/2 text-left transform-gpu"
                  >
                    <div
                      className="p-5 sm:p-8 rounded-3xl border border-gold-400/40 shadow-royal-card space-y-2.5 sm:space-y-3 hover:border-gold-500 hover:-translate-y-1 hover:shadow-gold-glow transition-all duration-300 group"
                      style={{
                        background: 'linear-gradient(135deg, #FFFDF9 0%, #FAF5EC 50%, #F5EDE2 100%)',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 sm:gap-2 text-gold-700">
                          <LotusIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span className="font-serif text-[11px] sm:text-xs uppercase tracking-widest font-semibold">
                            {item.date}
                          </span>
                        </div>
                        <span className="text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-gold-400/15 border border-gold-500/30 text-gold-800">
                          CHAPTER {item.step}
                        </span>
                      </div>

                      <h3 className="font-royal text-xl sm:text-2xl font-bold text-burgundy-950 group-hover:text-gold-700 transition-colors">
                        {item.title}
                      </h3>

                      <p className="font-serif text-xs sm:text-base text-burgundy-900/85 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Image Side with Animation H: ImageMaskReveal */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -60 : 60, scale: 0.94 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.85, delay: 0.18, ease: CINEMATIC_EASE }}
                    className="w-full md:w-1/2 flex justify-center transform-gpu"
                  >
                    <div className="relative w-full max-w-sm aspect-[4/5] sm:aspect-[4/5] max-h-[440px]">
                      <ImageMaskReveal
                        src={item.image}
                        alt={item.title}
                        shape="rect"
                        objectPosition={item.objectPosition || 'center center'}
                        className="w-full h-full shadow-royal-card hover:shadow-2xl transition-shadow duration-500"
                        delay={0.2}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionStory;
