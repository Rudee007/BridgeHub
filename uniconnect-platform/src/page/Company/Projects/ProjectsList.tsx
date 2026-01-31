// page/Company/Projects/ProjectsList.tsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Grid3x3, List } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ProjectMetrics } from "@/components/projects/ProjectMetrics";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { EmptyState } from "@/components/projects/EmptyState";
import { mockProjects } from "@/data/projectData";
import type { ProjectFilters as Filters } from "@/types/projects.types";

export const ProjectsList = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<Filters>({
    status: [],
    category: [],
    academicLevel: [],
    compensation: [],
    search: "",
  });

  // Filter projects
  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      // Status filter
      if (filters.status.length > 0 && !filters.status.includes(project.status)) {
        return false;
      }

      // Category filter
      if (filters.category.length > 0 && !filters.category.includes(project.category)) {
        return false;
      }

      // Compensation filter
      if (filters.compensation.length > 0 && !filters.compensation.includes(project.compensation.type)) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.skills.some((skill) => skill.toLowerCase().includes(searchLower))
        );
      }

      return true;
    });
  }, [filters]);

  // Count projects by status
  const projectCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    mockProjects.forEach((project) => {
      counts[project.status] = (counts[project.status] || 0) + 1;
    });
    return counts;
  }, []);

  const hasActiveFilters =
    filters.status.length > 0 ||
    filters.category.length > 0 ||
    filters.academicLevel.length > 0 ||
    filters.compensation.length > 0 ||
    filters.search !== "";

  const clearFilters = () => {
    setFilters({
      status: [],
      category: [],
      academicLevel: [],
      compensation: [],
      search: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar companyName="BridgeHub" logoUrl="" />

      <div className="lg:pl-[280px]">
        {/* Top Navigation */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Projects</h2>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Projects</h1>
              <p className="text-gray-600 text-sm mt-1">Manage your student projects and collaborations</p>
            </div>
            <button
              onClick={() => navigate("/company/projects/new")}
              className="px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              New Project
            </button>
          </div>

          {/* Metrics */}
          <ProjectMetrics projects={mockProjects} />

          {/* Search & View Toggle */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects by title, skills, or description..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white font-medium text-gray-700 placeholder:text-gray-400"
              />
            </div>

            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid" ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"
                } transition-colors`}
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${
                  viewMode === "list" ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"
                } transition-colors`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Content with Filters */}
          <div className="flex gap-6">
            {/* Filters Sidebar */}
            <ProjectFilters filters={filters} onFilterChange={setFilters} projectCounts={projectCounts} />

            {/* Projects Grid/List */}
            <div className="flex-1">
              {filteredProjects.length === 0 ? (
                <EmptyState hasFilters={hasActiveFilters} onClearFilters={clearFilters} />
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5"
                      : "space-y-4"
                  }
                >
                  {filteredProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              )}

              {/* Results count */}
              {filteredProjects.length > 0 && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Showing <span className="font-semibold text-gray-900">{filteredProjects.length}</span> of{" "}
                    <span className="font-semibold text-gray-900">{mockProjects.length}</span> projects
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsList;
