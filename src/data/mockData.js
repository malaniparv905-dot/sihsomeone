// Initial mock data for RE:RECOVER AI (Prototype & Demonstration Data)

export const INITIAL_ASSESSMENTS = [
  {
    id: "RA-001",
    title: "Precast Concrete Column Segment",
    category: "C&D",
    type: "cd",
    detectedMaterial: "Concrete",
    condition: "Good",
    damageLevel: "Low",
    recoverability: "High",
    confidence: 94,
    recommendedPath: "Reuse",
    status: "Approved",
    date: "2026-08-20 14:32",
    location: "Metro Depot Site 4, New Delhi",
    dimensions: "2.4m x 1.2m x 0.2m",
    density: "2,400 kg/m³",
    structuralIntegrity: "Estimated 92% structural integrity intact",
    contaminationLevel: "Low (Surface Dust)",
    reasoning: "Prototype assessment identifies good material condition and low visible damage. Direct reuse is therefore ranked as the preferred recovery pathway, subject to appropriate physical inspection.",
    alternatives: [
      { path: "Reuse", status: "✓ Recommended", note: "Primary direct reuse pathway based on prototype criteria." },
      { path: "Refurbishment", status: "Not required based on current condition", note: "No surface re-facing or re-armoring required." },
      { path: "Repurposing", status: "Possible but lower-value option", note: "Demoting to sub-base aggregate reduces estimated material value." },
      { path: "Recycling", status: "Fallback option", note: "Crushing into aggregate is secondary fallback." },
      { path: "Disposal", status: "Not recommended", note: "Avoidable landfill dumping." }
    ],
    environmentalImpact: {
      co2Saved: "Estimated 510 kg CO₂e",
      landfillDiverted: "1.80 Tonnes (Estimate)",
      virginMaterialSaved: "1,800 kg Aggregate (Est.)",
      economicValue: "Estimated ₹18,500"
    },
    safetyStatus: "—",
    details: {
      compressiveStrength: "35 MPa (Est.)",
      reinforcementExposed: "No",
      chemicalLeaching: "Below Detection Limits"
    }
  },
  {
    id: "RA-002",
    title: "Masonry Brick Aggregate Batch",
    category: "C&D",
    type: "cd",
    detectedMaterial: "Brick",
    condition: "Moderate",
    damageLevel: "Medium",
    recoverability: "Medium",
    confidence: 89,
    recommendedPath: "Refurbishment",
    status: "Review",
    date: "2026-08-20 12:15",
    location: "Commercial Site B3, Gurugram",
    dimensions: "Batch: approx 3.2 m³",
    density: "1,800 kg/m³",
    structuralIntegrity: "Estimated 78% soundness",
    contaminationLevel: "Moderate (Mortar Adhesion)",
    reasoning: "Mortar adhesion prevents immediate direct reuse. Refurbishment via mechanical mortar separation will restore bricks for non-load bearing masonry.",
    alternatives: [
      { path: "Reuse", status: "Not feasible directly", note: "Blocked by mortar adhesion on joint beds." },
      { path: "Refurbishment", status: "✓ Recommended", note: "Mechanical de-mortaring restores usable bricks." },
      { path: "Repurposing", status: "Possible option", note: "Can be repurposed into pavement sub-base material." },
      { path: "Recycling", status: "Fallback option", note: "Crushing for ground clay aggregate." },
      { path: "Disposal", status: "Not recommended", note: "High embodied energy lost." }
    ],
    environmentalImpact: {
      co2Saved: "Estimated 310 kg CO₂e",
      landfillDiverted: "1.25 Tonnes (Estimate)",
      virginMaterialSaved: "1,800 Bricks (Est.)",
      economicValue: "Estimated ₹7,800"
    },
    safetyStatus: "—",
    details: {
      mortarType: "Lime-Cement Blend",
      crackingRatio: "12%",
      saltsContent: "Negligible"
    }
  },
  {
    id: "RA-003",
    title: "EV Pack Module 400V (NMC Chemistry)",
    category: "EV Battery",
    type: "ev",
    detectedMaterial: "Lithium-ion",
    condition: "Good",
    damageLevel: "None",
    recoverability: "High",
    confidence: 91,
    recommendedPath: "Second-life",
    status: "Approved",
    date: "2026-08-20 10:45",
    location: "EV Recycling Depot 1, Bengaluru",
    dimensions: "58kWh Module / 340kg",
    density: "N/A",
    structuralIntegrity: "Cell Casing Intact",
    contaminationLevel: "Clean",
    reasoning: "Prototype safety assessment indicates that the entered battery parameters satisfy the configured demonstration criteria. Second-life use is therefore ranked as the preferred pathway.",
    alternatives: [
      { path: "Reuse", status: "Not recommended", note: "Automotive re-entry restricted due to SOH threshold <80%." },
      { path: "Second-life", status: "Approved", note: "Approved for stationary BESS energy storage integration." },
      { path: "Repurposing", status: "Approved", note: "Approved for modular microgrid conversion." },
      { path: "Recycling", status: "Fallback", note: "Available if second-life demand is unmet." },
      { path: "Disposal", status: "Not required", note: "Environmentally prohibited." }
    ],
    environmentalImpact: {
      co2Saved: "Estimated 3,850 kg CO₂e",
      landfillDiverted: "0.34 Tonnes (Estimate)",
      virginMaterialSaved: "12kg Cobalt, 28kg Lithium",
      economicValue: "Estimated ₹142,000"
    },
    safetyStatus: "Pass",
    details: {
      soh: "78%",
      cycles: "1,240",
      voltage: "392.4 V",
      temperature: "31°C",
      swelling: "No",
      leakage: "No"
    }
  },
  {
    id: "RA-004",
    title: "Decommissioned Fleet EV Pack #08",
    category: "EV Battery",
    type: "ev",
    detectedMaterial: "Lithium-ion",
    condition: "Damaged",
    damageLevel: "Critical",
    recoverability: "Low",
    confidence: 97,
    recommendedPath: "Recycling",
    status: "Safety Hold",
    date: "2026-08-19 16:20",
    location: "Hazmat Handling Center, Pune",
    dimensions: "42kWh Module / 295kg",
    density: "N/A",
    structuralIntegrity: "Cell Swelling & Impact Denting",
    contaminationLevel: "Trace Electrolyte Odor",
    reasoning: "Configured safety criteria were not satisfied. Second-life use and repurposing are blocked in the prototype decision logic, with recycling selected as the safer pathway.",
    alternatives: [
      { path: "Reuse", status: "✕ BLOCKED", note: "Thermal runaway hazard under load." },
      { path: "Second-life", status: "✕ BLOCKED", note: "Blocked due to active casing swelling and low State of Health." },
      { path: "Repurposing", status: "✕ BLOCKED", note: "Grid connection denied due to physical swelling." },
      { path: "Recycling", status: "✓ RECOMMENDED", note: "Controlled discharge and closed-loop hydrometallurgical recycling." },
      { path: "Disposal", status: "Fallback", note: "Controlled dismantling fallback." }
    ],
    environmentalImpact: {
      co2Saved: "Estimated 1,920 kg CO₂e",
      landfillDiverted: "0.29 Tonnes (Estimate)",
      virginMaterialSaved: "18kg Lithium, 45kg Copper",
      economicValue: "Estimated ₹48,000"
    },
    safetyStatus: "Fail",
    details: {
      soh: "38%",
      cycles: "2,100",
      voltage: "392.4 V",
      temperature: "42°C",
      swelling: "Yes",
      leakage: "No"
    }
  }
];

