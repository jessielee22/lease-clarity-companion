import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Calendar, DollarSign, FileText, MessageCircle, Info } from "lucide-react";
import { useState } from "react";

interface LeaseAnalysisData {
  overview: {
    agreementType: string;
    duration: string;
    monthlyRent: string;
    hiddenFees: string[];
  };
  responsibilities: {
    tenant: string[];
    landlord: string[];
  };
  keyDates: {
    startDate: string;
    endDate: string;
    renewalDate: string;
    noticeDeadline: string;
  };
  redFlags: {
    category: string;
    issue: string;
    severity: 'high' | 'medium' | 'low';
    explanation: string;
  }[];
  whatIfScenarios: {
    earlyTermination: string;
    latePayment: string;
    maintenanceIssues: string;
  };
  tenantRights: string[];
  legalJargon: {
    term: string;
    definition: string;
    location: string;
  }[];
}

interface LeaseAnalysisProps {
  analysis: LeaseAnalysisData;
}

export const LeaseAnalysis = ({ analysis }: LeaseAnalysisProps) => {
  const [selectedJargon, setSelectedJargon] = useState<string | null>(null);

  return (
    <section className="px-6 py-8 space-y-6">
      <div className="sticky top-0 bg-background z-10 pb-4 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground">Lease Analysis</h2>
        <p className="text-sm text-muted-foreground">AI-powered insights from your lease</p>
      </div>

      {/* Overview Card */}
      <Card className="p-4 border-accent/20 shadow-lg">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
            <FileText className="h-5 w-5 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-3">Overview</h3>
            <div className="grid grid-cols-1 gap-3">
              <InfoItem label="Agreement Type" value="Standard Residential Lease" />
              <InfoItem label="Duration" value="12 months" />
              <InfoItem label="Monthly Rent" value="$1,850" />
            </div>
          </div>
        </div>
      </Card>

      {/* Red Flags */}
      <Card className="p-4 border-warning/20 bg-warning/5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-warning" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-3">Red Flags</h3>
            <div className="space-y-2">
              <RedFlag 
                title="Automatic Renewal Clause"
                description="Lease auto-renews unless you give 60 days notice."
                severity="medium"
              />
              <RedFlag 
                title="High Late Fee"
                description="$75 late fee after 5 days (higher than typical)."
                severity="high"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Key Dates */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
            <Calendar className="h-5 w-5 text-secondary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-3">Important Dates</h3>
            <div className="space-y-2">
              <DateItem date="Jan 1, 2025" event="Lease Start" />
              <DateItem date="Nov 1, 2025" event="Notice Deadline" urgent />
              <DateItem date="Dec 31, 2025" event="Lease End" />
            </div>
            <Button variant="outline" className="mt-3 w-full" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Set Reminders
            </Button>
          </div>
        </div>
      </Card>

      {/* Hidden Fees */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
            <DollarSign className="h-5 w-5 text-success" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-3">Fees & Costs</h3>
            <div className="space-y-2">
              <FeeItem name="Security Deposit" amount="$1,850" refundable />
              <FeeItem name="Pet Deposit" amount="$500" refundable />
              <FeeItem name="Application Fee" amount="$75" />
              <FeeItem name="Late Payment" amount="$75" />
              <FeeItem name="Early Termination" amount="2 months rent" />
            </div>
          </div>
        </div>
      </Card>

      {/* Responsibilities */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Responsibilities</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="h-3 w-3 text-primary" />
              </div>
              <h4 className="font-semibold text-sm text-foreground">Tenant</h4>
            </div>
            <ul className="space-y-1 ml-8">
              <ResponsibilityItem text="Pay rent by 1st of month" />
              <ResponsibilityItem text="Maintain cleanliness" />
              <ResponsibilityItem text="Report issues within 24hrs" />
              <ResponsibilityItem text="Obtain renter's insurance" />
              <ResponsibilityItem text="No alterations without approval" />
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center">
                <FileText className="h-3 w-3 text-secondary" />
              </div>
              <h4 className="font-semibold text-sm text-foreground">Landlord</h4>
            </div>
            <ul className="space-y-1 ml-8">
              <ResponsibilityItem text="Provide habitable conditions" />
              <ResponsibilityItem text="Maintain systems" />
              <ResponsibilityItem text="Repairs within 7 days" />
              <ResponsibilityItem text="24hr notice before entry" />
              <ResponsibilityItem text="Return deposit in 21 days" />
            </ul>
          </div>
        </div>
      </Card>

      {/* Legal Jargon */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Info className="h-5 w-5 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-3">Legal Terms</h3>
            <p className="text-xs text-muted-foreground mb-3">Click any term to see definition</p>
            <div className="flex flex-wrap gap-2">
              {jargonTerms.map((item) => (
                <Badge
                  key={item.term}
                  variant="outline"
                  className="cursor-pointer hover:bg-accent/10 transition-colors px-2 py-1 text-xs"
                  onClick={() => setSelectedJargon(item.term)}
                >
                  {item.term}
                </Badge>
              ))}
            </div>
            {selectedJargon && (
              <div className="mt-3 p-3 bg-muted rounded-lg">
                <p className="font-medium text-sm text-foreground mb-1">{selectedJargon}</p>
                <p className="text-xs text-muted-foreground">
                  {jargonTerms.find(t => t.term === selectedJargon)?.definition}
                </p>
              </div>
            ) : (
              <p className="text-muted-foreground">No legal jargon identified.</p>
            )}
          </div>
        </div>
      </Card>

      {/* Tenant Rights */}
      <Card className="p-6 bg-secondary/5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
            <Info className="h-6 w-6 text-secondary" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-4">Know Your Rights</h3>
            {analysis.tenantRights.length > 0 ? (
              <ul className="space-y-2">
                {analysis.tenantRights.map((right, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-secondary mt-1">✓</span>
                    <span className="text-muted-foreground">{right}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No specific tenant rights identified.</p>
            )}
          </div>
        </div>
      </Card>

      {/* Chat with Lease Fairy */}
      <Card className="p-4 bg-gradient-to-br from-accent/5 to-secondary/5 border-accent/20">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
            <MessageCircle className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Questions?</h3>
            <p className="text-xs text-muted-foreground">Ask Lease Fairy about your agreement</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 w-full">
            <MessageCircle className="h-4 w-4 mr-2" />
            Start Chat
          </Button>
        </div>
      </Card>
    </section>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="text-sm font-medium text-foreground">{value}</p>
  </div>
);

const RedFlag = ({ title, description, severity }: { title: string; description: string; severity: "high" | "medium" }) => (
  <div className="flex gap-2 p-3 bg-background rounded-lg border border-warning/20">
    <AlertTriangle className={`h-4 w-4 flex-shrink-0 mt-0.5 ${severity === "high" ? "text-warning" : "text-warning/70"}`} />
    <div>
      <p className="font-medium text-sm text-foreground mb-0.5">{title}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  </div>
);

const DateItem = ({ date, event, urgent }: { date: string; event: string; urgent?: boolean }) => (
  <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
    <Calendar className={`h-4 w-4 ${urgent ? "text-warning" : "text-secondary"}`} />
    <div className="flex-1">
      <p className="font-medium text-sm text-foreground">{event}</p>
      <p className="text-xs text-muted-foreground">{date}</p>
    </div>
    {urgent && <Badge variant="outline" className="border-warning text-warning text-xs">Urgent</Badge>}
  </div>
);

const FeeItem = ({ name, amount, refundable }: { name: string; amount: string; refundable?: boolean }) => (
  <div className="flex items-center justify-between p-2 bg-muted rounded-lg">
    <div className="flex items-center gap-2">
      <p className="font-medium text-sm text-foreground">{name}</p>
      {refundable && <Badge variant="outline" className="border-success text-success text-xs">Refundable</Badge>}
    </div>
    <p className="font-semibold text-sm text-foreground">{amount}</p>
  </div>
);

const ResponsibilityItem = ({ text }: { text: string }) => (
  <li className="flex gap-2 text-xs text-muted-foreground">
    <span className="text-primary">•</span>
    <span>{text}</span>
  </li>
);

const ScenarioCard = ({ question, answer }: { question: string; answer: string }) => (
  <div className="p-4 rounded-lg border border-border/50 bg-muted/30">
    <p className="font-medium text-foreground mb-2">{question}</p>
    <p className="text-sm text-muted-foreground">{answer}</p>
  </div>
);
