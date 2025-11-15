import { useState } from "react";
import { Hero } from "@/components/Hero";
import { LeaseUpload } from "@/components/LeaseUpload";
import { LeaseAnalysis } from "@/components/LeaseAnalysis";

export type LeaseAnalysisData = {
  overview: {
    agreementType: string;
    duration: string;
    monthlyRent: string;
    securityDeposit: string;
  };
  redFlags: Array<{
    title: string;
    description: string;
    severity: "high" | "medium" | "low";
  }>;
  importantDates: Array<{
    date: string;
    description: string;
    urgent: boolean;
  }>;
  fees: Array<{
    name: string;
    amount: string;
    refundable: boolean;
  }>;
  tenantResponsibilities: string[];
  landlordResponsibilities: string[];
  legalTerms: Array<{
    term: string;
    definition: string;
  }>;
};

const Index = () => {
  const [currentView, setCurrentView] = useState<"hero" | "upload" | "analysis">("hero");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisData, setAnalysisData] = useState<LeaseAnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUploadClick = () => {
    setCurrentView("upload");
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    try {
      // Read the file as text
      const text = await selectedFile.text();
      
      // Call the edge function
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-lease`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ leaseText: text }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze lease');
      }

      const data = await response.json();
      setAnalysisData(data);
      setCurrentView("analysis");
    } catch (error) {
      console.error('Error analyzing lease:', error);
      alert('Failed to analyze lease. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {currentView === "hero" && <Hero onUploadClick={handleUploadClick} />}
      {currentView === "upload" && (
        <LeaseUpload 
          onFileSelect={handleFileSelect} 
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
        />
      )}
      {currentView === "analysis" && analysisData && <LeaseAnalysis data={analysisData} />}
    </main>
  );
};

export default Index;
