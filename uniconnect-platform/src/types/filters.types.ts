import type { LucideIcon } from "lucide-react";

export type FilterInputType = 
  | 'text'          // Simple search input
  | 'select'        // Standard dropdown
  | 'checkbox'      // List of checkboxes
  | 'radio'         // List of radio buttons
  | 'tags'          // Colorful clickable tags (for Skills/Tech)
  | 'range'         // Min/Max inputs (for Salary/Budget)
  | 'toggle-card';  // Big visual buttons (for Remote/Onsite)

export interface FilterOption {
  label: string;
  value: string;
  count?: number; // Optional: show (12) next to item
  icon?: LucideIcon; // Optional: Icon for the option
  color?: string; // Optional: For tags (e.g., 'bg-blue-100')
}

export interface FilterSectionConfig {
  id: string;
  title: string;
  icon: LucideIcon;
  type: FilterInputType;
  options?: FilterOption[]; // For select, checkbox, radio, tags
  placeholder?: string; // For text/select
  isOpenDefault?: boolean;
}