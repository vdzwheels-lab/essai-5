import React from 'react';
import { ExternalLink, MoveRight, Users } from 'lucide-react';

const STRAVA_URL = "https://www.strava.com/clubs/997805";
const BG_IMAGE = "https://vdzwheels.com/vdz-wheels-test/wp-content/uploads/2026/01/u7892238122_httpss.mj_.runqj8N_bg5eLA_httpss.mj_.run3Z3xPdufcSo_117118b8-6c94-4e66-a3f7-5ef6e1f15813_2.png";

export const StravaClub: React.FC = () => {
  return (
    <section className="relative h-[60vh] min-h-[600px] flex items-center justify-center overflow-hidden border-t border-white/10">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
            src={BG_IMAGE} 
            alt="Cyclist Background" 
            className="w-full h-full object-cover opacity-60 grayscale-[20%] contrast-110"
        />
        {/* Overlay Gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80"></div>
        
        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Text Block */}
        <div className="max-w-2xl relative">
            {/* Decorative background element behind text */}
            <div className="absolute -left-20 -top-20 w-64 h-64 bg-red-900/20 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="flex items-center gap-4 mb-6">
                 <div className="h-[2px] w-16 bg-red-600 shadow-[0_0_10px_#dc2626]"></div>
                 <span className="text-red-500 font-orbitron tracking-[0.3em] text-sm font-bold uppercase animate-pulse">COMMUNAUTÉ PILOTES</span>
            </div>
            
            <h2 className="font-orbitron text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] uppercase mb-8 italic transform -skew-x-6 drop-shadow-2xl">
                LA PASSION <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">COMME MOTEUR</span>
            </h2>
            
            <p className="font-rajdhani text-xl text-gray-300 max-w-lg mb-10 border-l-4 border-red-600 pl-6 py-2 bg-gradient-to-r from-black/60 to-transparent backdrop-blur-sm rounded-r-lg">
                Au-delà de la performance, c'est l'esprit qui nous unit. Rejoignez le peloton VDZ Wheels. Partagez vos sorties, comparez vos données et accédez aux événements exclusifs.
            </p>

            <div className="flex items-center gap-4 text-sm font-orbitron text-gray-400">
                 <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-red-500" />
                    <span>REJOIGNEZ L'ÉLITE</span>
                 </div>
            </div>
        </div>

        {/* Right Action Block (Card) */}
        <div className="relative group perspective-1000">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-[#fc4c02] blur-[20px] opacity-20 group-hover:opacity-50 transition-opacity duration-500 rounded-2xl"></div>
            
            <a 
                href={STRAVA_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative block w-full md:w-[400px] bg-zinc-950/90 backdrop-blur-xl border border-white/10 p-8 rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 hover:border-white/30 shadow-2xl"
            >
                {/* Header Icons */}
                <div className="flex items-center justify-between mb-10 relative">
                    {/* VDZ Logo Representation */}
                    <div className="flex flex-col items-center group/vdz">
                         <div className="w-14 h-14 bg-black border border-zinc-800 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover/vdz:border-red-600 transition-colors">
                            <span className="font-orbitron font-black text-lg text-white tracking-tighter">VDZ<span className="text-red-600">.</span></span>
                         </div>
                    </div>

                    {/* Connection Animation */}
                    <div className="flex-1 px-4 flex items-center justify-center relative">
                        <div className="w-full h-[1px] bg-zinc-700"></div>
                        <div className="absolute w-2 h-2 bg-white rounded-full animate-ping"></div>
                        <div className="absolute bg-black px-2">
                            <MoveRight className="w-4 h-4 text-gray-500" />
                        </div>
                    </div>

                    {/* Strava Icon (SVG) */}
                    <div className="flex flex-col items-center group/strava">
                        <div className="w-14 h-14 bg-[#fc4c02] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(252,76,2,0.4)] group-hover/strava:scale-110 transition-transform">
                             <svg role="img" viewBox="0 0 24 24" className="w-8 h-8 fill-white" xmlns="http://www.w3.org/2000/svg">
                                <title>Strava</title>
                                <path d="M15.387 17.944l-2.089-4.116h-3.065l5.154 10.172 5.154-10.172h-3.065zM9.445 12.12h3.066l-5.154-10.172-5.155 10.172h3.066l2.089-4.117z"/>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-2 mb-8 text-center">
                    <h3 className="text-2xl font-orbitron font-bold text-white tracking-wide">CLUB OFFICIEL</h3>
                    <p className="font-rajdhani text-gray-400 text-sm">Synchronisez votre passion.</p>
                </div>

                {/* Button Lookalike */}
                <div className="flex items-center justify-between bg-[#fc4c02] hover:bg-[#e34402] text-white p-4 rounded-lg transition-colors group/btn">
                     <span className="font-orbitron font-bold tracking-widest text-sm">OUVRIR STRAVA</span>
                     <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </div>
                
                {/* Footer Decor */}
                <div className="absolute bottom-2 right-2 flex gap-1">
                    <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                    <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                    <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                </div>
            </a>
        </div>

      </div>
    </section>
  );
};