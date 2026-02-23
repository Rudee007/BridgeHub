import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, UserCheck, ClipboardCheck, Users, 
  Briefcase, BookOpen, Building2, BarChart3, Settings, 
  GraduationCap, ChevronLeft, ChevronRight, LogOut 
} from "lucide-react";

const navItems = [
  { path: "/university/dashboard", label: "Overview", icon: LayoutDashboard },
  { path: "/university/dashboard/verify", label: "Verify Students", icon: UserCheck },
  { path: "/university/dashboard/endorse", label: "Endorsement Queue", icon: ClipboardCheck },
  { path: "/university/dashboard/students", label: "My Students", icon: Users },
  { path: "/university/dashboard/projects", label: "Active Projects", icon: Briefcase },
  { path: "/university/dashboard/placements", label: "Placements", icon: BookOpen },
  { path: "/university/dashboard/companies", label: "Company Partners", icon: Building2 },
  { path: "/university/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { path: "/university/dashboard/settings", label: "Settings", icon: Settings },
];

export function UniversitySidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      initial={{ width: 260 }}
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      className="h-screen bg-white border-r border-gray-200 flex flex-col sticky top-0 z-40 hidden md:flex shrink-0"
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <span className="font-bold text-gray-900 text-lg tracking-tight block leading-tight">BridgeHub</span>
              <span className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider block leading-none">University Portal</span>
            </motion.div>
          )}
        </div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-md transition-colors shrink-0"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-hide">
        {navItems.map((item) => {
          // Exact match for overview, includes match for others
          const isActive = item.path === "/university/dashboard" 
            ? location.pathname === item.path 
            : location.pathname.includes(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? "bg-blue-50 text-blue-700 font-semibold" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium"
              }`}
              title={isCollapsed ? item.label : ""}
            >
              <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}`} />
              {!isCollapsed && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Footer / Logout */}
      <div className="p-4 border-t border-gray-100 shrink-0">
        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 font-medium transition-colors group">
          <LogOut className="w-5 h-5 shrink-0 text-gray-400 group-hover:text-red-500" />
          {!isCollapsed && <span className="whitespace-nowrap">Sign Out</span>}
        </button>
      </div>
    </motion.aside>
  );
}