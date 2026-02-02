import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart3 } from "lucide-react";
import type { ProjectActivityData } from "@/types/dashboard.types";

interface ProjectActivityChartProps {
  data: ProjectActivityData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 p-3 rounded-xl shadow-xl">
        <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-semibold text-gray-700">
              {entry.name}:
            </span>
            <span className="text-sm font-bold text-gray-900">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const ProjectActivityChart: React.FC<ProjectActivityChartProps> = ({ data }) => {
  // Calculate totals for the footer
  const totalProjects = data.reduce((sum, d) => sum + d.projects, 0);
  const totalApplications = data.reduce((sum, d) => sum + d.applications, 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 rounded-lg">
            <BarChart3 className="h-4 w-4 text-primary-600" />
          </div>
          <h3 className="text-base font-bold text-gray-900">Project Activity</h3>
        </div>
        <select className="bg-gray-50 border-none text-xs font-semibold text-gray-500 py-1 px-3 rounded-lg outline-none cursor-pointer hover:text-gray-700">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
        </select>
      </div>

      {/* The Gradient Area Chart */}
      <div className="flex-1 min-h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {/* Green Gradient for Applications */}
              <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              
              {/* Blue Gradient for Projects */}
              <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#9ca3af' }}
            />
            
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }} />
            
            {/* The "Green" Area (Applications) - Placed behind if you want layering, or keep opacity low */}
            <Area 
              type="monotone" 
              dataKey="applications" 
              stroke="#10b981" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorApps)" 
              name="Applications"
            />
            
            {/* The "Blue" Area (Projects) */}
            <Area 
              type="monotone" 
              dataKey="projects" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorProjects)" 
              name="Projects"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer / Legend */}
      <div className="mt-6 pt-4 border-t border-gray-50 grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Projects</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalProjects}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Applications</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalApplications}</p>
        </div>
      </div>
    </div>
  );
};