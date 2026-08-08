import React, { useState } from 'react';

export const Navbar = ({ user, activeTab }) => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  // Form states for Contact Email
  const [senderName, setSenderName] = useState(user.name || '');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('CA Foundation Math Doubt / Feedback');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const getTabTitle = (tab) => {
    switch (tab) {
      case 'dashboard': return 'Dashboard Overview';
      case 'chapters': return 'CA Foundation Quantitative Aptitude Syllabus & Formulas';
      case 'flashcards': return 'Formula Flashcards Revision';
      case 'calculator': return 'CA Calculator';
      case 'quiz': return 'Practice Quiz & Mock Tests';
      case 'rank': return 'Level & Rank System';
      case 'profile': return 'Profile';
      default: return 'CA Foundation Math Prep';
    }
  };

  const handleSendEmailSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Construct mailto link to open user's default email client
    const recipientEmail = 'sahil2412l@gmail.com';
    const emailSubject = encodeURIComponent(`[CA Math Hub] ${subject}`);
    const emailBody = encodeURIComponent(
      `Name: ${senderName}\nEmail: ${senderEmail}\nLevel: ${user.level} (${user.rankTitle})\n\nMessage:\n${message}`
    );

    window.open(`mailto:${recipientEmail}?subject=${emailSubject}&body=${emailBody}`, '_blank');
    
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setShowContactModal(false);
      setMessage('');
    }, 2000);
  };

  return (
    <>
      <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-800 bg-slate-900/90 px-8 backdrop-blur-xl flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">{getTabTitle(activeTab)}</h1>
          <p className="text-xs text-slate-400">
            Welcome back, <span className="font-semibold text-cyan-400">{user.name}</span> • Level {user.level} ({user.rankTitle})
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Email / Contact Button */}
          <button
            onClick={() => setShowContactModal(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-500/40 bg-indigo-600/20 hover:bg-indigo-600/30 px-3.5 py-1.5 text-xs font-bold text-indigo-300 transition cursor-pointer shadow-sm hover:shadow-indigo-500/20"
            title="Directly send an email / doubt to instructor"
          >
            📧 Send Email
          </button>

          {/* About Us Button */}
          <button
            onClick={() => setShowAboutModal(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-600/20 hover:bg-cyan-600/30 px-3.5 py-1.5 text-xs font-bold text-cyan-300 transition cursor-pointer shadow-sm hover:shadow-cyan-500/20"
            title="About CA Foundation Quantitative Aptitude App"
          >
            ℹ️ Notice
          </button>

          {/* Cookie Sync Indicator */}
          <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Cookies Synced ✓
          </div>

          {/* Streak Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
            🔥 {user.currentStreakDays} Day Streak
          </div>
        </div>
      </header>

      {/* 1. Contact / Email Form Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl border border-indigo-500/30 bg-slate-900 p-6 shadow-2xl space-y-4 text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✉️</span>
                <div>
                  <h3 className="text-lg font-bold text-white">Send Direct Email</h3>
                  <p className="text-xs text-slate-400">Ask doubts, report feedback or contact the instructor.</p>
                </div>
              </div>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-slate-400 hover:text-white text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {sentSuccess ? (
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-center text-emerald-300 text-sm font-semibold">
                ✓ Email composed! Opening your email app to send...
              </div>
            ) : (
              <form onSubmit={handleSendEmailSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Email Address</label>
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    placeholder="student@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="CA Foundation Math Doubt / Feedback">CA Foundation Math Doubt / Feedback</option>
                    <option value="Question / Formula Help">Question / Formula Help</option>
                    <option value="Technical Issue / Suggestion">Technical Issue / Suggestion</option>
                    <option value="General Query">General Query</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Message / Query</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    placeholder="Type your question or message here..."
                  />
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowContactModal(false)}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 cursor-pointer transition"
                  >
                    🚀 Send Email
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 2. About App Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-xl rounded-2xl border border-cyan-500/30 bg-slate-900 p-6 shadow-2xl space-y-4 text-slate-100 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📘</span>
                <div>
                  <h3 className="text-lg font-bold text-white">About CA Foundation Quantitative Aptitude</h3>
                  <p className="text-xs text-cyan-400">Paper 3: Math, Logical Reasoning & Statistics</p>
                </div>
              </div>
              <button
                onClick={() => setShowAboutModal(false)}
                className="text-slate-400 hover:text-white text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <p>
                Welcome to the ultimate learning portal for <strong className="text-white">CA Foundation Paper 3 - Quantitative Aptitude</strong>. Designed to help aspirants score 80+ marks through structured chapter units, formula revision, and gamified practice.
              </p>

              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-2">
                <h4 className="font-bold text-cyan-400 text-xs">✨ Key Features:</h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  <li><strong className="text-white">Chapter Exercises</strong>: Topic-wise practice sets for Business Math, LR & Statistics.</li>
                  <li><strong className="text-white">Time Value of Money (TVM)</strong>: Dedicated simple/compound interest & annuity formulas.</li>
                  <li><strong className="text-white">CA Financial Calculator</strong>: Built-in calculator for compound interest & TVM.</li>
                  <li><strong className="text-white">Gamified XP & Streaks</strong>: Earn XP, unlock ranks (Novice ➔ AIR 1).</li>
                </ul>
              </div>

              <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/30 p-3 text-slate-300 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-white">Contact & Support</div>
                  <div className="text-[11px] text-slate-400">Direct Email: sahil2412l@gmail.com</div>
                </div>
                <button
                  onClick={() => {
                    setShowAboutModal(false);
                    setShowContactModal(true);
                  }}
                  className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-500 cursor-pointer"
                >
                  Contact Now
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowAboutModal(false)}
                className="rounded-xl bg-slate-800 hover:bg-slate-700 px-5 py-2 text-xs font-bold text-white cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
