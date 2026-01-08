import React from 'react';
import { ScanLine, Crosshair, Gauge } from 'lucide-react';

export const WorkshopLaser: React.FC = () => {
  return (
    <section className="relative w-full py-24 bg-black overflow-hidden border-t border-b border-red-900/30">
      
      {/* 1. Technical Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>
      
      {/* 2. Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/50 to-black z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-20">
        
        {/* Header Label */}
        <div className="absolute top-0 left-6 flex items-center gap-2 text-red-500 animate-pulse">
            <ScanLine className="w-4 h-4" />
            <span className="font-mono text-xs tracking-widest">SCAN_ATELIER: P&K_LIE_250 // CALIBRAGE</span>
        </div>

        {/* --- THE LASER DRAWING SCENE --- */}
        <div className="relative w-full max-w-5xl mx-auto h-[450px] flex items-center justify-center">
            
            <svg viewBox="0 0 900 500" className="w-full h-full drop-shadow-[0_0_8px_rgba(220,38,38,0.5)]">
                <defs>
                    <filter id="glow-laser">
                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                    
                    {/* Pattern pour les cadrans */}
                    <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
                    </pattern>
                </defs>

                {/* --- SOCLE ET TABLE --- */}
                <g className="opacity-30">
                    <line x1="100" y1="450" x2="800" y2="450" stroke="#444" strokeWidth="2" />
                    <line x1="150" y1="450" x2="100" y2="500" stroke="#444" strokeWidth="1" />
                    <line x1="750" y1="450" x2="800" y2="500" stroke="#444" strokeWidth="1" />
                </g>

                {/* --- LE BANC P&K LIE (DESSIN PRÉCIS) --- */}
                <g stroke="#ef4444" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow-laser)">
                    
                    {/* BASE MASSIVE */}
                    <path d="M 350,450 L 550,450 L 540,420 L 360,420 Z" /> 
                    <path d="M 360,420 L 360,400 L 540,400 L 540,420" /> {/* Plaque supérieure base */}

                    {/* BRAS GAUCHE (Courbé caractéristique P&K) */}
                    <path d="M 380,400 Q 370,300 380,200 L 380,150 L 400,150 L 400,200 Q 390,300 400,400" />
                    
                    {/* BRAS DROIT (Courbé symétrique) */}
                    <path d="M 520,400 Q 530,300 520,200 L 520,150 L 500,150 L 500,200 Q 510,300 500,400" />

                    {/* MOLETTES DE REGLAGE (Laiton/Or stylisé en rouge ici) */}
                    <circle cx="350" cy="410" r="15" strokeWidth="1" />
                    <path d="M 350,395 L 350,425 M 335,410 L 365,410" strokeWidth="0.5" />
                    
                    <circle cx="550" cy="410" r="15" strokeWidth="1" />
                    <path d="M 550,395 L 550,425 M 535,410 L 565,410" strokeWidth="0.5" />

                    {/* --- LES JAUGES (COMPARATEURS 500) --- */}
                    {/* Support Jauges */}
                    <path d="M 420,400 L 420,300 L 480,300 L 480,400" strokeDasharray="2,2" strokeOpacity="0.5" />

                    {/* JAUGE GAUCHE (VOILE) - DÉTAILLÉE */}
                    <g transform="translate(360, 260)">
                        {/* Boitier */}
                        <circle cx="0" cy="0" r="40" strokeWidth="2" fill="rgba(0,0,0,0.8)" />
                        <circle cx="0" cy="0" r="36" stroke="#555" strokeWidth="0.5" />
                        
                        {/* Graduations (Ticks) */}
                        {Array.from({ length: 12 }).map((_, i) => (
                             <line key={i} x1="0" y1="-36" x2="0" y2="-30" transform={`rotate(${i * 30})`} stroke="#fff" strokeWidth="1" />
                        ))}
                        
                        {/* Texte Marque */}
                        <text x="0" y="-15" textAnchor="middle" fill="#fff" fontSize="6" fontFamily="monospace">P&K Lie</text>
                        <text x="0" y="15" textAnchor="middle" fill="#red" fontSize="5" fontFamily="monospace">0.05mm</text>

                        {/* Aiguille Animée */}
                        <line x1="0" y1="0" x2="0" y2="-30" stroke="#ef4444" strokeWidth="2">
                             <animateTransform 
                                attributeName="transform" 
                                type="rotate" 
                                values="-45 0 0; 45 0 0; -20 0 0; 10 0 0; -45 0 0" 
                                dur="4s" 
                                repeatCount="indefinite" 
                                keyTimes="0; 0.3; 0.6; 0.8; 1"
                             />
                        </line>
                        <circle cx="0" cy="0" r="3" fill="#fff" stroke="none" />
                    </g>

                    {/* JAUGE DROITE (SAUT) - DÉTAILLÉE */}
                    <g transform="translate(540, 260)">
                        {/* Boitier */}
                        <circle cx="0" cy="0" r="40" strokeWidth="2" fill="rgba(0,0,0,0.8)" />
                        <circle cx="0" cy="0" r="36" stroke="#555" strokeWidth="0.5" />

                        {/* Graduations (Ticks) */}
                        {Array.from({ length: 12 }).map((_, i) => (
                             <line key={i} x1="0" y1="-36" x2="0" y2="-30" transform={`rotate(${i * 30})`} stroke="#fff" strokeWidth="1" />
                        ))}
                        
                        {/* Texte Marque */}
                        <text x="0" y="-15" textAnchor="middle" fill="#fff" fontSize="6" fontFamily="monospace">P&K Lie</text>
                        <text x="0" y="15" textAnchor="middle" fill="#red" fontSize="5" fontFamily="monospace">MODEL 250</text>

                        {/* Aiguille Animée (Mouvement différent) */}
                        <line x1="0" y1="0" x2="0" y2="-30" stroke="#ef4444" strokeWidth="2">
                             <animateTransform 
                                attributeName="transform" 
                                type="rotate" 
                                values="0 0 0; 20 0 0; 0 0 0; -10 0 0; 0 0 0" 
                                dur="1.5s" 
                                repeatCount="indefinite" 
                             />
                        </line>
                        <circle cx="0" cy="0" r="3" fill="#fff" stroke="none" />
                    </g>

                    {/* Palpeurs (Touches qui touchent la jante) */}
                    <path d="M 400,260 L 430,260" strokeDasharray="2,2" />
                    <path d="M 500,260 L 470,260" strokeDasharray="2,2" />

                </g>

                {/* --- ROUE FANTÔME (EN COURS DE REGLAGE) --- */}
                <g className="opacity-40">
                     <circle cx="450" cy="200" r="140" stroke="#fff" strokeWidth="0.5" strokeDasharray="4,4" className="animate-[spin-slow_10s_linear_infinite]" />
                     <circle cx="450" cy="200" r="10" stroke="#fff" strokeWidth="1" />
                     {/* Rayons Fantomes */}
                     <g className="animate-[spin-slow_10s_linear_infinite]" style={{ transformOrigin: '450px 200px' }}>
                        <line x1="450" y1="60" x2="450" y2="340" stroke="#fff" strokeWidth="0.2" />
                        <line x1="310" y1="200" x2="590" y2="200" stroke="#fff" strokeWidth="0.2" />
                        <line x1="350" y1="100" x2="550" y2="300" stroke="#fff" strokeWidth="0.2" />
                        <line x1="550" y1="100" x2="350" y2="300" stroke="#fff" strokeWidth="0.2" />
                     </g>
                </g>

                {/* --- LASER SPARK (Le point qui dessine) --- */}
                <circle r="3" fill="#fff" filter="url(#glow-laser)">
                     <animateMotion 
                        dur="6s" 
                        path="M 350,450 L 550,450 L 540,420 L 360,420 Z M 380,400 Q 370,300 380,200 L 380,150 M 520,400 Q 530,300 520,200 L 520,150" 
                        repeatCount="indefinite"
                     />
                </circle>

            </svg>

            {/* Overlay Data HUD */}
            <div className="absolute top-10 right-10 flex flex-col items-end gap-2">
                <div className="flex items-center gap-2 bg-red-900/20 border border-red-900/50 px-3 py-1 rounded">
                    <Gauge className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-orbitron text-white">TOLÉRANCE: &lt; 0.1mm</span>
                </div>
                <div className="text-[10px] font-mono text-gray-500">
                    DIAL_L: OK<br/>
                    DIAL_R: ADJ_REQ
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};
