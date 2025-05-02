// src/app/training/train-the-trainer/[moduleId]/page.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Check, ExternalLink, ShieldAlert, Building, Users, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Quiz from "@/components/training/quiz"; // Import Quiz, though not used yet for TTT
import { cn } from "@/lib/utils";

// Mock data structure enhanced for Train the Trainer
interface Resource {
    name: string;
    url: string;
    type?: 'Regulation' | 'Guide' | 'Tool'; // Optional resource type
}

interface ModuleSection {
    title: string;
    text: string;
    teachingTip?: string; // Specific tips for trainers
}

interface QuizQuestion { // Kept for potential future use
    id: string;
    question: string;
    options: string[];
    correctAnswerIndex: number;
}

interface TrainTheTrainerModule {
    id: string;
    title: string;
    description: string;
    sections?: ModuleSection[];
    icon: React.ElementType;
    focusAreas: string[];
    resources?: Resource[];
    quiz?: QuizQuestion[]; // Quiz might be used for trainer knowledge check
}


// Mock data fetching function (replace with actual data fetching)
async function getTrainTheTrainerModuleDetails(moduleId: string): Promise<TrainTheTrainerModule | null> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 50));

  // Find the module - in a real app, this would be an API call
  const modules: TrainTheTrainerModule[] = [
    {
        id: 'ttt001',
        title: 'Training on OSHA Standards for EVS',
        description: 'Equip trainers to effectively teach OSHA regulations relevant to environmental services, including HazCom and Bloodborne Pathogens.',
        icon: ShieldAlert,
        focusAreas: ['OSHA Deep Dive', 'Teaching HazCom', 'BBP Training Techniques', 'Record Keeping'],
        sections: [
            {
                title: 'OSHA Overview for EVS Trainers',
                text: 'Understand OSHA\'s mission (Occupational Safety and Health Administration) and the importance of compliance in healthcare to ensure worker safety. Key standards impacting EVS include:\n• Hazard Communication (HazCom) - 29 CFR 1910.1200\n• Bloodborne Pathogens (BBP) - 29 CFR 1910.1030\n• Personal Protective Equipment (PPE) - 29 CFR 1910.132\n• Walking-Working Surfaces - Subpart D (ensuring safe floors, preventing slips/trips/falls)',
                teachingTip: 'Start by explaining WHY OSHA is important (worker safety, legal requirement, preventing injuries) before diving into specific rules. Use relatable scenarios like chemical splashes or needlesticks (and how standards prevent them).'
            },
            {
                title: 'Deep Dive: Hazard Communication (HazCom)',
                text: 'Review the core components of the HazCom standard trainers must teach:\n• Written HazCom Program: Ensure staff know the facility\'s plan.\n• Chemical Inventory: Staff should know what chemicals are used.\n• Safety Data Sheets (SDS): Teach how to access and understand SDSs for every hazardous chemical. Focus on Sections 2 (Hazards), 4 (First Aid), 7 (Handling/Storage), and 8 (PPE).\n• Labeling: Emphasize requirements for both manufacturer labels and secondary container labels (e.g., spray bottles). Labels must include Product Identifier, Signal Word, Hazard Statement(s), Precautionary Statement(s), Pictogram(s), and Supplier Info.\n• Training Requirements: Initial assignment and when new hazards introduced.',
                teachingTip: 'Bring example SDSs and labels (good and bad). Have trainees practice finding specific information (e.g., required PPE for chemical X, first aid for eye contact). Role-play scenarios involving unlabeled or improperly labeled secondary containers.'
            },
            {
                title: 'Deep Dive: Bloodborne Pathogens (BBP)',
                text: 'Cover essential BBP training topics:\n• Modes of Transmission: How pathogens like HIV, HBV, HCV spread (via blood, OPIM - Other Potentially Infectious Materials).\n• Exposure Control Plan (ECP): Staff must know the plan and how to access it.\n• Engineering Controls: Sharps containers, self-sheathing needles (though EVS focus is on proper disposal).\n• Work Practice Controls: Hand hygiene, proper handling/disposal of RMW, no eating/drinking in work areas, procedures for cleaning spills of blood/OPIM.\n• PPE Requirements: Gloves always, plus gowns, face shields/masks, eye protection based on anticipated exposure (splashes, aerosols).\n• Hepatitis B Vaccination: Offered free to employees with occupational exposure.\n• Post-Exposure Evaluation & Follow-up: Procedures if an exposure incident occurs.\n• Training Records: Must be maintained.',
                teachingTip: 'Emphasize the importance of Standard Precautions (treating all blood/body fluids as potentially infectious). Use case studies for potential exposure incidents (e.g., handling improperly disposed sharps, cleaning up a large blood spill). Clarify what constitutes Regulated Medical Waste (RMW) vs. regular trash.'
            },
            {
                title: 'Effective OSHA Training Techniques',
                text: 'Utilize interactive methods beyond lectures:\n• Demonstrations: Correct PPE donning/doffing sequence, proper handwashing, spill clean-up.\n• Q&A Sessions: Encourage questions and check understanding.\n• Hands-on Practice: Small group practice for spill clean-up simulation (using non-hazardous materials), PPE use.\n• Visual Aids: Posters (pictograms, hand hygiene), short videos.\n• Tailor Training: Adapt to literacy levels and language needs (use interpreters, visual aids).\n• Documentation: Stress the importance of documenting all training thoroughly (date, content, attendees, trainer signature).',
                teachingTip: 'Focus on competency validation – observe staff performing tasks (e.g., mixing a chemical, donning PPE) using a checklist. Use teach-back methods ("Show me how you would clean this spill," "Explain what this label means"). Make it relevant to their specific job tasks.'
            },
        ],
        resources: [
            { name: 'OSHA Website', url: 'https://www.osha.gov', type: 'Regulation' },
            { name: 'OSHA Hazard Communication Standard', url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1200', type: 'Regulation' },
            { name: 'OSHA Bloodborne Pathogens Standard', url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1030', type: 'Regulation' },
            { name: 'OSHA Personal Protective Equipment (PPE) Info', url: 'https://www.osha.gov/personal-protective-equipment', type: 'Guide' },
            { name: 'OSHA Healthcare E-Tool (Hazards & Solutions)', url: 'https://www.osha.gov/healthcare', type: 'Tool' },
        ],
        // Optional quiz for trainer's own knowledge check
        // quiz: [ ... ]
    },
    {
        id: 'ttt002',
        title: 'Training on Joint Commission EOC & IC Standards',
        description: 'Prepare trainers to educate staff on key Joint Commission Environment of Care and Infection Control standards impacting EVS.',
        icon: Building,
        focusAreas: ['JC Standards Explained', 'Survey Readiness Training', 'Adult Learning Principles', 'Competency Assessment'],
        sections: [
            {
                title: 'Understanding The Joint Commission (TJC)',
                text: 'Explain TJC\'s role in hospital accreditation and its focus on patient safety and quality of care. Accreditation is crucial for reputation and often required for Medicare/Medicaid reimbursement. Discuss the unannounced survey process and how EVS performance directly impacts survey outcomes, particularly in the Environment of Care (EOC) and Infection Control (IC) chapters.',
                teachingTip: 'Demystify TJC. Frame it as a partnership for ensuring safe patient care, not just an inspection to "pass." Explain the concept of "tracer methodology" – surveyors follow patients or processes to see standards in action, often observing EVS tasks directly.'
            },
            {
                title: 'Key EOC Standards for EVS Trainers',
                text: 'Review EOC standards relevant to EVS daily work (examples - specific standard numbers may change):\n• EC.02.06.01 (Maintain safe, functional environment): Cleanliness, absence of clutter/obstructions in corridors, proper storage of carts/supplies, correct waste segregation and handling (RMW, sharps, trash, linen), reporting broken equipment or hazards promptly.\n• EC.02.05.01 (Manage risks - hazardous materials): Reinforce HazCom - proper chemical storage (secured, not on floor), correct labeling, SDS accessibility, spill response preparedness.\n• EC.02.02.01 (Manage risks - fire safety): Keeping fire extinguishers, pull stations, and electrical panels unobstructed. Maintaining clear egress routes. Understanding RACE (Rescue, Alarm, Contain, Extinguish/Evacuate) and PASS (Pull, Aim, Squeeze, Sweep).\n• EC.02.04.03 (Maintain medical equipment): Reporting damaged beds, IV poles, etc., that EVS might encounter.',
                teachingTip: 'Connect EOC standards directly to daily EVS tasks (e.g., "When you mop this hall, you\'re helping meet EC.02.06.01 by keeping it safe"). Use photos of compliant vs. non-compliant areas (e.g., cluttered hallway vs. clear hallway). Practice how staff should respond to surveyor questions about these areas ("Yes, I know where the SDS book is," "I report broken items to my supervisor").'
            },
            {
                title: 'Key IC Standards for EVS Trainers',
                text: 'Focus on IC standards where EVS plays a critical role:\n• IC.02.01.01 (Implement infection prevention/control): Adhering strictly to cleaning/disinfection procedures for different areas (e.g., routine vs. discharge, isolation), using correct chemicals and dilutions, ensuring proper dwell times are achieved.\n• IC.02.02.01 (Minimize transmission risk): Consistent and correct use of Standard Precautions and Transmission-Based Precautions (Contact, Droplet, Airborne), proper PPE selection/use/disposal, impeccable hand hygiene practices, correct handling of clean vs. soiled linen and waste.\n• IC.01.03.01 (Organize infection control program): Explain that EVS is a vital part of the hospital\'s overall IC program.',
                teachingTip: 'Reinforce the "Why" behind cleaning procedures (breaking the chain of infection). Use scenarios for different precaution types ("What PPE do you need for this room?", "How does cleaning change for C. diff?"). Stress the importance of following Policies & Procedures (P&Ps) exactly – no shortcuts. Observe staff demonstrating cleaning technique.'
            },
            {
                title: 'Preparing Staff for TJC Surveys',
                text: 'Train staff on how to interact confidently and competently with surveyors:\n• Be Professional & Courteous: Introduce yourself.\n• Answer Honestly: If unsure, say "I don\'t know, but I know how to find out" (e.g., ask supervisor, check P&P).\n• Know Your Procedures: Be able to explain the cleaning process for the area you\'re in, the chemicals used, dwell times, and safety precautions.\n• Know Locations: SDS binder, ECP plan, P&P manual.\n• Demonstrate Tasks Correctly: Be prepared to show how you perform a task if asked.\n• Conduct Mock Surveys: Simulate surveyor questions and observations, provide feedback.',
                teachingTip: 'Role-play surveyor interactions using common questions ("What cleaner are you using?", "What is the dwell time?", "Show me your hand hygiene technique."). Develop simple key messages or pocket cards for staff. Ensure easy access to policies and procedures in work areas.'
            },
        ],
        resources: [
            { name: 'The Joint Commission Website', url: 'https://www.jointcommission.org', type: 'Regulation' },
            { name: 'TJC EOC Standards Overview (General Link)', url: 'https://www.jointcommission.org/standards/standard-faqs/hospital-and-hospital-clinics/environment-of-care-ec/', type: 'Guide' },
            { name: 'TJC IC Standards Overview (General Link)', url: 'https://www.jointcommission.org/standards/standard-faqs/hospital-and-hospital-clinics/infection-prevention-and-control-ic/', type: 'Guide' },
            { name: 'AHE Resources (Often has TJC guides for members)', url: 'https://www.ahe.org/resources', type: 'Tool'},
            { name: 'CDC Environmental Cleaning Toolkit for Healthcare', url: 'https://www.cdc.gov/hai/prevent/environment/toolkit.html', type: 'Tool'},
        ],
    },
    {
        id: 'ttt003',
        title: 'EVS Leadership & Training Delivery',
        description: 'Develop leadership skills for trainers, focusing on effective communication, coaching, and delivering impactful training sessions specifically tailored for EVS staff.',
        icon: Users,
        focusAreas: ['Training Delivery', 'Coaching Techniques', 'Feedback Methods', 'Adult Learning', 'EVS Task Training'],
        sections: [
            {
                title: 'The Trainer as a Leader & Role Model',
                text: 'Understand the trainer\'s crucial role in setting the standard for cleanliness and safety, motivating staff, and fostering a culture of quality and accountability within the EVS team. Emphasize the importance of professionalism (appearance, attitude), leading by example (following procedures perfectly), demonstrating respect, and promoting teamwork.',
                teachingTip: 'Discuss different leadership styles (e.g., coaching, directive) and when to use them. Encourage trainers to reflect on their own impact on team morale and performance. How can they inspire pride in the EVS role?'
            },
            {
                title: 'Effective Communication for EVS Training',
                text: 'Master communication techniques vital for training a diverse EVS workforce:\n• Active Listening: Truly hearing and understanding staff questions and concerns.\n• Clear & Simple Instructions: Avoiding jargon, using plain language, checking for understanding (teach-back).\n• Adapting Communication: Tailoring style based on individual learning needs, language barriers (using visuals, interpreters).\n• Non-Verbal Communication: Awareness of body language (yours and theirs).\n• Handling Difficult Conversations: Addressing performance issues or resistance to procedures constructively.',
                teachingTip: 'Practice active listening exercises. Role-play giving step-by-step instructions for a cleaning task. Discuss strategies for overcoming language barriers. Practice using the teach-back method ("Okay, now show/tell me how you do that").'
            },
            {
                title: 'Coaching and Mentoring EVS Staff',
                text: 'Distinguish between training (teaching new skills) and coaching (reinforcing skills, improving performance). Learn how to use coaching techniques for on-the-job training (OJT), skill reinforcement, and addressing performance gaps. Focus on providing specific, timely, and constructive feedback.',
                teachingTip: 'Introduce simple coaching models (e.g., Ask-Tell-Ask, GROW). Practice feedback scenarios using the SBI (Situation-Behavior-Impact) model – "When you [Situation], you did [Behavior], and the impact was [Impact]." Focus on observable behaviors.'
            },
            {
                title: 'Designing & Delivering Engaging EVS Training',
                text: 'Plan effective training sessions:\n• Learning Objectives: What should staff be able to DO after the training?\n• Content Selection: Focus on need-to-know information relevant to EVS tasks.\n• Activity Design: Incorporate demonstrations, hands-on practice, case studies, quizzes, group discussions.\n• Materials: Prepare visual aids, checklists, job aids.\n• Delivery Skills: Practice presentation skills, managing group dynamics, using questions effectively, managing time.',
                teachingTip: 'Have trainers outline a short training module on a specific EVS task (e.g., cleaning a high-touch surface, donning/doffing PPE). Practice delivering a small segment and receive peer feedback. Emphasize making training interactive and relevant.'
            },
            {
                title: 'Adult Learning Principles in EVS',
                text: 'Understand how adults learn best and apply it to EVS training:\n• Relevance (WIIFM): Explain why the training matters to their job and safety.\n• Experience-Based: Connect new information to their existing knowledge and experience.\n• Problem-Centered: Focus on solving real-world cleaning/safety challenges.\n• Active Participation: Involve learners through doing, discussing, and practicing.\n• Respect: Treat learners as experienced individuals.',
                teachingTip: 'Keep lectures short (10-15 min max). Use group activities, discussions, and lots of hands-on practice. Provide opportunities for immediate application of learned skills.'
            },
            {
                title: 'Competency Assessment and Documentation',
                text: 'Develop and use methods to verify staff competency after training:\n• Observation Checklists: Structured way to assess task performance.\n• Knowledge Checks: Short quizzes or questions.\n• Return Demonstration: Staff show they can perform the skill correctly.\n• Document Everything: Stress the critical importance of accurate and timely training documentation for compliance (OSHA, TJC) and tracking individual progress.',
                teachingTip: 'Develop sample competency checklists for key EVS tasks (e.g., discharge clean, floor care). Discuss best practices for objective observation and providing immediate feedback during assessments.'
            },
        ],
        resources: [
            { name: 'AHE Management & Leadership Resources', url: 'https://www.ahe.org/management-leadership', type: 'Guide' },
            { name: 'Article: Applying Adult Learning Principles', url: 'https://www.td.org/insights/applying-adult-learning-principles-to-training-design', type: 'Guide' }, // Example article
            { name: 'Guide: Giving Constructive Feedback', url: 'https://hbr.org/2017/05/how-to-give-feedback-people-can-actually-use', type: 'Guide' }, // Example guide
            { name: 'Book: "Made to Stick" (Example on communication)', url: '#', type: 'Guide' }, // Placeholder book
        ],
    },
  ];
  const module = modules.find(m => m.id === moduleId);

  if (!module) {
    return null; // Or handle not found case appropriately
  }
  return module;
}


export default async function TrainTheTrainerModuleDetailPage({ params }: { params: { moduleId: string } }) {
  const module = await getTrainTheTrainerModuleDetails(params.moduleId);

  if (!module) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
             <AlertTriangle className="w-12 h-12 text-destructive mb-4" />
            <h1 className="text-2xl font-semibold mb-4">Trainer Module Not Found</h1>
            <p className="text-muted-foreground mb-6">The training module you are looking for could not be found or loaded.</p>
            <Button asChild variant="outline">
                <Link href="/training/train-the-trainer">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Trainer Modules
                </Link>
            </Button>
        </div>
    );
  }

  const IconComponent = module.icon;

  return (
    <div className="space-y-6">
        <Button variant="outline" size="sm" asChild className="mb-4">
            <Link href="/training/train-the-trainer">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Trainer Modules
            </Link>
        </Button>

        <Card className="overflow-hidden">
            <CardHeader className="bg-card">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                        <CardTitle className="text-2xl mb-1 flex items-center gap-2">
                            <IconComponent className="h-6 w-6 text-primary" /> {module.title}
                        </CardTitle>
                        <CardDescription>{module.description}</CardDescription>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {module.focusAreas?.map((area) => (
                               <Badge key={area} variant="secondary">{area}</Badge>
                            ))}
                        </div>
                    </div>
                    {/* Removed completion badge for now - trainer modules are reference/learning */}
                </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
                 {module.sections && module.sections.length > 0 ? (
                    module.sections.map((section, index) => (
                         <div key={index} className="space-y-2 p-4 border rounded-lg bg-background shadow-sm">
                            <h3 className="font-semibold text-lg text-primary border-b pb-1 mb-2">{section.title}</h3>
                             <p className="text-foreground/90 leading-relaxed whitespace-pre-line">{section.text}</p>
                             {section.teachingTip && (
                                 <div className="mt-3 pt-3 border-t border-dashed border-blue-200 dark:border-blue-800">
                                     <p className="text-sm font-medium text-blue-600 dark:text-blue-400">💡 Teaching Tip:</p>
                                     <p className="text-sm text-blue-700/90 dark:text-blue-300/90 italic whitespace-pre-line">{section.teachingTip}</p>
                                 </div>
                             )}
                         </div>
                    ))
                ) : (
                    <p className="text-muted-foreground italic text-center py-4">No detailed content available for this module yet.</p>
                )}

                 {/* Resources Section */}
                 {module.resources && module.resources.length > 0 && (
                    <div className="pt-4">
                         <Separator className="my-4"/>
                        <h3 className="font-semibold text-lg border-b pb-2 mb-3">Resources for Trainers</h3>
                        <ul className="list-disc space-y-2 pl-5 text-sm mt-3">
                            {module.resources.map((resource, index) => (
                                <li key={index}>
                                     {resource.type && <Badge variant="outline" className="mr-2 text-xs">{resource.type}</Badge>}
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                                        {resource.name}
                                        {resource.url && resource.url !== '#' && <ExternalLink className="h-3 w-3" />}
                                    </a>
                                    {(!resource.url || resource.url === '#') && <span className="text-xs text-muted-foreground ml-2">(Link unavailable)</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                 )}

                 {/* Optional Quiz Section for Trainer Knowledge Check */}
                {/* {module.quiz && module.quiz.length > 0 && (
                    <div className="pt-4">
                        <Separator className="my-4" />
                         <h3 className="font-semibold text-lg mb-4 text-primary">Trainer Knowledge Check</h3>
                        <Quiz questions={module.quiz} moduleId={module.id} />
                    </div>
                )} */}

                 {/* Completion/Next Step Section */}
                 <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/50 rounded-md text-center">
                    <Check className="w-6 h-6 text-blue-700 dark:text-blue-300 mx-auto mb-2"/>
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Module review complete. Utilize these materials and tips to effectively train your EVS team.</p>
                    <Button variant="outline" size="sm" asChild className="mt-3">
                        <Link href="/training/train-the-trainer">Back to Trainer Modules</Link>
                    </Button>
                 </div>

            </CardContent>
        </Card>
    </div>
  );
}
