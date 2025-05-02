import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";

// Mock data fetching function (replace with actual data fetching)
async function getModuleDetails(moduleId: string) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 50));

  // Find the module - in a real app, this would be an API call
  const modules = [
    { id: 'tm001', title: 'Standard Cleaning Procedures', description: 'Basic protocols for room cleaning.', content: 'Detailed content about standard procedures...', regulations: ['OSHA', 'JC'], completed: true, resources: [{name: 'OSHA Cleaning Guidelines', url: '#'}, {name: 'JC Environment of Care', url: '#'} ] },
    { id: 'tm002', title: 'Hazardous Material Handling', description: 'Safe handling of chemical and biological waste.', content: 'In-depth guide on HazMat protocols...', regulations: ['OSHA', 'EHS'], completed: false, resources: [{name: 'OSHA HazCom Standard', url: '#'}, {name: 'EHS Waste Disposal Policy', url: '#'} ] },
    { id: 'tm003', title: 'Infection Control Basics', description: 'Preventing the spread of infections.', content: 'Key principles of infection control...', regulations: ['JC', 'EHS'], completed: true, resources: [{name: 'CDC Infection Control', url: '#'} ] },
    { id: 'tm004', title: 'Using PPE Effectively', description: 'Proper use of Personal Protective Equipment.', content: 'Donning and doffing procedures, types of PPE...', regulations: ['OSHA'], completed: false, resources: [{name: 'OSHA PPE Guide', url: '#'} ] },
    { id: 'tm005', title: 'Joint Commission EVS Standards', description: 'Specific requirements from The Joint Commission.', content: 'Focusing on EC.02.06.01 and related standards...', regulations: ['JC'], completed: false, resources: [{name: 'Joint Commission Standards', url: '#'}] },
  ];
  const module = modules.find(m => m.id === moduleId);

  if (!module) {
    // Handle not found case, maybe redirect or show a 404 page
    return null;
  }
  return module;
}


export default async function TrainingModuleDetailPage({ params }: { params: { moduleId: string } }) {
  const module = await getModuleDetails(params.moduleId);

  if (!module) {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-semibold mb-4">Module Not Found</h1>
            <p className="text-muted-foreground mb-4">The training module you are looking for does not exist.</p>
            <Button asChild>
                <Link href="/training">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Training Modules
                </Link>
            </Button>
        </div>
    );
  }


  return (
    <div className="space-y-6">
        <Button variant="outline" size="sm" asChild className="mb-4">
            <Link href="/training">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Modules
            </Link>
        </Button>

        <Card>
            <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="text-2xl mb-1">{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {module.regulations.map((reg) => (
                        <Badge key={reg} variant="secondary">{reg}</Badge>
                        ))}
                    </div>
                </div>
                 <Badge variant={module.completed ? "default" : "outline"} className={module.completed ? "bg-green-100 text-green-800 border-green-200" : "border-yellow-300 text-yellow-800 bg-yellow-50"}>
                    {module.completed ? "Completed" : "In Progress"}
                </Badge>
            </div>

            </CardHeader>
            <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Module Content</h3>
                <p className="text-foreground leading-relaxed">{module.content}</p>
                {/* Add more detailed content, videos, quizzes etc. here */}

                 <h3 className="font-semibold text-lg border-b pb-2 pt-4">Relevant Regulations & Resources</h3>
                 <ul className="list-disc space-y-2 pl-5 text-sm">
                    {module.resources.map((resource, index) => (
                        <li key={index}>
                            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                                {resource.name} <ExternalLink className="h-3 w-3" />
                            </a>
                        </li>
                    ))}
                 </ul>

                 {!module.completed && (
                    <div className="pt-6 border-t">
                        <Button>
                            <Check className="mr-2 h-4 w-4" /> Mark as Completed
                        </Button>
                    </div>
                 )}

            </CardContent>
        </Card>


    </div>
  );
}

// Optional: Generate static paths if the number of modules is known and limited
// export async function generateStaticParams() {
//   const modules = [{ id: 'tm001' }, { id: 'tm002' }, { id: 'tm003' }, { id: 'tm004' }, { id: 'tm005' }]; // Fetch or define module IDs
//   return modules.map((module) => ({
//     moduleId: module.id,
//   }));
// }
