// components/dashboard/ActivityItem.tsx
import { motion } from "framer-motion";
import { UserPlus, FileText, MessageSquare, GraduationCap } from "lucide-react";
import type { Activity } from "@/types/dashboard.types";
import { formatRelativeTime } from "@/data/dashboardData";

interface ActivityItemProps {
  activity: Activity;
  index: number;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ activity, index }) => {
  const getIcon = () => {
    switch (activity.type) {
      case "application":
        return { icon: UserPlus, color: "bg-blue-50 text-primary-600" };
      case "project":
        return { icon: FileText, color: "bg-purple-50 text-secondary-600" };
      case "message":
        return { icon: MessageSquare, color: "bg-green-50 text-success-600" };
      case "partnership":
        return { icon: GraduationCap, color: "bg-cyan-50 text-accent-600" };
    }
  };

  const { icon: IconComponent, color } = getIcon();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-start gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-200 group"
    >
      <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
        <IconComponent className="h-4 w-4" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-bold text-gray-900">{activity.title}</p>
          {activity.isNew && (
            <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-bold rounded-md">NEW</span>
          )}
        </div>
        <p className="text-sm text-gray-600 font-medium mb-1">{activity.description}</p>
        <p className="text-xs text-gray-500 font-semibold">{formatRelativeTime(activity.timestamp)}</p>
      </div>
    </motion.div>
  );
};
