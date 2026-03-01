import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, Search, MapPin, Users, Briefcase, Star, 
  Clock, ChevronDown, Plus, ShieldCheck, Check,
  LayoutGrid, List, ChevronLeft, ChevronRight
} from "lucide-react";
import { UniversityLayout } from "@/components/university/UniversityLayout";
import { CompanyPartnerModal, type CompanyType } from "@/components/university/dashboard/CompanyPartnerModal";

// --- Mock Data (Expanded for Pagination) ---
const initialCompanies: CompanyType[] = Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  name: ["Stripe India", "Freshworks", "Zomato", "Razorpay", "Cred", "Swiggy", "Postman", "Zerodha"][i % 8] + (i > 7 ? ` ${i}` : ""),
  location: ["Bangalore, India", "Chennai, Tamil Nadu", "Gurgaon, Haryana", "Pune, Maharashtra"][i % 4],
  est: ["2010", "2012", "2008", "2014", "2018"][i % 5],
  rating: [4.9, 4.7, 4.5, 4.8, 4.6][i % 5],
  reviews: Math.floor(Math.random() * 200) + 50,
  status: ["ACTIVE PARTNER", "PENDING REQUEST", "NOT CONNECTED"][i % 3],
  statusColor: ["text-emerald-600", "text-amber-500", "text-gray-500"][i % 3],
  industry: [["Computer Science", "Electrical"], ["SaaS", "AI", "Cloud"], ["FoodTech", "Logistics"], ["FinTech", "Payments", "Web3"]][i % 4],
  metrics: { 
    students: ["12.0k", "15.0k", "6.0k", "18.5k"][i % 4], 
    projects: [45, 18, 0, 32][i % 4], 
    hired: [23, 8, 0, 56][i % 4] 
  },
  about: "A leading technology company building innovative solutions for the modern internet economy.",
  contractStart: i % 3 === 0 ? "12 Aug 2023" : "-",
  renewalDate: i % 3 === 0 ? "12 Aug 2025" : "-",
  nextDrive: i % 3 === 0 ? "15 Oct 2025" : "-",
  poc: { name: "Ananya Sharma", role: "Campus Recruitment", email: "contact@company.com" },
  avgPackage: ["22 LPA", "15 LPA", "18 LPA", "16 LPA"][i % 4],
  highestPackage: ["42 LPA", "18 LPA", "24 LPA", "30 LPA"][i % 4]
}));