export const MOCK_SAMPLES_CD = [
  {
    id: "cd-sample-1",
    name: "Precast Concrete Column Segment",
    material: "Concrete",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1000&q=80",
    presetData: {
      material: "CONCRETE",
      category: "C&D Waste",
      confidence: 94,
      condition: "GOOD",
      damageLevel: "LOW",
      recoverability: "HIGH",
      reusePotential: "HIGH",
      recommendedPath: "REUSE",
      explanation: "Prototype assessment identifies good material condition and low visible damage. Direct reuse is therefore ranked as the preferred recovery pathway, subject to appropriate physical inspection.",
      co2: "Estimated 510 kg CO₂e",
      landfill: "1.80 Tonnes (Estimate)",
      value: "Estimated ₹18,500",
      alternatives: [
        { path: "Reuse", status: "✓ Recommended", note: "Direct placement in structural frame preserving carbon footprint." },
        { path: "Refurbishment", status: "Not required based on current condition", note: "No surface re-facing or re-armoring required." },
        { path: "Repurposing", status: "Possible but lower-value option", note: "Demoting to sub-base aggregate reduces estimated monetary value." },
        { path: "Recycling", status: "Fallback option", note: "Standard aggregate crushing." },
        { path: "Disposal", status: "Not recommended", note: "Avoidable landfill dumping." }
      ]
    }
  },
  {
    id: "cd-sample-2",
    name: "Salvaged Red Clay Bricks",
    material: "Brick",
    image: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1000&q=80",
    presetData: {
      material: "BRICK",
      category: "C&D Waste",
      confidence: 89,
      condition: "MODERATE",
      damageLevel: "MEDIUM",
      recoverability: "MEDIUM",
      reusePotential: "MEDIUM",
      recommendedPath: "REFURBISHMENT",
      explanation: "Mortar residue requires mechanical surface de-mortaring. Post-refurbishment, bricks are suitable for non-load bearing architectural masonry.",
      co2: "Estimated 310 kg CO₂e",
      landfill: "1.25 Tonnes (Estimate)",
      value: "Estimated ₹7,800",
      alternatives: [
        { path: "Reuse", status: "Not feasible directly", note: "Blocked by mortar adhesion on joint beds." },
        { path: "Refurbishment", status: "✓ Recommended", note: "Mechanical de-mortaring and sorting unlocks prime resale value." },
        { path: "Repurposing", status: "Possible but lower-value option", note: "Pavement base material." },
        { path: "Recycling", status: "Fallback option", note: "Crushing for ground clay aggregates." },
        { path: "Disposal", status: "Not recommended", note: "High embodied energy lost." }
      ]
    }
  },
  {
    id: "cd-sample-3",
    name: "Structural Timber Joists & Beams",
    material: "Wood",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
    presetData: {
      material: "WOOD (TIMBER)",
      category: "C&D Waste",
      confidence: 92,
      condition: "GOOD",
      damageLevel: "LOW",
      recoverability: "HIGH",
      reusePotential: "HIGH",
      recommendedPath: "REPURPOSING",
      explanation: "High quality hardwood timber detected with minor nail attachments. Repurposing into high-end architectural acoustic panels yields maximum estimated recovery value.",
      co2: "Estimated 620 kg CO₂e",
      landfill: "0.85 Tonnes (Estimate)",
      value: "Estimated ₹34,000",
      alternatives: [
        { path: "Reuse", status: "Possible but requires de-nailing", note: "Needs metal de-nailing before direct structural reuse." },
        { path: "Refurbishment", status: "Optionally required", note: "Planing and heat treating for pest removal." },
        { path: "Repurposing", status: "✓ Recommended", note: "Architectural millwork yields high value over timber salvage." },
        { path: "Recycling", status: "Fallback option", note: "Chipping for particleboard or biomass pellets." },
        { path: "Disposal", status: "Not recommended", note: "Avoidable methane hazard in landfill." }
      ]
    }
  },
  {
    id: "cd-sample-4",
    name: "Structural Steel Girders",
    material: "Metal",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80",
    presetData: {
      material: "METAL (STEEL)",
      category: "C&D Waste",
      confidence: 96,
      condition: "GOOD",
      damageLevel: "LOW",
      recoverability: "HIGH",
      reusePotential: "HIGH",
      recommendedPath: "REUSE",
      explanation: "Zero plastic deformation detected in sample scan. Direct reuse in industrial framing is strongly recommended over electric furnace melting.",
      co2: "Estimated 1,450 kg CO₂e",
      landfill: "3.10 Tonnes (Estimate)",
      value: "Estimated ₹95,000",
      alternatives: [
        { path: "Reuse", status: "✓ Recommended", note: "Direct steel re-erection preserves embodied energy." },
        { path: "Refurbishment", status: "Not required based on current condition", note: "Surface grit blasting optional." },
        { path: "Repurposing", status: "Possible but lower-value option", note: "Cutting into smaller lintels or plates." },
        { path: "Recycling", status: "Fallback option", note: "Electric arc furnace remelting causes redundant emissions." },
        { path: "Disposal", status: "Not recommended", note: "High residual economic value." }
      ]
    }
  }
];

