import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, UserCheck, ClipboardCheck, Users, 
  Briefcase, BookOpen, Building2, BarChart3, Settings, 
  GraduationCap, ChevronLeft, ChevronRight, LogOut, Menu, X
} from "lucide-react";

const navItems = [
  { path: "/university/dashboard", label: "Overview", icon: LayoutDashboard },
  { path: "/university/verify", label: "Verify Students", icon: UserCheck },
  { path: "/university/endorse", label: "Endorsement Queue", icon: ClipboardCheck },
  { path: "/university/students", label: "My Students", icon: Users },
  { path: "/university/projects", label: "Active Projects", icon: Briefcase },
  { path: "/university/placements", label: "Placements", icon: BookOpen },
  { path: "/university/companies", label: "Company Partners", icon: Building2 },
  { path: "/university/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/university/settings", label: "Settings", icon: Settings },
];

export function UniversitySidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer when a route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Force expand if window is resized to mobile to prevent 80px mobile drawers
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* 1. Mobile Hamburger Button (Floating Top Left) */}
      <button 
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2.5 bg-white border border-gray-200 rounded-xl shadow-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* 2. Mobile Dark Backdrop Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* 3. Main Sidebar Container */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 80 : 260 }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 flex flex-col shrink-0 transition-transform duration-300 ease-in-out md:sticky md:top-0 md:translate-x-0 ${
          isMobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:shadow-none"
        }`}
      >
        
        {/* Desktop Collapse Toggle (Floating Pill) */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex absolute -right-3.5 top-6 w-7 h-7 bg-white border border-gray-200 rounded-full items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 shadow-sm transition-all z-50"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* Mobile Close Button */}
        <button 
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden absolute top-5 right-4 p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo Section */}
        <div className={`h-20 flex items-center border-b border-gray-100 shrink-0 transition-all duration-300 ${isCollapsed ? "justify-center px-0" : "px-5"}`}>
          <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
            <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <span className="font-extrabold text-gray-900 text-[18px] tracking-tight block leading-tight">BridgeHub</span>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block leading-none mt-0.5">University</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5 [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => {
            const isActive = item.path === "/university/dashboard" 
              ? location.pathname === item.path 
              : location.pathname.includes(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center transition-all duration-200 group ${
                  isActive 
                    ? "bg-blue-50/80 text-blue-700" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                } ${
                  isCollapsed 
                    ? "justify-center w-12 h-12 mx-auto rounded-2xl" // Perfectly centered square for collapsed state
                    : "justify-start gap-3 px-4 py-3 w-full rounded-xl" // Full width for expanded state
                }`}
                title={isCollapsed ? item.label : ""}
              >
                <item.icon className={`w-[20px] h-[20px] shrink-0 transition-colors ${isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}`} />
                {!isCollapsed && (
                  <span className={`text-[14px] font-semibold whitespace-nowrap ${isActive ? "text-blue-700" : "text-gray-600"}`}>
                    {item.label}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Footer / Logout */}
        <div className={`p-4 border-t border-gray-100 shrink-0 ${isCollapsed ? "flex justify-center" : ""}`}>
          <button className={`flex items-center transition-all duration-200 group ${
            isCollapsed 
              ? "justify-center w-12 h-12 bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-600 rounded-2xl" 
              : "justify-start gap-3 px-4 py-3 w-full rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 font-semibold"
          }`}>
            <LogOut className={`w-[20px] h-[20px] shrink-0 transition-colors ${isCollapsed ? "" : "text-gray-400 group-hover:text-red-500"}`} />
            {!isCollapsed && <span className="whitespace-nowrap">Sign Out</span>}
          </button>
        </div>

      </motion.aside>
    </>
  );
}