import React from 'react';
import { 
  Building2, 
  Sparkles, 
  ArrowRight, 
  Leaf, 
  Globe, 
  TrendingUp, 
  RotateCcw, 
  ChevronRight,
  Zap,
  Layers,
  BarChart2,
  Plus
} from 'lucide-react';
import KpiCard from '../components/KpiCard';

export default function DashboardPage({ 
  assessments = [], 
  onSelectAssessment, 
  onNavigate 
}) {
  const hasData = assessments.length > 0;

  // Dynamic calculation when data exists
  const totalItems = assessments.length;
  
  const nonDisposalCount = assessments.filter(a => {
    const path = (a.recommendedPath || '').toUpperCase();
    return !path.includes('DISPOSAL');
  }).length;

  const recoveryRate = hasData ? `${Math.round((nonDisposalCount / totalItems) * 100)}%` : '—';

  // Dynamic Landfill Diverted calculation (tonnes)
  const totalDivertedTonnes = hasData 
    ? assessments.reduce((sum, item) => {
        const val = parseFloat((item.environmentalImpact?.landfillDiverted || '1.2').replace(/[^0-9.]/g, '')) || 1.2;
        return sum + val;
      }, 0).toFixed(1) + ' Tonnes'
    : '0 Tonnes';

  // Dynamic Economic Recovery Value calculation (₹)
  const totalValueNum = hasData 
    ? assessments.reduce((sum, item) => {
        const val = parseInt((item.environmentalImpact?.economicValue || '15000').replace(/[^0-9]/g, ''), 10) || 15000;
        return sum + val;
      }, 0)
    : 0;
  const totalValueFormatted = hasData ? `₹${totalValueNum.toLocaleString('en-IN')}` : '₹0';

  // Dynamic CO2 calculation
  const totalCo2Kg = hasData 
    ? assessments.reduce((sum, item) => {
        const val = parseInt((item.environmentalImpact?.co2Saved || '450').replace(/[^0-9]/g, ''), 10) || 450;
        return sum + val;
      }, 0)
    : 0;
  const co2Formatted = hasData ? `${(totalCo2Kg / 1000).toFixed(1)} t CO₂e` : '—';
  const treesEquiv = hasData ? `${Math.round(totalCo2Kg / 40)} Trees` : '—';

  // Dynamic Pathway Distribution calculation
  const getPathwayCounts = () => {
    if (!hasData) return null;
    const counts = { Reuse: 0, Refurbishment: 0, Repurposing: 0, Recycling: 0, Disposal: 0 };
    assessments.forEach(item => {
      const path = (item.recommendedPath || '').toUpperCase();
      if (path.includes('REUSE')) counts.Reuse++;
      else if (path.includes('REFURBISHMENT')) counts.Refurbishment++;
      else if (path.includes('SECOND-LIFE') || path.includes('REPURPOSING')) counts.Repurposing++;
      else if (path.includes('RECYCLING')) counts.Recycling++;
      else counts.Disposal++;
    });
    return counts;
  };

  const pathwayCounts = getPathwayCounts();

  const distribution = [
    { 
      label: 'Reuse', 
      pct: hasData ? `${Math.round((pathwayCounts.Reuse / totalItems) * 100)}%` : '—', 
      color: 'bg-emerald-400', 
      textColor: 'text-emerald-400', 
      border: 'border-emerald-500/40' 
    },
    { 
      label: 'Refurbishment', 
      pct: hasData ? `${Math.round((pathwayCounts.Refurbishment / totalItems) * 100)}%` : '—', 
      color: 'bg-cyan-400', 
      textColor: 'text-cyan-400', 
      border: 'border-cyan-500/40' 
    },
    { 
      label: 'Repurposing', 
      pct: hasData ? `${Math.round((pathwayCounts.Repurposing / totalItems) * 100)}%` : '—', 
      color: 'bg-blue-400', 
      textColor: 'text-blue-400', 
      border: 'border-blue-500/40' 
    },
    { 
      label: 'Recycling', 
      pct: hasData ? `${Math.round((pathwayCounts.Recycling / totalItems) * 100)}%` : '—', 
      color: 'bg-purple-400', 
      textColor: 'text-purple-400', 
      border: 'border-purple-500/40' 
    },
    { 
      label: 'Disposal', 
      pct: hasData ? `${Math.round((pathwayCounts.Disposal / totalItems) * 100)}%` : '—', 
      color: 'bg-slate-600', 
      textColor: 'text-slate-400', 
      border: 'border-slate-700' 
    }
  ];

  return (
    <div className="space-y-6 pb-8">
      
      {/* Top Banner / Hero Header */}
      <div className="relative p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950/40 border border-slate-800/80 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-md bg-teal-500/20 border border-teal-500/40 text-teal-300 font-mono text-[11px] font-bold">
                SIH 2026 Platform
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400 text-xs font-mono">Clean & Green Technology</span>
              <span className="text-slate-500">•</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px]">
                Prototype • Demonstration Data
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Intelligent Recovery & Circular Pathway Engine
            </h1>
            <p className="text-xs lg:text-sm text-slate-300 leading-relaxed">
              Evaluating Construction & Demolition (C&D) waste and end-of-life EV batteries with multi-dimensional AI condition, safety, and value assessment.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('cd-waste')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs border border-slate-700 transition cursor-pointer shadow-md"
            >
              <Building2 className="w-4 h-4 text-teal-400" />
              <span>Assess C&D Waste</span>
            </button>
            <button
              onClick={() => onNavigate('ev-batteries')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-black text-xs shadow-lg shadow-teal-500/20 transition cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Assess EV Battery</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid (Dynamic or Empty) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Items Assessed"
          value={totalItems}
          unit="items"
          change={hasData ? `+${totalItems} Saved` : ''}
          changeText={hasData ? "Active store inventory" : "No saved records"}
          icon={Layers}
          color="teal"
          subtitle="C&D + EV Battery Total"
        />
        <KpiCard
          title="Recovery Rate"
          value={recoveryRate}
          unit=""
          change={hasData ? recoveryRate : ''}
          changeText={hasData ? "Diverted from landfill" : "Run first assessment"}
          icon={RotateCcw}
          color="emerald"
          subtitle="Non-landfill yield"
        />
        <KpiCard
          title="Material Diverted"
          value={totalDivertedTonnes}
          unit=""
          change={hasData ? 'Active Yield' : ''}
          changeText={hasData ? "Mass diverted" : "No saved mass"}
          icon={Leaf}
          color="blue"
          subtitle="Landfill diversion"
        />
        <KpiCard
          title="Estimated Recovery Value"
          value={totalValueFormatted}
          unit=""
          change={hasData ? 'Est. ROI' : ''}
          changeText={hasData ? "Prototype estimate" : "No saved value"}
          icon={TrendingUp}
          color="amber"
          subtitle="Circular ROI yield"
        />
      </div>

      {/* Grid Section: Recovery Distribution & Environmental Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recovery Distribution (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-white tracking-tight flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-teal-400" />
                Recovery Pathway Distribution
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Current AI pathway classification breakdown across saved inventory.
              </p>
            </div>
            <span className="text-xs font-mono text-teal-400 font-semibold px-2.5 py-1 rounded-lg bg-teal-950 border border-teal-800">
              5-Stage Hierarchy
            </span>
          </div>

          {/* Progress Stack Bar or Empty Message */}
          {hasData ? (
            <div className="space-y-2">
              <div className="h-4 w-full rounded-full bg-slate-800 overflow-hidden flex p-0.5">
                <div className="h-full bg-emerald-400 rounded-l-full" style={{ width: distribution[0].pct }} title={`Reuse: ${distribution[0].pct}`} />
                <div className="h-full bg-cyan-400" style={{ width: distribution[1].pct }} title={`Refurbishment: ${distribution[1].pct}`} />
                <div className="h-full bg-blue-400" style={{ width: distribution[2].pct }} title={`Repurposing: ${distribution[2].pct}`} />
                <div className="h-full bg-purple-400" style={{ width: distribution[3].pct }} title={`Recycling: ${distribution[3].pct}`} />
                <div className="h-full bg-slate-600 rounded-r-full" style={{ width: distribution[4].pct }} title={`Disposal: ${distribution[4].pct}`} />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-slate-500 px-1">
                <span>Direct Reuse ({distribution[0].pct})</span>
                <span>Controlled Disposal ({distribution[4].pct})</span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center py-6">
              <p className="text-xs text-slate-400 font-mono">
                Recovery pathway distribution will appear after assessments are saved.
              </p>
            </div>
          )}

          {/* Individual Pathway Metric Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            {distribution.map((item) => (
              <div key={item.label} className={`p-3 rounded-xl bg-slate-950/60 border ${item.border} space-y-1`}>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-xs font-semibold text-slate-300 truncate">{item.label}</span>
                </div>
                <p className={`text-lg font-black font-mono ${item.textColor}`}>
                  {item.pct}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Environmental Impact Indicator (1 Col) */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-950/30 to-slate-900 border border-teal-500/20 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 font-mono text-[10px] uppercase font-bold">
                Impact Dashboard
              </span>
              <Globe className="w-5 h-5 text-teal-400" />
            </div>
            
            <h3 className="font-extrabold text-base text-white tracking-tight">
              Estimated Environmental Impact
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Calculated carbon emissions saved by prioritizing direct reuse and battery second-life repurposing over virgin extraction.
            </p>

            <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-400">Estimated CO₂ Savings:</span>
                <span className="text-xl font-black font-mono text-emerald-400">{co2Formatted}</span>
              </div>
              <div className="flex items-baseline justify-between text-xs pt-2 border-t border-slate-800/80">
                <span className="text-slate-400">Equiv. Trees Saved:</span>
                <span className="font-mono text-slate-200 font-bold">{treesEquiv}</span>
              </div>
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-slate-400">Status:</span>
                <span className="font-mono text-slate-400 text-[11px]">
                  {hasData ? 'Active Estimate' : 'Complete assessments to estimate impact'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('analytics')}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-teal-300 transition cursor-pointer"
          >
            <span>View Detailed Analytics</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Recent Assessments Table Section */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-base text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              Recent AI Assessments
            </h3>
            <p className="text-xs text-slate-400">
              {hasData ? "Click any row to inspect complete technical evaluation report and safety audit logs." : "No completed assessments yet."}
            </p>
          </div>
          {hasData && (
            <button
              onClick={() => onNavigate('assessments')}
              className="text-xs font-mono text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              View All ({assessments.length}) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Table or Polished Empty State */}
        {!hasData ? (
          <div className="p-8 text-center rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3 my-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">No completed assessments yet.</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Run your first assessment to generate recovery metrics and populate the circular pathway history.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => onNavigate('cd-waste')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Start First Assessment</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                  <th className="py-3 px-3">Assessment ID</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Material / Battery</th>
                  <th className="py-3 px-3">Condition</th>
                  <th className="py-3 px-3">Safety Check</th>
                  <th className="py-3 px-3">Recommended Path</th>
                  <th className="py-3 px-3">Confidence</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {assessments.slice(0, 6).map((row) => {
                  const isUnsafe = row.safetyStatus === 'Fail' || row.condition === 'Unsafe' || row.condition === 'DAMAGED';
                  return (
                    <tr
                      key={row.id}
                      onClick={() => onSelectAssessment(row)}
                      className="hover:bg-slate-800/50 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-3">
                        <div>
                          <p className="font-bold text-white group-hover:text-teal-300 transition">
                            {row.id}
                          </p>
                          <p className="text-[10px] text-slate-500">{row.date}</p>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 font-medium text-slate-300">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] ${
                          row.type === 'ev' 
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' 
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          {row.type === 'ev' ? <Zap className="w-3 h-3 text-cyan-400" /> : <Building2 className="w-3 h-3 text-teal-400" />}
                          {row.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-slate-200 font-semibold">
                        {row.detectedMaterial}
                      </td>

                      <td className="py-3.5 px-3">
                        <span className={`font-semibold ${isUnsafe ? 'text-red-400' : 'text-emerald-400'}`}>
                          {row.condition}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 font-bold">
                        {row.safetyStatus === 'Pass' ? (
                          <span className="text-emerald-400">Pass</span>
                        ) : row.safetyStatus === 'Fail' ? (
                          <span className="text-red-400">Fail</span>
                        ) : (
                          <span className="text-slate-500">—</span>
                        )}
                      </td>

                      <td className="py-3.5 px-3 font-bold">
                        <span className={`px-2 py-1 rounded text-[11px] ${
                          isUnsafe
                            ? 'bg-red-950 text-red-300 border border-red-800'
                            : 'bg-teal-950 text-teal-300 border border-teal-800'
                        }`}>
                          {row.recommendedPath}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-teal-400 font-bold">
                        {row.confidence}%
                      </td>

                      <td className="py-3.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          row.status === 'Approved'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : row.status === 'Safety Hold'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {row.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <span className="text-teal-400 opacity-0 group-hover:opacity-100 transition text-[11px] font-semibold">
                          Report →
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
