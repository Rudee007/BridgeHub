import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Briefcase,
  Users,
  GraduationCap,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Loader2,
  AlertCircle,
} from "lucide-react";

// ✅ REMOVED: Sidebar & Navbar imports (They are already in CompanyLayout)

import { CompanyOnboardingModal } from "@/page/onboarding/CompanyOnboardingModal"; // Check path consistency
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProfileBanner } from "@/components/dashboard/ProfileBanner";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { QuickActionCard } from "@/components/dashboard/QuickActionCard";
import { ActivityItem } from "@/components/dashboard/ActivityItem";
import { JobCard } from "@/components/dashboard/JobCard";
import { ProjectActivityChart } from "@/components/charts/ProjectActivityChart";
import { ApplicationFunnelChart } from "@/components/charts/ApplicationFunnelChart";
import { UniversityPartnersChart } from "@/components/charts/UniversityPartnersChart";

import {
  mockMetrics,
  mockActivities,
  mockJobs,
  projectActivityChartData,
  applicationFunnelData,
  universityPartnersChartData,
  partnershipStats,
  initializeCompanyData,
} from "@/data/dashboardData";
import type { CompanyData } from "@/types/dashboard.types";

export const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [showReminderBanner, setShowReminderBanner] = useState(false);

  useEffect(() => {
    const initData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const data = initializeCompanyData();
        setCompanyData(data);

        if (!data.profileComplete) {
          const dismissed = localStorage.getItem("onboardingDismissed");
          if (!dismissed) {
            setTimeout(() => setShowOnboardingModal(true), 1000);
          } else {
            setShowReminderBanner(true);
          }
        }
      } catch (error) {
        console.error("❌ Error loading dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initData();
  }, []);

  const handleOnboardingComplete = (data: any) => {
    const updatedData = {
      ...companyData,
      ...data,
      profileComplete: true,
      updatedAt: new Date().toISOString(),
    };
    
    // Save and notify Layout to update Sidebar instantly
    localStorage.setItem("companyData", JSON.stringify(updatedData));
    window.dispatchEvent(new Event("companyDataUpdated"));
    
    setCompanyData(updatedData);
    setShowOnboardingModal(false);
    setShowReminderBanner(false);
    localStorage.removeItem("onboardingDismissed");
  };

  const handleOnboardingDismiss = () => {
    setShowOnboardingModal(false);
    localStorage.setItem("onboardingDismissed", "true");
    setShowReminderBanner(true);
  };

  const handleCompleteProfileClick = () => {
    setShowReminderBanner(false);
    setShowOnboardingModal(true);
  };

  const calculateProgress = (): number => {
    if (!companyData) return 0;
    if (companyData.profileComplete) return 100;
    let completed = 0;
    const fields = ["companyName", "industry", "location", "phoneNumber", "description", "logoUrl"];
    fields.forEach((field) => {
      if (companyData[field as keyof CompanyData]) completed++;
    });
    return Math.round((completed / fields.length) * 100);
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
      </div>
    );
  }

  if (!companyData) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-rose-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Dashboard</h2>
          <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-lg">Refresh</button>
        </div>
      </div>
    );
  }

  // ✅ FIXED RETURN: No Sidebar/Navbar wrapper. Just the dashboard content.
  return (
    <div className="space-y-8 pb-10">
      
      {/* Onboarding Modal */}
      <AnimatePresence>
        {showOnboardingModal && (
          <CompanyOnboardingModal
            onComplete={handleOnboardingComplete}
            onDismiss={handleOnboardingDismiss}
            initialData={companyData}
          />
        )}
      </AnimatePresence>

      {/* Profile Completion Banner */}
      <AnimatePresence>
        <ProfileBanner
          show={showReminderBanner && !companyData.profileComplete}
          progress={calculateProgress()}
          onComplete={handleCompleteProfileClick}
          onDismiss={() => setShowReminderBanner(false)}
        />
      </AnimatePresence>

      {/* Dashboard Header */}
      <DashboardHeader companyName={companyData.companyName} />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {mockMetrics.map((metric, index) => (
          <MetricCard key={metric.id} metric={metric} index={index} />
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4 tracking-tight">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard
            icon={Plus}
            title="Post Project"
            description="Create a new student project"
            onClick={() => navigate("/company/projects/new")}
            primary
          />
          <QuickActionCard
            icon={Briefcase}
            title="Post Job"
            description="Create a job listing"
            onClick={() => navigate("/company/jobs/new")}
            color="green"
          />
          <QuickActionCard
            icon={Users}
            title="Browse Talent"
            description="Discover top students"
            onClick={() => navigate("/company/talent-pool")}
            color="secondary"
          />
          <QuickActionCard
            icon={GraduationCap}
            title="Universities"
            description="Partner with institutions"
            onClick={() => navigate("/company/universities")}
            color="accent"
          />
        </div>
      </div>

      {/* Analytics Section */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gray-100 rounded-lg">
              <TrendingUp className="h-4 w-4 text-gray-700" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Analytics Overview</h2>
          </div>
          <button 
            onClick={() => navigate("/company/analytics")}
            className="text-sm font-semibold text-gray-700 hover:text-gray-900 flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            View Full Analytics <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProjectActivityChart data={projectActivityChartData} />
          <ApplicationFunnelChart data={applicationFunnelData} />
          <UniversityPartnersChart data={universityPartnersChartData} stats={partnershipStats} />
        </div>
      </div>

      {/* Bottom Grid: Activity & Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-blue-50 rounded-lg">
                <Clock className="h-3.5 w-3.5 text-primary-600" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">Recent Activity</h3>
            </div>
            <button className="text-sm font-semibold text-gray-700 hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-colors">View All</button>
          </div>
          <div className="space-y-3">
            {mockActivities.map((activity, index) => (
              <ActivityItem key={activity.id} activity={activity} index={index} />
            ))}
          </div>
        </div>

        {/* Active Jobs */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold text-gray-900">Active Jobs</h3>
            <button onClick={() => navigate("/company/jobs/new")} className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-3">
            {mockJobs.slice(0, 4).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};