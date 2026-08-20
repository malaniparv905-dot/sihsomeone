import React, { useState } from 'react';
import { 
  Zap, 
  ShieldAlert, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  Lock, 
  FileText, 
  Check, 
  Activity, 
  Save, 
  Download, 
  Cpu
} from 'lucide-react';
import { MOCK_PRESETS_EV } from '../data/mockData';
import RecoveryPathwayVisualizer from '../components/RecoveryPathwayVisualizer';

export default function EvBatteryPage({ onSaveAssessment, onViewReport, showToast }) {
  // Preset 1 (SAFE) default
  const [selectedPresetId, setSelectedPresetId] = useState('ev-safe-1');
  const [formData, setFormData] = useState(MOCK_PRESETS_EV[0].data);
  const [activeResult, setActiveResult] = useState(MOCK_PRESETS_EV[0].result);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Load Preset (Input Template - DOES NOT SAVE TO STORE)
  const handleLoadPreset = (preset) => {
    setSelectedPresetId(preset.id);
    setFormData(preset.data);
    setIsSaved(false);
    runAssessment(preset.data, preset.result);
    if (showToast) {
      showToast(`Loaded ${preset.name} demonstration scenario.`, preset.type === 'UNSAFE' ? 'error' : 'success');
    }
  };

  // Run AI Assessment (Transient Evaluation - DOES NOT SAVE TO STORE)
  const runAssessment = (dataToUse = formData, presetResult = null) => {
    setIsEvaluating(true);
    setIsSaved(false);

    setTimeout(() => {
      setIsEvaluating(false);

      if (presetResult) {
        setActiveResult(presetResult);
        return;
      }

      // Dynamic evaluation based on inputs
      const isUnsafe = 
        dataToUse.soh < 50 || 
        dataToUse.temperature > 40 || 
        dataToUse.visibleDamage === 'Detected' || 
        dataToUse.swelling === 'Yes' || 
        dataToUse.safetyInspection === 'Failed';

      if (isUnsafe) {
        setActiveResult({
          safetyStatus: "FAIL",
          health: `${dataToUse.soh}%`,
          physicalCondition: "DAMAGED",
          recoveryPotential: "LOW",
          recommendedPath: "RECYCLING",
          confidence: 97,
          riskLevel: "HIGH",
          reasoning: "Configured safety criteria were not satisfied. Second-life use and repurposing are blocked in the prototype decision logic, with recycling selected as the safer pathway.",
          rejectionExplanation: "Predefined prototype safety criteria were not satisfied. Second-life use and repurposing are therefore blocked, while recycling is recommended as the safer recovery pathway.",
          safetyChecks: [
            { title: "Temperature within acceptable range", passed: dataToUse.temperature <= 40, detail: `${dataToUse.temperature}°C (Limit: 40°C)` },
            { title: "No visible damage", passed: dataToUse.visibleDamage === 'None', detail: dataToUse.visibleDamage },
            { title: "No swelling detected", passed: dataToUse.swelling === 'No', detail: dataToUse.swelling === 'Yes' ? "Swelling detected" : "Normal" },
            { title: "No leakage detected", passed: dataToUse.leakage === 'No', detail: dataToUse.leakage },
            { title: "Safety inspection passed", passed: dataToUse.safetyInspection === 'Passed', detail: "Failed prototype safety assessment criteria" }
          ],
          pathwayMatrix: [
            { path: "Second-life", status: "✕ BLOCKED", approved: false, disabled: true, note: "BLOCKED: Thermal runaway hazard under load." },
            { path: "Repurposing", status: "✕ BLOCKED", approved: false, disabled: true, note: "BLOCKED: Grid connection denied due to structural swelling." },
            { path: "Recycling", status: "✓ RECOMMENDED", approved: true, disabled: false, note: "Controlled automated discharge & closed-loop black mass extraction." },
            { path: "Disposal", status: "Fallback", approved: false, disabled: true, note: "Controlled dismantling fallback." }
          ]
        });
      } else {
        setActiveResult({
          safetyStatus: "SAFE",
          health: `${dataToUse.soh}%`,
          physicalCondition: "GOOD",
          recoveryPotential: "HIGH",
          recommendedPath: "SECOND-LIFE / REPURPOSING",
          confidence: 91,
          riskLevel: "Low",
          reasoning: "Prototype safety assessment indicates that the entered battery parameters satisfy the configured demonstration criteria. Second-life use is therefore ranked as the preferred pathway.",
          safetyChecks: [
            { title: "Temperature within acceptable range", passed: true, detail: `${dataToUse.temperature}°C (Limit: 40°C)` },
            { title: "No visible damage", passed: true, detail: "Casing 100% Intact" },
            { title: "No swelling detected", passed: true, detail: "0mm expansion" },
            { title: "No leakage detected", passed: true, detail: "Clear" },
            { title: "Safety inspection passed", passed: true, detail: "Prototype Safety Assessment Passed" }
          ],
          pathwayMatrix: [
            { path: "Second-life", status: "✓ Approved", approved: true, disabled: false, note: "Stationary BESS grid backup storage approved." },
            { path: "Repurposing", status: "✓ Approved", approved: true, disabled: false, note: "Telecom battery module re-assembly approved." },
            { path: "Recycling", status: "Fallback", approved: false, disabled: false, note: "Hydrometallurgy available if second-life demand is unmet." },
            { path: "Disposal", status: "Not required", approved: false, disabled: true, note: "Environmentally prohibited." }
          ]
        });
      }
    }, 900);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const buildRecordObject = () => {
    const isUnsafe = activeResult.safetyStatus === 'FAIL';
    return {
      title: `EV Battery Pack (${formData.chemistry})`,
      category: "EV Battery",
      type: "ev",
      detectedMaterial: formData.chemistry,
      condition: activeResult.physicalCondition,
      damageLevel: formData.swelling === 'Yes' ? "Critical" : "None",
      recoverability: activeResult.recoveryPotential,
      confidence: activeResult.confidence,
      recommendedPath: isUnsafe ? "Recycling" : "Second-life",
      status: isUnsafe ? "Safety Hold" : "Approved",
      location: "EV Battery Diagnostic Cell #1",
      reasoning: activeResult.reasoning,
      safetyStatus: isUnsafe ? "Fail" : "Pass",
      details: {
        soh: `${formData.soh}%`,
        cycles: formData.cycles,
        voltage: `${formData.voltage} V`,
        temperature: `${formData.temperature}°C`,
        swelling: formData.swelling,
        leakage: formData.leakage
      },
      environmentalImpact: {
        co2Saved: isUnsafe ? "Estimated 1,920 kg CO₂e" : "Estimated 3,850 kg CO₂e",
        landfillDiverted: "0.34 Tonnes (Est.)",
        economicValue: isUnsafe ? "Estimated ₹48,000" : "Estimated ₹142,000",
        virginMaterialSaved: "12kg Cobalt, 28kg Lithium"
      }
    };
  };

  const handleSave = () => {
    if (isSaved) return;
    onSaveAssessment(buildRecordObject());
    setIsSaved(true);
  };

  const handleDownload = () => {
    const reportText = JSON.stringify({ formData, activeResult }, null, 2);
    const blob = new Blob([reportText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Report_EV_${formData.chemistry}_${activeResult.safetyStatus}.json`;
    a.click();
    URL.revokeObjectURL(url);
    if (showToast) showToast('EV Assessment report downloaded.', 'info');
  };

  const isUnsafeScenario = activeResult.safetyStatus === 'FAIL';

  return (
    <div className="space-y-6 pb-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight">
              AI EV Battery Recovery Assessment
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Evaluate battery condition, safety and second-life potential.
          </p>
        </div>

        {/* DEMO SCENARIO SELECTOR BUTTONS */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">Demo Scenarios:</span>
          
          <button
            onClick={() => handleLoadPreset(MOCK_PRESETS_EV[0])}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-black transition flex items-center gap-1.5 cursor-pointer shadow-md ${
              selectedPresetId === 'ev-safe-1'
                ? 'bg-emerald-400 text-slate-950 ring-2 ring-emerald-400/50'
                : 'bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/40'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>[ SAFE BATTERY ]</span>
          </button>

          <button
            onClick={() => handleLoadPreset(MOCK_PRESETS_EV[1])}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-black transition flex items-center gap-1.5 cursor-pointer shadow-md ${
              selectedPresetId === 'ev-unsafe-1'
                ? 'bg-red-500 text-slate-950 ring-2 ring-red-500/50'
                : 'bg-slate-800 hover:bg-slate-700 text-red-300 border border-red-500/40'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>[ UNSAFE BATTERY ]</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Input Form & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Battery Input Form (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-xs text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Battery Assessment Form
            </h3>
            <span className="text-[10px] font-mono text-slate-400">
              Prototype Safety Assessment
            </span>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            
            {/* Battery Chemistry */}
            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">Battery Chemistry</label>
              <select
                value={formData.chemistry}
                onChange={(e) => handleInputChange('chemistry', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              >
                <option value="Lithium-ion">Lithium-ion</option>
                <option value="NMC 622">NMC 622</option>
                <option value="LFP">LFP (Lithium Iron Phosphate)</option>
              </select>
            </div>

            {/* Battery Age */}
            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">Battery Age (Years)</label>
              <input
                type="number"
                value={formData.ageYears}
                onChange={(e) => handleInputChange('ageYears', Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            {/* State of Health (SoH) */}
            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">State of Health (SoH %)</label>
              <input
                type="number"
                value={formData.soh}
                onChange={(e) => handleInputChange('soh', Number(e.target.value))}
                className={`w-full bg-slate-950 border rounded-lg p-2 font-mono font-bold ${
                  formData.soh < 50 ? 'text-red-400 border-red-500/50' : 'text-teal-400 border-slate-800'
                }`}
              />
            </div>

            {/* Charge Cycles */}
            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">Charge Cycles</label>
              <input
                type="number"
                value={formData.cycles}
                onChange={(e) => handleInputChange('cycles', Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            {/* Voltage */}
            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">Voltage (V)</label>
              <input
                type="number"
                step="0.1"
                value={formData.voltage}
                onChange={(e) => handleInputChange('voltage', Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            {/* Temperature */}
            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">Temperature (°C)</label>
              <input
                type="number"
                value={formData.temperature}
                onChange={(e) => handleInputChange('temperature', Number(e.target.value))}
                className={`w-full bg-slate-950 border rounded-lg p-2 font-mono ${
                  formData.temperature > 40 ? 'text-red-400 border-red-500/50' : 'text-slate-200 border-slate-800'
                }`}
              />
            </div>

            {/* Visible Damage */}
            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">Visible Damage</label>
              <select
                value={formData.visibleDamage}
                onChange={(e) => handleInputChange('visibleDamage', e.target.value)}
                className={`w-full bg-slate-950 border rounded-lg p-2 font-mono ${
                  formData.visibleDamage === 'Detected' ? 'text-red-400 border-red-500/50' : 'text-slate-200 border-slate-800'
                }`}
              >
                <option value="None">None</option>
                <option value="Detected">Detected</option>
              </select>
            </div>

            {/* Swelling */}
            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">Swelling</label>
              <select
                value={formData.swelling}
                onChange={(e) => handleInputChange('swelling', e.target.value)}
                className={`w-full bg-slate-950 border rounded-lg p-2 font-mono font-bold ${
                  formData.swelling === 'Yes' ? 'text-red-400 border-red-500/50' : 'text-slate-200 border-slate-800'
                }`}
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            {/* Leakage */}
            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">Leakage</label>
              <select
                value={formData.leakage}
                onChange={(e) => handleInputChange('leakage', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 font-mono"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>

            {/* Safety Inspection */}
            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">Safety Inspection</label>
              <select
                value={formData.safetyInspection}
                onChange={(e) => handleInputChange('safetyInspection', e.target.value)}
                className={`w-full bg-slate-950 border rounded-lg p-2 font-mono font-bold ${
                  formData.safetyInspection === 'Failed' ? 'text-red-400 border-red-500/50' : 'text-emerald-400 border-slate-800'
                }`}
              >
                <option value="Passed">Passed</option>
                <option value="Failed">Failed</option>
              </select>
            </div>

          </div>

          {/* Usage History */}
          <div>
            <label className="block text-[10px] font-mono text-slate-400 mb-1 uppercase">Usage History</label>
            <input
              type="text"
              value={formData.usageHistory}
              onChange={(e) => handleInputChange('usageHistory', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 text-xs font-mono"
            />
          </div>

          {/* Run Assessment Button */}
          <button
            onClick={() => runAssessment()}
            disabled={isEvaluating}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 transition cursor-pointer"
          >
            {isEvaluating ? (
              <>
                <Cpu className="w-4 h-4 animate-spin" />
                <span>Evaluating Battery Safety Protocols...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run AI Battery Assessment</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: AI Safety Assessment Results Panel (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Main Status & Health Card */}
          <div className={`p-6 rounded-2xl border transition-all ${
            isUnsafeScenario
              ? 'bg-gradient-to-br from-red-950/90 to-slate-900 border-red-500 ring-2 ring-red-500/40 shadow-xl'
              : 'bg-gradient-to-br from-teal-950/80 to-slate-900 border-teal-500/60 ring-2 ring-teal-500/20'
          }`}>
            
            {/* Header Badge */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {isUnsafeScenario ? (
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-black uppercase bg-red-500 text-slate-950 flex items-center gap-1.5 animate-pulse">
                    <ShieldAlert className="w-4 h-4" />
                    SAFETY GATE FAILED
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-black uppercase bg-emerald-400 text-slate-950 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    SAFETY GATE PASSED
                  </span>
                )}
              </div>

              <span className="text-xs font-mono text-slate-400">
                Safety Status: <strong className={isUnsafeScenario ? 'text-red-400' : 'text-emerald-400'}>{activeResult.safetyStatus}</strong>
              </span>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-3 font-mono">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block">Battery Health:</span>
                <p className={`text-xl font-black mt-0.5 ${isUnsafeScenario ? 'text-red-400' : 'text-teal-400'}`}>
                  {activeResult.health}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block">Safety Status:</span>
                <p className={`text-sm font-bold mt-1 ${isUnsafeScenario ? 'text-red-400' : 'text-emerald-400'}`}>
                  {activeResult.safetyStatus}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block">Physical Condition:</span>
                <p className={`text-xs font-bold mt-1 ${isUnsafeScenario ? 'text-red-400' : 'text-slate-200'}`}>
                  {activeResult.physicalCondition}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block">Recovery Potential:</span>
                <p className={`text-xs font-bold mt-1 ${isUnsafeScenario ? 'text-red-400' : 'text-cyan-400'}`}>
                  {activeResult.recoveryPotential}
                </p>
              </div>
            </div>

            {/* Recommended Pathway Highlight */}
            <div className="pt-3 border-t border-slate-800/80 space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
                RECOMMENDED PATHWAY
              </span>
              <div className="flex items-center justify-between">
                <span className={`text-lg lg:text-xl font-black font-mono ${isUnsafeScenario ? 'text-red-300' : 'text-emerald-300'}`}>
                  {activeResult.recommendedPath}
                </span>
                <span className="text-xs font-mono font-bold text-teal-400">
                  Confidence: {activeResult.confidence}%
                </span>
              </div>
            </div>
          </div>

          {/* SAFETY GATE VERIFICATION PANEL */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h4 className="font-extrabold text-xs text-white uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className={`w-4 h-4 ${isUnsafeScenario ? 'text-red-400' : 'text-emerald-400'}`} />
                Prototype Safety Assessment Criteria
              </span>
              <span className="text-[10px] font-mono text-slate-500">Checklist</span>
            </h4>

            <div className="space-y-1.5 text-xs font-mono">
              {activeResult.safetyChecks?.map((check, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border flex items-center justify-between ${
                    check.passed
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                      : 'bg-red-950/40 border-red-500/50 text-red-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{check.passed ? '✓' : '✕'}</span>
                    <span>{check.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{check.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* PATHWAY REJECTION & DECISION MATRIX */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="font-extrabold text-xs text-white uppercase tracking-wider">
                RECOVERY DECISION MATRIX & SAFETY GATING
              </h4>
              <span className="text-[10px] font-mono text-slate-500">Enforced Routing</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              {activeResult.pathwayMatrix?.map((pm) => (
                <div
                  key={pm.path}
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    pm.status.includes('BLOCKED') || pm.status.includes('REJECTED')
                      ? 'bg-red-950/30 border-red-500/50 text-red-300 opacity-90'
                      : pm.status.includes('Approved') || pm.status.includes('RECOMMENDED')
                      ? 'bg-teal-950/40 border-teal-500/40 text-teal-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {pm.status.includes('BLOCKED') || pm.status.includes('REJECTED') ? (
                      <Lock className="w-4 h-4 text-red-400 shrink-0" />
                    ) : (
                      <Check className="w-4 h-4 text-teal-400 shrink-0" />
                    )}
                    <span className={pm.status.includes('BLOCKED') || pm.status.includes('REJECTED') ? 'line-through font-bold text-red-300' : 'font-bold'}>
                      {pm.path}
                    </span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                    pm.status.includes('BLOCKED') || pm.status.includes('REJECTED')
                      ? 'bg-red-500 text-slate-950'
                      : pm.status.includes('Approved') || pm.status.includes('RECOMMENDED')
                      ? 'bg-teal-400 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {pm.status}
                  </span>
                </div>
              ))}
            </div>

            {/* WHY WERE THESE PATHWAYS REJECTED? */}
            {isUnsafeScenario && (
              <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-xs text-red-200 space-y-1.5">
                <h5 className="font-extrabold text-red-300 uppercase tracking-wide flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  Why were these pathways rejected?
                </h5>
                <p className="text-red-200/90 leading-relaxed text-[11px]">
                  "Predefined prototype safety criteria were not satisfied. Second-life use and repurposing are therefore blocked, while recycling is recommended as the safer recovery pathway."
                </p>
                <div className="pt-2 text-[10px] font-mono text-red-300/80 flex items-center justify-between border-t border-red-900/60 flex-wrap gap-1">
                  <span>UNSAFE BATTERY</span>
                  <span>→ SAFETY GATE FAIL</span>
                  <span>→ SECOND-LIFE / REPURPOSING BLOCKED</span>
                  <span className="text-emerald-400 font-bold">→ RECYCLING RECOMMENDED</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                disabled={isSaved}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                  isSaved
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 opacity-90 cursor-not-allowed'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                }`}
              >
                {isSaved ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
                <span>{isSaved ? '✓ Assessment Saved' : 'Save Assessment'}</span>
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition cursor-pointer"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download Report</span>
              </button>
            </div>

            <button
              onClick={() => {
                onViewReport(buildRecordObject());
                setIsSaved(true);
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs border border-slate-700 transition cursor-pointer"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>View Full Assessment Report</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
