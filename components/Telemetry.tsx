import React, { useEffect, useState } from 'react';
import { Activity, Wind, Zap, Cpu } from 'lucide-react';

export const Telemetry: React.FC = () => {
  const [watts, setWatts] = useState(245);
  const [drag, setDrag] = useState(0.12);

  useEffect(() => {
    const interval = setInterval(() => {
      setWatts(prev => prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5));
      setDrag(prev => Number((prev + (Math.random() > 0.5 ? 0.001 : -0.001)).toFixed(3)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-black relative overflow-hidden border-t border-b border-white/10">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-12">
            <h2 className="font-orbitron text-2xl md:text-3xl font-bold text-white tracking-widest flex items-center gap-3">
                <Activity className="text-red-600 animate-pulse" />
                TÉLÉMETRIE <span className="text-gray-600 text-sm align-top">V.2.0</span>
            </h2>
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-red-600 to-transparent mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Aero Data */}
            <div className="bg-zinc-900/50 backdrop-blur border border-white/10 p-6 rounded-lg relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-50"><Wind className="w-5 h-5 text-blue-400" /></div>
                <h3 className="font-rajdhani text-gray-400 uppercase tracking-widest text-sm mb-2">Coefficient de Traînée</h3>
                <div className="font-orbitron text-4xl text-white font-bold">{drag} <span className="text-sm text-gray-500 font-normal">CdA</span></div>
                
                {/* Visual Graph */}
                <div className="mt-4 h-16 flex items-end gap-1">
                    {[40, 60, 45, 70, 50, 65, 55, 80, 60, 40].map((h, i) => (
                        <div key={i} className="flex-1 bg-blue-900/30 hover:bg-blue-500 transition-colors" style={{ height: `${h}%` }}></div>
                    ))}
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-500/50"></div>
            </div>

            {/* Card 2: Power Output */}
            <div className="bg-zinc-900/50 backdrop-blur border border-white/10 p-6 rounded-lg relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-50"><Zap className="w-5 h-5 text-yellow-400" /></div>
                <h3 className="font-rajdhani text-gray-400 uppercase tracking-widest text-sm mb-2">Gain de Puissance</h3>
                <div className="font-orbitron text-4xl text-white font-bold">{watts} <span className="text-sm text-gray-500 font-normal">WATTS</span></div>
                
                {/* Visual Circle */}
                <div className="mt-4 flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full border-4 border-zinc-700 flex items-center justify-center">
                         <div className="absolute inset-0 rounded-full border-4 border-yellow-500 border-t-transparent animate-spin"></div>
                         <span className="text-xs font-bold font-orbitron text-yellow-500">+12%</span>
                    </div>
                    <p className="text-xs font-rajdhani text-gray-400">Optimisation par rapport <br/>à une jante standard.</p>
                </div>
                 <div className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-500/50"></div>
            </div>

             {/* Card 3: System Status */}
             <div className="bg-zinc-900/50 backdrop-blur border border-white/10 p-6 rounded-lg relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-50"><Cpu className="w-5 h-5 text-green-400" /></div>
                <h3 className="font-rajdhani text-gray-400 uppercase tracking-widest text-sm mb-2">Status Système</h3>
                
                <div className="space-y-3 mt-4">
                    <div className="flex justify-between items-center text-sm font-rajdhani text-gray-300">
                        <span>Tension Rayons</span>
                        <span className="text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> OPTIMAL</span>
                    </div>
                     <div className="flex justify-between items-center text-sm font-rajdhani text-gray-300">
                        <span>Roulements</span>
                        <span className="text-green-400 flex items-center gap-1">CERAMIC.OK</span>
                    </div>
                     <div className="flex justify-between items-center text-sm font-rajdhani text-gray-300">
                        <span>Structure Carbone</span>
                        <span className="text-green-400 flex items-center gap-1">100%</span>
                    </div>
                </div>
                
                {/* Animated Bar */}
                <div className="mt-4 w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-full animate-[shimmer_2s_infinite]"></div>
                </div>
                 <div className="absolute bottom-0 left-0 w-full h-[2px] bg-green-500/50"></div>
            </div>
        </div>
      </div>
    </section>
  );
};