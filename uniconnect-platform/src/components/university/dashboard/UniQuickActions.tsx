import { motion } from "framer-motion";
import { UserCheck, ClipboardCheck, Briefcase, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    icon: UserCheck,
    label: "Verify Students",
    description: "Review & approve student enrollment requests for the current academic session",
    path: "/university/verify",
    // Bright, solid primary blue
    bgClass: "bg-blue-600 hover:bg-blue-700 text-white shadow-md border-transparent",
    iconBg: "bg-white/20 text-white",
    badgeClass: "bg-white/20 text-white border border-white/10",
    isPrimary: true,
    count: "38 pending",
  },
  {
    icon: ClipboardCheck,
    label: "Endorse Proposals",
    description: "Stamp project proposals before they reach partner companies",
    path: "/university/endorse",
    // Bright, solid secondary purple
    bgClass: "bg-purple-600 hover:bg-purple-700 text-white shadow-md border-transparent",
    iconBg: "bg-white/20 text-white",
    badgeClass: "bg-white/20 text-white border border-white/10",
    isPrimary: true,
    count: "12 awaiting",
  },
  {
    icon: Briefcase,
    label: "Browse Projects",
    description: "Explore open company projects and live industry internships",
    path: "/university/projects",
    // Clean white with soft, light border
    bgClass: "bg-white hover:bg-gray-50 border border-gray-200 shadow-sm text-gray-900", 
    iconBg: "bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors",
    badgeClass: "",
    isPrimary: false,
    count: null,
  },
  {
    icon: BookOpen,
    label: "Placements Report",
    description: "View semester placement analytics, hiring trends, and packages",
    path: "/university/placements",
    // Clean white with soft, light border
    bgClass: "bg-white hover:bg-gray-50 border border-gray-200 shadow-sm text-gray-900", 
    iconBg: "bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors",
    badgeClass: "",
    isPrimary: false,
    count: null,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export function UniQuickActions() {
  return (
    <div className="space-y-4">
      <h3 className="text-[15px] sm:text-[16px] font-bold text-gray-900">Quick Actions</h3>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
      >
        {actions.map((action, i) => (
          <motion.div 
            key={action.label} 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="h-full"
          >
            <Link to={action.path} className="block group h-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-[20px]">
              {/* Added min-h to maintain proper card proportions on all screen sizes */}
              <div className={`relative h-full min-h-[160px] sm:min-h-[180px] rounded-[20px] p-5 sm:p-6 transition-all duration-300 flex flex-col ${action.bgClass}`}>
                
                {/* Top Section: Circular Icon & Pill Badge */}
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${action.iconBg}`}>
                    <action.icon className="w-5 h-5 sm:w-5 sm:h-5" />
                  </div>
                  
                  {action.count && (
                    <span className={`text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full tracking-wide shadow-sm whitespace-nowrap shrink-0 ml-2 ${action.badgeClass}`}>
                      {action.count}
                    </span>
                  )}
                </div>

                {/* Middle Section: Text with Line Clamping for Mobile */}
                <div className="flex-1 flex flex-col justify-end">
                  <p className="font-extrabold text-[16px] sm:text-[17px] tracking-tight mb-1 leading-tight">
                    {action.label}
                  </p>
                  <p 
                    className={`text-[12px] sm:text-[13px] font-medium leading-relaxed ${
                      action.isPrimary ? 'text-white/80' : 'text-gray-500'
                    } line-clamp-1 sm:line-clamp-2`} // ✅ Truncates text on mobile, allows 2 lines on desktop
                    title={action.description} // Shows full text on hover just in case it's clamped
                  >
                    {action.description}
                  </p>
                </div>

                {/* Bottom Section: Left-aligned Arrow */}
                <div className="mt-4 sm:mt-5 flex items-center">
                  <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1.5 ${
                    action.isPrimary ? 'text-white/90' : 'text-gray-400 group-hover:text-blue-600'
                  }`} />
                </div>
                
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}