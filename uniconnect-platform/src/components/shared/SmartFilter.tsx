import React, { useState } from "react";
import { Search, ChevronDown, ChevronUp, X, Check, Circle, Disc } from "lucide-react";
import type { FilterSectionConfig } from "@/types/filters.types";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface SmartFilterProps {
  config: FilterSectionConfig[];
  state: Record<string, any>;
  onChange: (key: string, value: any) => void;
  onClear: () => void;
}

export const SmartFilter: React.FC<SmartFilterProps> = ({ config, state, onChange, onClear }) => {
  // Count only truthy values (arrays with length > 0, non-empty strings, or non-"all" strings)
  const activeCount = Object.entries(state).filter(([_, val]) => {
    if (Array.isArray(val)) return val.length > 0;
    return val && val !== "all";
  }).length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden sticky top-6">
      
      {/* Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Filters</h3>
        {activeCount > 0 && (
          <button 
            onClick={onClear}
            className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition-colors"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      {/* Sections */}
      <div className="divide-y divide-gray-100">
        {config.map((section) => (
          <FilterSection 
            key={section.id} 
            section={section} 
            value={state[section.id]} 
            onChange={(val) => onChange(section.id, val)} 
          />
        ))}
      </div>
    </div>
  );
};

// --- Widget Renderer ---
const FilterSection = ({ section, value, onChange }: { section: FilterSectionConfig, value: any, onChange: (val: any) => void }) => {
  const [isOpen, setIsOpen] = useState(section.isOpenDefault ?? true);
  const Icon = section.icon;

  // Helper for multi-select (Checkbox/Tags)
  const handleMultiSelect = (optValue: string) => {
    const current = Array.isArray(value) ? value : [];
    const updated = current.includes(optValue)
      ? current.filter((v: string) => v !== optValue)
      : [...current, optValue];
    onChange(updated);
  };

  // Helper for single-select (Radio/Toggle)
  const handleSingleSelect = (optValue: string) => {
    // If clicking the already selected item, clear it (toggle off), otherwise set it
    onChange(value === optValue ? "" : optValue);
  };

  return (
    <div className="p-5">
      {/* Accordion Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between group mb-3"
      >
        <div className="flex items-center gap-2 text-gray-700 group-hover:text-primary-600 transition-colors">
          <Icon className="w-4 h-4" />
          <span className="text-sm font-semibold">{section.title}</span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-1 space-y-3">
              
              {/* 1. SEARCH INPUT */}
              {section.type === 'text' && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input 
                    type="text" 
                    value={value || ''} 
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={section.placeholder}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-100 outline-none transition-all placeholder:text-gray-400"
                  />
                </div>
              )}

              {/* 2. SELECT DROPDOWN */}
              {section.type === 'select' && (
                <div className="relative group">
                  <select
                    value={value || "all"}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full appearance-none bg-white border border-gray-200 text-gray-700 text-sm rounded-lg p-2.5 pr-8 focus:ring-2 focus:ring-primary-100 focus:border-primary-500 outline-none cursor-pointer hover:border-gray-300 transition-colors"
                  >
                    <option value="all">All {section.title}</option>
                    {section.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-gray-600 transition-colors" />
                </div>
              )}

              {/* 3. CHECKBOX LIST (Multi) */}
              {section.type === 'checkbox' && (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {section.options?.map((opt) => {
                    const isChecked = (Array.isArray(value) ? value : []).includes(opt.value);
                    return (
                      <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group select-none py-1">
                        <div className={cn(
                          "w-4 h-4 rounded border flex items-center justify-center transition-all shadow-sm",
                          isChecked ? "bg-primary-600 border-primary-600" : "bg-white border-gray-300 group-hover:border-primary-400"
                        )}>
                          {isChecked && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className={cn("text-sm transition-colors", isChecked ? "text-gray-900 font-medium" : "text-gray-600 group-hover:text-gray-900")}>
                          {opt.label}
                        </span>
                        {opt.count !== undefined && (
                          <span className="ml-auto text-xs text-gray-400 font-medium bg-gray-50 px-1.5 py-0.5 rounded">
                            {opt.count}
                          </span>
                        )}
                        {/* Hidden input for accessibility */}
                        <input 
                          type="checkbox" 
                          className="hidden" 
                          checked={isChecked} 
                          onChange={() => handleMultiSelect(opt.value)} 
                        />
                      </label>
                    )
                  })}
                </div>
              )}

              {/* 4. RADIO LIST (Single - NEW) */}
              {section.type === 'radio' && (
                <div className="space-y-2">
                  {section.options?.map((opt) => {
                    const isSelected = value === opt.value;
                    return (
                      <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group select-none py-1">
                        <div className={cn(
                          "w-4 h-4 rounded-full border flex items-center justify-center transition-all shadow-sm",
                          isSelected ? "border-primary-600 ring-2 ring-primary-100" : "border-gray-300 group-hover:border-primary-400"
                        )}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-primary-600" />}
                        </div>
                        <span className={cn("text-sm transition-colors", isSelected ? "text-gray-900 font-medium" : "text-gray-600 group-hover:text-gray-900")}>
                          {opt.label}
                        </span>
                        {/* Hidden input */}
                        <input 
                          type="radio" 
                          className="hidden" 
                          checked={isSelected} 
                          onChange={() => handleSingleSelect(opt.value)} 
                        />
                      </label>
                    )
                  })}
                </div>
              )}

              {/* 5. TAGS (Multi) */}
              {section.type === 'tags' && (
                <div className="flex flex-wrap gap-2">
                  {section.options?.map((opt) => {
                    const isSelected = (Array.isArray(value) ? value : []).includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleMultiSelect(opt.value)}
                        className={cn(
                          "px-2.5 py-1 text-[11px] font-medium rounded-full border transition-all",
                          isSelected 
                            ? "bg-gray-900 text-white border-gray-900 shadow-md" 
                            : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        )}
                      >
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              )}

              {/* 6. TOGGLE CARDS (Single) */}
              {section.type === 'toggle-card' && (
                <div className="grid grid-cols-2 gap-2">
                  {section.options?.map((opt) => {
                    const isActive = value === opt.value;
                    const OptIcon = opt.icon;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleSingleSelect(opt.value)}
                        className={cn(
                          "flex flex-col items-center justify-center p-3 rounded-xl border transition-all gap-2",
                          isActive 
                            ? "bg-primary-50 border-primary-200 text-primary-700 shadow-sm ring-1 ring-primary-200" 
                            : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                        )}
                      >
                        {OptIcon && <OptIcon className={cn("w-5 h-5", isActive ? "text-primary-600" : "text-gray-400")} />}
                        <span className="text-xs font-medium">{opt.label}</span>
                      </button>
                    )
                  })}
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};