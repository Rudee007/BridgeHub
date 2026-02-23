import { type ReactNode } from "react";
import { UniversitySidebar } from "./UniversitySidebar";
import { UniversityHeader } from "./UniversityHeader";

interface UniversityLayoutProps {
  children: ReactNode;
  universityName?: string;
}

export function UniversityLayout({ children, universityName = "IIT Bombay" }: UniversityLayoutProps) {
  return (
    // The main wrapper locks to the screen height to prevent full-page scrolling
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-sans text-gray-900">
      
      {/* Fixed Sidebar */}
      <UniversitySidebar />
      
      {/* Main Content Column */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        
        {/* Fixed Header */}
        <UniversityHeader universityName={universityName} />
        
        {/* Scrollable Content Area */}
        {/* We use relative positioning and a custom scrollbar for a clean look */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
          <div className="p-4 md:p-6 lg:p-8 xl:p-10 min-h-full">
            {children}
          </div>
        </main>
        
      </div>
    </div>
  );
}