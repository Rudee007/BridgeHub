import { useState } from "react";
import { 
  TrendingUp, Users, Building2, FileText, 
  ArrowUpRight, IndianRupee, BarChart3
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from "recharts";
import { UniversityLayout } from "@/components/university/UniversityLayout";

// --- Theme Configuration ---
const PRIMARY_BLUE = "#2563eb"; // Highlight color
const SLATE_DARK = "#1e293b";   // Primary neutral
const SLATE_MUTED = "#94a3b8";  // Secondary neutral
const SLATE_LIGHT = "#cbd5e1";  // Background neutral

// --- Mock Data ---
const trendData = [
  { month: "Jan", placements: 12 }, { month: "Feb", placements: 18 },
  { month: "Mar", placements: 15 }, { month: "Apr", placements: 25 },
  { month: "May", placements: 22 }, { month: "Jun", placements: 30 },
  { month: "Jul", placements: 28 }, { month: "Aug", placements: 15 },
  { month: "Sep", placements: 28 }, { month: "Oct", placements: 45 },
  { month: "Nov", placements: 42 }, { month: "Dec", placements: 38 },
];

const deptData = [
  { name: "CS", value: 194 }, 
  { name: "ECE", value: 130 }, 
  { name: "ME", value: 85 }, 
  { name: "MBA", value: 72 }, 
  { name: "EE", value: 72 }, 
];

const topRecruiters = [
  { name: "Google", count: 24 }, { name: "Stripe", count: 18 },
  { name: "Amazon", count: 15 }, { name: "Razorpay", count: 12 },
  { name: "Zomato", count: 10 }, { name: "Atlassian", count: 8 },
];

const packageDist = [
  { range: "< 10L", count: 45 }, { range: "10-15L", count: 85 },
  { range: "15-20L", count: 110 }, { range: "20-30L", count: 40 },
  { range: "> 30L", count: 15 },
];

const skillsData = [
  { skill: "React", count: 156 }, { skill: "Python", count: 142 },
  { skill: "ML/AI", count: 128 }, { skill: "AWS", count: 98 },
  { skill: "Java", count: 92 }, { skill: "SQL", count: 88 },
  { skill: "Figma", count: 64 }, { skill: "Docker", count: 58 },
];

const tableData = [
  { dept: "Computer Science", students: 240, placed: 194, perc: 80.8, avg: "₹24.5L", top: "Google" },
  { dept: "Electronics", students: 180, placed: 130, perc: 72.2, avg: "₹18.2L", top: "Qualcomm" },
  { dept: "Mechanical", students: 150, placed: 85, perc: 56.7, avg: "₹12.8L", top: "Tata Motors" },
  { dept: "Electrical", students: 120, placed: 72, perc: 60.0, avg: "₹15.4L", top: "Texas Instruments" },
  { dept: "MBA", students: 90, placed: 72, perc: 80.0, avg: "₹22.0L", top: "McKinsey" },
];

// --- Shadcn-Style Clean Tooltip ---
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 px-4 py-3 rounded-xl shadow-lg flex flex-col gap-1.5 min-w-[120px]">
        <span className="text-[13px] font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
        {payload.map((p: any, idx: number) => (
          <div key={idx} className="flex items-center justify-between gap-4">
            <span className="text-[14px] text-gray-700">{p.name === "value" || p.name === "count" ? "Total" : p.name}</span>
            <span className="text-[15px] font-bold text-gray-900">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function Analytics() {
  const [timeFilter, setTimeFilter] = useState("This Year");

  return (
    <UniversityLayout universityName="IIT Bombay">
      <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
        
        {/* 1. Header & Segmented Time Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-primary-600" />
              Analytics
            </h1>
            <p className="text-[15px] font-medium text-gray-500 mt-2">
              Comprehensive placement and engagement insights.
            </p>
          </div>
          
          <div className="flex items-center bg-gray-50/80 p-1.5 rounded-xl border border-gray-200">
            {["This Month", "This Quarter", "This Year", "All Time"].map(tf => (
              <button 
                key={tf} onClick={() => setTimeFilter(tf)}
                className={`px-4 py-2 text-[13px] font-bold transition-all rounded-lg ${
                  timeFilter === tf ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Top KPI Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <div className="bg-white border border-gray-200 rounded-[20px] p-6 shadow-sm flex flex-col gap-4 group">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[28px] font-black text-gray-900 leading-tight">76%</p>
              <p className="text-[13px] font-bold text-gray-500 mt-0.5">Overall Placement Rate</p>
              <p className="text-[12px] font-semibold text-emerald-600 mt-2 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> +3% vs last year
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-[20px] p-6 shadow-sm flex flex-col gap-4 group">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <IndianRupee className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[28px] font-black text-gray-900 leading-tight">₹18.4L</p>
              <p className="text-[13px] font-bold text-gray-500 mt-0.5">Avg Package (LPA)</p>
              <p className="text-[12px] font-semibold text-emerald-600 mt-2 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> +12% vs last year
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-[20px] p-6 shadow-sm flex flex-col gap-4 group">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[28px] font-black text-gray-900 leading-tight">42</p>
              <p className="text-[13px] font-bold text-gray-500 mt-0.5">Active Recruiters</p>
              <p className="text-[12px] font-semibold text-emerald-600 mt-2 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> +5 new this quarter
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-[20px] p-6 shadow-sm flex flex-col gap-4 group">
            <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[28px] font-black text-gray-900 leading-tight">1,840</p>
              <p className="text-[13px] font-bold text-gray-500 mt-0.5">Student Applications</p>
              <p className="text-[12px] font-semibold text-emerald-600 mt-2 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" /> +22% vs last year
              </p>
            </div>
          </div>
        </div>

        {/* 3. Charts Row 1: Trends & Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Placement Trends (Smooth Area Chart) */}
          <div className="bg-white border border-gray-200 rounded-[24px] p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-[16px] font-bold text-gray-900">Placement Trends</h3>
              <p className="text-[13px] text-gray-500 font-medium">Monthly hiring volume over the year</p>
            </div>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPlacements" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={PRIMARY_BLUE} stopOpacity={0.25}/>
                      <stop offset="95%" stopColor={PRIMARY_BLUE} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }} dy={15} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  <Area type="monotone" dataKey="placements" stroke={PRIMARY_BLUE} strokeWidth={3.5} fillOpacity={1} fill="url(#colorPlacements)" activeDot={{ r: 6, fill: PRIMARY_BLUE, stroke: "#fff", strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Package Distribution (Histogram style - tightly packed) */}
          <div className="bg-white border border-gray-200 rounded-[24px] p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-[16px] font-bold text-gray-900">Package Distribution</h3>
              <p className="text-[13px] text-gray-500 font-medium">Number of students by CTC range</p>
            </div>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                {/* barCategoryGap="10%" makes the bars close and thick like Shadcn */}
                <BarChart data={packageDist} barCategoryGap="10%" margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} dy={15} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="count" fill={SLATE_DARK} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* 4. Charts Row 2: Recruiters & Departments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Top Recruiters (Highlighting #1 with Primary Blue) */}
          <div className="bg-white border border-gray-200 rounded-[24px] p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-[16px] font-bold text-gray-900">Top Recruiters</h3>
              <p className="text-[13px] text-gray-500 font-medium">Companies hiring the most students</p>
            </div>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topRecruiters} barCategoryGap="15%" margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} dy={15} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {topRecruiters.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? PRIMARY_BLUE : SLATE_MUTED} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department-wise Placements (Horizontal Bars) */}
          <div className="bg-white border border-gray-200 rounded-[24px] p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-[16px] font-bold text-gray-900">Department-wise Hires</h3>
              <p className="text-[13px] text-gray-500 font-medium">Total placements by branch</p>
            </div>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptData} layout="vertical" barCategoryGap="20%" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="4 4" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#1e293b', fontWeight: 700 }} width={50} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {deptData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? PRIMARY_BLUE : SLATE_DARK} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 5. Department Performance Table */}
        <div className="bg-white border border-gray-200 rounded-[24px] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
             <div>
               <h3 className="text-[16px] font-bold text-gray-900">Academic Performance Ledger</h3>
               <p className="text-[13px] text-gray-500 font-medium mt-0.5">Detailed breakdown of hiring metrics across all departments.</p>
             </div>
             <button className="text-[13px] font-bold text-primary-600 hover:text-primary-700 bg-primary-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 w-fit">
               Export CSV <ArrowUpRight className="w-3.5 h-3.5" />
             </button>
          </div>
          <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-[800px]">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-200">
                  <th className="text-[12px] text-gray-500 uppercase tracking-wider font-bold px-6 py-4">Department</th>
                  <th className="text-[12px] text-gray-500 uppercase tracking-wider font-bold px-6 py-4">Students</th>
                  <th className="text-[12px] text-gray-500 uppercase tracking-wider font-bold px-6 py-4">Placed</th>
                  <th className="text-[12px] text-gray-500 uppercase tracking-wider font-bold px-6 py-4">Placement %</th>
                  <th className="text-[12px] text-gray-500 uppercase tracking-wider font-bold px-6 py-4">Avg Package</th>
                  <th className="text-[12px] text-gray-500 uppercase tracking-wider font-bold px-6 py-4">Top Recruiter</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-[14px] font-bold text-gray-900">{row.dept}</td>
                    <td className="px-6 py-4 text-[14px] font-medium text-gray-600">{row.students}</td>
                    <td className="px-6 py-4 text-[14px] font-medium text-gray-600">{row.placed}</td>
                    <td className="px-6 py-4 text-[14px] font-bold">
                      <span className={row.perc >= 75 ? "text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md" : row.perc >= 60 ? "text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md" : "text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md"}>
                        {row.perc}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[14px] font-bold text-gray-900">{row.avg}</td>
                    <td className="px-6 py-4 text-[14px] font-semibold text-gray-600">{row.top}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Most In-Demand Skills (Wide Bottom Chart) */}
        <div className="bg-white border border-gray-200 rounded-[24px] p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-[16px] font-bold text-gray-900">Most In-Demand Skills</h3>
            <p className="text-[13px] text-gray-500 font-medium">Technologies requested most by hiring partners</p>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {/* Tight spacing for the long list of skills */}
              <BarChart data={skillsData} layout="vertical" barCategoryGap="15%" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="4 4" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }} />
                <YAxis dataKey="skill" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#1e293b', fontWeight: 700 }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                  {skillsData.map((entry, index) => (
                    // Highlight the Top 3 skills, mute the rest
                    <Cell key={`cell-${index}`} fill={index < 3 ? PRIMARY_BLUE : SLATE_LIGHT} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </UniversityLayout>
  );
}