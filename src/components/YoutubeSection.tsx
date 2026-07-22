import React, { useState, useEffect, useRef } from 'react';
import { motion, animate, useInView, AnimatePresence } from 'motion/react';
import { Translation } from '../translations';
import { Youtube, Eye, Video, ExternalLink, Play } from 'lucide-react';

interface YoutubeStats {
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
}

interface YoutubeVideo {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      high: { url: string };
    };
    publishedAt: string;
  };
  statistics: {
    viewCount: string;
  };
  contentDetails: {
    duration: string;
  };
}

interface YoutubeSectionProps {
  t: Translation;
}

const Counter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (isInView) {
      const startValue = hasStarted.current ? displayValue : 0;
      const controls = animate(startValue, value, {
        duration: hasStarted.current ? 0.5 : duration,
        onUpdate(v) {
          setDisplayValue(Math.floor(v));
        },
      });
      hasStarted.current = true;
      return () => controls.stop();
    }
  }, [value, duration, isInView]);

  return <span ref={nodeRef}>{displayValue.toLocaleString()}</span>;
};

export const YoutubeSection: React.FC<YoutubeSectionProps> = ({ t }) => {
  const [stats, setStats] = useState<YoutubeStats | null>(null);
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/youtube/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching YouTube stats:', error);
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/youtube/videos');
      const data = await response.json();
      // Filter out videos shorter than 60 seconds (likely Shorts)
      const filteredVideos = data.filter((video: YoutubeVideo) => {
        const duration = video.contentDetails.duration;
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        if (!match) return false;
        const hours = parseInt((match[1] || '0').replace('H', '')) || 0;
        const minutes = parseInt((match[2] || '0').replace('M', '')) || 0;
        const seconds = parseInt((match[3] || '0').replace('S', '')) || 0;
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        return totalSeconds >= 60;
      });
      setVideos(filteredVideos.slice(0, 6));
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchVideos();
    setLoading(false);

    // Update subscriber count every second as requested
    const interval = setInterval(fetchStats, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDuration = (pt: string) => {
    const match = pt.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '';
    const hours = (match[1] || '').replace('H', '');
    const minutes = (match[2] || '').replace('M', '');
    const seconds = (match[3] || '').replace('S', '');
    
    let result = '';
    if (hours) result += `${hours}:`;
    result += `${minutes.padStart(2, '0') || '0'}:`;
    result += seconds.padStart(2, '0') || '00';
    return result;
  };

  return (
    <section id="youtube" className="py-24 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-pink/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-pink/10 border border-neon-pink/20 text-neon-pink text-sm font-bold mb-6"
          >
            <Youtube size={16} />
            YOUTUBE CHANNEL
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">
            {t.youtube.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t.youtube.description}
          </p>
        </div>

        {/* Live Subscriber Counter */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative bg-white/5 border border-white/10 rounded-3xl p-12 text-center overflow-hidden group"
          >
            <div className="relative z-10">
              <motion.div
                className="text-7xl md:text-9xl font-black text-neon-pink mb-2 tracking-tighter neon-glow-pink"
              >
                {stats ? (
                  <Counter value={parseInt(stats.subscriberCount)} />
                ) : (
                  "---"
                )}
              </motion.div>
              <div className="text-xl font-bold text-gray-400 tracking-widest uppercase">
                {t.youtube.subscribers}
              </div>
            </div>

            {/* Sub-stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                  <Eye size={24} />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black">
                    {stats ? parseInt(stats.viewCount).toLocaleString() : "---"}
                  </div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">{t.youtube.totalViews}</div>
                </div>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/5 flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                  <Video size={24} />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-black">
                    {stats ? parseInt(stats.videoCount).toLocaleString() : "---"}
                  </div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">{t.youtube.totalVideos}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Latest Videos Grid */}
        <div className="mb-12 flex items-center justify-between">
          <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
            <div className="w-8 h-1 bg-neon-pink rounded-full" />
            LATEST VIDEOS
          </h3>
          <div className="text-sm text-gray-500 font-bold uppercase tracking-widest hidden md:block">
            Showing long-form content
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group block bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-neon-pink/50 transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-neon-pink flex items-center justify-center text-white shadow-[0_0_20px_#ff2d78]">
                    <Play size={32} fill="currentColor" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs font-bold rounded">
                  {formatDuration(video.contentDetails.duration)}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-4 line-clamp-2 group-hover:text-neon-pink transition-colors">
                  {video.snippet.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    {parseInt(video.statistics.viewCount).toLocaleString()} {t.youtube.views}
                  </div>
                  <ExternalLink size={14} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-16 text-center">
          <motion.a
            href="https://www.youtube.com/@omar_develop"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-neon-pink text-white font-black rounded-full shadow-[0_0_20px_rgba(255,45,120,0.4)]"
          >
            <Youtube size={24} />
            {t.youtube.subscribe}
          </motion.a>
        </div>
      </div>
    </section>
  );
};
