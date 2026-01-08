import React, { useRef, useState } from 'react';
import { Camera, Film, Maximize2, Aperture, ScanLine } from 'lucide-react';

interface MediaItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  title: string;
  meta: string;
  width?: string; // for stream sizing
}

const GALLERY_ITEMS: MediaItem[] = [
  { id: 1, type: 'video', src: 'https://cdn.pixabay.com/video/2016/09/21/5194-183786499_large.mp4', title: 'TEST AERO', meta: 'WIND_TUNNEL', width: 'w-96' },
  { id: 2, type: 'image', src: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000&auto=format&fit=crop', title: 'MATTE FINISH', meta: 'ISO 100', width: 'w-72' },
  { id: 3, type: 'image', src: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=1000&auto=format&fit=crop', title: 'HUB DETAIL', meta: 'MACRO', width: 'w-64' },
  { id: 4, type: 'image', src: 'https://images.unsplash.com/photo-1571068316344-75bc76f778f7?q=80&w=1000&auto=format&fit=crop', title: 'SPOKES', meta: 'WORKSHOP', width: 'w-80' },
  { id: 5, type: 'video', src: 'https://cdn.pixabay.com/video/2021/11/14/95015-646676643_large.mp4', title: 'ALPS RIDE', meta: 'EXTREME', width: 'w-96' },
  { id: 6, type: 'image', src: 'https://images.unsplash.com/photo-1565108608630-9b0475303c71?q=80&w=1000&auto=format&fit=crop', title: 'CARBON', meta: 'MICROSCOPE', width: 'w-72' },
  { id: 7, type: 'image', src: 'https://images.unsplash.com/photo-1559348349-86f1f65817fe?q=80&w=1000&auto=format&fit=crop', title: 'WAVE', meta: 'STUDIO', width: 'w-96' },
  { id: 8, type: 'image', src: 'https://images.unsplash.com/photo-1485965120184-e224f7230c4f?q=80&w=1000&auto=format&fit=crop', title: 'NIGHT RIDE', meta: 'LOW LIGHT', width: 'w-80' },
];

// --- COMPONENT: SLICED IMAGE HERO ---
const SlicedHero = () => {
    return (
        <div className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden border-y border-white/10 bg-zinc-900 group-hero">
             {/* Background Text that gets revealed */}
             <div className="absolute inset-0 flex items-center justify-center z-0">
                 <h2 className="font-black font-orbitron text-[15vw] text-red-900/20 leading-none tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110">
                     PRECISION
                 </h2>
             </div>

             <div className="relative z-10 w-full max-w-4xl h-[400px] flex gap-1 transform transition-transform duration-700 hover:scale-105">
                 {[0, 1, 2, 3, 4].map((i) => (
                     <div 
                        key={i} 
                        className="flex-1 relative overflow-hidden transition-all duration-500 ease-out hover:flex-[1.5] group-hover:-translate-y-4 hover:!translate-y-4 filter grayscale group-hover:grayscale-0"
                        style={{ 
                            transitionDelay: `${i * 50}ms`
                        }}
                     >
                         <div className="absolute inset-0 bg-red-900/20 opacity-0 hover:opacity-100 transition-opacity z-20 pointer-events-none mix-blend-overlay"></div>
                         <img 
                            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000&auto=format&fit=crop" 
                            className="absolute w-[400%] max-w-none h-full object-cover"
                            style={{ left: `-${i * 100}%` }}
                            alt="Sliced Part"
                         />
                         {/* Tech Line */}
                         <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600 transform scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                     </div>
                 ))}
                 
                 {/* Overlay Label */}
                 <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur px-3 py-1 border border-white/20 z-30">
                     <span className="text-[10px] font-orbitron text-white tracking-widest flex items-center gap-2">
                         <ScanLine className="w-3 h-3 text-red-500" /> SLICE_VIEW_V1
                     </span>
                 </div>
             </div>
        </div>
    );
};

// --- COMPONENT: HYPERLOOP STREAM (Infinite Scroll with Distort) ---
const HyperloopStream = ({ items, direction = 'left', speed = 40 }: { items: MediaItem[], direction?: 'left' | 'right', speed?: number }) => {
    return (
        <div className="relative flex overflow-x-hidden py-12 group-stream">
            {/* Speed Lines Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[repeating-linear-gradient(90deg,transparent,transparent_50px,rgba(255,255,255,0.1)_50px,rgba(255,255,255,0.1)_51px)]"></div>

            <div 
                className={`flex gap-8 animate-marquee ${direction === 'right' ? 'animate-marquee-reverse' : ''}`} 
                style={{ animationDuration: `${speed}s` }}
            >
                {/* Double the array for infinite loop */}
                {[...items, ...items, ...items].map((item, i) => (
                    <div 
                        key={`${item.id}-${i}`} 
                        className={`relative h-64 shrink-0 transition-all duration-500 ease-out transform cursor-pointer group hover:scale-110 hover:z-20 hover:skew-x-0 ${direction === 'left' ? '-skew-x-12' : 'skew-x-12'}`}
                    >
                        {/* Media Container */}
                        <div className={`${item.width} h-full overflow-hidden border border-zinc-800 bg-zinc-900 relative`}>
                            {item.type === 'video' ? (
                                <video src={item.src} autoPlay muted loop className="w-full h-full object-cover opacity-60 group-hover:opacity-100 filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                            ) : (
                                <img src={item.src} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                            )}
                            
                            {/* Glitch Overlay on Hover */}
                            <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 mix-blend-color-dodge transition-opacity pointer-events-none"></div>
                            
                            {/* Info Pop */}
                            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                                <h4 className="font-orbitron text-white text-lg font-bold">{item.title}</h4>
                                <p className="font-rajdhani text-red-500 text-xs tracking-widest">{item.meta}</p>
                            </div>
                        </div>

                        {/* Connector Lines */}
                        <div className="absolute -top-2 left-0 w-2 h-2 bg-zinc-800 group-hover:bg-red-500 transition-colors"></div>
                        <div className="absolute -bottom-2 right-0 w-2 h-2 bg-zinc-800 group-hover:bg-red-500 transition-colors"></div>
                    </div>
                ))}
            </div>
            
            <style>{`
                .group-stream:hover .animate-marquee { animation-play-state: paused; }
                .group-stream:hover .animate-marquee-reverse { animation-play-state: paused; }
            `}</style>
        </div>
    );
};

export const Gallery: React.FC = () => {
  return (
    <div className="min-h-screen bg-black pt-32 pb-0 overflow-x-hidden">
      
      {/* HEADER SECTION */}
      <div className="container mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end">
         <div>
            <div className="flex items-center gap-2 mb-2">
                <Aperture className="w-4 h-4 text-red-600 animate-spin-slow" />
                <span className="text-xs font-orbitron text-gray-500 tracking-widest">ARCHIVES CLASSIFIÉES</span>
            </div>
            <h1 className="font-orbitron text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                FLUX <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">VISUEL</span>
            </h1>
         </div>
         <div className="mt-6 md:mt-0 max-w-md text-right">
             <p className="font-rajdhani text-gray-400">
                Une immersion brutale dans la matière. Carbone, asphalte et vitesse.
                Explorez les détails de notre ingénierie à travers l'objectif.
            </p>
         </div>
      </div>

      {/* HERO: SLICED REVEAL */}
      <SlicedHero />

      {/* SECTION TITLE */}
      <div className="container mx-auto px-6 py-12 flex items-center gap-4">
           <div className="h-[1px] flex-grow bg-white/10"></div>
           <span className="font-orbitron text-sm text-gray-500 tracking-[0.3em]">HYPERLOOP_STREAM</span>
           <div className="h-[1px] flex-grow bg-white/10"></div>
      </div>

      {/* INFINITE STREAMS */}
      <div className="space-y-8 pb-20">
          <HyperloopStream items={GALLERY_ITEMS} direction="left" speed={60} />
          <HyperloopStream items={[...GALLERY_ITEMS].reverse()} direction="right" speed={50} />
      </div>

      {/* STANDARD GRID (Pour garder l'accès détaillé) */}
      <div className="container mx-auto px-6 py-20 border-t border-white/10">
          <div className="flex justify-between items-center mb-8">
              <h3 className="font-orbitron text-2xl text-white">INDEX STATIQUE</h3>
              <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <div className="w-3 h-3 bg-zinc-800 rounded-full"></div>
                  <div className="w-3 h-3 bg-zinc-800 rounded-full"></div>
              </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-1">
              {GALLERY_ITEMS.slice(0, 8).map((item) => (
                  <div key={item.id} className="aspect-square relative group overflow-hidden bg-zinc-900 border border-black cursor-crosshair">
                      {item.type === 'video' ? (
                          <video src={item.src} muted loop className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-300" />
                      ) : (
                          <img src={item.src} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-300 scale-100 group-hover:scale-110" />
                      )}
                      
                      {/* X-RAY EFFECT OVERLAY */}
                      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.5)_3px)] opacity-0 group-hover:opacity-20 pointer-events-none"></div>
                      <div className="absolute inset-0 border-2 border-red-500 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300"></div>
                      
                      <div className="absolute bottom-2 left-2 text-[10px] font-mono text-red-500 bg-black/80 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          IMG_0{item.id} :: {item.meta}
                      </div>
                  </div>
              ))}
          </div>
      </div>

    </div>
  );
};