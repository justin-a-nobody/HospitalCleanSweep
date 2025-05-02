import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, ShieldCheck, Hospital, ListChecks, ArrowRight } from "lucide-react";
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
              Elevating Hospital Cleanliness Standards Through Comprehensive Training.
            </p>
             <p className="mt-4 text-foreground/90">
               Welcome to the CleanSweep training hub. Our program is designed to equip Environmental Services (EVS) staff with the knowledge and skills necessary to maintain the highest standards of cleanliness and safety within the hospital environment. Proper cleaning protocols are critical in preventing healthcare-associated infections (HAIs) and ensuring patient well-being.
            </p>
             <p className="mt-4 text-foreground/90">For our Top 20 Hospital, our comprehensive training includes interactive scenarios, knowledge checks, Joint Commission Standards, OSHA Standards, and Life Safety.</p>          </div>
        </div>
      </section>

       <div className="grid md:grid-cols-2 gap-6">
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
                    <Hospital className="w-6 h-6 text-blue-600" /> Program Overview
                </CardTitle>
             </CardHeader>
             <CardContent className="space-y-2 text-sm text-foreground/80">
                <p>• Foundational cleaning techniques.</p>
                <p>• Handling of hazardous materials (HazCom).</p>
                <p>• Advanced infection control protocols.</p>
                <p>• Proper use of Personal Protective Equipment (PPE).</p>
                <p>• Understanding Joint Commission and regulatory standards.</p>
                 <p>• Interactive scenarios and knowledge checks.</p>
             </CardContent>
          </Card>
       </div>


      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ListChecks className="w-6 h-6 text-primary"/> Available Training Modules</CardTitle>
          <CardDescription>
            Access structured learning modules covering essential EVS topics. Complete modules and quizzes to track your progress and earn certifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-4">
                <Image
                    src="https://picsum.photos/300/200" // Placeholder image
                    alt="Training Modules Illustration"
                    width={300}
                    height={200}
                    className="rounded-md shadow-sm object-cover"
                    data-ai-hint="hospital cleaning training illustration"
                />
                <div className="flex-1 space-y-3">
                    <p className="text-foreground/90">
                        Our modules provide in-depth coverage of critical cleaning procedures, safety protocols, and regulatory requirements specific to the healthcare environment. Engage with interactive content and test your knowledge.
                    </p>
                    <Button asChild size="lg">
                        <Link href="/training/modules">
                        View Available Modules <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div>
            </div>

        </CardContent>
      </Card>

       {/* Optional: Section for Certification Overview */}
       {/* <Card>
         <CardHeader>...</CardHeader>
         <CardContent>...</CardContent>
       </Card> */}

    </div>
  );
}
