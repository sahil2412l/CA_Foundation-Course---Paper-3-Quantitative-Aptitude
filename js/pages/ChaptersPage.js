// Chapters Page Module
function ChaptersPage({ setActiveTab, setSelectedChapterIdForQuiz, setSelectedSubExerciseIdForQuiz }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = selectedCategory === 'All'
    ? CA_MATH_CHAPTERS
    : CA_MATH_CHAPTERS.filter(c => c.category === selectedCategory);

  const handleStartExercise = (chapterId, subId) => {
    setSelectedChapterIdForQuiz(chapterId);
    if (setSelectedSubExerciseIdForQuiz) setSelectedSubExerciseIdForQuiz(subId || null);
    setActiveTab('quiz');
  };

  const handlePracticeFullChapter = (chapterId) => {
    setSelectedChapterIdForQuiz(chapterId);
    if (setSelectedSubExerciseIdForQuiz) setSelectedSubExerciseIdForQuiz(null);
    setActiveTab('quiz');
  };

  return (
    <div className="mx-auto max-w-7xl p-8 space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">CA Foundation Math Syllabus</h1>
          <p className="text-sm text-slate-400">Chapter notes, key formulas, shortcut memory tricks & marks weightage.</p>
        </div>
        
        <div className="flex gap-1.5">
          {['All', 'Math', 'Logical Reasoning', 'Statistics'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${selectedCategory === cat ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(ch => (
          <div key={ch.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-xs font-semibold text-cyan-400">{ch.category}</span>
                <span className="text-xs font-bold text-amber-400">Weightage: {ch.weightage}</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{ch.title}</h2>
              <p className="text-sm text-slate-400 mb-4">{ch.description}</p>

              {/* Sub-Exercises Breakdown with Single Exercise Button */}
              {ch.subExercises && ch.subExercises.length > 0 ? (
                <div className="rounded-xl bg-slate-950/60 p-3 border border-cyan-500/20 mb-4 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-cyan-400 mb-1">
                    <span>📑 Chapter Exercises & Units ({ch.subExercises.length})</span>
                    <span className="text-[10px] text-slate-400 font-normal">Click Exercise to practice</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    {ch.subExercises.map(sub => (
                      <div
                        key={sub.id}
                        className="rounded-lg bg-slate-900 p-2.5 border border-slate-800 flex flex-wrap items-center justify-between gap-2 hover:border-slate-700 transition"
                      >
                        <div className="font-medium text-slate-200 text-xs">
                          <span className="font-bold text-amber-400">{sub.title.split(':')[0]}</span>: {sub.title.split(':')[1] || sub.title}
                        </div>
                        <button
                          onClick={() => handleStartExercise(ch.id, sub.id)}
                          className="rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 px-3 py-1 text-xs font-bold text-white shadow-md shadow-indigo-600/30 transition cursor-pointer flex items-center gap-1"
                          title={`Start practice for ${sub.title}`}
                        >
                          📝 Exercise
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-xl bg-slate-950/60 p-3 border border-cyan-500/20 mb-4 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-cyan-400 mb-1">
                    <span>📑 Chapter Exercise</span>
                    <span className="text-[10px] text-slate-400 font-normal">Practice Unit</span>
                  </div>
                  <div className="rounded-lg bg-slate-900 p-2.5 border border-slate-800 flex items-center justify-between gap-2 text-xs">
                    <div className="font-medium text-slate-200 text-xs">
                      <span className="font-bold text-amber-400">Exercise 1</span>: Main Practice Set
                    </div>
                    <button
                      onClick={() => handleStartExercise(ch.id, null)}
                      className="rounded-md bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 px-3 py-1 text-xs font-bold text-white shadow-md shadow-indigo-600/30 transition cursor-pointer flex items-center gap-1"
                      title={`Start exercise for ${ch.title}`}
                    >
                      📝 Exercise
                    </button>
                  </div>
                </div>
              )}

              <div className="rounded-xl bg-slate-950/60 p-4 border border-slate-800 mb-4">
                <div className="text-xs font-bold text-cyan-400 mb-2">📐 Key Formulas Preview</div>
                <ul className="space-y-1 text-xs text-slate-300">
                  {ch.formulas.slice(0, 2).map((f, idx) => (
                    <li key={idx}>
                      <strong>{f.title}:</strong> <code className="text-indigo-300 bg-indigo-500/10 px-1.5 py-0.5 rounded">{f.formula}</code>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => handlePracticeFullChapter(ch.id)}
              className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 py-3 text-xs font-bold text-white transition cursor-pointer shadow-lg shadow-indigo-600/20 mt-2"
            >
              ⚡ Practice Full Chapter Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
