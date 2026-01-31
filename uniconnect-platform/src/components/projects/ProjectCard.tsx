// components/projects/ProjectCard.tsx
import { motion } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  MoreVertical, 
  ExternalLink 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Project } from "@/types/projects.types";
import { categoryLabels, statusLabels } from "@/data/projectData";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200";
      case "draft":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "in_progress":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "completed":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "closed":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const formatCompensation = () => {
    if (project.compensation.type === "unpaid") return "Unpaid";
    if (project.compensation.type === "credit") return "Academic Credit";
    if (project.compensation.amount) {
      return `₹${(project.compensation.amount / 1000).toFixed(1)}K`;
    }
    return "TBD";
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  const daysAgo = () => {
    const created = new Date(project.createdAt);
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
      onClick={() => navigate(`/company/projects/${project.id}`)}
      className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group relative isolate hover:-translate-y-2 hover:z-10"
    >
      {/* Header - EXACT SAME STRUCTURE */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${getStatusColor(project.status)}`}>
            ● {statusLabels[project.status]}
          </span>
          <span className="text-xs text-gray-500">{categoryLabels[project.category]}</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500 capitalize">{project.location}</span>
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

      {/* Title & Category - EXACT SAME */}
      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
        {project.title}
      </h3>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="flex items-center gap-1.5">
          <Briefcase className="h-3.5 w-3.5 text-gray-400" />
          <span className="text-xs text-gray-600 font-medium">{categoryLabels[project.category]}</span>
        </div>
        <span className="text-xs text-gray-400">•</span>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-gray-400" />
          <span className="text-xs text-gray-600">{project.location}</span>
        </div>
      </div>

      {/* Compensation - EXACT SAME POSITION */}
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="h-4 w-4 text-gray-400" />
        <span className="text-sm font-semibold text-gray-900">{formatCompensation()}</span>
      </div>

      {/* Skills - EXACT SAME */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.skills.slice(0, 4).map((skill) => (
          <span key={skill} className="px-2 py-1 bg-gray-900 text-white text-xs font-medium rounded">
            {skill}
          </span>
        ))}
        {project.skills.length > 4 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
            +{project.skills.length - 4}
          </span>
        )}
      </div>

      {/* Stats Grid - EXACT SAME 3-COLUMN LAYOUT */}
      <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-gray-100">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Users className="h-3.5 w-3.5 text-gray-400" />
            <p className="text-lg font-bold text-gray-900">{project.applicationCount}</p>
          </div>
          <p className="text-xs text-gray-600">Applied</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Users className="h-3.5 w-3.5 text-amber-500" />
            <p className="text-lg font-bold text-gray-900">{project.shortlistedCount}</p>
          </div>
          <p className="text-xs text-gray-600">Shortlisted</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Users className="h-3.5 w-3.5 text-green-500" />
            <p className="text-lg font-bold text-gray-900">{project.selectedCount}</p>
          </div>
          <p className="text-xs text-gray-600">Selected</p>
        </div>
      </div>

      {/* Footer - EXACT SAME */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-gray-500">
          <Clock className="h-3.5 w-3.5" />
          <span>Posted {daysAgo()}</span>
        </div>
        <span className="text-gray-700 font-semibold">Deadline: {formatDeadline(project.deadline)}</span>
      </div>

      {/* Hover Action - EXACT SAME POSITION */}
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <span className="text-xs text-blue-600 font-semibold flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md border border-blue-200">
          View Details <ExternalLink className="h-3 w-3" />
        </span>
      </div>
    </motion.div>
  );
};
