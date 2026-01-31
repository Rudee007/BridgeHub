// page/Company/Jobs/JobsList.tsx

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Grid3x3, List, Briefcase, Users, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { JobCard } from "@/components/jobs/JobCard";
import { mockJobs } from "@/data/jobsData";
import type { Job } from "@/types/jobs.types";

export const JobsList = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Calculate metrics
  const metrics = useMemo(() => {
    const total = mockJobs.length;
    const active = mockJobs.filter((j) => j.status === "active").length;
    const totalApplications = mockJobs.reduce((sum, j) => sum + j.stats.applied, 0);
    const paused = mockJobs.filter((j) => j.status === "paused").length;

    return {
      total,
      active,
      totalApplications,
      paused,
      newThisWeek: 3,
      receivingApps: active,
      thisMonth: totalApplications,
      awaitingReview: paused,
    };
  }, []);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      // Status filter
      if (statusFilter !== "all" && job.status !== statusFilter) return false;

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          job.title.toLowerCase().includes(query) ||
          job.skills.some((s) => s.toLowerCase().includes(query)) ||
          job.description.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [searchQuery, statusFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar companyName="BridgeHub" logoUrl="" />

      <div className="lg:pl-[280px]">
        {/* Top Navigation */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Jobs</h2>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Jobs</h1>
              <p className="text-gray-600 text-sm mt-1">Manage job postings and applications</p>
            </div>
            <button
              onClick={() => navigate("/company/jobs/new")}
              className="px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Post New Job
            </button>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              {
                label: "Total Jobs",
                value: metrics.total,
                subtext: `+${metrics.newThisWeek} this week`,
                icon: Briefcase,
                color: "text-blue-600",
                bgColor: "bg-blue-50",
              },
              {
                label: "Active Jobs",
                value: metrics.active,
                subtext: `${metrics.receivingApps} receiving applications`,
                icon: CheckCircle,
                color: "text-green-600",
                bgColor: "bg-green-50",
              },
              {
                label: "Total Applications",
                value: metrics.totalApplications,
                subtext: "This month",
                icon: Users,
                color: "text-purple-600",
                bgColor: "bg-purple-50",
              },
              {
                label: "Paused Jobs",
                value: metrics.paused,
                subtext: "Awaiting review",
                icon: Clock,
                color: "text-amber-600",
                bgColor: "bg-amber-50",
              },
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                    <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</p>
                <p className="text-sm text-gray-600 font-semibold mb-1">{metric.label}</p>
                <p className="text-xs text-gray-500">{metric.subtext}</p>
              </motion.div>
            ))}
          </div>

          {/* Search & Filters */}
          <div className="flex items-center gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs by title, skills, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white font-medium text-gray-700 placeholder:text-gray-400"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white font-medium text-gray-700"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="closed">Closed</option>
              <option value="draft">Draft</option>
            </select>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid" ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"
                } transition-colors`}
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list" ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"
                } transition-colors`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-4">
              Showing <span className="font-semibold text-gray-900">{filteredJobs.length}</span> of{" "}
              <span className="font-semibold text-gray-900">{mockJobs.length}</span> jobs
            </p>

            {filteredJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-200">
                <Briefcase className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">No jobs found</h3>
                <p className="text-sm text-gray-600 mb-6">Try adjusting your search or filters</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                  }}
                  className="px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5" : "space-y-4"}>
                {filteredJobs.map((job, index) => (
                  <JobCard key={job.id} job={job} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsList;
