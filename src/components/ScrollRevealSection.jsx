import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * ScrollRevealSection
 * Wraps page sections to give them an immersive 3D "come out of screen" scroll animation.
 * As the user scrolls into a section, it emerges out of the depth with perspective,
 * smooth scaling, 3D tilt, and lighting, reaching full prominence in the center of the viewport,
 * and receding gracefully as it leaves.
 */
export const ScrollRevealSection = ({
  children,
  className = '',
  id,
  intensity = 'normal', // 'subtle' | 'normal' | 'hero'
}) => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth natural spring physics that syncs with Lenis scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  // Calculate dynamic transform values based on device & intensity
  const rotateAngle = isMobile ? 3.5 : intensity === 'hero' ? 7 : 5;
  const maxScale = 1.0;
  const enterScale = isMobile ? 0.94 : intensity === 'hero' ? 0.88 : 0.91;
  const exitScale = enterScale;
  const enterY = isMobile ? (intensity === 'subtle' ? 8 : 18) : intensity === 'hero' ? 40 : (intensity === 'subtle' ? 12 : 24);
  const exitY = isMobile ? (intensity === 'subtle' ? -8 : -18) : intensity === 'hero' ? -35 : (intensity === 'subtle' ? -12 : -24);

  // 3D Tilt on X axis: tilted back entering -> flat at center -> tilted forward leaving
  const rotateX = useTransform(
    smoothProgress,
    [0, 0.35, 0.65, 1],
    [rotateAngle, 0, 0, -rotateAngle * 0.8]
  );

  // Scale: Pops out towards the screen in the center
  const scale = useTransform(
    smoothProgress,
    [0, 0.35, 0.65, 1],
    [enterScale, maxScale, maxScale, exitScale]
  );

  // Y translation: Smooth upward emergence
  const y = useTransform(
    smoothProgress,
    [0, 0.35, 0.65, 1],
    [enterY, 0, 0, exitY]
  );

  // Opacity: Fades in to 100% crispness in view
  const opacity = useTransform(
    smoothProgress,
    [0, 0.22, 0.78, 1],
    [0.35, 1, 1, 0.35]
  );

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative w-full ${className}`}
      style={{
        perspective: isMobile ? '1000px' : '1400px',
        perspectiveOrigin: 'center center',
      }}
    >
      <motion.div
        style={{
          rotateX,
          scale,
          y,
          opacity,
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity',
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ScrollRevealSection;
