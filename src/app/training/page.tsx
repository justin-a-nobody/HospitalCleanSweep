import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen, ChevronRight, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"; // Import Badge
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // Import Tooltip components
import { cn } from "@/lib/utils"; // Import cn utility

// Mock data structure enhancement (matching detail page)
interface Resource {
    name: string;
    url: string;
}

interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswerIndex: number;
}

interface ModuleSection {
    title: string;
    text: string;
}

interface TrainingModuleSummary {
    id: string;
    title: string;
    description: string;
    regulations: string[];
    completed: boolean;
    hasQuiz: boolean; // Indicate if a quiz exists
}


// Mock data fetching function (replace with actual data fetching)
// In a real app, this might fetch summary data, including completion status and if a quiz exists
async function getTrainingModulesSummary(): Promise<TrainingModuleSummary[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 50));

  // Mock summary data derived from the detailed data
  // Assume 'completed' reflects whether the user passed the quiz if one exists
   const trainingModulesSummary: TrainingModuleSummary[] = [
        { id: 'tm001', title: 'Standard Cleaning Procedures', description: 'Protocols for routine and discharge cleaning in patient care areas.', regulations: ['JC', 'CDC', 'AHE'], completed: true, hasQuiz: true },
        { id: 'tm002', title: 'Hazardous Material Handling (HazCom)', description: 'Safe handling of cleaning chemicals and regulated medical waste.', regulations: ['OSHA'], completed: false, hasQuiz: true },
        { id: 'tm003', title: 'Infection Control & Prevention', description: 'EVS role in preventing Healthcare-Associated Infections (HAIs).', regulations: ['JC', 'CDC', 'OSHA'], completed: false, hasQuiz: true }, // Example: Not completed yet
        { id: 'tm004', title: 'Using Personal Protective Equipment (PPE)', description: 'Proper selection, use, and disposal of PPE.', regulations: ['OSHA', 'CDC'], completed: false, hasQuiz: true },
        { id: 'tm005', title: 'Joint Commission EVS Standards Focus', description: 'Key Environment of Care (EOC) and Infection Control (IC) requirements.', regulations: ['JC'], completed: false, hasQuiz: true },
        // Example of a module without a quiz
        // { id: 'tm006', title: 'Basic Floor Care Techniques', description: 'Introduction to sweeping, mopping, and auto-scrubbing.', regulations: ['AHE'], completed: false, hasQuiz: false },
    ];

    return trainingModulesSummary;
}

export default async function TrainingModulesPage() {
  const modules = await getTrainingModulesSummary();

  if (!modules || modules.length === 0) {
      return (
         <div className="flex flex-col items-center justify-center h-full text-center p-4">
             <AlertTriangle className="w-12 h-12 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-semibold mb-4">No Training Modules Found</h1>
            <p className="text-muted-foreground mb-6">Could not load training modules at this time, or none have been added yet.</p>
             <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Module
            </Button>
        </div>
      );
  }

  return (
     <TooltipProvider>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h1 className="text-3xl font-bold tracking-tight">Training Modules</h1>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Module
              </Button>
          </div>
          <p className="text-muted-foreground">
            Manage EVS training modules covering hospital cleanliness, OSHA, Joint Commission, and other relevant regulations. Complete modules and quizzes to track your progress.
          </p>

          <div className="grid gap-4">
            {modules.map((module) => (
              <Card key={module.id} className="flex flex-col"> {/* Ensure Card flexes */}
                <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4"> {/* Adjust padding */}
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
                       {/* Tooltip for disabled button */}
                      <Tooltip>
                         <TooltipTrigger asChild>
                           {/* Span needed for Tooltip to work on disabled button */}
                            <span tabIndex={0}>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    asChild={!(!module.completed && module.hasQuiz)} // Only act as child (Link) if not disabled
                                    disabled={!module.completed && module.hasQuiz} // Disable if quiz exists and not completed
                                    className={`mt-1 ${!module.completed && module.hasQuiz ? 'cursor-not-allowed opacity-50' : ''}`}
                                    aria-disabled={!module.completed && module.hasQuiz}
                                >
                                   {/* Render Link only if not disabled */}
                                   {!(!module.completed && module.hasQuiz) ? (
                                        <Link href={`/training/${module.id}`} aria-label={`View Module ${module.title}`}>
                                            <ChevronRight className="h-4 w-4" />
                                        </Link>
                                   ) : (
                                        <div> {/* Placeholder div for disabled state */}
                                            <ChevronRight className="h-4 w-4" />
                                        </div>
                                   )}

                                </Button>
                            </span>
                         </TooltipTrigger>
                         {/* Conditionally render TooltipContent */}
                        {(!module.completed && module.hasQuiz) && (
                            <TooltipContent>
                                <p>Complete the previous module or pass the quiz to unlock.</p>
                            </TooltipContent>
                        )}
                     </Tooltip>

                   </div>
                </CardHeader>
                 {/* Optional: Add CardContent or CardFooter if needed */}
              </Card>
            ))}
          </div>
           {/* Placeholder for potential pagination or filtering controls */}
           <div className="flex justify-center mt-6">
             {/* <Button variant="outline">Load More</Button> */}
           </div>
        </div>
    </TooltipProvider>
  );
}
