// components/jobs/JobCard.tsx

import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, DollarSign, Users, MoreVertical, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Job } from "@/types/jobs.types";
import { departmentLabels, jobTypeLabels, workModeLabels } from "@/data/jobsData";

interface JobCardProps {
  job: Job;
  index: number;
}

export const JobCard: React.FC<JobCardProps> = ({ job, index }) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200";
      case "paused":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "closed":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "draft":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatSalary = () => {
    if (!job.showSalary) return "Competitive salary";
    const min = (job.salaryMin / (job.salaryPeriod === "year" ? 100000 : 1000)).toFixed(1);
    const max = (job.salaryMax / (job.salaryPeriod === "year" ? 100000 : 1000)).toFixed(1);
    const unit = job.salaryPeriod === "year" ? "L" : "K";
    return `₹${min} - ${max}${unit}/${job.salaryPeriod === "year" ? "year" : "month"}`;
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  const daysAgo = () => {
    const created = new Date(job.createdAt);
    const now = new Date();
    const diff = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    return `${diff} days ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={() => navigate(`/company/jobs/${job.id}`)}
      className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group relative isolate hover:-translate-y-2 hover:z-10"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${getStatusColor(job.status)}`}>
            ● {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
          </span>
          <span className="text-xs text-gray-500">{jobTypeLabels[job.jobType]}</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500">{workModeLabels[job.workMode]}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Add dropdown menu logic here
          }}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
        >
          <MoreVertical className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      {/* Title & Department */}
      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
        {job.title}
      </h3>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="flex items-center gap-1.5">
          <Briefcase className="h-3.5 w-3.5 text-gray-400" />
          <span className="text-xs text-gray-600 font-medium">{departmentLabels[job.department]}</span>
        </div>
        {job.location && (
          <>
            <span className="text-xs text-gray-400">•</span>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-xs text-gray-600">{job.location}</span>
            </div>
          </>
        )}
      </div>

      {/* Salary */}
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="h-4 w-4 text-gray-400" />
        <span className="text-sm font-semibold text-gray-900">{formatSalary()}</span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.slice(0, 4).map((skill) => (
          <span key={skill} className="px-2 py-1 bg-gray-900 text-white text-xs font-medium rounded">
            {skill}
          </span>
        ))}
        {job.skills.length > 4 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
            +{job.skills.length - 4}
          </span>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-gray-100">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Users className="h-3.5 w-3.5 text-gray-400" />
            <p className="text-lg font-bold text-gray-900">{job.stats.applied}</p>
          </div>
          <p className="text-xs text-gray-600">Applied</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Users className="h-3.5 w-3.5 text-amber-500" />
            <p className="text-lg font-bold text-gray-900">{job.stats.shortlisted}</p>
          </div>
          <p className="text-xs text-gray-600">Shortlist</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Users className="h-3.5 w-3.5 text-green-500" />
            <p className="text-lg font-bold text-gray-900">{job.stats.hired}</p>
          </div>
          <p className="text-xs text-gray-600">Hired</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-gray-500">
          <Clock className="h-3.5 w-3.5" />
          <span>Posted {daysAgo()}</span>
        </div>
        <span className="text-gray-700 font-semibold">Deadline: {formatDeadline(job.deadline)}</span>
      </div>

      {/* Hover Action - Repositioned to avoid overlap with deadline */}
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <span className="text-xs text-blue-600 font-semibold flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md border border-blue-200">
          View Details <ExternalLink className="h-3 w-3" />
        </span>
      </div>
    </motion.div>
  );
};
