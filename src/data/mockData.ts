import { User, Post, Story, MiniVideo, LongVideo, ChatConversation, NotificationItem, EventItem } from '../types';

export const CURRENT_USER: User = {
  id: 'user_alex',
  username: 'alexvance',
  displayName: 'Alex Vance',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
  bio: 'Spatial designer & generative sound enthusiast. Building intentional spaces in digital and physical worlds.',
  accountType: 'private', // Can be switched to 'creator' dynamically
  verified: true,
  connectionsCount: 4,
  links: [
    { title: 'Personal Archive', url: 'https://haven.social/@alexvance' },
    { title: 'Design Philosophy', url: 'https://haven.social/manifesto' }
  ],
  circles: [
    { id: 'circle_close', name: 'Close Friends', icon: 'Sparkles', color: '#10B981', memberIds: ['user_elena', 'user_maya'] },
    { id: 'circle_studio', name: 'Studio Collective', icon: 'Layers', color: '#6366F1', memberIds: ['user_marcus', 'user_sora'] },
    { id: 'circle_family', name: 'Family', icon: 'Heart', color: '#EC4899', memberIds: [] },
  ],
  privacySettings: {
    whoCanConnect: 'everyone',
    whoCanMessage: 'all_connections',
    whoCanSeePosts: 'all_connections',
    whoCanSeeStories: 'all_connections',
    whoCanComment: 'all_connections',
    whoCanMention: 'all_connections',
    onlineStatus: true,
    readReceipts: true,
    activityStatus: true,
    profileVisibility: 'connections_only',
    connectionListVisibility: 'all_connections',
  },
  isCreator: false,
  creatorMetrics: {
    totalViews: '184.2K',
    watchTimeHours: '12.4K hrs',
    subscribers: '8.9K',
    avgEngagement: '9.4%'
  }
};

export const INITIAL_CONNECTED_USERS: User[] = [
  {
    id: 'user_elena',
    username: 'elena.lens',
    displayName: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80',
    bio: 'Photographer & visual storyteller between Tokyo & Berlin. Analog medium format and light reflections.',
    accountType: 'creator',
    verified: true,
    connectionsCount: 84,
    circles: [],
    privacySettings: {
      whoCanConnect: 'everyone',
      whoCanMessage: 'all_connections',
      whoCanSeePosts: 'all_connections',
      whoCanSeeStories: 'all_connections',
      whoCanComment: 'all_connections',
      whoCanMention: 'all_connections',
      onlineStatus: true,
      readReceipts: true,
      activityStatus: true,
      profileVisibility: 'connections_only',
      connectionListVisibility: 'all_connections',
    },
    isCreator: true,
  },
  {
    id: 'user_marcus',
    username: 'marcus_arch',
    displayName: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
    bio: 'Architectural minimalism & sustainable materials. Principal at Studio Chen, Kyoto.',
    accountType: 'creator',
    verified: true,
    connectionsCount: 112,
    circles: [],
    privacySettings: {
      whoCanConnect: 'everyone',
      whoCanMessage: 'all_connections',
      whoCanSeePosts: 'all_connections',
      whoCanSeeStories: 'all_connections',
      whoCanComment: 'all_connections',
      whoCanMention: 'all_connections',
      onlineStatus: false,
      readReceipts: true,
      activityStatus: true,
      profileVisibility: 'connections_only',
      connectionListVisibility: 'all_connections',
    },
    isCreator: true,
  },
  {
    id: 'user_maya',
    username: 'mayacodes',
    displayName: 'Maya Lin',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
    bio: 'Creative technologist, shader whisperer & electronic musician. Exploring tactile interfaces.',
    accountType: 'private',
    verified: false,
    connectionsCount: 38,
    circles: [],
    privacySettings: {
      whoCanConnect: 'mutuals_only',
      whoCanMessage: 'close_friends',
      whoCanSeePosts: 'all_connections',
      whoCanSeeStories: 'close_friends',
      whoCanComment: 'close_friends',
      whoCanMention: 'nobody',
      onlineStatus: true,
      readReceipts: false,
      activityStatus: false,
      profileVisibility: 'connections_only',
      connectionListVisibility: 'only_me',
    },
    isCreator: false,
  },
  {
    id: 'user_sora',
    username: 'sora_studio',
    displayName: 'Sora Takahashi',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
    bio: 'Cinematographer & motion art director. Light, shadow, silence.',
    accountType: 'creator',
    verified: true,
    connectionsCount: 240,
    circles: [],
    privacySettings: {
      whoCanConnect: 'everyone',
      whoCanMessage: 'all_connections',
      whoCanSeePosts: 'all_connections',
      whoCanSeeStories: 'all_connections',
      whoCanComment: 'all_connections',
      whoCanMention: 'all_connections',
      onlineStatus: true,
      readReceipts: true,
      activityStatus: true,
      profileVisibility: 'connections_only',
      connectionListVisibility: 'all_connections',
    },
    isCreator: true,
  }
];

