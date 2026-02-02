import type { 
  AnalyticsSummary, 
  UniversityPerformance, 
  SkillDemand, 
  MatchScoreDistribution,
} from "@/types/analytics.types";

export const ANALYTICS_SUMMARY: AnalyticsSummary = {
  totalApplications: 248,
  avgTimeToHire: 18,
  hireRate: 8.5,
  activePipelines: 6,
  trends: {
    applications: 12,
    timeToHire: -3,
    hireRate: 2.3,
    pipelines: 1
  }
};

export const UNIVERSITY_PERFORMANCE: UniversityPerformance[] = [
  { id: "u1", name: "IIT Bombay", applications: 48, hired: 5, successRate: 10.4 },
  { id: "u2", name: "IISc Bangalore", applications: 35, hired: 3, successRate: 8.6 },
  { id: "u3", name: "IIT Madras", applications: 42, hired: 4, successRate: 9.5 },
  { id: "u4", name: "BITS Pilani", applications: 38, hired: 2, successRate: 5.3 },
  { id: "u5", name: "IIT Kharagpur", applications: 29, hired: 2, successRate: 6.9 },
];

export const SKILL_DEMAND: SkillDemand[] = [
  { name: "React", count: 78, growth: 12 },
  { name: "Python", count: 65, growth: 8 },
  { name: "Node.js", count: 54, growth: 15 },
  { name: "MongoDB", count: 48, growth: 5 },
  { name: "AWS", count: 42, growth: 20 },
];

export const MATCH_SCORES: MatchScoreDistribution[] = [
  { range: "90-100%", count: 35, percentage: 14, color: "#10b981" }, // Emerald
  { range: "75-89%", count: 112, percentage: 45, color: "#3b82f6" }, // Blue
  { range: "50-74%", count: 85, percentage: 34, color: "#f59e0b" }, // Amber
  { range: "<50%", count: 16, percentage: 7, color: "#ef4444" }, // Red
];

export const FUNNEL_DATA = [
  { label: "Applied", value: 345, percentage: 100, color: "#3b82f6" },
  { label: "Screening", value: 189, percentage: 55, color: "#60a5fa" },
  { label: "Interview", value: 87, percentage: 25, color: "#10b981" },
  { label: "Offer", value: 24, percentage: 7, color: "#f59e0b" },
  { label: "Hired", value: 12, percentage: 3.5, color: "#16a34a" },
];

// ✅ ADDED: This fixes the missing data error in your Dashboard
export const PARTNER_CHART_DATA = [
  { month: 'Jan', partners: 4, target: 5, growth: 10 },
  { month: 'Feb', partners: 6, target: 6, growth: 15 },
  { month: 'Mar', partners: 9, target: 7, growth: 12 },
  { month: 'Apr', partners: 11, target: 8, growth: 20 },
  { month: 'May', partners: 15, target: 10, growth: 25 },
  { month: 'Jun', partners: 18, target: 12, growth: 30 },
];