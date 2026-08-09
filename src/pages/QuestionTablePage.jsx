import React, { useState } from 'react';
import { CA_MATH_CHAPTERS, MATH_QUESTIONS } from '../data/mathData';

export function QuestionTablePage({ setActiveTab, setSelectedChapterIdForQuiz, setSelectedSubExerciseIdForQuiz }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState('All');
  const [selectedSubExerciseId, setSelectedSubExerciseId] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  const availableSubExercises = selectedChapterId === 'All'
    ? CA_MATH_CHAPTERS.flatMap(ch => ch.subExercises || [])
    : (CA_MATH_CHAPTERS.find(ch => ch.id === selectedChapterId)?.subExercises || []);

  const filteredQuestions = MATH_QUESTIONS.filter(q => {
    const matchesChapter = selectedChapterId === 'All' || q.chapterId === selectedChapterId;
    const matchesSub = selectedSubExerciseId === 'All' || q.subExerciseId === selectedSubExerciseId;
    const matchesDiff = selectedDifficulty === 'All' || (q.difficulty || 'Medium') === selectedDifficulty;

    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query ||
      (q.questionText || '').toLowerCase().includes(query) ||
      (q.chapterName || '').toLowerCase().includes(query) ||
      (q.explanation || '').toLowerCase().includes(query) ||
      (q.formulaUsed || '').toLowerCase().includes(query);

    return matchesChapter && matchesSub && matchesDiff && matchesQuery;
  });

  const handlePracticeQuestion = (chapterId, subExerciseId) => {
    setSelectedChapterIdForQuiz(chapterId);
    if (setSelectedSubExerciseIdForQuiz) setSelectedSubExerciseIdForQuiz(subExerciseId || null);
    setActiveTab('quiz');
  };

  return (
    <div className="mx-auto max-w-7xl p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <span>📋</span> Question Bank Data Table & Multi-Filters
          </h1>
          <p className="text-sm text-slate-400">
            Browse, search, and filter all CA Foundation Quantitative Aptitude questions in a structured data view.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs font-bold text-cyan-400">
          🎯 Matching: {filteredQuestions.length} / {MATH_QUESTIONS.length} Questions
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">🔍 Search Keywords:</label>
            <input
              type="text"
              placeholder="Filter by question, topic, formula..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">📚 Filter by Chapter:</label>
            <select
              value={selectedChapterId}
              onChange={(e) => {
                setSelectedChapterId(e.target.value);
                setSelectedSubExerciseId('All');
              }}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
            >
              <option value="All">All Chapters ({CA_MATH_CHAPTERS.length})</option>
              {CA_MATH_CHAPTERS.map(ch => (
                <option key={ch.id} value={ch.id}>{ch.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">📑 Filter by Sub-Exercise:</label>
            <select
              value={selectedSubExerciseId}
              onChange={(e) => setSelectedSubExerciseId(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
            >
              <option value="All">All Sub-Exercises ({availableSubExercises.length})</option>
              {availableSubExercises.map(sub => (
                <option key={sub.id} value={sub.id}>{sub.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">⚡ Difficulty Level:</label>
            <div className="flex bg-slate-950 border border-slate-800 p-1 rounded-xl">
              {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`flex-1 rounded-lg py-1.5 text-[11px] font-bold transition ${selectedDifficulty === diff
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                    }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-4 px-4 font-bold w-12 text-center">#</th>
                <th className="py-4 px-4 font-bold w-48">Chapter & Unit</th>
                <th className="py-4 px-4 font-bold">Question Preview</th>
                <th className="py-4 px-4 font-bold w-28 text-center">Difficulty</th>
                <th className="py-4 px-4 font-bold w-36 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredQuestions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-500 font-medium">
                    No questions found matching selected filter criteria.
                  </td>
                </tr>
              ) : (
                filteredQuestions.map((q, idx) => {
                  const isExpanded = expandedQuestionId === q.id;
                  const diffColor =
                    q.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                      q.difficulty === 'Hard' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                        'bg-amber-500/10 text-amber-400 border-amber-500/30';

                  return (
                    <React.Fragment key={q.id || idx}>
                      <tr className="hover:bg-slate-800/40 transition">
                        <td className="py-3.5 px-4 font-bold text-center text-slate-400">{idx + 1}</td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-cyan-400 truncate max-w-[180px]">{q.chapterName}</div>
                          <div className="text-[10px] text-slate-400 truncate max-w-[180px]">{q.subExerciseId || 'General'}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-medium text-slate-200 line-clamp-2">{q.questionText}</p>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${diffColor}`}>
                            {q.difficulty || 'Medium'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                              className="rounded-lg bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-[11px] font-semibold text-slate-300 transition cursor-pointer"
                              title="Toggle Solution & Formula Preview"
                            >
                              {isExpanded ? 'Hide 🔼' : 'Details 🔽'}
                            </button>
                            <button
                              onClick={() => handlePracticeQuestion(q.chapterId, q.subExerciseId)}
                              className="rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3 py-1 text-[11px] font-bold text-white shadow-sm transition cursor-pointer"
                            >
                              Practice ⚡
                            </button>
                          </div>
                        </td>
                      </tr>

                      {isExpanded && (
                        <tr className="bg-slate-950/80 border-b border-indigo-500/20">
                          <td colSpan="5" className="p-6">
                            <div className="space-y-3 rounded-xl border border-indigo-500/30 bg-slate-900/90 p-5 backdrop-blur-md">
                              <h4 className="text-xs font-bold text-cyan-400">Options:</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                                {q.options.map((opt, oIdx) => (
                                  <div
                                    key={oIdx}
                                    className={`rounded-lg p-2 border ${oIdx === q.correctIndex
                                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-bold'
                                      : 'bg-slate-950 border-slate-800 text-slate-300'
                                      }`}
                                  >
                                    <span className="font-bold mr-1.5">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                                    {oIdx === q.correctIndex && <span className="ml-2 text-emerald-400">✓ Correct</span>}
                                  </div>
                                ))}
                              </div>

                              {q.formulaUsed && (
                                <div className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-lg">
                                  📐 <strong>Formula Used:</strong> <code>{q.formulaUsed}</code>
                                </div>
                              )}

                              <div className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800">
                                <strong className="text-emerald-400 block mb-1">💡 Step-by-Step Solution:</strong>
                                {q.explanation}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
