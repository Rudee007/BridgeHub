export type PartnershipStatus = "none" | "pending" | "active";

export interface PartnershipData {
  startDate?: string;
  renewalDate?: string;
  pocName?: string; // Point of Contact
  pocRole?: string;
  pocEmail?: string;
  agreementLink?: string;
  campusDrivesHeld: number;
  upcomingDriveDate?: string;
}

export interface University {
  id: string;
  name: string;
  logo: string;
  coverImage: string; // New: For profile header
  location: string;
  state: string;
  country: string;
  about: string; // New: Description
  departments: string[];
  specializations: string[];
  
  // Stats
  activeStudents: number;
  totalProjects: number;
  studentsHired: number;
  rating: number;
  totalReviews: number;
  
  // Contact
  contactEmail: string;
  contactPhone: string;
  website: string;
  establishedYear: number;

  // Partnership Specifics
  partnershipStatus: PartnershipStatus;
  partnershipData?: PartnershipData; // New: Detailed partnership info

  // Placement Stats (New)
  placementStats: {
    avgPackage: string;
    highestPackage: string;
    placementRate: number;
  };
}

export interface UniversityFilters {
  location: string;
  state: string;
  departments: string[];
  specializations: string[];
  studentCount: string;
  partnershipStatus: string[]; 
}