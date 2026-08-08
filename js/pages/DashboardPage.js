// Dashboard Page Module
function DashboardPage({ user, setActiveTab }) {
  const accuracyPercent = user.totalQuestionsAttempted > 0
    ? Math.round((user.correctQuestionsCount / user.totalQuestionsAttempted) * 100)
    : 0;

  return (
    <div className="mx-auto max-w-7xl p-8 space-y-8 animate-fade-in">
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-8 shadow-2xl backdrop-blur-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 mb-4">
            🚀 CA Foundation Paper 3 Prep
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight sm:text-4xl">
            Master Quantitative Aptitude, LR & Statistics
          </h1>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed font-normal">
            Target 80+ Marks with structured chapter notes, high-yield TVM formulas, quick shortcut tricks, and interactive practice tests.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={() => setActiveTab('chapters')}
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              📚 Browse Syllabus & Formulas
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className="rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 px-6 py-3 text-xs font-bold text-slate-200 transition-all cursor-pointer"
            >
              ✍️ Start Practice Quiz
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg backdrop-blur-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl">⭐</span>
            <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-xs font-semibold text-cyan-400">Level {user.level}</span>
          </div>
          <div className="text-xs text-slate-400">Current Rank</div>
          <div className="text-xl font-bold text-white my-1 truncate">{user.rankTitle}</div>
          <div className="text-xs text-cyan-400 font-semibold">{user.xp} Total XP</div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg backdrop-blur-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl">🎯</span>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">{accuracyPercent}% Accuracy</span>
          </div>
          <div className="text-xs text-slate-400">Questions Solved</div>
          <div className="text-2xl font-black text-white my-1">
            <span className="text-emerald-400">{user.correctQuestionsCount}</span> / {user.totalQuestionsAttempted}
          </div>
          <div className="text-[11px] text-slate-500">{user.incorrectQuestionsCount} Incorrect answers</div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg backdrop-blur-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl">⏳</span>
            <span className="rounded-full bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-0.5 text-xs font-semibold text-indigo-400">14-18 Marks</span>
          </div>
          <div className="text-xs text-slate-400">Highest Weightage Topic</div>
          <div className="text-lg font-bold text-white my-1">Time Value of Money</div>
          <div className="text-[11px] text-indigo-300 font-medium">Simple & Compound Interest, Annuities</div>
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
