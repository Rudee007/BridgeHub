// data/filterConfigs.ts
import {Search,BarChart3, Building2, GraduationCap, Zap, Globe, Laptop, Briefcase } from "lucide-react";
import type { FilterSectionConfig } from "@/types/filters.types";

export const UNIVERSITY_FILTER_CONFIG: FilterSectionConfig[] = [
  {
    id: 'search',
    title: 'Search',
    icon: Search,
    type: 'text',
    placeholder: 'Search universities...',
    isOpenDefault: true
  },
  {
    id: 'status',
    title: 'Partnership Status',
    icon: Building2,
    type: 'checkbox', // Standard checkboxes are best for status
    options: [
      { label: 'Active Partner', value: 'active', count: 12 },
      { label: 'Pending Request', value: 'pending', count: 5 },
      { label: 'Not Connected', value: 'none', count: 45 },
    ]
  },
  {
    id: 'departments',
    title: 'Departments',
    icon: GraduationCap,
    type: 'checkbox',
    options: [
      { label: 'Computer Science', value: 'cse' },
      { label: 'Mechanical', value: 'mech' },
      { label: 'Civil', value: 'civil' },
    ]
  },
];

export const JOB_FILTER_CONFIG: FilterSectionConfig[] = [
  {
    id: 'role',
    title: 'Role / Keyword',
    icon: Search,
    type: 'text',
    placeholder: 'e.g. Frontend Developer',
  },
  {
    id: 'workMode',
    title: 'Work Mode',
    icon: Globe,
    type: 'toggle-card', // ✨ UNIQUE: Big visual buttons
    options: [
      { label: 'Remote', value: 'remote', icon: Globe },
      { label: 'On-Site', value: 'onsite', icon: Building2 },
      { label: 'Hybrid', value: 'hybrid', icon: Laptop },
    ],
    isOpenDefault: true
  },
  {
    id: 'type',
    title: 'Employment Type',
    icon: Briefcase,
    type: 'tags', // ✨ UNIQUE: Pills for quick selection
    options: [
      { label: 'Full-time', value: 'ft' },
      { label: 'Internship', value: 'intern' },
      { label: 'Contract', value: 'contract' },
    ]
  },
];

export const PROJECT_FILTER_CONFIG: FilterSectionConfig[] = [
  {
    id: 'techStack',
    title: 'Tech Stack',
    icon: Zap,
    type: 'tags', // ✨ UNIQUE: Dense tag cloud
    options: [
      { label: 'React', value: 'react' },
      { label: 'Node.js', value: 'node' },
      { label: 'Python', value: 'python' },
      { label: 'AI/ML', value: 'ai' },
      { label: 'Solidity', value: 'web3' },
    ],
    isOpenDefault: true
  },
  {
    id: 'difficulty',
    title: 'Difficulty Level',
    icon: BarChart3,
    type: 'radio',
    options: [
      { label: 'Beginner Friendly', value: 'easy' },
      { label: 'Intermediate', value: 'medium' },
      { label: 'Advanced', value: 'hard' },
    ]
  },
];