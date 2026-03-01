import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const initialProposals = [
  {
    id: 1,
    studentName: "Arjun Sharma",
    initials: "AS",
    projectTitle: "AI-Powered Analytics Dashboard",
    company: "TechCorp Solutions",
    submittedAt: "2 hours ago",
    skills: ["React", "Python", "TensorFlow"],
  },
  {
    id: 2,
    studentName: "Priya Patel",
    initials: "PP",
    projectTitle: "E-Commerce Mobile App",
    company: "ShopEasy Inc.",
    submittedAt: "5 hours ago",
    skills: ["React Native", "Node.js", "Firebase"],
  },
  {
    id: 3,
    studentName: "Vikram Nair",
    initials: "VN",
    projectTitle: "Blockchain Supply Chain Tracker",
    company: "LogiChain Ltd.",
    submittedAt: "Yesterday",
    skills: ["Solidity", "Web3.js", "TypeScript"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.35 },
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export function EndorsementQueue() {
  const [proposals, setProposals] = useState(initialProposals);

  const handleEndorse = (id: number) => {
    setProposals((prev) => prev.filter((p) => p.id !== id));
  };

  const handleDecline = (id: number) => {
    setProposals((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="bg-white rounded-[20px] border border-gray-200 shadow-sm flex flex-col h-full w-full overflow-hidden">
      
      {/* Header Section */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between bg-white shrink-0 border-b border-gray-100">
        <div className="flex items-center gap-2 sm:gap-3">
          <h2 className="text-[15px] sm:text-[17px] font-bold text-gray-900 flex items-center gap-2 sm:gap-2.5">
            <span className="w-2 h-2 bg-purple-500 rounded-full shrink-0" />
            <span className="truncate">Endorsements</span>
          </h2>
          <span className="px-2 sm:px-2.5 py-0.5 bg-purple-50 text-purple-600 text-[10px] sm:text-[11px] font-bold rounded-full whitespace-nowrap">
            {proposals.length} awaiting
          </span>
        </div>
        
        <Link 
          to="/university/dashboard/endorse"
          className="text-[13px] sm:text-sm font-bold text-primary-600 hover:text-primary-800 flex items-center gap-1 transition-colors whitespace-nowrap"
        >
          View All
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </Link>
      </div>

      {/* Scrollable Content */}
      <div className="p-4 sm:p-6 overflow-y-auto bg-white flex-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
        <div className="space-y-4">
          <AnimatePresence>
            {proposals.map((proposal, index) => (
              <motion.div
                key={proposal.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="p-4 sm:p-5 bg-white rounded-2xl border border-gray-200 hover:border-primary-200 hover:shadow-sm transition-all duration-300 group"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  
                  {/* Avatar - Circular, Light Purple */}
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-700 font-bold text-[13px] sm:text-sm shrink-0 border border-purple-100/50 mt-0.5">
                    {proposal.initials}
                  </div>
                  
                  {/* min-w-0 ensures the flex child can shrink below its minimum intrinsic width, fixing text overflow */}
                  <div className="flex-1 min-w-0">
                    {/* Title */}
                    <h3 className="text-[14px] sm:text-[15px] font-bold text-gray-900 truncate group-hover:text-primary-600 transition-colors leading-tight">
                      {proposal.projectTitle}
                    </h3>
                    
                    {/* Student & Company info */}
                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <span className="text-[12px] sm:text-[13px] text-gray-500 font-medium truncate max-w-[120px] sm:max-w-none">{proposal.studentName}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-[12px] sm:text-[13px] text-primary-600 font-bold truncate max-w-[120px] sm:max-w-none">{proposal.company}</span>
                    </div>
                    
                    {/* Date */}
                    <div className="flex items-center gap-1.5 mt-1.5 text-gray-400">
                      <Calendar className="w-3 h-3 shrink-0" />
                      <span className="text-[11px] sm:text-[12px] font-semibold">{proposal.submittedAt}</span>
                    </div>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3">
                      {proposal.skills.map((skill) => (
                        <span 
                          key={skill} 
                          className="px-2.5 sm:px-3 py-1 bg-gray-50 border border-gray-100 text-gray-600 text-[10px] sm:text-[11px] font-bold rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons (Responsive split on mobile) */}
                    <div className="flex items-center gap-2 sm:gap-2.5 mt-4 sm:mt-5">
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleEndorse(proposal.id)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 sm:py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-[12px] sm:text-[13px] font-bold transition-colors shadow-sm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                        Endorse
                      </motion.button>
                      
                      <button
                        onClick={() => handleDecline(proposal.id)}
                        className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 sm:py-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-full text-[12px] sm:text-[13px] font-bold transition-colors shadow-sm"
                      >
                        Decline
                      </button>
                    </div>
                    
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty State */}
          {proposals.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-10 sm:py-12 text-center px-4"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-3 sm:mb-4 border border-emerald-100">
                <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500" />
              </div>
              <p className="text-[16px] sm:text-lg font-extrabold text-gray-900">All caught up!</p>
              <p className="text-[12px] sm:text-sm font-medium text-gray-500 mt-1 max-w-[200px] sm:max-w-none mx-auto">
                No proposals pending endorsement.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}