export const MOCK_PRESETS_EV = [
  {
    id: "ev-safe-1",
    name: "SAFE BATTERY",
    type: "SAFE",
    data: {
      chemistry: "Lithium-ion",
      ageYears: 4,
      soh: 78,
      cycles: 1240,
      voltage: 392.4,
      temperature: 31,
      visibleDamage: "None",
      swelling: "No",
      leakage: "No",
      safetyInspection: "Passed",
      usageHistory: "Normal"
    },
    result: {
      safetyStatus: "SAFE",
      health: "78%",
      physicalCondition: "GOOD",
      recoveryPotential: "HIGH",
      recommendedPath: "SECOND-LIFE / REPURPOSING",
      confidence: 91,
      riskLevel: "Low",
      reasoning: "Prototype safety assessment indicates that the entered battery parameters satisfy the configured demonstration criteria. Second-life use is therefore ranked as the preferred pathway.",
      safetyChecks: [
        { title: "Temperature within acceptable range", passed: true, detail: "31°C (Operating threshold: <40°C)" },
        { title: "No visible damage", passed: true, detail: "Casing & terminal integrity clear" },
        { title: "No swelling detected", passed: true, detail: "0mm expansion" },
        { title: "No leakage detected", passed: true, detail: "Sensors clear" },
        { title: "Safety inspection passed", passed: true, detail: "Prototype Safety Assessment Passed" }
      ],
      pathwayMatrix: [
        { path: "Second-life", status: "✓ Approved", approved: true, disabled: false, note: "Stationary BESS grid backup storage approved." },
        { path: "Repurposing", status: "✓ Approved", approved: true, disabled: false, note: "Telecom battery module re-assembly approved." },
        { path: "Recycling", status: "Fallback", approved: false, disabled: false, note: "Hydrometallurgy available if second-life demand is unmet." },
        { path: "Disposal", status: "Not required", approved: false, disabled: true, note: "Environmentally prohibited." }
      ]
    }
  },
  {
    id: "ev-unsafe-1",
    name: "UNSAFE BATTERY",
    type: "UNSAFE",
    data: {
      chemistry: "Lithium-ion",
      ageYears: 7,
      soh: 38,
      cycles: 2100,
      voltage: 392.4,
      temperature: 42,
      visibleDamage: "Detected",
      swelling: "Yes",
      leakage: "No",
      safetyInspection: "Failed",
      usageHistory: "Abnormal"
    },
    result: {
      safetyStatus: "FAIL",
      health: "38%",
      physicalCondition: "DAMAGED",
      recoveryPotential: "LOW",
      recommendedPath: "RECYCLING",
      confidence: 97,
      riskLevel: "HIGH",
      reasoning: "Configured safety criteria were not satisfied. Second-life use and repurposing are blocked in the prototype decision logic, with recycling selected as the safer pathway.",
      rejectionExplanation: "Predefined prototype safety criteria were not satisfied. Second-life use and repurposing are therefore blocked, while recycling is recommended as the safer recovery pathway.",
      safetyChecks: [
        { title: "Temperature within acceptable range", passed: false, detail: "42°C (Elevated thermal anomaly)" },
        { title: "No visible damage", passed: false, detail: "Module casing dent detected" },
        { title: "No swelling detected", passed: false, detail: "Swelling expansion flagged" },
        { title: "No leakage detected", passed: true, detail: "No liquid leakage" },
        { title: "Safety inspection passed", passed: false, detail: "Failed prototype safety assessment criteria" }
      ],
      pathwayMatrix: [
        { path: "Second-life", status: "✕ BLOCKED", approved: false, disabled: true, note: "BLOCKED: Thermal runaway hazard under load." },
        { path: "Repurposing", status: "✕ BLOCKED", approved: false, disabled: true, note: "BLOCKED: Grid connection denied due to structural swelling." },
        { path: "Recycling", status: "✓ RECOMMENDED", approved: true, disabled: false, note: "Controlled automated discharge & closed-loop black mass extraction." },
        { path: "Disposal", status: "Fallback", approved: false, disabled: true, note: "Controlled dismantling fallback." }
      ]
    }
  }
];

