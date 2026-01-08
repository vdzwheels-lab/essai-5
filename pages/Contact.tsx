import React, { useState } from 'react';
import { Send, MapPin, Mail, Phone, Globe, Terminal, Crosshair, Target } from 'lucide-react';
import { CarbonButton } from '../components/ui/CarbonButton';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    // Simulation d'envoi
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 2000);
  };

  return (
    <div className="relative min-h-screen pt-24 pb-12 overflow-hidden flex items-center justify-center">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          className="w-full h-full object-cover opacity-20 filter grayscale contrast-125"
          src="https://cdn.pixabay.com/video/2023/10/15/185090-874637699_large.mp4" 
        />
        {/* Overlay Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8))] z-10"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-30 z-10"></div>
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Info Hub & Map */}
          <div className="space-y-8">
            <div className="border-l-4 border-red-600 pl-6">
              <h1 className="font-orbitron text-5xl font-black text-white mb-2 tracking-tighter">
                SIGNAL <span className="text-red-600 animate-pulse">LIVE</span>
              </h1>
              <p className="font-rajdhani text-xl text-gray-400">
                Canal de communication crypté.<br/>
                Nos ingénieurs sont en veille.
              </p>
            </div>

            <div className="space-y-6 font-rajdhani">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-zinc-900 border border-white/10 flex items-center justify-center rounded group-hover:border-red-500 transition-colors">
                  <MapPin className="text-white group-hover:text-red-500" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Base Opérationnelle</h3>
                  <p className="text-white text-lg">74000 Annecy, France</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-zinc-900 border border-white/10 flex items-center justify-center rounded group-hover:border-red-500 transition-colors">
                  <Mail className="text-white group-hover:text-red-500" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Uplink</h3>
                  <p className="text-white text-lg">contact@vdzwheels.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-zinc-900 border border-white/10 flex items-center justify-center rounded group-hover:border-red-500 transition-colors">
                  <Phone className="text-white group-hover:text-red-500" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Urgence Technique</h3>
                  <p className="text-white text-lg">+33 4 50 00 00 00</p>
                </div>
              </div>
            </div>

            {/* TACTICAL MAP MODULE */}
            <div className="relative w-full h-64 border border-zinc-700 bg-black overflow-hidden group">
               {/* The Map iframe with CSS Filters for Dark Mode Look */}
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44437.49336787686!2d6.08472254098939!3d45.89923469006935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478b8ffa1c055555%3A0x408ab2ae4be7950!2sAnnecy!5e0!3m2!1sen!2sfr!4v1709221234567!5m2!1sen!2sfr" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(120%) brightness(80%)' }} 
                 allowFullScreen={false} 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 className="opacity-60 group-hover:opacity-100 transition-opacity duration-500"
               ></iframe>

               {/* Tactical Overlay */}
               <div className="absolute inset-0 pointer-events-none z-10">
                  {/* Corners */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-red-600"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-red-600"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-red-600"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-red-600"></div>
                  
                  {/* Crosshair Center */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50">
                     <Target className="w-12 h-12 text-red-500 animate-[spin_10s_linear_infinite]" strokeWidth={0.5} />
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                     <div className="w-1 h-1 bg-red-600 rounded-full animate-ping"></div>
                  </div>

                  {/* Data Text */}
                  <div className="absolute bottom-2 left-4 text-[9px] font-mono text-red-500 bg-black/80 px-1">
                     SAT_LINK: ESTABLISHED
                  </div>
                  <div className="absolute top-2 right-4 text-[9px] font-mono text-red-500 bg-black/80 px-1">
                     TARGET: ANNECY_HQ
                  </div>
                  
                  {/* Grid Lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(220,38,38,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>
               </div>
            </div>

          </div>

          {/* Right Column: The Form Terminal */}
          <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-8 rounded-lg shadow-[0_0_50px_rgba(139,0,0,0.2)] relative overflow-hidden">
            {/* Scanning line animation */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-[scan_3s_ease-in-out_infinite] opacity-50 pointer-events-none"></div>

            <div className="flex items-center gap-2 mb-8 border-b border-white/10 pb-4">
              <Terminal className="text-red-500 w-5 h-5" />
              <span className="font-orbitron text-sm tracking-widest text-white">INTERFACE DE SAISIE</span>
            </div>

            {isSent ? (
              <div className="h-80 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 rounded-full bg-green-900/20 border border-green-500 flex items-center justify-center">
                  <Send className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-orbitron text-white">TRANSMISSION REÇUE</h3>
                <p className="font-rajdhani text-gray-400">Nos techniciens analysent votre requête.<br/>Réponse estimée: &lt; 24h.</p>
                <button onClick={() => setIsSent(false)} className="text-xs text-red-500 underline mt-4 hover:text-white transition-colors">NOUVELLE TRANSMISSION</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="group">
                  <label className="block text-[10px] font-orbitron text-gray-500 uppercase tracking-widest mb-2 group-focus-within:text-red-500 transition-colors">Identifiant (Nom)</label>
                  <input 
                    type="text" 
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    className="w-full bg-zinc-900/50 border-b border-zinc-700 p-3 text-white font-rajdhani focus:outline-none focus:border-red-500 focus:bg-zinc-900 transition-all placeholder-zinc-700"
                    placeholder="EX: JOHN DOE"
                  />
                </div>

                <div className="group">
                  <label className="block text-[10px] font-orbitron text-gray-500 uppercase tracking-widest mb-2 group-focus-within:text-red-500 transition-colors">Fréquence de retour (Email)</label>
                  <input 
                    type="email" 
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    className="w-full bg-zinc-900/50 border-b border-zinc-700 p-3 text-white font-rajdhani focus:outline-none focus:border-red-500 focus:bg-zinc-900 transition-all placeholder-zinc-700"
                    placeholder="EX: PILOTE@GMAIL.COM"
                  />
                </div>

                <div className="group">
                  <label className="block text-[10px] font-orbitron text-gray-500 uppercase tracking-widest mb-2 group-focus-within:text-red-500 transition-colors">Données (Message)</label>
                  <textarea 
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    className="w-full bg-zinc-900/50 border-b border-zinc-700 p-3 text-white font-rajdhani focus:outline-none focus:border-red-500 focus:bg-zinc-900 transition-all placeholder-zinc-700 resize-none"
                    placeholder="VOTRE CONFIGURATION OU QUESTION..."
                  />
                </div>

                <div className="pt-4">
                  <CarbonButton type="submit" disabled={isSending} className="w-full flex justify-center">
                    {isSending ? 'CRYPTAGE EN COURS...' : 'INITIALISER TRANSMISSION'}
                  </CarbonButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};