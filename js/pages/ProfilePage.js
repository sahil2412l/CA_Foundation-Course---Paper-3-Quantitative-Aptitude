// Profile Page Module
function ProfilePage({ user, setUser }) {
  const [nameInput, setNameInput] = useState(user.name);
  const [goalInput, setGoalInput] = useState(user.dailyGoalMinutes);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const accuracyPercent = user.totalQuestionsAttempted > 0
    ? Math.round((user.correctQuestionsCount / user.totalQuestionsAttempted) * 100)
    : 0;

  const handleSave = (e) => {
    e.preventDefault();
    setUser(prev => {
      const updated = {
        ...prev,
        name: nameInput.trim() || 'CA Aspirant',
        dailyGoalMinutes: Number(goalInput) || 30
      };
      saveUserProfileToCookies(updated);
      return updated;
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl p-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Student Profile & Settings</h1>
        <p className="text-sm text-slate-400">Manage your profile, learning preferences and track overall study stats.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl text-center space-y-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-3xl font-extrabold text-white shadow-xl shadow-indigo-500/20">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{user.name}</h2>
            <div className="text-xs text-cyan-400 font-semibold mt-0.5">{user.rankTitle} (Level {user.level})</div>
          </div>
          <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400"><span>Target Exam:</span><span className="font-semibold text-white">CA Foundation</span></div>
            <div className="flex justify-between text-slate-400"><span>Accuracy:</span><span className="font-semibold text-emerald-400">{accuracyPercent}%</span></div>
            <div className="flex justify-between text-slate-400"><span>Streak:</span><span className="font-semibold text-amber-400">{user.currentStreakDays} Days</span></div>
          </div>
        </div>

        <div className="md:col-span-2 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl space-y-6">
          <h3 className="text-lg font-bold text-white">Edit Profile Details</h3>
          {savedSuccess && (
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs text-emerald-400 font-semibold">
              ✓ Profile saved successfully!
            </div>
          )}
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Aspirant Name</label>
              <input
                type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Daily Study Target (Minutes)</label>
              <input
                type="number" value={goalInput} onChange={(e) => setGoalInput(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
