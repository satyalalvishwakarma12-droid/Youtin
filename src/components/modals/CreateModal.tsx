import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { PostAudience } from '../../types';
import {
  X,
  Image,
  Video,
  PlaySquare,
  Sparkles,
  Shield,
  Layers,
  BarChart2,
  Check,
  Plus
} from 'lucide-react';

export const CreateModal: React.FC = () => {
  const {
    isCreateOpen,
    setIsCreateOpen,
    createMenuType,
    setCreateMenuType,
    createPost,
    createStory,
    createMiniVideo,
    createLongVideo,
    currentUser,
    showToast,
    theme
  } = useApp();

  const isDark = theme === 'dark';

  // Common form state
  const [content, setContent] = useState('');
  const [audience, setAudience] = useState<PostAudience>('all_connections');
  const [selectedCircle, setSelectedCircle] = useState('Studio Collective');

  // Media presets for rich creation simulation
  const [selectedMediaUrl, setSelectedMediaUrl] = useState(
    'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1000&auto=format&fit=crop&q=80'
  );

  // Story specific
  const [hasStoryPoll, setHasStoryPoll] = useState(false);
  const [storyPollQuestion, setStoryPollQuestion] = useState('Should we organize an in-person salon?');

  // Mini specific
  const [musicTitle, setMusicTitle] = useState('Resonant Tides');
  const [musicArtist, setMusicArtist] = useState('Haven Ambient Lab');
  const [tagsInput, setTagsInput] = useState('design, craft, minimalism');

  // Long video specific
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoCategory, setVideoCategory] = useState('Design & Architecture');

  if (!isCreateOpen) return null;

  const sampleMediaLibrary = [
    { url: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1000&auto=format&fit=crop&q=80', label: 'Minimalist Architecture' },
    { url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1000&auto=format&fit=crop&q=80', label: 'Interior Light' },
    { url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1000&auto=format&fit=crop&q=80', label: 'Ceramics & Texture' },
    { url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1000&auto=format&fit=crop&q=80', label: 'Northern Twilight' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (createMenuType === 'post') {
      if (!content.trim()) return;
      createPost({
        content,
        mediaUrls: selectedMediaUrl ? [selectedMediaUrl] : [],
        type: selectedMediaUrl ? 'photo' : 'text',
        audience,
        circleName: audience === 'circle' ? selectedCircle : undefined
      });
      setIsCreateOpen(false);
      setContent('');
    } else if (createMenuType === 'story') {
      createStory({
        mediaUrl: selectedMediaUrl,
        type: 'photo',
        audience: audience === 'close_friends' ? 'close_friends' : 'all_connections',
        caption: content || undefined,
        poll: hasStoryPoll ? {
          question: storyPollQuestion,
          options: [
            { id: '1', text: 'Yes, absolutely', votes: 0 },
            { id: '2', text: 'Prefer digital', votes: 0 }
          ]
        } : undefined
      });
      setIsCreateOpen(false);
      setContent('');
    } else if (createMenuType === 'mini') {
      createMiniVideo({
        caption: content || 'Intentional rhythm and spatial focus.',
        tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
        musicTitle,
        musicArtist
      });
      setIsCreateOpen(false);
      setContent('');
    } else if (createMenuType === 'long_video') {
      if (!videoTitle.trim()) return;
      createLongVideo({
        title: videoTitle,
        description: videoDescription || 'Deep dive into spatial acoustics and intentional aesthetics.',
        category: videoCategory,
        thumbnailUrl: selectedMediaUrl,
        duration: '14:20',
        durationSeconds: 860,
        chapters: [
          { title: 'Prologue & Philosophy', time: 0 },
          { title: 'Material Architecture', time: 180 },
          { title: 'The Future of Connection', time: 480 },
        ]
      });
      setIsCreateOpen(false);
      setVideoTitle('');
      setVideoDescription('');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-2xl p-3 sm:p-5 overflow-y-auto">
        <div className="absolute inset-0" onClick={() => setIsCreateOpen(false)} />

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          className={`relative z-10 w-full max-w-xl rounded-3xl p-6 sm:p-7 shadow-2xl border ${
            isDark
              ? 'bg-[#0f1422] border-white/10 text-white shadow-black/90'
              : 'bg-white border-black/10 text-slate-900 shadow-slate-300/60'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight">Create & Share</span>
              <span className="text-xs text-slate-400">• Haven Intentional</span>
            </div>
            <button
              onClick={() => setIsCreateOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Creation Mode Tabs */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 my-4">
            <button
              type="button"
              onClick={() => setCreateMenuType('post')}
              className={`p-2.5 rounded-2xl flex flex-col items-center gap-1.5 border transition-all cursor-pointer ${
                createMenuType === 'post'
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                  : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white'
              }`}
            >
              <Image className="w-5 h-5" />
              <span className="text-[11px]">Post</span>
            </button>

            <button
              type="button"
              onClick={() => setCreateMenuType('story')}
              className={`p-2.5 rounded-2xl flex flex-col items-center gap-1.5 border transition-all cursor-pointer ${
                createMenuType === 'story'
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                  : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-[11px]">Story</span>
            </button>

            <button
              type="button"
              onClick={() => setCreateMenuType('mini')}
              className={`p-2.5 rounded-2xl flex flex-col items-center gap-1.5 border transition-all cursor-pointer ${
                createMenuType === 'mini'
                  ? 'bg-purple-500/20 border-purple-400 text-purple-300 font-bold'
                  : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white'
              }`}
            >
              <PlaySquare className="w-5 h-5" />
              <span className="text-[11px]">Mini Video</span>
            </button>

            {currentUser.accountType === 'creator' && (
              <button
                type="button"
                onClick={() => setCreateMenuType('long_video')}
                className={`p-2.5 rounded-2xl flex flex-col items-center gap-1.5 border transition-all cursor-pointer ${
                  createMenuType === 'long_video'
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                    : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white'
                }`}
              >
                <Video className="w-5 h-5" />
                <span className="text-[11px]">4K Video</span>
              </button>
            )}
          </div>

          {/* Creation Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Long Video specifics */}
            {createMenuType === 'long_video' ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Video Title</label>
                  <input
                    type="text"
                    required
                    value={videoTitle}
                    onChange={e => setVideoTitle(e.target.value)}
                    placeholder="e.g. Masterclass: Tactile Interfaces & Digital Restraint"
                    className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Description & Chapters</label>
                  <textarea
                    rows={3}
                    value={videoDescription}
                    onChange={e => setVideoDescription(e.target.value)}
                    placeholder="Provide context, research references, and timestamps..."
                    className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Category</label>
                  <select
                    value={videoCategory}
                    onChange={e => setVideoCategory(e.target.value)}
                    className="w-full bg-[#151b2c] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="Design & Architecture">Design & Architecture</option>
                    <option value="Technology & Philosophy">Technology & Philosophy</option>
                    <option value="Art & Materiality">Art & Materiality</option>
                    <option value="Sound Design & Music">Sound Design & Music</option>
                  </select>
                </div>
              </div>
            ) : (
              /* Post / Story / Mini content textarea */
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">
                  {createMenuType === 'story' ? 'Story Caption (optional)' : 'What would you like to share with your connections?'}
                </label>
                <textarea
                  rows={3}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder={
                    createMenuType === 'mini'
                      ? 'Caption for your Mini vertical video...'
                      : createMenuType === 'story'
                      ? 'Ephemeral 24-hour caption...'
                      : 'Write an intentional post...'
                  }
                  className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>
            )}

            {/* Audience Ring Picker (Only for Post & Story) */}
            {(createMenuType === 'post' || createMenuType === 'story') && (
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.07] space-y-2">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-cyan-400" /> Choose Audience Ring:
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAudience('all_connections')}
                    className={`p-2.5 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                      audience === 'all_connections'
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold'
                        : 'bg-white/[0.03] border-white/10 text-slate-400'
                    }`}
                  >
                    <span className="block font-bold">All Connections</span>
                    <span className="text-[10px] text-slate-400 opacity-80">Verified social network</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAudience('close_friends')}
                    className={`p-2.5 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                      audience === 'close_friends'
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-semibold'
                        : 'bg-white/[0.03] border-white/10 text-slate-400'
                    }`}
                  >
                    <span className="block font-bold">Close Friends 🌿</span>
                    <span className="text-[10px] text-slate-400 opacity-80">Inner circle only</span>
                  </button>
                </div>
              </div>
            )}

            {/* Story Poll Toggle */}
            {createMenuType === 'story' && (
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.07] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <BarChart2 className="w-3.5 h-3.5 text-purple-400" /> Interactive Poll Sticker
                  </span>
                  <input
                    type="checkbox"
                    checked={hasStoryPoll}
                    onChange={e => setHasStoryPoll(e.target.checked)}
                    className="rounded accent-cyan-500 cursor-pointer"
                  />
                </div>
                {hasStoryPoll && (
                  <input
                    type="text"
                    value={storyPollQuestion}
                    onChange={e => setStoryPollQuestion(e.target.value)}
                    placeholder="Enter poll question..."
                    className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
                  />
                )}
              </div>
            )}

            {/* Media Selector Preview */}
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-2">Select Visual Master Asset</label>
              <div className="grid grid-cols-4 gap-2">
                {sampleMediaLibrary.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedMediaUrl(item.url)}
                    className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                      selectedMediaUrl === item.url
                        ? 'border-cyan-400 scale-105 shadow-md shadow-cyan-500/30'
                        : 'border-transparent opacity-60 hover:opacity-90'
                    }`}
                  >
                    <img src={item.url} alt={item.label} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    {selectedMediaUrl === item.url && (
                      <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white drop-shadow" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3 border-t border-white/[0.08] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/30 transition-all cursor-pointer"
              >
                Publish Intentionally
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
