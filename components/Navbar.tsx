import React, { useState, useEffect } from 'react';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
      setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="font-orbitron text-2xl font-black text-white tracking-widest flex items-center gap-1 relative z-50 group">
            <span className="group-hover:text-red-500 transition-colors">VDZ</span>
            <span className="text-red-600 group-hover:text-white transition-colors">.</span>
          </Link>

          {/* Desktop Menu - REMOVED to focus on Voodoo Doll Nav */}
          {/* We keep it only if scrolled far down, or just keep it clean */}
          <div className={`hidden md:flex items-center gap-8 font-rajdhani font-semibold text-sm tracking-widest text-gray-500 transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
             <Link to="/technologie" className="hover:text-red-500 transition-colors">TECH</Link>
             <Link to="/sur-mesure" className="hover:text-red-500 transition-colors">BUILDER</Link>
             <Link to="/galerie" className="hover:text-red-500 transition-colors">GALERIE</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6 relative z-50">
            <div className="relative cursor-pointer group">
              <ShoppingCart className="w-5 h-5 text-white group-hover:text-red-500 transition-colors" />
              <span className="absolute -top-2 -right-2 bg-red-900 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">0</span>
            </div>
            
            {/* Burger is always visible on mobile, and visible on desktop only to access full menu if needed */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white hover:text-red-500 transition-colors">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile/Full Menu Overlay */}
      <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl z-40 transition-transform duration-500 transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col justify-center items-center border-l border-red-900/30`}>
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
          
          <div className="flex flex-col gap-10 text-center font-orbitron text-3xl font-bold text-gray-400">
            <Link to="/" className="hover:text-white hover:scale-110 transition-all">ACCUEIL</Link>
            <Link to="/technologie" className="hover:text-white hover:scale-110 transition-all">TECHNOLOGIE</Link>
            <Link to="/sur-mesure" className="hover:text-white hover:scale-110 transition-all">SUR MESURE</Link>
            <Link to="/galerie" className="hover:text-white hover:scale-110 transition-all">GALERIE</Link>
            <Link to="/contact" className="hover:text-white hover:scale-110 transition-all">CONTACT</Link>
          </div>

          <div className="absolute bottom-10 font-rajdhani text-gray-600 text-xs">
              SYSTEME DE NAVIGATION v2.0
          </div>
      </div>
    </>
  );
};
