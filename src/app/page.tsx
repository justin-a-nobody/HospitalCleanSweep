import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen, CheckSquare, FileText } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome to CleanSweep! Manage training, checklists, and inspections efficiently.
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Training Modules
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 Active</div>
            <p className="text-xs text-muted-foreground">
              +2 pending review
            </p>
             <Button asChild size="sm" className="mt-4">
              <Link href="/training">View Modules</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Cleaning Checklists
            </CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 Available</div>
            <p className="text-xs text-muted-foreground">
              Covering all major areas
            </p>
             <Button asChild size="sm" className="mt-4">
              <Link href="/checklists">Manage Checklists</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inspection Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Pending</div>
            <p className="text-xs text-muted-foreground">
              From the last 7 days
            </p>
            <Button asChild size="sm" className="mt-4">
              <Link href="/inspections">View Reports</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* You can add more dashboard elements like charts or recent activity here */}
       <Card>
         <CardHeader>
           <CardTitle>Recent Activity</CardTitle>
           <CardDescription>Overview of recent actions and updates.</CardDescription>
         </CardHeader>
         <CardContent>
           {/* Placeholder for recent activity feed */}
           <p className="text-muted-foreground italic">No recent activity to display.</p>
         </CardContent>
       </Card>

    </div>
  );
}
