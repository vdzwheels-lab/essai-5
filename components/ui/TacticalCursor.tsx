import React, { useEffect, useState, useRef } from 'react';

export const TacticalCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // On utilise des refs pour la position pour éviter les re-renders React (Zero Latence)
  const pos = useRef({ x: -100, y: -100 });
  
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // 1. Gestion des événements souris (Optimisée)
    const onMouseMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      
      // Détection de survol (inchangée mais efficace)
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.group\\/card');
      
      setIsHovering(!!isClickable);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // 2. Boucle d'animation directe (Bypassing React State pour la position)
    let animationFrameId: number;
    
    const renderLoop = () => {
      if (cursorRef.current) {
        // Translation directe sans interpolation (Lerp = 0) pour supprimer la latence
        // On utilise translate3d pour forcer l'accélération GPU
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
        style={{ marginTop: -2, marginLeft: -2 }} // Micro-ajustement pour que la pointe soit pixel-perfect
    >
      <div className={`relative transition-transform duration-150 ${isClicking ? 'scale-90' : 'scale-100'}`}>
        
        {/* AIGUILLE PRINCIPALE (Le Pointeur) */}
        {/* Rotation de base pour que l'aiguille pointe vers le haut-gauche comme une souris normale */}
        <div className="relative w-12 h-12 origin-top-left rotate-[-45deg]">
            
            {/* L'Aiguille (Tige) */}
            <div className="absolute top-0 left-0 w-[2px] h-12 bg-gradient-to-b from-white via-gray-300 to-gray-500 shadow-[0_0_2px_black] origin-top"></div>
            
            {/* La Tête de Poupée (Tête d'épingle) */}
            <div className="absolute -bottom-1 -left-[5px] w-3 h-3">
                 <VoodooHeadSvg className={`w-full h-full text-white drop-shadow-md transition-colors duration-300 ${isHovering ? 'text-red-500' : 'text-gray-200'}`} />
            </div>

        </div>

        {/* AIGUILLE SECONDAIRE (Le "X" Voodoo au survol) */}
        {/* Elle n'apparait que sur les liens/boutons pour former une croix */}
        <div 
            className={`absolute top-0 left-0 w-12 h-12 origin-top-left transition-all duration-200 ease-out 
            ${isHovering ? 'opacity-100 rotate-[45deg] scale-75' : 'opacity-0 rotate-[-45deg] scale-50'}`}
        >
             <div className="absolute top-0 left-0 w-[2px] h-12 bg-red-600 shadow-[0_0_5px_red] origin-top"></div>
        </div>

        {/* CERCLE DE PRECISION (Targeting System) */}
        {/* Apparait discrètement autour de la pointe au clic */}
        <div className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-red-500 rounded-full transition-all duration-150 ${isClicking ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}></div>

      </div>
    </div>
  );
};

// Petite tête de poupée minimaliste pour le haut de l'aiguille
const VoodooHeadSvg: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" />
        {/* Yeux X */}
        <path d="M8 8L11 11M11 8L8 11" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <path d="M13 8L16 11M16 8L13 11" stroke="black" strokeWidth="2" strokeLinecap="round" />
        {/* Bouche cousue */}
        <path d="M9 16Q12 18 15 16" stroke="black" strokeWidth="1.5" fill="none" />
        <line x1="10" y1="15" x2="10" y2="17" stroke="black" strokeWidth="1" />
        <line x1="12" y1="15.5" x2="12" y2="17.5" stroke="black" strokeWidth="1" />
        <line x1="14" y1="15" x2="14" y2="17" stroke="black" strokeWidth="1" />
    </svg>
);
