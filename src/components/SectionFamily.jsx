import React from 'react';
import { FloralDivider, LotusIcon, DiyaIcon } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';

export const SectionFamily = () => {
  const { family } = invitationData;

  return (
    <section
      id="family"
      className="relative py-24 px-4 sm:px-6 md:px-12 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FDF9F2 0%, #F5EBE0 50%, #ECE0CF 100%)',
      }}
    >
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-serif italic text-xs sm:text-sm uppercase tracking-widest text-gold-700 font-semibold">
            Honored Families
          </span>
          <h2 className="font-royal text-3xl sm:text-5xl font-bold text-burgundy-950">
            {family.heading}
          </h2>
          <FloralDivider className="my-3" />
        </div>

        {/* Sanskrit Blessing Quote Box with Linear Gradient */}
        <div
          className="mb-14 p-6 sm:p-8 rounded-3xl border border-gold-400/60 shadow-royal-card max-w-2xl mx-auto space-y-3"
          style={{
            background: 'linear-gradient(135deg, #FFFDF9 0%, #FAF5EC 50%, #F3EAE0 100%)',
          }}
        >
          <p className="font-sanskrit text-gold-700 text-base sm:text-lg font-bold">
            ॥ वरं रूपं वरं तेजः वरं भाग्यं वरं यशः ॥
          </p>
          <p className="font-serif italic text-burgundy-900/80 text-sm sm:text-base leading-relaxed">
            "May their union be blessed with eternal love, radiant joy, good fortune, and lifelong companionship."
          </p>
        </div>

        {/* Families Grid with Subtle Diagonal Ivory-Sand Gradient */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Groom's Family */}
          <div
            className="p-8 rounded-3xl border-2 border-gold-400/60 shadow-royal-card space-y-4 hover:border-gold-500 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #FFFDF9 0%, #FAF5EC 50%, #F5EDE2 100%)',
            }}
          >
            <div className="flex justify-center">
              <div
                className="p-3 rounded-full border border-gold-400/40"
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(245, 230, 167, 0.3) 100%)',
                }}
              >
                <LotusIcon className="w-8 h-8 text-gold-600" />
              </div>
            </div>
            <h3 className="font-royal text-2xl font-bold text-burgundy-950">
              {family.groomFamily.title}
            </h3>
            <div className="w-12 h-[1px] bg-gold-400 mx-auto" />
            <div className="space-y-1.5 text-burgundy-900 font-serif">
              {family.groomFamily.names.map((name, i) => (
                <p key={i} className="text-base font-medium">
                  {name}
                </p>
              ))}
            </div>
          </div>

          {/* Bride's Family */}
          <div
            className="p-8 rounded-3xl border-2 border-gold-400/60 shadow-royal-card space-y-4 hover:border-gold-500 transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #FFFDF9 0%, #FAF5EC 50%, #F5EDE2 100%)',
            }}
          >
            <div className="flex justify-center">
              <div
                className="p-3 rounded-full border border-gold-400/40"
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(245, 230, 167, 0.3) 100%)',
                }}
              >
                <LotusIcon className="w-8 h-8 text-gold-600" />
              </div>
            </div>
            <h3 className="font-royal text-2xl font-bold text-burgundy-950">
              {family.brideFamily.title}
            </h3>
            <div className="w-12 h-[1px] bg-gold-400 mx-auto" />
            <div className="space-y-1.5 text-burgundy-900 font-serif">
              {family.brideFamily.names.map((name, i) => (
                <p key={i} className="text-base font-medium">
                  {name}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Diya Accent */}
        <div className="mt-14 flex justify-center items-center gap-4">
          <DiyaIcon className="w-8 h-8" />
          <span className="font-sanskrit text-xs text-gold-700 tracking-widest">
            ॥ कृतज्ञता व सस्नेह निमंत्रण ॥
          </span>
          <DiyaIcon className="w-8 h-8" />
        </div>
      </div>
    </section>
  );
};
