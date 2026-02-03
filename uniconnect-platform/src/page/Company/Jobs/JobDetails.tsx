// page/Company/Jobs/JobDetails.tsx

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Edit,
  Pause,
  MoreVertical,
  Briefcase,
  Clock,
  DollarSign,
  Users,
  CheckCircle,
  Mail,
  Phone,
  Star,
  XCircle,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  FileText,
  Search,
  Filter,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { mockJobs } from "@/data/jobsData";
import { departmentLabels, jobTypeLabels, workModeLabels } from "@/data/jobsData";

// Application interface
interface Application {
  id: string;
  candidate: {
    name: string;
    photo: string;
    email: string;
    phone: string;
    university: string;
    major: string;
    year: string;
    cgpa: number;
  };
  status: "new" | "shortlisted" | "interviewing" | "rejected";
  appliedAt: string;
  matchScore: number;
  skills: string[];
  experience: string;
  coverLetter: string;
  resume: string;
  portfolio?: string;
  github?: string;
  linkedin?: string;
}

// Mock applications data
const mockApplications: Application[] = [
  {
    id: "app_001",
    candidate: {
      name: "Sarah Johnson",
      photo: "",
      email: "sarah.j@example.com",
      phone: "+91 98765 43210",
      university: "IIT Bombay",
      major: "Computer Science",
      year: "3rd Year",
      cgpa: 8.9,
    },
    status: "shortlisted",
    appliedAt: "2026-01-26T10:30:00.000Z",
    matchScore: 95,
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    experience: "6 months internship at TechCorp",
    coverLetter:
      "I'm passionate about building scalable web applications and have hands-on experience with React and TypeScript. During my internship, I contributed to 3 major features that improved performance by 40%. I'm excited about the opportunity to bring my skills to your team and continue growing as a developer.",
    resume: "resume_sarah_johnson.pdf",
    portfolio: "https://sarahjohnson.dev",
    github: "https://github.com/sarahjohnson",
    linkedin: "https://linkedin.com/in/sarahjohnson",
  },
  {
    id: "app_002",
    candidate: {
      name: "Rahul Sharma",
      photo: "",
      email: "rahul.sharma@example.com",
      phone: "+91 98765 43211",
      university: "IISc Bangalore",
      major: "Computer Science",
      year: "4th Year",
      cgpa: 9.2,
    },
    status: "new",
    appliedAt: "2026-01-29T14:20:00.000Z",
    matchScore: 90,
    skills: ["React", "Node.js", "MongoDB", "Docker"],
    experience: "1 year as freelance full-stack developer",
    coverLetter:
      "With extensive experience in full-stack development, I'm excited to contribute to your team. I've worked on multiple e-commerce platforms and have a strong understanding of scalable architectures.",
    resume: "resume_rahul_sharma.pdf",
    github: "https://github.com/rahulsharma",
    linkedin: "https://linkedin.com/in/rahulsharma",
  },
  {
    id: "app_003",
    candidate: {
      name: "Priya Patel",
      photo: "",
      email: "priya.patel@example.com",
      phone: "+91 98765 43212",
      university: "NIT Trichy",
      major: "Information Technology",
      year: "Graduate",
      cgpa: 8.5,
    },
    status: "interviewing",
    appliedAt: "2026-01-24T16:45:00.000Z",
    matchScore: 88,
    skills: ["React", "TypeScript", "GraphQL", "AWS", "Docker"],
    experience: "Interned at 2 startups, built 5+ production apps",
    coverLetter:
      "I specialize in creating performant and accessible web applications using modern technologies. My experience spans from design to deployment.",
    resume: "resume_priya_patel.pdf",
    portfolio: "https://priyapatel.dev",
    github: "https://github.com/priyapatel",
    linkedin: "https://linkedin.com/in/priyapatel",
  },
  {
    id: "app_004",
    candidate: {
      name: "Amit Kumar",
      photo: "",
      email: "amit.kumar@example.com",
      phone: "+91 98765 43213",
      university: "BITS Pilani",
      major: "Computer Science",
      year: "Final Year",
      cgpa: 8.2,
    },
    status: "rejected",
    appliedAt: "2026-01-22T09:15:00.000Z",
    matchScore: 60,
    skills: ["JavaScript", "React", "HTML", "CSS"],
    experience: "Personal projects and academic work",
    coverLetter: "I'm a quick learner and eager to join your team. Looking forward to contributing my skills.",
    resume: "resume_amit_kumar.pdf",
    github: "https://github.com/amitkumar",
  },
];

