import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { LeaseUpload } from '@/components/LeaseUpload';
import { LeaseAnalysis } from '@/components/LeaseAnalysis';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, Shield } from 'lucide-react';

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

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'welcome' | 'upload' | 'analysis'>('welcome');
  const [analysisData, setAnalysisData] = useState<LeaseAnalysisData | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleFileSelect = (file: File) => {
    console.log('File selected:', file);
  };

  const handleAnalyze = (data: LeaseAnalysisData) => {
    setAnalysisData(data);
    setCurrentView('analysis');
  };

  const handleNewAnalysis = () => {
    setAnalysisData(null);
    setCurrentView('upload');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <DashboardLayout>
      {currentView === 'welcome' && (
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Welcome to Lease Fairy
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload your lease document to get started with AI-powered analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setCurrentView('upload')}>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Upload Lease</CardTitle>
                <CardDescription>
                  Upload your PDF or document for instant analysis
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>AI Analysis</CardTitle>
                <CardDescription>
                  Get detailed breakdown in simple language
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Red Flags</CardTitle>
                <CardDescription>
                  Identify concerning clauses automatically
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card className="bg-muted/30 border-2 border-dashed">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <Upload className="w-16 h-16 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Ready to analyze your lease?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Click below to upload your document and get started
                  </p>
                  <button
                    onClick={() => setCurrentView('upload')}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    Upload Your Lease
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {currentView === 'upload' && (
        <div>
          <button
            onClick={() => setCurrentView('welcome')}
            className="mb-6 text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Dashboard
          </button>
          <LeaseUpload onFileSelect={handleFileSelect} onAnalyze={handleAnalyze} />
        </div>
      )}

      {currentView === 'analysis' && analysisData && (
        <div>
          <button
            onClick={handleNewAnalysis}
            className="mb-6 text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Analyze Another Lease
          </button>
          <LeaseAnalysis analysis={analysisData} />
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
