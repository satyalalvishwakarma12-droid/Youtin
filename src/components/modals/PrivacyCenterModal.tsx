import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Shield,
  Eye,
  EyeOff,
  UserCheck,
  Lock,
  Clock,
  Download,
  AlertTriangle,
  Sparkles,
  Check,
  Ban,
  Fingerprint
} from 'lucide-react';

export const PrivacyCenterModal: React.FC = () => {
  const {
    isPrivacyCenterOpen,
    setIsPrivacyCenterOpen,
    currentUser,
    updatePrivacySettings,
    unblockUser,
    showToast,
    theme
  } = useApp();

  const isDark = theme === 'dark';
  if (!isPrivacyCenterOpen) return null;

  const privacy = currentUser.privacySettings;

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      JSON.stringify(currentUser, null, 2)
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `haven_privacy_archive_${currentUser.username}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Your full encrypted personal data archive has been exported', 'success');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-2xl p-3 sm:p-5 overflow-y-auto">
        <div className="absolute inset-0" onClick={() => setIsPrivacyCenterOpen(false)} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`relative z-10 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border ${
            isDark
              ? 'bg-[#0f1422] border-white/10 text-white shadow-black/90'
              : 'bg-white border-black/10 text-slate-900 shadow-slate-300'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">Haven Privacy Center</h2>
                <p className="text-xs text-slate-400">Your network. Your people. Your rules.</p>
              </div>
            </div>

            <button
              onClick={() => setIsPrivacyCenterOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Core Privacy Pledge Banner */}
          <div className="my-5 p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-3 text-cyan-200">
            <Fingerprint className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <span className="font-bold block text-white text-sm mb-0.5">Haven Sovereign Guarantee</span>
              Zero telemetry ads. Zero synthetic rage bait algorithms. All feed items originate strictly from connections you explicitly approved.
            </div>
          </div>

          {/* Privacy Controls List */}
          <div className="space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar pr-1">
            {/* Account Visibility (Private vs Public) */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-between">
              <div className="space-y-0.5 max-w-[75%]">
                <span className="font-bold text-sm block">Private Account Shield</span>
                <span className="text-xs text-slate-400 block">
                  Only explicitly approved connections can view your stories, posts, and profile details.
                </span>
              </div>
              <input
                type="checkbox"
                checked={privacy.isPrivate}
                onChange={e => updatePrivacySettings({ isPrivate: e.target.checked })}
                className="w-5 h-5 accent-cyan-500 rounded cursor-pointer"
              />
            </div>

            {/* Ghost Mode */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-between">
              <div className="space-y-0.5 max-w-[75%]">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm">Invisible / Ghost Mode</span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-semibold">
                    Stealth
                  </span>
                </div>
                <span className="text-xs text-slate-400 block">
                  Hides you completely from username suggestions and public connection listings.
                </span>
              </div>
              <input
                type="checkbox"
                checked={privacy.invisibleMode}
                onChange={e => updatePrivacySettings({ invisibleMode: e.target.checked })}
                className="w-5 h-5 accent-cyan-500 rounded cursor-pointer"
              />
            </div>

            {/* Connection Requests Policy */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">Who Can Send Connection Requests</span>
                <span className="text-xs text-cyan-400 font-semibold uppercase">{privacy.connectionRequests}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1">
                {(['everyone', 'friends_of_friends', 'nobody'] as const).map(option => (
                  <button
                    key={option}
                    onClick={() => updatePrivacySettings({ connectionRequests: option })}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      privacy.connectionRequests === option
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                        : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {option === 'everyone' ? 'All Users' : option === 'friends_of_friends' ? 'Mutuals' : 'Direct QR Only'}
                  </button>
                ))}
              </div>
            </div>

            {/* Disappearing Content Defaults */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-cyan-400" /> Disappearing Content Default
                </span>
                <span className="text-xs text-cyan-400 font-semibold uppercase">{privacy.disappearingContent}</span>
              </div>
              <div className="grid grid-cols-4 gap-2 pt-1">
                {(['off', '24h', '7d', '30d'] as const).map(d => (
                  <button
                    key={d}
                    onClick={() => updatePrivacySettings({ disappearingContent: d })}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      privacy.disappearingContent === d
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                        : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {d === 'off' ? 'Keep Forever' : d}
                  </button>
                ))}
              </div>
            </div>

            {/* Blocked Users Section */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm flex items-center gap-1.5">
                  <Ban className="w-4 h-4 text-rose-400" /> Blocked & Restricted List
                </span>
                <span className="text-xs text-slate-400">{currentUser.blockedUsers.length} blocked</span>
              </div>
              {currentUser.blockedUsers.length === 0 ? (
                <p className="text-xs text-slate-500 italic">No users currently blocked.</p>
              ) : (
                <div className="space-y-2 pt-1">
                  {currentUser.blockedUsers.map(id => (
                    <div key={id} className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] text-xs">
                      <span className="text-slate-300">User ID: {id}</span>
                      <button
                        onClick={() => unblockUser(id)}
                        className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30"
                      >
                        Unblock
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Data Sovereignty & Export */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-between">
              <div>
                <span className="font-bold text-sm block">Export All Personal Data</span>
                <span className="text-xs text-slate-400 block">Download all posts, chats, keys, and circles in open JSON format.</span>
              </div>
              <button
                onClick={handleExportData}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 text-xs font-semibold transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
