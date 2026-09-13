import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Sun,
  Moon,
  Shield,
  Bell,
  Sparkles,
  ChevronRight,
  Check,
  Lock,
  Globe,
  BarChart2
} from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const {
    isSettingsOpen,
    setIsSettingsOpen,
    currentUser,
    allKnownUsers,
    setCurrentUser,
    switchAccountType,
    theme,
    customTheme,
    toggleTheme,
    setIsPrivacyCenterOpen,
    showToast
  } = useApp();

  const isDark = theme === 'dark';
  if (!isSettingsOpen) return null;

  const isPrivate = currentUser.accountType === 'private';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-2xl p-3 sm:p-5 overflow-y-auto">
        <div className="absolute inset-0" onClick={() => setIsSettingsOpen(false)} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`relative z-10 w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-2xl border ${
            isDark
              ? 'bg-[#0f1422] border-white/10 text-white shadow-black/90'
              : 'bg-white border-black/10 text-slate-900 shadow-slate-300'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <h2 className="text-xl font-bold tracking-tight">Settings & Privacy</h2>
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-5 my-5 max-h-[68vh] overflow-y-auto no-scrollbar pr-0.5">
            {/* Account Privacy & Mode (Requested by user to be placed inside Settings) */}
            <div className={`p-4 rounded-2xl border transition-all ${
              isDark ? 'bg-white/[0.04] border-white/[0.09]' : 'bg-black/[0.03] border-black/[0.07]'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {isPrivate ? (
                    <Lock className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Globe className="w-4 h-4 text-amber-400" />
                  )}
                  <span className="font-bold text-sm">Account Privacy & Mode</span>
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                  isPrivate
                    ? isDark ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30' : 'bg-cyan-50 text-cyan-700 border-cyan-200'
                    : isDark ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}>
                  {isPrivate ? 'Private' : 'Public / Creator'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                {/* Private Option */}
                <button
                  onClick={() => {
                    if (!isPrivate) {
                      switchAccountType('private');
                      showToast('Switched to Private Account mode', 'success');
                    }
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isPrivate
                      ? 'bg-cyan-500/15 border-cyan-400/60 ring-1 ring-cyan-400/30'
                      : isDark
                      ? 'bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.07]'
                      : 'bg-white hover:bg-slate-50 border-black/[0.07]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <Shield className="w-4 h-4 text-cyan-400" />
                    {isPrivate && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                  </div>
                  <div>
                    <span className="font-bold text-xs block">Private Account</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Only approved connections can see your posts and stories
                    </span>
                  </div>
                </button>

                {/* Public / Creator Option */}
                <button
                  onClick={() => {
                    if (isPrivate) {
                      switchAccountType('creator');
                      showToast('Switched to Public Creator mode', 'success');
                    }
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    !isPrivate
                      ? 'bg-amber-500/15 border-amber-400/60 ring-1 ring-amber-400/30'
                      : isDark
                      ? 'bg-white/[0.03] hover:bg-white/[0.06] border-white/[0.07]'
                      : 'bg-white hover:bg-slate-50 border-black/[0.07]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    {!isPrivate && <Check className="w-3.5 h-3.5 text-amber-400" />}
                  </div>
                  <div>
                    <span className="font-bold text-xs block">Public / Creator</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Discoverable profile with Creator Studio & video analytics
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Appearance Theme */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-between">
              <div>
                <span className="font-bold text-sm block">Theme Appearance</span>
                <span className="text-xs text-slate-400 block">Switch between Liquid Obsidian and Pearl Light</span>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
                <span>{isDark ? 'Obsidian Dark' : 'Pearl Light'}</span>
              </button>
            </div>

            {/* Privacy Center shortcut */}
            <div
              onClick={() => {
                setIsSettingsOpen(false);
                setIsPrivacyCenterOpen(true);
              }}
              className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] flex items-center justify-between cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-cyan-400" />
                <div>
                  <span className="font-bold text-sm block">Privacy Center & Sovereignty</span>
                  <span className="text-xs text-slate-400 block">Audience rings, Ghost Mode, and end-to-end encryption</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>

            {/* Persona Switcher */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Switch Demo Persona
              </label>
              <div className="space-y-2">
                {allKnownUsers.map(u => {
                  const isCurrent = u.id === currentUser.id;
                  return (
                    <div
                      key={u.id}
                      onClick={() => {
                        setCurrentUser(u);
                        showToast(`Switched active persona to @${u.username}`, 'info');
                      }}
                      className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                        isCurrent
                          ? 'bg-cyan-500/20 border-cyan-400/60 shadow-sm'
                          : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.07]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar}
                          alt={u.displayName}
                          className="w-10 h-10 rounded-xl object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs">{u.displayName}</span>
                            {u.isCreator && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                                Creator
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-400">@{u.username}</span>
                        </div>
                      </div>

                      {isCurrent && <Check className="w-4 h-4 text-cyan-400" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Notifications */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm flex items-center gap-2">
                  <Bell className="w-4 h-4 text-cyan-400" /> Intentional Notifications Only
                </span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                />
              </div>
              <p className="text-xs text-slate-400">
                You will only receive alerts when direct connections message, react, or request access. Never spam marketing or algorithmic discovery pushes.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
