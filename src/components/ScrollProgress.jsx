import React, { useEffect, useState } from 'react';

export const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed left-3 md:left-6 top-1/4 bottom-1/4 z-40 hidden sm:flex flex-col items-center pointer-events-none">
      {/* Background Track */}
      <div className="relative w-[2px] h-full bg-gold-900/30 rounded-full overflow-visible">
        {/* Filled Gold Line */}
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-gold-300 via-gold-500 to-amber-600 rounded-full transition-all duration-150"
          style={{ height: `${scrollProgress}%` }}
        />

        {/* Floating Diya / Lotus Marker */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-150"
          style={{ top: `${scrollProgress}%` }}
        >
          <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-gold-600 to-gold-200 border border-gold-300 shadow-[0_0_12px_#FFD700] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-900 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