export const SEARCHABLE_COMMUNITY_USERS: User[] = [
  ...INITIAL_CONNECTED_USERS,
  {
    id: 'user_kai',
    username: 'kai_sol',
    displayName: 'Kai Tanaka',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
    bio: 'Tokyo modular synth composer & acoustic resonance researcher. Intentional audio art.',
    accountType: 'creator',
    verified: true,
    connectionsCount: 65,
    circles: [],
    privacySettings: {
      whoCanConnect: 'everyone',
      whoCanMessage: 'all_connections',
      whoCanSeePosts: 'all_connections',
      whoCanSeeStories: 'all_connections',
      whoCanComment: 'all_connections',
      whoCanMention: 'all_connections',
      onlineStatus: false,
      readReceipts: true,
      activityStatus: true,
      profileVisibility: 'intentional_search',
      connectionListVisibility: 'all_connections',
    },
    isCreator: true,
  },
  {
    id: 'user_clara',
    username: 'clara_vibe',
    displayName: 'Clara Morales',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80',
    bio: 'Ceramicist & visual poet. Slow living, earthen textures, mindful crafting.',
    accountType: 'private',
    verified: false,
    connectionsCount: 42,
    circles: [],
    privacySettings: {
      whoCanConnect: 'everyone',
      whoCanMessage: 'all_connections',
      whoCanSeePosts: 'all_connections',
      whoCanSeeStories: 'all_connections',
      whoCanComment: 'all_connections',
      whoCanMention: 'all_connections',
      onlineStatus: true,
      readReceipts: true,
      activityStatus: true,
      profileVisibility: 'intentional_search',
      connectionListVisibility: 'all_connections',
    },
    isCreator: false,
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post_1',
    authorId: 'user_elena',
    authorName: 'Elena Rostova',
    authorUsername: 'elena.lens',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
    isCreator: true,
    type: 'photo',
    content: 'Dawn over the mist at Lake Biwa. Shot on 65mm format with zero digital filtration. The morning stillness here is a reminder why quiet social spaces matter.',
    mediaUrls: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1080&auto=format&fit=crop&q=80'
    ],
    audience: 'all_connections',
    createdAt: '2 hours ago',
    likes: 42,
    isLiked: false,
    saves: 18,
    isSaved: false,
    reposts: 5,
    location: 'Lake Biwa, Shiga, Japan',
    comments: [
      {
        id: 'c1',
        authorId: 'user_marcus',
        authorName: 'Marcus Chen',
        authorUsername: 'marcus_arch',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
        text: 'The tonal depth in that horizon gradient is sublime Elena.',
        createdAt: '1 hour ago',
        likes: 6,
        isLiked: false
      }
    ]
  },
  {
    id: 'post_2',
    authorId: 'user_marcus',
    authorName: 'Marcus Chen',
    authorUsername: 'marcus_arch',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    isCreator: true,
    type: 'carousel',
    content: 'Finished timber joinery study for the Forest Pavilion. Every corner interlocks without a single nail or adhesive. Swipe to see the internal load calculations & shadow study.',
    mediaUrls: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1080&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1080&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1080&auto=format&fit=crop&q=80'
    ],
    audience: 'all_connections',
    createdAt: '4 hours ago',
    likes: 58,
    isLiked: true,
    saves: 34,
    isSaved: true,
    reposts: 9,
    location: 'Studio Chen, Kyoto',
    comments: [
      {
        id: 'c2',
        authorId: 'user_maya',
        authorName: 'Maya Lin',
        authorUsername: 'mayacodes',
        authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
        text: 'The cedar grain texture in slide 2 is breathtaking.',
        createdAt: '2 hours ago',
        likes: 3,
        isLiked: false
      }
    ]
  },
  {
    id: 'post_3',
    authorId: 'user_maya',
    authorName: 'Maya Lin',
    authorUsername: 'mayacodes',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
    isCreator: false,
    type: 'text',
    content: 'Privacy isn’t about hiding; it’s about choosing where you expend your authentic presence. Grateful for this intimate space away from algorithmic noise and infinite scroll addiction.',
    mediaUrls: [],
    audience: 'close_friends',
    circleName: 'Close Friends',
    createdAt: '6 hours ago',
    likes: 31,
    isLiked: false,
    saves: 12,
    isSaved: false,
    reposts: 4,
    comments: []
  },
  {
    id: 'post_4',
    authorId: 'user_sora',
    authorName: 'Sora Takahashi',
    authorUsername: 'sora_studio',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
    isCreator: true,
    type: 'video',
    content: 'Light beam refraction experiment through prism glass under 240fps macro camera.',
    mediaUrls: [
      'https://assets.mixkit.co/videos/preview/mixkit-liquid-motion-with-white-and-blue-fluids-42792-large.mp4'
    ],
    audience: 'all_connections',
    createdAt: 'Yesterday',
    likes: 89,
    isLiked: false,
    saves: 47,
    isSaved: false,
    reposts: 16,
    comments: []
  }
];

