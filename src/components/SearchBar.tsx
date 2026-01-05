import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Search bar component for filtering candidates
const SearchBar = ({ value, onChange, placeholder = "Search candidates by name, skill, or score..." }: SearchBarProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 border-border bg-card pl-10 text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent"
      />
    </div>
  );
};

export default SearchBar;
