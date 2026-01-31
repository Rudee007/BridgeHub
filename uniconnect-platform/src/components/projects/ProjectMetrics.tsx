// components/projects/ProjectMetrics.tsx
import { motion } from "framer-motion";
import { ClipboardList, Clock, CheckCircle, FileText } from "lucide-react";
import type { Project } from "@/types/projects.types";

interface ProjectMetricsProps {
  projects: Project[];
}

export const ProjectMetrics: React.FC<ProjectMetricsProps> = ({ projects }) => {
  const stats = {
    total: projects.length,
    active: projects.filter((p) => p.status === "active").length,
    inProgress: projects.filter((p) => p.status === "in_progress").length,
    completed: projects.filter((p) => p.status === "completed").length,
    draft: projects.filter((p) => p.status === "draft").length,
    totalApplications: projects.reduce((sum, p) => sum + p.applicationCount, 0),
  };

  const metrics = [
    {
      label: "Total Projects",
      value: stats.total,
      subtext: `${stats.active} active`,
      icon: ClipboardList,
      color: "text-primary-600",
      bgColor: "bg-primary-50",
    },
    {
      label: "Active",
      value: stats.active,
      subtext: `${stats.totalApplications} applications`,
      icon: Clock,
      color: "text-success-600",
      bgColor: "bg-success-50",
    },
    {
      label: "In Progress",
      value: stats.inProgress,
      subtext: "Students working",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Completed",
      value: stats.completed,
      subtext: "Successfully finished",
      icon: CheckCircle,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {metrics.map((metric, index) => (
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
  );
};
