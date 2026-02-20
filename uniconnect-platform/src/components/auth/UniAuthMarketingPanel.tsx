import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { UniversityLogo } from "@/components/ui/UniversityLogo"; // ✅ Using the new component

const stats = [
  { 
    value: "95%", 
    label: "PLACEMENT RATE INCREASE",
    gradient: "from-emerald-400 to-teal-500"
  },
  { 
    value: "500+", 
    label: "ACTIVE HIRING PARTNERS",
    gradient: "from-blue-400 to-indigo-500"
  },
  { 
    value: "50K+", 
    label: "STUDENT CAREERS LAUNCHED",
    gradient: "from-violet-400 to-fuchsia-500"
  },
];

// ✅ Updated to use Academic Institutions (Peer Social Proof)
const universities = [
  "Stanford", "MIT", "Harvard",
  "IIT Bombay", "Cambridge", "Oxford", "GIETU", "Delhi University", "Bangalore University", 
];

export const UniAuthMarketingPanel = () => {
  return (
    <div className="flex flex-col h-full justify-between text-white py-2">
      
      {/* 1. Header Section (Golden Ratio Top) */}
      <div className="space-y-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold uppercase tracking-[2px]">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
          Campus Placements. Reimagined.
        </div>

        {/* Headline */}
        <h1 className="text-5xl xl:text-6xl font-bold leading-[1.05] tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          Empower your students <br />
          with careers that <span className="text-blue-300 opacity-80">matter</span>
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
              Trusted by leading institutions
            </span>
            <div className="h-px w-full bg-white/5" />
          </div>
          
          {/* ✅ REFINED LOGO GRID: Using UniversityLogo */}
          <div className="grid grid-cols-3 gap-y-10 gap-x-8 items-center">
             {universities.map((uni, i) => (
               <motion.div 
                 key={uni}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 0.7 }}
                 whileHover={{ opacity: 1, scale: 1.05 }}
                 transition={{ delay: 1.0 + (i * 0.05) }}
                 className="flex flex-col items-center justify-center"
               >
                 {/* Logo Container */}
                 <div className="h-12 w-full flex items-center justify-center">
                   <UniversityLogo 
                     name={uni} 
                     className="text-white/90 scale-90"
                     variant="full" // Shows Icon + Name
                   />
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};