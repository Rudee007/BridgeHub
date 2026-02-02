// types/talent.types.ts

export type TalentStatus = "available" | "busy" | "hired" | "open_to_offers";

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  portfolio?: string;
  twitter?: string;
  behance?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  github?: string;
  thumbnail?: string; // URL to image
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string; // e.g. "Jun 2024 - Aug 2024"
  description: string;
  type: "internship" | "freelance" | "full-time";
}

export interface TalentProfile {
  id: string;
  name: string;
  university: string;
  avatar: string;
  degree: string;
  graduationYear: number;
  cgpa?: number; // Added academic metric
  
  // Professional
  skills: string[];
  primaryRole: string;
  experienceLevel: "fresher" | "junior" | "mid" | "senior";
  
  // Status
  status: TalentStatus;
  isVerified: boolean;
  
  // Stats
  projectsCompleted: number;
  rating: number;
  successRate: number;
  
  // Detailed Content for Modal
  bio: string;
  availability: string;
  location: string;
  languages: string[]; // e.g. ["English", "Hindi"]
  
  socials: SocialLinks;
  projects: Project[];     // NEW
  experience: Experience[]; // NEW
  resumeUrl?: string;      // NEW
}