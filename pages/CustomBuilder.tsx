import React, { useState } from 'react';
import { WHEEL_IMG } from '../constants';
import { Check, Settings, Zap, DollarSign } from 'lucide-react';
import { CarbonButton } from '../components/ui/CarbonButton';

interface ConfigOption {
  id: string;
  name: string;
  priceMod: number;
}

export const CustomBuilder: React.FC = () => {
  const [depth, setDepth] = useState<ConfigOption>({ id: '45', name: '45mm WAVE', priceMod: 0 });
  const [hub, setHub] = useState<ConfigOption>({ id: 'aivee', name: 'Aivee Edition One', priceMod: 0 });
  const [spokes, setSpokes] = useState<ConfigOption>({ id: 'cx', name: 'Sapim CX-Ray', priceMod: 0 });
  const [decals, setDecals] = useState<ConfigOption>({ id: 'stealth', name: 'Stealth Black', priceMod: 0 });

  const basePrice = 1890;
  const totalPrice = basePrice + depth.priceMod + hub.priceMod + spokes.priceMod + decals.priceMod;

  const depths = [
    { id: '35', name: '35mm CLIMBER', priceMod: -100 },
    { id: '45', name: '45mm WAVE', priceMod: 0 },
    { id: '55', name: '55mm AERO', priceMod: 100 },
    { id: '80', name: '80mm TT', priceMod: 200 },
  ];

  const hubs = [
    { id: 'aivee', name: 'Aivee Edition One', priceMod: 0 },
    { id: 'dt240', name: 'DT Swiss 240', priceMod: 250 },
    { id: 'dt180', name: 'DT Swiss 180 Ceramic', priceMod: 600 },
    { id: 'chris', name: 'Chris King R45D', priceMod: 850 },
  ];

  const styleDecals = [
    { id: 'stealth', name: 'Stealth Black', priceMod: 0 },
    { id: 'white', name: 'Classic White', priceMod: 0 },
    { id: 'red', name: 'Inferno Red', priceMod: 50 },
    { id: 'holo', name: 'Holographic', priceMod: 80 },
  ];

  return (
    <div className="pt-24 min-h-screen bg-black text-white relative overflow-hidden flex flex-col lg:flex-row">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-red-900/5 skew-x-12 pointer-events-none"></div>

      {/* --- LEFT PANEL: VISUALIZER --- */}
      <div className="w-full lg:w-2/3 relative h-[50vh] lg:h-auto flex items-center justify-center bg-zinc-900/20">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        <div className="relative z-10 w-[300px] md:w-[500px]">
           <img 
            src={WHEEL_IMG} 
            alt="Wheel Preview" 
            className="w-full h-auto drop-shadow-[0_0_50px_rgba(255,255,255,0.1)] animate-[pulse-red_4s_infinite]"
           />
           {/* Dynamic Badge */}
           <div className="absolute top-0 right-0 bg-black/80 backdrop-blur border border-red-500/50 p-4 transform skew-x-[-10deg]">
              <div className="skew-x-[10deg]">
                <div className="text-[10px] text-red-500 font-orbitron tracking-widest mb-1">CONFIGURATION ACTUELLE</div>
                <div className="font-bold text-2xl font-rajdhani">{depth.name}</div>
                <div className="text-sm text-gray-400">{hub.name}</div>
              </div>
           </div>
        </div>
      </div>

      {/* --- RIGHT PANEL: CONTROLS --- */}
      <div className="w-full lg:w-1/3 bg-zinc-950 border-l border-white/10 p-8 overflow-y-auto max-h-screen custom-scrollbar">
        <h1 className="font-orbitron text-3xl font-black mb-2 flex items-center gap-3">
          <Settings className="text-red-600 animate-spin-slow" /> SUR MESURE
        </h1>
        <p className="font-rajdhani text-gray-400 mb-8 border-b border-white/10 pb-4">
          Configurez votre paire de roues ultime. Assemblage manuel en France.
        </p>

        {/* Section: Depth */}
        <div className="mb-8">
          <h3 className="text-xs font-orbitron text-red-500 tracking-widest mb-4 flex items-center gap-2">
            01 // PROFIL JANTE
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {depths.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setDepth(opt)}
                className={`p-3 text-left border transition-all duration-300 relative overflow-hidden group ${
                  depth.id === opt.id 
                  ? 'bg-red-900/20 border-red-600 text-white' 
                  : 'bg-zinc-900 border-zinc-800 text-gray-400 hover:border-gray-600'
                }`}
              >
                <div className="relative z-10 flex justify-between items-center">
                    <span className="font-rajdhani font-bold">{opt.name}</span>
                    {depth.id === opt.id && <Check className="w-4 h-4 text-red-500" />}
                </div>
                {/* Fill effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-red-900/40 to-transparent transform transition-transform duration-300 ${depth.id === opt.id ? 'translate-x-0' : '-translate-x-full'}`}></div>
              </button>
            ))}
          </div>
        </div>

        {/* Section: Hubs */}
        <div className="mb-8">
          <h3 className="text-xs font-orbitron text-red-500 tracking-widest mb-4 flex items-center gap-2">
            02 // MOYEUX
          </h3>
          <div className="space-y-3">
            {hubs.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setHub(opt)}
                className={`w-full p-4 flex justify-between items-center border transition-all duration-300 ${
                  hub.id === opt.id 
                  ? 'bg-zinc-800 border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                  : 'bg-transparent border-zinc-800 text-gray-400 hover:bg-zinc-900'
                }`}
              >
                <div className="flex flex-col text-left">
                    <span className="font-rajdhani font-bold text-lg">{opt.name}</span>
                    <span className="text-xs text-gray-500 font-mono">
                        {opt.priceMod === 0 ? 'Inclus' : `+ ${opt.priceMod} €`}
                    </span>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${hub.id === opt.id ? 'border-red-500 bg-red-500' : 'border-gray-600'}`}>
                    {hub.id === opt.id && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Section: Decals */}
        <div className="mb-12">
          <h3 className="text-xs font-orbitron text-red-500 tracking-widest mb-4 flex items-center gap-2">
            03 // FINITION DECALS
          </h3>
          <div className="flex gap-4">
            {styleDecals.map((opt) => (
               <button
               key={opt.id}
               onClick={() => setDecals(opt)}
               className={`relative w-12 h-12 rounded border-2 transition-all duration-300 flex items-center justify-center group ${
                 decals.id === opt.id ? 'border-white scale-110' : 'border-zinc-700 hover:border-gray-500'
               }`}
               title={opt.name}
             >
                <div className={`w-8 h-8 rounded-sm ${
                    opt.id === 'stealth' ? 'bg-black border border-gray-800' :
                    opt.id === 'white' ? 'bg-white' :
                    opt.id === 'red' ? 'bg-red-600' :
                    'bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500'
                }`}></div>
                {opt.priceMod > 0 && (
                    <span className="absolute -top-2 -right-2 bg-zinc-800 text-[8px] px-1 rounded border border-zinc-700 text-white">€</span>
                )}
             </button>
            ))}
          </div>
          <div className="mt-2 text-sm font-rajdhani text-gray-300">Sélection: <span className="text-white">{decals.name}</span></div>
        </div>

        {/* Sticky Footer for Mobile / Bottom Action */}
        <div className="bg-black/50 backdrop-blur-md border-t border-white/10 p-4 -mx-8 -mb-8 sticky bottom-0 z-20">
            <div className="flex justify-between items-end mb-4">
                <span className="text-gray-400 font-rajdhani">Prix Estimé</span>
                <span className="text-3xl font-orbitron font-bold text-white flex items-center gap-1">
                    {totalPrice.toLocaleString()} <span className="text-red-600 text-xl">€</span>
                </span>
            </div>
            <div className="flex gap-2 text-[10px] text-gray-500 mb-4 font-mono">
                <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-yellow-500"/> DISPO: 4 SEMAINES</span>
                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3 text-green-500"/> 3X SANS FRAIS</span>
            </div>
            <CarbonButton className="w-full text-center flex justify-center">AJOUTER AU PANIER</CarbonButton>
        </div>

      </div>
    </div>
  );
};