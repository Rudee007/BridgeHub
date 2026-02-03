import { useState, useMemo } from "react";
import { Plus, Handshake, Briefcase, Users, Clock, ChevronLeft, ChevronRight, LayoutGrid, List, Search, MapPin, GraduationCap, Zap, Building2 } from "lucide-react";

// Components
import { Sidebar } from "@/components/dashboard/Sidebar"; 
import { UniversityCard } from "@/components/universities/UniversityCard";
import { SmartFilter } from "@/components/shared/SmartFilter";
// ✅ IMPORT THE NEW MODALS
import {  UniversityProfileModal } from "@/components/universities/UniversityProfileModal";
import {  PartnershipModal } from "@/components/universities/PartnershipModal";

// Data & Types
// ✅ Use MOCK_UNIVERSITIES from the new data file (ensure path matches)
import { MOCK_UNIVERSITIES } from "@/data/universityData"; 
import type { UniversityFilters, University } from "@/types/university.types";
import type { FilterSectionConfig } from "@/types/filters.types";

const ITEMS_PER_PAGE = 6;

// --- CONFIGURATION: Filter Layout ---
const UNIVERSITY_FILTER_CONFIG: FilterSectionConfig[] = [
  {
    id: 'search',
    title: 'Search Name',
    icon: Search,
    type: 'text',
    placeholder: 'e.g. IIT Delhi...',
    isOpenDefault: true
  },
  {
    id: 'partnershipStatus',
    title: 'Partnership Status',
    icon: Handshake,
    type: 'checkbox',
    options: [
      { label: 'Active Partner', value: 'active', count: 12 },
      { label: 'Pending Request', value: 'pending', count: 5 },
      { label: 'Not Connected', value: 'none', count: 45 },
    ],
    isOpenDefault: true
  },
  {
    id: 'state',
    title: 'Location',
    icon: MapPin,
    type: 'select',
    options: [
      { label: 'Delhi', value: 'Delhi' },
      { label: 'Maharashtra', value: 'Maharashtra' },
      { label: 'Karnataka', value: 'Karnataka' },
      { label: 'Tamil Nadu', value: 'Tamil Nadu' },
    ]
  },
  {
    id: 'departments',
    title: 'Departments',
    icon: GraduationCap,
    type: 'checkbox',
    options: [
      { label: 'Computer Science', value: 'Computer Science' },
      { label: 'Information Technology', value: 'IT' }, // Adjusted value for matching
      { label: 'Electronics', value: 'Electronics' },
      { label: 'Mechanical', value: 'Mechanical' },
      { label: 'Civil', value: 'Civil' },
    ]
  },
  {
    id: 'specializations',
    title: 'Specializations',
    icon: Zap,
    type: 'tags',
    options: [
      { label: 'AI/ML', value: 'AI/ML' },
      { label: 'Data Science', value: 'Data Science' },
      { label: 'Cyber Security', value: 'Cyber Security' },
      { label: 'IoT', value: 'IoT' },
      { label: 'Robotics', value: 'Robotics' },
    ],
    isOpenDefault: true
  }
];

