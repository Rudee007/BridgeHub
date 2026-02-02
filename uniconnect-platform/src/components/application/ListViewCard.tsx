import React from "react";
import { MapPin, Briefcase, Star, MoreHorizontal, Clock, CheckCircle2 } from "lucide-react";
import type { Application } from "@/types/application.types";

interface ListViewCardProps {
  app: Application;
  onViewProfile: (app: Application) => void;
  onReview: (app: Application) => void;
}

export const ListViewCard: React.FC<ListViewCardProps> = ({ app, onViewProfile, onReview }) => {
  // Color mapping for stages to keep it consistent with your Kanban
  const stageStyles: Record<string, string> = {
    'Applied': 'bg-gray-100 text-gray-600 border-gray-200',
    'Screening': 'bg-blue-50 text-blue-700 border-blue-100',
    'Technical': 'bg-indigo-50 text-indigo-700 border-indigo-100',
    'HR Round': 'bg-amber-50 text-amber-700 border-amber-100',
    'Offer': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'Hired': 'bg-green-50 text-green-700 border-green-100',
    'Rejected': 'bg-red-50 text-red-700 border-red-100',
  };

  return (
    <div 
      onClick={() => onViewProfile(app)}
      className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center gap-4 group relative cursor-pointer"
    >
      
      {/* 1. Candidate Info */}
      <div className="flex items-center gap-4 md:w-[30%]">
        <div className="relative shrink-0">
          <img 
            src={app.avatar} 
            alt={app.name} 
            className="w-12 h-12 rounded-full border border-gray-100 object-cover shadow-sm group-hover:scale-105 transition-transform" 
          />
          {app.status === 'Active' && (
            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-green-500" />
          )}
        </div>
        <div className="min-w-0">
           <h4 className="font-bold text-gray-900 text-sm group-hover:text-primary-600 transition-colors truncate">
             {app.name}
           </h4>
           <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
             <span className="flex items-center gap-1 truncate"><MapPin className="w-3 h-3" /> {app.university}</span>
           </div>
        </div>
      </div>

      {/* 2. Role Info */}
      <div className="md:w-[25%] hidden md:block">
         <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
            <Briefcase className="w-3 h-3" /> Applied For
         </div>
         <p className="text-sm font-semibold text-gray-700 truncate">{app.role}</p>
      </div>

      {/* 3. Stage Badge */}
      <div className="md:w-[15%]">
        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 md:hidden">
            Stage
         </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${stageStyles[app.stage] || stageStyles['Applied']}`}>
           {app.stage}
        </span>
      </div>

      {/* 4. Rating (Replaced AI Score) */}
      <div className="md:w-[15%]">
        <p className="hidden md:block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Rating</p>
        <div className="flex items-center gap-0.5">
           {[1, 2, 3, 4, 5].map((star) => (
             <Star 
               key={star} 
               className={`w-3.5 h-3.5 ${star <= app.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-100 text-gray-200'}`} 
             />
           ))}
        </div>
      </div>

      {/* 5. Actions (Visible on Hover) */}
      <div className="md:w-[15%] flex justify-end items-center">
         <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button 
              onClick={(e) => { e.stopPropagation(); onReview(app); }}
              className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95"
            >
              Review
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onViewProfile(app); }}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 shadow-sm transition-all active:scale-95"
            >
              Profile
            </button>
         </div>
         {/* Mobile Menu Fallback */}
         <button className="md:hidden text-gray-400 ml-auto"><MoreHorizontal className="w-5 h-5" /></button>
      </div>
    </div>
  );
};