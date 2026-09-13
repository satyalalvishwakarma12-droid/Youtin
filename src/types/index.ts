export type NavTab = 'home' | 'mini' | 'chat' | 'profile';

export type AccountType = 'private' | 'creator';

export type ThemePreset = 'obsidian' | 'pearl' | 'emerald' | 'amethyst' | 'sunset' | 'cyber';

export interface CustomThemeConfig {
  preset: ThemePreset;
  mode: 'dark' | 'light';
  accentColor: string; // e.g. '#06b6d4' (cyan), '#10b981' (emerald), '#a855f7' (purple), '#f43f5e' (rose), '#f59e0b' (amber), '#38bdf8' (sky)
  accentName: string;
  glassBlur: number; // in px, e.g. 24
  glassOpacity: number; // e.g. 0.75
  glassBorderTint: 'default' | 'vibrant' | 'minimal';
}

export type ConnectionState = 'not_connected' | 'requested' | 'connected' | 'declined' | 'blocked' | 'restricted';

export interface Circle {
  id: string;
  name: string;
  icon: string;
  color: string;
  memberIds: string[];
}

export interface PrivacySettings {
  whoCanConnect: 'everyone' | 'mutuals_only' | 'verified_only';
  whoCanMessage: 'all_connections' | 'close_friends' | 'nobody';
  whoCanSeePosts: 'all_connections' | 'close_friends' | 'circle';
  whoCanSeeStories: 'all_connections' | 'close_friends' | 'custom';
  whoCanComment: 'all_connections' | 'close_friends' | 'nobody';
  whoCanMention: 'all_connections' | 'nobody';
  onlineStatus: boolean;
  readReceipts: boolean;
  activityStatus: boolean;
  profileVisibility: 'connections_only' | 'intentional_search' | 'private';
  connectionListVisibility: 'all_connections' | 'only_me';
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  coverImage?: string;
  bio: string;
  accountType: AccountType;
  verified?: boolean;
  links?: { title: string; url: string }[];
  connectionsCount: number;
  circles: Circle[];
  privacySettings: PrivacySettings;
  isCreator: boolean;
  creatorMetrics?: {
    totalViews: string;
    watchTimeHours: string;
    subscribers: string;
    avgEngagement: string;
  };
}

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  text: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
  replies?: Comment[];
}

export type PostAudience = 'all_connections' | 'close_friends' | 'family' | 'circle' | 'only_me';

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  isCreator?: boolean;
  type: 'photo' | 'video' | 'carousel' | 'text';
  content: string;
  mediaUrls: string[];
  audience: PostAudience;
  circleName?: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  saves: number;
  isSaved: boolean;
  reposts: number;
  isReposted?: boolean;
  comments: Comment[];
  location?: string;
}

export interface Story {
  id: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  mediaUrl: string;
  type: 'photo' | 'video';
  caption?: string;
  musicTrack?: string;
  audience: 'all_connections' | 'close_friends' | 'circle';
  poll?: {
    question: string;
    options: { id: string; text: string; votes: number }[];
    userVotedOption?: string;
  };
  questionPrompt?: string;
  createdAt: string;
  isViewed?: boolean;
}

export interface MiniVideo {
  id: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  isCreator: boolean;
  videoUrl: string;
  posterUrl: string;
  caption: string;
  musicTitle: string;
  musicArtist: string;
  tags: string[];
  likes: number;
  isLiked: boolean;
  commentsCount: number;
  saves: number;
  isSaved: boolean;
  shares: number;
  comments?: Comment[];
}

export interface LongVideo {
  id: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  duration: string;
  durationSeconds: number;
  chapters: { time: number; title: string }[];
  category: string;
  playlistTitle?: string;
  views: number;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  saves: number;
  isSaved: boolean;
  comments: Comment[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'file' | 'audio';
  timestamp: string;
  isRead: boolean;
  isOutgoing: boolean;
  replyToId?: string;
  replyToText?: string;
  reactions: { emoji: string; count: number; reactedByMe: boolean }[];
  pinned?: boolean;
  isVoice?: boolean;
  voiceDuration?: string;
  poll?: {
    question: string;
    options: { id: string; text: string; votes: number }[];
    userVoted?: string;
  };
}

export interface ChatConversation {
  id: string;
  type: 'direct' | 'group' | 'channel';
  name: string;
  username?: string;
  avatar: string;
  verified?: boolean;
  isOnline?: boolean;
  lastSeen?: string;
  lastMessage?: ChatMessage;
  unreadCount: number;
  membersCount?: number;
  description?: string;
  pinnedMessages?: ChatMessage[];
  messages: ChatMessage[];
  isSubscribedChannel?: boolean;
  canPost?: boolean;
}

export interface NotificationItem {
  id: string;
  type: 'connection_request' | 'connection_accepted' | 'like' | 'comment' | 'mention' | 'channel_post' | 'event_invite';
  fromUser: {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
  };
  title: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  targetId?: string;
  actionStatus?: 'pending' | 'accepted' | 'declined';
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  hostName: string;
  hostAvatar: string;
  rsvpCount: number;
  userRsvp?: 'going' | 'maybe' | 'cant_go' | null;
  coverImage: string;
}
