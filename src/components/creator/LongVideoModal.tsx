import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { LongVideo } from '../../types';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Heart,
  Bookmark,
  Share2,
  ListPlus,
  Send,
  Eye,
  Clock,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const LongVideoModal: React.FC = () => {
  const {
    activeLongVideo,
    setActiveLongVideo,
    longVideos,
    toggleLikeLongVideo,
    toggleSaveLongVideo,
    addLongVideoComment,
    connectionStates,
    sendConnectionRequest,
    openUserProfile,
    allKnownUsers,
    showToast,
    theme
  } = useApp();

  const isDark = theme === 'dark';
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [commentInput, setCommentInput] = useState('');
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  if (!activeLongVideo) return null;

  const author = allKnownUsers.find(u => u.id === activeLongVideo.authorId);
  const connectionState = connectionStates[activeLongVideo.authorId] || 'not_connected';

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

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      // Determine active chapter
      const ct = videoRef.current.currentTime;
      for (let i = activeLongVideo.chapters.length - 1; i >= 0; i--) {
        if (ct >= activeLongVideo.chapters[i].time) {
          setActiveChapterIndex(i);
          break;
        }
      }
    }
  };

  const jumpToChapter = (timeInSec: number, index: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timeInSec;
      setActiveChapterIndex(index);
      if (!isPlaying) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addLongVideoComment(activeLongVideo.id, commentInput.trim());
    setCommentInput('');
  };

  const formatSec = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl overflow-y-auto p-2 sm:p-4">
        {/* Close Modal */}
        <button
          onClick={() => setActiveLongVideo(null)}
          aria-label="Close long-form video player"
          className="fixed top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-xl transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className={`relative w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border my-auto ${
          isDark ? 'bg-[#0b0e17] border-white/10 text-white' : 'bg-white border-black/10 text-slate-900'
        }`}>
          {/* Video Player Stage */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src={activeLongVideo.videoUrl}
              poster={activeLongVideo.thumbnailUrl}
              playsInline
              autoPlay
              onTimeUpdate={handleTimeUpdate}
              className="w-full h-full object-contain"
            />

            {/* Custom Video Control Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col gap-2">
              {/* Progress Scrubber */}
              <div
                className="w-full h-1.5 bg-white/30 rounded-full cursor-pointer relative overflow-hidden"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickPos = (e.clientX - rect.left) / rect.width;
                  if (videoRef.current) {
                    videoRef.current.currentTime = clickPos * (videoRef.current.duration || activeLongVideo.durationSeconds);
                  }
                }}
              >
                <div
                  className="h-full bg-cyan-400"
                  style={{
                    width: `${videoRef.current && videoRef.current.duration ? (currentTime / videoRef.current.duration) * 100 : 25}%`
                  }}
                />
              </div>

              {/* Controls bar */}
              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-3">
                  <button onClick={togglePlay} className="p-1.5 hover:text-cyan-400 transition-colors">
                    {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
                  </button>
                  <button onClick={() => setIsMuted(!isMuted)} className="p-1.5 hover:text-cyan-400 transition-colors">
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="font-mono text-[11px] text-white/80">
                    {formatSec(currentTime)} / {activeLongVideo.duration}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block text-[11px] font-semibold text-cyan-300 bg-cyan-500/20 px-2.5 py-0.5 rounded-full border border-cyan-400/30">
                    4K MASTER
                  </span>
                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        if (document.fullscreenElement) {
                          document.exitFullscreen();
                        } else {
                          videoRef.current.requestFullscreen();
                        }
                      }
                    }}
                    className="p-1.5 hover:text-cyan-400 transition-colors"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Chapters Grid */}
          <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Info, Actions & Comments */}
            <div className="lg:col-span-2 space-y-5">
              <div>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  {activeLongVideo.category} • {activeLongVideo.playlistTitle || 'Creator Channel'}
                </span>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight mt-1 mb-2">
                  {activeLongVideo.title}
                </h1>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{activeLongVideo.views.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{activeLongVideo.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* Creator bar with Connect button */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => author && openUserProfile(author)}
                >
                  <img
                    src={activeLongVideo.authorAvatar}
                    alt={activeLongVideo.authorName}
                    className="w-11 h-11 rounded-full object-cover border border-white/20"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm">{activeLongVideo.authorName}</span>
                      <span className="text-[11px] text-cyan-400">✓</span>
                    </div>
                    <span className="text-xs text-slate-400">@{activeLongVideo.authorUsername}</span>
                  </div>
                </div>

                {connectionState === 'connected' ? (
                  <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                    Connected
                  </span>
                ) : (
                  <button
                    onClick={() => sendConnectionRequest(activeLongVideo.authorId)}
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-semibold shadow transition-all cursor-pointer"
                  >
                    {connectionState === 'requested' ? 'Requested' : 'Connect'}
                  </button>
                )}
              </div>

              {/* Action Toolbar: Like, Save, Playlist, Share */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => toggleLikeLongVideo(activeLongVideo.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    activeLongVideo.isLiked
                      ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                      : 'bg-white/[0.06] border-white/10 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${activeLongVideo.isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{activeLongVideo.likes}</span>
                </button>

                <button
                  onClick={() => toggleSaveLongVideo(activeLongVideo.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                    activeLongVideo.isSaved
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                      : 'bg-white/[0.06] border-white/10 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${activeLongVideo.isSaved ? 'fill-cyan-400' : ''}`} />
                  <span>{activeLongVideo.saves}</span>
                </button>

                <button
                  onClick={() => showToast('Saved to Creator Playlist', 'success')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/[0.06] border border-white/10 hover:bg-white/10 text-slate-300 cursor-pointer"
                >
                  <ListPlus className="w-4 h-4" />
                  <span>Playlist</span>
                </button>

                <button
                  onClick={() => showToast('Video link copied to clipboard', 'info')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/[0.06] border border-white/10 hover:bg-white/10 text-slate-300 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>

              {/* Description */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                {activeLongVideo.description}
              </div>

              {/* Discussion / Comments */}
              <div className="pt-3 border-t border-white/[0.08]">
                <h3 className="font-bold text-sm mb-3">
                  Discussion ({activeLongVideo.comments.length})
                </h3>

                <form onSubmit={handleAddComment} className="flex items-center gap-2 mb-4">
                  <input
                    type="text"
                    value={commentInput}
                    onChange={e => setCommentInput(e.target.value)}
                    placeholder="Add to the masterclass conversation..."
                    className="flex-1 bg-white/[0.06] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                  <button
                    type="submit"
                    disabled={!commentInput.trim()}
                    className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white disabled:opacity-40 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                <div className="space-y-3">
                  {activeLongVideo.comments.map(c => (
                    <div key={c.id} className="flex items-start gap-2.5 text-xs">
                      <img
                        src={c.authorAvatar}
                        alt={c.authorName}
                        className="w-7 h-7 rounded-full object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="font-semibold text-slate-200">{c.authorName}</span>
                          <span className="text-[10px] text-slate-500">{c.createdAt}</span>
                        </div>
                        <p className="text-slate-300 mt-0.5">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 1 Col: Video Chapters & Related masterclasses */}
            <div className="space-y-5">
              {/* Chapters list */}
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
                <h4 className="font-bold text-xs uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Chapters
                </h4>
                <div className="space-y-1.5">
                  {activeLongVideo.chapters.map((ch, idx) => (
                    <button
                      key={idx}
                      onClick={() => jumpToChapter(ch.time, idx)}
                      className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                        activeChapterIndex === idx
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-semibold'
                          : 'hover:bg-white/[0.05] text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="truncate">{ch.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Related Videos */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">
                  More From Channels
                </h4>
                <div className="space-y-3">
                  {longVideos
                    .filter(v => v.id !== activeLongVideo.id)
                    .map(rel => (
                      <div
                        key={rel.id}
                        onClick={() => setActiveLongVideo(rel)}
                        className="flex gap-3 p-2 rounded-xl hover:bg-white/[0.05] cursor-pointer transition-colors"
                      >
                        <div className="relative w-28 aspect-video rounded-lg overflow-hidden bg-black shrink-0">
                          <img
                            src={rel.thumbnailUrl}
                            alt={rel.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/80 text-[9px] font-mono text-white">
                            {rel.duration}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-semibold text-xs text-white line-clamp-2 leading-tight mb-1">
                            {rel.title}
                          </h5>
                          <span className="text-[10px] text-slate-400 block">{rel.authorName}</span>
                          <span className="text-[10px] text-slate-500">{rel.views.toLocaleString()} views</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};
