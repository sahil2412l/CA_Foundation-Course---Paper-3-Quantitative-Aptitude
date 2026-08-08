// Pure Vanilla JavaScript Application Controller (Zero Framework Dependencies)

// Application State
let appUser = loadUserProfileFromCookies();
let currentTab = 'dashboard';
let quizChapterId = null;
let quizSubExerciseId = null;
let quizQuestionIndex = 0;
let quizSelectedOption = null;
let quizIsSubmitted = false;
let quizSessionCorrect = 0;
let quizSessionAttempt = 0;

let flashcardIndex = 0;
let isFlashcardFlipped = false;

let calcMode = 'SI';
let siP = 10000, siR = 8, siT = 5;
let ciP = 10000, ciR = 8, ciT = 5, ciFreq = 4;

// Initialize Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  renderNavbar();
  navigateTo(currentTab);
  setupModalListeners();
});

// Navigation Controller
function navigateTo(tab, chapterId = null, subExerciseId = null) {
  currentTab = tab;
  if (chapterId !== undefined) quizChapterId = chapterId;
  if (subExerciseId !== undefined) quizSubExerciseId = subExerciseId;

  if (tab === 'quiz') {
    quizQuestionIndex = 0;
    quizSelectedOption = null;
    quizIsSubmitted = false;
  }

  // Close mobile navigation drawer on selection
  toggleMobileSidebar(false);

  updateSidebarActive();
  renderNavbar();

  const container = document.getElementById('app-view');
  if (!container) return;

  switch (tab) {
    case 'dashboard': container.innerHTML = renderDashboardView(); break;
    case 'chapters': container.innerHTML = renderChaptersView(); break;
    case 'table': container.innerHTML = renderTableView(); break;
    case 'flashcards': container.innerHTML = renderFlashcardsView(); break;
    case 'calculator': container.innerHTML = renderCalculatorView(); break;
    case 'quiz': container.innerHTML = renderQuizView(); break;
    case 'rank': container.innerHTML = renderRankView(); break;
    case 'profile': container.innerHTML = renderProfileView(); break;
    default: container.innerHTML = renderDashboardView();
  }

  // Scroll smoothly to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMobileSidebar(forceState) {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (!sidebar || !overlay) return;

  const isOpen = forceState !== undefined ? forceState : !sidebar.classList.contains('open');
  if (isOpen) {
    sidebar.classList.add('open');
    overlay.classList.add('active');
  } else {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  }
}

// ----------------------------------------------------
// SIDEBAR & NAVBAR RENDERERS
// ----------------------------------------------------
function renderSidebar() {
  const { currentLevelMinXP, nextLevelXP } = getXPForNextLevel(appUser.level);
  const currentXPInLevel = appUser.xp - currentLevelMinXP;
  const neededXPInLevel = nextLevelXP - currentLevelMinXP;
  const progressPercent = Math.min(100, Math.max(0, Math.floor((currentXPInLevel / neededXPInLevel) * 100)));

  const sidebarEl = document.getElementById('sidebar-root');
  if (!sidebarEl) return;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'chapters', label: 'Syllabus & Formulas', icon: '📚' },
    { id: 'table', label: 'Question Table', icon: '📋' },
    { id: 'flashcards', label: 'Formula Flashcards', icon: '🎴' },
    { id: 'calculator', label: 'CA Calculator', icon: '🧮' },
    { id: 'quiz', label: 'Practice Quiz', icon: '✍️' },
    { id: 'rank', label: 'Rank & Levels', icon: '🏆' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  sidebarEl.innerHTML = `
    <aside class="sidebar">
      <div class="sidebar-header">
        <div style="display: flex; align-items: center; gap: 14px;">
          <div class="sidebar-brand-logo">
            ∑
          </div>
          <div>
            <h2 style="font-size: 17px; font-weight: 800; color: #fff; line-height: 1.2;">CA Math Hub</h2>
            <span style="font-size: 11px; font-weight: 700; color: var(--cyan); letter-spacing: 0.5px;">CA Foundation Prep</span>
          </div>
        </div>
      </div>

      <nav class="sidebar-nav">
        ${navItems.map(item => `
          <button
            onclick="navigateTo('${item.id}')"
            class="sidebar-item ${currentTab === item.id ? 'active' : ''}"
          >
            <span class="sidebar-icon-wrapper">${item.icon}</span>
            <span>${item.label}</span>
          </button>
        `).join('')}
      </nav>

      <div class="sidebar-level-card">
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; margin-bottom: 8px;">
          <span style="font-weight: 700; color: #cbd5e1;">Level ${appUser.level} Progress</span>
          <span style="font-weight: 800; color: var(--cyan);">${progressPercent}%</span>
        </div>
        <div style="height: 8px; width: 100%; background: rgba(255, 255, 255, 0.08); border-radius: 99px; overflow: hidden; position: relative;">
          <div style="height: 100%; width: ${progressPercent}%; background: linear-gradient(90deg, #6366f1, #38bdf8); border-radius: 99px; transition: width 0.4s ease; box-shadow: 0 0 10px rgba(56, 189, 248, 0.5);"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 11px; margin-top: 8px; color: var(--text-dim);">
          <span style="color: #a5b4fc; font-weight: 600;">${appUser.xp} XP</span>
          <span>Next: ${nextLevelXP} XP</span>
        </div>
      </div>
    </aside>
  `;
}

function updateSidebarActive() {
  renderSidebar();
}

