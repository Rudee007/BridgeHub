// pages/auth/CompanyDashboard.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  Briefcase, 
  BarChart3, 
  Settings,
  Bell,
  LogOut,
  ChevronDown,
  Search,
  Plus,
  UserPlus,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { CompanyOnboardingModal } from '@/page/onboarding/CompanyOnboardingModal';

interface User {
  fullName?: string;
  email: string;
  companyName?: string;
  industry?: string;
  location?: string;
  phoneNumber?: string;
  description?: string;
  logoUrl?: string;
  websiteUrl?: string;
  profileComplete: boolean;
}

export const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [showReminderBanner, setShowReminderBanner] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    const parsedUser: User = JSON.parse(userData);
    setUser(parsedUser);

    // ✅ Show onboarding modal if profile incomplete
    if (!parsedUser.profileComplete) {
      const dismissed = localStorage.getItem('onboardingDismissed');
      
      if (!dismissed) {
        // First time - show modal after 1 second
        setTimeout(() => setShowOnboardingModal(true), 1000);
      } else {
        // User dismissed before - show subtle banner
        setShowReminderBanner(true);
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('onboardingDismissed');
    navigate('/');
  };

  const handleOnboardingComplete = (data: any) => {
    // Update user data
    const updatedUser = { ...user, ...data, profileComplete: true };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setShowOnboardingModal(false);
    setShowReminderBanner(false);
    localStorage.removeItem('onboardingDismissed');
  };

  const handleOnboardingDismiss = () => {
    setShowOnboardingModal(false);
    localStorage.setItem('onboardingDismissed', 'true');
    setShowReminderBanner(true);
  };

  const handleCompleteProfileClick = () => {
    setShowReminderBanner(false);
    setShowOnboardingModal(true);
  };

  const handleDismissBanner = () => {
    setShowReminderBanner(false);
  };

  // Calculate profile progress
  const calculateProgress = () => {
    if (!user) return 0;
    if (user.profileComplete) return 100;
    
    let completed = 0;
    const fields = ['companyName', 'industry', 'location', 'phoneNumber', 'description', 'logoUrl'];
    fields.forEach(field => {
      if (user[field as keyof User]) completed++;
    });
    
    return Math.round((completed / fields.length) * 100);
  };

  const profileProgress = calculateProgress();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* ==================== ONBOARDING MODAL ==================== */}
      <AnimatePresence>
        {showOnboardingModal && (
          <CompanyOnboardingModal
            onComplete={handleOnboardingComplete}
            onDismiss={handleOnboardingDismiss}
            initialData={user}
          />
        )}
      </AnimatePresence>

      {/* ==================== TOP NAVIGATION ==================== */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="text-xl font-bold text-gray-900">BridgeHub</span>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search candidates, jobs..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                           focus:ring-2 focus:ring-primary-200 focus:border-primary-500 
                           outline-none transition-all"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  {user.logoUrl ? (
                    <img 
                      src={user.logoUrl} 
                      alt="Company" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user.fullName?.[0] || user.email[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {user.fullName || 'User'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user.companyName || 'Company'}
                    </p>
                  </div>
                  <ChevronDown size={16} className="text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                              transition-all duration-200 z-50">
                  <div className="py-2">
                    <button 
                      onClick={() => navigate('/settings')}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 
                               flex items-center gap-2 transition-colors"
                    >
                      <Settings size={16} />
                      Settings
                    </button>
                    {!user.profileComplete && (
                      <button 
                        onClick={handleCompleteProfileClick}
                        className="w-full px-4 py-2 text-left text-sm text-amber-600 hover:bg-amber-50 
                                 flex items-center gap-2 transition-colors"
                      >
                        <AlertCircle size={16} />
                        Complete Profile
                      </button>
                    )}
                    <hr className="my-2 border-gray-100" />
                    <button 
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 
                               flex items-center gap-2 transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ==================== PROFILE COMPLETION BANNER ==================== */}
      <AnimatePresence>
        {showReminderBanner && !user.profileComplete && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Complete your profile to unlock all features
                    </p>
                    <p className="text-xs text-gray-600">
                      Add company details to attract top talent
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-3">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${profileProgress}%` }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-700">
                      {profileProgress}%
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCompleteProfileClick}
                    className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 
                             text-white text-sm font-semibold rounded-lg 
                             hover:shadow-lg transition-all"
                  >
                    Complete Now
                  {/* </button> */}
                  </motion.button>

                  <button
                    onClick={handleDismissBanner}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.fullName || 'there'}! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your recruitment today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<Users className="w-6 h-6" />}
            label="Active Candidates"
            value="142"
            change="+12%"
            positive
            gradient="from-primary-500 to-primary-600"
          />
          <StatCard
            icon={<Briefcase className="w-6 h-6" />}
            label="Open Positions"
            value="8"
            change="+2"
            positive
            gradient="from-secondary-500 to-secondary-600"
          />
          <StatCard
            icon={<UserPlus className="w-6 h-6" />}
            label="New Applications"
            value="23"
            change="+8%"
            positive
            gradient="from-pink-500 to-pink-600"
          />
          <StatCard
            icon={<Clock className="w-6 h-6" />}
            label="Pending Reviews"
            value="15"
            change="-3"
            positive={false}
            gradient="from-rose-500 to-rose-600"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <QuickActionCard
            icon={<Plus className="w-6 h-6" />}
            title="Post New Job"
            description="Create and publish a new job posting"
            onClick={() => navigate('/jobs/new')}
          />
          <QuickActionCard
            icon={<Search className="w-6 h-6" />}
            title="Search Candidates"
            description="Find talent from top universities"
            onClick={() => navigate('/candidates')}
          />
          <QuickActionCard
            icon={<BarChart3 className="w-6 h-6" />}
            title="View Analytics"
            description="Track your recruitment metrics"
            onClick={() => navigate('/analytics')}
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            <ActivityItem
              type="application"
              title="New application received"
              description="Sarah Johnson applied for Full Stack Developer"
              time="2 hours ago"
            />
            <ActivityItem
              type="interview"
              title="Interview scheduled"
              description="Video call with Michael Chen tomorrow at 2 PM"
              time="5 hours ago"
            />
            <ActivityItem
              type="shortlist"
              title="Candidate shortlisted"
              description="Emily Rodriguez moved to final round"
              time="1 day ago"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== SUB-COMPONENTS ====================
