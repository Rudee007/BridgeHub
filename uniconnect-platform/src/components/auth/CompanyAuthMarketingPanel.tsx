import { Shield, Sparkles, CheckCircle2, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { CompanyLogo } from "@/components/ui/CompanyLogo";

const stats = [
  { 
    value: "4000+", 
    label: "STUDENTS GENERATE MORE OPPORTUNITIES",
    gradient: "from-blue-400 to-indigo-500"
  },
  { 
    value: "220M", 
    label: "STUDENT PROFILES IN OUR DATABASE",
    gradient: "from-purple-400 to-pink-500"
  },
  { 
    value: "60+", 
    label: "UNIVERSITY INTEGRATIONS",
    gradient: "from-pink-400 to-rose-500"
  },
];

// ✅ Expanded list to match the 2-row layout in the reference
const partners = [
  "Airbnb", "Uber", "Spotify", "Slack", "Stripe", "Notion"
];

export const CompanyAuthMarketingPanel = () => {
  return (
    <div className="flex flex-col h-full justify-between text-white py-2">
      
      {/* 1. Header Section (Golden Ratio Top) */}
      <div className="space-y-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold uppercase tracking-[2px]">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
          Discover talent. Transform your recruitment.
        </div>

        {/* Headline */}
        <h1 className="text-5xl xl:text-6xl font-bold leading-[1.05] tracking-tight">
          Your search for <br />
          qualified leads <span className="text-primary-400 opacity-80">ends here</span>
        </h1>

        {/* Stats List */}
        <div className="space-y-10 pt-4">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-1"
            >
              <div className="flex items-center gap-3">
                <h2 className={`text-6xl xl:text-7xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent tracking-tighter`}>
                  {stat.value}
                </h2>
                <CheckCircle2 className="w-6 h-6 text-white/20" />
              </div>
              <p className="text-[11px] font-bold text-white/40 tracking-[1.5px] uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 2. Footer Section (Golden Ratio Bottom) */}
      <div className="space-y-10">
        {/* Partner Logos */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-[2px] whitespace-nowrap">
              Powering recruiters at
            </span>
            <div className="h-px w-full bg-white/5" />
          </div>
          
          {/* ✅ REFINED LOGO GRID: Larger icons, cleaner alignment */}
          <div className="grid grid-cols-3 gap-y-10 gap-x-12 items-center">
             {partners.map((p, i) => (
               <motion.div 
                 key={p}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 0.5 }}
                 whileHover={{ opacity: 1, scale: 1.1 }}
                 transition={{ delay: 1.0 + (i * 0.05) }}
                 className="flex flex-col items-center justify-center gap-3"
               >
                 {/* ✅ Larger Logo Container */}
                 <div className="h-10 w-24 flex items-center justify-center">
                   <CompanyLogo 
                     name={p} 
                     className="w-full h-full text-white object-contain"
                   />
                 </div>
                 
                 {/* Subtle Name Label */}
                 <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                   {p}
                 </span>
               </motion.div>
             ))}
          </div>
        </div>

        {/* Trust/Security - Positioned at the very bottom */}
     
      </div>
    </div>
  );
};
