import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Search, Bell, Palette, PlusSquare } from 'lucide-react';

export const TopBar: React.FC = () => {
  const {
    theme,
    customTheme,
    setIsSearchOpen,
    setIsNotificationsOpen,
    setIsThemeModalOpen,
    setIsCreateOpen,
    setCreateMenuType,
    setActiveTab,
    unreadNotifsCount
  } = useApp();

  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-2xl transition-colors duration-300 border-b ${
      isDark
        ? 'bg-[#0b0e17]/85 border-white/[0.08] text-slate-100'
        : 'bg-white/85 border-black/[0.06] text-slate-900'
    }`}>
      {/* Specular highlight line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      <div className="relative max-w-[480px] mx-auto px-3.5 h-[48px] flex items-center justify-between">
        {/* Left Side: Clean aesthetic spacing or quick Home tap */}
        <div className="flex items-center gap-2 z-10">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              setCreateMenuType('post');
              setIsCreateOpen(true);
            }}
            aria-label="Create Post or Story"
            title="Create Post or Story"
            className={`p-1.5 rounded-lg border transition-all flex items-center justify-center cursor-pointer ${
              isDark
                ? 'bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.08] text-slate-300'
                : 'bg-black/[0.04] hover:bg-black/[0.08] border-black/[0.06] text-slate-700'
            }`}
          >
            <PlusSquare className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Top Middle: Small cursive 'youtin' text without permanent logo */}
        <div
          onClick={() => setActiveTab('home')}
          className="absolute left-1/2 -translate-y-1/2 -translate-x-1/2 top-1/2 flex items-center justify-center cursor-pointer select-none group"
        >
          <span
            className="text-[20px] font-normal tracking-wide lowercase select-none group-hover:opacity-80 transition-opacity"
            style={{
              fontFamily: "'Grand Hotel', 'Dancing Script', 'Alex Brush', cursive",
              color: isDark ? '#f8fafc' : '#0f172a',
              letterSpacing: '0.04em'
            }}
          >
            youtin
          </span>
        </div>

        {/* Right Side: Theme, Search, Notifications */}
        <div className="flex items-center gap-1 z-10">
          {/* Custom Theme Studio */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsThemeModalOpen(true)}
            aria-label="Custom Theme Studio"
            title="Custom Theme Studio"
            className={`p-1.5 rounded-lg border transition-all flex items-center justify-center cursor-pointer ${
              isDark
                ? 'bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.08] text-slate-300'
                : 'bg-black/[0.04] hover:bg-black/[0.08] border-black/[0.06] text-slate-700'
            }`}
          >
            <Palette className="w-4 h-4" style={{ color: customTheme.accentColor }} />
          </motion.button>

          {/* Search */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
            className={`p-1.5 rounded-lg border transition-all flex items-center justify-center cursor-pointer ${
              isDark
                ? 'bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.08] text-slate-300'
                : 'bg-black/[0.04] hover:bg-black/[0.08] border-black/[0.06] text-slate-700'
            }`}
          >
            <Search className="w-4 h-4" />
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsNotificationsOpen(true)}
            aria-label="Notifications"
            className={`relative p-1.5 rounded-lg border transition-all flex items-center justify-center cursor-pointer ${
              isDark
                ? 'bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.08] text-slate-300'
                : 'bg-black/[0.04] hover:bg-black/[0.08] border-black/[0.06] text-slate-700'
            }`}
          >
            <Bell className="w-4 h-4" />
            {unreadNotifsCount > 0 && (
              <span
                className="absolute top-1 right-1 w-2 h-2 rounded-full ring-2 ring-[#0b0e17] animate-pulse"
                style={{ backgroundColor: customTheme.accentColor }}
              />
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
};
