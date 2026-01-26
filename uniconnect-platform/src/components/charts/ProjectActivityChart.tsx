// components/charts/ProjectActivityChart.tsx
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart3 } from "lucide-react";
import type { ProjectActivityData } from "@/types/dashboard.types";

interface ProjectActivityChartProps {
  data: ProjectActivityData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg border border-gray-700">
        <p className="text-xs font-semibold mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: <span className="font-bold">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const ProjectActivityChart: React.FC<ProjectActivityChartProps> = ({ data }) => {
  const totalProjects = data.reduce((sum, d) => sum + d.projects, 0);
  const totalApplications = data.reduce((sum, d) => sum + d.applications, 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-50 rounded-lg">
            <BarChart3 className="h-3.5 w-3.5 text-primary-600" />
          </div>
          <h3 className="text-sm font-bold text-gray-900">Project Activity</h3>
        </div>
        <span className="text-xs text-gray-500 font-semibold">Last 7 days</span>
      </div>

      {/* Area Chart */}
      <div className="h-48 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "#6b7280" }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={false}
            />
            <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="applications"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#colorApplications)"
              name="Applications"
            />
            <Area
              type="monotone"
              dataKey="projects"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#colorProjects)"
              name="Projects"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary-500" />
          <span className="text-gray-700 font-semibold">Projects</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success-500" />
          <span className="text-gray-700 font-semibold">Applications</span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900">{totalProjects}</p>
          <p className="text-xs text-gray-600 font-medium">Total Projects</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-gray-900">{totalApplications}</p>
          <p className="text-xs text-gray-600 font-medium">Total Apps</p>
        </div>
      </div>
    </div>
  );
};
