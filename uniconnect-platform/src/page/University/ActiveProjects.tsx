import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, Search, MapPin, Building2, Users, DollarSign, 
  ArrowRight, Plus, FolderOpen, CheckCircle2, Clock, 
  LayoutGrid, List 
} from "lucide-react";
import { UniversityLayout } from "@/components/university/UniversityLayout";

// --- Mock Data ---
const initialProjects = [
  { id: 1, company: "Stripe India", title: "Payment Gateway Integration", type: "Internship", status: "Open", industry: "FinTech", location: "Remote", stipend: "₹40k/month", applicants: 24, skills: ["Node.js", "React"] },
  { id: 2, company: "Freshworks", title: "AI Chatbot Developer", type: "Full-Time", status: "Open", industry: "SaaS", location: "Chennai", stipend: "₹12LPA - ₹15LPA", applicants: 56, skills: ["Python", "NLP"] },
  { id: 3, company: "Razorpay", title: "Fraud Detection ML Pipeline", type: "Internship", status: "In Progress", industry: "FinTech", location: "Bangalore", stipend: "₹35k/month", applicants: 18, skills: ["Python", "Machine Learning"] },
  { id: 4, company: "Zomato", title: "Frontend Performance Engineer", type: "Full-Time", status: "Open", industry: "FoodTech", location: "Gurgaon", stipend: "₹18LPA - ₹22LPA", applicants: 89, skills: ["React", "Performance"] },
  { id: 5, company: "LogiChain Ltd.", title: "Blockchain Supply Tracker", type: "Internship", status: "Completed", industry: "Logistics", location: "Remote", stipend: "₹25k/month", applicants: 12, skills: ["Solidity", "Web3"] },
];

