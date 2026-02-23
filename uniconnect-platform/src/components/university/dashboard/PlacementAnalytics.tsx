import { motion } from "framer-motion";
import { TrendingUp, Award } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const placementData = [
  { dept: "CS", placements: 34 },
  { dept: "ECE", placements: 22 },
  { dept: "MBA", placements: 18 },
  { dept: "Mech", placements: 12 },
  { dept: "Civil", placements: 8 },
];

// Custom Tooltip to replace shadcn's ChartTooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-gray-100 p-3 rounded-xl shadow-lg">
        <p className="text-sm font-bold text-gray-900 mb-1">{label} Department</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary-500" />
          <p className="text-sm font-semibold text-primary-600">
            {payload[0].value} <span className="text-gray-500 font-medium">Placements</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export function PlacementAnalytics() {
  return (
    <div className="bg-card rounded-2xl border border-gray-100 p-6 shadow-card h-full flex flex-col">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-primary-500" />
        <h2 className="text-lg font-bold text-gray-900">Placement Analytics</h2>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        {/* Bar Chart */}
        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={placementData} margin={{ top: 10, right: 0, bottom: 0, left: -25 }}>
              <XAxis 
                dataKey="dept" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 500 }} 
              />
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ fill: '#f3f4f6', opacity: 0.4 }} // Very subtle hover effect behind bars
              />
              <Bar
                dataKey="placements"
                fill="#3b82f6" // Maps to your primary-500
                radius={[6, 6, 0, 0]}
                maxBarSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          {/* Summary Stats Grid */}
          <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <p className="text-2xl font-bold text-gray-900 tracking-tight">94</p>
              <p className="text-xs font-medium text-gray-500 mt-1">Total Placed</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <p className="text-2xl font-bold text-gray-900 tracking-tight">₹8.4L</p>
              <p className="text-xs font-medium text-gray-500 mt-1">Avg Package</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center flex flex-col justify-center"
            >
              <p className="text-sm font-bold text-gray-900 truncate px-1">TechCorp</p>
              <p className="text-xs font-medium text-gray-500 mt-1">Top Recruiter</p>
            </motion.div>
          </div>

          {/* Placement Rate Indicator */}
          <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="flex items-center justify-between text-xs mb-2.5">
              <span className="text-gray-600 font-semibold flex items-center gap-1.5">
                <Award className="w-4 h-4 text-success-500" />
                Placement Rate
              </span>
              <span className="font-bold text-success-600 text-sm">76%</span>
            </div>
            <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "76%" }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary-500 to-success-500 rounded-full relative"
              >
                {/* Optional shimmer across the progress bar */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
              </motion.div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}