// Rank & Badges Page Module
function RankPage({ user }) {
  const currentTier = RANK_TIERS.find(t => user.level >= t.minLevel && user.level <= t.maxLevel) || RANK_TIERS[RANK_TIERS.length - 1];

  return (
    <div className="mx-auto max-w-6xl p-8 space-y-8 animate-fade-in">
      <div className="rounded-3xl border border-indigo-500/20 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-xl flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">Current Rank Tier</div>
          <h1 className="text-3xl font-extrabold text-white mt-1 flex items-center gap-3">
            <span>{currentTier.badge}</span> {currentTier.tierName}
          </h1>
          <p className="text-sm text-slate-400 mt-2">{currentTier.description}</p>
        </div>

        <div className="flex gap-4">
          <div className="rounded-2xl bg-slate-950/80 p-4 border border-slate-800 text-center min-w-[120px]">
            <div className="text-2xl font-black text-amber-400">{user.level}</div>
            <div className="text-[11px] text-slate-400">Level</div>
          </div>
          <div className="rounded-2xl bg-slate-950/80 p-4 border border-slate-800 text-center min-w-[120px]">
            <div className="text-2xl font-black text-cyan-400">{user.xp}</div>
            <div className="text-[11px] text-slate-400">Total XP</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>👑</span> Rank Hierarchy Tiers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {RANK_TIERS.map(tier => {
            const isUnlocked = user.level >= tier.minLevel;
            const isCurrent = user.level >= tier.minLevel && user.level <= tier.maxLevel;

            return (
              <div
                key={tier.tierName}
                className={`rounded-2xl border p-6 shadow-lg backdrop-blur-xl transition ${isCurrent ? 'border-amber-500/50 bg-slate-900/90 shadow-amber-500/10' : isUnlocked ? 'border-slate-800 bg-slate-900/60' : 'border-slate-900 bg-slate-950/40 opacity-60'}`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-3xl">{tier.badge}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${isCurrent ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : isUnlocked ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-500'}`}>
                    {isCurrent ? 'Current Tier' : isUnlocked ? 'Unlocked ✓' : `Req Level ${tier.minLevel}`}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{tier.tierName}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{tier.description}</p>
                <div className="text-xs font-semibold text-slate-500 border-t border-slate-800 pt-3">
                  Levels {tier.minLevel} - {tier.maxLevel}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
