import React, { useState } from 'react';
import { loadUserProfileFromCookies } from './utils/cookies';

// Import Modular UI Components
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { EmailModal } from './components/EmailModal';
import { NoticeModal } from './components/NoticeModal';
import { TopRightQuickWindowModal } from './components/TopRightQuickWindowModal';

// Import Modular Page Views
import { DashboardPage } from './pages/DashboardPage';
import { ChaptersPage } from './pages/ChaptersPage';
import { QuestionTablePage } from './pages/QuestionTablePage';
import { FlashcardsPage } from './pages/FlashcardsPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { QuizPage } from './pages/QuizPage';
import { RankPage } from './pages/RankPage';
import { ProfilePage } from './pages/ProfilePage';

export default function App() {
  const [user, setUser] = useState(() => loadUserProfileFromCookies());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedChapterIdForQuiz, setSelectedChapterIdForQuiz] = useState(null);
  const [selectedSubExerciseIdForQuiz, setSelectedSubExerciseIdForQuiz] = useState(null);
  const [showQuickWindow, setShowQuickWindow] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <main className={`flex-1 min-w-0 transition-all duration-300 ${isSidebarCollapsed ? 'ml-0 md:ml-20' : 'ml-0 md:ml-64'}`}>
        <Navbar
          user={user}
          activeTab={activeTab}
          onOpenQuickWindow={() => setShowQuickWindow(true)}
          onOpenEmailModal={() => setShowEmailModal(true)}
          onOpenNoticeModal={() => setShowNoticeModal(true)}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        <TopRightQuickWindowModal
          isOpen={showQuickWindow}
          onClose={() => setShowQuickWindow(false)}
          setActiveTab={setActiveTab}
          setSelectedChapterIdForQuiz={setSelectedChapterIdForQuiz}
          setSelectedSubExerciseIdForQuiz={setSelectedSubExerciseIdForQuiz}
        />

        <EmailModal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} />
        <NoticeModal isOpen={showNoticeModal} onClose={() => setShowNoticeModal(false)} />

        {activeTab === 'dashboard' && <DashboardPage user={user} setActiveTab={setActiveTab} />}
        {activeTab === 'chapters' && (
          <ChaptersPage
            setActiveTab={setActiveTab}
            setSelectedChapterIdForQuiz={setSelectedChapterIdForQuiz}
            setSelectedSubExerciseIdForQuiz={setSelectedSubExerciseIdForQuiz}
          />
        )}
        {activeTab === 'table' && (
          <QuestionTablePage
            setActiveTab={setActiveTab}
            setSelectedChapterIdForQuiz={setSelectedChapterIdForQuiz}
            setSelectedSubExerciseIdForQuiz={setSelectedSubExerciseIdForQuiz}
          />
        )}
        {activeTab === 'flashcards' && <FlashcardsPage />}
        {activeTab === 'calculator' && <CalculatorPage />}
        {activeTab === 'quiz' && (
          <QuizPage
            user={user}
            setUser={setUser}
            selectedChapterIdForQuiz={selectedChapterIdForQuiz}
            setSelectedChapterIdForQuiz={setSelectedChapterIdForQuiz}
            selectedSubExerciseIdForQuiz={selectedSubExerciseIdForQuiz}
            setSelectedSubExerciseIdForQuiz={setSelectedSubExerciseIdForQuiz}
          />
        )}
        {activeTab === 'rank' && <RankPage user={user} />}
        {activeTab === 'profile' && <ProfilePage user={user} setUser={setUser} />}
      </main>
    </div>
  );
}
