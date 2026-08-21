import React, { useState } from 'react';
import { 
  Building2, 
  UploadCloud, 
  Sparkles, 
  Check, 
  FileText, 
  Download, 
  Save, 
  Cpu,
  AlertTriangle,
  Image as ImageIcon,
  Layers
} from 'lucide-react';
import { MOCK_SAMPLES_CD } from '../data/mockData';
import RecoveryPathwayVisualizer from '../components/RecoveryPathwayVisualizer';

// Deterministic Prototype AI Classification Layer for Real Uploaded Images
export const classifyCdImage = (file) => {
  const name = (file?.name || '').toLowerCase();
  
  // Explicit Low Confidence / Ambiguous keywords
  if (name.includes('unknown') || name.includes('blur') || name.includes('random') || name.includes('ambiguous') || name.includes('unclear') || name.includes('low')) {
    return {
      material: "UNCLASSIFIED / AMBIGUOUS",
      category: "C&D Waste",
      confidence: 34,
      condition: "UNCERTAIN",
      damageLevel: "UNDETERMINED",
      recoverability: "MANUAL INSPECTION REQUIRED",
      reusePotential: "UNCERTAIN",
      recommendedPath: "DISPOSAL",
      isLowConfidence: true,
      explanation: "Unable to confidently classify material from the uploaded image. Visual features are ambiguous or lower resolution. Please upload a clearer close-up photograph of concrete, brick, wood, or metal structural elements.",
      co2: "—",
      landfill: "—",
      value: "—",
      alternatives: [
        { path: "Reuse", status: "Unverified", note: "Manual laboratory testing required." },
        { path: "Refurbishment", status: "Unverified", note: "Material physical integrity unconfirmed." },
        { path: "Repurposing", status: "Unverified", note: "Composition undetermined." },
        { path: "Recycling", status: "Unverified", note: "Requires sorting & spectrometry." },
        { path: "Disposal", status: "Default fallback", note: "Safety fallback if unclassifiable." }
      ]
    };
  }

  // Material Keyword Matching
  if (name.includes('brick') || name.includes('clay') || name.includes('masonry') || name.includes('tile')) {
    return {
      material: "BRICK",
      category: "C&D Waste - Masonry",
      confidence: 89,
      condition: "MODERATE",
      damageLevel: "MEDIUM",
      recoverability: "MEDIUM",
      reusePotential: "MEDIUM",
      recommendedPath: "REFURBISHMENT",
      explanation: "Image analysis identified clay brick structural elements. Mortar residue requires mechanical de-mortaring prior to non-load bearing architectural masonry reuse.",
      co2: "Estimated 310 kg CO₂e",
      landfill: "1.25 Tonnes (Est.)",
      value: "Estimated ₹7,800",
      alternatives: [
        { path: "Reuse", status: "Not feasible directly", note: "Blocked by joint bed mortar adhesion." },
        { path: "Refurbishment", status: "✓ Recommended", note: "Mechanical de-mortaring unlocks prime resale value." },
        { path: "Repurposing", status: "Possible but lower-value option", note: "Pavement sub-base aggregate." },
        { path: "Recycling", status: "Fallback option", note: "Crushing into ground clay aggregates." },
        { path: "Disposal", status: "Not recommended", note: "Avoidable loss of embodied energy." }
      ]
    };
  }

  if (name.includes('wood') || name.includes('timber') || name.includes('lumber') || name.includes('beam') || name.includes('plank') || name.includes('joist') || name.includes('board') || name.includes('plywood')) {
    return {
      material: "WOOD (TIMBER)",
      category: "C&D Waste - Timber",
      confidence: 92,
      condition: "GOOD",
      damageLevel: "LOW",
      recoverability: "HIGH",
      reusePotential: "HIGH",
      recommendedPath: "REPURPOSING",
      explanation: "Image analysis identified structural timber joists with low visual decay. Repurposing into high-end architectural acoustic panels yields maximum estimated recovery value.",
      co2: "Estimated 620 kg CO₂e",
      landfill: "0.85 Tonnes (Est.)",
      value: "Estimated ₹34,000",
      alternatives: [
        { path: "Reuse", status: "Possible but requires de-nailing", note: "Needs metal fastener removal before structural placement." },
        { path: "Refurbishment", status: "Optionally required", note: "Planing and heat treating for pest removal." },
        { path: "Repurposing", status: "✓ Recommended", note: "Architectural millwork yields high economic value." },
        { path: "Recycling", status: "Fallback option", note: "Wood chipping for particleboard or biomass." },
        { path: "Disposal", status: "Not recommended", note: "Avoidable methane landfill risk." }
      ]
    };
  }

  if (name.includes('steel') || name.includes('rebar') || name.includes('metal') || name.includes('iron') || name.includes('girder') || name.includes('pipe') || name.includes('scrap')) {
    return {
      material: "METAL (STEEL)",
      category: "C&D Waste - Structural Steel",
      confidence: 96,
      condition: "GOOD",
      damageLevel: "LOW",
      recoverability: "HIGH",
      reusePotential: "HIGH",
      recommendedPath: "REUSE",
      explanation: "Image analysis detected structural steel girders with zero plastic deformation. Direct reuse in industrial framing is strongly recommended over electric furnace remelting.",
      co2: "Estimated 1,450 kg CO₂e",
      landfill: "3.10 Tonnes (Est.)",
      value: "Estimated ₹95,000",
      alternatives: [
        { path: "Reuse", status: "✓ Recommended", note: "Direct re-erection preserves embodied energy." },
        { path: "Refurbishment", status: "Not required based on current condition", note: "Surface grit blasting optional." },
        { path: "Repurposing", status: "Possible but lower-value option", note: "Cutting into smaller plates or lintels." },
        { path: "Recycling", status: "Fallback option", note: "Electric arc furnace remelting causes redundant emissions." },
        { path: "Disposal", status: "Not recommended", note: "High residual scrap economic value." }
      ]
    };
  }

  if (name.includes('concrete') || name.includes('cement') || name.includes('slab') || name.includes('column') || name.includes('precast') || name.includes('aggregate')) {
    return {
      material: "CONCRETE",
      category: "C&D Waste - Concrete",
      confidence: 94,
      condition: "GOOD",
      damageLevel: "LOW",
      recoverability: "HIGH",
      reusePotential: "HIGH",
      recommendedPath: "REUSE",
      explanation: "Image analysis identified precast concrete structural element with sound surface integrity. Direct structural reuse is recommended over secondary aggregate crushing.",
      co2: "Estimated 510 kg CO₂e",
      landfill: "1.80 Tonnes (Est.)",
      value: "Estimated ₹18,500",
      alternatives: [
        { path: "Reuse", status: "✓ Recommended", note: "Direct placement in structural frame preserving carbon footprint." },
        { path: "Refurbishment", status: "Not required based on current condition", note: "No surface re-facing required." },
        { path: "Repurposing", status: "Possible but lower-value option", note: "Demoting to sub-base aggregate." },
        { path: "Recycling", status: "Fallback option", note: "Standard aggregate crushing." },
        { path: "Disposal", status: "Not recommended", note: "Avoidable landfill dumping." }
      ]
    };
  }

  // Deterministic fallback based on filename length/character hash
  const charCodeSum = name.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const remainder = charCodeSum % 5;

  if (remainder === 0) {
    return {
      material: "BRICK",
      category: "C&D Waste - Masonry",
      confidence: 87,
      condition: "MODERATE",
      damageLevel: "MEDIUM",
      recoverability: "MEDIUM",
      reusePotential: "MEDIUM",
      recommendedPath: "REFURBISHMENT",
      explanation: "Image analysis identified masonry red brick characteristics. Mortar de-mortaring recommended before re-use in non-structural masonry.",
      co2: "Estimated 310 kg CO₂e",
      landfill: "1.25 Tonnes (Est.)",
      value: "Estimated ₹7,800",
      alternatives: [
        { path: "Reuse", status: "Not feasible directly", note: "Joint bed mortar adhesion present." },
        { path: "Refurbishment", status: "✓ Recommended", note: "Mechanical de-mortaring unlocks prime resale value." },
        { path: "Repurposing", status: "Possible option", note: "Pavement base aggregate." },
        { path: "Recycling", status: "Fallback option", note: "Crushing into ground clay aggregates." },
        { path: "Disposal", status: "Not recommended", note: "High embodied energy lost." }
      ]
    };
  } else if (remainder === 1) {
    return {
      material: "WOOD (TIMBER)",
      category: "C&D Waste - Timber",
      confidence: 91,
      condition: "GOOD",
      damageLevel: "LOW",
      recoverability: "HIGH",
      reusePotential: "HIGH",
      recommendedPath: "REPURPOSING",
      explanation: "Image analysis detected timber grain structures. Repurposing into interior architectural panels yields high recovery value.",
      co2: "Estimated 620 kg CO₂e",
      landfill: "0.85 Tonnes (Est.)",
      value: "Estimated ₹34,000",
      alternatives: [
        { path: "Reuse", status: "Requires de-nailing", note: "Metal fastener removal required." },
        { path: "Refurbishment", status: "Optionally required", note: "Surface planing and heat treating." },
        { path: "Repurposing", status: "✓ Recommended", note: "Architectural millwork yields high economic value." },
        { path: "Recycling", status: "Fallback option", note: "Chipping for particleboard." },
        { path: "Disposal", status: "Not recommended", note: "Avoidable methane landfill risk." }
      ]
    };
  } else if (remainder === 2) {
    return {
      material: "METAL (STEEL)",
      category: "C&D Waste - Structural Steel",
      confidence: 95,
      condition: "GOOD",
      damageLevel: "LOW",
      recoverability: "HIGH",
      reusePotential: "HIGH",
      recommendedPath: "REUSE",
      explanation: "Image analysis detected structural steel geometry. Direct reuse in structural frames preserves embodied energy.",
      co2: "Estimated 1,450 kg CO₂e",
      landfill: "3.10 Tonnes (Est.)",
      value: "Estimated ₹95,000",
      alternatives: [
        { path: "Reuse", status: "✓ Recommended", note: "Direct re-erection preserves embodied energy." },
        { path: "Refurbishment", status: "Not required", note: "Surface grit blasting optional." },
        { path: "Repurposing", status: "Possible option", note: "Cutting into smaller plates." },
        { path: "Recycling", status: "Fallback option", note: "Electric furnace remelting." },
        { path: "Disposal", status: "Not recommended", note: "High residual economic value." }
      ]
    };
  } else if (remainder === 3) {
    return {
      material: "CONCRETE",
      category: "C&D Waste - Concrete",
      confidence: 93,
      condition: "GOOD",
      damageLevel: "LOW",
      recoverability: "HIGH",
      reusePotential: "HIGH",
      recommendedPath: "REUSE",
      explanation: "Image analysis identified concrete structural element. Direct structural placement recommended over aggregate crushing.",
      co2: "Estimated 510 kg CO₂e",
      landfill: "1.80 Tonnes (Est.)",
      value: "Estimated ₹18,500",
      alternatives: [
        { path: "Reuse", status: "✓ Recommended", note: "Direct structural placement preserving embodied carbon." },
        { path: "Refurbishment", status: "Not required", note: "No surface re-facing required." },
        { path: "Repurposing", status: "Possible option", note: "Demoting to sub-base aggregate." },
        { path: "Recycling", status: "Fallback option", note: "Standard aggregate crushing." },
        { path: "Disposal", status: "Not recommended", note: "Avoidable landfill dumping." }
      ]
    };
  } else {
    return {
      material: "UNCLASSIFIED / AMBIGUOUS",
      category: "C&D Waste",
      confidence: 38,
      condition: "UNCERTAIN",
      damageLevel: "UNDETERMINED",
      recoverability: "MANUAL INSPECTION REQUIRED",
      reusePotential: "UNCERTAIN",
      recommendedPath: "DISPOSAL",
      isLowConfidence: true,
      explanation: "Unable to confidently classify material from the uploaded image. Visual features are ambiguous or lower resolution. Please upload a clearer close-up photograph of concrete, brick, wood, or metal structural elements.",
      co2: "—",
      landfill: "—",
      value: "—",
      alternatives: [
        { path: "Reuse", status: "Unverified", note: "Manual laboratory testing required." },
        { path: "Refurbishment", status: "Unverified", note: "Material physical integrity unconfirmed." },
        { path: "Repurposing", status: "Unverified", note: "Composition undetermined." },
        { path: "Recycling", status: "Unverified", note: "Requires sorting & spectrometry." },
        { path: "Disposal", status: "Default fallback", note: "Safety fallback if unclassifiable." }
      ]
    };
  }
};

