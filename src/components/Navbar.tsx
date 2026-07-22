import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';
import { Language, Translation } from '../translations';
import { cn } from '../lib/utils';

interface NavbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  t: Translation;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang, t }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
    }
  };

  const navLinks = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.games, href: '#games' },
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.youtube, href: '#youtube' },
    { name: t.nav.about, href: '#about' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-md border-b border-neon-purple/30 py-2" : "bg-transparent py-4"
    )}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-neon-cyan shadow-[0_0_10px_#00f5ff] origin-left"
        style={{ scaleX }}
      />

      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          className="text-2xl font-black text-neon-purple glitch-text tracking-tighter"
          whileHover={{ scale: 1.05 }}
        >
          OMAR DEV
        </motion.a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-sm font-bold hover:text-neon-cyan transition-colors whitespace-nowrap px-2"
              whileHover={{ y: -2 }}
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="p-2 rounded-full hover:bg-neon-purple/20 transition-colors text-neon-cyan"
            title="Toggle Language"
          >
            <Globe size={20} />
            <span className="ml-1 text-xs font-bold">{lang.toUpperCase()}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-neon-purple/20 transition-colors text-neon-purple"
          >
            {isDark ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-neon-cyan"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 border-b border-neon-purple/30 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium hover:text-neon-cyan"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
