import React from "react";
import { Search, X, Building2, MapPin, GraduationCap, Filter } from "lucide-react";
import type { UniversityFilters } from "@/types/university.types";
import { cn } from "@/lib/utils";

// Mock data for dropdowns (normally imported from a data file)
const INDIAN_STATES = ["Delhi", "Maharashtra", "Karnataka", "Telangana", "Tamil Nadu", "Rajasthan", "Uttar Pradesh"];
const DEPARTMENTS = ["Computer Science", "Information Technology", "Electronics", "Mechanical", "Civil", "Biotechnology"];
const SPECIALIZATIONS = ["AI/ML", "Data Science", "Cyber Security", "Cloud Computing", "Robotics", "IoT", "Blockchain"];

interface UniversityFiltersProps {
  filters: UniversityFilters;
  onFiltersChange: (filters: UniversityFilters) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalResults: number;
}

export const UniversityFiltersComponent: React.FC<UniversityFiltersProps> = ({
  filters,
  onFiltersChange,
  searchQuery,
  onSearchChange,
  totalResults
}) => {
  
  // Handlers
  const handleDepartmentToggle = (dept: string) => {
    const newDepts = filters.departments.includes(dept)
      ? filters.departments.filter((d) => d !== dept)
      : [...filters.departments, dept];
    onFiltersChange({ ...filters, departments: newDepts });
  };

  const handleSpecToggle = (spec: string) => {
    const newSpecs = filters.specializations.includes(spec)
      ? filters.specializations.filter((s) => s !== spec)
      : [...filters.specializations, spec];
    onFiltersChange({ ...filters, specializations: newSpecs });
  };

  const clearFilters = () => {
    onFiltersChange({
      location: "all",
      state: "all",
      departments: [],
      specializations: [],
      studentCount: "all",
      partnershipStatus: "All",
    });
    onSearchChange("");
  };

  const hasActiveFilters = 
    filters.location !== "all" || 
    filters.state !== "all" || 
    filters.departments.length > 0 || 
    filters.specializations.length > 0 ||
    filters.partnershipStatus !== "All" ||
    searchQuery !== "";

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden sticky top-6">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div className="flex items-center gap-2 text-gray-900 font-semibold">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </div>
        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 transition-colors"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      <div className="p-5 space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Location & State */}
        <div className="space-y-3">
           <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
             <MapPin className="w-3 h-3" /> Location
           </label>
           
           <select
             value={filters.state}
             onChange={(e) => onFiltersChange({ ...filters, state: e.target.value })}
             className="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-primary-100 outline-none cursor-pointer hover:border-gray-300 transition-colors"
           >
             <option value="all">All States</option>
             {INDIAN_STATES.map(state => (
               <option key={state} value={state}>{state}</option>
             ))}
           </select>
        </div>

        {/* Partnership Status */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="w-3 h-3" /> Partnership Status
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "All", label: "All" },
              { value: "active", label: "Active" },
              { value: "pending", label: "Pending" },
              { value: "none", label: "None" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => onFiltersChange({ ...filters, partnershipStatus: opt.value })}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-lg border transition-all",
                  filters.partnershipStatus === opt.value
                    ? "bg-primary-50 text-primary-700 border-primary-200 shadow-sm"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Departments (Checkbox Style) */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-3 h-3" /> Departments
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {DEPARTMENTS.map((dept) => (
              <label key={dept} className="flex items-center gap-2.5 cursor-pointer group">
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${filters.departments.includes(dept) ? 'bg-primary-600 border-primary-600' : 'border-gray-300 bg-white group-hover:border-primary-400'}`}>
                  {filters.departments.includes(dept) && <X className="w-3 h-3 text-white rotate-45" />} {/* Using X rotated as checkmark */}
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={filters.departments.includes(dept)}
                    onChange={() => handleDepartmentToggle(dept)}
                  />
                </div>
                <span className={`text-sm ${filters.departments.includes(dept) ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`}>
                  {dept}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Specializations (Tags Style) */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Specializations</label>
          <div className="flex flex-wrap gap-2">
            {SPECIALIZATIONS.map((spec) => {
              const isActive = filters.specializations.includes(spec);
              return (
                <button
                  key={spec}
                  onClick={() => handleSpecToggle(spec)}
                  className={cn(
                    "px-2.5 py-1 text-[11px] rounded-full border transition-all",
                    isActive
                      ? "bg-primary-600 text-white border-primary-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-primary-300"
                  )}
                >
                  {spec}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500">Found <strong className="text-gray-900">{totalResults}</strong> universities</p>
      </div>
    </div>
  );
};