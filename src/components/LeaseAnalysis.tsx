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
              <InfoItem label="Agreement Type" value={analysis.overview.agreementType} />
              <InfoItem label="Duration" value={analysis.overview.duration} />
              <InfoItem label="Monthly Rent" value={analysis.overview.monthlyRent} />
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
            {analysis.redFlags.length > 0 ? (
              <div className="space-y-3">
                {analysis.redFlags.map((flag, idx) => (
                  <RedFlag 
                    key={idx}
                    title={flag.issue}
                    description={flag.explanation}
                    severity={flag.severity}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No red flags identified in this lease.</p>
            )}
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
              {analysis.keyDates.startDate !== "Not specified" && (
                <DateItem date={analysis.keyDates.startDate} event="Lease Start Date" />
              )}
              {analysis.keyDates.noticeDeadline !== "Not specified" && (
                <DateItem date={analysis.keyDates.noticeDeadline} event="Notice Deadline" urgent />
              )}
              {analysis.keyDates.renewalDate !== "Not specified" && (
                <DateItem date={analysis.keyDates.renewalDate} event="Renewal Date" />
              )}
              {analysis.keyDates.endDate !== "Not specified" && (
                <DateItem date={analysis.keyDates.endDate} event="Lease End Date" />
              )}
            </div>
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
            <h3 className="text-xl font-semibold text-foreground mb-4">Hidden Fees & Charges</h3>
            {analysis.overview.hiddenFees.length > 0 ? (
              <div className="space-y-2">
                {analysis.overview.hiddenFees.map((fee, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                    <span className="text-foreground">{fee}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No hidden fees identified.</p>
            )}
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
            {analysis.responsibilities.tenant.length > 0 ? (
              <ul className="space-y-2">
                {analysis.responsibilities.tenant.map((resp, idx) => (
                  <ResponsibilityItem key={idx} text={resp} />
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">No tenant responsibilities specified.</p>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                <FileText className="h-4 w-4 text-secondary" />
              </div>
              <h4 className="font-semibold text-foreground">Landlord Responsibilities</h4>
            </div>
            {analysis.responsibilities.landlord.length > 0 ? (
              <ul className="space-y-2">
                {analysis.responsibilities.landlord.map((resp, idx) => (
                  <ResponsibilityItem key={idx} text={resp} />
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">No landlord responsibilities specified.</p>
            )}
          </div>
        </div>
      </Card>

      {/* What If Scenarios */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
            <MessageCircle className="h-6 w-6 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-4">What If Scenarios</h3>
            <div className="space-y-4">
              <ScenarioCard 
                question="What if I need to break my lease early?"
                answer={analysis.whatIfScenarios.earlyTermination}
              />
              <ScenarioCard 
                question="What if I pay rent late?"
                answer={analysis.whatIfScenarios.latePayment}
              />
              <ScenarioCard 
                question="What if something breaks?"
                answer={analysis.whatIfScenarios.maintenanceIssues}
              />
            </div>
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
            <h3 className="text-xl font-semibold text-foreground mb-4">Legal Jargon Translator</h3>
            {analysis.legalJargon.length > 0 ? (
              <div className="space-y-3">
                {analysis.legalJargon.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-lg border border-border/50 hover:border-accent/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedJargon(selectedJargon === item.term ? null : item.term)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{item.term}</span>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </div>
                    {selectedJargon === item.term && (
                      <>
                        <p className="mt-2 text-sm text-muted-foreground">{item.definition}</p>
                        <p className="mt-1 text-xs text-muted-foreground/70">Found in: {item.location}</p>
                      </>
                    )}
                  </div>
                ))}
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

const RedFlag = ({ title, description, severity }: { title: string; description: string; severity: "high" | "medium" | "low" }) => (
  <div className="flex gap-3 p-4 bg-background rounded-lg border border-warning/20">
    <AlertTriangle className={`h-5 w-5 flex-shrink-0 mt-0.5 ${severity === "high" ? "text-warning" : severity === "medium" ? "text-warning/70" : "text-warning/50"}`} />
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

const ResponsibilityItem = ({ text }: { text: string }) => (
  <li className="flex gap-2 text-sm text-muted-foreground">
    <span className="text-primary mt-1">•</span>
    <span>{text}</span>
  </li>
);

const ScenarioCard = ({ question, answer }: { question: string; answer: string }) => (
  <div className="p-4 rounded-lg border border-border/50 bg-muted/30">
    <p className="font-medium text-foreground mb-2">{question}</p>
    <p className="text-sm text-muted-foreground">{answer}</p>
  </div>
);
