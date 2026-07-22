import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Translation } from '../translations';
import { User } from 'lucide-react';
import gsap from 'gsap';

interface HeroProps {
  t: Translation;
}

export const Hero: React.FC<HeroProps> = ({ t }) => {
  const mascotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mascotRef.current) {
      gsap.to(mascotRef.current, {
        y: 20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#b44fff_1px,transparent_1px),linear-gradient(to_bottom,#b44fff_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-black mb-4 leading-tight flex items-center gap-4 flex-wrap"
          >
            <span className="text-white">{t.hero.greeting}</span>
            <User className="text-neon-cyan w-12 h-12 md:w-16 md:h-16 neon-glow-cyan" />
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-neon-cyan mb-8 font-mono"
          >
            {t.hero.subtitle}
          </motion.p>

          <div className="flex flex-wrap gap-4">
            <motion.a
              href="#games"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px #b44fff" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-neon-purple text-white font-bold rounded-sm border-2 border-neon-purple hover:bg-transparent transition-all"
            >
              {t.hero.ctaGames}
            </motion.a>
            <motion.a
              href="https://www.youtube.com/@omar_develop"
              target="_blank"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px #ff2d78" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-neon-pink text-neon-pink font-bold rounded-sm hover:bg-neon-pink hover:text-white transition-all"
            >
              {t.hero.ctaYoutube}
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          ref={mascotRef}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-96 md:h-96">
            {/* Mascot Placeholder - Using a stylized robot icon/shape */}
            <div className="absolute inset-0 bg-neon-purple/20 rounded-full blur-3xl animate-pulse" />
            <div className="relative w-full h-full flex items-center justify-center">
               <svg viewBox="0 0 200 200" className="w-full h-full text-neon-cyan drop-shadow-[0_0_15px_#00f5ff]">
                  <rect x="60" y="40" width="80" height="70" fill="none" stroke="currentColor" strokeWidth="4" rx="10" />
                  <rect x="75" y="55" width="20" height="15" fill="currentColor" rx="2" />
                  <rect x="105" y="55" width="20" height="15" fill="currentColor" rx="2" />
                  <path d="M80 90 Q100 105 120 90" stroke="currentColor" strokeWidth="4" fill="none" />
                  <rect x="85" y="110" width="30" height="40" fill="none" stroke="currentColor" strokeWidth="4" />
                  <line x1="60" y1="120" x2="40" y2="140" stroke="currentColor" strokeWidth="4" />
                  <line x1="140" y1="120" x2="160" y2="140" stroke="currentColor" strokeWidth="4" />
                  <line x1="80" y1="150" x2="70" y2="180" stroke="currentColor" strokeWidth="4" />
                  <line x1="120" y1="150" x2="130" y2="180" stroke="currentColor" strokeWidth="4" />
                  <circle cx="100" cy="30" r="5" fill="currentColor" />
                  <line x1="100" y1="30" x2="100" y2="40" stroke="currentColor" strokeWidth="2" />
               </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
