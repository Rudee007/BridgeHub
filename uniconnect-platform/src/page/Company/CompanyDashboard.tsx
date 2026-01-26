// page/Company/CompanyDashboard.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Users,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Clock,
  CheckCircle2,
  FileText,
  UserPlus,
  Sparkles,
  ArrowUpRight,
  Calendar,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  Plus,
  Search,
  BarChart3,
  Target,
  Award,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";

// ==================== INTERFACES ====================
interface CompanyData {
  websiteUrl: string;
  companyName: string;
  industry: string;
  location: string;
  phoneNumber: string;
  description: string;
  logoUrl: string;
  email: string;
  profileComplete: boolean;
}

interface Activity {
  id: number;
  type: string;
  title: string;
  description: string;
  time: string;
  icon: React.ElementType;
  color: string;
}

interface MetricCardProps {
  title: string;
  value: number;
  suffix?: string;
  icon: React.ElementType;
  gradient: string;
  bgGradient: string;
  trend: string;
  trendUp: boolean;
  subtitle?: string;
  delay: number;
}

interface FunnelStageProps {
  label: string;
  value: number;
  percentage: number;
  color: string;
}

// ==================== MOCK DATA ====================
const mockMetrics = {
  activeProjects: 12,
  totalApplications: 156,
  studentsHired: 8,
  universityPartnerships: 5,
  projectsCompleted: 23,
  growthRate: 34,
};

const mockActivities: Activity[] = [
  {
    id: 1,
    type: "application",
    title: "New application received",
    description: 'Rahul Kumar applied for "AI Dashboard Development"',
    time: "5 mins ago",
    icon: UserPlus,
    color: "blue",
  },
  {
    id: 2,
    type: "completed",
    title: "Project completed",
    description: "Mobile App UI Design project marked as completed",
    time: "2 hours ago",
    icon: CheckCircle2,
    color: "green",
  },
  {
    id: 3,
    type: "partnership",
    title: "University partnership",
    description: "IIT Delhi accepted your partnership request",
    time: "5 hours ago",
    icon: GraduationCap,
    color: "purple",
  },
  {
    id: 4,
    type: "application",
    title: "New application received",
    description: 'Priya Sharma applied for "Data Analysis Internship"',
    time: "1 day ago",
    icon: UserPlus,
    color: "blue",
  },
  {
    id: 5,
    type: "project",
    title: "Project posted",
    description: "Full Stack Development Project went live",
    time: "2 days ago",
    icon: FileText,
    color: "pink",
  },
];

const mockChartData = [
  { day: "Mon", applications: 18 },
  { day: "Tue", applications: 24 },
  { day: "Wed", applications: 15 },
  { day: "Thu", applications: 32 },
  { day: "Fri", applications: 28 },
  { day: "Sat", applications: 21 },
  { day: "Sun", applications: 18 },
];

