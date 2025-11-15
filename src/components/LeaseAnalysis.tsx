import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Calendar, FileText, MessageCircle, Info, Shield, CheckCircle } from "lucide-react";
import { useState } from "react";
import { LeaseAnalysisData } from "@/pages/Index";

interface LeaseAnalysisProps {
  data: LeaseAnalysisData;
}

export const LeaseAnalysis = ({ data }: LeaseAnalysisProps) => {
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
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-2">Lease Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <InfoItem label="Agreement Type" value={data.overview.agreementType} />
              <InfoItem label="Duration" value={data.overview.duration} />
              <InfoItem label="Monthly Rent" value={data.overview.monthlyRent} />
            </div>
            {data.overview.hiddenFees.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-muted-foreground mb-2">Hidden Fees:</p>
                <div className="flex flex-wrap gap-2">
                  {data.overview.hiddenFees.map((fee, idx) => (
                    <Badge key={idx} variant="outline">{fee}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Red Flags */}
      {data.redFlags.length > 0 && (
        <Card className="p-6 border-warning/20 bg-warning/5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-warning" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-4">Red Flags Found</h3>
              <div className="space-y-3">
                {data.redFlags.map((flag, idx) => (
                  <RedFlag 
                    key={idx}
                    title={flag.issue}
                    description={flag.explanation}
                    severity={flag.severity}
                    category={flag.category}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Key Dates */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
            <Calendar className="h-6 w-6 text-secondary" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-4">Important Dates</h3>
            <div className="space-y-3">
              <DateItem date={data.keyDates.startDate} event="Lease Start Date" />
              <DateItem date={data.keyDates.noticeDeadline} event="Notice Deadline for Non-Renewal" urgent />
              <DateItem date={data.keyDates.endDate} event="Lease End Date" />
              {data.keyDates.renewalDate && (
                <DateItem date={data.keyDates.renewalDate} event="Renewal Date" />
              )}
            </div>
            <Button variant="outline" className="mt-4" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Set Reminders
            </Button>
          </div>
        </div>
      </Card>

      {/* Responsibilities */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-4">Responsibilities</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Your Responsibilities
                </h4>
                <ul className="space-y-2">
                  {data.responsibilities.tenant.map((item, idx) => (
                    <ResponsibilityItem key={idx} text={item} />
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  Landlord's Responsibilities
                </h4>
                <ul className="space-y-2">
                  {data.responsibilities.landlord.map((item, idx) => (
                    <ResponsibilityItem key={idx} text={item} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* What If Scenarios */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
            <Info className="h-6 w-6 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-4">What If Scenarios</h3>
            <div className="space-y-4">
              <ScenarioItem 
                title="What if I need to leave early?"
                description={data.whatIfScenarios.earlyTermination}
              />
              <ScenarioItem 
                title="What if I pay rent late?"
                description={data.whatIfScenarios.latePayment}
              />
              <ScenarioItem 
                title="What if something breaks?"
                description={data.whatIfScenarios.maintenanceIssues}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Tenant Rights */}
      {data.tenantRights.length > 0 && (
        <Card className="p-6 bg-accent/5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-4">Your Tenant Rights</h3>
              <ul className="space-y-2">
                {data.tenantRights.map((right, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>{right}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Legal Jargon */}
      {data.legalJargon.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">Legal Terms Explained</h3>
          <p className="text-sm text-muted-foreground mb-4">Click on any highlighted term to see its plain-English definition</p>
          <div className="flex flex-wrap gap-2">
            {data.legalJargon.map((item, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => setSelectedJargon(selectedJargon === item.term ? null : item.term)}
                className="relative"
              >
                {item.term}
                {selectedJargon === item.term && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-accent">
                    ?
                  </Badge>
                )}
              </Button>
            ))}
          </div>
          {selectedJargon && (
            <Card className="mt-4 p-4 bg-accent/5 border-accent/20">
              <p className="text-sm font-medium text-foreground mb-2">{selectedJargon}</p>
              <p className="text-sm text-muted-foreground">
                {data.legalJargon.find(j => j.term === selectedJargon)?.definition}
              </p>
              {data.legalJargon.find(j => j.term === selectedJargon)?.location && (
                <p className="text-xs text-muted-foreground mt-2 italic">
                  Found in: {data.legalJargon.find(j => j.term === selectedJargon)?.location}
                </p>
              )}
            </Card>
          )}
        </Card>
      )}

      {/* Chat CTA */}
      <Card className="p-6 bg-gradient-to-br from-accent/10 to-secondary/10 border-accent/20">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
            <MessageCircle className="h-8 w-8 text-accent" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Have Questions?</h3>
            <p className="text-muted-foreground mb-4">Chat with Lease Fairy to get answers about your specific lease</p>
            <Button className="bg-accent hover:bg-accent/90">
              Start Chatting
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};

// Helper Components
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-muted-foreground mb-1">{label}</p>
    <p className="font-medium text-foreground">{value}</p>
  </div>
);

const RedFlag = ({ 
  title, 
  description, 
  severity,
  category 
}: { 
  title: string; 
  description: string; 
  severity: 'high' | 'medium' | 'low';
  category?: string;
}) => (
  <div className="bg-background rounded-lg p-4 border border-border">
    <div className="flex items-start gap-3">
      <Badge 
        variant={severity === 'high' ? 'destructive' : 'secondary'}
        className="mt-0.5"
      >
        {severity}
      </Badge>
      <div className="flex-1">
        <p className="font-medium text-foreground mb-1">{title}</p>
        {category && <p className="text-xs text-muted-foreground mb-1">Category: {category}</p>}
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  </div>
);

const DateItem = ({ date, event, urgent }: { date: string; event: string; urgent?: boolean }) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
    <div>
      <p className="text-sm font-medium text-foreground">{event}</p>
      <p className="text-xs text-muted-foreground">{date}</p>
    </div>
    {urgent && (
      <Badge variant="destructive" className="ml-2">Urgent</Badge>
    )}
  </div>
);

const ResponsibilityItem = ({ text }: { text: string }) => (
  <li className="text-sm text-muted-foreground flex items-start gap-2">
    <span className="text-accent mt-1">•</span>
    <span>{text}</span>
  </li>
);

const ScenarioItem = ({ title, description }: { title: string; description: string }) => (
  <div className="border-l-2 border-accent pl-4">
    <p className="font-medium text-foreground mb-1">{title}</p>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);
