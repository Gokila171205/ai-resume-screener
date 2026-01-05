import { useState, useMemo } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import JobDescriptionInput from "@/components/JobDescriptionInput";
import ResumeUpload from "@/components/ResumeUpload";
import AnalyzeButton from "@/components/AnalyzeButton";
import SearchBar from "@/components/SearchBar";
import CandidateTable from "@/components/CandidateTable";
import CandidateDetail from "@/components/CandidateDetail";
import { dummyCandidates, Candidate, sampleJobDescription } from "@/data/dummyData";
import { Users, FileText, TrendingUp } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

const Index = () => {
  // State management
  const [jobDescription, setJobDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [jdError, setJdError] = useState("");

  // Validation - enable button only when JD and resumes are uploaded
  const canAnalyze = jobDescription.trim().length > 0 && uploadedFiles.length > 0;

  // Filter candidates based on search query
  const filteredCandidates = useMemo(() => {
    if (!searchQuery.trim()) return candidates;
    
    const query = searchQuery.toLowerCase();
    return candidates.filter((candidate) => {
      return (
        candidate.name.toLowerCase().includes(query) ||
        candidate.matchedSkills.some((skill) => skill.toLowerCase().includes(query)) ||
        candidate.score.toString().includes(query)
      );
    });
  }, [candidates, searchQuery]);

  // Handle analyze button click
  const handleAnalyze = () => {
    // Validate job description
    if (!jobDescription.trim()) {
      setJdError("Please enter a job description");
      return;
    }
    setJdError("");

    // Simulate API call with loading state
    setIsAnalyzing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // Sort dummy candidates by score (descending)
      const sortedCandidates = [...dummyCandidates].sort((a, b) => b.score - a.score);
      setCandidates(sortedCandidates);
      setIsAnalyzing(false);
    }, 2000);
  };

  // Handle candidate selection
  const handleSelectCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsDetailOpen(true);
  };

  // Handle detail panel close
  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedCandidate(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Overview - shown after analysis */}
        {candidates.length > 0 && (
          <div className="mb-8 grid gap-4 sm:grid-cols-3 animate-slide-up">
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Users className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{candidates.length}</p>
                  <p className="text-sm text-muted-foreground">Candidates Analyzed</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                  <TrendingUp className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {candidates.filter((c) => c.score >= 80).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Top Matches (80%+)</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{uploadedFiles.length}</p>
                  <p className="text-sm text-muted-foreground">Resumes Processed</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Input Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <JobDescriptionInput
            value={jobDescription}
            onChange={(value) => {
              setJobDescription(value);
              if (value.trim()) setJdError("");
            }}
            error={jdError}
          />
          <ResumeUpload files={uploadedFiles} onFilesChange={setUploadedFiles} />
        </div>

        {/* Analyze Button */}
        <div className="mt-6 flex justify-center">
          <AnalyzeButton
            onClick={handleAnalyze}
            disabled={!canAnalyze}
            isLoading={isAnalyzing}
          />
        </div>

        {/* Results Section */}
        {(candidates.length > 0 || isAnalyzing) && (
          <div className="mt-10 space-y-4 animate-fade-in">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Candidate Rankings
              </h2>
              <div className="w-full sm:w-80">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>
            </div>

            <CandidateTable
              candidates={filteredCandidates}
              onSelectCandidate={handleSelectCandidate}
            />

            {filteredCandidates.length === 0 && searchQuery && (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">
                  No candidates match your search "{searchQuery}"
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Candidate Detail Side Panel */}
      <CandidateDetail
        candidate={selectedCandidate}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </div>
  );
};

export default Index;