function renderNavbar() {
  const navbarEl = document.getElementById('navbar-root');
  if (!navbarEl) return;

  const titles = {
    dashboard: 'Dashboard Overview',
    chapters: 'CA Foundation Quantitative Aptitude Syllabus & Formulas',
    flashcards: 'Formula Flashcards Revision',
    calculator: 'CA Financial & Math Calculator',
    quiz: 'Practice Quiz & Mock Tests',
    rank: 'Level & Rank System',
    profile: 'User Profile'
  };

  navbarEl.innerHTML = `
    <header class="navbar">
      <div style="display: flex; align-items: center; gap: 14px;">
        <button class="mobile-nav-toggle" onclick="toggleMobileSidebar(true)" aria-label="Toggle Navigation">
          ☰
        </button>
        <div>
          <h1 style="font-size: 20px; font-weight: 800; color: #fff;">${titles[currentTab] || 'CA Foundation Math'}</h1>
          <p style="font-size: 12px; color: var(--text-muted);">
            Welcome back, <span style="font-weight: 700; color: var(--cyan);">${appUser.name}</span> • Level ${appUser.level} (${appUser.rankTitle})
          </p>
        </div>
      </div>

      <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
        <button onclick="openEmailModal()" class="btn btn-secondary" style="padding: 8px 16px; font-size: 12px; border-color: rgba(99, 102, 241, 0.4); color: #a5b4fc; background: rgba(99, 102, 241, 0.15);">
          📧 Direct Email
        </button>

        <button onclick="openNoticeModal()" class="btn btn-secondary" style="padding: 8px 16px; font-size: 12px; border-color: rgba(56, 189, 248, 0.4); color: #7dd3fc; background: rgba(56, 189, 248, 0.15);">
          ℹ️ Syllabus Notice
        </button>

        <div style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 99px; border: 1px solid rgba(16, 185, 129, 0.3); background: rgba(16, 185, 129, 0.1); font-size: 12px; font-weight: 700; color: #34d399;">
          <span style="width: 8px; height: 8px; border-radius: 50%; background: #34d399; box-shadow: 0 0 8px #34d399;"></span>
          Cookies Synced ✓
        </div>

        <div style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 99px; border: 1px solid rgba(245, 158, 11, 0.3); background: rgba(245, 158, 11, 0.1); font-size: 12px; font-weight: 700; color: #fbbf24;">
          🔥 ${appUser.currentStreakDays} Day Streak
        </div>
      </div>
    </header>
  `;
}

// ----------------------------------------------------
// VIEW GENERATORS
// ----------------------------------------------------

