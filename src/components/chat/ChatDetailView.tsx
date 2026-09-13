import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import {
  ChevronLeft,
  Pin,
  Send,
  Mic,
  Image as ImageIcon,
  Paperclip,
  Smile,
  CheckCheck,
  Play,
  Pause,
  BarChart2,
  ShieldCheck,
  MoreVertical
} from 'lucide-react';

export const ChatDetailView: React.FC = () => {
  const {
    chats,
    activeChatId,
    setActiveChatId,
    sendMessage,
    addReaction,
    voteChatPoll,
    showToast,
    theme
  } = useApp();

  const isDark = theme === 'dark';
  const [inputText, setInputText] = useState('');
  const [isPlayingVoice, setIsPlayingVoice] = useState<string | null>(null);
  const [showEmojiPickerFor, setShowEmojiPickerFor] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find(c => c.id === activeChatId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages]);

  if (!currentChat) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(currentChat.id, inputText.trim());
    setInputText('');
  };

  const handleSendVoiceSimulation = () => {
    sendMessage(currentChat.id, 'Voice message', {
      isVoice: true,
      voiceDuration: '0:28'
    });
    showToast('Encrypted voice note recorded & sent', 'success');
  };

  const handleSendImageSimulation = () => {
    sendMessage(currentChat.id, 'Sharing architectural light study', {
      mediaUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
      mediaType: 'image'
    });
    showToast('Encrypted media photo sent', 'success');
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-[#0b0e17] text-white">
      {/* Top Bar */}
      <header className={`px-4 py-3 border-b flex items-center justify-between backdrop-blur-2xl ${
        isDark
          ? 'bg-[#0f1422]/90 border-white/[0.08]'
          : 'bg-white/90 border-black/[0.08] text-slate-900'
      }`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveChatId(null)}
            className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="relative">
            <img
              src={currentChat.avatar}
              alt={currentChat.name}
              className="w-10 h-10 rounded-xl object-cover border border-white/20 shadow-sm"
              referrerPolicy="no-referrer"
            />
            {currentChat.type === 'direct' && currentChat.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0f1422]" />
            )}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-tight">{currentChat.name}</span>
              {currentChat.verified && <span className="text-cyan-400 text-xs">✓</span>}
            </div>
            <span className="text-[11px] text-slate-400">
              {currentChat.type === 'channel'
                ? `${currentChat.membersCount?.toLocaleString()} subscribers`
                : currentChat.type === 'group'
                ? `${currentChat.membersCount} members`
                : currentChat.isOnline
                ? 'Online • Encrypted'
                : 'Last seen recently'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-semibold">
            <ShieldCheck className="w-3 h-3" />
            <span>P2P Encrypted</span>
          </div>
          <button
            onClick={() => showToast('Chat details & shared media archive', 'info')}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Pinned Message Banner */}
      {currentChat.pinnedMessages && currentChat.pinnedMessages.length > 0 && (
        <div className={`px-4 py-2 border-b flex items-center justify-between text-xs backdrop-blur-md ${
          isDark ? 'bg-cyan-950/20 border-cyan-500/20 text-cyan-200' : 'bg-cyan-50 border-cyan-200 text-cyan-900'
        }`}>
          <div className="flex items-center gap-2 truncate">
            <Pin className="w-3.5 h-3.5 text-cyan-400 shrink-0 rotate-45" />
            <span className="font-semibold text-[11px] uppercase tracking-wider text-cyan-400 shrink-0">
              Pinned:
            </span>
            <span className="truncate">{currentChat.pinnedMessages[0].text}</span>
          </div>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
        {currentChat.messages.map((msg) => {
          const isOutgoing = msg.isOutgoing;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isOutgoing ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-end gap-2 max-w-[85%] sm:max-w-[70%]">
                {!isOutgoing && (
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-7 h-7 rounded-full object-cover shrink-0 mb-1"
                    referrerPolicy="no-referrer"
                  />
                )}

                <div
                  className={`relative rounded-2xl p-3.5 shadow-lg backdrop-blur-xl border transition-all ${
                    isOutgoing
                      ? 'bg-gradient-to-br from-cyan-600/80 to-blue-600/80 border-cyan-400/30 text-white rounded-br-sm'
                      : isDark
                      ? 'bg-[#151b2c]/85 border-white/[0.08] text-slate-100 rounded-bl-sm'
                      : 'bg-white/95 border-black/[0.08] text-slate-900 rounded-bl-sm shadow-slate-200'
                  }`}
                >
                  {/* Sender name for groups/channels */}
                  {!isOutgoing && currentChat.type !== 'direct' && (
                    <p className="text-[11px] font-bold text-cyan-400 mb-1">{msg.senderName}</p>
                  )}

                  {/* Photo attachment if present */}
                  {msg.mediaUrl && (
                    <div className="rounded-xl overflow-hidden mb-2 max-h-60">
                      <img
                        src={msg.mediaUrl}
                        alt="Attachment"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  {/* Voice note rendering */}
                  {msg.isVoice ? (
                    <div className="flex items-center gap-3 py-1">
                      <button
                        onClick={() => setIsPlayingVoice(isPlayingVoice === msg.id ? null : msg.id)}
                        className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all cursor-pointer shrink-0"
                      >
                        {isPlayingVoice === msg.id ? (
                          <Pause className="w-4 h-4 fill-white" />
                        ) : (
                          <Play className="w-4 h-4 ml-0.5 fill-white" />
                        )}
                      </button>

                      {/* Simulated wave bars */}
                      <div className="flex items-center gap-1 h-6 flex-1">
                        {[40, 65, 30, 85, 95, 50, 75, 45, 90, 60, 35, 70, 55, 80].map((h, i) => (
                          <div
                            key={i}
                            className={`w-1 rounded-full transition-all duration-300 ${
                              isPlayingVoice === msg.id ? 'bg-cyan-300 animate-pulse' : 'bg-white/40'
                            }`}
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>

                      <span className="text-[10px] font-mono text-white/80 shrink-0">
                        {msg.voiceDuration || '0:30'}
                      </span>
                    </div>
                  ) : (
                    /* Text message */
                    <p className="text-xs leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  )}

                  {/* Poll rendering if inside message */}
                  {msg.poll && (
                    <div className="mt-2.5 p-3 rounded-xl bg-black/25 border border-white/10 text-white space-y-2">
                      <div className="flex items-center gap-1.5 text-cyan-300 text-xs font-semibold">
                        <BarChart2 className="w-3.5 h-3.5" />
                        <span>{msg.poll.question}</span>
                      </div>
                      <div className="space-y-1.5">
                        {msg.poll.options.map(opt => {
                          const totalVotes = msg.poll!.options.reduce((a, b) => a + b.votes, 0);
                          const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                          const hasVoted = msg.poll!.userVoted === opt.id;

                          return (
                            <button
                              key={opt.id}
                              onClick={() => voteChatPoll(currentChat.id, msg.id, opt.id)}
                              className={`relative w-full text-left px-3 py-2 rounded-lg text-xs font-medium border transition-all overflow-hidden ${
                                hasVoted
                                  ? 'bg-cyan-500/30 border-cyan-400 text-white'
                                  : 'bg-white/10 hover:bg-white/15 border-white/10 text-white/90'
                              }`}
                            >
                              <div
                                className="absolute inset-y-0 left-0 bg-cyan-500/20"
                                style={{ width: `${pct}%` }}
                              />
                              <div className="relative z-10 flex items-center justify-between">
                                <span>{opt.text}</span>
                                <span className="font-semibold text-[10px]">{pct}%</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Timestamp & Read state */}
                  <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-white/60">
                    <span>{msg.timestamp}</span>
                    {isOutgoing && <CheckCheck className="w-3 h-3 text-cyan-300" />}
                  </div>
                </div>
              </div>

              {/* Reactions row */}
              <div className="flex items-center gap-1 mt-1 px-2">
                {msg.reactions.map((r, ri) => (
                  <button
                    key={ri}
                    onClick={() => addReaction(currentChat.id, msg.id, r.emoji)}
                    className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 border transition-all cursor-pointer ${
                      r.reactedByMe
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                        : 'bg-white/10 hover:bg-white/15 border-white/10 text-white'
                    }`}
                  >
                    <span>{r.emoji}</span>
                    <span className="text-[10px] font-semibold">{r.count}</span>
                  </button>
                ))}

                {/* Reaction button */}
                <button
                  onClick={() => setShowEmojiPickerFor(showEmojiPickerFor === msg.id ? null : msg.id)}
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors text-xs"
                >
                  <Smile className="w-3.5 h-3.5" />
                </button>

                {/* Emoji Quick Picker Popup */}
                {showEmojiPickerFor === msg.id && (
                  <div className="flex items-center gap-1 bg-[#151b2c] p-1 rounded-full border border-white/20 shadow-xl z-20">
                    {['❤️', '👍', '🔥', '✨', '⚡', '👏'].map(em => (
                      <button
                        key={em}
                        onClick={() => {
                          addReaction(currentChat.id, msg.id, em);
                          setShowEmojiPickerFor(null);
                        }}
                        className="p-1 text-xs hover:scale-125 transition-transform"
                      >
                        {em}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <footer className={`p-3 border-t backdrop-blur-2xl ${
        isDark ? 'bg-[#0f1422]/90 border-white/[0.08]' : 'bg-white/90 border-black/[0.08]'
      }`}>
        <form onSubmit={handleSend} className="max-w-2xl mx-auto flex items-center gap-2">
          <button
            type="button"
            onClick={handleSendImageSimulation}
            title="Attach Image"
            className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 transition-colors cursor-pointer"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleSendVoiceSimulation}
            title="Record Voice Note"
            className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 transition-colors cursor-pointer"
          >
            <Mic className="w-4 h-4 text-cyan-400" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="Type an end-to-end encrypted message..."
            className="flex-1 bg-white/[0.07] focus:bg-white/[0.1] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white disabled:opacity-40 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </footer>
    </div>
  );
};
