import React, { useState, useEffect } from 'react';
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

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleOpenInvitation = () => {
    setHasOpened(true);
    setIsPlayingMusic(true);
    setIsCelebration(true);
    setTimeout(() => {
      setIsCelebration(false);
    }, 5000);
  };

  const triggerCelebration = () => {
    setIsCelebration(true);
    setTimeout(() => {
      setIsCelebration(false);
    }, 8000);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF6EE] text-[#2A1B18] font-sans antialiased selection:bg-gold-500/30 selection:text-burgundy-950">
      {/* Floating Petal & Gold Sparkle Canvas */}
      <PetalCanvas isCelebration={isCelebration} density={hasOpened ? 'normal' : 'high'} />

      {/* Opening Cinematic Screen */}
      <OpeningScreen onOpenInvitation={handleOpenInvitation} hasOpened={hasOpened} />

      {/* Main Experience (Visible after opening) */}
      <div className={`transition-opacity duration-1000 ${hasOpened ? 'opacity-100' : 'opacity-0'}`}>
        {/* Floating UI Elements */}
        <FloatingNavigation />
        <ScrollProgress />
        <AudioPlayer
          isPlaying={isPlayingMusic}
          setIsPlaying={setIsPlayingMusic}
          hasInteracted={hasOpened}
        />

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
