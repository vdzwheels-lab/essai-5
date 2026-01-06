import React from 'react';
import { PRODUCTS } from '../constants';
import { CarbonButton } from './ui/CarbonButton';
import { InteractiveWheel } from './ui/InteractiveWheel';

export const Showcase: React.FC = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
        {/* Slanted Background */}
        <div className="absolute inset-0 bg-zinc-900 transform -skew-y-3 origin-top-left z-0 border-t border-b border-white/5"></div>

        <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-center font-orbitron text-4xl md:text-5xl font-black mb-16 text-white tracking-tight">
                LA <span className="text-metal-red">GAMME</span>
            </h2>

            <div className="space-y-32">
                {PRODUCTS.map((product, idx) => (
                    <div key={product.id} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 group`}>
                        {/* Interactive Image Side */}
                        <div className="w-full lg:w-1/2 relative flex justify-center">
                             {/* Background Glow */}
                            <div className="absolute inset-0 bg-red-900/10 blur-[80px] rounded-full opacity-50 pointer-events-none"></div>
                            
                            <InteractiveWheel 
                                image={product.image}
                                name={product.name}
                                depth={product.depth}
                                features={product.features}
                            />
                        </div>

                        {/* Content Side */}
                        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                            <h3 className="font-orbitron text-3xl md:text-5xl font-bold text-metal group-hover:text-metal-red transition-all duration-500">
                                {product.name}
                            </h3>
                            <div className="h-1 w-24 bg-white/20 mx-auto lg:mx-0 group-hover:w-full group-hover:bg-red-800 transition-all duration-700"></div>
                            
                            <ul className="space-y-2 font-rajdhani text-lg text-gray-300">
                                {product.features.map((feat, i) => (
                                    <li key={i} className="flex items-center justify-center lg:justify-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                                        {feat}
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-6 flex flex-col lg:flex-row items-center gap-6">
                                <span className="font-orbitron text-2xl font-bold text-white">{product.price}</span>
                                <CarbonButton>CONFIGURER</CarbonButton>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};