export const JobDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<"overview" | "applications" | "shortlisted">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  // Find job by ID
  const job = mockJobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job not found</h2>
          <p className="text-gray-600 mb-4">The job you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/company/jobs")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  // Helper functions
  const formatSalary = () => {
    if (!job.showSalary) return "Competitive salary";
    const min = (job.salaryMin / 100000).toFixed(1);
    const max = (job.salaryMax / 100000).toFixed(1);
    return `₹${min}L - ₹${max}L/year`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffDays === 0) return "today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  const getStatusBadge = (status: Application["status"]) => {
    const styles = {
      new: "bg-blue-50 text-blue-700",
      shortlisted: "bg-amber-50 text-amber-700",
      interviewing: "bg-purple-50 text-purple-700",
      rejected: "bg-red-50 text-red-700",
    };
    const labels = {
      new: "New",
      shortlisted: "Shortlisted",
      interviewing: "Interviewing",
      rejected: "Rejected",
    };
    return { style: styles[status], label: labels[status] };
  };

  // Filter applications
  const filteredApplications = mockApplications.filter((app) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      app.candidate.name.toLowerCase().includes(query) ||
      app.candidate.university.toLowerCase().includes(query) ||
      app.candidate.major.toLowerCase().includes(query)
    );
  });

  // Get shortlisted applications
  const shortlistedApplications = mockApplications.filter(
    (app) => app.status === "shortlisted" || app.status === "interviewing"
  );

  // Tabs configuration
  const tabs = [
    { id: "overview" as const, label: "Overview", count: null },
    { id: "applications" as const, label: "Applications", count: job.stats.applied },
    { id: "shortlisted" as const, label: "Shortlisted", count: job.stats.shortlisted },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

        {/* Top Navigation Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 h-16 flex items-center justify-between">
            <button
              onClick={() => navigate("/company/jobs")}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Jobs</span>
            </button>

            <div className="flex items-center gap-2">
              <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors" title="Edit Job">
                <Edit className="h-4.5 w-4.5 text-gray-700" />
              </button>
              <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors" title="Pause Job">
                <Pause className="h-4.5 w-4.5 text-gray-700" />
              </button>
              <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors" title="More Options">
                <MoreVertical className="h-4.5 w-4.5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white min-h-screen">
          {/* Job Header Section */}
          <div className="px-8 pt-8 pb-6 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-3">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5" />
                    <span className="font-medium">{departmentLabels[job.department]}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span>{jobTypeLabels[job.jobType]}</span>
                  <span className="text-gray-400">•</span>
                  <span>{workModeLabels[job.workMode]}</span>
                  <span className="text-gray-400">•</span>
                  <span>Posted {formatTimeAgo(job.createdAt)}</span>
                </div>
              </div>
              <span className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-semibold rounded-md border border-green-200">
                ● Active
              </span>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="border-b border-gray-200 px-8">
            <nav className="flex gap-8" role="tablist">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  className={`relative pb-4 text-sm font-semibold transition-colors ${
                    activeTab === tab.id ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                  {tab.count !== null && (
                    <span
                      className={`ml-2 px-2 py-0.5 text-xs font-bold rounded ${
                        activeTab === tab.id ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="px-8 py-8">
            <AnimatePresence mode="wait">
              {/* OVERVIEW TAB */}
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                  {/* Left Column - Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Job Description Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                      <h3 className="text-sm font-bold text-gray-900 mb-4">Job Description</h3>
                      <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                        <p>{job.description}</p>
                        <p>
                          We are looking for a passionate {job.title} to join our growing engineering team. You will be
                          responsible for building and maintaining high-quality web applications, mentoring junior
                          developers, and contributing to our technical architecture decisions.
                        </p>
                      </div>
                    </div>

                    {/* Responsibilities Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                      <h3 className="text-sm font-bold text-gray-900 mb-4">Responsibilities</h3>
                      <ul className="space-y-3">
                        {job.responsibilities.map((resp, index) => (
                          <li key={index} className="flex items-start gap-3 text-sm text-gray-700">
                            <CheckCircle className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Requirements Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                      <h3 className="text-sm font-bold text-gray-900 mb-6">Requirements</h3>

                      {/* Required Skills */}
                      <div className="mb-6">
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
                          Required Skills
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-900 text-xs font-medium rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Experience & Education */}
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                            Experience
                          </p>
                          <p className="text-sm font-semibold text-gray-900">Senior Level</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Education</p>
                          <p className="text-sm font-semibold text-gray-900">{job.education}</p>
                        </div>
                      </div>

                      {/* Nice to Have */}
                      <div>
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">Nice to Have</p>
                        <div className="flex flex-wrap gap-2">
                          {["Next.js", "Docker", "Kubernetes"].map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Sidebar */}
                  <div className="space-y-6">
                    {/* Application Stats Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                      <h3 className="text-sm font-bold text-gray-900 mb-6">Application Stats</h3>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <Users className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-gray-900">{job.stats.applied}</p>
                          <p className="text-xs text-gray-600 font-medium mt-1">Applied</p>
                        </div>
                        <div className="text-center">
                          <Star className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-gray-900">{job.stats.shortlisted}</p>
                          <p className="text-xs text-gray-600 font-medium mt-1">Shortlist</p>
                        </div>
                        <div className="text-center">
                          <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-gray-900">{job.stats.hired}</p>
                          <p className="text-xs text-gray-600 font-medium mt-1">Hired</p>
                        </div>
                      </div>

                      {/* Application Funnel */}
                      <div className="pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-semibold text-gray-700">Application Funnel</p>
                          <p className="text-xs font-bold text-gray-900">2% hired</p>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full w-[2%] bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{job.stats.views.toLocaleString()} total views</p>
                      </div>
                    </div>

                    {/* Job Info Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                      <h3 className="text-sm font-bold text-gray-900 mb-6">Job Info</h3>
                      <div className="space-y-5">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-4 w-4 text-gray-400" />
                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Salary</p>
                          </div>
                          <p className="text-sm font-bold text-gray-900 ml-6">{formatSalary()}</p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Deadline</p>
                          </div>
                          <p className="text-sm font-bold text-gray-900 ml-6">{formatDate(job.deadline)}</p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Openings</p>
                          </div>
                          <p className="text-sm font-bold text-gray-900 ml-6">{job.openings} position(s)</p>
                        </div>
                      </div>
                    </div>

                    {/* Benefits Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                      <h3 className="text-sm font-bold text-gray-900 mb-4">Benefits</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Health Insurance", "Stock Options", "Flexible Hours", "Remote Work"].map((benefit) => (
                          <span
                            key={benefit}
                            className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium rounded-md"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* APPLICATIONS TAB */}
              {activeTab === "applications" && (
                <motion.div
                  key="applications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Search Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search candidates by name, university, or major..."
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-shadow"
                      />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors ml-3">
                      <Filter className="h-4 w-4" />
                      Filter
                    </button>
                  </div>

                  {/* Application Cards */}
                  {filteredApplications.length > 0 ? (
                    <div className="space-y-4">
                      {filteredApplications.map((application, index) => {
                        const statusBadge = getStatusBadge(application.status);
                        return (
                          <motion.div
                            key={application.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
                          >
                            <div className="p-6">
                              {/* Candidate Header */}
                              <div className="flex items-start gap-4 mb-4">
                                {/* Avatar */}
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-sm">
                                  {application.candidate.name.charAt(0)}
                                </div>

                                {/* Candidate Info */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1.5">
                                        <h4 className="text-base font-bold text-gray-900">
                                          {application.candidate.name}
                                        </h4>
                                        <span className="px-2.5 py-0.5 bg-green-50 text-green-700 text-xs font-semibold rounded border border-green-200">
                                          {application.matchScore}% Match
                                        </span>
                                      </div>
                                      <p className="text-sm text-gray-600 mb-1">
                                        {application.candidate.major}, {application.candidate.university}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {application.candidate.year} • CGPA: {application.candidate.cgpa}
                                      </p>
                                    </div>

                                    {/* Status & Time */}
                                    <div className="text-right flex-shrink-0">
                                      <span className={`inline-block px-3 py-1 rounded-md text-xs font-semibold ${statusBadge.style}`}>
                                        {statusBadge.label}
                                      </span>
                                      <p className="text-xs text-gray-500 mt-2">Applied {formatTimeAgo(application.appliedAt)}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Links & Actions */}
                              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                {/* Social Links */}
                                <div className="flex items-center gap-2">
                                  {application.portfolio && (
                                    <a
                                      href={application.portfolio}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <ExternalLink className="h-3.5 w-3.5" />
                                      Portfolio
                                    </a>
                                  )}
                                  {application.github && (
                                    <a
                                      href={application.github}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <Github className="h-3.5 w-3.5" />
                                      GitHub
                                    </a>
                                  )}
                                  {application.linkedin && (
                                    <a
                                      href={application.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <Linkedin className="h-3.5 w-3.5" />
                                      LinkedIn
                                    </a>
                                  )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      // Handle reject
                                    }}
                                    className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                  >
                                    Reject
                                  </button>
                                  <button
                                    onClick={() => setSelectedApplication(application)}
                                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                    Shortlist
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-200">
                      <Users className="h-14 w-14 text-gray-300 mb-4" />
                      <h3 className="text-lg font-bold text-gray-900 mb-2">No applications found</h3>
                      <p className="text-sm text-gray-600">Try adjusting your search query</p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* SHORTLISTED TAB */}
              {activeTab === "shortlisted" && (
                <motion.div
                  key="shortlisted"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {shortlistedApplications.length > 0 ? (
                    <div className="space-y-4">
                      {shortlistedApplications.map((application, index) => {
                        const statusBadge = getStatusBadge(application.status);
                        return (
                          <motion.div
                            key={application.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all"
                          >
                            <div className="flex items-start gap-4">
                              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                                {application.candidate.name.charAt(0)}
                              </div>

                              <div className="flex-1">
                                <h4 className="text-base font-bold text-gray-900 mb-1">{application.candidate.name}</h4>
                                <p className="text-sm text-gray-600 mb-2">
                                  {application.candidate.major}, {application.candidate.university}
                                </p>
                                <span className={`inline-block px-3 py-1 rounded-md text-xs font-semibold ${statusBadge.style}`}>
                                  {statusBadge.label}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                  <Calendar className="h-4 w-4" />
                                  Schedule
                                </button>
                                <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                  <MessageSquare className="h-4 w-4" />
                                  Message
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-200">
                      <Star className="h-14 w-14 text-gray-300 mb-4" />
                      <h3 className="text-lg font-bold text-gray-900 mb-2">No shortlisted candidates yet</h3>
                      <p className="text-sm text-gray-600">Shortlist candidates from the Applications tab</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
      </div>

      {/* Candidate Profile Modal */}
      <AnimatePresence>
        {selectedApplication && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedApplication(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-lg font-bold text-gray-900">Candidate Profile</h2>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                {/* Candidate Header */}
                <div className="flex items-start gap-6 mb-8 pb-8 border-b border-gray-200">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0 shadow-lg">
                    {selectedApplication.candidate.name.charAt(0)}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedApplication.candidate.name}</h3>
                    <p className="text-gray-700 mb-2">
                      {selectedApplication.candidate.major}, {selectedApplication.candidate.university}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      {selectedApplication.candidate.year} • CGPA: {selectedApplication.candidate.cgpa}
                    </p>

                    <div className="flex items-center gap-6 text-sm">
                      <a
                        href={`mailto:${selectedApplication.candidate.email}`}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        <span>{selectedApplication.candidate.email}</span>
                      </a>
                      <a
                        href={`tel:${selectedApplication.candidate.phone}`}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Phone className="h-4 w-4" />
                        <span>{selectedApplication.candidate.phone}</span>
                      </a>
                    </div>
                  </div>

                  {/* Match Score */}
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full border-4 border-green-500 flex items-center justify-center mb-2 shadow-sm">
                      <span className="text-2xl font-bold text-green-600">{selectedApplication.matchScore}</span>
                    </div>
                    <p className="text-xs text-gray-600 font-semibold">Match Score</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-8">
                  <h4 className="text-sm font-bold text-gray-900 mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedApplication.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="mb-8">
                  <h4 className="text-sm font-bold text-gray-900 mb-3">Experience</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{selectedApplication.experience}</p>
                </div>

                {/* Cover Letter */}
                <div className="mb-8">
                  <h4 className="text-sm font-bold text-gray-900 mb-3">Cover Letter</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{selectedApplication.coverLetter}</p>
                </div>

                {/* Attachments */}
                <div className="mb-8">
                  <h4 className="text-sm font-bold text-gray-900 mb-4">Attachments & Links</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="#"
                      className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <FileText className="h-5 w-5 text-gray-600" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">Resume</p>
                        <p className="text-xs text-gray-500 truncate">{selectedApplication.resume}</p>
                      </div>
                      <Download className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    </a>

                    {selectedApplication.portfolio && (
                      <a
                        href={selectedApplication.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <ExternalLink className="h-5 w-5 text-gray-600" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">Portfolio</p>
                          <p className="text-xs text-gray-500">View website</p>
                        </div>
                      </a>
                    )}

                    {selectedApplication.github && (
                      <a
                        href={selectedApplication.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Github className="h-5 w-5 text-gray-600" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">GitHub</p>
                          <p className="text-xs text-gray-500">View profile</p>
                        </div>
                      </a>
                    )}

                    {selectedApplication.linkedin && (
                      <a
                        href={selectedApplication.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Linkedin className="h-5 w-5 text-gray-600" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">LinkedIn</p>
                          <p className="text-xs text-gray-500">View profile</p>
                        </div>
                      </a>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-6 border-t border-gray-200">
                  <button className="flex-1 px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors shadow-sm">
                    Schedule Interview
                  </button>
                  <button className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                    Shortlist
                  </button>
                  <button className="flex-1 px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                    Reject
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobDetails;
