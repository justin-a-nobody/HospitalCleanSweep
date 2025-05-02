import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FlaskConical, Syringe, Trash2, ArrowRight, ArrowLeft } from "lucide-react"; // Use relevant icons
import Link from "next/link";
import Image from "next/image";

const simulations = [
  {
    id: 'room-cleaning',
    title: 'Room Cleaning Simulation',
    description: 'Practice standard and terminal cleaning procedures in various room scenarios.',
    icon: FlaskConical, // Placeholder icon, consider a 'Broom' or 'SprayCan' if available/created
    imageUrl: 'https://picsum.photos/seed/roomcleaning/300/200',
    aiHint: 'hospital room cleaning simulation vr',
  },
  {
    id: 'infection-control',
    title: 'Infection Control Simulation',
    description: 'Simulate responding to spills, outbreaks, and applying appropriate precautions.',
    icon: Syringe, // Represents pathogens/biohazards
    imageUrl: 'https://picsum.photos/seed/infectioncontrol/300/200',
     aiHint: 'infection control hospital simulation laboratory',
  },
  {
    id: 'waste-management',
    title: 'Waste Management Simulation',
    description: 'Practice correct segregation, handling, and disposal of different waste types.',
    icon: Trash2, // Represents waste
    imageUrl: 'https://picsum.photos/seed/wastemanagement/300/200',
     aiHint: 'hospital waste management bins simulation',
  },
];

export default function SimulationsOverviewPage() {
  return (
    <div className="space-y-6">
       <Button variant="outline" size="sm" asChild className="mb-4">
        <Link href="/training">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Training Overview
        </Link>
      </Button>

      <h1 className="text-3xl font-bold tracking-tight">Training Simulations</h1>
      <p className="text-muted-foreground">
        Apply your knowledge in realistic scenarios. Select a simulation below to test your skills.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {simulations.map((sim) => {
          const IconComponent = sim.icon;
          return (
            <Card key={sim.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="p-0">
                  <Image
                    src={sim.imageUrl}
                    alt={`${sim.title} Illustration`}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover"
                    data-ai-hint={sim.aiHint}
                  />
                </CardHeader>
              <CardContent className="flex-grow p-4 space-y-2">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <IconComponent className="h-5 w-5 text-primary" /> {sim.title}
                </CardTitle>
                <CardDescription>{sim.description}</CardDescription>
              </CardContent>
               <div className="p-4 pt-0">
                  <Button asChild size="sm" className="w-full">
                    <Link href={`/training/simulations/${sim.id}`}>
                      Start Simulation <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
               </div>
            </Card>
          );
        })}
      </div>

      <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-blue-200 dark:border-blue-800">
        <CardHeader>
            <CardTitle>Why Use Simulations?</CardTitle>
        </CardHeader>
        <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-sm text-foreground/90">
                <li>Practice complex procedures in a safe, controlled environment.</li>
                <li>Develop critical thinking and decision-making skills.</li>
                <li>Receive immediate feedback on performance (feature to be implemented).</li>
                <li>Reinforce learning from training modules.</li>
                <li>Improve confidence and competence before performing tasks in real patient areas.</li>
            </ul>
        </CardContent>
      </Card>
    </div>
  );
}