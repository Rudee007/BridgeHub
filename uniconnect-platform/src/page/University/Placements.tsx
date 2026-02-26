import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Download, ExternalLink, CheckCircle2, 
  Building2, LayoutGrid, List, Award, TrendingUp, 
  Briefcase, ArrowRight, Zap, Target
} from "lucide-react";
import { UniversityLayout } from "@/components/university/UniversityLayout";

// --- Mock Data (Platform-Specific Placements) ---
const initialPlacements = [
  { id: 1, student: { name: "Aarav Sharma", initials: "AS", department: "Computer Science", rollNo: "21CS1045" }, company: "Stripe India", role: "Backend Engineer", packageAmount: "₹24 LPA", offerType: "PPO", sourceProject: "Payment Gateway SDK Integration", date: "Oct 12, 2025" },
  { id: 2, student: { name: "Priya Patel", initials: "PP", department: "Electronics", rollNo: "21EC2034" }, company: "Freshworks", role: "AI NLP Developer", packageAmount: "₹15 LPA", offerType: "Full-Time", sourceProject: "AI Chatbot for Customer Support", date: "Nov 04, 2025" },
  { id: 3, student: { name: "Rohan Mehta", initials: "RM", department: "Computer Science", rollNo: "22CS1012" }, company: "Razorpay", role: "Data Science Intern", packageAmount: "₹45k/month", offerType: "Internship", sourceProject: "Fraud Detection ML Pipeline", date: "Dec 01, 2025" },
  { id: 4, student: { name: "Neha Reddy", initials: "NR", department: "Electrical", rollNo: "21EE4056" }, company: "Zomato", role: "Frontend Engineer", packageAmount: "₹18 LPA", offerType: "Direct Hire", sourceProject: "Delivery Route Optimization", date: "Dec 15, 2025" },
];

