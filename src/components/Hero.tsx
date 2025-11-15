import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import logoImage from "@/assets/lease-fairy-logo.png";

export const Hero = ({ onUploadClick }: { onUploadClick: () => void }) => {
  return (
    <section className="min-h-[90vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="flex justify-center mb-6">
          <img 
            src={logoImage} 
            alt="Lease Fairy" 
            className="w-64 h-auto animate-in fade-in slide-in-from-bottom-4 duration-700"
          />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          Understand Your Lease, <br />
          <span className="text-accent">Protect Your Rights</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          Upload your rental agreement and let our AI Lease Fairy translate complex legal jargon into simple, actionable insights. Know your rights, avoid hidden fees, and rent with confidence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            onClick={onUploadClick}
          >
            <Upload className="mr-2 h-5 w-5" />
            Upload Your Lease
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="text-lg px-8 py-6 border-2 hover:bg-accent/10 transition-all duration-300"
          >
            See How It Works
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
          <FeatureCard 
            icon="🔍"
            title="Identify Red Flags"
            description="Spot unfair clauses and hidden fees instantly"
          />
          <FeatureCard 
            icon="📅"
            title="Track Key Dates"
            description="Never miss important deadlines or renewals"
          />
          <FeatureCard 
            icon="💬"
            title="Ask Questions"
            description="Chat with Lease Fairy about any concerns"
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
