import { WheelProduct, Feature } from './types';

export const APP_NAME = "VDZ WHEELS";
export const BRAND_COLOR_RED = "#8b0000";

// Image mise à jour selon la demande utilisateur
export const WHEEL_IMG = "https://vdzwheels.com/vdz-wheels-test/wp-content/uploads/2026/01/45GIF-scaled.gif"; 

export const PRODUCTS: WheelProduct[] = [
  {
    id: "vdz-apogee",
    name: "APOGÉE ULTIMATE",
    depth: "52mm",
    price: "à partir de 2 600 €",
    image: WHEEL_IMG,
    features: ["Fibre T1100", "Rayons Full Carbone 20x20", "Moyeux VDZ", "980g / paire"]
  },
  {
    id: "vdz-45-wave",
    name: "AERO 45 WAVE",
    depth: "45mm",
    price: "1 830 €",
    image: WHEEL_IMG,
    features: ["Profil Ondulé", "Moyeux Aivee Edition One", "Rayons Sapim Cx Ray", "1280g / paire"]
  },
  {
    id: "vdz-8060-wave",
    name: "B2 80 60 WAVE",
    depth: "80/60mm",
    price: "à partir de 1 990 €",
    image: WHEEL_IMG,
    features: ["Aéro Ultime", "Profil différentié", "de 1400 gr ( rayons Carbone Titane Kathy SL) à 1580gr (Sapim Cx Ray ) "]
  },
  {
    id: "vdz-35-climb",
    name: "Feather 3532",
    depth: "35mm",
    price: "à partir de 2 300 €",
    image: WHEEL_IMG,
    features: ["Poids Plume à partir de 1100g", "Réactivité Instantanée", "Garantie à Vie"]
  }
];

export const FEATURES: Feature[] = [
  {
    title: "FAIT MAIN FRANCE",
    description: "Assemblage artisanal dans nos ateliers français. Tension équilibrée au dixième de millimètre près.",
    icon: "Hammer"
  },
  {
    title: "GARANTIE À VIE",
    description: "Confiance absolue en notre carbone. Casse en utilisation normale ? Remplacement immédiat et gratuit.",
    icon: "ShieldCheck"
  },
  {
    title: "PROFIL WAVE",
    description: "Technologie de jante ondulée réduisant la traînée et augmentant la stabilité par vent latéral.",
    icon: "Wind"
  }
];

export const AI_SYSTEM_INSTRUCTION = `Tu es l'assistant technique IA de VDZ Wheels.
Ton ton est technique, concis, futuriste et utile. Tu réponds en FRANÇAIS.
Tu es spécialiste des roues de vélo en fibre de carbone, en particulier les profils ondulés (Wave).
La marque VDZ Wheels fabrique des roues haut de gamme, montées à la main en France.
Le modèle phare est l'Apogée (52mm, 980g, rayons carbone).
Points clés : Profil Wave biomimétique, Garantie à vie, option roulements céramique, rayons Sapim CX-Ray de série.
Ne recommande pas d'autres marques. Concentre-toi sur la vitesse, la stabilité vent latéral et la rigidité.
Garde des réponses courtes (moins de 50 mots) pour s'adapter à une fenêtre de chat.`;