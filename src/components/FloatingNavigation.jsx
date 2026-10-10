import React, { useState } from 'react';
import { Menu, X, Heart, Calendar, MapPin, Sparkles, Image as ImageIcon, Users, CheckCircle2 } from 'lucide-react';
import { LotusIcon } from './OrnamentalIcons';

export const FloatingNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'The Invitation', href: '#invitation', icon: Sparkles, marathi: 'निमंत्रण' },
    { label: 'The Couple', href: '#couple', icon: Heart, marathi: 'वर-वधू' },
    { label: 'Our Story', href: '#story', icon: Sparkles, marathi: 'कथा' },
    { label: 'Save the Date', href: '#date', icon: Calendar, marathi: 'मुहूर्त' },
    { label: 'Ceremony', href: '#ceremony', icon: LotusIcon, marathi: 'विधी' },
    { label: 'Venue & Location', href: '#venue', icon: MapPin, marathi: 'स्थळ' },
    { label: 'Memories & Gallery', href: '#gallery', icon: ImageIcon, marathi: 'छायाचित्रे' },
    { label: 'Family Blessings', href: '#family', icon: Users, marathi: 'आशीर्वाद' },
    { label: 'RSVP & Wishes', href: '#rsvp', icon: CheckCircle2, marathi: 'उपस्थिती' },
  ];

  const handleNavClick = (href) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Menu Button with Safe-area and Touch optimizations */}
      <div
        className="fixed z-50 pointer-events-auto"
        style={{
          top: 'max(22px, calc(env(safe-area-inset-top, 0px) + 16px))',
          right: 'max(20px, calc(env(safe-area-inset-right, 0px) + 16px))',
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-burgundy-900 via-burgundy-800 to-burgundy-950 border border-gold-400 text-gold-300 shadow-gold-glow active:scale-90 transition-all duration-300 touch-manipulation"
        >
          <span className="absolute inset-0 rounded-full border border-gold-400/40 animate-spin-mandala pointer-events-none" />
          {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 text-gold-200" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gold-300" />}
        </button>
      </div>

      {/* Navigation Modal Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-burgundy-950/85 backdrop-blur-md transition-opacity duration-300 flex items-center justify-end ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`w-full max-w-[300px] sm:max-w-sm h-full bg-gradient-to-b from-burgundy-900 via-burgundy-950 to-burgundy-950 border-l border-gold-500/30 p-5 sm:p-8 flex flex-col justify-between shadow-2xl transition-transform duration-300 transform pt-safe pb-safe ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="pt-2 sm:pt-4 border-b border-gold-500/20 pb-3 sm:pb-4 flex items-center justify-between">
            <div className="text-left">
              <span className="font-sanskrit text-gold-400 text-xs sm:text-sm tracking-widest block">॥ श्री गणेशाय नमः ॥</span>
              <h3 className="font-royal text-lg sm:text-xl text-gold-200 mt-0.5">Prathamesh & Revati</h3>
              <p className="text-[10px] sm:text-xs text-gold-400/70 uppercase tracking-widest mt-0.5">Sangli</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full border border-gold-500/40 text-gold-300 active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links with comfortable 48px touch targets */}
          <nav className="my-auto py-2 sm:py-4 space-y-1 overflow-y-auto max-h-[65vh] no-scrollbar">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item.href)}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 sm:py-3 rounded-xl text-left text-ivory-200 hover:text-gold-200 active:bg-gold-500/15 border border-transparent hover:border-gold-500/30 transition-all duration-200 group touch-manipulation min-h-[44px]"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="text-[11px] text-gold-500/70 font-mono">0{idx + 1}</span>
                    <span className="font-serif tracking-wide text-sm sm:text-base group-hover:translate-x-1 transition-transform">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-sanskrit text-gold-400/60 group-hover:text-gold-300">
                    {item.marathi}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="pt-3 border-t border-gold-500/20 text-center">
            <p className="text-[11px] sm:text-xs text-gold-300/80 font-serif italic">
              "Two hearts. One beautiful beginning."
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingNavigation;
