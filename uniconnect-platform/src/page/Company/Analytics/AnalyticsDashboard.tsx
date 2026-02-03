import React, { useState } from "react";
import { 
  Users, Clock, Trophy, TrendingUp, TrendingDown, 
  Download, Filter, Briefcase 
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from "recharts";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { UniversityPartnersChart } from "@/components/charts/UniversityPartnersChart"; // Keep existing imports if you have them
import { 
  ANALYTICS_SUMMARY, 
  UNIVERSITY_PERFORMANCE, 
  SKILL_DEMAND, 
  PARTNER_CHART_DATA 
} from "@/data/analyticsData";

// --- MOCK DATA FOR NEW CHARTS ---

const APPLICATIONS_TIME_DATA = [
  { day: 'Mon', applications: 12, hires: 2 },
  { day: 'Tue', applications: 18, hires: 4 },
  { day: 'Wed', applications: 25, hires: 3 },
  { day: 'Thu', applications: 20, hires: 5 },
  { day: 'Fri', applications: 32, hires: 8 },
  { day: 'Sat', applications: 24, hires: 4 },
  { day: 'Sun', applications: 28, hires: 6 },
  { day: 'Mon', applications: 35, hires: 7 }, // Trend upwards
];

// Replaced the "rainbow" colors with a Professional Corporate Palette
const APPLICATIONS_BY_JOB_DATA = [
  { name: 'Frontend Dev', value: 35, color: '#0F172A' }, // Dark Navy (Dominant)
  { name: 'Backend Intern', value: 45, color: '#3B82F6' }, // Primary Brand Blue
  { name: 'Product Design', value: 20, color: '#93C5FD' }, // Soft Blue (Supportive)
  { name: 'Data Scientist', value: 15, color: '#CBD5E1' }, // Cool Grey (Neutral)
  { name: 'DevOps', value: 10, color: '#F59E0B' }, // Amber (Accent/Highlight)
];

export const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  return (
    <div className="min-h-screen bg-gray-50/50">
      
        <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8">
          
          {/* --- Header --- */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-display">Analytics Overview</h1>
              <p className="text-gray-500 mt-1 text-sm">Track your hiring performance and university insights.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex p-1 bg-white border border-gray-200 rounded-lg shadow-sm">
                {(['7d', '30d', '90d'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                      timeRange === range 
                        ? 'bg-gray-900 text-white shadow-sm' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 shadow-sm transition-colors active:scale-95">
                <Download className="w-4 h-4" /> Export Report
              </button>
            </div>
          </div>

          {/* --- KPI Cards --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard 
              label="Total Applications" 
              value={ANALYTICS_SUMMARY.totalApplications} 
              trend={ANALYTICS_SUMMARY.trends.applications} 
              icon={<Users className="w-5 h-5 text-blue-600" />}
              color="blue"
            />
            <KPICard 
              label="Avg. Time to Hire" 
              value={`${ANALYTICS_SUMMARY.avgTimeToHire} days`} 
              trend={ANALYTICS_SUMMARY.trends.timeToHire} 
              inverseTrend 
              icon={<Clock className="w-5 h-5 text-purple-600" />}
              color="purple"
            />
            <KPICard 
              label="Hire Rate" 
              value={`${ANALYTICS_SUMMARY.hireRate}%`} 
              trend={ANALYTICS_SUMMARY.trends.hireRate} 
              icon={<Trophy className="w-5 h-5 text-emerald-600" />}
              color="emerald"
            />
            <KPICard 
              label="Active Pipelines" 
              value={ANALYTICS_SUMMARY.activePipelines} 
              trend={ANALYTICS_SUMMARY.trends.pipelines} 
              icon={<TrendingUp className="w-5 h-5 text-orange-600" />}
              color="orange"
            />
          </div>

          {/* --- ROW 1: New Charts --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left: Applications Over Time (Gradient Area Chart) */}
            <div className="lg:col-span-2">
               <ApplicationsOverTimeChart data={APPLICATIONS_TIME_DATA} />
            </div>

            {/* Right: Applications by Job (Donut) */}
            <div className="lg:col-span-1">
               <ApplicationsByJobChart data={APPLICATIONS_BY_JOB_DATA} />
            </div>
          </div>

          {/* --- ROW 2: Tables & Secondary Charts --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* University Performance Table */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900">University Performance</h3>
                <button className="text-sm text-primary-600 font-medium hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 uppercase font-semibold text-xs">
                    <tr>
                      <th className="px-6 py-3">University</th>
                      <th className="px-6 py-3">Applications</th>
                      <th className="px-6 py-3">Hired</th>
                      <th className="px-6 py-3">Success Rate</th>
                      <th className="px-6 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {UNIVERSITY_PERFORMANCE.map((uni) => (
                      <tr key={uni.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{uni.name}</td>
                        <td className="px-6 py-4 text-gray-600">{uni.applications}</td>
                        <td className="px-6 py-4 text-gray-600">{uni.hired}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-emerald-500 rounded-full" 
                                style={{ width: `${uni.successRate * 5}%` }} 
                              />
                            </div>
                            <span className="text-xs font-bold text-gray-700">{uni.successRate}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                           <span className="px-2 py-1 bg-green-50 text-green-700 border border-green-100 rounded text-xs font-bold">
                             Active
                           </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column Stack */}
            <div className="space-y-6">
              {/* Partner Growth Chart */}
              <UniversityPartnersChart 
                data={PARTNER_CHART_DATA} 
                stats={{ total: 18, thisMonth: 3, pending: 5, growthRate: 15 }} 
              />

              {/* Skills in Demand */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Top Skills Demand</h3>
                <div className="flex flex-wrap gap-2">
                  {SKILL_DEMAND.map((skill) => (
                    <div 
                      key={skill.name} 
                      className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-2 group hover:border-primary-200 hover:bg-primary-50 transition-colors cursor-default"
                    >
                      <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">{skill.name}</span>
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 rounded flex items-center">
                        <TrendingUp className="w-3 h-3 mr-0.5" />{skill.growth}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
    </div>
  );
};

// --- COMPONENT: KPI Card ---
const KPICard = ({ 
  label, value, trend, icon, color, inverseTrend 
}: { 
  label: string, value: string | number, trend: number, icon: React.ReactNode, color: string, inverseTrend?: boolean 
}) => {
  const isPositive = inverseTrend ? trend < 0 : trend > 0;
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-50 border-blue-100",
    purple: "bg-purple-50 border-purple-100",
    emerald: "bg-emerald-50 border-emerald-100",
    orange: "bg-orange-50 border-orange-100",
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg border ${colorClasses[color]}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
          isPositive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
        }`}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(trend)}%
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">{label}</p>
      </div>
    </div>
  );
};

// --- COMPONENT: Applications Over Time (Gradient Area) ---
const ApplicationsOverTimeChart = ({ data }: { data: any[] }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Applications Over Time</h3>
        <select className="bg-gray-50 border-none text-xs font-semibold text-gray-500 py-1 px-3 rounded-lg outline-none hover:text-gray-700 cursor-pointer">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
        </select>
      </div>
      
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
            <RechartsTooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              itemStyle={{ fontSize: '12px', fontWeight: '600' }}
            />
            <Area type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" name="Applications" />
            <Area type="monotone" dataKey="hires" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorHires)" name="Hires" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// --- COMPONENT: Applications By Job (Donut Chart) ---
// --- UPDATED COMPONENT: Applications By Job (Donut Chart) ---
// --- UPDATED COMPONENT: Applications By Job (Donut Chart) ---
// components/charts/ApplicationsByJobChart.tsx

const ApplicationsByJobChart = ({ data }: { data: any[] }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="p-6 pb-2">
        <h3 className="text-lg font-bold text-gray-900 leading-none">Applications by Job</h3>
        <p className="text-sm text-gray-500 mt-1">Distribution across top roles</p>
      </div>

      {/* Chart Body */}
      <div className="flex-1 min-h-[200px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={85}
              paddingAngle={3} // Increased gap for a cleaner "cut" look
              dataKey="value"
              stroke="#fff"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <RechartsTooltip 
               contentStyle={{ 
                 borderRadius: '12px', 
                 border: 'none', 
                 boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                 padding: '8px 12px'
               }}
               itemStyle={{ color: '#111827', fontWeight: 600, fontSize: '12px' }}
               // ✅ FIX: TypeScript error resolved by allowing any type for formatting
               formatter={(value: any) => [`${value}%`, 'Applications']}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text (Optional: remove if you want it completely clean) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
           <span className="text-3xl font-bold text-gray-900">125</span>
           <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total</span>
        </div>
      </div>

      {/* Footer with Trending Stat */}
      <div className="p-6 pt-0">
        <div className="flex items-center gap-2 font-medium leading-none text-emerald-600 mb-4">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        
        {/* Legend - Updated Layout */}
        <div className="grid grid-cols-2 gap-3">
           {data.map((item, i) => (
             <div key={i} className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full ring-1 ring-white shadow-sm" style={{ backgroundColor: item.color }} />
               <div className="flex flex-col">
                 <span className="text-xs text-gray-600 font-medium leading-none">{item.name}</span>
                 <span className="text-[10px] text-gray-400 font-bold">{item.value}%</span>
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};