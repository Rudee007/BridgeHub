// components/projects/ProjectFilters.tsx
import { useState } from "react";
import { X } from "lucide-react";
import type { ProjectFilters as Filters } from "@/types/projects.types";
import { statusLabels, categoryLabels } from "@/data/projectData";

interface ProjectFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  projectCounts: Record<string, number>;
}

export const ProjectFilters: React.FC<ProjectFiltersProps> = ({
  filters,
  onFilterChange,
  projectCounts,
}) => {
  const hasActiveFilters =
    filters.status.length > 0 ||
    filters.category.length > 0 ||
    filters.academicLevel.length > 0 ||
    filters.compensation.length > 0;

  const toggleStatus = (status: any) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...filters.status, status];
    onFilterChange({ ...filters, status: newStatus });
  };

  const toggleCategory = (category: any) => {
    const newCategory = filters.category.includes(category)
      ? filters.category.filter((c) => c !== category)
      : [...filters.category, category];
    onFilterChange({ ...filters, category: newCategory });
  };

  const clearFilters = () => {
    onFilterChange({
      status: [],
      category: [],
      academicLevel: [],
      compensation: [],
      search: "",
    });
  };

  return (
    <div className="w-64 flex-shrink-0 bg-white rounded-xl border border-gray-200 p-5 h-fit sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Status Filter */}
      <div className="mb-6">
        <p className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wide">
          Status
        </p>
        <div className="space-y-2">
          {Object.entries(statusLabels).map(([key, label]) => (
            <label
              key={key}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.status.includes(key as any)}
                onChange={() => toggleStatus(key)}
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1">
                {label}
              </span>
              <span className="text-xs text-gray-500 font-semibold">
                {projectCounts[key] || 0}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <p className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wide">
          Category
        </p>
        <div className="space-y-2">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <label
              key={key}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.category.includes(key as any)}
                onChange={() => toggleCategory(key)}
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1">
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Compensation Filter */}
      <div>
        <p className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wide">
          Compensation
        </p>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.compensation.includes("paid" as any)}
              onChange={() => {
                const newComp = filters.compensation.includes("paid" as any)
                  ? filters.compensation.filter((c) => c !== ("paid" as any))
                  : [...filters.compensation, "paid" as any];
                onFilterChange({ ...filters, compensation: newComp });
              }}
              className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900">
              Paid
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.compensation.includes("unpaid" as any)}
              onChange={() => {
                const newComp = filters.compensation.includes("unpaid" as any)
                  ? filters.compensation.filter((c) => c !== ("unpaid" as any))
                  : [...filters.compensation, "unpaid" as any];
                onFilterChange({ ...filters, compensation: newComp });
              }}
              className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900">
              Unpaid
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};
