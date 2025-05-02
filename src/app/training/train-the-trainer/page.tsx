// src/app/training/train-the-trainer/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Users, ShieldAlert, Building, ChevronRight, ArrowLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// Mock data structure for Train the Trainer modules
interface TrainTheTrainerModuleSummary {
    id: string;
    title: string;
    description: string;
    focusAreas: string[]; // e.g., 'Teaching Methods', 'OSHA Standards Deep Dive'
    icon: React.ElementType;
    // Optional: Add prerequisites if needed
    // prerequisiteId?: string | null;
}

// Mock data fetching function (replace with actual data fetching)
async function getTrainTheTrainerModulesSummary(): Promise<TrainTheTrainerModuleSummary[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 50));

  const modules: TrainTheTrainerModuleSummary[] = [
    {
        id: 'ttt001',
        title: 'Training on OSHA Standards for EVS',
        description: 'Equip trainers to effectively teach OSHA regulations relevant to environmental services, including HazCom and Bloodborne Pathogens.',
        focusAreas: ['OSHA Deep Dive', 'Teaching HazCom', 'BBP Training Techniques', 'Record Keeping'],
        icon: ShieldAlert,
    },
    {
        id: 'ttt002',
        title: 'Training on Joint Commission EOC & IC Standards',
        description: 'Prepare trainers to educate staff on key Joint Commission Environment of Care and Infection Control standards impacting EVS.',
        focusAreas: ['JC Standards Explained', 'Survey Readiness Training', 'Adult Learning Principles', 'Competency Assessment'],
        icon: Building,
    },
    {
        id: 'ttt003',
        title: 'EVS Leadership & Training Delivery',
        description: 'Develop leadership skills for trainers, focusing on effective communication, coaching, and delivering impactful training sessions.',
        focusAreas: ['Training Delivery', 'Coaching Techniques', 'Feedback Methods', 'Program Management'],
        icon: Users,
    },
  ];

  return modules;
}

export default function TrainTheTrainerListPage() {
    const [modules, setModules] = useState<TrainTheTrainerModuleSummary[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadModules() {
            try {
                setIsLoading(true);
                const data = await getTrainTheTrainerModulesSummary();
                setModules(data);
                setError(null);
            } catch (err) {
                console.error("Failed to load Train the Trainer modules:", err);
                setError("Could not load trainer modules. Please try again later.");
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
              <h1 className="text-3xl font-bold tracking-tight">Train the Trainer Modules</h1>
              {/* Placeholder Button */}
            </div>
            <p className="text-muted-foreground">Loading available trainer modules...</p>
             {/* Skeleton Loader */}
             <div className="grid gap-4 md:grid-cols-2">
                {[1, 2].map((i) => (
                     <Card key={i} className="flex flex-col animate-pulse">
                         <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
                            <div className="space-y-2 flex-1">
                                <div className="h-6 bg-muted rounded w-3/4"></div>
                                <div className="h-4 bg-muted rounded w-full"></div>
                                <div className="flex flex-wrap gap-1 pt-1">
                                    <div className="h-4 bg-muted rounded w-16"></div>
                                    <div className="h-4 bg-muted rounded w-20"></div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2 ml-4 flex-shrink-0">
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
            <h1 className="text-2xl font-semibold mb-4">No Trainer Modules Found</h1>
            <p className="text-muted-foreground mb-6">No 'Train the Trainer' modules have been added yet.</p>
             <div className="flex gap-4">
                <Button asChild variant="outline">
                    <Link href="/training">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Training Overview
                    </Link>
                </Button>
                <Button disabled> {/* Add functionality later */}
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Trainer Module
                </Button>
            </div>
        </div>
      );
    }

  return (
     <TooltipProvider>
        <div className="space-y-6">
            <Button variant="outline" size="sm" asChild className="mb-4">
                <Link href="/training">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Training Overview
                </Link>
            </Button>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-3xl font-bold tracking-tight">Train the Trainer Modules</h1>
              <Button disabled> {/* Add functionality later */}
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Trainer Module
              </Button>
          </div>
          <p className="text-muted-foreground">
            Select a module below to enhance your skills in training EVS staff on critical standards and procedures.
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => {
                 const IconComponent = module.icon;
                 const tooltipText = `View Module ${module.title}`;

                 return (
                     <Card key={module.id} className={cn("flex flex-col transition-shadow hover:shadow-md")}>
                        <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
                            <div className="space-y-1.5 flex-1">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                <IconComponent className="h-5 w-5 text-primary"/> {module.title}
                                </CardTitle>
                                <CardDescription>{module.description}</CardDescription>
                                <div className="flex flex-wrap gap-1 pt-1">
                                {module.focusAreas.map((area) => (
                                    <Badge key={area} variant="secondary" className="text-xs px-1.5 py-0.5">
                                    {area}
                                    </Badge>
                                ))}
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2 ml-4 flex-shrink-0">
                                {/* Removed completion badge for now, add later if needed */}
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            asChild
                                            className="mt-1"
                                        >
                                            <Link href={`/training/train-the-trainer/${module.id}`} aria-label={`View Module ${module.title}`}>
                                                <ChevronRight className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{tooltipText}</p>
                                    </TooltipContent>
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