export function ActiveProjects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [industryFilter, setIndustryFilter] = useState("All Industries");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Advanced Filtering Logic
  const filteredProjects = initialProjects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All Statuses" || p.status === statusFilter;
    const matchesIndustry = industryFilter === "All Industries" || p.industry === industryFilter;
    
    return matchesSearch && matchesStatus && matchesIndustry;
  });

  return (
    <UniversityLayout universityName="IIT Bombay">
      <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
        
        {/* 1. Header & Primary Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 tracking-tight flex items-center gap-3">
              <Briefcase className="w-7 h-7 text-primary-600" />
              Active Projects
            </h1>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Manage student projects and collaborations.
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl shadow-sm transition-all hover:-translate-y-0.5 whitespace-nowrap">
            <Plus className="w-4 h-4" />
            Post Project
          </button>
        </div>

        {/* 2. KPI Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[22px] font-bold text-gray-900 leading-tight">5</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Total Projects</p>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[22px] font-bold text-gray-900 leading-tight">3</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Active Now</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[22px] font-bold text-gray-900 leading-tight">199</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Total Applications</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[22px] font-bold text-gray-900 leading-tight">1</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">In Progress</p>
            </div>
          </div>
        </div>

        {/* 3. Advanced Filters Bar */}
        <div className="bg-white p-4 rounded-[16px] border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search projects or companies..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
            />
          </div>
          <div className="flex gap-3">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 cursor-pointer min-w-[140px]"
            >
              <option>All Statuses</option>
              <option>Open</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <select 
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 cursor-pointer min-w-[150px]"
            >
              <option>All Industries</option>
              <option>FinTech</option>
              <option>SaaS</option>
              <option>FoodTech</option>
              <option>Logistics</option>
            </select>
          </div>
        </div>

        {/* 4. VIEW TOGGLE BAR - ✅ NOW A CRISP WHITE CARD */}
        <div className="bg-white px-5 py-3 rounded-[16px] border border-gray-200 shadow-sm flex items-center justify-between">
          <span className="text-[14px] text-gray-600">
            Showing <span className="font-bold text-gray-900">{filteredProjects.length}</span> projects
          </span>
          <div className="flex items-center bg-gray-50 p-1 rounded-lg border border-gray-100">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-primary-600" : "text-gray-400 hover:text-gray-900"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-all ${viewMode === "list" ? "bg-white shadow-sm text-primary-600" : "text-gray-400 hover:text-gray-900"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5. Content Area (Grid & List Views) */}
        <AnimatePresence mode="wait">
          {filteredProjects.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[20px] border border-gray-200">
              <Briefcase className="w-10 h-10 text-gray-300 mb-3" />
              <p className="text-lg font-bold text-gray-900">No projects found</p>
              <p className="text-sm text-gray-500 mt-1">Try clearing your filters.</p>
            </motion.div>
          ) : viewMode === "grid" ? (
            /* --- GRID VIEW --- */
            <motion.div key="grid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div layout key={project.id} transition={{ duration: 0.2, delay: index * 0.05 }} className="bg-white rounded-[20px] border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-primary-200 transition-all flex flex-col group">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 shrink-0 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full border uppercase tracking-wider ${
                      project.status === "Open" ? "bg-blue-50 text-blue-600 border-blue-100" : 
                      project.status === "In Progress" ? "bg-orange-50 text-orange-600 border-orange-100" : 
                      "bg-emerald-50 text-emerald-600 border-emerald-100"
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-[17px] font-bold text-gray-900 leading-tight mb-1 group-hover:text-primary-600 transition-colors">{project.title}</h3>
                    <p className="text-[13px] font-medium text-gray-500">{project.company} · {project.type}</p>
                  </div>

                  <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-2 text-[13px] text-gray-600"><MapPin className="w-4 h-4 text-gray-400" /> {project.location}</div>
                    <div className="flex items-center gap-2 text-[13px] text-gray-600"><DollarSign className="w-4 h-4 text-gray-400" /> <span className="font-semibold text-gray-800">{project.stipend}</span></div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {project.skills.map(skill => (
                      <span key={skill} className="px-2.5 py-1 bg-gray-50 text-gray-600 text-[11px] font-semibold rounded-md border border-gray-100">{skill}</span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[12px] font-medium text-gray-500">
                      <Users className="w-4 h-4" /><span className="text-gray-900 font-bold">{project.applicants}</span> applied
                    </div>
                    <button className="flex items-center gap-1 text-[13px] font-bold text-primary-600 hover:text-primary-700 transition-colors">
                      View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* --- LIST VIEW --- */
            <motion.div key="list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="space-y-4">
              {filteredProjects.map((project, index) => (
                <motion.div layout key={project.id} transition={{ duration: 0.2, delay: index * 0.05 }} className="bg-white rounded-[20px] border border-gray-200 p-5 shadow-sm hover:border-primary-200 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 shrink-0 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-bold text-gray-900 leading-tight mb-1 group-hover:text-primary-600 transition-colors">{project.title}</h3>
                      <div className="flex items-center gap-2 text-[13px] font-medium text-gray-500">
                        <span>{project.company}</span>
                        <span>·</span>
                        <span className="text-gray-600 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{project.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-8 w-full md:w-auto">
                    <div className="flex flex-col">
                      <span className="text-[11px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Stipend</span>
                      <span className="text-[14px] font-bold text-gray-900">{project.stipend}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Status</span>
                      <span className={`px-2 py-0.5 text-[11px] font-bold rounded-full border inline-block ${
                        project.status === "Open" ? "bg-blue-50 text-blue-600 border-blue-100" : 
                        project.status === "In Progress" ? "bg-orange-50 text-orange-600 border-orange-100" : 
                        "bg-emerald-50 text-emerald-600 border-emerald-100"
                      }`}>{project.status}</span>
                    </div>
                    <button className="flex items-center justify-center gap-1 ml-auto md:ml-0 px-5 py-2.5 bg-primary-50 text-primary-600 rounded-xl text-[13px] font-bold hover:bg-primary-100 transition-colors">
                      View Details <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </UniversityLayout>
  );
}