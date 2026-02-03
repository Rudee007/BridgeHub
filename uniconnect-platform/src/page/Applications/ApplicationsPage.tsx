import React, { useState, useMemo } from "react";
import { 
  Search, Filter, Download, LayoutGrid, List as ListIcon, 
  ChevronLeft, ChevronRight, Briefcase, Star, Trophy, X, SearchX
} from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MOCK_APPLICATIONS, STAGES, type Application } from "@/data/applicationData";
import { ListViewCard } from "@/components/application/ListViewCard";
import { TalentProfileModal } from "@/components/talent/TalentProfileModal";
import { cn } from "@/lib/utils";
import type { TalentProfile } from "@/types/talent.types";

const ITEMS_PER_PAGE = 6;

export const ApplicationsPage = () => {
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  
  // --- FILTER STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Jobs");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  // --- MODAL STATE ---
  const [selectedApp, setSelectedApp] = useState<TalentProfile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- FILTERING LOGIC ---
  const filteredApps = useMemo(() => {
    if (!MOCK_APPLICATIONS) return [];
    
    return MOCK_APPLICATIONS.filter((app) => {
      const query = searchQuery.toLowerCase();
      
      // 1. Search (Name, Uni, Role)
      const matchesSearch = 
        !query ||
        app.name.toLowerCase().includes(query) ||
        app.university.toLowerCase().includes(query) ||
        app.role.toLowerCase().includes(query);

      // 2. Dropdowns
      const matchesRole = roleFilter === "All Jobs" || app.role === roleFilter;
      const matchesStatus = statusFilter === "All Statuses" || app.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [searchQuery, roleFilter, statusFilter]);

  // Dynamic Options for Filters
  const uniqueRoles = Array.from(new Set(MOCK_APPLICATIONS.map(a => a.role)));
  const uniqueStatuses = ["Active", "On Hold", "Rejected"];

  // --- PAGINATION ---
  const totalPages = Math.ceil(filteredApps.length / ITEMS_PER_PAGE);
  const paginatedApps = filteredApps.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // --- HANDLERS ---
  const handleOpenProfile = (app: Application) => {
    // ✅ Fix: Safe Data Mapping to prevent Modal Crash
    const fullProfile: TalentProfile = {
      id: app.id,
      name: app.name,
      avatar: app.avatar,
      primaryRole: app.role,
      university: app.university,
      degree: app.degree,
      graduationYear: 2025,
      location: "Bangalore, India",
      status: "available",
      experienceLevel: 'fresher',
      isVerified: true,
      rating: app.rating,
      projectsCompleted: Math.floor(Math.random() * 10) + 1, // Mock data
      successRate: 90 + Math.floor(Math.random() * 10),      // Mock data
      cgpa: 8.5,
      bio: `${app.name} is a strong candidate for the ${app.role} position. They studied at ${app.university} and have maintained a high performance rating.`,
      skills: ["React", "Node.js", "TypeScript", "Problem Solving"],
      socials: { linkedin: "#", github: "#" },
      availability: "Immediate",
      languages: ["English"],
      projects: [],
      experience: []
    };
    
    setSelectedApp(fullProfile);
    setIsModalOpen(true);
  };

  // Stats
  const stats = {
    total: MOCK_APPLICATIONS.length,
    new: MOCK_APPLICATIONS.filter(a => a.stage === 'Applied').length,
    review: MOCK_APPLICATIONS.filter(a => ['Screening', 'Technical'].includes(a.stage)).length,
    hired: MOCK_APPLICATIONS.filter(a => a.stage === 'Hired').length
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      
        <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-display">Applications</h1>
              <p className="text-gray-500 mt-1 text-sm">Track and manage candidate pipeline.</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 shadow-sm transition-all active:scale-95">
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Applications" value={stats.total} icon={<Briefcase className="w-5 h-5 text-blue-600"/>} color="blue" />
            <StatCard label="New Today" value={stats.new} sub="+2 from yesterday" icon={<Star className="w-5 h-5 text-emerald-600"/>} color="emerald" />
            <StatCard label="In Review" value={stats.review} icon={<Search className="w-5 h-5 text-amber-600"/>} color="amber" />
            <StatCard label="Hired" value={stats.hired} icon={<Trophy className="w-5 h-5 text-purple-600"/>} color="purple" />
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-2 rounded-xl border border-gray-200 shadow-sm sticky top-4 z-30">
            {/* View Toggle */}
            <div className="flex bg-gray-100/80 p-1 rounded-lg shrink-0">
              <button onClick={() => setViewMode('list')} className={cn("flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all", viewMode === 'list' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700")}>
                <ListIcon className="w-4 h-4" /> List
              </button>
              <button onClick={() => setViewMode('kanban')} className={cn("flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all", viewMode === 'kanban' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700")}>
                <LayoutGrid className="w-4 h-4" /> Board
              </button>
            </div>

            {/* Search */}
            <div className="relative flex-1 w-full md:max-w-md group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-500" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, role, or university..." 
                className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all" 
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
               <FilterSelect 
                 label="All Jobs" 
                 value={roleFilter} 
                 options={uniqueRoles} 
                 onChange={setRoleFilter} 
               />
               <FilterSelect 
                 label="All Statuses" 
                 value={statusFilter} 
                 options={uniqueStatuses} 
                 onChange={setStatusFilter} 
               />
            </div>
          </div>

          {/* --- CONTENT AREA --- */}
          <div className="animate-fade-in min-h-[500px]">
            {filteredApps.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="bg-gray-100 p-4 rounded-full mb-3"><SearchX className="w-8 h-8 text-gray-400"/></div>
                  <h3 className="text-gray-900 font-bold">No applications found</h3>
                  <p className="text-gray-500 text-sm mt-1">Try adjusting your filters or search terms.</p>
                  <button 
                    onClick={() => { setSearchQuery(""); setRoleFilter("All Jobs"); setStatusFilter("All Statuses"); }}
                    className="mt-4 text-primary-600 text-sm font-semibold hover:underline"
                  >
                    Clear all filters
                  </button>
               </div>
            ) : viewMode === 'kanban' ? (
              // KANBAN VIEW
              <div className="flex gap-6 overflow-x-auto pb-6">
                {STAGES.map((stage) => (
                  <KanbanColumn 
                    key={stage} 
                    title={stage} 
                    count={filteredApps.filter(a => a.stage === stage).length}
                    applications={filteredApps.filter(a => a.stage === stage)}
                    onProfile={handleOpenProfile}
                  />
                ))}
              </div>
            ) : (
              // LIST VIEW
              <div className="space-y-4">
                {paginatedApps.map((app) => (
                  <ListViewCard 
                    key={app.id} 
                    app={app} 
                    onViewProfile={handleOpenProfile} 
                    onReview={() => console.log('Review')}
                  />
                ))}
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 pt-6 mt-6 gap-4">
                    <div className="text-sm text-gray-500 font-medium">
                      Showing <span className="font-bold text-gray-900">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> - <span className="font-bold text-gray-900">{Math.min(currentPage * ITEMS_PER_PAGE, filteredApps.length)}</span> of {filteredApps.length}
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-200 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed bg-gray-50 text-gray-600"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-1">
                        {Array.from({length: totalPages}).map((_, i) => (
                          <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={cn(
                              "w-8 h-8 rounded-lg text-sm font-semibold transition-all",
                              currentPage === i + 1 ? "bg-gray-900 text-white shadow-md" : "text-gray-600 hover:bg-gray-100"
                            )}
                          >
                            {i + 1}
                          </button>
                        ))}
                      </div>
                      <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-200 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed bg-gray-50 text-gray-600"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
      </div>

      {/* --- PROFILE MODAL (Z-Index Fixed) --- */}
      <div className="relative z-[100]">
        <TalentProfileModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          profile={selectedApp}
          onInvite={(p) => console.log("Invite", p.name)}
        />
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const StatCard = ({ label, value, sub, icon, color }: any) => {
    const bgStyles: any = {
      blue: "bg-blue-50 border-blue-100 text-blue-600",
      emerald: "bg-emerald-50 border-emerald-100 text-emerald-600",
      amber: "bg-amber-50 border-amber-100 text-amber-600",
      purple: "bg-purple-50 border-purple-100 text-purple-600",
    };
    return (
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group">
        <div className="flex justify-between items-start">
          <div>
             <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
             <p className="text-sm text-gray-500 font-medium">{label}</p>
             {sub && <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>{sub}
             </p>}
          </div>
          <div className={`p-3 rounded-lg border ${bgStyles[color]} group-hover:scale-110 transition-transform`}>
             {icon}
          </div>
        </div>
      </div>
    );
}

const FilterSelect = ({ label, value, options = [], onChange }: any) => (
    <div className="relative group min-w-[140px]">
        <select 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none w-full pl-3 pr-8 py-2 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-100 cursor-pointer transition-all"
        >
          <option value={label}>{label}</option>
          {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <Filter className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
);

const KanbanColumn = ({ title, count, applications, onProfile }: any) => {
    const stageColors: Record<string, string> = {
      'Applied': 'bg-gray-100 text-gray-600',
      'Screening': 'bg-blue-50 text-blue-600',
      'Technical': 'bg-indigo-50 text-indigo-600',
      'HR Round': 'bg-amber-50 text-amber-600',
      'Offer': 'bg-emerald-50 text-emerald-600',
      'Hired': 'bg-green-50 text-green-700',
    };

    return (
        <div className="flex-shrink-0 w-80 flex flex-col gap-4">
             <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                   <span className={`w-2.5 h-2.5 rounded-full ${stageColors[title]?.replace('text', 'bg').replace('50', '500') || 'bg-gray-400'}`} />
                   <h3 className="font-bold text-gray-700 text-sm">{title}</h3>
                </div>
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">{count}</span>
             </div>

             <div className="flex flex-col gap-3 h-full">
                {applications.map((app: Application) => (
                    <div 
                      key={app.id} 
                      onClick={() => onProfile(app)} 
                      className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md cursor-pointer hover:border-primary-200 transition-all group"
                    >
                        <div className="flex items-start justify-between mb-3">
                           <div className="flex items-center gap-3">
                              <img src={app.avatar} className="w-8 h-8 rounded-full border border-gray-100"/>
                              <div className="min-w-0">
                                <div className="font-bold text-sm group-hover:text-primary-600 transition-colors truncate">{app.name}</div>
                                <div className="text-xs text-gray-500 truncate">{app.university}</div>
                              </div>
                           </div>
                        </div>
                        <div className="text-xs font-medium text-gray-600 bg-gray-50 px-2 py-1 rounded inline-block truncate max-w-full">{app.role}</div>
                    </div>
                ))}
             </div>
        </div>
    )
}