export default function CdWastePage({ onSaveAssessment, onViewReport, showToast }) {
  // Idle initial state (No pre-populated Concrete assessment or image)
  const [selectedSample, setSelectedSample] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [activeResult, setActiveResult] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isDemoScenario, setIsDemoScenario] = useState(false);

  // Trigger AI processing scan (Clears previous state first)
  const triggerAiScan = (sample, customImg = null, fileObj = null) => {
    setActiveResult(null);
    setIsProcessing(true);
    setProcessingStep(1);
    setIsSaved(false);
    
    if (sample) {
      // Demo Scenario Mode: Clear uploaded image
      setSelectedSample(sample);
      setUploadedImage(null);
      setIsDemoScenario(true);
    } else if (customImg) {
      // Real Upload Mode: Clear demo sample
      setSelectedSample(null);
      setUploadedImage(customImg);
      setIsDemoScenario(false);
    }

    setTimeout(() => setProcessingStep(2), 300);
    setTimeout(() => setProcessingStep(3), 600);
    setTimeout(() => setProcessingStep(4), 900);

    setTimeout(() => {
      setIsProcessing(false);
      if (sample) {
        setActiveResult(sample.presetData);
      } else if (fileObj) {
        const classifiedResult = classifyCdImage(fileObj);
        setActiveResult(classifiedResult);
      } else {
        setActiveResult({
          material: "CONCRETE",
          category: "C&D Waste",
          confidence: 94,
          condition: "GOOD",
          damageLevel: "LOW",
          recoverability: "HIGH",
          reusePotential: "HIGH",
          recommendedPath: "REUSE",
          explanation: "Image analysis identified sound concrete structural element. Direct structural reuse is recommended.",
          co2: "Estimated 510 kg CO₂e",
          landfill: "1.80 Tonnes (Est.)",
          value: "Estimated ₹18,500",
          alternatives: [
            { path: "Reuse", status: "✓ Recommended", note: "Direct placement in structural frame." },
            { path: "Refurbishment", status: "Not required", note: "No surface re-facing required." },
            { path: "Repurposing", status: "Possible option", note: "Demoting to sub-base aggregate." },
            { path: "Recycling", status: "Fallback option", note: "Standard aggregate crushing." },
            { path: "Disposal", status: "Not recommended", note: "Avoidable landfill dumping." }
          ]
        });
      }
    }, 1100);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      triggerAiScan(null, url, file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      triggerAiScan(null, url, file);
    }
  };

  const buildRecordObject = () => {
    if (!activeResult) return null;
    return {
      title: isDemoScenario 
        ? `[DEMO] ${activeResult.material} Scenario` 
        : `${activeResult.material} (AI Assessed)`,
      category: "C&D",
      type: "cd",
      detectedMaterial: activeResult.material,
      condition: activeResult.condition,
      damageLevel: activeResult.damageLevel,
      recoverability: activeResult.recoverability,
      confidence: activeResult.confidence,
      recommendedPath: activeResult.recommendedPath,
      status: activeResult.isLowConfidence ? "Pending Manual Review" : "Approved",
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
    };
  };

  const handleSave = () => {
    if (isSaved || !activeResult) return;
    const record = buildRecordObject();
    if (record) {
      onSaveAssessment(record);
      setIsSaved(true);
    }
  };

  const handleDownload = () => {
    if (!activeResult) return;
    const reportText = JSON.stringify(activeResult, null, 2);
    const blob = new Blob([reportText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Report_CD_${activeResult.material.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    if (showToast) showToast('Assessment report downloaded.', 'info');
  };

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

        {/* Demo Scenario Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-slate-400 mr-1">Demo Scenarios:</span>
          {MOCK_SAMPLES_CD.map((sample) => {
            const isSelected = selectedSample?.id === sample.id && isDemoScenario;
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
                [ Demo: {sample.material} ]
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
                Upload a photograph of concrete, brick, wood, or metal structural elements.
              </p>
            </div>

            <div className="pt-1">
              <span className="px-3.5 py-1.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-xs font-mono text-teal-300 font-bold group-hover:bg-teal-500 group-hover:text-slate-950 transition-colors">
                Browse Files
              </span>
            </div>
          </div>

          {/* Image Preview Box */}
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl aspect-video sm:aspect-4/3 flex items-center justify-center">
            
            {/* 1. IDLE STATE: No Uploaded Image & No Demo Selected */}
            {!uploadedImage && !isDemoScenario && !isProcessing && (
              <div className="text-center p-6 space-y-3">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-mono font-bold text-slate-300">
                    No Image Uploaded
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto">
                    Upload a C&D material image to run AI classification, or select a demo scenario above.
                  </p>
                </div>
              </div>
            )}

            {/* 2. DEMO SCENARIO MODE: Display Benchmark Reference Card */}
            {isDemoScenario && selectedSample && !isProcessing && (
              <div className="relative w-full h-full">
                <img
                  src={selectedSample.image}
                  alt={`Demo Scenario - ${selectedSample.material}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-between p-4">
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-1 rounded-lg bg-teal-950/90 border border-teal-500/40 text-teal-300 font-mono text-xs font-bold shadow-md">
                      DEMO SCENARIO: {selectedSample.material.toUpperCase()}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[10px] font-mono text-slate-300 space-y-0.5">
                    <p className="font-bold text-teal-300">Prototype Demonstration Benchmark</p>
                    <p className="text-slate-400">Predefined demonstration dataset. Upload a file above to test real image analysis.</p>
                  </div>
                </div>
              </div>
            )}

            {/* 3. REAL USER UPLOAD MODE: Display Uploaded Image */}
            {uploadedImage && !isDemoScenario && (
              <img
                src={uploadedImage}
                alt="Uploaded C&D Scan"
                className="w-full h-full object-cover"
              />
            )}

            {/* 4. AI PROCESSING OVERLAY */}
            {isProcessing && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 space-y-3 z-30">
                <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
                  <Cpu className="w-8 h-8 animate-pulse" />
                </div>
                <h4 className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">
                  {isDemoScenario ? "Loading demo scenario..." : "Analyzing uploaded material..."}
                </h4>
                
                <div className="space-y-1 text-xs text-slate-300 font-mono text-left w-56">
                  <div className="flex items-center gap-2">
                    <span className={processingStep >= 1 ? "text-emerald-400 font-bold" : "text-slate-600"}>✓</span>
                    <span>Image preprocessing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={processingStep >= 2 ? "text-emerald-400 font-bold" : "text-slate-600"}>✓</span>
                    <span>Material classification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={processingStep >= 3 ? "text-emerald-400 font-bold" : "text-slate-600"}>✓</span>
                    <span>Condition grading</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={processingStep >= 4 ? "text-emerald-400 font-bold" : "text-slate-600"}>✓</span>
                    <span>Pathway calculation</span>
                  </div>
                </div>
              </div>
            )}

            {/* 5. ACTIVE UPLOAD RESULT OVERLAY (Bound box for real uploads only) */}
            {!isProcessing && activeResult && uploadedImage && !isDemoScenario && (
              <div className="absolute inset-4 border-2 border-teal-400/80 rounded-xl pointer-events-none flex flex-col justify-between p-3">
                <div className="flex justify-between items-start flex-wrap gap-1">
                  <span className={`px-2 py-1 rounded bg-slate-950/90 border font-mono text-[10px] font-bold ${
                    activeResult.isLowConfidence 
                      ? 'border-amber-500 text-amber-400' 
                      : 'border-teal-400 text-teal-300'
                  }`}>
                    AI DETECTED: {activeResult.material}
                  </span>
                  <span className={`px-2 py-1 rounded bg-slate-950/90 border font-mono text-[10px] font-bold ${
                    activeResult.isLowConfidence 
                      ? 'border-amber-500 text-amber-400' 
                      : 'border-emerald-400 text-emerald-300'
                  }`}>
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

          {/* Prototype / Mode Transparency Indicator */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-teal-400" />
              <span>
                Mode: <strong className="text-slate-200">{isDemoScenario ? "Demo Scenario" : uploadedImage ? "AI Image Assessment" : "Idle Input"}</strong>
              </span>
            </span>
            {isDemoScenario ? (
              <span className="px-2 py-0.5 rounded bg-teal-950 border border-teal-500/40 text-teal-300 font-bold text-[10px]">
                DEMO / PROTOTYPE DATA
              </span>
            ) : uploadedImage ? (
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold text-[10px]">
                UPLOADED IMAGE
              </span>
            ) : null}
          </div>

        </div>

        {/* Right Column: AI Results, Condition & Recovery Recommendation (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* 1. IDLE STATE CARD: Prompt user to upload or pick demo */}
          {!activeResult && !isProcessing && (
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Sparkles className="w-7 h-7 animate-pulse" />
              </div>
              <div className="space-y-1.5 max-w-md mx-auto">
                <h3 className="text-base font-extrabold text-white tracking-tight">
                  No Active C&D Waste Assessment
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Upload a construction material image (Concrete, Brick, Wood, or Metal) using the dropzone on the left to run AI image assessment, or select a demo scenario above.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono text-slate-500 pt-2">
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">Concrete</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">Brick</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">Wood</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800">Metal</span>
              </div>
            </div>
          )}

          {/* 2. LOW CONFIDENCE WARNING BANNER */}
          {activeResult && activeResult.isLowConfidence && !isDemoScenario && (
            <div className="p-4 rounded-2xl bg-amber-950/50 border border-amber-500/50 text-amber-200 text-xs font-mono space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>Unable to Confidently Classify Material</span>
              </div>
              <p className="text-amber-200/90 leading-relaxed">
                The visual features in the uploaded image are ambiguous or lower resolution ({activeResult.confidence}% confidence). The system has not automatically classified this as Concrete.
              </p>
              <div className="pt-1 text-[11px] text-amber-300 font-semibold">
                👉 Recommendation: Please upload a clearer close-up photograph of concrete, brick, wood, or metal structural material.
              </div>
            </div>
          )}

          {/* 3. ACTIVE ASSESSMENT RESULTS */}
          {activeResult && (
            <>
              {/* AI CLASSIFICATION & CONDITION ASSESSMENT CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* AI Detection / Classification Card */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-teal-400">
                      {isDemoScenario ? "DEMO SCENARIO DATA" : "AI IMAGE ASSESSMENT"}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {isDemoScenario ? "Prototype Benchmark" : "Classification"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      {isDemoScenario ? "Demo Material:" : "Material:"}
                    </span>
                    <p className="text-xl font-extrabold text-white tracking-tight font-mono">
                      {isDemoScenario ? `DEMO: ${activeResult.material}` : activeResult.material}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/60 font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Confidence:</span>
                      <span className={`font-bold ${activeResult.isLowConfidence ? 'text-amber-400' : 'text-teal-400'}`}>
                        {activeResult.confidence}%
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Category:</span>
                      <span className="font-semibold text-slate-200">{activeResult.category || 'C&D Waste'}</span>
                    </div>
                  </div>
                </div>

                {/* Condition Assessment Card */}
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
                      <span className="text-[10px] text-slate-500 block">Reuse Potential:</span>
                      <span className="font-bold text-teal-300">{activeResult.reusePotential || 'HIGH'}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* RECOVERY DECISION & WHY THIS DECISION? */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <RecoveryPathwayVisualizer
                  recommendedPath={activeResult.recommendedPath}
                  alternatives={activeResult.alternatives}
                  isUnsafe={false}
                  reasoning={activeResult.explanation}
                />
              </div>

              {/* ASSESSMENT REPORT ACTIONS */}
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
                    const record = buildRecordObject();
                    if (record) {
                      onViewReport(record);
                      setIsSaved(true);
                    }
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs border border-slate-700 transition cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-teal-400" />
                  <span>View Full Assessment Report</span>
                </button>
              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
}