export function CompanyPartners() {
  const [selectedCompany, setSelectedCompany] = useState<CompanyType | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<"overview" | "partnership">("overview");
  
  // --- Filters & View State ---
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleStatusToggle = (status: string) => {
    setStatusFilter(prev => prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]);
  };

  // --- Derived State & Logic ---
  const filteredCompanies = useMemo(() => {
    return initialCompanies.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter.length === 0 || statusFilter.includes(c.status);
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  // Reset to page 1 when filters change
  useMemo(() => { setCurrentPage(1); }, [searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCompanies = filteredCompanies.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  return (
    <UniversityLayout universityName="IIT Bombay">
      <div className="max-w-[1400px] mx-auto space-y-8 pb-12">
        
        {/* 1. Header & KPIs */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-[26px] font-extrabold text-gray-900 tracking-tight">
                Company Partners
              </h1>
              <p className="text-[14px] font-medium text-gray-500 mt-1">
                Manage corporate collaborations and campus recruitment pipelines.
              </p>
            </div>
            <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-[14px] font-bold rounded-xl shadow-sm transition-all">
              <Plus className="w-4 h-4" />
              Find Companies
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-[20px] p-5 shadow-sm flex flex-col justify-center items-center md:items-start text-center md:text-left gap-3">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[24px] font-extrabold text-gray-900 leading-tight">14</p>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Total Partners</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-[20px] p-5 shadow-sm flex flex-col justify-center items-center md:items-start text-center md:text-left gap-3">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[24px] font-extrabold text-gray-900 leading-tight">149</p>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Active Projects</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-[20px] p-5 shadow-sm flex flex-col justify-center items-center md:items-start text-center md:text-left gap-3">
              <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[24px] font-extrabold text-gray-900 leading-tight">342</p>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Students Hired</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-[20px] p-5 shadow-sm flex flex-col justify-center items-center md:items-start text-center md:text-left gap-3">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[24px] font-extrabold text-gray-900 leading-tight">5</p>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Pending Requests</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Main Layout (Sidebar + Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* LEFT: Static UI Filters Sidebar (Wrapped in white card) */}
          <div className="lg:col-span-1 lg:sticky lg:top-6 self-start bg-white border border-gray-200 rounded-[20px] p-6 shadow-sm flex flex-col gap-6">
            <h3 className="text-[13px] font-bold text-gray-900 uppercase tracking-widest">Filters</h3>
            
            <div className="space-y-2">
              <label className="text-[12px] font-semibold text-gray-700 flex items-center gap-1.5"><Search className="w-3.5 h-3.5"/> Search Name</label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="e.g. Stripe, Freshworks..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[13px] text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm" 
                />
              </div>
            </div>

            <div className="space-y-3 pt-5 border-t border-gray-100">
              <label className="text-[12px] font-semibold text-gray-700 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5"/> Partnership Status</label>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Active Partner", value: "ACTIVE PARTNER", count: 12 },
                  { label: "Pending Request", value: "PENDING REQUEST", count: 5 },
                  { label: "Not Connected", value: "NOT CONNECTED", count: 45 }
                ].map(status => (
                  <label key={status.value} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${statusFilter.includes(status.value) ? 'bg-primary-600 border-primary-600' : 'border-gray-300 bg-white group-hover:border-primary-500'}`}>
                        {statusFilter.includes(status.value) && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <input type="checkbox" className="hidden" checked={statusFilter.includes(status.value)} onChange={() => handleStatusToggle(status.value)} />
                      <span className="text-[13px] font-medium text-gray-700 group-hover:text-gray-900">{status.label}</span>
                    </div>
                    <span className="text-[11px] text-gray-500 font-medium bg-gray-100/80 px-1.5 py-0.5 rounded">{status.count}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-5 border-t border-gray-100">
              <label className="text-[12px] font-semibold text-gray-700 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5"/> Location</label>
              <div className="relative shadow-sm">
                <select className="w-full pl-4 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[13px] text-gray-700 outline-none appearance-none cursor-pointer">
                  <option>All Locations</option>
                  <option>Bangalore</option>
                  <option>Remote</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* RIGHT: Main Content */}
          <div className="lg:col-span-3 flex flex-col min-h-[600px]">
            
            {/* ✅ Full White View Toggle Bar (Matches image_8a9487.png exactly) */}
            <div className="bg-white px-5 py-3 rounded-[16px] border border-gray-200 shadow-sm flex items-center justify-between mb-6">
              <span className="text-[14px] text-gray-600">
                Showing <span className="font-bold text-gray-900">{filteredCompanies.length}</span> companies
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

            {/* Cards Feed */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {filteredCompanies.length === 0 ? (
                   <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[20px] border border-gray-200 shadow-sm">
                     <Search className="w-12 h-12 text-gray-300 mb-4" />
                     <p className="text-lg font-bold text-gray-900">No companies found</p>
                   </motion.div>
                ) : viewMode === "grid" ? (

                  /* --- GRID VIEW (Big Cards matching image_5668f5.jpg) --- */
                  <motion.div 
                    key="grid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
                  >
                    {currentCompanies.map((company) => (
                      <div key={company.id} className="bg-white border border-gray-200 rounded-[20px] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col group">
                        
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                              <Building2 className="w-5 h-5 text-gray-400" />
                            </div>
                            <div>
                              <h3 className="text-[15px] font-bold text-gray-900 leading-tight truncate max-w-[120px]">{company.name}</h3>
                              <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5 truncate"><MapPin className="w-3 h-3 shrink-0"/> {company.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] font-bold text-gray-700 shrink-0">
                            {company.rating} <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="text-gray-400 font-medium ml-0.5">({company.reviews})</span>
                          </div>
                        </div>

                        {/* Status (Bold text, no pill background to match the image) */}
                        <div className="mb-4">
                          <span className={`text-[11px] font-extrabold uppercase tracking-widest ${company.statusColor}`}>
                            {company.status}
                          </span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {company.industry.map(ind => <span key={ind} className="px-2.5 py-1 bg-white text-gray-600 text-[10px] font-bold rounded-md border border-gray-200">{ind}</span>)}
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 mb-6 text-center">
                          <div>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1 flex items-center justify-center gap-1"><Users className="w-3 h-3"/> Students</p>
                            <p className="text-[15px] font-bold text-gray-900">{company.metrics.students}</p>
                          </div>
                          <div className="border-x border-gray-100">
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1 flex items-center justify-center gap-1"><Briefcase className="w-3 h-3"/> Projects</p>
                            <p className="text-[15px] font-bold text-gray-900">{company.metrics.projects}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1 flex items-center justify-center gap-1"><ShieldCheck className="w-3 h-3"/> Hired</p>
                            <p className="text-[15px] font-bold text-gray-900">{company.metrics.hired}</p>
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-auto flex items-center gap-2">
                          <button onClick={() => { setSelectedCompany(company); setModalInitialTab("overview"); }} className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-[12px] font-bold transition-colors">
                            View Profile
                          </button>
                          {company.status === "ACTIVE PARTNER" || company.status === "PENDING REQUEST" ? (
                            <button onClick={() => { setSelectedCompany(company); setModalInitialTab("partnership"); }} className="flex-1 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-[12px] font-bold transition-colors shadow-sm">
                              View Partnership
                            </button>
                          ) : (
                            <button className="flex-1 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl text-[12px] font-bold transition-colors shadow-sm">
                              Connect
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                ) : (

                  /* --- LIST VIEW (Small Cards / Rows) --- */
                  <motion.div 
                    key="list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                    className="flex flex-col gap-4"
                  >
                    {currentCompanies.map((company) => (
                      <div key={company.id} className="bg-white border border-gray-200 rounded-[20px] p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group">
                        
                        {/* Left: Logo & Details */}
                        <div className="flex items-center gap-4 w-full md:w-auto">
                          <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                            <Building2 className="w-6 h-6 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-[16px] font-bold text-gray-900 leading-tight">{company.name}</h3>
                              <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded border ${
                                company.status === "ACTIVE PARTNER" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                company.status === "PENDING REQUEST" ? "bg-orange-50 text-orange-600 border-orange-100" :
                                "bg-gray-50 text-gray-500 border-gray-200"
                              }`}>
                                {company.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-[12px] text-gray-500">
                              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> {company.location}</span>
                              <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400"/> {company.rating}</span>
                            </div>
                          </div>
                        </div>

                        {/* Middle: Metrics (Inline) */}
                        <div className="flex items-center gap-6 w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Students</span>
                            <span className="text-[14px] font-bold text-gray-900">{company.metrics.students}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Projects</span>
                            <span className="text-[14px] font-bold text-gray-900">{company.metrics.projects}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Hired</span>
                            <span className="text-[14px] font-bold text-gray-900">{company.metrics.hired}</span>
                          </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2 w-full md:w-auto">
                          <button onClick={() => { setSelectedCompany(company); setModalInitialTab("overview"); }} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-[12px] font-bold transition-colors">
                            Profile
                          </button>
                          {company.status === "ACTIVE PARTNER" || company.status === "PENDING REQUEST" ? (
                            <button onClick={() => { setSelectedCompany(company); setModalInitialTab("partnership"); }} className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-[12px] font-bold transition-colors shadow-sm">
                              Partnership
                            </button>
                          ) : (
                            <button className="px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-xl text-[12px] font-bold transition-colors shadow-sm">
                              Connect
                            </button>
                          )}
                        </div>

                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pagination Component */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 pt-6">
                <span className="text-[13px] font-medium text-gray-500">
                  Showing <span className="font-bold text-gray-900">{startIndex + 1}</span> to <span className="font-bold text-gray-900">{Math.min(startIndex + itemsPerPage, filteredCompanies.length)}</span> of <span className="font-bold text-gray-900">{filteredCompanies.length}</span> results
                </span>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white shadow-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const page = idx + 1;
                      const isActive = currentPage === page;
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-8 h-8 rounded-lg text-[13px] font-bold transition-all ${
                            isActive ? "bg-gray-900 text-white shadow-md" : "text-gray-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white shadow-sm"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* MODAL PORTAL */}
        <AnimatePresence>
          {selectedCompany && (
            <CompanyPartnerModal 
              company={selectedCompany} 
              onClose={() => setSelectedCompany(null)} 
              initialTab={modalInitialTab} 
            />
          )}
        </AnimatePresence>

      </div>
    </UniversityLayout>
  );
}