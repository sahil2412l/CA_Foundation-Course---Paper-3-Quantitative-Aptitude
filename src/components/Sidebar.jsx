import React from 'react';
import { getXPForNextLevel } from '../utils/cookies';

export const Sidebar = ({ activeTab, setActiveTab, user }) => {
  const { currentLevelMinXP, nextLevelXP } = getXPForNextLevel(user.level);
  const currentXPInLevel = user.xp - currentLevelMinXP;
  const neededXPInLevel = nextLevelXP - currentLevelMinXP;
  const progressPercent = Math.min(100, Math.max(0, Math.floor((currentXPInLevel / neededXPInLevel) * 100)));

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'chapters', label: 'Syllabus & Formulas', icon: '📚' },
    { id: 'flashcards', label: 'Formula Flashcards', icon: '🎴' },
    { id: 'calculator', label: 'CA Calculator', icon: '🧮' },
    { id: 'quiz', label: 'Practice Quiz', icon: '✍️' },
    { id: 'rank', label: 'Rank & Levels', icon: '🏆' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="sidebar-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div className="sidebar-brand-logo">
            ∑
          </div>
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>CA Math Hub</h2>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--cyan)', letterSpacing: '0.5px' }}>CA Foundation Prep</span>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              <span className="sidebar-icon-wrapper">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Level Progress Widget */}
      <div className="sidebar-level-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', marginBottom: '8px' }}>
          <span style={{ fontWeight: 700, color: '#cbd5e1' }}>
            Level {user.level} Progress
          </span>
          <span style={{ fontWeight: 800, color: 'var(--cyan)' }}>
            {progressPercent}%
          </span>
        </div>
        
        <div style={{ height: '8px', width: '100%', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '99px', overflow: 'hidden', position: 'relative' }}>
          <div
            style={{
              height: '100%',
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, #6366f1, #38bdf8)',
              borderRadius: '99px',
              transition: 'width 0.4s ease',
              boxShadow: '0 0 10px rgba(56, 189, 248, 0.5)'
            }}
          ></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginTop: '8px', color: 'var(--text-dim)' }}>
          <span style={{ color: '#a5b4fc', fontWeight: 600 }}>{user.xp} XP</span>
          <span>Next: {nextLevelXP} XP</span>
        </div>
      </div>
    </aside>
  );
};
