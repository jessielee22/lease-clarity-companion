import { useState, useCallback } from "react";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

interface LeaseUploadProps {
  onFileSelect: (file: File) => void;
  onAnalyze: (data: LeaseAnalysisData) => void;
}

export const LeaseUpload = ({ onFileSelect, onAnalyze }: LeaseUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      onFileSelect(droppedFile);
      toast({
        title: "File uploaded successfully",
        description: `${droppedFile.name} is ready for analysis`,
      });
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file",
        variant: "destructive",
      });
    }
  }, [onFileSelect, toast]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileSelect(selectedFile);
      toast({
        title: "File uploaded successfully",
        description: `${selectedFile.name} is ready for analysis`,
      });
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const { data, error } = await supabase.functions.invoke('analyze-lease', {
        body: formData,
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error('Unable to connect to analysis service. Please check your internet connection and try again.');
      }

      if (data.success && data.analysis) {
        toast({
          title: "Analysis complete!",
          description: "Your lease has been analyzed successfully.",
        });
        onAnalyze(data.analysis);
      } else {
        throw new Error(data.error || 'Unable to analyze the document. Please ensure the PDF contains a valid lease agreement.');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Unable to analyze lease",
        description: error instanceof Error ? error.message : "Something went wrong. Please try uploading a different PDF or try again later.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-10 space-y-3">
        <h2 className="text-3xl font-bold text-foreground">Upload Your Lease Agreement</h2>
        <p className="text-muted-foreground text-lg">
          Upload a PDF of your rental lease to receive instant AI-powered analysis
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>Plain language summary</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>Red flag detection</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span>Key dates & terms</span>
          </div>
        </div>
      </div>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
          isDragging 
            ? "border-primary bg-primary/5 scale-[1.02] shadow-lg" 
            : "border-border hover:border-primary/50 hover:bg-accent/5"
        }`}
      >
        {!file ? (
          <div className="text-center space-y-6">
            <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-semibold text-foreground">
                Drop your lease PDF here
              </p>
              <p className="text-sm text-muted-foreground">or click to browse</p>
            </div>
            <label htmlFor="file-upload">
              <Button size="lg" className="cursor-pointer" asChild>
                <span>
                  <Upload className="mr-2 h-4 w-4" />
                  Choose File
                </span>
              </Button>
              <input
                id="file-upload"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileInput}
              />
            </label>
            <p className="text-xs text-muted-foreground pt-2">
              Supports PDF files up to 20MB • Your data is secure and private
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-card border border-border rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB • Ready to analyze
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={removeFile} disabled={isAnalyzing}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <Button 
              className="w-full bg-primary hover:bg-primary/90 shadow-lg" 
              size="lg"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing Your Lease...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-5 w-5" />
                  Analyze My Lease
                </>
              )}
            </Button>
            
            {isAnalyzing && (
              <p className="text-center text-sm text-muted-foreground animate-pulse">
                This may take 30-60 seconds. We're reading through your lease...
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
