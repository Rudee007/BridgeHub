import React, { useState, useEffect } from "react";
import { Bell, HelpCircle, ChevronDown, Sun, Moon, Cloud } from "lucide-react";
import { ProfileDropdown } from "@/components/dashboard/ProfileDropdown";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  companyName: string;
  logoUrl?: string;
  industry?: string;
  profileComplete: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  companyName, 
  logoUrl, 
  industry, 
  profileComplete 
}) => {
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  // --- Unique Logic: Time-based Greeting & Date ---
  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();
    
    // Set Greeting
    if (hours < 12) setGreeting("Good morning");
    else if (hours < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    // Set Date (e.g., "Tue, 24 Oct")
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
    setCurrentDate(date.toLocaleDateString('en-US', options));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("companyData");
    localStorage.removeItem("onboardingDismissed");
    navigate("/");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 h-16 w-full transition-all">
      <div className="h-full px-6 lg:px-8 flex items-center justify-between">
        
        {/* LEFT: Contextual Greeting (Unique Feature) */}
        <div className="flex flex-col justify-center">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            {greeting}, {companyName.split(' ')[0]} 
            {/* Simple day/night icon based on greeting */}
            {greeting.includes("morning") ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </h2>
          <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> 
            {currentDate} • {industry}
          </p>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Help / Support Button */}
          <button className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full transition-colors">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help & Docs</span>
          </button>

          <div className="h-6 w-px bg-gray-200 hidden md:block" />

          {/* Notifications */}
          <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
          </button>

          {/* Profile */}
          <ProfileDropdown
            show={showProfileDropdown}
            companyName={companyName}
            industry={industry || "Tech"}
            logoUrl={logoUrl}
            profileComplete={profileComplete}
            onToggle={() => setShowProfileDropdown(!showProfileDropdown)}
            onCompleteProfile={() => navigate("/company/settings")}
            onSettings={() => navigate("/company/settings")}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </nav>
  );
};