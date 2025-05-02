import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, CheckSquare, FileText, GraduationCap, SquareCheckBig, ShieldAlert, FlaskConical, ClipboardCheck } from "lucide-react"; // Added ClipboardCheck

export default function Dashboard() {
  // Mock data - replace with real data fetching later
  const activeModulesCount = 5; // Example
  const pendingReviewCount = 2; // Example
  const checklistsAvailableCount = 12; // Example
  const pendingReportsCount = 3; // Example
   const oshaTrainingModulesCount = 6; // Example, based on 6 OSHA-related modules
   const availableSurveysCount = 4; // Example

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome to CleanSweep! Manage training, checklists, and inspections efficiently.
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> {/* Adjusted grid columns */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Training Program
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" /> {/* Changed Icon */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeModulesCount} Modules Active</div>
            <p className="text-xs text-muted-foreground">
              +{pendingReviewCount} pending review
            </p>
             {/* Ensure no whitespace between Button and Link when using asChild */}
             <Button asChild size="sm" className="mt-4"><Link href="/training">View Training Overview</Link></Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Cleaning Checklists
            </CardTitle>
             {/* Using SquareCheckBig as CheckSquare might be interpreted differently */}
             <SquareCheckBig className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{checklistsAvailableCount} Available</div>
            <p className="text-xs text-muted-foreground">
              Covering all major areas
            </p>
             {/* Ensure no whitespace between Button and Link when using asChild */}
             <Button asChild size="sm" className="mt-4"><Link href="/checklists">Manage Checklists</Link></Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inspection Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReportsCount} Pending</div>
            <p className="text-xs text-muted-foreground">
              From the last 7 days
            </p>
            {/* Ensure no whitespace between Button and Link when using asChild */}
            <Button asChild size="sm" className="mt-4"><Link href="/inspections">View Reports</Link></Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-muted-foreground" /> OSHA Safety Training
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{oshaTrainingModulesCount} Modules Available</div>
            <p className="text-xs text-muted-foreground">
              HazCom, PPE, BBP, Fall Protection...
            </p>
             <Button asChild size="sm" className="mt-4"><Link href="/training/modules">Explore OSHA Modules</Link></Button>
          </CardContent>
        </Card>

        {/* New Joint Commission Survey Card */}
         <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-muted-foreground" /> Joint Commission Surveys
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableSurveysCount} Survey Types</div>
            <p className="text-xs text-muted-foreground">
              Prepare for and track TJC surveys.
            </p>
             {/* Link to inspections page as placeholder for surveys */}
             <Button asChild size="sm" variant="secondary" className="mt-4"><Link href="/inspections">Manage Surveys</Link></Button>
          </CardContent>
        </Card>
      </div>


       <Card>
         <CardHeader>
           <CardTitle>Recent Activity</CardTitle>
           <CardDescription>Overview of recent actions and updates.</CardDescription>
         </CardHeader>
         <CardContent>
           {/* Placeholder for recent activity feed */}
           <p className="text-muted-foreground italic">No recent activity to display.</p>
           {/* Future: List recent module completions, checklist submissions, inspection results */}
           {/* Example:
           <ul className="space-y-2 text-sm">
             <li>User John D. completed 'Standard Cleaning Procedures'.</li>
             <li>Checklist 'Patient Room - Daily' submitted for Room A101.</li>
             <li>Inspection Report for 'Emergency Department' resulted in 'Passed'.</li>
           </ul>
           */}
         </CardContent>
       </Card>

    </div>
  );
}
