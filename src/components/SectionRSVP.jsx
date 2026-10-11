import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, MessageCircle, Calendar, Sparkles, Heart, MapPin } from 'lucide-react';
import { FloralDivider, LotusIcon, DiyaIcon } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';
import { TextStagger, Layered3DCard, OrnamentReveal } from './motion/CinematicMotion';

export const SectionRSVP = () => {
  const { rsvp, event, couple } = invitationData;
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submittedTarget, setSubmittedTarget] = useState(null);

  // Send WhatsApp message to either Groom's family or Bride's family
  const handleWhatsAppMessage = (side) => {
    const isGroom = side === 'groom';
    const target = isGroom ? rsvp.groom : rsvp.bride;
    const recipientTitle = isGroom ? "Groom's Family (Navangul Family)" : "Bride's Family (Erande Family)";
    const coupleText = isGroom
      ? `${couple.groom.name} & ${couple.bride.name}`
      : `${couple.bride.name} & ${couple.groom.name}`;

    const senderName = name.trim() || 'Well-Wisher & Family';
    const customWish =
      message.trim() ||
      'Heartiest congratulations and best wishes for the Engagement Ceremony! Wishing the couple eternal happiness and joy.';

    const text = encodeURIComponent(
      `*Engagement Ceremony Wishes & Blessings*\n\n` +
      `*To:* ${recipientTitle}\n` +
      `*From:* ${senderName}\n` +
      `*Event:* ${coupleText} — Engagement Ceremony\n` +
      `*Date:* ${event.displayDate}\n` +
      `*Venue:* Royal Palace, Sangli\n` +
      `*Google Maps:* ${event.mapUrl}\n\n` +
      `*Message:* "${customWish}"`
    );

    const cleanPhone = target.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
    setSubmittedTarget(isGroom ? "Groom's Family" : "Bride's Family");
  };

  return (
    <section
      id="rsvp"
      className="relative py-14 sm:py-24 px-3 sm:px-6 md:px-12 overflow-hidden bg-royal-jaali-light"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header with TextStagger */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-2 sm:space-y-3 px-2">
          <TextStagger
            text="BLESSINGS & WISHES"
            as="span"
            className="font-serif italic text-xs sm:text-sm uppercase tracking-widest text-gold-700 font-semibold block"
          />
          <TextStagger
            text="Send Your Wishes on WhatsApp"
            as="h2"
            className="font-royal text-2xl sm:text-5xl font-bold text-burgundy-950"
            delay={0.15}
          />
          <OrnamentReveal delay={0.25}>
            <FloralDivider className="my-2 sm:my-3" />
          </OrnamentReveal>
          <TextStagger
            text='"Your blessings and heartfelt wishes mean the world to our families."'
            as="p"
            className="font-serif italic text-burgundy-900/80 text-sm sm:text-lg"
            delay={0.35}
          />
        </div>

        {/* RSVP Card with 3D Layered Entrance */}
        <Layered3DCard
          rotateX={6}
          rotateY={0}
          delay={0.2}
          className="p-5 sm:p-12 rounded-3xl border-2 border-gold-400 shadow-royal-card hover:border-gold-500 hover:shadow-gold-glow max-w-2xl mx-auto transition-all duration-300 transform-gpu"
          style={{
            background: 'linear-gradient(135deg, #FFFDF9 0%, #FAF5EC 50%, #F3EAE0 100%)',
          }}
        >
          {submittedTarget ? (
            <div className="text-center py-6 sm:py-8 space-y-3 sm:space-y-4">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full text-gold-700 mx-auto flex items-center justify-center border border-gold-400 shadow-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(245, 230, 167, 0.4) 100%)',
                }}
              >
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-700" />
              </div>
              <h3 className="font-royal text-xl sm:text-2xl font-bold text-burgundy-950">
                Thank You For Your Blessings!
              </h3>
              <p className="font-serif text-burgundy-900/80 text-xs sm:text-base">
                Your message has been opened for {submittedTarget}. We truly cherish your love and presence.
              </p>
              <button
                onClick={() => setSubmittedTarget(null)}
                className="mt-3 sm:mt-4 px-5 sm:px-6 py-2 rounded-full border border-gold-500 text-gold-700 hover:bg-gold-50 font-serif text-[11px] sm:text-xs uppercase tracking-widest active:scale-95 transition-all"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {/* Full Name */}
              <div>
                <label className="block font-serif text-[11px] sm:text-xs uppercase tracking-wider text-burgundy-950 font-bold mb-1.5 sm:mb-2">
                  Your Full Name / Family Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rajesh & Family"
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gold-300 focus:border-gold-500 focus:outline-none text-burgundy-950 font-serif text-base transition-colors"
                  style={{
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF6EE 100%)',
                  }}
                />
              </div>

              {/* Warm Message / Wishes */}
              <div>
                <label className="block font-serif text-[11px] sm:text-xs uppercase tracking-wider text-burgundy-950 font-bold mb-1.5 sm:mb-2">
                  Your Congratulations & Wishes
                </label>
                <textarea
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Heartiest congratulations to both families on this auspicious celebration!"
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gold-300 focus:border-gold-500 focus:outline-none text-burgundy-950 font-serif text-base transition-colors resize-none"
                  style={{
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF6EE 100%)',
                  }}
                />
              </div>

              {/* Quick Wishes Chips */}
              <div className="space-y-1.5">
                <span className="block font-serif text-[10px] sm:text-xs uppercase tracking-wider text-gold-800 font-semibold">
                  Quick Wishes (Tap to fill):
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {[
                    {
                      label: "Congratulations to the lovely couple!",
                      icon: <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />,
                      fill: "Heartiest congratulations to the lovely couple! Wishing you both a lifetime of happiness.",
                    },
                    {
                      label: "Wishing you a lifetime of love & happiness!",
                      icon: <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600/30 flex-shrink-0" />,
                      fill: "Wishing you both a lifetime of eternal love, prosperity, and happiness!",
                    },
                    {
                      label: "Delighted to celebrate your special day!",
                      icon: <Sparkles className="w-3.5 h-3.5 text-gold-600 flex-shrink-0" />,
                      fill: "Delighted to attend and celebrate your special day with both families!",
                    },
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setMessage(chip.fill)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-serif bg-gold-50/90 hover:bg-gold-100 border border-gold-300/80 text-burgundy-950 transition-colors active:scale-95"
                    >
                      <span>{chip.label}</span>
                      {chip.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dual Action Buttons */}
              <div className="pt-2 sm:pt-4 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Button 1: Groom's Family */}
                  <button
                    type="button"
                    onClick={() => handleWhatsAppMessage('groom')}
                    className="group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl text-burgundy-950 font-royal font-bold shadow-gold-glow hover:shadow-gold-glow-lg active:scale-95 transition-all duration-200 touch-manipulation border-2 border-gold-500 hover:border-gold-600"
                    style={{
                      background: 'linear-gradient(135deg, #C59B27 0%, #ECC872 30%, #FFF0BD 50%, #D4AF37 75%, #AA8232 100%)',
                    }}
                  >
                    <div className="flex items-center gap-2 text-xs sm:text-sm tracking-wider uppercase font-bold">
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-800 fill-emerald-800/20" />
                      <span>Message to Groom's Family</span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-serif font-medium text-burgundy-900/90 mt-1">
                      (Navangul Family)
                    </span>
                  </button>

                  {/* Button 2: Bride's Family */}
                  <button
                    type="button"
                    onClick={() => handleWhatsAppMessage('bride')}
                    className="group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl text-burgundy-950 font-royal font-bold shadow-gold-glow hover:shadow-gold-glow-lg active:scale-95 transition-all duration-200 touch-manipulation border-2 border-gold-500 hover:border-gold-600"
                    style={{
                      background: 'linear-gradient(135deg, #F3E5AB 0%, #FFD699 30%, #FFF2D1 50%, #E6B86A 75%, #C28B38 100%)',
                    }}
                  >
                    <div className="flex items-center gap-2 text-xs sm:text-sm tracking-wider uppercase font-bold">
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-800 fill-emerald-800/20" />
                      <span>Message to Bride's Family</span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-serif font-medium text-burgundy-900/90 mt-1">
                      (Erande Family)
                    </span>
                  </button>
                </div>

                <p className="text-center font-serif text-[11px] sm:text-xs text-burgundy-800/70 italic">
                  Tap Groom or Bride button to send your congratulations directly via WhatsApp
                </p>

                {/* Google Maps Venue Hyperlink */}
                <div className="pt-2 flex justify-center border-t border-gold-300/40">
                  <a
                    href={event.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full border border-gold-400 bg-white/95 hover:bg-gold-50 text-burgundy-950 font-royal font-bold text-xs tracking-wider shadow-sm hover:shadow-gold-glow active:scale-95 transition-all"
                  >
                    <MapPin className="w-4 h-4 text-rose-700 shrink-0" />
                    <span>Royal Palace, Sangli — Open in Google Maps</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </Layered3DCard>
      </div>
    </section>
  );
};

export default SectionRSVP;
