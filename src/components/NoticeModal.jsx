import React from 'react';

export function NoticeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="w-full max-w-xl rounded-2xl border border-cyan-500/40 bg-slate-900 p-6 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            ℹ️ CA Foundation Syllabus & Exam Notice
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-xl cursor-pointer">✕</button>
        </div>

        <div className="space-y-4 text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
            📌 <strong>Paper 3: Quantitative Aptitude</strong> (100 Marks - 2 Hours Objective MCQ Test)
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm">Marks Distribution Breakdown:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-xs font-semibold text-slate-400">Part A</div>
                <div className="text-sm font-extrabold text-cyan-400">Business Mathematics</div>
                <div className="text-xs text-amber-400 font-bold mt-1">40 Marks</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-xs font-semibold text-slate-400">Part B</div>
                <div className="text-sm font-extrabold text-indigo-400">Logical Reasoning</div>
                <div className="text-xs text-amber-400 font-bold mt-1">20 Marks</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-xs font-semibold text-slate-400">Part C</div>
                <div className="text-sm font-extrabold text-emerald-400">Statistics</div>
                <div className="text-xs text-amber-400 font-bold mt-1">40 Marks</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-white text-sm">Key Exam Rules & Tips:</h4>
            <ul className="list-disc list-inside space-y-1.5 text-slate-300">
              <li><strong>Negative Marking:</strong> Each wrong question incurs a penalty of <span className="text-rose-400 font-bold">0.25 marks</span>.</li>
              <li><strong>Calculator Rules:</strong> ICAI permits standard 12-digit simple memory calculators (M+, M-, MRC, √). Financial & scientific functions strictly disallowed in physical exam hall.</li>
              <li><strong>Passing Criteria:</strong> Minimum 40% in each paper and aggregate 50% across all papers.</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button onClick={onClose} className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-bold text-white cursor-pointer">
            Close Notice
          </button>
        </div>
      </div>
    </div>
  );
}
