import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, PartyPopper } from "lucide-react";
import { Link } from "react-router-dom";

const initialStudents = [
  {
    id: 1,
    name: "Arjun Sharma",
    rollNo: "CS2021001",
    enrollmentNo: "IIT-B-21-001",
    department: "Computer Science",
    appliedAt: "2 hours ago",
    initials: "AS",
  },
  {
    id: 2,
    name: "Priya Patel",
    rollNo: "EC2021045",
    enrollmentNo: "IIT-B-21-045",
    department: "Electronics & Comm.",
    appliedAt: "4 hours ago",
    initials: "PP",
  },
  {
    id: 3,
    name: "Rohan Mehta",
    rollNo: "ME2020088",
    enrollmentNo: "IIT-B-20-088",
    department: "Mechanical Engg.",
    appliedAt: "Yesterday",
    initials: "RM",
  },
  {
    id: 4,
    name: "Sneha Iyer",
    rollNo: "MBA2022012",
    enrollmentNo: "IIT-B-22-012",
    department: "MBA",
    appliedAt: "Yesterday",
    initials: "SI",
  },
];

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.3 },
  }),
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

export function VerificationQueue() {
  const [students, setStudents] = useState(initialStudents);

  const handleApprove = (id: number) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const handleReject = (id: number) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="bg-white rounded-[20px] border border-gray-200 shadow-sm flex flex-col overflow-hidden w-full">
      
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between bg-white shrink-0 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <h2 className="text-[17px] font-bold text-gray-900 flex items-center gap-2.5">
            <span className="w-2 h-2 bg-orange-400 rounded-full" />
            Verification Queue
          </h2>
          <span className="px-2.5 py-0.5 bg-orange-50 text-orange-500 text-[11px] font-bold rounded-full">
            {students.length} pending
          </span>
        </div>
        <Link 
          to="/university/dashboard/verify"
          className="text-sm font-medium text-primary-600 hover:text-primary-800 flex items-center gap-1 transition-colors"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Table Content - ✅ Added custom sleek scrollbar classes here */}
      <div className="w-full overflow-x-auto bg-white [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full pb-1">
        {students.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center min-w-[600px]"
          >
            <div className="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mb-4">
              <PartyPopper className="w-8 h-8 text-success-500" />
            </div>
            <p className="text-lg font-bold text-gray-900">No students pending verification 🎉</p>
            <p className="text-sm text-gray-500 mt-1">All caught up!</p>
          </motion.div>
        ) : (
          <table className="w-full text-left border-collapse whitespace-nowrap min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-[13px] text-gray-500 font-medium px-6 py-4">Student</th>
                <th className="text-[13px] text-gray-500 font-medium px-4 py-4">Enrollment ID</th>
                <th className="text-[13px] text-gray-500 font-medium px-4 py-4">Department</th>
                <th className="text-[13px] text-gray-500 font-medium px-4 py-4">Applied</th>
                <th className="text-[13px] text-gray-500 font-medium px-6 py-4">Actions</th>
              </tr>
            </thead>
            <AnimatePresence>
              <tbody>
                {students.map((student, index) => (
                  <motion.tr
                    key={student.id}
                    custom={index}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    className="border-b border-gray-100/70 hover:bg-gray-50/50 transition-colors group"
                  >
                    {/* Student Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                          {student.initials}
                        </div>
                        <div>
                          <p className="text-[15px] font-bold text-gray-900 leading-tight group-hover:text-primary-600 transition-colors">
                            {student.name}
                          </p>
                          <p className="text-[12px] font-medium text-gray-500 mt-0.5">
                            {student.rollNo}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Enrollment ID Column */}
                    <td className="px-4 py-4">
                      <span className="text-[13px] text-gray-600 font-mono tracking-tight">
                        {student.enrollmentNo}
                      </span>
                    </td>

                    {/* Department Column */}
                    <td className="px-4 py-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[12px] font-medium rounded-full">
                        {student.department}
                      </span>
                    </td>

                    {/* Applied Column */}
                    <td className="px-4 py-4">
                      <div className="flex flex-row items-center gap-2.5">
                        <span className="text-[12px] font-bold text-orange-500">
                          Pending
                        </span>
                        <span className="text-[13px] font-medium text-gray-500">
                          {student.appliedAt}
                        </span>
                      </div>
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApprove(student.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-success-200 text-success-600 hover:bg-success-50 rounded-full text-[12px] font-semibold transition-colors"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(student.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-rose-200 text-rose-500 hover:bg-rose-50 rounded-full text-[12px] font-semibold transition-colors"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Reject
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </AnimatePresence>
          </table>
        )}
      </div>
    </div>
  );
}