export const INITIAL_STORIES: Story[] = [
  {
    id: 'story_current_user',
    authorId: 'user_alex',
    authorName: 'Your Story',
    authorUsername: 'alexvance',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1080&auto=format&fit=crop&q=80',
    type: 'photo',
    caption: 'Tuning audio spatial filters for Haven soundscape 🎧',
    musicTrack: 'Nils Frahm — All Melody',
    audience: 'all_connections',
    createdAt: '20m ago',
    isViewed: false
  },
  {
    id: 'story_elena',
    authorId: 'user_elena',
    authorName: 'Elena Rostova',
    authorUsername: 'elena.lens',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080&auto=format&fit=crop&q=80',
    type: 'photo',
    caption: 'Golden hour reflections on salt flats 🌊',
    musicTrack: 'Olafur Arnalds — Near Light',
    audience: 'all_connections',
    createdAt: '1h ago',
    isViewed: false
  },
  {
    id: 'story_marcus',
    authorId: 'user_marcus',
    authorName: 'Marcus Chen',
    authorUsername: 'marcus_arch',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1080&auto=format&fit=crop&q=80',
    type: 'photo',
    caption: 'Material decision for the courtyard pavilion:',
    poll: {
      question: 'Which material should we celebrate?',
      options: [
        { id: 'opt_1', text: 'Charred Yakisugi Cedar', votes: 42 },
        { id: 'opt_2', text: 'Honed Travertine Stone', votes: 29 }
      ]
    },
    audience: 'all_connections',
    createdAt: '3h ago',
    isViewed: false
  },
  {
    id: 'story_maya',
    authorId: 'user_maya',
    authorName: 'Maya Lin',
    authorUsername: 'mayacodes',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1080&auto=format&fit=crop&q=80',
    type: 'photo',
    caption: 'Working on raymarching glass refractions ✨',
    questionPrompt: 'What interface element do you wish was quieter?',
    audience: 'close_friends',
    createdAt: '5h ago',
    isViewed: false
  }
];

