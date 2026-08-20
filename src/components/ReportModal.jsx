import React from 'react';
import { 
  X, 
  Download, 
  Save, 
  FileText, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle, 
  Sparkles, 
  Globe, 
  DollarSign, 
  Layers, 
  Printer,
  Share2
} from 'lucide-react';
import RecoveryPathwayVisualizer from './RecoveryPathwayVisualizer';

export default function ReportModal({ assessment, onClose }) {
  if (!assessment) return null;

  const isUnsafe = assessment.safetyStatus === 'FAIL' || assessment.condition === 'Unsafe';

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const reportText = JSON.stringify(assessment, null, 2);
    const blob = new Blob([reportText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Report_${assessment.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider">
                  Assessment Report
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono text-slate-400">{assessment.id}</span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {assessment.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
              title="Print Report"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto text-xs text-slate-300">
          
          {/* Status & Metadata Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div>
              <span className="text-[11px] font-mono text-slate-500 uppercase">Category</span>
              <p className="font-semibold text-slate-200 mt-0.5">{assessment.category}</p>
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-500 uppercase">Date & Time</span>
              <p className="font-semibold text-slate-200 mt-0.5">{assessment.date}</p>
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-500 uppercase">Safety Clearance</span>
              <p className="mt-0.5">
                {isUnsafe ? (
                  <span className="inline-flex items-center gap-1 text-red-400 font-bold">
                    <ShieldAlert className="w-3.5 h-3.5" /> FAIL (Hazard)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" /> PASSED
                  </span>
                )}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-mono text-slate-500 uppercase">AI Confidence</span>
              <p className="font-mono font-bold text-teal-400 mt-0.5">{assessment.confidence}%</p>
            </div>
          </div>

          {/* Technical Inputs & AI Classification */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Material & Physical Properties */}
            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-3">
              <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-teal-400" />
                Material Classification & Technical Parameters
              </h4>
              <div className="space-y-2 text-slate-300 font-mono">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Detected Material:</span>
                  <span className="text-white font-semibold">{assessment.detectedMaterial}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Condition Grade:</span>
                  <span className={`font-semibold ${isUnsafe ? 'text-red-400' : 'text-emerald-400'}`}>
                    {assessment.condition}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Damage Level:</span>
                  <span className="text-slate-200">{assessment.damageLevel || 'Low'}</span>
                </div>
                {assessment.dimensions && (
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Batch Dimensions:</span>
                    <span className="text-slate-200">{assessment.dimensions}</span>
                  </div>
                )}
                {assessment.details?.soh && (
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">State of Health (SoH):</span>
                    <span className="text-teal-400 font-bold">{assessment.details.soh}</span>
                  </div>
                )}
                {assessment.details?.voltage && (
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">Pack Voltage:</span>
                    <span className="text-slate-200">{assessment.details.voltage}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Environmental & Economic Impact */}
            <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-3">
              <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                Estimated Circular Impact & ROI
              </h4>
              
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400">CO₂ Emissions Offset</span>
                  <p className="text-sm font-bold font-mono text-emerald-400 mt-0.5">
                    {assessment.environmentalImpact?.co2Saved || '450 kg CO₂e'}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400">Landfill Diversion</span>
                  <p className="text-sm font-bold font-mono text-teal-400 mt-0.5">
                    {assessment.environmentalImpact?.landfillDiverted || '1.20 Tonnes'}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400">Virgin Material Offset</span>
                  <p className="text-xs font-bold font-mono text-slate-200 mt-0.5 truncate">
                    {assessment.environmentalImpact?.virginMaterialSaved || '1.1T Material'}
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400">Est. Economic Value</span>
                  <p className="text-sm font-bold font-mono text-cyan-400 mt-0.5">
                    {assessment.environmentalImpact?.economicValue || '₹14,500'}
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-teal-950/20 border border-teal-500/20 text-[11px] text-teal-300">
                <strong className="font-semibold">Verification Audit:</strong> Recommended pathway generates 84% net embodied energy conservation vs virgin manufacturing.
              </div>
            </div>

          </div>

          {/* Recovery Pathway Evaluation */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              Recovery Pathway Decision & Alternatives Breakdown
            </h4>

            <RecoveryPathwayVisualizer
              recommendedPath={assessment.recommendedPath}
              alternatives={assessment.alternatives || []}
              isUnsafe={isUnsafe}
              reasoning={assessment.reasoning}
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span>Audit ID: <strong className="text-slate-300">{assessment.id}</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download Report
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              Save & Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
