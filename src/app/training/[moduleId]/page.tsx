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
    {
        id: 'tm001',
        title: 'Standard Cleaning Procedures',
        description: 'Protocols for routine and discharge cleaning in patient care areas.',
        content: 'This module covers the standard procedures for cleaning patient rooms, including dusting, surface disinfection (especially high-touch surfaces like bed rails, doorknobs, light switches), bathroom cleaning, floor care (mopping/vacuuming), and waste removal. Emphasizes the importance of following established protocols consistently to maintain a safe environment and prevent cross-contamination. Discusses cleaning frequency and terminal cleaning upon patient discharge.',
        regulations: ['JC', 'CDC', 'AHE'],
        completed: true,
        resources: [
            {name: 'CDC Environmental Cleaning Procedures', url: 'https://www.cdc.gov/hai/prevent/environment/cleaning.html'},
            {name: 'AHE Practice Guidance for Healthcare EVS', url: 'https://www.ahe.org/practice-guidance'},
            {name: 'Joint Commission EOC Standards Overview', url: 'https://www.jointcommission.org/standards/standard-faqs/hospital-and-hospital-clinics/environment-of-care-ec/'}
        ]
    },
    {
        id: 'tm002',
        title: 'Hazardous Material Handling (HazCom)',
        description: 'Safe handling of cleaning chemicals and regulated medical waste.',
        content: 'Focuses on OSHA\'s Hazard Communication Standard (HazCom). Covers identifying chemical hazards using Safety Data Sheets (SDS) and container labels, proper storage, handling, and disposal of cleaning chemicals. Also addresses the management of regulated medical waste, including sharps disposal and handling potentially infectious materials according to OSHA\'s Bloodborne Pathogens standard.',
        regulations: ['OSHA'],
        completed: false,
        resources: [
            {name: 'OSHA Hazard Communication Standard (29 CFR 1910.1200)', url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1200'},
            {name: 'OSHA Bloodborne Pathogens Standard (29 CFR 1910.1030)', url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1030'},
            {name: 'OSHA FactSheet: Hazard Communication', url: 'https://www.osha.gov/sites/default/files/publications/OSHA3695.pdf'}
        ]
    },
    {
        id: 'tm003',
        title: 'Infection Control & Prevention',
        description: 'EVS role in preventing Healthcare-Associated Infections (HAIs).',
        content: 'Explains the chain of infection and how EVS practices interrupt it. Covers standard precautions, transmission-based precautions (contact, droplet, airborne), the importance of hand hygiene, cleaning vs. disinfecting, and appropriate disinfectant selection and use (contact times, dilution). Emphasizes the EVS technician\'s critical role in patient safety according to CDC and Joint Commission guidelines.',
        regulations: ['JC', 'CDC', 'OSHA'],
        completed: true,
        resources: [
            {name: 'CDC Guideline for Disinfection and Sterilization', url: 'https://www.cdc.gov/infectioncontrol/guidelines/disinfection/index.html'},
            {name: 'Joint Commission Infection Prevention and Control (IC) Standards', url: 'https://www.jointcommission.org/standards/standard-faqs/hospital-and-hospital-clinics/infection-prevention-and-control-ic/'},
            {name: 'CDC Hand Hygiene in Healthcare Settings', url: 'https://www.cdc.gov/handhygiene/'}
        ]
    },
    {
        id: 'tm004',
        title: 'Using Personal Protective Equipment (PPE)',
        description: 'Proper selection, use, and disposal of PPE.',
        content: 'Covers the types of PPE used in EVS (gloves, gowns, masks, eye protection), when each type is necessary based on the task and potential exposures (e.g., cleaning spills, handling waste, entering isolation rooms). Demonstrates proper procedures for donning (putting on) and doffing (taking off) PPE to prevent self-contamination, as required by OSHA.',
        regulations: ['OSHA', 'CDC'],
        completed: false,
        resources: [
            {name: 'OSHA Personal Protective Equipment (PPE) Standards', url: 'https://www.osha.gov/personal-protective-equipment'},
            {name: 'CDC Sequence for Donning and Doffing PPE', url: 'https://www.cdc.gov/hai/pdfs/ppe/ppe-sequence.pdf'}
        ]
    },
    {
        id: 'tm005',
        title: 'Joint Commission EVS Standards Focus',
        description: 'Key Environment of Care (EOC) and Infection Control (IC) requirements.',
        content: 'Details specific Joint Commission standards relevant to EVS. Focuses on EOC standards for maintaining a safe, functional environment (e.g., clean, free of hazards, proper utility management related to cleaning equipment) and IC standards related to environmental cleaning and disinfection. Explains how EVS performance directly impacts accreditation survey outcomes.',
        regulations: ['JC'],
        completed: false,
        resources: [
             {name: 'Joint Commission Environment of Care (EC) Standards Overview', url: 'https://www.jointcommission.org/standards/standard-faqs/hospital-and-hospital-clinics/environment-of-care-ec/'},
             {name: 'Joint Commission Perspectives: The Source for EVS', url: 'https://www.jcrinc.com/the-source-for-evs/'}, // Example link, might require subscription
             {name: 'Understanding JC Standard EC.02.06.01', url: 'https://www.jointcommission.org/-/media/tjc/documents/standards/ec-dms/ec020601dmspdf.pdf'} // Example deep link, verify stability
        ]
    },
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
        <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-2xl font-semibold mb-4">Module Not Found</h1>
            <p className="text-muted-foreground mb-4">The training module you are looking for does not exist.</p>
            <Button asChild variant="outline">
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
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <CardTitle className="text-2xl mb-1">{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {module.regulations.map((reg) => (
                        <Badge key={reg} variant="secondary">{reg}</Badge>
                        ))}
                    </div>
                </div>
                 {/* Using text-foreground for better theme adaptability */}
                 <Badge variant={module.completed ? "default" : "outline"} className={module.completed ? "border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-300" : "border-yellow-500/50 bg-yellow-500/10 text-yellow-700 dark:text-yellow-300"}>
                    {module.completed ? "Completed" : "In Progress"}
                </Badge>
            </div>

            </CardHeader>
            <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">Module Content</h3>
                <p className="text-foreground leading-relaxed whitespace-pre-line">{module.content}</p>
                {/* Add more detailed content, videos, quizzes etc. here */}

                 <h3 className="font-semibold text-lg border-b pb-2 pt-4">Relevant Regulations & Resources</h3>
                 <ul className="list-disc space-y-2 pl-5 text-sm">
                    {module.resources.map((resource, index) => (
                        <li key={index}>
                            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                                {resource.name} <ExternalLink className="h-3 w-3" />
                            </a>
                            {/* Basic validation - real apps might need more robust checks */}
                            {!resource.url || resource.url === '#' ? <span className="text-xs text-muted-foreground ml-2">(Link placeholder)</span> : null}
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
