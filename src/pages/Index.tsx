import { useState } from "react";
import { Hero } from "@/components/Hero";
import { LeaseUpload } from "@/components/LeaseUpload";
import { LeaseAnalysis } from "@/components/LeaseAnalysis";
import { PdfViewer } from "@/components/PdfViewer";

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
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleUploadClick = () => {
    setCurrentView("upload");
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    // Create a URL for the PDF file
    const url = URL.createObjectURL(file);
    setPdfUrl(url);
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
      {currentView === "analysis" && (
        <div className="flex h-screen">
          {/* PDF Viewer - Left Side */}
          <div className="w-1/2 border-r border-border overflow-hidden">
            {pdfUrl && <PdfViewer pdfUrl={pdfUrl} />}
          </div>
          
          {/* Analysis - Right Side */}
          <div className="w-1/2 overflow-y-auto">
            <LeaseAnalysis />
          </div>
        </div>
      )}
    </main>
  );
};

export default Index;
