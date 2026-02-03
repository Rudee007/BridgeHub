import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Grid3x3, List, Briefcase, Users, CheckCircle, Clock, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import { JobCard } from "@/components/jobs/JobCard";
import { SmartFilter } from "@/components/shared/SmartFilter"; // ✅ Using Global Filter
import { mockJobs } from "@/data/jobsData";
import type { FilterSectionConfig } from "@/types/filters.types";

const ITEMS_PER_PAGE = 6;

// --- Filter Config ---
const JOB_FILTER_CONFIG: FilterSectionConfig[] = [
  {
    id: 'search',
    title: 'Search Jobs',
    icon: Briefcase,
    type: 'text',
    placeholder: 'e.g. Senior React Developer...',
    isOpenDefault: true
  },
  {
    id: 'status',
    title: 'Status',
    icon: CheckCircle,
    type: 'checkbox',
    options: [
      { label: 'Active', value: 'active', count: mockJobs.filter(j => j.status === 'active').length },
      { label: 'Paused', value: 'paused', count: mockJobs.filter(j => j.status === 'paused').length },
      { label: 'Closed', value: 'closed', count: mockJobs.filter(j => j.status === 'closed').length },
      { label: 'Draft', value: 'draft', count: mockJobs.filter(j => j.status === 'draft').length },
    ],
    isOpenDefault: true
  },
  {
    id: 'type',
    title: 'Job Type',
    icon: Clock,
    type: 'checkbox',
    options: [
      { label: 'Full-time', value: 'full_time' },
      { label: 'Part-time', value: 'part_time' },
      { label: 'Contract', value: 'contract' },
      { label: 'Internship', value: 'internship' },
    ]
  }
];

export const JobsList = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter State
  const [filters, setFilters] = useState({
    search: "",
    status: [] as string[],
    type: [] as string[],
  });

  // Metrics
  const metrics = useMemo(() => ({
    total: mockJobs.length,
    active: mockJobs.filter((j) => j.status === "active").length,
    applications: mockJobs.reduce((sum, j) => sum + j.stats.applied, 0),
    paused: mockJobs.filter((j) => j.status === "paused").length,
  }), []);

  // Filter Logic
  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      // 1. Search
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesSearch = 
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // 2. Status
      if (filters.status.length > 0 && !filters.status.includes(job.status)) {
        return false;
      }

      // 3. Job Type
      if (filters.type.length > 0 && !filters.type.includes(job.jobType)) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({ search: "", status: [], type: [] });
    setCurrentPage(1);
  };

  return (
    // ✅ No sidebar/navbar/padding wrappers.
    <div className="space-y-8 animate-fade-in pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display tracking-tight">Jobs</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage job postings and applications.</p>
        </div>
        <button
          onClick={() => navigate("/company/jobs/new")}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg shadow-primary-600/20 transition-all hover:-translate-y-0.5 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Post Job
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Jobs" value={metrics.total} icon={<Briefcase className="w-5 h-5"/>} color="blue" />
        <StatCard label="Active Now" value={metrics.active} icon={<CheckCircle className="w-5 h-5"/>} color="emerald" />
        <StatCard label="Total Applications" value={metrics.applications} icon={<Users className="w-5 h-5"/>} color="purple" />
        <StatCard label="Paused" value={metrics.paused} icon={<Clock className="w-5 h-5"/>} color="amber" />
      </div>

      {/* Main Content Grid */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left: Filters */}
        <aside className="w-full lg:w-[280px] shrink-0 space-y-4">
          <SmartFilter 
            config={JOB_FILTER_CONFIG}
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
              Showing <span className="text-gray-900 font-bold">{filteredJobs.length}</span> jobs
            </span>
            <div className="flex items-center gap-2">
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Jobs Grid */}
          {filteredJobs.length > 0 ? (
            <div className={viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-5" : "space-y-4"}>
              {filteredJobs.map((job, index) => (
                <JobCard key={job.id} job={job} index={index} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4"><Briefcase className="w-8 h-8 text-gray-400" /></div>
              <h3 className="text-lg font-bold text-gray-900">No jobs found</h3>
              <p className="text-gray-500 text-sm mt-1 mb-6">Try adjusting your filters or search terms.</p>
              <button onClick={clearAllFilters} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">Clear Filters</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// Helper Stat Card
const StatCard = ({ label, value, icon, color }: any) => {
  const styles: any = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
  };
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${styles[color]}`}>{icon}</div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
      </div>
    </div>
  );
};