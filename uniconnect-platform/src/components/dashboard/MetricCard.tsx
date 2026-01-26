// components/dashboard/MetricCard.tsx
import { motion } from "framer-motion";
import { ClipboardList, Users, GraduationCap, Briefcase, ArrowUp, ArrowDown } from "lucide-react";
import type { MetricData } from "@/types/dashboard.types";

interface MetricCardProps {
  metric: MetricData;
  index: number;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric, index }) => {
  const getIconAndColor = () => {
    switch (metric.type) {
      case "projects":
        return {
          icon: ClipboardList,
          bgColor: "bg-primary-500",
          lightBg: "bg-primary-50",
          textColor: "text-primary-600",
        };
      case "applications":
        return {
          icon: Users,
          bgColor: "bg-success-500",
          lightBg: "bg-success-50",
          textColor: "text-success-600",
        };
      case "partners":
        return {
          icon: GraduationCap,
          bgColor: "bg-secondary-500",
          lightBg: "bg-secondary-50",
          textColor: "text-secondary-600",
        };
      case "jobs":
        return {
          icon: Briefcase,
          bgColor: "bg-accent-500",
          lightBg: "bg-accent-50",
          textColor: "text-accent-600",
        };
    }
  };

  const { icon: Icon, bgColor, lightBg, textColor } = getIconAndColor();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all relative overflow-hidden group"
    >
      <div className={`absolute top-0 left-0 right-0 h-1 ${bgColor}`} />

      <div className="flex items-start justify-between mb-5">
        <div className={`w-11 h-11 ${lightBg} rounded-xl flex items-center justify-center`}>
          <Icon className={`h-5 w-5 ${textColor}`} />
        </div>

        <div className="h-10 w-20 flex items-end gap-0.5">
          {[30, 45, 35, 55, 40, 60, 50].map((height, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: index * 0.05 + i * 0.02, duration: 0.3 }}
              className={`flex-1 ${bgColor} opacity-20 rounded-t-sm`}
            />
          ))}
        </div>
      </div>

      <p className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">{metric.value}</p>
      <p className="text-sm text-gray-600 mb-4 font-semibold">{metric.label}</p>

      <div className="flex items-center gap-1.5">
        {metric.trendUp ? (
          <ArrowUp className="h-4 w-4 text-success-600" />
        ) : (
          <ArrowDown className="h-4 w-4 text-rose-600" />
        )}
        <span className={`text-xs font-bold ${metric.trendUp ? "text-success-600" : "text-rose-600"}`}>
          {Math.abs(metric.trend)}%
        </span>
        <span className="text-xs text-gray-500 font-medium">{metric.trendLabel}</span>
      </div>
    </motion.div>
  );
};
