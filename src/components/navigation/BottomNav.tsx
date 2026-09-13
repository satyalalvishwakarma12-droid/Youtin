import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Home, PlaySquare, MessageCircle } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    theme,
    customTheme,
    chats,
    currentUser
  } = useApp();
  const isDark = theme === 'dark';

  const unreadChatCount = chats.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  return (
    <nav className="fixed bottom-3 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <div
        className={`pointer-events-auto relative flex items-center justify-around w-full max-w-[380px] h-[52px] px-3 rounded-full backdrop-blur-3xl shadow-2xl transition-all duration-300 border ${
          isDark
            ? 'bg-[#0f1422]/80 border-white/[0.14] shadow-black/80'
            : 'bg-white/85 border-black/[0.08] shadow-slate-300/60'
        }`}
        style={{
          boxShadow: `0 14px 34px -10px ${customTheme.accentColor}25, inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)`
        }}
      >
        {/* Specular line on top rim */}
        <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

        {/* 1. Home Icon (No name) */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setActiveTab('home')}
          aria-label="Home"
          className="relative p-2.5 rounded-full flex flex-col items-center justify-center cursor-pointer select-none"
        >
          <Home
            className={`w-[22px] h-[22px] transition-all duration-200 ${
              activeTab === 'home'
                ? isDark
                  ? 'stroke-[2.5]'
                  : 'stroke-[2.5]'
                : isDark
                ? 'text-slate-400 hover:text-slate-200 stroke-[1.75]'
                : 'text-slate-500 hover:text-slate-900 stroke-[1.75]'
            }`}
            style={{ color: activeTab === 'home' ? customTheme.accentColor : undefined }}
          />
          {activeTab === 'home' && (
            <motion.div
              layoutId="navDot"
              className="absolute -bottom-0.5 w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: customTheme.accentColor }}
            />
          )}
        </motion.button>

        {/* 2. Mini Reel Icon (No name) */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setActiveTab('mini')}
          aria-label="Mini Reels"
          className="relative p-2.5 rounded-full flex flex-col items-center justify-center cursor-pointer select-none"
        >
          <PlaySquare
            className={`w-[22px] h-[22px] transition-all duration-200 ${
              activeTab === 'mini'
                ? 'stroke-[2.5]'
                : isDark
                ? 'text-slate-400 hover:text-slate-200 stroke-[1.75]'
                : 'text-slate-500 hover:text-slate-900 stroke-[1.75]'
            }`}
            style={{ color: activeTab === 'mini' ? customTheme.accentColor : undefined }}
          />
          {activeTab === 'mini' && (
            <motion.div
              layoutId="navDot"
              className="absolute -bottom-0.5 w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: customTheme.accentColor }}
            />
          )}
        </motion.button>

        {/* 3. Chat Icon (No name) */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setActiveTab('chat')}
          aria-label="Chat and Channels"
          className="relative p-2.5 rounded-full flex flex-col items-center justify-center cursor-pointer select-none"
        >
          <div className="relative">
            <MessageCircle
              className={`w-[22px] h-[22px] transition-all duration-200 ${
                activeTab === 'chat'
                  ? 'stroke-[2.5]'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200 stroke-[1.75]'
                  : 'text-slate-500 hover:text-slate-900 stroke-[1.75]'
              }`}
              style={{ color: activeTab === 'chat' ? customTheme.accentColor : undefined }}
            />
            {unreadChatCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 border border-[#0f1422] shadow" />
            )}
          </div>
          {activeTab === 'chat' && (
            <motion.div
              layoutId="navDot"
              className="absolute -bottom-0.5 w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: customTheme.accentColor }}
            />
          )}
        </motion.button>

        {/* 5. Profile Icon (No name - avatar with Instagram-style active border) */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setActiveTab('profile')}
          aria-label="Profile"
          className="relative p-2 rounded-full flex flex-col items-center justify-center cursor-pointer select-none"
        >
          <div
            className={`w-[25px] h-[25px] rounded-full p-[1.5px] transition-all ${
              activeTab === 'profile' ? 'ring-2 ring-offset-1' : 'opacity-80 hover:opacity-100'
            }`}
            style={{
              borderColor: activeTab === 'profile' ? customTheme.accentColor : 'transparent',
              boxShadow: activeTab === 'profile' ? `0 0 10px ${customTheme.accentColor}60` : undefined
            }}
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.displayName}
              className="w-full h-full rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          {activeTab === 'profile' && (
            <motion.div
              layoutId="navDot"
              className="absolute -bottom-0.5 w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: customTheme.accentColor }}
            />
          )}
        </motion.button>
      </div>
    </nav>
  );
};
