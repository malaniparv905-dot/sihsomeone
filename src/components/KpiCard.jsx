import React from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

export default function KpiCard({ title, value, unit, change, changeText, icon: Icon, color = 'teal', subtitle }) {
  const colorStyles = {
    teal: {
      bg: 'from-teal-500/10 to-emerald-500/5',
      border: 'border-teal-500/20 hover:border-teal-500/40',
      iconBg: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
      text: 'text-teal-400'
    },
    emerald: {
      bg: 'from-emerald-500/10 to-teal-500/5',
      border: 'border-emerald-500/20 hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      text: 'text-emerald-400'
    },
    blue: {
      bg: 'from-blue-500/10 to-cyan-500/5',
      border: 'border-blue-500/20 hover:border-blue-500/40',
      iconBg: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      text: 'text-blue-400'
    },
    amber: {
      bg: 'from-amber-500/10 to-orange-500/5',
      border: 'border-amber-500/20 hover:border-amber-500/40',
      iconBg: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      text: 'text-amber-400'
    }
  };

  const style = colorStyles[color] || colorStyles.teal;

  return (
    <div className={`relative p-5 rounded-2xl bg-gradient-to-br ${style.bg} border ${style.border} transition-all duration-200 hover:-translate-y-0.5 shadow-md`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-mono font-medium tracking-wide uppercase text-slate-400">
          {title}
        </span>
        <div className={`p-2 rounded-xl border ${style.iconBg}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-2xl lg:text-3xl font-extrabold text-white font-mono tracking-tight">
          {value}
        </span>
        {unit && <span className="text-sm font-semibold text-slate-400">{unit}</span>}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
        {change && (
          <span className="flex items-center gap-1 font-semibold text-emerald-400 font-mono">
            <ArrowUpRight className="w-3.5 h-3.5" />
            {change}
          </span>
        )}
        <span className="text-[11px] text-slate-400 truncate">
          {changeText || subtitle}
        </span>
      </div>
    </div>
  );
}
