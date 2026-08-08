export const COOKIE_NAME = 'ca_math_user_profile_v1';
export const COOKIE_DAYS = 365;

export const INITIAL_USER_PROFILE = {
  name: 'CA Aspirant',
  targetExam: 'CA Foundation Quantitative Aptitude',
  watchTimeSeconds: 0,
  totalQuestionsAttempted: 0,
  correctQuestionsCount: 0,
  incorrectQuestionsCount: 0,
  totalMarksScored: 0,
  xp: 0,
  level: 1,
  rankTitle: 'Quantitative Aptitude',
  unlockedBadgeIds: ['badge_welcome'],
  quizHistory: [],
  currentStreakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  dailyGoalMinutes: 30,
  soundEnabled: true
};

export const RANK_TIERS = [
  { tierName: 'Quantitative Aptitude Novice', minLevel: 1, maxLevel: 3, badge: '🌱', color: '#38bdf8', description: 'Just started your CA Foundation Quantitative Aptitude journey!' },
  { tierName: 'Formula Apprentice', minLevel: 4, maxLevel: 7, badge: '📘', color: '#818cf8', description: 'Grasping key formulas in TVM, Ratios & Logarithms.' },
  { tierName: 'Time Value Specialist', minLevel: 8, maxLevel: 12, badge: '⏳', color: '#a78bfa', description: 'Mastered Simple & Compound Interest and Annuities!' },
  { tierName: 'Logical Reasoning Ninja', minLevel: 13, maxLevel: 17, badge: '🧩', color: '#f472b6', description: 'Solving Seating & Blood Relation puzzles effortlessly.' },
  { tierName: 'Statistics Strategist', minLevel: 18, maxLevel: 25, badge: '📊', color: '#fb7185', description: 'Calculates Dispersion & Standard Deviation with ease!' },
  { tierName: 'Calculus Champion', minLevel: 26, maxLevel: 35, badge: '⚡', color: '#f59e0b', description: 'Differentiating & Integrating functions like a pro.' },
  { tierName: 'CA Foundation AIR 1', minLevel: 36, maxLevel: 100, badge: '👑', color: '#10b981', description: 'Top Ranker contender! Ready to score 90+ in Foundation Math!' }
];

export function setCookie(name, value, days = COOKIE_DAYS) {
  try {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  } catch (e) {
    console.error(e);
  }
}

export function getCookie(name) {
  try {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}

export function saveUserProfileToCookies(profile) {
  try {
    const str = JSON.stringify(profile);
    setCookie(COOKIE_NAME, str, COOKIE_DAYS);
    localStorage.setItem(COOKIE_NAME, str);
  } catch (e) {
    console.error(e);
  }
}

export function calculateXPAndLevel(profile) {
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

export function loadUserProfileFromCookies() {
  try {
    let raw = getCookie(COOKIE_NAME) || localStorage.getItem(COOKIE_NAME);
    if (raw) {
      const parsed = JSON.parse(raw);
      const merged = {
        ...INITIAL_USER_PROFILE,
        ...parsed,
        totalQuestionsAttempted: Number(parsed.totalQuestionsAttempted) || 0,
        correctQuestionsCount: Number(parsed.correctQuestionsCount) || 0,
        incorrectQuestionsCount: Number(parsed.incorrectQuestionsCount) || 0,
        xp: Number(parsed.xp) || 0,
        level: Number(parsed.level) || 1,
      };
      const evaluated = calculateXPAndLevel(merged);
      saveUserProfileToCookies(evaluated);
      return evaluated;
    }
  } catch (e) {
    console.error(e);
  }
  saveUserProfileToCookies(INITIAL_USER_PROFILE);
  return INITIAL_USER_PROFILE;
}

export function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return `${hours}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
  }
  return `${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
}

export function getXPForNextLevel(currentLevel) {
  const currentLevelMinXP = Math.pow(currentLevel - 1, 2) * 100;
  const nextLevelXP = Math.pow(currentLevel, 2) * 100;
  return { currentLevelMinXP, nextLevelXP };
}

export function playSound(type) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (type === 'correct') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15);
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    }
  } catch (e) { }
}
