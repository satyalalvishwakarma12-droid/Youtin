import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopBar } from './components/navigation/TopBar';
import { BottomNav } from './components/navigation/BottomNav';
import { FeedView } from './components/home/FeedView';
import { MiniReelView } from './components/mini/MiniReelView';
import { ChatListView } from './components/chat/ChatListView';
import { ChatDetailView } from './components/chat/ChatDetailView';
import { ProfileView } from './components/profile/ProfileView';

// Modals
import { StoryViewerModal } from './components/stories/StoryViewerModal';
import { LongVideoModal } from './components/creator/LongVideoModal';
import { UserProfileModal } from './components/profile/UserProfileModal';
import { CreateModal } from './components/modals/CreateModal';
import { PrivacyCenterModal } from './components/modals/PrivacyCenterModal';
import { QrModal } from './components/modals/QrModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { ThemeCustomizerModal } from './components/modals/ThemeCustomizerModal';
import { ToastContainer } from './components/common/ToastContainer';
import { SplashScreen } from './components/common/SplashScreen';

const AppContent: React.FC = () => {
  const { activeTab, activeChatId, theme, customTheme } = useApp();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen relative font-sans transition-colors duration-300 ${
      isDark ? 'bg-[#0b0e17] text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      {/* Background Liquid Glass Glows that adapt to Custom Theme accent */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 transition-all duration-500"
          style={{ backgroundColor: customTheme.accentColor }}
        />
        <div
          className={`absolute top-1/3 -right-40 w-[550px] h-[550px] rounded-full blur-[140px] opacity-15 transition-all duration-500 ${
            isDark ? 'bg-indigo-600' : 'bg-indigo-300'
          }`}
        />
        <div
          className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] rounded-full blur-[160px] opacity-15 transition-all duration-500"
          style={{ backgroundColor: customTheme.accentColor }}
        />
      </div>

      {/* Main App Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Header */}
        <TopBar />

        {/* Content Area */}
        <main className="flex-1 w-full max-w-5xl mx-auto">
          {activeTab === 'home' && <FeedView />}
          {activeTab === 'mini' && <MiniReelView />}
          {activeTab === 'chat' && <ChatListView />}
          {activeTab === 'profile' && <ProfileView />}
        </main>

        {/* Chat Detail Overlay if a chat is active */}
        {activeChatId && <ChatDetailView />}

        {/* Bottom Floating Navigation (Icons only, no names, Instagram proportions) */}
        {!activeChatId && <BottomNav />}
      </div>

      {/* Global Modals & Overlays */}
      <SplashScreen />
      <StoryViewerModal />
      <LongVideoModal />
      <UserProfileModal />
      <CreateModal />
      <PrivacyCenterModal />
      <QrModal />
      <SettingsModal />
      <ThemeCustomizerModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
