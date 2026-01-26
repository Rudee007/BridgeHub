// types/dashboard.types.ts

export interface CompanyData {
  id: string;
  websiteUrl: string;
  companyName: string;
  industry: string;
  location: string;
  phoneNumber: string;
  description: string;
  logoUrl: string;
  email: string;
  profileComplete: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MetricData {
  id: string;
  label: string;
  value: number;
  trend: number;
  trendLabel: string;
  trendUp: boolean;
  type: "projects" | "applications" | "partners" | "jobs";
  lastUpdated: string;
}

export interface Activity {
  id: string;
  type: "application" | "project" | "message" | "partnership";
  title: string;
  description: string;
  timestamp: string;
  isNew: boolean;
  userId?: string;
  userName?: string;
  metadata?: Record<string, any>;
}

export interface Job {
  id: string;
  title: string;
  status: "active" | "paused" | "closed";
  applicantCount: number;
  postedAt: string;
  description?: string;
  requirements?: string[];
}

export interface ChartDataPoint {
  label?: string;
  value: number;
  timestamp?: string;
  percentage?: number;
}

export interface ProjectActivityData {
  day: string;
  projects: number;
  applications: number;
  total: number;
}

export interface UniversityPartnerData {
  month: string;
  partners: number;
  target: number;
  growth: number;
}

export interface ApplicationFunnelData {
  label: string;
  value: number;
  percentage: number;
  color: string;
}
