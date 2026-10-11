import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { FloralDivider, LotusIcon, DiyaIcon } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';
import {
  TextStagger,
  RiseAndSettle,
  Layered3DCard,
  ImageMaskReveal,
  RoyalFlyIn,
  OrnamentReveal,
  CINEMATIC_EASE,
} from './motion/CinematicMotion';

export const SectionFamily = () => {
  const { family, rsvp, event } = invitationData;
  const [selectedBrother, setSelectedBrother] = useState(null);

  return (
    <section
      id="family"
      className="relative py-14 sm:py-24 px-3 sm:px-6 md:px-12 overflow-hidden bg-paper-texture-champagne"
    >
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-10 sm:mb-16 space-y-2 sm:space-y-3 px-2">
          <RiseAndSettle delay={0.1}>
            <span className="font-serif italic text-xs sm:text-sm uppercase tracking-widest text-gold-700 font-semibold">
              Honored Families
            </span>
          </RiseAndSettle>

          <TextStagger
            text={family.heading}
            tag="h2"
            className="font-royal text-2xl sm:text-5xl font-bold text-burgundy-950"
            delay={0.2}
          />

          <FloralDivider className="my-2 sm:my-3" />
        </div>

        {/* Sanskrit Blessing Quote Box with Linear Gradient */}
        <RiseAndSettle delay={0.3} className="max-w-2xl mx-auto mb-8 sm:mb-14">
          <div
            className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-gold-400/60 shadow-royal-card space-y-2 sm:space-y-3"
            style={{
              background: 'linear-gradient(135deg, #FFFDF9 0%, #FAF5EC 50%, #F3EAE0 100%)',
            }}
          >
            <p className="font-sanskrit text-gold-700 text-sm sm:text-lg font-bold">
              ॥ वरं रूपं वरं तेजः वरं भाग्यं वरं यशः ॥
            </p>
            <p className="font-serif italic text-burgundy-900/80 text-xs sm:text-base leading-relaxed">
              "May their union be blessed with eternal love, radiant joy, good fortune, and lifelong companionship."
            </p>
          </div>
        </RiseAndSettle>

        {/* Families Grid: Horizontal Convergence (Groom from Left, Bride from Right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          {/* Groom's Family: Navangul Family (Fly-in from Left) */}
          <RoyalFlyIn direction="left" distance={65} delay={0.15} className="h-full">
            <Layered3DCard tilt={5} className="h-full">
              <div
                className="h-full group rounded-3xl border-2 border-gold-400/60 shadow-royal-card overflow-hidden hover:border-gold-500 hover:-translate-y-1.5 hover:shadow-gold-glow transition-all duration-300 flex flex-col transform-gpu"
                style={{
                  background: 'linear-gradient(135deg, #FFFDF9 0%, #FAF5EC 50%, #F5EDE2 100%)',
                }}
              >
                {/* 1. Parents Photo Frame */}
                {family.groomFamily.image ? (
                  <div className="p-3 sm:p-4 pb-2">
                    <div
                      className="relative aspect-[4/4.8] sm:aspect-[4/4.6] rounded-2xl overflow-hidden p-1 shadow-md"
                      style={{
                        background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 40%, #FFF0BD 70%, #946618 100%)',
                      }}
                    >
                      <div className="w-full h-full rounded-xl overflow-hidden relative bg-burgundy-950">
                        <img
                          src={family.groomFamily.image}
                          alt={family.groomFamily.title}
                          loading="lazy"
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                          style={{ objectPosition: 'center 0%' }}
                        />
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: 'linear-gradient(180deg, transparent 65%, rgba(35, 4, 10, 0.4) 100%)',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* 2. Brother Photo Frame — Immediately below Parents photo, Above the phrase where surnames are put */}
                {family.groomFamily.brotherImage && (
                  <div className="p-3 sm:p-4 pt-1 pb-2">
                    <div
                      className="relative aspect-[4/4.8] sm:aspect-[4/4.6] rounded-2xl overflow-hidden p-1 shadow-md cursor-pointer hover:shadow-gold-glow transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 40%, #FFF0BD 70%, #946618 100%)',
                      }}
                      onClick={() =>
                        setSelectedBrother({
                          image: family.groomFamily.brotherImage,
                        })
                      }
                    >
                      <div className="w-full h-full rounded-xl overflow-hidden relative bg-burgundy-950">
                        <img
                          src={family.groomFamily.brotherImage}
                          alt="Groom's Side"
                          loading="lazy"
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                          style={{ objectPosition: 'center 15%' }}
                        />
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: 'linear-gradient(180deg, transparent 65%, rgba(35, 4, 10, 0.4) 100%)',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Details Content: Groom's Family heading and Surnames */}
                <div className="p-5 sm:p-6 space-y-2.5 text-center flex-1 flex flex-col justify-center">
                  <h3 className="font-royal text-xl sm:text-2xl font-bold text-burgundy-950">
                    {family.groomFamily.title}
                  </h3>
                  <div className="w-12 h-[1px] bg-gold-400 mx-auto" />
                  <div className="space-y-1 text-burgundy-900 font-serif">
                    {family.groomFamily.names.map((name, i) => (
                      <p key={i} className="text-sm sm:text-base font-medium">
                        {name}
                      </p>
                    ))}
                  </div>

                  <div className="pt-2">
                    <a
                      href={`https://wa.me/919405069816?text=${encodeURIComponent(
                        `Hello Navangul Family! Heartiest congratulations and warm wishes on Prathamesh & Revati's Engagement Ceremony!\n\nVenue: Royal Palace, Sangli\nGoogle Maps: ${event.mapUrl}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-gold-400/90 bg-gradient-to-r from-amber-50 to-amber-100/70 hover:from-gold-100 hover:to-gold-200 text-burgundy-950 font-royal text-xs font-bold shadow-xs hover:shadow-gold-glow active:scale-95 transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-700 fill-emerald-700/20" />
                      <span>Message Groom's Family</span>
                    </a>
                  </div>
                </div>
              </div>
            </Layered3DCard>
          </RoyalFlyIn>

          {/* Bride's Family: Erande Family (Fly-in from Right) */}
          <RoyalFlyIn direction="right" distance={65} delay={0.25} className="h-full">
            <Layered3DCard tilt={-5} className="h-full">
              <div
                className="h-full group rounded-3xl border-2 border-gold-400/60 shadow-royal-card overflow-hidden hover:border-gold-500 hover:-translate-y-1.5 hover:shadow-gold-glow transition-all duration-300 flex flex-col transform-gpu"
                style={{
                  background: 'linear-gradient(135deg, #FFFDF9 0%, #FAF5EC 50%, #F5EDE2 100%)',
                }}
              >
                {/* 1. Parents Photo Frame */}
                {family.brideFamily.image ? (
                  <div className="p-3 sm:p-4 pb-2">
                    <div
                      className="relative aspect-[4/4.8] sm:aspect-[4/4.6] rounded-2xl overflow-hidden p-1 shadow-md"
                      style={{
                        background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 40%, #FFF0BD 70%, #946618 100%)',
                      }}
                    >
                      <div className="w-full h-full rounded-xl overflow-hidden relative bg-burgundy-950">
                        <img
                          src={family.brideFamily.image}
                          alt={family.brideFamily.title}
                          loading="lazy"
                          className="w-full h-full object-cover transform scale-[1.22] group-hover:scale-[1.28] transition-transform duration-700 ease-out"
                          style={{ objectPosition: 'center 20%' }}
                        />
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: 'linear-gradient(180deg, transparent 65%, rgba(35, 4, 10, 0.4) 100%)',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* 2. Brother Photo Frame — Immediately below Parents photo, Above the phrase where surnames are put */}
                {family.brideFamily.brotherImage && (
                  <div className="p-3 sm:p-4 pt-1 pb-2">
                    <div
                      className="relative aspect-[4/4.8] sm:aspect-[4/4.6] rounded-2xl overflow-hidden p-1 shadow-md cursor-pointer hover:shadow-gold-glow transition-all duration-300"
                      style={{
                        background: 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 40%, #FFF0BD 70%, #946618 100%)',
                      }}
                      onClick={() =>
                        setSelectedBrother({
                          image: family.brideFamily.brotherImage,
                        })
                      }
                    >
                      <div className="w-full h-full rounded-xl overflow-hidden relative bg-burgundy-950">
                        <img
                          src={family.brideFamily.brotherImage}
                          alt="Bride's Side"
                          loading="lazy"
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                          style={{ objectPosition: 'center 15%' }}
                        />
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: 'linear-gradient(180deg, transparent 65%, rgba(35, 4, 10, 0.4) 100%)',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Details Content: Bride's Family heading and Surnames */}
                <div className="p-5 sm:p-6 space-y-2.5 text-center flex-1 flex flex-col justify-center">
                  <h3 className="font-royal text-xl sm:text-2xl font-bold text-burgundy-950">
                    {family.brideFamily.title}
                  </h3>
                  <div className="w-12 h-[1px] bg-gold-400 mx-auto" />
                  <div className="space-y-1 text-burgundy-900 font-serif">
                    {family.brideFamily.names.map((name, i) => (
                      <p key={i} className="text-sm sm:text-base font-medium">
                        {name}
                      </p>
                    ))}
                  </div>

                  <div className="pt-2">
                    <a
                      href={`https://wa.me/917620028829?text=${encodeURIComponent(
                        `Hello Erande Family! Heartiest congratulations and warm wishes on Revati & Prathamesh's Engagement Ceremony!\n\nVenue: Royal Palace, Sangli\nGoogle Maps: ${event.mapUrl}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border border-gold-400/90 bg-gradient-to-r from-amber-50 to-amber-100/70 hover:from-gold-100 hover:to-gold-200 text-burgundy-950 font-royal text-xs font-bold shadow-xs hover:shadow-gold-glow active:scale-95 transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-700 fill-emerald-700/20" />
                      <span>Message Bride's Family</span>
                    </a>
                  </div>
                </div>
              </div>
            </Layered3DCard>
          </RoyalFlyIn>
        </div>

    {/* Diya Accent */}
    <div className="mt-10 sm:mt-14 flex justify-center items-center gap-3 sm:gap-4 px-2">
      <OrnamentReveal type="scale-rotate" delay={0.35}>
        <DiyaIcon className="w-6 h-6 sm:w-8 sm:h-8" />
      </OrnamentReveal>
      <RiseAndSettle delay={0.4}>
        <span className="font-sanskrit text-[11px] sm:text-xs text-gold-700 tracking-widest">
          ॥ कृतज्ञता व सस्नेह निमंत्रण ॥
        </span>
      </RiseAndSettle>
      <OrnamentReveal type="scale-rotate" delay={0.35}>
        <DiyaIcon className="w-6 h-6 sm:w-8 sm:h-8" />
      </OrnamentReveal>
    </div>
      </div>

      {/* Full Portrait Lightbox Modal */}
      <AnimatePresence>
        {selectedBrother && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-burgundy-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedBrother(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-sm sm:max-w-md w-full rounded-3xl overflow-hidden border-2 border-gold-400 shadow-2xl p-2.5 sm:p-3 text-center"
              style={{
                background: 'linear-gradient(135deg, #2D0814 0%, #150208 100%)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedBrother(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-burgundy-950/90 border border-gold-400/80 text-gold-200 hover:text-gold-100 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-md"
                aria-label="Close"
              >
                ✕
              </button>

              <div className="relative rounded-2xl overflow-hidden max-h-[78vh] flex items-center justify-center bg-black/40 border border-gold-500/20">
                <img
                  src={selectedBrother.image}
                  alt="Portrait"
                  className="w-full h-full max-h-[76vh] object-contain rounded-xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SectionFamily;
