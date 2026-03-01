import { motion, AnimatePresence } from "framer-motion";
import { UserCheck, ClipboardCheck, Award, Building2, UserPlus, ArrowRight, Clock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

// Refined to use subtle, semantic icon backgrounds instead of loud text/border colors
const activities = [
  {
    id: 1,
    icon: UserCheck,
    title: "Student Verified",
    message: "Arjun Sharma (CS2021001) was successfully verified and granted platform access.",
    time: "5 min ago",
    isNew: true,
    iconBg: "bg-blue-50 text-blue-600 border-blue-100", // System/Primary action
  },
  {
    id: 2,
    icon: UserPlus,
    title: "New Student Signup",
    message: "Ananya Krishnan registered and is awaiting enrollment verification.",
    time: "18 min ago",
    isNew: true,
    iconBg: "bg-gray-100 text-gray-600 border-gray-200", // Neutral action
  },
  {
    id: 3,
    icon: ClipboardCheck,
    title: "Proposal Endorsed",
    message: "Priya Patel's proposal for 'E-Commerce App' was endorsed and sent to ShopEasy Inc.",
    time: "1 hour ago",
    isNew: false,
    iconBg: "bg-purple-50 text-purple-600 border-purple-100", // Matches endorsement queue
  },
  {
    id: 4,
    icon: Award,
    title: "Student Hired",
    message: "Rohan Mehta was hired by TechCorp Solutions for the AI Dashboard project.",
    time: "3 hours ago",
    isNew: false,
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100", // Success action
  },
  {
    id: 5,
    icon: Building2,
    title: "New Company Partner",
    message: "LogiChain Ltd. accepted the partnership request. 2 active projects available.",
    time: "Yesterday",
    isNew: false,
    iconBg: "bg-slate-50 text-slate-700 border-slate-200", // Corporate action
  }
];

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
};

export function UniActivityFeed() {
  const newCount = activities.filter((a) => a.isNew).length;

  return (
    <div className="bg-white rounded-[20px] border border-gray-200 shadow-sm h-full flex flex-col overflow-hidden w-full min-h-[480px]">
      
      {/* Header Section (Responsive padding) */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
        <div className="flex items-center gap-2 sm:gap-3">
          <h2 className="text-[15px] sm:text-[17px] font-bold text-gray-900 flex items-center gap-2">
            <Clock className="w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] text-gray-400" />
            Recent Activity
          </h2>
          {newCount > 0 && (
            <span className="flex items-center gap-1 px-2 sm:px-2.5 py-0.5 bg-blue-50 text-blue-600 text-[10px] sm:text-[11px] font-bold rounded-full border border-blue-100/50">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span className="hidden sm:inline">{newCount} new</span>
              <span className="sm:hidden">{newCount}</span>
            </span>
          )}
        </div>
        
        <Link 
          to="/university/dashboard/activity"
          className="text-[13px] sm:text-sm font-bold text-primary-600 hover:text-primary-800 flex items-center gap-1 transition-colors group whitespace-nowrap"
        >
          View All
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-5 bg-white [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
        <div className="space-y-1 sm:space-y-2">
          <AnimatePresence>
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="relative flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-[16px] bg-white hover:bg-gray-50/80 transition-colors cursor-pointer group"
              >
                
                {/* Floating "New" Indicator (Sleek Blue Dot) */}
                {activity.isNew && (
                  <div className="absolute left-1.5 top-5 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                )}

                {/* Semantic Icon Wrapper */}
                <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 border mt-0.5 sm:mt-0 ${activity.isNew ? 'ml-3 sm:ml-2' : 'ml-0'} ${activity.iconBg}`}>
                  <activity.icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </div>

                {/* Text Content (Responsive Line Clamping) */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-2 mb-1">
                    <span className="text-[14px] sm:text-[15px] font-bold text-gray-900 truncate pr-2">
                      {activity.title}
                    </span>
                    <span className="text-[11px] sm:text-[12px] font-semibold text-gray-400 shrink-0">
                      {activity.time}
                    </span>
                  </div>
                  
                  <p className="text-[12px] sm:text-[13px] text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors line-clamp-2 pr-2">
                    {activity.message}
                  </p>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}