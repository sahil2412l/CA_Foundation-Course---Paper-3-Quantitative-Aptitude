// Flashcards Page Module
function FlashcardsPage() {
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = FLASHCARDS[cardIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % FLASHCARDS.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev - 1 + FLASHCARDS.length) % FLASHCARDS.length);
  };

  return (
    <div className="mx-auto max-w-4xl p-8 space-y-6 animate-fade-in">
      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-white">Formula Flashcards Revision</h1>
        <p className="text-sm text-slate-400">Interactive quick memory flashcards for CA Foundation Math formulas.</p>
      </div>

      <div className="flex justify-center">
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative min-h-[320px] w-full max-w-xl cursor-pointer rounded-3xl border border-indigo-500/30 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-indigo-500/60 flex flex-col justify-between"
        >
          <div className="flex justify-between items-center text-xs font-semibold text-cyan-400">
            <span>{currentCard.chapterTitle}</span>
            <span>Card {cardIndex + 1} of {FLASHCARDS.length}</span>
          </div>

          <div className="my-auto text-center space-y-4">
            {!isFlipped ? (
              <React.Fragment>
                <div className="text-xs uppercase tracking-widest text-indigo-400 font-bold">Formula Concept</div>
                <h2 className="text-2xl font-extrabold text-white">{currentCard.frontTitle}</h2>
                <div className="rounded-2xl bg-slate-950/80 p-4 border border-indigo-500/20 text-indigo-300 font-mono text-lg font-bold">
                  {currentCard.frontFormula}
                </div>
                <p className="text-xs text-slate-500 font-semibold">(Click card to view explanation & example)</p>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Explanation & Example</div>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">{currentCard.backExplanation}</p>
                {currentCard.example && (
                  <div className="rounded-xl bg-slate-950/80 p-3 text-left border border-slate-800 text-xs text-amber-300 font-mono">
                    💡 Example: {currentCard.example}
                  </div>
                )}
              </React.Fragment>
            )}
          </div>

          <div className="text-center text-xs font-semibold text-slate-500">
            🔄 Click anywhere on the card to flip
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4">
        <button
          onClick={handlePrev}
          className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-bold text-slate-200 hover:bg-slate-700 cursor-pointer"
        >
          ← Previous
        </button>
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="rounded-xl border border-indigo-500/40 bg-indigo-600/20 px-5 py-2.5 text-xs font-bold text-indigo-300 hover:bg-indigo-600/30 cursor-pointer"
        >
          🔄 Flip Card
        </button>
        <button
          onClick={handleNext}
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 cursor-pointer"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
