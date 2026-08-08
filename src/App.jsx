import React, { useState } from 'react';
import { loadUserProfileFromCookies, saveUserProfileToCookies } from './utils/cookies';
import { CA_MATH_CHAPTERS, MATH_QUESTIONS, FLASHCARDS } from './data/mathData';
import { getXPForNextLevel, playSound, calculateXPAndLevel } from './utils/cookies';

export function Navbar({ user, activeTab, onOpenQuickWindow }) {
  const tabTitles = {
    dashboard: 'Dashboard Overview',
    chapters: 'CA Foundation Math Syllabus & Formulas',
    table: 'Question Bank Data Table & Filters',
    flashcards: 'Formula Flashcards Revision',
    calculator: 'CA Financial & Math Calculator',
    quiz: 'Practice Quiz & Mock Tests',
    rank: 'Level & Rank System',
    profile: 'User Profile'
  };

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-900/90 px-8 backdrop-blur-xl">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">{tabTitles[activeTab] || 'CA Foundation Math'}</h1>
        <p className="text-xs text-slate-400">
          Welcome back, <span className="font-semibold text-cyan-400">{user.name}</span> • Level {user.level} ({user.rankTitle})
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onOpenQuickWindow}
          className="flex items-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-bold text-indigo-300 hover:bg-indigo-500/20 hover:text-white transition shadow-sm cursor-pointer"
          title="Open Top-Right Quick Search Window"
        >
          <span>🔍 Quick Search Window</span>
          <kbd className="hidden sm:inline-block rounded bg-indigo-950/80 px-1.5 py-0.5 text-[10px] text-indigo-400 border border-indigo-800">⌘K</kbd>
        </button>

        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Cookies Synced ✓
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
          🔥 {user.currentStreakDays} Day Streak
        </div>
      </div>
    </header>
  );
}

export function Sidebar({ activeTab, setActiveTab, user }) {
  const { currentLevelMinXP, nextLevelXP } = getXPForNextLevel(user.level);
  const currentXPInLevel = user.xp - currentLevelMinXP;
  const neededXPInLevel = nextLevelXP - currentLevelMinXP;
  const progressPercent = Math.min(100, Math.max(0, Math.floor((currentXPInLevel / neededXPInLevel) * 100)));

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'chapters', label: 'Syllabus & Formulas', icon: '📚' },
    { id: 'table', label: 'Question Table', icon: '📋' },
    { id: 'flashcards', label: 'Formula Flashcards', icon: '🎴' },
    { id: 'calculator', label: 'CA Calculator', icon: '🧮' },
    { id: 'quiz', label: 'Practice Quiz', icon: '✍️' },
    { id: 'rank', label: 'Rank & Levels', icon: '🏆' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <aside className="fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-slate-800 bg-slate-950/95 p-5 backdrop-blur-2xl">
      <div className="mb-6 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-xl font-bold text-white shadow-lg shadow-indigo-500/30">
            ∑
          </div>
          <div>
            <h2 className="text-base font-bold text-white leading-tight">CA Math Hub</h2>
            <span className="text-xs font-semibold text-cyan-400">CA Foundation Prep</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-500/10 text-white border border-indigo-500/40 shadow-md shadow-indigo-500/10'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-cyan-400">
            Lvl {user.level} • {user.rankTitle}
          </span>
          <span className="text-[11px] text-slate-400">{user.xp} XP</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] text-slate-500">
          <span>Level Progress</span>
          <span>{progressPercent}%</span>
        </div>
      </div>
    </aside>
  );
}

