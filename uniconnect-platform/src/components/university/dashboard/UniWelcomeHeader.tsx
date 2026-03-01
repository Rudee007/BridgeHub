import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface UniWelcomeHeaderProps {
  universityName: string;
}

export function UniWelcomeHeader({ universityName }: UniWelcomeHeaderProps) {
  // Get current date formatted nicely
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="bg-white rounded-[24px] border border-gray-200 p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      
      {/* Left Content: Greeting & Context */}
      <div className="flex-1">
        <h1 className="text-2xl md:text-[28px] font-extrabold text-gray-900 tracking-tight">
          Good afternoon, {universityName}
        </h1>
        <p className="text-[14px] font-medium text-gray-500 mt-1.5 max-w-xl leading-relaxed">
          Here is your campus placement overview. Track student verifications, endorse project proposals, and monitor hiring analytics from your unified dashboard.
        </p>
      </div>

      {/* Right Content: Profile Completion & Date */}
      <div className="w-full md:w-auto flex flex-col items-start md:items-end gap-5 shrink-0">
        
        {/* Date Badge */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-[13px] font-bold text-gray-600 shadow-sm">
          <Calendar className="w-4 h-4 text-primary-500" />
          {today}
        </div>

        {/* Profile Completion Bar - Moved to the right for perfect visual balance */}
        <Link to="/university/settings" className="w-full md:w-[240px] block group focus:outline-none">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-600 transition-colors">
              Profile Setup
            </span>
            <span className="text-[12px] font-extrabold text-primary-600 flex items-center gap-1">
              85% 
              {/* Subtle arrow appears on hover indicating this is clickable */}
              <ArrowRight className="w-3 h-3 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
            </span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: "85%" }} 
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="h-full bg-primary-600 rounded-full"
            />
          </div>
        </Link>
        
      </div>
      
    </div>
  );
}