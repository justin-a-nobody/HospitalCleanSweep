// src/app/training/modules/[moduleId]/page.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Check, ExternalLink, BookOpen, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Quiz from "@/components/training/quiz"; // Import the new Quiz component
import { cn } from "@/lib/utils"; // Import cn utility

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
    // Optional: Add interactive elements later
    // interactiveElement?: 'drag-drop-ppe' | 'cleaning-hotspot' | null;
}

interface TrainingModule {
    id: string;
    title: string;
    description: string;
    sections?: ModuleSection[]; // Use sections instead of single content string
    content?: string; // Keep for backward compatibility or simpler modules
    regulations: string[];
    completed: boolean; // User-specific completion status
    resources: Resource[];
    quiz?: QuizQuestion[]; // Add quiz data
}


// Mock data fetching function (replace with actual data fetching)
async function getModuleDetails(moduleId: string): Promise<TrainingModule | null> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 50));

  // Find the module - in a real app, this would be an API call
  // This mock data now resides here. In a real app, fetch from DB/API.
  const modules: TrainingModule[] = [
    {
        id: 'tm001',
        title: 'Standard Cleaning Procedures',
        description: 'Protocols for routine and discharge cleaning in patient care areas.',
        sections: [
            { title: 'Introduction', text: 'Understanding the importance of standard cleaning protocols in healthcare settings. Clean environments are fundamental to preventing the spread of infections.'},
            { title: 'Routine Cleaning', text: 'Daily tasks performed in occupied patient rooms:\n• Dust high surfaces (lights, vents) moving to low surfaces.\n• Empty trash receptacles, replacing liners.\n• Clean and disinfect high-touch surfaces (bed rails, doorknobs, light switches, call buttons, overbed tables, phone).\n• Clean bathroom: toilet, sink, shower/tub, floor.\n• Mop floor starting from the farthest point and moving towards the door.' },
            { title: 'Discharge Cleaning (Terminal Clean)', text: 'Thorough cleaning and disinfection after a patient leaves:\n• Remove all linens and trash.\n• Clean and disinfect ALL surfaces, top to bottom (including walls, windowsills, furniture, equipment).\n• Pay special attention to mattress and bed frame.\n• Clean and disinfect bathroom meticulously.\n• Mop floor thoroughly.\n• Restock supplies.' },
            { title: 'High-Touch Surfaces', text: 'These require frequent and thorough cleaning due to high contamination risk. Examples: Bed rails, call buttons, doorknobs, light switches, phones, TV remotes, overbed tables, IV poles, chair arms. Use an EPA-approved disinfectant and follow contact times.' },
            { title: 'Bathroom Cleaning', text: 'Clean from cleanest to dirtiest: Sink -> Shower/Tub -> Toilet. Use designated cleaning cloths/tools for the bathroom. Disinfect all fixtures, handles, and surfaces.' },
            { title: 'Waste Removal', text: 'Regular trash: Dispose of in designated containers. Regulated Medical Waste (RMW - e.g., items saturated with blood/body fluids): Place in red biohazard bags within appropriate containers. Sharps: Dispose of immediately in puncture-resistant sharps containers. Follow facility policy for transport and storage.' },
        ],
        regulations: ['JC', 'CDC', 'AHE'],
        completed: true, // Example user progress
        resources: [
            {name: 'CDC Environmental Cleaning Procedures', url: 'https://www.cdc.gov/hai/prevent/environment/cleaning.html'},
            {name: 'AHE Practice Guidance for Healthcare EVS', url: 'https://www.ahe.org/practice-guidance'},
            {name: 'Joint Commission EOC Standards Overview', url: 'https://www.jointcommission.org/standards/standard-faqs/hospital-and-hospital-clinics/environment-of-care-ec/'}
        ],
        quiz: [
             { id: 'q101', question: 'What is the primary goal of terminal cleaning?', options: ['Tidying the room quickly', 'Thoroughly cleaning and disinfecting after patient discharge', 'Only cleaning visible dirt', 'Restocking supplies'], correctAnswerIndex: 1},
             { id: 'q102', question: 'Which of these is NOT typically considered a high-touch surface in a patient room?', options: ['Bed rail', 'Ceiling vent', 'Call button', 'Doorknob'], correctAnswerIndex: 1},
             { id: 'q103', question: 'When performing routine cleaning, which task is generally done last?', options: ['Dusting high surfaces', 'Emptying trash', 'Cleaning the bathroom', 'Mopping the floor'], correctAnswerIndex: 3},
        ]
    },
    {
        id: 'tm002',
        title: 'Hazardous Material Handling (HazCom)',
        description: 'Safe handling of cleaning chemicals and regulated medical waste.',
        sections: [
            { title: 'OSHA HazCom Standard', text: 'The Hazard Communication Standard (29 CFR 1910.1200) ensures chemical safety. Key elements: Written program, chemical inventory, Safety Data Sheets (SDS), labeling, and employee training.'},
            { title: 'Safety Data Sheets (SDS)', text: 'SDSs provide detailed info about chemical hazards, handling, storage, and emergency measures. You MUST know where to find SDSs for the chemicals you use. Sections include: Identification, Hazard(s) identification, Composition, First-aid measures, Fire-fighting measures, Accidental release measures, Handling and storage, Exposure controls/personal protection, Physical/chemical properties, Stability/reactivity, Toxicological information.' },
            { title: 'Chemical Labeling', text: 'All containers (original and secondary, like spray bottles) MUST be labeled with: Product identifier, Signal word (Danger/Warning), Hazard statement(s), Precautionary statement(s), Pictogram(s), Supplier information. Never use unlabeled containers!' },
            { title: 'Safe Chemical Use & Storage', text: 'Always follow dilution instructions precisely (Too weak = ineffective, Too strong = hazardous/damaging). Use appropriate PPE (gloves, eye protection, sometimes masks/gowns). Ensure good ventilation. Store chemicals in designated areas, away from incompatible materials, and secure from unauthorized access.' },
            { title: 'Regulated Medical Waste (RMW)', text: 'Includes sharps, items saturated with blood/body fluids, pathological waste, microbiological waste. Use correct containers (red bags, sharps containers). Do NOT overfill. Close containers properly before removal. Follow facility policy and state/local regulations.' },
            { title: 'Spill Response', text: 'Minor spills: Alert supervisor, secure area, consult SDS, wear appropriate PPE, contain spill (absorbent materials), clean/disinfect area, dispose of materials properly. Major spills: Evacuate area, notify supervisor/emergency response team immediately.' },
        ],
        regulations: ['OSHA'],
        completed: false, // Example user progress
        resources: [
            {name: 'OSHA Hazard Communication Standard (29 CFR 1910.1200)', url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1200'},
            {name: 'OSHA Bloodborne Pathogens Standard (29 CFR 1910.1030)', url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1030'},
            {name: 'OSHA FactSheet: Hazard Communication', url: 'https://www.osha.gov/sites/default/files/publications/OSHA3695.pdf'}
        ],
        quiz: [
            { id: 'q201', question: 'Where can you find detailed information about the hazards of a specific cleaning chemical?', options: ['Product label only', 'Safety Data Sheet (SDS)', 'Your supervisor tells you', 'Hospital newsletter'], correctAnswerIndex: 1},
            { id: 'q202', question: 'A spray bottle containing diluted disinfectant requires:', options: ['No label if you know what it is', 'The original manufacturer label', 'A secondary container label meeting HazCom requirements', 'Just the name of the chemical'], correctAnswerIndex: 2},
            { id: 'q203', question: 'What is the first step if you encounter a large chemical spill?', options: ['Try to clean it up quickly yourself', 'Notify your supervisor or emergency response', 'Pour water on it', 'Ignore it'], correctAnswerIndex: 1},
        ]
    },
    {
        id: 'tm003',
        title: 'Infection Control & Prevention',
        description: 'EVS role in preventing Healthcare-Associated Infections (HAIs).',
        sections: [
            { title: 'Chain of Infection', text: 'Infection requires six links: 1. Infectious Agent (germ), 2. Reservoir (where germ lives, e.g., person, surface), 3. Portal of Exit (how germ leaves, e.g., cough), 4. Mode of Transmission (how germ travels, e.g., hands, droplets), 5. Portal of Entry (how germ enters new host, e.g., mouth, wound), 6. Susceptible Host (person at risk). EVS primarily breaks the chain at #4 (Mode of Transmission) through cleaning and disinfection.' },
            { title: 'Healthcare-Associated Infections (HAIs)', text: 'Infections patients get while receiving healthcare for another condition. Common types: CLABSI (central line bloodstream infection), CAUTI (catheter-associated UTI), SSI (surgical site infection), VAE (ventilator-associated events), C. difficile, MRSA. HAIs cause significant harm and increase healthcare costs. EVS is crucial in prevention.' },
            { title: 'Standard Precautions', text: 'The basic level of infection control. Assume ALL blood, body fluids, secretions (except sweat), non-intact skin, and mucous membranes are potentially infectious. Key elements: Hand hygiene, PPE use based on anticipated exposure, respiratory hygiene/cough etiquette, safe handling of contaminated items/surfaces.' },
            { title: 'Transmission-Based Precautions', text: 'Used IN ADDITION to Standard Precautions for patients with known/suspected infections.\n• Contact: For germs spread by touch (e.g., MRSA, C. diff). Requires gown and gloves for room entry. Use dedicated or disposable equipment.\n• Droplet: For germs spread by large droplets (e.g., Flu). Requires surgical mask upon entry.\n• Airborne: For germs spread by small airborne particles (e.g., TB, Measles). Requires N95 respirator and placement in an Airborne Infection Isolation Room (AIIR).\nFollow specific EVS cleaning protocols for each type.' },
            { title: 'Hand Hygiene', text: 'Most important way to prevent infection spread. Wash with soap and water when hands are visibly soiled, after using restroom, before eating, after caring for C. diff patient. Use Alcohol-Based Hand Rub (ABHR) for routine decontamination between tasks/patients if hands not visibly soiled. Follow proper technique (duration, friction).' },
            { title: 'Cleaning vs. Disinfecting', text: 'Cleaning: Physical removal of dirt, debris, and germs using soap/detergent and water. MUST be done first.\nDisinfecting: Killing germs using EPA-approved chemicals. Requires specific contact/dwell time (time the surface must stay wet) to be effective. Always follow manufacturer instructions.' },
            // { title: 'Interactive: Break the Chain', text: 'Scenario: A patient with the flu coughs onto their bedside table. Drag the EVS actions (Hand Hygiene, Cleaning, Disinfection, PPE Use) to the correct link in the chain of infection they interrupt.', interactiveElement: 'drag-drop-infection-chain' } // Example interactive idea
        ],
        regulations: ['JC', 'CDC', 'OSHA'],
        completed: false, // Example user progress
        resources: [
            {name: 'CDC Guideline for Disinfection and Sterilization', url: 'https://www.cdc.gov/infection-control/hcp/guidance/index.html/Disinfection_Nov_2008.pdf'},
            {name: 'Joint Commission Infection Prevention and Control (IC) Standards', url: 'https://www.jointcommission.org/standards/standard-faqs/hospital-and-hospital-clinics/infection-prevention-and-control-ic/'},
            {name: 'CDC Hand Hygiene in Healthcare Settings', url: 'https://www.cdc.gov/handhygiene/'}
        ],
        quiz: [
            { id: 'q301', question: 'Cleaning must always be done ______ disinfecting.', options: ['After', 'Instead of', 'Before', 'During'], correctAnswerIndex: 2 },
            { id: 'q302', question: 'Contact Precautions primarily require wearing which PPE upon entering the room?', options: ['Surgical mask and eye protection', 'N95 respirator', 'Gown and gloves', 'Gloves only'], correctAnswerIndex: 2 },
            { id: 'q303', question: 'When should you wash your hands with soap and water instead of using ABHR?', options: ['Only at the start of your shift', 'When hands are visibly soiled or after potential C. diff exposure', 'After touching any surface', 'Before going home'], correctAnswerIndex: 1 },
            { id: 'q304', question: '"Dwell time" refers to:', options: ['How long it takes to clean a room', 'How long a disinfectant must stay wet on a surface', 'The time between routine cleanings', 'How long PPE can be worn'], correctAnswerIndex: 1 },
             { id: 'q305', question: 'EVS staff primarily help break the chain of infection by interrupting which link?', options: ['Infectious Agent', 'Reservoir', 'Mode of Transmission', 'Susceptible Host'], correctAnswerIndex: 2 },
        ]
    },
    {
        id: 'tm004',
        title: 'Using Personal Protective Equipment (PPE)',
        description: 'Proper selection, use, and disposal of PPE.',
        sections: [
             { title: 'Why Use PPE?', text: 'PPE creates a barrier between you and potential hazards (germs, chemicals). It protects YOU from exposure and prevents YOU from spreading germs to patients, other staff, or other areas.' },
             { title: 'Types of PPE for EVS', text: '• Gloves: Utility gloves (heavy-duty, reusable for cleaning, must be disinfected/replaced), Exam gloves (single-use, for patient contact areas or handling waste).\n• Gowns: Isolation gowns (fluid-resistant, protect skin/clothing), typically required for Contact Precautions or potential large splashes.\n• Masks: Surgical masks (protect from droplets), N95 respirators (protect from airborne particles, require fit-testing).\n• Eye Protection: Goggles (seal around eyes), Face shields (cover full face). Protect mucous membranes of eyes, nose, mouth from splashes/sprays.'},
             { title: 'When to Use Specific PPE', text: 'Based on risk assessment:\n• Routine Cleaning: Gloves usually sufficient.\n• Handling RMW/Soiled Linen: Gloves required, gown/eye protection if splashing likely.\n• Chemical Handling: Check SDS - typically gloves and eye protection, possibly mask/gown.\n• Isolation Rooms: Follow posted signs (Contact: Gown, Gloves; Droplet: Mask; Airborne: N95 Respirator).' },
             { title: 'Donning (Putting On) PPE', text: 'Sequence is important to avoid contamination:\n1. Perform Hand Hygiene.\n2. Gown: Tie securely.\n3. Mask/Respirator: Secure ties/loops, fit snugly.\n4. Goggles/Face Shield: Adjust for fit.\n5. Gloves: Pull cuffs over gown sleeves.\n(Think: Gown -> Mask -> Goggles -> Gloves)' },
             { title: 'Doffing (Taking Off) PPE', text: 'Critical step! Sequence designed to remove most contaminated items first and prevent self-contamination:\n1. Gloves: Peel off away from body, turning inside out.\n2. Goggles/Face Shield: Remove from the back.\n3. Gown: Untie, peel off shoulders, turn inside out, roll into a bundle.\n4. Mask/Respirator: Remove from the back (avoid touching front).\n5. Perform Hand Hygiene IMMEDIATELY.\n(Think: Alphabetical G-G-G-M - Gloves -> Goggles -> Gown -> Mask - simplified mnemonic, always check facility policy)' },
             { title: 'PPE Disposal', text: 'Dispose of used PPE in designated containers (usually regular trash unless heavily soiled or specific isolation requires biohazard). Do NOT reuse single-use items. Clean/disinfect reusable PPE (utility gloves, goggles if applicable) according to policy.' },
             // { title: 'Interactive: PPE Drag & Drop', text: 'Scenario: Entering a room on Contact Precautions. Drag the correct PPE items (Gown, Gloves, Surgical Mask, N95, Goggles) onto the figure in the correct donning order.', interactiveElement: 'drag-drop-ppe' } // Example interactive idea
        ],
        regulations: ['OSHA', 'CDC'],
        completed: false, // Example user progress
        resources: [
            {name: 'OSHA Personal Protective Equipment (PPE) Standards', url: 'https://www.osha.gov/personal-protective-equipment'},
            {name: 'CDC Sequence for Donning and Doffing PPE', url: 'https://www.cdc.gov/hai/pdfs/ppe/ppe-sequence.pdf'}
        ],
        quiz: [
            { id: 'q401', question: 'What is generally the FIRST piece of PPE you put on (after hand hygiene)?', options: ['Gloves', 'Mask', 'Gown', 'Goggles'], correctAnswerIndex: 2},
            { id: 'q402', question: 'What is the LAST step after removing all PPE?', options: ['Put on new gloves', 'Perform hand hygiene', 'Sign out', 'Take a break'], correctAnswerIndex: 1},
            { id: 'q403', question: 'Which type of PPE requires fit-testing before use?', options: ['Surgical mask', 'Utility gloves', 'Isolation gown', 'N95 respirator'], correctAnswerIndex: 3},
        ]
    },
    {
        id: 'tm005',
        title: 'Joint Commission EVS Standards Focus',
        description: 'Key Environment of Care (EOC) and Infection Control (IC) requirements relevant to EVS.',
        sections: [
            { title: 'The Joint Commission (TJC)', text: 'An independent organization that accredits and certifies healthcare organizations in the U.S. Accreditation is crucial for hospitals (e.g., for Medicare/Medicaid reimbursement). TJC surveyors visit hospitals regularly to ensure standards are met.' },
            { title: 'Environment of Care (EOC) Standards', text: 'Focus: Providing a safe, functional, and supportive environment. Key EVS relevance (examples):\n• EC.02.06.01: Maintain safe, functional spaces (cleanliness, hazard-free corridors, proper waste management, reporting broken items).\n• EC.02.05.01: Manage risks associated with hazardous materials (proper chemical storage, labeling, SDS access, spill response).\n• EC.02.02.01: Manage risks related to fire safety (keeping fire exits/equipment clear).' },
            { title: 'Infection Control (IC) Standards', text: 'Focus: Preventing and controlling infections. Key EVS relevance (examples):\n• IC.02.01.01: Implement infection prevention/control activities (following cleaning/disinfection procedures, using correct chemicals/dwell times).\n• IC.02.02.01: Minimize risk of transmitting infections (adhering to Standard/Transmission-Based Precautions, proper hand hygiene, handling linen/waste correctly).\n• IC.01.03.01: Organize infection control program (EVS is part of this program).' },
            { title: 'Survey Process - What EVS Needs to Know', text: 'Surveyors may observe EVS staff working, ask questions about procedures, check cleaning carts/closets, and review documentation.\nBe prepared to:\n• Demonstrate proper cleaning/disinfection technique.\n• Explain procedures (e.g., dwell time, dilution, PPE use).\n• Show where SDSs are located.\n• Explain hand hygiene practices.\n• Answer questions confidently and honestly (if unsure, say so and offer to find the answer/ask supervisor).' },
            { title: 'Common EVS-Related Findings During Surveys', text: '• Dust/dirt on surfaces (high/low dusting missed).\n• Improper chemical storage/labeling.\n• Not following correct dwell times.\n• Incorrect PPE use (or lack thereof).\n• Blocked fire extinguishers/exits.\n• Carts left unattended/unlocked.\n• Improper waste segregation/handling.\n• Lack of staff knowledge about procedures/SDSs.' },
        ],
        regulations: ['JC'],
        completed: false, // Example user progress
        resources: [
             {name: 'Joint Commission Environment of Care (EC) Standards Overview', url: 'https://www.jointcommission.org/standards/standard-faqs/hospital-and-hospital-clinics/environment-of-care-ec/'},
             {name: 'Joint Commission Infection Control (IC) Standards Overview', url: 'https://www.jointcommission.org/standards/standard-faqs/hospital-and-hospital-clinics/infection-prevention-and-control-ic/'},
             // Note: Direct links to specific standards often require subscription or login on TJC site. Provide general overview links.
             {name: 'AHE Resources for TJC Compliance', url: 'https://www.ahe.org/resources'} // AHE often provides member resources related to TJC
        ],
         quiz: [
            { id: 'q501', question: 'Keeping hallways clear of equipment relates primarily to which TJC standard area?', options: ['Infection Control (IC)', 'Environment of Care (EOC)', 'Medication Management (MM)', 'Leadership (LD)'], correctAnswerIndex: 1},
            { id: 'q502', question: 'During a survey, a TJC surveyor asks you the dwell time for the disinfectant you are using. What should you do?', options: ['Guess a time', 'Tell them you don\'t know', 'Show them the product label or state the correct time if known', 'Ask a nurse'], correctAnswerIndex: 2},
            { id: 'q503', question: 'Improperly labeled cleaning chemicals would likely be cited under which TJC standard area?', options: ['Primarily IC', 'Primarily EOC (specifically Hazardous Materials)', 'Both equally', 'Neither'], correctAnswerIndex: 1},
        ]
    },
  ];
  const module = modules.find(m => m.id === moduleId);

  if (!module) {
    return null; // Or handle not found case appropriately
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
                <Link href="/training/modules"> {/* Updated Link */}
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Training Modules
                </Link>
            </Button>
        </div>
    );
  }


  return (
    <div className="space-y-6">
        <Button variant="outline" size="sm" asChild className="mb-4">
            <Link href="/training/modules"> {/* Updated Link */}
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Modules
            </Link>
        </Button>

        <Card className="overflow-hidden"> {/* Added overflow-hidden */}
            <CardHeader className="bg-card"> {/* Ensure header background */}
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
                    <Badge
                        variant={module.completed ? "default" : "outline"}
                        className={cn(
                            "text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap mt-1 md:mt-0", // Added whitespace-nowrap
                            module.completed
                                ? 'border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-300'
                                : 'border-yellow-500/50 bg-yellow-500/10 text-yellow-700 dark:text-yellow-300'
                        )}
                        >
                        {module.completed ? "Completed" : "In Progress"}
                    </Badge>
                </div>
            </CardHeader>
            {/* Removed Separator, CardContent handles padding */}
            <CardContent className="pt-6 space-y-6">
                 {/* Display sections if available, otherwise fallback to content */}
                {module.sections && module.sections.length > 0 ? (
                    module.sections.map((section, index) => (
                         <div key={index} className="space-y-2 p-4 border rounded-lg bg-background shadow-sm">
                            <h3 className="font-semibold text-lg text-primary border-b pb-1 mb-2">{section.title}</h3>
                             {/* Use whitespace-pre-line to respect newlines in the text */}
                             <p className="text-foreground/90 leading-relaxed whitespace-pre-line">{section.text}</p>
                             {/* Placeholder for potential interactive elements */}
                             {/* {section.interactiveElement && (
                                <div className="mt-4 p-4 border border-dashed border-primary/50 rounded-md bg-primary/5 text-center">
                                    <p className="text-sm text-primary font-medium">Interactive Element Placeholder: {section.interactiveElement}</p>
                                    <p className="text-xs text-muted-foreground">Component to be built</p>
                                </div>
                             )} */}
                         </div>
                    ))
                ) : module.content ? ( // Fallback for simpler content structure
                     <div className="p-4 border rounded-lg bg-background shadow-sm">
                        <h3 className="font-semibold text-lg text-primary border-b pb-1 mb-2">Module Content</h3>
                        <p className="text-foreground/90 leading-relaxed whitespace-pre-line">{module.content}</p>
                     </div>
                ) : (
                    <p className="text-muted-foreground italic text-center py-4">No detailed content available for this module yet.</p>
                )}

                 {/* Regulations & Resources Section */}
                 {module.resources && module.resources.length > 0 && (
                    <div className="pt-4">
                         <Separator className="my-4"/>
                        <h3 className="font-semibold text-lg border-b pb-2 mb-3">Relevant Regulations & Resources</h3>
                        <ul className="list-disc space-y-2 pl-5 text-sm mt-3">
                            {module.resources.map((resource, index) => (
                                <li key={index}>
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                                        {resource.name} <ExternalLink className="h-3 w-3" />
                                    </a>
                                    {(!resource.url || resource.url === '#') && <span className="text-xs text-muted-foreground ml-2">(Link placeholder)</span>}
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

                 {/* Show message if completed */}
                 {module.completed && (
                     <div className="mt-6 p-4 bg-green-500/10 border border-green-500/50 rounded-md text-center">
                        <Check className="w-6 h-6 text-green-700 dark:text-green-300 mx-auto mb-2"/>
                        <p className="text-sm font-medium text-green-700 dark:text-green-300">You have completed this module!</p>
                         {/* Optional: Add button to go to next module or back to list */}
                         <Button variant="outline" size="sm" asChild className="mt-3">
                             <Link href="/training/modules">Back to Module List</Link>
                         </Button>
                     </div>
                 )}

            </CardContent>
            {/* Removed Footer - Not needed currently */}
        </Card>
    </div>
  );
}
