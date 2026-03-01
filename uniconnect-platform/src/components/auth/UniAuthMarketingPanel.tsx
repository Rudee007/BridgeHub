import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

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

// Academic Institutions
const universities = [
  "Stanford", "MIT", "IIT Ropar",
  "GIETU", "Delhi University", "BITS Pilani", 
];

// Helper to get crisp initials for the glass tiles
const getInitials = (name: string) => {
  const words = name.trim().split(" ");
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const UniAuthMarketingPanel = () => {
  return (
    // Changed from `justify-between` to `justify-center` so content flows naturally
    <div className="flex flex-col h-full justify-center text-white py-4">
      
      <div className="flex flex-col gap-10 xl:gap-12">
        
        {/* 1. Header Section */}
        <div className="space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[2px]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
            Campus Placements. Reimagined.
          </div>

          {/* Headline */}
          <h1 className="text-4xl xl:text-5xl font-bold leading-[1.1] tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Empower your students <br />
            with careers that <span className="text-blue-300 opacity-80">matter</span>
          </h1>
        </div>

        {/* 2. Stats Section */}
        <div className="space-y-6">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-0.5"
            >
              <div className="flex items-center gap-3">
                <h2 className={`text-5xl xl:text-6xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent tracking-tighter`}>
                  {stat.value}
                </h2>
                <CheckCircle2 className="w-5 h-5 text-white/20" />
              </div>
              <p className="text-[10px] font-bold text-white/40 tracking-[1.5px] uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* 3. Footer Section (Flows directly after stats now) */}
        <div className="space-y-5 pt-2">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-white/30 uppercase tracking-[2px] whitespace-nowrap">
              Trusted by leading institutions
            </span>
            <div className="h-px w-full bg-white/5" />
          </div>
          
          {/* Logo Grid */}
          <div className="grid grid-cols-3 gap-y-5 gap-x-4 items-start">
             {universities.map((uni, i) => (
               <motion.div 
                 key={uni}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1 }}
                 whileHover={{ scale: 1.05, y: -2 }}
                 transition={{ delay: 0.8 + (i * 0.05), duration: 0.2 }}
                 className="flex flex-col items-center justify-center gap-2 cursor-default group"
               >
                 <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                   <span className="text-[12px] font-black text-white/60 group-hover:text-white/90 tracking-wider transition-colors">
                     {getInitials(uni)}
                   </span>
                 </div>
                 
                 <span className="text-[10px] font-bold text-white/40 group-hover:text-white/70 tracking-wide text-center leading-tight transition-colors">
                   {uni}
                 </span>
               </motion.div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
};