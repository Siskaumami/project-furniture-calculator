import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import ProjectCalculator from '@/pages/ProjectCalculator';
import Contact from '@/pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Helmet>
          <title>Furniture Calculator - Pemotong Kayu 2D Professional</title>
          <meta name="description" content="Kalkulator pemotong kayu profesional untuk bisnis furniture. Hitung potongan kayu dengan visualisasi 2D, optimasi material, dan export PDF. Tools pemotong terbaik untuk woodworking." />
          <meta name="keywords" content="pemotong, pemotong 2D, kalkulator kayu, furniture calculator, woodworking tools, optimasi material, cutting calculator" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta property="og:title" content="Furniture Calculator - Pemotong Kayu 2D Professional" />
          <meta property="og:description" content="Tools pemotong kayu terbaik dengan visualisasi 2D dan optimasi material untuk bisnis furniture Anda." />
          <meta property="og:type" content="website" />
        </Helmet>
        
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project" element={<ProjectCalculator />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        <Toaster />
      </div>
    </Router>
  );
}

export default App;