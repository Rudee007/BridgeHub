import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings as SettingsIcon, Edit2, GraduationCap, 
  Trash2, UserPlus, Download, ChevronDown,
  Bell, ShieldCheck, Briefcase, CheckCircle2, Mail, Clock
} from "lucide-react";
import { UniversityLayout } from "@/components/university/UniversityLayout";

type Tab = "profile" | "notifications" | "team" | "portal";

export function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  // Mock states for notifications
  const [notifications, setNotifications] = useState({
    verification: true,
    endorsements: true,
    placements: false,
    partnerships: true,
    weekly: false,
    monthly: true,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <UniversityLayout universityName="IIT Bombay">
      <div className="max-w-[1000px] mx-auto space-y-6 pb-12">
        
        {/* 1. Page Header (Outside the card) */}
        <div>
          <h1 className="text-[28px] font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <SettingsIcon className="w-7 h-7 text-primary-600" />
            Settings
          </h1>
          <p className="text-[15px] font-medium text-gray-500 mt-1">
            Manage your university portal preferences
          </p>
        </div>

        {/* 2. Main Settings Container (The large white card) */}
        <div className="bg-white border border-gray-200 rounded-[24px] shadow-sm p-6 md:p-8 min-h-[700px]">
          
          {/* --- TOP SEGMENTED TABS (Matches the image perfectly) --- */}
          <div className="flex p-1.5 space-x-1 bg-gray-50/80 rounded-2xl border border-gray-100 mb-8 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {[
              { id: "profile", label: "Profile" },
              { id: "notifications", label: "Notifications" },
              { id: "team", label: "Team Access" },
              { id: "portal", label: "Portal" }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`flex-1 min-w-[120px] py-2.5 text-[14px] font-bold rounded-[12px] transition-all relative ${
                    isActive 
                      ? "bg-white text-gray-900 shadow-sm border border-gray-200/50" 
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* --- TAB CONTENT AREA --- */}
          <div className="pt-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                
                {/* ================= PROFILE TAB ================= */}
                {activeTab === "profile" && (
                  <div className="space-y-8">
                    
                    {/* Section Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-[18px] font-bold text-gray-900">University Profile</h2>
                        <p className="text-[14px] text-gray-500 mt-1">Manage your institution's information</p>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-[13px] font-bold transition-colors shadow-sm">
                        <Edit2 className="w-3.5 h-3.5" /> Edit
                      </button>
                    </div>

                    {/* Banner Block (Matches the image exactly) */}
                    <div className="flex items-center gap-4 p-5 bg-gray-50/80 rounded-[16px] border border-gray-100">
                      <div className="w-14 h-14 bg-primary-600 rounded-full flex items-center justify-center shrink-0 shadow-inner">
                        <GraduationCap className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-[16px] font-bold text-gray-900 leading-tight">Indian Institute of Technology Bombay</h3>
                        <p className="text-[13px] text-gray-500 mt-0.5">U-0456</p>
                      </div>
                    </div>

                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                      <InputField label="University Name" value="Indian Institute of Technology Bombay" readOnly />
                      <InputField label="AISHE Code" value="U-0456" readOnly />
                      <InputField label="Location / City" value="Mumbai, Maharashtra" readOnly />
                      <InputField label="Website URL" value="https://www.iitb.ac.in" readOnly />
                      <InputField label="TPO Name" value="Dr. Rajesh Kumar" readOnly />
                      <InputField label="TPO Email" value="tpo@iitb.ac.in" readOnly />
                      <InputField label="TPO Phone" value="+91 22 2576 7890" readOnly className="md:col-span-2 md:w-[calc(50%-12px)]" />
                    </div>
                  </div>
                )}

                {/* ================= NOTIFICATIONS TAB ================= */}
                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <div className="mb-6">
                      <h2 className="text-[18px] font-bold text-gray-900">Notification Preferences</h2>
                      <p className="text-[14px] text-gray-500 mt-1">Choose what alerts you want to receive</p>
                    </div>

                    <div className="flex flex-col">
                      <ToggleRow 
                        title="New student verification requests" 
                        description="Get notified when a student submits verification documents"
                        checked={notifications.verification} onChange={() => toggleNotification("verification")}
                      />
                      <ToggleRow 
                        title="Endorsement proposals submitted" 
                        description="Alerts when students request endorsements for project applications"
                        checked={notifications.endorsements} onChange={() => toggleNotification("endorsements")}
                      />
                      <ToggleRow 
                        title="Student placement confirmed" 
                        description="Notifications for confirmed placement offers"
                        checked={notifications.placements} onChange={() => toggleNotification("placements")}
                      />
                      <ToggleRow 
                        title="Company partnership requests" 
                        description="New companies requesting to partner with your university"
                        checked={notifications.partnerships} onChange={() => toggleNotification("partnerships")}
                      />
                      <ToggleRow 
                        title="Weekly placement summary email" 
                        description="A weekly digest of placement activity and statistics"
                        checked={notifications.weekly} onChange={() => toggleNotification("weekly")}
                      />
                      <ToggleRow 
                        title="Monthly analytics digest" 
                        description="Comprehensive monthly report delivered to your inbox"
                        checked={notifications.monthly} onChange={() => toggleNotification("monthly")}
                      />
                    </div>
                  </div>
                )}

                {/* ================= TEAM ACCESS TAB ================= */}
                {activeTab === "team" && (
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-[18px] font-bold text-gray-900">Team Members</h2>
                        <p className="text-[14px] text-gray-500 mt-1">Manage who has access to the portal</p>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-[13px] font-bold transition-colors shadow-sm">
                        <UserPlus className="w-4 h-4" /> Invite Team Member
                      </button>
                    </div>

                    <div className="w-full overflow-x-auto pt-4">
                      <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                          <tr className="border-b border-gray-100">
                            <th className="pb-4 px-2 text-[13px] font-semibold text-gray-500">Name</th>
                            <th className="pb-4 px-2 text-[13px] font-semibold text-gray-500">Email</th>
                            <th className="pb-4 px-2 text-[13px] font-semibold text-gray-500">Role</th>
                            <th className="pb-4 px-2 text-[13px] font-semibold text-gray-500">Status</th>
                            <th className="pb-4 px-2 text-[13px] font-semibold text-gray-500"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 px-2 text-[14px] font-bold text-gray-900">Dr. Rajesh Kumar</td>
                            <td className="py-4 px-2 text-[14px] text-gray-600">tpo@iitb.ac.in</td>
                            <td className="py-4 px-2 text-[13px] font-bold text-primary-600">Admin</td>
                            <td className="py-4 px-2"><span className="text-[12px] font-bold text-emerald-600">Active</span></td>
                            <td className="py-4 px-2 text-right"><button className="text-gray-400 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button></td>
                          </tr>
                          <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 px-2 text-[14px] font-bold text-gray-900">Priya Menon</td>
                            <td className="py-4 px-2 text-[14px] text-gray-600">priya.menon@iitb.ac.in</td>
                            <td className="py-4 px-2 text-[13px] font-bold text-primary-600">Admin</td>
                            <td className="py-4 px-2"><span className="text-[12px] font-bold text-emerald-600">Active</span></td>
                            <td className="py-4 px-2 text-right"><button className="text-gray-400 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button></td>
                          </tr>
                          <tr className="hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 px-2 text-[14px] font-bold text-gray-900">Amit Deshmukh</td>
                            <td className="py-4 px-2 text-[14px] text-gray-600">amit.d@iitb.ac.in</td>
                            <td className="py-4 px-2 text-[13px] font-bold text-gray-500">Viewer</td>
                            <td className="py-4 px-2"><span className="text-[12px] font-bold text-orange-500">Invited</span></td>
                            <td className="py-4 px-2 text-right"><button className="text-gray-400 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ================= PORTAL TAB ================= */}
                {activeTab === "portal" && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-[18px] font-bold text-gray-900">Portal Preferences</h2>
                      <p className="text-[14px] text-gray-500 mt-1">Customize your portal experience</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField label="University Display Name" value="IIT Bombay" className="md:col-span-2 md:w-[calc(50%-12px)]" />
                      
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Academic Year</label>
                        <div className="relative">
                          <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-shadow appearance-none cursor-pointer">
                            <option>2024-25</option>
                            <option>2023-24</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Default Department Filter</label>
                        <div className="relative">
                          <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-shadow appearance-none cursor-pointer">
                            <option>All Departments</option>
                            <option>Computer Science</option>
                            <option>Electronics</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Placement Season</label>
                        <div className="relative">
                          <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-shadow appearance-none cursor-pointer">
                            <option>Both</option>
                            <option>Internships Only</option>
                            <option>Full-Time Only</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 mt-4 border-t border-gray-100">
                      <div className="space-y-2 md:w-[calc(50%-12px)]">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Data Export</label>
                        <button className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-[14px] font-bold transition-colors">
                          <Download className="w-4 h-4" /> Export All Data (CSV)
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </UniversityLayout>
  );
}

// --- Helper Components ---

function InputField({ label, value, readOnly = false, className = "" }: { label: string, value: string, readOnly?: boolean, className?: string }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{label}</label>
      <input 
        type="text" 
        defaultValue={value}
        readOnly={readOnly}
        className={`w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 ${
          readOnly ? "bg-white outline-none focus:ring-0 focus:border-gray-200 cursor-default" : "bg-white shadow-sm"
        }`}
      />
    </div>
  );
}

function ToggleRow({ title, description, checked, onChange }: { title: string, description: string, checked: boolean, onChange: () => void }) {
  return (
    <div className="flex items-center justify-between py-5 border-b border-gray-100 last:border-0 cursor-pointer group" onClick={onChange}>
      <div className="pr-6">
        <p className="text-[15px] font-bold text-gray-900 leading-tight">{title}</p>
        <p className="text-[13px] font-medium text-gray-500 mt-1">{description}</p>
      </div>
      {/* iOS style Toggle Switch */}
      <div className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${checked ? 'bg-primary-600' : 'bg-gray-200'}`}>
        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </div>
    </div>
  );
}