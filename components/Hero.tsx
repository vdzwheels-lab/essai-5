import React, { useEffect, useState } from 'react';
import { CarbonButton } from './ui/CarbonButton';

export const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Elements - Parallax Layer 1 (Slow) */}
      <div 
        className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-red-900/10 to-transparent pointer-events-none" 
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />
      
      {/* Abstract Shapes - Parallax Layer 2 (Medium) */}
      {/* Top Right Circle */}
      <div 
        className="absolute top-1/4 right-[-10%] pointer-events-none z-0"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <div 
          className="w-[500px] h-[500px] border border-white/5 rounded-full animate-spin-slow opacity-20" 
          style={{ animationDuration: '30s' }} 
        />
      </div>

      {/* Bottom Left Circle - Reverse Parallax */}
      <div 
        className="absolute bottom-[-10%] left-[-10%] pointer-events-none z-0"
        style={{ transform: `translateY(-${scrollY * 0.1}px)` }}
      >
        <div 
          className="w-[800px] h-[800px] border border-red-900/20 rounded-full animate-spin-slow opacity-10" 
          style={{ animationDuration: '45s', animationDirection: 'reverse' }} 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text Content - Asymmetrical Span */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center gap-4">
             <div className="h-[1px] w-12 bg-red-600 shadow-[0_0_10px_#dc2626]"></div>
             <span className="font-rajdhani text-red-500 tracking-[0.3em] text-sm font-bold uppercase">Est. 2014 France</span>
          </div>
          
          <h1 className="font-orbitron text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] text-metal select-none">
            Roues artisanales <br />
            <span className="text-metal-red hover-glitch cursor-default">De qualité</span> <br />
            Pour cycliste exigeant
          </h1>
          
          <p className="font-rajdhani text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed border-l-2 border-red-900/50 pl-6 my-6">
            Rouler n'est pas qu'un mouvement. C'est un art. Nous pensons et réalisons avec soin et passion un instrument qui saura sublimer votre cadre. 
            . .
          </p>

          <div className="flex flex-wrap gap-4">
            <CarbonButton>DÉCOUVRIR LA GAMME</CarbonButton>
            <CarbonButton variant="outline">MONTAGE À LA CARTE</CarbonButton>
          </div>
        </div>

        {/* Hero Visual - Custom Polygon Cutout for Photo */}
        <div className="lg:col-span-5 relative mt-12 lg:mt-0 perspective-1000">
          <div 
            className="relative group w-full max-w-md mx-auto transform transition-transform duration-500 hover:rotate-y-6 hover:rotate-x-6"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Back Glow/Border Effect */}
            <div 
                className="absolute -inset-1 bg-gradient-to-tr from-red-600 via-zinc-800 to-white opacity-40 blur-sm group-hover:opacity-60 transition-opacity duration-500"
                style={{ clipPath: 'polygon(20% 0%, 100% 0, 100% 80%, 80% 100%, 0 100%, 0% 20%)', transform: 'translateZ(-10px)' }}
            ></div>

            {/* Main Image Container with Polygon Clip */}
            <div 
                className="relative bg-zinc-900 overflow-hidden h-[400px] md:h-[500px]"
                style={{ clipPath: 'polygon(20% 0%, 100% 0, 100% 80%, 80% 100%, 0 100%, 0% 20%)' }}
            >
                {/* The Photo */}
                <img 
                  src="https://images.unsplash.com/photo-1576435728678-35d016018997?q=80&w=1000&auto=format&fit=crop" 
                  alt="VDZ Wheel Close-up" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 contrast-125 group-hover:brightness-100"
                />
                
                {/* Tech Overlays inside the image */}
                <div className="absolute top-0 right-0 p-4 opacity-50">
                    <div className="flex flex-col items-end gap-1">
                        <div className="w-16 h-[2px] bg-white"></div>
                        <div className="w-8 h-[2px] bg-red-500"></div>
                    </div>
                </div>
                
                {/* Scanline Texture */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_4px,6px_100%] pointer-events-none opacity-40"></div>
                
                {/* Flash Reflection Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
            </div>

            {/* External Tech Markers (Corner Brackets) */}
            <div className="absolute -top-3 -right-3 w-10 h-10 border-t-2 border-r-2 border-red-500 opacity-60 group-hover:opacity-100 transition-all duration-300 pointer-events-none" style={{ transform: 'translateZ(20px)' }}></div>
            <div className="absolute -bottom-3 -left-3 w-10 h-10 border-b-2 border-l-2 border-white opacity-40 group-hover:opacity-100 transition-all duration-300 pointer-events-none" style={{ transform: 'translateZ(20px)' }}></div>
            
            {/* Label Tag */}
            <div 
                className="absolute bottom-8 right-8 bg-black/80 backdrop-blur border border-red-900/50 px-3 py-1 text-[10px] font-orbitron text-white tracking-widest z-30"
                style={{ transform: 'translateZ(30px)' }}
            >
                IMG_REF: AERO_01
            </div>
          </div>
          
          {/* Decorative Technical Lines behind */}
          <div className="absolute top-1/2 -right-12 w-32 h-[1px] bg-red-600/20 rotate-90 hidden lg:block"></div>
        </div>
      </div>
      
      {/* Scroll Indicator - Fades out on scroll */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce transition-opacity duration-300"
        style={{ opacity: Math.max(0, 0.5 - scrollY / 500) }}
      >
        <span className="text-[10px] font-orbitron tracking-widest text-white">DÉFILER</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-red-600 to-transparent"></div>
      </div>
    </section>
  );
};