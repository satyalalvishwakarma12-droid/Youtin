import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  NavTab,
  AccountType,
  User,
  Post,
  Story,
  MiniVideo,
  LongVideo,
  ChatConversation,
  NotificationItem,
  EventItem,
  PrivacySettings,
  ConnectionState,
  ThemePreset,
  CustomThemeConfig
} from '../types';
import {
  CURRENT_USER,
  INITIAL_CONNECTED_USERS,
  SEARCHABLE_COMMUNITY_USERS,
  INITIAL_POSTS,
  INITIAL_STORIES,
  INITIAL_MINI_VIDEOS,
  INITIAL_LONG_VIDEOS,
  INITIAL_CHATS,
  INITIAL_NOTIFICATIONS,
  INITIAL_EVENTS
} from '../data/mockData';

interface ToastItem {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'privacy';
}

interface AppContextType {
  // Navigation & theme
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  customTheme: CustomThemeConfig;
  setCustomTheme: React.Dispatch<React.SetStateAction<CustomThemeConfig>>;
  setThemePreset: (preset: ThemePreset) => void;
  setThemeAccent: (color: string, name: string) => void;
  isThemeModalOpen: boolean;
  setIsThemeModalOpen: (open: boolean) => void;

  // User
  currentUser: User;
  switchAccountType: (type: AccountType) => void;
  updatePrivacySettings: (settings: Partial<PrivacySettings>) => void;
  updateCurrentUser: (updates: Partial<User>) => void;

  // Connections
  connectionStates: Record<string, ConnectionState>;
  sendConnectionRequest: (userId: string) => void;
  acceptConnectionRequest: (notifId?: string, userId?: string) => void;
  declineConnectionRequest: (notifId?: string, userId?: string) => void;
  removeConnection: (userId: string) => void;
  blockUser: (userId: string) => void;
  restrictedUserIds: string[];
  mutedUserIds: string[];
  allKnownUsers: User[];

  // Posts & Feed
  posts: Post[];
  activeCircleFilter: string | null;
  setActiveCircleFilter: (circleId: string | null) => void;
  toggleLikePost: (postId: string) => void;
  toggleSavePost: (postId: string) => void;
  repost: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  createPost: (newPost: {
    content: string;
    mediaUrls: string[];
    type: 'photo' | 'video' | 'carousel' | 'text';
    audience: 'all_connections' | 'close_friends' | 'family' | 'circle' | 'only_me';
    circleName?: string;
    location?: string;
  }) => void;

  // Stories
  stories: Story[];
  activeStoryIndex: number | null;
  openStoryViewer: (storyId: string) => void;
  closeStoryViewer: () => void;
  voteStoryPoll: (storyId: string, optionId: string) => void;
  addStory: (newStory: { mediaUrl: string; type: 'photo' | 'video'; caption?: string; audience: 'all_connections' | 'close_friends' | 'circle' }) => void;

  // Mini Videos
  miniVideos: MiniVideo[];
  activeMiniIndex: number;
  setActiveMiniIndex: (index: number) => void;
  toggleLikeMini: (miniId: string) => void;
  toggleSaveMini: (miniId: string) => void;
  isMiniMuted: boolean;
  setIsMiniMuted: (muted: boolean) => void;
  addMiniComment: (miniId: string, text: string) => void;

  // Long Videos (Creator)
  longVideos: LongVideo[];
  activeLongVideo: LongVideo | null;
  setActiveLongVideo: (video: LongVideo | null) => void;
  toggleLikeLongVideo: (videoId: string) => void;
  toggleSaveLongVideo: (videoId: string) => void;
  addLongVideoComment: (videoId: string, text: string) => void;
  createLongVideo: (data: {
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;
    category: string;
    duration: string;
  }) => void;

  // Chat
  chats: ChatConversation[];
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  sendMessage: (chatId: string, text: string, options?: { mediaUrl?: string; mediaType?: 'image' | 'video' | 'file' | 'audio'; isVoice?: boolean; voiceDuration?: string }) => void;
  addReaction: (chatId: string, messageId: string, emoji: string) => void;
  voteChatPoll: (chatId: string, messageId: string, optionId: string) => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotifsCount: number;
  markNotificationsAsRead: () => void;

