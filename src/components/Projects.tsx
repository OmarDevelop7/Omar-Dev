import React from 'react';
import { motion } from 'motion/react';
import { Translation } from '../translations';
import { ExternalLink } from 'lucide-react';

interface ProjectsProps {
  t: Translation;
}

export const Projects: React.FC<ProjectsProps> = ({ t }) => {
  return (
    <section id="projects" className="py-24 bg-background/30 relative">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-black mb-12 text-center text-neon-green neon-glow-green"
        >
          {t.projects.title}
        </motion.h2>

        <div className={`grid gap-8 mx-auto ${
          t.projects.items.length === 1 
            ? 'max-w-md grid-cols-1' 
            : 'sm:grid-cols-2 lg:grid-cols-3 max-w-7xl'
        }`}>
          {t.projects.items.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10 }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-neon-green/50 transition-all shadow-2xl"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={project.image || 'https://picsum.photos/seed/default-project/800/450'}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-neon-green transition-colors">{project.title}</h3>
                <p className="text-base text-gray-400 mb-8 leading-relaxed">{project.desc}</p>
                
                <motion.a
                  href={project.url}
                  target="_blank"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-neon-green/20 border border-neon-green text-neon-green font-bold rounded-lg hover:bg-neon-green hover:text-background transition-all"
                >
                  {t.projects.visit} <ExternalLink size={20} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
