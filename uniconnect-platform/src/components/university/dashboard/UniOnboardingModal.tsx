import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Building2, MapPin, CheckCircle2 } from "lucide-react";
import { DynamicLogo } from "@/components/ui/DynamicLogo";

interface UniOnboardingModalProps {
  onClose: () => void;
}

const DEPARTMENTS = [
  "Computer Science", "Electronics", "Mechanical", "Civil", 
  "Electrical", "Information Tech", "Chemical", "MBA"
];

export function UniOnboardingModal({ onClose }: UniOnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "IIT Bombay",
    aishe: "",
    website: "https://",
    location: "",
    departments: [] as string[],
    tpoName: "",
    tpoEmail: ""
  });

  const toggleDepartment = (dept: string) => {
    setFormData(prev => ({
      ...prev,
      departments: prev.departments.includes(dept)
        ? prev.departments.filter(d => d !== dept)
        : [...prev.departments, dept]
    }));
  };

  // ✅ Properly handle finishing so the modal doesn't keep appearing
  const handleFinish = () => {
    localStorage.setItem("uni_profile_completed", "true");
    onClose(); 
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else handleFinish(); 
  };

  return (
    // Background overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        // ✅ Added max-h-[95vh] to ensure it never gets cut off on small phones
        className="bg-white rounded-[24px] shadow-2xl w-full max-w-5xl max-h-[95vh] md:max-h-[90vh] flex flex-col md:flex-row overflow-hidden relative"
      >
        {/* Close Button (Mobile Absolute) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:hidden w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 z-20 hover:bg-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* --- LEFT PANE: Form Area --- */}
        {/* ✅ Added overflow-y-auto so the form scrolls inside the modal if the screen is too small */}
        <div className="flex-1 p-6 md:p-10 flex flex-col overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200">
          
          {/* Header & Stepper */}
          <div className="mb-8 shrink-0">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="text-[13px] font-bold text-gray-900 uppercase tracking-widest">Setup</span>
              </div>
              <button onClick={onClose} className="hidden md:block text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper Visual */}
            <div className="flex items-center gap-2 mb-6 md:mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex-1 flex items-center gap-2">
                  <div className={`h-1 flex-1 rounded-full transition-colors duration-300 ${step >= s ? 'bg-primary-600' : 'bg-gray-100'}`} />
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${step >= s ? 'text-primary-600' : 'text-gray-400'}`}>
                    {s === 1 ? 'Identity' : s === 2 ? 'Campus' : 'Contact'}
                  </span>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-extrabold text-gray-900">
              {step === 1 ? "Identity" : step === 2 ? "Campus & Academics" : "Placement Contact"}
            </h2>
            <p className="text-[14px] text-gray-500 mt-1">
              {step === 1 ? "Let's start with the basic institutional details." : 
               step === 2 ? "Where are you located and what do you teach?" : 
               "Who should companies contact for hiring?"}
            </p>
          </div>

          {/* Form Content (Animated) */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-5">
                  <InputField label="Official University Name" value={formData.name} onChange={(val) => setFormData({...formData, name: val})} />
                  <InputField label="AISHE / Affiliation Code" placeholder="e.g. U-0456" value={formData.aishe} onChange={(val) => setFormData({...formData, aishe: val})} />
                  <InputField label="University Website" placeholder="https://" value={formData.website} onChange={(val) => setFormData({...formData, website: val})} />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-6">
                  <InputField label="Location / City" placeholder="e.g. Mumbai, Maharashtra" value={formData.location} onChange={(val) => setFormData({...formData, location: val})} />
                  
                  <div>
                    <label className="text-[12px] font-bold text-gray-600 uppercase tracking-wider mb-3 block pl-1">Key Departments</label>
                    <div className="flex flex-wrap gap-2">
                      {DEPARTMENTS.map(dept => (
                        <button
                          key={dept}
                          onClick={() => toggleDepartment(dept)}
                          className={`px-3 py-2 rounded-xl text-[12px] md:text-[13px] font-semibold transition-all border ${
                            formData.departments.includes(dept)
                              ? "bg-primary-50 border-primary-200 text-primary-700 shadow-sm"
                              : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {dept}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-5">
                  <InputField label="TPO Name (Placement Officer)" placeholder="e.g. Dr. Rajesh Kumar" value={formData.tpoName} onChange={(val) => setFormData({...formData, tpoName: val})} />
                  <InputField label="Official TPO Email" placeholder="tpo@university.edu" value={formData.tpoEmail} onChange={(val) => setFormData({...formData, tpoEmail: val})} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 flex flex-col gap-3 shrink-0">
            <button 
              onClick={nextStep}
              className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-[14px] font-bold transition-all shadow-sm active:scale-[0.98]"
            >
              {step === 3 ? "Complete Profile" : `Continue to ${step === 1 ? 'Campus' : 'Contact'}`}
            </button>
            <button 
              onClick={onClose}
              className="w-full py-3.5 bg-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl text-[13px] font-semibold transition-colors"
            >
              I'll do this later
            </button>
          </div>
        </div>

        {/* --- RIGHT PANE: Dark Mode Preview (Hidden on Mobile) --- */}
        <div className="hidden md:flex w-[400px] lg:w-[480px] bg-[#0B0F19] p-10 flex-col relative shrink-0">
          
          {/* Subtle background glow effect */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary-600/20 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex-1 flex flex-col justify-center">
            <h3 className="text-3xl font-extrabold text-white tracking-tight text-center mb-2">Your Profile</h3>
            <p className="text-[14px] text-gray-400 text-center mb-10">See how companies will view your institution</p>

            {/* The Preview Card */}
            <motion.div 
              layout
              className="bg-white/5 border border-white/10 rounded-[24px] p-6 backdrop-blur-md shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-5">
                <DynamicLogo name={formData.name || "University Name"} type="university" size="lg" />
                <div className="min-w-0">
                  <h4 className="text-[18px] font-bold text-white leading-tight truncate">
                    {formData.name || "University Name"}
                  </h4>
                  {formData.location && (
                    <p className="text-[12px] text-gray-400 mt-1 flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 shrink-0" /> {formData.location}
                    </p>
                  )}
                </div>
              </div>

              {/* Mock Metrics/Status */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Status</p>
                  <p className="text-[13px] font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">AISHE</p>
                  <p className="text-[13px] font-semibold text-gray-200 truncate">{formData.aishe || "Pending"}</p>
                </div>
              </div>

              {/* Dynamic Departments Preview */}
              <div className="flex flex-wrap gap-2">
                {formData.departments.length > 0 ? (
                  formData.departments.slice(0, 3).map(dept => (
                    <span key={dept} className="px-2.5 py-1 rounded-lg bg-white/10 text-gray-300 text-[11px] font-medium border border-white/5 whitespace-nowrap">
                      {dept}
                    </span>
                  ))
                ) : (
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 text-gray-500 text-[11px] font-medium border border-white/5 border-dashed">
                    Departments will appear here
                  </span>
                )}
                {formData.departments.length > 3 && (
                  <span className="px-2.5 py-1 rounded-lg bg-white/5 text-gray-400 text-[11px] font-medium border border-white/5">
                    +{formData.departments.length - 3} more
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}

// ✅ Fixed TypeScript Types for the reusable input
interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function InputField({ label, value, onChange, placeholder = "" }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-bold text-gray-600 uppercase tracking-wider pl-1">{label}</label>
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-gray-50 hover:bg-white focus:bg-white placeholder:text-gray-400 shadow-sm"
      />
    </div>
  );
}