import React, { useState } from 'react';
import { Send, CheckCircle2, MessageCircle, Calendar, Sparkles, Heart } from 'lucide-react';
import { FloralDivider, LotusIcon, DiyaIcon } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';

export const SectionRSVP = () => {
  const { rsvp, event, couple } = invitationData;
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Send RSVP directly via WhatsApp
  const handleWhatsAppRSVP = (e) => {
    e.preventDefault();
    const wishesText = message.trim() ? `\n*Wishes & Blessings:* "${message.trim()}"` : '';

    const text = encodeURIComponent(
      `*Engagement Ceremony RSVP & Wishes*\n\n` +
      `*From:* ${name || 'Guest'}\n` +
      `*Event:* ${couple.groom.name} & ${couple.bride.name} — Engagement Ceremony\n` +
      `*Date:* ${event.displayDate} at ${event.venue}, Sangli` +
      wishesText
    );

    window.open(`https://wa.me/${rsvp.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section
      id="rsvp"
      className="relative py-24 px-4 sm:px-6 md:px-12 overflow-hidden bg-royal-jaali-light"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-serif italic text-xs sm:text-sm uppercase tracking-widest text-gold-700 font-semibold">
            Celebrate With Us
          </span>
          <h2 className="font-royal text-3xl sm:text-5xl font-bold text-burgundy-950">
            Will You Join Our Joy?
          </h2>
          <FloralDivider className="my-3" />
          <p className="font-serif italic text-burgundy-900/80 text-base sm:text-lg">
            "Your presence, love, and blessings will make our celebration truly complete."
          </p>
        </div>

        {/* RSVP Card with Champagne Sand Parchment Gradient */}
        <div
          className="p-8 sm:p-12 rounded-3xl border-2 border-gold-400 shadow-royal-card max-w-2xl mx-auto"
          style={{
            background: 'linear-gradient(135deg, #FFFDF9 0%, #FAF5EC 50%, #F3EAE0 100%)',
          }}
        >
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div
                className="w-16 h-16 rounded-full text-gold-700 mx-auto flex items-center justify-center border border-gold-400 shadow-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(245, 230, 167, 0.4) 100%)',
                }}
              >
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-royal text-2xl font-bold text-burgundy-950">
                Thank You For Your Response!
              </h3>
              <p className="font-serif text-burgundy-900/80 text-sm sm:text-base">
                We are thrilled and truly look forward to celebrating this beautiful day with you.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2 rounded-full border border-gold-500 text-gold-700 hover:bg-gold-50 font-serif text-xs uppercase tracking-widest"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleWhatsAppRSVP} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block font-serif text-xs uppercase tracking-wider text-burgundy-950 font-bold mb-2">
                  Your Full Name / Family Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rajesh & Family"
                  className="w-full px-4 py-3 rounded-xl border border-gold-300 focus:border-gold-500 focus:outline-none text-burgundy-950 font-serif text-sm transition-colors"
                  style={{
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF6EE 100%)',
                  }}
                />
              </div>



              {/* Warm Message / Wishes */}
              <div>
                <label className="block font-serif text-xs uppercase tracking-wider text-burgundy-950 font-bold mb-2">
                  Send Your Wishes to Prathamesh & Revati
                </label>
                <textarea
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a heartfelt message, blessings, or memories..."
                  className="w-full px-4 py-3 rounded-xl border border-gold-300 focus:border-gold-500 focus:outline-none text-burgundy-950 font-serif text-sm transition-colors resize-none"
                  style={{
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF6EE 100%)',
                  }}
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-burgundy-950 font-royal font-bold text-sm tracking-wider shadow-gold-glow hover:shadow-gold-glow-lg active:scale-98 transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, #C59B27 0%, #ECC872 30%, #FFF0BD 50%, #D4AF37 75%, #AA8232 100%)',
                  }}
                >
                  <MessageCircle className="w-5 h-5 text-burgundy-950" />
                  <span>CONFIRM VIA WHATSAPP</span>
                  <Sparkles className="w-4 h-4 text-burgundy-950" />
                </button>

                <p className="text-center font-serif text-xs text-burgundy-800/70 italic">
                  Instant RSVP confirmation sent directly to the couple & family
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
