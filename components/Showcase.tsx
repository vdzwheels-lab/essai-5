import React, { useRef, useState, useEffect } from 'react';
import { PRODUCTS } from '../constants';
import { CarbonButton } from './ui/CarbonButton';
import { InteractiveWheel } from './ui/InteractiveWheel';

export const Showcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <section 
        ref={containerRef} 
        onMouseMove={handleMouseMove}
        className="py-24 bg-black relative overflow-hidden group/showcase"
    >
        {/* --- DYNAMIC BACKGROUND SYSTEM --- */}
        
        {/* 1. Base Grid (Perspective Floor) */}
        <div className="absolute inset-0 pointer-events-none perspective-[1000px]">
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] transform origin-top rotate-x-60 scale-150 animate-[scan_20s_linear_infinite]"></div>
        </div>

        {/* 2. Spotlight / Flashlight Effect */}
        <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-60"
            style={{
                background: `radial-gradient(1000px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 0, 0, 0.08), transparent 40%)`
            }}
        ></div>

        {/* 3. Ambient Fog / Smoke */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 animate-[shimmer_60s_linear_infinite] pointer-events-none mix-blend-overlay"></div>

        {/* 4. Aero Lines (SVG Animation) */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none select-none z-0">
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
                <stop offset="50%" style={{ stopColor: '#8b0000', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
                </linearGradient>
            </defs>
            {/* Streamlines */}
            <path d="M0,100 Q 400,150 800,100 T 1600,100" stroke="url(#grad1)" strokeWidth="1" fill="none" className="animate-[dash_10s_linear_infinite]" strokeDasharray="1000" strokeDashoffset="1000" />
            <path d="M0,300 Q 400,250 800,300 T 1600,300" stroke="url(#grad1)" strokeWidth="1" fill="none" className="animate-[dash_15s_linear_infinite]" strokeDasharray="1000" strokeDashoffset="1000" />
            <path d="M0,600 Q 600,550 1200,600 T 2000,600" stroke="url(#grad1)" strokeWidth="1" fill="none" className="animate-[dash_20s_linear_infinite]" strokeDasharray="1000" strokeDashoffset="1000" />
            <style>{`
                @keyframes dash {
                    to { stroke-dashoffset: 0; }
                }
            `}</style>
        </svg>

        {/* --- CONTENT --- */}
        <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-center font-orbitron text-4xl md:text-5xl font-black mb-4 text-white tracking-tight relative z-20">
                LA <span className="text-metal-red relative inline-block">
                    GAMME
                    {/* Decor glitch */}
                    <span className="absolute -inset-1 bg-red-500/20 blur-xl opacity-0 animate-pulse"></span>
                </span>
            </h2>
            <div className="flex justify-center mb-16">
                 <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
            </div>

            <div className="space-y-32">
                {PRODUCTS.map((product, idx) => (
                    <div key={product.id} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 group perspective-[2000px]`}>
                        
                        {/* Interactive Side (Visual) */}
                        <div className="w-full lg:w-1/2 relative flex justify-center h-[500px] transform transition-transform duration-700 group-hover:scale-105 group-hover:rotate-y-2">
                             {/* Localized Glow behind wheel */}
                            <div className="absolute inset-0 bg-red-900/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-1000 pointer-events-none"></div>
                            
                            <InteractiveWheel 
                                image={product.image}
                                name={product.name}
                                depth={product.depth}
                                features={product.features}
                            />
                        </div>

                        {/* Content Side */}
                        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left z-20 pointer-events-none">
                             {/* Re-enable pointer events for buttons */}
                            <div className="pointer-events-auto transform transition-all duration-500 group-hover:translate-x-4">
                                <div className="flex items-center gap-4 justify-center lg:justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-500 mb-2">
                                     <span className="text-[10px] font-mono text-red-500 bg-red-900/10 border border-red-900/30 px-2 py-1">SYS_ID: {product.id.toUpperCase()}</span>
                                </div>

                                <h3 className="font-orbitron text-3xl md:text-5xl font-bold text-metal group-hover:text-metal-red transition-all duration-500 relative inline-block">
                                    {product.name}
                                </h3>

                                {/* 
                                    ANIMATION SPECIALE POUR FEATHER 35 (CLIMB) 
                                    Ou soulignement standard pour les autres
                                */}
                                <div className="mx-auto lg:mx-0 h-16 w-full max-w-[300px] flex items-center">
                                    {product.id === 'vdz-35-climb' ? (
                                        <div className="relative w-full h-full overflow-visible opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                                            <svg viewBox="0 0 300 60" className="w-full h-full overflow-visible">
                                                <defs>
                                                    <path id="climbPath" d="M 0,55 L 40,55 L 80,45 L 120,20 L 160,30 L 220,5 L 260,55 L 300,55" fill="none" />
                                                </defs>
                                                
                                                {/* Laser Drawing Line */}
                                                <path 
                                                    d="M 0,55 L 40,55 L 80,45 L 120,20 L 160,30 L 220,5 L 260,55 L 300,55" 
                                                    fill="none" 
                                                    stroke="#dc2626" 
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="animate-[drawLines_6s_linear_infinite]"
                                                    style={{ strokeDasharray: 350, strokeDashoffset: 350, filter: 'drop-shadow(0 0 3px #ef4444)' }}
                                                />

                                                {/* The Bike - Moving along path */}
                                                <g>
                                                    <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
                                                        <mpath href="#climbPath" />
                                                    </animateMotion>
                                                    
                                                    {/* Bike Group - Scaled & Centered */}
                                                    <g transform="translate(0, -5) scale(0.6)">
                                                        {/* Wheels */}
                                                        <circle r="6" stroke="white" strokeWidth="1.5" fill="none" />
                                                        <circle cx="16" r="6" stroke="white" strokeWidth="1.5" fill="none" />
                                                        {/* Frame */}
                                                        <path d="M 0,0 L 6,-8 L 16,0 M 6,-8 L 3,-10" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                                                        {/* Rider Head (Dot) */}
                                                        <circle cx="5" cy="-14" r="1.5" fill="#dc2626" />
                                                    </g>
                                                </g>

                                                {/* Leading Laser Spark */}
                                                <circle r="2" fill="#fff" className="animate-[pulse_1s_infinite]">
                                                     <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
                                                        <mpath href="#climbPath" />
                                                    </animateMotion>
                                                </circle>
                                            </svg>
                                            <style>{`
                                                @keyframes drawLines {
                                                    0% { stroke-dashoffset: 350; opacity: 0; }
                                                    10% { opacity: 1; }
                                                    80% { opacity: 1; }
                                                    100% { stroke-dashoffset: 0; opacity: 0; }
                                                }
                                            `}</style>
                                        </div>
                                    ) : (
                                        // Soulignement Standard pour les autres
                                        <div className="h-1 w-24 bg-white/20 group-hover:w-full group-hover:bg-red-800 transition-all duration-700 ease-out"></div>
                                    )}
                                </div>
                                
                                <ul className="space-y-2 font-rajdhani text-lg text-gray-300 my-6">
                                    {product.features.map((feat, i) => (
                                        <li key={i} className="flex items-center justify-center lg:justify-start gap-3 opacity-80 group-hover:opacity-100 transition-opacity" style={{ transitionDelay: `${i * 100}ms` }}>
                                            <span className="w-1.5 h-1.5 bg-red-600 rounded-full shadow-[0_0_5px_red]"></span>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-6 flex flex-col lg:flex-row items-center gap-6">
                                    <span className="font-orbitron text-2xl font-bold text-white tracking-widest">{product.price}</span>
                                    <CarbonButton>CONFIGURER</CarbonButton>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};
