import { motion, type Variants } from "framer-motion"; // ✅ Import Variants type
import { UniversityLayout } from "@/components/university/UniversityLayout";

// Import your dashboard components
import { UniWelcomeHeader } from "@/components/university/dashboard/UniWelcomeHeader";
import { UniKPICards } from "@/components/university/dashboard/UniKPICards";
import { UniQuickActions } from "@/components/university/dashboard/UniQuickActions";
import { VerificationQueue } from "@/components/university/dashboard/VerificationQueue";
import { EndorsementQueue } from "@/components/university/dashboard/EndorsementQueue";
import { UniActivityFeed } from "@/components/university/dashboard/UniActivityFeed";
import { PlacementAnalytics } from "@/components/university/dashboard/PlacementAnalytics";

// ✅ Explicitly type as Variants so TypeScript knows exactly what "spring" means
const pageVariants: Variants = {
  pageHidden: { opacity: 0 },
  pageVisible: {
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.12 },
  },
};

// ✅ Explicitly type as Variants
const sectionVariants: Variants = {
  pageHidden: { opacity: 0, y: 20 },
  pageVisible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 20 } 
  },
};

export default function UniversityDashboard() {
  const universityName = "IIT Bombay";

  return (
    <UniversityLayout universityName={universityName}>
      <motion.div
        variants={pageVariants}
        initial="pageHidden"  
        animate="pageVisible" 
        className="max-w-[1400px] mx-auto space-y-8"
      >
        {/* 1. Welcome Header */}
        <motion.div variants={sectionVariants}>
          <UniWelcomeHeader universityName={universityName} />
        </motion.div>

        {/* 2. KPI Cards */}
        <motion.div variants={sectionVariants}>
          <UniKPICards />
        </motion.div>

        {/* 3. Quick Actions */}
        <motion.div variants={sectionVariants}>
          <UniQuickActions />
        </motion.div>

        {/* 4. Verification Queue */}
        <motion.div variants={sectionVariants}>
          <VerificationQueue />
        </motion.div>

        {/* 5. Endorsement Queue */}
        <motion.div variants={sectionVariants}>
          <EndorsementQueue />
        </motion.div>

        {/* 6. Activity Feed + Placement Analytics */}
        <motion.div 
          variants={sectionVariants} 
          className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 items-start"
        >
          {/* Left Side: Recent Activity */}
          <div className="xl:col-span-2 w-full">
            <UniActivityFeed />
          </div>
          
          {/* Right Side: Analytics Chart */}
          <div className="w-full sticky top-0">
            <PlacementAnalytics />
          </div>
        </motion.div>

      </motion.div>
    </UniversityLayout>
  );
}