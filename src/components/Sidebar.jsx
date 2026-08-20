import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  BatteryCharging, 
  ClipboardList, 
  BrainCircuit, 
  BarChart3,
  ShieldAlert,
  Leaf,
  Layers
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, assessmentCount }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'cd-waste', label: 'C&D Waste', icon: Building2, badge: 'AI Scan' },
    { id: 'ev-batteries', label: 'EV Batteries', icon: BatteryCharging, badge: 'Safety' },
    { id: 'assessments', label: 'Assessments', icon: ClipboardList, badge: assessmentCount || 5 },
    { id: 'insights', label: 'Recovery Insights', icon: BrainCircuit, badge: 'AI' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-950/70 border-r border-slate-800/80 p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        
        {/* Navigation Category Header */}
        <div>
          <p className="px-3 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Core Platform
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-500/10 text-teal-400 border border-teal-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono rounded-full font-bold ${
                        isActive
                          ? 'bg-teal-400 text-slate-950'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Circular Pathways Shortcut */}
        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              Pathway Hierarchy
            </span>
          </div>
          <div className="text-[11px] text-slate-400 space-y-1 font-mono">
            <div className="flex items-center justify-between text-emerald-400 font-bold">
              <span>1. Reuse</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-800 text-emerald-300">Direct</span>
            </div>
            <div className="flex items-center justify-between text-cyan-400">
              <span>2. Refurbishment</span>
              <span className="text-[9px]">Restore</span>
            </div>
            <div className="flex items-center justify-between text-blue-400">
              <span>3. Repurposing</span>
              <span className="text-[9px]">Adapt</span>
            </div>
            <div className="flex items-center justify-between text-purple-400">
              <span>4. Recycling</span>
              <span className="text-[9px]">Extract</span>
            </div>
            <div className="flex items-center justify-between text-slate-500">
              <span>5. Disposal</span>
              <span className="text-[9px]">End-line</span>
            </div>
          </div>
        </div>

      </div>

      {/* Footer System Status Card */}
      <div className="pt-4 border-t border-slate-800/80">
        <div className="p-3 rounded-xl bg-gradient-to-b from-teal-950/20 to-slate-900 border border-teal-500/20 text-xs">
          <div className="flex items-center gap-2 text-teal-400 font-semibold mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Safety Gate Active</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Automated guardrails enforce zero second-life routing for compromised batteries.
          </p>
        </div>
      </div>
    </aside>
  );
}
