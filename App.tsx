import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Showcase } from './components/Showcase';
import { Footer } from './components/Footer';
import { AIChat } from './components/AIChat';

function App() {
  return (
    <div className="min-h-screen bg-carbon text-gray-100 bg-carbon-overlay">
      <Navbar />
      <Hero />
      <Features />
      <Showcase />
      <Footer />
      <AIChat />
    </div>
  );
}

export default App;