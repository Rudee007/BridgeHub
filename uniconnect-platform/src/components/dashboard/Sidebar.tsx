import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  FolderKanban, 
  GraduationCap, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut,
  Building2,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  companyName?: string;
  logoUrl?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ companyName, logoUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/company/dashboard', icon: LayoutDashboard },
    { label: 'Projects', path: '/company/projects', icon: FolderKanban },
    { label: 'Jobs', path: '/company/jobs', icon: Briefcase },
    { label: 'Universities', path: '/company/universities', icon: GraduationCap },
    { label: 'Talent Pool', path: '/company/talent-pool', icon: Users },
    { label: 'Applications', path: '/company/applications', icon: FileText, badge: 12 },
    { label: 'Analytics', path: '/company/analytics', icon: BarChart3 },
    { label: 'Settings', path: '/company/settings', icon: Settings }, // Make sure this route exists or remove
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200 text-gray-700"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed top-0 left-0 h-screen w-[280px] bg-white border-r border-gray-200 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        
        {/* Header */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-100">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white shrink-0">
            {logoUrl ? <img src={logoUrl} alt="Logo" className="w-full h-full rounded-lg" /> : <Building2 className="w-5 h-5" />}
          </div>
          <span className="font-bold text-gray-900 text-lg tracking-tight truncate">
            {companyName || "Company"}
          </span>
          <button onClick={() => setIsOpen(false)} className="ml-auto lg:hidden text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Main Menu</p>
          
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                isActive 
                  ? "bg-primary-50 text-primary-700 shadow-sm ring-1 ring-primary-100" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-primary-600" : "text-gray-400 group-hover:text-gray-600"
                  )} />
                  <span className="flex-1">{item.label}</span>
                  
                  {/* Badge */}
                  {item.badge && (
                    <span className={cn(
                      "px-2 py-0.5 rounded-md text-[10px] font-bold",
                      isActive ? "bg-primary-600 text-white" : "bg-gray-100 text-gray-600"
                    )}>
                      {item.badge}
                    </span>
                  )}

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-primary-600 rounded-r-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all text-sm font-medium group"
          >
            <LogOut className="w-5 h-5 text-gray-400 group-hover:text-rose-500" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};