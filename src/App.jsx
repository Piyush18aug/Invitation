import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { OpeningScreen } from './components/OpeningScreen';
import { AudioPlayer } from './components/AudioPlayer';
import { ScrollProgress } from './components/ScrollProgress';
import { FloatingNavigation } from './components/FloatingNavigation';
import { PetalCanvas } from './components/PetalCanvas';
import { SectionInvitation } from './components/SectionInvitation';
import { SectionCouple } from './components/SectionCouple';
import { SectionStory } from './components/SectionStory';
import { SectionPhotoStory } from './components/SectionPhotoStory';
import { SectionDateReveal } from './components/SectionDateReveal';
import { SectionCeremony } from './components/SectionCeremony';
import { SectionCountdown } from './components/SectionCountdown';
import { SectionVenue } from './components/SectionVenue';
import { SectionFamily } from './components/SectionFamily';
import { SectionGallery } from './components/SectionGallery';
import { SectionRSVP } from './components/SectionRSVP';
import { SectionFinal } from './components/SectionFinal';
import { introFrames } from './data/introFrames';

export function App() {
  const [hasOpened, setHasOpened] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isCelebration, setIsCelebration] = useState(false);
  const lenisRef = useRef(null);

  // Always reset scroll to top (0, 0) whenever page loads, reloads, or closes
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Lock scroll while opening screen is active so underlying page never scrolls
  useEffect(() => {
    if (!hasOpened) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    } else {
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    }
  }, [hasOpened]);

  // Global early preloader for couple video frames (cached during opening screen)
  useEffect(() => {
    introFrames.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    lenisRef.current = lenis;

    // Force initial scroll position to top
    lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  const handleOpenInvitation = () => {
    window.scrollTo(0, 0);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    setHasOpened(true);
    setIsPlayingMusic(true);
    setIsCelebration(true);
    setTimeout(() => {
      setIsCelebration(false);
    }, 5000);
  };

  const [isNearStartOrEnd, setIsNearStartOrEnd] = useState(true);

  // Monitor scroll to only show petals at starting and ending sections
  useEffect(() => {
    const checkScrollPosition = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Starting section: top area of invitation (first 1.1 viewports)
      const isAtStart = scrollY < windowHeight * 1.1;

      // Ending section: final blessing section at bottom
      const isAtEnd = scrollY + windowHeight >= docHeight - windowHeight * 1.3;

      setIsNearStartOrEnd(isAtStart || isAtEnd);
    };

    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    checkScrollPosition();

    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, [hasOpened]);

  // Petals fall on starting screen, starting section, ending section, or when celebration button is clicked
  const showPetals = !hasOpened || isCelebration || isNearStartOrEnd;

  const triggerCelebration = () => {
    setIsCelebration(true);
    setTimeout(() => {
      setIsCelebration(false);
    }, 8000);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF6EE] text-[#2A1B18] font-sans antialiased selection:bg-gold-500/30 selection:text-burgundy-950">
      {/* Floating Petal & Gold Sparkle Canvas (Only on starting page, ending page, and celebration) */}
      <PetalCanvas
        isCelebration={isCelebration}
        density={hasOpened ? 'normal' : 'high'}
        active={showPetals}
      />

      {/* Opening Cinematic Screen */}
      <OpeningScreen onOpenInvitation={handleOpenInvitation} hasOpened={hasOpened} />

      {/* Main Experience (Visible behind curtains and interactive once opened) */}
      <div className="relative">
        {/* Floating UI Elements (Shown once opened) */}
        {hasOpened && (
          <div className="animate-fade-in">
            <FloatingNavigation />
            <ScrollProgress />
            <AudioPlayer
              isPlaying={isPlayingMusic}
              setIsPlaying={setIsPlayingMusic}
              hasInteracted={hasOpened}
            />
          </div>
        )}

        {/* Main Vertical Scrolling Sections */}
        <main className="relative">
          {/* Section 01: The Luxury Invitation */}
          <SectionInvitation />

          {/* Section 02: Couple Introduction Scroll-Driven Storytelling Animation */}
          <SectionCouple />

          {/* Section 03: Story Timeline */}
          <SectionStory />

          {/* Section 04: Photo Spotlight */}
          <SectionPhotoStory />

          {/* Section 05: Date Reveal */}
          <SectionDateReveal />

          {/* Section 06: Ceremony & Day Schedule */}
          <SectionCeremony />

          {/* Section 07: Live Countdown */}
          <SectionCountdown />

          {/* Section 08: Venue & Navigation */}
          <SectionVenue />

          {/* Section 09: Family Blessings */}
          <SectionFamily />

          {/* Section 10: Luxury Editorial Gallery */}
          <SectionGallery />

          {/* Section 12: RSVP & Wishes */}
          <SectionRSVP />

          {/* Section 13: Final Cinematic Blessing & Celebration */}
          <SectionFinal onTriggerCelebration={triggerCelebration} />
        </main>
      </div>
    </div>
  );
}

export default App;
