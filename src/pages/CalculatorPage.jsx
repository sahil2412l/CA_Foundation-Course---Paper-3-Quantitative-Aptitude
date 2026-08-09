import React, { useState } from 'react';

export function CalculatorPage() {
  const [calcMode, setCalcMode] = useState('SI');
  const [siP, setSiP] = useState(10000);
  const [siR, setSiR] = useState(8);
  const [siT, setSiT] = useState(5);

  const [ciP, setCiP] = useState(10000);
  const [ciR, setCiR] = useState(8);
  const [ciT, setCiT] = useState(5);
  const [ciFreq, setCiFreq] = useState(4);

  const siInterest = (siP * siR * siT) / 100;
  const siAmount = siP + siInterest;

  const ciRatePerPeriod = ciR / (100 * ciFreq);
  const ciTotalPeriods = ciT * ciFreq;
  const ciAmount = ciP * Math.pow(1 + ciRatePerPeriod, ciTotalPeriods);
  const ciInterest = ciAmount - ciP;

  return (
    <div className="mx-auto max-w-7xl p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-white">🧮 CA Financial & Math Calculator</h1>
        <p className="text-sm text-slate-400">Solve Time Value of Money problems, Simple & Compound Interest instantly.</p>
      </div>

      <div className="flex gap-3">
        <button onClick={() => setCalcMode('SI')} className={`rounded-xl px-5 py-2.5 text-xs font-bold transition cursor-pointer ${calcMode === 'SI' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}>Simple Interest (SI)</button>
        <button onClick={() => setCalcMode('CI')} className={`rounded-xl px-5 py-2.5 text-xs font-bold transition cursor-pointer ${calcMode === 'CI' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'}`}>Compound Interest (CI)</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <h2 className="text-base font-bold text-cyan-400">📝 Input Parameters</h2>
          {calcMode === 'SI' ? (
            <>
              <div><label className="block text-xs text-slate-400 mb-1">Principal (P in ₹):</label><input type="number" value={siP} onChange={(e) => setSiP(Number(e.target.value))} className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-white text-sm" /></div>
              <div><label className="block text-xs text-slate-400 mb-1">Rate (R % p.a.):</label><input type="number" value={siR} onChange={(e) => setSiR(Number(e.target.value))} className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-white text-sm" /></div>
              <div><label className="block text-xs text-slate-400 mb-1">Time (T in Years):</label><input type="number" value={siT} onChange={(e) => setSiT(Number(e.target.value))} className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-white text-sm" /></div>
            </>
          ) : (
            <>
              <div><label className="block text-xs text-slate-400 mb-1">Principal (P in ₹):</label><input type="number" value={ciP} onChange={(e) => setCiP(Number(e.target.value))} className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-white text-sm" /></div>
              <div><label className="block text-xs text-slate-400 mb-1">Rate (R % p.a.):</label><input type="number" value={ciR} onChange={(e) => setCiR(Number(e.target.value))} className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-white text-sm" /></div>
              <div><label className="block text-xs text-slate-400 mb-1">Time (T in Years):</label><input type="number" value={ciT} onChange={(e) => setCiT(Number(e.target.value))} className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-white text-sm" /></div>
            </>
          )}
        </div>

        <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/60 p-6 space-y-4">
          <h2 className="text-base font-bold text-emerald-400">⚡ Calculated Result</h2>
          {calcMode === 'SI' ? (
            <div className="space-y-3">
              <div className="rounded-xl bg-slate-950 p-4"><div className="text-xs text-slate-400">Simple Interest (SI)</div><div className="text-3xl font-black text-cyan-400">₹{siInterest.toLocaleString('en-IN')}</div></div>
              <div className="rounded-xl bg-slate-950 p-4"><div className="text-xs text-slate-400">Total Amount (A)</div><div className="text-2xl font-bold text-emerald-400">₹{siAmount.toLocaleString('en-IN')}</div></div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-xl bg-slate-950 p-4"><div className="text-xs text-slate-400">Compound Interest (CI)</div><div className="text-3xl font-black text-cyan-400">₹{Math.round(ciInterest).toLocaleString('en-IN')}</div></div>
              <div className="rounded-xl bg-slate-950 p-4"><div className="text-xs text-slate-400">Compounded Amount (A)</div><div className="text-2xl font-bold text-emerald-400">₹{Math.round(ciAmount).toLocaleString('en-IN')}</div></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
