import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { X, Copy, QrCode, Camera, ShieldCheck, Check } from 'lucide-react';

export const QrModal: React.FC = () => {
  const { isQrModalOpen, setIsQrModalOpen, currentUser, showToast, theme } = useApp();
  const isDark = theme === 'dark';
  const [copied, setCopied] = useState(false);
  const [activeMode, setActiveMode] = useState<'my_code' | 'scan'>('my_code');

  if (!isQrModalOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(`https://haven.social/@${currentUser.username}`);
    setCopied(true);
    showToast('Direct intentional invite link copied!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-2xl p-4">
        <div className="absolute inset-0" onClick={() => setIsQrModalOpen(false)} />

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          className={`relative z-10 w-full max-w-md rounded-3xl p-6 shadow-2xl border text-center ${
            isDark
              ? 'bg-[#0f1422] border-white/10 text-white shadow-black/90'
              : 'bg-white border-black/10 text-slate-900 shadow-slate-300'
          }`}
        >
          {/* Close */}
          <button
            onClick={() => setIsQrModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Mode Switcher */}
          <div className="flex items-center justify-center gap-1 p-1 rounded-2xl bg-white/[0.05] border border-white/[0.08] w-fit mx-auto mb-5">
            <button
              onClick={() => setActiveMode('my_code')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeMode === 'my_code'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>My QR Code</span>
            </button>
            <button
              onClick={() => setActiveMode('scan')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeMode === 'scan'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Scan QR</span>
            </button>
          </div>

          {activeMode === 'my_code' ? (
            <div className="space-y-4">
              {/* Profile info preview */}
              <div className="flex flex-col items-center">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.displayName}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-lg mb-2"
                  referrerPolicy="no-referrer"
                />
                <h3 className="font-bold text-base">{currentUser.displayName}</h3>
                <p className="text-xs text-slate-400">@{currentUser.username}</p>
              </div>

              {/* QR Graphic Box */}
              <div className="p-4 bg-white rounded-3xl shadow-inner inline-block mx-auto border-4 border-cyan-500/20">
                <svg
                  className="w-48 h-48 text-slate-900"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                >
                  {/* Styled QR Matrix pattern */}
                  <rect x="0" y="0" width="30" height="30" rx="6" />
                  <rect x="4" y="4" width="22" height="22" fill="white" rx="4" />
                  <rect x="8" y="8" width="14" height="14" rx="2" />

                  <rect x="70" y="0" width="30" height="30" rx="6" />
                  <rect x="74" y="4" width="22" height="22" fill="white" rx="4" />
                  <rect x="78" y="8" width="14" height="14" rx="2" />

                  <rect x="0" y="70" width="30" height="30" rx="6" />
                  <rect x="4" y="74" width="22" height="22" fill="white" rx="4" />
                  <rect x="8" y="78" width="14" height="14" rx="2" />

                  {/* Data dots */}
                  <rect x="40" y="8" width="6" height="6" rx="2" />
                  <rect x="52" y="8" width="6" height="6" rx="2" />
                  <rect x="40" y="20" width="6" height="6" rx="2" />
                  <rect x="46" y="26" width="6" height="6" rx="2" />
                  <rect x="36" y="38" width="6" height="6" rx="2" />
                  <rect x="48" y="44" width="6" height="6" rx="2" />
                  <rect x="60" y="38" width="6" height="6" rx="2" />
                  <rect x="72" y="44" width="6" height="6" rx="2" />
                  <rect x="84" y="38" width="6" height="6" rx="2" />
                  <rect x="38" y="60" width="6" height="6" rx="2" />
                  <rect x="48" y="66" width="6" height="6" rx="2" />
                  <rect x="60" y="60" width="6" height="6" rx="2" />
                  <rect x="42" y="80" width="6" height="6" rx="2" />
                  <rect x="54" y="86" width="6" height="6" rx="2" />
                  <rect x="70" y="74" width="6" height="6" rx="2" />
                  <rect x="82" y="80" width="6" height="6" rx="2" />
                </svg>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-xs text-cyan-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero algorithmic discovery • Direct peer connection</span>
              </div>

              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 text-xs font-bold transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Link Copied!' : 'Copy Direct Connection Link'}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="relative aspect-square max-w-[260px] mx-auto rounded-3xl overflow-hidden bg-black/60 border border-white/20 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-cyan-400 rounded-2xl animate-pulse flex items-center justify-center text-slate-400 text-xs text-center p-4">
                  Point camera at a friend's Haven QR code to connect directly.
                </div>
              </div>
              <p className="text-xs text-slate-400">
                Connecting via QR immediately links you without sharing phone numbers, email addresses, or contact books.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
