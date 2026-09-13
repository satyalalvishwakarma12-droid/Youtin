import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Shield,
  Sparkles,
  MessageCircle,
  UserCheck,
  UserPlus,
  MoreHorizontal,
  Ban,
  VolumeX,
  Lock,
  Grid,
  Video
} from 'lucide-react';

export const UserProfileModal: React.FC = () => {
  const {
    selectedUserProfile,
    closeUserProfile,
    connectionStates,
    sendConnectionRequest,
    removeConnection,
    blockUser,
    setActiveChatId,
    chats,
    posts,
    theme,
    showToast
  } = useApp();

  const isDark = theme === 'dark';
  const [showOptions, setShowOptions] = useState(false);

  if (!selectedUserProfile) return null;

  const connectionState = connectionStates[selectedUserProfile.id] || 'not_connected';
  const userPosts = posts.filter(p => p.authorId === selectedUserProfile.id);

  const handleMessage = () => {
    // Find or open chat
    const chat = chats.find(c => c.username === selectedUserProfile.username);
    if (chat) {
      closeUserProfile();
      setActiveChatId(chat.id);
    } else {
      showToast(`Opening encrypted direct channel with @${selectedUserProfile.username}`, 'info');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-2xl p-3 sm:p-5 overflow-y-auto">
        <div className="absolute inset-0" onClick={closeUserProfile} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`relative z-10 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border ${
            isDark
              ? 'bg-[#0f1422] border-white/10 text-white'
              : 'bg-white border-black/10 text-slate-900'
          }`}
        >
          {/* Close button */}
          <button
            onClick={closeUserProfile}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Cover */}
          <div className="relative h-32 w-full bg-gradient-to-r from-slate-800 to-indigo-950 overflow-hidden">
            {selectedUserProfile.coverImage && (
              <img
                src={selectedUserProfile.coverImage}
                alt="Cover"
                className="w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
            )}
          </div>

          {/* Body */}
          <div className="p-5 pt-0 relative">
            <div className="flex items-end justify-between -mt-10 mb-3">
              <div className="relative">
                <img
                  src={selectedUserProfile.avatar}
                  alt={selectedUserProfile.displayName}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-white/30 shadow-xl"
                  referrerPolicy="no-referrer"
                />
                {selectedUserProfile.verified && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-cyan-500 text-white flex items-center justify-center text-[10px] font-bold">
                    ✓
                  </div>
                )}
              </div>

              {/* Action buttons: Connect / Message */}
              <div className="flex items-center gap-2">
                {connectionState === 'connected' ? (
                  <>
                    <button
                      onClick={handleMessage}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-semibold shadow transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Message</span>
                    </button>
                    <button
                      onClick={() => setShowOptions(!showOptions)}
                      className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/10 text-slate-300 border border-white/10"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </>
                ) : connectionState === 'requested' ? (
                  <button
                    disabled
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 text-slate-300 text-xs font-semibold border border-white/15 cursor-not-allowed"
                  >
                    <span>Requested</span>
                  </button>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={() => sendConnectionRequest(selectedUserProfile.id)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold shadow-lg shadow-cyan-500/25 border border-cyan-300/30 hover:brightness-110 cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Connect</span>
                  </motion.button>
                )}
              </div>
            </div>

            {/* Options dropdown */}
            {showOptions && (
              <div className="p-2 rounded-xl bg-[#151b2c] border border-white/10 space-y-1 mb-3 text-xs">
                <button
                  onClick={() => {
                    removeConnection(selectedUserProfile.id);
                    setShowOptions(false);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-white/5 text-amber-300"
                >
                  Remove Connection
                </button>
                <button
                  onClick={() => {
                    blockUser(selectedUserProfile.id);
                    setShowOptions(false);
                    closeUserProfile();
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-white/5 text-rose-400 flex items-center gap-2"
                >
                  <Ban className="w-3.5 h-3.5" /> Block User
                </button>
              </div>
            )}

            {/* Profile text */}
            <div className="space-y-1.5 mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base">{selectedUserProfile.displayName}</h3>
                {selectedUserProfile.isCreator && (
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[10px] font-semibold">
                    Creator
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">@{selectedUserProfile.username}</p>
              <p className="text-xs text-slate-200 leading-relaxed pt-1">{selectedUserProfile.bio}</p>
            </div>

            {/* Posts Grid Preview */}
            <div className="pt-3 border-t border-white/[0.08]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Grid className="w-3.5 h-3.5" /> Shared Intentionally ({userPosts.length})
              </h4>
              {userPosts.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-4 text-center">No public posts visible.</p>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {userPosts.map(p => (
                    <div key={p.id} className="aspect-square rounded-xl overflow-hidden bg-black/40 border border-white/10">
                      {p.mediaUrls.length > 0 ? (
                        <img src={p.mediaUrls[0]} alt="Post" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="p-2 text-[10px] text-slate-300 line-clamp-3">{p.content}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
