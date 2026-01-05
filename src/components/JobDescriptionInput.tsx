import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

// Job Description input section with validation
const JobDescriptionInput = ({ value, onChange, error }: JobDescriptionInputProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <FileText className="h-4 w-4 text-primary" />
        </div>
        <Label htmlFor="job-description" className="text-lg font-semibold text-foreground">
          Job Description
        </Label>
      </div>
      
      <Textarea
        id="job-description"
        placeholder="Paste your job description here... Include requirements, responsibilities, and preferred qualifications to get the best candidate matching results."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`min-h-[200px] resize-none border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent ${
          error ? "border-destructive focus:border-destructive focus:ring-destructive" : ""
        }`}
      />
      
      {error && (
        <p className="mt-2 text-sm text-destructive animate-fade-in">{error}</p>
      )}
      
      <p className="mt-3 text-xs text-muted-foreground">
        {value.length} characters • Tip: Include specific skills and experience requirements for better matching
      </p>
    </div>
  );
};

export default JobDescriptionInput;
