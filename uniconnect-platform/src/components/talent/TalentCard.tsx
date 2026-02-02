// components/talent/TalentCard.tsx

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Award } from "lucide-react";
import type { TalentProfile } from "@/types/talent.types";
// import { useNavigate } from "react-router-dom"; // You can remove this if you only use modals

interface TalentCardProps {
  profile: TalentProfile;
  index: number;
  onInvite: (profile: TalentProfile) => void;
  // ✅ FIX 1: Add the view profile handler to the interface
  onViewProfile: (profile: TalentProfile) => void;
}

export const TalentCard: React.FC<TalentCardProps> = ({ profile, index, onInvite, onViewProfile }) => {
  // const navigate = useNavigate(); // Not needed if opening a modal

  // Status Badge Logic
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-700 border-green-200";
      case "open_to_offers": return "bg-blue-100 text-blue-700 border-blue-200";
      case "busy": return "bg-amber-100 text-amber-700 border-amber-200";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const statusLabel: Record<string, string> = {
    available: "Available Now",
    open_to_offers: "Open to Offers",
    busy: "Currently Busy",
    hired: "Hired",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white rounded-2xl border border-gray-200 p-5 hover:border-primary-200 hover:shadow-xl transition-all duration-300 relative flex flex-col h-full cursor-pointer isolate"
      // ✅ FIX 2: Make the whole card open the modal (instead of navigating)
      onClick={() => onViewProfile(profile)}
    >
      {/* Top Banner (Verified Status) */}
      {profile.isVerified && (
        <div className="absolute -top-3 -right-3 z-10">
           <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
             <Award className="w-3 h-3" /> Top Talent
           </div>
        </div>
      )}

      {/* Header Profile */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <img 
            src={profile.avatar} 
            alt={profile.name} 
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
          />
          <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${profile.status === 'available' ? 'bg-green-500' : 'bg-amber-500'}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-lg truncate group-hover:text-primary-600 transition-colors">{profile.name}</h3>
            <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded text-xs font-bold">
              <Star className="w-3 h-3 fill-current" /> {profile.rating}
            </div>
          </div>
          <p className="text-sm text-gray-500 truncate">{profile.university}</p>
          <div className="flex items-center gap-2 mt-1">
             <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusStyle(profile.status)}`}>
               {statusLabel[profile.status]}
             </span>
             <span className="text-xs text-gray-400 flex items-center gap-0.5">
               <MapPin className="w-3 h-3" /> {profile.location}
             </span>
          </div>
        </div>
      </div>

      {/* Skills (Tags) */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1.5 h-[52px] overflow-hidden content-start">
          {profile.skills.slice(0, 5).map(skill => (
            <span key={skill} className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-md border border-gray-100 group-hover:border-primary-100 group-hover:bg-primary-50/30 transition-colors">
              {skill}
            </span>
          ))}
          {profile.skills.length > 5 && (
            <span className="px-2 py-1 text-xs text-gray-400 font-medium">+ {profile.skills.length - 5}</span>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 py-3 bg-gray-50/50 rounded-xl border border-gray-100 mb-5">
         <div className="text-center">
            <p className="text-lg font-bold text-gray-900">{profile.projectsCompleted}</p>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wide">Projects</p>
         </div>
         <div className="text-center border-l border-gray-200">
            <p className="text-lg font-bold text-gray-900">{profile.successRate}%</p>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wide">Success</p>
         </div>
         <div className="text-center border-l border-gray-200">
            <p className="text-sm font-bold text-gray-900 mt-1">{profile.availability}</p>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wide">Notice</p>
         </div>
      </div>

      {/* Actions */}
      <div className="mt-auto flex items-center gap-2">
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            onInvite(profile); 
          }}
          className="flex-1 bg-white text-gray-700 border border-gray-200 text-sm font-semibold py-2 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm active:scale-95"
        >
          Invite
        </button>
        
        {/* ✅ FIX 3: Add onClick handler with stopPropagation */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onViewProfile(profile);
          }}
          className="flex-1 bg-gray-900 text-white text-sm font-semibold py-2 rounded-lg hover:bg-gray-800 transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
        >
          View Profile
        </button>
      </div>
    </motion.div>
  );
};