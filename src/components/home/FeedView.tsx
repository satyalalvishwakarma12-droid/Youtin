import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { StoriesBar } from './StoriesBar';
import { PostCard } from './PostCard';
import { ShieldCheck, Sparkles } from 'lucide-react';

export const FeedView: React.FC = () => {
  const {
    posts,
    currentUser,
    activeCircleFilter,
    setActiveCircleFilter,
    theme,
    customTheme
  } = useApp();

  const isDark = theme === 'dark';

  // Filter posts based on circle filter
  const filteredPosts = posts.filter(post => {
    if (!activeCircleFilter || activeCircleFilter === 'all') return true;
    if (activeCircleFilter === 'close_friends') {
      return post.audience === 'close_friends';
    }
    if (activeCircleFilter === 'circle_studio') {
      return post.circleName === 'Studio Collective' || post.audience === 'circle';
    }
    return true;
  });

  return (
    <div className="w-full max-w-[480px] mx-auto pb-24 pt-1.5 px-0">
      {/* Stories Bar & Filters - Clean padding for horizontal scrolling */}
      <div className="px-3 mb-1.5">
        <StoriesBar />

        {/* Circles Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1.5 mb-1.5">
          <button
            onClick={() => setActiveCircleFilter('all')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer border ${
              !activeCircleFilter || activeCircleFilter === 'all'
                ? 'border-transparent shadow-sm'
                : isDark
                ? 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-slate-200'
                : 'bg-black/[0.04] border-black/[0.06] text-slate-600 hover:text-slate-900'
            }`}
            style={
              !activeCircleFilter || activeCircleFilter === 'all'
                ? {
                    backgroundColor: `${customTheme.accentColor}25`,
                    borderColor: `${customTheme.accentColor}50`,
                    color: customTheme.accentColor
                  }
                : undefined
            }
          >
            All ({currentUser.connectionsCount})
          </button>

          <button
            onClick={() => setActiveCircleFilter('close_friends')}
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer border ${
              activeCircleFilter === 'close_friends'
                ? 'bg-emerald-500/25 border-emerald-400/60 text-emerald-300 shadow-sm shadow-emerald-500/20'
                : isDark
                ? 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-slate-200'
                : 'bg-black/[0.04] border-black/[0.06] text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
            <span>Close Friends</span>
          </button>

          <button
            onClick={() => setActiveCircleFilter('circle_studio')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer border ${
              activeCircleFilter === 'circle_studio'
                ? 'bg-indigo-500/25 border-indigo-400/60 text-indigo-300 shadow-sm'
                : isDark
                ? 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-slate-200'
                : 'bg-black/[0.04] border-black/[0.06] text-slate-600 hover:text-slate-900'
            }`}
          >
            Studio Collective
          </button>
        </div>

        {/* Privacy Guarantee Pill */}
        <div className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-[11px] backdrop-blur-xl border ${
          isDark
            ? 'bg-white/[0.03] border-white/[0.07] text-slate-300'
            : 'bg-black/[0.02] border-black/[0.05] text-slate-600'
        }`}>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" style={{ color: customTheme.accentColor }} />
            <span>Intentional network feed</span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider opacity-70">Zero Ads</span>
        </div>
      </div>

      {/* Posts Feed - Full Area Cover, Zero Space At Sides, Seamless Flow */}
      {filteredPosts.length === 0 ? (
        <div className={`mx-3 text-center py-12 px-4 rounded-2xl border ${
          isDark ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-black/[0.02] border-black/[0.05]'
        }`}>
          <p className="text-xs font-semibold text-slate-400">No posts in this circle yet.</p>
        </div>
      ) : (
        <div className="w-full">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};
