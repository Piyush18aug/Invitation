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
    isMobile ? [4, 0, -4] : [8, 0, -8]
  );
  const rotateY = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    isMobile ? [-6, 0, 6] : [-12, 0, 12]
  );
  const scale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    isMobile ? [1, 0.97, 0.92] : [1, 0.95, 0.88]
  );
  const y = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    isMobile ? [0, 25, 60] : [0, 50, 120]
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
      className="relative py-24 px-4 sm:px-6 md:px-12 text-ivory-100 overflow-hidden bg-royal-jaali-dark"
    >
      {/* Background Mandala & Ambient Radial Golden Flare */}
      <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gold-500/10 blur-3xl animate-pulse" />
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
          {/* Main Large Portrait (Photo 17) with Scroll-Driven 3D Perspective Tilt */}
          <div
            className="lg:col-span-7 relative"
            style={{ perspective: '1200px' }}
          >
            <motion.div
              style={{
                transformStyle: 'preserve-3d',
                rotateX,
                rotateY,
                scale,
                y,
              }}
              className="relative group transition-shadow duration-500 will-change-transform"
            >
              <div
                className="relative aspect-[4/5] rounded-3xl overflow-hidden p-2 shadow-[0_25px_60px_rgba(0,0,0,0.7)]"
                style={{
                  background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 35%, #FFF0BD 65%, #946618 100%)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className="w-full h-full rounded-2xl overflow-hidden relative"
                  style={{
                    background: 'linear-gradient(135deg, #2D050D 0%, #140206 100%)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <img
                    src="/assets/images/photo_17.jpeg"
                    alt="Prathamesh and Revati"
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  
                  {/* Dynamic 3D Light Shimmer that tracks the rotation */}
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
                      background: 'linear-gradient(180deg, rgba(20, 2, 6, 0.1) 0%, transparent 40%, rgba(20, 2, 6, 0.9) 100%)',
                    }}
                  />
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
            </motion.div>
          </div>

          {/* Side Editorial Stack */}
          <div className="lg:col-span-5 space-y-6">
            {/* Top Secondary Photo */}
            <div
              className="relative aspect-[16/10] rounded-2xl overflow-hidden p-1.5 shadow-xl group"
              style={{
                background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #946618 100%)',
              }}
            >
              <div
                className="w-full h-full rounded-xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #2D050D 0%, #140206 100%)',
                }}
              >
                <img
                  src="/assets/images/photo_01.jpeg"
                  alt="Joyful Moment"
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            {/* Quote Card with Diagonal Burgundy to Wine Glass Gradient */}
            <div
              className="p-6 sm:p-8 rounded-2xl border border-gold-500/30 backdrop-blur-md space-y-3"
              style={{
                background: 'linear-gradient(135deg, rgba(74, 14, 26, 0.8) 0%, rgba(35, 4, 10, 0.95) 100%)',
              }}
            >
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