// 1. DASHBOARD VIEW
function renderDashboardView() {
  const accuracyPercent = appUser.totalQuestionsAttempted > 0
    ? Math.round((appUser.correctQuestionsCount / appUser.totalQuestionsAttempted) * 100)
    : 0;

  return `
    <div class="page-wrapper fade-in" style="display: flex; flex-direction: column; gap: 32px;">
      <!-- Hero Banner -->
      <div class="glass-card" style="position: relative; overflow: hidden; background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.9) 50%, rgba(15, 23, 42, 0.95) 100%); border: 1px solid rgba(99, 102, 241, 0.4); padding: 36px; box-shadow: 0 20px 40px -15px rgba(99, 102, 241, 0.25);">
        <div style="max-width: 680px; position: relative; z-index: 2;">
          <span class="pill-badge pill-cyan" style="margin-bottom: 16px; font-weight: 800;">🚀 CA Foundation Paper 3 Quantitative Aptitude Hub</span>
          <h1 style="font-size: 34px; font-weight: 900; color: #fff; margin-bottom: 12px; line-height: 1.25;">
            Master Business Math, Logical Reasoning & Statistics
          </h1>
          <p style="font-size: 14.5px; color: #cbd5e1; margin-bottom: 28px; line-height: 1.6;">
            Target <strong style="color: #fbbf24;">80+ Marks</strong> with topic-wise notes, quick calculator tricks, TVM annuity formulas, and real-time interactive quiz tests.
          </p>
          <div style="display: flex; gap: 14px; flex-wrap: wrap;">
            <button onclick="navigateTo('chapters')" class="btn btn-primary" style="padding: 12px 24px; font-size: 13.5px;">
              📚 Browse Syllabus & Formulas
            </button>
            <button onclick="navigateTo('quiz')" class="btn btn-secondary" style="padding: 12px 24px; font-size: 13.5px;">
              ✍️ Start Practice Quiz
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="grid-4">
        <div class="glass-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 30px;">⭐</span>
            <span class="pill-badge pill-cyan">Level ${appUser.level}</span>
          </div>
          <div style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Current Rank Tier</div>
          <div style="font-size: 20px; font-weight: 800; color: #fff; margin: 4px 0;">${appUser.rankTitle}</div>
          <div style="font-size: 12px; font-weight: 700; color: var(--cyan);">${appUser.xp} Total XP</div>
        </div>

        <div class="glass-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 30px;">🎯</span>
            <span class="pill-badge pill-emerald">${accuracyPercent}% Accuracy</span>
          </div>
          <div style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Questions Solved</div>
          <div style="font-size: 24px; font-weight: 900; color: #fff; margin: 4px 0;">
            <span style="color: #34d399;">${appUser.correctQuestionsCount}</span> / ${appUser.totalQuestionsAttempted}
          </div>
          <div style="font-size: 11px; color: var(--text-dim);">${appUser.incorrectQuestionsCount} Incorrect answers</div>
        </div>

        <div class="glass-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 30px;">⏳</span>
            <span class="pill-badge pill-amber">14-18 Marks</span>
          </div>
          <div style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Top Weightage Topic</div>
          <div style="font-size: 18px; font-weight: 800; color: #fff; margin: 4px 0;">Time Value of Money</div>
          <div style="font-size: 11px; color: #a5b4fc;">Simple & Compound Interest, Annuity</div>
        </div>

        <div class="glass-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-size: 30px;">🔥</span>
            <span class="pill-badge pill-amber">${appUser.currentStreakDays} Days</span>
          </div>
          <div style="font-size: 12px; color: var(--text-muted); font-weight: 600;">Daily Study Goal (${appUser.dailyGoalMinutes}m)</div>
          <div style="font-size: 24px; font-weight: 900; color: #fff; margin: 4px 0;">${appUser.currentStreakDays} Days Streak</div>
          <div style="height: 6px; width: 100%; background: rgba(255,255,255,0.08); border-radius: 999px; overflow: hidden; margin-top: 8px;">
            <div style="height: 100%; width: 100%; background: #fbbf24; border-radius: 999px;"></div>
          </div>
        </div>
      </div>

      <!-- Syllabus Preview Cards -->
      <div>
        <h2 style="font-size: 22px; font-weight: 800; color: #fff; margin-bottom: 16px;">
          📖 CA Foundation Syllabus Weightage & Quick Study
        </h2>
        <div class="grid-3">
          ${CA_MATH_CHAPTERS.map(ch => `
            <div onclick="navigateTo('chapters')" class="glass-card glass-card-hover" style="display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                  <span class="pill-badge pill-cyan">${ch.category}</span>
                  <span style="font-size: 12px; font-weight: 800; color: #fbbf24;">${ch.weightage}</span>
                </div>
                <h3 style="font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 8px;">${ch.title}</h3>
                <p style="font-size: 12.5px; color: var(--text-muted); line-height: 1.5; margin-bottom: 16px;">${ch.description}</p>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; font-weight: 700; color: var(--cyan); padding-top: 12px; border-top: 1px solid var(--border-color);">
                <span>${ch.formulas.length} Key Formulas</span>
                <span>Explore Chapter →</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// 2. CHAPTERS & EXERCISES VIEW
let currentCategoryFilter = 'All';

function filterCategory(cat) {
  currentCategoryFilter = cat;
  const container = document.getElementById('app-view');
  if (container) container.innerHTML = renderChaptersView();
}

function renderChaptersView() {
  const filtered = currentCategoryFilter === 'All'
    ? CA_MATH_CHAPTERS
    : CA_MATH_CHAPTERS.filter(c => c.category === currentCategoryFilter);

  return `
    <div class="page-wrapper fade-in">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
        <div>
          <h1 style="font-size: 28px; color: #fff; font-weight: 800;">CA Foundation Quantitative Aptitude Syllabus</h1>
          <p style="color: var(--text-muted); font-size: 14px;">
            Comprehensive chapter notes, key formulas, shortcut memory tricks & marks weightage.
          </p>
        </div>

        <div style="display: flex; gap: 8px;">
          ${['All', 'Math', 'Logical Reasoning', 'Statistics'].map(cat => `
            <button
              onclick="filterCategory('${cat}')"
              class="btn ${currentCategoryFilter === cat ? 'btn-primary' : 'btn-secondary'}"
              style="padding: 8px 16px; font-size: 12px;"
            >
              ${cat}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="grid-2" style="margin-bottom: 32px;">
        ${filtered.map(ch => `
          <div class="glass-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <span class="pill-badge pill-cyan">${ch.category}</span>
                <span class="pill-badge pill-amber" style="font-size: 12px;">Weightage: ${ch.weightage}</span>
              </div>
              <h2 style="font-size: 20px; color: #fff; font-weight: 800; margin-bottom: 8px;">${ch.title}</h2>
              <p style="color: var(--text-muted); font-size: 13.5px; margin-bottom: 16px;">${ch.description}</p>

              ${ch.subExercises && ch.subExercises.length > 0 ? `
                <div style="background: rgba(13, 19, 36, 0.8); border-radius: 14px; padding: 14px; margin-bottom: 16px; border: 1px solid rgba(56, 189, 248, 0.15);">
                  <div style="font-size: 12px; font-weight: 700; color: #38bdf8; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                    <span>📑 Chapter Exercises & Units (${ch.subExercises.length})</span>
                    <span style="font-size: 10px; color: #94a3b8; font-weight: 400;">Click Exercise to practice</span>
                  </div>
                  <div style="display: flex; flex-direction: column; gap: 8px;">
                    ${ch.subExercises.map(sub => `
                      <div style="background: rgba(255, 255, 255, 0.03); padding: 10px 14px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
                        <span style="font-size: 12.5px; color: #e2e8f0;">
                          <strong style="color: #fbbf24;">${sub.title.split(':')[0]}</strong>: ${sub.title.split(':')[1] || sub.title}
                        </span>
                        <button
                          onclick="navigateTo('quiz', '${ch.id}', '${sub.id}')"
                          class="btn btn-primary"
                          style="padding: 6px 14px; font-size: 11.5px;"
                        >
                          📝 Practice Unit
                        </button>
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : `
                <div style="background: rgba(13, 19, 36, 0.8); border-radius: 14px; padding: 14px; margin-bottom: 16px; border: 1px solid rgba(56, 189, 248, 0.15);">
                  <div style="font-size: 12px; font-weight: 700; color: #38bdf8; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                    <span>📑 Chapter Exercise</span>
                    <span style="font-size: 10px; color: #94a3b8;">Practice Unit</span>
                  </div>
                  <div style="background: rgba(255, 255, 255, 0.03); padding: 10px 14px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                    <span style="font-size: 12.5px; color: #e2e8f0;"><strong style="color: #fbbf24;">Exercise 1</strong>: Main Practice Set</span>
                    <button
                      onclick="navigateTo('quiz', '${ch.id}', null)"
                      class="btn btn-primary"
                      style="padding: 6px 14px; font-size: 11.5px;"
                    >
                      📝 Practice Unit
                    </button>
                  </div>
                </div>
              `}

              <div style="background: rgba(15, 22, 42, 0.8); border-radius: 14px; padding: 16px; margin-bottom: 16px; border: 1px solid var(--border-color);">
                <div style="font-size: 13px; font-weight: 700; color: var(--cyan); margin-bottom: 8px;">
                  📐 Key Formula Preview (${ch.formulas.length} Formulas)
                </div>
                <ul style="list-style: none; font-size: 13px; color: var(--text-main);">
                  ${ch.formulas.slice(0, 2).map(f => `
                    <li style="margin-bottom: 6px;">
                      <strong>${f.title}:</strong> <code style="color: #a5b4fc; background: rgba(99, 102, 241, 0.15); padding: 3px 8px; border-radius: 6px; font-family: monospace;">${f.formula}</code>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>

            <button
              onclick="navigateTo('quiz', '${ch.id}', null)"
              class="btn btn-primary"
              style="width: 100%; font-size: 13px; padding: 12px; margin-top: 8px;"
            >
              ⚡ Practice Full Chapter Quiz
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 3. FLASHCARDS VIEW
function renderFlashcardsView() {
  const currentCard = FLASHCARDS[flashcardIndex];

  return `
    <div class="page-wrapper fade-in" style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px;">
      <div style="text-align: center;">
        <h1 style="font-size: 28px; font-weight: 800; color: #fff;">Formula Flashcards Revision</h1>
        <p style="font-size: 14px; color: var(--text-muted);">Interactive quick memory flashcards for CA Foundation Math formulas.</p>
      </div>

      <div style="display: flex; justify-content: center;">
        <div
          onclick="toggleFlashcardFlip()"
          class="glass-card"
          style="min-height: 340px; width: 100%; max-width: 580px; cursor: pointer; padding: 36px; display: flex; flex-direction: column; justify-content: space-between; background: rgba(13, 19, 36, 0.95); border: 1px solid rgba(99, 102, 241, 0.4); box-shadow: 0 20px 40px -10px rgba(99, 102, 241, 0.25);"
        >
          <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 800; color: var(--cyan);">
            <span>${currentCard.chapterTitle}</span>
            <span>Card ${flashcardIndex + 1} of ${FLASHCARDS.length}</span>
          </div>

          <div style="margin: auto 0; text-align: center; display: flex; flex-direction: column; gap: 16px;">
            ${!isFlashcardFlipped ? `
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #818cf8; font-weight: 800;">Formula Concept</div>
              <h2 style="font-size: 24px; font-weight: 900; color: #fff;">${currentCard.frontTitle}</h2>
              <div style="background: rgba(3, 7, 18, 0.8); padding: 18px; border-radius: 14px; border: 1px solid rgba(99, 102, 241, 0.3); color: #a5b4fc; font-family: monospace; font-size: 19px; font-weight: 800;">
                ${currentCard.frontFormula}
              </div>
              <p style="font-size: 12px; color: var(--text-dim);">(Click card to view explanation & example)</p>
            ` : `
              <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #34d399; font-weight: 800;">Explanation & Example</div>
              <p style="font-size: 14.5px; color: #e2e8f0; line-height: 1.6;">${currentCard.backExplanation}</p>
              ${currentCard.example ? `
                <div style="background: rgba(3, 7, 18, 0.8); padding: 14px; border-radius: 12px; border: 1px solid var(--border-color); font-size: 12.5px; color: #fde047; font-family: monospace; text-align: left;">
                  💡 Example: ${currentCard.example}
                </div>
              ` : ''}
            `}
          </div>

          <div style="text-align: center; font-size: 12px; color: var(--text-dim); font-weight: 600;">
            🔄 Click anywhere on the card to flip
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: center; align-items: center; gap: 16px;">
        <button onclick="prevFlashcard()" class="btn btn-secondary" style="padding: 12px 24px; font-size: 13px;">← Previous</button>
        <button onclick="toggleFlashcardFlip()" class="btn btn-secondary" style="padding: 12px 24px; font-size: 13px; border-color: rgba(99, 102, 241, 0.4); color: #a5b4fc;">🔄 Flip Card</button>
        <button onclick="nextFlashcard()" class="btn btn-primary" style="padding: 12px 24px; font-size: 13px;">Next →</button>
      </div>
    </div>
  `;
}

function toggleFlashcardFlip() {
  isFlashcardFlipped = !isFlashcardFlipped;
  const container = document.getElementById('app-view');
  if (container) container.innerHTML = renderFlashcardsView();
}

function nextFlashcard() {
  isFlashcardFlipped = false;
  flashcardIndex = (flashcardIndex + 1) % FLASHCARDS.length;
  const container = document.getElementById('app-view');
  if (container) container.innerHTML = renderFlashcardsView();
}

function prevFlashcard() {
  isFlashcardFlipped = false;
  flashcardIndex = (flashcardIndex - 1 + FLASHCARDS.length) % FLASHCARDS.length;
  const container = document.getElementById('app-view');
  if (container) container.innerHTML = renderFlashcardsView();
}

// 4. CALCULATOR VIEW
function renderCalculatorView() {
  const siInterest = (siP * siR * siT) / 100;
  const siAmount = siP + siInterest;

  const ciRatePerPeriod = ciR / (100 * ciFreq);
  const ciTotalPeriods = ciT * ciFreq;
  const ciAmount = ciP * Math.pow(1 + ciRatePerPeriod, ciTotalPeriods);
  const ciInterest = ciAmount - ciP;
  const effectiveYield = ((Math.pow(1 + ciRatePerPeriod, ciFreq) - 1) * 100).toFixed(2);

  return `
    <div class="page-wrapper fade-in" style="max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h1 style="font-size: 28px; font-weight: 800; color: #fff;">CA Financial & TVM Calculator</h1>
        <p style="font-size: 14px; color: var(--text-muted);">Calculate Simple Interest, Compound Interest, Effective Rate & Annuities instantly.</p>
      </div>

      <div style="display: flex; border-bottom: 1px solid var(--border-color); gap: 16px;">
        <button
          onclick="setCalculatorMode('SI')"
          style="padding-bottom: 12px; font-size: 14px; font-weight: 800; border: none; background: none; cursor: pointer; color: ${calcMode === 'SI' ? 'var(--cyan)' : 'var(--text-muted)'}; border-bottom: 2px solid ${calcMode === 'SI' ? 'var(--cyan)' : 'transparent'};"
        >
          Simple Interest (SI)
        </button>
        <button
          onclick="setCalculatorMode('CI')"
          style="padding-bottom: 12px; font-size: 14px; font-weight: 800; border: none; background: none; cursor: pointer; color: ${calcMode === 'CI' ? 'var(--cyan)' : 'var(--text-muted)'}; border-bottom: 2px solid ${calcMode === 'CI' ? 'var(--cyan)' : 'transparent'};"
        >
          Compound Interest (CI) & Effective Rate
        </button>
      </div>

      ${calcMode === 'SI' ? `
        <div class="grid-2">
          <div class="glass-card" style="display: flex; flex-direction: column; gap: 18px;">
            <h3 style="font-size: 18px; font-weight: 800; color: #fff;">SI Input Parameters</h3>
            <div>
              <label style="display: block; font-size: 12.5px; font-weight: 600; color: #cbd5e1; margin-bottom: 6px;">Principal Amount (P): ₹${siP.toLocaleString('en-IN')}</label>
              <input type="range" min="1000" max="500000" step="1000" value="${siP}" oninput="updateSIParam('P', this.value)" style="width: 100%; accent-color: var(--cyan); cursor: pointer;" />
            </div>
            <div>
              <label style="display: block; font-size: 12.5px; font-weight: 600; color: #cbd5e1; margin-bottom: 6px;">Annual Interest Rate (R): ${siR}%</label>
              <input type="range" min="1" max="25" step="0.5" value="${siR}" oninput="updateSIParam('R', this.value)" style="width: 100%; accent-color: var(--cyan); cursor: pointer;" />
            </div>
            <div>
              <label style="display: block; font-size: 12.5px; font-weight: 600; color: #cbd5e1; margin-bottom: 6px;">Time Period (T): ${siT} Years</label>
              <input type="range" min="1" max="30" step="1" value="${siT}" oninput="updateSIParam('T', this.value)" style="width: 100%; accent-color: var(--cyan); cursor: pointer;" />
            </div>
          </div>

          <div class="glass-card" style="display: flex; flex-direction: column; justify-content: space-between; border-color: rgba(56, 189, 248, 0.35);">
            <h3 style="font-size: 18px; font-weight: 800; color: #fff;">Calculation Result</h3>
            <div style="display: flex; flex-direction: column; gap: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">
                <span style="color: var(--text-muted); font-size: 14px;">Simple Interest (SI):</span>
                <span style="font-weight: 900; color: #34d399; font-size: 20px;">₹${siInterest.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="color: var(--text-muted); font-size: 14px;">Maturity Amount (A):</span>
                <span style="font-weight: 900; color: var(--cyan); font-size: 22px;">₹${siAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
            </div>
            <div style="background: rgba(3, 7, 18, 0.8); padding: 14px; border-radius: 12px; font-size: 12px; color: var(--text-dim); font-family: monospace;">
              Formula: SI = (P × R × T) / 100
            </div>
          </div>
        </div>
      ` : `
        <div class="grid-2">
          <div class="glass-card" style="display: flex; flex-direction: column; gap: 18px;">
            <h3 style="font-size: 18px; font-weight: 800; color: #fff;">CI Input Parameters</h3>
            <div>
              <label style="display: block; font-size: 12.5px; font-weight: 600; color: #cbd5e1; margin-bottom: 6px;">Principal Amount (P): ₹${ciP.toLocaleString('en-IN')}</label>
              <input type="range" min="1000" max="500000" step="1000" value="${ciP}" oninput="updateCIParam('P', this.value)" style="width: 100%; accent-color: var(--cyan); cursor: pointer;" />
            </div>
            <div>
              <label style="display: block; font-size: 12.5px; font-weight: 600; color: #cbd5e1; margin-bottom: 6px;">Nominal Interest Rate (R): ${ciR}%</label>
              <input type="range" min="1" max="25" step="0.5" value="${ciR}" oninput="updateCIParam('R', this.value)" style="width: 100%; accent-color: var(--cyan); cursor: pointer;" />
            </div>
            <div>
              <label style="display: block; font-size: 12.5px; font-weight: 600; color: #cbd5e1; margin-bottom: 6px;">Compounding Frequency:</label>
              <select onchange="updateCIParam('freq', this.value)" style="width: 100%; background: #030712; border: 1px solid var(--border-color); border-radius: 10px; padding: 10px; color: #fff; font-size: 12px;">
                <option value="1" ${ciFreq === 1 ? 'selected' : ''}>Annually (m=1)</option>
                <option value="2" ${ciFreq === 2 ? 'selected' : ''}>Semi-Annually (m=2)</option>
                <option value="4" ${ciFreq === 4 ? 'selected' : ''}>Quarterly (m=4)</option>
                <option value="12" ${ciFreq === 12 ? 'selected' : ''}>Monthly (m=12)</option>
              </select>
            </div>
          </div>

          <div class="glass-card" style="display: flex; flex-direction: column; justify-content: space-between; border-color: rgba(56, 189, 248, 0.35);">
            <h3 style="font-size: 18px; font-weight: 800; color: #fff;">Compound Result</h3>
            <div style="display: flex; flex-direction: column; gap: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">
                <span style="color: var(--text-muted); font-size: 14px;">Compound Interest (CI):</span>
                <span style="font-weight: 900; color: #34d399; font-size: 20px;">₹${ciInterest.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">
                <span style="color: var(--text-muted); font-size: 14px;">Total Amount (A):</span>
                <span style="font-weight: 900; color: var(--cyan); font-size: 22px;">₹${ciAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="color: var(--text-muted); font-size: 14px;">Effective Annual Yield (E):</span>
                <span style="font-weight: 900; color: #fbbf24; font-size: 20px;">${effectiveYield}%</span>
              </div>
            </div>
            <div style="background: rgba(3, 7, 18, 0.8); padding: 14px; border-radius: 12px; font-size: 12px; color: var(--text-dim); font-family: monospace;">
              Formula: A = P(1 + i)^n , E = (1 + i)^m - 1
            </div>
          </div>
        </div>
      `}
    </div>
  `;
}

function setCalculatorMode(mode) {
  calcMode = mode;
  const container = document.getElementById('app-view');
  if (container) container.innerHTML = renderCalculatorView();
}

function updateSIParam(key, val) {
  if (key === 'P') siP = Number(val);
  if (key === 'R') siR = Number(val);
  if (key === 'T') siT = Number(val);
  const container = document.getElementById('app-view');
  if (container) container.innerHTML = renderCalculatorView();
}

function updateCIParam(key, val) {
  if (key === 'P') ciP = Number(val);
  if (key === 'R') ciR = Number(val);
  if (key === 'freq') ciFreq = Number(val);
  const container = document.getElementById('app-view');
  if (container) container.innerHTML = renderCalculatorView();
}

// 5. PRACTICE QUIZ VIEW
function renderQuizView() {
  const availableQuestions = quizSubExerciseId
    ? MATH_QUESTIONS.filter(q => q.subExerciseId === quizSubExerciseId)
    : quizChapterId
      ? MATH_QUESTIONS.filter(q => q.chapterId === quizChapterId)
      : MATH_QUESTIONS;

  const currentQ = availableQuestions[quizQuestionIndex];

  if (!currentQ) {
    return `
      <div class="page-wrapper fade-in" style="text-align: center; padding: 64px 0;">
        <h2 style="font-size: 20px; color: #fff; font-weight: 800; margin-bottom: 16px;">No questions found for this topic.</h2>
        <button onclick="navigateTo('quiz', null, null)" class="btn btn-primary">Show All Questions</button>
      </div>
    `;
  }

  const accuracyPercent = quizSessionAttempt > 0 ? Math.round((quizSessionCorrect / quizSessionAttempt) * 100) : 0;

  return `
    <div class="page-wrapper fade-in" style="max-width: 880px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; border-bottom: 1px solid var(--border-color); padding-bottom: 18px;">
        <div>
          <span class="pill-badge pill-cyan">${currentQ.chapterName}</span>
          <span class="pill-badge pill-amber" style="margin-left: 8px;">${currentQ.difficulty}</span>
        </div>

        <div style="display: flex; gap: 12px; align-items: center;">
          <button onclick="openJumpModal()" class="btn btn-secondary" style="padding: 8px 14px; font-size: 12px;">
            🔍 Jump to Question
          </button>

          <select
            onchange="handleQuizFilterChange(this.value)"
            style="background: #070a14; border: 1px solid var(--border-color); border-radius: 10px; padding: 8px 14px; color: #fff; font-size: 12px; cursor: pointer;"
          >
            <option value="ALL">All Topics (${MATH_QUESTIONS.length} Questions)</option>
            ${CA_MATH_CHAPTERS.map(ch => `
              <option value="${ch.id}" ${quizChapterId === ch.id && !quizSubExerciseId ? 'selected' : ''}>📚 ${ch.title}</option>
            `).join('')}
          </select>
        </div>
      </div>

      <div class="glass-card" style="display: flex; flex-direction: column; gap: 24px; padding: 32px; background: rgba(13, 19, 36, 0.95);">
        <div style="display: flex; justify-content: space-between; font-size: 12.5px; color: var(--text-muted); font-weight: 700;">
          <span>Question ${quizQuestionIndex + 1} of ${availableQuestions.length}</span>
          <span>Session Accuracy: <strong style="color: #34d399;">${accuracyPercent}%</strong></span>
        </div>

        <h3 style="font-size: 20px; font-weight: 800; color: #fff; line-height: 1.5;">${currentQ.questionText}</h3>

        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${currentQ.options.map((opt, idx) => {
    let className = "quiz-option";
    if (quizSelectedOption === idx) className += " selected";
    if (quizIsSubmitted) {
      if (idx === currentQ.correctIndex) className += " correct";
      else if (quizSelectedOption === idx) className += " incorrect";
    }

    const letter = String.fromCharCode(65 + idx);

    return `
              <button
                onclick="selectQuizOption(${idx})"
                class="${className}"
              >
                <div style="display: flex; align-items: center; gap: 14px;">
                  <span class="option-badge">${letter}</span>
                  <span style="font-size: 14px; font-weight: 600; color: #f8fafc;">${opt}</span>
                </div>
                ${quizIsSubmitted && idx === currentQ.correctIndex ? '<span style="color: #34d399; font-weight: 800; font-size: 13px;">✓ Correct</span>' : ''}
                ${quizIsSubmitted && quizSelectedOption === idx && idx !== currentQ.correctIndex ? '<span style="color: #f43f5e; font-weight: 800; font-size: 13px;">✕ Incorrect</span>' : ''}
              </button>
            `;
  }).join('')}
        </div>

        ${quizIsSubmitted ? `
          <div style="background: rgba(3, 7, 18, 0.9); border: 1px solid rgba(99, 102, 241, 0.35); border-radius: 14px; padding: 22px; font-size: 13.5px; display: flex; flex-direction: column; gap: 10px;">
            <div style="font-weight: 800; color: var(--cyan);">💡 Solution & Detailed Explanation:</div>
            <p style="color: #cbd5e1; line-height: 1.6;">${currentQ.explanation}</p>
            ${currentQ.formulaUsed ? `<div style="color: #fde047; font-family: monospace; font-weight: 700;">Formula: ${currentQ.formulaUsed}</div>` : ''}
          </div>
        ` : ''}

        <div style="display: flex; justify-content: flex-end; padding-top: 16px; border-top: 1px solid var(--border-color);">
          ${!quizIsSubmitted ? `
            <button
              onclick="submitQuizAnswer()"
              class="btn btn-primary"
              style="padding: 12px 28px; font-size: 13.5px; ${quizSelectedOption === null ? 'opacity: 0.5; cursor: not-allowed;' : ''}"
            >
              Submit Answer
            </button>
          ` : `
            <button
              onclick="nextQuizQuestion()"
              class="btn btn-primary"
              style="padding: 12px 28px; font-size: 13.5px;"
            >
              ${quizQuestionIndex < availableQuestions.length - 1 ? 'Next Question →' : 'Practice Completed ✓'}
            </button>
          `}
        </div>
      </div>
    </div>
  `;
}

function handleQuizFilterChange(val) {
  if (val === 'ALL') {
    quizChapterId = null;
    quizSubExerciseId = null;
  } else {
    quizChapterId = val;
    quizSubExerciseId = null;
  }
  quizQuestionIndex = 0;
  quizSelectedOption = null;
  quizIsSubmitted = false;
  const container = document.getElementById('app-view');
  if (container) container.innerHTML = renderQuizView();
}

function selectQuizOption(idx) {
  if (quizIsSubmitted) return;
  quizSelectedOption = idx;
  const container = document.getElementById('app-view');
  if (container) container.innerHTML = renderQuizView();
}

function submitQuizAnswer() {
  if (quizSelectedOption === null || quizIsSubmitted) return;

  const availableQuestions = quizSubExerciseId
    ? MATH_QUESTIONS.filter(q => q.subExerciseId === quizSubExerciseId)
    : quizChapterId
      ? MATH_QUESTIONS.filter(q => q.chapterId === quizChapterId)
      : MATH_QUESTIONS;

  const currentQ = availableQuestions[quizQuestionIndex];
  if (!currentQ) return;

  quizIsSubmitted = true;
  const isCorrect = quizSelectedOption === currentQ.correctIndex;
  quizSessionAttempt++;

  if (isCorrect) {
    quizSessionCorrect++;
    playSound('correct');
    if (typeof confetti === 'function') {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    }
  }

  appUser.totalQuestionsAttempted++;
  if (isCorrect) appUser.correctQuestionsCount++;
  else appUser.incorrectQuestionsCount++;

  appUser = calculateXPAndLevel(appUser);
  saveUserProfileToCookies(appUser);

  renderSidebar();
  renderNavbar();

  const container = document.getElementById('app-view');
  if (container) container.innerHTML = renderQuizView();
}

function nextQuizQuestion() {
  const availableQuestions = quizSubExerciseId
    ? MATH_QUESTIONS.filter(q => q.subExerciseId === quizSubExerciseId)
    : quizChapterId
      ? MATH_QUESTIONS.filter(q => q.chapterId === quizChapterId)
      : MATH_QUESTIONS;

  if (quizQuestionIndex < availableQuestions.length - 1) {
    quizQuestionIndex++;
    quizSelectedOption = null;
    quizIsSubmitted = false;
    const container = document.getElementById('app-view');
    if (container) container.innerHTML = renderQuizView();
  }
}

// 6. RANK & LEVELS VIEW
function renderRankView() {
  const currentTier = RANK_TIERS.find(t => appUser.level >= t.minLevel && appUser.level <= t.maxLevel) || RANK_TIERS[RANK_TIERS.length - 1];

  return `
    <div class="page-wrapper fade-in" style="display: flex; flex-direction: column; gap: 32px;">
      <div class="glass-card" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px; padding: 36px; background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.9) 100%);">
        <div>
          <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; color: var(--cyan); letter-spacing: 1.5px;">Current Rank Tier</div>
          <h1 style="font-size: 34px; font-weight: 900; color: #fff; margin-top: 4px; display: flex; align-items: center; gap: 14px;">
            <span>${currentTier.badge}</span> ${currentTier.tierName}
          </h1>
          <p style="font-size: 14.5px; color: var(--text-muted); margin-top: 8px;">${currentTier.description}</p>
        </div>

        <div style="display: flex; gap: 16px;">
          <div style="background: rgba(3, 7, 18, 0.8); border: 1px solid var(--border-color); border-radius: 18px; padding: 18px 28px; text-align: center;">
            <div style="font-size: 26px; font-weight: 900; color: #fbbf24;">${appUser.level}</div>
            <div style="font-size: 11px; color: var(--text-muted); font-weight: 700;">Level</div>
          </div>
          <div style="background: rgba(3, 7, 18, 0.8); border: 1px solid var(--border-color); border-radius: 18px; padding: 18px 28px; text-align: center;">
            <div style="font-size: 26px; font-weight: 900; color: var(--cyan);">${appUser.xp}</div>
            <div style="font-size: 11px; color: var(--text-muted); font-weight: 700;">Total XP</div>
          </div>
        </div>
      </div>

      <div>
        <h2 style="font-size: 22px; font-weight: 800; color: #fff; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
          <span>👑</span> Rank Hierarchy Tiers
        </h2>
        <div class="grid-3">
          ${RANK_TIERS.map(tier => {
    const isUnlocked = appUser.level >= tier.minLevel;
    const isCurrent = appUser.level >= tier.minLevel && appUser.level <= tier.maxLevel;

    return `
              <div class="glass-card" style="opacity: ${isUnlocked ? '1' : '0.65'}; border-color: ${isCurrent ? 'rgba(251, 191, 36, 0.6)' : 'var(--border-color)'};">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                  <span style="font-size: 32px;">${tier.badge}</span>
                  <span class="pill-badge ${isCurrent ? 'pill-amber' : isUnlocked ? 'pill-emerald' : 'pill-cyan'}">
                    ${isCurrent ? 'Current Tier' : isUnlocked ? 'Unlocked ✓' : `Req Level ${tier.minLevel}`}
                  </span>
                </div>
                <h3 style="font-size: 19px; font-weight: 800; color: #fff; margin-bottom: 6px;">${tier.tierName}</h3>
                <p style="font-size: 12.5px; color: var(--text-muted); line-height: 1.5; margin-bottom: 18px;">${tier.description}</p>
                <div style="font-size: 12px; font-weight: 700; color: var(--text-dim); border-top: 1px solid var(--border-color); padding-top: 12px;">
                  Levels ${tier.minLevel} - ${tier.maxLevel}
                </div>
              </div>
            `;
  }).join('')}
        </div>
      </div>
    </div>
  `;
}

// 7. PROFILE VIEW
function renderProfileView() {
  const accuracyPercent = appUser.totalQuestionsAttempted > 0
    ? Math.round((appUser.correctQuestionsCount / appUser.totalQuestionsAttempted) * 100)
    : 0;

  return `
    <div class="page-wrapper fade-in" style="max-width: 920px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h1 style="font-size: 28px; font-weight: 800; color: #fff;">Student Profile & Settings</h1>
        <p style="font-size: 14px; color: var(--text-muted);">Manage your profile, learning preferences and track overall study stats.</p>
      </div>

      <div class="grid-3" style="grid-template-columns: 1fr 2fr;">
        <div class="glass-card" style="text-align: center; display: flex; flex-direction: column; align-items: center; gap: 18px;">
          <div style="width: 84px; height: 84px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--cyan)); display: flex; align-items: center; justify-content: center; font-size: 36px; font-weight: 900; color: #fff; box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);">
            ${appUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 style="font-size: 20px; font-weight: 800; color: #fff;">${appUser.name}</h2>
            <div style="font-size: 12.5px; font-weight: 700; color: var(--cyan); margin-top: 2px;">${appUser.rankTitle} (Level ${appUser.level})</div>
          </div>
          <div style="background: rgba(3, 7, 18, 0.8); border: 1px solid var(--border-color); border-radius: 14px; padding: 18px; width: 100%; display: flex; flex-direction: column; gap: 10px; font-size: 12.5px;">
            <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Target Exam:</span><span style="font-weight: 700; color: #fff;">CA Foundation</span></div>
            <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Accuracy:</span><span style="font-weight: 700; color: #34d399;">${accuracyPercent}%</span></div>
            <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Streak:</span><span style="font-weight: 700; color: #fbbf24;">${appUser.currentStreakDays} Days</span></div>
          </div>
        </div>

        <div class="glass-card" style="display: flex; flex-direction: column; gap: 20px;">
          <h3 style="font-size: 19px; font-weight: 800; color: #fff;">Edit Profile Details</h3>
          <div id="profile-success-msg" style="display: none; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 14px; font-size: 12.5px; color: #34d399; font-weight: 700;">
            ✓ Profile saved successfully!
          </div>
          <form onsubmit="handleProfileSave(event)" style="display: flex; flex-direction: column; gap: 18px;">
            <div>
              <label style="display: block; font-size: 12.5px; font-weight: 700; color: #cbd5e1; margin-bottom: 6px;">Aspirant Name</label>
              <input id="profile-name-input" type="text" value="${appUser.name}" style="width: 100%; background: #030712; border: 1px solid var(--border-color); border-radius: 12px; padding: 12px 16px; font-size: 13px; color: #fff;" />
            </div>
            <div>
              <label style="display: block; font-size: 12.5px; font-weight: 700; color: #cbd5e1; margin-bottom: 6px;">Daily Study Target (Minutes)</label>
              <input id="profile-goal-input" type="number" value="${appUser.dailyGoalMinutes}" style="width: 100%; background: #030712; border: 1px solid var(--border-color); border-radius: 12px; padding: 12px 16px; font-size: 13px; color: #fff;" />
            </div>
            <button type="submit" class="btn btn-primary" style="padding: 12px 28px; font-size: 13px; align-self: flex-start;">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
}

function handleProfileSave(e) {
  e.preventDefault();
  const nameVal = document.getElementById('profile-name-input')?.value;
  const goalVal = document.getElementById('profile-goal-input')?.value;

  if (nameVal) appUser.name = nameVal.trim();
  if (goalVal) appUser.dailyGoalMinutes = Number(goalVal) || 30;

  saveUserProfileToCookies(appUser);
  renderSidebar();
  renderNavbar();

  const msg = document.getElementById('profile-success-msg');
  if (msg) {
    msg.style.display = 'block';
    setTimeout(() => { msg.style.display = 'none'; }, 2000);
  }
}

// ----------------------------------------------------
// MODAL CONTROLLERS
// ----------------------------------------------------
function setupModalListeners() { }

function openEmailModal() {
  const modal = document.getElementById('email-modal');
  if (modal) modal.style.display = 'flex';
}

function closeEmailModal() {
  const modal = document.getElementById('email-modal');
  if (modal) modal.style.display = 'none';
}

function handleEmailSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('email-sender-name')?.value;
  const email = document.getElementById('email-sender-address')?.value;
  const subject = document.getElementById('email-subject')?.value;
  const message = document.getElementById('email-message')?.value;

  if (!message) return;

  const recipient = 'sahil2412l@gmail.com';
  const emailSub = encodeURIComponent(`[CA Math Hub] ${subject}`);
  const emailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

  window.open(`mailto:${recipient}?subject=${emailSub}&body=${emailBody}`, '_blank');

  const msg = document.getElementById('email-success-msg');
  if (msg) {
    msg.style.display = 'block';
    setTimeout(() => {
      msg.style.display = 'none';
      closeEmailModal();
    }, 2000);
  }
}

function openNoticeModal() {
  const modal = document.getElementById('notice-modal');
  if (modal) modal.style.display = 'flex';
}

function closeNoticeModal() {
  const modal = document.getElementById('notice-modal');
  if (modal) modal.style.display = 'none';
}

function openJumpModal() {
  const modal = document.getElementById('jump-modal');
  if (modal) {
    modal.style.display = 'flex';
    renderJumpModalList('');
  }
}

function closeJumpModal() {
  const modal = document.getElementById('jump-modal');
  if (modal) modal.style.display = 'none';
}

function filterJumpQuestions(query) {
  renderJumpModalList(query);
}

function renderJumpModalList(query) {
  const container = document.getElementById('jump-questions-list');
  if (!container) return;

  const availableQuestions = quizSubExerciseId
    ? MATH_QUESTIONS.filter(q => q.subExerciseId === quizSubExerciseId)
    : quizChapterId
      ? MATH_QUESTIONS.filter(q => q.chapterId === quizChapterId)
      : MATH_QUESTIONS;

  const qLower = query.toLowerCase();
  const filtered = availableQuestions.filter((q, idx) =>
    (idx + 1).toString().includes(qLower) ||
    q.questionText.toLowerCase().includes(qLower) ||
    (q.chapterName && q.chapterName.toLowerCase().includes(qLower))
  );

  container.innerHTML = filtered.map(q => {
    const origIndex = availableQuestions.indexOf(q);
    return `
      <div
        onclick="jumpToQuizIndex(${origIndex})"
        style="cursor: pointer; background: #030712; padding: 14px; border-radius: 12px; border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; font-size: 12.5px; transition: border-color 0.2s ease;"
      >
        <span style="font-weight: 800; color: var(--cyan);">Q${origIndex + 1}</span>
        <span style="color: #cbd5e1; margin: 0 12px; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${q.questionText}</span>
        <span style="font-size: 10px; color: var(--text-dim); font-weight: 700;">${q.difficulty}</span>
      </div>
    `;
  }).join('');
}

function jumpToQuizIndex(idx) {
  quizQuestionIndex = idx;
  quizSelectedOption = null;
  quizIsSubmitted = false;
  closeJumpModal();
  const container = document.getElementById('app-view');
  if (container) container.innerHTML = renderQuizView();
}

function renderTableView() {
  return `
    <div style="max-width: 1200px; margin: 0 auto; padding: 32px 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
        <div>
          <h1 style="font-size: 24px; font-weight: 800; color: #fff; margin-bottom: 4px;">📋 Question Bank Data Table</h1>
          <p style="font-size: 13px; color: var(--text-dim);">Structured table overview with interactive column search & filters.</p>
        </div>
        <div style="padding: 8px 16px; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 12px; font-size: 12px; font-weight: 800; color: var(--cyan);">
          🎯 Total Questions: ${MATH_QUESTIONS.length}
        </div>
      </div>

      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; padding: 20px; overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
          <thead>
            <tr style="border-b: 1px solid var(--border-color); color: var(--text-dim); font-size: 11px; text-transform: uppercase;">
              <th style="padding: 12px; text-align: center;">#</th>
              <th style="padding: 12px;">Chapter</th>
              <th style="padding: 12px;">Question Text</th>
              <th style="padding: 12px; text-align: center;">Difficulty</th>
              <th style="padding: 12px; text-align: center;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${MATH_QUESTIONS.map((q, idx) => `
              <tr style="border-b: 1px solid rgba(255, 255, 255, 0.05);">
                <td style="padding: 12px; text-align: center; font-weight: 800; color: var(--text-dim);">${idx + 1}</td>
                <td style="padding: 12px; font-weight: 700; color: var(--cyan);">${q.chapterName}</td>
                <td style="padding: 12px; color: #e2e8f0;">${q.questionText}</td>
                <td style="padding: 12px; text-align: center;">
                  <span style="padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; background: rgba(99, 102, 241, 0.15); color: #a5b4fc; border: 1px solid rgba(99, 102, 241, 0.3);">${q.difficulty || 'Medium'}</span>
                </td>
                <td style="padding: 12px; text-align: center;">
                  <button onclick="navigateTo('quiz', '${q.chapterId}', '${q.subExerciseId || ''}')" style="padding: 6px 14px; background: var(--primary); color: #fff; border: none; border-radius: 8px; font-size: 11px; font-weight: 700; cursor: pointer;">Practice ⚡</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
