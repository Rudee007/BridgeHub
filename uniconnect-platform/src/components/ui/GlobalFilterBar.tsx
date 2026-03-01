import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, RotateCcw, ChevronDown } from "lucide-react";

// ==========================================
// 1. TYPES & INTERFACES
// ==========================================

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  key: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  allLabel?: string;
}

interface GlobalFilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  filters: FilterConfig[];
  resultCount: number;
  totalCount: number;
}

// ==========================================
// 2. MAIN COMPONENT
// ==========================================

export function GlobalFilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters,
  resultCount,
  totalCount,
}: GlobalFilterBarProps) {
  const activeFilters = filters.filter((f) => f.value !== "all");
  const hasActiveFilters = activeFilters.length > 0 || searchValue.length > 0;

  const handleReset = () => {
    onSearchChange("");
    filters.forEach((f) => f.onChange("all"));
  };

  return (
    <Card>
      {/* Search + Dropdowns Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        {filters.map((filter) => (
          <DropdownSelect
            key={filter.key}
            value={filter.value}
            onChange={filter.onChange}
            options={filter.options}
            placeholder={filter.label}
            allLabel={filter.allLabel || `All ${filter.label}s`}
          />
        ))}
      </div>

      {/* Active Filters + Reset + Result Count */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-wrap items-center gap-2 pt-4 mt-4 border-t border-gray-50 overflow-hidden"
          >
            {/* Active Search Badge */}
            {searchValue && (
              <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}>
                <Badge
                  colorScheme="blue"
                  onClick={() => onSearchChange("")}
                >
                  "{searchValue}"
                  <X className="w-3.5 h-3.5 opacity-70 hover:opacity-100" />
                </Badge>
              </motion.span>
            )}
            
            {/* Active Dropdown Badges */}
            {activeFilters.map((f) => {
              const selectedOption = f.options.find((o) => o.value === f.value);
              return (
                <motion.span
                  key={f.key}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Badge
                    colorScheme="gray"
                    onClick={() => f.onChange("all")}
                  >
                    <span className="opacity-60 font-semibold">{f.label}:</span> {selectedOption?.label || f.value}
                    <X className="w-3.5 h-3.5 opacity-70 hover:opacity-100" />
                  </Badge>
                </motion.span>
              );
            })}
            
            {/* Reset Button */}
            <Button onClick={handleReset}>
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              Reset Filters
            </Button>
            
            {/* Results Counter */}
            <span className="ml-auto text-[13px] font-medium text-gray-500">
              Showing{" "}
              <motion.span
                key={resultCount}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-900 font-bold inline-block"
              >
                {resultCount}
              </motion.span>{" "}
              of {totalCount}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

// ==========================================
// 3. INTERNAL UI COMPONENTS (Self-Contained)
// ==========================================

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-[20px] shadow-sm overflow-hidden p-4 sm:p-5">
      {children}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full pl-10 pr-4 h-11 bg-gray-50/50 border border-gray-200 rounded-xl text-[14px] font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm"
    />
  );
}

function Badge({ children, onClick, colorScheme }: { children: React.ReactNode, onClick: () => void, colorScheme: "blue" | "gray" }) {
  const colors = {
    blue: "bg-blue-50 text-blue-700 border-blue-100/50 hover:bg-blue-100",
    gray: "bg-gray-100 text-gray-700 border-gray-200/50 hover:bg-gray-200"
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 pl-3 pr-2 py-1.5 text-[11px] font-bold uppercase tracking-wider border cursor-pointer transition-colors rounded-lg ${colors[colorScheme]}`}
    >
      {children}
    </button>
  );
}

function Button({ children, onClick }: { children: React.ReactNode, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center h-8 px-3 ml-1 text-[12px] font-bold text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
    >
      {children}
    </button>
  );
}

function DropdownSelect({ 
  value, 
  onChange, 
  options, 
  placeholder, 
  allLabel 
}: { 
  value: string, 
  onChange: (v: string) => void, 
  options: FilterOption[], 
  placeholder: string, 
  allLabel: string 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (newValue: string) => {
    onChange(newValue);
    setIsOpen(false);
  };

  const selectedLabel = value === "all" ? placeholder : options.find(o => o.value === value)?.label || placeholder;

  return (
    <div className="relative w-full sm:w-[180px]" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm"
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden py-1"
          >
            <button
              onClick={() => handleSelect("all")}
              className={`w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors hover:bg-gray-50 ${value === "all" ? "text-primary-600 bg-primary-50/50" : "text-gray-700"}`}
            >
              {allLabel}
            </button>
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors hover:bg-gray-50 ${value === opt.value ? "text-primary-600 bg-primary-50/50" : "text-gray-700"}`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}