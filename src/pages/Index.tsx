import { useState } from "react";
import { Hero } from "@/components/Hero";
import { LeaseUpload } from "@/components/LeaseUpload";
import { LeaseAnalysis } from "@/components/LeaseAnalysis";

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

const Index = () => {
  const [currentView, setCurrentView] = useState<"hero" | "upload" | "analysis">("hero");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisData, setAnalysisData] = useState<LeaseAnalysisData | null>(null);

  const handleUploadClick = () => {
    setCurrentView("upload");
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleAnalyze = (data: LeaseAnalysisData) => {
    setAnalysisData(data);
    setCurrentView("analysis");
  };

  return (
    <main className="min-h-screen bg-background">
      {currentView === "hero" && <Hero onUploadClick={handleUploadClick} />}
      {currentView === "upload" && (
        <LeaseUpload onFileSelect={handleFileSelect} onAnalyze={handleAnalyze} />
      )}
      {currentView === "analysis" && analysisData && <LeaseAnalysis analysis={analysisData} />}
    </main>
  );
};

export default Index;
