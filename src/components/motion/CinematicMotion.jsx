import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

// Refined cinematic cubic bezier easing curves (Apple & Bollywood Luxury)
export const CINEMATIC_EASE = [0.16, 1, 0.3, 1];
export const ROYAL_GENTLE_EASE = [0.22, 1, 0.36, 1];
export const LUXURY_SPRING = { stiffness: 85, damping: 22, restDelta: 0.001 };

/**
 * Hook to detect mobile screens (<768px) safely
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

/**
 * ANIMATION A — Royal Fly-In
 * Enters from outside viewport edges (left, right, top, bottom), flies toward center
 * with a refined cinematic easing curve, scale and opacity transitions, settling precisely.
 */
export const RoyalFlyIn = ({
  children,
  direction = 'bottom', // 'left' | 'right' | 'top' | 'bottom'
  distance = 80,
  delay = 0,
  duration = 0.85,
  className = '',
  once = false,
  amount = 0.2,
}) => {
  const isReduced = useReducedMotion();
  const isMobile = useIsMobile();
  const travel = isMobile ? Math.min(distance, 45) : distance;

  const offsets = {
    left: { x: -travel, y: 0 },
    right: { x: travel, y: 0 },
    top: { x: 0, y: -travel },
    bottom: { x: 0, y: travel },
  };

  const initial = isReduced
    ? { opacity: 0 }
    : {
        opacity: 0,
        scale: 0.94,
        ...offsets[direction],
      };

  const animate = {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
  };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once, amount }}
      transition={{
        duration: isReduced ? 0.3 : duration,
        delay,
        ease: CINEMATIC_EASE,
      }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
};

/**
 * ANIMATION B — Layered 3D Entrance
 * Begins at a subtle 3D perspective angle with depth, rotates and moves toward viewer,
 * then gradually straightens and settles into place.
 */
export const Layered3DCard = ({
  children,
  delay = 0,
  duration = 0.9,
  className = '',
  tilt = 8,
  once = false,
  amount = 0.2,
}) => {
  const isReduced = useReducedMotion();
  const isMobile = useIsMobile();
  const angle = isMobile ? Math.min(tilt, 4) : tilt;

  return (
    <div
      className={`relative ${className}`}
      style={{ perspective: isMobile ? '1000px' : '1400px' }}
    >
      <motion.div
        initial={
          isReduced
            ? { opacity: 0 }
            : {
                opacity: 0,
                y: isMobile ? 35 : 60,
                scale: isMobile ? 0.95 : 0.9,
                rotateX: angle,
                rotateY: -angle * 0.5,
              }
        }
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
        }}
        viewport={{ once, amount }}
        transition={{
          duration: isReduced ? 0.3 : duration,
          delay,
          ease: CINEMATIC_EASE,
        }}
        className="w-full h-full transform-gpu"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/**
 * ANIMATION C — Cinematic Curtain Reveal
 * Two rich burgundy panels that slide open from the center toward opposite sides,
 * revealing the underlying section accompanied by a warm golden radiance.
 */
export const CurtainReveal = ({
  children,
  className = '',
  curtainBg = 'linear-gradient(135deg, #2D050D 0%, #1A0207 100%)',
  once = false,
  amount = 0.25,
}) => {
  const isReduced = useReducedMotion();

  if (isReduced) {
    return <div className={`relative ${className}`}>{children}</div>;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Underlying Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once, amount }}
        transition={{ duration: 1.1, delay: 0.25, ease: CINEMATIC_EASE }}
        className="relative z-10"
      >
        {children}
      </motion.div>

      {/* Left Curtain Panel */}
      <motion.div
        initial={{ x: '0%' }}
        whileInView={{ x: '-102%' }}
        viewport={{ once, amount }}
        transition={{ duration: 1.25, ease: [0.65, 0, 0.2, 1] }}
        className="absolute inset-y-0 left-0 w-1/2 z-30 pointer-events-none shadow-2xl flex items-center justify-end border-r border-gold-400/40"
        style={{ background: curtainBg }}
      >
        <div className="absolute right-0 inset-y-0 w-2.5 bg-gradient-to-l from-gold-400/30 to-transparent" />
      </motion.div>

      {/* Right Curtain Panel */}
      <motion.div
        initial={{ x: '0%' }}
        whileInView={{ x: '102%' }}
        viewport={{ once, amount }}
        transition={{ duration: 1.25, ease: [0.65, 0, 0.2, 1] }}
        className="absolute inset-y-0 right-0 w-1/2 z-30 pointer-events-none shadow-2xl flex items-center justify-start border-l border-gold-400/40"
        style={{ background: curtainBg }}
      >
        <div className="absolute left-0 inset-y-0 w-2.5 bg-gradient-to-r from-gold-400/30 to-transparent" />
      </motion.div>

      {/* Center Golden Light Burst upon opening */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: [0, 0.7, 0], scale: [0.5, 1.4, 2] }}
        viewport={{ once, amount }}
        transition={{ duration: 1.4, delay: 0.2, ease: 'easeOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gold-400/25 blur-3xl z-20 pointer-events-none"
      />
    </div>
  );
};

