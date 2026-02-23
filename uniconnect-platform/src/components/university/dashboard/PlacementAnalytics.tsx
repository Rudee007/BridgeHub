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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 p-3 rounded-xl shadow-lg">
        <p className="text-[13px] font-bold text-gray-900 mb-1">{label} Department</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <p className="text-[13px] font-bold text-blue-600">
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
    // Set to h-full so it matches the Activity Feed exactly
    <div className="bg-white rounded-[20px] border border-gray-200 shadow-sm h-full flex flex-col p-6 w-full min-h-[480px]">
      
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-8">
        <TrendingUp className="w-[18px] h-[18px] text-blue-500" />
        <h2 className="text-[17px] font-bold text-gray-900">Placement Analytics</h2>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        {/* Bar Chart Container */}
        <div className="flex-1 w-full min-h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={placementData} margin={{ top: 0, right: 0, bottom: 0, left: -25 }}>
              <XAxis 
                dataKey="dept" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }} 
                dy={12}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }} 
              />
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ fill: '#f3f4f6', opacity: 0.5, rx: 4 }} 
              />
              <Bar
                dataKey="placements"
                fill="#3b82f6" // Exact bright blue from screenshot
                radius={[4, 4, 0, 0]}
                maxBarSize={36}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          
          {/* Summary Stats Grid */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
              <p className="text-[24px] font-bold text-gray-900 tracking-tight">94</p>
              <p className="text-[12px] font-medium text-gray-500 mt-0.5">Total Placed</p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center">
              <p className="text-[24px] font-bold text-gray-900 tracking-tight">₹8.4L</p>
              <p className="text-[12px] font-medium text-gray-500 mt-0.5">Avg Package</p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center flex flex-col justify-center">
              <p className="text-[15px] font-bold text-gray-900 truncate px-1 mt-1.5">TechCorp</p>
              <p className="text-[12px] font-medium text-gray-500 mt-1">Top Recruiter</p>
            </motion.div>
          </div>

          {/* Placement Rate Indicator */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2.5">
              <span className="text-gray-500 font-medium flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-500" />
                Placement rate
              </span>
              <span className="font-bold text-gray-900 text-[13px]">76%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "76%" }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                // Matches the blue-to-green gradient perfectly
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full relative"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}