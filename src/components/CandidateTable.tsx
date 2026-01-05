import { Candidate } from "@/data/dummyData";
import { Trophy, TrendingUp, Clock, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CandidateTableProps {
  candidates: Candidate[];
  onSelectCandidate: (candidate: Candidate) => void;
}

// Candidate ranking table component
const CandidateTable = ({ candidates, onSelectCandidate }: CandidateTableProps) => {
  // Get rank badge styling based on position
  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning/10">
          <Trophy className="h-4 w-4 text-warning" />
        </div>
      );
    }
    if (rank === 2 || rank === 3) {
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
          <span className="text-sm font-bold text-accent">{rank}</span>
        </div>
      );
    }
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
        <span className="text-sm font-medium text-muted-foreground">{rank}</span>
      </div>
    );
  };

  // Get score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 75) return "text-accent";
    if (score >= 60) return "text-warning";
    return "text-muted-foreground";
  };

  // Get score background based on value
  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-success/10";
    if (score >= 75) return "bg-accent/10";
    if (score >= 60) return "bg-warning/10";
    return "bg-muted";
  };

  if (candidates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <TrendingUp className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-foreground">No candidates yet</h3>
        <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">
          Upload a job description and resumes, then click "Analyze & Rank" to see ranked candidates here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-[80px] font-semibold text-foreground">Rank</TableHead>
            <TableHead className="font-semibold text-foreground">Candidate Name</TableHead>
            <TableHead className="w-[120px] font-semibold text-foreground">Score</TableHead>
            <TableHead className="w-[140px] font-semibold text-foreground">Experience</TableHead>
            <TableHead className="w-[60px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate, index) => (
            <TableRow
              key={candidate.id}
              onClick={() => onSelectCandidate(candidate)}
              className="group cursor-pointer transition-colors hover:bg-accent/5"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TableCell>
                {getRankBadge(index + 1)}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {candidate.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{candidate.name}</p>
                    <p className="text-xs text-muted-foreground">{candidate.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 ${getScoreBg(candidate.score)}`}>
                  <span className={`text-sm font-bold ${getScoreColor(candidate.score)}`}>
                    {candidate.score}%
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="text-sm">{candidate.experience}</span>
                </div>
              </TableCell>
              <TableCell>
                <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CandidateTable;
