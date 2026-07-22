/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Language, translations } from './translations';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Games } from './components/Games';
import { Projects } from './components/Projects';
import { YoutubeSection } from './components/YoutubeSection';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { MatrixBackground } from './components/MatrixBackground';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="relative min-h-screen selection:bg-neon-cyan selection:text-background">
      <LoadingScreen />
      <MatrixBackground />
      
      {/* Scanlines effect overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 scanlines opacity-20" />

      <Navbar lang={lang} setLang={setLang} t={t} />
      
      <main>
        <Hero t={t} />
        <About t={t} />
        <Games t={t} />
        <Projects t={t} />
        <YoutubeSection t={t} />
      </main>

      <Footer t={t} />
    </div>
  );
}
