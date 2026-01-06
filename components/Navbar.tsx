import React, { useState, useEffect } from 'react';
import { Menu, ShoppingCart } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="font-orbitron text-2xl font-black text-white tracking-widest flex items-center gap-1">
          VDZ<span className="text-red-600">.</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-rajdhani font-semibold text-sm tracking-widest text-gray-300">
          <a href="#" className="hover:text-white transition-colors">ROUES</a>
          <a href="#" className="hover:text-white transition-colors">TECHNOLOGIE</a>
          <a href="#" className="hover:text-white transition-colors">SUR MESURE</a>
          <a href="#" className="hover:text-white transition-colors text-red-500">OFFRES</a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <div className="relative cursor-pointer group">
            <ShoppingCart className="w-5 h-5 text-white group-hover:text-red-500 transition-colors" />
            <span className="absolute -top-2 -right-2 bg-red-900 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">0</span>
          </div>
          <Menu className="w-6 h-6 text-white md:hidden cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};