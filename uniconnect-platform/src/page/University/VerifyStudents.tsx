import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, UploadCloud, Search, CheckCircle2, XCircle, 
  Clock, AlertTriangle, Check, Flag
} from "lucide-react";

// ✅ Import your layout component
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

  // --- Handlers ---
  const handleVerify = (id: number) => {
    setStudents((prev) => prev.map(s => s.id === id ? { ...s, status: "Verified" } : s));
  };

  const handleFlag = (id: number) => {
    setStudents((prev) => prev.map(s => s.id === id ? { ...s, status: "Flagged" } : s));
  };

  // --- Derived State (Filtering & Counting) ---
  const pendingCount = students.filter(s => s.status === "Pending").length;
  const verifiedCount = students.filter(s => s.status === "Verified").length;

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
    // ✅ Wrap the entire page in the Layout component
    <UniversityLayout universityName="IIT Bombay">
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* 1. Page Header & Bulk Upload */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 tracking-tight flex items-center gap-3">
              <Users className="w-7 h-7 text-primary-600" />
              Student Database
            </h1>
            <p className="text-sm font-medium text-gray-500 mt-1">
              {pendingCount} pending verification · {verifiedCount} verified
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all hover:-translate-y-0.5 whitespace-nowrap">
            <UploadCloud className="w-4 h-4" />
            Bulk Upload CSV
          </button>
        </div>

        {/* 2. Main White Card Container */}
        <div className="bg-white rounded-[20px] border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          
          {/* Filters Bar */}
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4">
            {/* Search */}
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
            
            {/* Dropdowns */}
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

          {/* Results Counter */}
          <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100">
            <span className="text-sm font-bold text-gray-900">{filteredStudents.length} Students Found</span>
          </div>

          {/* 3. Responsive Table with Custom Scrollbar */}
          <div className="w-full overflow-x-auto bg-white [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full pb-2">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-[1000px]">
              <thead>
                <tr className="border-b border-gray-100">
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
                      {/* 1. Student Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center font-bold text-sm shrink-0 border border-primary-100/50">
                            {student.initials}
                          </div>
                          <div>
                            <p className="text-[14px] font-bold text-gray-900 leading-tight">
                              {student.name}
                            </p>
                            <p className="text-[12px] font-medium text-gray-500 mt-0.5">
                              {student.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* 2. Roll Number */}
                      <td className="px-4 py-4">
                        <span className="text-[13px] text-gray-600 font-medium">
                          {student.rollNo}
                        </span>
                      </td>

                      {/* 3. Branch & Year */}
                      <td className="px-4 py-4">
                        <p className="text-[14px] font-bold text-gray-800 leading-tight">
                          {student.department}
                        </p>
                        <p className="text-[12px] font-medium text-gray-500 mt-0.5">
                          {student.year}
                        </p>
                      </td>

                      {/* 4. Applied */}
                      <td className="px-4 py-4">
                        <span className="text-[13px] text-gray-600 font-medium">
                          {student.appliedAt}
                        </span>
                      </td>

                      {/* 5. Status Pill */}
                      <td className="px-4 py-4">
                        {student.status === "Pending" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 text-orange-600 border border-orange-200 text-[11px] font-bold rounded-full">
                            <Clock className="w-3 h-3" />
                            Pending
                          </span>
                        )}
                        {student.status === "Verified" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-200 text-[11px] font-bold rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                        {student.status === "Flagged" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-rose-50 text-rose-600 border border-rose-200 text-[11px] font-bold rounded-full">
                            <AlertTriangle className="w-3 h-3" />
                            Flagged
                          </span>
                        )}
                      </td>

                      {/* 6. Actions (Right Aligned) */}
                      <td className="px-6 py-4 text-right">
                        {student.status === "Pending" ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleVerify(student.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-full text-[12px] font-bold transition-colors"
                            >
                              <Check className="w-3.5 h-3.5" />
                              Verify
                            </button>
                            <button
                              onClick={() => handleFlag(student.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-rose-200 hover:bg-rose-50 text-rose-500 rounded-full text-[12px] font-bold transition-colors"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              Flag
                            </button>
                          </div>
                        ) : student.status === "Verified" ? (
                          <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-emerald-600 mr-2">
                            <Check className="w-4 h-4" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-rose-500 mr-2">
                            <Flag className="w-4 h-4" />
                            Flagged
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </AnimatePresence>
            </table>
            
            {/* Empty State when filtering yields 0 results */}
            {filteredStudents.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center w-full">
                <Search className="w-10 h-10 text-gray-300 mb-3" />
                <p className="text-lg font-bold text-gray-900">No students found</p>
                <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </UniversityLayout>
  );
}