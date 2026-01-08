import React, { useRef, useState } from 'react';
import { Plus, Scan, Activity, CheckCircle2, Wind, Palette } from 'lucide-react';

interface InteractiveWheelProps {
  image: string;
  name: string;
  depth: string;
  features: string[];
}

type FinishType = 'matte' | 'glossy' | 'red' | 'chrome' | 'raw-carbon';

export const InteractiveWheel: React.FC<InteractiveWheelProps> = ({ image, name, depth, features }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activePoint, setActivePoint] = useState<'hub' | 'rim' | null>(null);
  const [finish, setFinish] = useState<FinishType>('matte');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Normalize coordinates (-1 to 1)
    const nX = (x - centerX) / centerX;
    const nY = (y - centerY) / centerY;

    // Apply Cubic Easing (x*x*x) for non-linear sensitivity
    const MAX_ROTATION = 25; 
    
    const rotateY = nX * nX * nX * MAX_ROTATION;
    const rotateX = -(nY * nY * nY * MAX_ROTATION); 

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovering(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1576435728678-35d016018997?q=80&w=1000&auto=format&fit=crop";
  };

  const togglePoint = (point: 'hub' | 'rim') => {
    setActivePoint(activePoint === point ? null : point);
  };

  // Dynamic Styles based on Finish
  const getFilterStyle = () => {
    // Base grayscale logic
    if (!isHovering && !activePoint) return 'grayscale(100%) contrast(125%) brightness(90%)';

    // Active logic based on finish
    switch (finish) {
      case 'glossy':
        return 'grayscale(0%) contrast(130%) brightness(115%) saturate(0%)'; // High contrast, bright, no color
      case 'chrome':
        return 'grayscale(100%) contrast(160%) brightness(125%) drop-shadow(0 0 15px rgba(255,255,255,0.4))'; // Shiny metal, high contrast
      case 'raw-carbon':
         return 'grayscale(100%) contrast(135%) brightness(80%) sepia(5%)'; // Darker, raw, high texture
      case 'red':
        return 'grayscale(0%) sepia(100%) hue-rotate(320deg) saturate(300%) contrast(120%) brightness(70%)'; // Dark Red Tint
      case 'matte':
      default:
        return 'grayscale(0%) contrast(110%) brightness(100%)'; // Standard
    }
  };

  return (
    <div 
      className="perspective-1000 w-full h-[500px] flex items-center justify-center cursor-crosshair relative z-10"
      onMouseEnter={() => setIsHovering(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setActivePoint(null)}
      ref={containerRef}
      style={{ perspective: '1200px' }}
    >
      <div 
        className="relative w-full max-w-sm transition-all duration-100 ease-out transform-style-3d"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovering ? 1.05 : 1})`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Shadow (Ground) */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-black/50 blur-xl rounded-[100%] transition-transform duration-100"
             style={{ transform: `translateX(${-rotation.y * 2}px) scale(${1 - Math.abs(rotation.x)/40})` }} 
        />

        {/* The Wheel Image Container */}
        <div className="relative z-10 rounded-full group-wheel">
            {/* Main Image */}
            <img 
                src={image} 
                alt={name} 
                onError={handleImageError}
                className="w-full h-auto drop-shadow-2xl transition-all duration-500 rounded-full border border-white/5 object-cover aspect-square"
                style={{ filter: getFilterStyle() }}
            />
            
            {/* Red Finish Overlay (Mix Blend) */}
            <div 
              className={`absolute inset-0 rounded-full bg-red-900 mix-blend-overlay transition-opacity duration-500 pointer-events-none ${finish === 'red' && (isHovering || activePoint) ? 'opacity-80' : 'opacity-0'}`}
            ></div>

            {/* Glossy Finish Reflection (Soft) */}
             <div 
              className={`absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none mix-blend-soft-light transition-opacity duration-500 ${(finish === 'glossy') && (isHovering || activePoint) ? 'opacity-100' : 'opacity-0'}`}
              style={{ transform: `translate(${rotation.y * 2}px, ${-rotation.x * 2}px)` }}
            ></div>

            {/* Chrome Finish Reflection (Sharp & Hard) */}
            <div 
              className={`absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/70 to-transparent pointer-events-none mix-blend-color-dodge transition-opacity duration-500 ${(finish === 'chrome') && (isHovering || activePoint) ? 'opacity-100' : 'opacity-0'}`}
              style={{ transform: `translate(${rotation.y * 3}px, ${-rotation.x * 3}px)` }} // Faster movement for "metallic" feel
            ></div>

            {/* Raw Carbon Texture Overlay */}
            <div 
              className={`absolute inset-0 rounded-full pointer-events-none transition-opacity duration-500 ${finish === 'raw-carbon' && (isHovering || activePoint) ? 'opacity-50' : 'opacity-0'}`}
              style={{ 
                  backgroundImage: 'radial-gradient(circle at 50% 50%, transparent 50%, #000 100%), repeating-linear-gradient(45deg, rgba(0,0,0,0.5) 0, rgba(0,0,0,0.5) 2px, transparent 2px, transparent 4px)',
                  backgroundSize: '100% 100%, 6px 6px',
                  mixBlendMode: 'overlay'
              }}
            ></div>
            
            {/* Standard Dynamic Glare */}
            <div 
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none mix-blend-overlay transition-opacity duration-300"
                style={{ 
                    opacity: isHovering ? ((finish === 'glossy' || finish === 'chrome') ? 0.6 : 0.4) : 0,
                    transform: `translate(${rotation.y * 1.5}px, ${-rotation.x * 1.5}px)`
                }}
            />
        </div>

        {/* Finish Selector Panel */}
        <div 
          className={`absolute -right-16 bottom-0 flex flex-col gap-3 transition-all duration-500 ${isHovering || activePoint ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}
          style={{ transform: 'translateZ(50px)' }}
        >
          <div className="flex items-center gap-2 mb-2 justify-end">
            <span className="text-[9px] font-orbitron text-gray-400 tracking-widest uppercase">AERO SKIN</span>
            <Palette className="w-3 h-3 text-gray-500" />
          </div>
          
          {/* Matte Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); setFinish('matte'); }}
            className={`group flex items-center justify-end gap-2 transition-all duration-300 ${finish === 'matte' ? 'scale-110 translate-x-[-2px] opacity-100' : 'opacity-50 hover:opacity-100 hover:scale-105'}`}
          >
            <span className={`text-[9px] font-rajdhani font-bold uppercase transition-colors duration-300 ${finish === 'matte' ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'text-gray-500 hidden group-hover:block'}`}>Stealth</span>
            <div className={`w-6 h-6 rounded-full border transition-all duration-300 ${finish === 'matte' ? 'border-white bg-zinc-800 ring-2 ring-white/50 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'border-gray-600 bg-zinc-900'}`}></div>
          </button>

          {/* Glossy Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); setFinish('glossy'); }}
            className={`group flex items-center justify-end gap-2 transition-all duration-300 ${finish === 'glossy' ? 'scale-110 translate-x-[-2px] opacity-100' : 'opacity-50 hover:opacity-100 hover:scale-105'}`}
          >
            <span className={`text-[9px] font-rajdhani font-bold uppercase transition-colors duration-300 ${finish === 'glossy' ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'text-gray-500 hidden group-hover:block'}`}>Liquid</span>
            <div className={`w-6 h-6 rounded-full border transition-all duration-300 overflow-hidden relative ${finish === 'glossy' ? 'border-white bg-black ring-2 ring-white/50 shadow-[0_0_20px_rgba(255,255,255,0.5)]' : 'border-gray-600 bg-black'}`}>
               <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent"></div>
            </div>
          </button>

           {/* Chrome Button */}
           <button 
            onClick={(e) => { e.stopPropagation(); setFinish('chrome'); }}
            className={`group flex items-center justify-end gap-2 transition-all duration-300 ${finish === 'chrome' ? 'scale-110 translate-x-[-2px] opacity-100' : 'opacity-50 hover:opacity-100 hover:scale-105'}`}
          >
            <span className={`text-[9px] font-rajdhani font-bold uppercase transition-colors duration-300 ${finish === 'chrome' ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'text-gray-500 hidden group-hover:block'}`}>Chrome</span>
             <div className={`w-6 h-6 rounded-full border transition-all duration-300 overflow-hidden relative ${finish === 'chrome' ? 'border-white bg-gray-300 ring-2 ring-white/80 shadow-[0_0_20px_rgba(255,255,255,0.8)]' : 'border-gray-600 bg-gray-400'}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-300 to-gray-500"></div>
            </div>
          </button>

           {/* Raw Carbon Button */}
           <button 
            onClick={(e) => { e.stopPropagation(); setFinish('raw-carbon'); }}
            className={`group flex items-center justify-end gap-2 transition-all duration-300 ${finish === 'raw-carbon' ? 'scale-110 translate-x-[-2px] opacity-100' : 'opacity-50 hover:opacity-100 hover:scale-105'}`}
          >
            <span className={`text-[9px] font-rajdhani font-bold uppercase transition-colors duration-300 ${finish === 'raw-carbon' ? 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'text-gray-500 hidden group-hover:block'}`}>Raw</span>
             <div className={`w-6 h-6 rounded-full border transition-all duration-300 ${finish === 'raw-carbon' ? 'border-gray-400 bg-zinc-950 ring-2 ring-gray-600/50 shadow-[0_0_15px_rgba(100,100,100,0.3)]' : 'border-gray-600 bg-zinc-950'}`}>
                {/* Texture Pattern for Raw */}
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(45deg, #333 25%, transparent 25%, transparent 75%, #333 75%, #333)', backgroundSize: '4px 4px' }}></div>
             </div>
          </button>

          {/* Red Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); setFinish('red'); }}
            className={`group flex items-center justify-end gap-2 transition-all duration-300 ${finish === 'red' ? 'scale-110 translate-x-[-2px] opacity-100' : 'opacity-50 hover:opacity-100 hover:scale-105'}`}
          >
            <span className={`text-[9px] font-rajdhani font-bold uppercase transition-colors duration-300 ${finish === 'red' ? 'text-red-500 drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]' : 'text-gray-500 hidden group-hover:block'}`}>Inferno</span>
            <div className={`w-6 h-6 rounded-full border transition-all duration-300 ${finish === 'red' ? 'border-red-500 bg-red-950 ring-2 ring-red-500/50 shadow-[0_0_20px_rgba(220,38,38,0.6)]' : 'border-red-900 bg-red-950'}`}></div>
          </button>
        </div>

        {/* Holographic Name with Enhanced Glitch Effect */}
        <div 
            className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full text-center z-30 pointer-events-none transition-all duration-300"
            style={{ 
                transform: isHovering ? 'translateZ(60px) scale(1.1)' : 'translateZ(40px) scale(1)',
                opacity: isHovering || activePoint ? 1 : 0,
            }}
        >
            <div className="relative inline-block w-full max-w-full">
                {/* Glitch Layer 1 - Red Shift (DOMINANT) */}
                <h3 
                    className="font-orbitron text-4xl font-black uppercase tracking-widest absolute inset-0 text-red-600 opacity-0 z-0"
                    style={{
                        opacity: isHovering ? 1 : 0, // Full opacity for Red
                        transform: isHovering ? 'translate(4px, -3px)' : 'none',
                        clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)', // Full visibility
                        animation: isHovering ? 'glitch-skew 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite' : 'none',
                        textShadow: '0 0 10px rgba(220, 38, 38, 0.8)', // Glow
                        mixBlendMode: 'screen'
                    }}
                >
                    {name}
                </h3>

                {/* Glitch Layer 2 - Cyan Shift (SUBTLE) */}
                <h3 
                    className="font-orbitron text-4xl font-black uppercase tracking-widest absolute inset-0 text-cyan-400 opacity-0 z-0"
                    style={{
                        opacity: isHovering ? 0.3 : 0, // Low opacity for Cyan
                        transform: isHovering ? 'translate(-2px, 1px)' : 'none',
                        clipPath: 'polygon(0 60%, 100% 60%, 100% 90%, 0 90%)',
                        animation: isHovering ? 'glitch-skew 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite' : 'none',
                    }}
                >
                    {name}
                </h3>

                {/* Main Text - CHROME FINISH */}
                <h3 
                    className={`font-orbitron text-4xl font-black uppercase text-transparent bg-clip-text tracking-widest relative z-10 ${
                        finish === 'red' 
                        ? 'bg-gradient-to-b from-red-500 via-red-900 to-black' 
                        : 'bg-gradient-to-b from-white via-gray-300 to-zinc-600' // Chrome Gradient
                    }`}
                    style={{
                         // Red shadow dominant, subtle cyan/white highlight
                         textShadow: isHovering ? 
                            (finish === 'red' 
                                ? '4px 0 0px rgba(255,0,0,0.8), -2px 0 0px rgba(100,0,0,0.5)' 
                                : '4px 0 0px rgba(220, 38, 38, 0.9), -2px 0 0px rgba(0,255,255,0.1)') 
                            : '0px 2px 10px rgba(0,0,0,0.5)',
                    }}
                >
                    {name}
                </h3>
            </div>
            
            <div className={`h-1 mx-auto mt-2 transition-all duration-300 ${isHovering ? 'w-full' : 'w-0'} ${finish === 'red' ? 'bg-red-600 shadow-[0_0_10px_#dc2626]' : 'bg-white shadow-[0_0_10px_white]'}`}></div>
        </div>

        {/* --- TECH POINT: HUB (Center) --- */}
        <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer" 
            style={{ transform: 'translateZ(30px)' }}
            onClick={(e) => { e.stopPropagation(); togglePoint('hub'); }}
        >
             <div className={`relative group ${isHovering || activePoint ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 delay-100`}>
                <div className={`w-6 h-6 rounded-full absolute inset-0 -translate-x-1 -translate-y-1 ${activePoint === 'hub' ? 'bg-green-500/20 animate-ping' : (finish === 'red' ? 'bg-red-600 animate-ping' : 'bg-white animate-ping')}`}></div>
                
                <div className={`w-4 h-4 border rounded-full flex items-center justify-center transition-colors duration-300 ${activePoint === 'hub' ? 'bg-green-900 border-green-400 text-green-400' : (finish === 'red' ? 'bg-red-900 border-red-500 text-white' : 'bg-black border-white text-white')}`}>
                    {activePoint === 'hub' ? <Activity className="w-2 h-2" /> : <Plus className="w-3 h-3" />}
                </div>

                {/* Pulsing Dot Indicator */}
                {activePoint === 'hub' && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                )}
                
                {/* HUD Popup */}
                <div className={`absolute left-6 top-6 w-52 bg-black/90 backdrop-blur-md border p-3 rounded-tr-lg rounded-bl-lg transform transition-all duration-300 origin-top-left overflow-hidden ${isHovering || activePoint === 'hub' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} ${activePoint === 'hub' ? 'border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'border-red-900/50'}`}>
                    
                    {activePoint === 'hub' && (
                        <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent h-1/2 animate-[scan_2s_infinite_linear] pointer-events-none" style={{ backgroundSize: '100% 200%' }}></div>
                    )}

                    <div className="flex justify-between items-center mb-2">
                        <div className={`text-[10px] font-orbitron tracking-widest ${activePoint === 'hub' ? 'text-green-400' : 'text-red-500'}`}>
                            {activePoint === 'hub' ? 'ANALYSE SYSTÈME' : 'MOYEU & RAYONS'}
                        </div>
                        {activePoint === 'hub' && <Scan className="w-3 h-3 text-green-400 animate-spin-slow" />}
                    </div>

                    <div className="space-y-2 relative z-10">
                        <div className="text-xs font-rajdhani text-gray-300 border-l-2 border-white/20 pl-2">
                            {features[0]}
                        </div>
                        <div className="text-xs font-rajdhani text-gray-400 border-l-2 border-white/20 pl-2">
                            {features[1]}
                        </div>
                        
                        <div className={`text-[10px] font-orbitron text-green-400 mt-2 pt-2 border-t border-white/10 flex items-center gap-2 transition-all duration-500 ${activePoint === 'hub' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 h-0'}`}>
                            <CheckCircle2 className="w-3 h-3" /> CALIBRATION OK
                        </div>
                    </div>

                    <div className={`absolute -left-2 top-0 w-2 h-[1px] transition-colors ${activePoint === 'hub' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div className={`absolute left-0 -top-2 w-[1px] h-2 transition-colors ${activePoint === 'hub' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
             </div>
        </div>

        {/* --- TECH POINT: RIM (Top) --- */}
        <div 
            className="absolute top-[10%] left-[80%] z-20 cursor-pointer" 
            style={{ transform: 'translateZ(20px)' }}
            onClick={(e) => { e.stopPropagation(); togglePoint('rim'); }}
        >
             <div className={`relative group ${isHovering || activePoint ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 delay-200`}>
                <div className={`w-3 h-3 rounded-full absolute inset-0 ${activePoint === 'rim' ? 'bg-cyan-400/50 animate-ping' : 'bg-white animate-pulse'}`}></div>
                <div className={`w-3 h-3 border rounded-full transition-colors ${activePoint === 'rim' ? 'bg-cyan-900 border-cyan-400' : 'bg-zinc-800 border-white'}`}></div>
                
                {/* Pulsing Dot Indicator */}
                {activePoint === 'rim' && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                )}

                {/* HUD Popup */}
                <div className={`absolute right-6 top-0 w-48 bg-black/90 backdrop-blur-md border p-3 transform transition-all duration-300 origin-top-right text-right overflow-hidden ${isHovering || activePoint === 'rim' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} ${activePoint === 'rim' ? 'border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'border-zinc-700'}`}>
                    
                     {activePoint === 'rim' && (
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.1)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_2s_linear_infinite] pointer-events-none"></div>
                    )}

                    <div className={`text-[10px] font-orbitron tracking-widest mb-1 ${activePoint === 'rim' ? 'text-cyan-400' : 'text-white'}`}>
                        {activePoint === 'rim' ? 'FLUX AÉRO' : 'PROFIL JANTE'}
                    </div>
                    
                    <div className="text-xl font-bold font-orbitron text-white">{depth}</div>
                    <div className="text-[9px] font-rajdhani text-gray-400 uppercase">Fibre Toray T800</div>
                    
                     <div className={`mt-2 pt-2 border-t border-white/10 flex flex-col items-end gap-1 transition-all duration-500 ${activePoint === 'rim' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 h-0'}`}>
                        <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-orbitron">
                            COEF. TRAÎNÉE <Wind className="w-3 h-3" />
                        </div>
                        <div className="w-full bg-gray-800 h-1 rounded-full mt-1 overflow-hidden">
                            <div className="bg-cyan-400 h-full w-[85%] animate-[load_1s_ease-out]"></div>
                        </div>
                    </div>

                    <div className="absolute -right-2 bottom-0 w-2 h-[1px] bg-white"></div>
                </div>
                
                <div className={`absolute right-3 top-3 w-10 h-[1px] rotate-45 transform origin-top-left transition-all duration-300 ${isHovering || activePoint === 'rim' ? 'scale-x-100' : 'scale-x-0'} ${activePoint === 'rim' ? 'bg-cyan-400 shadow-[0_0_5px_cyan]' : 'bg-white/30'}`}></div>
             </div>
        </div>

      </div>
    </div>
  );
};