export const INITIAL_MINI_VIDEOS: MiniVideo[] = [
  {
    id: 'mini_1',
    authorId: 'user_sora',
    authorName: 'Sora Takahashi',
    authorUsername: 'sora_studio',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
    isCreator: true,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    caption: 'Sunset flight over the volcanic plateau. Silence is the loudest texture.',
    musicTitle: 'Solitude in Horizon',
    musicArtist: 'Sora & Julian',
    tags: ['cinematic', 'minimalism', 'nature', 'haven'],
    likes: 842,
    isLiked: false,
    commentsCount: 39,
    saves: 215,
    isSaved: false,
    shares: 44,
    comments: [
      {
        id: 'mc1',
        authorId: 'user_elena',
        authorName: 'Elena Rostova',
        authorUsername: 'elena.lens',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
        text: 'That camera roll motion is pristine!',
        createdAt: '2h ago',
        likes: 12
      }
    ]
  },
  {
    id: 'mini_2',
    authorId: 'user_elena',
    authorName: 'Elena Rostova',
    authorUsername: 'elena.lens',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
    isCreator: true,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&auto=format&fit=crop&q=80',
    caption: 'Hidden moss cascade in Nagano. Shot on 120fps mechanical shutter.',
    musicTitle: 'Echoes of Spring Rain',
    musicArtist: 'Acoustic Labs',
    tags: ['zen', 'waterfall', 'analog', 'nature'],
    likes: 1240,
    isLiked: true,
    commentsCount: 68,
    saves: 430,
    isSaved: true,
    shares: 92,
    comments: []
  },
  {
    id: 'mini_3',
    authorId: 'user_marcus',
    authorName: 'Marcus Chen',
    authorUsername: 'marcus_arch',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    isCreator: true,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-42283-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80',
    caption: 'Light arteries of the metropolis. Kinetic rhythm study for our urban light canopy.',
    musicTitle: 'Nocturne in Glass',
    musicArtist: 'Max Richter',
    tags: ['architecture', 'tokyo', 'nightscape', 'geometry'],
    likes: 673,
    isLiked: false,
    commentsCount: 24,
    saves: 180,
    isSaved: false,
    shares: 31,
    comments: []
  }
];

export const INITIAL_LONG_VIDEOS: LongVideo[] = [
  {
    id: 'vid_1',
    authorId: 'user_marcus',
    authorName: 'Marcus Chen',
    authorUsername: 'marcus_arch',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-tree-branches-in-the-breeze-1188-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80',
    title: 'Designing Acoustic Sanctuaries: The Kyoto Pavilion Case Study',
    description: 'A deep dive into natural reverberation control, charred cedar thermal insulation, and designing meditative architecture that connects human nervous systems to natural weather cycles.',
    duration: '18:45',
    durationSeconds: 1125,
    chapters: [
      { time: 0, title: '00:00 — Introduction: The Need for Quiet' },
      { time: 180, title: '03:00 — Material Resonance & Yakisugi' },
      { time: 540, title: '09:00 — Micro-climatic Ventilation' },
      { time: 820, title: '13:40 — Light Refraction & Shadow Lines' },
      { time: 1020, title: '17:00 — Final Construction Walkthrough' }
    ],
    category: 'Architecture & Craft',
    playlistTitle: 'Spatial Design Masterclasses',
    views: 14280,
    createdAt: '3 days ago',
    likes: 950,
    isLiked: false,
    saves: 340,
    isSaved: false,
    comments: [
      {
        id: 'lvc1',
        authorId: 'user_alex',
        authorName: 'Alex Vance',
        authorUsername: 'alexvance',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        text: 'The section on timber acoustic diffusion gave me goosebumps Marcus. Incredible craft.',
        createdAt: '1 day ago',
        likes: 18,
        isLiked: true
      }
    ]
  },
  {
    id: 'vid_2',
    authorId: 'user_elena',
    authorName: 'Elena Rostova',
    authorUsername: 'elena.lens',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&auto=format&fit=crop&q=80',
    title: 'The Art of 65mm Analog Film Chemistry & Color Science',
    description: 'An intimate studio lecture breaking down manual darkroom timing, grain dispersion algorithms, and how analog optical capture informs modern digital color pipelines.',
    duration: '24:12',
    durationSeconds: 1452,
    chapters: [
      { time: 0, title: '00:00 — The Tactility of Gelatin Emulsion' },
      { time: 320, title: '05:20 — Spectral Sensitivity Curves' },
      { time: 760, title: '12:40 — Darkroom Workflow Demystified' },
      { time: 1200, title: '20:00 — Translation into Digital Master' }
    ],
    category: 'Cinematography',
    playlistTitle: 'Film & Light Archives',
    views: 28400,
    createdAt: '1 week ago',
    likes: 1840,
    isLiked: true,
    saves: 980,
    isSaved: true,
    comments: []
  }
];

