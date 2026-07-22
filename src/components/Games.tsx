import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Translation } from '../translations';
import { ExternalLink } from 'lucide-react';

interface ItchGame {
  id: number;
  title: string;
  cover_url: string;
  url: string;
  published?: boolean;
  classification?: string;
}

interface GamesProps {
  t: Translation;
}

export const Games: React.FC<GamesProps> = ({ t }) => {
  const [games, setGames] = useState<ItchGame[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('/api/get-games');
        const data = await response.json();
        if (data.games) {
          setGames(data.games);
        }
      } catch (error) {
        console.error("Failed to fetch games:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const getSecureImageUrl = (game: ItchGame) => {
    const url = game.cover_url || (game as any).still_cover_url || '';
    if (!url) return 'https://picsum.photos/seed/game/400/300';
    return url.replace(/^http:/i, 'https:');
  };

  return (
    <section id="games" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-black mb-12 text-center text-neon-purple neon-glow-purple"
        >
          {t.games.title}
        </motion.h2>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-neon-purple border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#b44fff]" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game, i) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-neon-cyan/50 transition-all"
              >
                <a href={game.url} target="_blank" rel="noopener noreferrer" className="block aspect-video relative overflow-hidden">
                  <img
                    src={getSecureImageUrl(game)}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                </a>
                
                <div className="p-6">
                  <a href={game.url} target="_blank" rel="noopener noreferrer">
                    <h3 className="text-xl font-bold mb-4 group-hover:text-neon-cyan transition-colors line-clamp-1">{game.title}</h3>
                  </a>
                  
                  <div className="flex flex-col gap-3">
                    <motion.a
                      href={game.url}
                      target="_blank"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 w-full py-3 bg-neon-cyan/20 border border-neon-cyan text-neon-cyan font-bold rounded-lg hover:bg-neon-cyan hover:text-background transition-all"
                    >
                      {t.games.playNow} <ExternalLink size={16} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
