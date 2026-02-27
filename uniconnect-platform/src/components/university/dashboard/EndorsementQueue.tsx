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
    // ✅ Thin border, clean white background, soft shadow (Matches VerificationQueue perfectly)
    <div className="bg-white rounded-[20px] border border-gray-200 shadow-sm flex flex-col h-full w-full overflow-hidden">
      
      {/* Header Section */}
      <div className="px-6 py-5 flex items-center justify-between bg-white shrink-0 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <h2 className="text-[17px] font-bold text-gray-900 flex items-center gap-2.5">
            {/* ✅ Small purple dot exactly like the screenshot */}
            <span className="w-2 h-2 bg-purple-500 rounded-full" />
            Endorsement Queue
          </h2>
          {/* ✅ Light purple pill badge */}
          <span className="px-2.5 py-0.5 bg-purple-50 text-purple-600 text-[11px] font-bold rounded-full">
            {proposals.length} awaiting
          </span>
        </div>
        
        <Link 
          to="/university/dashboard/endorse"
          className="text-sm font-medium text-primary-600 hover:text-primary-800 flex items-center gap-1 transition-colors"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="p-6 overflow-y-auto bg-white flex-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
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
                className="p-5 bg-white rounded-2xl border border-gray-200 hover:border-primary-200 hover:shadow-sm transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  
                  {/* Avatar - Circular, Light Purple */}
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-700 font-bold text-sm shrink-0 border border-purple-100/50">
                    {proposal.initials}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    {/* Title */}
                    <h3 className="text-[15px] font-bold text-gray-900 truncate group-hover:text-primary-600 transition-colors">
                      {proposal.projectTitle}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                      <span className="text-[13px] text-gray-500 font-medium">{proposal.studentName}</span>
                      <span className="text-gray-300">·</span>
                      <span className="text-[13px] text-primary-600 font-medium">{proposal.company}</span>
                    </div>
                    
                    {/* Date */}
                    <div className="flex items-center gap-1.5 mt-1 text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span className="text-[12px] font-medium">{proposal.submittedAt}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3.5">
                      {proposal.skills.map((skill) => (
                        <span 
                          key={skill} 
                          className="px-3 py-1 bg-gray-50 border border-gray-100 text-gray-600 text-[11px] font-semibold rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2.5 mt-4">
                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleEndorse(proposal.id)}
                        className="flex items-center gap-1.5 px-4 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-[13px] font-semibold transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Endorse
                      </motion.button>
                      
                      <button
                        onClick={() => handleDecline(proposal.id)}
                        // ✅ Outlined, rounded-full
                        className="px-4 py-1.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-full text-[13px] font-semibold transition-colors"
                      >
                        Decline
                      </button>
                    </div>
                    
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {proposals.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-success-500" />
              </div>
              <p className="text-lg font-bold text-gray-900">All proposals reviewed!</p>
              <p className="text-sm text-gray-500 mt-1">Nothing pending endorsement at the moment.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}