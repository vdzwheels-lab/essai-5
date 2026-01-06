import React from 'react';
import { FEATURES } from '../constants';
import { TechCard } from './ui/TechCard';
import { Hammer, ShieldCheck, Wind } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Hammer: <Hammer className="w-8 h-8" />,
  ShieldCheck: <ShieldCheck className="w-8 h-8" />,
  Wind: <Wind className="w-8 h-8" />
};

export const Features: React.FC = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-8">
          <h2 className="font-orbitron text-4xl md:text-6xl font-bold text-metal uppercase">
            Excellence <br /> <span className="text-metal-red">Ingénierie</span>
          </h2>
          <div className="text-right mt-6 md:mt-0">
            <p className="font-rajdhani text-gray-400 max-w-xs">
              0% Compromis. 100% Performance.<br />
              Le détail pour les passionnés.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => (
            <div 
              key={idx} 
              className={`${idx === 1 ? 'lg:translate-y-16' : ''}`} /* Staggered Layout */
            >
              <TechCard className="h-full">
                <div className="text-red-600 mb-6">{iconMap[feature.icon]}</div>
                <h3 className="font-orbitron text-xl font-bold text-white mb-4 tracking-wider">{feature.title}</h3>
                <p className="font-rajdhani text-gray-400 leading-relaxed text-lg">
                  {feature.description}
                </p>
                <div className="absolute bottom-4 right-4 text-[10px] text-white/20 font-orbitron">0{idx + 1} // SYS</div>
              </TechCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};