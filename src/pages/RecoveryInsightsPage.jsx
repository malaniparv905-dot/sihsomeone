import React from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  ArrowRight,
  Plus
} from 'lucide-react';

export default function RecoveryInsightsPage({ assessments = [], onNavigate }) {
  const hasData = assessments.length > 0;

  // Generate dynamic insights derived from saved records
  const generateDynamicInsights = () => {
    if (!hasData) return [];

    const insights = [];
    const cdCount = assessments.filter(a => a.type === 'cd').length;
    const evCount = assessments.filter(a => a.type === 'ev').length;
    const reuseCount = assessments.filter(a => (a.recommendedPath || '').toUpperCase().includes('REUSE')).length;
    const unsafeCount = assessments.filter(a => a.safetyStatus === 'Fail').length;

    if (reuseCount > 0) {
      insights.push({
        id: 'dyn-1',
        category: 'C&D Waste',
        title: 'Direct reuse is currently the most common recovery pathway.',
        description: `Prototype analysis indicates that ${Math.round((reuseCount / assessments.length) * 100)}% of saved assessment records qualified for direct structural reuse, avoiding unnecessary processing.`,
        impact: 'High Yield',
        metric: `${reuseCount} Records Saved`,
        date: 'Active Store'
      });
    }

    if (unsafeCount > 0) {
      insights.push({
        id: 'dyn-2',
        category: 'EV Battery Safety',
        title: 'Some battery assessments were routed to recycling after failing prototype safety criteria.',
        description: 'Prototype safety check flagged elevated thermal indicators, swelling, or low State of Health (<50%), enforcing closed-loop recycling as the safer recovery pathway.',
        impact: 'Zero Hazard',
        metric: `${unsafeCount} Hazard Intercepts`,
        date: 'Active Store'
      });
    } else if (evCount > 0) {
      insights.push({
        id: 'dyn-3',
        category: 'EV Battery Safety',
        title: 'Healthy battery packs approved for second-life grid storage.',
        description: 'Saved battery assessments satisfied prototype safety criteria (SoH > 70%, 0 swelling), qualifying for stationary storage repurposing.',
        impact: 'High Utility',
        metric: `${evCount} Packs Approved`,
        date: 'Active Store'
      });
    }

    if (cdCount > 0) {
      insights.push({
        id: 'dyn-4',
        category: 'C&D Waste',
        title: 'AI assessment identified high-value material recovery opportunities.',
        description: 'Saved construction material scans indicate high recovery potential for direct placement in structural frames, subject to physical inspection.',
        impact: 'Resource Saving',
        metric: `${cdCount} Materials Saved`,
        date: 'Active Store'
      });
    }

    return insights;
  };

  const dynamicInsights = generateDynamicInsights();

  return (
    <div className="space-y-6 pb-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-teal-400" />
            <h1 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight">
              AI Strategic Recovery Insights
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Real-time material telemetry analysis, high-yield opportunity detection, and circular economy intelligence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-teal-300 font-mono text-xs font-semibold">
            Prototype • Demonstration Data
          </span>
        </div>
      </div>

      {/* Main Body or Empty State */}
      {!hasData ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 space-y-4 my-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <BrainCircuit className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-white tracking-tight">
              No recovery insights yet
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Complete assessments to generate data-driven recovery insights.
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={() => onNavigate && onNavigate('cd-waste')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-black text-xs shadow-lg shadow-teal-500/20 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Start First Assessment</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Featured Strategic Insight Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/40 via-slate-900 to-slate-900 border border-teal-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-300">
                  Data-Driven Strategic Insight
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                Active Store Derived
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg lg:text-xl font-extrabold text-white tracking-tight">
                "{dynamicInsights[0]?.title || 'AI assessment identified high-value recovery opportunities.'}"
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                {dynamicInsights[0]?.description || 'Prototype analysis indicates that your saved inventory has high recovery potential, subject to physical inspection.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate && onNavigate('cd-waste')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition cursor-pointer"
              >
                <span>Assess More Materials</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-[11px] text-slate-400 font-mono">
                Derived from {assessments.length} saved assessment record(s)
              </span>
            </div>
          </div>

          {/* Dynamic Insights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {dynamicInsights.map((insight) => {
              const isSafety = insight.category.includes('EV') || insight.title.includes('safety') || insight.title.includes('rejected');
              return (
                <div
                  key={insight.id}
                  className={`p-5 rounded-2xl bg-slate-900 border transition-all hover:-translate-y-0.5 space-y-4 ${
                    isSafety
                      ? 'border-red-500/30 hover:border-red-500/50'
                      : 'border-slate-800 hover:border-teal-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                      isSafety
                        ? 'bg-red-950 text-red-300 border border-red-800'
                        : 'bg-teal-950 text-teal-300 border border-teal-800'
                    }`}>
                      {insight.category}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">{insight.date}</span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-sm text-white tracking-tight leading-snug">
                      "{insight.title}"
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {insight.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">Metric:</span>
                      <span className="font-bold text-emerald-400">{insight.metric}</span>
                    </div>

                    <span className={`text-[11px] font-bold ${
                      isSafety ? 'text-red-400' : 'text-cyan-400'
                    }`}>
                      {insight.impact}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

    </div>
  );
}
