// Calculator Page Module
function CalculatorPage() {
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
    <div className="mx-auto max-w-5xl p-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-extrabold text-white">CA Financial & TVM Calculator</h1>
        <p className="text-sm text-slate-400">Calculate Simple Interest, Compound Interest, Effective Rate & Annuities instantly.</p>
      </div>

      <div className="flex border-b border-slate-800 gap-4">
        <button
          onClick={() => setCalcMode('SI')}
          className={`pb-3 text-sm font-bold border-b-2 transition ${calcMode === 'SI' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          Simple Interest (SI)
        </button>
        <button
          onClick={() => setCalcMode('CI')}
          className={`pb-3 text-sm font-bold border-b-2 transition ${calcMode === 'CI' ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'}`}
        >
          Compound Interest (CI) & Effective Rate
        </button>
      </div>

      {calcMode === 'SI' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">SI Input Parameters</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Principal Amount (P): ₹{siP}</label>
              <input
                type="range" min="1000" max="500000" step="1000" value={siP}
                onChange={(e) => setSiP(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Annual Interest Rate (R): {siR}%</label>
              <input
                type="range" min="1" max="25" step="0.5" value={siR}
                onChange={(e) => setSiR(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Time Period (T): {siT} Years</label>
              <input
                type="range" min="1" max="30" step="1" value={siT}
                onChange={(e) => setSiT(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-6 space-y-4 flex flex-col justify-between">
            <h3 className="text-lg font-bold text-white">Calculation Result</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                <span className="text-slate-400">Simple Interest (SI):</span>
                <span className="font-bold text-emerald-400 text-base">₹{siInterest.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Total Maturity Amount (A):</span>
                <span className="font-extrabold text-cyan-400 text-lg">₹{siAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
            </div>
            <div className="rounded-xl bg-slate-950/80 p-3 text-xs text-slate-400 font-mono">
              Formula: SI = (P × R × T) / 100
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">CI Input Parameters</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Principal Amount (P): ₹{ciP}</label>
              <input
                type="range" min="1000" max="500000" step="1000" value={ciP}
                onChange={(e) => setCiP(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Nominal Interest Rate (R): {ciR}%</label>
              <input
                type="range" min="1" max="25" step="0.5" value={ciR}
                onChange={(e) => setCiR(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Compounding Frequency:</label>
              <select
                value={ciFreq} onChange={(e) => setCiFreq(Number(e.target.value))}
                className="w-full rounded-xl bg-slate-950 border border-slate-700 p-2 text-xs text-white"
              >
                <option value={1}>Annually (m=1)</option>
                <option value={2}>Semi-Annually (m=2)</option>
                <option value={4}>Quarterly (m=4)</option>
                <option value={12}>Monthly (m=12)</option>
              </select>
            </div>
          </div>

          <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-6 space-y-4 flex flex-col justify-between">
            <h3 className="text-lg font-bold text-white">Compound Result</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                <span className="text-slate-400">Compound Interest (CI):</span>
                <span className="font-bold text-emerald-400 text-base">₹{ciInterest.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-2">
                <span className="text-slate-400">Total Amount (A):</span>
                <span className="font-extrabold text-cyan-400 text-lg">₹{ciAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Effective Annual Yield (E):</span>
                <span className="font-bold text-amber-400 text-base">{((Math.pow(1 + ciRatePerPeriod, ciFreq) - 1) * 100).toFixed(2)}%</span>
              </div>
            </div>
            <div className="rounded-xl bg-slate-950/80 p-3 text-xs text-slate-400 font-mono">
              Formula: A = P(1 + i)^n , E = (1 + i)^m - 1
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
