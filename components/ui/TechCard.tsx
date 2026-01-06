import React, { useRef, useState } from 'react';

interface TechCardProps {
  children: React.ReactNode;
  className?: string;
}

export const TechCard: React.FC<TechCardProps> = ({ children, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25; // Sensitivity
    const y = (e.clientY - top - height / 2) / 25;
    setRotate({ x: -y, y: x });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div 
      className={`perspective-1000 ${className}`} 
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="transition-transform duration-100 ease-out preserve-3d h-full"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border border-white/10 p-6 h-full relative group overflow-hidden">
            {/* Metallic Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>
            
            {/* Hover Glow Border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-900/50 transition-colors duration-500 pointer-events-none z-10" />
            
            <div className="relative z-20">
              {children}
            </div>
        </div>
      </div>
    </div>
  );
};