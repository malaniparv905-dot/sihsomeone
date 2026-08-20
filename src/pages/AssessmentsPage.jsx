import React, { useState } from 'react';
import { 
  ClipboardList, 
  Search, 
  Filter, 
  Building2, 
  Zap, 
  ShieldAlert, 
  ShieldCheck, 
  ChevronRight,
  Plus
} from 'lucide-react';

export default function AssessmentsPage({ 
  assessments = [], 
  onSelectAssessment,
  searchQuery = '',
  setSearchQuery,
  onNavigate
}) {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [pathFilter, setPathFilter] = useState('All');
  const [conditionFilter, setConditionFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const hasData = assessments.length > 0;

  // Filter logic
  const filtered = assessments.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      !searchQuery ||
      item.title?.toLowerCase().includes(q) ||
      item.id?.toLowerCase().includes(q) ||
      item.detectedMaterial?.toLowerCase().includes(q) ||
      item.category?.toLowerCase().includes(q) ||
      item.recommendedPath?.toLowerCase().includes(q);

    const matchesCategory = 
      categoryFilter === 'All' || 
      (categoryFilter === 'C&D' && item.type === 'cd') ||
      (categoryFilter === 'EV Battery' && item.type === 'ev');

    const matchesPath = 
      pathFilter === 'All' || 
      item.recommendedPath?.toLowerCase().includes(pathFilter.toLowerCase());

    const matchesCondition = 
      conditionFilter === 'All' || 
      item.condition?.toLowerCase() === conditionFilter.toLowerCase();

    const matchesStatus = 
      statusFilter === 'All' || 
      item.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesCategory && matchesPath && matchesCondition && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-teal-400" />
            <h1 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight">
              Assessment Audit Log History
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Audit history of AI material evaluations, safety gates, and circular pathway assignments.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
          <span>Saved Records: <strong className="text-teal-400">{filtered.length}</strong> of {assessments.length}</span>
        </div>
      </div>

      {/* Filter Toolbar (Only when assessments exist) */}
      {hasData && (
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase font-semibold">
              <Filter className="w-3.5 h-3.5 text-teal-400" />
              <span>Filter Assessments</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Prototype • Demonstration Data</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-[10px] font-mono text-slate-500 mb-1 uppercase">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-teal-500 font-mono"
              >
                <option value="All">All Categories</option>
                <option value="C&D">C&D Waste</option>
                <option value="EV Battery">EV Battery</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-500 mb-1 uppercase">Recovery Pathway</label>
              <select
                value={pathFilter}
                onChange={(e) => setPathFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-teal-500 font-mono"
              >
                <option value="All">All Pathways</option>
                <option value="Reuse">Reuse</option>
                <option value="Refurbishment">Refurbishment</option>
                <option value="Second-life">Second-life / Repurposing</option>
                <option value="Recycling">Recycling</option>
                <option value="Disposal">Disposal</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-500 mb-1 uppercase">Condition Grade</label>
              <select
                value={conditionFilter}
                onChange={(e) => setConditionFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-teal-500 font-mono"
              >
                <option value="All">All Conditions</option>
                <option value="Good">Good</option>
                <option value="Moderate">Moderate</option>
                <option value="Damaged">Damaged</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-500 mb-1 uppercase">Audit Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-teal-500 font-mono"
              >
                <option value="All">All Statuses</option>
                <option value="Approved">Approved</option>
                <option value="Review">Review</option>
                <option value="Safety Hold">Safety Hold</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Assessments Table or Initial Empty State */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        {!hasData ? (
          <div className="py-14 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-slate-400">
              <ClipboardList className="w-7 h-7 text-teal-400" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-white tracking-tight">
                No assessments yet
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Your assessment history will appear here after you complete and save an assessment.
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
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <p className="text-sm text-slate-300 font-semibold">No assessments match your current filter settings.</p>
            <button
              onClick={() => {
                setCategoryFilter('All');
                setPathFilter('All');
                setConditionFilter('All');
                setStatusFilter('All');
                if (setSearchQuery) setSearchQuery('');
              }}
              className="text-xs text-teal-400 font-mono underline hover:text-teal-300 cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                  <th className="py-3 px-3">Assessment ID</th>
                  <th className="py-3 px-3">Date</th>
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
                {filtered.map((item) => {
                  const isUnsafe = item.safetyStatus === 'Fail' || item.condition === 'Unsafe' || item.condition === 'DAMAGED';
                  return (
                    <tr
                      key={item.id}
                      onClick={() => onSelectAssessment(item)}
                      className="hover:bg-slate-800/60 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-3 font-bold text-white group-hover:text-teal-300 transition">
                        {item.id}
                      </td>

                      <td className="py-3.5 px-3 text-slate-400">
                        {item.date}
                      </td>

                      <td className="py-3.5 px-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] ${
                          item.type === 'ev' 
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' 
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          {item.type === 'ev' ? <Zap className="w-3 h-3 text-cyan-400" /> : <Building2 className="w-3 h-3 text-teal-400" />}
                          {item.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-slate-200 font-semibold">
                        {item.detectedMaterial}
                      </td>

                      <td className="py-3.5 px-3">
                        <span className={`font-semibold ${isUnsafe ? 'text-red-400' : 'text-emerald-400'}`}>
                          {item.condition}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 font-bold">
                        {item.safetyStatus === 'Pass' ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" /> Pass
                          </span>
                        ) : item.safetyStatus === 'Fail' ? (
                          <span className="text-red-400 flex items-center gap-1">
                            <ShieldAlert className="w-3.5 h-3.5" /> Fail
                          </span>
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
                          {item.recommendedPath}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-teal-400 font-bold">
                        {item.confidence}%
                      </td>

                      <td className="py-3.5 px-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          item.status === 'Approved'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : item.status === 'Safety Hold'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {item.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <span className="text-teal-400 opacity-0 group-hover:opacity-100 transition text-[11px] font-semibold flex items-center justify-end gap-1">
                          Report <ChevronRight className="w-3.5 h-3.5" />
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
