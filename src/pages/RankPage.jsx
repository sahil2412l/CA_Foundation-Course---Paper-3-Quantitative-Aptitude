import React from 'react';

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
