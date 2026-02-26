import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Download, ExternalLink, Building2, 
  Award, TrendingUp, ArrowRight, Medal, Star, Sparkles, Briefcase
} from "lucide-react";
import { UniversityLayout } from "@/components/university/UniversityLayout";

// --- Mock Data (Platform-Specific Placements) ---
const initialPlacements = [
  { id: 1, student: { name: "Aarav Sharma", initials: "AS", department: "Computer Science", rollNo: "21CS1045" }, company: "Stripe India", role: "Backend Engineer", packageAmount: "₹24 LPA", offerType: "PPO", sourceProject: "Payment Gateway SDK Integration", date: "Oct 12" },
  { id: 2, student: { name: "Priya Patel", initials: "PP", department: "Electronics", rollNo: "21EC2034" }, company: "Freshworks", role: "AI NLP Developer", packageAmount: "₹15 LPA", offerType: "Full-Time", sourceProject: "AI Chatbot for Customer Support", date: "Nov 04" },
  { id: 3, student: { name: "Rohan Mehta", initials: "RM", department: "Computer Science", rollNo: "22CS1012" }, company: "Razorpay", role: "Data Science Intern", packageAmount: "₹45k/mo", offerType: "Internship", sourceProject: "Fraud Detection ML Pipeline", date: "Dec 01" },
  { id: 4, student: { name: "Neha Reddy", initials: "NR", department: "Electrical", rollNo: "21EE4056" }, company: "Zomato", role: "Frontend Engineer", packageAmount: "₹18 LPA", offerType: "Direct Hire", sourceProject: "Delivery Route Optimization", date: "Dec 15" },
  { id: 5, student: { name: "Vikram Nair", initials: "VN", department: "Mechanical", rollNo: "21ME3021" }, company: "LogiChain Ltd.", role: "Blockchain Analyst", packageAmount: "₹12 LPA", offerType: "Full-Time", sourceProject: "Blockchain Supply Tracker", date: "Jan 10" },
];

