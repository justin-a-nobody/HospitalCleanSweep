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
        sections: [
            {
                title: 'OSHA Overview for EVS Trainers',
                text: 'Understand OSHA\'s mission and the importance of compliance in healthcare. Key standards impacting EVS: Hazard Communication (HazCom), Bloodborne Pathogens (BBP), Personal Protective Equipment (PPE), Walking-Working Surfaces.',
                teachingTip: 'Start by explaining WHY OSHA is important (worker safety) before diving into specific rules. Use relatable scenarios.'
            },
            {
                title: 'Deep Dive: Hazard Communication (HazCom)',
                text: 'Review the components of the HazCom standard: Written program, chemical inventory, Safety Data Sheets (SDS), labeling, training requirements. Focus on trainer responsibilities for ensuring staff understand SDSs, labels (primary & secondary), and safe chemical handling/storage.',
                teachingTip: 'Bring example SDSs and labels. Have trainees practice finding specific information (e.g., PPE requirements, first aid). Role-play scenarios involving unlabeled containers.'
            },
            {
                title: 'Deep Dive: Bloodborne Pathogens (BBP)',
                text: 'Cover modes of transmission, engineering controls (sharps containers), work practice controls (hand hygiene, handling waste), PPE requirements, Hepatitis B vaccination, post-exposure procedures, and training record requirements.',
                teachingTip: 'Emphasize the importance of Standard Precautions. Use case studies for exposure incidents (needlestick, splash). Clarify what constitutes Regulated Medical Waste (RMW).'
            },
            {
                title: 'Effective OSHA Training Techniques',
                text: 'Utilize interactive methods: Demonstrations (PPE donning/doffing), Q&A sessions, hands-on practice (spill clean-up simulation), visual aids (posters, videos). Tailor training to literacy levels and language needs. Document all training thoroughly.',
                teachingTip: 'Focus on competency validation – observe staff performing tasks. Use teach-back methods to confirm understanding.'
            },
        ],
        resources: [
            { name: 'OSHA Website', url: 'https://www.osha.gov', type: 'Regulation' },
            { name: 'OSHA Hazard Communication Standard', url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1200', type: 'Regulation' },
            { name: 'OSHA Bloodborne Pathogens Standard', url: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1030', type: 'Regulation' },
            { name: 'OSHA Healthcare E-Tool', url: 'https://www.osha.gov/healthcare', type: 'Tool' },
        ],
        // Optional quiz for trainer's own knowledge check
        // quiz: [ ... ]
    },
    {
        id: 'ttt002',
        title: 'Training on Joint Commission EOC & IC Standards',
        description: 'Prepare trainers to educate staff on key Joint Commission Environment of Care and Infection Control standards impacting EVS.',
        icon: Building,
        sections: [
            {
                title: 'Understanding The Joint Commission (TJC)',
                text: 'Explain TJC\'s role in hospital accreditation and patient safety. Discuss the survey process and how EVS performance directly impacts survey outcomes. Focus on Environment of Care (EOC) and Infection Control (IC) chapters.',
                teachingTip: 'Demystify TJC. Frame it as a partnership for patient safety, not just an inspection. Explain the concept of "tracer methodology" during surveys.'
            },
            {
                title: 'Key EOC Standards for EVS Trainers',
                text: 'Review standards related to: Maintaining a safe environment (cleanliness, clutter-free corridors, proper waste handling), managing hazardous materials & waste (linking back to OSHA), fire safety (keeping exits/equipment clear), and equipment management (reporting issues).',
                teachingTip: 'Connect EOC standards to daily EVS tasks. Use photos of compliant vs. non-compliant areas. Practice how staff should respond to surveyor questions about these areas.'
            },
            {
                title: 'Key IC Standards for EVS Trainers',
                text: 'Focus on standards related to: Implementing infection prevention activities (cleaning/disinfection protocols, dwell times, hand hygiene), minimizing transmission risk (Standard/Transmission-Based Precautions, PPE use), and handling contaminated items (linen, waste).',
                teachingTip: 'Reinforce the "Why" behind cleaning procedures (breaking the chain of infection). Use scenarios for different precaution types. Stress the importance of following P&Ps exactly.'
            },
            {
                title: 'Preparing Staff for TJC Surveys',
                text: 'Train staff on how to interact with surveyors: Be confident, answer honestly, know procedures, know where to find information (SDSs, P&Ps), demonstrate tasks correctly. Conduct mock surveys and provide feedback.',
                teachingTip: 'Role-play surveyor interactions. Develop simple key messages for staff to remember. Ensure easy access to policies and procedures.'
            },
            {
                title: 'Adult Learning Principles for Trainers',
                text: 'Understand how adults learn best: Relevance (WIIFM - What\'s In It For Me?), experience-based learning, problem-centered approach, active participation. Apply these principles to EVS training design and delivery.',
                teachingTip: 'Keep lectures short. Use group activities, discussions, and hands-on practice. Provide positive reinforcement and constructive feedback.'
            },
        ],
        resources: [
            { name: 'The Joint Commission Website', url: 'https://www.jointcommission.org', type: 'Regulation' },
            { name: 'TJC EOC Standards Overview (Example Link)', url: 'https://www.jointcommission.org/standards/standard-faqs/hospital-and-hospital-clinics/environment-of-care-ec/', type: 'Guide' },
            { name: 'TJC IC Standards Overview (Example Link)', url: 'https://www.jointcommission.org/standards/standard-faqs/hospital-and-hospital-clinics/infection-prevention-and-control-ic/', type: 'Guide' },
            { name: 'AHE Resources (Often has TJC guides)', url: 'https://www.ahe.org/resources', type: 'Tool'},
        ],
    },
    {
        id: 'ttt003',
        title: 'EVS Leadership & Training Delivery',
        description: 'Develop leadership skills for trainers, focusing on effective communication, coaching, and delivering impactful training sessions.',
        icon: Users,
        sections: [
            {
                title: 'The Trainer as a Leader & Role Model',
                text: 'Understand the trainer\'s role in setting standards, motivating staff, and fostering a culture of safety and quality. Importance of professionalism, positive attitude, and leading by example.',
                teachingTip: 'Discuss leadership styles. Encourage trainers to reflect on their own impact on team morale and performance.'
            },
            {
                title: 'Effective Communication for Trainers',
                text: 'Techniques for clear and concise communication: Active listening, providing clear instructions, adapting communication style to the audience, non-verbal communication awareness, handling difficult conversations.',
                teachingTip: 'Practice active listening exercises. Role-play giving instructions and providing feedback (both positive and corrective).'
            },
            {
                title: 'Coaching and Mentoring EVS Staff',
                text: 'Difference between training and coaching. Using coaching techniques to reinforce learning, improve performance, and develop staff skills on-the-job. Providing constructive feedback effectively.',
                teachingTip: 'Introduce simple coaching models (e.g., GROW). Practice feedback scenarios using the SBI (Situation-Behavior-Impact) model.'
            },
            {
                title: 'Designing & Delivering Engaging Training',
                text: 'Planning training sessions: Objectives, content, activities, materials, timing. Delivering training: Presentation skills, managing group dynamics, using visual aids, facilitating discussions and activities.',
                teachingTip: 'Have trainers develop a short training module outline. Practice presenting a small segment and receive peer feedback.'
            },
            {
                title: 'Competency Assessment and Documentation',
                text: 'Methods for verifying staff competency after training (observation checklists, knowledge checks, return demonstration). Importance of accurate and timely documentation for compliance and tracking.',
                teachingTip: 'Develop sample competency checklists. Discuss best practices for objective observation and fair assessment.'
            },
        ],
        resources: [
            { name: 'AHE Management & Leadership Resources', url: 'https://www.ahe.org/management-leadership', type: 'Guide' },
            { name: 'Article: Adult Learning Principles (Example)', url: '#', type: 'Guide' }, // Placeholder - find relevant article
            { name: 'Book: Crucial Conversations (Example)', url: '#', type: 'Guide' }, // Placeholder - example book resource
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
                        {/* Optional: Add focus areas as badges if needed */}
                        {/* <div className="flex flex-wrap gap-2 mt-3">
                            {module.focusAreas?.map((area) => (
                               <Badge key={area} variant="secondary">{area}</Badge>
                            ))}
                        </div> */}
                    </div>
                    {/* Removed completion badge for now */}
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
                                     <p className="text-sm text-blue-700/90 dark:text-blue-300/90 italic">{section.teachingTip}</p>
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

                 {/* Completion Section (Placeholder) */}
                 <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/50 rounded-md text-center">
                    <Check className="w-6 h-6 text-blue-700 dark:text-blue-300 mx-auto mb-2"/>
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Review complete. Use these materials to train your team.</p>
                    <Button variant="outline" size="sm" asChild className="mt-3">
                        <Link href="/training/train-the-trainer">Back to Trainer Modules</Link>
                    </Button>
                 </div>

            </CardContent>
        </Card>
    </div>
  );
}
