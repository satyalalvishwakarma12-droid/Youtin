import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { MiniVideo } from '../../types';
import { X, Send, Heart } from 'lucide-react';

export const MiniCommentsDrawer: React.FC<{
  mini: MiniVideo;
  isOpen: boolean;
  onClose: () => void;
}> = ({ mini, isOpen, onClose }) => {
  const { addMiniComment, theme } = useApp();
  const isDark = theme === 'dark';
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addMiniComment(mini.id, commentText.trim());
    setCommentText('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-md">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className={`relative z-10 w-full max-w-lg max-h-[75vh] rounded-t-3xl sm:rounded-3xl p-5 flex flex-col shadow-2xl border ${
            isDark
              ? 'bg-[#0f1422]/95 border-white/[0.12] text-white shadow-black/80'
              : 'bg-white/95 border-black/[0.1] text-slate-900 shadow-slate-400/50'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm">Mini Comments</h3>
              <span className="text-xs text-slate-400">({mini.commentsCount})</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto no-scrollbar py-4 space-y-3">
            {(!mini.comments || mini.comments.length === 0) ? (
              <div className="py-10 text-center text-slate-400 text-xs">
                No comments yet. Start the conversation with your connection.
              </div>
            ) : (
              mini.comments.map(c => (
                <div key={c.id} className="flex items-start gap-3 text-xs">
                  <img
                    src={c.authorAvatar}
                    alt={c.authorName}
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200">@{c.authorUsername}</span>
                      <span className="text-[10px] text-slate-400">{c.createdAt}</span>
                    </div>
                    <p className="text-slate-300 mt-1">{c.text}</p>
                  </div>
                  <button className="text-slate-400 hover:text-rose-400 p-1">
                    <Heart className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="pt-3 border-t border-white/[0.08] flex items-center gap-2">
            <input
              type="text"
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Add an intentional comment..."
              className="flex-1 bg-white/[0.07] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white disabled:opacity-40 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
