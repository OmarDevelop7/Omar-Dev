import React from 'react';
import { Translation } from '../translations';
import { MessageSquare, Youtube, CreditCard, Gamepad2, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  t: Translation;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  const socials = [
    { icon: <MessageSquare size={20} />, href: "https://discord.gg/jXtptxCAwg", color: "hover:text-neon-cyan hover:border-neon-cyan" },
    { icon: <Youtube size={20} />, href: "https://www.youtube.com/@omar_develop", color: "hover:text-neon-pink hover:border-neon-pink" },
    { icon: <Gamepad2 size={20} />, href: "https://omardeveloper.itch.io/", color: "hover:text-neon-purple hover:border-neon-purple" },
    { icon: <CreditCard size={20} />, href: "https://www.paypal.com/paypalme/Bendari721", color: "hover:text-neon-green hover:border-neon-green" },
  ];

  return (
    <footer className="py-12 border-t border-white/10 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-xl font-black text-neon-purple glitch-text mb-8">OMAR DEV</h2>
        
        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-10">
          {socials.map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              whileHover={{ y: -5, scale: 1.1 }}
              className={`p-3 border border-white/10 rounded-lg text-gray-400 transition-all ${social.color} bg-white/5 shadow-lg`}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>

        <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
          {t.footer.madeWith.replace('❤️', '')} <Heart size={14} className="text-neon-pink animate-pulse" />
        </p>
        <div className="mt-8 flex justify-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-600">
          <a href="#home" className="hover:text-neon-cyan transition-colors">Home</a>
          <a href="#games" className="hover:text-neon-cyan transition-colors">Games</a>
          <a href="#youtube" className="hover:text-neon-cyan transition-colors">YouTube</a>
        </div>
        <p className="mt-8 text-[10px] text-gray-700 uppercase tracking-[0.3em]">
          &copy; {new Date().getFullYear()} Omar Developer. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