export const INITIAL_CHATS: ChatConversation[] = [
  {
    id: 'chat_elena',
    type: 'direct',
    name: 'Elena Rostova',
    username: 'elena.lens',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
    verified: true,
    isOnline: true,
    unreadCount: 1,
    description: 'Direct end-to-end encrypted Haven session.',
    pinnedMessages: [
      {
        id: 'pm1',
        senderId: 'user_elena',
        senderName: 'Elena Rostova',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
        text: '📌 Exhibition venue confirmed: Daikanyama T-Site Gallery, November 14.',
        timestamp: 'Yesterday, 14:20',
        isRead: true,
        isOutgoing: false,
        pinned: true,
        reactions: [{ emoji: '✨', count: 2, reactedByMe: true }]
      }
    ],
    messages: [
      {
        id: 'm1',
        senderId: 'user_alex',
        senderName: 'Alex Vance',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        text: 'Hey Elena! Did you see the acoustic tests Marcus just uploaded?',
        timestamp: '11:15 AM',
        isRead: true,
        isOutgoing: true,
        reactions: []
      },
      {
        id: 'm2',
        senderId: 'user_elena',
        senderName: 'Elena Rostova',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
        text: 'Yes! The reverb balance is so calming. I sent over three test prints for the gallery catalog.',
        timestamp: '11:18 AM',
        isRead: true,
        isOutgoing: false,
        reactions: [{ emoji: '🤍', count: 1, reactedByMe: true }]
      },
      {
        id: 'm3',
        senderId: 'user_elena',
        senderName: 'Elena Rostova',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
        text: 'Here is a preview of the main entrance perspective:',
        mediaUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80',
        mediaType: 'image',
        timestamp: '11:20 AM',
        isRead: true,
        isOutgoing: false,
        reactions: [{ emoji: '🔥', count: 2, reactedByMe: false }]
      },
      {
        id: 'm4',
        senderId: 'user_elena',
        senderName: 'Elena Rostova',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
        text: 'Voice note on acoustic lighting cues',
        timestamp: '11:24 AM',
        isRead: false,
        isOutgoing: false,
        isVoice: true,
        voiceDuration: '0:42',
        reactions: []
      }
    ]
  },
  {
    id: 'chat_hyperion',
    type: 'group',
    name: 'Hyperion Collective',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80',
    unreadCount: 3,
    membersCount: 5,
    description: 'Private research group for spatial sound, tactile UI and ambient computing.',
    messages: [
      {
        id: 'hm1',
        senderId: 'user_marcus',
        senderName: 'Marcus Chen',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
        text: 'Has everyone checked the new liquid glass material shader?',
        timestamp: 'Yesterday',
        isRead: true,
        isOutgoing: false,
        reactions: [{ emoji: '👍', count: 3, reactedByMe: true }]
      },
      {
        id: 'hm2',
        senderId: 'user_maya',
        senderName: 'Maya Lin',
        senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
        text: 'I ran the benchmark on 120Hz displays. Zero dropped frames, it glides like silk.',
        timestamp: '09:40 AM',
        isRead: false,
        isOutgoing: false,
        reactions: [{ emoji: '⚡', count: 2, reactedByMe: false }]
      },
      {
        id: 'hm3',
        senderId: 'user_maya',
        senderName: 'Maya Lin',
        senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80',
        text: 'Team poll for next sprint:',
        timestamp: '09:42 AM',
        isRead: false,
        isOutgoing: false,
        poll: {
          question: 'Should we prioritize Haptic feedback or WebGPU spatial audio first?',
          options: [
            { id: 'p1', text: 'Haptic Liquid Glass (iOS/Android)', votes: 3 },
            { id: 'p2', text: 'WebGPU 3D Spatial Audio Engine', votes: 2 }
          ]
        },
        reactions: []
      }
    ]
  },
  {
    id: 'chat_channel_haven',
    type: 'channel',
    name: 'Haven Official Broadcast',
    username: 'haven_updates',
    avatar: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300&auto=format&fit=crop&q=80',
    verified: true,
    unreadCount: 0,
    membersCount: 14200,
    description: 'Official announcements, privacy updates, and architectural release notes from the Haven engineering core.',
    isSubscribedChannel: true,
    canPost: false,
    messages: [
      {
        id: 'chm1',
        senderId: 'sys_haven',
        senderName: 'Haven Core Team',
        senderAvatar: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300&auto=format&fit=crop&q=80',
        text: '🚀 Welcome to Haven v2.4.\n\nKey Principles in this Release:\n1. Zero unrequested recommendations.\n2. Cryptographic circle privacy at the database level.\n3. Fluid liquid-glass UI with zero clutter.\n4. Integrated Creator Channel studio & Mini short video engine.',
        timestamp: 'Sep 12, 18:00',
        isRead: true,
        isOutgoing: false,
        reactions: [
          { emoji: '💎', count: 342, reactedByMe: true },
          { emoji: '🛡️', count: 219, reactedByMe: true },
          { emoji: '❤️', count: 188, reactedByMe: false }
        ]
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    type: 'connection_request',
    fromUser: {
      id: 'user_kai',
      username: 'kai_sol',
      displayName: 'Kai Tanaka',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80'
    },
    title: 'Connection Request',
    content: 'Kai Tanaka sent you an intentional connection request.',
    createdAt: '15m ago',
    isRead: false,
    actionStatus: 'pending'
  },
  {
    id: 'notif_2',
    type: 'like',
    fromUser: {
      id: 'user_elena',
      username: 'elena.lens',
      displayName: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80'
    },
    title: 'Liked your post',
    content: 'liked your post: "Tuning audio spatial filters for Haven soundscape"',
    createdAt: '2h ago',
    isRead: false
  },
  {
    id: 'notif_3',
    type: 'channel_post',
    fromUser: {
      id: 'user_marcus',
      username: 'marcus_arch',
      displayName: 'Marcus Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'
    },
    title: 'New Creator Masterclass',
    content: 'uploaded a 19-minute masterclass: "Designing Acoustic Sanctuaries"',
    createdAt: '1d ago',
    isRead: true
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt_1',
    title: 'Daikanyama Intimate Photo & Sound Salon',
    description: 'Private viewing of analog silver prints with modular synth accompaniment. Intimate capacity limited to 25 connections.',
    date: 'Saturday, Oct 18',
    time: '19:00 - 22:00 JST',
    location: 'Daikanyama T-Site Salon, Tokyo',
    hostName: 'Elena Rostova',
    hostAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
    rsvpCount: 18,
    userRsvp: 'going',
    coverImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1080&auto=format&fit=crop&q=80'
  },
  {
    id: 'evt_2',
    title: 'Kyoto Timber Architecture Walk',
    description: 'Visiting traditional joinery workshops and modern sustainable timber installations with Studio Chen.',
    date: 'Sunday, Nov 02',
    time: '10:00 - 15:00 JST',
    location: 'Arashiyama, Kyoto',
    hostName: 'Marcus Chen',
    hostAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    rsvpCount: 12,
    userRsvp: null,
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1080&auto=format&fit=crop&q=80'
  }
];
