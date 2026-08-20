import React, { useState } from 'react';
import { 
  Building2, 
  UploadCloud, 
  Sparkles, 
  Check, 
  FileText, 
  Download, 
  Save, 
  Layers, 
  Cpu
} from 'lucide-react';
import { MOCK_SAMPLES_CD } from '../data/mockData';
import RecoveryPathwayVisualizer from '../components/RecoveryPathwayVisualizer';

export default function CdWastePage({ onSaveAssessment, onViewReport, showToast }) {
  const [selectedSample, setSelectedSample] = useState(MOCK_SAMPLES_CD[0]); // Concrete default
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [customMaterialName, setCustomMaterialName] = useState('');
  const [activeResult, setActiveResult] = useState(MOCK_SAMPLES_CD[0].presetData);
  const [isSaved, setIsSaved] = useState(false);

  // Trigger simulated AI processing scan (Input Template - DOES NOT SAVE TO STORE)
  const triggerAiScan = (sample, customImg = null) => {
    setIsProcessing(true);
    setProcessingStep(1);
    setIsSaved(false);
    
    if (sample) {
      setSelectedSample(sample);
      setUploadedImage(null);
    } else if (customImg) {
      setUploadedImage(customImg);
    }

    setTimeout(() => setProcessingStep(2), 300);
    setTimeout(() => setProcessingStep(3), 600);
    setTimeout(() => setProcessingStep(4), 900);

    setTimeout(() => {
      setIsProcessing(false);
      if (sample) {
        setActiveResult(sample.presetData);
      } else {
        setActiveResult({
          material: customMaterialName.toUpperCase() || "CONCRETE",
          category: "C&D Waste",
          confidence: 94,
          condition: "GOOD",
          damageLevel: "LOW",
          recoverability: "HIGH",
          reusePotential: "HIGH",
          recommendedPath: "REUSE",
          explanation: "Prototype assessment identifies good material condition and low visible damage. Direct reuse is therefore ranked as the preferred recovery pathway, subject to appropriate physical inspection.",
          co2: "Estimated 510 kg CO₂e",
          landfill: "1.80 Tonnes (Est.)",
          value: "Estimated ₹18,500",
          alternatives: [
            { path: "Reuse", status: "✓ Recommended", reason: "Direct structural placement preserving embodied energy." },
            { path: "Refurbishment", status: "Not required based on current condition", reason: "No surface re-facing or re-armoring required." },
            { path: "Repurposing", status: "Possible but lower-value option", reason: "Crushing into aggregate reduces estimated monetary value." },
            { path: "Recycling", status: "Fallback option", reason: "Secondary aggregate crushing." },
            { path: "Disposal", status: "Not recommended", reason: "Avoidable landfill dumping." }
          ]
        });
      }
    }, 1100);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomMaterialName(file.name.replace(/\.[^/.]+$/, ""));
      triggerAiScan(null, url);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomMaterialName(file.name.replace(/\.[^/.]+$/, ""));
      triggerAiScan(null, url);
    }
  };

  const buildRecordObject = () => ({
    title: `${activeResult.material} (AI Assessed)`,
    category: "C&D",
    type: "cd",
    detectedMaterial: activeResult.material,
    condition: activeResult.condition,
    damageLevel: activeResult.damageLevel,
    recoverability: activeResult.recoverability,
    confidence: activeResult.confidence,
    recommendedPath: activeResult.recommendedPath,
    status: "Approved",
    location: "Site Inspection Bay #2",
    reasoning: activeResult.explanation,
    alternatives: activeResult.alternatives,
    environmentalImpact: {
      co2Saved: activeResult.co2,
      landfillDiverted: activeResult.landfill,
      economicValue: activeResult.value,
      virginMaterialSaved: "1,450 kg Aggregate (Est.)"
    },
    safetyStatus: "—"
  });

  const handleSave = () => {
    if (isSaved) return;
    onSaveAssessment(buildRecordObject());
    setIsSaved(true);
  };

  const handleDownload = () => {
    const reportText = JSON.stringify(activeResult, null, 2);
    const blob = new Blob([reportText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Report_CD_${activeResult.material}.json`;
    a.click();
    URL.revokeObjectURL(url);
    if (showToast) showToast('Assessment report downloaded.', 'info');
  };

  const currentImage = uploadedImage || selectedSample.image;

  return (
    <div className="space-y-6 pb-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-teal-400" />
            <h1 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight">
              AI Construction Waste Assessment
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Analyze material type, condition and recovery potential.
          </p>
        </div>

        {/* Demo Preset Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-slate-400 mr-1">Demo Materials:</span>
          {MOCK_SAMPLES_CD.map((sample) => {
            const isSelected = selectedSample.id === sample.id && !uploadedImage;
            return (
              <button
                key={sample.id}
                onClick={() => triggerAiScan(sample)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-mono transition cursor-pointer ${
                  isSelected
                    ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
              >
                [ {sample.material} ]
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Upload Step & AI Detection Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Upload Input & Image Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Upload Dropzone Box */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="relative p-6 rounded-2xl bg-slate-900/90 border-2 border-dashed border-slate-700 hover:border-teal-500/60 transition-all text-center space-y-3 group"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer z-20"
            />
            
            <div className="w-12 h-12 mx-auto rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-6 h-6" />
            </div>

            <div>
              <p className="text-sm font-bold text-white">
                Drag & Drop or Browse C&D Material Image
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Supports JPG, PNG, WEBP structural scans
              </p>
            </div>

            <div className="pt-1">
              <span className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-teal-400">
                Browse Files
              </span>
            </div>
          </div>

          {/* Image Preview with Visual AI Scanning Overlay */}
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl aspect-video sm:aspect-4/3 flex items-center justify-center">
            <img
              src={currentImage}
              alt="C&D Material Scan"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80";
              }}
            />

            {/* AI Processing Checklist Overlay */}
            {isProcessing && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 space-y-3 z-30">
                <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
                  <Cpu className="w-8 h-8 animate-pulse" />
                </div>
                <h4 className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">
                  Analyzing material...
                </h4>
                
                <div className="space-y-1 text-xs text-slate-300 font-mono text-left w-56">
                  <div className="flex items-center gap-2">
                    <span className={processingStep >= 1 ? "text-emerald-400 font-bold" : "text-slate-600"}>✓</span>
                    <span>Image processed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={processingStep >= 2 ? "text-emerald-400 font-bold" : "text-slate-600"}>✓</span>
                    <span>Material classification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={processingStep >= 3 ? "text-emerald-400 font-bold" : "text-slate-600"}>✓</span>
                    <span>Condition assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={processingStep >= 4 ? "text-emerald-400 font-bold" : "text-slate-600"}>✓</span>
                    <span>Recovery potential analysis</span>
                  </div>
                </div>
              </div>
            )}

            {/* Computer Vision Detection Bounding Overlay */}
            {!isProcessing && (
              <div className="absolute inset-4 border-2 border-teal-400/80 rounded-xl pointer-events-none flex flex-col justify-between p-3">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-1 rounded bg-slate-950/90 border border-teal-400 text-teal-300 font-mono text-[10px] font-bold">
                    AI DETECTED: {activeResult.material}
                  </span>
                  <span className="px-2 py-1 rounded bg-slate-950/90 border border-emerald-400 text-emerald-300 font-mono text-[10px] font-bold">
                    CONFIDENCE: {activeResult.confidence}%
                  </span>
                </div>
                <div className="flex justify-between items-end text-[9px] font-mono text-teal-300 bg-slate-950/80 p-1.5 rounded">
                  <span>CATEGORY: {activeResult.category || 'C&D Waste'}</span>
                  <span>CONDITION: {activeResult.condition}</span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: AI Results, Condition & Recovery Recommendation (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* STEP 3 & 4: AI CLASSIFICATION & CONDITION ASSESSMENT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Step 3 Card: AI Detection */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-[10px] font-mono font-bold uppercase text-teal-400">
                  AI Detection
                </span>
                <span className="text-[10px] font-mono text-slate-500">Classification</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Material:</span>
                <p className="text-xl font-extrabold text-white tracking-tight font-mono">{activeResult.material}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/60 font-mono text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">Confidence:</span>
                  <span className="font-bold text-teal-400">{activeResult.confidence}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Material Category:</span>
                  <span className="font-semibold text-slate-200">{activeResult.category || 'C&D Waste'}</span>
                </div>
              </div>
            </div>

            {/* Step 4 Card: Condition Assessment Panel */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-400">
                  Condition Assessment
                </span>
                <span className="text-[10px] font-mono text-slate-500">Physical Grade</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 block">Overall Condition:</span>
                  <span className="font-bold text-emerald-400">{activeResult.condition}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Damage Level:</span>
                  <span className="font-bold text-slate-200">{activeResult.damageLevel}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Recoverability:</span>
                  <span className="font-bold text-cyan-400">{activeResult.recoverability}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Estimated Reuse Potential:</span>
                  <span className="font-bold text-teal-300">{activeResult.reusePotential || 'HIGH'}</span>
                </div>
              </div>
            </div>

          </div>

          {/* STEP 5 & 6: RECOVERY DECISION & WHY THIS DECISION? */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <RecoveryPathwayVisualizer
              recommendedPath={activeResult.recommendedPath}
              alternatives={activeResult.alternatives}
              isUnsafe={false}
              reasoning={activeResult.explanation}
            />
          </div>

          {/* STEP 7: ASSESSMENT REPORT ACTIONS */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                disabled={isSaved}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                  isSaved
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 opacity-90 cursor-not-allowed'
                    : 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md shadow-teal-500/20'
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
              <FileText className="w-4 h-4 text-teal-400" />
              <span>View Full Assessment Report</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