export const MOCK_INSIGHTS = [
  {
    id: "ins-1",
    type: "High Priority",
    category: "C&D Waste",
    title: "AI assessment identified a high-value concrete recovery opportunity.",
    description: "Prototype analysis indicates that the assessed concrete material has high recovery potential and may be suitable for direct reuse, subject to physical inspection. Estimated savings: 5.2 tonnes CO₂ and ₹185,000 in material value.",
    impact: "High Potential",
    metric: "Est. 5.2 t CO₂ Offset",
    date: "Just now"
  },
  {
    id: "ins-2",
    type: "Efficiency Alert",
    category: "System Performance",
    title: "Direct reuse is currently the most common recovery pathway.",
    description: "Prototype analysis indicates that 34% of assessed C&D materials qualified for direct structural reuse, reducing landfill dumping and aggregate crushing.",
    impact: "+28% Yield (Est.)",
    metric: "Est. ₹420,000 Yield",
    date: "2 hours ago"
  },
  {
    id: "ins-3",
    type: "Safety Guardrail",
    category: "EV Battery Safety",
    title: "Several battery assessments were rejected for second-life use due to failed safety indicators.",
    description: "Prototype safety check flagged thermal swelling and low State of Health (<50%), enforcing zero second-life deployment for compromised packs.",
    impact: "Zero Hazard",
    metric: "100% Safety Intercept",
    date: "1 day ago"
  },
  {
    id: "ins-4",
    type: "Safety Protocol",
    category: "EV Battery Safety",
    title: "Recycling is recommended when predefined battery safety criteria are not satisfied.",
    description: "When State of Health drops below 50% or visible casing swelling is detected, second-life routing is blocked in prototype decision logic and closed-loop recycling is recommended.",
    impact: "Prototype Protocol",
    metric: "Est. 18.4 T Diverted",
    date: "2 days ago"
  }
];

