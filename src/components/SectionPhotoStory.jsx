import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FloralDivider, LotusIcon } from './OrnamentalIcons';

export const SectionPhotoStory = () => {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Smooth spring interpolation for fluid natural momentum with Lenis
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    restDelta: 0.001,
  });

  // 3D Rotations and translations linked to scroll progress
  const rotateX = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    isMobile ? [2, 0, -2] : [6, 0, -6]
  );
  const rotateYGroom = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    isMobile ? [-2, 0, 2] : [-7, 0, 7]
  );
  const rotateYBride = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    isMobile ? [2, 0, -2] : [7, 0, -7]
  );
  const scale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    isMobile ? [1, 0.98, 0.96] : [1, 0.98, 0.94]
  );
  const y = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    isMobile ? [0, 10, 20] : [0, 25, 50]
  );

  // Dynamic light sheen reflecting 3D angle
  const lightSheenOpacity = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [0.2, 0.05, 0.25]
  );
  const lightSheenX = useTransform(smoothProgress, [0, 1], ['-40%', '140%']);

  return (
    <section
      ref={sectionRef}
      className="relative py-14 sm:py-24 px-3 sm:px-6 md:px-12 text-ivory-100 overflow-hidden bg-royal-jaali-dark"
    >
      {/* Background Mandala & Ambient Radial Golden Flare */}
      <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
        <div className="absolute w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-gold-500/10 blur-3xl animate-pulse" />
        <div className="w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] rounded-full border-[2px] border-gold-400/40 animate-spin-mandala" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-2 sm:space-y-3 px-2">
          <span className="font-serif italic text-xs sm:text-sm uppercase tracking-widest text-gold-300 font-semibold">
            Cherished Memories
          </span>
          <h2 className="font-royal text-2xl sm:text-5xl font-bold gold-gradient-text">
            Written in the Stars
          </h2>
          <FloralDivider className="my-2 sm:my-3" />
          <p className="font-serif italic text-ivory-200/80 text-sm sm:text-lg">
            "We took a photograph to freeze the heartbeat of a memory."
          </p>
        </div>

        {/* Editorial Side-by-Side Composition with Matching Equal Frame Sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch">
          {/* Groom Portrait Frame — Prathamesh */}
          <div
            className="relative"
            style={{ perspective: isMobile ? 'none' : '1200px' }}
          >
            <motion.div
              style={{
                transformStyle: 'preserve-3d',
                rotateX,
                rotateY: rotateYGroom,
                scale,
                y,
              }}
              className="relative group transition-shadow duration-500 will-change-transform h-full"
            >
              <div
                className="relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden p-1.5 sm:p-2 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
                style={{
                  background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 35%, #FFF0BD 65%, #946618 100%)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden relative"
                  style={{
                    background: 'linear-gradient(135deg, #2D050D 0%, #140206 100%)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <img
                    src="/assets/images/portrait_prathamesh.jpg"
                    alt="Prathamesh — The Groom"
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                    style={{ objectPosition: 'center 15%' }}
                  />

                  {/* Dynamic 3D Light Shimmer */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    style={{
                      opacity: lightSheenOpacity,
                      x: lightSheenX,
                      transform: 'skewX(-20deg)',
                    }}
                  />

                  {/* Gradient Shadow Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, rgba(20, 2, 6, 0.05) 0%, transparent 45%, rgba(20, 2, 6, 0.9) 100%)',
                    }}
                  />

                  {/* Groom Identifier Overlay */}
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                    <span className="font-serif italic text-[11px] sm:text-xs uppercase tracking-widest text-gold-300 block">
                      The Groom
                    </span>
                    <h3 className="font-royal text-xl sm:text-3xl text-ivory-50 font-bold mt-0.5 sm:mt-1">
                      Prathamesh
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bride Portrait Frame — Revati (Identical Frame Size) */}
          <div
            className="relative"
            style={{ perspective: isMobile ? 'none' : '1200px' }}
          >
            <motion.div
              style={{
                transformStyle: 'preserve-3d',
                rotateX,
                rotateY: rotateYBride,
                scale,
                y,
              }}
              className="relative group transition-shadow duration-500 will-change-transform h-full"
            >
              <div
                className="relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden p-1.5 sm:p-2 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
                style={{
                  background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 35%, #FFF0BD 65%, #946618 100%)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden relative"
                  style={{
                    background: 'linear-gradient(135deg, #2D050D 0%, #140206 100%)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <img
                    src="/assets/images/portrait_revati.jpg"
                    alt="Revati — The Bride"
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                    style={{ objectPosition: 'center 15%' }}
                  />

                  {/* Dynamic 3D Light Shimmer */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    style={{
                      opacity: lightSheenOpacity,
                      x: lightSheenX,
                      transform: 'skewX(-20deg)',
                    }}
                  />

                  {/* Gradient Shadow Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, rgba(20, 2, 6, 0.05) 0%, transparent 45%, rgba(20, 2, 6, 0.9) 100%)',
                    }}
                  />

                  {/* Bride Identifier Overlay */}
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                    <span className="font-serif italic text-[11px] sm:text-xs uppercase tracking-widest text-gold-300 block">
                      The Bride
                    </span>
                    <h3 className="font-royal text-xl sm:text-3xl text-ivory-50 font-bold mt-0.5 sm:mt-1">
                      Revati
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quote Card with Diagonal Burgundy to Wine Glass Gradient */}
        <div
          className="max-w-2xl mx-auto mt-8 sm:mt-12 p-5 sm:p-8 rounded-2xl border border-gold-500/30 backdrop-blur-md space-y-2.5 sm:space-y-3 text-center shadow-royal-card"
          style={{
            background: 'linear-gradient(135deg, rgba(74, 14, 26, 0.85) 0%, rgba(35, 4, 10, 0.95) 100%)',
          }}
        >
          <div className="flex items-center justify-center gap-2 text-gold-400">
            <LotusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-sanskrit text-xs sm:text-sm">॥ शुभ मंगलम् ॥</span>
            <LotusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <p className="font-serif italic text-ivory-200 text-xs sm:text-base leading-relaxed">
            "May your love be like a sacred flame, unwavering in the breeze of time, illuminating your path together forever."
          </p>
          <div className="pt-2 flex items-center justify-center text-[11px] sm:text-xs text-gold-300/80 font-serif">
            <span>Engagement Ceremony</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionPhotoStory;
