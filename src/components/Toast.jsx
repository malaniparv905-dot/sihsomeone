import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl text-xs text-slate-100 animate-slide-up">
      {type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
      {type === 'error' && <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />}
      {type === 'info' && <Info className="w-4 h-4 text-teal-400 shrink-0" />}
      
      <span className="font-semibold">{message}</span>

      <button
        onClick={onClose}
        className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition ml-2 cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
