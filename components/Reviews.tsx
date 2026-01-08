import React, { useRef } from 'react';
import { Star, ExternalLink, Quote, ShieldCheck, Activity, ChevronLeft, ChevronRight, BarChart3, MousePointerClick, Zap, ThumbsUp } from 'lucide-react';
import { CarbonButton } from './ui/CarbonButton';

const TROC_VELO_URL = "https://www.troc-velo.com/fr-fr/user/vdzbreak/1c3cbc6f49b09bcf376767fc5277f38f";

const REVIEWS = [
  {
    id: 1,
    user: "Sportif_74",
    model: "AERO 45 WAVE",
    rating: 5,
    date: "12/02/2024",
    text: "Une réactivité bluffante. Le profil Wave stabilise vraiment le vélo dans les descentes de cols venteux. Montage chirurgical, tension parfaite. Vendeur passionné.",
    verified: true,
    tag: "PERFORMANCE"
  },
  {
    id: 2,
    user: "Tri_Iron_Marc",
    model: "80/60 COMBO",
    rating: 5,
    date: "28/01/2024",
    text: "Transaction fluide avec VDZ. Les roues transforment mon vélo de chrono. Le bruit de la roue libre est incroyable. Emballage blindé pour l'envoi.",
    verified: true,
    tag: "AÉRO"
  },
  {
    id: 3,
    user: "Lukas_Climber",
    model: "FEATHER 35",
    rating: 5,
    date: "15/12/2023",
    text: "Poids plume confirmé sur la balance. Excellent contact, des conseils de pro pour le choix des boyaux. Je recommande pour ceux qui cherchent la performance pure.",
    verified: true,
    tag: "MONTAGNE"
  },
  {
    id: 4,
    user: "Veloman_Alsace",
    model: "APOGÉE 52",
    rating: 5,
    date: "05/11/2023",
    text: "J'hésitais avec des grandes marques américaines. Aucun regret. La finition carbone T1100 est juste magnifique au soleil. Le rendement est supérieur à mes anciennes roues à 3000€.",
    verified: true,
    tag: "FINITION"
  },
  {
    id: 5,
    user: "Gravel_X",
    model: "GRAVEL 40",
    rating: 5,
    date: "22/10/2023",
    text: "Montées sur mon 3T Exploro. Elles encaissent tout sans broncher. La rigidité latérale est impressionnante dans les relances boueuses. Service après-vente au top.",
    verified: true,
    tag: "ROBUSTESSE"
  },
  {
    id: 6,
    user: "Julien_R",
    model: "SUR MESURE",
    rating: 5,
    date: "10/09/2023",
    text: "Demande spécifique pour un montage moyeux Chris King. Le résultat est une œuvre d'art. Communication transparente à chaque étape du montage. Merci VDZ.",
    verified: true,
    tag: "SERVICE"
  },
  {
    id: 7,
    user: "Cyclo_Phil",
    model: "AERO 45",
    rating: 5,
    date: "02/09/2023",
    text: "Bluffé par la rigidité. En danseuse ça ne bouge pas d'un millimètre, toute la puissance passe au sol. Le rendement est immédiat.",
    verified: true,
    tag: "RIGIDITÉ"
  },
  {
    id: 8,
    user: "Aero_Dave",
    model: "60mm WAVE",
    rating: 5,
    date: "18/08/2023",
    text: "Gain de 1.5km/h sur mon parcours de référence. La prise au vent est très saine malgré la hauteur de jante. Un must pour le plat.",
    verified: true,
    tag: "VITESSE"
  },
  {
    id: 9,
    user: "Crit_Master",
    model: "55mm TUBE",
    rating: 5,
    date: "30/07/2023",
    text: "Des rails en virage. J'ai tapé quelques nids de poule en course (Critérium), elles n'ont pas bougé. Solidité validée.",
    verified: true,
    tag: "SOLIDITÉ"
  },
  {
    id: 10,
    user: "Randonneuse_Isa",
    model: "35mm LIGHT",
    rating: 5,
    date: "12/07/2023",
    text: "Le confort est surprenant pour du carbone. Filtrage des vibrations excellent sur le bitume granuleux. Je termine mes sorties moins fatiguée.",
    verified: true,
    tag: "CONFORT"
  },
  {
    id: 11,
    user: "Mecano_Pro",
    model: "MONTAGE CARTE",
    rating: 5,
    date: "05/06/2023",
    text: "Tensions vérifiées au tensiomètre à la réception : équilibrage parfait gauche/droite. C'est du travail d'orfèvre, rare de nos jours.",
    verified: true,
    tag: "TECHNIQUE"
  },
  {
    id: 12,
    user: "Sprint_King",
    model: "80mm AR",
    rating: 5,
    date: "22/05/2023",
    text: "Le bruit à 50km/h est effrayant pour les concurrents. Une arme de guerre pour les chronos. Rapport qualité/prix imbattable.",
    verified: true,
    tag: "SONORITÉ"
  },
  {
    id: 13,
    user: "Vintage_Soul",
    model: "STEALTH 45",
    rating: 5,
    date: "10/04/2023",
    text: "Look incroyable sur mon cadre titane. La finition matte est très classe, pas tape-à-l'œil. Les marquages noirs sont subtils.",
    verified: true,
    tag: "ESTHÉTIQUE"
  }
];

