import React, { useEffect, useRef } from 'react';

export const PetalCanvas = ({ density = 'normal', isCelebration = false }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking for gentle wind
    let mouse = { x: width / 2, y: height / 2, vx: 0, prevX: width / 2 };
    const handleMouseMove = (e) => {
      mouse.vx = (e.clientX - mouse.prevX) * 0.05;
      mouse.prevX = e.clientX;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Petal & particle classes
    const petalColors = [
      { fill: '#FF9933', edge: '#FF8000', type: 'marigold' }, // Marigold
      { fill: '#FFB84D', edge: '#E67300', type: 'marigold' },
      { fill: '#D12D42', edge: '#8A0E1C', type: 'rose' },     // Red Rose
      { fill: '#E84A5F', edge: '#B8263B', type: 'rose' },
      { fill: '#F7D070', edge: '#D4AF37', type: 'goldDust' }, // Gold speckle
    ];

    const count = isCelebration ? 75 : density === 'high' ? 50 : 28;
    const particles = [];

    for (let i = 0; i < count; i++) {
      const colorObj = petalColors[Math.floor(Math.random() * petalColors.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: colorObj.type === 'goldDust' ? 1.5 + Math.random() * 2.5 : 8 + Math.random() * 12,
        speedY: (0.8 + Math.random() * 1.6) * (isCelebration ? 1.8 : 1),
        speedX: (Math.random() - 0.5) * 1.2,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.03,
        oscillationSpeed: 0.02 + Math.random() * 0.03,
        oscillationAmp: 20 + Math.random() * 30,
        oscillationOffset: Math.random() * Math.PI * 2,
        opacity: 0.4 + Math.random() * 0.5,
        color: colorObj,
        aspectRatio: 0.6 + Math.random() * 0.6,
      });
    }

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Decaying wind
      mouse.vx *= 0.95;

      particles.forEach((p) => {
        p.y += p.speedY;
        p.angle += p.angularSpeed;
        p.x += p.speedX + Math.sin(frame * p.oscillationSpeed + p.oscillationOffset) * 0.5 + mouse.vx;

        // Wrap around
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.opacity;

        if (p.color.type === 'goldDust') {
          // Shimmering gold particle
          const sparkle = Math.sin(frame * 0.1 + p.oscillationOffset) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * (0.8 + 0.4 * sparkle), 0, Math.PI * 2);
          ctx.fillStyle = p.color.fill;
          ctx.shadowColor = '#FFE57F';
          ctx.shadowBlur = 8;
          ctx.fill();
        } else {
          // Flower Petal shape (Rose / Marigold)
          ctx.scale(1, p.aspectRatio);
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.8, p.size * 0.9, p.size * 0.5, 0, p.size);
          ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.5, -p.size * 0.8, -p.size * 0.8, 0, -p.size);
          ctx.closePath();

          ctx.fillStyle = p.color.fill;
          ctx.fill();

          ctx.strokeStyle = p.color.edge;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, isCelebration]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20 w-full h-full"
      style={{ opacity: 0.85 }}
    />
  );
};
