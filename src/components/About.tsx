import React from 'react';
import { motion } from 'motion/react';
import { Translation } from '../translations';
import { Gamepad2, Youtube, Code2, Rocket } from 'lucide-react';
import { cn } from '../lib/utils';

interface AboutProps {
  t: Translation;
}

export const About: React.FC<AboutProps> = ({ t }) => {
  const skills = [
    { name: t.about.skillList.godot, level: 90, color: 'bg-neon-cyan' },
    { name: t.about.skillList.gameDesign, level: 85, color: 'bg-neon-purple' },
    { name: t.about.skillList.graphicDesign, level: 75, color: 'bg-neon-pink' },
    { name: t.about.skillList.videoEditing, level: 80, color: 'bg-neon-green' },
  ];

  const stats = [
    { icon: <Gamepad2 className="text-neon-purple" />, label: t.about.stats.games },
    { icon: <Youtube className="text-neon-pink" />, label: t.about.stats.youtube },
    { icon: <Code2 className="text-neon-cyan" />, label: t.about.stats.experience },
    { icon: <Rocket className="text-neon-green" />, label: t.about.stats.age },
  ];

  return (
    <section id="about" className="py-24 bg-background/50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-black mb-12 text-center text-neon-cyan neon-glow-cyan"
        >
          {t.about.title}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Bio & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-gray-300 mb-12 leading-relaxed">
              {t.about.bio}
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 bg-white/5 border border-white/10 rounded-lg flex flex-col items-center text-center group transition-all hover:border-neon-purple/50"
                >
                  <div className="mb-4 transform group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <span className="text-sm font-bold tracking-wider uppercase">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-neon-purple">{t.about.skills}</h3>
            {skills.map((skill, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between text-sm font-bold tracking-widest uppercase">
                  <span className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full animate-pulse", skill.color)} />
                    {skill.name}
                  </span>
                  <span className="text-neon-cyan font-mono">{skill.level}%</span>
                </div>
                <div className="h-4 bg-black/60 rounded-full border border-white/10 relative">
                  {/* Background Track Pattern */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none rounded-full overflow-hidden" 
                       style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
                  
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
                    className={cn(
                      "h-full rounded-full relative",
                      skill.color
                    )}
                  >
                    {/* The main glow along the bar */}
                    <div className={cn(
                      "absolute inset-0 rounded-full blur-sm opacity-60",
                      skill.color
                    )} />
                    
                    {/* The very bright tip from the image */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_15px_#fff] z-10 scale-110" />
                    
                    {/* Outer tip glow */}
                    <div className={cn(
                      "absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full blur-xl opacity-100",
                      skill.color
                    )} />
                  </motion.div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
