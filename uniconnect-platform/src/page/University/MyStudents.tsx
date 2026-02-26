import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, GraduationCap, Download, Mail, ExternalLink, 
  CheckCircle2, Clock, MinusCircle, LayoutGrid, List,
  Users, Award, TrendingUp
} from "lucide-react";
import { UniversityLayout } from "@/components/university/UniversityLayout";

// --- Mock Data ---
const initialStudents = [
  { id: 1, name: "Aarav Sharma", email: "aarav.s@iitb.ac.in", initials: "AS", rollNo: "21CS1045", department: "Computer Science", cgpa: "9.2", placementStatus: "Placed", company: "Stripe India" },
  { id: 2, name: "Priya Patel", email: "priya.p@iitb.ac.in", initials: "PP", rollNo: "21EC2034", department: "Electronics", cgpa: "8.8", placementStatus: "Interviewing", company: "Freshworks" },
  { id: 3, name: "Rohan Mehta", email: "rohan.m@iitb.ac.in", initials: "RM", rollNo: "22CS1012", department: "Computer Science", cgpa: "9.5", placementStatus: "Unplaced", company: null },
  { id: 4, name: "Neha Reddy", email: "neha.r@iitb.ac.in", initials: "NR", rollNo: "21EE4056", department: "Electrical", cgpa: "8.4", placementStatus: "Placed", company: "Tata Motors" },
  { id: 5, name: "Vikram Singh", email: "vikram.s@iitb.ac.in", initials: "VS", rollNo: "22CS1098", department: "Computer Science", cgpa: "7.9", placementStatus: "Unplaced", company: null },
];

export function MyStudents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const filteredStudents = useMemo(() => {
    return initialStudents.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            student.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All Statuses" || student.placementStatus === statusFilter;
      const matchesDept = deptFilter === "All Departments" || student.department === deptFilter;
      return matchesSearch && matchesStatus && matchesDept;
    });
  }, [searchQuery, statusFilter, deptFilter]);

  return (
    <UniversityLayout universityName="IIT Bombay">
      <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
        
        {/* 1. Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 tracking-tight flex items-center gap-3">
              <GraduationCap className="w-7 h-7 text-primary-600" />
              My Students
            </h1>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Manage and track all enrolled students and their placement journeys.
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl shadow-sm transition-all whitespace-nowrap">
            <Download className="w-4 h-4" />
            Export Roster
          </button>
        </div>

        {/* 2. KPI Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[22px] font-bold text-gray-900 leading-tight">1,240</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Total Verified</p>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[22px] font-bold text-gray-900 leading-tight">94</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Students Placed</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[22px] font-bold text-gray-900 leading-tight">156</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Interviewing</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[22px] font-bold text-gray-900 leading-tight">8.4</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Batch Avg CGPA</p>
            </div>
          </div>
        </div>

        {/* 3. Filters Bar */}
        <div className="bg-white p-4 rounded-[16px] border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name or roll number..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
            />
          </div>
          <div className="flex gap-3">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 cursor-pointer min-w-[150px]"
            >
              <option>All Statuses</option>
              <option>Placed</option>
              <option>Interviewing</option>
              <option>Unplaced</option>
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

        {/* 4. VIEW TOGGLE BAR - ✅ NOW A CRISP WHITE CARD */}
        <div className="bg-white px-5 py-3 rounded-[16px] border border-gray-200 shadow-sm flex items-center justify-between">
          <span className="text-[14px] text-gray-600">
            Showing <span className="font-bold text-gray-900">{filteredStudents.length}</span> students
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
          {filteredStudents.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[20px] border border-gray-200">
              <Search className="w-10 h-10 text-gray-300 mb-3" />
              <p className="text-lg font-bold text-gray-900">No students found</p>
              <p className="text-sm text-gray-500 mt-1">Try adjusting your filters.</p>
            </motion.div>
          ) : viewMode === "list" ? (
            /* --- LIST VIEW (Table) --- */
            <motion.div 
              key="list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className="bg-white rounded-[20px] border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full pb-2">
                <table className="w-full text-left border-collapse whitespace-nowrap min-w-[1000px]">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="text-[13px] text-gray-500 font-medium px-6 py-4">Student Info</th>
                      <th className="text-[13px] text-gray-500 font-medium px-4 py-4">Branch</th>
                      <th className="text-[13px] text-gray-500 font-medium px-4 py-4">CGPA</th>
                      <th className="text-[13px] text-gray-500 font-medium px-4 py-4">Status</th>
                      <th className="text-[13px] text-gray-500 font-medium px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b border-gray-100/70 hover:bg-gray-50/50 transition-colors">
                        {/* Student Info */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0 border border-blue-100/50">{student.initials}</div>
                            <div>
                              <p className="text-[14px] font-bold text-gray-900">{student.name}</p>
                              <p className="text-[12px] font-medium text-gray-500 mt-0.5">{student.rollNo} · {student.email}</p>
                            </div>
                          </div>
                        </td>
                        {/* Branch */}
                        <td className="px-4 py-4"><span className="text-[13px] font-semibold text-gray-700">{student.department}</span></td>
                        {/* CGPA */}
                        <td className="px-4 py-4">
                          <span className={`text-[13px] font-bold px-2 py-1 rounded-md ${parseFloat(student.cgpa) >= 9.0 ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>{student.cgpa}</span>
                        </td>
                        {/* Status */}
                        <td className="px-4 py-4">
                          {student.placementStatus === "Placed" && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-200 text-[11px] font-bold rounded-full"><CheckCircle2 className="w-3 h-3" /> Placed</span>}
                          {student.placementStatus === "Interviewing" && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 text-orange-600 border border-orange-200 text-[11px] font-bold rounded-full"><Clock className="w-3 h-3" /> Interviewing</span>}
                          {student.placementStatus === "Unplaced" && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-gray-500 border border-gray-200 text-[11px] font-bold rounded-full"><MinusCircle className="w-3 h-3" /> Open</span>}
                        </td>
                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors"><Mail className="w-4 h-4" /></button>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-full text-[12px] font-bold transition-colors">Profile <ExternalLink className="w-3.5 h-3.5" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            /* --- GRID VIEW (Cards) --- */
            <motion.div 
              key="grid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filteredStudents.map((student) => (
                <div key={student.id} className="bg-white border border-gray-200 rounded-[20px] p-5 shadow-sm hover:shadow-md hover:border-primary-200 transition-all flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-[16px] border border-blue-100/50">{student.initials}</div>
                    <span className={`text-[12px] font-bold px-2 py-1 rounded-md ${parseFloat(student.cgpa) >= 9.0 ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>{student.cgpa} CGPA</span>
                  </div>
                  <h3 className="text-[16px] font-bold text-gray-900 mb-1">{student.name}</h3>
                  <p className="text-[12px] text-gray-500 mb-4">{student.rollNo} · {student.department}</p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      {student.placementStatus === "Placed" && <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-bold rounded-full"><CheckCircle2 className="w-3 h-3" /> Placed</span>}
                      {student.placementStatus === "Interviewing" && <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-orange-50 text-orange-600 border border-orange-200 text-[10px] font-bold rounded-full"><Clock className="w-3 h-3" /> Interviewing</span>}
                      {student.placementStatus === "Unplaced" && <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-gray-100 text-gray-500 border border-gray-200 text-[10px] font-bold rounded-full"><MinusCircle className="w-3 h-3" /> Open</span>}
                    </div>
                    <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors"><ExternalLink className="w-4 h-4" /></button>
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