import { useCallback, useState } from "react";
import { Upload, File, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

interface ResumeUploadProps {
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
}

// Resume upload section with drag-and-drop functionality
const ResumeUpload = ({ files, onFilesChange }: ResumeUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);

  // Handle file drop
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      const validFiles = droppedFiles.filter(
        (file) =>
          file.type === "application/pdf" ||
          file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );

      const newFiles: UploadedFile[] = validFiles.map((file) => ({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        name: file.name,
        size: file.size,
        type: file.type,
      }));

      onFilesChange([...files, ...newFiles]);
    },
    [files, onFilesChange]
  );

  // Handle file input change
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(
      (file) =>
        file.type === "application/pdf" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );

    const newFiles: UploadedFile[] = validFiles.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    onFilesChange([...files, ...newFiles]);
    e.target.value = ""; // Reset input
  };

  // Remove a file from the list
  const removeFile = (id: string) => {
    onFilesChange(files.filter((file) => file.id !== id));
  };

  // Format file size for display
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
          <Upload className="h-4 w-4 text-accent" />
        </div>
        <Label className="text-lg font-semibold text-foreground">Upload Resumes</Label>
      </div>

      {/* Drag and drop area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all duration-200 ${
          isDragging
            ? "border-accent bg-accent/5"
            : "border-border bg-muted/30 hover:border-accent/50 hover:bg-muted/50"
        }`}
      >
        <input
          type="file"
          multiple
          accept=".pdf,.docx"
          onChange={handleFileInput}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
        
        <div className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
          isDragging ? "bg-accent/20" : "bg-secondary"
        }`}>
          <Upload className={`h-6 w-6 transition-colors ${isDragging ? "text-accent" : "text-muted-foreground"}`} />
        </div>
        
        <p className="mt-3 text-sm font-medium text-foreground">
          {isDragging ? "Drop files here" : "Drag & drop resumes here"}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          or click to browse • PDF, DOCX accepted
        </p>
      </div>

      {/* Uploaded files list */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-foreground">
            {files.length} resume{files.length !== 1 ? "s" : ""} uploaded
          </p>
          <div className="max-h-[200px] space-y-2 overflow-y-auto">
            {files.map((file, index) => (
              <div
                key={file.id}
                className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <FileText className="h-4 w-4 shrink-0 text-accent" />
                  <span className="truncate text-sm text-foreground">{file.name}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    ({formatFileSize(file.size)})
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0"
                  onClick={() => removeFile(file.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
