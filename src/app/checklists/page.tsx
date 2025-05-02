import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PlusCircle, ListChecks, Trash2, Edit } from "lucide-react";
import Link from "next/link";

// Mock data for checklists and tasks
const checklists = [
  {
    id: 'cl001',
    area: 'Patient Room - Daily Cleaning',
    tasks: [
      { id: 't001', description: 'Empty trash receptacles', icon: 'Trash2' },
      { id: 't002', description: 'Sanitize high-touch surfaces (door handles, light switches)', icon: 'SprayCan' }, // Placeholder, needs real icon
      { id: 't003', description: 'Clean and disinfect bathroom', icon: 'Bath' },
      { id: 't004', description: 'Mop floor', icon: 'Mop' }, // Placeholder, needs real icon
      { id: 't005', description: 'Restock supplies (soap, paper towels)', icon: 'Package' },
    ],
    lastUpdated: '2024-07-28',
    frequency: 'Daily'
  },
  {
    id: 'cl002',
    area: 'Operating Room - Terminal Clean',
    tasks: [
      { id: 't006', description: 'Wipe down walls and ceilings', icon: 'Square' }, // Placeholder
      { id: 't007', description: 'Clean and disinfect all equipment', icon: 'Microscope' }, // Placeholder
      { id: 't008', description: 'Scrub floor thoroughly', icon: 'Brush' }, // Placeholder
      { id: 't009', description: 'Replace disposable liners', icon: 'Replace' }, // Placeholder
    ],
    lastUpdated: '2024-07-25',
    frequency: 'Post-Procedure'
  },
   {
    id: 'cl003',
    area: 'Waiting Area - Hourly Rounds',
    tasks: [
      { id: 't010', description: 'Check and empty trash if needed', icon: 'Trash2' },
      { id: 't011', description: 'Wipe down seating surfaces', icon: 'Armchair' },
      { id: 't012', description: 'Spot clean floor spills', icon: 'Droplet' }, // Placeholder
    ],
    lastUpdated: '2024-07-29',
    frequency: 'Hourly'
  }
];

// Icon mapping (replace placeholders with actual icons or SVGs)
const iconMap: { [key: string]: React.ElementType } = {
  Trash2: Trash2,
  SprayCan: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15.2 5.2-1.4 1.4"/><path d="m10.4 10.4-1.4 1.4"/><path d="M18 21H6a2 2 0 0 1-2-2V10l.8-4.5a2 2 0 0 1 2-1.5h6.4a2 2 0 0 1 2 1.5L16 10v9a2 2 0 0 1-2 2Z"/><path d="M12 4c1.4 0 2.8.6 3.8 1.6"/><path d="M8.2 5.6A4.98 4.98 0 0 0 12 4"/><path d="M12 13h.01"/><path d="M12 17h.01"/></svg>,
  Bath: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5H3v2"/><path d="M9 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h11v10a2 2 0 0 1-2 2Z"/><path d="M7 12v-2"/><path d="M11 6V4h.5a1.5 1.5 0 0 1 1.5 1.5V6"/><path d="m21 12-4-4"/><path d="m17 12 4 4"/><path d="m21 16-4 4"/><path d="m17 16 4-4"/></svg>,
  Mop: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5v8a.5.5 0 0 1-1 0V13a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v6.5a.5.5 0 0 1-1 0v-8A.5.5 0 0 1 3.5 11H20a.5.5 0 0 1 .5.5Z"/><path d="M5 12V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9"/><path d="M18 9h-5"/><path d="M10 9H8"/></svg>,
  Package: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 9.4a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/><path d="M12.5 13.6C17.5 13.6 21 17 21 17H3s3.5-3.4 8.5-3.4h1Z"/></svg>,
  Square: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/></svg>,
  Microscope: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>,
  Brush: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-1.7 1.99-1.7 1.99S.29 18.17.29 17c0-1.66 1.34-3.01 3-3.01 1.33 0 1.99-1.7 1.99-1.7S7.06 13.6 7.07 14.94Z"/></svg>,
  Replace: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><polyline points="14 2 14 8 20 8"/><path d="m10.4 12.6-3 3 3 3"/><path d="M7.4 15.6h9.2"/></svg>,
  Armchair: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4.5-1.5c-2.3.9-4.7-.3-7-1-.8-.3-1.6-.3-2.5 0A2 2 0 0 0 3 11Z"/><path d="M5 18v2"/><path d="M19 18v2"/></svg>,
  Droplet: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>,
  // Add more mappings as needed
};


export default function ChecklistsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Cleaning Checklists</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Checklist
        </Button>
      </div>
      <p className="text-muted-foreground">
        Define and manage standardized cleaning checklists for different areas and frequencies.
      </p>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {checklists.map((checklist) => (
          <Card key={checklist.id} className="flex flex-col">
            <CardHeader>
               <div className="flex items-center justify-between">
                  <div>
                     <CardTitle className="flex items-center gap-2">
                        <ListChecks className="h-5 w-5 text-primary"/> {checklist.area}
                     </CardTitle>
                      <CardDescription>Frequency: {checklist.frequency} | Last Updated: {checklist.lastUpdated}</CardDescription>
                  </div>
                   <div className="flex gap-1">
                     <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                         <span className="sr-only">Delete</span>
                    </Button>
                   </div>
               </div>

            </CardHeader>
            <CardContent className="flex-grow space-y-3 pt-0 pb-4 px-6">
              <p className="text-sm font-medium mb-2 text-foreground">Tasks:</p>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                  {checklist.tasks.map((task) => {
                    const IconComponent = iconMap[task.icon] || Square; // Fallback icon
                    return (
                      <div key={task.id} className="flex items-center space-x-3">
                        {/* Example Checkbox usage, not functional state */}
                        <Checkbox id={`${checklist.id}-${task.id}`} disabled />
                         <IconComponent className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor={`${checklist.id}-${task.id}`} className="text-sm text-muted-foreground flex-1 cursor-not-allowed">
                          {task.description}
                        </Label>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
             <div className="p-4 pt-0 text-right">
                <Button variant="outline" size="sm" asChild>
                    <Link href={`/checklists/${checklist.id}`}>View/Perform</Link>
                </Button>
             </div>
          </Card>
        ))}
      </div>
        {/* Placeholder for adding more checklists or filtering */}
        <div className="flex justify-center mt-6">
             {/* <Button variant="outline">Load More</Button> */}
         </div>
    </div>
  );
}
