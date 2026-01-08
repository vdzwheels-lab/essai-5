import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Crosshair, Cpu } from 'lucide-react';

interface BodyPart {
  id: string;
  name: string;
  path: string;
  labelX: number;
  labelY: number;
  targetX: number; // Où l'aiguille pique
  targetY: number;
}

export const VoodooDollNav: React.FC = () => {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  // Configuration des zones cibles (Posture inspirée de la poupée : bras écartés, debout)
  const parts: BodyPart[] = [
    // Tête -> Haut Droite
    { id: 'head', name: 'ACCUEIL', path: '/', labelX: 260, labelY: 40, targetX: 150, targetY: 50 },
    
    // Bras Gauche (image droite) -> Haut Gauche
    { id: 'l-arm', name: 'GALERIE', path: '/galerie', labelX: 40, labelY: 100, targetX: 90, targetY: 140 },
    
    // Bras Droit (image gauche) -> Milieu Droite
    { id: 'r-arm', name: 'SUR MESURE', path: '/sur-mesure', labelX: 280, labelY: 160, targetX: 210, targetY: 140 },
    
    // Torse -> Milieu Gauche
    { id: 'chest', name: 'TECHNOLOGIE', path: '/technologie', labelX: 30, labelY: 220, targetX: 150, targetY: 180 },
    
    // Jambes -> Bas Droite
    { id: 'legs', name: 'CONTACT', path: '/contact', labelX: 270, labelY: 350, targetX: 150, targetY: 320 },
  ];

  return (
    <div className="relative w-[350px] h-[550px] flex items-center justify-center select-none group/doll">
      
      {/* Holographic Base Glow */}
      <div className="absolute top-3/4 left-1/2 -translate-x-1/2 w-48 h-12 bg-red-900/40 blur-[40px] rounded-[100%] animate-pulse"></div>

      {/* --- SVG CYBER DOLL (Vectoriel) --- */}
      <svg 
        viewBox="0 0 300 450" 
        className="w-full h-full relative z-10 overflow-visible"
      >
        <defs>
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#444" />
                <stop offset="100%" stopColor="#111" />
            </linearGradient>
            <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="rgba(239, 68, 68, 0.1)" />
                <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <filter id="glow-red">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
            <mask id="scan-mask">
                <rect x="0" y="0" width="300" height="450" fill="white" />
                <rect x="0" y="0" width="300" height="20" fill="black" className="animate-[scan-vertical_3s_linear_infinite]" />
            </mask>
        </defs>

        {/* --- WIREFRAME BODY (Posture Poupée) --- */}
        <g strokeLinecap="round" strokeLinejoin="round" mask="url(#scan-mask)">
            
            {/* --- WINGS (New Addition) --- */}
            <g className="transition-all duration-700 opacity-60 animate-[pulse_4s_infinite]">
                 {/* Left Wing */}
                 <path 
                    d="M 150,110 Q 100,60 40,80 Q 20,120 60,180 Q 100,160 130,140" 
                    fill="url(#wingGradient)" 
                    stroke="#ef4444" 
                    strokeWidth="0.5" 
                    strokeDasharray="2,2"
                 />
                 <path d="M 150,110 L 40,80 M 140,125 L 60,180" stroke="#ef4444" strokeWidth="0.2" opacity="0.5" />

                 {/* Right Wing */}
                 <path 
                    d="M 150,110 Q 200,60 260,80 Q 280,120 240,180 Q 200,160 170,140" 
                    fill="url(#wingGradient)" 
                    stroke="#ef4444" 
                    strokeWidth="0.5" 
                    strokeDasharray="2,2"
                 />
                 <path d="M 150,110 L 260,80 M 160,125 L 240,180" stroke="#ef4444" strokeWidth="0.2" opacity="0.5" />
            </g>

            {/* HEAD */}
            <g className={`transition-all duration-300 ${hoveredPart === 'head' ? 'stroke-red-500 stroke-2 filter drop-shadow-[0_0_5px_red]' : 'stroke-zinc-600 stroke-1'}`} fill="none">
                <path d="M 130,50 C 130,30 170,30 170,50 C 170,80 130,80 130,50 Z" /> {/* Skull shape */}
                {/* Bigger Eyes */}
                <path d="M 138,52 L 148,62 M 148,52 L 138,62" strokeWidth="1.5" stroke="#333" /> {/* Left Eye X */}
                <path d="M 152,52 L 162,62 M 162,52 L 152,62" strokeWidth="1.5" stroke="#333" /> {/* Right Eye X */}
                
                {/* SMILE (Stitched) */}
                <path d="M 138,72 Q 150,82 162,72" strokeWidth="1" strokeLinecap="round" /> {/* Smile Curve */}
                <line x1="142" y1="72" x2="142" y2="78" strokeWidth="0.5" />
                <line x1="150" y1="75" x2="150" y2="81" strokeWidth="0.5" />
                <line x1="158" y1="72" x2="158" y2="78" strokeWidth="0.5" />
            </g>

            {/* NECK & SPINE */}
            <path d="M 150,80 L 150,100" stroke="#333" strokeWidth="2" />
            <path d="M 150,100 L 150,250" stroke="#333" strokeDasharray="2,2" />

            {/* TORSO (Ribcage Tech) */}
            <g className={`transition-all duration-300 ${hoveredPart === 'chest' ? 'stroke-red-500 stroke-2 filter drop-shadow-[0_0_5px_red]' : 'stroke-zinc-600 stroke-1'}`} fill="none">
                <path d="M 120,110 L 180,110 L 170,180 L 130,180 Z" /> {/* Upper Chest */}
                <path d="M 130,125 L 170,125 M 135,140 L 165,140 M 140,155 L 160,155" strokeOpacity="0.5" /> {/* Ribs */}
                {/* Heart Core */}
                <circle cx="150" cy="140" r="4" fill={hoveredPart === 'chest' ? "#ef4444" : "#111"} className="animate-pulse" />
            </g>

            {/* ARMS (Jointed) */}
            {/* Left Arm (Viewer's Left) */}
            <g className={`transition-all duration-300 ${hoveredPart === 'l-arm' ? 'stroke-red-500 stroke-2 filter drop-shadow-[0_0_5px_red]' : 'stroke-zinc-600 stroke-1'}`} fill="none">
                <circle cx="120" cy="110" r="3" fill="#111" /> {/* Shoulder L */}
                <path d="M 120,110 L 90,140" /> {/* Upper Arm L */}
                <circle cx="90" cy="140" r="2" fill="#111" /> {/* Elbow L */}
                <path d="M 90,140 L 70,170" /> {/* Forearm L */}
                <circle cx="70" cy="170" r="2" fill="#111" /> {/* Hand L */}
            </g>

             {/* Right Arm (Viewer's Right) */}
             <g className={`transition-all duration-300 ${hoveredPart === 'r-arm' ? 'stroke-red-500 stroke-2 filter drop-shadow-[0_0_5px_red]' : 'stroke-zinc-600 stroke-1'}`} fill="none">
                <circle cx="180" cy="110" r="3" fill="#111" /> {/* Shoulder R */}
                <path d="M 180,110 L 210,140" /> {/* Upper Arm R */}
                <circle cx="210" cy="140" r="2" fill="#111" /> {/* Elbow R */}
                <path d="M 210,140 L 230,170" /> {/* Forearm R */}
                <circle cx="230" cy="170" r="2" fill="#111" /> {/* Hand R */}
            </g>

            {/* HIPS */}
            <path d="M 130,250 L 170,250 L 160,280 L 140,280 Z" fill="none" stroke="#333" />

            {/* LEGS */}
             <g className={`transition-all duration-300 ${hoveredPart === 'legs' ? 'stroke-red-500 stroke-2 filter drop-shadow-[0_0_5px_red]' : 'stroke-zinc-600 stroke-1'}`} fill="none">
                {/* Left Leg */}
                <path d="M 140,280 L 135,350" />
                <circle cx="135" cy="350" r="3" fill="#111" /> {/* Knee L */}
                <path d="M 135,350 L 130,420" />
                
                {/* Right Leg */}
                <path d="M 160,280 L 165,350" />
                <circle cx="165" cy="350" r="3" fill="#111" /> {/* Knee R */}
                <path d="M 165,350 L 170,420" />
            </g>
        </g>

        {/* --- INTERACTIVE PINS (THE "VOODOO" PART) --- */}
        {parts.map((part) => {
            const isHovered = hoveredPart === part.id;
            
            return (
                <Link key={part.id} to={part.path}>
                    <g 
                        onMouseEnter={() => setHoveredPart(part.id)}
                        onMouseLeave={() => setHoveredPart(null)}
                        className="cursor-pointer"
                    >
                        {/* Hit Area (Invisible circles over joints) */}
                        <circle cx={part.targetX} cy={part.targetY} r="30" fill="transparent" />

                        {/* LASER LINE & LABEL */}
                        <g 
                            style={{ 
                                opacity: isHovered ? 1 : 0.3, 
                                transition: 'opacity 0.3s ease' 
                            }}
                        >
                            {/* The Connecting Line (Needle) */}
                            <path 
                                d={`M ${part.labelX},${part.labelY} L ${part.targetX},${part.targetY}`}
                                stroke={isHovered ? "#ef4444" : "#333"}
                                strokeWidth={isHovered ? "1.5" : "0.5"}
                                strokeDasharray={isHovered ? "none" : "2,2"}
                                filter={isHovered ? "url(#glow-red)" : "none"}
                                className="transition-all duration-300"
                            />
                            
                            {/* Pin Head (on body) */}
                            <circle 
                                cx={part.targetX} 
                                cy={part.targetY} 
                                r={isHovered ? "3" : "1"} 
                                fill="#ef4444"
                                className="transition-all duration-300"
                            />

                            {/* Label Group */}
                            <g transform={`translate(${part.labelX > 150 ? part.labelX : part.labelX - 100}, ${part.labelY - 10})`}>
                                {/* Text Box BG */}
                                <rect 
                                    x="-5" y="-5" width="110" height="25" 
                                    fill={isHovered ? "rgba(239, 68, 68, 0.1)" : "transparent"} 
                                    transform="skewX(-10)"
                                />
                                
                                <text
                                    x="0"
                                    y="10"
                                    fill={isHovered ? "white" : "#666"}
                                    fontSize="14"
                                    fontWeight="bold"
                                    fontFamily="Orbitron, sans-serif"
                                    textAnchor="start"
                                    className="transition-colors duration-300"
                                >
                                    {part.name}
                                </text>
                                
                                {/* Decor Tech Line below text */}
                                <rect 
                                    x="0" y="14" 
                                    width={isHovered ? "100" : "0"} 
                                    height="2" 
                                    fill="#ef4444" 
                                    className="transition-all duration-500 ease-out"
                                />
                            </g>
                        </g>
                    </g>
                </Link>
            );
        })}
      </svg>

      {/* Background Rotating Rings (Tech decoration) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
         <div className="w-[400px] h-[400px] border border-white/5 rounded-full animate-[spin-slow_20s_linear_infinite] border-dashed"></div>
         <div className="absolute w-[300px] h-[300px] border border-red-900/10 rounded-full animate-[spin-reverse_15s_linear_infinite]"></div>
      </div>
      
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] text-red-900 font-mono animate-pulse">
        SYSTEM: CYBER_DOLL_V3
      </div>
    </div>
  );
};