export function DashboardPage({ user, setActiveTab }) {
  const accuracyPercent = user.totalQuestionsAttempted > 0
    ? Math.round((user.correctQuestionsCount / user.totalQuestionsAttempted) * 100)
    : 0;

  const { nextLevelXP, currentLevelMinXP } = getXPForNextLevel(user.level);
  const xpInLevel = user.xp - currentLevelMinXP;
  const xpNeeded = nextLevelXP - currentLevelMinXP;
  const levelProgress = Math.min(100, Math.floor((xpInLevel / xpNeeded) * 100));

  return (
    <div className="mx-auto max-w-7xl p-8 space-y-8">
      <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/80 via-slate-900/90 to-slate-950 p-8 shadow-xl backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400 mb-3">
              🎯 Target: CA Foundation Math, LR & Stats
            </div>
            <h1 className="text-3xl font-extrabold text-white">
              Hello, <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent">{user.name}</span>! 👋
            </h1>
            <p className="mt-2 text-slate-400 text-sm max-w-2xl">
              You are currently at <strong className="text-cyan-400">Level {user.level}</strong> with rank title{' '}
              <strong className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">{user.rankTitle}</strong>. All progress auto-saved in Cookies!
            </p>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setActiveTab('calculator')} className="rounded-xl border border-slate-700 bg-slate-800/60 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition">
              🧮 CA Calculator
            </button>
            <button onClick={() => setActiveTab('quiz')} className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 hover:scale-105 transition">
              ⚡ Start Practice Quiz
            </button>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-800">
          <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
            <span><strong>Level {user.level} Progress</strong> ({user.xp} Total XP)</span>
            <span className="text-cyan-400 font-semibold">{xpInLevel} / {xpNeeded} XP to Level {user.level + 1}</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 transition-all duration-500" style={{ width: `${levelProgress}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg backdrop-blur-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl">🎯</span>
            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${accuracyPercent >= 70 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'}`}>{accuracyPercent}% Accuracy</span>
          </div>
          <div className="text-xs text-slate-400">Questions Solved</div>
          <div className="text-2xl font-black text-white my-1">
            <span className="text-emerald-400">{user.correctQuestionsCount}</span> / {user.totalQuestionsAttempted}
          </div>
          <div className="text-[11px] text-slate-500">{user.incorrectQuestionsCount} Incorrect answers</div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg backdrop-blur-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl">🏆</span>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">Level {user.level}</span>
          </div>
          <div className="text-xs text-slate-400">Current Rank Title</div>
          <div className="text-lg font-bold text-amber-400 my-1 truncate">{user.rankTitle}</div>
          <div className="text-[11px] text-slate-500">Unlocked {user.unlockedBadgeIds.length} Badges</div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg backdrop-blur-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl">🔥</span>
            <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 text-xs font-semibold text-amber-400">{user.currentStreakDays} Days</span>
          </div>
          <div className="text-xs text-slate-400">Daily Target ({user.dailyGoalMinutes}m)</div>
          <div className="text-2xl font-black text-white my-1">{user.currentStreakDays} Days Streak</div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800 mt-2">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: `100%` }}></div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>📖</span> CA Foundation Syllabus Weightage & Quick Study
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CA_MATH_CHAPTERS.map(ch => (
            <div
              key={ch.id}
              onClick={() => setActiveTab('chapters')}
              className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-slate-900/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs font-semibold text-cyan-400">{ch.category}</span>
                  <span className="text-xs font-extrabold text-amber-400">{ch.weightage}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{ch.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6 font-normal">{ch.description}</p>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold text-cyan-400 pt-3 border-t border-slate-800/80">
                <span>{ch.formulas.length} Formulas</span>
                <span className="flex items-center gap-1 hover:text-cyan-300">Explore Chapter →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ChaptersPage({ setActiveTab, setSelectedChapterIdForQuiz, setSelectedSubExerciseIdForQuiz }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('inside');

  const filtered = selectedCategory === 'All'
    ? CA_MATH_CHAPTERS
    : CA_MATH_CHAPTERS.filter(c => c.category === selectedCategory);

  const handlePracticeInside = (chapterId) => {
    setSelectedChapterIdForQuiz(chapterId);
    if (setSelectedSubExerciseIdForQuiz) setSelectedSubExerciseIdForQuiz(null);
    setActiveTab('quiz');
  };

  const handlePracticeOutside = (chapterId, subId) => {
    setSelectedChapterIdForQuiz(chapterId);
    if (setSelectedSubExerciseIdForQuiz) setSelectedSubExerciseIdForQuiz(subId);
    setActiveTab('quiz');
  };

  return (
    <div className="mx-auto max-w-7xl p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">CA Foundation Math Syllabus</h1>
          <p className="text-sm text-slate-400">Chapter notes, key formulas, shortcut memory tricks & marks weightage.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('inside')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${viewMode === 'inside' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              📂 Inside Chapters
            </button>
            <button
              onClick={() => setViewMode('outside')}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${viewMode === 'outside' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              📄 Outside Exercises
            </button>
          </div>

          <div className="flex gap-1.5">
            {['All', 'Math', 'Logical Reasoning', 'Statistics'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${selectedCategory === cat ? 'bg-slate-700 text-white border border-slate-600' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {viewMode === 'inside' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(ch => (
            <div key={ch.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg backdrop-blur-xl flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-xs font-semibold text-cyan-400">{ch.category}</span>
                <span className="text-xs font-bold text-amber-400">Weightage: {ch.weightage}</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{ch.title}</h2>
              <p className="text-sm text-slate-400 mb-4 flex-1">{ch.description}</p>

              {ch.subExercises && ch.subExercises.length > 0 && (
                <div className="rounded-xl bg-slate-950/60 p-3 border border-cyan-500/20 mb-4 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-cyan-400 mb-1">
                    <span>📑 Sub-Exercises & Units ({ch.subExercises.length})</span>
                    <span className="text-[10px] text-slate-400 font-normal">Choose Practice Mode:</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    {ch.subExercises.map(sub => (
                      <div
                        key={sub.id}
                        className="rounded-lg bg-slate-900 p-2.5 border border-slate-800 flex flex-wrap items-center justify-between gap-2 hover:border-slate-700 transition"
                      >
                        <div className="font-medium text-slate-200 text-xs">
                          <span className="font-bold text-amber-400">{sub.title.split(':')[0]}</span>: {sub.title.split(':')[1] || sub.title}
                        </div>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handlePracticeInside(ch.id)}
                            className="rounded-md bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 px-2.5 py-1 text-[11px] font-semibold text-indigo-300 transition cursor-pointer flex items-center gap-1"
                          >
                            🎯 Inside Chapter
                          </button>
                          <button
                            onClick={() => handlePracticeOutside(ch.id, sub.id)}
                            className="rounded-md bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 px-2.5 py-1 text-[11px] font-semibold text-amber-300 transition cursor-pointer flex items-center gap-1"
                          >
                            📄 Outside Ex
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800 mb-4">
                <div className="text-xs font-bold text-cyan-400 mb-2">📐 Key Formulas Preview</div>
                <ul className="space-y-1 text-xs text-slate-300">
                  {ch.formulas.slice(0, 2).map((f, idx) => (
                    <li key={idx}>
                      <strong>{f.title}:</strong> <code className="text-indigo-300 bg-indigo-500/10 px-1.5 py-0.5 rounded">{f.formula}</code>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handlePracticeInside(ch.id)}
                className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 py-3 text-xs font-bold text-white transition cursor-pointer shadow-lg shadow-indigo-600/20"
              >
                ⚡ Practice Full Chapter Quiz
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-xl bg-indigo-950/40 border border-indigo-500/30 p-4 text-xs text-slate-300">
            💡 <strong>Outside Exercises View:</strong> Direct standalone access to every exercise unit across the syllabus.
          </div>
        </div>
      )}
    </div>
  );
}

export function QuizPage({ user, setUser, selectedChapterIdForQuiz, setSelectedChapterIdForQuiz, selectedSubExerciseIdForQuiz, setSelectedSubExerciseIdForQuiz }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showJumpModal, setShowJumpModal] = useState(false);
  const [jumpSearchQuery, setJumpSearchQuery] = useState('');

  const availableQuestions = selectedSubExerciseIdForQuiz
    ? MATH_QUESTIONS.filter(q => q.subExerciseId === selectedSubExerciseIdForQuiz)
    : selectedChapterIdForQuiz
    ? MATH_QUESTIONS.filter(q => q.chapterId === selectedChapterIdForQuiz)
    : MATH_QUESTIONS;

  const currentQ = availableQuestions[currentQuestionIndex];

  const handleJumpToQuestion = (targetIdx) => {
    if (targetIdx >= 0 && targetIdx < availableQuestions.length) {
      setCurrentQuestionIndex(targetIdx);
      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);
      setShowJumpModal(false);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null || !currentQ || isAnswerSubmitted) return;
    const isCorrect = selectedOptionIndex === currentQ.correctIndex;
    setIsAnswerSubmitted(true);
    playSound(isCorrect ? 'correct' : 'incorrect');

    setUser(prev => {
      const updated = {
        ...prev,
        totalQuestionsAttempted: prev.totalQuestionsAttempted + 1,
        correctQuestionsCount: isCorrect ? prev.correctQuestionsCount + 1 : prev.correctQuestionsCount,
        incorrectQuestionsCount: !isCorrect ? prev.incorrectQuestionsCount + 1 : prev.incorrectQuestionsCount,
      };
      const evaluated = calculateXPAndLevel(updated);
      saveUserProfileToCookies(evaluated);
      return evaluated;
    });
  };

  if (!currentQ) {
    return (
      <div className="p-12 text-center text-white space-y-4">
        <h2 className="text-xl font-bold">No questions found for this selection.</h2>
        <button
          onClick={() => { setSelectedChapterIdForQuiz(null); if (setSelectedSubExerciseIdForQuiz) setSelectedSubExerciseIdForQuiz(null); }}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 text-xs font-bold text-white"
        >
          Show All Questions
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-8 space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Interactive Math Quiz</h1>
          <p className="text-xs text-slate-400">Practice questions topic-wise or exercise-wise.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 space-y-6 shadow-xl backdrop-blur-xl">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs text-cyan-400 font-semibold">{currentQ.chapterName}</span>
          </div>

          <button
            onClick={() => setShowJumpModal(true)}
            className="rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 px-3 py-1 text-xs font-bold text-indigo-300 transition cursor-pointer flex items-center gap-1.5"
          >
            <span>🔍 Search / Jump Q#</span>
            <span className="text-white font-extrabold">{currentQuestionIndex + 1} of {availableQuestions.length}</span>
          </button>
        </div>

        <h2 className="text-lg font-bold text-white leading-relaxed">Q{currentQuestionIndex + 1}. {currentQ.questionText}</h2>

        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            let btnStyle = "border-slate-700 bg-slate-800/40 text-slate-200 hover:bg-slate-800";
            if (selectedOptionIndex === idx) btnStyle = "border-indigo-500 bg-indigo-500/20 text-white";
            if (isAnswerSubmitted) {
              if (idx === currentQ.correctIndex) btnStyle = "border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold";
              else if (selectedOptionIndex === idx) btnStyle = "border-rose-500 bg-rose-500/20 text-rose-300";
            }

            return (
              <div
                key={idx}
                onClick={() => !isAnswerSubmitted && setSelectedOptionIndex(idx)}
                className={`cursor-pointer rounded-xl border p-4 text-sm flex items-center gap-3 transition ${btnStyle}`}
              >
                <span className="h-6 w-6 rounded-full bg-slate-700/50 flex items-center justify-center text-xs font-bold">{String.fromCharCode(65 + idx)}</span>
                <span>{opt}</span>
              </div>
            );
          })}
        </div>

        {!isAnswerSubmitted ? (
          <div className="flex justify-end">
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOptionIndex === null}
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-8 py-3 text-sm font-bold text-white disabled:opacity-40 shadow-lg cursor-pointer"
            >
              Submit Answer
            </button>
          </div>
        ) : (
          <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2">
            {currentQ.formulaUsed && (
              <div className="text-xs text-amber-300 mb-1">📐 <strong>Formula:</strong> <code>{currentQ.formulaUsed}</code></div>
            )}
            <div className="text-sm font-bold text-emerald-400">💡 Step-by-step Solution</div>
            <p className="text-xs text-slate-300 leading-relaxed">{currentQ.explanation}</p>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setSelectedOptionIndex(null);
                  setIsAnswerSubmitted(false);
                  setCurrentQuestionIndex(prev => prev < availableQuestions.length - 1 ? prev + 1 : 0);
                }}
                className="rounded-xl bg-emerald-600 hover:bg-emerald-500 px-6 py-2.5 text-xs font-bold text-white transition cursor-pointer"
              >
                Next Question →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function CalculatorPage() {
  const [calcMode, setCalcMode] = useState('SI');
  const [siP, setSiP] = useState(10000);
  const [siR, setSiR] = useState(8);
  const [siT, setSiT] = useState(5);

  const [ciP, setCiP] = useState(10000);
  const [ciR, setCiR] = useState(8);
  const [ciT, setCiT] = useState(5);
  const [ciFreq, setCiFreq] = useState(4);

  const siInterest = (siP * siR * siT) / 100;
  const siAmount = siP + siInterest;

  const ciRatePerPeriod = ciR / (100 * ciFreq);
  const ciTotalPeriods = ciT * ciFreq;
  const ciAmount = ciP * Math.pow(1 + ciRatePerPeriod, ciTotalPeriods);
  const ciInterest = ciAmount - ciP;

  return (
    <div className="mx-auto max-w-7xl p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">🧮 CA Financial & Math Calculator</h1>
        <p className="text-sm text-slate-400">Solve Time Value of Money problems, Simple & Compound Interest instantly.</p>
      </div>

      <div className="flex gap-3">
        <button onClick={() => setCalcMode('SI')} className={`rounded-xl px-5 py-2.5 text-xs font-bold transition ${calcMode === 'SI' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}>Simple Interest (SI)</button>
        <button onClick={() => setCalcMode('CI')} className={`rounded-xl px-5 py-2.5 text-xs font-bold transition ${calcMode === 'CI' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}>Compound Interest (CI)</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <h2 className="text-base font-bold text-cyan-400">📝 Input Parameters</h2>
          {calcMode === 'SI' ? (
            <>
              <div><label className="block text-xs text-slate-400 mb-1">Principal (P in ₹):</label><input type="number" value={siP} onChange={(e) => setSiP(Number(e.target.value))} className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-white text-sm" /></div>
              <div><label className="block text-xs text-slate-400 mb-1">Rate (R % p.a.):</label><input type="number" value={siR} onChange={(e) => setSiR(Number(e.target.value))} className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-white text-sm" /></div>
              <div><label className="block text-xs text-slate-400 mb-1">Time (T in Years):</label><input type="number" value={siT} onChange={(e) => setSiT(Number(e.target.value))} className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-white text-sm" /></div>
            </>
          ) : (
            <>
              <div><label className="block text-xs text-slate-400 mb-1">Principal (P in ₹):</label><input type="number" value={ciP} onChange={(e) => setCiP(Number(e.target.value))} className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-white text-sm" /></div>
              <div><label className="block text-xs text-slate-400 mb-1">Rate (R % p.a.):</label><input type="number" value={ciR} onChange={(e) => setCiR(Number(e.target.value))} className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-white text-sm" /></div>
              <div><label className="block text-xs text-slate-400 mb-1">Time (T in Years):</label><input type="number" value={ciT} onChange={(e) => setCiT(Number(e.target.value))} className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-white text-sm" /></div>
            </>
          )}
        </div>

        <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/60 p-6 space-y-4">
          <h2 className="text-base font-bold text-emerald-400">⚡ Calculated Result</h2>
          {calcMode === 'SI' ? (
            <div className="space-y-3">
              <div className="rounded-xl bg-slate-950 p-4"><div className="text-xs text-slate-400">Simple Interest (SI)</div><div className="text-3xl font-black text-cyan-400">₹{siInterest.toLocaleString('en-IN')}</div></div>
              <div className="rounded-xl bg-slate-950 p-4"><div className="text-xs text-slate-400">Total Amount (A)</div><div className="text-2xl font-bold text-emerald-400">₹{siAmount.toLocaleString('en-IN')}</div></div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-xl bg-slate-950 p-4"><div className="text-xs text-slate-400">Compound Interest (CI)</div><div className="text-3xl font-black text-cyan-400">₹{Math.round(ciInterest).toLocaleString('en-IN')}</div></div>
              <div className="rounded-xl bg-slate-950 p-4"><div className="text-xs text-slate-400">Compounded Amount (A)</div><div className="text-2xl font-bold text-emerald-400">₹{Math.round(ciAmount).toLocaleString('en-IN')}</div></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const currentCard = FLASHCARDS[currentIndex];

  return (
    <div className="mx-auto max-w-4xl p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">🎴 CA Math Formula Flashcards</h1>
        <p className="text-sm text-slate-400">Flip cards to memorize key formulas & examples.</p>
      </div>

      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="cursor-pointer min-h-[300px] rounded-2xl border border-indigo-500/40 bg-slate-900/80 p-8 flex flex-col justify-center items-center text-center shadow-xl transition hover:border-indigo-400 relative"
      >
        <span className="absolute top-4 left-4 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs text-cyan-400 font-semibold">{currentCard.chapterTitle}</span>
        <span className="absolute top-4 right-4 text-xs text-slate-500">Click to flip 📄</span>

        {!isFlipped ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">{currentCard.frontTitle}</h2>
            <div className="text-xl font-mono font-bold text-amber-300 bg-slate-950 px-6 py-3 rounded-xl border border-slate-800">{currentCard.frontFormula}</div>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-emerald-400">💡 Memory Rule</h3>
            <p className="text-sm text-slate-200 leading-relaxed">{currentCard.backExplanation}</p>
            <div className="text-xs text-cyan-300 bg-cyan-950/40 px-4 py-2 rounded-lg">📌 {currentCard.example}</div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <button onClick={() => { setIsFlipped(false); setCurrentIndex(prev => prev > 0 ? prev - 1 : FLASHCARDS.length - 1); }} className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-semibold text-white">← Previous</button>
        <span className="text-xs text-slate-400">Card {currentIndex + 1} of {FLASHCARDS.length}</span>
        <button onClick={() => { setIsFlipped(false); setCurrentIndex(prev => prev < FLASHCARDS.length - 1 ? prev + 1 : 0); }} className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white">Next →</button>
      </div>
    </div>
  );
}

export function RankPage({ user }) {
  return (
    <div className="mx-auto max-w-7xl p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">CA Foundation Rank & Level System</h1>
        <p className="text-sm text-slate-400">Level up by building Watch Time, solving Math problems correctly!</p>
      </div>

      <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/60 p-8 flex items-center gap-6">
        <div className="h-16 w-16 rounded-2xl bg-indigo-500/20 border border-cyan-400 flex items-center justify-center text-3xl">🏆</div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">Level {user.level} • <span className="text-amber-400">{user.rankTitle}</span></h2>
          <p className="text-xs text-cyan-400">Total XP: {user.xp} XP</p>
        </div>
      </div>
    </div>
  );
}

export function TopRightQuickWindowModal({ isOpen, onClose, setActiveTab, setSelectedChapterIdForQuiz, setSelectedSubExerciseIdForQuiz }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedChapterId, setSelectedChapterId] = useState('All');

  if (!isOpen) return null;

  const categories = ['All', 'Math', 'Logical Reasoning', 'Statistics'];

  const filteredQuestions = MATH_QUESTIONS.filter(q => {
    const chapter = CA_MATH_CHAPTERS.find(c => c.id === q.chapterId);
    const matchesCategory = selectedCategory === 'All' || (chapter && chapter.category === selectedCategory);
    const matchesChapter = selectedChapterId === 'All' || q.chapterId === selectedChapterId;
    const qText = (q.questionText || '').toLowerCase();
    const qChapter = (q.chapterName || '').toLowerCase();
    const qFormula = (q.formulaUsed || '').toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query || qText.includes(query) || qChapter.includes(query) || qFormula.includes(query);
    return matchesCategory && matchesChapter && matchesQuery;
  });

  const handleJump = (chapterId, subId) => {
    setSelectedChapterIdForQuiz(chapterId);
    if (setSelectedSubExerciseIdForQuiz) setSelectedSubExerciseIdForQuiz(subId || null);
    setActiveTab('quiz');
    onClose();
  };

  return (
    <div className="fixed top-20 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] rounded-2xl border border-indigo-500/40 bg-slate-900/95 p-5 shadow-2xl backdrop-blur-2xl transition-all">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-lg">⚡</span>
          <div>
            <h3 className="text-sm font-bold text-white leading-tight">Top-Right Quick Window</h3>
            <span className="text-[10px] text-cyan-400 font-semibold">Question Search & Quick Filter</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-pointer"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="🔍 Search questions, formulas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            autoFocus
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div>
          <select
            value={selectedChapterId}
            onChange={(e) => setSelectedChapterId(e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-1.5 text-xs text-slate-300 focus:border-indigo-500 focus:outline-none"
          >
            <option value="All">📚 All Chapters</option>
            {CA_MATH_CHAPTERS.map(ch => (
              <option key={ch.id} value={ch.id}>{ch.title}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center text-[11px] font-bold text-cyan-400">
          <span>Matching Questions</span>
          <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 border border-cyan-500/20">{filteredQuestions.length} items</span>
        </div>

        <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
          {filteredQuestions.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500">No questions found matching filter</div>
          ) : (
            filteredQuestions.slice(0, 15).map((q, idx) => (
              <div
                key={q.id || idx}
                onClick={() => handleJump(q.chapterId, q.subExerciseId)}
                className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-950/60 p-3 hover:border-indigo-500/50 hover:bg-indigo-950/30 transition space-y-1"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-amber-400 truncate max-w-[180px]">{q.chapterName}</span>
                  <span className="rounded bg-indigo-500/10 text-indigo-300 px-1.5 py-0.5 border border-indigo-500/20">{q.difficulty || 'Medium'}</span>
                </div>
                <p className="text-xs text-slate-200 line-clamp-2 group-hover:text-white">{q.questionText}</p>
                <div className="flex justify-end pt-1">
                  <span className="text-[10px] text-cyan-400 font-semibold group-hover:underline">Start Practice →</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export function QuestionTablePage({ setActiveTab, setSelectedChapterIdForQuiz, setSelectedSubExerciseIdForQuiz }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState('All');
  const [selectedSubExerciseId, setSelectedSubExerciseId] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  const availableSubExercises = selectedChapterId === 'All'
    ? CA_MATH_CHAPTERS.flatMap(ch => ch.subExercises || [])
    : (CA_MATH_CHAPTERS.find(ch => ch.id === selectedChapterId)?.subExercises || []);

  const filteredQuestions = MATH_QUESTIONS.filter(q => {
    const matchesChapter = selectedChapterId === 'All' || q.chapterId === selectedChapterId;
    const matchesSub = selectedSubExerciseId === 'All' || q.subExerciseId === selectedSubExerciseId;
    const matchesDiff = selectedDifficulty === 'All' || (q.difficulty || 'Medium') === selectedDifficulty;

    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query ||
      (q.questionText || '').toLowerCase().includes(query) ||
      (q.chapterName || '').toLowerCase().includes(query) ||
      (q.explanation || '').toLowerCase().includes(query) ||
      (q.formulaUsed || '').toLowerCase().includes(query);

    return matchesChapter && matchesSub && matchesDiff && matchesQuery;
  });

  const handlePracticeQuestion = (chapterId, subExerciseId) => {
    setSelectedChapterIdForQuiz(chapterId);
    if (setSelectedSubExerciseIdForQuiz) setSelectedSubExerciseIdForQuiz(subExerciseId || null);
    setActiveTab('quiz');
  };

  return (
    <div className="mx-auto max-w-7xl p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <span>📋</span> Question Bank Data Table & Multi-Filters
          </h1>
          <p className="text-sm text-slate-400">
            Browse, search, and filter all CA Foundation Quantitative Aptitude questions in a structured data view.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-bold text-cyan-400">
          🎯 Matching: {filteredQuestions.length} / {MATH_QUESTIONS.length} Questions
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">🔍 Search Keywords:</label>
            <input
              type="text"
              placeholder="Filter by question, topic, formula..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">📚 Filter by Chapter:</label>
            <select
              value={selectedChapterId}
              onChange={(e) => {
                setSelectedChapterId(e.target.value);
                setSelectedSubExerciseId('All');
              }}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
            >
              <option value="All">All Chapters ({CA_MATH_CHAPTERS.length})</option>
              {CA_MATH_CHAPTERS.map(ch => (
                <option key={ch.id} value={ch.id}>{ch.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">📑 Filter by Sub-Exercise:</label>
            <select
              value={selectedSubExerciseId}
              onChange={(e) => setSelectedSubExerciseId(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
            >
              <option value="All">All Sub-Exercises ({availableSubExercises.length})</option>
              {availableSubExercises.map(sub => (
                <option key={sub.id} value={sub.id}>{sub.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">⚡ Difficulty Level:</label>
            <div className="flex bg-slate-950 border border-slate-800 p-1 rounded-xl">
              {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`flex-1 rounded-lg py-1.5 text-[11px] font-bold transition ${
                    selectedDifficulty === diff
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-4 px-4 font-bold w-12 text-center">#</th>
                <th className="py-4 px-4 font-bold w-48">Chapter & Unit</th>
                <th className="py-4 px-4 font-bold">Question Preview</th>
                <th className="py-4 px-4 font-bold w-28 text-center">Difficulty</th>
                <th className="py-4 px-4 font-bold w-36 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredQuestions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-500 font-medium">
                    No questions found matching selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredQuestions.map((q, idx) => {
                  const isExpanded = expandedQuestionId === q.id;
                  const diffColor =
                    q.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                    q.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                    'bg-amber-500/10 text-amber-400 border-amber-500/30';

                  return (
                    <React.Fragment key={q.id || idx}>
                      <tr className="hover:bg-slate-800/40 transition">
                        <td className="py-3.5 px-4 font-bold text-center text-slate-400">{idx + 1}</td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-cyan-400 truncate max-w-[180px]">{q.chapterName}</div>
                          <div className="text-[10px] text-slate-400 truncate max-w-[180px]">{q.subExerciseId || 'General'}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-medium text-slate-200 line-clamp-2">{q.questionText}</p>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${diffColor}`}>
                            {q.difficulty || 'Medium'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                              className="rounded-lg bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-[11px] font-semibold text-slate-300 transition cursor-pointer"
                              title="Toggle Solution & Formula Preview"
                            >
                              {isExpanded ? 'Hide 🔼' : 'Details 🔽'}
                            </button>
                            <button
                              onClick={() => handlePracticeQuestion(q.chapterId, q.subExerciseId)}
                              className="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3 py-1 text-[11px] font-bold text-white shadow-sm transition cursor-pointer"
                            >
                              Practice ⚡
                            </button>
                          </div>
                        </td>
                      </tr>

                      {isExpanded && (
                        <tr className="bg-slate-950/80 border-b border-indigo-500/20">
                          <td colSpan="5" className="p-6">
                            <div className="space-y-3 rounded-xl border border-indigo-500/30 bg-slate-900/90 p-5 backdrop-blur-md">
                              <h4 className="text-xs font-bold text-cyan-400">Options:</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                                {q.options.map((opt, oIdx) => (
                                  <div
                                    key={oIdx}
                                    className={`rounded-lg p-2 border ${
                                      oIdx === q.correctIndex
                                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-bold'
                                        : 'bg-slate-950 border-slate-800 text-slate-300'
                                    }`}
                                  >
                                    <span className="font-bold mr-1.5">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                                    {oIdx === q.correctIndex && <span className="ml-2 text-emerald-400">✓ Correct</span>}
                                  </div>
                                ))}
                              </div>

                              {q.formulaUsed && (
                                <div className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-lg">
                                  📐 <strong>Formula Used:</strong> <code>{q.formulaUsed}</code>
                                </div>
                              )}

                              <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800">
                                <strong className="text-emerald-400 block mb-1">💡 Step-by-Step Solution:</strong>
                                {q.explanation}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function ProfilePage({ user, setUser }) {
  return (
    <div className="mx-auto max-w-7xl p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">User Profile</h1>
        <p className="text-sm text-slate-400">Manage your study goals and view your learning stats.</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 space-y-4">
        <h2 className="text-xl font-bold text-white">Name: {user.name}</h2>
        <p className="text-sm text-cyan-400">Exam: {user.targetExam}</p>
        <p className="text-sm text-amber-400">Rank: Level {user.level} ({user.rankTitle})</p>
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(() => loadUserProfileFromCookies());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedChapterIdForQuiz, setSelectedChapterIdForQuiz] = useState(null);
  const [selectedSubExerciseIdForQuiz, setSelectedSubExerciseIdForQuiz] = useState(null);
  const [showQuickWindow, setShowQuickWindow] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
      <main className="flex-1 ml-64 min-w-0">
        <Navbar
          user={user}
          activeTab={activeTab}
          onOpenQuickWindow={() => setShowQuickWindow(true)}
        />

        <TopRightQuickWindowModal
          isOpen={showQuickWindow}
          onClose={() => setShowQuickWindow(false)}
          setActiveTab={setActiveTab}
          setSelectedChapterIdForQuiz={setSelectedChapterIdForQuiz}
          setSelectedSubExerciseIdForQuiz={setSelectedSubExerciseIdForQuiz}
        />

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
