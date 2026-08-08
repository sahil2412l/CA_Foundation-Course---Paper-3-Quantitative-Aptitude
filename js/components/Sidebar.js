// Sidebar Component Module
function Sidebar({ activeTab, setActiveTab, user }) {
  const { currentLevelMinXP, nextLevelXP } = getXPForNextLevel(user.level);
  const currentXPInLevel = user.xp - currentLevelMinXP;
  const neededXPInLevel = nextLevelXP - currentLevelMinXP;
  const progressPercent = Math.min(100, Math.max(0, Math.floor((currentXPInLevel / neededXPInLevel) * 100)));

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'chapters', label: 'Syllabus & Formulas', icon: '📚' },
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

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-xl mt-auto">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-slate-300">Level {user.level} Progress</span>
          <span className="font-extrabold text-cyan-400">{progressPercent}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
        </div>
        <div className="mt-2 flex justify-between text-[10px] font-medium text-slate-400">
          <span>{user.xp} XP</span>
          <span>{nextLevelXP} XP</span>
        </div>
      </div>
    </aside>
  );
}
