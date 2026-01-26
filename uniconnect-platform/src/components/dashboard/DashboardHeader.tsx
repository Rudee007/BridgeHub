// components/dashboard/DashboardHeader.tsx
import { Sparkles, Calendar } from "lucide-react";
import { getGreeting } from "@/data/dashboardData";

interface DashboardHeaderProps {
  companyName: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ companyName }) => {
  const greeting = getGreeting();
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Sparkles className="h-4 w-4" />
          <span className="font-medium">{greeting}</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">Welcome back, {companyName}</h1>
        <p className="text-gray-600 text-sm font-medium">Here's your hiring and project overview for today</p>
      </div>

      <div className="bg-white px-4 py-3 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 text-gray-500 mb-1">
          <Calendar className="h-3.5 w-3.5" />
          <p className="text-xs font-semibold uppercase tracking-wide">Today</p>
        </div>
        <p className="text-sm font-bold text-gray-900">{formattedDate}</p>
      </div>
    </div>
  );
};
