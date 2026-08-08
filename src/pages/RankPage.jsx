import React from 'react';
import { RANK_TIERS } from '../utils/cookies';
import { BADGES_LIST } from '../data/mathData';

export const RankPage = ({ user }) => {
  return (
    <div className="page-wrapper fade-in">
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '26px', color: '#fff' }}>CA Foundation Rank & Level System</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Level up by solving Math problems correctly and maintaining study streaks!
        </p>
      </div>

      {/* Current User Rank Spotlight */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
        border: '1px solid var(--border-glow)',
        padding: '28px',
        marginBottom: '32px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '20px',
            background: 'rgba(99, 102, 241, 0.2)',
            border: '2px solid var(--cyan)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)'
          }}>
            🏆
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Current Status</div>
            <h2 style={{ fontSize: '24px', color: '#fff' }}>
              Level {user.level} • <span className="gold-gradient-text">{user.rankTitle}</span>
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--cyan)' }}>Total XP Accumulated: <strong>{user.xp} XP</strong></p>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ textAlign: 'center', padding: '10px 20px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--emerald)' }}>{user.correctQuestionsCount}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Correct Qs</div>
            </div>
            <div style={{ textAlign: 'center', padding: '10px 20px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#f59e0b' }}>{user.currentStreakDays} Days</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Active Streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Rank Roadmap Grid */}
      <h2 style={{ fontSize: '20px', color: '#fff', marginBottom: '16px' }}>
        🗺️ CA Rank Tier Progression
      </h2>

      <div className="grid-2" style={{ marginBottom: '32px' }}>
        {RANK_TIERS.map((tier, idx) => {
          const isCurrentTier = user.level >= tier.minLevel && user.level <= tier.maxLevel;
          const isUnlocked = user.level >= tier.minLevel;

          return (
            <div
              key={idx}
              className="glass-card"
              style={{
                border: isCurrentTier ? `2px solid ${tier.color}` : '1px solid var(--border-color)',
                opacity: isUnlocked ? 1 : 0.6,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {isCurrentTier && (
                <div style={{
                  position: 'absolute',
                  top: '12px', right: '12px',
                  background: tier.color,
                  color: '#000',
                  fontWeight: '800',
                  fontSize: '10px',
                  padding: '2px 10px',
                  borderRadius: '9999px',
                  textTransform: 'uppercase'
                }}>
                  YOUR CURRENT TIER
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
                <span style={{ fontSize: '32px' }}>{tier.badge}</span>
                <div>
                  <h3 style={{ fontSize: '18px', color: isUnlocked ? '#fff' : 'var(--text-muted)' }}>
                    {tier.tierName}
                  </h3>
                  <span style={{ fontSize: '12px', color: tier.color, fontWeight: '700' }}>
                    Levels {tier.minLevel} - {tier.maxLevel === 100 ? '50+' : tier.maxLevel}
                  </span>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{tier.description}</p>
            </div>
          );
        })}
      </div>

      {/* Badges Gallery */}
      <h2 style={{ fontSize: '20px', color: '#fff', marginBottom: '16px' }}>
        🎖️ Badges & Achievements Gallery
      </h2>

      <div className="grid-3" style={{ marginBottom: '32px' }}>
        {BADGES_LIST.map(badge => {
          const isUnlocked = user.unlockedBadgeIds.includes(badge.id) ||
            (badge.reqQuestions && user.correctQuestionsCount >= badge.reqQuestions) ||
            (badge.reqWatchTimeMin && Math.floor(user.watchTimeSeconds / 60) >= badge.reqWatchTimeMin) ||
            (badge.reqXp && user.xp >= badge.reqXp);

          return (
            <div
              key={badge.id}
              className="glass-card"
              style={{
                border: isUnlocked ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-color)',
                opacity: isUnlocked ? 1 : 0.5,
                textAlign: 'center',
                padding: '20px'
              }}
            >
              <div style={{ fontSize: '40px', marginBottom: '8px' }}>{badge.icon}</div>
              <h3 style={{ fontSize: '16px', color: isUnlocked ? '#6ee7b7' : 'var(--text-muted)', marginBottom: '4px' }}>
                {badge.title}
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{badge.description}</p>
              <div style={{ marginTop: '10px' }}>
                <span className={`pill-badge ${isUnlocked ? 'pill-emerald' : 'pill-badge'}`}>
                  {isUnlocked ? '✓ Unlocked' : '🔒 Locked'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
