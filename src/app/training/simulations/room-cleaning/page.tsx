'use client';

import React from 'react';
import SimulationBase from '@/components/training/simulation-base';

// Define the steps for the room cleaning simulation
const roomCleaningSteps = [
    { id: 'rcs001', description: 'Gather all necessary supplies (cleaning cart, chemicals, PPE, liners, mop, etc.)', isCompleted: false },
    { id: 'rcs002', description: 'Perform hand hygiene and don appropriate PPE (gloves, gown/mask if required)', isCompleted: false, isCritical: true },
    { id: 'rcs003', description: 'Announce presence before entering the room', isCompleted: false },
    { id: 'rcs004', description: 'Empty trash receptacles and replace liners', isCompleted: false },
    { id: 'rcs005', description: 'High dust surfaces (lights, vents, tops of cabinets)', isCompleted: false },
    { id: 'rcs006', description: 'Clean and disinfect high-touch surfaces (bed rails, call button, doorknobs, light switches, phone, overbed table)', details: 'Use EPA-approved disinfectant, follow dwell time', isCompleted: false, isCritical: true },
    { id: 'rcs007', description: 'Clean patient bed frame and mattress surface', isCompleted: false },
    { id: 'rcs008', description: 'Clean other furniture (chairs, bedside cabinet)', isCompleted: false },
    { id: 'rcs009', description: 'Clean bathroom sink, mirror, and counter', isCompleted: false },
    { id: 'rcs010', description: 'Clean shower/tub surfaces', isCompleted: false },
    { id: 'rcs011', description: 'Clean toilet (outside surfaces first, then bowl)', isCompleted: false, isCritical: true },
    { id: 'rcs012', description: 'Restock bathroom supplies (soap, paper towels, toilet paper)', isCompleted: false },
    { id: 'rcs013', description: 'Mop bathroom floor', isCompleted: false },
    { id: 'rcs014', description: 'Mop patient room floor (start from farthest point, move towards door)', isCompleted: false },
    { id: 'rcs015', description: 'Visually inspect room for cleanliness', isCompleted: false },
    { id: 'rcs016', description: 'Doff PPE correctly and perform hand hygiene', isCompleted: false, isCritical: true },
    { id: 'rcs017', description: 'Remove cleaning cart and secure supplies', isCompleted: false },
];

// Simple evaluation logic (can be made more complex)
const evaluateRoomCleaning = (completedSteps: any[]) => {
    const totalSteps = roomCleaningSteps.length;
    let correctCount = 0;
    let missedCriticalCount = 0;
    const missedSteps = [];

    roomCleaningSteps.forEach(step => {
        const completedStep = completedSteps.find(cs => cs.id === step.id);
        if (completedStep?.isCompleted) {
            // Basic: Assume if checked, it's correct for now. Real sim would need more logic.
            correctCount++;
        } else {
            // Step was not checked
            missedSteps.push(step);
            if (step.isCritical) {
                missedCriticalCount++;
            }
        }
    });

    const score = (correctCount / totalSteps) * 100;
    const passed = score >= 85 && missedCriticalCount === 0; // Example passing criteria

    let message = '';
    if (passed) {
        message = 'Excellent work! Room cleaning procedures followed correctly.';
    } else if (missedCriticalCount > 0) {
        message = 'Critical steps were missed. Review procedures and try again.';
    } else {
        message = `Needs improvement. Score ${score.toFixed(0)}% is below passing threshold.`;
    }


    return {
        score,
        passed,
        message,
        missedSteps: passed ? [] : missedSteps, // Only show missed steps if failed
    };
};


const RoomCleaningSimulationPage: React.FC = () => {
    const scenario = "Simulate a standard daily cleaning procedure for an occupied patient room. Follow all required steps for safety and thoroughness.";

    return (
        <SimulationBase
            title="Standard Room Cleaning Simulation"
            scenario={scenario}
            initialSteps={roomCleaningSteps.map(step => ({ ...step, isCompleted: false }))} // Ensure initial state is fresh
            onComplete={evaluateRoomCleaning}
        >
            <p className="text-sm text-muted-foreground mb-4">
                Check off each step as you mentally (or physically, if role-playing) perform it. Pay close attention to critical steps marked with <span className="text-destructive font-bold">*</span>.
            </p>
        </SimulationBase>
    );
};

export default RoomCleaningSimulationPage;