// components/charts/ApplicationFunnelChart.tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users } from "lucide-react";
import type { ApplicationFunnelData } from "@/types/dashboard.types";

interface ApplicationFunnelChartProps {
  data: ApplicationFunnelData[];
}

export const ApplicationFunnelChart: React.FC<ApplicationFunnelChartProps> = ({ data }) => {
  const overallConversion = ((data[data.length - 1].value / data[0].value) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-green-50 rounded-lg">
            <Users className="h-3.5 w-3.5 text-success-600" />
          </div>
          <h3 className="text-sm font-bold text-gray-900">Application Funnel</h3>
        </div>
      </div>

      {/* Horizontal Bar Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} />
            <YAxis
              dataKey="label"
              type="category"
              tick={{ fontSize: 11, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
              width={70}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg">
                      <p className="text-xs font-semibold">{payload[0].payload.label}</p>
                      <p className="text-xs">
                        Count: <span className="font-bold">{payload[0].value}</span>
                      </p>
                      <p className="text-xs">
                        Rate: <span className="font-bold">{payload[0].payload.percentage}%</span>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="value" radius={[0, 8, 8, 0]}>
              {data.map((entry, index) => (
                <rect key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-gray-100 bg-gray-50 rounded-lg p-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-700">Overall Conversion</span>
          <span className="text-sm font-bold text-success-600">{overallConversion}%</span>
        </div>
      </div>
    </div>
  );
};