export const ANALYTICS_DATA = {
  pathwayDistribution: [
    { name: "Direct Reuse", value: 34, color: "#10b981" },
    { name: "Refurbishment", value: 24, color: "#06b6d4" },
    { name: "Repurposing", value: 22, color: "#3b82f6" },
    { name: "Recycling", value: 16, color: "#8b5cf6" },
    { name: "Disposal", value: 4, color: "#ef4444" }
  ],
  materialBreakdown: [
    { material: "Concrete Slabs", reuse: 45, recycling: 30, disposal: 5 },
    { material: "Structural Steel", reuse: 70, recycling: 25, disposal: 0 },
    { material: "Clay Bricks", reuse: 25, recycling: 55, disposal: 10 },
    { material: "Timber Beams", reuse: 40, recycling: 35, disposal: 5 }
  ],
  evBatteryOutcomes: [
    { chemistry: "NMC Packs", secondLife: 58, repurposing: 22, recycling: 18, rejected: 2 },
    { chemistry: "LFP Packs", secondLife: 64, repurposing: 26, recycling: 8, rejected: 2 },
    { chemistry: "NCA Packs", secondLife: 42, repurposing: 28, recycling: 24, rejected: 6 }
  ],
  monthlyDiversion: [
    { month: "Jan", cdDiversion: 42, evDiversion: 12, totalValue: 480 },
    { month: "Feb", cdDiversion: 55, evDiversion: 18, totalValue: 620 },
    { month: "Mar", cdDiversion: 68, evDiversion: 24, totalValue: 790 },
    { month: "Apr", cdDiversion: 82, evDiversion: 31, totalValue: 980 },
    { month: "May", cdDiversion: 94, evDiversion: 40, totalValue: 1240 },
    { month: "Jun", cdDiversion: 110, evDiversion: 52, totalValue: 1560 }
  ]
};
