// types/analytics.types.ts

export interface AnalyticsSummary {
  totalApplications: number;
  avgTimeToHire: number; // in days
  hireRate: number; // percentage
  activePipelines: number;
  trends: {
    applications: number; // percentage change (e.g., +12)
    timeToHire: number;
    hireRate: number;
    pipelines: number;
  };
}

export interface UniversityPerformance {
  id: string;
  name: string;
  applications: number;
  hired: number;
  successRate: number; // percentage
}

export interface SkillDemand {
  name: string;
  count: number;
  growth: number; // percentage
}

export interface JobPerformance {
  id: string;
  title: string;
  applications: number;
  shortlisted: number;
  interviewed: number;
  hired: number;
  conversionRate: number;
  avgTime: number; // days
}

export interface MatchScoreDistribution {
  range: string; // e.g., "90-100%"
  count: number;
  percentage: number;
  color: string;
}