/**
 * ANIMATION D — Elegant Rise and Settle
 * Starts below the visible area, rises smoothly, transitions from subtle blur to sharp,
 * and settles without a harsh stop.
 */
export const RiseAndSettle = ({
  children,
  delay = 0,
  distance = 50,
  duration = 0.75,
  blur = true,
  className = '',
  once = false,
  amount = 0.2,
}) => {
  const isReduced = useReducedMotion();
  const isMobile = useIsMobile();
  const travel = isMobile ? Math.min(distance, 30) : distance;

  return (
    <motion.div
      initial={
        isReduced
          ? { opacity: 0 }
          : {
              opacity: 0,
              y: travel,
              filter: blur ? 'blur(8px)' : 'none',
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
        filter: blur ? 'blur(0px)' : 'none',
      }}
      viewport={{ once, amount }}
      transition={{
        duration: isReduced ? 0.3 : duration,
        delay,
        ease: CINEMATIC_EASE,
      }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
};

/**
 * ANIMATION E — Horizontal Cinematic Entrance (Convergence)
 * Brings one element from the left and another from the right, meeting at the center
 * with balanced speeds, locking into symmetry.
 */
export const HorizontalConvergence = ({
  leftContent,
  rightContent,
  centerBadge = null,
  className = '',
  distance = 90,
  delay = 0,
  duration = 0.85,
  once = false,
  amount = 0.2,
}) => {
  const isReduced = useReducedMotion();
  const isMobile = useIsMobile();
  const travel = isMobile ? Math.min(distance, 40) : distance;

  return (
    <div className={`relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 ${className}`}>
      {/* Left Item */}
      <motion.div
        initial={isReduced ? { opacity: 0 } : { opacity: 0, x: -travel, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once, amount }}
        transition={{ duration: isReduced ? 0.3 : duration, delay, ease: CINEMATIC_EASE }}
        className="flex-1 w-full"
      >
        {leftContent}
      </motion.div>

      {/* Center Badge if provided */}
      {centerBadge && (
        <motion.div
          initial={isReduced ? { opacity: 0 } : { opacity: 0, scale: 0.5, rotate: -25 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once, amount }}
          transition={{
            duration: isReduced ? 0.3 : duration * 0.9,
            delay: delay + 0.15,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="shrink-0 z-10"
        >
          {centerBadge}
        </motion.div>
      )}

      {/* Right Item */}
      <motion.div
        initial={isReduced ? { opacity: 0 } : { opacity: 0, x: travel, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once, amount }}
        transition={{ duration: isReduced ? 0.3 : duration, delay: delay + 0.08, ease: CINEMATIC_EASE }}
        className="flex-1 w-full"
      >
        {rightContent}
      </motion.div>
    </div>
  );
};

/**
 * ANIMATION F — Slow Luxury Zoom
 * Continuous subtle luxury scale and scroll parallax on palace imagery and hero backgrounds.
 */
export const SlowLuxuryZoom = ({
  children,
  className = '',
  scaleFrom = 1.08,
  scaleTo = 1.0,
}) => {
  const isReduced = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    isReduced ? [1, 1] : [scaleFrom, scaleTo]
  );
  const y = useTransform(scrollYProgress, [0, 1], ['-2%', '3%']);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ scale, y }} className="w-full h-full transform-gpu">
        {children}
      </motion.div>
    </div>
  );
};

/**
 * ANIMATION G — Gold Particle and Ornament Reveal
 * Mandalas, floral borders, and sacred emblems draw, fade, or scale progressively into view.
 */
