import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, MapPin, Globe, Mail, Phone, ExternalLink, 
  GraduationCap, Users, Trophy, Building2 
} from "lucide-react";
import type { University } from "@/types/university.types";

interface UniversityProfileModalProps {
  university: University | null;
  isOpen: boolean;
  onClose: () => void;
}

export const UniversityProfileModal: React.FC<UniversityProfileModalProps> = ({ 
  university, isOpen, onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'departments'>('overview');

  if (!university) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto z-[100] w-full max-w-3xl h-[85vh] md:h-[800px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header Image */}
            <div className="h-40 bg-gray-200 relative">
               <img src={university.coverImage} alt="Cover" className="w-full h-full object-cover" />
               <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors backdrop-blur-md">
                 <X className="w-5 h-5" />
               </button>
            </div>

            {/* Profile Header */}
            <div className="px-8 pb-6 border-b border-gray-100 -mt-10 relative bg-white rounded-t-3xl">
               <div className="flex justify-between items-end">
                  <div className="flex items-end gap-4">
                     <div className="w-24 h-24 rounded-xl border-4 border-white shadow-lg bg-white p-2">
                        <img src={university.logo} alt="logo" className="w-full h-full object-contain" />
                     </div>
                     <div className="mb-2">
                        <h2 className="text-2xl font-bold text-gray-900 leading-tight">{university.name}</h2>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                           <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> {university.location}, {university.state}</span>
                           <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5"/> Est. {university.establishedYear}</span>
                        </div>
                     </div>
                  </div>
                  <div className="mb-3 flex gap-2">
                     <a href={university.website} target="_blank" rel="noreferrer" className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
                        <Globe className="w-4 h-4" />
                     </a>
                     <a href={`mailto:${university.contactEmail}`} className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
                        <Mail className="w-4 h-4" />
                     </a>
                  </div>
               </div>
            </div>

            {/* Content Tabs */}
            <div className="flex border-b border-gray-100 px-8">
               <button onClick={() => setActiveTab('overview')} className={`pb-3 pt-4 text-sm font-semibold border-b-2 transition-colors mr-6 ${activeTab === 'overview' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500'}`}>Overview</button>
               <button onClick={() => setActiveTab('departments')} className={`pb-3 pt-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'departments' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500'}`}>Academics</button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-8 bg-gray-50/50">
               {activeTab === 'overview' && (
                 <div className="space-y-6 animate-fade-in">
                    {/* Bio */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                       <h3 className="font-bold text-gray-900 mb-2">About Institute</h3>
                       <p className="text-gray-600 text-sm leading-relaxed">{university.about}</p>
                    </div>

                    {/* Key Stats */}
                    <div className="grid grid-cols-3 gap-4">
                       <StatBox label="Avg Package" value={university.placementStats.avgPackage} icon={<Trophy className="w-4 h-4 text-amber-500"/>} />
                       <StatBox label="Highest Pkg" value={university.placementStats.highestPackage} icon={<Trophy className="w-4 h-4 text-purple-500"/>} />
                       <StatBox label="Placement Rate" value={`${university.placementStats.placementRate}%`} icon={<Users className="w-4 h-4 text-green-500"/>} />
                    </div>

                    {/* Student Stats */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                       <h3 className="font-bold text-gray-900 mb-4">Student Demographics</h3>
                       <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-2">
                          <span className="text-sm text-gray-600 font-medium">Total Active Students</span>
                          <span className="font-bold text-gray-900">{university.activeStudents.toLocaleString()}</span>
                       </div>
                       <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm text-gray-600 font-medium">Rating</span>
                          <span className="font-bold text-gray-900 flex items-center gap-1">
                            {university.rating} <span className="text-amber-500">★</span> 
                            <span className="text-xs text-gray-400 font-normal ml-1">({university.totalReviews})</span>
                          </span>
                       </div>
                    </div>
                 </div>
               )}

               {activeTab === 'departments' && (
                 <div className="space-y-6 animate-fade-in">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                       <h3 className="font-bold text-gray-900 mb-4">Departments</h3>
                       <div className="flex flex-wrap gap-2">
                          {university.departments.map(dept => (
                            <span key={dept} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100">
                              {dept}
                            </span>
                          ))}
                       </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                       <h3 className="font-bold text-gray-900 mb-4">Key Specializations</h3>
                       <div className="flex flex-wrap gap-2">
                          {university.specializations.map(spec => (
                            <span key={spec} className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-100">
                              {spec}
                            </span>
                          ))}
                       </div>
                    </div>
                 </div>
               )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const StatBox = ({ label, value, icon }: any) => (
  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm text-center">
    <div className="mx-auto w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mb-2">{icon}</div>
    <div className="text-lg font-bold text-gray-900">{value}</div>
    <div className="text-xs text-gray-500 uppercase font-bold">{label}</div>
  </div>
);