  // Events
  events: EventItem[];
  rsvpEvent: (eventId: string, status: 'going' | 'maybe' | 'cant_go') => void;

  // Modals & Drawers
  isCreateOpen: boolean;
  setIsCreateOpen: (open: boolean) => void;
  createMenuType: 'post' | 'story' | 'mini' | 'long_video' | 'poll' | 'event' | null;
  setCreateMenuType: (type: 'post' | 'story' | 'mini' | 'long_video' | 'poll' | 'event' | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isPrivacyCenterOpen: boolean;
  setIsPrivacyCenterOpen: (open: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  isQrModalOpen: boolean;
  setIsQrModalOpen: (open: boolean) => void;
  isUpgradeCreatorModalOpen: boolean;
  setIsUpgradeCreatorModalOpen: (open: boolean) => void;
  selectedUserProfile: User | null;
  openUserProfile: (user: User) => void;
  closeUserProfile: () => void;

  // Toasts
  toasts: ToastItem[];
  showToast: (message: string, type?: 'info' | 'success' | 'privacy') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentUser, setCurrentUser] = useState<User>(CURRENT_USER);

  // Initial connection states for all known users
  const [connectionStates, setConnectionStates] = useState<Record<string, ConnectionState>>({
    'user_elena': 'connected',
    'user_marcus': 'connected',
    'user_maya': 'connected',
    'user_sora': 'connected',
    'user_kai': 'requested',
    'user_clara': 'not_connected'
  });

  const [restrictedUserIds, setRestrictedUserIds] = useState<string[]>([]);
  const [mutedUserIds, setMutedUserIds] = useState<string[]>([]);

  // Feed & Content
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [activeCircleFilter, setActiveCircleFilter] = useState<string | null>(null);
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

  // Mini
  const [miniVideos, setMiniVideos] = useState<MiniVideo[]>(INITIAL_MINI_VIDEOS);
  const [activeMiniIndex, setActiveMiniIndex] = useState<number>(0);
  const [isMiniMuted, setIsMiniMuted] = useState<boolean>(true);

  // Creator Long Video
  const [longVideos, setLongVideos] = useState<LongVideo[]>(INITIAL_LONG_VIDEOS);
  const [activeLongVideo, setActiveLongVideo] = useState<LongVideo | null>(null);

  // Chat
  const [chats, setChats] = useState<ChatConversation[]>(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Events
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);

  // Modals & Navigation Sheets
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createMenuType, setCreateMenuType] = useState<'post' | 'story' | 'mini' | 'long_video' | 'poll' | 'event' | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isPrivacyCenterOpen, setIsPrivacyCenterOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isUpgradeCreatorModalOpen, setIsUpgradeCreatorModalOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [selectedUserProfile, setSelectedUserProfile] = useState<User | null>(null);

  // Custom Theme State
  const [customTheme, setCustomTheme] = useState<CustomThemeConfig>({
    preset: 'obsidian',
    mode: 'dark',
    accentColor: '#06b6d4', // Cyan
    accentName: 'Liquid Cyan',
    glassBlur: 28,
    glassOpacity: 0.72,
    glassBorderTint: 'default'
  });

  const setThemePreset = (preset: ThemePreset) => {
    switch (preset) {
      case 'obsidian':
        setCustomTheme({
          preset: 'obsidian',
          mode: 'dark',
          accentColor: '#06b6d4',
          accentName: 'Liquid Cyan',
          glassBlur: 28,
          glassOpacity: 0.72,
          glassBorderTint: 'default'
        });
        setTheme('dark');
        break;
      case 'pearl':
        setCustomTheme({
          preset: 'pearl',
          mode: 'light',
          accentColor: '#0284c7',
          accentName: 'Pearl Azure',
          glassBlur: 28,
          glassOpacity: 0.82,
          glassBorderTint: 'vibrant'
        });
        setTheme('light');
        break;
      case 'emerald':
        setCustomTheme({
          preset: 'emerald',
          mode: 'dark',
          accentColor: '#10b981',
          accentName: 'Emerald Glass',
          glassBlur: 30,
          glassOpacity: 0.74,
          glassBorderTint: 'vibrant'
        });
        setTheme('dark');
        break;
      case 'amethyst':
        setCustomTheme({
          preset: 'amethyst',
          mode: 'dark',
          accentColor: '#c084fc',
          accentName: 'Amethyst Twilight',
          glassBlur: 32,
          glassOpacity: 0.74,
          glassBorderTint: 'vibrant'
        });
        setTheme('dark');
        break;
      case 'sunset':
        setCustomTheme({
          preset: 'sunset',
          mode: 'dark',
          accentColor: '#f97316',
          accentName: 'Sunset Coral',
          glassBlur: 28,
          glassOpacity: 0.72,
          glassBorderTint: 'vibrant'
        });
        setTheme('dark');
        break;
      case 'cyber':
        setCustomTheme({
          preset: 'cyber',
          mode: 'dark',
          accentColor: '#94a3b8',
          accentName: 'Titanium Glass',
          glassBlur: 24,
          glassOpacity: 0.70,
          glassBorderTint: 'minimal'
        });
        setTheme('dark');
        break;
    }
  };

