import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { CreatorStudioModal } from '../creator/CreatorStudioModal';
import {
  Shield,
  Sparkles,
  QrCode,
  Settings,
  Grid,
  PlaySquare,
  Bookmark,
  Video,
  ExternalLink,
  Layers,
  BarChart2,
  Palette
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    currentUser,
    posts,
    miniVideos,
    longVideos,
    setIsPrivacyCenterOpen,
    setIsSettingsOpen,
    setIsQrModalOpen,
    setIsThemeModalOpen,
    setActiveLongVideo,
    theme,
    customTheme,
    showToast
  } = useApp();

  const isDark = theme === 'dark';
  const isCreator = currentUser.accountType === 'creator';
  const [activeTab, setActiveTab] = useState<'posts' | 'mini' | 'videos' | 'saved' | 'circles'>('posts');
  const [isCreatorStudioOpen, setIsCreatorStudioOpen] = useState(false);

  const userPosts = posts.filter(p => p.authorId === currentUser.id);
  const savedPosts = posts.filter(p => p.isSaved);

  return (
    <div className="w-full max-w-[480px] mx-auto px-3.5 pb-24 pt-2">
      {/* Profile Header (Instagram style) */}
      <div className={`p-4 rounded-2xl mb-3 backdrop-blur-2xl border transition-all ${
        isDark ? 'bg-[#0f1422]/75 border-white/[0.09]' : 'bg-white/85 border-black/[0.08]'
      }`}
      style={{
        boxShadow: `0 8px 24px -10px ${customTheme.accentColor}15, inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)`
      }}>
        {/* Top Row: Avatar + Stats Columns */}
        <div className="flex items-center gap-4 sm:gap-6 mb-3">
          {/* Avatar with gradient ring */}
          <div className="relative shrink-0">
            <div
              className="p-[2.5px] rounded-full"
              style={{
                background: `linear-gradient(135deg, ${customTheme.accentColor}, #3b82f6, #ec4899)`
              }}
            >
              <div className={`p-[1.5px] rounded-full ${isDark ? 'bg-[#0f1422]' : 'bg-white'}`}>
                <img
                  src={currentUser.avatar}
                  alt={currentUser.displayName}
                  className="w-[68px] h-[68px] rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            {currentUser.verified && (
              <div
                className="absolute bottom-0 right-0 w-4 h-4 rounded-full text-white flex items-center justify-center text-[9px] font-bold shadow border border-[#0f1422]"
                style={{ backgroundColor: customTheme.accentColor }}
              >
                ✓
              </div>
            )}
          </div>

          {/* 3 Stats (Instagram style) */}
          <div className="flex-1 flex items-center justify-around text-center">
            <div className="cursor-pointer" onClick={() => setActiveTab('posts')}>
              <span className="font-bold text-[15px] block">{userPosts.length}</span>
              <span className="text-[11px] text-slate-400">posts</span>
            </div>
            <div>
              <span className="font-bold text-[15px] block">{currentUser.connectionsCount}</span>
              <span className="text-[11px] text-slate-400">network</span>
            </div>
            <div className="cursor-pointer" onClick={() => setActiveTab('circles')}>
              <span className="font-bold text-[15px] block">{currentUser.circles.length}</span>
              <span className="text-[11px] text-slate-400">circles</span>
            </div>
          </div>
        </div>

        {/* Bio Details */}
        <div className="space-y-1 mb-3">
          <div className="flex items-center gap-1.5">
            <h1 className="text-[14px] font-bold tracking-tight">{currentUser.displayName}</h1>
            <span className="text-[12px] text-slate-400 font-normal">@{currentUser.username}</span>
          </div>

          <p className={`text-[12.5px] leading-relaxed whitespace-pre-wrap ${
            isDark ? 'text-slate-200' : 'text-slate-700'
          }`}>
            {currentUser.bio}
          </p>

          {/* Link */}
          {currentUser.links && currentUser.links.length > 0 && (
            <div className="pt-0.5">
              <a
                href={currentUser.links[0].url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11.5px] font-semibold hover:underline"
                style={{ color: customTheme.accentColor }}
              >
                <ExternalLink className="w-3 h-3" />
                <span>{currentUser.links[0].title}</span>
              </a>
            </div>
          )}
        </div>

        {/* Action Buttons Row (Instagram profile buttons) */}
        <div className="flex items-center gap-1.5 pt-1">
          {/* Edit Profile (opens settings & persona) */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-3 rounded-xl text-[11.5px] font-semibold border transition-all cursor-pointer ${
              isDark
                ? 'bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 border-white/[0.08]'
                : 'bg-black/[0.05] hover:bg-black/[0.08] text-slate-800 border-black/[0.08]'
            }`}
          >
            <span>Edit profile</span>
          </button>

          {/* Share Profile */}
          <button
            onClick={() => setIsQrModalOpen(true)}
            className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-3 rounded-xl text-[11.5px] font-semibold border transition-all cursor-pointer ${
              isDark
                ? 'bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 border-white/[0.08]'
                : 'bg-black/[0.05] hover:bg-black/[0.08] text-slate-800 border-black/[0.08]'
            }`}
          >
            <span>Share profile</span>
          </button>

          {/* Creator Studio if Creator mode is on */}
          {isCreator && (
            <button
              onClick={() => setIsCreatorStudioOpen(true)}
              className="flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-semibold shadow-sm cursor-pointer"
            >
              <BarChart2 className="w-3 h-3" />
              <span>Studio</span>
            </button>
          )}

          {/* Settings */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
              isDark
                ? 'bg-white/[0.06] hover:bg-white/[0.1] text-slate-300 border-white/[0.08]'
                : 'bg-black/[0.05] hover:bg-black/[0.08] text-slate-700 border-black/[0.08]'
            }`}
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Profile Tabs (Instagram 3-grid selector) */}
      <div className={`flex items-center justify-around border-b mb-2 ${
        isDark ? 'border-white/[0.08]' : 'border-black/[0.08]'
      }`}>
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex items-center justify-center py-2.5 px-3 flex-1 border-b-2 transition-all cursor-pointer ${
            activeTab === 'posts'
              ? isDark
                ? 'border-white text-white'
                : 'border-black text-black'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
          style={activeTab === 'posts' ? { borderColor: customTheme.accentColor, color: customTheme.accentColor } : undefined}
        >
          <Grid className="w-4 h-4" />
        </button>

        <button
          onClick={() => setActiveTab('mini')}
          className={`flex items-center justify-center py-2.5 px-3 flex-1 border-b-2 transition-all cursor-pointer ${
            activeTab === 'mini'
              ? isDark
                ? 'border-white text-white'
                : 'border-black text-black'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
          style={activeTab === 'mini' ? { borderColor: customTheme.accentColor, color: customTheme.accentColor } : undefined}
        >
          <PlaySquare className="w-4 h-4" />
        </button>

        {isCreator ? (
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center justify-center py-2.5 px-3 flex-1 border-b-2 transition-all cursor-pointer ${
              activeTab === 'videos'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Video className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center justify-center py-2.5 px-3 flex-1 border-b-2 transition-all cursor-pointer ${
              activeTab === 'saved'
                ? isDark
                  ? 'border-white text-white'
                  : 'border-black text-black'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
            style={activeTab === 'saved' ? { borderColor: customTheme.accentColor, color: customTheme.accentColor } : undefined}
          >
            <Bookmark className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={() => setActiveTab('circles')}
          className={`flex items-center justify-center py-2.5 px-3 flex-1 border-b-2 transition-all cursor-pointer ${
            activeTab === 'circles'
              ? isDark
                ? 'border-white text-white'
                : 'border-black text-black'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
          style={activeTab === 'circles' ? { borderColor: customTheme.accentColor, color: customTheme.accentColor } : undefined}
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>

      {/* Exact 3-Column Square Instagram Grid */}
      {activeTab === 'posts' && (
        <div className="grid grid-cols-3 gap-1">
          {userPosts.map(post => (
            <div
              key={post.id}
              className="relative aspect-square overflow-hidden bg-black/40 group cursor-pointer"
            >
              {post.mediaUrls.length > 0 ? (
                <img
                  src={post.mediaUrls[0]}
                  alt="Post"
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="p-2 w-full h-full flex items-center justify-center text-center text-[10px] text-slate-300 bg-[#151b2c]">
                  <p className="line-clamp-3">{post.content}</p>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-[11px] font-bold">
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments.length}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'mini' && (
        <div className="grid grid-cols-3 gap-1">
          {miniVideos.map(mini => (
            <div
              key={mini.id}
              className="relative aspect-[9/16] overflow-hidden bg-black/60 group cursor-pointer"
            >
              <img
                src={mini.posterUrl}
                alt={mini.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-1 left-1.5 right-1.5 flex items-center justify-between text-[10px] font-bold text-white drop-shadow">
                <span>▶ {mini.likes}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'videos' && (
        <div className="space-y-2">
          {longVideos.map(vid => (
            <div
              key={vid.id}
              onClick={() => setActiveLongVideo(vid)}
              className="flex gap-2.5 p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] cursor-pointer transition-all"
            >
              <div className="relative w-28 aspect-video rounded-lg overflow-hidden bg-black shrink-0">
                <img
                  src={vid.thumbnailUrl}
                  alt={vid.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/80 text-[9px] font-mono text-white">
                  {vid.duration}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs text-white line-clamp-1">{vid.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{vid.description}</p>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                  <span>{vid.views.toLocaleString()} views</span>
                  <span>•</span>
                  <span>{vid.createdAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'saved' && (
        <div className="grid grid-cols-3 gap-1">
          {savedPosts.map(post => (
            <div
              key={post.id}
              className="relative aspect-square overflow-hidden bg-black/40 group cursor-pointer"
            >
              {post.mediaUrls.length > 0 ? (
                <img
                  src={post.mediaUrls[0]}
                  alt="Saved post"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="p-2 w-full h-full flex items-center justify-center text-[10px] text-slate-300">
                  {post.content}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'circles' && (
        <div className="space-y-2">
          {currentUser.circles.map(circle => (
            <div
              key={circle.id}
              className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: `${circle.color}25`, border: `1px solid ${circle.color}50` }}
                >
                  <Layers className="w-4 h-4" style={{ color: circle.color }} />
                </div>
                <div>
                  <h4 className="font-bold text-xs">{circle.name}</h4>
                  <span className="text-[10.5px] text-slate-400">{circle.memberIds.length} intentional members</span>
                </div>
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/[0.06] text-slate-300">
                Encrypted
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Creator Studio Modal */}
      <CreatorStudioModal
        isOpen={isCreatorStudioOpen}
        onClose={() => setIsCreatorStudioOpen(false)}
      />
    </div>
  );
};
