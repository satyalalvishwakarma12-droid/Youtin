import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Search, Users, Radio, MessageSquare, Plus } from 'lucide-react';

export const ChatListView: React.FC = () => {
  const { chats, setActiveChatId, theme, customTheme, showToast } = useApp();
  const isDark = theme === 'dark';

  const [activeFilter, setActiveFilter] = useState<'all' | 'direct' | 'group' | 'channel'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChats = chats.filter(chat => {
    if (activeFilter !== 'all' && chat.type !== activeFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        chat.name.toLowerCase().includes(q) ||
        (chat.username && chat.username.toLowerCase().includes(q)) ||
        (chat.lastMessage && chat.lastMessage.text.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="w-full max-w-[480px] mx-auto px-3.5 pb-24 pt-2">
      {/* Instagram Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-[17px] font-bold tracking-tight">Messages</h2>
          <p className="text-[11px] text-slate-400">Encrypted intentional network</p>
        </div>

        <button
          onClick={() => showToast('New conversation or group', 'info')}
          className="p-2 rounded-xl transition-all cursor-pointer border"
          style={{
            backgroundColor: `${customTheme.accentColor}20`,
            borderColor: `${customTheme.accentColor}40`,
            color: customTheme.accentColor
          }}
          title="New Chat"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Search Input */}
      <div className={`relative flex items-center mb-3 rounded-xl border px-3 py-2 transition-all ${
        isDark
          ? 'bg-[#0f1422]/70 border-white/[0.09] text-white'
          : 'bg-white/85 border-black/[0.07] text-slate-900'
      }`}>
        <Search className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search chats, groups, channels..."
          className="w-full bg-transparent text-[12px] placeholder-slate-400 focus:outline-none"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 mb-3 overflow-x-auto no-scrollbar">
        {[
          { id: 'all', label: 'All' },
          { id: 'direct', label: 'Direct', icon: MessageSquare },
          { id: 'group', label: 'Groups', icon: Users },
          { id: 'channel', label: 'Channels', icon: Radio },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer border ${
              activeFilter === tab.id
                ? 'shadow-sm'
                : isDark
                ? 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-slate-200'
                : 'bg-black/[0.04] border-black/[0.06] text-slate-600 hover:text-slate-900'
            }`}
            style={
              activeFilter === tab.id
                ? {
                    backgroundColor: `${customTheme.accentColor}25`,
                    borderColor: `${customTheme.accentColor}50`,
                    color: customTheme.accentColor
                  }
                : undefined
            }
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Conversations List (Instagram DM list) */}
      <div className="space-y-1.5">
        {filteredChats.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No conversations match your filter.
          </div>
        ) : (
          filteredChats.map(chat => {
            const lastMsg = chat.messages[chat.messages.length - 1] || chat.lastMessage;

            return (
              <motion.div
                key={chat.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveChatId(chat.id)}
                className={`flex items-center gap-3 p-2.5 rounded-2xl cursor-pointer transition-all border ${
                  isDark
                    ? 'bg-[#0f1422]/65 hover:bg-[#141b2d] border-white/[0.07]'
                    : 'bg-white/80 hover:bg-slate-50 border-black/[0.06] shadow-sm'
                }`}
              >
                {/* Circular Avatar with Status */}
                <div className="relative shrink-0">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-11 h-11 rounded-full object-cover border border-white/10 shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  {chat.type === 'direct' && chat.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0b0e17]" />
                  )}
                  {chat.type === 'group' && (
                    <div className="absolute -bottom-0.5 -right-0.5 p-0.5 rounded-full bg-indigo-500 text-white text-[8px]">
                      <Users className="w-2.5 h-2.5" />
                    </div>
                  )}
                  {chat.type === 'channel' && (
                    <div className="absolute -bottom-0.5 -right-0.5 p-0.5 rounded-full bg-sky-500 text-white text-[8px]">
                      <Radio className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>

                {/* Info & Last message */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1 truncate">
                      <span className="font-bold text-[13px] truncate">{chat.name}</span>
                      {chat.verified && (
                        <span className="text-[10px]" style={{ color: customTheme.accentColor }}>✓</span>
                      )}
                    </div>
                    {lastMsg && (
                      <span className="text-[10px] text-slate-400 shrink-0 ml-2">
                        {lastMsg.timestamp}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[11.5px] text-slate-400 truncate">
                      {lastMsg?.isVoice ? (
                        <span className="font-medium" style={{ color: customTheme.accentColor }}>
                          🎤 Voice message ({lastMsg.voiceDuration || '0:30'})
                        </span>
                      ) : lastMsg?.mediaUrl ? (
                        <span>📷 Photo</span>
                      ) : lastMsg?.poll ? (
                        <span>📊 Poll: {lastMsg.poll.question}</span>
                      ) : (
                        lastMsg?.text
                      )}
                    </p>

                    {chat.unreadCount && chat.unreadCount > 0 ? (
                      <span
                        className="px-1.5 py-0.2 rounded-full text-[10px] font-bold text-white shrink-0"
                        style={{ backgroundColor: customTheme.accentColor }}
                      >
                        {chat.unreadCount}
                      </span>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};
