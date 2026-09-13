import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Story } from '../../types';
import { Sparkles, Plus } from 'lucide-react';

export const StoryRingItem: React.FC<{
  story: Story;
  isCurrentUser?: boolean;
}> = ({ story, isCurrentUser = false }) => {
  const { openStoryViewer, setIsCreateOpen, setCreateMenuType, theme, customTheme } = useApp();
  const isDark = theme === 'dark';

  const isCloseFriends = story.audience === 'close_friends';

  const handleClick = () => {
    if (isCurrentUser && !story.isViewed && story.id === 'story_current_user') {
      openStoryViewer(story.id);
    } else if (isCurrentUser) {
      setCreateMenuType('story');
      setIsCreateOpen(true);
    } else {
      openStoryViewer(story.id);
    }
  };

  return (
    <div className="flex flex-col items-center gap-1 shrink-0 cursor-pointer select-none" onClick={handleClick}>
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.94 }}
        className="relative"
      >
        {/* Instagram proportional story ring: 56px inner avatar, 62px ring */}
        <div
          className={`p-[2px] rounded-full transition-all duration-300 ${
            isCloseFriends
              ? 'bg-gradient-to-tr from-emerald-400 via-teal-300 to-green-500 shadow-sm shadow-emerald-500/20'
              : story.isViewed
              ? isDark
                ? 'bg-white/20'
                : 'bg-black/15'
              : 'shadow-sm'
          }`}
          style={{
            background:
              !isCloseFriends && !story.isViewed
                ? `linear-gradient(45deg, ${customTheme.accentColor}, #60a5fa, #c084fc)`
                : undefined
          }}
        >
          <div className={`p-[1.5px] rounded-full ${isDark ? 'bg-[#0b0e17]' : 'bg-white'}`}>
            <img
              src={story.authorAvatar}
              alt={story.authorName}
              className="w-[52px] h-[52px] rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Current user plus badge or close friends indicator */}
        {isCurrentUser ? (
          <div
            className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-[#0b0e17] flex items-center justify-center text-white shadow"
            style={{ backgroundColor: customTheme.accentColor }}
          >
            <Plus className="w-2.5 h-2.5 stroke-[3]" />
          </div>
        ) : isCloseFriends ? (
          <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0b0e17] flex items-center justify-center text-white shadow">
            <Sparkles className="w-2 h-2" />
          </div>
        ) : null}
      </motion.div>

      <span className={`text-[10.5px] tracking-tight truncate max-w-[62px] ${
        isDark ? 'text-slate-300' : 'text-slate-700'
      }`}>
        {isCurrentUser ? 'Your story' : story.authorName.split(' ')[0]}
      </span>
    </div>
  );
};

export const StoriesBar: React.FC = () => {
  const { stories, currentUser, setIsCreateOpen, setCreateMenuType, theme, customTheme } = useApp();
  const isDark = theme === 'dark';

  const userStory = stories.find(s => s.authorId === currentUser.id);

  return (
    <div className={`w-full py-2.5 px-3 rounded-2xl mb-3 backdrop-blur-2xl border transition-all ${
      isDark
        ? 'bg-[#0f1422]/70 border-white/[0.1]'
        : 'bg-white/80 border-black/[0.06]'
    }`}
    style={{
      boxShadow: `0 8px 24px -10px ${customTheme.accentColor}15, inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)`
    }}>
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-0.5">
        {/* Current User item */}
        {userStory ? (
          <StoryRingItem story={userStory} isCurrentUser={true} />
        ) : (
          <div
            className="flex flex-col items-center gap-1 shrink-0 cursor-pointer select-none"
            onClick={() => {
              setCreateMenuType('story');
              setIsCreateOpen(true);
            }}
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              className="relative p-[2px] rounded-full border border-dashed"
              style={{ borderColor: `${customTheme.accentColor}80` }}
            >
              <div className={`p-[1.5px] rounded-full ${isDark ? 'bg-[#0b0e17]' : 'bg-white'}`}>
                <img
                  src={currentUser.avatar}
                  alt={currentUser.displayName}
                  className="w-[52px] h-[52px] rounded-full object-cover opacity-85"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div
                className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-[#0b0e17] flex items-center justify-center text-white shadow"
                style={{ backgroundColor: customTheme.accentColor }}
              >
                <Plus className="w-2.5 h-2.5 stroke-[3]" />
              </div>
            </motion.div>
            <span className={`text-[10.5px] tracking-tight ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Your story
            </span>
          </div>
        )}

        {/* Connected stories */}
        {stories
          .filter(s => s.authorId !== currentUser.id)
          .map(story => (
            <StoryRingItem key={story.id} story={story} />
          ))}
      </div>
    </div>
  );
};
