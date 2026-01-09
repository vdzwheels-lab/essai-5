import React from 'react';
import { Cpu, Wind, ShieldCheck } from 'lucide-react';

export const Technology: React.FC = () => {
  return (
    <div className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-black text-gray-200">
      
      {/* --- FOND ET ATMOSPHERE --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
          
          {/* 0. IMAGE DE FOND INCRUSTÉE (DEMANDE UTILISATEUR) */}
          {/* MODIF: Opacité 60%, suppression brightness-75, suppression overlay noir complet */}
          <div className="absolute inset-0 z-0 opacity-60">
               <img 
                 src="https://vdzwheels.com/vdz-wheels-test/wp-content/uploads/2018/10/tract-inaug-ok.jpg" 
                 alt="Background Tech Engineering" 
                 className="w-full h-full object-cover filter grayscale contrast-125"
               />
               {/* Masques légers pour fondre les bords UNIQUEMENT, pas le centre */}
               <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
               <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>
          </div>

          {/* 1. Grid Floor Perspective */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(200,200,200,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(200,200,200,0.1)_1px,transparent_1px)] bg-[size:40px_40px] transform perspective-[1000px] rotateX(60deg) origin-top scale-150 opacity-20 z-10"></div>

          {/* 2. Vertical Grey Lasers (Scanning) */}
          <div className="absolute top-0 left-[10%] w-[1px] h-full bg-gradient-to-b from-transparent via-gray-400 to-transparent opacity-30 animate-[scan_5s_linear_infinite] z-20"></div>
          <div className="absolute top-0 left-[60%] w-[2px] h-full bg-gradient-to-b from-transparent via-gray-500 to-transparent opacity-20 animate-[scan_8s_linear_infinite_reverse] z-20"></div>

          {/* 3. Horizontal Scanline (The main scanner) */}
          <div className="absolute top-0 w-full h-[2px] bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.2)] animate-[scan-down_10s_ease-in-out_infinite] opacity-50 z-20"></div>

          {/* 4. Atmospheric Fog/Smoke (Greyish) */}
          {/* MODIF: Suppression du 'mix-blend-multiply' qui rendait tout noir. Remplacement par un léger voile normal */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-40 z-10"></div>
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_60%)] animate-[spin-slow_30s_linear_infinite] z-10 pointer-events-none"></div>

          {/* 5. Vignette pour focus central */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_90%)] z-10"></div>

      </div>

      <style>{`
          @keyframes scan-down {
              0% { top: 0%; opacity: 0; }
              10% { opacity: 0.5; }
              90% { opacity: 0.5; }
              100% { top: 100%; opacity: 0; }
          }
      `}</style>

      {/* --- CONTENU (z-30 pour être au dessus de tout le fond) --- */}
      <div className="container mx-auto px-6 relative z-30">
        <h1 className="font-orbitron text-5xl md:text-7xl font-black mb-12 text-white uppercase tracking-tight relative">
          Ingénierie <span className="text-metal-red relative inline-block">Avancée</span>
          <div className="absolute -bottom-4 left-0 w-24 h-1 bg-gradient-to-r from-red-600 to-transparent"></div>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-300 font-rajdhani text-lg">
            
            {/* Texte Gauche */}
            <div className="space-y-6 bg-black/70 backdrop-blur-md p-6 rounded-lg border-l border-white/10 shadow-lg">
                <p className="border-l-2 border-red-600 pl-4">
                    Chez VDZ Wheels, nous ne nous contentons pas d'assembler des pièces. Nous sculptons la performance.
                    Chaque roue est le résultat de centaines d'heures de simulation CFD (Computational Fluid Dynamics).
                </p>
                <p>
                    Le profil WAVE n'est pas esthétique. Il est biomimétique. Inspiré des nageoires de baleines à bosse, 
                    il permet de réduire la traînée aérodynamique tout en conservant une stabilité exceptionnelle lors des vents latéraux.
                </p>
                <div className="mt-8 flex gap-4">
                     <div className="h-1 flex-1 bg-zinc-800 rounded overflow-hidden">
                        <div className="h-full bg-white/20 w-3/4"></div>
                     </div>
                     <span className="text-xs font-mono text-gray-500">SIMULATION_PROGRESS: 75%</span>
                </div>
            </div>
            
            {/* Carte Droite */}
            <div className="bg-zinc-950/80 backdrop-blur-md p-8 border border-white/10 rounded-lg hover:border-red-900/50 transition-colors duration-500 group">
                {/* Petit effet laser interne */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-red-500/50 transition-colors"></div>

                <h3 className="font-orbitron text-2xl text-white mb-6 flex items-center gap-3">
                    <Cpu className="text-red-500 animate-pulse" /> SPÉCIFICATIONS T1100
                </h3>
                <ul className="space-y-6">
                    <li className="flex items-center gap-4 border-b border-white/5 pb-4">
                        <div className="p-2 bg-zinc-900 rounded-full border border-zinc-700">
                             <Wind className="text-gray-400 w-5 h-5" />
                        </div>
                        <div>
                             <div className="text-white font-bold font-orbitron">Fibre Torayca T1100G</div>
                             <div className="text-xs text-gray-500">Origine: Japon // Grade Aérospatial</div>
                        </div>
                    </li>
                    <li className="flex items-center gap-4 border-b border-white/5 pb-4">
                        <div className="p-2 bg-zinc-900 rounded-full border border-zinc-700">
                             <ShieldCheck className="text-gray-400 w-5 h-5" />
                        </div>
                         <div>
                             <div className="text-white font-bold font-orbitron">Résine High-Tg</div>
                             <div className="text-xs text-gray-500">Résistance Thermique: 240°C</div>
                        </div>
                    </li>
                    <li className="flex items-center gap-4">
                        <div className="p-2 bg-zinc-900 rounded-full border border-zinc-700">
                             <div className="w-5 h-5 flex items-center justify-center font-serif italic font-bold">µ</div>
                        </div>
                         <div>
                             <div className="text-white font-bold font-orbitron">Moulage EPS</div>
                             <div className="text-xs text-gray-500">Compression Monocoque</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};
