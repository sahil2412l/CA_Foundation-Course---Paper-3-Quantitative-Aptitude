// Practice Quiz Page Module
function QuizPage({ user, setUser, selectedChapterIdForQuiz, setSelectedChapterIdForQuiz, selectedSubExerciseIdForQuiz, setSelectedSubExerciseIdForQuiz }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [sessionCorrectCount, setSessionCorrectCount] = useState(0);
  const [sessionAttemptCount, setSessionAttemptCount] = useState(0);
  const [showJumpModal, setShowJumpModal] = useState(false);
  const [jumpSearchQuery, setJumpSearchQuery] = useState('');

  const availableQuestions = selectedSubExerciseIdForQuiz
    ? MATH_QUESTIONS.filter(q => q.subExerciseId === selectedSubExerciseIdForQuiz)
    : selectedChapterIdForQuiz
    ? MATH_QUESTIONS.filter(q => q.chapterId === selectedChapterIdForQuiz)
    : MATH_QUESTIONS;

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
    if (selectedOptionIndex === null || isAnswerSubmitted || !currentQ) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOptionIndex === currentQ.correctIndex;
    setSessionAttemptCount(prev => prev + 1);

    if (isCorrect) {
      setSessionCorrectCount(prev => prev + 1);
      playSound('correct');
      if (typeof confetti === 'function') {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
      }
    }

    setUser(prev => {
      const updated = {
        ...prev,
        totalQuestionsAttempted: prev.totalQuestionsAttempted + 1,
        correctQuestionsCount: isCorrect ? prev.correctQuestionsCount + 1 : prev.correctQuestionsCount,
        incorrectQuestionsCount: !isCorrect ? prev.incorrectQuestionsCount + 1 : prev.incorrectQuestionsCount,
      };
      return calculateXPAndLevel(updated);
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < availableQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);
    }
  };

  if (!currentQ) {
    return (
      <div className="mx-auto max-w-4xl p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">No questions found for this topic.</h2>
        <button
          onClick={() => { setSelectedChapterIdForQuiz(null); setSelectedSubExerciseIdForQuiz(null); }}
          className="rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white cursor-pointer"
        >
          Show All Questions
        </button>
      </div>
    );
  }

  const filteredJumpQuestions = availableQuestions.filter((q, idx) =>
    (idx + 1).toString().includes(jumpSearchQuery) ||
    q.questionText.toLowerCase().includes(jumpSearchQuery.toLowerCase()) ||
    (q.chapterName && q.chapterName.toLowerCase().includes(jumpSearchQuery.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-4xl p-8 space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 text-xs font-bold text-cyan-400">
            {currentQ.chapterName}
          </span>
          <span className="ml-2 rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-300">
            {currentQ.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowJumpModal(true)}
            className="rounded-xl border border-indigo-500/40 bg-indigo-600/20 px-3 py-1.5 text-xs font-bold text-indigo-300 hover:bg-indigo-600/30 cursor-pointer flex items-center gap-1.5"
          >
            🔍 Jump to Question
          </button>
          <select
            value={selectedSubExerciseIdForQuiz ? `SUB:${selectedSubExerciseIdForQuiz}` : selectedChapterIdForQuiz || 'ALL'}
            onChange={(e) => {
              const val = e.target.value;
              if (val === 'ALL') {
                setSelectedChapterIdForQuiz(null);
                setSelectedSubExerciseIdForQuiz(null);
              } else if (val.startsWith('SUB:')) {
                setSelectedSubExerciseIdForQuiz(val.replace('SUB:', ''));
              } else {
                setSelectedChapterIdForQuiz(val);
                setSelectedSubExerciseIdForQuiz(null);
              }
              setCurrentQuestionIndex(0);
              setSelectedOptionIndex(null);
              setIsAnswerSubmitted(false);
            }}
            className="rounded-xl bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-white cursor-pointer"
          >
            <option value="ALL">All Topics ({MATH_QUESTIONS.length} Questions)</option>
            {CA_MATH_CHAPTERS.map(ch => (
              <option key={ch.id} value={ch.id}>📚 {ch.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
          <span>Question {currentQuestionIndex + 1} of {availableQuestions.length}</span>
          <span>Session Accuracy: {sessionAttemptCount > 0 ? Math.round((sessionCorrectCount / sessionAttemptCount) * 100) : 0}%</span>
        </div>

        <h3 className="text-xl font-bold text-white leading-relaxed">{currentQ.questionText}</h3>

        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            let btnStyle = "border-slate-800 bg-slate-950 text-slate-200 hover:border-slate-700";
            if (selectedOptionIndex === idx) {
              btnStyle = "border-indigo-500 bg-indigo-950/60 text-white shadow-md shadow-indigo-500/20";
            }
            if (isAnswerSubmitted) {
              if (idx === currentQ.correctIndex) {
                btnStyle = "border-emerald-500 bg-emerald-950/80 text-emerald-200 font-bold";
              } else if (selectedOptionIndex === idx) {
                btnStyle = "border-rose-500 bg-rose-950/80 text-rose-200";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`w-full rounded-2xl border p-4 text-left text-sm font-semibold transition cursor-pointer flex items-center justify-between ${btnStyle}`}
              >
                <span>{opt}</span>
                {isAnswerSubmitted && idx === currentQ.correctIndex && <span>✓ Correct</span>}
              </button>
            );
          })}
        </div>

        {isAnswerSubmitted && (
          <div className="rounded-2xl border border-indigo-500/30 bg-slate-950/90 p-5 space-y-2 text-xs">
            <div className="font-bold text-cyan-400">💡 Solution & Explanation:</div>
            <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>
            {currentQ.formulaUsed && (
              <div className="text-amber-300 font-mono">Formula: {currentQ.formulaUsed}</div>
            )}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
          {!isAnswerSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOptionIndex === null}
              className={`rounded-xl px-6 py-3 text-xs font-bold text-white transition cursor-pointer ${selectedOptionIndex !== null ? 'bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              {currentQuestionIndex < availableQuestions.length - 1 ? 'Next Question →' : 'Practice Completed ✓'}
            </button>
          )}
        </div>
      </div>

      {/* Jump Modal */}
      {showJumpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-xl rounded-2xl border border-indigo-500/30 bg-slate-900 p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Select Question</h3>
              <button onClick={() => setShowJumpModal(false)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>
            <input
              type="text" placeholder="Search question..." value={jumpSearchQuery}
              onChange={(e) => setJumpSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2 text-xs text-white"
            />
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filteredJumpQuestions.map((q) => {
                const origIndex = availableQuestions.indexOf(q);
                return (
                  <div
                    key={q.id}
                    onClick={() => handleJumpToQuestion(origIndex)}
                    className="cursor-pointer rounded-xl bg-slate-950 p-3 border border-slate-800 hover:border-indigo-500/50 flex justify-between items-center text-xs"
                  >
                    <span className="font-bold text-cyan-400">Q{origIndex + 1}</span>
                    <span className="text-slate-200 truncate mx-3 flex-1">{q.questionText}</span>
                    <span className="text-[10px] text-slate-500">{q.difficulty}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
