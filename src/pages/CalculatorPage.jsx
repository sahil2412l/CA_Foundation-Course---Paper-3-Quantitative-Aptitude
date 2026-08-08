import React, { useState } from 'react';

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '10px',
  background: '#1e293b',
  border: '1px solid var(--border-color)',
  color: '#fff',
  fontSize: '15px'
};

export const CalculatorPage = () => {
  const [calcMode, setCalcMode] = useState('SI');

  // SI Inputs
  const [siP, setSiP] = useState(10000);
  const [siR, setSiR] = useState(8);
  const [siT, setSiT] = useState(5);

  // CI Inputs
  const [ciP, setCiP] = useState(10000);
  const [ciR, setCiR] = useState(8);
  const [ciT, setCiT] = useState(5);
  const [ciFreq, setCiFreq] = useState(4); // 4 = quarterly

  // Annuity Inputs
  const [annA, setAnnA] = useState(2000);
  const [annR, setAnnR] = useState(10);
  const [annN, setAnnN] = useState(10);

  // Effective Rate Inputs
  const [effR, setEffR] = useState(12);
  const [effFreq, setEffFreq] = useState(12); // monthly

  // SI Calculation
  const siInterest = (siP * siR * siT) / 100;
  const siAmount = siP + siInterest;

  // CI Calculation
  const ciRatePerPeriod = ciR / (100 * ciFreq);
  const ciTotalPeriods = ciT * ciFreq;
  const ciAmount = ciP * Math.pow(1 + ciRatePerPeriod, ciTotalPeriods);
  const ciInterest = ciAmount - ciP;

  // Annuity FV Calculation
  const annI = annR / 100;
  const annFV = annA * ((Math.pow(1 + annI, annN) - 1) / annI);

  // Effective Rate Calculation
  const effI = effR / (100 * effFreq);
  const effRatePercent = (Math.pow(1 + effI, effFreq) - 1) * 100;

  return (
    <div className="page-wrapper fade-in">
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', color: '#fff' }}>🧮 CA Financial & Math Calculator</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
          Solve Time Value of Money problems, Annuities, Compound Interest, and Effective Interest Rates instantly.
        </p>
      </div>

      {/* Tabs Selector */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setCalcMode('SI')}
          className={`btn ${calcMode === 'SI' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Simple Interest (SI)
        </button>
        <button
          onClick={() => setCalcMode('CI')}
          className={`btn ${calcMode === 'CI' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Compound Interest (CI)
        </button>
        <button
          onClick={() => setCalcMode('ANNUITY')}
          className={`btn ${calcMode === 'ANNUITY' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Annuity Future Value
        </button>
        <button
          onClick={() => setCalcMode('EFFECTIVE')}
          className={`btn ${calcMode === 'EFFECTIVE' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Effective Rate (E)
        </button>
      </div>

      {/* Calculator Body */}
      <div className="grid-2">
        {/* Input Panel */}
        <div className="glass-card">
          <h2 style={{ fontSize: '18px', color: 'var(--cyan)', marginBottom: '20px' }}>
            📥 Input Parameters
          </h2>

          {calcMode === 'SI' && (
            <div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>Principal (P in ₹):</label>
                <input type="number" value={siP} onChange={(e) => setSiP(Number(e.target.value))} style={inputStyle} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>Rate of Interest (R % p.a.):</label>
                <input type="number" value={siR} onChange={(e) => setSiR(Number(e.target.value))} style={inputStyle} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>Time Period (T in Years):</label>
                <input type="number" value={siT} onChange={(e) => setSiT(Number(e.target.value))} style={inputStyle} />
              </div>
            </div>
          )}

          {calcMode === 'CI' && (
            <div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>Principal (P in ₹):</label>
                <input type="number" value={ciP} onChange={(e) => setCiP(Number(e.target.value))} style={inputStyle} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>Annual Rate (R % p.a.):</label>
                <input type="number" value={ciR} onChange={(e) => setCiR(Number(e.target.value))} style={inputStyle} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>Time (T in Years):</label>
                <input type="number" value={ciT} onChange={(e) => setCiT(Number(e.target.value))} style={inputStyle} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>Compounding Frequency:</label>
                <select value={ciFreq} onChange={(e) => setCiFreq(Number(e.target.value))} style={inputStyle}>
                  <option value={1}>Annual (m=1)</option>
                  <option value={2}>Half-Yearly (m=2)</option>
                  <option value={4}>Quarterly (m=4)</option>
                  <option value={12}>Monthly (m=12)</option>
                </select>
              </div>
            </div>
          )}

          {calcMode === 'ANNUITY' && (
            <div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>Periodic Payment (A in ₹):</label>
                <input type="number" value={annA} onChange={(e) => setAnnA(Number(e.target.value))} style={inputStyle} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>Interest Rate per Period (R %):</label>
                <input type="number" value={annR} onChange={(e) => setAnnR(Number(e.target.value))} style={inputStyle} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>Number of Periods (N):</label>
                <input type="number" value={annN} onChange={(e) => setAnnN(Number(e.target.value))} style={inputStyle} />
              </div>
            </div>
          )}

          {calcMode === 'EFFECTIVE' && (
            <div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>Nominal Interest Rate (R % p.a.):</label>
                <input type="number" value={effR} onChange={(e) => setEffR(Number(e.target.value))} style={inputStyle} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>Compounding Frequency per Year:</label>
                <select value={effFreq} onChange={(e) => setEffFreq(Number(e.target.value))} style={inputStyle}>
                  <option value={2}>Half-Yearly (m=2)</option>
                  <option value={4}>Quarterly (m=4)</option>
                  <option value={12}>Monthly (m=12)</option>
                  <option value={365}>Daily (m=365)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Output & Formula Solution Panel */}
        <div className="glass-card" style={{ border: '1px solid var(--border-glow)' }}>
          <h2 style={{ fontSize: '18px', color: 'var(--emerald)', marginBottom: '20px' }}>
            ⚡ Calculated Result
          </h2>

          {calcMode === 'SI' && (
            <div>
              <div style={{ background: 'rgba(15,23,42,0.6)', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Simple Interest (SI):</div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--cyan)' }}>₹{siInterest.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
              </div>
              <div style={{ background: 'rgba(15,23,42,0.6)', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Total Amount (A = P + SI):</div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#6ee7b7' }}>₹{siAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-dim)' }}>
                📐 <strong>Formula used:</strong> <code>SI = (P × R × T) / 100</code>
              </div>
            </div>
          )}

          {calcMode === 'CI' && (
            <div>
              <div style={{ background: 'rgba(15,23,42,0.6)', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Compound Interest (CI):</div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--cyan)' }}>₹{ciInterest.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
              </div>
              <div style={{ background: 'rgba(15,23,42,0.6)', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Compounded Amount (A):</div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#6ee7b7' }}>₹{ciAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-dim)' }}>
                📐 <strong>Formula used:</strong> <code>A = P(1 + i)^n</code> where i = R/(100×m), n = T×m
              </div>
            </div>
          )}

          {calcMode === 'ANNUITY' && (
            <div>
              <div style={{ background: 'rgba(15,23,42,0.6)', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Future Value of Annuity Regular (FV):</div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--cyan)' }}>₹{annFV.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-dim)' }}>
                📐 <strong>Formula used:</strong> <code>FV = A [((1 + i)^n - 1) / i]</code>
              </div>
            </div>
          )}

          {calcMode === 'EFFECTIVE' && (
            <div>
              <div style={{ background: 'rgba(15,23,42,0.6)', padding: '16px', borderRadius: '12px', marginBottom: '16px' }}>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Effective Rate of Interest (E):</div>
                <div style={{ fontSize: '32px', fontWeight: '800', color: '#fef08a' }}>{effRatePercent.toFixed(4)}% p.a.</div>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-dim)' }}>
                📐 <strong>Formula used:</strong> <code>E = (1 + i)^m - 1</code>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
