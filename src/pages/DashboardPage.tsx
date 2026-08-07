import React from 'react';
import { UserProfile } from '../types/index';
import { getXPForNextLevel } from '../utils/cookies';
import { CA_MATH_CHAPTERS } from '../data/mathData';

interface DashboardPageProps {
  user: UserProfile;
  setActiveTab: (tab: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ user, setActiveTab }) => {
  const accuracyPercent = user.totalQuestionsAttempted > 0
    ? Math.round((user.correctQuestionsCount / user.totalQuestionsAttempted) * 100)
    : 0;

  const { nextLevelXP, currentLevelMinXP } = getXPForNextLevel(user.level);
  const xpInLevel = user.xp - currentLevelMinXP;
  const xpNeeded = nextLevelXP - currentLevelMinXP;
  const levelProgress = Math.min(100, Math.floor((xpInLevel / xpNeeded) * 100));

  const watchTimeMinutes = Math.floor((user.watchTimeSeconds || 0) / 60);
  const dailyGoalPercent = Math.min(100, Math.floor((watchTimeMinutes / (user.dailyGoalMinutes || 30)) * 100));

  return (
    <div className="mx-auto max-w-7xl p-8 space-y-8">
      {/* Hero Welcome Banner */}
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
            <button
              onClick={() => setActiveTab('calculator')}
              className="rounded-xl border border-slate-700 bg-slate-800/60 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              🧮 CA Calculator
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition hover:scale-105"
            >
              ⚡ Start Practice Quiz
            </button>
          </div>
        </div>

        {/* Level XP Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
            <span><strong>Level {user.level} Progress</strong> ({user.xp} Total XP)</span>
            <span className="text-cyan-400 font-semibold">{xpInLevel} / {xpNeeded} XP to Level {user.level + 1}</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 transition-all duration-500"
              style={{ width: `${levelProgress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Core Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Accuracy Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg backdrop-blur-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl">🎯</span>
            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${accuracyPercent >= 70 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'}`}>
              {accuracyPercent}% Accuracy
            </span>
          </div>
          <div className="text-xs text-slate-400">Questions Solved</div>
          <div className="text-2xl font-black text-white my-1">
            <span className="text-emerald-400">{user.correctQuestionsCount}</span> / {user.totalQuestionsAttempted}
          </div>
          <div className="text-[11px] text-slate-500">{user.incorrectQuestionsCount} Incorrect answers</div>
        </div>

        {/* Level & Rank Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg backdrop-blur-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl">🏆</span>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
              Level {user.level}
            </span>
          </div>
          <div className="text-xs text-slate-400">Current Rank Title</div>
          <div className="text-lg font-bold text-amber-400 my-1 truncate">
            {user.rankTitle}
          </div>
          <div className="text-[11px] text-slate-500">Unlocked {user.unlockedBadgeIds.length} Badges</div>
        </div>

        {/* Daily Goal Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg backdrop-blur-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl">🔥</span>
            <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 text-xs font-semibold text-amber-400">
              {user.currentStreakDays} Days
            </span>
          </div>
          <div className="text-xs text-slate-400">Daily Target ({user.dailyGoalMinutes}m)</div>
          <div className="text-2xl font-black text-white my-1">
            {watchTimeMinutes}m / {user.dailyGoalMinutes}m
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800 mt-2">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${dailyGoalPercent}%` }}></div>
          </div>
        </div>
      </div>

      {/* Syllabus Breakdown Section */}
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
                  <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs font-semibold text-cyan-400">
                    {ch.category}
                  </span>
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
};
