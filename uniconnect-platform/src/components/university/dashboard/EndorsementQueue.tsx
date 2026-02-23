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
    projectTitle: "E-Commerce Mobile App (React Native)",
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
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
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
    <div className="bg-card rounded-2xl border border-gray-100 p-6 shadow-card h-full flex flex-col">
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            {/* Uses your custom 'animate-pulse-ring' and secondary (purple) color */}
            <span className="w-2 h-2 bg-secondary-500 rounded-full animate-pulse-ring" />
            Endorsement Queue
          </h2>
          {/* Badge using secondary colors */}
          <span className="px-2.5 py-1 bg-secondary-50 text-secondary-700 text-xs font-bold rounded-md">
            {proposals.length} awaiting
          </span>
        </div>
        
        <Link 
          to="/university/dashboard/endorse"
          className="text-sm font-semibold text-primary-600 hover:text-primary-800 flex items-center gap-1 transition-colors group"
        >
          View All
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Content Area */}
      <div className="space-y-4 flex-1">
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
              // Uses your custom shadow-md and secondary border on hover
              className="p-5 bg-card rounded-xl border border-gray-100 hover:border-secondary-200 hover:shadow-card transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                
                {/* Inline Avatar Implementation with secondary palette */}
                <div className="w-10 h-10 rounded-full bg-secondary-50 flex items-center justify-center text-secondary-700 font-bold text-sm shrink-0 border border-secondary-100">
                  {proposal.initials}
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* Title & Meta Info */}
                  <h3 className="text-base font-bold text-gray-900 truncate group-hover:text-secondary-700 transition-colors">
                    {proposal.projectTitle}
                  </h3>
                  
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-sm text-gray-500 font-medium">{proposal.studentName}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-sm text-primary-600 font-semibold">{proposal.company}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 mt-1.5 text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">{proposal.submittedAt}</span>
                  </div>

                  {/* Inline Badge Implementation for Skills */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {proposal.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className="px-2.5 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 mt-5">
                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleEndorse(proposal.id)}
                      // Perfect gradient using your primary (blue) and secondary (purple) variables
                      className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-600 hover:from-primary-600 hover:to-secondary-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Endorse
                    </motion.button>
                    
                    <button
                      onClick={() => handleDecline(proposal.id)}
                      className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg text-sm font-medium transition-colors"
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
            className="flex flex-col items-center justify-center py-12 text-center h-full"
          >
            {/* Uses your success palette (emerald green) */}
            <div className="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-success-500" />
            </div>
            <p className="text-lg font-bold text-gray-900">All proposals reviewed!</p>
            <p className="text-sm text-gray-500 mt-1">Nothing pending endorsement at the moment.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}