  const setThemeAccent = (color: string, name: string) => {
    setCustomTheme(prev => ({
      ...prev,
      accentColor: color,
      accentName: name
    }));
  };

  // Toasts
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (message: string, type: 'info' | 'success' | 'privacy' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      setCustomTheme(c => ({ ...c, mode: next, preset: next === 'light' ? 'pearl' : 'obsidian' }));
      return next;
    });
  };

  const switchAccountType = (type: AccountType) => {
    setCurrentUser(prev => ({
      ...prev,
      accountType: type,
      isCreator: type === 'creator'
    }));
    showToast(`Switched account to ${type === 'creator' ? 'Creator Account ✨' : 'Private Account 🔒'}`, 'success');
  };

  const updatePrivacySettings = (settings: Partial<PrivacySettings>) => {
    setCurrentUser(prev => ({
      ...prev,
      privacySettings: {
        ...prev.privacySettings,
        ...settings
      }
    }));
    showToast('Privacy rules updated & cryptographically enforced', 'privacy');
  };

  const updateCurrentUser = (updates: Partial<User>) => {
    setCurrentUser(prev => ({ ...prev, ...updates }));
    showToast('Profile updated', 'success');
  };

  // Intentional connection management
  const sendConnectionRequest = (userId: string) => {
    setConnectionStates(prev => ({
      ...prev,
      [userId]: 'requested'
    }));
    showToast('Connection request sent. No random following.', 'privacy');
  };

  const acceptConnectionRequest = (notifId?: string, userId?: string) => {
    if (userId) {
      setConnectionStates(prev => ({ ...prev, [userId]: 'connected' }));
      setCurrentUser(prev => ({ ...prev, connectionsCount: prev.connectionsCount + 1 }));
    }
    if (notifId) {
      setNotifications(prev =>
        prev.map(n => n.id === notifId ? { ...n, actionStatus: 'accepted', isRead: true } : n)
      );
    }
    showToast('Connection established. Added to your trusted network.', 'success');
  };

  const declineConnectionRequest = (notifId?: string, userId?: string) => {
    if (userId) {
      setConnectionStates(prev => ({ ...prev, [userId]: 'declined' }));
    }
    if (notifId) {
      setNotifications(prev =>
        prev.map(n => n.id === notifId ? { ...n, actionStatus: 'declined', isRead: true } : n)
      );
    }
    showToast('Connection request declined.', 'info');
  };

  const removeConnection = (userId: string) => {
    setConnectionStates(prev => ({ ...prev, [userId]: 'not_connected' }));
    setCurrentUser(prev => ({ ...prev, connectionsCount: Math.max(0, prev.connectionsCount - 1) }));
    showToast('Connection removed from your private circle.', 'info');
  };

  const blockUser = (userId: string) => {
    setConnectionStates(prev => ({ ...prev, [userId]: 'blocked' }));
    showToast('User blocked. They cannot view your profile or request connections.', 'privacy');
  };

  // Posts handling
  const toggleLikePost = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likes: isLiked ? p.likes + 1 : p.likes - 1
          };
        }
        return p;
      })
    );
  };

  const toggleSavePost = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const isSaved = !p.isSaved;
          return {
            ...p,
            isSaved,
            saves: isSaved ? p.saves + 1 : p.saves - 1
          };
        }
        return p;
      })
    );
  };

  const repost = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const isReposted = !p.isReposted;
          return {
            ...p,
            isReposted,
            reposts: isReposted ? p.reposts + 1 : p.reposts - 1
          };
        }
        return p;
      })
    );
    showToast('Shared with your connections', 'success');
  };

  const addComment = (postId: string, text: string) => {
    if (!text.trim()) return;
    const newComment = {
      id: 'c_' + Date.now(),
      authorId: currentUser.id,
      authorName: currentUser.displayName,
      authorUsername: currentUser.username,
      authorAvatar: currentUser.avatar,
      text: text.trim(),
      createdAt: 'Just now',
      likes: 0
    };
    setPosts(prev =>
      prev.map(p => p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p)
    );
    showToast('Comment posted', 'info');
  };

  const createPost = (newPost: {
    content: string;
    mediaUrls: string[];
    type: 'photo' | 'video' | 'carousel' | 'text';
    audience: 'all_connections' | 'close_friends' | 'family' | 'circle' | 'only_me';
    circleName?: string;
    location?: string;
  }) => {
    const post: Post = {
      id: 'post_' + Date.now(),
      authorId: currentUser.id,
      authorName: currentUser.displayName,
      authorUsername: currentUser.username,
      authorAvatar: currentUser.avatar,
      isCreator: currentUser.isCreator,
      type: newPost.type,
      content: newPost.content,
      mediaUrls: newPost.mediaUrls,
      audience: newPost.audience,
      circleName: newPost.circleName,
      location: newPost.location,
      createdAt: 'Just now',
      likes: 0,
      isLiked: false,
      saves: 0,
      isSaved: false,
      reposts: 0,
      comments: []
    };
    setPosts(prev => [post, ...prev]);
    showToast('Post shared intentionally with selected circle.', 'success');
  };

  // Stories handling
  const openStoryViewer = (storyId: string) => {
    const idx = stories.findIndex(s => s.id === storyId);
    if (idx !== -1) {
      setActiveStoryIndex(idx);
      setStories(prev => prev.map((s, i) => i === idx ? { ...s, isViewed: true } : s));
    }
  };

  const closeStoryViewer = () => {
    setActiveStoryIndex(null);
  };

  const voteStoryPoll = (storyId: string, optionId: string) => {
    setStories(prev =>
      prev.map(s => {
        if (s.id === storyId && s.poll) {
          const updatedOptions = s.poll.options.map(opt =>
            opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
          );
          return {
            ...s,
            poll: {
              ...s.poll,
              options: updatedOptions,
              userVotedOption: optionId
            }
          };
        }
        return s;
      })
    );
  };

  const addStory = (newStory: { mediaUrl: string; type: 'photo' | 'video'; caption?: string; audience: 'all_connections' | 'close_friends' | 'circle' }) => {
    const story: Story = {
      id: 'story_' + Date.now(),
      authorId: currentUser.id,
      authorName: 'Your Story',
      authorUsername: currentUser.username,
      authorAvatar: currentUser.avatar,
      mediaUrl: newStory.mediaUrl,
      type: newStory.type,
      caption: newStory.caption,
      audience: newStory.audience,
      createdAt: 'Just now',
      isViewed: false
    };
    setStories(prev => [story, ...prev]);
    showToast('Story added for your connections', 'success');
  };

  // Mini handling
  const toggleLikeMini = (miniId: string) => {
    setMiniVideos(prev =>
      prev.map(m => {
        if (m.id === miniId) {
          const isLiked = !m.isLiked;
          return {
            ...m,
            isLiked,
            likes: isLiked ? m.likes + 1 : m.likes - 1
          };
        }
        return m;
      })
    );
  };

  const toggleSaveMini = (miniId: string) => {
    setMiniVideos(prev =>
      prev.map(m => {
        if (m.id === miniId) {
          const isSaved = !m.isSaved;
          return {
            ...m,
            isSaved,
            saves: isSaved ? m.saves + 1 : m.saves - 1
          };
        }
        return m;
      })
    );
  };

  const addMiniComment = (miniId: string, text: string) => {
    if (!text.trim()) return;
    const comment = {
      id: 'mc_' + Date.now(),
      authorId: currentUser.id,
      authorName: currentUser.displayName,
      authorUsername: currentUser.username,
      authorAvatar: currentUser.avatar,
      text: text.trim(),
      createdAt: 'Just now',
      likes: 0
    };
    setMiniVideos(prev =>
      prev.map(m => m.id === miniId ? { ...m, commentsCount: m.commentsCount + 1, comments: [...(m.comments || []), comment] } : m)
    );
    showToast('Comment posted', 'info');
  };

  // Creator long video handling
  const toggleLikeLongVideo = (videoId: string) => {
    setLongVideos(prev =>
      prev.map(v => {
        if (v.id === videoId) {
          const isLiked = !v.isLiked;
          return {
            ...v,
            isLiked,
            likes: isLiked ? v.likes + 1 : v.likes - 1
          };
        }
        return v;
      })
    );
    if (activeLongVideo && activeLongVideo.id === videoId) {
      setActiveLongVideo(prev => prev ? {
        ...prev,
        isLiked: !prev.isLiked,
        likes: !prev.isLiked ? prev.likes + 1 : prev.likes - 1
      } : null);
    }
  };

  const toggleSaveLongVideo = (videoId: string) => {
    setLongVideos(prev =>
      prev.map(v => {
        if (v.id === videoId) {
          const isSaved = !v.isSaved;
          return {
            ...v,
            isSaved,
            saves: isSaved ? v.saves + 1 : v.saves - 1
          };
        }
        return v;
      })
    );
  };

  const addLongVideoComment = (videoId: string, text: string) => {
    if (!text.trim()) return;
    const comment = {
      id: 'lvc_' + Date.now(),
      authorId: currentUser.id,
      authorName: currentUser.displayName,
      authorUsername: currentUser.username,
      authorAvatar: currentUser.avatar,
      text: text.trim(),
      createdAt: 'Just now',
      likes: 0
    };
    setLongVideos(prev =>
      prev.map(v => v.id === videoId ? { ...v, comments: [...v.comments, comment] } : v)
    );
    if (activeLongVideo && activeLongVideo.id === videoId) {
      setActiveLongVideo(prev => prev ? { ...prev, comments: [...prev.comments, comment] } : null);
    }
  };

  const createLongVideo = (data: {
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;
    category: string;
    duration: string;
  }) => {
    const newVid: LongVideo = {
      id: 'vid_' + Date.now(),
      authorId: currentUser.id,
      authorName: currentUser.displayName,
      authorUsername: currentUser.username,
      authorAvatar: currentUser.avatar,
      videoUrl: data.videoUrl,
      thumbnailUrl: data.thumbnailUrl,
      title: data.title,
      description: data.description,
      duration: data.duration || '12:30',
      durationSeconds: 750,
      chapters: [
        { time: 0, title: '00:00 — Introduction' },
        { time: 240, title: '04:00 — Core Principles' },
        { time: 600, title: '10:00 — Summary & Insights' }
      ],
      category: data.category,
      views: 1,
      createdAt: 'Just now',
      likes: 0,
      isLiked: false,
      saves: 0,
      isSaved: false,
      comments: []
    };
    setLongVideos(prev => [newVid, ...prev]);
    showToast('Creator long-form video published to your channel!', 'success');
  };

  // Chat handling
  const sendMessage = (
    chatId: string,
    text: string,
    options?: { mediaUrl?: string; mediaType?: 'image' | 'video' | 'file' | 'audio'; isVoice?: boolean; voiceDuration?: string }
  ) => {
    const newMsg = {
      id: 'msg_' + Date.now(),
      senderId: currentUser.id,
      senderName: currentUser.displayName,
      senderAvatar: currentUser.avatar,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
      isOutgoing: true,
      reactions: [],
      ...options
    };

    setChats(prev =>
      prev.map(c => {
        if (c.id === chatId) {
          return {
            ...c,
            lastMessage: newMsg,
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );
  };

  const addReaction = (chatId: string, messageId: string, emoji: string) => {
    setChats(prev =>
      prev.map(c => {
        if (c.id === chatId) {
          const updatedMessages = c.messages.map(m => {
            if (m.id === messageId) {
              const existingReact = m.reactions.find(r => r.emoji === emoji);
              let newReactions;
              if (existingReact) {
                if (existingReact.reactedByMe) {
                  newReactions = m.reactions
                    .map(r => r.emoji === emoji ? { ...r, count: r.count - 1, reactedByMe: false } : r)
                    .filter(r => r.count > 0);
                } else {
                  newReactions = m.reactions.map(r =>
                    r.emoji === emoji ? { ...r, count: r.count + 1, reactedByMe: true } : r
                  );
                }
              } else {
                newReactions = [...m.reactions, { emoji, count: 1, reactedByMe: true }];
              }
              return { ...m, reactions: newReactions };
            }
            return m;
          });
          return { ...c, messages: updatedMessages };
        }
        return c;
      })
    );
  };

  const voteChatPoll = (chatId: string, messageId: string, optionId: string) => {
    setChats(prev =>
      prev.map(c => {
        if (c.id === chatId) {
          const updatedMessages = c.messages.map(m => {
            if (m.id === messageId && m.poll) {
              const updatedOptions = m.poll.options.map(opt =>
                opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
              );
              return {
                ...m,
                poll: {
                  ...m.poll,
                  options: updatedOptions,
                  userVoted: optionId
                }
              };
            }
            return m;
          });
          return { ...c, messages: updatedMessages };
        }
        return c;
      })
    );
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const rsvpEvent = (eventId: string, status: 'going' | 'maybe' | 'cant_go') => {
    setEvents(prev =>
      prev.map(e => {
        if (e.id === eventId) {
          const previous = e.userRsvp;
          let countDiff = 0;
          if (status === 'going' && previous !== 'going') countDiff = 1;
          else if (status !== 'going' && previous === 'going') countDiff = -1;
          return {
            ...e,
            userRsvp: status,
            rsvpCount: Math.max(0, e.rsvpCount + countDiff)
          };
        }
        return e;
      })
    );
    showToast(status === 'going' ? 'RSVP confirmed. Added to your calendar.' : 'RSVP updated.', 'info');
  };

  const openUserProfile = (user: User) => {
    setSelectedUserProfile(user);
  };

  const closeUserProfile = () => {
    setSelectedUserProfile(null);
  };

  const unreadNotifsCount = notifications.filter(n => !n.isRead).length;

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        theme,
        toggleTheme,
        customTheme,
        setCustomTheme,
        setThemePreset,
        setThemeAccent,
        isThemeModalOpen,
        setIsThemeModalOpen,
        currentUser,
        switchAccountType,
        updatePrivacySettings,
        updateCurrentUser,
        connectionStates,
        sendConnectionRequest,
        acceptConnectionRequest,
        declineConnectionRequest,
        removeConnection,
        blockUser,
        restrictedUserIds,
        mutedUserIds,
        allKnownUsers: SEARCHABLE_COMMUNITY_USERS,
        posts,
        activeCircleFilter,
        setActiveCircleFilter,
        toggleLikePost,
        toggleSavePost,
        repost,
        addComment,
        createPost,
        stories,
        activeStoryIndex,
        openStoryViewer,
        closeStoryViewer,
        voteStoryPoll,
        addStory,
        miniVideos,
        activeMiniIndex,
        setActiveMiniIndex,
        toggleLikeMini,
        toggleSaveMini,
        isMiniMuted,
        setIsMiniMuted,
        addMiniComment,
        longVideos,
        activeLongVideo,
        setActiveLongVideo,
        toggleLikeLongVideo,
        toggleSaveLongVideo,
        addLongVideoComment,
        createLongVideo,
        chats,
        activeChatId,
        setActiveChatId,
        sendMessage,
        addReaction,
        voteChatPoll,
        notifications,
        unreadNotifsCount,
        markNotificationsAsRead,
        events,
        rsvpEvent,
        isCreateOpen,
        setIsCreateOpen,
        createMenuType,
        setCreateMenuType,
        isSearchOpen,
        setIsSearchOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isPrivacyCenterOpen,
        setIsPrivacyCenterOpen,
        isSettingsOpen,
        setIsSettingsOpen,
        isQrModalOpen,
        setIsQrModalOpen,
        isUpgradeCreatorModalOpen,
        setIsUpgradeCreatorModalOpen,
        selectedUserProfile,
        openUserProfile,
        closeUserProfile,
        toasts,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
