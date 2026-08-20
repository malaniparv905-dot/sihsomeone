import React from 'react';
import { RotateCcw, AlertTriangle, X } from 'lucide-react';

export default function ResetModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5 text-amber-400">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-white tracking-tight">
              Reset Prototype Data
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-3 text-xs text-slate-300">
          <p className="font-semibold text-slate-200">
            Clear all saved assessment history?
          </p>
          <p className="text-slate-400 leading-relaxed">
            This action will delete all locally saved assessment records (<code className="text-amber-300 font-mono">RA-001</code>, <code className="text-amber-300 font-mono">RA-002</code>, etc.) and reset Dashboard, Analytics, and Recovery Insights to their initial empty state.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-400 text-slate-950 font-black text-xs transition cursor-pointer shadow-md shadow-red-500/20"
          >
            Clear Data
          </button>
        </div>

      </div>
    </div>
  );
}
