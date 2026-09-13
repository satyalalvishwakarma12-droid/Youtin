import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { MiniCommentsDrawer } from './MiniCommentsDrawer';
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Music,
  Volume2,
  VolumeX,
  Play,
  Check,
  UserPlus
} from 'lucide-react';

export const MiniReelView: React.FC = () => {
  const {
    miniVideos,
    activeMiniIndex,
    setActiveMiniIndex,
    toggleLikeMini,
    toggleSaveMini,
    isMiniMuted,
    setIsMiniMuted,
    connectionStates,
    sendConnectionRequest,
    openUserProfile,
    allKnownUsers,
    showToast,
    customTheme
  } = useApp();

  const [isPlaying, setIsPlaying] = useState(true);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef<number>(0);
  const touchStartY = useRef<number | null>(null);

  const currentMini = miniVideos[activeMiniIndex] || miniVideos[0];
  const author = allKnownUsers.find(u => u.id === currentMini.authorId);
  const connectionState = connectionStates[currentMini.authorId] || 'not_connected';

  // Video playback management
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [activeMiniIndex]);

  const handleNext = useCallback(() => {
    setScrollDirection('down');
    if (activeMiniIndex < miniVideos.length - 1) {
      setActiveMiniIndex(activeMiniIndex + 1);
    } else {
      setActiveMiniIndex(0); // loop back
    }
  }, [activeMiniIndex, miniVideos.length, setActiveMiniIndex]);

  const handlePrev = useCallback(() => {
    setScrollDirection('up');
    if (activeMiniIndex > 0) {
      setActiveMiniIndex(activeMiniIndex - 1);
    } else {
      setActiveMiniIndex(miniVideos.length - 1);
    }
  }, [activeMiniIndex, miniVideos.length, setActiveMiniIndex]);

  // Wheel listener for smooth scrolling like Reels/TikTok
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // If comments drawer is open, let user scroll comments
      if (isCommentsOpen) return;

      const now = Date.now();
      if (now - lastScrollTime.current < 450) return; // 450ms cooldown between swipes

      if (e.deltaY > 25) {
        lastScrollTime.current = now;
        handleNext();
      } else if (e.deltaY < -25) {
        lastScrollTime.current = now;
        handlePrev();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [handleNext, handlePrev, isCommentsOpen]);

  // Keyboard navigation (Arrow keys, Space to pause)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCommentsOpen) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isCommentsOpen]);

  // Touch handlers for mobile vertical swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isCommentsOpen) return;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null || isCommentsOpen) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    // Threshold of 40px to trigger swipe
    if (Math.abs(diff) > 40) {
      const now = Date.now();
      if (now - lastScrollTime.current > 300) {
        lastScrollTime.current = now;
        if (diff > 0) {
          handleNext(); // Swiped up -> next reel
        } else {
          handlePrev(); // Swiped down -> previous reel
        }
      }
    }
    touchStartY.current = null;
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const handleDoubleTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentMini.isLiked) {
      toggleLikeMini(currentMini.id);
    }
    setShowHeartBurst(true);
    setTimeout(() => setShowHeartBurst(false), 800);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    showToast('Mini video link copied to clipboard', 'info');
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[calc(100vh-4rem)] max-w-md mx-auto flex items-center justify-center p-0 sm:p-2 pb-20 select-none overflow-hidden"
    >
      {/* Animated Reels Transition Container */}
      <AnimatePresence initial={false} custom={scrollDirection} mode="wait">
        <motion.div
          key={currentMini.id}
          custom={scrollDirection}
          initial={{
            opacity: 0.8,
            y: scrollDirection === 'down' ? '30%' : '-30%'
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0.6,
            y: scrollDirection === 'down' ? '-30%' : '30%'
          }}
          transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
          onClick={togglePlay}
          onDoubleClick={handleDoubleTap}
          className="relative w-full h-full max-h-[820px] sm:rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/10 flex flex-col justify-between"
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            src={currentMini.videoUrl}
            poster={currentMini.posterUrl}
            loop
            playsInline
            muted={isMiniMuted}
            autoPlay
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradients for text legibility */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/75 via-black/25 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none z-10" />

          {/* Top Bar inside Mini */}
          <div className="relative z-20 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <span
                className="font-extrabold tracking-wider text-[11px] uppercase px-2.5 py-0.5 rounded-full backdrop-blur-md border"
                style={{
                  backgroundColor: `${customTheme.accentColor}25`,
                  borderColor: `${customTheme.accentColor}50`,
                  color: customTheme.accentColor
                }}
              >
                MINI • INTENTIONAL
              </span>
              <span className="text-[11px] text-white/70 font-medium">
                {activeMiniIndex + 1} / {miniVideos.length}
              </span>
            </div>

            {/* Mute / Unmute Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMiniMuted(!isMiniMuted);
              }}
              aria-label="Toggle sound"
              className="p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/15 text-white transition-all cursor-pointer"
            >
              {isMiniMuted ? (
                <VolumeX className="w-4 h-4 text-rose-300" />
              ) : (
                <Volume2 className="w-4 h-4 text-cyan-300" />
              )}
            </button>
          </div>

          {/* Play/Pause Indicator when paused */}
          {!isPlaying && (
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-black/55 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                <Play className="w-8 h-8 ml-1 fill-white" />
              </div>
            </div>
          )}

          {/* Heart Burst on double tap */}
          <AnimatePresence>
            {showHeartBurst && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.3, opacity: 1 }}
                exit={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
              >
                <Heart className="w-24 h-24 fill-rose-500 text-rose-500 drop-shadow-2xl" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Action Column */}
          <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-3.5">
            {/* Creator Avatar */}
            <div
              className="relative cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (author) openUserProfile(author);
              }}
            >
              <img
                src={currentMini.authorAvatar}
                alt={currentMini.authorName}
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-lg"
                referrerPolicy="no-referrer"
              />
              {connectionState === 'not_connected' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sendConnectionRequest(currentMini.authorId);
                  }}
                  title="Send connection request"
                  className="absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white flex items-center justify-center shadow cursor-pointer"
                >
                  <UserPlus className="w-3 h-3" />
                </button>
              )}
              {connectionState === 'connected' && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}
            </div>

            {/* Like */}
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation();
                toggleLikeMini(currentMini.id);
              }}
              className="flex flex-col items-center gap-0.5 text-white cursor-pointer"
            >
              <div
                className={`p-2.5 rounded-full backdrop-blur-xl border transition-all ${
                  currentMini.isLiked
                    ? 'bg-rose-500/30 border-rose-400 text-rose-400'
                    : 'bg-black/40 hover:bg-black/60 border-white/15 text-white'
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${currentMini.isLiked ? 'fill-rose-500' : ''}`}
                />
              </div>
              <span className="text-[11px] font-semibold drop-shadow">
                {currentMini.likes}
              </span>
            </motion.button>

            {/* Comments */}
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsCommentsOpen(true);
              }}
              className="flex flex-col items-center gap-0.5 text-white cursor-pointer"
            >
              <div className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/15 text-white transition-all">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold drop-shadow">
                {currentMini.commentsCount}
              </span>
            </motion.button>

            {/* Bookmark */}
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={(e) => {
                e.stopPropagation();
                toggleSaveMini(currentMini.id);
              }}
              className="flex flex-col items-center gap-0.5 text-white cursor-pointer"
            >
              <div
                className={`p-2.5 rounded-full backdrop-blur-xl border transition-all ${
                  currentMini.isSaved
                    ? 'bg-cyan-500/30 border-cyan-400 text-cyan-300'
                    : 'bg-black/40 hover:bg-black/60 border-white/15 text-white'
                }`}
              >
                <Bookmark
                  className={`w-5 h-5 ${currentMini.isSaved ? 'fill-cyan-400' : ''}`}
                />
              </div>
              <span className="text-[11px] font-semibold drop-shadow">
                {currentMini.saves}
              </span>
            </motion.button>

            {/* Share */}
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={handleShare}
              className="flex flex-col items-center gap-0.5 text-white cursor-pointer"
            >
              <div className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/15 text-white transition-all">
                <Share2 className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold drop-shadow">
                {currentMini.shares}
              </span>
            </motion.button>

            {/* Spinning Audio Disc */}
            <div
              className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-900 via-slate-800 to-black p-1 border-2 border-white/30 shadow-lg animate-spin"
              style={{ animationDuration: '6s' }}
            >
              <div className="w-full h-full rounded-full bg-cyan-500 flex items-center justify-center">
                <Music className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
          </div>

          {/* Bottom Left Info */}
          <div className="relative z-20 p-4 pb-6 max-w-[80%] flex flex-col gap-2 text-white">
            <div
              onClick={(e) => {
                e.stopPropagation();
                if (author) openUserProfile(author);
              }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <span className="font-bold text-sm drop-shadow">{currentMini.authorName}</span>
              <span className="text-xs text-white/70">@{currentMini.authorUsername}</span>
              {currentMini.isCreator && (
                <span className="px-1.5 py-0.5 rounded bg-amber-500/80 text-[10px] text-white font-semibold">
                  Creator
                </span>
              )}
            </div>

            <p className="text-xs leading-relaxed line-clamp-2 text-white/90 drop-shadow">
              {currentMini.caption}
            </p>

            {/* Tags */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {currentMini.tags.map(tag => (
                <span key={tag} className="text-[10px] font-semibold text-cyan-300 drop-shadow">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Music track */}
            <div className="flex items-center gap-2 text-xs text-white/80 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 w-fit">
              <Music className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
              <span className="truncate max-w-[180px]">
                {currentMini.musicTitle} • {currentMini.musicArtist}
              </span>
            </div>
          </div>

          {/* Subtle Vertical Reel Position Bar Indicator (No arrows!) */}
          <div className="absolute right-1 top-1/3 -translate-y-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none opacity-60">
            {miniVideos.map((_, idx) => (
              <div
                key={idx}
                className={`w-1 rounded-full transition-all duration-300 ${
                  idx === activeMiniIndex
                    ? 'h-4 bg-white shadow-sm'
                    : 'h-1.5 bg-white/30'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Mini Comments Drawer */}
      <MiniCommentsDrawer
        mini={currentMini}
        isOpen={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
      />
    </div>
  );
};
