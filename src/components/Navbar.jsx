import React from 'react';
import { Sparkles, Plus, Search, Cpu, RotateCcw } from 'lucide-react';

export default function Navbar({ onOpenNewAssessment, searchQuery, setSearchQuery, onOpenResetModal }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-all">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        
        {/* Left Brand Branding */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/20 to-emerald-500/30 border border-teal-500/40 text-teal-400 shadow-lg shadow-teal-500/10">
              <Sparkles className="w-5 h-5 text-teal-400 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg lg:text-xl tracking-tight text-white">
                  RE<span className="text-teal-400 font-black">:RECOVER</span> <span className="text-xs px-2 py-0.5 rounded-md bg-teal-950 border border-teal-500/40 text-teal-300 font-mono tracking-wider">AI</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Intelligent recovery for a circular future.
              </p>
            </div>
          </div>

          {/* Hackathon Badge */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-emerald-400">SIH 2026</span>
            <span className="text-slate-500">|</span>
            <span className="font-mono text-slate-400">PS: S15</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">Team Catalyst</span>
          </div>
        </div>

        {/* Middle Search, Status & Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search assessments, materials..."
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/40 transition"
            />
          </div>

          {/* Prototype Reset Button */}
          <button
            onClick={onOpenResetModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] font-mono text-slate-400 hover:text-amber-400 transition cursor-pointer"
            title="Reset prototype local store data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Reset Prototype Data</span>
          </button>

          {/* Honest Prototype AI Engine Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400">
            <Cpu className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-mono text-[11px]">AI Engine • <span className="text-teal-300 font-semibold">Prototype Mode</span></span>
          </div>

          {/* Prominent CTA */}
          <button
            onClick={onOpenNewAssessment}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>New Assessment</span>
          </button>
        </div>

      </div>
    </header>
  );
}
