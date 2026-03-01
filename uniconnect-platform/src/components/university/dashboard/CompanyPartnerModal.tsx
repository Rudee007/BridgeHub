import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // <-- Added AnimatePresence here!
import { MapPin, Globe, Mail, Building2, ShieldCheck, Calendar, FileText, X } from "lucide-react";

// Define the type based on your data structure
export type CompanyType = {
  id: number;
  name: string;
  location: string;
  est: string;
  rating: number;
  reviews: number;
  status: string;
  statusColor: string;
  industry: string[];
  metrics: { students: string; projects: number; hired: number };
  about: string;
  contractStart: string;
  renewalDate: string;
  nextDrive: string;
  poc: { name: string; role: string; email: string };
  avgPackage?: string;
  highestPackage?: string;
};

interface CompanyPartnerModalProps {
  company: CompanyType;
  onClose: () => void;
  initialTab?: "overview" | "partnership";
}

export function CompanyPartnerModal({ company, onClose, initialTab = "overview" }: CompanyPartnerModalProps) {
  const [modalTab, setModalTab] = useState<"overview" | "partnership">(initialTab);

  // Fallback values for packages if they aren't in the main mock data
  const avgPkg = company.avgPackage || "12 LPA";
  const highPkg = company.highestPackage || "24 LPA";

  return (
    // Outer Flexbox Container guarantees perfect centering
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      
      {/* Dark Blurred Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
      />

      {/* Actual Modal Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-[600px] bg-white rounded-[24px] shadow-2xl flex flex-col overflow-hidden max-h-[90vh]"
      >
        {/* --- MODAL HEADER (Fixed at top) --- */}
        <div className="shrink-0 h-32 bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 w-8 h-8 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* --- OVERLAPPING PROFILE INFO (Fixed at top) --- */}
        <div className="shrink-0 px-8 pb-4 relative">
          {/* Logo Box pushed up using negative margin */}
          <div className="absolute -top-10 left-8 w-20 h-20 bg-white rounded-2xl p-1 shadow-md border border-gray-100 flex items-center justify-center">
            <div className="w-full h-full bg-gray-50 rounded-xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          
          <div className="ml-24 pt-3 flex items-start justify-between">
            <div>
              <h2 className="text-[20px] font-extrabold text-gray-900 leading-tight">{company.name}</h2>
              <p className="text-[13px] text-gray-500 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5"/> {company.location} <span className="mx-1 border-l border-gray-300 h-3" /> Est. {company.est}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"><Globe className="w-4 h-4"/></button>
              <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"><Mail className="w-4 h-4"/></button>
            </div>
          </div>
        </div>

        {/* --- MODAL TABS (Fixed at top) --- */}
        <div className="shrink-0 px-8 flex items-center gap-6 border-b border-gray-200 mt-2">
          {(["overview", "partnership"] as const).map(tab => (
            <button 
              key={tab} 
              onClick={() => setModalTab(tab)}
              className={`pb-3 text-[14px] font-bold transition-colors relative ${modalTab === tab ? "text-primary-600" : "text-gray-500 hover:text-gray-900"}`}
            >
              {tab === "overview" ? "Overview" : "Partnership"}
              {modalTab === tab && <motion.div layoutId="modalTabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />}
            </button>
          ))}
        </div>

        {/* --- SCROLLABLE CONTENT AREA --- */}
        {/* flex-1 and overflow-y-auto ensures only this part scrolls if it gets too tall */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            {modalTab === "overview" ? (
              <motion.div key="overview" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-8">
                {/* About Box */}
                <div className="bg-gray-50/50 border border-gray-100 rounded-[20px] p-6">
                  <h3 className="text-[14px] font-bold text-gray-900 mb-2">About Company</h3>
                  <p className="text-[13px] text-gray-600 leading-relaxed">{company.about}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center flex flex-col justify-center items-center h-24">
                    <p className="text-[18px] font-bold text-gray-900">{avgPkg}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Avg Package</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center flex flex-col justify-center items-center h-24">
                    <p className="text-[18px] font-bold text-primary-600">{highPkg}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Highest Pkg</p>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center flex flex-col justify-center items-center h-24">
                    <p className="text-[18px] font-bold text-emerald-600">{company.metrics.hired}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">Total Hired</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="partnership" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                {company.status === "ACTIVE PARTNER" ? (
                  <>
                    {/* Top 2 Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-[16px] p-5 shadow-sm">
                          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Students Hired</p>
                          <p className="text-[28px] font-extrabold text-gray-900">{company.metrics.hired}</p>
                        </div>
                        <div className="border border-gray-200 rounded-[16px] p-5 shadow-sm">
                          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Active Projects</p>
                          <p className="text-[28px] font-extrabold text-gray-900">{company.metrics.projects}</p>
                        </div>
                    </div>

                    {/* Agreement Box */}
                    <div className="border border-primary-100 bg-primary-50/30 rounded-[20px] p-6">
                      <h3 className="text-[13px] font-bold text-primary-900 flex items-center gap-2 mb-5">
                        <ShieldCheck className="w-4 h-4 text-primary-600" /> Agreement Details
                      </h3>
                      <div className="grid grid-cols-2 gap-y-5">
                        <div>
                          <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mb-1">Contract Start</p>
                          <p className="text-[14px] font-bold text-gray-900">{company.contractStart}</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mb-1">Renewal Date</p>
                          <p className="text-[14px] font-bold text-gray-900">{company.renewalDate}</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mb-1">Next Campus Drive</p>
                          <p className="text-[14px] font-bold text-emerald-600 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5"/> {company.nextDrive}</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mb-1">MOU Document</p>
                          <a href="#" className="text-[13px] font-bold text-primary-600 hover:underline flex items-center gap-1">View PDF <FileText className="w-3.5 h-3.5"/></a>
                        </div>
                      </div>
                    </div>
                    
                    {/* POC Box */}
                    <div className="border border-gray-200 bg-gray-50/50 rounded-[20px] p-5 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[14px]">
                          {company.poc.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Point of Contact</p>
                          <p className="text-[14px] font-bold text-gray-900 leading-tight">{company.poc.name}</p>
                          <p className="text-[12px] text-gray-500">{company.poc.role}</p>
                        </div>
                      </div>
                      <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm">
                        <Mail className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <ShieldCheck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-[16px] font-bold text-gray-900">No Active Partnership</p>
                    <p className="text-[13px] text-gray-500 mt-1">Send an invite to establish an MoU and unlock these details.</p>
                    <button className="mt-6 px-6 py-2.5 bg-gray-900 text-white rounded-xl text-[13px] font-bold hover:bg-black transition-colors">Send Invite</button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}