export const OrnamentReveal = ({
  children,
  type = 'scale-rotate', // 'scale-rotate' | 'draw' | 'fade-glow'
  delay = 0.2,
  duration = 0.8,
  className = '',
  once = false,
  amount = 0.3,
}) => {
  const isReduced = useReducedMotion();

  const variants = {
    'scale-rotate': {
      initial: isReduced ? { opacity: 0 } : { opacity: 0, scale: 0.4, rotate: -40 },
      animate: { opacity: 1, scale: 1, rotate: 0 },
    },
    draw: {
      initial: isReduced ? { opacity: 0 } : { opacity: 0, scaleY: 0 },
      animate: { opacity: 1, scaleY: 1 },
    },
    'fade-glow': {
      initial: isReduced ? { opacity: 0 } : { opacity: 0, scale: 0.9, filter: 'drop-shadow(0 0 0px #D4AF37)' },
      animate: { opacity: 1, scale: 1, filter: 'drop-shadow(0 0 16px rgba(212,175,55,0.6))' },
    },
  };

  const selected = variants[type] || variants['scale-rotate'];

  return (
    <motion.div
      initial={selected.initial}
      whileInView={selected.animate}
      viewport={{ once, amount }}
      transition={{
        duration: isReduced ? 0.3 : duration,
        delay,
        ease: CINEMATIC_EASE,
      }}
      className={`inline-block transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
};

/**
 * ANIMATION H — Image Mask Reveal
 * Reveals photographs through an animated smooth clip-path mask followed by a subtle
 * scale settling into an ornamental frame.
 */
export const ImageMaskReveal = ({
  src,
  alt = '',
  className = '',
  shape = 'rect', // 'rect' | 'circle' | 'arch'
  delay = 0.1,
  duration = 1.0,
  objectPosition = 'center',
  once = false,
  amount = 0.2,
}) => {
  const isReduced = useReducedMotion();

  // Mask clipPaths
  const masks = {
    rect: {
      initial: 'inset(100% 0% 0% 0%)',
      animate: 'inset(0% 0% 0% 0%)',
    },
    arch: {
      initial: 'inset(100% 0% 0% 0% round 120px 120px 0px 0px)',
      animate: 'inset(0% 0% 0% 0% round 120px 120px 0px 0px)',
    },
    circle: {
      initial: 'circle(0% at 50% 50%)',
      animate: 'circle(75% at 50% 50%)',
    },
  };

  const selected = masks[shape] || masks.rect;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Outer Golden Border frame */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount }}
        variants={{
          hidden: isReduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: isReduced ? 0.3 : duration * 0.9, delay, ease: CINEMATIC_EASE },
          },
        }}
        className="w-full h-full rounded-2xl overflow-hidden p-1 shadow-royal-card border border-gold-400/50"
        style={{
          background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 40%, #FFF0BD 70%, #946618 100%)',
        }}
      >
        <motion.div
          className="w-full h-full rounded-xl overflow-hidden bg-burgundy-950 relative"
          variants={{
            hidden: isReduced
              ? { opacity: 0 }
              : { opacity: 1, clipPath: selected.initial },
            visible: isReduced
              ? { opacity: 1 }
              : {
                  opacity: 1,
                  clipPath: selected.animate,
                  transition: { duration: isReduced ? 0.3 : duration, delay, ease: [0.65, 0, 0.35, 1] },
                },
          }}
        >
          <motion.img
            src={src}
            alt={alt}
            loading="lazy"
            variants={{
              hidden: isReduced ? {} : { scale: 1.15 },
              visible: isReduced
                ? {}
                : {
                    scale: 1.0,
                    transition: { duration: isReduced ? 0.3 : duration * 1.2, delay, ease: CINEMATIC_EASE },
                  },
            }}
            style={{ objectPosition }}
            className="w-full h-full object-cover transform-gpu"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

/**
 * ANIMATION J — Elegant Text Stagger
 * Reveals a title or headline line-by-line or word-by-word with clipping mask reveals.
 */
export const TextStagger = ({
  text,
  tag = 'h2',
  className = '',
  wordClassName = '',
  delay = 0,
  staggerDelay = 0.07,
  once = false,
  amount = 0.3,
}) => {
  const isReduced = useReducedMotion();
  const words = typeof text === 'string' ? text.split(' ') : [];
  const Tag = motion[tag] || motion.div;

  if (isReduced) {
    const SimpleTag = tag;
    return <SimpleTag className={className}>{text}</SimpleTag>;
  }

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      className={`inline-flex flex-wrap items-center justify-center gap-y-1 ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden py-0.5">
          <motion.span
            variants={{
              hidden: { y: '110%', opacity: 0 },
              visible: {
                y: '0%',
                opacity: 1,
                transition: { duration: 0.75, ease: CINEMATIC_EASE },
              },
            }}
            className={`inline-block transform-gpu ${wordClassName}`}
          >
            {word}{i < words.length - 1 && '\u00A0'}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};
