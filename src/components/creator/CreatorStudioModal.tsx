import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import {
  X,
  TrendingUp,
  Eye,
  Clock,
  Users,
  Video,
  PlaySquare,
  Upload,
  BarChart3,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export const CreatorStudioModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { currentUser, longVideos, setCreateMenuType, setIsCreateOpen, theme } = useApp();
  const isDark = theme === 'dark';

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-2xl p-3 sm:p-5 overflow-y-auto">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`relative z-10 w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl border ${
            isDark
              ? 'bg-[#0b0e17] border-white/10 text-white'
              : 'bg-white border-black/10 text-slate-900'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/25">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">Haven Creator Studio</h2>
                <p className="text-xs text-slate-400">Audience insights & 4K long-form video architecture</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Total Views</span>
                <Eye className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-xl font-bold tracking-tight">{currentUser.creatorMetrics?.totalViews || '142.8K'}</p>
              <span className="inline-flex items-center text-[10px] font-semibold text-emerald-400 gap-0.5 mt-1">
                <TrendingUp className="w-3 h-3" /> +18.4% this month
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Watch Time</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-xl font-bold tracking-tight">{currentUser.creatorMetrics?.watchTimeHours || '8.2K hrs'}</p>
              <span className="inline-flex items-center text-[10px] font-semibold text-emerald-400 gap-0.5 mt-1">
                <TrendingUp className="w-3 h-3" /> +24% retention
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Subscribers</span>
                <Users className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-xl font-bold tracking-tight">{currentUser.creatorMetrics?.subscribers || '6.4K'}</p>
              <span className="inline-flex items-center text-[10px] font-semibold text-emerald-400 gap-0.5 mt-1">
                <TrendingUp className="w-3 h-3" /> +320 intentional
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Engagement</span>
                <BarChart3 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-xl font-bold tracking-tight">{currentUser.creatorMetrics?.avgEngagement || '9.4%'}</p>
              <span className="inline-flex items-center text-[10px] font-semibold text-emerald-400 gap-0.5 mt-1">
                <TrendingUp className="w-3 h-3" /> Industry leading
              </span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-blue-950/40 to-transparent border border-cyan-500/20 mb-6">
            <div>
              <h4 className="font-bold text-sm text-cyan-300">Publish 4K Creator Video</h4>
              <p className="text-xs text-slate-400">Full chapters support, multi-track audio, and playlists</p>
            </div>
            <button
              onClick={() => {
                onClose();
                setCreateMenuType('long_video');
                setIsCreateOpen(true);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-semibold shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Video</span>
            </button>
          </div>

          {/* Published Videos List */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Channel Videos & Analytics
            </h4>
            <div className="space-y-3">
              {longVideos.map(vid => (
                <div
                  key={vid.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={vid.thumbnailUrl}
                      alt={vid.title}
                      className="w-16 aspect-video rounded-lg object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h5 className="font-bold text-xs line-clamp-1">{vid.title}</h5>
                      <span className="text-[10px] text-slate-400">{vid.category} • {vid.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="text-right">
                      <span className="font-bold block">{vid.views.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-400">Views</span>
                    </div>
                    <div className="text-right hidden sm:block">
                      <span className="font-bold block">{vid.likes}</span>
                      <span className="text-[10px] text-slate-400">Likes</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
