// components/dashboard/JobCard.tsx
import { Users } from "lucide-react";
import type { Job } from "@/types/dashboard.types";
import { formatRelativeTime } from "@/data/dashboardData";

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-bold text-gray-900 line-clamp-1 flex-1 pr-2">{job.title}</p>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-md whitespace-nowrap ${
            job.status === "active"
              ? "bg-success-100 text-success-700"
              : job.status === "paused"
              ? "bg-amber-100 text-amber-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
        </span>
      </div>
      <div className="flex items-center gap-3 text-xs text-gray-600">
        <span className="flex items-center gap-1.5 font-semibold">
          <Users className="h-3.5 w-3.5" />
          {job.applicantCount} applicants
        </span>
        <span className="font-medium">{formatRelativeTime(job.postedAt)}</span>
      </div>
    </div>
  );
};
