import React, { useState } from 'react';
import { FLASHCARDS } from '../data/mathData';

export const FlashcardsPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = FLASHCARDS[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < FLASHCARDS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(FLASHCARDS.length - 1);
    }
  };

  return (
    <div className="page-wrapper fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', color: '#fff' }}>🎴 CA Math Formula Flashcards</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Interactive flip cards to quickly memorize key formulas, rules, and shortcut examples.
        </p>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* Flashcard Container */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="glass-card glass-card-interactive"
          style={{
            minHeight: '320px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '36px',
            background: isFlipped ? 'linear-gradient(135deg, rgba(30, 27, 75, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)' : 'var(--bg-card)',
            border: isFlipped ? '2px solid var(--primary)' : '1px solid var(--border-color)',
            borderRadius: '20px',
            marginBottom: '24px',
            position: 'relative'
          }}
        >
          <div style={{ position: 'absolute', top: '16px', left: '16px' }} className="pill-badge pill-cyan">
            {currentCard.chapterTitle}
          </div>

          <div style={{ position: 'absolute', top: '16px', right: '16px', fontSize: '12px', color: 'var(--text-dim)' }}>
            Click card to flip 🔄
          </div>

          {!isFlipped ? (
            <div className="fade-in">
              <h2 style={{ fontSize: '24px', color: '#fff', marginBottom: '16px' }}>
                {currentCard.frontTitle}
              </h2>
              <div style={{
                fontSize: '22px',
                fontWeight: '800',
                color: '#fef08a',
                background: 'rgba(0, 0, 0, 0.4)',
                padding: '16px 24px',
                borderRadius: '12px',
                fontFamily: 'monospace'
              }}>
                {currentCard.frontFormula}
              </div>
            </div>
          ) : (
            <div className="fade-in">
              <h3 style={{ fontSize: '18px', color: '#6ee7b7', marginBottom: '12px' }}>
                💡 Memory Rule & Explanation
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--text-main)', marginBottom: '16px', lineHeight: '1.6' }}>
                {currentCard.backExplanation}
              </p>
              <div style={{ fontSize: '13px', color: 'var(--cyan)', background: 'rgba(56, 189, 248, 0.1)', padding: '10px 16px', borderRadius: '8px' }}>
                📌 <strong>Example:</strong> {currentCard.example}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={handlePrev} className="btn btn-secondary" style={{ padding: '10px 20px' }}>
            ← Previous Card
          </button>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Card {currentIndex + 1} of {FLASHCARDS.length}
          </div>
          <button onClick={handleNext} className="btn btn-primary" style={{ padding: '10px 20px' }}>
            Next Card →
          </button>
        </div>
      </div>
    </div>
  );
};
