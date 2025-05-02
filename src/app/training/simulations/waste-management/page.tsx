'use client';

import React from 'react';
import SimulationBase from '@/components/training/simulation-base';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Recycle, Biohazard, AlertTriangle } from 'lucide-react';

// Define the steps for the waste management simulation (Waste Segregation Focus)
const wasteManagementSteps = [
    { id: 'wms001', description: 'Perform hand hygiene and don gloves', isCompleted: false, isCritical: true },
    { id: 'wms002', description: 'Identify waste item: Empty water bottle', isCompleted: false },
    { id: 'wms003', description: 'Place empty water bottle in the regular trash or recycling bin (based on facility policy)', isCompleted: false },
    { id: 'wms004', description: 'Identify waste item: Used paper towels (not visibly soiled with blood/OPIM)', isCompleted: false },
    { id: 'wms005', description: 'Place used paper towels in the regular trash bin', isCompleted: false },
    { id: 'wms006', description: 'Identify waste item: Blood-saturated gauze pad', isCompleted: false, isCritical: true },
    { id: 'wms007', description: 'Place blood-saturated gauze pad in the red biohazard bag/container', details: 'Do not compress or manually handle the waste excessively.', isCompleted: false, isCritical: true },
    { id: 'wms008', description: 'Identify waste item: Discarded patient meal tray (no sharps, no visible blood)', isCompleted: false },
    { id: 'wms009', description: 'Place meal tray in the regular trash bin', isCompleted: false },
    { id: 'wms010', description: 'Identify waste item: Used syringe with needle attached', isCompleted: false, isCritical: true },
    { id: 'wms011', description: 'Immediately place the used syringe/needle into a designated, puncture-resistant sharps container', details: 'Do NOT recap, bend, or break needles. Do not overfill container.', isCompleted: false, isCritical: true },
    { id: 'wms012', description: 'Check fullness of regular trash bin; if > 3/4 full, tie bag securely', isCompleted: false },
    { id: 'wms013', description: 'Check fullness of biohazard bin; if > 3/4 full, close/seal container per policy', isCompleted: false },
    { id: 'wms014', description: 'Check fullness of sharps container; if > 3/4 full, close securely and prepare for disposal/replacement', isCompleted: false },
    { id: 'wms015', description: 'Transport tied/closed waste bags/containers appropriately (avoid dragging, use designated carts)', isCompleted: false },
    { id: 'wms016', description: 'Dispose of waste in designated holding areas according to type (regular, biohazard, sharps)', isCompleted: false },
    { id: 'wms017', description: 'Doff gloves and perform hand hygiene after handling waste', isCompleted: false, isCritical: true },
];

// Simple evaluation logic for waste management segregation
const evaluateWasteManagement = (completedSteps: any[]) => {
    const totalSteps = wasteManagementSteps.length;
    let correctCount = 0;
    let missedCriticalCount = 0;
    const missedSteps = [];

    // Focus on correct placement steps for scoring accuracy
    const placementChecks = [
        { id: 'wms003', correct: true }, // Assuming regular trash/recycle is checked
        { id: 'wms005', correct: true }, // Assuming regular trash is checked
        { id: 'wms007', correct: true }, // Assuming biohazard is checked
        { id: 'wms009', correct: true }, // Assuming regular trash is checked
        { id: 'wms011', correct: true }, // Assuming sharps is checked
    ];

    wasteManagementSteps.forEach(step => {
        const completedStep = completedSteps.find(cs => cs.id === step.id);
        const placementCheck = placementChecks.find(pc => pc.id === step.id);

        if (completedStep?.isCompleted) {
             if (placementCheck) {
                 // For placement steps, just count as completed for now (real sim needs validation)
                 correctCount++;
             } else {
                 // For procedural steps, assume correct if checked
                 correctCount++;
             }
        } else {
            // Step was not checked
            missedSteps.push(step);
            if (step.isCritical) {
                missedCriticalCount++;
            }
        }
    });

    const score = (correctCount / totalSteps) * 100;
     // Stricter passing: Must get all critical steps right (PPE, specific waste placements)
     const passed = score >= 95 && missedCriticalCount === 0;

     let message = '';
     if (passed) {
        message = 'Excellent! Waste segregation and handling procedures followed correctly.';
    } else if (missedCriticalCount > 0) {
        message = 'Critical safety or disposal steps were missed. Incorrect waste handling poses significant risks.';
    } else {
        message = `Needs improvement. Score ${score.toFixed(0)}% suggests errors in procedure or segregation. Review policies.`;
    }

    return {
        score,
        passed,
        message,
        missedSteps: passed ? [] : missedSteps,
    };
};


const WasteManagementSimulationPage: React.FC = () => {
    const scenario = "Scenario: You are clearing waste from a patient room. Identify the following items and determine the correct disposal container based on standard hospital policies.";

    return (
        <SimulationBase
            title="Waste Management & Segregation Simulation"
            scenario={scenario}
            initialSteps={wasteManagementSteps.map(step => ({ ...step, isCompleted: false }))}
            onComplete={evaluateWasteManagement}
        >
             <Alert className="mb-4 border-orange-300 bg-orange-50 dark:border-orange-700 dark:bg-orange-900/30">
                 <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                 <AlertTitle className="text-orange-700 dark:text-orange-300">Important Note</AlertTitle>
                 <AlertDescription className="text-orange-600 dark:text-orange-400">
                    Proper waste segregation is crucial for safety and compliance. Misplacing items like sharps (<AlertTriangle className="inline h-3 w-3"/>) or biohazard materials (<Biohazard className="inline h-3 w-3"/>) can cause injury and regulatory fines. Regular trash (<Recycle className="inline h-3 w-3"/>) must be free of regulated items. Critical steps are marked <span className="font-bold text-destructive">*</span>.
                 </AlertDescription>
            </Alert>
            <p className="text-sm text-muted-foreground mb-4">
                For each item identified, select the step corresponding to its correct disposal. Also check off procedural steps like PPE use and transport.
            </p>
        </SimulationBase>
    );
};

export default WasteManagementSimulationPage;