import React, { useState } from 'react';
import { UserProfile } from '../types/index';
import { saveUserProfileToCookies } from '../utils/cookies';

interface ProfilePageProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(user.name);
  const [dailyGoal, setDailyGoal] = useState(user.dailyGoalMinutes);

  // Calculate XP required for next level
  const currentXP = user.xp;
  const currentLevel = user.level;
  const nextLevelXP = Math.pow(currentLevel, 2) * 100;
  const prevLevelXP = Math.pow(currentLevel - 1, 2) * 100;
  const xpForNextLevel = nextLevelXP - prevLevelXP;
  const xpProgressInLevel = Math.max(0, currentXP - prevLevelXP);
  const levelProgressPercent = Math.min(100, Math.round((xpProgressInLevel / (xpForNextLevel || 1)) * 100));

  const accuracyPercent = user.totalQuestionsAttempted > 0
    ? Math.round((user.correctQuestionsCount / user.totalQuestionsAttempted) * 100)
    : 0;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => {
      const updated = {
        ...prev,
        name: userName.trim() || 'CA Aspirant',
        dailyGoalMinutes: Math.max(10, Number(dailyGoal) || 30)
      };
      saveUserProfileToCookies(updated);
      return updated;
    });
    setIsEditing(false);
  };

  return (
    <div className="page-wrapper fade-in">
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#fff', letterSpacing: '-0.02em' }}>
          User Profile & Aspirant Dashboard
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>
          Track your CA Foundation study stats, XP rewards, level progression, and badges.
        </p>
      </div>

      {/* Main Profile Hero Card */}
      <div className="glass-card" style={{ marginBottom: '24px', padding: '28px', background: 'linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(30,41,59,0.7) 100%)', border: '1px solid rgba(56,189,248,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #38bdf8 0%, #6366f1 50%, #c084fc 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              boxShadow: '0 8px 24px rgba(56,189,248,0.3)',
              border: '2px solid rgba(255,255,255,0.2)'
            }}>
              🎓
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#fff' }}>{user.name}</h2>
                <span className="pill-badge pill-cyan" style={{ fontSize: '12px' }}>{user.targetExam}</span>
              </div>
              <p style={{ color: '#38bdf8', fontSize: '15px', fontWeight: '600', marginTop: '4px' }}>
                Level {user.level} • <span style={{ color: '#f59e0b' }}>{user.rankTitle}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn btn-secondary"
            style={{ borderRadius: '12px', padding: '10px 18px', fontSize: '13px', fontWeight: '600' }}
          >
            {isEditing ? '✕ Cancel' : '✏️ Edit Profile'}
          </button>
        </div>

        {/* Level XP Progress Bar */}
        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Level {user.level} Progress</span>
            <span style={{ color: '#38bdf8', fontWeight: '700' }}>{user.xp} Total XP ({levelProgressPercent}% to Level {user.level + 1})</span>
          </div>
          <div style={{ width: '100%', height: '10px', background: '#0f172a', borderRadius: '999px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{
              width: `${levelProgressPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)',
              borderRadius: '999px',
              transition: 'width 0.5s ease-in-out'
            }} />
          </div>
        </div>

        {/* Edit Profile Form */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} style={{ marginTop: '24px', background: 'rgba(15,23,42,0.8)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '16px', color: '#fff', marginBottom: '16px' }}>⚙️ Update Profile Settings</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Aspirant Name:
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: '#1e293b', border: '1px solid var(--border-color)', color: '#fff', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Daily Study Goal (Minutes):
                </label>
                <input
                  type="number"
                  min="10"
                  max="480"
                  value={dailyGoal}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDailyGoal(Number(e.target.value))}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', background: '#1e293b', border: '1px solid var(--border-color)', color: '#fff', fontSize: '14px' }}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-emerald" style={{ borderRadius: '10px', padding: '10px 20px' }}>
              💾 Save Profile
            </button>
          </form>
        )}
      </div>

      {/* XP Earning Rules Card */}
      <div className="glass-card" style={{ marginBottom: '24px', padding: '24px', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(99,102,241,0.2)' }}>
        <h3 style={{ fontSize: '18px', color: '#fff', fontWeight: '700', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          ⚡ How XP & Levelling Work
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ background: '#1e293b', padding: '16px', borderRadius: '14px', border: '1px solid rgba(56,189,248,0.2)' }}>
            <div style={{ fontSize: '24px', marginBottom: '4px' }}>🎯</div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#38bdf8' }}>+4 XP</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>Har Correct Quiz Answer par</div>
          </div>
          <div style={{ background: '#1e293b', padding: '16px', borderRadius: '14px', border: '1px solid rgba(245,158,11,0.2)' }}>
            <div style={{ fontSize: '24px', marginBottom: '4px' }}>🔥</div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#f59e0b' }}>+30 XP</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>Har Consecutive Daily Streak Day par</div>
          </div>
        </div>
      </div>

      {/* Stats Overview Grid */}
      <div style={{ marginBottom: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div className="glass-card text-center" style={{ padding: '20px' }}>
          <div style={{ fontSize: '28px', marginBottom: '6px' }}>🎯</div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#38bdf8' }}>{accuracyPercent}%</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Quiz Accuracy</div>
        </div>

        <div className="glass-card text-center" style={{ padding: '20px' }}>
          <div style={{ fontSize: '28px', marginBottom: '6px' }}>🔥</div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#f59e0b' }}>{user.currentStreakDays} Days</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Active Study Streak</div>
        </div>

        <div className="glass-card text-center" style={{ padding: '20px' }}>
          <div style={{ fontSize: '28px', marginBottom: '6px' }}>📝</div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#34d399' }}>{user.correctQuestionsCount} / {user.totalQuestionsAttempted}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Correct / Total Questions</div>
        </div>
      </div>
    </div>
  );
};


