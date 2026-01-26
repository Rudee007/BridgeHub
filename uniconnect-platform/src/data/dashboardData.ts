// data/dashboardData.ts
import type {
  CompanyData,
  MetricData,
  Activity,
  Job,
  ProjectActivityData,
  UniversityPartnerData,
  ApplicationFunnelData,
} from "@/types/dashboard.types";

export const DEFAULT_COMPANY_DATA: CompanyData = {
  id: "company_demo_001",
  companyName: "BridgeHub",
  email: "demo@bridgehub.com",
  industry: "Technology & Education",
  location: "Bangalore, Karnataka, India",
  phoneNumber: "+91 98765 43210",
  description: "Connecting innovative companies with talented university students for meaningful collaborations.",
  logoUrl: "",
  websiteUrl: "https://bridgehub.com",
  profileComplete: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const mockMetrics: MetricData[] = [
  {
    id: "metric_001",
    label: "Active Projects",
    value: 12,
    trend: 33.3,
    trendLabel: "from last month",
    trendUp: true,
    type: "projects",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "metric_002",
    label: "Total Applications",
    value: 284,
    trend: 20.3,
    trendLabel: "from last week",
    trendUp: true,
    type: "applications",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "metric_003",
    label: "University Partners",
    value: 8,
    trend: 33.3,
    trendLabel: "from last month",
    trendUp: true,
    type: "partners",
    lastUpdated: new Date().toISOString(),
  },
  {
    id: "metric_004",
    label: "Active Jobs",
    value: 5,
    trend: -16.7,
    trendLabel: "from last week",
    trendUp: false,
    type: "jobs",
    lastUpdated: new Date().toISOString(),
  },
];

export const projectActivityChartData: ProjectActivityData[] = [
  { day: "Mon", projects: 8, applications: 12, total: 20 },
  { day: "Tue", projects: 12, applications: 18, total: 30 },
  { day: "Wed", projects: 15, applications: 30, total: 45 },
  { day: "Thu", projects: 10, applications: 20, total: 30 },
  { day: "Fri", projects: 18, applications: 37, total: 55 },
  { day: "Sat", projects: 14, applications: 26, total: 40 },
  { day: "Sun", projects: 16, applications: 34, total: 50 },
];

export const universityPartnersChartData: UniversityPartnerData[] = [
  { month: "Jan", partners: 3, target: 5, growth: 20 },
  { month: "Feb", partners: 4, target: 6, growth: 33 },
  { month: "Mar", partners: 5, target: 7, growth: 25 },
  { month: "Apr", partners: 6, target: 8, growth: 20 },
  { month: "May", partners: 7, target: 9, growth: 17 },
  { month: "Jun", partners: 8, target: 10, growth: 14 },
];

export const applicationFunnelData: ApplicationFunnelData[] = [
  { label: "Viewed", value: 284, percentage: 100, color: "#3b82f6" },
  { label: "Applied", value: 156, percentage: 54.9, color: "#374151" },
  { label: "Reviewed", value: 89, percentage: 31.3, color: "#10b981" },
  { label: "Interview", value: 32, percentage: 11.3, color: "#8b5cf6" },
  { label: "Hired", value: 8, percentage: 2.8, color: "#059669" },
];

export const partnershipStats = {
  total: 8,
  thisMonth: 2,
  pending: 3,
  growthRate: 33.3,
};

export const mockActivities: Activity[] = [
  {
    id: "activity_001",
    type: "application",
    title: "New Application Received",
    description: "Sarah Johnson applied for Senior Frontend Developer",
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    isNew: true,
    userId: "user_123",
    userName: "Sarah Johnson",
  },
  {
    id: "activity_002",
    type: "project",
    title: "Project Submission",
    description: "AI Dashboard project received 5 new submissions",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    isNew: true,
  },
  {
    id: "activity_003",
    type: "message",
    title: "New Message",
    description: "Michael Chen sent a message about the interview schedule",
    timestamp: new Date(Date.now() - 32 * 60 * 1000).toISOString(),
    isNew: false,
    userId: "user_456",
    userName: "Michael Chen",
  },
  {
    id: "activity_004",
    type: "partnership",
    title: "Partnership Request",
    description: "IIT Bombay sent a collaboration request",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isNew: false,
  },
];

export const mockJobs: Job[] = [
  {
    id: "job_001",
    title: "Senior Frontend Developer",
    status: "active",
    applicantCount: 48,
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "job_002",
    title: "Product Manager",
    status: "active",
    applicantCount: 32,
    postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "job_003",
    title: "Backend Engineer",
    status: "paused",
    applicantCount: 25,
    postedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "job_004",
    title: "UX Designer",
    status: "active",
    applicantCount: 18,
    postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Utility functions
export const formatRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

export const initializeCompanyData = (): CompanyData => {
  try {
    const stored = localStorage.getItem("companyData");
    if (stored) {
      console.log("✅ Found existing company data in localStorage");
      return JSON.parse(stored);
    }
    console.log("🔧 No company data found, initializing with default data...");
    localStorage.setItem("companyData", JSON.stringify(DEFAULT_COMPANY_DATA));
    console.log("✅ Default company data saved to localStorage");
    return DEFAULT_COMPANY_DATA;
  } catch (error) {
    console.error("❌ Error initializing company data:", error);
    return DEFAULT_COMPANY_DATA;
  }
};
