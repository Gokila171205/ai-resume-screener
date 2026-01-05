import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnalyzeButtonProps {
  onClick: () => void;
  disabled: boolean;
  isLoading: boolean;
}

// Primary CTA button for analyzing resumes
const AnalyzeButton = ({ onClick, disabled, isLoading }: AnalyzeButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || isLoading}
      variant="accent"
      size="lg"
      className="w-full sm:w-auto"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Analyzing Resumes...
        </>
      ) : (
        <>
          <Sparkles className="h-5 w-5" />
          Analyze & Rank Candidates
        </>
      )}
    </Button>
  );
};

export default AnalyzeButton;
