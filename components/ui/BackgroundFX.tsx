import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
}

export const BackgroundFX: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let shootingStar: ShootingStar | null = null;

    // Configuration
    const STAR_COUNT = 150;
    const SHOOTING_STAR_CHANCE = 0.005; // Chance par frame

    // Resize handling
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };
    
    const initStars = () => {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5, // 0.5 to 2px
          opacity: Math.random(),
          speedX: (Math.random() - 0.5) * 0.1, // Very slow drift
          speedY: (Math.random() - 0.5) * 0.1,
          twinkleSpeed: Math.random() * 0.05 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2
        });
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and Draw Stars
      stars.forEach(star => {
        // Twinkle calculation
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.5 + 0.5; // 0 to 1
        const currentOpacity = star.opacity * (0.5 + twinkle * 0.5); // Never fully invisible

        // Movement
        star.x += star.speedX;
        star.y += star.speedY;

        // Wrap around screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Draw
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const updateShootingStar = () => {
      // Spawn new shooting star
      if (!shootingStar && Math.random() < SHOOTING_STAR_CHANCE) {
        shootingStar = {
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height / 2), // Spawn mostly in top half
          length: 0,
          speed: 15 + Math.random() * 10,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2, // 45 degrees +/- var
          opacity: 1,
          active: true
        };
      }

      if (shootingStar && shootingStar.active) {
        // Move head
        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        
        // Grow tail then shrink opacity
        if (shootingStar.length < 100) {
            shootingStar.length += 5;
        } else {
            shootingStar.opacity -= 0.02;
        }

        // Draw
        if (shootingStar.opacity > 0) {
            const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
            const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;

            const gradient = ctx.createLinearGradient(shootingStar.x, shootingStar.y, tailX, tailY);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(shootingStar.x, shootingStar.y);
            ctx.lineTo(tailX, tailY);
            ctx.stroke();

            // Head Glow
            ctx.shadowBlur = 10;
            ctx.shadowColor = "white";
            ctx.fillStyle = `rgba(255, 255, 255, ${shootingStar.opacity})`;
            ctx.beginPath();
            ctx.arc(shootingStar.x, shootingStar.y, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        } else {
            shootingStar.active = false;
            shootingStar = null;
        }

        // Check bounds
        if (shootingStar && (shootingStar.x > canvas.width + 100 || shootingStar.y > canvas.height + 100)) {
            shootingStar.active = false;
            shootingStar = null;
        }
      }
    };

    const render = () => {
      drawStars();
      updateShootingStar();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
        ref={canvasRef} 
        className="fixed inset-0 z-0 pointer-events-none mix-blend-screen"
        style={{ opacity: 0.8 }} 
    />
  );
};
