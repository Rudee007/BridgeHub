// components/projects/ProjectCard.tsx
import { motion } from "framer-motion";
import { Users, Clock, MapPin, Calendar, DollarSign, MoreVertical } from "lucide-react";
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
        return "bg-success-100 text-success-700 border-success-200";
      case "draft":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "in_progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "completed":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "closed":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusBorder = (status: string) => {
    switch (status) {
      case "active":
        return "border-l-success-500";
      case "draft":
        return "border-l-amber-500";
      case "in_progress":
        return "border-l-blue-500";
      case "completed":
        return "border-l-gray-400";
      case "closed":
        return "border-l-rose-500";
      default:
        return "border-l-gray-400";
    }
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Expired";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays < 7) return `${diffDays} days left`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatCreatedAt = (createdAt: string) => {
    const date = new Date(createdAt);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={() => navigate(`/company/projects/${project.id}`)}
      className={`bg-white rounded-xl border-l-4 border-t border-r border-b border-gray-200 
                  ${getStatusBorder(project.status)} p-6 hover:shadow-lg transition-all cursor-pointer 
                  group relative ${project.status === "draft" ? "opacity-75" : ""}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <span
          className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${getStatusColor(project.status)}`}
        >
          {statusLabels[project.status]}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Open menu
          }}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
        >
          <MoreVertical className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      {/* Title & Category */}
      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
        {project.title}
      </h3>
      <p className="text-xs text-gray-500 font-semibold mb-3">{categoryLabels[project.category]}</p>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.skills.slice(0, 3).map((skill) => (
          <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
            {skill}
          </span>
        ))}
        {project.skills.length > 3 && (
          <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded">
            +{project.skills.length - 3}
          </span>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5 text-gray-400" />
          <div>
            <p className="text-xs font-bold text-gray-900">{project.applicationCount}</p>
            <p className="text-xs text-gray-500">Applied</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-gray-400" />
          <div>
            <p className="text-xs font-bold text-gray-900">
              {project.duration.value} {project.duration.unit}
            </p>
            <p className="text-xs text-gray-500">Duration</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <DollarSign className="h-3.5 w-3.5 text-gray-400" />
          <div>
            <p className="text-xs font-bold text-gray-900">
              {project.compensation.type === "paid" ? `₹${project.compensation.amount?.toLocaleString()}` : "Unpaid"}
            </p>
            <p className="text-xs text-gray-500">Stipend</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-gray-500">
          <Calendar className="h-3.5 w-3.5" />
          <span>Posted {formatCreatedAt(project.createdAt)}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-700 font-semibold">
          <Clock className="h-3.5 w-3.5" />
          <span>{formatDeadline(project.deadline)}</span>
        </div>
      </div>

      {/* Hover indicator */}
      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-sm text-primary-600 font-semibold">View Details →</span>
      </div>
    </motion.div>
  );
};
