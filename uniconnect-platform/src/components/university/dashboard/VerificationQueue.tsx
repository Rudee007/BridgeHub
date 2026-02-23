import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight, PartyPopper } from "lucide-react";
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
];

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.3 },
  }),
  exit: { opacity: 0, x: 40, transition: { duration: 0.25 } },
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
    <div className="bg-card rounded-2xl border border-border shadow-card flex flex-col overflow-hidden h-full">
      {/* Header */}
      <div className="p-6 border-b border-border/50 flex items-center justify-between bg-card shrink-0">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse-ring" />
            Verification Queue
          </h2>
          <span className="px-2.5 py-1 bg-amber-50 text-amber-600 text-xs font-bold rounded-md">
            {students.length} pending
          </span>
        </div>
        <Link 
          to="/university/dashboard/verify"
          className="text-sm font-semibold text-primary-600 hover:text-primary-800 flex items-center gap-1 transition-colors group"
        >
          View All
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-x-auto bg-card">
        {students.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mb-4">
              <PartyPopper className="w-8 h-8 text-success-500" />
            </div>
            <p className="text-lg font-bold text-foreground">No students pending verification 🎉</p>
            <p className="text-sm text-muted-foreground mt-1">All caught up!</p>
          </motion.div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/20">
                <th className="text-xs text-muted-foreground font-semibold px-6 py-4 uppercase tracking-wider">Student</th>
                <th className="text-xs text-muted-foreground font-semibold px-4 py-4 uppercase tracking-wider hidden md:table-cell">Enrollment ID</th>
                <th className="text-xs text-muted-foreground font-semibold px-4 py-4 uppercase tracking-wider hidden lg:table-cell">Department</th>
                <th className="text-xs text-muted-foreground font-semibold px-4 py-4 uppercase tracking-wider">Applied</th>
                <th className="text-xs text-muted-foreground font-semibold px-6 py-4 uppercase tracking-wider text-right">Actions</th>
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
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* Custom Avatar without shadcn component */}
                        <div className="w-9 h-9 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center font-bold text-sm shrink-0 border border-primary-100">
                          {student.initials}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground group-hover:text-primary-700 transition-colors">{student.name}</p>
                          <p className="text-xs font-medium text-muted-foreground">{student.rollNo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-sm font-medium text-muted-foreground font-mono bg-muted px-2 py-1 rounded-md">
                        {student.enrollmentNo}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="px-2.5 py-1 bg-muted border border-border text-muted-foreground text-xs font-medium rounded-md">
                        {student.department}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <span className="px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-200 text-[10px] font-bold uppercase tracking-wider rounded">
                          Pending
                        </span>
                        <span className="text-xs font-medium text-muted-foreground hidden sm:inline">{student.appliedAt}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleReject(student.id)}
                          className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 border border-error/20 text-error hover:bg-error/10 rounded-lg text-xs font-semibold transition-colors"
                          title="Reject"
                        >
                          <XCircle className="w-4 h-4" />
                          <span className="hidden sm:inline">Reject</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleApprove(student.id)}
                          className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 bg-success-50 text-success-600 hover:bg-success-100 border border-success-200 rounded-lg text-xs font-semibold transition-colors"
                          title="Approve"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span className="hidden sm:inline">Approve</span>
                        </motion.button>
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