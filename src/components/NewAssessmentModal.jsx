import React from 'react';
import { X, Building2, BatteryCharging, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function NewAssessmentModal({ isOpen, onClose, onSelectCategory }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white tracking-tight">
                Initiate New AI Assessment
              </h3>
              <p className="text-xs text-slate-400">
                Select material category to trigger automated recovery classification & safety analysis.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* C&D Card */}
          <button
            onClick={() => {
              onSelectCategory('cd-waste');
              onClose();
            }}
            className="group p-5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-900 transition-all text-left space-y-3 cursor-pointer shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-white group-hover:text-teal-400 transition">
                  C&D Waste
                </span>
                <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-teal-950 border border-teal-800 text-teal-300">
                  Computer Vision
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Concrete, bricks, structural steel, timber, aggregate sampling and damage analysis.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Image Upload / Sample</span>
              <span className="text-teal-400">94% Rec. Rate</span>
            </div>
          </button>

          {/* EV Battery Card */}
          <button
            onClick={() => {
              onSelectCategory('ev-batteries');
              onClose();
            }}
            className="group p-5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-all text-left space-y-3 cursor-pointer shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform">
                <BatteryCharging className="w-6 h-6" />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-white group-hover:text-cyan-400 transition">
                  EV Battery
                </span>
                <span className="px-2 py-0.5 text-[9px] font-mono rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                  Safety Protocol
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                NMC/LFP battery health, SoH metrics, thermal swelling, risk check & second-life gating.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Safe vs Unsafe Scenarios</span>
              <span className="text-cyan-400">EN-50604 Gate</span>
            </div>
          </button>

        </div>

        {/* Footer info */}
        <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Assessments automatically evaluate the 5-stage circular recovery pathway: Reuse → Refurbishment → Repurposing → Recycling → Disposal.
          </span>
        </div>

      </div>
    </div>
  );
}
