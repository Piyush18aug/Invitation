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
      {/* Floating Menu Button */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-burgundy-900 to-burgundy-950 border border-gold-400 text-gold-300 shadow-gold-glow hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <span className="absolute inset-0 rounded-full border border-gold-400/40 animate-spin-mandala pointer-events-none" />
          {isOpen ? <X className="w-6 h-6 text-gold-200" /> : <Menu className="w-6 h-6 text-gold-300" />}
        </button>
      </div>

      {/* Navigation Modal Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-burgundy-950/80 backdrop-blur-md transition-opacity duration-300 flex items-center justify-end ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`w-full max-w-sm h-full bg-gradient-to-b from-burgundy-900 via-burgundy-950 to-burgundy-950 border-l border-gold-500/30 p-8 flex flex-col justify-between shadow-2xl transition-transform duration-500 transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="pt-6 border-b border-gold-500/20 pb-4">
            <div className="text-center">
              <span className="font-sanskrit text-gold-400 text-sm tracking-widest block">॥ श्री गणेशाय नमः ॥</span>
              <h3 className="font-royal text-xl text-gold-200 mt-1">Prathamesh & Revati</h3>
              <p className="text-xs text-gold-400/70 uppercase tracking-widest mt-0.5">24 October 2026 • Sangli</p>
            </div>
          </div>

          {/* Links */}
          <nav className="my-auto py-4 space-y-1.5 overflow-y-auto max-h-[60vh]">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item.href)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-left text-ivory-200 hover:text-gold-200 hover:bg-gold-500/10 border border-transparent hover:border-gold-500/30 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gold-500/70 font-mono">0{idx + 1}</span>
                    <span className="font-serif tracking-wide text-sm sm:text-base group-hover:translate-x-1 transition-transform">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-xs font-sanskrit text-gold-400/60 group-hover:text-gold-300">
                    {item.marathi}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="pt-4 border-t border-gold-500/20 text-center">
            <p className="text-xs text-gold-300/80 font-serif italic">
              "Two hearts. One beautiful beginning."
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
