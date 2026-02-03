import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

// Components
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Navbar } from "@/components/dashboard/Navbar";

// Types & Data
import type { CompanyData } from "@/types/dashboard.types";
import { initializeCompanyData } from "@/data/dashboardData"; 

export const CompanyLayout = () => {
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // --- 1. Load Data Logic ---
  const refreshData = () => {
    try {
      const stored = localStorage.getItem("companyData");
      if (stored) {
        setCompanyData(JSON.parse(stored));
      } else {
        // Fallback: Initialize default data if nothing exists
        const initial = initializeCompanyData();
        localStorage.setItem("companyData", JSON.stringify(initial));
        setCompanyData(initial);
      }
    } catch (error) {
      console.error("Failed to load company data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
    // Listen for updates (e.g. when Onboarding completes)
    window.addEventListener("companyDataUpdated", refreshData);
    return () => window.removeEventListener("companyDataUpdated", refreshData);
  }, []);

  // --- 2. Loading State (Full Screen) ---
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
      </div>
    );
  }

  // Safety check
  if (!companyData) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      
      {/* 3. Global Sidebar */}
      {/* It's fixed inside the component, but we render it here once */}
      <Sidebar 
        companyName={companyData.companyName} 
        logoUrl={companyData.logoUrl} 
      />

      {/* 4. Main Content Wrapper */}
      {/* lg:pl-[280px] pushes content to the right of the fixed sidebar */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-[280px] transition-all duration-300 relative">
        
        {/* 5. Global Navbar (Sticky Top) */}
        <Navbar 
          companyName={companyData.companyName}
          logoUrl={companyData.logoUrl}
          industry={companyData.industry}
          profileComplete={companyData.profileComplete}
        />

        {/* 6. Page Content */}
        <main className="flex-1 p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {/* NOTE: We removed 'animate-fade-in' from here if it causes 
             fixed elements (like Modals) inside Outlet to break. 
             Ideally, apply animations to specific children, not the wrapper.
          */}
          <Outlet context={{ companyData, setCompanyData }} />
        </main>
      </div>
    </div>
  );
};