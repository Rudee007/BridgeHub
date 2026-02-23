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
    color: "text-primary-600",
    bg: "bg-primary-50",
    borderColor: "border-l-primary-500",
  },
  {
    id: 2,
    type: "new_student",
    icon: UserPlus,
    title: "New Student Signup",
    message: "Ananya Krishnan registered and is awaiting enrollment verification.",
    time: "18 min ago",
    isNew: true,
    color: "text-primary-500",
    bg: "bg-primary-50",
    borderColor: "border-l-primary-400",
  },
  {
    id: 3,
    type: "proposal_endorsed",
    icon: ClipboardCheck,
    title: "Proposal Endorsed",
    message: "Priya Patel's proposal for 'E-Commerce App' was endorsed and sent to ShopEasy Inc.",
    time: "1 hour ago",
    isNew: false,
    color: "text-secondary-600",
    bg: "bg-secondary-50",
    borderColor: "border-l-secondary-500",
  },
  {
    id: 4,
    type: "student_hired",
    icon: Award,
    title: "Student Hired 🎉",
    message: "Rohan Mehta was hired by TechCorp Solutions for the AI Dashboard project.",
    time: "3 hours ago",
    isNew: false,
    color: "text-success-600",
    bg: "bg-success-50",
    borderColor: "border-l-success-500",
  },
  {
    id: 5,
    type: "company_partner",
    icon: Building2,
    title: "New Company Partner",
    message: "LogiChain Ltd. accepted the partnership request. 2 active projects available.",
    time: "Yesterday",
    isNew: false,
    color: "text-pink-600",
    bg: "bg-pink-50",
    borderColor: "border-l-pink-500",
  }
];

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.08, duration: 0.3 },
  }),
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
};

export function UniActivityFeed() {
  const newCount = activities.filter((a) => a.isNew).length;

  return (
    // ✅ Main container uses an ultra-light border (border-gray-100)
    <div className="bg-card rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="p-6 border-b border-gray-50 flex items-center justify-between shrink-0 bg-card">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            Recent Activity
          </h2>
          {newCount > 0 && (
            <span className="flex items-center gap-1 px-2 py-1 bg-primary-50 text-primary-600 text-[11px] font-bold rounded-md">
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
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide bg-card">
        <AnimatePresence>
          <div className="space-y-3.5">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ x: 4 }}
                // ✅ Changed to border-gray-50 for the lightest possible line, with a very soft ambient shadow
                className={`relative flex items-start gap-3.5 p-4 rounded-xl border border-gray-50 border-l-[3px] ${activity.borderColor} bg-white shadow-[0_2px_10px_-3px_rgba(0,0,0,0.03)] hover:shadow-md transition-all cursor-pointer group`}
              >
                {/* Floating "New" dot indicator */}
                {activity.isNew && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2 h-2 bg-primary-500 rounded-full border-2 border-white box-content"
                  />
                )}

                {/* Icon Container */}
                <div className={`p-2.5 rounded-lg ${activity.bg} shrink-0`}>
                  <activity.icon className={`w-4 h-4 ${activity.color}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-sm font-semibold ${activity.color}`}>
                      {activity.title}
                    </span>
                    {activity.isNew && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-primary-50 text-primary-600 rounded font-bold uppercase tracking-wider">
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-gray-600 leading-snug group-hover:text-primary-700 transition-colors line-clamp-2">
                    {activity.message}
                  </p>
                  <p className="text-xs font-medium text-gray-400 mt-1.5">
                    {activity.time}
                  </p>
                </div>

                {/* Hover Arrow */}
                <ArrowRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-all shrink-0 self-center group-hover:text-primary-500 group-hover:translate-x-1" />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}