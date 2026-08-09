import React, { useState } from 'react';
import { MATH_QUESTIONS } from '../data/mathData';
import { playSound, calculateXPAndLevel, saveUserProfileToCookies } from '../utils/cookies';

export function QuizPage({ user, setUser, selectedChapterIdForQuiz, setSelectedChapterIdForQuiz, selectedSubExerciseIdForQuiz, setSelectedSubExerciseIdForQuiz }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showJumpModal, setShowJumpModal] = useState(false);

  const availableQuestions = selectedSubExerciseIdForQuiz
    ? MATH_QUESTIONS.filter(q => q.subExerciseId === selectedSubExerciseIdForQuiz)
    : selectedChapterIdForQuiz
      ? MATH_QUESTIONS.filter(q => q.chapterId === selectedChapterIdForQuiz)
      : MATH_QUESTIONS;

  const currentQ = availableQuestions[currentQuestionIndex];

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null || !currentQ || isAnswerSubmitted) return;
    const isCorrect = selectedOptionIndex === currentQ.correctIndex;
    setIsAnswerSubmitted(true);
    playSound(isCorrect ? 'correct' : 'incorrect');

    setUser(prev => {
      const updated = {
        ...prev,
        totalQuestionsAttempted: prev.totalQuestionsAttempted + 1,
        correctQuestionsCount: isCorrect ? prev.correctQuestionsCount + 1 : prev.correctQuestionsCount,
        incorrectQuestionsCount: !isCorrect ? prev.incorrectQuestionsCount + 1 : prev.incorrectQuestionsCount,
      };
      const evaluated = calculateXPAndLevel(updated);
      saveUserProfileToCookies(evaluated);
      return evaluated;
    });
  };

  if (!currentQ) {
    return (
      <div className="p-12 text-center text-white space-y-4">
        <h2 className="text-xl font-bold">No questions found for this selection.</h2>
        <button
          onClick={() => { setSelectedChapterIdForQuiz(null); if (setSelectedSubExerciseIdForQuiz) setSelectedSubExerciseIdForQuiz(null); }}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 text-xs font-bold text-white cursor-pointer"
        >
          Show All Questions
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-8 space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Interactive Math Quiz</h1>
          <p className="text-xs text-slate-400">Practice questions topic-wise or exercise-wise.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 space-y-6 shadow-xl backdrop-blur-xl">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs text-cyan-400 font-semibold">{currentQ.chapterName}</span>
          </div>

          <div className="rounded-lg bg-indigo-500/20 border border-indigo-500/40 px-3 py-1 text-xs font-bold text-indigo-300">
            Question <span className="text-white font-extrabold">{currentQuestionIndex + 1}</span> of {availableQuestions.length}
          </div>
        </div>

        <h2 className="text-lg font-bold text-white leading-relaxed">Q{currentQuestionIndex + 1}. {currentQ.questionText}</h2>

        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            let btnStyle = "border-slate-700 bg-slate-800/40 text-slate-200 hover:bg-slate-800";
            if (selectedOptionIndex === idx) btnStyle = "border-indigo-500 bg-indigo-500/20 text-white";
            if (isAnswerSubmitted) {
              if (idx === currentQ.correctIndex) btnStyle = "border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold";
              else if (selectedOptionIndex === idx) btnStyle = "border-rose-500 bg-rose-500/20 text-rose-300";
            }

            return (
              <div
                key={idx}
                onClick={() => !isAnswerSubmitted && setSelectedOptionIndex(idx)}
                className={`cursor-pointer rounded-xl border p-4 text-sm flex items-center gap-3 transition ${btnStyle}`}
              >
                <span className="h-6 w-6 rounded-full bg-slate-700/50 flex items-center justify-center text-xs font-bold">{String.fromCharCode(65 + idx)}</span>
                <span>{opt}</span>
              </div>
            );
          })}
        </div>

        {!isAnswerSubmitted ? (
          <div className="flex justify-end">
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOptionIndex === null}
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 px-8 py-3 text-sm font-bold text-white disabled:opacity-40 shadow-lg cursor-pointer"
            >
              Submit Answer
            </button>
          </div>
        ) : (
          <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2">
            {currentQ.formulaUsed && (
              <div className="text-xs text-amber-300 mb-1">📐 <strong>Formula:</strong> <code>{currentQ.formulaUsed}</code></div>
            )}
            <div className="text-sm font-bold text-emerald-400">💡 Step-by-step Solution</div>
            <p className="text-xs text-slate-300 leading-relaxed">{currentQ.explanation}</p>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setSelectedOptionIndex(null);
                  setIsAnswerSubmitted(false);
                  setCurrentQuestionIndex(prev => prev < availableQuestions.length - 1 ? prev + 1 : 0);
                }}
                className="rounded-xl bg-emerald-600 hover:bg-emerald-500 px-6 py-2.5 text-xs font-bold text-white transition cursor-pointer"
              >
                Next Question →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
