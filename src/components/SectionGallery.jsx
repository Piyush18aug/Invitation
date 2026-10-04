import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Play,
  Pause,
  Sparkles,
} from 'lucide-react';
import { FloralDivider, LotusIcon, CornerOrnament } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';

export const SectionGallery = () => {
  const photos = invitationData.gallery;
  const total = photos.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Touch swipe support for mobile
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Auto-play looping slideshow interval: exactly 3 seconds per slide
  useEffect(() => {
    if (!isPlaying || lightboxIndex !== null) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPlaying, lightboxIndex, total, currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleDotClick = (idx) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
        return;
      }
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % total);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + total) % total);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, total, currentIndex]);

  const activePhoto = photos[currentIndex];

  // Motion animation variants for fullscreen smooth 3-second dissolve with subtle cinematic zoom
  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 0.98,
      filter: 'blur(8px)',
    },
    center: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        opacity: { duration: 0.55, ease: 'easeOut' },
        scale: { duration: 3.0, ease: 'linear' },
        filter: { duration: 0.55, ease: 'easeOut' },
      },
    },
    exit: {
      opacity: 0,
      scale: 1.03,
      filter: 'blur(6px)',
      transition: {
        opacity: { duration: 0.45, ease: 'easeIn' },
        scale: { duration: 0.45, ease: 'easeIn' },
        filter: { duration: 0.45, ease: 'easeIn' },
      },
    },
  };

  return (
    <section
      id="gallery"
      className="relative w-full min-h-[100dvh] sm:h-screen flex flex-col justify-between items-center overflow-hidden bg-[#120205] text-ivory-100 select-none py-3 sm:py-6 px-2 sm:px-6"
    >
      {/* ========================================================================= */}
      {/* 1. DYNAMIC FULLSCREEN BLURRED AMBIENT BACKDROP LAYER                      */}
      {/* ========================================================================= */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`bg-${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.38 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <img
            src={activePhoto.src}
            alt=""
            className="w-full h-full object-cover filter blur-3xl scale-125"
          />
        </motion.div>
      </AnimatePresence>

      {/* Royal Vignette & Shimmer Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#120205] via-[#120205]/65 to-[#120205]/85 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(18,2,5,0.85)_100%)] pointer-events-none z-0" />

      {/* ========================================================================= */}
      {/* 2. TOP HEADER OVERLAY                                                     */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-6xl mx-auto flex items-center justify-between pt-1 sm:pt-2 px-2 sm:px-4">
        <div className="flex items-center gap-2">
          <div className="px-2.5 sm:px-3 py-1 rounded-full border border-gold-400/50 bg-burgundy-950/70 backdrop-blur-md shadow-sm flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-300" />
            <span className="font-sanskrit text-gold-200 text-xs font-semibold">॥ संस्मरण ॥</span>
            <span className="text-gold-500">•</span>
            <span className="font-royal text-gold-100 text-[11px] sm:text-xs tracking-wider uppercase">
              Visual Memories
            </span>
          </div>
        </div>

        <div className="hidden sm:block text-center">
          <h2 className="font-royal text-xl md:text-2xl font-bold gold-gradient-text tracking-wide drop-shadow-md">
            Moments in Eternal Bloom
          </h2>
        </div>

        {/* Counter Badge */}
        <div className="px-2.5 sm:px-3 py-1 rounded-full border border-gold-400/40 bg-burgundy-950/70 backdrop-blur-md text-xs font-mono font-bold text-gold-300 shadow-sm">
          {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CENTER STAGE: FULLSCREEN PHOTO SLIDESHOW (WITH TOUCH SWIPE)            */}
      {/* ========================================================================= */}
      <div
        className="relative z-10 flex-1 w-full max-w-6xl flex items-center justify-center my-1 sm:my-2 touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full flex flex-col items-center justify-center"
          >
            {/* The Majestic Fullscreen Photo Frame */}
            <div
              onClick={() => setLightboxIndex(currentIndex)}
              className="group relative cursor-pointer p-1 sm:p-2.5 rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:shadow-[0_30px_70px_rgba(212,175,55,0.4)] transition-all duration-500 max-h-[56vh] sm:max-h-[74vh] md:max-h-[80vh] max-w-full flex items-center justify-center overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 35%, #FFF0BD 65%, #946618 100%)',
              }}
            >
              {/* Inner Royal Deep Canvas */}
              <div
                className="relative rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center p-0.5 sm:p-2"
                style={{
                  background: 'linear-gradient(135deg, #2D050D 0%, #150205 100%)',
                }}
              >
                {/* Full Uncropped High-Resolution Photo */}
                <img
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  className="max-h-[52vh] sm:max-h-[70vh] md:max-h-[76vh] max-w-full w-auto h-auto object-contain rounded-lg sm:rounded-xl drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] group-hover:scale-[1.015] transition-transform duration-700 ease-out"
                />

                {/* Corner Ornaments */}
                <div className="absolute top-1.5 left-1.5 pointer-events-none opacity-50">
                  <CornerOrnament className="w-4 h-4 sm:w-7 sm:h-7" />
                </div>
                <div className="absolute top-1.5 right-1.5 pointer-events-none opacity-50 rotate-90">
                  <CornerOrnament className="w-4 h-4 sm:w-7 sm:h-7" />
                </div>
                <div className="absolute bottom-1.5 left-1.5 pointer-events-none opacity-50 -rotate-90">
                  <CornerOrnament className="w-4 h-4 sm:w-7 sm:h-7" />
                </div>
                <div className="absolute bottom-1.5 right-1.5 pointer-events-none opacity-50 rotate-180">
                  <CornerOrnament className="w-4 h-4 sm:w-7 sm:h-7" />
                </div>

                {/* Fullscreen Icon Hint */}
                <div className="absolute bottom-2.5 right-2.5 sm:bottom-4 sm:right-4 p-2 rounded-full backdrop-blur-md bg-black/70 border border-gold-400/60 text-gold-300 opacity-70 group-hover:opacity-100 transition-opacity duration-300 shadow-xl">
                  <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating Left Arrow */}
        <button
          onClick={handlePrev}
          aria-label="Previous Memory"
          className="absolute left-1 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 p-2.5 sm:p-4 rounded-full border border-gold-400/70 text-gold-200 backdrop-blur-md shadow-2xl active:scale-90 transition-all duration-200 z-30 touch-manipulation"
          style={{
            background: 'linear-gradient(135deg, rgba(74, 14, 26, 0.9) 0%, rgba(20, 2, 5, 0.95) 100%)',
          }}
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>

        {/* Floating Right Arrow */}
        <button
          onClick={handleNext}
          aria-label="Next Memory"
          className="absolute right-1 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 p-2.5 sm:p-4 rounded-full border border-gold-400/70 text-gold-200 backdrop-blur-md shadow-2xl active:scale-90 transition-all duration-200 z-30 touch-manipulation"
          style={{
            background: 'linear-gradient(135deg, rgba(74, 14, 26, 0.9) 0%, rgba(20, 2, 5, 0.95) 100%)',
          }}
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM CAPTION & PLAYBACK CONTROLS                                     */}
      {/* ========================================================================= */}
      <div className="relative z-20 w-full max-w-3xl mx-auto flex flex-col items-center gap-1 pb-2 sm:pb-3 px-3 text-center">
        {/* Caption */}
        <div className="space-y-0.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-gold-400/40 bg-burgundy-950/70 backdrop-blur-sm shadow-sm mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="font-serif text-[10px] sm:text-xs uppercase tracking-widest text-gold-300 font-semibold">
              {activePhoto.category}
            </span>
          </div>

          <h3 className="font-royal text-base sm:text-2xl md:text-3xl font-bold gold-gradient-text tracking-wide drop-shadow-md">
            {activePhoto.title}
          </h3>

          <p className="font-serif italic text-[11px] sm:text-sm text-gold-200/80 tracking-wider">
            Memory {String(currentIndex + 1).padStart(2, '0')} of {String(total).padStart(2, '0')} • Prathamesh & Revati
          </p>
        </div>

        {/* 3-Second Countdown Progress Bar */}
        <div
          className="w-full max-w-xs sm:max-w-md h-1 bg-black/60 rounded-full overflow-hidden border border-gold-400/30 backdrop-blur-sm mt-0.5"
          title="3-Second Slide Duration"
        >
          <motion.div
            key={`slide-bar-${currentIndex}-${isPlaying}`}
            initial={{ width: '0%' }}
            animate={{ width: isPlaying ? '100%' : '0%' }}
            transition={{
              duration: isPlaying ? 3.0 : 0,
              ease: 'linear',
            }}
            className="h-full bg-gradient-to-r from-gold-500 via-amber-300 to-gold-400 shadow-gold-glow"
          />
        </div>

        {/* Controls: Play/Pause & Interactive Dots */}
        <div className="flex items-center gap-2.5 sm:gap-3 pt-0.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-gold-400/50 bg-burgundy-950/75 hover:bg-burgundy-900 text-gold-300 shadow-sm transition-colors active:scale-95 touch-manipulation"
            title={isPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3" />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold">Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-gold-300" />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold">Play</span>
              </>
            )}
          </button>

          {/* Interactive Dots with smooth touch scrolling */}
          <div className="flex items-center gap-1.5 max-w-[200px] sm:max-w-md overflow-x-auto py-1 px-1 no-scrollbar">
            {photos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 touch-manipulation ${
                  idx === currentIndex
                    ? 'w-4 sm:w-6 bg-gradient-to-r from-gold-400 to-amber-500 shadow-gold-glow'
                    : 'w-1.5 sm:w-2 bg-gold-400/30 hover:bg-gold-400/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. FULLSCREEN HIGH-RESOLUTION LIGHTBOX MODAL                              */}
      {/* ========================================================================= */}
      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 backdrop-blur-lg flex items-center justify-center p-3 sm:p-8"
          style={{
            background: 'linear-gradient(135deg, rgba(18, 2, 5, 0.98) 0%, rgba(35, 4, 10, 0.98) 100%)',
          }}
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxIndex(null)}
            aria-label="Close Lightbox"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full border border-gold-400 text-gold-200 active:scale-95 transition-transform z-10 touch-manipulation"
            style={{
              background: 'linear-gradient(135deg, #3D0A14 0%, #200308 100%)',
            }}
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev - 1 + total) % total);
            }}
            aria-label="Previous Photo"
            className="absolute left-2 sm:left-8 p-2.5 sm:p-3 rounded-full border border-gold-400 text-gold-200 active:scale-95 transition-transform z-10 touch-manipulation"
            style={{
              background: 'linear-gradient(135deg, #3D0A14 0%, #200308 100%)',
            }}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev + 1) % total);
            }}
            aria-label="Next Photo"
            className="absolute right-2 sm:right-8 p-2.5 sm:p-3 rounded-full border border-gold-400 text-gold-200 active:scale-95 transition-transform z-10 touch-manipulation"
            style={{
              background: 'linear-gradient(135deg, #3D0A14 0%, #200308 100%)',
            }}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Lightbox Image Container */}
          <div
            className="relative max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden p-1.5 sm:p-2 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #946618 100%)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative rounded-xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #2D050D 0%, #150205 100%)',
              }}
            >
              <img
                src={photos[lightboxIndex].src}
                alt={photos[lightboxIndex].title}
                className="max-h-[75vh] w-auto mx-auto object-contain"
              />
              <div
                className="p-3 sm:p-4 text-center border-t border-gold-500/30"
                style={{
                  background: 'linear-gradient(135deg, rgba(45, 5, 13, 0.95) 0%, rgba(20, 2, 6, 0.95) 100%)',
                }}
              >
                <h4 className="font-royal text-base sm:text-lg text-gold-200 font-bold">
                  {photos[lightboxIndex].title}
                </h4>
                <p className="font-serif text-[11px] sm:text-xs text-ivory-200/70 mt-0.5">
                  Memory {lightboxIndex + 1} of {total} • {photos[lightboxIndex].category}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SectionGallery;
