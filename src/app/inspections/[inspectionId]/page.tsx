import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FileText, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

// Mock data fetching function (replace with actual data fetching)
async function getInspectionDetails(inspectionId: string) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 50));

  // Mock data including specific issues
  const reports: { [key: string]: any } = {
    insp001: { id: 'insp001', area: 'Patient Wing A', date: '2024-07-28', inspector: 'Jane Doe', score: 95, status: 'Passed', issues: [{ id: 'i001', description: 'Dust observed on high shelf in Room A102', severity: 'Minor', category: 'Dusting', status: 'Resolved' }] },
    insp002: { id: 'insp002', area: 'Emergency Department', date: '2024-07-27', inspector: 'John Smith', score: 82, status: 'Needs Improvement', issues: [
        { id: 'i002', description: 'Streaks on floor near entrance', severity: 'Moderate', category: 'Floor Care', status: 'Pending' },
        { id: 'i003', description: 'Trash overflow in waiting area bin', severity: 'Minor', category: 'Waste Management', status: 'Pending' },
        { id: 'i004', description: 'Supply closet disorganized', severity: 'Minor', category: 'Organization', status: 'Open' },
        { id: 'i005', description: 'Fingerprints on glass door', severity: 'Minor', category: 'Surface Cleaning', status: 'Open' }
    ]},
    insp003: { id: 'insp003', area: 'Operating Suite 3', date: '2024-07-26', inspector: 'Jane Doe', score: 98, status: 'Passed', issues: [] },
    insp004: { id: 'insp004', area: 'Cafeteria', date: '2024-07-25', inspector: 'Alex Green', score: 75, status: 'Failed', issues: [
        { id: 'i006', description: 'Food debris under tables', severity: 'Major', category: 'Floor Care', status: 'Open' },
        { id: 'i007', description: 'Sticky residue on condiment station', severity: 'Moderate', category: 'Surface Cleaning', status: 'Pending' },
        // ... more issues
    ]},
    insp005: { id: 'insp005', area: 'Patient Wing B', date: '2024-07-24', inspector: 'John Smith', score: 91, status: 'Passed', issues: [
        { id: 'i008', description: 'Mirror streaked in B205 bathroom', severity: 'Minor', category: 'Surface Cleaning', status: 'Resolved' },
        { id: 'i009', description: 'Low soap level in B2 corridor dispenser', severity: 'Minor', category: 'Restocking', status: 'Resolved' },
    ]},
  };
  const report = reports[inspectionId];

  if (!report) {
    return null;
  }
  return report;
}

const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status.toLowerCase()) {
        case 'passed': return 'default';
        case 'needs improvement': return 'secondary';
        case 'failed': return 'destructive';
        default: return 'outline';
    }
}

const getSeverityBadgeVariant = (severity: string): "destructive" | "secondary" | "outline" => {
     switch (severity.toLowerCase()) {
        case 'major': return 'destructive';
        case 'moderate': return 'secondary';
        case 'minor': return 'outline';
        default: return 'outline';
    }
}

const getIssueStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
        case 'resolved': return <CheckCircle className="h-4 w-4 text-green-600" />;
        case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
        case 'open': return <XCircle className="h-4 w-4 text-red-600" />;
        default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
}

export default async function InspectionReportDetailPage({ params }: { params: { inspectionId: string } }) {
  const report = await getInspectionDetails(params.inspectionId);

   if (!report) {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-semibold mb-4">Inspection Report Not Found</h1>
            <p className="text-muted-foreground mb-4">The report you are looking for does not exist.</p>
            <Button asChild>
                <Link href="/inspections">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Inspections
                </Link>
            </Button>
        </div>
    );
  }


  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" asChild className="mb-4">
        <Link href="/inspections">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Inspections
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
             <div>
                <CardTitle className="flex items-center gap-2 text-2xl mb-1">
                    <FileText className="h-6 w-6 text-primary"/> Inspection Report: {report.area}
                </CardTitle>
                <CardDescription>Inspected on {report.date} by {report.inspector}</CardDescription>
             </div>
              <div className="flex flex-col items-start md:items-end gap-2">
                 <Badge variant={getStatusBadgeVariant(report.status)} className="text-sm px-3 py-1">{report.status}</Badge>
                 <span className="text-lg font-bold">Score: {report.score}%</span>
              </div>
          </div>

        </CardHeader>
        <Separator />
        <CardContent className="pt-6 space-y-4">
          <h3 className="font-semibold text-lg">Identified Issues ({report.issues.length})</h3>
          {report.issues.length > 0 ? (
            <div className="space-y-3">
              {report.issues.map((issue: any) => (
                <div key={issue.id} className="p-3 border rounded-md bg-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex-1">
                         <p className="text-sm font-medium text-foreground">{issue.description}</p>
                         <p className="text-xs text-muted-foreground">Category: {issue.category}</p>
                    </div>
                    <div className="flex items-center gap-2 sm:justify-end flex-wrap">
                         <Badge variant={getSeverityBadgeVariant(issue.severity)}>{issue.severity}</Badge>
                         <div className="flex items-center gap-1 text-xs font-medium">
                            {getIssueStatusIcon(issue.status)}
                            <span>{issue.status}</span>
                         </div>
                    </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground italic text-center py-4">No issues were identified during this inspection. Great job!</p>
          )}
        </CardContent>
         <CardFooter className="flex justify-end border-t pt-4 gap-2">
              {/* Add actions like "Assign Tasks", "Generate PDF", etc. */}
              <Button variant="outline">Print / PDF</Button>
              {report.issues.length > 0 && <Button>Create Corrective Actions</Button>}
        </CardFooter>
      </Card>
    </div>
  );
}

// Optional: Generate static paths if needed
// export async function generateStaticParams() {
//   // Fetch or define report IDs
//   const reports = [{ id: 'insp001' }, { id: 'insp002' }, /* ... */];
//   return reports.map((report) => ({
//     inspectionId: report.id,
//   }));
// }
