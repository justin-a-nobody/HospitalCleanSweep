import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Check, ExternalLink, BookOpen, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Quiz from "@/components/training/quiz"; // Import the new Quiz component

// Mock data structure enhanced with sections and quiz
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

interface TrainingModule {
    id: string;
    title: string;
    description: string;
    sections?: ModuleSection[]; // Use sections instead of single content string
    content?: string; // Keep for backward compatibility or simpler modules
    regulations: string[];
    completed: boolean;
    resources: Resource[];
    quiz?: QuizQuestion[]; // Add quiz data
}


// Mock data fetching function (replace with actual data fetching)
async function getModuleDetails(moduleId: string): Promise<TrainingModule | null> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 50));

  // Find the module - in a real app, this would be an API call
  const modules: TrainingModule[] = [
    {
        id: 'tm001',
        title: 'Standard Cleaning Procedures',
        description: 'Protocols for routine and discharge cleaning in patient care areas.',
        sections: [
            { title: 'Introduction', text: 'Understanding the importance of standard cleaning protocols in healthcare settings.'},
            { title: 'Routine Cleaning', text: 'Daily tasks including dusting high and low surfaces, cleaning floors, emptying trash, and wiping down frequently touched items.' },
            { title: 'Discharge Cleaning (Terminal Clean)', text: 'Thorough cleaning and disinfection of a patient room after discharge. Covers all surfaces, equipment, and includes tasks like changing curtains.' },
            { title: 'High-Touch Surfaces', text: 'Identifying and prioritizing cleaning of high-touch surfaces like bed rails, doorknobs, light switches, call buttons, and overbed tables.' },
            { title: 'Bathroom Cleaning', text: 'Specific procedures for cleaning and disinfecting toilets, sinks, showers, and floors in patient bathrooms.' },
            { title: 'Waste Removal', text: 'Proper handling and disposal of regular and regulated medical waste.' },
        ],
        regulations: ['JC', 'CDC', 'AHE'],
        completed: true,
        resources: [
            {name: 'CDC Environmental Cleaning Procedures', url: 'https://www.cdc.gov/hai/prevent/environment/cleaning.html'},
            {name: 'AHE Practice Guidance for Healthcare EVS', url: 'https://www.ahe.org/practice-guidance'},
            {name: 'Joint Commission EOC Standards Overview', url: 'https://www.jointcommission.org/standards/standard-faqs/hospital-and-hospital-clinics/environment-of-care-ec/'}
        ],
        quiz: [
             { id: 'q101', question: 'What is a "high-touch surface"?', options: ['The ceiling', 'A surface touched frequently by different people', 'The floor under the bed', 'A surface cleaned only weekly'], correctAnswerIndex: 1},
             { id: 'q102', question: 'Terminal cleaning is performed:', options: ['Every morning', 'After a patient is discharged', 'Only if the patient had an infection', 'By the nursing staff'], correctAnswerIndex: 1},
             { id: 'q103', question: 'Which organization provides guidelines on environmental cleaning in healthcare?', options: ['FDA', 'OSHA', 'CDC', 'EPA'], correctAnswerIndex: 2},
        ]
    },
    {
        id: 'tm002',
        title: 'Hazardous Material Handling (HazCom)',
        description: 'Safe handling of cleaning chemicals and regulated medical waste.',
        sections: [
            { title: 'OSHA HazCom Standard', text: 'Overview of the Hazard Communication Standard (29 CFR 1910.1200) requirements.'},
            { title: 'Safety Data Sheets (SDS)', text: 'Understanding how to read and locate SDS for chemicals used, identifying hazards, and required precautions.' },
            { title: 'Chemical Labeling', text: 'Importance of proper labeling on primary and secondary containers, including pictograms and hazard statements.' },
            { title: 'Safe Chemical Use & Storage', text: 'Proper dilution, application, and storage procedures for cleaning chemicals to prevent spills, reactions, or unnecessary exposure.' },
            { title: 'Regulated Medical Waste (RMW)', text: 'Identifying different types of RMW (sharps, infectious waste), proper containment, labeling, and disposal procedures according to OSHA and state regulations.' },
            { title: 'Spill Response', text: 'Basic procedures for containing and cleaning up chemical or biohazard spills.' },
        ],
        regulations: ['OSHA'],
        completed: false,
        resources: [
            {name: 'OSHA Hazard Communication Standard (29 CFR 1910.1200)', url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1200'},
            {name: 'OSHA Bloodborne Pathogens Standard (29 CFR 1910.1030)', url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1030'},
            {name: 'OSHA FactSheet: Hazard Communication', url: 'https://www.osha.gov/sites/default/files/publications/OSHA3695.pdf'}
        ],
        quiz: [
            { id: 'q201', question: 'What does SDS stand for?', options: ['Standard Dilution Sheet', 'Safety Data Sheet', 'Safe Dosage System', 'Systematic Danger Sign'], correctAnswerIndex: 1},
            { id: 'q202', question: 'The OSHA standard covering chemical hazards is called:', options: ['Bloodborne Pathogens Standard', 'Personal Protective Equipment Standard', 'Hazard Communication Standard (HazCom)', 'Lockout/Tagout Standard'], correctAnswerIndex: 2},
            { id: 'q203', question: 'Used needles should be disposed of in:', options: ['Regular trash bin', 'Red biohazard bag', 'Approved sharps container', 'Sink with running water'], correctAnswerIndex: 2},
        ]
    },
    {
        id: 'tm003',
        title: 'Infection Control & Prevention',
        description: 'EVS role in preventing Healthcare-Associated Infections (HAIs).',
        sections: [
            { title: 'Chain of Infection', text: 'Understanding the six links: Infectious Agent, Reservoir, Portal of Exit, Mode of Transmission, Portal of Entry, Susceptible Host. Learn how EVS breaks the chain, primarily at Mode of Transmission.' },
            { title: 'Healthcare-Associated Infections (HAIs)', text: 'Definition of HAIs and common types (e.g., C. difficile, MRSA, VRE). Discuss the significant impact on patient safety and hospital costs.' },
            { title: 'Standard Precautions', text: 'Treating all blood and body fluids as potentially infectious. Key elements include hand hygiene, PPE use, safe injection practices (less relevant for EVS), respiratory hygiene/cough etiquette, and safe handling of potentially contaminated equipment/surfaces.' },
            { title: 'Transmission-Based Precautions', text: 'Additional precautions for specific pathogens: Contact (e.g., MRSA, C. diff), Droplet (e.g., Flu, Pertussis), and Airborne (e.g., TB, Measles). Understand the specific EVS requirements for each, including PPE and room cleaning protocols.' },
            { title: 'Hand Hygiene', text: 'The single most important measure. When to use soap and water vs. alcohol-based hand rub (ABHR). Proper technique for both. Five moments for hand hygiene.' },
            { title: 'Cleaning vs. Disinfecting', text: 'Defining the difference: Cleaning removes soil, Disinfecting kills pathogens. Importance of cleaning BEFORE disinfecting. Understand disinfectant types, proper dilution, and required contact/dwell times.' },
        ],
        regulations: ['JC', 'CDC', 'OSHA'],
        completed: true, // Example: User has completed this one
        resources: [
            {name: 'CDC Guideline for Disinfection and Sterilization', url: 'https://www.cdc.gov/infectioncontrol/guidelines/disinfection/index.html'},
            {name: 'Joint Commission Infection Prevention and Control (IC) Standards', url: 'https://www.jointcommission.org/standards/standard-faqs/hospital-and-hospital-clinics/infection-prevention-and-control-ic/'},
            {name: 'CDC Hand Hygiene in Healthcare Settings', url: 'https://www.cdc.gov/handhygiene/'}
        ],
        quiz: [
            { id: 'q301', question: 'What is the primary way EVS helps break the chain of infection?', options: ['Diagnosing patients', 'Administering medication', 'Cleaning and disinfecting surfaces', 'Performing surgery'], correctAnswerIndex: 2 },
            { id: 'q302', question: 'Standard Precautions means treating which substances as potentially infectious?', options: ['Only blood', 'Only fluids from known infected patients', 'All blood and body fluids', 'Only surfaces that look dirty'], correctAnswerIndex: 2 },
            { id: 'q303', question: 'What must happen BEFORE disinfecting a surface?', options: ['It must be rinsed with water', 'It must be thoroughly cleaned', 'It must be dried with a paper towel', 'It must be inspected by a nurse'], correctAnswerIndex: 1 },
            { id: 'q304', question: 'What does "contact time" or "dwell time" refer to for a disinfectant?', options: ['How long it takes to mix the chemical', 'How long the disinfectant needs to stay wet on a surface to be effective', 'How long the bottle can be stored', 'The time it takes to clean the room'], correctAnswerIndex: 1 },
             { id: 'q305', question: 'When MUST you wash your hands with soap and water (instead of just using ABHR)?', options: ['Before entering any patient room', 'After touching a clean surface', 'When hands are visibly soiled or after caring for a patient with C. difficile', 'After removing gloves'], correctAnswerIndex: 2 },
        ]
    },
    {
        id: 'tm004',
        title: 'Using Personal Protective Equipment (PPE)',
        description: 'Proper selection, use, and disposal of PPE.',
        sections: [
             { title: 'Why Use PPE?', text: 'Protecting yourself from exposure to chemicals and infectious agents. Protecting patients and others from potential cross-contamination.' },
             { title: 'Types of PPE for EVS', text: 'Gloves (utility vs. exam), Gowns (isolation), Masks (surgical vs. N95 - understanding the difference), Eye Protection (goggles, face shields).'},
             { title: 'When to Use Specific PPE', text: 'Task-based assessment: Routine cleaning vs. spill cleanup vs. entering isolation rooms (Contact, Droplet, Airborne). Matching PPE to the potential hazard.' },
             { title: 'Donning (Putting On) PPE', text: 'Correct sequence: Gown -> Mask -> Goggles/Face Shield -> Gloves. Ensuring proper fit and coverage.' },
             { title: 'Doffing (Taking Off) PPE', text: 'Crucial step to prevent self-contamination. Correct sequence: Gloves -> Goggles/Face Shield -> Gown -> Mask. Emphasize hand hygiene immediately after removal.' },
             { title: 'PPE Disposal', text: 'Proper disposal procedures for used PPE, especially potentially contaminated items.' },
        ],
        regulations: ['OSHA', 'CDC'],
        completed: false,
        resources: [
            {name: 'OSHA Personal Protective Equipment (PPE) Standards', url: 'https://www.osha.gov/personal-protective-equipment'},
            {name: 'CDC Sequence for Donning and Doffing PPE', url: 'https://www.cdc.gov/hai/pdfs/ppe/ppe-sequence.pdf'}
        ],
        quiz: [
            { id: 'q401', question: 'What is the correct order for DONNING (putting on) standard PPE?', options: ['Gloves, Gown, Mask, Goggles', 'Mask, Gown, Goggles, Gloves', 'Gown, Mask, Goggles, Gloves', 'Goggles, Mask, Gloves, Gown'], correctAnswerIndex: 2},
            { id: 'q402', question: 'What is the primary goal of the DOFFING (taking off) sequence?', options: ['To save PPE for reuse', 'To do it as quickly as possible', 'To prevent contaminating yourself', 'To keep the PPE clean'], correctAnswerIndex: 2},
            { id: 'q403', question: 'Which type of precaution typically requires wearing an N95 respirator?', options: ['Standard Precautions', 'Contact Precautions', 'Droplet Precautions', 'Airborne Precautions'], correctAnswerIndex: 3},
        ]
    },
    {
        id: 'tm005',
        title: 'Joint Commission EVS Standards Focus',
        description: 'Key Environment of Care (EOC) and Infection Control (IC) requirements.',
        sections: [
            { title: 'The Joint Commission (TJC)', text: 'Who they are and why their accreditation is important for hospitals. Role of EVS in meeting TJC standards.' },
            { title: 'Environment of Care (EOC) Standards', text: 'Focus on EOC.02.06.01: Maintaining a safe, functional environment. How EVS contributes: Cleanliness, managing waste, safe chemical use, keeping corridors clear, reporting hazards (e.g., spills, damaged equipment).' },
            { title: 'Infection Control (IC) Standards', text: 'Focus on IC.02.01.01 and IC.02.02.01: Implementing infection prevention activities and minimizing transmission risk. How EVS contributes: Following cleaning/disinfection protocols, adherence to standard/transmission-based precautions, proper hand hygiene, managing linen and waste.' },
            { title: 'Survey Process', text: 'What to expect during a TJC survey. Importance of demonstrating knowledge of procedures, proper technique, and ability to locate resources like SDS.' },
            { title: 'Common EVS-Related Findings', text: 'Examples of common deficiencies found during surveys (e.g., dust, improper chemical storage, incorrect dwell times, lack of PPE use).' },
        ],
        regulations: ['JC'],
        completed: false,
        resources: [
             {name: 'Joint Commission Environment of Care (EC) Standards Overview', url: 'https://www.jointcommission.org/standards/standard-faqs/hospital-and-hospital-clinics/environment-of-care-ec/'},
             {name: 'Joint Commission Perspectives: The Source for EVS', url: 'https://www.jcrinc.com/the-source-for-evs/'}, // Example link, might require subscription
             {name: 'Understanding JC Standard EC.02.06.01', url: 'https://www.jointcommission.org/-/media/tjc/documents/standards/ec-dms/ec020601dmspdf.pdf'} // Example deep link, verify stability
        ],
         quiz: [
            { id: 'q501', question: 'Which TJC chapter focuses heavily on the physical safety and cleanliness of the hospital?', options: ['Medication Management (MM)', 'Infection Control (IC)', 'Environment of Care (EOC)', 'Leadership (LD)'], correctAnswerIndex: 2},
            { id: 'q502', question: 'Demonstrating proper hand hygiene is important for which TJC standard area?', options: ['Only EOC', 'Only IC', 'Both EOC and IC', 'Neither EOC nor IC'], correctAnswerIndex: 2}, // Hand hygiene falls under IC primarily, but relates to safe EOC practices
            { id: 'q503', question: 'During a TJC survey, an EVS technician might be asked to:', options: ['Prescribe medication', 'Explain how they clean high-touch surfaces', 'Perform a surgical procedure', 'Analyze lab results'], correctAnswerIndex: 1},
        ]
    },
  ];
  const module = modules.find(m => m.id === moduleId);

  if (!module) {
    return null;
  }
  return module;
}


export default async function TrainingModuleDetailPage({ params }: { params: { moduleId: string } }) {
  const module = await getModuleDetails(params.moduleId);

  if (!module) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
             <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
            <h1 className="text-2xl font-semibold mb-4">Module Not Found</h1>
            <p className="text-muted-foreground mb-6">The training module you are looking for could not be found or loaded.</p>
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
                    <CardTitle className="text-2xl mb-1 flex items-center gap-2">
                        <BookOpen className="h-6 w-6 text-primary" /> {module.title}
                    </CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {module.regulations.map((reg) => (
                        <Badge key={reg} variant="secondary">{reg}</Badge>
                        ))}
                    </div>
                </div>
                 <Badge variant={module.completed ? "default" : "outline"} className={`text-xs font-semibold px-2 py-1 rounded-full ${module.completed ? 'border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-300' : 'border-yellow-500/50 bg-yellow-500/10 text-yellow-700 dark:text-yellow-300'}`}>
                    {module.completed ? "Completed" : "In Progress"}
                </Badge>
            </div>

            </CardHeader>
            <Separator />
            <CardContent className="pt-6 space-y-6">
                 {/* Display sections if available, otherwise fallback to content */}
                {module.sections && module.sections.length > 0 ? (
                    module.sections.map((section, index) => (
                         <div key={index} className="space-y-2">
                            <h3 className="font-semibold text-lg text-primary">{section.title}</h3>
                             <p className="text-foreground/90 leading-relaxed whitespace-pre-line">{section.text}</p>
                         </div>
                    ))
                ) : module.content ? (
                     <div>
                        <h3 className="font-semibold text-lg border-b pb-2">Module Content</h3>
                        <p className="text-foreground/90 leading-relaxed whitespace-pre-line">{module.content}</p>
                     </div>
                ) : (
                    <p className="text-muted-foreground italic">No detailed content available for this module yet.</p>
                )}

                 {/* Regulations & Resources Section */}
                 {module.resources && module.resources.length > 0 && (
                    <div className="pt-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Relevant Regulations & Resources</h3>
                        <ul className="list-disc space-y-2 pl-5 text-sm mt-3">
                            {module.resources.map((resource, index) => (
                                <li key={index}>
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                                        {resource.name} <ExternalLink className="h-3 w-3" />
                                    </a>
                                    {!resource.url || resource.url === '#' ? <span className="text-xs text-muted-foreground ml-2">(Link placeholder)</span> : null}
                                </li>
                            ))}
                        </ul>
                    </div>
                 )}


                 {/* Quiz Section */}
                {module.quiz && module.quiz.length > 0 && !module.completed && (
                    <div className="pt-4">
                        <Separator className="my-4" />
                         <h3 className="font-semibold text-lg mb-4 text-primary">Knowledge Check</h3>
                        <Quiz questions={module.quiz} moduleId={module.id} />
                    </div>
                )}

                 {/* Completion Button (Only if not completed and no quiz or quiz passed) */}
                 {/* Logic for quiz completion needs to be handled by the Quiz component and potentially update parent state */}
                 {!module.completed && (!module.quiz || module.quiz.length === 0) && (
                    <div className="pt-6 border-t mt-6">
                        <Button>
                            <Check className="mr-2 h-4 w-4" /> Mark as Completed
                        </Button>
                        {/* In a real app, this button's action would update the user's progress */}
                    </div>
                 )}

                  {/* Show message if completed */}
                 {module.completed && (
                     <div className="mt-6 p-4 bg-green-500/10 border border-green-500/50 rounded-md text-center">
                        <Check className="w-6 h-6 text-green-700 dark:text-green-300 mx-auto mb-2"/>
                        <p className="text-sm font-medium text-green-700 dark:text-green-300">You have completed this module!</p>
                     </div>
                 )}

            </CardContent>
        </Card>


    </div>
  );
}
```</description>
    <content><![CDATA[import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Check, ExternalLink, BookOpen, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Quiz from "@/components/training/quiz"; // Import the new Quiz component

// Mock data structure enhanced with sections and quiz
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

interface TrainingModule {
    id: string;
    title: string;
    description: string;
    sections?: ModuleSection[]; // Use sections instead of single content string
    content?: string; // Keep for backward compatibility or simpler modules
    regulations: string[];
    completed: boolean;
    resources: Resource[];
    quiz?: QuizQuestion[]; // Add quiz data
}


// Mock data fetching function (replace with actual data fetching)
async function getModuleDetails(moduleId: string): Promise<TrainingModule | null> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 50));

  // Find the module - in a real app, this would be an API call
  const modules: TrainingModule[] = [
    {
        id: 'tm001',
        title: 'Standard Cleaning Procedures',
        description: 'Protocols for routine and discharge cleaning in patient care areas.',
        sections: [
            { title: 'Introduction', text: 'Understanding the importance of standard cleaning protocols in healthcare settings.'},
            { title: 'Routine Cleaning', text: 'Daily tasks including dusting high and low surfaces, cleaning floors, emptying trash, and wiping down frequently touched items.' },
            { title: 'Discharge Cleaning (Terminal Clean)', text: 'Thorough cleaning and disinfection of a patient room after discharge. Covers all surfaces, equipment, and includes tasks like changing curtains.' },
            { title: 'High-Touch Surfaces', text: 'Identifying and prioritizing cleaning of high-touch surfaces like bed rails, doorknobs, light switches, call buttons, and overbed tables.' },
            { title: 'Bathroom Cleaning', text: 'Specific procedures for cleaning and disinfecting toilets, sinks, showers, and floors in patient bathrooms.' },
            { title: 'Waste Removal', text: 'Proper handling and disposal of regular and regulated medical waste.' },
        ],
        regulations: ['JC', 'CDC', 'AHE'],
        completed: true,
        resources: [
            {name: 'CDC Environmental Cleaning Procedures', url: 'https://www.cdc.gov/hai/prevent/environment/cleaning.html'},
            {name: 'AHE Practice Guidance for Healthcare EVS', url: 'https://www.ahe.org/practice-guidance'},
            {name: 'Joint Commission EOC Standards Overview', url: 'https://www.jointcommission.org/standards/standard-faqs/hospital-and-hospital-clinics/environment-of-care-ec/'}
        ],
        quiz: [
             { id: 'q101', question: 'What is a "high-touch surface"?', options: ['The ceiling', 'A surface touched frequently by different people', 'The floor under the bed', 'A surface cleaned only weekly'], correctAnswerIndex: 1},
             { id: 'q102', question: 'Terminal cleaning is performed:', options: ['Every morning', 'After a patient is discharged', 'Only if the patient had an infection', 'By the nursing staff'], correctAnswerIndex: 1},
             { id: 'q103', question: 'Which organization provides guidelines on environmental cleaning in healthcare?', options: ['FDA', 'OSHA', 'CDC', 'EPA'], correctAnswerIndex: 2},
        ]
    },
    {
        id: 'tm002',
        title: 'Hazardous Material Handling (HazCom)',
        description: 'Safe handling of cleaning chemicals and regulated medical waste.',
        sections: [
            { title: 'OSHA HazCom Standard', text: 'Overview of the Hazard Communication Standard (29 CFR 1910.1200) requirements.'},
            { title: 'Safety Data Sheets (SDS)', text: 'Understanding how to read and locate SDS for chemicals used, identifying hazards, and required precautions.' },
            { title: 'Chemical Labeling', text: 'Importance of proper labeling on primary and secondary containers, including pictograms and hazard statements.' },
            { title: 'Safe Chemical Use & Storage', text: 'Proper dilution, application, and storage procedures for cleaning chemicals to prevent spills, reactions, or unnecessary exposure.' },
            { title: 'Regulated Medical Waste (RMW)', text: 'Identifying different types of RMW (sharps, infectious waste), proper containment, labeling, and disposal procedures according to OSHA and state regulations.' },
            { title: 'Spill Response', text: 'Basic procedures for containing and cleaning up chemical or biohazard spills.' },
        ],
        regulations: ['OSHA'],
        completed: false,
        resources: [
            {name: 'OSHA Hazard Communication Standard (29 CFR 1910.1200)', url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1200'},
            {name: 'OSHA Bloodborne Pathogens Standard (29 CFR 1910.1030)', url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1030'},
            {name: 'OSHA FactSheet: Hazard Communication', url: 'https://www.osha.gov/sites/default/files/publications/OSHA3695.pdf'}
        ],
        quiz: [
            { id: 'q201', question: 'What does SDS stand for?', options: ['Standard Dilution Sheet', 'Safety Data Sheet', 'Safe Dosage System', 'Systematic Danger Sign'], correctAnswerIndex: 1},
            { id: 'q202', question: 'The OSHA standard covering chemical hazards is called:', options: ['Bloodborne Pathogens Standard', 'Personal Protective Equipment Standard', 'Hazard Communication Standard (HazCom)', 'Lockout/Tagout Standard'], correctAnswerIndex: 2},
            { id: 'q203', question: 'Used needles should be disposed of in:', options: ['Regular trash bin', 'Red biohazard bag', 'Approved sharps container', 'Sink with running water'], correctAnswerIndex: 2},
        ]
    },
    {
        id: 'tm003',
        title: 'Infection Control & Prevention',
        description: 'EVS role in preventing Healthcare-Associated Infections (HAIs).',
        sections: [
            { title: 'Chain of Infection', text: 'Understanding the six links: Infectious Agent, Reservoir, Portal of Exit, Mode of Transmission, Portal of Entry, Susceptible Host. Learn how EVS breaks the chain, primarily at Mode of Transmission.' },
            { title: 'Healthcare-Associated Infections (HAIs)', text: 'Definition of HAIs and common types (e.g., C. difficile, MRSA, VRE). Discuss the significant impact on patient safety and hospital costs.' },
            { title: 'Standard Precautions', text: 'Treating all blood and body fluids as potentially infectious. Key elements include hand hygiene, PPE use, safe injection practices (less relevant for EVS), respiratory hygiene/cough etiquette, and safe handling of potentially contaminated equipment/surfaces.' },
            { title: 'Transmission-Based Precautions', text: 'Additional precautions for specific pathogens: Contact (e.g., MRSA, C. diff), Droplet (e.g., Flu, Pertussis), and Airborne (e.g., TB, Measles). Understand the specific EVS requirements for each, including PPE and room cleaning protocols.' },
            { title: 'Hand Hygiene', text: 'The single most important measure. When to use soap and water vs. alcohol-based hand rub (ABHR). Proper technique for both. Five moments for hand hygiene.' },
            { title: 'Cleaning vs. Disinfecting', text: 'Defining the difference: Cleaning removes soil, Disinfecting kills pathogens. Importance of cleaning BEFORE disinfecting. Understand disinfectant types, proper dilution, and required contact/dwell times.' },
        ],
        regulations: ['JC', 'CDC', 'OSHA'],
        completed: false, // Example: User has NOT completed this one yet
        resources: [
            {name: 'CDC Guideline for Disinfection and Sterilization', url: 'https://www.cdc.gov/infectioncontrol/guidelines/disinfection/index.html'},
            {name: 'Joint Commission Infection Prevention and Control (IC) Standards', url: 'https://www.jointcommission.org/standards/standard-faqs/hospital-and-hospital-clinics/infection-prevention-and-control-ic/'},
            {name: 'CDC Hand Hygiene in Healthcare Settings', url: 'https://www.cdc.gov/handhygiene/'}
        ],
        quiz: [
            { id: 'q301', question: 'What is the primary way EVS helps break the chain of infection?', options: ['Diagnosing patients', 'Administering medication', 'Cleaning and disinfecting surfaces', 'Performing surgery'], correctAnswerIndex: 2 },
            { id: 'q302', question: 'Standard Precautions means treating which substances as potentially infectious?', options: ['Only blood', 'Only fluids from known infected patients', 'All blood and body fluids', 'Only surfaces that look dirty'], correctAnswerIndex: 2 },
            { id: 'q303', question: 'What must happen BEFORE disinfecting a surface?', options: ['It must be rinsed with water', 'It must be thoroughly cleaned', 'It must be dried with a paper towel', 'It must be inspected by a nurse'], correctAnswerIndex: 1 },
            { id: 'q304', question: 'What does "contact time" or "dwell time" refer to for a disinfectant?', options: ['How long it takes to mix the chemical', 'How long the disinfectant needs to stay wet on a surface to be effective', 'How long the bottle can be stored', 'The time it takes to clean the room'], correctAnswerIndex: 1 },
             { id: 'q305', question: 'When MUST you wash your hands with soap and water (instead of just using ABHR)?', options: ['Before entering any patient room', 'After touching a clean surface', 'When hands are visibly soiled or after caring for a patient with C. difficile', 'After removing gloves'], correctAnswerIndex: 2 },
        ]
    },
    {
        id: 'tm004',
        title: 'Using Personal Protective Equipment (PPE)',
        description: 'Proper selection, use, and disposal of PPE.',
        sections: [
             { title: 'Why Use PPE?', text: 'Protecting yourself from exposure to chemicals and infectious agents. Protecting patients and others from potential cross-contamination.' },
             { title: 'Types of PPE for EVS', text: 'Gloves (utility vs. exam), Gowns (isolation), Masks (surgical vs. N95 - understanding the difference), Eye Protection (goggles, face shields).'},
             { title: 'When to Use Specific PPE', text: 'Task-based assessment: Routine cleaning vs. spill cleanup vs. entering isolation rooms (Contact, Droplet, Airborne). Matching PPE to the potential hazard.' },
             { title: 'Donning (Putting On) PPE', text: 'Correct sequence: Gown -> Mask -> Goggles/Face Shield -> Gloves. Ensuring proper fit and coverage.' },
             { title: 'Doffing (Taking Off) PPE', text: 'Crucial step to prevent self-contamination. Correct sequence: Gloves -> Goggles/Face Shield -> Gown -> Mask. Emphasize hand hygiene immediately after removal.' },
             { title: 'PPE Disposal', text: 'Proper disposal procedures for used PPE, especially potentially contaminated items.' },
        ],
        regulations: ['OSHA', 'CDC'],
        completed: false,
        resources: [
            {name: 'OSHA Personal Protective Equipment (PPE) Standards', url: 'https://www.osha.gov/personal-protective-equipment'},
            {name: 'CDC Sequence for Donning and Doffing PPE', url: 'https://www.cdc.gov/hai/pdfs/ppe/ppe-sequence.pdf'}
        ],
        quiz: [
            { id: 'q401', question: 'What is the correct order for DONNING (putting on) standard PPE?', options: ['Gloves, Gown, Mask, Goggles', 'Mask, Gown, Goggles, Gloves', 'Gown, Mask, Goggles, Gloves', 'Goggles, Mask, Gloves, Gown'], correctAnswerIndex: 2},
            { id: 'q402', question: 'What is the primary goal of the DOFFING (taking off) sequence?', options: ['To save PPE for reuse', 'To do it as quickly as possible', 'To prevent contaminating yourself', 'To keep the PPE clean'], correctAnswerIndex: 2},
            { id: 'q403', question: 'Which type of precaution typically requires wearing an N95 respirator?', options: ['Standard Precautions', 'Contact Precautions', 'Droplet Precautions', 'Airborne Precautions'], correctAnswerIndex: 3},
        ]
    },
    {
        id: 'tm005',
        title: 'Joint Commission EVS Standards Focus',
        description: 'Key Environment of Care (EOC) and Infection Control (IC) requirements.',
        sections: [
            { title: 'The Joint Commission (TJC)', text: 'Who they are and why their accreditation is important for hospitals. Role of EVS in meeting TJC standards.' },
            { title: 'Environment of Care (EOC) Standards', text: 'Focus on EOC.02.06.01: Maintaining a safe, functional environment. How EVS contributes: Cleanliness, managing waste, safe chemical use, keeping corridors clear, reporting hazards (e.g., spills, damaged equipment).' },
            { title: 'Infection Control (IC) Standards', text: 'Focus on IC.02.01.01 and IC.02.02.01: Implementing infection prevention activities and minimizing transmission risk. How EVS contributes: Following cleaning/disinfection protocols, adherence to standard/transmission-based precautions, proper hand hygiene, managing linen and waste.' },
            { title: 'Survey Process', text: 'What to expect during a TJC survey. Importance of demonstrating knowledge of procedures, proper technique, and ability to locate resources like SDS.' },
            { title: 'Common EVS-Related Findings', text: 'Examples of common deficiencies found during surveys (e.g., dust, improper chemical storage, incorrect dwell times, lack of PPE use).' },
        ],
        regulations: ['JC'],
        completed: false,
        resources: [
             {name: 'Joint Commission Environment of Care (EC) Standards Overview', url: 'https://www.jointcommission.org/standards/standard-faqs/hospital-and-hospital-clinics/environment-of-care-ec/'},
             {name: 'Joint Commission Perspectives: The Source for EVS', url: 'https://www.jcrinc.com/the-source-for-evs/'}, // Example link, might require subscription
             {name: 'Understanding JC Standard EC.02.06.01', url: 'https://www.jointcommission.org/-/media/tjc/documents/standards/ec-dms/ec020601dmspdf.pdf'} // Example deep link, verify stability
        ],
         quiz: [
            { id: 'q501', question: 'Which TJC chapter focuses heavily on the physical safety and cleanliness of the hospital?', options: ['Medication Management (MM)', 'Infection Control (IC)', 'Environment of Care (EOC)', 'Leadership (LD)'], correctAnswerIndex: 2},
            { id: 'q502', question: 'Demonstrating proper hand hygiene is important for which TJC standard area?', options: ['Only EOC', 'Only IC', 'Both EOC and IC', 'Neither EOC nor IC'], correctAnswerIndex: 2}, // Hand hygiene falls under IC primarily, but relates to safe EOC practices
            { id: 'q503', question: 'During a TJC survey, an EVS technician might be asked to:', options: ['Prescribe medication', 'Explain how they clean high-touch surfaces', 'Perform a surgical procedure', 'Analyze lab results'], correctAnswerIndex: 1},
        ]
    },
  ];
  const module = modules.find(m => m.id === moduleId);

  if (!module) {
    return null;
  }
  return module;
}


export default async function TrainingModuleDetailPage({ params }: { params: { moduleId: string } }) {
  const module = await getModuleDetails(params.moduleId);

  if (!module) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
             <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
            <h1 className="text-2xl font-semibold mb-4">Module Not Found</h1>
            <p className="text-muted-foreground mb-6">The training module you are looking for could not be found or loaded.</p>
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
                    <CardTitle className="text-2xl mb-1 flex items-center gap-2">
                        <BookOpen className="h-6 w-6 text-primary" /> {module.title}
                    </CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {module.regulations.map((reg) => (
                        <Badge key={reg} variant="secondary">{reg}</Badge>
                        ))}
                    </div>
                </div>
                 <Badge variant={module.completed ? "default" : "outline"} className={`text-xs font-semibold px-2 py-1 rounded-full ${module.completed ? 'border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-300' : 'border-yellow-500/50 bg-yellow-500/10 text-yellow-700 dark:text-yellow-300'}`}>
                    {module.completed ? "Completed" : "In Progress"}
                </Badge>
            </div>

            </CardHeader>
            <Separator />
            <CardContent className="pt-6 space-y-6">
                 {/* Display sections if available, otherwise fallback to content */}
                {module.sections && module.sections.length > 0 ? (
                    module.sections.map((section, index) => (
                         <div key={index} className="space-y-2">
                            <h3 className="font-semibold text-lg text-primary">{section.title}</h3>
                             <p className="text-foreground/90 leading-relaxed whitespace-pre-line">{section.text}</p>
                         </div>
                    ))
                ) : module.content ? (
                     <div>
                        <h3 className="font-semibold text-lg border-b pb-2">Module Content</h3>
                        <p className="text-foreground/90 leading-relaxed whitespace-pre-line">{module.content}</p>
                     </div>
                ) : (
                    <p className="text-muted-foreground italic">No detailed content available for this module yet.</p>
                )}

                 {/* Regulations & Resources Section */}
                 {module.resources && module.resources.length > 0 && (
                    <div className="pt-4">
                         <Separator className="my-4"/>
                        <h3 className="font-semibold text-lg border-b pb-2">Relevant Regulations & Resources</h3>
                        <ul className="list-disc space-y-2 pl-5 text-sm mt-3">
                            {module.resources.map((resource, index) => (
                                <li key={index}>
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                                        {resource.name} <ExternalLink className="h-3 w-3" />
                                    </a>
                                    {!resource.url || resource.url === '#' ? <span className="text-xs text-muted-foreground ml-2">(Link placeholder)</span> : null}
                                </li>
                            ))}
                        </ul>
                    </div>
                 )}


                 {/* Quiz Section */}
                {module.quiz && module.quiz.length > 0 && !module.completed && (
                    <div className="pt-4">
                        <Separator className="my-4" />
                         <h3 className="font-semibold text-lg mb-4 text-primary">Knowledge Check</h3>
                        <Quiz questions={module.quiz} moduleId={module.id} />
                    </div>
                )}

                 {/* Completion Button (Only if not completed and no quiz or quiz passed) */}
                 {/* Logic for quiz completion needs to be handled by the Quiz component and potentially update parent state */}
                 {/*
                 {!module.completed && (!module.quiz || module.quiz.length === 0) && (
                    <div className="pt-6 border-t mt-6">
                        <Button>
                            <Check className="mr-2 h-4 w-4" /> Mark as Completed
                        </Button>
                        {/* In a real app, this button's action would update the user's progress * /}
                    </div>
                 )}
                 */}

                  {/* Show message if completed */}
                 {module.completed && (
                     <div className="mt-6 p-4 bg-green-500/10 border border-green-500/50 rounded-md text-center">
                        <Check className="w-6 h-6 text-green-700 dark:text-green-300 mx-auto mb-2"/>
                        <p className="text-sm font-medium text-green-700 dark:text-green-300">You have completed this module!</p>
                     </div>
                 )}

            </CardContent>
        </Card>


    </div>
  );
}
```