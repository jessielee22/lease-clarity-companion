import { useState, useCallback } from "react";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface LeaseUploadProps {
  onFileSelect: (file: File) => void;
  onAnalyze: () => void;
  isAnalyzing?: boolean;
}

export const LeaseUpload = ({ onFileSelect, onAnalyze, isAnalyzing = false }: LeaseUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
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

  return (
    <section className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-3">Upload Your Lease</h2>
        <p className="text-muted-foreground">Drop your PDF lease agreement below for instant analysis</p>
      </div>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
          isDragging 
            ? "border-accent bg-accent/5 scale-105" 
            : "border-border hover:border-accent/50 hover:bg-accent/5"
        }`}
      >
        {!file ? (
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
              <Upload className="h-8 w-8 text-accent" />
            </div>
            <div>
              <p className="text-lg font-medium text-foreground mb-1">
                Drag & drop your lease here
              </p>
              <p className="text-sm text-muted-foreground">or</p>
            </div>
            <label htmlFor="file-upload">
              <Button variant="outline" className="cursor-pointer" asChild>
                <span>Browse Files</span>
              </Button>
              <input
                id="file-upload"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileInput}
              />
            </label>
            <p className="text-xs text-muted-foreground">PDF files only • Max 20MB</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-muted rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={removeFile}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <Button 
              className="w-full bg-primary hover:bg-primary/90" 
              size="lg"
              onClick={onAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? "Analyzing..." : "Analyze My Lease"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
