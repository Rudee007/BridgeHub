import { motion } from "framer-motion";
import { UserCheck, ClipboardCheck, Briefcase, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    icon: UserCheck,
    label: "Verify Students",
    description: "Review & approve student enrollment",
    path: "/university/dashboard/verify",
    bgClass: "bg-primary-600 hover:bg-primary-700", // Solid Blue
    isPrimary: true,
    count: "38 pending",
  },
  {
    icon: ClipboardCheck,
    label: "Endorse Proposals",
    description: "Stamp proposals before they reach companies",
    path: "/university/dashboard/endorse",
    bgClass: "bg-secondary-600 hover:bg-secondary-700", // Solid Purple
    isPrimary: true,
    count: "12 awaiting",
  },
  {
    icon: Briefcase,
    label: "Browse Projects",
    description: "Explore open company projects",
    path: "/university/dashboard/projects",
    bgClass: "bg-card hover:bg-muted/50 border border-border", // White/Outline
    isPrimary: false,
    count: null,
  },
  {
    icon: BookOpen,
    label: "Placements Report",
    description: "View semester placement analytics",
    path: "/university/dashboard/placements",
    bgClass: "bg-card hover:bg-muted/50 border border-border", // White/Outline
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
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
              <div className={`relative h-full rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex flex-col ${action.bgClass}`}>
                
                <div className="flex items-start justify-between mb-8">
                  <div className={`p-3 rounded-xl ${action.isPrimary ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground group-hover:text-primary-600 transition-colors'}`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  {action.count && (
                    <span className="bg-white/20 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md tracking-wide">
                      {action.count}
                    </span>
                  )}
                </div>

                <p className={`font-bold text-base ${action.isPrimary ? 'text-white' : 'text-foreground'}`}>
                  {action.label}
                </p>
                <p className={`text-sm mt-1 flex-1 ${action.isPrimary ? 'text-white/80' : 'text-muted-foreground'}`}>
                  {action.description}
                </p>
                <ArrowRight className={`w-4 h-4 mt-4 transition-transform group-hover:translate-x-1 ${action.isPrimary ? 'text-white/70' : 'text-muted-foreground'}`} />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}