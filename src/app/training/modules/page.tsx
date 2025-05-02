// src/app/training/modules/page.tsx
"use client"; // Required for TooltipProvider and potentially state later

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen, ChevronRight, AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from 'react'; // Import useState and useEffect

// Mock data structure enhancement (matching detail page) - Assuming fetched data
interface ModuleSection {
    title: string;
    text: string;
}

interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswerIndex: number;
}

interface Resource {
    name: string;
    url: string;
}

interface TrainingModuleSummary {
    id: string;
    title: string;
    description: string;
    regulations: string[];
    completed: boolean; // User-specific completion status
    hasQuiz: boolean; // Indicate if a quiz exists
    // Optional: Add prerequisites if modules must be taken in order
    // prerequisiteId?: string | null;
}


// Mock data fetching function (replace with actual data fetching)
async function getTrainingModulesSummary(): Promise<TrainingModuleSummary[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 50));

  // Mock summary data derived from the detailed data
   const trainingModulesSummary: TrainingModuleSummary[] = [
        { id: 'tm001', title: 'Standard Cleaning Procedures', description: 'Protocols for routine and discharge cleaning in patient care areas.', regulations: ['JC', 'CDC', 'AHE'], completed: true, hasQuiz: true },
        { id: 'tm002', title: 'Hazardous Material Handling (HazCom)', description: 'Safe handling of cleaning chemicals and regulated medical waste.', regulations: ['OSHA'], completed: false, hasQuiz: true /*, prerequisiteId: 'tm001'*/ }, // Example prerequisite
        { id: 'tm003', title: 'Infection Control & Prevention', description: 'EVS role in preventing Healthcare-Associated Infections (HAIs).', regulations: ['JC', 'CDC', 'OSHA'], completed: false, hasQuiz: true /*, prerequisiteId: 'tm002'*/ },
        { id: 'tm004', title: 'Using Personal Protective Equipment (PPE)', description: 'Proper selection, use, and disposal of PPE.', regulations: ['OSHA', 'CDC'], completed: false, hasQuiz: true /*, prerequisiteId: 'tm003'*/ },
        { id: 'tm005', title: 'Joint Commission EVS Standards Focus', description: 'Key Environment of Care (EOC) and Infection Control (IC) requirements.', regulations: ['JC'], completed: false, hasQuiz: true /*, prerequisiteId: 'tm004'*/ },
    ];

    return trainingModulesSummary;
}

