import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, FolderKanban, Users, Clock, CheckCircle2, LayoutGrid, List } from "lucide-react";

// Components
import { ProjectCard } from "@/components/projects/ProjectCard";
import { SmartFilter } from "@/components/shared/SmartFilter"; // ✅ Use Global Filter

// Data & Types
import { mockProjects } from "@/data/projectData";
import type { FilterSectionConfig } from "@/types/filters.types";

const ITEMS_PER_PAGE = 6;

// --- FILTER CONFIGURATION ---
const PROJECT_FILTER_CONFIG: FilterSectionConfig[] = [
  {
    id: 'search',
    title: 'Search Projects',
    icon: FolderKanban,
    type: 'text',
    placeholder: 'e.g. AI Research...',
    isOpenDefault: true
  },
  {
    id: 'status',
    title: 'Status',
    icon: CheckCircle2,
    type: 'checkbox', // Multi-select status
    options: [
      { label: 'Active', value: 'active', count: mockProjects.filter(p => p.status === 'active').length },
      { label: 'In Progress', value: 'in_progress', count: mockProjects.filter(p => p.status === 'in_progress').length },
      { label: 'Completed', value: 'completed', count: mockProjects.filter(p => p.status === 'completed').length },
      { label: 'Draft', value: 'draft', count: mockProjects.filter(p => p.status === 'draft').length },
    ],
    isOpenDefault: true
  },
  {
    id: 'skills',
    title: 'Required Skills',
    icon: Users,
    type: 'tags',
    options: [
      { label: 'React', value: 'React' },
      { label: 'Python', value: 'Python' },
      { label: 'Node.js', value: 'Node.js' },
      { label: 'Design', value: 'Design' },
      { label: 'Machine Learning', value: 'Machine Learning' },
    ],
    isOpenDefault: true
  }
];

export const ProjectsList = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter State
  const [filters, setFilters] = useState({
    search: "",
    status: [] as string[],
    skills: [] as string[],
  });

  // --- Filtering Logic ---
  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      // 1. Search
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesSearch = 
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // 2. Status
      if (filters.status.length > 0 && !filters.status.includes(project.status)) {
        return false;
      }

      // 3. Skills (Match ANY)
      if (filters.skills.length > 0) {
        const hasSkill = filters.skills.some(skill => 
          project.skills.some(pSkill => pSkill.toLowerCase().includes(skill.toLowerCase()))
        );
        if (!hasSkill) return false;
      }

      return true;
    });
  }, [filters]);

  // --- Pagination ---
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // --- Metrics ---
  const metrics = {
    total: mockProjects.length,
    active: mockProjects.filter(p => p.status === "active").length,
    applications: mockProjects.reduce((acc, p) => acc + (p.applicationCount || 0), 0),
    inProgress: mockProjects.filter(p => p.status === "in_progress").length
  };

  // Handlers
  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilters({ search: "", status: [], skills: [] });
    setCurrentPage(1);
  };

  return (
    // ✅ NO wrapper div with 'lg:pl-[280px]'. Layout handles it.
    <div className="space-y-8 animate-fade-in pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display tracking-tight">Projects</h1>
          <p className="text-gray-500 mt-1 text-sm">Manage student projects and collaborations.</p>
        </div>
        <button
          onClick={() => navigate("/company/projects/new")}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg shadow-primary-600/20 transition-all hover:-translate-y-0.5 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Post Project
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Projects" value={metrics.total} icon={<FolderKanban className="w-5 h-5"/>} color="blue" />
        <StatCard label="Active Now" value={metrics.active} icon={<CheckCircle2 className="w-5 h-5"/>} color="emerald" />
        <StatCard label="Total Applications" value={metrics.applications} icon={<Users className="w-5 h-5"/>} color="purple" />
        <StatCard label="In Progress" value={metrics.inProgress} icon={<Clock className="w-5 h-5"/>} color="amber" />
      </div>

      {/* Main Content Grid */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left: Filters */}
        <aside className="w-full lg:w-[280px] shrink-0 space-y-4">
          <SmartFilter 
            config={PROJECT_FILTER_CONFIG}
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
              Showing <span className="text-gray-900 font-bold">{filteredProjects.length}</span> projects
            </span>
            <div className="flex items-center gap-2">
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

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-2' : 'grid-cols-1'}`}>
              {paginatedProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4"><FolderKanban className="w-8 h-8 text-gray-400" /></div>
              <h3 className="text-lg font-bold text-gray-900">No projects found</h3>
              <p className="text-gray-500 text-sm mt-1 mb-6">Try adjusting your filters or search terms.</p>
              <button onClick={clearAllFilters} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50">Clear Filters</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// --- Helper Stat Card ---
const StatCard = ({ label, value, icon, color }: any) => {
  const styles: any = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
  };
  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4 group cursor-default">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-110 ${styles[color]}`}>{icon}</div>
      <div>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
      </div>
    </div>
  );
};

export default ProjectsList;