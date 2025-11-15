import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Calendar, DollarSign, FileText, MessageCircle, Info } from "lucide-react";
import { useState } from "react";

export const LeaseAnalysis = () => {
  const [selectedJargon, setSelectedJargon] = useState<string | null>(null);

  const jargonTerms = [
    { term: "Joint and Several Liability", definition: "Each tenant is responsible for the full rent amount, not just their share. If a roommate doesn't pay, you could be held responsible for their portion." },
    { term: "Security Deposit", definition: "Money held by the landlord as protection against damages. Must be returned within 21-30 days (varies by state) after move-out, minus any valid deductions." },
    { term: "Sublet", definition: "When you rent your space to someone else while you're still on the lease. Usually requires landlord approval." },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-3">Your Lease Analysis</h2>
        <p className="text-muted-foreground">Here's what the Lease Fairy found</p>
      </div>

      {/* Overview Card */}
      <Card className="p-6 border-accent/20 shadow-lg">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
            <FileText className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Lease Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <InfoItem label="Agreement Type" value="Standard Residential Lease" />
              <InfoItem label="Duration" value="12 months" />
              <InfoItem label="Monthly Rent" value="$1,850" />
            </div>
          </div>
        </div>
      </Card>

      {/* Red Flags */}
      <Card className="p-6 border-warning/20 bg-warning/5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-warning" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-4">Red Flags Found</h3>
            <div className="space-y-3">
              <RedFlag 
                title="Automatic Renewal Clause"
                description="Your lease automatically renews unless you give 60 days notice. Mark your calendar for the deadline."
                severity="medium"
              />
              <RedFlag 
                title="Late Fee Policy"
                description="$75 late fee applies after 5 days. This is higher than typical market rates (usually $50)."
                severity="high"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Key Dates */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
            <Calendar className="h-6 w-6 text-secondary" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-4">Important Dates</h3>
            <div className="space-y-3">
              <DateItem date="Jan 1, 2025" event="Lease Start Date" />
              <DateItem date="Nov 1, 2025" event="Notice Deadline for Non-Renewal" urgent />
              <DateItem date="Dec 31, 2025" event="Lease End Date" />
            </div>
            <Button variant="outline" className="mt-4" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Set Reminders
            </Button>
          </div>
        </div>
      </Card>

      {/* Hidden Fees */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
            <DollarSign className="h-6 w-6 text-success" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-4">Potential Fees & Costs</h3>
            <div className="space-y-2">
              <FeeItem name="Security Deposit" amount="$1,850" refundable />
              <FeeItem name="Pet Deposit" amount="$500" refundable />
              <FeeItem name="Application Fee" amount="$75" />
              <FeeItem name="Late Payment Fee" amount="$75" />
              <FeeItem name="Early Termination Fee" amount="2 months rent" />
            </div>
          </div>
        </div>
      </Card>

      {/* Responsibilities */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6 text-center">Responsibilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="h-4 w-4 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground">Tenant Responsibilities</h4>
            </div>
            <ul className="space-y-2">
              <ResponsibilityItem text="Pay rent on time by the 1st of each month" />
              <ResponsibilityItem text="Maintain cleanliness and sanitation of the unit" />
              <ResponsibilityItem text="Report maintenance issues within 24 hours" />
              <ResponsibilityItem text="Obtain renter's insurance (minimum $100k coverage)" />
              <ResponsibilityItem text="No alterations without written landlord approval" />
              <ResponsibilityItem text="Comply with noise ordinances (quiet hours 10pm-7am)" />
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                <FileText className="h-4 w-4 text-secondary" />
              </div>
              <h4 className="font-semibold text-foreground">Landlord Responsibilities</h4>
            </div>
            <ul className="space-y-2">
              <ResponsibilityItem text="Provide habitable living conditions" />
              <ResponsibilityItem text="Maintain heating, plumbing, and electrical systems" />
              <ResponsibilityItem text="Address repairs within 7 days of notification" />
              <ResponsibilityItem text="Provide 24-hour notice before entry (except emergencies)" />
              <ResponsibilityItem text="Return security deposit within 21 days of move-out" />
              <ResponsibilityItem text="Maintain common areas and exterior of building" />
            </ul>
          </div>
        </div>
      </Card>

      {/* Legal Jargon */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Info className="h-6 w-6 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-4">Legal Terms Explained</h3>
            <p className="text-sm text-muted-foreground mb-4">Click on any term to see what it means</p>
            <div className="flex flex-wrap gap-2">
              {jargonTerms.map((item) => (
                <Badge
                  key={item.term}
                  variant="outline"
                  className="cursor-pointer hover:bg-accent/10 transition-colors px-3 py-1"
                  onClick={() => setSelectedJargon(item.term)}
                >
                  {item.term}
                </Badge>
              ))}
            </div>
            {selectedJargon && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-medium text-foreground mb-2">{selectedJargon}</p>
                <p className="text-sm text-muted-foreground">
                  {jargonTerms.find(t => t.term === selectedJargon)?.definition}
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Chat with Lease Fairy */}
      <Card className="p-6 bg-gradient-to-br from-accent/5 to-secondary/5 border-accent/20">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
            <MessageCircle className="h-8 w-8 text-accent" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Have Questions?</h3>
            <p className="text-muted-foreground">Ask Lease Fairy anything about your agreement</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <MessageCircle className="h-4 w-4 mr-2" />
            Start Chatting
          </Button>
        </div>
      </Card>
    </section>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-muted-foreground mb-1">{label}</p>
    <p className="font-medium text-foreground">{value}</p>
  </div>
);

const RedFlag = ({ title, description, severity }: { title: string; description: string; severity: "high" | "medium" }) => (
  <div className="flex gap-3 p-4 bg-background rounded-lg border border-warning/20">
    <AlertTriangle className={`h-5 w-5 flex-shrink-0 mt-0.5 ${severity === "high" ? "text-warning" : "text-warning/70"}`} />
    <div>
      <p className="font-medium text-foreground mb-1">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

const DateItem = ({ date, event, urgent }: { date: string; event: string; urgent?: boolean }) => (
  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
    <Calendar className={`h-5 w-5 ${urgent ? "text-warning" : "text-secondary"}`} />
    <div className="flex-1">
      <p className="font-medium text-foreground">{event}</p>
      <p className="text-sm text-muted-foreground">{date}</p>
    </div>
    {urgent && <Badge variant="outline" className="border-warning text-warning">Urgent</Badge>}
  </div>
);

const FeeItem = ({ name, amount, refundable }: { name: string; amount: string; refundable?: boolean }) => (
  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
    <div className="flex items-center gap-2">
      <p className="font-medium text-foreground">{name}</p>
      {refundable && <Badge variant="outline" className="border-success text-success text-xs">Refundable</Badge>}
    </div>
    <p className="font-semibold text-foreground">{amount}</p>
  </div>
);

const ResponsibilityItem = ({ text }: { text: string }) => (
  <li className="flex gap-2 text-sm text-muted-foreground">
    <span className="text-primary mt-1">•</span>
    <span>{text}</span>
  </li>
);
