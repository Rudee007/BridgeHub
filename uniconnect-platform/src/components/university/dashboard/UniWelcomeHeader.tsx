import { motion } from "framer-motion";
import { Calendar, UserCheck, ClipboardCheck, BookOpen } from "lucide-react";

interface UniWelcomeHeaderProps {
  universityName: string;
}

export function UniWelcomeHeader({ universityName }: UniWelcomeHeaderProps) {
  // ✅ Lighter border (border-gray-100) and soft shadow to match the design
  return (
    <div className="bg-card rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
      
      {/* Left Content */}
      <div className="w-full xl:w-auto">
        <h1 className="text-2xl md:text-[28px] font-bold text-foreground tracking-tight flex items-center gap-2">
          Good afternoon, {universityName} <span className="animate-[shake_2s_ease-in-out_infinite]"></span>
        </h1>
        <p className="text-muted-foreground mt-1 mb-6 text-sm">
          Here's your student placement activity today.
        </p>

        {/* Profile Completion Bar */}
        <div className="mb-6 max-w-[240px]">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-medium text-muted-foreground">University profile</span>
            <span className="text-xs font-bold text-primary-600">85% complete</span>
          </div>
          <div className="h-1.5 w-full bg-primary-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: "85%" }} 
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-primary-600 rounded-full"
            />
          </div>
        </div>

        {/* Action Buttons - ✅ Updated to rounded-xl to match the softer pill shape in the design */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-xl shadow-sm transition-all hover:-translate-y-0.5">
            <UserCheck className="w-4 h-4" />
            Verify Students
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2.5 bg-secondary-600 hover:bg-secondary-700 text-white text-sm font-medium rounded-xl shadow-sm transition-all hover:-translate-y-0.5">
            <ClipboardCheck className="w-4 h-4" />
            Endorse Proposals
          </button>
          
          {/* ✅ Ghost button style for 'View Placements' without the harsh border */}
          <button className="flex items-center gap-2 px-4 py-2.5 bg-transparent hover:bg-muted/50 text-muted-foreground hover:text-foreground text-sm font-medium rounded-xl transition-all">
            <BookOpen className="w-4 h-4" />
            View Placements
          </button>
        </div>
      </div>

      {/* Right Content: Date Badge */}
      {/* ✅ Matched perfectly to image_051dbd.png (Light gray background, dark text, blue icon) */}
      <div className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium text-gray-600 self-start">
        <Calendar className="w-4 h-4 text-primary-500" />
        Sunday, February 22, 2026
      </div>
      
    </div>
  );
}