export const UniList = () => {
  // --- View State ---
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  
  // --- Modal State (NEW) ---
  const [selectedUni, setSelectedUni] = useState<University | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPartnershipOpen, setIsPartnershipOpen] = useState(false);

  // --- Filter State ---
  const [filters, setFilters] = useState<UniversityFilters & { search: string }>({
    search: "",
    location: "all",
    state: "",
    departments: [],
    specializations: [],
    studentCount: "all",
    partnershipStatus: [],
  });

  // --- Handlers for Modals (NEW) ---
  const handleViewProfile = (uni: University) => {
    setSelectedUni(uni);
    setIsProfileOpen(true);
  };

  const handleViewPartnership = (uni: University) => {
    setSelectedUni(uni);
    setIsPartnershipOpen(true);
  };

  // --- Filtering Logic ---
  const filteredUniversities = useMemo(() => {
    return MOCK_UNIVERSITIES.filter((uni) => { // Use MOCK_UNIVERSITIES here
      
      // 1. Search Query
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          uni.name.toLowerCase().includes(searchLower) ||
          uni.location.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // 2. Partnership Status
      if (filters.partnershipStatus.length > 0) {
        const currentStatus = Array.isArray(filters.partnershipStatus) 
           ? filters.partnershipStatus 
           : [filters.partnershipStatus];
           
        if (!currentStatus.includes('All') && !currentStatus.includes(uni.partnershipStatus)) {
             return false;
        }
      }

      // 3. State
      if (filters.state && filters.state !== "all" && uni.state !== filters.state) {
        return false;
      }

      // 4. Departments
      if (filters.departments.length > 0) {
        const hasDept = filters.departments.some(dept => 
          uni.departments.includes(dept)
        );
        if (!hasDept) return false;
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
  }, [filters]);

  // --- Metrics ---
  const metrics = useMemo(() => {
    return {
      totalPartners: MOCK_UNIVERSITIES.filter(u => u.partnershipStatus === 'active').length,
      activeProjects: MOCK_UNIVERSITIES.reduce((acc, curr) => acc + curr.totalProjects, 0),
      studentsHired: MOCK_UNIVERSITIES.reduce((acc, curr) => acc + curr.studentsHired, 0),
      pendingRequests: MOCK_UNIVERSITIES.filter(u => u.partnershipStatus === 'pending').length,
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

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({
      search: "",
      location: "all",
      state: "",
      departments: [],
      specializations: [],
      studentCount: "all",
      partnershipStatus: [],
    });
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">

        <div className="p-6 lg:p-8 space-y-8 max-w-[1600px] mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-display tracking-tight">University Partners</h1>
              <p className="text-gray-500 mt-1 text-sm">Manage academic collaborations and campus recruitment pipelines.</p>
            </div>
            <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg shadow-primary-600/20 transition-all hover:-translate-y-0.5 active:scale-95">
               <Plus className="w-4 h-4" />
               Find Universities
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Partners" value={metrics.totalPartners} icon={<Handshake className="w-5 h-5" />} color="blue" />
            <StatCard label="Active Projects" value={metrics.activeProjects} icon={<Briefcase className="w-5 h-5" />} color="emerald" />
            <StatCard label="Students Hired" value={metrics.studentsHired} icon={<Users className="w-5 h-5" />} color="orange" />
            <StatCard label="Pending Requests" value={metrics.pendingRequests} icon={<Clock className="w-5 h-5" />} color="purple" />
          </div>

          {/* Main Grid Layout */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left: Filters */}
            <aside className="w-full lg:w-[280px] shrink-0 space-y-4">
               <SmartFilter 
                 config={UNIVERSITY_FILTER_CONFIG}
                 state={filters}
                 onChange={handleFilterChange}
                 onClear={clearAllFilters}
               />
            </aside>

            {/* Right: Results */}
            <div className="flex-1 w-full min-w-0">
              
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-2 pl-4 rounded-xl border border-gray-200 shadow-sm">
                <span className="text-sm font-medium text-gray-600">
                  Showing <span className="text-gray-900 font-bold">{filteredUniversities.length}</span> universities
                </span>
                
                <div className="flex items-center gap-2">
                  <div className="h-4 w-px bg-gray-200 mx-2 hidden sm:block" />
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Cards Grid */}
              {filteredUniversities.length > 0 ? (
                <div className="space-y-8 animate-fade-up">
                  <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                    {paginatedUniversities.map((uni) => (
                      <UniversityCard 
                        key={uni.id} 
                        university={uni} 
                        // ✅ Pass the handlers correctly
                        onViewProfile={handleViewProfile} 
                        onViewPartnership={handleViewPartnership} 
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between bg-white px-4 py-3 border border-gray-200 rounded-xl shadow-sm">
                       <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                          <ChevronLeft className="w-4 h-4" /> Prev
                        </button>
                        
                        <div className="hidden sm:flex items-center gap-2">
                          {Array.from({ length: totalPages }).map((_, i) => (
                             <button key={i} onClick={() => handlePageChange(i + 1)} className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${currentPage === i + 1 ? 'bg-primary-600 text-white shadow-md' : 'bg-transparent text-gray-600 hover:bg-gray-50'}`}>
                               {i + 1}
                             </button>
                          ))}
                        </div>
                        
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                          Next <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4"><Search className="w-8 h-8 text-gray-400" /></div>
                  <h3 className="text-lg font-bold text-gray-900">No universities found</h3>
                  <p className="text-gray-500 text-sm mt-1 mb-6">We couldn't find any universities matching your filters.</p>
                  <button onClick={clearAllFilters} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">Clear all filters</button>
                </div>
              )}
            </div>
          </div>
      </div>

      {/* --- MODALS (NEW) --- */}
      <UniversityProfileModal 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        university={selectedUni}
      />
      
      <PartnershipModal 
        isOpen={isPartnershipOpen}
        onClose={() => setIsPartnershipOpen(false)}
        university={selectedUni}
      />
    </div>
  );
};

// StatCard Component
const StatCard = ({ label, value, icon, color }: { label: string, value: number, icon: React.ReactNode, color: 'blue' | 'emerald' | 'orange' | 'purple' }) => {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    orange: "bg-orange-50 text-orange-600 border-orange-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
  };
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4 group cursor-default">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-110 ${colorStyles[color]}`}>{icon}</div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
      </div>
    </div>
  );
};

export default UniList;