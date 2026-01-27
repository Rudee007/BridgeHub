// types/projects.types.ts

export type ProjectStatus = "draft" | "active" | "in_progress" | "completed" | "closed";
export type ProjectCategory = "web_dev" | "mobile" | "ai_ml" | "data_science" | "ui_ux" | "blockchain";
export type AcademicLevel = "undergraduate" | "graduate" | "phd" | "any";
export type CompensationType = "paid" | "unpaid" | "credit";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  academicLevel: AcademicLevel;
  skills: string[];
  teamSize: {
    min: number;
    max: number;
  };
  duration: {
    value: number;
    unit: "weeks" | "months";
  };
  compensation: {
    type: CompensationType;
    amount?: number;
  };
  location: "remote" | "hybrid" | "onsite";
  applicationCount: number;
  shortlistedCount: number;
  acceptedCount: number;
  deadline: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFilters {
  status: ProjectStatus[];
  category: ProjectCategory[];
  academicLevel: AcademicLevel[];
  compensation: CompensationType[];
  search: string;
}
