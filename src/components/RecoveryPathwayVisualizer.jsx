import React from 'react';
import { CheckCircle2, XCircle, ArrowRight, Lock, Sparkles } from 'lucide-react';

export default function RecoveryPathwayVisualizer({ 
  recommendedPath = 'REUSE', 
  alternatives = [], 
  isUnsafe = false,
  reasoning = '',
  rejectionExplanation = ''
}) {
  const steps = [
    { key: 'REUSE', label: 'REUSE', desc: 'Direct structural re-entry' },
    { key: 'REFURBISHMENT', label: 'REFURBISHMENT', desc: 'Minor surface cleaning & restoration' },
    { key: 'REPURPOSING', label: 'REPURPOSING / SECOND-LIFE', desc: 'Stationary grid storage / alternative use' },
    { key: 'RECYCLING', label: 'RECYCLING', desc: 'Closed-loop hydrometallurgy & black mass' },
    { key: 'DISPOSAL', label: 'DISPOSAL', desc: 'Controlled landfill fallback' }
  ];

  const getStepStatus = (stepKey) => {
    const norm = (s) => (s || '').toUpperCase().replace(/[^A-Z]/g, '');
    const recNorm = norm(recommendedPath);
    const keyNorm = norm(stepKey);

    const isMatch = recNorm.includes(keyNorm) || keyNorm.includes(recNorm);

    if (isUnsafe) {
      if (keyNorm === 'REUSE' || keyNorm === 'REFURBISHMENT' || keyNorm === 'REPURPOSING') {
        return { type: 'rejected', label: '✕ BLOCKED', desc: 'Blocked by AI Safety Gate' };
      }
      if (keyNorm === 'RECYCLING') {
        return { type: 'recommended', label: '✓ RECOMMENDED', desc: 'Mandatory Hydrometallurgy' };
      }
      return { type: 'fallback', label: 'Fallback', desc: 'Controlled hazardous disposal' };
    }

    if (isMatch) {
      return { type: 'recommended', label: '✓ Recommended', desc: 'Optimal AI Recovery Choice' };
    }

    const alt = alternatives.find(a => norm(a.path).includes(keyNorm));
    if (alt) {
      return { type: 'alternative', label: alt.status || 'Alternative', desc: alt.note || alt.reason };
    }

    return { type: 'disabled', label: 'Lower Priority', desc: 'Sub-optimal hierarchy pathway' };
  };

  return (
    <div className="space-y-6">
      
      {/* Unsafe Alert Banner */}
      {isUnsafe && (
        <div className="p-4 rounded-xl bg-red-950/80 border-2 border-red-500/80 text-red-100 flex items-start gap-3 shadow-lg shadow-red-950/50">
          <Lock className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-extrabold text-xs text-red-300 uppercase tracking-wide">
              UNSAFE RECOVERY PATHWAYS BLOCKED BY AI SAFETY GATE
            </h4>
            <p className="text-xs text-red-200/90 leading-relaxed">
              {rejectionExplanation || "Predefined prototype safety criteria were not satisfied. Second-life use and repurposing are therefore blocked, while recycling is recommended as the safer recovery pathway."}
            </p>
          </div>
        </div>
      )}

      {/* Recommended Pathway Header Box */}
      <div className={`p-4 rounded-xl border ${
        isUnsafe 
          ? 'bg-red-950/40 border-red-500/50 text-red-200' 
          : 'bg-teal-950/40 border-teal-500/50 text-teal-200'
      }`}>
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className={`w-4 h-4 ${isUnsafe ? 'text-red-400' : 'text-teal-400'}`} />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
            AI RECOVERY RECOMMENDATION
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xl lg:text-2xl font-black font-mono text-white tracking-tight">
            {recommendedPath}
          </span>
          <span className={`self-start sm:self-auto px-3 py-1 rounded-full text-xs font-mono font-extrabold uppercase ${
            isUnsafe
              ? 'bg-red-500 text-slate-950 border border-red-400'
              : 'bg-teal-400 text-slate-950 border border-teal-300'
          }`}>
            {isUnsafe ? 'Enforced Safety Route' : 'Recommended'}
          </span>
        </div>
        {reasoning && (
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed">
            <strong className="text-white font-semibold">AI Decision Reasoning:</strong> "{reasoning}"
          </div>
        )}
      </div>

      {/* Hierarchy Pathway Diagram */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1 text-xs font-mono text-slate-400 uppercase font-semibold">
          <span>Pathway Hierarchy Evaluation</span>
          <span className="text-[11px]">Reuse → Refurbishment → Repurposing → Recycling → Disposal</span>
        </div>

        {/* 5-Stage Hierarchy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
          {steps.map((step, idx) => {
            const status = getStepStatus(step.key);
            const isRecommended = status.type === 'recommended';
            const isRejected = status.type === 'rejected';

            return (
              <div
                key={step.key}
                className={`relative p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                  isRecommended
                    ? 'bg-gradient-to-b from-teal-950/90 to-slate-900 border-teal-400 ring-2 ring-teal-500/30 shadow-lg shadow-teal-500/10'
                    : isRejected
                    ? 'bg-red-950/30 border-red-500/60 opacity-90'
                    : 'bg-slate-900/60 border-slate-800/90 text-slate-400'
                }`}
              >
                {/* Arrow Connector */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                  </div>
                )}

                <div className="space-y-1.5 mb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500 font-bold">
                      0{idx + 1}
                    </span>
                    {isRecommended && <CheckCircle2 className="w-4 h-4 text-teal-400" />}
                    {isRejected && <XCircle className="w-4 h-4 text-red-400" />}
                  </div>

                  <h5 className={`font-extrabold text-xs tracking-tight ${
                    isRecommended 
                      ? 'text-white' 
                      : isRejected 
                      ? 'text-red-300 line-through' 
                      : 'text-slate-300'
                  }`}>
                    {step.label}
                  </h5>

                  <p className="text-[10px] text-slate-400 leading-tight">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/60 space-y-1">
                  <div className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold text-center ${
                    isRecommended
                      ? 'bg-teal-400 text-slate-950'
                      : isRejected
                      ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {status.label}
                  </div>
                  
                  {status.desc && (
                    <p className="text-[9px] text-slate-500 text-center truncate" title={status.desc}>
                      {status.desc}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
