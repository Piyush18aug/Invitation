import React from 'react';
import { FloralDivider, LotusIcon, DiyaIcon } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';

export const SectionFamily = () => {
  const { family } = invitationData;

  return (
    <section
      id="family"
      className="relative py-14 sm:py-24 px-3 sm:px-6 md:px-12 overflow-hidden bg-paper-texture-champagne"
    >
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-10 sm:mb-16 space-y-2 sm:space-y-3 px-2">
          <span className="font-serif italic text-xs sm:text-sm uppercase tracking-widest text-gold-700 font-semibold">
            Honored Families
          </span>
          <h2 className="font-royal text-2xl sm:text-5xl font-bold text-burgundy-950">
            {family.heading}
          </h2>
          <FloralDivider className="my-2 sm:my-3" />
        </div>

        {/* Sanskrit Blessing Quote Box with Linear Gradient */}
        <div
          className="mb-8 sm:mb-14 p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-gold-400/60 shadow-royal-card max-w-2xl mx-auto space-y-2 sm:space-y-3"
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

        {/* Families Grid with Subtle Diagonal Ivory-Sand Gradient */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          {/* Groom's Family: Navangul Family */}
          <div
            className="group rounded-3xl border-2 border-gold-400/60 shadow-royal-card overflow-hidden hover:border-gold-500 transition-all duration-300 flex flex-col"
            style={{
              background: 'linear-gradient(135deg, #FFFDF9 0%, #FAF5EC 50%, #F5EDE2 100%)',
            }}
          >
            {/* Family Photo Frame if available */}
            {family.groomFamily.image ? (
              <div className="p-3 sm:p-4 pb-0">
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
            ) : (
              <div className="pt-6 sm:pt-8 flex justify-center">
                <div
                  className="p-3 rounded-full border border-gold-400/40"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(245, 230, 167, 0.3) 100%)',
                  }}
                >
                  <LotusIcon className="w-8 h-8 text-gold-600" />
                </div>
              </div>
            )}

            {/* Details Content */}
            <div className="p-5 sm:p-8 space-y-3 sm:space-y-4 flex-1 flex flex-col justify-center">
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
            </div>
          </div>

          {/* Bride's Family: Erande Family */}
          <div
            className="group rounded-3xl border-2 border-gold-400/60 shadow-royal-card overflow-hidden hover:border-gold-500 transition-all duration-300 flex flex-col"
            style={{
              background: 'linear-gradient(135deg, #FFFDF9 0%, #FAF5EC 50%, #F5EDE2 100%)',
            }}
          >
            {/* Family Photo Frame if available */}
            {family.brideFamily.image ? (
              <div className="p-3 sm:p-4 pb-0">
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
            ) : (
              <div className="py-12 sm:py-16 flex flex-col items-center justify-center flex-1">
                <div
                  className="p-4 sm:p-5 rounded-full border border-gold-400/40 mb-3"
                  style={{
                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(245, 230, 167, 0.3) 100%)',
                  }}
                >
                  <LotusIcon className="w-10 h-10 sm:w-12 sm:h-12 text-gold-600" />
                </div>
                <span className="font-serif italic text-xs uppercase tracking-widest text-gold-700 font-semibold">
                  Photo Coming Soon
                </span>
              </div>
            )}

            {/* Details Content */}
            <div className="p-5 sm:p-8 space-y-3 sm:space-y-4 flex-1 flex flex-col justify-center">
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
            </div>
          </div>
        </div>

        {/* Diya Accent */}
        <div className="mt-10 sm:mt-14 flex justify-center items-center gap-3 sm:gap-4 px-2">
          <DiyaIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          <span className="font-sanskrit text-[11px] sm:text-xs text-gold-700 tracking-widest">
            ॥ कृतज्ञता व सस्नेह निमंत्रण ॥
          </span>
          <DiyaIcon className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
      </div>
    </section>
  );
};

export default SectionFamily;
