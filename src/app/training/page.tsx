import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, ShieldCheck, Hospital, ListChecks, ArrowRight, Users } from "lucide-react"; // Added Users icon
import Link from "next/link";
import Image from "next/image"; // Import next/image

export default function TrainingOverviewPage() {
  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-lg shadow border border-primary/20">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <GraduationCap className="w-16 h-16 text-primary flex-shrink-0" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">EVS Training & Certification Program</h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Elevating Hospital Cleanliness Standards Through Comprehensive Training for Staff and Trainers.
            </p>
             <p className="mt-4 text-foreground/90">
               Welcome to the CleanSweep training hub. Our program offers two distinct paths: one designed to equip Environmental Services (EVS) staff with essential cleaning and safety skills, and another to prepare supervisors and leads to effectively train their teams. Proper cleaning protocols are critical in preventing healthcare-associated infections (HAIs) and ensuring patient well-being.
            </p>
             <p className="mt-4 text-foreground/90">Our comprehensive training includes interactive scenarios, knowledge checks, and covers key standards from the Joint Commission, OSHA, and Life Safety.</p>
          </div>
        </div>
      </section>

       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow">
             <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-green-600" /> Why Training Matters
                </CardTitle>
             </CardHeader>
             <CardContent className="space-y-2 text-sm text-foreground/80">
                <p>✓ Reduces Healthcare-Associated Infections (HAIs)</p>
                <p>✓ Ensures Compliance with Regulations (JC, OSHA, CDC)</p>
                <p>✓ Improves Patient Safety and Satisfaction</p>
                <p>✓ Enhances Staff Confidence and Competence</p>
                <p>✓ Protects Staff from Workplace Hazards</p>
             </CardContent>
          </Card>
           <Card className="hover:shadow-md transition-shadow">
             <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Hospital className="w-6 h-6 text-blue-600" /> EVS Staff Program
                </CardTitle>
                <CardDescription>Core skills for front-line EVS technicians.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-2 text-sm text-foreground/80">
                <p>• Foundational cleaning techniques.</p>
                <p>• Handling of hazardous materials (HazCom).</p>
                <p>• Infection control protocols (Standard/Transmission Precautions).</p>
                <p>• Proper use of Personal Protective Equipment (PPE).</p>
                <p>• Understanding key regulatory standards.</p>
                <p>• Interactive scenarios and knowledge checks.</p>
                 <Button asChild size="sm" className="mt-4 w-full">
                    <Link href="/training/modules">
                     View EVS Modules <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                 </Button>
             </CardContent>
          </Card>
           <Card className="hover:shadow-md transition-shadow">
             <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users className="w-6 h-6 text-purple-600" /> Train the Trainer Program
                </CardTitle>
                 <CardDescription>For supervisors and leads responsible for training.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-2 text-sm text-foreground/80">
                <p>• Equip supervisors to train EVS staff effectively.</p>
                <p>• Deep dive into OSHA standards relevant to EVS training.</p>
                <p>• Understand and teach Joint Commission EOC & IC requirements.</p>
                <p>• Learn adult learning principles and teaching techniques.</p>
                <p>• Focus on competency assessment and documentation.</p>
                <p>• Develop effective training sessions and materials.</p>
                 <Button asChild size="sm" variant="secondary" className="mt-4 w-full">
                    <Link href="/training/train-the-trainer">
                     View Trainer Modules <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                 </Button>
             </CardContent>
          </Card>
       </div>


      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ListChecks className="w-6 h-6 text-primary"/> Access Training Modules</CardTitle>
          <CardDescription>
            Choose your path: structured learning for EVS staff or specialized training for trainers. Complete modules and quizzes to track progress.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-6">
                <Image
                    src="https://picsum.photos/300/200" // Placeholder image
                    alt="Hospital cleaning staff training illustration"
                    width={300}
                    height={200}
                    className="rounded-md shadow-sm object-cover"
                    data-ai-hint="hospital cleaning training online course team" // Updated hint
                />
                <div className="flex-1 space-y-4">
                    <p className="text-foreground/90">
                        Our modules provide in-depth coverage of critical cleaning procedures, safety protocols, and regulatory requirements specific to the healthcare environment. Engage with interactive content and test your knowledge. Select the appropriate pathway below to begin.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button asChild size="lg" className="flex-1">
                            <Link href="/training/modules">
                            EVS Staff Training <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="secondary" className="flex-1">
                            <Link href="/training/train-the-trainer">
                            Train the Trainer <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
