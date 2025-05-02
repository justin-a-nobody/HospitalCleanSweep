'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Sparkle, AlertTriangle, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface SimulationStep {
    id: string;
    description: string;
    details?: string; // Optional extra info
    isCompleted: boolean;
    isCritical?: boolean; // Optional: Mark steps that are crucial
}

interface SimulationFeedback {
    score: number;
    passed: boolean;
    message: string;
    missedSteps?: SimulationStep[];
}

interface SimulationBaseProps {
    title: string;
    scenario: string;
    initialSteps: SimulationStep[];
    children?: React.ReactNode; // For additional content specific to the simulation
    onComplete: (steps: SimulationStep[]) => SimulationFeedback; // Function to evaluate steps and return feedback
}

const SimulationBase: React.FC<SimulationBaseProps> = ({
    title,
    scenario,
    initialSteps,
    children,
    onComplete
}) => {
    const [steps, setSteps] = useState<SimulationStep[]>(initialSteps);
    const [progress, setProgress] = useState(0);
    const [isClient, setIsClient] = useState(false);
    const [feedback, setFeedback] = useState<SimulationFeedback | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const completedCount = steps.filter(step => step.isCompleted).length;
        setProgress(steps.length > 0 ? (completedCount / steps.length) * 100 : 0);
    }, [steps]);

    const handleStepToggle = (stepId: string) => {
         if (feedback) return; // Don't allow changes after submission
        setSteps(prevSteps =>
            prevSteps.map(step =>
                step.id === stepId ? { ...step, isCompleted: !step.isCompleted } : step
            )
        );
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        // Simulate evaluation delay
        setTimeout(() => {
            const result = onComplete(steps);
            setFeedback(result);
            setIsSubmitting(false);
        }, 500);
    };

    const handleRestart = () => {
        setSteps(initialSteps.map(s => ({ ...s, isCompleted: false }))); // Reset completion state
        setFeedback(null);
        setIsSubmitting(false);
        setProgress(0);
    };

    if (!isClient) {
        return (
            <div className="flex items-center justify-center p-8 bg-muted/50 rounded-lg min-h-[400px]">
                <Sparkle className="w-6 h-6 animate-spin text-primary mr-3" />
                <p className="text-muted-foreground">Loading simulation...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
             <Button variant="outline" size="sm" asChild className="mb-4">
                <Link href="/training/simulations">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Simulations List
                </Link>
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">{title}</CardTitle>
                    <CardDescription>{scenario}</CardDescription>
                    {!feedback && (
                         <div className="pt-2">
                            <Label className="text-xs text-muted-foreground">Simulation Progress</Label>
                            <Progress value={progress} className="w-full h-2 mt-1" />
                            <span className="text-xs font-medium text-muted-foreground block text-right mt-1">{Math.round(progress)}% Complete</span>
                        </div>
                    )}
                </CardHeader>
                <CardContent className="space-y-4">
                    {children}

                    <h3 className="font-semibold text-lg border-b pb-2">Simulation Steps</h3>
                    {feedback && (
                         <div className={cn(
                             "p-4 rounded-md border mb-4",
                             feedback.passed ? "bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-700" : "bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-700"
                         )}>
                             <div className="flex items-center gap-2 mb-2">
                                {feedback.passed ? <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400"/> : <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400"/>}
                                <p className={cn("font-semibold", feedback.passed ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300")}>
                                    Result: {feedback.message} (Score: {feedback.score.toFixed(0)}%)
                                </p>
                             </div>
                             {feedback.missedSteps && feedback.missedSteps.length > 0 && (
                                <div className="text-sm">
                                     <p className="font-medium text-red-700 dark:text-red-300">Areas for Improvement:</p>
                                    <ul className="list-disc pl-5 mt-1 text-red-600/90 dark:text-red-400/90">
                                        {feedback.missedSteps.map(step => (
                                            <li key={step.id}>{step.description}{step.isCritical ? <span className="font-bold ml-1">(Critical Step)</span> : ''}</li>
                                        ))}
                                    </ul>
                                </div>
                             )}
                         </div>
                    )}

                    <div className="space-y-3">
                        {steps.map((step) => (
                            <div key={step.id} className="flex items-start space-x-3 p-3 rounded-md border bg-card hover:bg-secondary/50 transition-colors">
                                <Checkbox
                                    id={`step-${step.id}`}
                                    checked={step.isCompleted}
                                    onCheckedChange={() => handleStepToggle(step.id)}
                                    disabled={!!feedback || isSubmitting} // Disable after submission
                                    aria-labelledby={`label-step-${step.id}`}
                                />
                                <div className="flex-1">
                                <Label
                                    htmlFor={`step-${step.id}`}
                                    id={`label-step-${step.id}`}
                                    className={cn(
                                        "text-sm font-medium",
                                        feedback && step.isCompleted && !feedback.missedSteps?.some(ms => ms.id === step.id) && "text-green-700 dark:text-green-300",
                                        feedback && !step.isCompleted && feedback.missedSteps?.some(ms => ms.id === step.id) && "text-red-700 dark:text-red-300",
                                        feedback && step.isCompleted && feedback.missedSteps?.some(ms => ms.id === step.id) && "text-red-700 dark:text-red-300 line-through", // Incorrectly marked as completed
                                        !feedback && step.isCompleted && "line-through text-muted-foreground",
                                        !feedback && "text-foreground",
                                        (!!feedback || isSubmitting) ? "cursor-default" : "cursor-pointer"
                                     )}
                                >
                                    {step.description} {step.isCritical && <span className="text-destructive font-bold ml-1">*</span>}
                                </Label>
                                 {step.details && <p className="text-xs text-muted-foreground mt-1">{step.details}</p>}
                                 {/* Show feedback per step if available */}
                                 {feedback && !step.isCompleted && feedback.missedSteps?.some(ms => ms.id === step.id) && (
                                     <p className="text-xs text-red-600 dark:text-red-400 mt-1">Missed {step.isCritical ? 'critical' : ''} step.</p>
                                 )}
                                 {feedback && step.isCompleted && feedback.missedSteps?.some(ms => ms.id === step.id) && (
                                     <p className="text-xs text-red-600 dark:text-red-400 mt-1">This step was marked but should not have been, or was performed incorrectly.</p>
                                 )}
                                 {feedback && step.isCompleted && !feedback.missedSteps?.some(ms => ms.id === step.id) && (
                                     <p className="text-xs text-green-600 dark:text-green-400 mt-1">Correctly performed.</p>
                                 )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 border-t pt-4">
                     {feedback ? (
                        <Button onClick={handleRestart} variant="outline" disabled={isSubmitting}>
                            <RotateCcw className="mr-2 h-4 w-4" /> Restart Simulation
                        </Button>
                     ) : (
                        <Button onClick={handleSubmit} disabled={isSubmitting}>
                             {isSubmitting ? (
                                <>
                                <Sparkle className="mr-2 h-4 w-4 animate-spin" /> Evaluating...
                                </>
                             ) : (
                                 <>
                                <CheckCircle className="mr-2 h-4 w-4" /> Complete Simulation
                                </>
                             )}
                        </Button>
                     )}
                </CardFooter>
            </Card>
        </div>
    );
};

export default SimulationBase;