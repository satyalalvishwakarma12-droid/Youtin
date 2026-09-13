import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Post } from '../../types';
import {
  Heart,
  MessageCircle,
  Repeat2,
  Bookmark,
  Share2,
  MoreHorizontal,
  MapPin,
  Sparkles,
  Send,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX
} from 'lucide-react';

export const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const {
    toggleLikePost,
    toggleSavePost,
    repost,
    addComment,
    openUserProfile,
    allKnownUsers,
    showToast,
    theme,
    customTheme
  } = useApp();

  const isDark = theme === 'dark';
  const [commentInput, setCommentInput] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [isLikedAnim, setIsLikedAnim] = useState(false);

  const author = allKnownUsers.find(u => u.id === post.authorId);

  const handleAuthorClick = () => {
    if (author) {
      openUserProfile(author);
    }
  };

  const handleLike = () => {
    toggleLikePost(post.id);
    if (!post.isLiked) {
      setIsLikedAnim(true);
      setTimeout(() => setIsLikedAnim(false), 800);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addComment(post.id, commentInput);
    setCommentInput('');
    setShowComments(true);
  };

  const handleShare = () => {
    showToast('Link copied to clipboard', 'info');
  };

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`w-full overflow-hidden transition-colors border-b ${
        isDark
          ? 'bg-[#0b0e17] border-white/[0.09]'
          : 'bg-white border-black/[0.07]'
      }`}
    >
      {/* Specular highlight line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      {/* Instagram proportional header */}
      <div className="px-3.5 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={handleAuthorClick}>
          <div className="relative">
            <img
              src={post.authorAvatar}
              alt={post.authorName}
              className="w-[34px] h-[34px] rounded-full object-cover border border-white/20 shadow-sm"
              referrerPolicy="no-referrer"
            />
            {post.isCreator && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[8px] font-bold shadow">
                ★
              </div>
            )}
          </div>

          <div className="flex flex-col -space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className={`text-[13px] font-bold tracking-tight hover:underline ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {post.authorUsername}
              </span>

              {post.audience === 'close_friends' ? (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[9px] font-semibold">
                  <Sparkles className="w-2 h-2" /> Close
                </span>
              ) : post.circleName ? (
                <span
                  className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-semibold border"
                  style={{
                    backgroundColor: `${customTheme.accentColor}15`,
                    borderColor: `${customTheme.accentColor}30`,
                    color: customTheme.accentColor
                  }}
                >
                  {post.circleName}
                </span>
              ) : null}
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <span>{post.createdAt}</span>
              {post.location && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 truncate max-w-[120px]">
                    <MapPin className="w-2.5 h-2.5 text-cyan-400" />
                    {post.location}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Options */}
        <button
          onClick={() => showToast('Post privacy: Intentional connection stream', 'privacy')}
          aria-label="Post options"
          className="p-1 rounded-full text-slate-400 hover:text-slate-200 transition-colors"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Media Rendering (Instagram aspect ratios 4:5 or 1:1) */}
      {post.type === 'photo' && post.mediaUrls.length > 0 && (
        <div
          className="relative w-full max-h-[460px] overflow-hidden bg-black/40 cursor-pointer select-none"
          onDoubleClick={handleLike}
        >
          <img
            src={post.mediaUrls[0]}
            alt="Post media"
            className="w-full h-auto max-h-[460px] object-cover"
            referrerPolicy="no-referrer"
          />

          {/* Double tap heart animation */}
          <AnimatePresence>
            {isLikedAnim && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.3, opacity: 1 }}
                exit={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <Heart className="w-20 h-20 fill-white text-white drop-shadow-2xl" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {post.type === 'carousel' && post.mediaUrls.length > 0 && (
        <div
          className="relative w-full max-h-[460px] overflow-hidden bg-black/40 cursor-pointer select-none"
          onDoubleClick={handleLike}
        >
          <img
            src={post.mediaUrls[carouselIndex]}
            alt={`Carousel slide ${carouselIndex + 1}`}
            className="w-full h-auto max-h-[460px] object-cover transition-all duration-200"
            referrerPolicy="no-referrer"
          />

          {/* Carousel dots */}
          <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1 z-10">
            {post.mediaUrls.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === carouselIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Prev/Next arrows */}
          {carouselIndex > 0 && (
            <button
              onClick={e => {
                e.stopPropagation();
                setCarouselIndex(prev => Math.max(0, prev - 1));
              }}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          )}
          {carouselIndex < post.mediaUrls.length - 1 && (
            <button
              onClick={e => {
                e.stopPropagation();
                setCarouselIndex(prev => Math.min(post.mediaUrls.length - 1, prev + 1));
              }}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md text-white transition-all cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {post.type === 'video' && post.mediaUrls.length > 0 && (
        <div className="relative w-full max-h-[440px] bg-black overflow-hidden flex items-center justify-center">
          <video
            src={post.mediaUrls[0]}
            loop
            playsInline
            muted={isVideoMuted}
            autoPlay
            className="w-full max-h-[440px] object-contain"
          />
          <button
            onClick={() => setIsVideoMuted(!isVideoMuted)}
            aria-label="Toggle mute"
            className="absolute bottom-2.5 right-2.5 p-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs"
          >
            {isVideoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

      {/* Instagram Action Toolbar */}
      <div className="px-3.5 pt-2.5 pb-1.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Like */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={handleLike}
            aria-label="Like"
            className="cursor-pointer text-slate-200 hover:text-white transition-transform"
          >
            <Heart
              className={`w-[22px] h-[22px] transition-colors ${
                post.isLiked ? 'fill-rose-500 text-rose-500' : isDark ? 'text-slate-200' : 'text-slate-800'
              }`}
            />
          </motion.button>

          {/* Comment */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => setShowComments(!showComments)}
            aria-label="Comments"
            className={`cursor-pointer transition-transform ${isDark ? 'text-slate-200' : 'text-slate-800'}`}
          >
            <MessageCircle className="w-[22px] h-[22px]" />
          </motion.button>

          {/* Repost / Share */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => repost(post.id)}
            aria-label="Repost"
            className={`cursor-pointer transition-transform ${
              post.isReposted ? 'text-emerald-400' : isDark ? 'text-slate-200' : 'text-slate-800'
            }`}
          >
            <Repeat2 className="w-[22px] h-[22px]" />
          </motion.button>

          {/* Direct Share */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleShare}
            aria-label="Share"
            className={`cursor-pointer transition-transform ${isDark ? 'text-slate-200' : 'text-slate-800'}`}
          >
            <Share2 className="w-[21px] h-[21px]" />
          </motion.button>
        </div>

        {/* Bookmark / Save */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => toggleSavePost(post.id)}
          aria-label="Bookmark"
          className="cursor-pointer"
          style={{ color: post.isSaved ? customTheme.accentColor : undefined }}
        >
          <Bookmark
            className={`w-[22px] h-[22px] transition-colors ${
              post.isSaved
                ? 'fill-current'
                : isDark
                ? 'text-slate-200'
                : 'text-slate-800'
            }`}
          />
        </motion.button>
      </div>

      {/* Likes count & Caption (Instagram layout) */}
      <div className="px-3.5 pb-2.5 space-y-1">
        <p className={`text-[13px] font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {post.likes.toLocaleString()} likes
        </p>

        {/* Caption */}
        <p className={`text-[13px] leading-snug ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
          <span
            onClick={handleAuthorClick}
            className="font-bold mr-1.5 cursor-pointer hover:underline text-white"
          >
            {post.authorUsername}
          </span>
          <span className="whitespace-pre-wrap">{post.content}</span>
        </p>

        {/* Comments count link */}
        {post.comments.length > 0 && (
          <button
            onClick={() => setShowComments(!showComments)}
            className="text-[12px] text-slate-400 hover:text-slate-300 transition-colors pt-0.5 cursor-pointer block"
          >
            {showComments
              ? 'Hide comments'
              : `View all ${post.comments.length} comments`}
          </button>
        )}
      </div>

      {/* Expanded Comments & Input Drawer */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`px-3.5 pb-3 border-t ${
              isDark ? 'border-white/[0.08] bg-black/25' : 'border-black/[0.05] bg-slate-50/70'
            }`}
          >
            <div className="py-2.5 space-y-2 max-h-44 overflow-y-auto no-scrollbar">
              {post.comments.length === 0 ? (
                <p className="text-[11px] text-slate-400 italic">No comments yet. Start the conversation.</p>
              ) : (
                post.comments.map(c => (
                  <div key={c.id} className="flex items-start gap-2 text-[12px]">
                    <img
                      src={c.authorAvatar}
                      alt={c.authorName}
                      className="w-5 h-5 rounded-full object-cover shrink-0 mt-0.5"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1">
                      <span className="font-bold mr-1.5 text-slate-200">{c.authorUsername}</span>
                      <span className="text-slate-300">{c.text}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Quick Comment Input */}
            <form onSubmit={handleAddComment} className="flex items-center gap-2 pt-1.5">
              <input
                type="text"
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                placeholder="Add a comment..."
                className={`flex-1 rounded-full px-3 py-1.5 text-[12px] border focus:outline-none ${
                  isDark
                    ? 'bg-white/[0.06] border-white/[0.1] text-white placeholder-slate-500'
                    : 'bg-white border-black/[0.1] text-slate-900 placeholder-slate-400'
                }`}
              />
              <button
                type="submit"
                disabled={!commentInput.trim()}
                className="text-[12px] font-bold px-2.5 py-1 text-cyan-400 disabled:opacity-40 transition-all cursor-pointer"
                style={{ color: customTheme.accentColor }}
              >
                Post
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};