// (StatCard, QuickActionCard, ActivityItem remain the same as before)

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  positive: boolean;
  gradient: string;
}

const StatCard = ({ icon, label, value, change, positive, gradient }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
    transition={{ duration: 0.2 }}
    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 bg-gradient-to-br ${gradient} rounded-lg text-white`}>
        {icon}
      </div>
      <span className={`text-sm font-semibold ${positive ? 'text-green-600' : 'text-red-600'}`}>
        {change}
      </span>
    </div>
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </motion.div>
);

interface QuickActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const QuickActionCard = ({ icon, title, description, onClick }: QuickActionCardProps) => (
  <motion.button
    whileHover={{ y: -4 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-left 
             hover:border-primary-300 hover:shadow-md transition-all group"
  >
    <div className="flex items-start gap-4">
      <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg text-white 
                    group-hover:shadow-glow-primary transition-all">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </motion.button>
);

interface ActivityItemProps {
  type: 'application' | 'interview' | 'shortlist';
  title: string;
  description: string;
  time: string;
}

const ActivityItem = ({ type, title, description, time }: ActivityItemProps) => {
  const getIconConfig = () => {
    switch (type) {
      case 'application':
        return { 
          icon: <UserPlus className="w-5 h-5" />, 
          bg: 'bg-blue-50', 
          color: 'text-blue-600' 
        };
      case 'interview':
        return { 
          icon: <Clock className="w-5 h-5" />, 
          bg: 'bg-purple-50', 
          color: 'text-purple-600' 
        };
      case 'shortlist':
        return { 
          icon: <CheckCircle2 className="w-5 h-5" />, 
          bg: 'bg-green-50', 
          color: 'text-green-600' 
        };
    }
  };

  const config = getIconConfig();

  return (
    <div className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0 
                  hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors">
      <div className={`p-2 ${config.bg} rounded-lg ${config.color}`}>
        {config.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600 truncate">{description}</p>
      </div>
      <span className="text-xs text-gray-500 whitespace-nowrap">{time}</span>
    </div>
  );
};
