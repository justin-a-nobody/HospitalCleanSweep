import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, FileText, Filter, Download } from "lucide-react";
import Link from "next/link";

// Mock data for inspection reports
const inspectionReports = [
  { id: 'insp001', area: 'Patient Wing A', date: '2024-07-28', inspector: 'Jane Doe', score: 95, status: 'Passed', issues: 1 },
  { id: 'insp002', area: 'Emergency Department', date: '2024-07-27', inspector: 'John Smith', score: 82, status: 'Needs Improvement', issues: 4 },
  { id: 'insp003', area: 'Operating Suite 3', date: '2024-07-26', inspector: 'Jane Doe', score: 98, status: 'Passed', issues: 0 },
  { id: 'insp004', area: 'Cafeteria', date: '2024-07-25', inspector: 'Alex Green', score: 75, status: 'Failed', issues: 7 },
  { id: 'insp005', area: 'Patient Wing B', date: '2024-07-24', inspector: 'John Smith', score: 91, status: 'Passed', issues: 2 },
];

const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status.toLowerCase()) {
        case 'passed':
            return 'default'; // Greenish in theme potentially
        case 'needs improvement':
            return 'secondary'; // Yellowish/Orangish
        case 'failed':
            return 'destructive'; // Reddish
        default:
            return 'outline';
    }
}


export default function InspectionsPage() {
  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Inspection Reports</h1>
         <div className="flex gap-2">
            <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
             <Button variant="outline">
                <Download className="mr-2 h-4 w-4" /> Export
            </Button>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Start New Inspection
            </Button>
         </div>

      </div>
      <p className="text-muted-foreground">
        Review past inspections, track compliance scores, and identify areas needing attention.
      </p>

      <Card>
         <CardHeader>
             <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary"/> Recent Inspections
             </CardTitle>
             <CardDescription>Overview of the latest inspection results.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Area Inspected</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Inspector</TableHead>
                <TableHead className="text-right">Score (%)</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Issues Found</TableHead>
                 <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inspectionReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.area}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.inspector}</TableCell>
                  <TableCell className="text-right">{report.score}</TableCell>
                  <TableCell className="text-center">
                     <Badge variant={getStatusBadgeVariant(report.status)}>
                       {report.status}
                     </Badge>
                  </TableCell>
                   <TableCell className={`text-right ${report.issues > 0 ? 'text-destructive font-semibold' : ''}`}>
                    {report.issues}
                    </TableCell>
                   <TableCell className="text-right">
                     <Button variant="link" size="sm" asChild className="h-auto p-0 text-primary">
                        <Link href={`/inspections/${report.id}`}>View Details</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        {/* Add Pagination if needed */}
        {/* <CardFooter className="flex justify-center">
             <Button variant="outline">Load More Reports</Button>
        </CardFooter> */}
      </Card>
    </div>
  );
}
