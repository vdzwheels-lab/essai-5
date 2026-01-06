import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-16 relative">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2">
                    <h2 className="font-orbitron text-2xl font-bold text-white mb-4">VDZ WHEELS</h2>
                    <p className="font-rajdhani text-gray-500 max-w-sm">
                        Né en soufflerie. Construit à la main. <br />
                        Le futur de la performance cycliste est noir, structuré et incroyablement rapide.
                    </p>
                </div>
                
                <div>
                    <h4 className="font-orbitron text-white font-bold mb-4">NAVIGATION</h4>
                    <ul className="space-y-2 font-rajdhani text-gray-400">
                        <li className="hover:text-red-500 cursor-pointer transition-colors">Roues</li>
                        <li className="hover:text-red-500 cursor-pointer transition-colors">Technologie</li>
                        <li className="hover:text-red-500 cursor-pointer transition-colors">Garantie</li>
                        <li className="hover:text-red-500 cursor-pointer transition-colors">Contact</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-orbitron text-white font-bold mb-4">SOCIAL</h4>
                    <ul className="space-y-2 font-rajdhani text-gray-400">
                        <li className="hover:text-red-500 cursor-pointer transition-colors">Instagram</li>
                        <li className="hover:text-red-500 cursor-pointer transition-colors">Facebook</li>
                        <li className="hover:text-red-500 cursor-pointer transition-colors">Strava</li>
                    </ul>
                </div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="font-rajdhani text-xs text-gray-600">© 2024 VDZ WHEELS. TOUS DROITS RÉSERVÉS.</p>
                <div className="font-rajdhani text-xs text-gray-600 flex gap-4">
                    <span>CONFIDENTIALITÉ</span>
                    <span>CGV</span>
                </div>
            </div>
        </div>
    </footer>
  );
};