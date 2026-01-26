// components/charts/UniversityPartnersChart.tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { GraduationCap, ArrowUp } from "lucide-react";
import type { UniversityPartnerData } from "@/types/dashboard.types";

interface UniversityPartnersChartProps {
  data: UniversityPartnerData[];
  stats: {
    total: number;
    thisMonth: number;
    pending: number;
    growthRate: number;
  };
}

export const UniversityPartnersChart: React.FC<UniversityPartnersChartProps> = ({ data, stats }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-purple-50 rounded-lg">
            <GraduationCap className="h-3.5 w-3.5 text-secondary-600" />
          </div>
          <h3 className="text-sm font-bold text-gray-900">University Partners</h3>
        </div>
        <span className="text-xs font-bold text-success-600 flex items-center gap-0.5 bg-success-50 px-2 py-1 rounded-md">
          <ArrowUp className="h-3 w-3" />
          {stats.growthRate}%
        </span>
      </div>

      {/* Line Chart */}
      <div className="h-40 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#6b7280" }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={false}
            />
            <YAxis tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg">
                      <p className="text-xs font-semibold mb-1">{payload[0].payload.month}</p>
                      <p className="text-xs text-purple-400">
                        Partners: <span className="font-bold">{payload[0].payload.partners}</span>
                      </p>
                      <p className="text-xs text-gray-400">
                        Target: <span className="font-bold">{payload[0].payload.target}</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#d1d5db"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Target"
            />
            <Line
              type="monotone"
              dataKey="partners"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: "#8b5cf6", r: 4 }}
              activeDot={{ r: 6, fill: "#8b5cf6" }}
              name="Partners"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats Grid */}
      <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-3 gap-3">
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-xs text-gray-600 font-semibold mt-1">Total Partners</p>
        </div>
        <div className="text-center p-2 bg-green-50 rounded-lg">
          <p className="text-2xl font-bold text-success-600">{stats.thisMonth}</p>
          <p className="text-xs text-gray-600 font-semibold mt-1">This Month</p>
        </div>
        <div className="text-center p-2 bg-amber-50 rounded-lg">
          <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
          <p className="text-xs text-gray-600 font-semibold mt-1">Pending</p>
        </div>
      </div>
    </div>
  );
};
