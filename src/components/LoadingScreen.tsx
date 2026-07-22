import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const LoadingScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0, 1, 0.5, 1],
                scale: 1,
                textShadow: [
                  "0 0 5px #b44fff",
                  "0 0 20px #b44fff",
                  "0 0 5px #b44fff"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl md:text-6xl font-black text-neon-purple glitch-text"
            >
              OMAR DEV
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-1 bg-neon-cyan mt-4 shadow-[0_0_10px_#00f5ff]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
