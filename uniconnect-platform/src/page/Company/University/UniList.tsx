// page/Company/University/UniList.tsx
import { useState, useMemo } from "react";
import { Plus, Handshake, Briefcase, Users, Clock, ChevronLeft, ChevronRight, LayoutGrid, List, Search } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar"; // Importing your existing Sidebar

// Components we built
import { UniversityCard } from "@/components/universities/UniversityCard";
import { UniversityFiltersComponent } from "@/components/universities/UniversityFilters";

// Data & Types
import { mockUniversities } from "@/data/universityData";
import type{ UniversityFilters } from "@/types/university.types";

const ITEMS_PER_PAGE = 6;

export const UniList = () => {
  // --- State ---
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<UniversityFilters>({
    location: "all",
    state: "all",
    departments: [],
    specializations: [],
    studentCount: "all",
    partnershipStatus: "All",
  });

  // --- Filtering Logic ---
  const filteredUniversities = useMemo(() => {
    return mockUniversities.filter((uni) => {
      const searchLower = searchQuery.toLowerCase();
      
      // 1. Search Query
      const matchesSearch = 
        !searchQuery ||
        uni.name.toLowerCase().includes(searchLower) ||
        uni.location.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;

      // 2. Partnership Status
      if (filters.partnershipStatus !== "All" && 
          uni.partnershipStatus !== filters.partnershipStatus.toLowerCase()) {
        return false;
      }

      // 3. State
      if (filters.state !== "all" && uni.state !== filters.state) {
        return false;
      }

      // 4. Departments
      if (filters.departments.length > 0) {
        const hasRequiredDepts = filters.departments.every(dept => 
          uni.departments.includes(dept)
        );
        if (!hasRequiredDepts) return false;
      }

      // 5. Specializations
      if (filters.specializations.length > 0) {
        const hasSpec = filters.specializations.some(spec => 
          uni.specializations.includes(spec)
        );
        if (!hasSpec) return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  // --- Metrics ---
  const metrics = useMemo(() => {
    return {
      totalPartners: mockUniversities.filter(u => u.partnershipStatus === 'active').length,
      activeProjects: mockUniversities.reduce((acc, curr) => acc + curr.totalProjects, 0),
      studentsHired: mockUniversities.reduce((acc, curr) => acc + curr.studentsHired, 0),
      pendingRequests: mockUniversities.filter(u => u.partnershipStatus === 'pending').length,
    };
  }, []);

  // --- Pagination ---
  const totalPages = Math.ceil(filteredUniversities.length / ITEMS_PER_PAGE);
  const paginatedUniversities = filteredUniversities.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Layout Wrapper */}
      <Sidebar companyName="TechCorp" logoUrl="" />

      <div className="lg:pl-[280px]">
        {/* Main Content Container */}
        <div className="p-6 lg:p-8 space-y-8">
          
          {/* --- Header Section --- */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-display">University Partners</h1>
              <p className="text-gray-500 mt-1 text-sm">Manage academic collaborations and campus recruitment pipelines.</p>
            </div>
            <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg shadow-primary-600/20 transition-all hover:-translate-y-0.5">
               <Plus className="w-4 h-4" />
               Find Universities
            </button>
          </div>

          {/* --- Stats Row --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Partners" value={metrics.totalPartners} icon={<Handshake className="w-5 h-5" />} color="blue" />
            <StatCard label="Active Projects" value={metrics.activeProjects} icon={<Briefcase className="w-5 h-5" />} color="emerald" />
            <StatCard label="Students Hired" value={metrics.studentsHired} icon={<Users className="w-5 h-5" />} color="orange" />
            <StatCard label="Pending Requests" value={metrics.pendingRequests} icon={<Clock className="w-5 h-5" />} color="purple" />
          </div>

          {/* --- Content Layout (Filters + Grid) --- */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left Column: Sticky Filters */}
            <aside className="w-full lg:w-[280px] shrink-0">
              <UniversityFiltersComponent 
                filters={filters}
                onFiltersChange={(newFilters) => {
                  setFilters(newFilters);
                  setCurrentPage(1);
                }}
                searchQuery={searchQuery}
                onSearchChange={(q) => {
                  setSearchQuery(q);
                  setCurrentPage(1);
                }}
                totalResults={filteredUniversities.length}
              />
            </aside>

            {/* Right Column: Results Grid */}
            <div className="flex-1 w-full">
              
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-6 bg-white p-2 pl-4 rounded-xl border border-gray-200 shadow-sm">
                <span className="text-sm font-medium text-gray-600">
                  Showing <span className="text-gray-900 font-bold">{filteredUniversities.length}</span> universities
                </span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Grid / List View */}
              {filteredUniversities.length > 0 ? (
                <div className="space-y-8 animate-fade-in">
                  <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                    {paginatedUniversities.map((uni) => (
                      <UniversityCard 
                        key={uni.id} 
                        university={uni} 
                        onViewProfile={(id) => console.log('View', id)} 
                        onViewPartnership={(id) => console.log('Partner', id)} 
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between bg-white px-4 py-3 border border-gray-200 rounded-xl shadow-sm">
                       <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" /> Prev
                        </button>
                        
                        <div className="flex items-center gap-2">
                          {Array.from({ length: totalPages }).map((_, i) => (
                             <button
                               key={i}
                               onClick={() => handlePageChange(i + 1)}
                               className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                                 currentPage === i + 1 
                                   ? 'bg-primary-600 text-white shadow-md shadow-primary-600/20' 
                                   : 'bg-transparent text-gray-600 hover:bg-gray-50'
                               }`}
                             >
                               {i + 1}
                             </button>
                          ))}
                        </div>

                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Next <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-dashed border-gray-300">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">No universities found</h3>
                  <p className="text-gray-500 text-sm mt-1 max-w-xs text-center">We couldn't find any universities matching your filters.</p>
                  <button 
                    onClick={() => {
                      setFilters({ location: "all", state: "all", departments: [], specializations: [], studentCount: "all", partnershipStatus: "All" });
                      setSearchQuery("");
                    }}
                    className="mt-6 px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Stat Card ---
const StatCard = ({ label, value, icon, color }: { label: string, value: number, icon: React.ReactNode, color: 'blue' | 'emerald' | 'orange' | 'purple' }) => {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4 group">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-110 ${colorStyles[color]}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
      </div>
    </div>
  );
};

export default UniList;