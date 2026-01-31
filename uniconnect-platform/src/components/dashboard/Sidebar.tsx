// components/dashboard/Sidebar.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Building2,
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  GraduationCap,
  Award,
  Inbox,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  Menu
} from 'lucide-react';

interface SidebarProps {
  companyName?: string;
  logoUrl?: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  badge?: number;
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard'
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: FolderKanban,
    path: '/projects',
    badge: 12
  },
  {
    id: 'jobs',
    label: 'Jobs',
    icon: Briefcase,
    path: '/jobs',
    badge: 8
  },
  {
    id: 'universities',
    label: 'Universities',
    icon: GraduationCap,
    path: '/universities'
  },
  {
    id: 'talent-pool',
    label: 'Talent Pool',
    icon: Award,
    path: '/talent-pool'
  },
  {
    id: 'applications',
    label: 'Applications',
    icon: Inbox,
    path: '/applications',
    badge: 23
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    path: '/analytic'
  },
  {
    id: 'settings',
    label: 'Setting',
    icon: Settings,
    path: '/settings'
  }
];

export const Sidebar: React.FC<SidebarProps> = ({ companyName, logoUrl }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileOpen(false); // Close mobile menu after navigation
  };

  return (
    <>
      {/* Mobile Menu Button - Fixed top-left */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
      >
        <Menu className="h-6 w-6" />
      </motion.button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? '80px' : '280px'
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1]
        }}
        className="hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-30"
      >
        <SidebarContent
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isActive={isActive}
          handleNavigation={handleNavigation}
          companyName={companyName}
          logoUrl={logoUrl}
          isMobile={false}
        />
      </motion.aside>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="lg:hidden fixed left-0 top-0 h-screen w-[280px] bg-white border-r border-gray-200 z-50 shadow-2xl"
          >
            <SidebarContent
              isCollapsed={false}
              setIsCollapsed={() => {}}
              isActive={isActive}
              handleNavigation={handleNavigation}
              companyName={companyName}
              logoUrl={logoUrl}
              isMobile={true}
              onClose={() => setIsMobileOpen(false)}
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

// Sidebar Content Component
interface SidebarContentProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isActive: (path: string) => boolean;
  handleNavigation: (path: string) => void;
  companyName?: string;
  logoUrl?: string;
  isMobile: boolean;
  onClose?: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  isCollapsed,
  setIsCollapsed,
  isActive,
  handleNavigation,
  companyName,
  logoUrl,
  isMobile,
  onClose
}) => {
  return (
    <>
      {/* Header Section - Golden ratio height */}
      <div className="flex-shrink-0 h-16 border-b border-gray-200 flex items-center justify-between px-4">
        <AnimatePresence mode="wait">
          {!isCollapsed ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={companyName || 'Company'}
                  className="w-8 h-8 rounded-lg object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building2 className="h-4 w-4 text-white" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-display font-bold text-gray-900 truncate">
                  {companyName || 'BridgeHub'}
                </h2>
                <p className="text-xs text-gray-500">Company Portal</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full flex justify-center"
            >
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={companyName || 'Company'}
                  className="w-8 h-8 rounded-lg object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-white" />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Close button (mobile) or Collapse button (desktop) */}
        {isMobile ? (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </motion.button>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <div className="space-y-1">
          {navItems.map((item, index) => (
            <NavItemComponent
              key={item.id}
              item={item}
              isActive={isActive(item.path)}
              isCollapsed={isCollapsed}
              onClick={() => handleNavigation(item.path)}
              index={index}
            />
          ))}
        </div>
      </nav>

      {/* Footer - Collapse hint for desktop */}
      {!isMobile && (
        <div className="flex-shrink-0 p-4 border-t border-gray-200">
          <AnimatePresence mode="wait">
            {!isCollapsed ? (
              <motion.div
                key="expanded-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between text-xs text-gray-500"
              >
                <span>Press to collapse</span>
                <ChevronLeft className="h-3 w-3" />
              </motion.div>
            ) : (
              <motion.div
                key="collapsed-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center"
              >
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

// Navigation Item Component
interface NavItemComponentProps {
  item: NavItem;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: () => void;
  index: number;
}

const NavItemComponent: React.FC<NavItemComponentProps> = ({
  item,
  isActive,
  isCollapsed,
  onClick,
  index
}) => {
  const Icon = item.icon;

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03, duration: 0.2 }}
      whileHover={{ x: isCollapsed ? 0 : 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
        transition-all duration-200 group relative
        ${isActive
          ? 'bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 text-blue-600 border border-blue-100'
          : 'text-gray-700 hover:bg-gray-50 border border-transparent hover:border-gray-200'
        }
        ${isCollapsed ? 'justify-center' : ''}
      `}
    >
      {/* Active indicator */}
      {isActive && !isCollapsed && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 rounded-r-full"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      {/* Icon */}
      <div className="relative flex-shrink-0">
        <Icon
          className={`h-5 w-5 transition-colors ${
            isActive ? 'text-blue-600' : 'text-gray-600 group-hover:text-gray-900'
          }`}
        />
        
        {/* Badge for collapsed state */}
        {isCollapsed && item.badge && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-pink-500 to-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
          >
            {item.badge > 9 ? '9+' : item.badge}
          </motion.span>
        )}
      </div>

      {/* Label & Badge */}
      <AnimatePresence mode="wait">
        {!isCollapsed && (
          <motion.div
            key="label"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-between flex-1 min-w-0"
          >
            <span className={`text-[15px] font-medium truncate ${
              isActive ? 'font-semibold' : ''
            }`}>
              {item.label}
            </span>
            
            {item.badge && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`
                  px-2 py-0.5 text-xs font-bold rounded-full flex-shrink-0
                  ${isActive
                    ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                  }
                `}
              >
                {item.badge}
              </motion.span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 pointer-events-none">
          {item.label}
          {item.badge && (
            <span className="ml-2 px-1.5 py-0.5 bg-white/20 rounded text-xs">
              {item.badge}
            </span>
          )}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      )}
    </motion.button>
  );
};
