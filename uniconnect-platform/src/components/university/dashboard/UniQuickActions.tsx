import { motion } from "framer-motion";
import { UserCheck, ClipboardCheck, Briefcase, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    icon: UserCheck,
    label: "Verify Students",
    description: "Review & approve student enrollment",
    path: "/university/dashboard/verify",
    // Bright, solid primary blue
    bgClass: "bg-primary-500 hover:bg-primary-600 text-white shadow-sm border border-transparent",
    iconBg: "bg-white/20 text-white",
    badgeClass: "bg-white/20 text-white",
    isPrimary: true,
    count: "38 pending",
  },
  {
    icon: ClipboardCheck,
    label: "Endorse Proposals",
    description: "Stamp proposals before they reach companies",
    path: "/university/dashboard/endorse",
    // Bright, solid secondary purple
    bgClass: "bg-secondary-500 hover:bg-secondary-600 text-white shadow-sm border border-transparent",
    iconBg: "bg-white/20 text-white",
    badgeClass: "bg-white/20 text-white",
    isPrimary: true,
    count: "12 awaiting",
  },
  {
    icon: Briefcase,
    label: "Browse Projects",
    description: "Explore open company projects",
    path: "/university/dashboard/projects",
    // Clean white with soft, light border
    bgClass: "bg-card hover:bg-gray-50/80 border border-gray-200 shadow-sm text-foreground", 
    iconBg: "bg-gray-100 text-gray-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors",
    badgeClass: "",
    isPrimary: false,
    count: null,
  },
  {
    icon: BookOpen,
    label: "Placements Report",
    description: "View semester placement analytics",
    path: "/university/dashboard/placements",
    // Clean white with soft, light border
    bgClass: "bg-card hover:bg-gray-50/80 border border-gray-200 shadow-sm text-foreground", 
    iconBg: "bg-gray-100 text-gray-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors",
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
      <h3 className="text-base font-bold text-foreground">Quick Actions</h3>
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
            <Link to={action.path} className="block group h-full">
              <div className={`relative h-full rounded-[20px] p-6 transition-all duration-300 flex flex-col ${action.bgClass}`}>
                
                {/* Top Section: Circular Icon & Pill Badge */}
                <div className="flex items-start justify-between mb-6">
                  {/* Changed to rounded-full for the circular look in the design */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${action.iconBg}`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  {action.count && (
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full tracking-wide shadow-sm ${action.badgeClass}`}>
                      {action.count}
                    </span>
                  )}
                </div>

                {/* Middle Section: Text */}
                <div className="flex-1">
                  <p className="font-bold text-[17px] tracking-tight mb-1">
                    {action.label}
                  </p>
                  <p className={`text-sm leading-snug ${action.isPrimary ? 'text-white/80' : 'text-muted-foreground'}`}>
                    {action.description}
                  </p>
                </div>

                {/* Bottom Section: Left-aligned Arrow */}
                <div className="mt-6">
                  <ArrowRight className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${action.isPrimary ? 'text-white/80' : 'text-muted-foreground group-hover:text-primary-600'}`} />
                </div>
                
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}