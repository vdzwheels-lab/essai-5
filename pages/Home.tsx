import React from 'react';
import { Hero } from '../components/Hero';
// import { Telemetry } from '../components/Telemetry'; // Section désactivée
import { Features } from '../components/Features';
import { Showcase } from '../components/Showcase';
import { Marquee } from '../components/ui/Marquee';
import { Reviews } from '../components/Reviews';
import { StravaClub } from '../components/StravaClub';
import { WorkshopLaser } from '../components/WorkshopLaser';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      
      {/* Nouveau bandeau complexe Atelier / Laser */}
      <WorkshopLaser />

      {/* <Telemetry />  -- Section Masquée pour le moment */}
      
      <div className="bg-black py-2">
         <Marquee text="GARANTIE À VIE // CRASH REPLACEMENT // TENSION MAÎTRISÉE //" direction="right" speed={40} />
      </div>
      <Features />
      <Showcase />
      <Reviews />
      <StravaClub />
    </>
  );
};
