import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ChevronDown, Heart } from 'lucide-react';
import { DiyaIcon, GoldenEngagementRings, CornerOrnament } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';
import { introFrames } from '../data/introFrames';

export const SectionCouple = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const lastDrawnIdxRef = useRef(-1);
  const dimensionsRef = useRef({ w: 0, h: 0, dpr: 1 });
  const [isMobile, setIsMobile] = useState(false);
  const imagesCacheRef = useRef([]);

  // Direct Motion Value for robust scroll tracking across all devices
  const scrollProgress = useMotionValue(0);

  const groomName = invitationData.couple.groom.name.toUpperCase() || 'PRATHAMESH';
  const brideName = (invitationData.couple.bride.name || 'REVATI').toUpperCase();

  // Resize and Mobile Detection
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = window.innerWidth;
      const h = window.innerHeight;

      dimensionsRef.current = { w, h, dpr };
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);

      // Trigger redraw
      lastDrawnIdxRef.current = -1;
      drawFrame(scrollProgress.get());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [scrollProgress]);

  // High-performance direct canvas frame renderer
  const drawFrame = useCallback((progressVal) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frames = imagesCacheRef.current;
    const totalFrames = introFrames.length;
    if (totalFrames === 0) return;

    const clampedProgress = Math.max(0, Math.min(1, progressVal));
    const targetIdx = Math.min(
      totalFrames - 1,
      Math.floor(clampedProgress * (totalFrames - 1))
    );

    // Skip redundant draws if the same frame is already rendered
    if (targetIdx === lastDrawnIdxRef.current && lastDrawnIdxRef.current !== -1) {
      return;
    }

    // Find requested frame, or closest available loaded frame
    let img = frames[targetIdx];
    if (!img) {
      for (let offset = 1; offset < totalFrames; offset++) {
        if (targetIdx - offset >= 0 && frames[targetIdx - offset]) {
          img = frames[targetIdx - offset];
          break;
        }
        if (targetIdx + offset < totalFrames && frames[targetIdx + offset]) {
          img = frames[targetIdx + offset];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const { w, h, dpr } = dimensionsRef.current;
    if (w === 0 || h === 0) return;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const imgW = img.naturalWidth || 800;
    const imgH = img.naturalHeight || 450;
    const imgRatio = imgW / imgH;
    const isMobileView = w < 768;

    let drawW, drawH, posX, posY;

    if (isMobileView) {
      // Mobile / Portrait: Slightly bigger (1.22x) and centered in the middle
      const mobileScale = 1.22;
      drawW = w * mobileScale;
      drawH = (w / imgRatio) * mobileScale;
      posX = (w - drawW) / 2;
      posY = Math.max(40, (h - drawH) / 2 - 25);
    } else {
      // Desktop / Widescreen: Full cinematic cover
      const screenRatio = w / h;
      if (screenRatio > imgRatio) {
        drawW = w;
        drawH = w / imgRatio;
        posX = 0;
        posY = (h - drawH) / 2;
      } else {
        drawH = h;
        drawW = h * imgRatio;
        posX = (w - drawW) / 2;
        posY = 0;
      }
    }

    ctx.drawImage(img, posX, posY, drawW, drawH);
    ctx.restore();

    lastDrawnIdxRef.current = targetIdx;
  }, []);

  // Preload all 150 frames progressively
  useEffect(() => {
    let isMounted = true;
    const total = introFrames.length;
    const images = new Array(total);

    // 1. Frame 0 immediate load
    const firstImg = new Image();
    firstImg.src = introFrames[0];
    firstImg.onload = () => {
      if (!isMounted) return;
      images[0] = firstImg;
      drawFrame(scrollProgress.get());
    };
    if (firstImg.complete) {
      images[0] = firstImg;
      drawFrame(scrollProgress.get());
    }

    // 2. Prioritized two-stage frame loading (keyframes first, then intermediate in-between frames)
    const keyframeIndices = [];
    const remainingIndices = [];
    for (let i = 1; i < total; i++) {
      if (i % 3 === 0 || i === total - 1) keyframeIndices.push(i);
      else remainingIndices.push(i);
    }

    const loadBatch = (indices, onBatchDone) => {
      let loaded = 0;
      if (indices.length === 0) {
        onBatchDone?.();
        return;
      }
      indices.forEach((idx) => {
        const img = new Image();
        img.src = introFrames[idx];
        img.onload = () => {
          if (!isMounted) return;
          images[idx] = img;
          const currentTarget = Math.floor(scrollProgress.get() * (total - 1));
          if (Math.abs(currentTarget - idx) <= 2) {
            drawFrame(scrollProgress.get());
          }
          loaded++;
          if (loaded === indices.length) onBatchDone?.();
        };
        img.onerror = () => {
          loaded++;
          if (loaded === indices.length) onBatchDone?.();
        };
      });
    };

    loadBatch(keyframeIndices, () => {
      if (!isMounted) return;
      loadBatch(remainingIndices);
    });

    imagesCacheRef.current = images;

    return () => {
      isMounted = false;
    };
  }, [drawFrame, scrollProgress]);

  // Robust Native & Lenis Scroll Listener
  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      
      if (totalScrollable <= 0) return;

      // rect.top goes from 0 (at top of viewport) to -totalScrollable (at end)
      const rawProgress = -rect.top / totalScrollable;
      const progress = Math.max(0, Math.min(1, rawProgress));

      scrollProgress.set(progress);

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        drawFrame(progress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [drawFrame, scrollProgress]);

  // Timeline Transitions (Desktop):
  const groomOpacity = useTransform(scrollProgress, [0.08, 0.25, 0.40, 0.50], [0, 1, 1, 0.2]);
  const groomX = useTransform(scrollProgress, [0.08, 0.25], isMobile ? [-35, 0] : [-130, 0]);
  const groomScale = useTransform(scrollProgress, [0.08, 0.25], [0.9, 1]);

  const brideOpacity = useTransform(scrollProgress, [0.28, 0.45, 0.60, 0.70], [0, 1, 1, 0.2]);
  const brideX = useTransform(scrollProgress, [0.28, 0.45], isMobile ? [35, 0] : [130, 0]);
  const brideScale = useTransform(scrollProgress, [0.28, 0.45], [0.9, 1]);

  // Mobile-specific Sequenced Overlays (converging from sides)
  const groomOpacityMobile = useTransform(scrollProgress, [0.06, 0.18, 0.40, 0.48], [0, 1, 1, 0]);
  const groomXMobile = useTransform(scrollProgress, [0.06, 0.18, 0.40, 0.48], [-40, 0, 0, -20]);

  const brideOpacityMobile = useTransform(scrollProgress, [0.48, 0.60, 0.82, 0.90], [0, 1, 1, 0]);
  const brideXMobile = useTransform(scrollProgress, [0.48, 0.60, 0.82, 0.90], [40, 0, 0, 20]);

  // Central Sacred Emblem & Name Golden Glow
  const centerEmblemOpacity = useTransform(scrollProgress, [0.35, 0.55], [0, 1]);
  const centerEmblemScale = useTransform(scrollProgress, [0.35, 0.55], [0.65, 1]);

  // Bottom Save-The-Date Banner
  const bottomBannerOpacity = useTransform(scrollProgress, [0.65, 0.88], [0, 1]);
  const bottomBannerY = useTransform(scrollProgress, [0.65, 0.88], [20, 0]);
  const bottomBannerScale = useTransform(scrollProgress, [0.65, 0.88], [0.95, 1]);

  // Initial scroll hint fades out quickly
  const hintOpacity = useTransform(scrollProgress, [0, 0.08], [1, 0]);

  return (
    <div
      ref={containerRef}
      id="couple"
      className="relative h-[140vh] sm:h-[155vh] bg-[#140205] text-ivory-100"
    >
      {/* Sticky Fullscreen Cinematic Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none">
        
        {/* ========================================================================= */}
        {/* 1. CINEMATIC VIDEO FRAME CANVAS (FULLSCREEN HD 60FPS SCRUB)               */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 z-0 bg-[#140205]">
          {/* Base poster frame fallback */}
          <img
            src={introFrames[0]}
            alt="Prathamesh & Revati"
            className="absolute inset-0 w-full h-full object-cover hidden md:block filter brightness-[0.96] contrast-[1.04]"
          />

          <canvas
            ref={canvasRef}
            className="relative z-10 w-full h-full block filter brightness-[0.96] contrast-[1.04]"
          />

          {/* Elegant Translucent Vignette Overlays - Keeps the couple visible and bright */}
          <div className="absolute inset-0 z-20 bg-gradient-to-b from-[#140205]/75 via-transparent to-[#140205]/80 pointer-events-none" />
          <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#140205]/60 via-transparent to-[#140205]/60 pointer-events-none hidden md:block" />
        </div>

        {/* Ambient Floating Gold Dust Glow */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-roseGold-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Decorative Corner Filigree */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none opacity-50 sm:opacity-70">
          <CornerOrnament className="w-8 h-8 sm:w-14 sm:h-14" />
        </div>
        <div className="absolute top-4 right-4 z-20 pointer-events-none opacity-50 sm:opacity-70 rotate-90">
          <CornerOrnament className="w-8 h-8 sm:w-14 sm:h-14" />
        </div>

        {/* ========================================================================= */}
        {/* 2. TOP AMBIENT SANSKRIT TITLE                                             */}
        {/* ========================================================================= */}
        <div className="relative z-20 pt-6 sm:pt-10 px-4 text-center">
          <span className="inline-block font-sanskrit text-[11px] sm:text-xs tracking-[0.25em] text-gold-300/90 drop-shadow-md">
            ॥ श्री गणेशाय नमः ॥
          </span>
        </div>

        {/* ========================================================================= */}
        {/* 3. MIDDLE OVERLAY: GROOM & BRIDE DETAILS                                  */}
        {/* ========================================================================= */}

        {/* Desktop Layout: Side-by-side Left & Right */}
        <div className="hidden md:flex relative z-20 flex-1 items-center justify-between max-w-7xl mx-auto w-full px-8 md:px-16 my-auto">
          {/* ------------ GROOM INTRO (LEFT SIDE) ------------ */}
          <motion.div
            style={{
              opacity: groomOpacity,
              x: groomX,
              scale: groomScale,
            }}
            className="flex-1 text-left max-w-xs sm:max-w-sm md:max-w-md transform-gpu"
          >
            <div className="space-y-1.5 sm:space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full backdrop-blur-md bg-burgundy-950/75 border border-gold-400/50 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
                <span className="font-sanskrit text-[11px] sm:text-xs text-gold-300 font-bold tracking-wider">
                  ॥ वर ॥
                </span>
              </div>

              <h2 className="font-royal text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider gold-gradient-text drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                {groomName}
              </h2>

              <div className="flex items-center gap-2 pt-0.5">
                <span className="text-gold-400 text-sm">✦</span>
                <span className="font-serif italic text-xs sm:text-base md:text-lg text-gold-100 tracking-widest uppercase font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  The Groom
                </span>
                <span className="text-gold-400 text-sm">✦</span>
              </div>

              <p className="font-serif italic text-xs sm:text-sm text-gold-200/85 leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] pt-1">
                "{invitationData.couple.groom.bio}"
              </p>
            </div>
          </motion.div>

          {/* ------------ CENTER CONNECTING MEDALLION ------------ */}
          <motion.div
            style={{
              opacity: centerEmblemOpacity,
              scale: centerEmblemScale,
            }}
            className="flex flex-col items-center justify-center px-2 pointer-events-none transform-gpu"
          >
            <div className="p-3 sm:p-4 rounded-full backdrop-blur-md border border-gold-400/70 shadow-[0_0_35px_rgba(212,175,55,0.45)] bg-burgundy-950/80">
              <GoldenEngagementRings className="w-8 h-8 sm:w-14 sm:h-14 md:w-16 md:h-16" />
            </div>
            <div className="mt-1.5 px-3 py-0.5 rounded-full border border-gold-400/60 backdrop-blur-md bg-burgundy-950/90 shadow-md">
              <span className="font-sanskrit text-[10px] sm:text-xs font-bold text-gold-300 tracking-wider">
                ॥ वाङ्निश्चय ॥
              </span>
            </div>
          </motion.div>

          {/* ------------ BRIDE INTRO (RIGHT SIDE) ------------ */}
          <motion.div
            style={{
              opacity: brideOpacity,
              x: brideX,
              scale: brideScale,
            }}
            className="flex-1 text-right max-w-xs sm:max-w-sm md:max-w-md flex flex-col items-end transform-gpu"
          >
            <div className="space-y-1.5 sm:space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full backdrop-blur-md bg-burgundy-950/75 border border-gold-400/50 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-ping" />
                <span className="font-sanskrit text-[11px] sm:text-xs text-gold-300 font-bold tracking-wider">
                  ॥ वधू ॥
                </span>
              </div>

              <h2 className="font-royal text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider gold-gradient-text drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                {brideName}
              </h2>

              <div className="flex items-center justify-end gap-2 pt-0.5">
                <span className="text-gold-400 text-sm">✦</span>
                <span className="font-serif italic text-xs sm:text-base md:text-lg text-gold-100 tracking-widest uppercase font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  The Bride
                </span>
                <span className="text-gold-400 text-sm">✦</span>
              </div>

              <p className="font-serif italic text-xs sm:text-sm text-gold-200/85 leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] pt-1">
                "{invitationData.couple.bride.bio}"
              </p>
            </div>
          </motion.div>
        </div>

        {/* Mobile Layout: Frosted Card in Lower-Third so Couple's Faces are Always Clear */}
        <div className="md:hidden relative z-20 w-full px-4 text-center mt-auto mb-14">
          <div className="relative min-h-[120px] flex items-center justify-center">
            {/* Groom on Mobile - Fly in from left */}
            <motion.div
              style={{
                opacity: groomOpacityMobile,
                x: groomXMobile,
              }}
              className="absolute inset-x-0 mx-auto max-w-xs p-4 rounded-2xl backdrop-blur-md bg-burgundy-950/75 border border-gold-400/40 shadow-2xl space-y-1.5 transform-gpu"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-burgundy-900/80 border border-gold-400/50">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                <span className="font-sanskrit text-[11px] text-gold-300 font-bold tracking-wider">
                  ॥ वर ॥ The Groom
                </span>
              </div>
              <h2 className="font-royal text-2xl font-extrabold tracking-wider gold-gradient-text drop-shadow-md">
                {groomName}
              </h2>
              <p className="font-serif italic text-xs text-gold-200/90 leading-relaxed">
                "{invitationData.couple.groom.bio}"
              </p>
            </motion.div>

            {/* Bride on Mobile - Fly in from right */}
            <motion.div
              style={{
                opacity: brideOpacityMobile,
                x: brideXMobile,
              }}
              className="absolute inset-x-0 mx-auto max-w-xs p-4 rounded-2xl backdrop-blur-md bg-burgundy-950/75 border border-gold-400/40 shadow-2xl space-y-1.5 transform-gpu"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-burgundy-900/80 border border-gold-400/50">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                <span className="font-sanskrit text-[11px] text-gold-300 font-bold tracking-wider">
                  ॥ वधू ॥ The Bride
                </span>
              </div>
              <h2 className="font-royal text-2xl font-extrabold tracking-wider gold-gradient-text drop-shadow-md">
                {brideName}
              </h2>
              <p className="font-serif italic text-xs text-gold-200/90 leading-relaxed">
                "{invitationData.couple.bride.bio}"
              </p>
            </motion.div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. BOTTOM BAR: SCROLL HINT & ROYAL EVENT BANNER                            */}
        {/* ========================================================================= */}
        <div className="relative z-20 pb-6 sm:pb-8 px-4 text-center">
          
          {/* Scroll Hint at Progress 0% */}
          <motion.div
            style={{
              opacity: hintOpacity,
            }}
            className="flex flex-col items-center justify-center gap-1 text-gold-300 pointer-events-none"
          >
            <span className="font-serif italic text-xs sm:text-sm tracking-widest uppercase drop-shadow-md">
              Scroll down to experience the journey
            </span>
            <ChevronDown className="w-5 h-5 text-gold-400 animate-bounce" />
          </motion.div>

          {/* Reveal Event Banner at 62% - 100%: Date, Venue & Couple Union */}
          <motion.div
            style={{
              opacity: bottomBannerOpacity,
              y: bottomBannerY,
              scale: bottomBannerScale,
            }}
            className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 text-gold-300 transform-gpu"
          >
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <DiyaIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-royal text-xs sm:text-base font-bold tracking-widest gold-gradient-text">
                {groomName}
              </span>
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 fill-rose-500 animate-pulse drop-shadow-sm flex-shrink-0" />
              <span className="font-royal text-xs sm:text-base font-bold tracking-widest gold-gradient-text">
                {brideName}
              </span>
              <DiyaIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default SectionCouple;
