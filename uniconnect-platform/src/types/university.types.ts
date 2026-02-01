// types/university.types.ts

export type PartnershipStatus = "none" | "pending" | "active";

export interface University {
  id: string;
  name: string;
  logo?: string;
  location: string;
  state: string;
  country: string;
  departments: string[];
  specializations: string[];
  activeStudents: number;
  partnershipStatus: PartnershipStatus;
  totalProjects: number;
  studentsHired: number;
  rating: number;
  totalReviews: number;
  contactEmail: string;
  contactPhone: string;
  website?: string;
  establishedYear: number;
  partnerSince?: string;
  lastActivity?: string;
}

export interface UniversityFilters {
  location: string;
  state: string;
  departments: string[];
  specializations: string[];
  studentCount: string; // e.g., "any", "1k+", "5k+"
  partnershipStatus: string; // "All", "Active", "Pending", "None"
}