export default function TrainingModulesListPage() {
    const [modules, setModules] = useState<TrainingModuleSummary[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadModules() {
            try {
                setIsLoading(true);
                const data = await getTrainingModulesSummary();
                setModules(data);
                setError(null);
            } catch (err) {
                console.error("Failed to load training modules:", err);
                setError("Could not load training modules. Please try again later.");
                setModules([]);
            } finally {
                setIsLoading(false);
            }
        }
        loadModules();
    }, []);

     if (isLoading) {
       return (
         <div className="space-y-6">
            <Button variant="outline" size="sm" asChild className="mb-4 opacity-50 cursor-not-allowed">
                <span className="flex items-center"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Training Overview</span>
            </Button>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-3xl font-bold tracking-tight">Training Modules</h1>
              {/* Placeholder Button */}
            </div>
            <p className="text-muted-foreground">Loading available training modules...</p>
             {/* Skeleton Loader */}
             <div className="grid gap-4">
                {[1, 2, 3].map((i) => (
                     <Card key={i} className="flex flex-col animate-pulse">
                         <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
                            <div className="space-y-2 flex-1">
                                <div className="h-6 bg-muted rounded w-3/4"></div>
                                <div className="h-4 bg-muted rounded w-full"></div>
                                <div className="flex flex-wrap gap-1 pt-1">
                                    <div className="h-4 bg-muted rounded w-10"></div>
                                    <div className="h-4 bg-muted rounded w-12"></div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2 ml-4 flex-shrink-0">
                                <div className="h-5 bg-muted rounded-full w-20"></div>
                                <div className="h-8 w-8 bg-muted rounded-md mt-1"></div>
                            </div>
                         </CardHeader>
                     </Card>
                ))}
             </div>

         </div>
       );
     }

     if (error) {
         return (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
                <h1 className="text-2xl font-semibold mb-4">Error Loading Modules</h1>
                <p className="text-muted-foreground mb-6">{error}</p>
                 <Button asChild variant="outline">
                    <Link href="/training">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Training Overview
                    </Link>
                </Button>
            </div>
         );
     }

  if (modules.length === 0) {
      return (
         <div className="flex flex-col items-center justify-center h-full text-center p-4">
             <AlertTriangle className="w-12 h-12 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-semibold mb-4">No Training Modules Found</h1>
            <p className="text-muted-foreground mb-6">No training modules have been added yet.</p>
             <div className="flex gap-4">
                <Button asChild variant="outline">
                    <Link href="/training">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Training Overview
                    </Link>
                </Button>
                <Button disabled> {/* Add functionality later */}
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Module
                </Button>
            </div>
        </div>
      );
  }

  // Function to determine if a module is unlocked (based on prerequisites)
  // const isUnlocked = (module: TrainingModuleSummary) => {
  //   if (!module.prerequisiteId) return true;
  //   const prereq = modules.find(m => m.id === module.prerequisiteId);
  //   return prereq?.completed ?? false;
  // };

  return (
     <TooltipProvider>
        <div className="space-y-6">
            <Button variant="outline" size="sm" asChild className="mb-4">
                <Link href="/training">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Training Overview
                </Link>
            </Button>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-3xl font-bold tracking-tight">Available Training Modules</h1>
              <Button disabled> {/* Add functionality later */}
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Module
              </Button>
          </div>
          <p className="text-muted-foreground">
            Select a module below to begin or continue your training. Complete modules and quizzes to track your progress.
          </p>

          <div className="grid gap-4">
            {modules.map((module) => {
                 // const unlocked = isUnlocked(module); // Check if module is unlocked
                 const unlocked = true; // Simplified: Assume all are unlocked for now
                 const disabled = !unlocked || (!module.completed && module.hasQuiz && !unlocked); // More complex disable logic if needed
                 const tooltipText = !unlocked ? "Complete the previous module to unlock." : (module.hasQuiz && !module.completed ? "Complete the quiz to proceed." : `View Module ${module.title}`);

                 return (
                     <Card key={module.id} className={cn("flex flex-col transition-shadow hover:shadow-md", !unlocked && "opacity-60 bg-muted/50")}>
                        <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
                        <div className="space-y-1.5 flex-1">
                            <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-primary"/> {module.title}
                            </CardTitle>
                            <CardDescription>{module.description}</CardDescription>
                            <div className="flex flex-wrap gap-1 pt-1">
                            {module.regulations.map((reg) => (
                                <Badge key={reg} variant="secondary" className="text-xs px-1.5 py-0.5">
                                {reg}
                                </Badge>
                            ))}
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 ml-4 flex-shrink-0">
                            <Badge
                                variant={module.completed ? "default" : "outline"}
                                className={cn(
                                    "text-xs font-semibold px-2 py-1 rounded-full",
                                    module.completed
                                        ? 'border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-300'
                                        : 'border-yellow-500/50 bg-yellow-500/10 text-yellow-700 dark:text-yellow-300'
                                )}
                                >
                                {module.completed ? 'Completed' : 'In Progress'}
                            </Badge>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span tabIndex={disabled ? 0 : -1}> {/* Span for tooltip on disabled */}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            asChild={!disabled} // Only Link if not disabled
                                            disabled={disabled}
                                            className={cn("mt-1", disabled && "cursor-not-allowed opacity-50")}
                                            aria-disabled={disabled}
                                        >
                                            {!disabled ? (
                                                <Link href={`/training/modules/${module.id}`} aria-label={`View Module ${module.title}`}>
                                                    <ChevronRight className="h-4 w-4" />
                                                </Link>
                                            ) : (
                                                <div> {/* Placeholder for disabled */}
                                                    <ChevronRight className="h-4 w-4" />
                                                </div>
                                            )}
                                        </Button>
                                    </span>
                                </TooltipTrigger>
                                {disabled && (
                                    <TooltipContent>
                                        <p>{tooltipText}</p>
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        </div>
                        </CardHeader>
                    </Card>
                 );
            })}
          </div>
           <div className="flex justify-center mt-6">
             {/* <Button variant="outline">Load More</Button> */}
           </div>
        </div>
    </TooltipProvider>
  );
}
