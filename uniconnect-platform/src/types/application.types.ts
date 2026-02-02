// types/application.types.ts

export type Stage = 'Applied' | 'Screening' | 'Technical' | 'HR Round' | 'Offer' | 'Hired' | 'Rejected';

export type ApplicationStatus = 'Active' | 'On Hold' | 'Rejected';

export interface Application {
  id: string;
  name: string;
  avatar: string;
  role: string;
  university: string;
  degree: string;
  appliedDate: string;
  stage: Stage;
  matchScore: number;
  status: ApplicationStatus;
  rating: number; // 1-5 stars
}