// ==================== MAIN COMPONENT ====================
export const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState<"7d" | "30d">("7d");

  // Load company data
  useEffect(() => {
    const stored = localStorage.getItem("companyData");
    if (stored) {
      setCompanyData(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("companyData");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ==================== SIDEBAR ==================== */}
      <Sidebar companyName={companyData?.companyName} logoUrl={companyData?.logoUrl} />

      {/* ==================== MAIN CONTENT WITH SIDEBAR OFFSET ==================== */}
      <div className="lg:pl-[280px]">
        {/* ==================== TOP NAVIGATION BAR ==================== */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left Spacer for mobile menu button */}
              <div className="w-12 lg:hidden" />

              {/* Search Bar - Centered */}
              <div className="hidden md:flex flex-1 max-w-xl mx-auto">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects, students, universities..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-4">
                {/* Notifications */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-pink-600 rounded-full" />
                </motion.button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {companyData?.logoUrl ? (
                      <img
                        src={companyData.logoUrl}
                        alt={companyData.companyName}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-white" />
                      </div>
                    )}
                    <ChevronDown className="h-4 w-4 text-gray-600" />
                  </button>

                  <AnimatePresence>
                    {showProfileDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                      >
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="font-semibold text-gray-900">
                            {companyData?.companyName || "Company"}
                          </p>
                          <p className="text-sm text-gray-600">
                            {companyData?.industry || "Industry"}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            navigate("/settings");
                            setShowProfileDropdown(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <Settings className="h-4 w-4" />
                          Settings
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* ==================== DASHBOARD CONTENT ==================== */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Welcome back, {companyData?.companyName || "Company"} 👋
            </h1>
            <p className="text-gray-600">
              Here's what's happening with your projects and talent pipeline today.
            </p>
          </motion.div>

          {/* Quick Actions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden">
              {/* Floating orbs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-6 w-6" />
                  <h2 className="text-xl font-display font-bold">Quick Actions</h2>
                </div>
                <p className="text-white/80 mb-6 max-w-2xl">
                  Start building your talent pipeline by posting projects, exploring top
                  students, or connecting with universities.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <QuickActionButton
                    icon={Plus}
                    label="Post Project"
                    onClick={() => navigate("/projects/new")}
                    primary
                  />
                  <QuickActionButton
                    icon={Briefcase}
                    label="Post Job"
                    onClick={() => navigate("/jobs/new")}
                  />
                  <QuickActionButton
                    icon={Award}
                    label="Talent Pool"
                    onClick={() => navigate("/talent-pool")}
                  />
                  <QuickActionButton
                    icon={GraduationCap}
                    label="Universities"
                    onClick={() => navigate("/universities")}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <MetricCard
              title="Active Projects"
              value={mockMetrics.activeProjects}
              icon={FileText}
              gradient="from-blue-500 to-blue-600"
              bgGradient="from-blue-50 to-blue-100"
              trend="+12%"
              trendUp={true}
              delay={0.2}
            />
            <MetricCard
              title="Total Applications"
              value={mockMetrics.totalApplications}
              icon={Users}
              gradient="from-purple-500 to-purple-600"
              bgGradient="from-purple-50 to-purple-100"
              trend="+34%"
              trendUp={true}
              delay={0.3}
            />
            <MetricCard
              title="Students Hired"
              value={mockMetrics.studentsHired}
              icon={UserPlus}
              gradient="from-pink-500 to-pink-600"
              bgGradient="from-pink-50 to-pink-100"
              trend="+8%"
              trendUp={true}
              delay={0.4}
            />
            <MetricCard
              title="University Partners"
              value={mockMetrics.universityPartnerships}
              icon={GraduationCap}
              gradient="from-blue-600 to-purple-600"
              bgGradient="from-blue-50 to-purple-100"
              trend="+2"
              trendUp={true}
              delay={0.5}
            />
            <MetricCard
              title="Projects Completed"
              value={mockMetrics.projectsCompleted}
              icon={CheckCircle2}
              gradient="from-purple-600 to-pink-600"
              bgGradient="from-purple-50 to-pink-100"
              trend="92%"
              trendUp={true}
              subtitle="Success rate"
              delay={0.6}
            />
            <MetricCard
              title="Growth Rate"
              value={mockMetrics.growthRate}
              suffix="%"
              icon={TrendingUp}
              gradient="from-pink-600 to-rose-600"
              bgGradient="from-pink-50 to-rose-100"
              trend="This month"
              trendUp={true}
              delay={0.7}
            />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Activity Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-600" />
                    <h2 className="text-xl font-display font-bold text-gray-900">
                      Recent Activity
                    </h2>
                  </div>
                  <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {mockActivities.map((activity, index) => (
                    <ActivityCard key={activity.id} activity={activity} index={index} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Analytics Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Weekly Trends */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-gray-600" />
                    <h2 className="text-lg font-display font-bold text-gray-900">
                      Weekly Trends
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedTimeRange("7d")}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                        selectedTimeRange === "7d"
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      7D
                    </button>
                    <button
                      onClick={() => setSelectedTimeRange("30d")}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                        selectedTimeRange === "30d"
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      30D
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {mockChartData.map((data, index) => (
                    <div key={data.day}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{data.day}</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {data.applications}
                        </span>
                      </div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(data.applications / 35) * 100}%` }}
                        transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                        className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total this week</span>
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      156 applications
                    </span>
                  </div>
                </div>
              </div>

              {/* Application Funnel */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Target className="h-5 w-5 text-gray-600" />
                  <h2 className="text-lg font-display font-bold text-gray-900">
                    Application Funnel
                  </h2>
                </div>

                <div className="space-y-4">
                  <FunnelStage label="Applications" value={156} percentage={100} color="blue" />
                  <FunnelStage label="Under Review" value={89} percentage={57} color="purple" />
                  <FunnelStage label="Accepted" value={34} percentage={22} color="pink" />
                  <FunnelStage label="Hired" value={8} percentage={5} color="green" />
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Conversion rate</span>
                    <span className="text-sm font-bold text-green-600">5.1%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== SUB-COMPONENTS ====================

// Quick Action Button
interface QuickActionButtonProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  primary?: boolean;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  icon: Icon,
  label,
  onClick,
  primary = false,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`rounded-xl p-4 flex items-center gap-3 font-semibold transition-all ${
        primary
          ? "bg-white text-gray-900 hover:shadow-lg"
          : "bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          primary ? "bg-blue-100" : "bg-white/20"
        }`}
      >
        <Icon className={`h-5 w-5 ${primary ? "text-blue-600" : "text-white"}`} />
      </div>
      <span>{label}</span>
    </motion.button>
  );
};

// Metric Card
const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  suffix = "",
  icon: Icon,
  gradient,
  bgGradient,
  trend,
  trendUp,
  subtitle,
  delay,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 bg-gradient-to-br ${bgGradient} rounded-xl flex items-center justify-center`}
        >
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-full ${
            trendUp ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <TrendingUp
            className={`h-3 w-3 ${trendUp ? "text-green-600" : "text-red-600 rotate-180"}`}
          />
          <span className={`text-xs font-semibold ${trendUp ? "text-green-700" : "text-red-700"}`}>
            {trend}
          </span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-1">{title}</h3>
        <p className="text-3xl font-display font-bold text-gray-900">
          {value}
          {suffix}
        </p>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </motion.div>
  );
};

// Activity Card
const ActivityCard: React.FC<{ activity: Activity; index: number }> = ({
  activity,
  index,
}) => {
  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
    purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-100" },
    pink: { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-100" },
    green: { bg: "bg-green-50", text: "text-green-600", border: "border-green-100" },
  };

  const colors = colorMap[activity.color] || colorMap.blue;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ x: 4 }}
      className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-200"
    >
      <div
        className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0 border ${colors.border}`}
      >
        <activity.icon className={`h-5 w-5 ${colors.text}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 text-sm">{activity.title}</p>
        <p className="text-sm text-gray-600 truncate">{activity.description}</p>
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {activity.time}
        </p>
      </div>
    </motion.div>
  );
};

// Funnel Stage
const FunnelStage: React.FC<FunnelStageProps> = ({ label, value, percentage, color }) => {
  const colorMap: Record<string, string> = {
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
    pink: "from-pink-500 to-pink-600",
    green: "from-green-500 to-green-600",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold text-gray-900">{value}</span>
      </div>
      <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${colorMap[color]} rounded-full`}
        />
      </div>
      <span className="text-xs text-gray-500 mt-1 block">{percentage}%</span>
    </div>
  );
};
