import React from 'react';
import { NavbarProps } from './NavbarProps';

export const Navbar: React.FC<NavbarProps> = ({ user, activeTab }) => {
  const getTabTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard': return 'Dashboard Overview';
      case 'chapters': return 'CA Foundation Quantitative Aptitude Syllabus & Formulas';
      case 'flashcards': return 'Formula Flashcards Revision';
      case 'calculator': return 'CA Calculator';
      case 'quiz': return 'Practice Quiz & Mock Tests';
      case 'rank': return 'Level & Rank System';
      case 'profile': return 'Profile';
      default: return 'CA Foundation Math Prep';
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-900/90 px-8 backdrop-blur-xl">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">{getTabTitle(activeTab)}</h1>
        <p className="text-xs text-slate-400">
          Welcome back, <span className="font-semibold text-cyan-400">{user.name}</span> • Level {user.level} ({user.rankTitle})
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Cookie Sync Indicator */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Cookies Synced ✓
        </div>

        {/* Streak Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
          🔥 {user.currentStreakDays} Day Streak
        </div>
      </div>
    </header>
  );
};
