import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 273, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

export function HiringRadarChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900">Hiring Velocity</h3>
        <p className="text-sm text-gray-500">Candidate throughput over the last 6 months</p>
      </div>

      <div className="flex-1 min-h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            {/* Custom Tooltip */}
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-gray-900 text-white text-xs rounded-lg py-1 px-3 shadow-xl">
                      <span className="font-bold">{payload[0].payload.month}</span>: {payload[0].value}
                    </div>
                  );
                }
                return null;
              }}
            />
            
            {/* Grid and Axis - Minimalist Style */}
            <PolarGrid stroke="#e5e7eb" strokeDasharray="3 3" />
            <PolarAngleAxis 
              dataKey="month" 
              tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 500 }} 
            />
            
            {/* The Radar Shape */}
            <Radar
              name="Desktop"
              dataKey="desktop"
              stroke="#3b82f6" // Primary Blue
              strokeWidth={3}
              fill="#3b82f6"
              fillOpacity={0.2}
              dot={{
                r: 4,
                fill: "#3b82f6",
                fillOpacity: 1,
                strokeWidth: 0,
              }}
            />
            
            {/* Optional Second Layer for comparison */}
            <Radar
              name="Mobile"
              dataKey="mobile"
              stroke="#10b981" // Success Green
              strokeWidth={2}
              fill="#10b981"
              fillOpacity={0.1}
              dot={false}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-600">
        <div className="flex items-center gap-1 font-semibold text-emerald-600">
          <TrendingUp className="h-4 w-4" /> 5.2%
        </div>
        <span className="text-gray-500">increase this month</span>
      </div>
    </div>
  );
}