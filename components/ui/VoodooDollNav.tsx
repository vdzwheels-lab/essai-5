import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Ruler, Share2, Wind, Activity, Cpu } from 'lucide-react';

interface BodyPart {
  id: string;
  name: string;
  path: string;
  labelX: number;
  labelY: number;
  targetX: number;
  targetY: number;
  align: 'left' | 'right';
}

type DollModel = 'original' | 'cyber-seraph' | 'construct';

export const VoodooDollNav: React.FC = () => {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [model, setModel] = useState<DollModel>('cyber-seraph'); // Par défaut sur le nouveau modèle

  const DOLL_GIF = "https://vdzwheels.com/vdz-wheels-test/wp-content/uploads/2026/01/doll-lauriers-1.gif";

  // Configuration des points d'accroche (Targets)
  // J'ai ajusté légèrement les cibles pour qu'elles matchent à peu près tous les modèles
  const parts: BodyPart[] = [
    { id: 'head', name: 'ACCUEIL', path: '/', labelX: 280, labelY: 40, targetX: 200, targetY: 90, align: 'right' },
    { id: 'torso', name: 'TECHNOLOGIE', path: '/technologie', labelX: 20, labelY: 140, targetX: 200, targetY: 200, align: 'left' },
    { id: 'arm-l', name: 'GALERIE', path: '/galerie', labelX: 20, labelY: 240, targetX: 130, targetY: 180, align: 'left' },
    { id: 'arm-r', name: 'SUR MESURE', path: '/sur-mesure', labelX: 280, labelY: 240, targetX: 270, targetY: 180, align: 'right' },
    { id: 'legs', name: 'CONTACT', path: '/contact', labelX: 280, labelY: 380, targetX: 200, targetY: 350, align: 'right' },
  ];

  // --- SVG COMPONENT: CYBER SERAPH (BIOMECH WINGED) ---
  const CyberSeraph = () => (
    <g className="animate-[float_6s_ease-in-out_infinite]">
        <defs>
            <linearGradient id="wing-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#333" />
                <stop offset="50%" stopColor="#111" />
                <stop offset="100%" stopColor="#000" />
            </linearGradient>
            <filter id="glow-red">
                <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#ef4444" />
            </filter>
        </defs>

        {/* WINGS (Animated) */}
        <g className="origin-[200px_200px] animate-[breathe_4s_ease-in-out_infinite]">
             {/* Left Wing */}
             <path d="M 200,180 L 100,100 L 40,120 L 80,200 L 140,240 Z" fill="url(#wing-grad)" stroke="#444" strokeWidth="1" opacity="0.8" />
             <path d="M 100,100 L 20,60 L 40,120" fill="none" stroke="#ef4444" strokeWidth="0.5" className="animate-pulse" />
             {/* Mechanical Feathers Left */}
             <path d="M 80,200 L 20,220 L 90,230" fill="#111" stroke="#333" strokeWidth="0.5" />
             <path d="M 90,230 L 40,260 L 100,250" fill="#111" stroke="#333" strokeWidth="0.5" />

             {/* Right Wing */}
             <path d="M 200,180 L 300,100 L 360,120 L 320,200 L 260,240 Z" fill="url(#wing-grad)" stroke="#444" strokeWidth="1" opacity="0.8" />
             <path d="M 300,100 L 380,60 L 360,120" fill="none" stroke="#ef4444" strokeWidth="0.5" className="animate-pulse" />
             {/* Mechanical Feathers Right */}
             <path d="M 320,200 L 380,220 L 310,230" fill="#111" stroke="#333" strokeWidth="0.5" />
             <path d="M 310,230 L 360,260 L 300,250" fill="#111" stroke="#333" strokeWidth="0.5" />
        </g>

        {/* BODY (Main Hull) */}
        <path d="M 180,150 Q 200,130 220,150 L 230,220 Q 200,260 170,220 Z" fill="#050505" stroke="#333" strokeWidth="2" />
        
        {/* CYBER HEAD */}
        <g transform="translate(0, -10)">
            <path d="M 180,90 Q 200,50 220,90 Q 220,130 200,130 Q 180,130 180,90 Z" fill="#111" stroke="#555" strokeWidth="2" />
            {/* Eye (Visor) */}
            <path d="M 185,90 Q 200,95 215,90" stroke="#ef4444" strokeWidth="2" filter="url(#glow-red)" className="animate-pulse" />
            {/* Antennae */}
            <path d="M 180,80 L 160,60" stroke="#555" strokeWidth="1" />
            <path d="M 220,80 L 240,60" stroke="#555" strokeWidth="1" />
        </g>

        {/* CORE (Heart) */}
        <circle cx="200" cy="180" r="8" fill="#111" stroke="#ef4444" strokeWidth="1">
            <animate attributeName="r" values="8;10;8" dur="1s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
        </circle>

        {/* LIMBS (Pistons) */}
        {/* Arms */}
        <line x1="180" y1="160" x2="130" y2="180" stroke="#333" strokeWidth="6" strokeLinecap="round" />
        <line x1="220" y1="160" x2="270" y2="180" stroke="#333" strokeWidth="6" strokeLinecap="round" />
        <circle cx="130" cy="180" r="5" fill="#222" stroke="#ef4444" strokeWidth="1" />
        <circle cx="270" cy="180" r="5" fill="#222" stroke="#ef4444" strokeWidth="1" />

        {/* Legs */}
        <path d="M 185,240 L 180,320 L 170,360" fill="none" stroke="#222" strokeWidth="6" strokeLinecap="round" />
        <path d="M 215,240 L 220,320 L 230,360" fill="none" stroke="#222" strokeWidth="6" strokeLinecap="round" />
        
        {/* PINS (Data Cables) */}
        <path d="M 230,160 L 260,130" stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
        <circle cx="260" cy="130" r="2" fill="#ef4444" />
    </g>
  );

  // --- SVG COMPONENT: CONSTRUCT (WIREFRAME) ---
  const Construct = () => (
    <g className="opacity-70">
        <defs>
             <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(6,182,212,0.2)" strokeWidth="0.5"/>
            </pattern>
        </defs>
        
        {/* Silhouette */}
        <path d="M 200,80 Q 230,80 230,110 L 240,200 L 230,350 L 200,350 L 190,220 L 170,350 L 140,350 L 160,200 L 170,110 Q 170,80 200,80" 
              fill="url(#grid)" stroke="#06b6d4" strokeWidth="1" />
        
        {/* Arms */}
        <line x1="170" y1="130" x2="130" y2="180" stroke="#06b6d4" strokeWidth="1" />
        <line x1="230" y1="130" x2="270" y2="180" stroke="#06b6d4" strokeWidth="1" />

        {/* Nodes */}
        <circle cx="200" cy="100" r="20" fill="none" stroke="#06b6d4" strokeDasharray="2,2" className="animate-spin-slow" />
        <circle cx="200" cy="100" r="5" fill="#06b6d4" />

        <circle cx="200" cy="200" r="10" fill="none" stroke="#06b6d4" />
        <line x1="200" y1="100" x2="200" y2="350" stroke="#06b6d4" strokeWidth="0.5" />
    </g>
  );

  return (
    <div className="relative w-[400px] h-[600px] flex items-center justify-center select-none group/container">
      
      {/* --- SELECTEUR DE MODELE (Apparition au survol) --- */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-8 z-50 opacity-0 group-hover/container:opacity-100 transition-opacity duration-500 py-4 bg-black/80 backdrop-blur-md rounded-full px-8 border border-red-900/30 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
        <button onClick={() => setModel('original')} className={`flex flex-col items-center gap-1 transition-all duration-300 hover:scale-110 ${model === 'original' ? 'text-white drop-shadow-[0_0_5px_white]' : 'text-zinc-600 hover:text-white'}`} title="Original Voodoo">
            <Share2 className="w-5 h-5" /> 
            <span className="text-[8px] font-orbitron">ORIGIN</span>
        </button>
        <button onClick={() => setModel('cyber-seraph')} className={`flex flex-col items-center gap-1 transition-all duration-300 hover:scale-110 ${model === 'cyber-seraph' ? 'text-red-500 drop-shadow-[0_0_5px_red]' : 'text-zinc-600 hover:text-red-500'}`} title="Biomechanical">
            <Cpu className="w-5 h-5" /> 
            <span className="text-[8px] font-orbitron">MECHA</span>
        </button>
        <button onClick={() => setModel('construct')} className={`flex flex-col items-center gap-1 transition-all duration-300 hover:scale-110 ${model === 'construct' ? 'text-cyan-400 drop-shadow-[0_0_5px_cyan]' : 'text-zinc-600 hover:text-cyan-400'}`} title="Blueprint">
            <Ruler className="w-5 h-5" /> 
            <span className="text-[8px] font-orbitron">BLUEPRINT</span>
        </button>
      </div>

      {/* --- RENDERED DOLL LAYER --- */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none transition-all duration-700">
          
          {/* MODEL 1: ORIGINAL GIF */}
          {model === 'original' && (
              <img 
                src={DOLL_GIF} 
                alt="Voodoo Doll" 
                className="w-[85%] h-auto object-contain transition-all duration-700 contrast-125 brightness-90 saturate-50"
              />
          )}

          {/* MODEL 2 & 3: SVG RENDERS */}
          {(model === 'cyber-seraph' || model === 'construct') && (
               <svg viewBox="0 0 400 600" className="w-full h-full overflow-visible">
                    {model === 'cyber-seraph' && <CyberSeraph />}
                    {model === 'construct' && <Construct />}
               </svg>
          )}

      </div>

      {/* --- CONNECTIVITY LAYER (NAV LINES) --- */}
      <svg viewBox="0 0 400 600" className="w-full h-full relative z-10 overflow-visible">
        
        {parts.map((part) => {
            const isHovered = hoveredPart === part.id;
            
            // Palette selon modèle
            let mainColor = '#ef4444'; // Cyber Red default
            if (model === 'construct') mainColor = '#06b6d4'; // Cyan
            if (model === 'original') mainColor = '#ffffff'; // White/Grey
            
            const lineColor = isHovered ? mainColor : (model === 'construct' ? '#164e63' : '#333');
            const textColor = isHovered ? "#fff" : "#666";

            return (
                <Link key={part.id} to={part.path}>
                    <g 
                        onMouseEnter={() => setHoveredPart(part.id)}
                        onMouseLeave={() => setHoveredPart(null)}
                        className="cursor-pointer group"
                        style={{ transition: 'all 0.3s ease' }}
                    >
                        {/* Zone de clic */}
                        <circle cx={part.targetX} cy={part.targetY} r="30" fill="transparent" />

                        {/* Ligne de connexion */}
                        <path 
                            d={`M ${part.labelX},${part.labelY} 
                                L ${part.align === 'left' ? part.labelX + 40 : part.labelX - 40},${part.labelY} 
                                L ${part.targetX},${part.targetY}`}
                            stroke={lineColor}
                            strokeWidth={isHovered ? "1.5" : "0.5"} 
                            fill="none"
                            className="transition-colors duration-300 drop-shadow-md"
                            strokeDasharray={model === 'construct' ? "4,2" : "0"}
                        />

                        {/* Point d'impact (Target) */}
                        <circle 
                            cx={part.targetX} cy={part.targetY} 
                            r={isHovered ? 4 : 2} 
                            fill={isHovered ? mainColor : "black"} 
                            stroke={lineColor}
                            strokeWidth={1}
                        />

                        {/* Label Texte */}
                        <text
                            x={part.labelX}
                            y={part.labelY + 4}
                            textAnchor={part.align === 'left' ? "end" : "start"}
                            fill={textColor}
                            fontSize={isHovered ? "12" : "10"}
                            fontWeight="bold"
                            fontFamily="Orbitron, sans-serif"
                            letterSpacing="1.5"
                            className="transition-all duration-300"
                            style={{ 
                                textShadow: isHovered ? `0 0 10px ${mainColor}` : "none",
                            }}
                        >
                            {part.name}
                        </text>
                    </g>
                </Link>
            );
        })}
      </svg>
      
      <style>{`
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        @keyframes breathe {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};
