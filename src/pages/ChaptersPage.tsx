import React, { useState } from 'react';
import { CA_MATH_CHAPTERS } from '../data/mathData';
import { Chapter } from '../types/index';

interface ChaptersPageProps {
  setActiveTab: (tab: string) => void;
  setSelectedChapterIdForQuiz: (id: string | null) => void;
  setSelectedSubExerciseIdForQuiz: (id: string | null) => void;
}

export const ChaptersPage: React.FC<ChaptersPageProps> = ({
  setActiveTab,
  setSelectedChapterIdForQuiz,
  setSelectedSubExerciseIdForQuiz
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'inside' | 'outside'>('inside');
  const [activeFormulaChapter, setActiveFormulaChapter] = useState<Chapter | null>(null);

  const filteredChapters = selectedCategory === 'All'
    ? CA_MATH_CHAPTERS
    : CA_MATH_CHAPTERS.filter(c => c.category === selectedCategory);

  const allSubExercises = filteredChapters.flatMap(ch =>
    (ch.subExercises || []).map(sub => ({ ...sub, chapter: ch }))
  );

  const handleStartChapterQuiz = (chapterId: string) => {
    setSelectedSubExerciseIdForQuiz(null);
    setSelectedChapterIdForQuiz(chapterId);
    setActiveTab('quiz');
  };

  const handleStartSubExerciseQuiz = (chapterId: string, subExerciseId: string) => {
    setSelectedChapterIdForQuiz(chapterId);
    setSelectedSubExerciseIdForQuiz(subExerciseId);
    setActiveTab('quiz');
  };


  return (
    <div className="page-wrapper fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', color: '#fff' }}>CA Foundation Quantitative Aptitude Syllabus</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Comprehensive chapter notes, key formulas, shortcut memory tricks & marks weightage.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Inside / Outside View Toggle */}
          <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', padding: '4px', borderRadius: '10px', display: 'flex', gap: '4px' }}>
            <button
              onClick={() => setViewMode('inside')}
              className={`btn ${viewMode === 'inside' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              📂 Inside Chapters
            </button>
            <button
              onClick={() => setViewMode('outside')}
              className={`btn ${viewMode === 'outside' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '6px 12px', fontSize: '12px' }}
            >
              📜 Outside Exercises
            </button>
          </div>

          {/* Category Filters */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {['All', 'Math', 'Logical Reasoning', 'Statistics'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '6px 12px', fontSize: '12px' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {viewMode === 'inside' ? (
        /* Chapters Grid (Inside Chapter View) */
        <div className="grid-2" style={{ marginBottom: '32px' }}>
          {filteredChapters.map(ch => (
            <div key={ch.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="pill-badge pill-cyan">{ch.category}</span>
                <span className="pill-badge pill-amber" style={{ fontSize: '13px' }}>
                  Weightage: {ch.weightage}
                </span>
              </div>

              <h2 style={{ fontSize: '20px', color: '#fff', marginBottom: '8px' }}>{ch.title}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '20px', flex: 1 }}>
                {ch.description}
              </p>

              {/* Sub-Exercises Breakdown with Inside & Outside Buttons */}
              {ch.subExercises && ch.subExercises.length > 0 && (
                <div style={{ background: 'rgba(15, 23, 42, 0.5)', borderRadius: '12px', padding: '12px', marginBottom: '16px', border: '1px solid rgba(56, 189, 248, 0.15)' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#38bdf8', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>📑 Sub-Exercises & Units ({ch.subExercises.length})</span>
                    <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: '400' }}>Practice Options:</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {ch.subExercises.map(sub => (
                      <div
                        key={sub.id}
                        style={{
                          background: '#1e293b',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: '1px solid rgba(255,255,255,0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '8px'
                        }}
                      >
                        <span style={{ fontSize: '12px', color: '#e2e8f0' }}>
                          <strong style={{ color: '#fbbf24' }}>{sub.title.split(':')[0]}</strong>: {sub.title.split(':')[1] || sub.title}
                        </span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            onClick={() => handleStartChapterQuiz(ch.id)}
                            style={{
                              background: 'rgba(99, 102, 241, 0.2)',
                              color: '#a5b4fc',
                              border: '1px solid rgba(99, 102, 241, 0.4)',
                              padding: '4px 8px',
                              borderRadius: '6px',
                              fontSize: '11px',
                              fontWeight: '600',
                              cursor: 'pointer'
                            }}
                            title="Practice inside full chapter"
                          >
                            🎯 Inside Chapter
                          </button>
                          <button
                            onClick={() => handleStartSubExerciseQuiz(ch.id, sub.id)}
                            style={{
                              background: 'rgba(245, 158, 11, 0.2)',
                              color: '#fcd34d',
                              border: '1px solid rgba(245, 158, 11, 0.4)',
                              padding: '4px 8px',
                              borderRadius: '6px',
                              fontSize: '11px',
                              fontWeight: '600',
                              cursor: 'pointer'
                            }}
                            title="Practice only this specific exercise standalone"
                          >
                            📄 Outside Ex
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '12px', padding: '14px', marginBottom: '16px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--cyan)', marginBottom: '8px' }}>
                  📐 Key Formula Preview ({ch.formulas.length} Formulas)
                </div>
                <ul style={{ listStyle: 'none', fontSize: '13px', color: 'var(--text-main)' }}>
                  {ch.formulas.slice(0, 2).map((f, idx) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>
                      <strong>{f.title}:</strong> <code style={{ color: '#a5b4fc', background: 'rgba(99, 102, 241, 0.15)', padding: '2px 6px', borderRadius: '4px' }}>{f.formula}</code>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setActiveFormulaChapter(ch)}
                  className="btn btn-secondary"
                  style={{ flex: 1, fontSize: '13px' }}
                >
                  📖 View All Formulas
                </button>
                <button
                  onClick={() => handleStartChapterQuiz(ch.id)}
                  className="btn btn-primary"
                  style={{ flex: 1, fontSize: '13px' }}
                >
                  ⚡ Practice Full Chapter
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Outside Exercises View (Direct Flat Grid of all Exercises) */
        <div style={{ marginBottom: '32px' }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', padding: '12px 16px', borderRadius: '12px', fontSize: '13px', color: '#cbd5e1', marginBottom: '16px' }}>
            💡 <strong>Outside Exercises View:</strong> Standalone direct access to every exercise unit across the syllabus.
          </div>
          <div className="grid-2">
            {allSubExercises.map(sub => (
              <div key={sub.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="pill-badge pill-cyan">{sub.chapter.title}</span>
                    <span className="pill-badge pill-amber" style={{ fontSize: '12px' }}>{sub.chapter.weightage}</span>
                  </div>
                  <h3 style={{ fontSize: '18px', color: '#fff', margin: '8px 0 4px 0' }}>{sub.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '16px' }}>
                    Exercise unit from chapter: {sub.chapter.title}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', pt: '12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <button
                    onClick={() => handleStartChapterQuiz(sub.chapter.id)}
                    className="btn btn-secondary"
                    style={{ flex: 1, fontSize: '12px', padding: '8px' }}
                  >
                    🎯 Practice Inside Chapter
                  </button>
                  <button
                    onClick={() => handleStartSubExerciseQuiz(sub.chapter.id, sub.id)}
                    className="btn btn-primary"
                    style={{ flex: 1, fontSize: '12px', padding: '8px' }}
                  >
                    📄 Practice Outside (Only Ex)
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Formula Cheat Sheet Modal */}
      {activeFormulaChapter && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px'
        }}>
          <div className="glass-card" style={{ maxWidth: '650px', width: '100%', maxHeight: '85vh', overflowY: 'auto', background: '#0f172a', border: '1px solid var(--primary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '22px', color: '#fff' }}>📐 {activeFormulaChapter.title} Formulas</h2>
              <button
                onClick={() => setActiveFormulaChapter(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '24px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              {activeFormulaChapter.formulas.map((f, i) => (
                <div key={i} style={{ background: 'rgba(30, 41, 59, 0.7)', padding: '14px', borderRadius: '12px', marginBottom: '12px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontWeight: '700', color: 'var(--cyan)', fontSize: '15px', marginBottom: '4px' }}>
                    {f.title}
                  </div>
                  <div style={{ fontSize: '16px', color: '#fef08a', background: 'rgba(0,0,0,0.3)', padding: '8px 12px', borderRadius: '8px', fontFamily: 'monospace', marginBottom: '6px' }}>
                    {f.formula}
                  </div>
                  {f.note && (
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      💡 <em>{f.note}</em>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setActiveFormulaChapter(null)} className="btn btn-secondary">Close</button>
              <button onClick={() => { const id = activeFormulaChapter.id; setActiveFormulaChapter(null); handleStartChapterQuiz(id); }} className="btn btn-emerald">Start Quiz for this Chapter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
