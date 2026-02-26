import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, UploadCloud, Search, CheckCircle2, XCircle, 
  Clock, AlertTriangle, Check, Flag, LayoutGrid, List,
  ShieldCheck, UserPlus
} from "lucide-react";
import { UniversityLayout } from "@/components/university/UniversityLayout";

// --- Mock Data ---
const initialStudents = [
  { id: 1, name: "Aarav Sharma", email: "aarav.s@iitb.ac.in", initials: "AS", rollNo: "21CS1045", department: "Computer Science", year: "3rd Year", appliedAt: "2 hours ago", status: "Pending" },
  { id: 2, name: "Priya Patel", email: "priya.p@iitb.ac.in", initials: "PP", rollNo: "21EC2034", department: "Electronics", year: "3rd Year", appliedAt: "5 hours ago", status: "Pending" },
  { id: 3, name: "Rohan Mehta", email: "rohan.m@iitb.ac.in", initials: "RM", rollNo: "22CS1012", department: "Computer Science", year: "2nd Year", appliedAt: "1 day ago", status: "Verified" },
  { id: 4, name: "Ananya Gupta", email: "ananya.g@iitb.ac.in", initials: "AG", rollNo: "21ME3021", department: "Mechanical", year: "3rd Year", appliedAt: "3 hours ago", status: "Flagged" },
  { id: 5, name: "Vikram Singh", email: "vikram.s@iitb.ac.in", initials: "VS", rollNo: "22CS1098", department: "Computer Science", year: "2nd Year", appliedAt: "30 min ago", status: "Pending" },
  { id: 6, name: "Neha Reddy", email: "neha.r@iitb.ac.in", initials: "NR", rollNo: "21EE4056", department: "Electrical", year: "3rd Year", appliedAt: "2 days ago", status: "Verified" },
  { id: 7, name: "Arjun Nair", email: "arjun.n@iitb.ac.in", initials: "AN", rollNo: "22EC2078", department: "Electronics", year: "2nd Year", appliedAt: "1 hour ago", status: "Pending" },
];

