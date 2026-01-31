// pages/Company/Projects/ProjectDetails.tsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Edit, Pause, MoreVertical, Briefcase, Clock, Calendar, DollarSign, 
  MapPin, Users, CheckCircle, Eye, UserCheck, Star, Search, Filter 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { mockProjects, categoryLabels, statusLabels, academicLevelLabels } from "@/data/projectData";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar companyName="BridgeHub" logoUrl="" />

      <div className="lg:pl-[280px]">
        {/* Top Navigation Bar - EXACT SAME AS JOBDETAILS */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 h-16 flex items-center justify-between">
            <button
              onClick={() => navigate("/company/projects")}
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Projects</span>
            </button>

            <div className="flex items-center gap-2">
              <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors" title="Edit Project">
                <Edit className="h-4.5 w-4.5 text-gray-700" />
              </button>
              <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors" title="Pause Project">
                <Pause className="h-4.5 w-4.5 text-gray-700" />
              </button>
              <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors" title="More Options">
                <MoreVertical className="h-4.5 w-4.5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white min-h-screen">
          {/* Project Header Section - EXACT SAME LAYOUT */}
          <div className="px-8 pt-8 pb-6 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="h-3.5 w-3.5" />
                    <span className="font-medium">{categoryLabels[project.category]}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span>{academicLevelLabels[project.academicLevel]}</span>
                  <span className="text-gray-400">•</span>
                  <span>{project.location}</span>
                  <span className="text-gray-400">•</span>
                  <span>Posted {formatTimeAgo(project.createdAt)}</span>
                </div>
              </div>
              <span className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-semibold rounded-md border border-green-200">
                ● {statusLabels[project.status]}
              </span>
            </div>
          </div>

          {/* Tabs Navigation - EXACT SAME AS JOBDETAILS */}
          <div className="border-b border-gray-200 px-8">
            <nav className="flex gap-8" role="tablist">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  className={`relative pb-4 text-sm font-semibold transition-colors ${
                    activeTab === tab.id ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                  {tab.count !== null && (
                    <span
                      className={`ml-2 px-2 py-0.5 text-xs font-bold rounded ${
                        activeTab === tab.id ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content - Overview Tab Only (First Page) */}
          <div className="px-8 py-8">
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
                  {/* Left Column - Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Project Description Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                      <h3 className="text-sm font-bold text-gray-900 mb-4">Project Description</h3>
                      <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                        <p>{project.description}</p>
                        <p>
                          We are looking for talented students to work on this exciting project. You will collaborate 
                          with your team to deliver a high-quality solution within the specified timeline.
                        </p>
                      </div>
                    </div>

                    {/* Project Requirements Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                      <h3 className="text-sm font-bold text-gray-900 mb-6">Requirements</h3>

                      {/* Required Skills */}
                      <div className="mb-6">
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
                          Required Skills
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-900 text-xs font-medium rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Team & Duration */}
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                            Team Size
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {project.teamSize.min}-{project.teamSize.max} members
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                            Duration
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {project.duration.value} {project.duration.unit}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Sidebar - EXACT SAME AS JOBDETAILS */}
                  <div className="space-y-6">
                    {/* Application Stats Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                      <h3 className="text-sm font-bold text-gray-900 mb-6">Application Stats</h3>

                      {/* Stats Grid - SAME AS JOBDETAILS */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <Users className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-gray-900">{project.applicationCount}</p>
                          <p className="text-xs text-gray-600 font-medium mt-1">Applied</p>
                        </div>
                        <div className="text-center">
                          <Star className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-gray-900">{project.shortlistedCount}</p>
                          <p className="text-xs text-gray-600 font-medium mt-1">Shortlisted</p>
                        </div>
                        <div className="text-center">
                          <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
                          <p className="text-2xl font-bold text-gray-900">{project.selectedCount}</p>
                          <p className="text-xs text-gray-600 font-medium mt-1">Selected</p>
                        </div>
                      </div>

                      {/* Application Funnel */}
                      <div className="pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-semibold text-gray-700">Application Funnel</p>
                          <p className="text-xs font-bold text-gray-900">
                            {Math.round((project.selectedCount / project.applicationCount) * 100) || 0}% selected
                          </p>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" 
                            style={{ width: `${(project.selectedCount / project.applicationCount) * 100 || 0}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Project Info Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                      <h3 className="text-sm font-bold text-gray-900 mb-6">Project Info</h3>
                      <div className="space-y-5">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-4 w-4 text-gray-400" />
                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Compensation</p>
                          </div>
                          <p className="text-sm font-bold text-gray-900 ml-6">{formatCompensation()}</p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Deadline</p>
                          </div>
                          <p className="text-sm font-bold text-gray-900 ml-6">{formatDate(project.deadline)}</p>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Team Size</p>
                          </div>
                          <p className="text-sm font-bold text-gray-900 ml-6">
                            {project.teamSize.min}-{project.teamSize.max} members
                          </p>
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
    </div>
  );
};

export default ProjectDetails;
