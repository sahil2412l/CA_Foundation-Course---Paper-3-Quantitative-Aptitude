import React, { useState } from 'react';
import { CA_MATH_CHAPTERS, MATH_QUESTIONS } from '../data/mathData';

export function TopRightQuickWindowModal({ isOpen, onClose, setActiveTab, setSelectedChapterIdForQuiz, setSelectedSubExerciseIdForQuiz }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedChapterId, setSelectedChapterId] = useState('All');

  if (!isOpen) return null;

  const categories = ['All', 'Math', 'Logical Reasoning', 'Statistics'];

  const filteredQuestions = MATH_QUESTIONS.filter(q => {
    const chapter = CA_MATH_CHAPTERS.find(c => c.id === q.chapterId);
    const matchesCategory = selectedCategory === 'All' || (chapter && chapter.category === selectedCategory);
    const matchesChapter = selectedChapterId === 'All' || q.chapterId === selectedChapterId;
    const qText = (q.questionText || '').toLowerCase();
    const qChapter = (q.chapterName || '').toLowerCase();
    const qFormula = (q.formulaUsed || '').toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query || qText.includes(query) || qChapter.includes(query) || qFormula.includes(query);
    return matchesCategory && matchesChapter && matchesQuery;
  });

  const handleJump = (chapterId, subId) => {
    setSelectedChapterIdForQuiz(chapterId);
    if (setSelectedSubExerciseIdForQuiz) setSelectedSubExerciseIdForQuiz(subId || null);
    setActiveTab('quiz');
    onClose();
  };

  return (
    <div className="fixed top-20 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] rounded-2xl border border-indigo-500/40 bg-slate-900/95 p-5 shadow-2xl backdrop-blur-2xl transition-all">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-lg">⚡</span>
          <div>
            <h3 className="text-sm font-bold text-white leading-tight">Top-Right Quick Window</h3>
            <span className="text-[10px] text-cyan-400 font-semibold">Question Search & Quick Filter</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition cursor-pointer"
        >
          ✕
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="🔍 Search questions, formulas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            autoFocus
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition cursor-pointer ${selectedCategory === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div>
          <select
            value={selectedChapterId}
            onChange={(e) => setSelectedChapterId(e.target.value)}
            className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-1.5 text-xs text-slate-300 focus:border-indigo-500 focus:outline-none"
          >
            <option value="All">📚 All Chapters</option>
            {CA_MATH_CHAPTERS.map(ch => (
              <option key={ch.id} value={ch.id}>{ch.title}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center text-[11px] font-bold text-cyan-400">
          <span>Matching Questions</span>
          <span className="rounded-full bg-cyan-500/10 px-2 py-0.5 border border-cyan-500/20">{filteredQuestions.length} items</span>
        </div>

        <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
          {filteredQuestions.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500">No questions found matching filter</div>
          ) : (
            filteredQuestions.slice(0, 15).map((q, idx) => (
              <div
                key={q.id || idx}
                onClick={() => handleJump(q.chapterId, q.subExerciseId)}
                className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-950/60 p-3 hover:border-indigo-500/50 hover:bg-indigo-950/30 transition space-y-1"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-amber-400 truncate max-w-[180px]">{q.chapterName}</span>
                  <span className="rounded bg-indigo-500/10 text-indigo-300 px-1.5 py-0.5 border border-indigo-500/20">{q.difficulty || 'Medium'}</span>
                </div>
                <p className="text-xs text-slate-200 line-clamp-2 group-hover:text-white">{q.questionText}</p>
                <div className="flex justify-end pt-1">
                  <span className="text-[10px] text-cyan-400 font-semibold group-hover:underline">Start Practice →</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
