import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Edit, Pause, MoreVertical, Briefcase, Clock, DollarSign, 
  Users, CheckCircle, Star 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mockProjects, categoryLabels, statusLabels, academicLevelLabels } from "@/data/projectData";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const project = mockProjects.find(p => p.id === id) || mockProjects[0];

  const tabs = [
    { id: "overview", label: "Overview", count: null },
    { id: "applications", label: "Applications", count: project.applicationCount },
    { id: "shortlisted", label: "Shortlisted", count: project.shortlistedCount },
    { id: "selected", label: "Selected", count: project.selectedCount },
  ];

  const formatCompensation = () => {
    if (project.compensation.type === "unpaid") return "Unpaid";
    if (project.compensation.type === "credit") return "Academic Credit";
    if (project.compensation.amount) {
      return `₹${(project.compensation.amount / 1000).toFixed(1)}K`;
    }
    return "TBD";
  };

  const formatTimeAgo = (dateString: string) => {
    const created = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    return `${diff} days ago`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", { 
      day: "numeric", month: "short", year: "numeric" 
    });
  };

  // ✅ FIXED LAYOUT: No 'lg:pl-[280px]', no 'min-h-screen'. Fits inside CompanyLayout.
  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* 1. Header Actions (Breadcrumb & Buttons) */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/company/projects")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-semibold">Back to Projects</span>
        </button>

        <div className="flex items-center gap-2">
          <button className="p-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors text-gray-700 shadow-sm" title="Edit Project">
            <Edit className="h-4 w-4" />
          </button>
          <button className="p-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors text-gray-700 shadow-sm" title="Pause Project">
            <Pause className="h-4 w-4" />
          </button>
          <button className="p-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors text-gray-700 shadow-sm" title="More Options">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 2. Main Content Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        
        {/* Project Meta Header */}
        <div className="px-8 pt-8 pb-6 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100/80">
                  <Briefcase className="h-3.5 w-3.5 text-gray-500" />
                  <span className="font-medium text-gray-700">{categoryLabels[project.category]}</span>
                </div>
                <span className="text-gray-300">|</span>
                <span>{academicLevelLabels[project.academicLevel]}</span>
                <span className="text-gray-300">•</span>
                <span>{project.location}</span>
                <span className="text-gray-300">•</span>
                <span className="text-gray-500">Posted {formatTimeAgo(project.createdAt)}</span>
              </div>
            </div>
            <span className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wide rounded-full border border-green-100">
              {statusLabels[project.status]}
            </span>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 px-8">
          <nav className="flex gap-8" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`relative pb-4 pt-4 text-sm font-semibold transition-colors flex items-center gap-2 ${
                  activeTab === tab.id ? "text-primary-600" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
                {tab.count !== null && (
                  <span
                    className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                      activeTab === tab.id ? "bg-primary-50 text-primary-600" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content Area */}
        <div className="px-8 py-8 bg-gray-50/30 min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Left Column - Main Details */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Description */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Project Description</h3>
                    <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                      <p>{project.description}</p>
                      <p>
                        We are looking for talented students to work on this exciting project. You will collaborate 
                        with your team to deliver a high-quality solution within the specified timeline.
                      </p>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wide">Requirements</h3>

                    {/* Skills */}
                    <div className="mb-6">
                      <p className="text-xs font-semibold text-gray-500 mb-3">Required Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Meta Grid */}
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">Team Size</p>
                        <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          {project.teamSize.min}-{project.teamSize.max} members
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-1">Duration</p>
                        <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {project.duration.value} {project.duration.unit}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Stats & Info */}
                <div className="space-y-6">
                  {/* Application Stats */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wide">Pipeline</h3>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-2 rounded-lg bg-gray-50">
                        <p className="text-xl font-bold text-gray-900">{project.applicationCount}</p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">Applied</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-amber-50">
                        <p className="text-xl font-bold text-amber-700">{project.shortlistedCount}</p>
                        <p className="text-[10px] text-amber-600 font-bold uppercase mt-1">Shortlist</p>
                      </div>
                      <div className="text-center p-2 rounded-lg bg-green-50">
                        <p className="text-xl font-bold text-green-700">{project.selectedCount}</p>
                        <p className="text-[10px] text-green-600 font-bold uppercase mt-1">Selected</p>
                      </div>
                    </div>

                    {/* Funnel Bar */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium text-gray-500">Selection Rate</p>
                        <p className="text-xs font-bold text-gray-900">
                          {Math.round((project.selectedCount / project.applicationCount) * 100) || 0}%
                        </p>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary-600 rounded-full" 
                          style={{ width: `${(project.selectedCount / project.applicationCount) * 100 || 0}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Key Details */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wide">Key Details</h3>
                    <div className="space-y-5">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-50 rounded-lg text-green-600"><DollarSign className="w-4 h-4" /></div>
                          <span className="text-sm font-medium text-gray-600">Compensation</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{formatCompensation()}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Clock className="w-4 h-4" /></div>
                          <span className="text-sm font-medium text-gray-600">Deadline</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{formatDate(project.deadline)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;