import React from 'react';

export const GaneshaIcon = ({ className = "w-12 h-12 text-gold-500" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor">
    <path d="M50 10 C45 10 40 14 38 19 C35 15 28 15 24 20 C20 25 22 33 26 38 C24 44 26 52 30 57 C33 61 38 64 43 65 C41 70 38 75 33 78 C30 80 32 85 36 85 C43 85 49 78 52 70 C55 78 61 85 68 85 C72 85 74 80 71 78 C66 75 63 70 61 65 C66 64 71 61 74 57 C78 52 80 44 78 38 C82 33 84 25 80 20 C76 15 69 15 66 19 C64 14 59 10 50 10 Z M50 20 C53 20 56 23 56 27 C56 31 53 34 50 34 C47 34 44 31 44 27 C44 23 47 20 50 20 Z M42 40 C44 38 48 38 50 40 C52 38 56 38 58 40 C62 44 60 52 56 56 C53 59 47 59 44 56 C40 52 38 44 42 40 Z" opacity="0.95" />
    <circle cx="50" cy="22" r="3" fill="#FFE57F" />
    <path d="M47 32 Q50 38 53 32" stroke="#AA8232" strokeWidth="1.5" fill="none" />
  </svg>
);

export const DiyaIcon = ({ className = "w-10 h-10", isLit = true }) => (
  <div className={`relative inline-flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 64 64" className="w-full h-full overflow-visible">
      {/* Diya Base - Brass/Gold */}
      <defs>
        <linearGradient id="goldDiyaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF0BD" />
          <stop offset="40%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8B7020" />
        </linearGradient>
        <radialGradient id="flameGrad" cx="50%" cy="80%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#FFF275" />
          <stop offset="60%" stopColor="#FF8C00" />
          <stop offset="100%" stopColor="#FF2200" stopOpacity="0.8" />
        </radialGradient>
      </defs>

      {/* Stand & Base */}
      <ellipse cx="32" cy="56" rx="14" ry="4" fill="url(#goldDiyaGrad)" />
      <path d="M28 54 L32 46 L36 54 Z" fill="url(#goldDiyaGrad)" />
      <path d="M12 40 C14 52 50 52 52 40 C54 35 48 36 32 37 C16 36 10 35 12 40 Z" fill="url(#goldDiyaGrad)" stroke="#FFE57F" strokeWidth="0.75" />
      <ellipse cx="32" cy="38" rx="18" ry="4" fill="#6E4815" />

      {/* Flame */}
      {isLit && (
        <g className="animate-flame origin-bottom">
          <ellipse cx="32" cy="24" rx="9" ry="15" fill="rgba(255,165,0,0.25)" filter="blur(3px)" />
          <path d="M32 8 C36 17 40 23 37 28 C34 32 30 32 27 28 C24 23 28 17 32 8 Z" fill="url(#flameGrad)" />
          <ellipse cx="32" cy="27" rx="2.5" ry="4" fill="#FFFFFF" opacity="0.9" />
        </g>
      )}
    </svg>
  </div>
);

export const LotusIcon = ({ className = "w-8 h-8 text-gold-400" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="currentColor">
    <path d="M32 14 C35 24 38 34 32 46 C26 34 29 24 32 14 Z" opacity="0.9" />
    <path d="M32 22 C39 28 48 34 44 46 C37 45 33 38 32 22 Z" opacity="0.75" />
    <path d="M32 22 C25 28 16 34 20 46 C27 45 31 38 32 22 Z" opacity="0.75" />
    <path d="M32 32 C43 36 54 41 49 50 C41 50 35 44 32 32 Z" opacity="0.6" />
    <path d="M32 32 C21 36 10 41 15 50 C23 50 29 44 32 32 Z" opacity="0.6" />
    <ellipse cx="32" cy="50" rx="16" ry="2.5" opacity="0.8" />
  </svg>
);

export const RingIcon = ({ className = "w-8 h-8 text-gold-400" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="26" cy="36" r="14" stroke="url(#goldDiyaGrad)" />
    <circle cx="38" cy="30" r="14" stroke="url(#goldDiyaGrad)" />
    <path d="M38 12 L41 16 L38 20 L35 16 Z" fill="#FFE57F" stroke="#D4AF37" strokeWidth="1" />
    <circle cx="38" cy="16" r="1.5" fill="#FFFFFF" />
  </svg>
);

export const CornerOrnament = ({ className = "w-16 h-16 text-gold-500", style = {} }) => (
  <svg className={className} style={style} viewBox="0 0 100 100" fill="none" stroke="currentColor">
    <path d="M5 5 L95 5 M5 5 L5 95" strokeWidth="2" stroke="url(#goldDiyaGrad)" />
    <path d="M12 12 L75 12 M12 12 L12 75" strokeWidth="1" stroke="#D4AF37" opacity="0.6" />
    <circle cx="5" cy="5" r="4" fill="#D4AF37" />
    <path d="M15 15 Q35 15 45 35 Q45 55 25 55 Q15 45 15 15 Z" fill="rgba(212, 175, 55, 0.1)" stroke="#D4AF37" strokeWidth="1.2" />
    <circle cx="30" cy="30" r="3" fill="#D4AF37" />
    <path d="M5 45 Q25 45 35 25" stroke="#ECC872" strokeWidth="1" strokeDasharray="2 2" />
    <path d="M45 5 Q45 25 25 35" stroke="#ECC872" strokeWidth="1" strokeDasharray="2 2" />
  </svg>
);

export const FloralDivider = ({ className = "w-full max-w-md mx-auto my-6" }) => (
  <div className={`flex items-center justify-center gap-3 ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-500 to-gold-300"></div>
    <div className="flex items-center gap-1.5 text-gold-500">
      <span className="text-xs">✦</span>
      <LotusIcon className="w-6 h-6 text-gold-500" />
      <span className="text-xs">✦</span>
    </div>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold-500 to-gold-300"></div>
  </div>
);
