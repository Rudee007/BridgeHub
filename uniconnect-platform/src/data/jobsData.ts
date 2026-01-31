// data/jobsData.ts

import type { Job } from "@/types/jobs.types";

export const mockJobs: Job[] = [
  {
    id: "job_001",
    title: "Senior Frontend Developer",
    department: "engineering",
    jobType: "full_time",
    workMode: "remote",
    description: "Join our team to build next-generation web applications using React and TypeScript. We are looking for a passionate Senior Frontend Developer to join our growing engineering team.",
    responsibilities: [
      "Design and implement new features using React and TypeScript",
      "Collaborate with designers and backend engineers",
      "Write clean, maintainable, and well-tested code",
      "Mentor junior developers and conduct code reviews",
      "Participate in architectural decisions",
    ],
    skills: ["React", "TypeScript", "Node.js", "AWS", "GraphQL"],
    experienceLevel: "senior",
    education: "Bachelor's required",
    salaryMin: 800000,
    salaryMax: 1200000,
    salaryPeriod: "year",
    currency: "INR",
    showSalary: true,
    
    openings: 2,
    deadline: "2026-02-15T23:59:59.000Z",
    status: "active",
    stats: {
      views: 1250,
      applied: 48,
      shortlisted: 12,
      hired: 1,
    },
    createdAt: "2026-01-25T10:30:00.000Z",
    updatedAt: "2026-01-30T14:20:00.000Z",
  },
  {
    id: "job_002",
    title: "Product Designer",
    department: "design",
    jobType: "full_time",
    workMode: "hybrid",
    location: "Bangalore",
    description: "We're seeking a creative Product Designer to craft intuitive user experiences for our web and mobile applications.",
    responsibilities: [
      "Design user interfaces for web and mobile",
      "Create wireframes, prototypes, and high-fidelity mockups",
      "Conduct user research and usability testing",
      "Collaborate with product and engineering teams",
    ],
    skills: ["Figma", "User Research", "Prototyping", "Design Systems", "UI/UX"],
    experienceLevel: "mid",
    education: "Bachelor's degree",
    salaryMin: 600000,
    salaryMax: 900000,
    salaryPeriod: "year",
    currency: "INR",
    showSalary: true,
    openings: 1,
    deadline: "2026-02-20T23:59:59.000Z",
    status: "active",
    stats: {
      views: 890,
      applied: 32,
      shortlisted: 8,
      hired: 0,
    },
    createdAt: "2026-01-20T09:15:00.000Z",
    updatedAt: "2026-01-30T11:45:00.000Z",
  },
  {
    id: "job_003",
    title: "Backend Engineer Intern",
    department: "engineering",
    jobType: "internship",
    workMode: "onsite",
    location: "Mumbai",
    description: "6-month internship opportunity to work on scalable backend systems using Node.js and databases.",
    responsibilities: [
      "Develop RESTful APIs using Node.js",
      "Work with databases (PostgreSQL, MongoDB)",
      "Write unit and integration tests",
      "Learn from senior engineers",
    ],
    skills: ["JavaScript", "Node.js", "PostgreSQL", "MongoDB"],
    experienceLevel: "entry",
    education: "Pursuing Bachelor's",
    salaryMin: 25000,
    salaryMax: 35000,
    salaryPeriod: "month",
    currency: "INR",
    showSalary: true,
    openings: 3,
    deadline: "2026-02-28T23:59:59.000Z",
    status: "active",
    stats: {
      views: 2100,
      applied: 156,
      shortlisted: 25,
      hired: 0,
    },
    createdAt: "2026-01-18T07:30:00.000Z",
    updatedAt: "2026-01-29T16:10:00.000Z",
  },
];

export const departmentLabels: Record<string, string> = {
  engineering: "Engineering",
  design: "Design",
  product: "Product",
  marketing: "Marketing",
  sales: "Sales",
  operations: "Operations",
};

export const jobTypeLabels: Record<string, string> = {
  full_time: "Full-time",
  part_time: "Part-time",
  internship: "Internship",
  contract: "Contract",
};

export const workModeLabels: Record<string, string> = {
  remote: "Remote",
  hybrid: "Hybrid",
  onsite: "On-site",
};

export const experienceLevelLabels: Record<string, string> = {
  entry: "Entry Level",
  mid: "Mid Level",
  senior: "Senior Level",
  lead: "Lead/Principal",
};
