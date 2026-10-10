import React, { useEffect, useRef } from 'react';

export const PetalCanvas = ({ density = 'normal', isCelebration = false, active = true }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    if (!active) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking for gentle atmospheric drift
    let mouse = { x: width / 2, y: height / 2, vx: 0, prevX: width / 2 };
    const handleMouseMove = (e) => {
      mouse.vx = (e.clientX - mouse.prevX) * 0.05;
      mouse.prevX = e.clientX;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Petals, Blossoms, Leaves, and Gold Particles
    const particleTypes = [
      // 1. Full Flowers (Jasmine / Mogra & Rose Blossoms)
      { fill: '#FFFDF0', edge: '#EAD7A1', center: '#F5B041', type: 'fullFlower', name: 'mogra' },
      { fill: '#FFEBF0', edge: '#F8B4C4', center: '#D12D42', type: 'fullFlower', name: 'pinkBlossom' },
      { fill: '#FF9933', edge: '#D35400', center: '#BA4A00', type: 'marigoldBlossom', name: 'marigold' },
      { fill: '#FFB84D', edge: '#E67E22', center: '#D35400', type: 'marigoldBlossom', name: 'yellowMarigold' },
      
      // 2. Auspicious Leaves
      { fill: '#5B8C51', edge: '#3B6033', center: '#7EAD73', type: 'leaf', name: 'emeraldLeaf' },
      { fill: '#78A869', edge: '#4E7341', center: '#96C287', type: 'leaf', name: 'tenderLeaf' },

      // 3. Flower Petals
      { fill: '#D12D42', edge: '#8A0E1C', type: 'petal', name: 'rosePetal' },
      { fill: '#E84A5F', edge: '#B8263B', type: 'petal', name: 'pinkPetal' },
      { fill: '#FF9933', edge: '#FF8000', type: 'petal', name: 'marigoldPetal' },
      { fill: '#FFA726', edge: '#FB8C00', type: 'petal', name: 'goldPetal' },

      // 4. Shimmering Gold Dust
      { fill: '#F7D070', edge: '#D4AF37', type: 'goldDust', name: 'shimmer' },
    ];

    const isMobileDevice = window.innerWidth < 768;
    const count = isCelebration 
      ? (isMobileDevice ? 40 : 85) 
      : density === 'high' 
        ? (isMobileDevice ? 24 : 60) 
        : (isMobileDevice ? 16 : 36);
    const particles = [];

    for (let i = 0; i < count; i++) {
      const pType = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      let baseSize = 10 + Math.random() * 10;
      if (pType.type === 'goldDust') baseSize = 1.5 + Math.random() * 2.5;
      else if (pType.type === 'fullFlower' || pType.type === 'marigoldBlossom') baseSize = 12 + Math.random() * 12;
      else if (pType.type === 'leaf') baseSize = 11 + Math.random() * 9;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: baseSize,
        speedY: (0.7 + Math.random() * 1.5) * (isCelebration ? 1.7 : 1),
        speedX: (Math.random() - 0.5) * 1.1,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.025,
        oscillationSpeed: 0.015 + Math.random() * 0.025,
        oscillationAmp: 18 + Math.random() * 28,
        oscillationOffset: Math.random() * Math.PI * 2,
        opacity: pType.type === 'goldDust' ? 0.7 + Math.random() * 0.3 : 0.55 + Math.random() * 0.4,
        color: pType,
        aspectRatio: 0.7 + Math.random() * 0.5,
        spinSpeed: (Math.random() - 0.5) * 0.03,
      });
    }

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Decaying wind velocity
      mouse.vx *= 0.95;

      particles.forEach((p) => {
        p.y += p.speedY;
        p.angle += p.angularSpeed;
        p.x += p.speedX + Math.sin(frame * p.oscillationSpeed + p.oscillationOffset) * 0.6 + mouse.vx;

        // Wrap around seamlessly
        if (p.y > height + 30) {
          p.y = -30;
          p.x = Math.random() * width;
        }
        if (p.x > width + 30) p.x = -30;
        if (p.x < -30) p.x = width + 30;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.opacity;

        if (p.color.type === 'goldDust') {
          // Shimmering Golden Star / Sparkle
          const sparkle = Math.sin(frame * 0.12 + p.oscillationOffset) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * (0.8 + 0.5 * sparkle), 0, Math.PI * 2);
          ctx.fillStyle = p.color.fill;
          ctx.shadowColor = '#FFE57F';
          ctx.shadowBlur = 9;
          ctx.fill();
        } else if (p.color.type === 'fullFlower') {
          // 🌸 5-Petal Flower (Jasmine / Mogra)
          const petals = 5;
          for (let k = 0; k < petals; k++) {
            const rot = (k * Math.PI * 2) / petals;
            ctx.save();
            ctx.rotate(rot);
            ctx.beginPath();
            ctx.ellipse(0, -p.size * 0.55, p.size * 0.36, p.size * 0.5, 0, 0, Math.PI * 2);
            ctx.fillStyle = p.color.fill;
            ctx.fill();
            ctx.strokeStyle = p.color.edge;
            ctx.lineWidth = 0.6;
            ctx.stroke();
            ctx.restore();
          }
          // Center golden stigma
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.22, 0, Math.PI * 2);
          ctx.fillStyle = p.color.center;
          ctx.shadowColor = '#FFA000';
          ctx.shadowBlur = 4;
          ctx.fill();
        } else if (p.color.type === 'marigoldBlossom') {
          // 🌼 Full Layered Marigold Flower
          for (let layer = 0; layer < 2; layer++) {
            const petalsInLayer = layer === 0 ? 8 : 6;
            const radius = p.size * (layer === 0 ? 0.7 : 0.45);
            for (let k = 0; k < petalsInLayer; k++) {
              const rot = (k * Math.PI * 2) / petalsInLayer + (layer * 0.35);
              ctx.save();
              ctx.rotate(rot);
              ctx.beginPath();
              ctx.ellipse(0, -radius, p.size * 0.3, p.size * 0.4, 0, 0, Math.PI * 2);
              ctx.fillStyle = layer === 0 ? p.color.fill : p.color.edge;
              ctx.fill();
              ctx.restore();
            }
          }
          // Center core
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.26, 0, Math.PI * 2);
          ctx.fillStyle = p.color.center;
          ctx.fill();
        } else if (p.color.type === 'leaf') {
          // 🍃 Sacred Green Leaf with central vein
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.1);
          ctx.quadraticCurveTo(p.size * 0.55, -p.size * 0.2, 0, p.size * 1.1);
          ctx.quadraticCurveTo(-p.size * 0.55, -p.size * 0.2, 0, -p.size * 1.1);
          ctx.closePath();
          ctx.fillStyle = p.color.fill;
          ctx.fill();
          ctx.strokeStyle = p.color.edge;
          ctx.lineWidth = 0.7;
          ctx.stroke();

          // Delicate Center Vein
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 0.9);
          ctx.lineTo(0, p.size * 0.85);
          ctx.strokeStyle = p.color.center;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        } else {
          // 🌺 Curved Flower Petal (Rose / Marigold)
          ctx.scale(1, p.aspectRatio);
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.bezierCurveTo(p.size * 0.85, -p.size * 0.8, p.size * 0.95, p.size * 0.5, 0, p.size);
          ctx.bezierCurveTo(-p.size * 0.95, p.size * 0.5, -p.size * 0.85, -p.size * 0.8, 0, -p.size);
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
  }, [density, isCelebration, active]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-20 w-full h-full transition-opacity duration-700 ${
        active ? 'opacity-90' : 'opacity-0'
      }`}
    />
  );
};
