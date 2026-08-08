import React, { useState, useEffect } from 'react';
import { loadUserProfileFromCookies, saveUserProfileToCookies } from './utils/cookies';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { ChaptersPage } from './pages/ChaptersPage';
import { QuizPage } from './pages/QuizPage';
import { RankPage } from './pages/RankPage';
import { ProfilePage } from './pages/ProfilePage';
import { CalculatorPage } from './pages/CalculatorPage';
import { FlashcardsPage } from './pages/FlashcardsPage';

export const App = () => {
  const [user, setUser] = useState(() => loadUserProfileFromCookies());

  // Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedChapterIdForQuiz, setSelectedChapterIdForQuiz] = useState(null);
  const [selectedSubExerciseIdForQuiz, setSelectedSubExerciseIdForQuiz] = useState(null);

  // Save profile to cookies when browser is closed or refreshed
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveUserProfileToCookies(user);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [user]);

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Sidebar Drawer */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-w-0">
        <Navbar user={user} activeTab={activeTab} />

        {activeTab === 'dashboard' && (
          <DashboardPage user={user} setActiveTab={setActiveTab} />
        )}
        {activeTab === 'chapters' && (
          <ChaptersPage
            setActiveTab={setActiveTab}
            setSelectedChapterIdForQuiz={setSelectedChapterIdForQuiz}
            setSelectedSubExerciseIdForQuiz={setSelectedSubExerciseIdForQuiz}
          />
        )}
        {activeTab === 'flashcards' && (
          <FlashcardsPage />
        )}
        {activeTab === 'calculator' && (
          <CalculatorPage />
        )}
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
        {activeTab === 'rank' && (
          <RankPage user={user} />
        )}
        {activeTab === 'profile' && (
          <ProfilePage user={user} setUser={setUser} />
        )}
      </main>
    </div>
  );
};

export default App;
