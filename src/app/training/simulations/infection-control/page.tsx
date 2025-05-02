'use client';

import React from 'react';
import SimulationBase from '@/components/training/simulation-base';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

// Define the steps for the infection control simulation (Spill Response)
const infectionControlSteps = [
    { id: 'ics001', description: 'Identify the spill (e.g., blood, body fluid)', isCompleted: false, isCritical: true },
    { id: 'ics002', description: 'Alert others and secure the area (use wet floor signs)', isCompleted: false },
    { id: 'ics003', description: 'Perform hand hygiene', isCompleted: false, isCritical: true },
    { id: 'ics004', description: 'Gather necessary supplies (spill kit, PPE, disinfectant, waste bags)', isCompleted: false },
    { id: 'ics005', description: 'Don appropriate PPE (gloves, gown, eye protection/face shield)', isCompleted: false, isCritical: true },
    { id: 'ics006', description: 'Contain the spill using absorbent material from the kit', isCompleted: false },
    { id: 'ics007', description: 'Carefully remove absorbed material and place in biohazard bag', isCompleted: false },
    { id: 'ics008', description: 'Apply appropriate EPA-registered disinfectant to the spill area', isCompleted: false, isCritical: true },
    { id: 'ics009', description: 'Allow disinfectant to sit for the required contact/dwell time', details: 'Consult product label for specific time', isCompleted: false, isCritical: true },
    { id: 'ics010', description: 'Wipe up the disinfectant residue', isCompleted: false },
    { id: 'ics011', description: 'Clean the area again with detergent/water if necessary', isCompleted: false },
    { id: 'ics012', description: 'Place all contaminated materials (PPE, cleaning supplies) in biohazard bag', isCompleted: false },
    { id: 'ics013', description: 'Securely close the biohazard bag', isCompleted: false },
    { id: 'ics014', description: 'Doff PPE carefully in the correct order, avoiding self-contamination', isCompleted: false, isCritical: true },
    { id: 'ics015', description: 'Perform thorough hand hygiene', isCompleted: false, isCritical: true },
    { id: 'ics016', description: 'Dispose of the biohazard bag according to facility policy', isCompleted: false },
    { id: 'ics017', description: 'Remove wet floor signs once area is dry and safe', isCompleted: false },
];

// Simple evaluation logic for infection control spill
const evaluateInfectionControl = (completedSteps: any[]) => {
    const totalSteps = infectionControlSteps.length;
    let correctCount = 0;
    let missedCriticalCount = 0;
    const missedSteps = [];

    infectionControlSteps.forEach(step => {
        const completedStep = completedSteps.find(cs => cs.id === step.id);
        if (completedStep?.isCompleted) {
             // Basic: Assume if checked, it's correct.
             correctCount++;
        } else {
            missedSteps.push(step);
            if (step.isCritical) {
                missedCriticalCount++;
            }
        }
    });

    const score = (correctCount / totalSteps) * 100;
    const passed = score >= 90 && missedCriticalCount === 0; // Higher threshold for safety-critical tasks

    let message = '';
     if (passed) {
        message = 'Excellent! Spill response procedures followed correctly.';
    } else if (missedCriticalCount > 0) {
        message = 'Critical safety steps were missed. This requires immediate review and correction.';
    } else {
        message = `Needs improvement. Score ${score.toFixed(0)}% is below passing threshold. Review the steps carefully.`;
    }


    return {
        score,
        passed,
        message,
        missedSteps: passed ? [] : missedSteps,
    };
};


const InfectionControlSimulationPage: React.FC = () => {
    const scenario = "Scenario: You encounter a small spill of blood on the floor in a patient hallway. Simulate the correct procedure for cleaning and disinfecting the spill.";

    return (
        <SimulationBase
            title="Infection Control Simulation: Blood Spill Response"
            scenario={scenario}
            initialSteps={infectionControlSteps.map(step => ({ ...step, isCompleted: false }))}
            onComplete={evaluateInfectionControl}
        >
             <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Safety Alert</AlertTitle>
                <AlertDescription>
                    Handling blood and body fluid spills requires strict adherence to safety protocols to prevent exposure to pathogens. Follow all steps precisely. Critical steps are marked with <span className="font-bold">*</span>.
                </AlertDescription>
            </Alert>
             <p className="text-sm text-muted-foreground mb-4">
                Check off each step as you perform it mentally or through role-play. Accuracy in sequence and PPE usage is crucial.
            </p>
        </SimulationBase>
    );
};

export default InfectionControlSimulationPage;