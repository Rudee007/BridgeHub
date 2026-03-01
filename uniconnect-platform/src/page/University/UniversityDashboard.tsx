import { useState, useEffect } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import { UniversityLayout } from "@/components/university/UniversityLayout";

// Import components...
import { UniWelcomeHeader } from "@/components/university/dashboard/UniWelcomeHeader";
import { UniKPICards } from "@/components/university/dashboard/UniKPICards";
import { UniQuickActions } from "@/components/university/dashboard/UniQuickActions";
import { VerificationQueue } from "@/components/university/dashboard/VerificationQueue";
import { EndorsementQueue } from "@/components/university/dashboard/EndorsementQueue";
import { UniActivityFeed } from "@/components/university/dashboard/UniActivityFeed";
import { PlacementAnalytics } from "@/components/university/dashboard/PlacementAnalytics";
import { UniOnboardingModal } from "@/components/university/dashboard/UniOnboardingModal";

const pageVariants: Variants = {
  pageHidden: { opacity: 0 },
  pageVisible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.12 } },
};

const sectionVariants: Variants = {
  pageHidden: { opacity: 0, y: 20 },
  pageVisible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

export default function UniversityDashboard() {
  const universityName = "IIT Bombay";
  // Default to false so it doesn't flash on screen
  const [showOnboarding, setShowOnboarding] = useState(false);

  // ✅ Only show the modal if they haven't completed it before
  useEffect(() => {
    const isProfileComplete = localStorage.getItem("uni_profile_completed");
    if (!isProfileComplete) {
      setShowOnboarding(true);
    }
  }, []);

  return (
    <UniversityLayout universityName={universityName}>
      <motion.div variants={pageVariants} initial="pageHidden" animate="pageVisible" className="max-w-[1400px] mx-auto space-y-8">
        <motion.div variants={sectionVariants}><UniWelcomeHeader universityName={universityName} /></motion.div>
        <motion.div variants={sectionVariants}><UniKPICards /></motion.div>
        <motion.div variants={sectionVariants}><UniQuickActions /></motion.div>
        <motion.div variants={sectionVariants}><VerificationQueue /></motion.div>
        <motion.div variants={sectionVariants}><EndorsementQueue /></motion.div>

        <motion.div variants={sectionVariants} className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          <div className="xl:col-span-2 w-full"><UniActivityFeed /></div>
          <div className="w-full"><PlacementAnalytics /></div>
        </motion.div>
      </motion.div>

      {/* Onboarding Modal Overlay */}
      <AnimatePresence>
        {showOnboarding && (
          <UniOnboardingModal onClose={() => setShowOnboarding(false)} />
        )}
      </AnimatePresence>
    </UniversityLayout>
  );
}