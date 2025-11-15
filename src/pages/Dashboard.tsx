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
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground">
              Welcome to Lease Fairy
            </h1>
            <p className="text-lg text-muted-foreground">
              Upload your rental agreement to get instant AI analysis, identify red flags, and understand your rights
            </p>
          </div>

          <Card className="max-w-2xl mx-auto border-2 border-dashed border-primary/30 bg-card/50 hover:border-primary/50 transition-all">
            <CardContent className="pt-12 pb-12">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Upload className="w-10 h-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-foreground">
                    Upload Your Lease Agreement
                  </h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Upload a PDF of your rental agreement to receive a comprehensive analysis in plain language
                  </p>
                </div>
                <button
                  onClick={() => setCurrentView('upload')}
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Get Started
                </button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <div className="text-center space-y-3 p-6">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Simple Breakdown</h3>
              <p className="text-sm text-muted-foreground">
                Complex legal terms translated into easy-to-understand language
              </p>
            </div>

            <div className="text-center space-y-3 p-6">
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6 text-warning" />
              </div>
              <h3 className="font-semibold text-foreground">Red Flag Detection</h3>
              <p className="text-sm text-muted-foreground">
                Automatically identify potentially unfair or concerning clauses
              </p>
            </div>

            <div className="text-center space-y-3 p-6">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold text-foreground">Instant Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Get your comprehensive lease analysis in minutes
              </p>
            </div>
          </div>
        </div>
      )}

      {currentView === 'upload' && (
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setCurrentView('welcome')}
            className="mb-6 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
          >
            ← Back to Dashboard
          </button>
          <LeaseUpload onFileSelect={handleFileSelect} onAnalyze={handleAnalyze} />
        </div>
      )}

      {currentView === 'analysis' && analysisData && (
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handleNewAnalysis}
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              ← Analyze Another Lease
            </button>
          </div>
          <LeaseAnalysis analysis={analysisData} />
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
