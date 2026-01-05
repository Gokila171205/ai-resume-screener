// Dummy data for UI testing
export interface Candidate {
  id: string;
  name: string;
  score: number;
  experience: string;
  matchedSkills: string[];
  missingSkills: string[];
  email: string;
  phone: string;
  aiSummary: string;
}

export const dummyCandidates: Candidate[] = [
  {
    id: "1",
    name: "Sarah Chen",
    score: 95,
    experience: "6 years",
    matchedSkills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    missingSkills: ["Kubernetes"],
    email: "sarah.chen@email.com",
    phone: "+1 (555) 123-4567",
    aiSummary: "Exceptional candidate with strong full-stack experience. Led multiple React projects at scale. Demonstrates excellent problem-solving skills and has a proven track record of delivering high-quality code. Strong cultural fit based on collaborative experience."
  },
  {
    id: "2",
    name: "Marcus Johnson",
    score: 88,
    experience: "5 years",
    matchedSkills: ["React", "JavaScript", "Python", "PostgreSQL"],
    missingSkills: ["TypeScript", "AWS"],
    email: "marcus.j@email.com",
    phone: "+1 (555) 234-5678",
    aiSummary: "Solid engineering background with diverse technology exposure. Shows strong potential for growth. Experience with both frontend and backend systems. Recommended for technical interview to assess TypeScript proficiency."
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    score: 82,
    experience: "4 years",
    matchedSkills: ["React", "TypeScript", "CSS", "Figma"],
    missingSkills: ["Node.js", "AWS", "GraphQL"],
    email: "emily.r@email.com",
    phone: "+1 (555) 345-6789",
    aiSummary: "Frontend-focused developer with excellent UI/UX sensibilities. Strong design collaboration skills. Would benefit from backend mentorship. Great communication skills evident from portfolio presentations."
  },
  {
    id: "4",
    name: "David Kim",
    score: 78,
    experience: "3 years",
    matchedSkills: ["JavaScript", "React", "MongoDB"],
    missingSkills: ["TypeScript", "AWS", "Node.js"],
    email: "david.kim@email.com",
    phone: "+1 (555) 456-7890",
    aiSummary: "Promising junior developer with solid React fundamentals. Quick learner based on career progression. Enthusiastic about new technologies. Suitable for growth-oriented role with mentorship opportunities."
  },
  {
    id: "5",
    name: "Alexandra Peters",
    score: 74,
    experience: "2 years",
    matchedSkills: ["React", "CSS", "HTML"],
    missingSkills: ["TypeScript", "Node.js", "AWS", "PostgreSQL"],
    email: "alex.p@email.com",
    phone: "+1 (555) 567-8901",
    aiSummary: "Entry-level candidate with strong frontend basics. Portfolio shows creative problem-solving. Actively learning TypeScript. Consider for junior position with structured onboarding program."
  },
  {
    id: "6",
    name: "James Wilson",
    score: 91,
    experience: "7 years",
    matchedSkills: ["React", "TypeScript", "Node.js", "AWS", "Docker"],
    missingSkills: ["GraphQL"],
    email: "james.w@email.com",
    phone: "+1 (555) 678-9012",
    aiSummary: "Senior engineer with extensive cloud experience. Led architecture decisions at previous company. Strong mentorship background. Excellent fit for lead developer position."
  }
];

export const sampleJobDescription = `Senior Frontend Developer

We are looking for an experienced Frontend Developer to join our growing team.

Requirements:
- 4+ years of experience with React.js
- Strong proficiency in TypeScript
- Experience with modern CSS frameworks (Tailwind, styled-components)
- Familiarity with Node.js and REST APIs
- Experience with cloud services (AWS preferred)
- Knowledge of GraphQL is a plus

Responsibilities:
- Build and maintain responsive web applications
- Collaborate with design and backend teams
- Write clean, testable code
- Participate in code reviews
- Mentor junior developers`;
