import React from 'react';

interface MarqueeProps {
  text: string;
  direction?: 'left' | 'right';
  speed?: number;
}

export const Marquee: React.FC<MarqueeProps> = ({ text, direction = 'left', speed = 20 }) => {
  return (
    <div className="relative flex overflow-x-hidden bg-red-900/10 border-t border-b border-red-900/30 py-4 select-none backdrop-blur-sm">
      <div className={`py-2 animate-marquee whitespace-nowrap flex gap-8 ${direction === 'right' ? 'animate-marquee-reverse' : ''}`} style={{ animationDuration: `${speed}s` }}>
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-4xl md:text-6xl font-black font-orbitron text-transparent px-4 uppercase italic tracking-tighter" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
            {text} <span className="text-red-600 inline-block transform skew-x-[-20deg]">///</span>
          </span>
        ))}
      </div>
      <div className={`absolute top-0 py-2 animate-marquee2 whitespace-nowrap flex gap-8 ${direction === 'right' ? 'animate-marquee2-reverse' : ''}`} style={{ animationDuration: `${speed}s` }}>
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-4xl md:text-6xl font-black font-orbitron text-transparent px-4 uppercase italic tracking-tighter" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
            {text} <span className="text-red-600 inline-block transform skew-x-[-20deg]">///</span>
          </span>
        ))}
      </div>
      
      {/* Styles injectés localement pour l'animation custom */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }
        @keyframes marquee2-reverse {
          0% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        .animate-marquee { animation: marquee linear infinite; }
        .animate-marquee2 { animation: marquee2 linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse linear infinite; }
        .animate-marquee2-reverse { animation: marquee2-reverse linear infinite; }
      `}</style>
    </div>
  );
};