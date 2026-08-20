import React from 'react';
import { 
  BarChart3, 
  PieChart as PieChartIcon, 
  TrendingUp, 
  Building2, 
  Zap,
  Plus
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  AreaChart, 
  Area, 
  CartesianGrid 
} from 'recharts';

export default function AnalyticsPage({ assessments = [], onNavigate }) {
  const hasData = assessments.length > 0;

  // Calculate dynamic Analytics datasets from saved records
  const calculateAnalytics = () => {
    if (!hasData) return null;

    // 1. Pathway distribution
    const pathwayCounts = { "Direct Reuse": 0, "Refurbishment": 0, "Repurposing": 0, "Recycling": 0, "Disposal": 0 };
    assessments.forEach(item => {
      const path = (item.recommendedPath || '').toUpperCase();
      if (path.includes('REUSE')) pathwayCounts["Direct Reuse"]++;
      else if (path.includes('REFURBISHMENT')) pathwayCounts["Refurbishment"]++;
      else if (path.includes('SECOND-LIFE') || path.includes('REPURPOSING')) pathwayCounts["Repurposing"]++;
      else if (path.includes('RECYCLING')) pathwayCounts["Recycling"]++;
      else pathwayCounts["Disposal"]++;
    });

    const total = assessments.length;
    const pathwayDistribution = [
      { name: "Direct Reuse", value: Math.round((pathwayCounts["Direct Reuse"] / total) * 100) || 0, color: "#10b981" },
      { name: "Refurbishment", value: Math.round((pathwayCounts["Refurbishment"] / total) * 100) || 0, color: "#06b6d4" },
      { name: "Repurposing", value: Math.round((pathwayCounts["Repurposing"] / total) * 100) || 0, color: "#3b82f6" },
      { name: "Recycling", value: Math.round((pathwayCounts["Recycling"] / total) * 100) || 0, color: "#8b5cf6" },
      { name: "Disposal", value: Math.round((pathwayCounts["Disposal"] / total) * 100) || 0, color: "#ef4444" }
    ];

    // 2. Material Breakdown
    const cdItems = assessments.filter(a => a.type === 'cd');
    const materialBreakdown = [
      { 
        material: "Concrete Slabs", 
        reuse: cdItems.filter(a => a.detectedMaterial?.toUpperCase().includes('CONCRETE') && (a.recommendedPath || '').toUpperCase().includes('REUSE')).length,
        recycling: cdItems.filter(a => a.detectedMaterial?.toUpperCase().includes('CONCRETE') && (a.recommendedPath || '').toUpperCase().includes('RECYCLING')).length,
        disposal: cdItems.filter(a => a.detectedMaterial?.toUpperCase().includes('CONCRETE') && (a.recommendedPath || '').toUpperCase().includes('DISPOSAL')).length
      },
      { 
        material: "Structural Steel", 
        reuse: cdItems.filter(a => a.detectedMaterial?.toUpperCase().includes('STEEL') || a.detectedMaterial?.toUpperCase().includes('METAL')).length,
        recycling: 0,
        disposal: 0
      },
      { 
        material: "Clay Bricks", 
        reuse: cdItems.filter(a => a.detectedMaterial?.toUpperCase().includes('BRICK')).length,
        recycling: 0,
        disposal: 0
      },
      { 
        material: "Timber Beams", 
        reuse: cdItems.filter(a => a.detectedMaterial?.toUpperCase().includes('WOOD') || a.detectedMaterial?.toUpperCase().includes('TIMBER')).length,
        recycling: 0,
        disposal: 0
      }
    ];

    // 3. EV Battery Outcomes
    const evItems = assessments.filter(a => a.type === 'ev');
    const evBatteryOutcomes = [
      { 
        chemistry: "Saved EV Packs", 
        secondLife: evItems.filter(a => (a.recommendedPath || '').toUpperCase().includes('SECOND-LIFE')).length,
        repurposing: evItems.filter(a => (a.recommendedPath || '').toUpperCase().includes('REPURPOSING')).length,
        recycling: evItems.filter(a => (a.recommendedPath || '').toUpperCase().includes('RECYCLING')).length,
        rejected: evItems.filter(a => a.safetyStatus === 'Fail').length
      }
    ];

    // 4. Time series monthly diversion
    const monthlyDiversion = [
      { month: "Saved Set", cdDiversion: cdItems.length * 1.5, evDiversion: evItems.length * 0.3, totalValue: assessments.length * 150 }
    ];

    return { pathwayDistribution, materialBreakdown, evBatteryOutcomes, monthlyDiversion };
  };

  const analyticsData = calculateAnalytics();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-slate-950/95 border border-slate-800 rounded-xl shadow-xl font-mono text-xs text-slate-200 space-y-1">
          {label && <p className="font-bold text-teal-400 border-b border-slate-800 pb-1">{label}</p>}
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4">
              <span style={{ color: entry.color || entry.fill }}>{entry.name}:</span>
              <span className="font-bold">{entry.value} {entry.unit || ''}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 pb-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-teal-400" />
            <h1 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight">
              Recovery Performance Analytics
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Quantitative metrics on pathway efficiency, material categories, battery outcomes, and carbon offset trends.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-teal-400 font-mono text-xs font-semibold">
            Prototype • Demonstration Data
          </span>
        </div>
      </div>

      {/* Main Content or Empty State */}
      {!hasData ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 space-y-4 my-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <BarChart3 className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-extrabold text-white tracking-tight">
              Not enough assessment data yet
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              Complete and save assessments to generate recovery analytics.
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
          {/* Grid Row 1: Donut Chart & Monthly Trend */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Pathway Distribution Donut (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                  <PieChartIcon className="w-4 h-4 text-teal-400" />
                  Pathway Distribution (%)
                </h3>
                <span className="text-[11px] font-mono text-slate-400">5-Stage Model</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analyticsData.pathwayDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {analyticsData.pathwayDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend Table */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-800">
                {analyticsData.pathwayDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-1.5 rounded bg-slate-950/60 border border-slate-800/60">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-300 truncate">{item.name}</span>
                    </div>
                    <span className="font-bold text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Diversion & Value Trend Area Chart (7 cols) */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Landfill Diversion & Economic Recovery Yield
                </h3>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">Saved Records Yield</span>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analyticsData.monthlyDiversion}>
                    <defs>
                      <linearGradient id="colorCd" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorEv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={11} fontFamily="JetBrains Mono" />
                    <YAxis stroke="#64748b" fontSize={11} fontFamily="JetBrains Mono" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
                    <Area type="monotone" dataKey="cdDiversion" name="C&D Tonnes Diverted" stroke="#10b981" fillOpacity={1} fill="url(#colorCd)" />
                    <Area type="monotone" dataKey="evDiversion" name="EV Packs Diverted" stroke="#06b6d4" fillOpacity={1} fill="url(#colorEv)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Grid Row 2: C&D Material Outcomes & EV Battery Outcomes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* C&D Material Breakdown Bar Chart */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-teal-400" />
                  C&D Saved Inventory Breakdown
                </h3>
                <span className="text-[11px] font-mono text-slate-400">By Material</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData.materialBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="material" stroke="#64748b" fontSize={11} fontFamily="JetBrains Mono" />
                    <YAxis stroke="#64748b" fontSize={11} fontFamily="JetBrains Mono" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
                    <Bar dataKey="reuse" name="Direct Reuse Count" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="recycling" name="Recycling Count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* EV Battery Outcomes Bar Chart */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  EV Battery Recovery Outcomes
                </h3>
                <span className="text-[11px] font-mono text-cyan-400 font-bold">Safety Verified</span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData.evBatteryOutcomes}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="chemistry" stroke="#64748b" fontSize={11} fontFamily="JetBrains Mono" />
                    <YAxis stroke="#64748b" fontSize={11} fontFamily="JetBrains Mono" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono' }} />
                    <Bar dataKey="secondLife" name="Second-Life Storage" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="repurposing" name="Repurposed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="recycling" name="Hydrometallurgy" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="rejected" name="Safety Gate Blocked" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
