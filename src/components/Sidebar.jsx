import React from 'react';
import { getXPForNextLevel } from '../utils/cookies';

export function Sidebar({ activeTab, setActiveTab, user, isCollapsed, onToggleCollapse }) {
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
    <>
      {/* Mobile Overlay Backdrop */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={onToggleCollapse}
        ></div>
      )}

      <aside className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r border-slate-800 bg-slate-950/95 p-4 backdrop-blur-2xl transition-all duration-300 ${
        isCollapsed ? '-translate-x-full md:translate-x-0 md:w-20' : 'w-64 translate-x-0'
      }`}>
        <div className="mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-xl font-bold text-white shadow-lg shadow-indigo-500/30">
                ∑
              </div>
              {!isCollapsed && (
                <div className="overflow-hidden">
                  <h2 className="text-base font-bold text-white leading-tight whitespace-nowrap">CA Math Hub</h2>
                  <span className="text-xs font-semibold text-cyan-400 whitespace-nowrap">CA Foundation Prep</span>
                </div>
              )}
            </div>
            <button
              onClick={onToggleCollapse}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-pointer"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <span className="text-xs">{isCollapsed ? '▶' : '◀'}</span>
            </button>
          </div>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (window.innerWidth < 768) onToggleCollapse();
              }}
              title={isCollapsed ? item.label : undefined}
              className={`flex w-full items-center gap-3 rounded-xl py-3 text-sm font-medium transition-all duration-200 cursor-pointer ${
                isCollapsed ? 'justify-center px-0' : 'px-4'
              } ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-indigo-500/20 to-cyan-500/10 text-white border border-indigo-500/40 shadow-md shadow-indigo-500/10'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <span className="text-lg shrink-0">{item.icon}</span>
              {!isCollapsed && <span className="whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="mt-auto rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 backdrop-blur-md">
          {isCollapsed ? (
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="text-xs font-extrabold text-cyan-400">L{user.level}</span>
              <span className="text-[10px] text-slate-400 font-bold">{progressPercent}%</span>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </aside>
    </>
  );
}
