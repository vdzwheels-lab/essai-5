import React from 'react';
import { ChevronRight } from 'lucide-react';

interface CarbonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
}

export const CarbonButton: React.FC<CarbonButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = "relative px-8 py-3 font-orbitron font-bold tracking-widest text-sm transition-all duration-300 transform skew-x-[-15deg] group overflow-hidden border";
  
  const variants = {
    primary: "bg-red-900 border-red-800 text-white hover:bg-red-800 hover:shadow-[0_0_20px_rgba(139,0,0,0.6)]",
    outline: "bg-transparent border-gray-600 text-gray-300 hover:border-white hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      <div className="skew-x-[15deg] flex items-center justify-center gap-2">
        {children}
        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
      {/* Shine effect */}
      <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[15deg] transition-all duration-700 group-hover:left-full" />
    </button>
  );
};