export const Reviews: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = direction === 'left' ? -container.offsetWidth / 1.5 : container.offsetWidth / 1.5;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden border-t border-white/5">
      {/* Custom Styles for this component */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes scan-down {
            0% { top: -20%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 120%; opacity: 0; }
        }
      `}</style>

      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-900/30 to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-4 h-4 text-green-500 animate-pulse" />
                    <span className="text-xs font-orbitron text-gray-500 tracking-widest">TRANSMISSIONS REÇUES // SOURCE: TROC-VÉLO</span>
                </div>
                <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                    FEEDBACK <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">PILOTES</span>
                </h2>
            </div>
            
            <div className="mt-6 md:mt-0 flex flex-col items-end gap-2">
                <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-700 px-3 py-1 rounded-full">
                    <span className="text-xs font-rajdhani text-white">Score Fiabilité</span>
                    <div className="w-[1px] h-3 bg-zinc-700 mx-2"></div>
                    <span className="text-sm font-bold font-orbitron text-green-400">100%</span>
                </div>
                <p className="font-rajdhani text-gray-500 text-xs text-right max-w-xs">
                    Données certifiées basées sur les transactions réelles
                </p>
            </div>
        </div>

        {/* CAROUSEL WRAPPER */}
        <div className="relative group/carousel">
            
            {/* Gradient Fade Masks on Sides */}
            <div className="absolute left-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>

            {/* Floating Navigation Controls */}
            <button 
                onClick={() => scroll('left')}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-black/50 backdrop-blur border border-zinc-700 rounded-full flex items-center justify-center text-white hover:bg-red-900 hover:border-red-500 transition-all duration-300 shadow-xl opacity-0 group-hover/carousel:opacity-100 -translate-x-4 group-hover/carousel:translate-x-0"
                aria-label="Previous"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
                onClick={() => scroll('right')}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-black/50 backdrop-blur border border-zinc-700 rounded-full flex items-center justify-center text-white hover:bg-red-900 hover:border-red-500 transition-all duration-300 shadow-xl opacity-0 group-hover/carousel:opacity-100 translate-x-4 group-hover/carousel:translate-x-0"
                aria-label="Next"
            >
                <ChevronRight className="w-5 h-5" />
            </button>

            {/* SCROLL CONTAINER (Native Snap) */}
            <div 
                ref={scrollRef} 
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-16 pt-12 px-4 md:px-0 scrollbar-hide"
                style={{ scrollPaddingLeft: '2rem', scrollPaddingRight: '2rem' }}
            >
                {REVIEWS.map((review) => (
                    <a 
                        key={review.id}
                        href={TROC_VELO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative min-w-[320px] md:min-w-[420px] snap-center group/card cursor-pointer outline-none"
                    >
                        {/* CARD CONTENT with Enhanced 3D Hover Relief */}
                        <div className="h-full bg-zinc-900/30 backdrop-blur-md border border-white/10 rounded-2xl p-8 
                                        transition-all duration-300 ease-out 
                                        group-hover/card:bg-zinc-900 
                                        group-hover/card:border-red-500/80 
                                        group-hover/card:shadow-[0_25px_60px_-15px_rgba(220,38,38,0.5)] 
                                        group-hover/card:-translate-y-4 
                                        group-hover/card:scale-[1.03]
                                        relative overflow-hidden flex flex-col transform-gpu z-0 group-hover/card:z-10">
                            
                            {/* Scanning Laser Effect */}
                            <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_rgba(220,38,38,0.8)] opacity-0 group-hover/card:animate-[scan-down_1.5s_ease-in-out_infinite] z-10 pointer-events-none"></div>

                            {/* Top Row: User & Badge */}
                            <div className="flex justify-between items-start mb-6 z-20">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-800 to-black border border-white/10 flex items-center justify-center text-red-500 font-bold font-orbitron text-lg shadow-inner group-hover/card:border-red-500/50 transition-colors">
                                        {review.user.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-orbitron text-white font-bold tracking-wide text-sm group-hover/card:text-red-500 transition-colors">{review.user}</h4>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-mono text-gray-500">{review.date}</span>
                                            {review.verified && (
                                                <div className="flex items-center gap-1 bg-green-900/10 border border-green-900/30 px-1.5 py-0.5 rounded-sm">
                                                    <ShieldCheck className="w-2.5 h-2.5 text-green-500" />
                                                    <span className="text-[9px] font-orbitron text-green-500 uppercase tracking-wider">Vérifié</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-zinc-950 border border-zinc-800 px-3 py-1 rounded text-[10px] font-orbitron text-gray-300 tracking-widest uppercase group-hover/card:border-red-500 group-hover/card:bg-red-950/30 group-hover/card:text-white transition-all">
                                    {review.tag}
                                </div>
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-4 z-20">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-red-600 fill-red-600 drop-shadow-[0_0_2px_rgba(220,38,38,0.5)]" />
                                ))}
                            </div>

                            {/* Text Content */}
                            <div className="relative z-20 flex-grow">
                                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-white/5 transform -scale-x-100 group-hover/card:text-red-500/10 transition-colors" />
                                <p className="font-rajdhani text-gray-300 text-lg leading-relaxed pl-2 relative z-10 group-hover/card:text-white transition-colors">
                                    "{review.text}"
                                </p>
                            </div>

                            {/* Footer Product Info */}
                            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center z-20 group-hover/card:border-red-900/30 transition-colors">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-500 font-mono uppercase">Produit</span>
                                    <span className="text-sm font-orbitron text-white">{review.model}</span>
                                </div>
                                <div className="opacity-0 group-hover/card:opacity-100 transition-all duration-300 -translate-x-2 group-hover/card:translate-x-0">
                                    <div className="flex items-center gap-2 text-xs text-red-500 font-bold font-orbitron bg-red-950/30 px-3 py-1 rounded-full border border-red-900/50">
                                        OUVRIR <ExternalLink className="w-3 h-3" />
                                    </div>
                                </div>
                            </div>

                            {/* Hover "Click to view" overlay hint (Subtle) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 pointer-events-none transition-opacity duration-300 z-10"></div>
                        </div>
                    </a>
                ))}
            </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col items-center justify-center">
            <a href={TROC_VELO_URL} target="_blank" rel="noopener noreferrer" className="group">
                <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-rajdhani text-sm bg-zinc-900/50 px-6 py-2 rounded-full border border-zinc-800 hover:border-red-600 hover:bg-zinc-800">
                    <ThumbsUp className="w-4 h-4 text-red-600" />
                    <span>Voir plus de 50 avis certifiés sur Troc-Vélo</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
            </a>
        </div>

      </div>
    </section>
  );
};