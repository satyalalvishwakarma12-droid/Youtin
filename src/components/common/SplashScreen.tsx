import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const SplashScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show splash screen briefly when app opens
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          onClick={() => setIsVisible(false)}
          className="fixed inset-0 z-[999] bg-[#07090e] flex flex-col items-center justify-center select-none cursor-pointer overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute w-96 h-96 rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />
          <div className="absolute w-80 h-80 rounded-full bg-purple-500/10 blur-[130px] pointer-events-none" />

          {/* Logo Animation */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center"
          >
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-4 flex items-center justify-center">
              {/* Soft luminous halo */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400/20 to-purple-400/20 blur-xl animate-pulse" />
              
              <img
                src="/youtin-logo.jpg"
                alt="youtin"
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_10px_25px_rgba(100,150,255,0.25)]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Cursive Brand Signature */}
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-2xl text-slate-100 tracking-wide font-normal lowercase"
              style={{
                fontFamily: "'Grand Hotel', 'Dancing Script', 'Alex Brush', cursive",
                letterSpacing: '0.04em'
              }}
            >
              youtin
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-[11px] text-slate-400 tracking-wider uppercase mt-1"
            >
              intentional network
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
