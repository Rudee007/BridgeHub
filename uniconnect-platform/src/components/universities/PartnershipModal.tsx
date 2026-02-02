import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, CheckCircle2, Clock, AlertCircle, FileText, 
  Calendar, User, Mail, ShieldCheck, Briefcase 
} from "lucide-react";
import type { University } from "@/types/university.types";

interface PartnershipModalProps {
  university: University | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PartnershipModal: React.FC<PartnershipModalProps> = ({ 
  university, isOpen, onClose 
}) => {
  if (!university) return null;

  const statusColors = {
    active: "bg-green-100 text-green-700 border-green-200",
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    none: "bg-gray-100 text-gray-600 border-gray-200"
  };

  const statusIcon = {
    active: <CheckCircle2 className="w-5 h-5 text-green-600" />,
    pending: <Clock className="w-5 h-5 text-amber-600" />,
    none: <AlertCircle className="w-5 h-5 text-gray-500" />
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
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto z-[100] w-full max-w-2xl h-fit max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
              <div className="flex gap-4">
                 <div className="w-16 h-16 rounded-lg bg-white border border-gray-200 p-2 shadow-sm">
                    <img src={university.logo} alt="" className="w-full h-full object-contain" />
                 </div>
                 <div>
                    <h2 className="text-xl font-bold text-gray-900">{university.name}</h2>
                    <div className="flex items-center gap-2 mt-2">
                       <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusColors[university.partnershipStatus]}`}>
                          {statusIcon[university.partnershipStatus]}
                          {university.partnershipStatus === 'active' ? 'Official Partner' : 
                           university.partnershipStatus === 'pending' ? 'Request Pending' : 'Not Connected'}
                       </span>
                    </div>
                 </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 overflow-y-auto">
              
              {/* --- SCENARIO 1: ACTIVE PARTNER --- */}
              {university.partnershipStatus === 'active' && university.partnershipData && (
                <div className="space-y-6">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl border border-green-100 bg-green-50/50">
                         <div className="text-xs text-green-600 font-bold uppercase mb-1">Students Hired</div>
                         <div className="text-2xl font-bold text-gray-900">{university.studentsHired}</div>
                      </div>
                      <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50">
                         <div className="text-xs text-blue-600 font-bold uppercase mb-1">Active Projects</div>
                         <div className="text-2xl font-bold text-gray-900">{university.totalProjects}</div>
                      </div>
                   </div>

                   <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-primary-600" /> Agreement Details
                      </h3>
                      <div className="grid grid-cols-2 gap-y-4 text-sm">
                         <div>
                            <p className="text-gray-500">Contract Start</p>
                            <p className="font-medium text-gray-900">{university.partnershipData.startDate}</p>
                         </div>
                         <div>
                            <p className="text-gray-500">Renewal Date</p>
                            <p className="font-medium text-gray-900">{university.partnershipData.renewalDate}</p>
                         </div>
                         <div>
                            <p className="text-gray-500">Next Campus Drive</p>
                            <p className="font-medium text-emerald-600 flex items-center gap-1">
                               <Calendar className="w-3.5 h-3.5" /> {university.partnershipData.upcomingDriveDate}
                            </p>
                         </div>
                         <div>
                            <p className="text-gray-500">MOU Document</p>
                            <a href="#" className="text-primary-600 font-medium hover:underline flex items-center gap-1">
                               View PDF <FileText className="w-3.5 h-3.5" />
                            </a>
                         </div>
                      </div>
                   </div>

                   <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                      <h3 className="font-bold text-gray-900 mb-3 text-sm">Point of Contact</h3>
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                            {university.partnershipData.pocName?.[0]}
                         </div>
                         <div>
                            <p className="text-sm font-bold text-gray-900">{university.partnershipData.pocName}</p>
                            <p className="text-xs text-gray-500">{university.partnershipData.pocRole}</p>
                         </div>
                         <a href={`mailto:${university.partnershipData.pocEmail}`} className="ml-auto p-2 bg-white border border-gray-200 rounded-lg hover:text-primary-600">
                            <Mail className="w-4 h-4" />
                         </a>
                      </div>
                   </div>
                </div>
              )}

              {/* --- SCENARIO 2: PENDING --- */}
              {university.partnershipStatus === 'pending' && (
                <div className="text-center py-6">
                   <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-8 h-8" />
                   </div>
                   <h3 className="text-lg font-bold text-gray-900">Partnership Request Sent</h3>
                   <p className="text-gray-500 text-sm mt-2 max-w-sm mx-auto">
                      Your request to partner with {university.name} is currently under review by their placement cell.
                   </p>
                   
                   <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200 text-left max-w-sm mx-auto">
                      <p className="text-xs font-bold text-gray-500 uppercase mb-2">Next Steps</p>
                      <ul className="text-sm space-y-2 text-gray-600">
                         <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Request Submitted</li>
                         <li className="flex gap-2"><Clock className="w-4 h-4 text-amber-500"/> Awaiting Admin Approval</li>
                         <li className="flex gap-2 opacity-50"><Briefcase className="w-4 h-4"/> Sign MOU</li>
                      </ul>
                   </div>
                   
                   <button className="mt-6 text-gray-400 text-sm hover:text-red-500 font-medium">Cancel Request</button>
                </div>
              )}

              {/* --- SCENARIO 3: NO PARTNERSHIP --- */}
              {university.partnershipStatus === 'none' && (
                <div className="space-y-6">
                   <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-800 text-sm">
                      <strong>Why partner?</strong> Get priority access to student database, organize exclusive campus drives, and collaborate on research projects.
                   </div>

                   <form className="space-y-4">
                      <div>
                         <label className="text-sm font-bold text-gray-700">Proposal Message</label>
                         <textarea 
                           className="w-full mt-1 p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                           rows={4}
                           placeholder="Hi, we are interested in hiring students from your CS department..."
                         ></textarea>
                      </div>
                      <button className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg shadow-lg shadow-primary-600/20 transition-all active:scale-95">
                         Send Partnership Request
                      </button>
                   </form>
                </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};