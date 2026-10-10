import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Sparkles, RefreshCw, CheckCircle2, Hand } from 'lucide-react';
import { FloralDivider, DiyaIcon, LotusIcon, CornerOrnament } from './OrnamentalIcons';
import { invitationData } from '../data/invitation';

export const SectionDateReveal = () => {
  const { event } = invitationData;
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [particles, setParticles] = useState([]);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef(null);
  const isInitializedRef = useRef(false);
  const initialOpaqueCountRef = useRef(1);

  // Sound feedback on scratch / reveal
  const playSparkleSound = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch (e) {}
  };

  const playFanfareSound = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C E G C E royal fanfare chord
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.14, ctx.currentTime + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.07 + 0.7);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.07);
        osc.stop(ctx.currentTime + i * 0.07 + 0.75);
      });
    } catch (e) {}
  };

  // Initialize and paint the beautiful golden rectangular scratch card
  const initScratchCard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const w = rect.width || canvas.offsetWidth || 340;
    const h = rect.height || canvas.offsetHeight || 340;

    if (w <= 10 || h <= 10) {
      requestAnimationFrame(initScratchCard);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);

      const drawContent = () => {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      // Background base metallic gradient for the golden rectangle
      const baseGrad = ctx.createLinearGradient(0, 0, w, h);
      baseGrad.addColorStop(0, '#E6C875'); 
      baseGrad.addColorStop(0.3, '#FFF7D6');
      baseGrad.addColorStop(0.5, '#D4AF37'); 
      baseGrad.addColorStop(0.7, '#FFF7D6');
      baseGrad.addColorStop(1, '#B38B22');
      
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, w, h);

      // Inner elegant borders
      ctx.strokeStyle = 'rgba(255,255,255,0.7)';
      ctx.lineWidth = 2;
      ctx.strokeRect(12, 12, w - 24, h - 24);
      
      ctx.strokeStyle = 'rgba(179, 139, 34, 0.5)';
      ctx.lineWidth = 1;
      ctx.strokeRect(16, 16, w - 32, h - 32);

      // Text
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      ctx.shadowColor = 'rgba(255,255,255,0.8)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetY = 1;
      
      const cx = w / 2;
      const cy = h / 2;

      ctx.fillStyle = '#5A3F00';
      ctx.font = 'bold 22px Cinzel, Georgia, serif';
      ctx.fillText('SCRATCH TO REVEAL', cx, cy - 10);

      ctx.font = 'italic 14px Georgia, serif';
      ctx.fillStyle = '#735200';
      ctx.fillText('our auspicious date', cx, cy + 18);
      
      ctx.shadowColor = 'transparent';
      ctx.restore();

      // Measure initial total opaque pixels inside the image for accurate percentage calculation
      const stride = 12;
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let initialOpaque = 0;
      for (let y = 0; y < canvas.height; y += stride) {
        for (let x = 0; x < canvas.width; x += stride) {
          const idx = (y * canvas.width + x) * 4;
          if (data[idx + 3] > 128) {
            initialOpaque++;
          }
        }
      }
      initialOpaqueCountRef.current = Math.max(1, initialOpaque);

      setScratchPercent(0);
      setIsRevealed(false);
      isInitializedRef.current = true;
    };

    drawContent();
  }, []);

  // Robust observer to ensure canvas paints when visible
  useEffect(() => {
    initScratchCard();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isInitializedRef.current) {
            initScratchCard();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const timer1 = setTimeout(initScratchCard, 200);
    const timer2 = setTimeout(initScratchCard, 800);
    const timer3 = setTimeout(initScratchCard, 2000);

    window.addEventListener('resize', initScratchCard);

    return () => {
      observer.disconnect();
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('resize', initScratchCard);
    };
  }, [initScratchCard]);

  // Check how much of the heart has actually been scratched away
  const calculateScratched = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) return;

    const stride = 12;
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    let clearedCount = 0;
    const totalOpaque = initialOpaqueCountRef.current;

    for (let y = 0; y < h; y += stride) {
      for (let x = 0; x < w; x += stride) {
        const idx = (y * w + x) * 4;
        const alpha = data[idx + 3];
        if (alpha < 30) {
          clearedCount++;
        }
      }
    }

    const totalSampledPixels = Math.ceil(w / stride) * Math.ceil(h / stride);
    const nonHeartPixels = totalSampledPixels - totalOpaque;
    const actualHeartCleared = Math.max(0, clearedCount - nonHeartPixels);

    const percent = Math.min(100, Math.round((actualHeartCleared / totalOpaque) * 100));
    setScratchPercent(percent);

    // Require 60% of the heart to be truly scratched off before triggering full reveal celebration
    if (percent >= 60 && !isRevealed) {
      triggerFullReveal();
    }
  }, [isRevealed]);

  const triggerFullReveal = () => {
    setIsRevealed(true);
    setScratchPercent(100);
    playFanfareSound();
  };

  // Scratch Action (destination-out stroke)
  const scratchAt = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const brushRadius = 26 * dpr;

    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';

    const grad = ctx.createRadialGradient(
      x * dpr, y * dpr, 0,
      x * dpr, y * dpr, brushRadius
    );
    grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
    grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.9)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x * dpr, y * dpr, brushRadius, 0, Math.PI * 2);
    ctx.fill();

    if (lastPosRef.current) {
      ctx.lineWidth = brushRadius * 1.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
      ctx.beginPath();
      ctx.moveTo(lastPosRef.current.x * dpr, lastPosRef.current.y * dpr);
      ctx.lineTo(x * dpr, y * dpr);
      ctx.stroke();
    }

    ctx.restore();
    lastPosRef.current = { x, y };

    if (Math.random() > 0.35) {
      playSparkleSound();
      setParticles((prev) => [
        ...prev.slice(-14),
        {
          id: Math.random(),
          x,
          y,
          size: Math.random() * 7 + 4,
          color: Math.random() > 0.5 ? '#FFE58F' : '#FF69B4',
        },
      ]);
    }
  };

  // Pointer Handlers for mobile touch & desktop drag
  const handlePointerDown = (e) => {
    if (isRevealed) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    isDrawingRef.current = true;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lastPosRef.current = { x, y };
    scratchAt(x, y);
  };

  const handlePointerMove = (e) => {
    if (!isDrawingRef.current || isRevealed) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    scratchAt(x, y);
    calculateScratched();
  };

  const handlePointerUp = () => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
    calculateScratched();
  };

  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent("Prathamesh & Revati's Engagement Ceremony");
    const details = encodeURIComponent("You are cordially invited to celebrate the engagement ceremony of Prathamesh & Revati.");
    const location = encodeURIComponent(`${event.venue}, ${event.address}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261024T053000Z/20261024T103000Z&details=${details}&location=${location}`;
  };

  const downloadIcsFile = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Prathamesh & Revati Engagement//EN',
      'BEGIN:VEVENT',
      'UID:engagement-prathamesh-revati-20261024',
      'DTSTAMP:20261024T000000Z',
      'DTSTART:20261024T043000Z',
      'DTEND:20261024T103000Z',
      'SUMMARY:Prathamesh & Revati Engagement Ceremony',
      `DESCRIPTION:Join us for the Engagement Ceremony of Prathamesh & Revati at ${event.venue}.`,
      `LOCATION:${event.venue}, ${event.address}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'prathamesh-revati-engagement.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="date"
      className="relative py-14 sm:py-24 px-3 sm:px-6 md:px-12 overflow-hidden bg-paper-texture-champagne"
    >
      {/* Radiant Golden Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-roseGold-400/15 rounded-full blur-3xl pointer-events-none animate-pulse" />


      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2 px-2"
        >
          <span className="font-serif italic text-xs sm:text-sm uppercase tracking-widest text-gold-700 font-semibold">
            Sacred Auspicious Moment
          </span>
          <h2 className="font-royal text-2xl sm:text-5xl font-bold text-burgundy-950">
            Save The Auspicious Date
          </h2>
          <FloralDivider className="my-2" />
          <p className="font-serif italic text-burgundy-900/80 text-xs sm:text-base">
            Rub and scratch the golden card below with your finger to reveal the auspicious engagement date.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* GRAND ROYAL DATE REVEAL CARD CONTAINER                                    */}
        {/* ========================================================================= */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 45, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-lg mx-auto rounded-3xl border-2 border-gold-400 shadow-royal-card hover:border-gold-500 hover:shadow-gold-glow overflow-hidden p-5 sm:p-9 text-center transition-all duration-300 transform-gpu"
          style={{
            background: 'linear-gradient(135deg, #FFFDF9 0%, #FAF5EC 50%, #F3EAE0 100%)',
          }}
        >
          {/* Corner Filigrees */}
          <div className="absolute top-2 left-2 pointer-events-none opacity-70">
            <CornerOrnament className="w-8 h-8 sm:w-11 sm:h-11" />
          </div>
          <div className="absolute top-2 right-2 rotate-90 pointer-events-none opacity-70">
            <CornerOrnament className="w-8 h-8 sm:w-11 sm:h-11" />
          </div>
          <div className="absolute bottom-2 left-2 -rotate-90 pointer-events-none opacity-70">
            <CornerOrnament className="w-8 h-8 sm:w-11 sm:h-11" />
          </div>
          <div className="absolute bottom-2 right-2 rotate-180 pointer-events-none opacity-70">
            <CornerOrnament className="w-8 h-8 sm:w-11 sm:h-11" />
          </div>

          {/* Sanskrit Header Badge */}
          <div
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gold-500/30 text-gold-800 font-sanskrit text-xs sm:text-sm mb-4 sm:mb-6 shadow-xs"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(245, 230, 167, 0.3) 100%)',
            }}
          >
            <LotusIcon className="w-4 h-4 text-gold-600" />
            <span>॥ ॐ श्री गणेशाय नमः • वाङ्निश्चय मुहूर्त ॥</span>
          </div>

          {/* ========================================================================= */}
          {/* THE GOLDEN RECTANGULAR SCRATCH CONTAINER                                  */}
          {/* ========================================================================= */}
          <div className="relative w-full max-w-sm h-[260px] sm:h-[280px] mx-auto flex items-center justify-center my-2 select-none touch-none shadow-xl rounded-3xl overflow-hidden border border-gold-400/30">
            
            {/* ------------------------------------------------------------- */}
            {/* UNDERNEATH LAYER: THE REVEALED ROYAL DATE SCROLL              */}
            {/* ------------------------------------------------------------- */}
            <div
              className="absolute inset-0 flex flex-col justify-center items-center p-5 text-center shadow-inner transition-all duration-700 bg-burgundy-950"
              style={{
                background: 'linear-gradient(135deg, #3D0A14 0%, #5C0E1C 50%, #200308 100%)',
              }}
            >
              <div className="flex items-center justify-center gap-1.5 text-gold-400 mb-1">
                <DiyaIcon className="w-3.5 h-3.5" />
                <span className="font-serif text-[10px] sm:text-xs uppercase tracking-widest text-gold-300 font-semibold">
                  Auspicious Engagement Day
                </span>
                <DiyaIcon className="w-3.5 h-3.5" />
              </div>

              {/* Big Day Number 24 with Royal Gold Gradient */}
              <div className="py-1">
                <span className="font-royal text-6xl sm:text-7xl font-black gold-gradient-text tracking-tight block drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] leading-none">
                  {event.dayNum}
                </span>
                <span className="font-royal text-base sm:text-xl font-bold tracking-widest text-gold-200 uppercase block mt-1">
                  {event.month} {event.year}
                </span>
                <span className="font-serif italic text-xs sm:text-sm text-gold-300/90 block">
                  {event.day} • शनिवार
                </span>
              </div>

              {/* Muhurat Time Chip */}
              <div className="px-3 py-1 rounded-full bg-burgundy-950/80 border border-gold-400/50 flex items-center justify-center gap-1.5 text-gold-200 text-[11px] sm:text-xs shadow-md">
                <Clock className="w-3 h-3 text-gold-400" />
                <span className="font-bold">शुभ मुहूर्त : सकाळी ११:०० वा.</span>
              </div>

              <div className="text-[10px] sm:text-xs font-sanskrit text-gold-300/80 mt-1">
                कार्तिक शुद्ध चतुर्दशी • शुभ नक्षत्र
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* TOP SCRATCH LAYER: GOLDEN CANVAS RECTANGLE                    */}
            {/* ------------------------------------------------------------- */}
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className={`absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-700 z-20 ${
                isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
              style={{ touchAction: 'none' }}
            />

            {/* Floating Sparkle Particles when scratching */}
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0, scale: 0, y: -24, x: (Math.random() - 0.5) * 24 }}
                transition={{ duration: 0.6 }}
                className="absolute rounded-full pointer-events-none z-30"
                style={{
                  left: p.x,
                  top: p.y,
                  width: p.size,
                  height: p.size,
                  backgroundColor: p.color,
                  boxShadow: `0 0 10px ${p.color}`,
                }}
              />
            ))}

            {/* Pulsing Touch Indicator Hand */}
            {!isRevealed && scratchPercent < 15 && (
              <motion.div
                animate={{ scale: [1, 1.08, 1], y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                className="absolute bottom-2 inset-x-0 mx-auto w-max px-3.5 py-1 rounded-full bg-burgundy-950/90 border border-gold-400/80 backdrop-blur-md text-[11px] font-serif text-gold-200 pointer-events-none z-30 shadow-xl flex items-center gap-1.5"
              >
                <Hand className="w-3.5 h-3.5 text-gold-400 animate-bounce" />
                <span>Rub or Scratch Card 👆</span>
              </motion.div>
            )}
          </div>

          {/* Reveal Status / Progress */}
          <div className="mt-4 flex flex-col items-center justify-center gap-3">
            {!isRevealed ? (
              scratchPercent > 5 && (
                <div className="text-xs font-serif text-gold-800 font-semibold">
                  {scratchPercent}% Scratched ✨
                </div>
              )
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 pt-1">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/20 border border-emerald-600/40 text-emerald-800 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Auspicious Date Revealed!</span>
                </div>

                <button
                  onClick={initScratchCard}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/90 border border-gold-400 text-burgundy-950 text-xs font-serif font-semibold shadow-xs hover:bg-gold-50 active:scale-95 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-gold-600" />
                  <span>Scratch Again ↺</span>
                </button>
              </div>
            )}

            {/* Calendar Add Action Buttons (Visible once revealed) */}
            <AnimatePresence>
              {isRevealed && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full grid grid-cols-2 gap-2 sm:gap-3 pt-2 max-w-sm mx-auto"
                >
                  <a
                    href={getGoogleCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-gold-200 hover:text-white border border-gold-500/40 text-xs font-serif font-semibold transition-all shadow-sm active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, #3D0A14 0%, #200308 100%)',
                    }}
                  >
                    <Calendar className="w-3.5 h-3.5 text-gold-400" />
                    <span>Google Calendar</span>
                  </a>

                  <button
                    onClick={downloadIcsFile}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-burgundy-950 hover:bg-gold-50 border border-gold-400 text-xs font-serif font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF5EC 100%)',
                    }}
                  >
                    <Calendar className="w-3.5 h-3.5 text-burgundy-800" />
                    <span>Apple / Outlook (.ICS)</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default SectionDateReveal;
