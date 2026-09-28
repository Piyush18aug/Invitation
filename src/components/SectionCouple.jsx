import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Sparkles, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import { FloralDivider, DiyaIcon, GoldenEngagementRings } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';

export const SectionCouple = () => {
  const { bride, groom } = invitationData.couple;
  const groomPhotos = groom.photos || [groom.image];
  const bridePhotos = bride.photos || [bride.image];

  const [groomIndex, setGroomIndex] = useState(0);
  const [brideIndex, setBrideIndex] = useState(0);

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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    restDelta: 0.001,
  });

  // Groom 3D Transforms (tilts inward from left)
  const groomRotateX = useTransform(smoothProgress, [0, 0.5, 1], isMobile ? [3, 0, -3] : [6, 0, -6]);
  const groomRotateY = useTransform(smoothProgress, [0, 0.5, 1], isMobile ? [-5, 0, 5] : [-10, 0, 10]);
  const groomScale = useTransform(smoothProgress, [0, 0.5, 1], isMobile ? [1, 0.98, 0.93] : [1, 0.96, 0.90]);
  const groomY = useTransform(smoothProgress, [0, 0.5, 1], isMobile ? [0, 20, 50] : [0, 35, 80]);

  // Bride 3D Transforms (tilts inward from right)
  const brideRotateX = useTransform(smoothProgress, [0, 0.5, 1], isMobile ? [3, 0, -3] : [6, 0, -6]);
  const brideRotateY = useTransform(smoothProgress, [0, 0.5, 1], isMobile ? [5, 0, -5] : [10, 0, -10]);
  const brideScale = useTransform(smoothProgress, [0, 0.5, 1], isMobile ? [1, 0.98, 0.93] : [1, 0.96, 0.90]);
  const brideY = useTransform(smoothProgress, [0, 0.5, 1], isMobile ? [0, 20, 50] : [0, 35, 80]);

  const handleNextGroomPhoto = (e) => {
    e?.stopPropagation();
    setGroomIndex((prev) => (prev + 1) % groomPhotos.length);
  };

  const handlePrevGroomPhoto = (e) => {
    e?.stopPropagation();
    setGroomIndex((prev) => (prev - 1 + groomPhotos.length) % groomPhotos.length);
  };

  return (
    <section
      ref={sectionRef}
      id="couple"
      className="relative py-24 px-4 sm:px-6 md:px-12 overflow-hidden bg-paper-texture-champagne"
    >
      {/* Ambient Royal Spotlights & Floating Bokeh Glow */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-gold-400/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-roseGold-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,240,189,0.25)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-serif italic text-xs sm:text-sm uppercase tracking-widest text-gold-700 font-semibold">
            Meet The Couple
          </span>
          <h2 className="font-royal text-3xl sm:text-4xl md:text-5xl font-bold text-burgundy-950">
            Two Hearts. One Journey.
          </h2>
          <FloralDivider className="my-3" />
          <p className="font-serif italic text-burgundy-900/80 text-base sm:text-lg">
            "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
          </p>
        </div>

        {/* Couple Portraits Grid (Groom First, Bride Second) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center relative">
          {/* Center Golden Engagement Rings Medallion (Between the two photos) */}
          <div className="hidden md:flex absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex-col items-center pointer-events-none">
            <motion.div
              animate={{
                y: [0, -6, 0],
                rotate: [0, 1.5, 0, -1.5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative p-3.5 rounded-full backdrop-blur-md border border-gold-400/60 shadow-[0_12px_32px_rgba(212,175,55,0.35)] flex items-center justify-center group"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 253, 249, 0.95) 0%, rgba(250, 245, 236, 0.98) 50%, rgba(245, 237, 226, 0.95) 100%)',
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gold-400/15 blur-md animate-pulse" />
              <GoldenEngagementRings className="w-16 h-16" />
            </motion.div>
            <div className="mt-2.5 px-3.5 py-0.5 rounded-full border border-gold-400/50 backdrop-blur-sm bg-ivory-50/90 shadow-sm">
              <span className="font-sanskrit text-xs font-bold text-gold-800 tracking-wider">
                ॥ वाङ्निश्चय ॥
              </span>
            </div>
          </div>

          {/* Groom Card: Prathamesh with Photo Stack */}
          <div
            className="flex flex-col items-center text-center"
            style={{ perspective: '1200px' }}
          >
            <motion.div
              style={{
                transformStyle: 'preserve-3d',
                rotateX: groomRotateX,
                rotateY: groomRotateY,
                scale: groomScale,
                y: groomY,
              }}
              className="w-full max-w-sm flex flex-col items-center group will-change-transform"
            >
              {/* Arch Portrait Frame with Metallic Antique Gold Linear Gradient */}
              <div
                onClick={handleNextGroomPhoto}
                className="relative w-full aspect-[4/5] rounded-t-[140px] rounded-b-2xl overflow-hidden p-2.5 shadow-royal-card transition-transform duration-500 group-hover:-translate-y-2 cursor-pointer select-none"
                style={{
                  background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 35%, #FFF0BD 65%, #946618 100%)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Inner Frame with Dark Burgundy Gradient */}
                <div
                  className="relative w-full h-full rounded-t-[130px] rounded-b-xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #2D050D 0%, #170206 100%)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={groomPhotos[groomIndex]}
                      src={groomPhotos[groomIndex]}
                      alt={groom.name}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      loading="lazy"
                      className="w-full h-full object-cover transform filter contrast-[1.03]"
                      style={{ objectPosition: 'center 0%' }}
                    />
                  </AnimatePresence>

                  {/* Gradient Shadow Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, transparent 40%, rgba(35, 4, 10, 0.85) 100%)',
                    }}
                  />

                  {/* Top Stack Counter Badge */}
                  {groomPhotos.length > 1 && (
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-md bg-burgundy-950/75 border border-gold-400/50 text-[11px] font-serif text-gold-200 shadow-md">
                      <Layers className="w-3 h-3 text-gold-400" />
                      <span>{groomIndex + 1}/{groomPhotos.length}</span>
                    </div>
                  )}

                  {/* Arrow controls on hover */}
                  {groomPhotos.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevGroomPhoto}
                        aria-label="Previous photo"
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full backdrop-blur-md bg-burgundy-950/60 border border-gold-400/40 text-gold-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-burgundy-950/90 z-10"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNextGroomPhoto}
                        aria-label="Next photo"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full backdrop-blur-md bg-burgundy-950/60 border border-gold-400/40 text-gold-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-burgundy-950/90 z-10"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {/* Bottom Tag & Stack Indicator Dots */}
                  <div className="absolute bottom-4 inset-x-0 text-center space-y-2 z-10">
                    {/* Pagination Dots */}
                    {groomPhotos.length > 1 && (
                      <div className="flex justify-center items-center gap-1.5">
                        {groomPhotos.map((_, i) => (
                          <button
                            key={i}
                            onClick={(e) => {
                              e.stopPropagation();
                              setGroomIndex(i);
                            }}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              groomIndex === i ? 'w-5 bg-gold-300 shadow-sm' : 'w-1.5 bg-gold-400/40 hover:bg-gold-400/80'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    <span
                      className="inline-block px-4 py-1 rounded-full backdrop-blur-md border border-gold-400/40 text-xs font-serif uppercase tracking-widest text-gold-200 shadow-md"
                      style={{
                        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.25) 0%, rgba(59, 10, 20, 0.4) 100%)',
                      }}
                    >
                      {groom.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="mt-6 space-y-2 max-w-xs">
                <h3 className="font-royal text-3xl font-bold text-burgundy-950 tracking-wide">
                  {groom.name}
                </h3>
                <p className="font-serif text-sm text-burgundy-800/80 leading-relaxed italic">
                  "{groom.bio}"
                </p>
              </div>
            </motion.div>
          </div>

          {/* Bride Card: Revati with 3D Perspective */}
          <div
            className="flex flex-col items-center text-center"
            style={{ perspective: '1200px' }}
          >
            <motion.div
              style={{
                transformStyle: 'preserve-3d',
                rotateX: brideRotateX,
                rotateY: brideRotateY,
                scale: brideScale,
                y: brideY,
              }}
              className="w-full max-w-sm flex flex-col items-center group will-change-transform"
            >
              {/* Arch Portrait Frame with Metallic Antique Gold Linear Gradient */}
              <div
                className="relative w-full aspect-[4/5] rounded-t-[140px] rounded-b-2xl overflow-hidden p-2.5 shadow-royal-card transition-transform duration-500 group-hover:-translate-y-2"
                style={{
                  background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 35%, #FFF0BD 65%, #946618 100%)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Inner Frame */}
                <div
                  className="relative w-full h-full rounded-t-[130px] rounded-b-xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #2D050D 0%, #170206 100%)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <img
                    src={bride.image}
                    alt={bride.name}
                    loading="lazy"
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.03]"
                    style={{ objectPosition: 'center 0%' }}
                  />
                  {/* Gradient Shadow Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(180deg, transparent 40%, rgba(35, 4, 10, 0.85) 100%)',
                    }}
                  />

                  {/* Bottom Tag */}
                  <div className="absolute bottom-4 inset-x-0 text-center">
                    <span
                      className="inline-block px-4 py-1 rounded-full backdrop-blur-md border border-gold-400/40 text-xs font-serif uppercase tracking-widest text-gold-200"
                      style={{
                        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.25) 0%, rgba(59, 10, 20, 0.4) 100%)',
                      }}
                    >
                      {bride.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="mt-6 space-y-2 max-w-xs">
                <h3 className="font-royal text-3xl font-bold text-burgundy-950 tracking-wide">
                  {bride.name}
                </h3>
                <p className="font-serif text-sm text-burgundy-800/80 leading-relaxed italic">
                  "{bride.bio}"
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Center Connecting Motif with Golden Engagement Rings */}
        <div className="mt-14 flex flex-col sm:flex-row justify-center items-center gap-4 text-gold-600">
          <div className="flex items-center gap-3">
            <DiyaIcon className="w-7 h-7" />
            <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-gold-400" />
          </div>

          <div className="flex items-center gap-2.5 px-5 py-2 rounded-full border border-gold-400/50 backdrop-blur-md bg-ivory-50/70 shadow-sm">
            <GoldenEngagementRings className="w-8 h-8" />
            <span className="font-serif italic text-xs uppercase tracking-widest text-burgundy-950 font-semibold">
              Two Souls, One Sacred Promise
            </span>
            <Sparkles className="w-4 h-4 text-gold-500 animate-pulse" />
          </div>

          <div className="flex items-center gap-3">
            <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-gold-400" />
            <DiyaIcon className="w-7 h-7" />
          </div>
        </div>
      </div>
    </section>
  );
};
