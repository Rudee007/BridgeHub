// components/talent/InviteModal.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Briefcase, ExternalLink } from "lucide-react";
import type { TalentProfile } from "@/types/talent.types";

interface InviteModalProps {
  profile: TalentProfile | null;
  isOpen: boolean;
  onClose: () => void;
  // ✅ NEW: Added prop to allow viewing profile from within modal
  onViewProfile?: (profile: TalentProfile) => void; 
}

export const InviteModal: React.FC<InviteModalProps> = ({ profile, isOpen, onClose, onViewProfile }) => {
  const [message, setMessage] = useState("");
  
  if (!profile) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Inviting", profile.name, "with message:", message);
    onClose();
  };

  const handleViewProfileClick = () => {
    if (onViewProfile) {
        onViewProfile(profile);
        onClose(); // Close invite modal when switching to profile
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[60]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto z-[60] w-full max-w-lg h-fit bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
               <h3 className="text-xl font-bold text-gray-900">Invite to Interview</h3>
               <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                 <X className="w-5 h-5" />
               </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
               {/* User Context Card - Clickable if handler provided */}
               <div 
                 onClick={onViewProfile ? handleViewProfileClick : undefined}
                 className={`flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100 ${onViewProfile ? 'cursor-pointer hover:bg-blue-100 transition-colors group' : ''}`}
               >
                  <img src={profile.avatar} alt="" className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">Invite {profile.name}</p>
                    <p className="text-xs text-blue-600">{profile.primaryRole}</p>
                  </div>
                  {onViewProfile && (
                      <ExternalLink className="w-4 h-4 text-blue-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all" />
                  )}
               </div>

               {/* Job Select */}
               <div className="space-y-1">
                 <label className="text-sm font-semibold text-gray-700">Select Job Role</label>
                 <div className="relative">
                   <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                   <select className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm bg-white">
                      <option>Frontend Developer (React)</option>
                      <option>Backend Engineer (Node.js)</option>
                      <option>Full Stack Intern</option>
                   </select>
                 </div>
               </div>

               {/* Message */}
               <div className="space-y-1">
                 <label className="text-sm font-semibold text-gray-700">Message (Optional)</label>
                 <textarea 
                   rows={4}
                   value={message}
                   onChange={(e) => setMessage(e.target.value)}
                   placeholder={`Hi ${profile.name.split(' ')[0]}, we were impressed by your profile...`}
                   className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 outline-none text-sm resize-none"
                 />
               </div>

               <div className="pt-2 flex justify-end gap-3">
                  <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-50 rounded-lg">Cancel</button>
                  <button type="submit" className="px-6 py-2 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700 flex items-center gap-2">
                    <Send className="w-4 h-4" /> Send Invitation
                  </button>
               </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};