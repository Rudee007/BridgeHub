import { motion, AnimatePresence } from "framer-motion";
import { UserCheck, ClipboardCheck, Award, Building2, UserPlus, ArrowRight, Clock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const activities = [
  {
    id: 1,
    type: "student_verified",
    icon: UserCheck,
    title: "Student Verified",
    message: "Arjun Sharma (CS2021001) was successfully verified and granted platform access.",
    time: "5 min ago",
    isNew: true,
    color: "text-blue-600",
    bg: "bg-blue-50 text-blue-600",
    borderColor: "border-l-blue-500",
  },
  {
    id: 2,
    type: "new_student",
    icon: UserPlus,
    title: "New Student Signup",
    message: "Ananya Krishnan registered and is awaiting enrollment verification.",
    time: "18 min ago",
    isNew: true,
    color: "text-sky-600",
    bg: "bg-sky-50 text-sky-600",
    borderColor: "border-l-sky-400",
  },
  {
    id: 3,
    type: "proposal_endorsed",
    icon: ClipboardCheck,
    title: "Proposal Endorsed",
    message: "Priya Patel's proposal for 'E-Commerce App' was endorsed and sent to ShopEasy Inc.",
    time: "1 hour ago",
    isNew: false,
    color: "text-purple-600",
    bg: "bg-purple-50 text-purple-600",
    borderColor: "border-l-purple-500",
  },
  {
    id: 4,
    type: "student_hired",
    icon: Award,
    title: "Student Hired 🎉",
    message: "Rohan Mehta was hired by TechCorp Solutions for the AI Dashboard project.",
    time: "3 hours ago",
    isNew: false,
    color: "text-emerald-600",
    bg: "bg-emerald-50 text-emerald-600",
    borderColor: "border-l-emerald-500",
  },
  {
    id: 5,
    type: "company_partner",
    icon: Building2,
    title: "New Company Partner",
    message: "LogiChain Ltd. accepted the partnership request. 2 active projects available.",
    time: "Yesterday",
    isNew: false,
    color: "text-indigo-600",
    bg: "bg-indigo-50 text-indigo-600",
    borderColor: "border-l-indigo-500",
  }
];

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.08, duration: 0.3 },
  }),
};

export function UniActivityFeed() {
  const newCount = activities.filter((a) => a.isNew).length;

  return (
    // Set to h-full so it stretches to match the analytics card perfectly
    <div className="bg-white rounded-[20px] border border-gray-200 shadow-sm h-full flex flex-col overflow-hidden w-full min-h-[480px]">
      
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
        <div className="flex items-center gap-3">
          <h2 className="text-[17px] font-bold text-gray-900 flex items-center gap-2">
            <Clock className="w-[18px] h-[18px] text-gray-400" />
            Recent Activity
          </h2>
          {newCount > 0 && (
            <span className="flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 text-blue-600 text-[11px] font-bold rounded-full">
              <Sparkles className="w-3 h-3" />
              {newCount} new
            </span>
          )}
        </div>
        
        <Link 
          to="/university/dashboard/activity"
          className="text-sm font-semibold text-primary-600 hover:text-primary-800 flex items-center gap-1 transition-colors group"
        >
          View All
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Scrollable Content Area */}
      {/* Sleek scrollbar implementation directly inside the container */}
      <div className="flex-1 overflow-y-auto p-6 bg-white [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
        <AnimatePresence>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ x: 4 }}
                // Left border colored exactly like the screenshot
                className={`relative flex items-start gap-4 p-4.5 rounded-2xl border border-gray-100 border-l-[4px] ${activity.borderColor} bg-white shadow-sm hover:shadow-md transition-all cursor-pointer group`}
              >
                {/* Floating "New" dot indicator */}
                {activity.isNew && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -left-[6px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white box-content shadow-sm"
                  />
                )}

                {/* Soft circular icon */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${activity.bg}`}>
                  <activity.icon className="w-[18px] h-[18px]" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[14px] font-bold ${activity.color}`}>
                      {activity.title}
                    </span>
                    {activity.isNew && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded font-bold uppercase tracking-wider">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors line-clamp-2 pr-4">
                    {activity.message}
                  </p>
                  <p className="text-[12px] font-medium text-gray-400 mt-2">
                    {activity.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}