export function VerifyStudents() {
  const [students, setStudents] = useState(initialStudents);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // --- Handlers ---
  const handleVerify = (id: number) => {
    setStudents((prev) => prev.map(s => s.id === id ? { ...s, status: "Verified" } : s));
  };

  const handleFlag = (id: number) => {
    setStudents((prev) => prev.map(s => s.id === id ? { ...s, status: "Flagged" } : s));
  };

  // --- Derived State (Filtering & Counting) ---
  const totalCount = students.length;
  const pendingCount = students.filter(s => s.status === "Pending").length;
  const verifiedCount = students.filter(s => s.status === "Verified").length;
  const flaggedCount = students.filter(s => s.status === "Flagged").length;

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            student.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All Statuses" || student.status === statusFilter;
      const matchesDept = deptFilter === "All Departments" || student.department === deptFilter;
      return matchesSearch && matchesStatus && matchesDept;
    });
  }, [students, searchQuery, statusFilter, deptFilter]);

  return (
    <UniversityLayout universityName="IIT Bombay">
      <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
        
        {/* 1. Page Header & Bulk Upload */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 tracking-tight flex items-center gap-3">
              <ShieldCheck className="w-7 h-7 text-primary-600" />
              Verification Queue
            </h1>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Review and approve student enrollment requests.
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all hover:-translate-y-0.5 whitespace-nowrap">
            <UploadCloud className="w-4 h-4" />
            Bulk Upload CSV
          </button>
        </div>

        {/* 2. KPI Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[22px] font-bold text-gray-900 leading-tight">{totalCount}</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Total Requests</p>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[22px] font-bold text-gray-900 leading-tight">{pendingCount}</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Pending Action</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[22px] font-bold text-gray-900 leading-tight">{verifiedCount}</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Verified</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[22px] font-bold text-gray-900 leading-tight">{flaggedCount}</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Flagged</p>
            </div>
          </div>
        </div>

        {/* 3. Advanced Filters Bar */}
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
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 cursor-pointer min-w-[140px]"
            >
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Verified</option>
              <option>Flagged</option>
            </select>
            <select 
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 cursor-pointer min-w-[160px]"
            >
              <option>All Departments</option>
              <option>Computer Science</option>
              <option>Electronics</option>
              <option>Mechanical</option>
              <option>Electrical</option>
            </select>
          </div>
        </div>

        {/* 4. White View Toggle Bar */}
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[20px] border border-gray-200 shadow-sm">
              <Search className="w-10 h-10 text-gray-300 mb-3" />
              <p className="text-lg font-bold text-gray-900">No students found</p>
              <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or search query.</p>
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
                      <th className="text-[13px] text-gray-500 font-medium px-6 py-4">Student</th>
                      <th className="text-[13px] text-gray-500 font-medium px-4 py-4">Roll Number</th>
                      <th className="text-[13px] text-gray-500 font-medium px-4 py-4">Branch & Year</th>
                      <th className="text-[13px] text-gray-500 font-medium px-4 py-4">Applied</th>
                      <th className="text-[13px] text-gray-500 font-medium px-4 py-4">Status</th>
                      <th className="text-[13px] text-gray-500 font-medium px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <AnimatePresence>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <motion.tr
                          key={student.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="border-b border-gray-100/70 hover:bg-gray-50/50 transition-colors group"
                        >
                          {/* Student Info */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3.5">
                              <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center font-bold text-sm shrink-0 border border-primary-100/50">
                                {student.initials}
                              </div>
                              <div>
                                <p className="text-[14px] font-bold text-gray-900 leading-tight">{student.name}</p>
                                <p className="text-[12px] font-medium text-gray-500 mt-0.5">{student.email}</p>
                              </div>
                            </div>
                          </td>

                          {/* Roll Number */}
                          <td className="px-4 py-4">
                            <span className="text-[13px] text-gray-600 font-medium">{student.rollNo}</span>
                          </td>

                          {/* Branch & Year */}
                          <td className="px-4 py-4">
                            <p className="text-[14px] font-bold text-gray-800 leading-tight">{student.department}</p>
                            <p className="text-[12px] font-medium text-gray-500 mt-0.5">{student.year}</p>
                          </td>

                          {/* Applied */}
                          <td className="px-4 py-4">
                            <span className="text-[13px] text-gray-600 font-medium">{student.appliedAt}</span>
                          </td>

                          {/* Status Pill */}
                          <td className="px-4 py-4">
                            {student.status === "Pending" && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 text-orange-600 border border-orange-200 text-[11px] font-bold rounded-full"><Clock className="w-3 h-3" /> Pending</span>}
                            {student.status === "Verified" && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-200 text-[11px] font-bold rounded-full"><CheckCircle2 className="w-3 h-3" /> Verified</span>}
                            {student.status === "Flagged" && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-rose-50 text-rose-600 border border-rose-200 text-[11px] font-bold rounded-full"><AlertTriangle className="w-3 h-3" /> Flagged</span>}
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4 text-right">
                            {student.status === "Pending" ? (
                              <div className="flex items-center justify-end gap-2">
                                <button onClick={() => handleVerify(student.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-full text-[12px] font-bold transition-colors">
                                  <Check className="w-3.5 h-3.5" /> Verify
                                </button>
                                <button onClick={() => handleFlag(student.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-rose-200 hover:bg-rose-50 text-rose-500 rounded-full text-[12px] font-bold transition-colors">
                                  <XCircle className="w-3.5 h-3.5" /> Flag
                                </button>
                              </div>
                            ) : student.status === "Verified" ? (
                              <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-emerald-600 mr-2"><Check className="w-4 h-4" /> Verified</span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-rose-500 mr-2"><Flag className="w-4 h-4" /> Flagged</span>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </AnimatePresence>
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
                <motion.div layout key={student.id} className="bg-white border border-gray-200 rounded-[20px] p-5 shadow-sm hover:shadow-md hover:border-primary-200 transition-all flex flex-col group">
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center font-bold text-[16px] border border-primary-100/50">
                      {student.initials}
                    </div>
                    <div>
                      {student.status === "Pending" && <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-50 text-orange-600 border border-orange-200 text-[10px] font-bold rounded-full"><Clock className="w-3 h-3" /> Pending</span>}
                      {student.status === "Verified" && <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-bold rounded-full"><CheckCircle2 className="w-3 h-3" /> Verified</span>}
                      {student.status === "Flagged" && <span className="inline-flex items-center gap-1 px-2 py-1 bg-rose-50 text-rose-600 border border-rose-200 text-[10px] font-bold rounded-full"><AlertTriangle className="w-3 h-3" /> Flagged</span>}
                    </div>
                  </div>

                  <h3 className="text-[16px] font-bold text-gray-900 mb-1 leading-tight">{student.name}</h3>
                  <p className="text-[12px] text-gray-500 mb-0.5">{student.rollNo}</p>
                  <p className="text-[12px] text-gray-500 mb-4">{student.department} · {student.year}</p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    {student.status === "Pending" ? (
                      <div className="flex items-center gap-2 w-full">
                        <button onClick={() => handleVerify(student.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-full text-[12px] font-bold transition-colors">
                          <Check className="w-3.5 h-3.5" /> Verify
                        </button>
                        <button onClick={() => handleFlag(student.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white border border-rose-200 hover:bg-rose-50 text-rose-500 rounded-full text-[12px] font-bold transition-colors">
                          <XCircle className="w-3.5 h-3.5" /> Flag
                        </button>
                      </div>
                    ) : (
                      <span className="text-[12px] text-gray-400 font-medium w-full text-center">Action Completed</span>
                    )}
                  </div>

                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </UniversityLayout>
  );
}