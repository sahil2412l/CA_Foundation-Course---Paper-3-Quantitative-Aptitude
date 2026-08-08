// Storage, Cookie & Audio Synthesizer Module (Vanilla JS)

const COOKIE_NAME = 'ca_math_user_profile_v1';
const COOKIE_DAYS = 365;

const INITIAL_USER_PROFILE = {
  name: 'CA Aspirant',
  targetExam: 'CA Foundation Quantitative Aptitude',
  watchTimeSeconds: 0,
  totalQuestionsAttempted: 0,
  correctQuestionsCount: 0,
  incorrectQuestionsCount: 0,
  totalMarksScored: 0,
  xp: 0,
  level: 1,
  rankTitle: 'Quantitative Aptitude Novice',
  quizHistory: [],
  currentStreakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  dailyGoalMinutes: 30,
  soundEnabled: true
};

function setCookie(name, value, days = COOKIE_DAYS) {
  try {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  } catch (e) { console.error(e); }
}

function getCookie(name) {
  try {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
    }
  } catch (e) { console.error(e); }
  return null;
}

function saveUserProfileToCookies(profile) {
  try {
    const str = JSON.stringify(profile);
    setCookie(COOKIE_NAME, str, COOKIE_DAYS);
    localStorage.setItem(COOKIE_NAME, str);
  } catch (e) { console.error(e); }
}

function calculateXPAndLevel(profile) {
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

function loadUserProfileFromCookies() {
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
  } catch (e) { console.error(e); }
  saveUserProfileToCookies(INITIAL_USER_PROFILE);
  return INITIAL_USER_PROFILE;
}

function getXPForNextLevel(currentLevel) {
  const currentLevelMinXP = Math.pow(currentLevel - 1, 2) * 100;
  const nextLevelXP = Math.pow(currentLevel, 2) * 100;
  return { currentLevelMinXP, nextLevelXP };
}

function playSound(type) {
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
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.35);
    }
  } catch (e) { }
}
