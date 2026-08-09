import React, { useState } from 'react';

export function EmailModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message) return;
    const recipient = 'sahil2412l@gmail.com';
    const emailSub = encodeURIComponent(`[CA Math Hub] ${subject || 'Feedback'}`);
    const emailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.open(`mailto:${recipient}?subject=${emailSub}&body=${emailBody}`, '_blank');
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="w-full max-w-lg rounded-2xl border border-indigo-500/40 bg-slate-900 p-6 space-y-4 shadow-2xl">
        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            📧 Send Feedback / Message
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xl cursor-pointer">✕</button>
        </div>

        {sentSuccess ? (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center font-bold text-sm">
            ✓ Opening email client... Feedback message ready!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3.5 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Your Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3.5 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Feedback, Bug Report, Question..."
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3.5 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Message *</label>
              <textarea
                required
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your feedback or message here..."
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3.5 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
              ></textarea>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 hover:bg-slate-700">Cancel</button>
              <button type="submit" className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg cursor-pointer">Send Email 🚀</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
