import { Candidate } from "@/data/dummyData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { X, Mail, Phone, Briefcase, CheckCircle, XCircle, Sparkles } from "lucide-react";

interface CandidateDetailProps {
  candidate: Candidate | null;
  isOpen: boolean;
  onClose: () => void;
}

// Candidate detail view component (side panel)
const CandidateDetail = ({ candidate, isOpen, onClose }: CandidateDetailProps) => {
  if (!candidate) return null;

  // Get score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 90) return "bg-success";
    if (score >= 75) return "bg-accent";
    if (score >= 60) return "bg-warning";
    return "bg-muted-foreground";
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full overflow-y-auto border-border bg-card sm:max-w-lg">
        <SheetHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">
                {candidate.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <SheetTitle className="text-xl text-foreground">{candidate.name}</SheetTitle>
                <p className="text-sm text-muted-foreground">{candidate.experience} experience</p>
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Score Section */}
          <div className="rounded-xl bg-muted/50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Match Score</span>
              <span className={`text-2xl font-bold ${
                candidate.score >= 90 ? "text-success" :
                candidate.score >= 75 ? "text-accent" :
                candidate.score >= 60 ? "text-warning" :
                "text-muted-foreground"
              }`}>
                {candidate.score}%
              </span>
            </div>
            <Progress 
              value={candidate.score} 
              className="h-3"
              indicatorClassName={getScoreColor(candidate.score)}
            />
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Contact Information</h4>
            <div className="space-y-2">
              <a 
                href={`mailto:${candidate.email}`}
                className="flex items-center gap-3 rounded-lg bg-secondary/50 px-4 py-3 text-sm transition-colors hover:bg-secondary"
              >
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-foreground">{candidate.email}</span>
              </a>
              <a 
                href={`tel:${candidate.phone}`}
                className="flex items-center gap-3 rounded-lg bg-secondary/50 px-4 py-3 text-sm transition-colors hover:bg-secondary"
              >
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-foreground">{candidate.phone}</span>
              </a>
            </div>
          </div>

          {/* Matched Skills */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <h4 className="text-sm font-semibold text-foreground">Matched Skills</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {candidate.matchedSkills.map((skill) => (
                <Badge key={skill} variant="success">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-warning" />
              <h4 className="text-sm font-semibold text-foreground">Missing Skills</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {candidate.missingSkills.map((skill) => (
                <Badge key={skill} variant="warning">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* AI Summary */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <h4 className="text-sm font-semibold text-foreground">AI Summary</h4>
            </div>
            <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
              <p className="text-sm leading-relaxed text-foreground">
                {candidate.aiSummary}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button variant="accent" className="flex-1">
              <Briefcase className="h-4 w-4" />
              Schedule Interview
            </Button>
            <Button variant="outline" className="flex-1">
              Download Resume
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CandidateDetail;
