import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LifeBuoy, HelpCircle, BookOpenText } from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
        <LifeBuoy className="w-7 h-7" /> Support
      </h1>
      <p className="text-muted-foreground">
        Find help and resources for using the CleanSweep application.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
         <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2"><HelpCircle className="w-5 h-5 text-primary"/> Frequently Asked Questions</CardTitle>
            <CardDescription>Find answers to common questions about CleanSweep.</CardDescription>
            </CardHeader>
            <CardContent>
                {/* Placeholder for FAQ content or link */}
                 <p className="text-muted-foreground italic">FAQs coming soon.</p>
                <Button variant="outline" size="sm" className="mt-4" disabled>View FAQs</Button>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2"><BookOpenText className="w-5 h-5 text-primary"/> Documentation</CardTitle>
            <CardDescription>Read detailed guides and tutorials.</CardDescription>
            </CardHeader>
            <CardContent>
                 {/* Placeholder for Documentation content or link */}
                <p className="text-muted-foreground italic">Documentation is under development.</p>
                <Button variant="outline" size="sm" className="mt-4" disabled>Browse Docs</Button>
            </CardContent>
        </Card>
      </div>


      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>Reach out to our support team for assistance.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Placeholder for contact form or information */}
           <div>
            <h4 className="font-semibold">Email Support</h4>
            <p className="text-sm text-muted-foreground">For technical issues or questions, email us at:</p>
            <a href="mailto:support@cleansweep.app" className="text-primary hover:underline text-sm">support@cleansweep.app</a>
           </div>
            <div>
            <h4 className="font-semibold">Phone Support</h4>
            <p className="text-sm text-muted-foreground">Call us during business hours (9 AM - 5 PM ET):</p>
            <a href="tel:+1-800-555-1234" className="text-primary hover:underline text-sm">+1-800-555-1234</a>
           </div>
           {/* Optionally add a contact form component here */}
        </CardContent>
      </Card>
    </div>
  );
}
