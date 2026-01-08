import React from 'react';
import { Cpu, Wind, ShieldCheck } from 'lucide-react';

export const Technology: React.FC = () => {
  return (
    <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen">
      <h1 className="font-orbitron text-5xl md:text-7xl font-black mb-12 text-white uppercase">
        Ingénierie <span className="text-metal-red">Avancée</span>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-300 font-rajdhani text-lg">
        <div className="space-y-6">
            <p className="border-l-2 border-red-600 pl-4">
                Chez VDZ Wheels, nous ne nous contentons pas d'assembler des pièces. Nous sculptons la performance.
                Chaque roue est le résultat de centaines d'heures de simulation CFD (Computational Fluid Dynamics).
            </p>
            <p>
                Le profil WAVE n'est pas esthétique. Il est biomimétique. Inspiré des nageoires de baleines à bosse, 
                il permet de réduire la traînée aérodynamique tout en conservant une stabilité exceptionnelle lors des vents latéraux.
            </p>
        </div>
        
        <div className="bg-zinc-900/50 p-8 border border-white/10 rounded-lg">
            <h3 className="font-orbitron text-2xl text-white mb-6 flex items-center gap-3">
                <Cpu className="text-red-500" /> SPÉCIFICATIONS T1100
            </h3>
            <ul className="space-y-4">
                <li className="flex items-center gap-3">
                    <Wind className="text-gray-500 w-5 h-5" />
                    <span>Fibre Torayca T1100G (Japon)</span>
                </li>
                <li className="flex items-center gap-3">
                    <ShieldCheck className="text-gray-500 w-5 h-5" />
                    <span>Résine High-Tg (240°C)</span>
                </li>
                <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center text-[10px]">g</div>
                    <span>Moulage EPS monocoque</span>
                </li>
            </ul>
        </div>
      </div>
    </div>
  );
};