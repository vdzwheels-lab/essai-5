import React, { useEffect, useState, useRef } from 'react';
import { CarbonButton } from './ui/CarbonButton';
import { VoodooDollNav } from './ui/VoodooDollNav';
import { Wifi } from 'lucide-react';

export const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    // Force play video on mount
    if (videoRef.current) {
        videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden pt-20 pb-10">
      
      {/* --- ATMOSPHERE: HEADER TOP ONLY --- */}
      <div 
        className="absolute top-0 left-0 w-full h-[60vh] z-0 pointer-events-none overflow-hidden"
        style={{
            // Masque alpha pour fondre l'image doucement vers le noir du bas
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)'
        }}
      >
         {/* 1. Image de fond HD (Voie Lactée originale) */}
         <img 
           src="https://images.unsplash.com/photo-1506318137071-a8bcbf67cc77?q=80&w=2000&auto=format&fit=crop" 
           alt="Milky Way Header" 
           className="w-full h-full object-cover"
           style={{ 
               transform: `translateY(${scrollY * 0.4}px)`, // Parallaxe
               filter: 'contrast(1.1) brightness(0.9)'
           }} 
         />
         
         {/* 2. Color Grading: Teinte Bleu Nuit Profond */}
         <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/90 via-[#172554]/50 to-black mix-blend-multiply z-10"></div>
         
         {/* 3. RED MOON (Lune de Sang) - Giant & Discreet */}
         <div 
            className="absolute -top-[10%] -right-[10%] w-[50vw] h-[50vw] min-w-[400px] min-h-[400px] z-10 opacity-30 mix-blend-screen pointer-events-none"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
         >
             <div className="relative w-full h-full">
                <img 
                    src="https://images.unsplash.com/photo-1532693322450-2cb5c511067d?q=80&w=1000&auto=format&fit=crop" 
                    alt="Blood Moon"
                    className="w-full h-full object-contain"
                    style={{
                        // Filtres pour rendre la lune rouge sombre et fondue
                        filter: 'grayscale(100%) sepia(100%) hue-rotate(-50deg) saturate(300%) brightness(0.7) contrast(1.2)',
                        maskImage: 'radial-gradient(circle, black 40%, transparent 70%)',
                        WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 70%)'
                    }}
                />

                {/* 4. THE DISCREET RIDER (Tiny Silhouette Transit) */}
                <div className="absolute top-[45%] right-[-20%] w-24 h-24 z-20 animate-[moon-transit_60s_linear_infinite] opacity-90 mix-blend-multiply">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-black fill-black drop-shadow-md">
                        <g transform="rotate(-5 50 50)">
                            {/* BIKE: TT Style - Sharp and Aero */}
                            <g>
                                <path d="M 20,75 L 45,45 L 80,45 L 85,75 L 50,75 Z" /> {/* Aero Frame */}
                                <circle cx="20" cy="75" r="14" /> {/* Disc Wheel Rear */}
                                <circle cx="85" cy="75" r="14" /> {/* Deep Section Front */}
                                <circle cx="85" cy="75" r="11" fill="white" fillOpacity="0.1" /> {/* Rim cutout */}
                                <path d="M 80,45 L 90,45" stroke="black" strokeWidth="2" /> {/* Aero bars */}
                            </g>

                            {/* RIDER: Voodoo "Sackboy" Style */}
                            <g transform="translate(0, -5)">
                                {/* Body (Hunched) */}
                                <ellipse cx="55" cy="45" rx="10" ry="12" transform="rotate(30 55 45)" />
                                {/* Head */}
                                <g transform="translate(68, 30)">
                                    <path d="M -10,0 C -10,-8 10,-8 10,0 C 10,10 -10,10 -10,0 Z" />
                                    {/* Pins */}
                                    <line x1="0" y1="-8" x2="-5" y2="-15" stroke="black" strokeWidth="1.5" />
                                    <circle cx="-5" cy="-15" r="2" />
                                    <line x1="5" y1="-7" x2="10" y2="-12" stroke="black" strokeWidth="1.5" />
                                    <circle cx="10" cy="-12" r="2" />
                                    {/* Eyes */}
                                    <circle cx="-4" cy="-2" r="2.5" fill="white" fillOpacity="0.8" />
                                    <path d="M -5,-3 L -3,-1 M -3,-3 L -5,-1" stroke="black" strokeWidth="0.5" /> 
                                    <circle cx="5" cy="-2" r="1.5" fill="white" fillOpacity="0.8" />
                                </g>
                                {/* Cape */}
                                <path d="M 50,40 Q 20,40 10,50 L 5,45 L 8,55 L 0,50 Q 20,65 55,50" fill="black">
                                    <animate attributeName="d" 
                                        values="M 50,40 Q 20,40 10,50 L 5,45 L 8,55 L 0,50 Q 20,65 55,50;
                                                M 50,40 Q 20,30 10,40 L 5,35 L 8,45 L 0,40 Q 20,55 55,50;
                                                M 50,40 Q 20,40 10,50 L 5,45 L 8,55 L 0,50 Q 20,65 55,50"
                                        dur="0.3s" repeatCount="indefinite" />
                                </path>
                            </g>
                        </g>
                    </svg>
                </div>
             </div>
         </div>

         {/* 4. Touche de lumière éthérée */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-blue-900/10 blur-[120px] mix-blend-screen z-10"></div>

         {/* 5. Étoiles Filantes */}
         <div className="absolute inset-0 z-20 overflow-hidden">
             <div className="absolute top-10 right-[30%] w-[120px] h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 animate-shoot-diag" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
             <div className="absolute top-[20%] left-[10%] w-[180px] h-[1px] bg-gradient-to-r from-transparent via-cyan-100 to-transparent opacity-0 animate-shoot-flat" style={{ animationDuration: '8s', animationDelay: '5s' }}></div>
             <div className="absolute top-0 left-[60%] w-[100px] h-[1px] bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-0 animate-shoot-steep" style={{ animationDuration: '7s', animationDelay: '0s' }}></div>
         </div>
      </div>

      {/* --- LASER BEAMS LAYER --- */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden mix-blend-screen opacity-60">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-r from-transparent via-red-900/20 to-transparent animate-[spin-slow_15s_linear_infinite]"></div>
        <div className="absolute top-0 left-[-10%] w-[5px] h-[150%] bg-red-600/30 blur-md transform rotate-[25deg] animate-[shimmer_8s_infinite] origin-top"></div>
        <div className="absolute top-[20%] left-0 w-full h-[1px] bg-red-500/50 shadow-[0_0_10px_red] animate-[scan_10s_linear_infinite]"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[2px] h-[200%] bg-red-500/20 transform rotate-[-45deg] animate-[pulse_4s_infinite]"></div>
      </div>

      {/* Cyber Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(220, 38, 38, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: `perspective(1000px) rotateX(60deg) translateY(${scrollY * 0.5}px) translateZ(-200px)`,
          transformOrigin: 'top center'
        }}
      />

      <style>{`
        @keyframes moon-transit {
            0% { transform: translateX(100px) translateY(50px) scale(0.8); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { transform: translateX(-800px) translateY(-50px) scale(0.6); opacity: 0; }
        }
      `}</style>

      <div className="container mx-auto px-6 relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 h-full">
        
        {/* --- LEFT COLUMN: CONTENT & DATA FEED --- */}
        {/* Added flex items-start to ensure content starts at top */}
        <div className="flex flex-col gap-8 lg:pr-10 z-30 justify-center h-full">
          <div className="flex items-center gap-4">
             <div className="h-[1px] w-12 bg-red-600 shadow-[0_0_10px_#dc2626]"></div>
             <span className="font-rajdhani tracking-[0.3em] text-sm font-bold uppercase animate-pulse flex gap-2 drop-shadow-md">
                <span className="text-blue-500">DEPUIS</span>
                <span className="text-white">2014</span>
                <span className="text-red-600">FRANCE</span>
             </span>
          </div>
          
          <h1 className="font-orbitron text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[1.0] text-metal select-none drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
            Roues artisanales <br />
            <span className="text-metal-red hover-glitch cursor-default">De qualité</span> <br />
            Pour cycliste exigeant
          </h1>
          
          <p className="font-rajdhani text-gray-300 text-lg max-w-lg leading-relaxed border-l-2 border-red-900/50 pl-6 backdrop-blur-sm bg-black/30 p-4 rounded-r-lg shadow-lg">
            La précision chirurgicale rencontre l'âme du carbone. Pilotez une machine vivante, assemblée à la main, calibrée pour votre style.
          </p>

          <div className="flex flex-wrap gap-4">
            <CarbonButton>DÉCOUVRIR LA GAMME</CarbonButton>
            <CarbonButton variant="outline">MONTAGE À LA CARTE</CarbonButton>
          </div>

          {/* --- VIDEO LEVEL: DATA TERMINAL --- */}
          <div className="mt-8 max-w-sm">
             <div className="relative w-full group perspective-1000">
                <div className="bg-zinc-950/80 backdrop-blur border-l-2 border-red-900 rounded-r-lg p-3 shadow-lg transform transition-transform duration-500 group-hover:translate-x-2">
                    <div className="flex justify-between items-center mb-2 px-1 border-b border-white/5 pb-1">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></div>
                            <span className="text-[10px] font-orbitron text-gray-400 tracking-widest">ATELIER_FEED.LIVE</span>
                        </div>
                        <Wifi className="w-3 h-3 text-gray-600" />
                    </div>
                    <div className="flex gap-4">
                        <div className="relative overflow-hidden rounded bg-black border border-zinc-800 w-32 h-20 shrink-0">
                            <video 
                            ref={videoRef}
                            src="https://vdzwheels.com/vdz-wheels-test/wp-content/uploads/2026/01/WhatsApp-Video-2025-08-22-a-04.35.43_5d3fdc79.mp4" 
                            poster="https://images.unsplash.com/photo-1576435728678-35d016018997?q=80&w=1000&auto=format&fit=crop"
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300 filter grayscale contrast-125"
                            autoPlay
                            loop
                            muted
                            playsInline
                            />
                            <div className="absolute inset-0 bg-[length:4px_4px] bg-[radial-gradient(black_1px,transparent_0)] opacity-50 pointer-events-none"></div>
                        </div>
                        <div className="flex flex-col justify-center space-y-1">
                            <div className="text-[10px] font-mono text-red-500">STATUS: <span className="text-white">OPERATIONNEL</span></div>
                            <div className="text-[10px] font-mono text-gray-500">TENSION: <span className="text-white">1200N</span></div>
                            <div className="text-[10px] font-mono text-gray-500">BATCH: <span className="text-white">#A-8842</span></div>
                            <div className="w-full h-1 bg-zinc-800 rounded-full mt-1 overflow-hidden">
                                <div className="h-full bg-red-900 w-2/3 animate-[shimmer_2s_infinite]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: VOODOO NAV --- */}
        {/* Adjusted Position: 
            - lg:items-start -> Aligns to top of grid cell (matches top of text column)
            - lg:justify-start -> Aligns to left of grid cell (center of screen)
            - lg:mt-20 -> Pushes down to align visually with H1 (skipping the "DEPUIS" tag)
            - lg:-translate-x-12 -> Nudges slightly left into the gutter to be closer to text
        */}
        <div className="relative flex justify-center lg:justify-start items-center lg:items-start h-full pointer-events-none lg:pointer-events-auto">
          <div className="relative z-20 transform transition-transform duration-500 lg:mt-20 lg:-translate-x-12">
              <VoodooDollNav />
              <div className="absolute -top-6 right-0 text-[9px] font-mono text-gray-500 border-b border-gray-800 pb-1 opacity-50">NAV_NODE: V.3.3</div>
          </div>
        </div>

      </div>
      
      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce transition-opacity duration-300"
        style={{ opacity: Math.max(0, 0.5 - scrollY / 500) }}
      >
        <div className="w-[1px] h-8 bg-gradient-to-b from-red-600 to-transparent"></div>
      </div>
    </section>
  );
};