export function Placements() {
  const [searchQuery, setSearchQuery] = useState("");
  const [offerFilter, setOfferFilter] = useState("All Offers");

  // Advanced Filtering
  const filteredPlacements = useMemo(() => {
    return initialPlacements.filter(p => {
      const matchesSearch = p.student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesOffer = offerFilter === "All Offers" || p.offerType === offerFilter;
      return matchesSearch && matchesOffer;
    });
  }, [searchQuery, offerFilter]);

  return (
    <UniversityLayout universityName="IIT Bombay">
      <div className="max-w-[1400px] mx-auto space-y-8 pb-12">
        
        {/* 1. Header & Primary Action */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> Season 2025-26
            </div>
            <h1 className="text-3xl md:text-[32px] font-bold text-gray-900 tracking-tight flex items-center gap-3">
              Platform Success Board
            </h1>
            <p className="text-[15px] font-medium text-gray-500 mt-2">
              Showcasing the top hires and PPOs generated through your portal projects.
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 hover:bg-black text-white text-sm font-bold rounded-xl shadow-md transition-all hover:-translate-y-0.5 whitespace-nowrap">
            <Download className="w-4 h-4" />
            Download Success Report
          </button>
        </div>

        {/* 2. Bento-Box Executive Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Dark Card (Highest Package) - Breaks the white monotony */}
          <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-[24px] p-8 text-white relative overflow-hidden shadow-lg border border-gray-800">
            {/* Background glowing effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full mix-blend-screen pointer-events-none" />
            
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-[12px] uppercase tracking-widest mb-6">
              <Medal className="w-4 h-4" /> Highest Platform Package
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
              <div>
                <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                  ₹24.0 <span className="text-2xl md:text-3xl font-bold text-gray-400">LPA</span>
                </h2>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm border border-white/20">AS</div>
                  <div>
                    <p className="text-[15px] font-bold text-white">Aarav Sharma</p>
                    <p className="text-[13px] text-gray-400">Computer Science · Hired by Stripe India</p>
                  </div>
                </div>
              </div>
              
              <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                <p className="text-[11px] text-gray-400 uppercase font-bold tracking-wider mb-1">Converted From Project</p>
                <p className="text-[13px] font-semibold text-emerald-300">"Payment Gateway SDK"</p>
              </div>
            </div>
          </div>

          {/* Side Stats Stack */}
          <div className="flex flex-col gap-6">
            <div className="bg-white border border-gray-200 rounded-[24px] p-6 shadow-sm flex-1 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5"><TrendingUp className="w-24 h-24" /></div>
              <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2">Platform Conversions</p>
              <h3 className="text-4xl font-extrabold text-gray-900">42 <span className="text-lg text-gray-500 font-bold">Students</span></h3>
              <p className="text-[13px] font-medium text-emerald-600 mt-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" /> +14% vs last semester
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-[24px] p-6 shadow-sm flex-1 flex flex-col justify-center">
              <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-3">Top Hiring Partners</p>
              <div className="flex flex-wrap gap-2">
                {["Stripe", "Freshworks", "Razorpay", "Zomato", "Cred"].map(company => (
                  <span key={company} className="px-3 py-1.5 bg-gray-50 border border-gray-100 text-gray-700 text-[12px] font-bold rounded-lg">
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. The "Ledger" Section */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Success Stories</h2>
            
            {/* Sleek Floating Filter Pill */}
            <div className="flex items-center bg-white p-1.5 rounded-full border border-gray-200 shadow-sm w-full md:w-auto">
              <div className="relative flex-1 md:w-64 border-r border-gray-100 pr-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search students or companies..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-transparent text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none"
                />
              </div>
              <select 
                value={offerFilter}
                onChange={(e) => setOfferFilter(e.target.value)}
                className="pl-3 pr-8 py-1.5 bg-transparent text-[13px] font-bold text-gray-700 focus:outline-none cursor-pointer appearance-none"
              >
                <option>All Offers</option>
                <option>PPO</option>
                <option>Full-Time</option>
                <option>Internship</option>
              </select>
            </div>
          </div>

          {/* 4. The "Journey" Cards Grid */}
          <AnimatePresence mode="popLayout">
            {filteredPlacements.length === 0 ? (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[24px] border border-gray-200 shadow-sm">
                 <Search className="w-12 h-12 text-gray-300 mb-4" />
                 <p className="text-lg font-bold text-gray-900">No records found</p>
               </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredPlacements.map((placement, i) => (
                  <motion.div 
                    layout 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    key={placement.id} 
                    className="bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:border-emerald-200/60 rounded-[24px] p-6 transition-all relative overflow-hidden group flex flex-col"
                  >
                    {/* Glowing Top Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500 opacity-80 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Journey Map: Student -> Offer -> Company */}
                    <div className="flex items-center justify-between mb-6 pt-2">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-[15px] border border-blue-100/50 relative z-10">
                          {placement.student.initials}
                        </div>
                      </div>

                      {/* Dashed line connecting them */}
                      <div className="flex-1 border-t-2 border-dashed border-gray-200 mx-4 relative">
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-full border bg-white ${
                           placement.offerType === "PPO" ? "text-purple-600 border-purple-200" :
                           placement.offerType === "Internship" ? "text-orange-500 border-orange-200" :
                           "text-emerald-600 border-emerald-200"
                        }`}>
                          {placement.offerType}
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center border border-gray-100 relative z-10">
                          <Building2 className="w-6 h-6" />
                        </div>
                      </div>
                    </div>

                    {/* Role & Amount */}
                    <div className="text-center mb-6">
                      <h3 className="text-[20px] font-black text-gray-900 leading-tight mb-1">{placement.packageAmount}</h3>
                      <p className="text-[14px] font-bold text-gray-700">{placement.role}</p>
                      <p className="text-[12px] font-medium text-gray-500 mt-1">{placement.student.name} · {placement.company}</p>
                    </div>

                    {/* Source Project Footer */}
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50 -mx-6 -mb-6 px-6 py-4">
                      <div className="flex items-start gap-2 max-w-[80%]">
                        <Briefcase className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Source Project</p>
                          <p className="text-[12px] font-semibold text-gray-700 truncate">{placement.sourceProject}</p>
                        </div>
                      </div>
                      <button className="w-8 h-8 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-emerald-600 hover:border-emerald-200 transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </UniversityLayout>
  );
}