export function Placements() {
  const [searchQuery, setSearchQuery] = useState("");
  const [offerFilter, setOfferFilter] = useState("All Offers");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  // Advanced Filtering Logic
  const filteredPlacements = useMemo(() => {
    return initialPlacements.filter(p => {
      const matchesSearch = p.student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesOffer = offerFilter === "All Offers" || p.offerType === offerFilter;
      const matchesDept = deptFilter === "All Departments" || p.student.department === deptFilter;
      
      return matchesSearch && matchesOffer && matchesDept;
    });
  }, [searchQuery, offerFilter, deptFilter]);

  return (
    <UniversityLayout universityName="IIT Bombay">
      <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
        
        {/* 1. Header & Primary Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 tracking-tight flex items-center gap-3">
              <Award className="w-7 h-7 text-primary-600" />
              Platform Placements
            </h1>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Track successful hires and PPOs generated directly through your portal projects.
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl shadow-sm transition-all whitespace-nowrap">
            <Download className="w-4 h-4" />
            Export Success Report
          </button>
        </div>

        {/* 2. Platform KPI Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[22px] font-bold text-gray-900 leading-tight">42</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Total Platform Hires</p>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[22px] font-bold text-gray-900 leading-tight">₹24 LPA</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Highest Package</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[22px] font-bold text-gray-900 leading-tight">68%</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Project-to-Hire Rate</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[22px] font-bold text-gray-900 leading-tight">18</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Active PPOs</p>
            </div>
          </div>
        </div>

        {/* 3. Advanced Filters Bar */}
        <div className="bg-white p-4 rounded-[16px] border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by student, company, or role..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
            />
          </div>
          <div className="flex gap-3">
            <select 
              value={offerFilter}
              onChange={(e) => setOfferFilter(e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 cursor-pointer min-w-[140px]"
            >
              <option>All Offers</option>
              <option>PPO</option>
              <option>Full-Time</option>
              <option>Direct Hire</option>
              <option>Internship</option>
            </select>
            <select 
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 cursor-pointer min-w-[160px]"
            >
              <option>All Departments</option>
              <option>Computer Science</option>
              <option>Electronics</option>
              <option>Electrical</option>
            </select>
          </div>
        </div>

        {/* 4. White View Toggle Bar */}
        <div className="bg-white px-5 py-3 rounded-[16px] border border-gray-200 shadow-sm flex items-center justify-between">
          <span className="text-[14px] text-gray-600">
            Showing <span className="font-bold text-gray-900">{filteredPlacements.length}</span> platform hires
          </span>
          <div className="flex items-center bg-gray-50 p-1 rounded-lg border border-gray-100">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-primary-600" : "text-gray-400 hover:text-gray-900"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-all ${viewMode === "list" ? "bg-white shadow-sm text-primary-600" : "text-gray-400 hover:text-gray-900"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5. Content Area */}
        <AnimatePresence mode="wait">
          {filteredPlacements.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[20px] border border-gray-200 shadow-sm">
              <Award className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-lg font-bold text-gray-900">No placements found</p>
              <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters.</p>
            </motion.div>
          ) : viewMode === "list" ? (
            
            /* --- LIST VIEW (Table) --- */
            <motion.div key="list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="bg-white rounded-[20px] border border-gray-200 shadow-sm overflow-hidden">
              <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full pb-2">
                <table className="w-full text-left border-collapse whitespace-nowrap min-w-[1000px]">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="text-[13px] text-gray-500 font-medium px-6 py-4">Student Info</th>
                      <th className="text-[13px] text-gray-500 font-medium px-4 py-4">Company & Role</th>
                      <th className="text-[13px] text-gray-500 font-medium px-4 py-4">Package</th>
                      <th className="text-[13px] text-gray-500 font-medium px-4 py-4">Source Project</th>
                      <th className="text-[13px] text-gray-500 font-medium px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPlacements.map((placement) => (
                      <tr key={placement.id} className="border-b border-gray-100/70 hover:bg-gray-50/50 transition-colors group">
                        {/* Student */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center font-bold text-sm shrink-0 border border-primary-100/50">{placement.student.initials}</div>
                            <div>
                              <p className="text-[14px] font-bold text-gray-900">{placement.student.name}</p>
                              <p className="text-[12px] font-medium text-gray-500 mt-0.5">{placement.student.rollNo} · {placement.student.department}</p>
                            </div>
                          </div>
                        </td>
                        {/* Company & Role */}
                        <td className="px-4 py-4">
                          <p className="text-[14px] font-bold text-gray-900 flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-gray-400"/> {placement.company}</p>
                          <p className="text-[12px] font-medium text-gray-600 mt-0.5">{placement.role}</p>
                        </td>
                        {/* Package & Offer Type */}
                        <td className="px-4 py-4">
                          <p className="text-[14px] font-bold text-emerald-600">{placement.packageAmount}</p>
                          <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded-md border ${
                            placement.offerType === "PPO" ? "bg-purple-50 text-purple-600 border-purple-100" :
                            placement.offerType === "Internship" ? "bg-orange-50 text-orange-600 border-orange-100" :
                            "bg-blue-50 text-blue-600 border-blue-100"
                          }`}>{placement.offerType}</span>
                        </td>
                        {/* Source Project */}
                        <td className="px-4 py-4">
                          <div className="flex items-start gap-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                            <p className="text-[12px] font-medium text-gray-600 whitespace-normal line-clamp-2 max-w-[200px]">{placement.sourceProject}</p>
                          </div>
                        </td>
                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <button className="flex items-center justify-end gap-1.5 ml-auto px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-full text-[12px] font-bold transition-colors">
                            View Story <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            
            /* --- GRID VIEW (Cards) --- */
            <motion.div key="grid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredPlacements.map((placement) => (
                <div key={placement.id} className="bg-white border border-gray-200 rounded-[20px] p-5 shadow-sm hover:shadow-md hover:border-primary-200 transition-all flex flex-col group">
                  
                  {/* Company & Offer Type */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 shrink-0 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full border ${
                        placement.offerType === "PPO" ? "bg-purple-50 text-purple-600 border-purple-100" :
                        placement.offerType === "Internship" ? "bg-orange-50 text-orange-600 border-orange-100" :
                        "bg-blue-50 text-blue-600 border-blue-100"
                      }`}>
                      {placement.offerType}
                    </span>
                  </div>

                  {/* Amount & Role */}
                  <h3 className="text-[20px] font-bold text-emerald-600 leading-tight mb-1">{placement.packageAmount}</h3>
                  <p className="text-[14px] font-bold text-gray-900 mb-0.5">{placement.company}</p>
                  <p className="text-[12px] text-gray-500 mb-4">{placement.role}</p>
                  
                  {/* Student Info */}
                  <div className="flex items-center gap-2 mb-4 p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center font-bold text-[10px] shrink-0">{placement.student.initials}</div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-bold text-gray-900 truncate">{placement.student.name}</p>
                      <p className="text-[11px] font-medium text-gray-500 truncate">{placement.student.department}</p>
                    </div>
                  </div>

                  {/* Project Source (The crucial context) */}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Briefcase className="w-3 h-3"/> Converted From Project</p>
                    <p className="text-[12px] font-medium text-gray-700 leading-snug line-clamp-2">{placement.sourceProject}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </UniversityLayout>
  );
}