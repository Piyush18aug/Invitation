import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { DivineGanesha } from './DivineGanesha';
import { FloralDivider } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';

export const SectionFinal = ({ onTriggerCelebration }) => {
  const { event, couple } = invitationData;

  return (
    <section
      className="relative min-h-screen py-24 px-4 sm:px-6 md:px-12 text-ivory-100 flex items-center justify-center overflow-hidden bg-royal-jaali-dark"
    >
      {/* Background Rotating Gold Mandala & Ambient Radiance */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="absolute w-[650px] h-[650px] rounded-full bg-gold-400/10 blur-3xl animate-pulse" />
        <div className="w-[700px] h-[700px] md:w-[1000px] md:h-[1000px] rounded-full border-[1.5px] border-gold-400/40 animate-spin-mandala flex items-center justify-center">
          <div className="w-[80%] h-[80%] rounded-full border border-dashed border-gold-300/30 animate-spin-mandala-rev" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10 text-center space-y-8 p-6 sm:p-12">
        {/* Divine Ganesh Medallion */}
        <div className="flex justify-center">
          <DivineGanesha variant="medallion" />
        </div>

        {/* Sanskrit Conclusion Shloka */}
        <div>
          <span className="font-sanskrit text-gold-300 text-base sm:text-xl tracking-widest block font-semibold">
            ॥ शुभं भवतु • मंगलम् भूयात् ॥
          </span>
          <p className="font-serif italic text-xs sm:text-sm text-gold-200/80 uppercase tracking-widest mt-1">
            "May auspiciousness prevail and happiness multiply"
          </p>
        </div>

        <FloralDivider className="my-4" />

        {/* Core Emotion */}
        <div className="space-y-4">
          <h2 className="font-royal text-2xl sm:text-4xl md:text-5xl font-bold gold-gradient-text leading-tight">
            Your Presence Will Make Our Celebration Truly Special
          </h2>
          <p className="font-serif italic text-ivory-200/90 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            We eagerly look forward to welcoming you with folded hands, warm smiles, and joyful hearts.
          </p>
        </div>

        {/* Couple Names Headline: Prathamesh & Revati */}
        <div className="py-4 space-y-2">
          <h3 className="font-royal text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider gold-gradient-text">
            {couple.groom.name}
          </h3>
          <div className="flex items-center justify-center gap-3">
            <span className="w-12 h-[1px] bg-gold-400/50" />
            <Heart className="w-6 h-6 text-roseGold-400 fill-roseGold-400 animate-pulse" />
            <span className="w-12 h-[1px] bg-gold-400/50" />
          </div>
          <h3 className="font-royal text-4xl sm:text-6xl md:text-7xl font-bold tracking-wider gold-gradient-text">
            {couple.bride.name}
          </h3>
        </div>

        {/* Event Summary Stamp with Deep Burgundy Gradient */}
        <div
          className="inline-block p-6 rounded-2xl border border-gold-400/50 shadow-gold-glow max-w-md mx-auto"
          style={{
            background: 'linear-gradient(135deg, rgba(61, 10, 20, 0.92) 0%, rgba(32, 3, 8, 0.95) 100%)',
          }}
        >
          <p className="font-royal text-lg sm:text-xl font-bold text-gold-200">
            {event.displayDate} • {event.time}
          </p>
          <p className="font-serif text-sm text-ivory-200/90 mt-1">
            {event.venue}, {event.city}
          </p>
        </div>

        {/* Celebration Button with Metallic Gold Gradient */}
        <div className="pt-4">
          <button
            onClick={onTriggerCelebration}
            className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 rounded-full text-burgundy-950 font-royal font-bold text-sm sm:text-base tracking-widest shadow-gold-glow hover:shadow-gold-glow-lg active:scale-95 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #C59B27 0%, #ECC872 30%, #FFF0BD 50%, #D4AF37 75%, #AA8232 100%)',
            }}
          >
            <Sparkles className="w-5 h-5 text-burgundy-950 mr-2 animate-spin-slow" />
            <span>SHOWER BLESSINGS & CELEBRATE ✨</span>
          </button>
        </div>

        {/* Signoff */}
        <div className="pt-8 border-t border-gold-500/20 text-center space-y-1">
          <p className="font-script text-3xl sm:text-4xl text-gold-300">
            With Love,
          </p>
          <p className="font-royal text-base sm:text-lg text-gold-200 font-bold tracking-widest uppercase">
            Prathamesh & Revati
          </p>
          <p className="text-xs text-gold-400/60 font-serif pt-2">
            Haripur Road, Near CV Steel, Haripur, Sangli, Maharashtra
          </p>
        </div>
      </div>
    </section>
  );
};
