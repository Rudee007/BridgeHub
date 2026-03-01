import { Search, Bell, Plus, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface UniversityHeaderProps {
  universityName?: string;
}

export function UniversityHeader({ universityName = "IIT Bombay" }: UniversityHeaderProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between pr-3 pl-[64px] md:px-6 shrink-0 gap-3 sm:gap-6">
      
      {/* Left: Search Bar */}
      {/* flex-1 ensures it gracefully takes available space. Smooth width transitions. */}
      <div className="flex-1 max-w-md transition-all duration-300 ease-in-out">
        <div className={`relative transition-all duration-300 ${isSearchFocused ? "w-full" : "w-full lg:w-[85%]"}`}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search students, projects..."
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-[13px] sm:text-sm focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-gray-900 placeholder:text-gray-400 shadow-sm"
          />
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
        
        {/* Quick Action Button (Visible on Tablet+) */}
        <button className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-[13px] font-bold rounded-xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-95">
          <Plus className="w-4 h-4" />
          New
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-xl transition-colors shrink-0">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Vertical Divider */}
        <div className="h-6 w-px bg-gray-200 hidden sm:block mx-1"></div>

        {/* Profile Dropdown Container */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`flex items-center gap-2.5 hover:bg-gray-50 p-1.5 sm:pr-2 rounded-xl transition-colors text-left border ${
              isProfileOpen ? "border-gray-200 bg-gray-50" : "border-transparent"
            }`}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-[13px] sm:text-sm shrink-0 border border-indigo-100 shadow-sm">
              {universityName.charAt(0)}
            </div>
            <div className="hidden sm:block">
              <p className="text-[13px] font-bold text-gray-900 leading-tight">{universityName}</p>
              <p className="text-[10px] font-extrabold text-primary-600 uppercase tracking-widest mt-0.5">TPO Admin</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 hidden sm:block transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Animated Dropdown Menu */}
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-[20px] shadow-xl overflow-hidden z-50 origin-top-right"
              >
                {/* Header Profile Summary */}
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                  <p className="text-[14px] font-bold text-gray-900 truncate">{universityName}</p>
                  <p className="text-[12px] font-medium text-gray-500 truncate mt-0.5">tpo@institute.edu.in</p>
                </div>
                
                {/* Action Links */}
                <div className="p-2 space-y-0.5">
                  <Link 
                    to="/university/settings" 
                    onClick={() => setIsProfileOpen(false)} 
                    className="flex items-center gap-3 px-3 py-2.5 text-[13px] font-bold text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                  >
                    <User className="w-4 h-4" /> My Profile
                  </Link>
                  <Link 
                    to="/university/settings" 
                    onClick={() => setIsProfileOpen(false)} 
                    className="flex items-center gap-3 px-3 py-2.5 text-[13px] font-bold text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                  >
                    <Settings className="w-4 h-4" /> Account Settings
                  </Link>
                </div>
                
                {/* Logout Action */}
                <div className="p-2 border-t border-gray-100">
                  <button 
                    onClick={() => setIsProfileOpen(false)} 
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-[13px] font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
}