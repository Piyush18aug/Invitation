import React, { useState } from 'react';
import { Send, CheckCircle2, MessageCircle, Calendar, Sparkles, Heart } from 'lucide-react';
import { FloralDivider, LotusIcon, DiyaIcon } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';

export const SectionRSVP = () => {
  const { rsvp, event, couple } = invitationData;
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('yes');
  const [guestCount, setGuestCount] = useState('1');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Send RSVP directly via WhatsApp
  const handleWhatsAppRSVP = (e) => {
    e.preventDefault();
    const guestText = attending === 'yes' ? `Yes, I/We will be attending (${guestCount} guest${guestCount > 1 ? 's' : ''})` : 'Regretfully, I/We will not be able to attend';
    const wishesText = message.trim() ? `\nWishes: "${message.trim()}"` : '';

    const text = encodeURIComponent(
      `*Engagement Ceremony RSVP*\n\n` +
      `*From:* ${name || 'Guest'}\n` +
      `*Status:* ${guestText}\n` +
      `*Event:* ${couple.bride.name} & ${couple.groom.name} — Engagement Ceremony\n` +
      `*Date:* ${event.displayDate} at ${event.venue}, Sangli` +
      wishesText
    );

    window.open(`https://wa.me/${rsvp.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="relative py-24 px-4 sm:px-6 md:px-12 bg-ivory-gradient overflow-hidden">
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

        {/* RSVP Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFDF9] border-2 border-gold-400 shadow-royal-card max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-gold-500/20 text-gold-700 mx-auto flex items-center justify-center border border-gold-400">
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
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF6EE] border border-gold-300 focus:border-gold-500 focus:outline-none text-burgundy-950 font-serif text-sm transition-colors"
                />
              </div>

              {/* Attendance Choice */}
              <div>
                <label className="block font-serif text-xs uppercase tracking-wider text-burgundy-950 font-bold mb-2">
                  Will You Be Attending? *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending('yes')}
                    className={`py-3 px-4 rounded-xl border font-serif text-xs uppercase tracking-wider font-semibold transition-all ${
                      attending === 'yes'
                        ? 'bg-burgundy-900 text-gold-200 border-gold-400 shadow-sm'
                        : 'bg-[#FAF6EE] text-burgundy-900/80 border-gold-300 hover:border-gold-400'
                    }`}
                  >
                    Yes, Delighted to Attend! ✨
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending('no')}
                    className={`py-3 px-4 rounded-xl border font-serif text-xs uppercase tracking-wider font-semibold transition-all ${
                      attending === 'no'
                        ? 'bg-burgundy-900 text-gold-200 border-gold-400 shadow-sm'
                        : 'bg-[#FAF6EE] text-burgundy-900/80 border-gold-300 hover:border-gold-400'
                    }`}
                  >
                    Sending Warm Wishes From Afar
                  </button>
                </div>
              </div>

              {/* Number of Guests */}
              {attending === 'yes' && (
                <div>
                  <label className="block font-serif text-xs uppercase tracking-wider text-burgundy-950 font-bold mb-2">
                    Number of Guests
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF6EE] border border-gold-300 focus:border-gold-500 focus:outline-none text-burgundy-950 font-serif text-sm"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 Persons</option>
                    <option value="3">3 Persons</option>
                    <option value="4">4 Persons</option>
                    <option value="5+">5+ (Whole Family)</option>
                  </select>
                </div>
              )}

              {/* Warm Message / Wishes */}
              <div>
                <label className="block font-serif text-xs uppercase tracking-wider text-burgundy-950 font-bold mb-2">
                  Send Your Wishes to Revati & Prathamesh
                </label>
                <textarea
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a heartfelt message, blessings, or memories..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF6EE] border border-gold-300 focus:border-gold-500 focus:outline-none text-burgundy-950 font-serif text-sm transition-colors resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-gold-600 via-gold-500 to-amber-600 text-burgundy-950 font-royal font-bold text-sm tracking-wider shadow-gold-glow hover:shadow-gold-glow-lg active:scale-98 transition-all duration-200"
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
