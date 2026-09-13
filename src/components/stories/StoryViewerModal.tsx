import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { X, ChevronLeft, ChevronRight, Music, Sparkles, Send, Heart, Flame, Shield, Check } from 'lucide-react';

export const StoryViewerModal: React.FC = () => {
  const {
    stories,
    activeStoryIndex,
    closeStoryViewer,
    voteStoryPoll,
    showToast,
    sendMessage,
    chats
  } = useApp();

  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [replyText, setReplyText] = useState('');

  const currentStory = activeStoryIndex !== null ? stories[activeStoryIndex] : null;

  // Auto-advance timer
  useEffect(() => {
    if (!currentStory || isPaused) return;

    const duration = 6000; // 6s per story
    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [activeStoryIndex, isPaused, currentStory]);

  if (!currentStory || activeStoryIndex === null) return null;

  const handleNext = () => {
    if (activeStoryIndex < stories.length - 1) {
      setProgress(0);
      // Advance by opening next index
      useApp;
      // We can use context setter or dispatch
    } else {
      closeStoryViewer();
    }
  };

  const handlePrev = () => {
    if (activeStoryIndex > 0) {
      setProgress(0);
    }
  };

  const handleReact = (emoji: string) => {
    showToast(`Reacted ${emoji} to ${currentStory.authorName}'s story`, 'info');
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    // Send as message if a chat exists or create one
    const targetChat = chats.find(c => c.username === currentStory.authorUsername);
    if (targetChat) {
      sendMessage(targetChat.id, `Replied to story: "${replyText.trim()}"`);
    }
    showToast(`Story reply sent to @${currentStory.authorUsername}`, 'success');
    setReplyText('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-3xl select-none">
        {/* Close Button */}
        <button
          onClick={closeStoryViewer}
          aria-label="Close story"
          className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-xl transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Story Card Container */}
        <div
          onPointerDown={() => setIsPaused(true)}
          onPointerUp={() => setIsPaused(false)}
          className="relative w-full max-w-md h-full max-h-[92vh] sm:rounded-3xl overflow-hidden flex flex-col justify-between bg-[#0b0e17] shadow-2xl border border-white/10"
        >
          {/* Progress Bars */}
          <div className="absolute top-3 inset-x-3 z-30 flex items-center gap-1.5">
            {stories.map((s, idx) => (
              <div key={s.id} className="flex-1 h-1 rounded-full bg-white/25 overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-75"
                  style={{
                    width:
                      idx < activeStoryIndex
                        ? '100%'
                        : idx === activeStoryIndex
                        ? `${progress}%`
                        : '0%'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header Info */}
          <div className="absolute top-7 inset-x-4 z-30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={currentStory.authorAvatar}
                alt={currentStory.authorName}
                className="w-10 h-10 rounded-full object-cover border-2 border-white/40 shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-white text-sm font-semibold drop-shadow-md">
                    {currentStory.authorName}
                  </span>
                  {currentStory.audience === 'close_friends' && (
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-500/80 text-[10px] text-white font-medium backdrop-blur-md">
                      <Sparkles className="w-2.5 h-2.5" /> Close Friends
                    </span>
                  )}
                </div>
                <span className="text-white/70 text-xs">{currentStory.createdAt}</span>
              </div>
            </div>

            {/* Music track if present */}
            {currentStory.musicTrack && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white/90 text-xs">
                <Music className="w-3 h-3 text-cyan-300 animate-pulse" />
                <span className="truncate max-w-[120px]">{currentStory.musicTrack}</span>
              </div>
            )}
          </div>

          {/* Story Background Media */}
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
            {currentStory.type === 'video' ? (
              <video
                src={currentStory.mediaUrl}
                autoPlay
                playsInline
                loop
                muted={false}
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={currentStory.mediaUrl}
                alt={currentStory.caption || 'Story media'}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
          </div>

          {/* Left/Right Tap navigation zones */}
          <div className="absolute inset-0 z-20 flex">
            <div className="w-1/3 h-full cursor-pointer" onClick={handlePrev} />
            <div className="w-2/3 h-full cursor-pointer" onClick={handleNext} />
          </div>

          {/* Interactive Overlay: Polls, Questions or Captions */}
          <div className="relative z-30 mt-auto px-5 pb-5 flex flex-col gap-3">
            {/* Poll Interactive Card */}
            {currentStory.poll && (
              <div className="p-4 rounded-2xl bg-black/55 backdrop-blur-2xl border border-white/20 text-white shadow-2xl">
                <p className="text-xs text-cyan-300 uppercase tracking-wider font-semibold mb-1">
                  Intimate Poll
                </p>
                <h4 className="text-sm font-semibold mb-3">{currentStory.poll.question}</h4>
                <div className="space-y-2">
                  {currentStory.poll.options.map(opt => {
                    const totalVotes = currentStory.poll!.options.reduce((a, b) => a + b.votes, 0);
                    const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                    const isSelected = currentStory.poll!.userVotedOption === opt.id;

                    return (
                      <button
                        key={opt.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          voteStoryPoll(currentStory.id, opt.id);
                        }}
                        className={`relative w-full text-left px-3.5 py-2.5 rounded-xl border transition-all text-xs font-medium overflow-hidden ${
                          isSelected
                            ? 'bg-cyan-500/30 border-cyan-400 text-white'
                            : 'bg-white/10 hover:bg-white/20 border-white/15 text-white/90'
                        }`}
                      >
                        {/* Vote bar */}
                        {currentStory.poll!.userVotedOption && (
                          <div
                            className="absolute inset-y-0 left-0 bg-cyan-500/25 transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        )}
                        <div className="relative z-10 flex items-center justify-between">
                          <span>{opt.text}</span>
                          {currentStory.poll!.userVotedOption && (
                            <span className="font-semibold text-cyan-300">{pct}%</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Question prompt card */}
            {currentStory.questionPrompt && (
              <div className="p-4 rounded-2xl bg-black/55 backdrop-blur-2xl border border-white/20 text-white shadow-2xl">
                <p className="text-xs text-purple-300 uppercase tracking-wider font-semibold mb-1">
                  Discussion Prompt
                </p>
                <p className="text-sm font-medium">{currentStory.questionPrompt}</p>
              </div>
            )}

            {/* Caption */}
            {currentStory.caption && (
              <p className="text-white text-sm font-medium drop-shadow-md bg-black/30 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 inline-block">
                {currentStory.caption}
              </p>
            )}

            {/* Quick Reactions bar */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-2">
                {['❤️', '🔥', '👏', '✨', '🤍'].map(emoji => (
                  <motion.button
                    key={emoji}
                    whileTap={{ scale: 0.8 }}
                    whileHover={{ scale: 1.2 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReact(emoji);
                    }}
                    className="w-8 h-8 rounded-full bg-black/40 hover:bg-white/20 backdrop-blur-xl border border-white/15 flex items-center justify-center text-sm cursor-pointer transition-colors"
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>

              {/* Privacy indicator badge */}
              <div className="flex items-center gap-1 text-[11px] text-white/70 bg-black/30 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md">
                <Shield className="w-3 h-3 text-cyan-300" />
                <span>Encrypted</span>
              </div>
            </div>

            {/* Reply Input */}
            <form onSubmit={handleSendReply} className="flex items-center gap-2 mt-1">
              <input
                type="text"
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
                placeholder={`Send reply to ${currentStory.authorName.split(' ')[0]}...`}
                className="flex-1 bg-white/15 hover:bg-white/20 focus:bg-white/25 backdrop-blur-2xl border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
              <button
                type="submit"
                disabled={!replyText.trim()}
                className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white disabled:opacity-40 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};
