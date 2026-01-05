import { BrainCircuit } from "lucide-react";

// Header component for the AI Resume Screener dashboard
const DashboardHeader = () => {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
            <BrainCircuit className="h-7 w-7 text-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              AI Resume Screener
            </h1>
            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
              Upload job description and resumes to rank candidates automatically
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
