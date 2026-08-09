import React from 'react';

export function ProfilePage({ user, setUser }) {
  return (
    <div className="mx-auto max-w-7xl p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">👤 User Profile</h1>
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
