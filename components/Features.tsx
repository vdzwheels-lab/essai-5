import React from 'react';
import { FEATURES } from '../constants';
import { TechCard } from './ui/TechCard';
import { Hammer, ShieldCheck, Wind, Scan } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Hammer: <Hammer className="w-8 h-8" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8" />,
  Wind: <Wind className="w-8 h-8" />
};

export const Features: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-black">
      
      {/* --- COMPLEX LASER MATRIX BACKGROUND (NO GRADIENT) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          
          {/* 1. Grid Floor (Depth perception) */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(40,40,40,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(40,40,40,0.3)_1px,transparent_1px)] bg-[size:50px_50px] opacity-10 transform perspective-1000 rotateX(20deg) scale-110"></div>

          {/* 2. Rotating Security Lasers (Giant Crossing Beams) */}
          <div className="absolute top-[50%] left-[50%] w-[150%] h-[1px] bg-red-600/30 shadow-[0_0_10px_red] -translate-x-1/2 -translate-y-1/2 animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute top-[50%] left-[50%] w-[1px] h-[150%] bg-red-600/30 shadow-[0_0_10px_red] -translate-x-1/2 -translate-y-1/2 animate-[spin_15s_linear_infinite_reverse]"></div>

          {/* 3. Vertical Laser Curtain (Random interval blinking) */}
          <div className="absolute inset-0 flex justify-between px-4 sm:px-20 opacity-50">
             {[...Array(5)].map((_, i) => (
                <div key={i} className="w-[1px] h-full bg-red-600 shadow-[0_0_8px_red]" style={{ 
                    opacity: 0.3,
                    animation: `laser-pulse ${3 + i}s infinite alternate` 
                }}></div>
             ))}
          </div>

          {/* 4. Horizontal Scanners (The main scan effect) */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500 shadow-[0_0_15px_#ef4444] animate-[scan_4s_linear_infinite] opacity-90"></div>
          <div className="absolute top-0 left-0 w-full h-[1px] bg-red-500/50 animate-[scan_6s_linear_infinite_1s] opacity-60"></div>

          {/* 5. Diagonal Fast Beams (Shooting across) */}
          <div className="absolute top-[-20%] left-[-20%] w-[2px] h-[150%] bg-red-600/20 rotate-45 transform animate-[shimmer_5s_infinite]"></div>

      </div>

      <style>{`
        @keyframes laser-pulse {
            0% { height: 10%; opacity: 0; }
            50% { height: 100%; opacity: 0.6; }
            100% { height: 100%; opacity: 0.1; }
        }
        @keyframes scan {
            0% { top: -10%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 110%; opacity: 0; }
        }
      `}</style>

      {/* Content Container (z-10 to sit above lasers) */}
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Block with Glass effect to make text readable over lasers */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-zinc-800 pb-8 bg-black/60 backdrop-blur-sm p-6 rounded-xl border border-white/5">
          <div>
            <div className="flex items-center gap-2 mb-2">
                <Scan className="w-4 h-4 text-red-600 animate-spin-slow" />
                <span className="text-xs font-orbitron text-red-500 tracking-widest">SYSTEME DE CALIBRAGE ACTIF</span>
            </div>
            <h2 className="font-orbitron text-4xl md:text-6xl font-bold text-white uppercase relative">
              Excellence <br /> <span className="text-red-600 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">Ingénierie</span>
            </h2>
          </div>
          <div className="text-right mt-6 md:mt-0">
            <p className="font-rajdhani text-gray-400 max-w-xs">
              0% Compromis. 100% Performance.<br />
              Le détail pour les passionnés.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => (
            <div 
              key={idx} 
              className={`${idx === 1 ? 'lg:translate-y-16' : ''}`} 
            >
              <TechCard className="h-full border-zinc-800 bg-black/90 backdrop-blur hover:border-red-600 transition-colors group">
                <div className="text-red-600 mb-6 drop-shadow-[0_0_5px_rgba(220,38,38,0.8)] group-hover:scale-110 transition-transform duration-300">{iconMap[feature.icon]}</div>
                <h3 className="font-orbitron text-xl font-bold text-white mb-4 tracking-wider">{feature.title}</h3>
                <p className="font-rajdhani text-gray-400 leading-relaxed text-lg">
                  {feature.description}
                </p>
                
                {/* Laser lines inside card border */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-red-900 group-hover:bg-red-500 transition-colors duration-500"></div>
                <div className="absolute top-0 right-0 h-full w-[1px] bg-red-900 group-hover:bg-red-500 transition-colors duration-500 opacity-0 group-hover:opacity-100"></div>
                
                <div className="absolute bottom-4 right-4 text-[10px] text-zinc-600 font-orbitron group-hover:text-red-500 transition-colors">0{idx + 1} // SYS</div>
              </TechCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
