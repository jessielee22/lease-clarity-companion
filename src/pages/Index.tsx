import { useState } from "react";
import { Hero } from "@/components/Hero";
import { LeaseUpload } from "@/components/LeaseUpload";
import { LeaseAnalysis } from "@/components/LeaseAnalysis";

const Index = () => {
  const [currentView, setCurrentView] = useState<"hero" | "upload" | "analysis">("hero");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUploadClick = () => {
    setCurrentView("upload");
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      // In a real app, this would send the file to a backend for processing
      setTimeout(() => {
        setCurrentView("analysis");
      }, 1000);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {currentView === "hero" && <Hero onUploadClick={handleUploadClick} />}
      {currentView === "upload" && (
        <LeaseUpload onFileSelect={handleFileSelect} onAnalyze={handleAnalyze} />
      )}
      {currentView === "analysis" && <LeaseAnalysis />}
    </main>
  );
};

export default Index;
