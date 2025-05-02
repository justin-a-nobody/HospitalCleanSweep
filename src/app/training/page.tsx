import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"; // Import Badge

// Mock data for training modules - updated descriptions
const trainingModules = [
  { id: 'tm001', title: 'Standard Cleaning Procedures', description: 'Protocols for routine and discharge cleaning in patient care areas.', regulations: ['JC', 'CDC', 'AHE'], completed: true },
  { id: 'tm002', title: 'Hazardous Material Handling (HazCom)', description: 'Safe handling of cleaning chemicals and regulated medical waste.', regulations: ['OSHA'], completed: false },
  { id: 'tm003', title: 'Infection Control & Prevention', description: 'EVS role in preventing Healthcare-Associated Infections (HAIs).', regulations: ['JC', 'CDC', 'OSHA'], completed: true },
  { id: 'tm004', title: 'Using Personal Protective Equipment (PPE)', description: 'Proper selection, use, and disposal of PPE.', regulations: ['OSHA', 'CDC'], completed: false },
  { id: 'tm005', title: 'Joint Commission EVS Standards Focus', description: 'Key Environment of Care (EOC) and Infection Control (IC) requirements.', regulations: ['JC'], completed: false },
];

export default function TrainingModulesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Training Modules</h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Module
          </Button>
      </div>
      <p className="text-muted-foreground">
        Manage EVS training modules covering hospital cleanliness, OSHA, Joint Commission, and other relevant regulations.
      </p>

      <div className="grid gap-4">
        {trainingModules.map((module) => (
          <Card key={module.id}>
            <CardHeader className="flex flex-row items-start justify-between gap-4">
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
                 {/* Using text-foreground for better theme adaptability */}
                 <Badge variant={module.completed ? "default" : "outline"} className={`text-xs font-semibold px-2 py-1 rounded-full ${module.completed ? 'border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-300' : 'border-yellow-500/50 bg-yellow-500/10 text-yellow-700 dark:text-yellow-300'}`}>
                    {module.completed ? 'Completed' : 'In Progress'}
                  </Badge>
                 <Button variant="ghost" size="icon" asChild className="mt-1">
                    <Link href={`/training/${module.id}`}>
                        <ChevronRight className="h-4 w-4" />
                         <span className="sr-only">View Module</span>
                    </Link>
                 </Button>
               </div>
            </CardHeader>
          </Card>
        ))}
      </div>
       {/* Placeholder for potential pagination or filtering controls */}
       <div className="flex justify-center mt-6">
         {/* <Button variant="outline">Load More</Button> */}
       </div>
    </div>
  );
}
