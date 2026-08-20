// Initial mock data & dynamic evaluation engines for RE:RECOVER AI (Prototype & Demonstration Data)

export const evaluateEvBattery = (dataToUse) => {
  const sohVal = Number(dataToUse.soh) || 0;
  const tempVal = Number(dataToUse.temperature) || 0;

  const sohPassed = sohVal >= 50;
  const tempPassed = tempVal <= 40;
  const damagePassed = dataToUse.visibleDamage === 'None';
  const swellingPassed = dataToUse.swelling === 'No';
  const leakagePassed = dataToUse.leakage === 'No';
  const inspectionPassed = dataToUse.safetyInspection === 'Passed';

  // Physical condition is DAMAGED ONLY if physical indicators fail
  const hasPhysicalDamage = !damagePassed || !swellingPassed || !leakagePassed || !inspectionPassed;
  const physicalCondition = hasPhysicalDamage ? "DAMAGED" : "GOOD";

  const isOverallSafe = sohPassed && tempPassed && damagePassed && swellingPassed && leakagePassed && inspectionPassed;
  const safetyStatus = isOverallSafe ? "SAFE" : "FAIL";

  const safetyChecks = [
    {
      title: "State of Health threshold (>= 50%)",
      passed: sohPassed,
      detail: sohPassed 
        ? `${sohVal}% SoH (minimum required: 50%)` 
        : `${sohVal}% SoH (minimum required: 50%)`
    },
    {
      title: "Temperature within acceptable range (<= 40°C)",
      passed: tempPassed,
      detail: tempPassed 
        ? `${tempVal}°C (Limit: 40°C)` 
        : `${tempVal}°C (Elevated thermal anomaly, Limit: 40°C)`
    },
    {
      title: "No visible physical damage",
      passed: damagePassed,
      detail: damagePassed ? "Casing & terminal integrity intact" : "Visible physical damage detected"
    },
    {
      title: "No swelling detected",
      passed: swellingPassed,
      detail: swellingPassed ? "0mm expansion" : "Cell/casing swelling detected"
    },
    {
      title: "No leakage detected",
      passed: leakagePassed,
      detail: leakagePassed ? "No liquid leakage" : "Electrolyte leakage detected"
    },
    {
      title: "Safety inspection clearance",
      passed: inspectionPassed,
      detail: inspectionPassed ? "Passed prototype safety inspection" : "Failed prototype safety inspection"
    }
  ];

  // Reasoning text
  let reasoning = "";
  let rejectionExplanation = "";

  if (isOverallSafe) {
    reasoning = `Prototype safety assessment indicates that the entered battery parameters satisfy configured demonstration criteria (SoH ${sohVal}%, physical condition intact). Second-life use is therefore ranked as the preferred pathway.`;
    rejectionExplanation = "";
  } else {
    const failedList = [];
    if (!sohPassed) failedList.push(`State of Health (${sohVal}%) is below the 50% minimum threshold`);
    if (!tempPassed) failedList.push(`Operating temperature (${tempVal}°C) exceeds the 40°C limit`);
    if (!damagePassed) failedList.push(`Visible physical damage detected`);
    if (!swellingPassed) failedList.push(`Casing swelling detected`);
    if (!leakagePassed) failedList.push(`Electrolyte leakage detected`);
    if (!inspectionPassed) failedList.push(`Safety inspection failed`);

    const summary = failedList.join('; ');

    if (!sohPassed && !hasPhysicalDamage && tempPassed) {
      reasoning = `State of Health (${sohVal}%) is below the 50% minimum threshold required for second-life stationary storage. Second-life use and repurposing are blocked in prototype decision logic, with recycling selected as the safer recovery pathway.`;
      rejectionExplanation = `State of Health (${sohVal}%) is below the 50% minimum threshold required for second-life deployment. Second-life use and repurposing are therefore blocked, while recycling is recommended as the safer recovery pathway.`;
    } else {
      reasoning = `Configured safety criteria were not satisfied (${summary}). Second-life use and repurposing are blocked in prototype decision logic, with recycling selected as the safer pathway.`;
      rejectionExplanation = `Predefined prototype safety criteria were not satisfied (${summary}). Second-life use and repurposing are therefore blocked, while recycling is recommended as the safer recovery pathway.`;
    }
  }

  const pathwayMatrix = isOverallSafe
    ? [
        { path: "Second-life", status: "✓ Approved", approved: true, disabled: false, note: "Stationary BESS grid backup storage approved." },
        { path: "Repurposing", status: "✓ Approved", approved: true, disabled: false, note: "Telecom battery module re-assembly approved." },
        { path: "Recycling", status: "Fallback", approved: false, disabled: false, note: "Hydrometallurgy available if second-life demand is unmet." },
        { path: "Disposal", status: "Not required", approved: false, disabled: true, note: "Environmentally prohibited." }
      ]
    : [
        { path: "Second-life", status: "✕ BLOCKED", approved: false, disabled: true, note: !sohPassed ? "BLOCKED: SoH below 50% threshold." : "BLOCKED: Thermal runaway / physical hazard." },
        { path: "Repurposing", status: "✕ BLOCKED", approved: false, disabled: true, note: !sohPassed ? "BLOCKED: SoH below 50% threshold." : "BLOCKED: Grid connection prohibited." },
        { path: "Recycling", status: "✓ RECOMMENDED", approved: true, disabled: false, note: "Controlled automated discharge & closed-loop hydrometallurgical recycling." },
        { path: "Disposal", status: "Fallback", approved: false, disabled: true, note: "Controlled dismantling fallback." }
      ];

  return {
    safetyStatus,
    health: `${sohVal}%`,
    physicalCondition,
    recoveryPotential: isOverallSafe ? "HIGH" : "LOW",
    recommendedPath: isOverallSafe ? "SECOND-LIFE / REPURPOSING" : "RECYCLING",
    confidence: isOverallSafe ? 91 : 97,
    riskLevel: isOverallSafe ? "Low" : "HIGH",
    reasoning,
    rejectionExplanation,
    safetyChecks,
    pathwayMatrix
  };
};

export const INITIAL_ASSESSMENTS = [];

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
      landfill: "1.80 Tonnes (Est.)",
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
      landfill: "1.25 Tonnes (Est.)",
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
      landfill: "0.85 Tonnes (Est.)",
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
      landfill: "3.10 Tonnes (Est.)",
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

const safeData = {
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
};

const unsafeData = {
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
};

export const MOCK_PRESETS_EV = [
  {
    id: "ev-safe-1",
    name: "SAFE BATTERY",
    type: "SAFE",
    data: safeData,
    result: evaluateEvBattery(safeData)
  },
  {
    id: "ev-unsafe-1",
    name: "UNSAFE BATTERY",
    type: "UNSAFE",
    data: unsafeData,
    result: evaluateEvBattery(unsafeData)
  }
];

export const MOCK_INSIGHTS = [];

export const ANALYTICS_DATA = {
  pathwayDistribution: [],
  materialBreakdown: [],
  evBatteryOutcomes: [],
  monthlyDiversion: []
};
