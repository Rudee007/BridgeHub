// types/jobs.types.ts

export type JobStatus = "active" | "paused" | "closed" | "draft";
export type JobType = "full_time" | "part_time" | "internship" | "contract";
export type WorkMode = "remote" | "hybrid" | "onsite";
export type ExperienceLevel = "entry" | "mid" | "senior" | "lead";
export type Department = "engineering" | "design" | "product" | "marketing" | "sales" | "operations";

export interface Job {
  id: string;
  title: string;
  department: Department;
  jobType: JobType;
  workMode: WorkMode;
  location?: string;
  
  description: string;
  responsibilities: string[];
  
  skills: string[];
  experienceLevel: ExperienceLevel;
  education: string;
  
  salaryMin: number;
  salaryMax: number;
  salaryPeriod: "year" | "month";
  currency: string;
  showSalary: boolean;
  
  openings: number;
  deadline: string;
  
  status: JobStatus;
  
  stats: {
    views: number;
    applied: number;
    shortlisted: number;
    hired: number;
  };
  
  createdAt: string;
  updatedAt: string;
}
