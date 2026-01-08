import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AIChat } from './components/AIChat';
import { TacticalCursor } from './components/ui/TacticalCursor';
import { BackgroundFX } from './components/ui/BackgroundFX';
import { Home } from './pages/Home';
import { Technology } from './pages/Technology';
import { CustomBuilder } from './pages/CustomBuilder';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';

// Placeholder pour les pages non créées
const NotFound = () => <div className="h-screen flex items-center justify-center font-orbitron text-white text-xl">PAGE EN CONSTRUCTION</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-carbon text-gray-100 bg-carbon-overlay flex flex-col cursor-none relative">
        <BackgroundFX />
        <TacticalCursor />
        <Navbar />
        
        <main className="flex-grow relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/technologie" element={<Technology />} />
              <Route path="/sur-mesure" element={<CustomBuilder />} />
              <Route path="/galerie" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/offres" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
        </main>

        <Footer />
        <AIChat />
      </div>
    </Router>
  );
}

export default App;