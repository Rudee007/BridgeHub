// components/universities/UniversityCard.tsx
import React from "react";
import { MapPin, Star, Users, Briefcase, GraduationCap, Building2 } from "lucide-react";
import type { University } from "@/types/university.types";

interface UniversityCardProps {
  university: University;
  onViewProfile: (id: string) => void;
  onViewPartnership: (id: string) => void;
}

export const UniversityCard: React.FC<UniversityCardProps> = ({ 
  university, 
  onViewProfile, 
  onViewPartnership 
}) => {
  
  // Helper to determine status color styling
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success-50 text-success-700 border-success-100";
      case "pending":
        return "bg-warning-50 text-warning-700 border-warning-100";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-primary-200 hover:shadow-card-hover transition-all duration-300 animate-fade-up">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-3">
          {/* Logo Placeholder */}
          <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 text-xl font-bold text-primary-600">
             {university.logo ? (
                <img src={university.logo} alt={university.name} className="w-full h-full object-cover rounded-lg" />
             ) : (
                <Building2 className="w-6 h-6" />
             )}
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
              {university.name}
            </h3>
            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
              <MapPin className="w-3 h-3" />
              <span>{university.location}, {university.state}</span>
            </div>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-gray-50 border border-gray-100">
          <Star className="w-3 h-3 text-warning-500 fill-warning-500" />
          <span className="text-xs font-bold text-gray-700">{university.rating}</span>
          <span className="text-[10px] text-gray-400">({university.totalReviews})</span>
        </div>
      </div>

      {/* Status & Departments */}
      <div className="mb-4 space-y-3">
        <div className="flex items-center justify-between">
           <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider border ${getStatusStyles(university.partnershipStatus)}`}>
             {university.partnershipStatus} Partner
           </span>
        </div>
        
        <div className="flex flex-wrap gap-1.5 h-12 overflow-hidden">
          {university.departments.slice(0, 3).map((dept, i) => (
            <span key={i} className="text-[10px] font-medium px-2 py-1 bg-gray-50 text-gray-600 rounded-md border border-gray-100">
              {dept}
            </span>
          ))}
          {university.departments.length > 3 && (
            <span className="text-[10px] font-medium px-2 py-1 bg-gray-50 text-gray-500 rounded-md">
              +{university.departments.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-gray-100 bg-gray-50/50 rounded-lg mb-4">
        <div className="flex flex-col items-center justify-center p-1">
          <div className="flex items-center gap-1.5 text-gray-500 mb-1">
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="text-[10px] font-medium">Students</span>
          </div>
          <span className="text-sm font-bold text-gray-900">{university.activeStudents > 999 ? (university.activeStudents/1000).toFixed(1) + 'k' : university.activeStudents}</span>
        </div>
        
        <div className="flex flex-col items-center justify-center p-1 border-l border-gray-200">
          <div className="flex items-center gap-1.5 text-gray-500 mb-1">
            <Briefcase className="w-3.5 h-3.5" />
            <span className="text-[10px] font-medium">Projects</span>
          </div>
          <span className="text-sm font-bold text-gray-900">{university.totalProjects}</span>
        </div>

        <div className="flex flex-col items-center justify-center p-1 border-l border-gray-200">
          <div className="flex items-center gap-1.5 text-gray-500 mb-1">
            <Users className="w-3.5 h-3.5" />
            <span className="text-[10px] font-medium">Hired</span>
          </div>
          <span className="text-sm font-bold text-gray-900">{university.studentsHired}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-auto">
        <button 
          onClick={() => onViewProfile(university.id)}
          className="flex-1 px-3 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          View Profile
        </button>
        <button 
          onClick={() => onViewPartnership(university.id)}
          className={`flex-1 px-3 py-2 text-xs font-semibold text-white rounded-lg transition-all shadow-sm ${
            university.partnershipStatus === 'none' 
             ? 'bg-gray-800 hover:bg-gray-900' 
             : 'bg-primary-600 hover:bg-primary-700'
          }`}
        >
          {university.partnershipStatus === 'none' ? 'Connect' : 'View Partnership'}
        </button>
      </div>
    </div>
  );
};