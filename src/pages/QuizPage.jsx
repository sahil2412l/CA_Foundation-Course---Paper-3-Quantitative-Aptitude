import React, { useState } from 'react';
import { CA_MATH_CHAPTERS } from '../data/mathData';
import { getQuestionsForQuiz, getAllQuestions } from '../data/questionManager';
import { saveUserProfileToCookies, calculateXPAndLevel } from '../utils/cookies';

export const QuizPage = ({
  user,
  setUser,
  selectedChapterIdForQuiz,
  setSelectedChapterIdForQuiz,
  selectedSubExerciseIdForQuiz,
  setSelectedSubExerciseIdForQuiz
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [sessionCorrectCount, setSessionCorrectCount] = useState(0);
  const [sessionAttemptCount, setSessionAttemptCount] = useState(0);
  const [showJumpModal, setShowJumpModal] = useState(false);
  const [jumpSearchQuery, setJumpSearchQuery] = useState('');

  // Filter questions based on sub-exercise first, then chapter, or load all using questionManager
  const availableQuestions = getQuestionsForQuiz(selectedChapterIdForQuiz, selectedSubExerciseIdForQuiz);
  const totalAllQuestions = getAllQuestions();

  const currentQ = availableQuestions[currentQuestionIndex];

  const handleJumpToQuestion = (targetIdx) => {
    if (targetIdx >= 0 && targetIdx < availableQuestions.length) {
      setCurrentQuestionIndex(targetIdx);
      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);
      setShowJumpModal(false);
    }
  };

  const handleSelectOption = (idx) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionIndex(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null || !currentQ || isAnswerSubmitted) return;

    const isCorrect = selectedOptionIndex === currentQ.correctIndex;
    setIsAnswerSubmitted(true);
    setSessionAttemptCount(prev => prev + 1);

    if (isCorrect) {
      setSessionCorrectCount(prev => prev + 1);
      // Trigger confetti celebration!
      try {
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 }
          });
        }
      } catch (e) {
        console.log('Confetti not available:', e);
      }
    }

    // Update User Profile state and save IMMEDIATELY to Cookies
    setUser((prev) => {
      const updatedProfile = {
        ...prev,
        totalQuestionsAttempted: prev.totalQuestionsAttempted + 1,
        correctQuestionsCount: isCorrect ? prev.correctQuestionsCount + 1 : prev.correctQuestionsCount,
        incorrectQuestionsCount: !isCorrect ? prev.incorrectQuestionsCount + 1 : prev.incorrectQuestionsCount,
      };

      const evaluated = calculateXPAndLevel(updatedProfile);
      saveUserProfileToCookies(evaluated);
      return evaluated;
    });
  };

  const handleNextQuestion = () => {
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    if (currentQuestionIndex < availableQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Loop back to start or reset
      setCurrentQuestionIndex(0);
    }
  };

  if (!currentQ) {
    return (
      <div className="page-wrapper fade-in" style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2>No questions found for this topic.</h2>
        <button onClick={() => { setSelectedChapterIdForQuiz(null); setSelectedSubExerciseIdForQuiz(null); }} className="btn btn-primary" style={{ marginTop: '16px' }}>
          Show All Questions
        </button>
      </div>
    );
  }

  const selectedChapterObj = CA_MATH_CHAPTERS.find(c => c.id === selectedChapterIdForQuiz);
  
  // Find current sub-exercise title if available
  let selectedSubTitle = '';
  if (selectedSubExerciseIdForQuiz) {
    for (const ch of CA_MATH_CHAPTERS) {
      const foundSub = ch.subExercises?.find(s => s.id === selectedSubExerciseIdForQuiz);
      if (foundSub) {
        selectedSubTitle = foundSub.title;
        break;
      }
    }
  }

  const filteredJumpQuestions = availableQuestions.filter((q, idx) =>
    jumpSearchQuery.trim() === '' ||
    `q${idx + 1}`.includes(jumpSearchQuery.toLowerCase()) ||
    q.questionText.toLowerCase().includes(jumpSearchQuery.toLowerCase())
  );

  return (
    <div className="page-wrapper fade-in">
      {/* Quiz Header & Chapter Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', items: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', color: '#fff' }}>Interactive Math Quiz</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            Filter by topic or sub-exercise, earn +4 XP per correct answer!
          </p>
        </div>

        {/* Filter Dropdown & Question Jump Quick Select */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            value={selectedSubExerciseIdForQuiz ? `SUB:${selectedSubExerciseIdForQuiz}` : (selectedChapterIdForQuiz || 'ALL')}
            onChange={(e) => {
              const val = e.target.value;
              if (val === 'ALL') {
                setSelectedChapterIdForQuiz(null);
                setSelectedSubExerciseIdForQuiz(null);
              } else if (val.startsWith('SUB:')) {
                const subId = val.replace('SUB:', '');
                setSelectedSubExerciseIdForQuiz(subId);
                // set corresponding chapterId as well
                const parentCh = CA_MATH_CHAPTERS.find(c => c.subExercises?.some(s => s.id === subId));
                if (parentCh) setSelectedChapterIdForQuiz(parentCh.id);
              } else {
                setSelectedChapterIdForQuiz(val);
                setSelectedSubExerciseIdForQuiz(null);
              }
              setCurrentQuestionIndex(0);
              setSelectedOptionIndex(null);
              setIsAnswerSubmitted(false);
            }}
            style={{
              background: '#1e293b',
              color: '#fff',
              border: '1px solid var(--border-color)',
              padding: '10px 16px',
              borderRadius: '10px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            <option value="ALL">All CA Foundation Topics ({totalAllQuestions.length} Questions)</option>
            {CA_MATH_CHAPTERS.map(ch => (
              <React.Fragment key={ch.id}>
                <option value={ch.id}>
                  📚 {ch.title} ({ch.category})
                </option>
                {ch.subExercises?.map(sub => (
                  <option key={sub.id} value={`SUB:${sub.id}`}>
                    -- 📑 {sub.title}
                  </option>
                ))}
              </React.Fragment>
            ))}
          </select>

          {/* Quick Jump Search Box / Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Jump Q:</span>
            <select
              value={currentQuestionIndex}
              onChange={(e) => handleJumpToQuestion(Number(e.target.value))}
              style={{
                background: '#0f172a',
                color: '#38bdf8',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                padding: '10px 14px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {availableQuestions.map((q, idx) => (
                <option key={q.id || idx} value={idx}>
                  Q{idx + 1}: {q.questionText.length > 35 ? q.questionText.slice(0, 35) + '...' : q.questionText}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Session Progress Header */}
      <div className="glass-card" style={{ padding: '16px 24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Current Topic: </span>
          <strong style={{ color: 'var(--cyan)' }}>{selectedChapterObj ? selectedChapterObj.title : 'All Topics'}</strong>
          {selectedSubTitle && (
            <span style={{ color: '#fbbf24', marginLeft: '8px', fontSize: '13px', fontWeight: '600' }}>
              ({selectedSubTitle})
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', fontSize: '14px' }}>
          {/* Question Jump Trigger Button */}
          <button
            onClick={() => setShowJumpModal(true)}
            style={{
              background: 'rgba(99, 102, 241, 0.2)',
              color: '#a5b4fc',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>🔍 Search / Jump Q#</span>
            <strong style={{ color: '#fff' }}>{currentQuestionIndex + 1} of {availableQuestions.length}</strong>
          </button>

          <div>
            <span>Session Accuracy: </span>
            <strong style={{ color: 'var(--emerald)' }}>
              {sessionAttemptCount > 0 ? Math.round((sessionCorrectCount / sessionAttemptCount) * 100) : 0}%
            </strong>
          </div>
          <div>
            <span>Lifetime Correct: </span>
            <strong style={{ color: 'var(--amber)' }}>{user.correctQuestionsCount} / {user.totalQuestionsAttempted}</strong>
          </div>
        </div>
      </div>

      {/* Question Main Card */}
      <div className="glass-card" style={{ padding: '32px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span className="pill-badge pill-cyan">{currentQ.chapterName}</span>
            {currentQ.subExerciseId && (
              <span className="pill-badge pill-amber" style={{ fontSize: '12px' }}>
                📑 {currentQ.subExerciseId.toUpperCase()}
              </span>
            )}
          </div>
          <span className={`pill-badge ${currentQ.difficulty === 'Easy' ? 'pill-emerald' : currentQ.difficulty === 'Medium' ? 'pill-amber' : 'pill-badge'}`}>
            {currentQ.difficulty} Difficulty
          </span>
        </div>

        <h2 style={{ fontSize: '20px', color: '#fff', marginBottom: '24px', lineHeight: '1.4' }}>
          Q{currentQuestionIndex + 1}. {currentQ.questionText}
        </h2>

        {/* Options Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {currentQ.options.map((opt, idx) => {
            let optionClass = 'quiz-option';
            if (selectedOptionIndex === idx) {
              optionClass += ' selected';
            }
            if (isAnswerSubmitted) {
              if (idx === currentQ.correctIndex) {
                optionClass += ' correct';
              } else if (selectedOptionIndex === idx && idx !== currentQ.correctIndex) {
                optionClass += ' incorrect';
              }
            }

            return (
              <div
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={optionClass}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: '700'
                }}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span>{opt}</span>
              </div>
            );
          })}
        </div>

        {/* Submit or Next Buttons */}
        {!isAnswerSubmitted ? (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOptionIndex === null}
              className="btn btn-primary"
              style={{
                padding: '12px 32px',
                fontSize: '15px',
                opacity: selectedOptionIndex === null ? 0.5 : 1,
                cursor: selectedOptionIndex === null ? 'not-allowed' : 'pointer'
              }}
            >
              Submit Answer
            </button>
          </div>
        ) : (
          <div className="fade-in" style={{
            background: selectedOptionIndex === currentQ.correctIndex ? 'rgba(16, 185, 129, 0.12)' : 'rgba(244, 63, 94, 0.12)',
            border: selectedOptionIndex === currentQ.correctIndex ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: '12px',
            padding: '20px',
            marginTop: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ fontSize: '24px' }}>
                {selectedOptionIndex === currentQ.correctIndex ? '🎉' : '❌'}
              </span>
              <div>
                <h3 style={{ fontSize: '18px', color: selectedOptionIndex === currentQ.correctIndex ? '#6ee7b7' : '#fda4af' }}>
                  {selectedOptionIndex === currentQ.correctIndex ? 'Correct Answer! (+4 XP)' : 'Incorrect Answer'}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Data automatically updated & saved in browser cookies.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '12px', background: 'rgba(15, 23, 42, 0.6)', padding: '14px', borderRadius: '10px' }}>
              {currentQ.formulaUsed && (
                <div style={{ marginBottom: '8px', fontSize: '13px', color: '#fef08a' }}>
                  📐 <strong>Formula:</strong> <code>{currentQ.formulaUsed}</code>
                </div>
              )}
              <div style={{ fontSize: '14px', color: 'var(--text-main)', lineHeight: '1.5' }}>
                💡 <strong>Step-by-step Solution:</strong> {currentQ.explanation}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button onClick={handleNextQuestion} className="btn btn-emerald" style={{ padding: '12px 28px' }}>
                Next Question →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Question Jump Search Modal */}
      {showJumpModal && (
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
          <div className="glass-card" style={{ maxWidth: '600px', width: '100%', maxHeight: '85vh', overflowY: 'auto', background: '#0f172a', border: '1px solid var(--primary)', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '20px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>🔍</span> Search & Jump to Question
              </h2>
              <button
                onClick={() => setShowJumpModal(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '24px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Search Input Box */}
            <div style={{ marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Search by Q number (e.g. 3) or keywords in question..."
                value={jumpSearchQuery}
                onChange={(e) => setJumpSearchQuery(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  background: '#1e293b',
                  color: '#fff',
                  border: '1px solid var(--border-color)',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  fontSize: '14px'
                }}
              />
            </div>

            {/* Question Quick Jump Grid */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--cyan)', marginBottom: '8px' }}>
                ⚡ Quick Question Grid:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(42px, 1fr))', gap: '8px' }}>
                {availableQuestions.map((q, idx) => (
                  <button
                    key={q.id || idx}
                    onClick={() => handleJumpToQuestion(idx)}
                    style={{
                      background: currentQuestionIndex === idx ? 'var(--primary)' : '#1e293b',
                      color: currentQuestionIndex === idx ? '#fff' : '#cbd5e1',
                      border: currentQuestionIndex === idx ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
                      padding: '8px 0',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                    title={`Q${idx + 1}: ${q.questionText}`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* List View of Matching Questions */}
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Matching Questions ({filteredJumpQuestions.length}):
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '250px', overflowY: 'auto' }}>
              {filteredJumpQuestions.map((q) => {
                const origIndex = availableQuestions.indexOf(q);
                return (
                  <button
                    key={q.id}
                    onClick={() => handleJumpToQuestion(origIndex)}
                    style={{
                      background: currentQuestionIndex === origIndex ? 'rgba(56, 189, 248, 0.15)' : '#1e293b',
                      border: currentQuestionIndex === origIndex ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.08)',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      textAlign: 'left',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '13px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontWeight: '700', color: '#fbbf24' }}>Question {origIndex + 1}</span>
                      <span style={{ fontSize: '11px', color: 'var(--cyan)' }}>{q.difficulty}</span>
                    </div>
                    <div style={{ color: '#e2e8f0', fontSize: '12px' }}>{q.questionText}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
