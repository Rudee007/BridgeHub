// components/dashboard/Sidebar.tsx
import { useState, useEffect } from 'react';
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
  Menu,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming you have the utils file we created earlier

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

// ✅ FIX: Correct paths matching your App.tsx routes
const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/company/dashboard'
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: FolderKanban,
    path: '/company/projects',
    badge: 12
  },
  {
    id: 'jobs',
    label: 'Jobs',
    icon: Briefcase,
    path: '/company/jobs',
    badge: 8
  },
  {
    id: 'universities',
    label: 'Universities',
    icon: GraduationCap,
    path: '/company/universities'
  },
  {
    id: 'talent-pool',
    label: 'Talent Pool',
    icon: Award,
    path: '/company/talent-pool'
  },
  {
    id: 'applications',
    label: 'Applications',
    icon: Inbox,
    path: '/company/applications',
    badge: 23
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    path: '/company/analytics'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    path: '/company/settings'
  }
];

export const Sidebar: React.FC<SidebarProps> = ({ companyName, logoUrl }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);


  const checkActive = (path: string) => {
    if (path === '/company/dashboard') {
        return location.pathname === '/company/dashboard' || location.pathname === '/company';
    }
    return location.pathname.startsWith(path);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200 text-gray-700 hover:bg-gray-50"
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
          checkActive={checkActive}
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
              checkActive={checkActive}
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

// --- Sub Components ---

interface SidebarContentProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  checkActive: (path: string) => boolean;
  handleNavigation: (path: string) => void;
  companyName?: string;
  logoUrl?: string;
  isMobile: boolean;
  onClose?: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
  isCollapsed,
  setIsCollapsed,
  checkActive,
  handleNavigation,
  companyName,
  logoUrl,
  isMobile,
  onClose
}) => {
  return (
    <>
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100/50">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
               {logoUrl ? <img src={logoUrl} alt="" className="w-full h-full rounded-lg" /> : <Building2 className="w-5 h-5" />}
            </div>
            <span className="font-bold text-gray-900 text-sm tracking-tight">{companyName || 'TechCorp'}</span>
          </div>
        )}
        
        {isCollapsed && (
           <div className="w-full flex justify-center">
             <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
               <Building2 className="w-5 h-5" />
             </div>
           </div>
        )}

        {isMobile ? (
           <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 rounded-md"><X className="w-5 h-5"/></button>
        ) : (
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className={`text-gray-400 hover:text-gray-600 transition-colors ${isCollapsed ? 'mx-auto mt-4' : ''}`}
          >
            {isCollapsed ? null : <ChevronLeft className="w-5 h-5" />}
          </button>
        )}
      </div>

      {/* Nav List */}
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavItem 
            key={item.id} 
            item={item} 
            isActive={checkActive(item.path)} 
            isCollapsed={isCollapsed}
            onClick={() => handleNavigation(item.path)}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100">
        <button className={cn(
            "flex items-center gap-3 w-full px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all group",
            isCollapsed && "justify-center"
        )}>
           <LogOut className="w-5 h-5" />
           {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </>
  );
};

const NavItem = ({ item, isActive, isCollapsed, onClick }: { item: NavItem, isActive: boolean, isCollapsed: boolean, onClick: () => void }) => {
  const Icon = item.icon;

  return (
    <div className="relative group mb-1">
       {/* Active Indicator Strip (Left Side) */}
      {isActive && !isCollapsed && (
          <motion.div 
            layoutId="active-strip"
            className="absolute left-0 top-0 bottom-0 w-1 bg-primary-600 rounded-r-full my-1" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
       )}

     <button
        onClick={onClick}
        className={cn(
          "flex items-center w-full p-2.5 mx-2 rounded-xl transition-all duration-200 relative",
          // Calculate width to account for margin so it doesn't overflow
          isCollapsed ? "justify-center mx-0 w-full" : "w-[calc(100%-16px)] gap-3",
          isActive 
            ? "bg-primary-50 text-primary-700 font-semibold" 
            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium"
        )}
      >

        
<Icon className={cn(
          "w-5 h-5 transition-colors flex-shrink-0",
          isActive ? "text-primary-600" : "text-gray-400 group-hover:text-gray-600"
        )} />
        
        {!isCollapsed && (
          <>
            <span className="flex-1 text-left text-sm truncate">{item.label}</span>
            {item.badge && (
              <span className={cn(
                "px-2 py-0.5 rounded-md text-xs font-bold transition-colors",
                isActive 
                  ? "bg-primary-600 text-white" 
                  : "bg-gray-100 text-gray-600"
              )}>
                {item.badge}
              </span>
            )}
          </>
        )}

        {/* Collapsed Badge (Dot) */}
        {isCollapsed && item.badge && (
           <span className="absolute top-2 right-2 w-2 h-2 bg-primary-600 rounded-full border border-white" />
        )}
      </button>

      {/* Hover Tooltip for Collapsed State */}
      {isCollapsed && (
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-lg">
          {item.label}
        </div>
      )}
    </div>
  );
};