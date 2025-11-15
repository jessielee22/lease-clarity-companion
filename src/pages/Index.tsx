import { useState } from "react";
import { Hero } from "@/components/Hero";
import { LeaseUpload } from "@/components/LeaseUpload";
import { LeaseAnalysis } from "@/components/LeaseAnalysis";
import { PdfViewer } from "@/components/PdfViewer";
import { useToast } from "@/hooks/use-toast";
import Anthropic from "@anthropic-ai/sdk";

interface LeaseAnalysisData {
  overview: {
    agreementType: string;
    duration: string;
    monthlyRent: string;
    startDate: string;
    endDate: string;
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
  fees: {
    name: string;
    amount: string;
    refundable: boolean;
  }[];
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
  const [analysisData, setAnalysisData] = useState<LeaseAnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleUploadClick = () => {
    setCurrentView("upload");
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPdfUrl(url);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please upload a lease document first.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      // Get API key from environment
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      
      if (!apiKey) {
        throw new Error("Anthropic API key not configured. Please add VITE_ANTHROPIC_API_KEY to your .env file");
      }

      console.log("Reading PDF file...");

      // Convert PDF to base64
      const arrayBuffer = await selectedFile.arrayBuffer();
      const base64 = btoa(
        Array.from(new Uint8Array(arrayBuffer))
          .map(byte => String.fromCharCode(byte))
          .join('')
      );

      console.log("Sending to Claude for analysis...");

      // Initialize Anthropic client
      const anthropic = new Anthropic({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Only for development/testing
      });

      // Call Claude API
      const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'document',
              source: {
                type: 'base64',
                media_type: 'application/pdf',
                data: base64
              }
            },
            {
              type: 'text',
              text: `You are Lease Fairy, an AI assistant that helps renters understand their lease agreements.

Analyze this residential lease agreement and extract the following information. Be precise and use ONLY information explicitly stated in the document:

1. **Overview:**
   - Type of agreement (e.g., "Residential Lease", "Month-to-Month", etc.)
   - Lease duration (e.g., "12 months", "6 months")
   - Monthly rent amount (exact dollar amount)
   - Lease start date
   - Lease end date

2. **Key Dates:**
   - Start date
   - End date
   - Renewal/termination notice deadline
   - Any other important dates

3. **Fees & Costs:**
   - Security deposit (amount and if refundable)
   - Pet deposits/fees
   - Application fees
   - Late payment fees
   - Early termination fees
   - Any other fees mentioned

4. **Responsibilities:**
   - Tenant responsibilities (specific duties listed)
   - Landlord responsibilities (specific duties listed)

5. **Red Flags:**
   - Identify concerning clauses (e.g., automatic renewals, high fees, unfair terms)
   - Classify severity: high, medium, or low
   - Explain why each is concerning

6. **Legal Terms:**
   - Extract complex legal terms used in the lease
   - Provide plain English definitions
   - Note where in the document they appear

CRITICAL RULES:
- Use EXACT amounts, dates, and terms from the lease
- If information is not found, use "Not specified in lease"
- Do NOT make assumptions or add generic information
- Quote specific sections when identifying red flags

Return your analysis in valid JSON format matching this structure:
{
  "overview": {
    "agreementType": "string",
    "duration": "string",
    "monthlyRent": "string",
    "startDate": "string",
    "endDate": "string"
  },
  "keyDates": {
    "startDate": "string",
    "endDate": "string",
    "renewalDate": "string",
    "noticeDeadline": "string"
  },
  "fees": [
    {
      "name": "string",
      "amount": "string",
      "refundable": boolean
    }
  ],
  "responsibilities": {
    "tenant": ["string"],
    "landlord": ["string"]
  },
  "redFlags": [
    {
      "category": "string",
      "issue": "string",
      "severity": "high|medium|low",
      "explanation": "string"
    }
  ],
  "legalJargon": [
    {
      "term": "string",
      "definition": "string",
      "location": "string"
    }
  ]
}

Return ONLY the JSON object, no additional text or markdown formatting.`
            }
          ]
        }]
      });

      console.log("Received response from Claude");

      // Extract and parse the response
      const responseText = message.content
        .filter((block: any) => block.type === 'text')
        .map((block: any) => block.text)
        .join('\n')
        .trim();

      // Clean up markdown formatting
      const cleanedText = responseText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

      console.log("Parsing analysis...");

      const analysis: LeaseAnalysisData = JSON.parse(cleanedText);

      setAnalysisData(analysis);
      setCurrentView("analysis");

      toast({
        title: "Analysis complete!",
        description: "Your lease has been analyzed by Claude.",
      });

    } catch (error) {
      console.error("Analysis error:", error);

      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Failed to analyze lease. Please try again.",
        variant: "destructive",
      });
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
      
      {currentView === "analysis" && analysisData && (
        <div className="flex h-screen">
          <div className="w-1/2 border-r border-border overflow-hidden">
            {pdfUrl && <PdfViewer pdfUrl={pdfUrl} />}
          </div>
          <div className="w-1/2 overflow-y-auto">
            <LeaseAnalysis analysisData={analysisData} />
          </div>
        </div>
      )}
    </main>
  );
};

export default Index;
