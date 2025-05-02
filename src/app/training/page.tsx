import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";

// Mock data for training modules
const trainingModules = [
  { id: 'tm001', title: 'Standard Cleaning Procedures', description: 'Basic protocols for room cleaning.', regulations: ['OSHA', 'JC'], completed: true },
  { id: 'tm002', title: 'Hazardous Material Handling', description: 'Safe handling of chemical and biological waste.', regulations: ['OSHA', 'EHS'], completed: false },
  { id: 'tm003', title: 'Infection Control Basics', description: 'Preventing the spread of infections.', regulations: ['JC', 'EHS'], completed: true },
  { id: 'tm004', title: 'Using PPE Effectively', description: 'Proper use of Personal Protective Equipment.', regulations: ['OSHA'], completed: false },
  { id: 'tm005', title: 'Joint Commission EVS Standards', description: 'Specific requirements from The Joint Commission.', regulations: ['JC'], completed: false },
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
        Manage EVS training modules covering hospital cleanliness, OSHA, Joint Commission, and EHS regulations.
      </p>

      <div className="grid gap-4">
        {trainingModules.map((module) => (
          <Card key={module.id}>
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div className="space-y-1.5">
                <CardTitle className="flex items-center gap-2">
                   <BookOpen className="h-5 w-5 text-primary"/> {module.title}
                </CardTitle>
                <CardDescription>{module.description}</CardDescription>
                 <div className="flex flex-wrap gap-1 pt-1">
                  {module.regulations.map((reg) => (
                    <span key={reg} className="text-xs bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-sm font-medium">
                      {reg}
                    </span>
                  ))}
                </div>
              </div>
               <div className="flex flex-col items-end gap-2">
                 <span className={`text-xs font-semibold px-2 py-1 rounded-full ${module.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {module.completed ? 'Completed' : 'In Progress'}
                  </span>
                 <Button variant="ghost" size="icon" asChild>
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
