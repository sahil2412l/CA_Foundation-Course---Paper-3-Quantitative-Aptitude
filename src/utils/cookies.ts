// Cookie, LocalStorage, and Audio Synthesizer Manager for CA Foundation Math Web App

import { UserProfile, RankTier } from '../types/index';

const COOKIE_NAME = 'ca_math_user_profile_v1';
const COOKIE_DAYS = 365;

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'CA Aspirant',
  targetExam: 'CA Foundation Math, LR & Stats',
  watchTimeSeconds: 0,
  totalQuestionsAttempted: 0,
  correctQuestionsCount: 0,
  incorrectQuestionsCount: 0,
  totalMarksScored: 0,
  xp: 0,
  level: 1,
  rankTitle: 'CA Math Novice',
  unlockedBadgeIds: ['badge_welcome'],
  quizHistory: [],
  currentStreakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  dailyGoalMinutes: 30,
  soundEnabled: true
};

export const RANK_TIERS: RankTier[] = [
  { tierName: 'CA Math Novice', minLevel: 1, maxLevel: 3, badge: '🌱', color: '#38bdf8', description: 'Just started your CA Foundation Math journey!' },
  { tierName: 'Formula Apprentice', minLevel: 4, maxLevel: 7, badge: '📘', color: '#818cf8', description: 'Grasping key formulas in TVM, Ratios & Logarithms.' },
  { tierName: 'Time Value Specialist', minLevel: 8, maxLevel: 12, badge: '⏳', color: '#a78bfa', description: 'Mastered Simple & Compound Interest and Annuities!' },
  { tierName: 'Logical Reasoning Ninja', minLevel: 13, maxLevel: 17, badge: '🧩', color: '#f472b6', description: 'Solving Seating & Blood Relation puzzles effortlessly.' },
  { tierName: 'Statistics Strategist', minLevel: 18, maxLevel: 25, badge: '📊', color: '#fb7185', description: 'Calculates Dispersion & Standard Deviation with ease!' },
  { tierName: 'Calculus Champion', minLevel: 26, maxLevel: 35, badge: '⚡', color: '#f59e0b', description: 'Differentiating & Integrating functions like a pro.' },
  { tierName: 'CA Foundation AIR 1', minLevel: 36, maxLevel: 100, badge: '👑', color: '#10b981', description: 'Top Ranker contender! Ready to score 90+ in Foundation Math!' }
];

export function setCookie(name: string, value: string, days: number = COOKIE_DAYS): void {
  try {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  } catch (err) {
    console.error('Error writing cookie:', err);
  }
}

export function getCookie(name: string): string | null {
  try {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length));
      }
    }
  } catch (err) {
    console.error('Error reading cookie:', err);
  }
  return null;
}

export function deleteCookie(name: string): void {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

export function saveUserProfileToCookies(profile: UserProfile): void {
  try {
    const jsonStr = JSON.stringify(profile);
    setCookie(COOKIE_NAME, jsonStr, COOKIE_DAYS);
    localStorage.setItem(COOKIE_NAME, jsonStr);
  } catch (err) {
    console.error('Failed to save profile:', err);
  }
}

export function loadUserProfileFromCookies(): UserProfile {
  try {
    let rawData = getCookie(COOKIE_NAME) || localStorage.getItem(COOKIE_NAME);
    if (rawData) {
      const parsed = JSON.parse(rawData);
      const merged: UserProfile = {
        ...INITIAL_USER_PROFILE,
        ...parsed,
        watchTimeSeconds: Number(parsed.watchTimeSeconds) || 0,
        totalQuestionsAttempted: Number(parsed.totalQuestionsAttempted) || 0,
        correctQuestionsCount: Number(parsed.correctQuestionsCount) || 0,
        incorrectQuestionsCount: Number(parsed.incorrectQuestionsCount) || 0,
        totalMarksScored: Number(parsed.totalMarksScored) || 0,
        xp: Number(parsed.xp) || 0,
        level: Number(parsed.level) || 1,
      };

      const todayStr = new Date().toISOString().split('T')[0];
      if (merged.lastActiveDate !== todayStr) {
        const lastDate = new Date(merged.lastActiveDate);
        const today = new Date(todayStr);
        const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
        if (diffDays === 1) {
          merged.currentStreakDays += 1;
        } else if (diffDays > 1) {
          merged.currentStreakDays = 1;
        }
        merged.lastActiveDate = todayStr;
      }

      const evaluated = calculateXPAndLevel(merged);
      saveUserProfileToCookies(evaluated);
      return evaluated;
    }
  } catch (err) {
    console.error('Error loading profile from cookies:', err);
  }

  saveUserProfileToCookies(INITIAL_USER_PROFILE);
  return INITIAL_USER_PROFILE;
}

export function calculateXPAndLevel(profile: UserProfile): UserProfile {
  const accuracyXP = profile.correctQuestionsCount * 4;
  const streakXP = profile.currentStreakDays * 30;

  const totalXP = accuracyXP + streakXP;
  const level = Math.floor(Math.sqrt(totalXP / 100)) + 1;
  const currentTier = RANK_TIERS.find(t => level >= t.minLevel && level <= t.maxLevel) || RANK_TIERS[RANK_TIERS.length - 1];

  return {
    ...profile,
    xp: totalXP,
    level,
    rankTitle: currentTier.tierName
  };
}

export function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
  }
  return `${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
}

export function getXPForNextLevel(currentLevel: number): { currentLevelMinXP: number; nextLevelXP: number } {
  const currentLevelMinXP = Math.pow(currentLevel - 1, 2) * 100;
  const nextLevelXP = Math.pow(currentLevel, 2) * 100;
  return { currentLevelMinXP, nextLevelXP };
}

/**
 * Web Audio Synthesizer helper for sound effects (no external audio files needed)
 */
export function playSound(type: 'correct' | 'incorrect' | 'levelup'): void {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    if (type === 'correct') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.3); // G5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'incorrect') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'levelup') {
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + (i + 1) * 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.1);
        osc.stop(ctx.currentTime + (i + 1) * 0.15);
      });
    }
  } catch (e) {
    // Silent fail if audio disabled in browser
  }
}
