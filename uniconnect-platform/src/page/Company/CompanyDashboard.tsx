// page/Company/CompanyDashboard.tsx
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
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

// Components
import { Sidebar } from "@/components/dashboard/Sidebar";
import { CompanyOnboardingModal } from "@/page/onboarding/CompanyOnboardingModal";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProfileBanner } from "@/components/dashboard/ProfileBanner";
import { ProfileDropdown } from "@/components/dashboard/ProfileDropdown";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { QuickActionCard } from "@/components/dashboard/QuickActionCard";
import { ActivityItem } from "@/components/dashboard/ActivityItem";
import { JobCard } from "@/components/dashboard/JobCard";
import { ProjectActivityChart } from "@/components/charts/ProjectActivityChart";
import { ApplicationFunnelChart } from "@/components/charts/ApplicationFunnelChart";
import { UniversityPartnersChart } from "@/components/charts/UniversityPartnersChart";

// Data & Types
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
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [showReminderBanner, setShowReminderBanner] = useState(false);

  // Initialize data on mount
  useEffect(() => {
    console.log("🚀 CompanyDashboard mounting...");

    const initData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const data = initializeCompanyData();
        console.log("📦 Loaded company data:", data);
        setCompanyData(data);

        if (!data.profileComplete) {
          const dismissed = localStorage.getItem("onboardingDismissed");
          if (!dismissed) {
            console.log("🎯 Profile incomplete, showing onboarding modal...");
            setTimeout(() => setShowOnboardingModal(true), 1000);
          } else {
            console.log("⚠️ Profile incomplete but onboarding dismissed, showing banner");
            setShowReminderBanner(true);
          }
        } else {
          console.log("✅ Profile is complete!");
        }
      } catch (error) {
        console.error("❌ Error loading dashboard data:", error);
      } finally {
        setIsLoading(false);
        console.log("✅ Dashboard data loaded successfully");
      }
    };

    initData();
  }, []);

  const handleLogout = () => {
    console.log("👋 Logging out...");
    localStorage.removeItem("companyData");
    localStorage.removeItem("onboardingDismissed");
    navigate("/");
  };

  const handleOnboardingComplete = (data: any) => {
    console.log("✅ Onboarding completed with data:", data);
    const updatedData = {
      ...companyData,
      ...data,
      profileComplete: true,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem("companyData", JSON.stringify(updatedData));
    setCompanyData(updatedData);
    setShowOnboardingModal(false);
    setShowReminderBanner(false);
    localStorage.removeItem("onboardingDismissed");
  };

  const handleOnboardingDismiss = () => {
    console.log("⏭️ Onboarding dismissed");
    setShowOnboardingModal(false);
    localStorage.setItem("onboardingDismissed", "true");
    setShowReminderBanner(true);
  };

  const handleCompleteProfileClick = () => {
    console.log("🎯 Opening profile completion modal");
    setShowReminderBanner(false);
    setShowOnboardingModal(true);
  };

  const handleDismissBanner = () => {
    console.log("❌ Banner dismissed");
    setShowReminderBanner(false);
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

  const profileProgress = calculateProgress();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-700 font-semibold text-lg">Loading your dashboard...</p>
          <p className="text-gray-500 text-sm mt-2">Please wait while we prepare everything</p>
        </div>
      </div>
    );
  }

  // Error state
  if (!companyData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-rose-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Dashboard</h2>
          <p className="text-gray-600 mb-6">
            We couldn't load your company data. Please try refreshing the page or contact support.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* Sidebar */}
      <Sidebar companyName={companyData.companyName} logoUrl={companyData.logoUrl} />

      {/* Main Content */}
      <div className="lg:pl-[280px]">
        {/* Top Navigation */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="w-12 lg:hidden" />

              {/* Search Bar */}
              <div className="hidden md:flex flex-1 max-w-xl">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects, students, universities..."
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-gray-50 font-medium text-gray-700 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-3">
                <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
                </button>

                <ProfileDropdown
                  show={showProfileDropdown}
                  companyName={companyData.companyName}
                  industry={companyData.industry}
                  logoUrl={companyData.logoUrl}
                  profileComplete={companyData.profileComplete}
                  onToggle={() => setShowProfileDropdown(!showProfileDropdown)}
                  onCompleteProfile={handleCompleteProfileClick}
                  onSettings={() => navigate("/settings")}
                  onLogout={handleLogout}
                />
              </div>
            </div>
          </div>
        </nav>

        {/* Profile Completion Banner */}
        <AnimatePresence>
          <ProfileBanner
            show={showReminderBanner && !companyData.profileComplete}
            progress={profileProgress}
            onComplete={handleCompleteProfileClick}
            onDismiss={handleDismissBanner}
          />
        </AnimatePresence>

        {/* Dashboard Content */}
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-8">
          {/* Header */}
          <DashboardHeader companyName={companyData.companyName} />

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {mockMetrics.map((metric, index) => (
              <MetricCard key={metric.id} metric={metric} index={index} />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 tracking-tight">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <QuickActionCard
                icon={Plus}
                title="Post Project"
                description="Create a new student project"
                onClick={() => navigate("/projects/new")}
                primary
              />
              <QuickActionCard
                icon={Briefcase}
                title="Post Job"
                description="Create a job listing"
                onClick={() => navigate("/jobs/new")}
                color="green"
              />
              <QuickActionCard
                icon={Users}
                title="Browse Talent Pool"
                description="Discover top students"
                onClick={() => navigate("/talent-pool")}
                color="secondary"
              />
              <QuickActionCard
                icon={GraduationCap}
                title="Find Universities"
                description="Partner with institutions"
                onClick={() => navigate("/universities")}
                color="accent"
              />
            </div>
          </div>

          {/* Analytics Overview */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-gray-700" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">Analytics Overview</h2>
              </div>
              <button className="text-sm font-semibold text-gray-700 hover:text-gray-900 flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                View Full Analytics
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ProjectActivityChart data={projectActivityChartData} />
              <ApplicationFunnelChart data={applicationFunnelData} />
              <UniversityPartnersChart data={universityPartnersChartData} stats={partnershipStats} />
            </div>
          </div>

          {/* Bottom Section: Activity & Jobs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-blue-50 rounded-lg">
                    <Clock className="h-3.5 w-3.5 text-primary-600" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">Recent Activity</h3>
                  {mockActivities.filter((a) => a.isNew).length > 0 && (
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded-md flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-600 animate-pulse" />
                      {mockActivities.filter((a) => a.isNew).length} new
                    </span>
                  )}
                </div>
                <button className="text-sm font-semibold text-gray-700 hover:text-gray-900 flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-3">
                {mockActivities.map((activity, index) => (
                  <ActivityItem key={activity.id} activity={activity} index={index} />
                ))}
              </div>
            </div>

            {/* Active Jobs Quick View */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-bold text-gray-900">Active Jobs</h3>
                <button
                  onClick={() => navigate("/jobs/new")}
                  className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
                >
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
      </div>
    </div>
  );
};

export default CompanyDashboard;
