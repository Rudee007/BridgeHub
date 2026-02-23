import { Search, Bell, Plus, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface UniversityHeaderProps {
  universityName?: string;
}

export function UniversityHeader({ universityName = "IIT Bombay" }: UniversityHeaderProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between px-6 shrink-0">
      
      {/* Left: Search Bar */}
      <div className="flex-1 max-w-md">
        <motion.div 
          animate={{ width: isSearchFocused ? "100%" : "85%" }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="relative"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search students, projects, companies..."
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
          />
        </motion.div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-5">
        {/* Quick Action Button */}
        <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors">
          <Plus className="w-4 h-4" />
          New
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
        </button>

        {/* Vertical Divider */}
        <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>

        {/* Profile Dropdown */}
        <button className="flex items-center gap-3 hover:bg-gray-50 p-1.5 pr-2 rounded-lg transition-colors text-left">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm shrink-0 border border-indigo-200">
            {universityName.charAt(0)}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-gray-900 leading-tight">{universityName}</p>
            <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-wide">TPO Admin</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
        </button>
      </div>
    </header>
  );
}