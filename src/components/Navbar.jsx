import React from 'react';

export function Navbar({ user, activeTab, onOpenQuickWindow, onOpenEmailModal, onOpenNoticeModal, isSidebarCollapsed, onToggleSidebar }) {
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
    <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-900/90 px-8 backdrop-blur-xl transition-all duration-300">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-slate-400 hover:border-indigo-500/50 hover:bg-slate-900 hover:text-white transition cursor-pointer shadow-sm flex items-center gap-1.5"
          title={isSidebarCollapsed ? "Expand Sidebar (Wider View)" : "Collapse Sidebar (Full Screen View)"}
        >
          <span className="text-sm">{isSidebarCollapsed ? '⇥' : '⇤'}</span>
          <span className="text-[11px] font-bold hidden md:inline">{isSidebarCollapsed ? 'Expand' : 'Collapse'}</span>
        </button>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">{tabTitles[activeTab] || 'CA Foundation Math'}</h1>
          <p className="text-xs text-slate-400">
            Welcome back, <span className="font-semibold text-cyan-400">{user.name}</span> • Level {user.level} ({user.rankTitle})
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={onOpenEmailModal}
          className="flex items-center gap-1.5 rounded-xl border border-indigo-500/40 bg-indigo-500/15 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/30 hover:text-white transition shadow-sm cursor-pointer"
          title="Send Direct Email / Feedback"
        >
          <span>📧 Direct Email</span>
        </button>

        <button
          onClick={onOpenNoticeModal}
          className="flex items-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-500/15 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/30 hover:text-white transition shadow-sm cursor-pointer"
          title="View Syllabus Notice"
        >
          <span>ℹ️ Notice</span>
        </button>

        <button
          onClick={onOpenQuickWindow}
          className="flex items-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-bold text-indigo-300 hover:bg-indigo-500/20 hover:text-white transition shadow-sm cursor-pointer"
          title="Open Top-Right Quick Search Window"
        >
          <span>🔍 Quick Search</span>
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
