import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings as SettingsIcon, Edit2, GraduationCap, 
  Trash2, UserPlus, Download, ChevronDown, CheckCircle2,
  X, Loader2, Mail, Shield
} from "lucide-react";
import { UniversityLayout } from "@/components/university/UniversityLayout";

type Tab = "profile" | "notifications" | "team" | "portal";

export function Settings() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  // ================= STATE MANAGEMENT =================

  // 1. Profile State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: "Indian Institute of Technology Bombay",
    aishe: "U-0456",
    location: "Mumbai, Maharashtra",
    website: "https://www.iitb.ac.in",
    tpoName: "Dr. Rajesh Kumar",
    tpoEmail: "tpo@iitb.ac.in",
    tpoPhone: "+91 22 2576 7890"
  });
  const [tempProfile, setTempProfile] = useState(profile);

  // 2. Notifications State
  const [notifications, setNotifications] = useState({
    verification: true,
    endorsements: true,
    placements: false,
    partnerships: true,
    weekly: false,
    monthly: true,
  });

  // 3. Team State & Invite Modal
  const [team, setTeam] = useState([
    { id: 1, name: "Dr. Rajesh Kumar", email: "tpo@iitb.ac.in", role: "Admin", status: "Active" },
    { id: 2, name: "Priya Menon", email: "priya.menon@iitb.ac.in", role: "Admin", status: "Active" },
    { id: 3, name: "Amit Deshmukh", email: "amit.d@iitb.ac.in", role: "Viewer", status: "Invited" },
  ]);
  
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteData, setInviteData] = useState({ name: "", email: "", role: "Viewer" });

  // 4. Portal Prefs State
  const [portalPrefs, setPortalPrefs] = useState({
    displayName: "IIT Bombay",
    academicYear: "2024-25",
    departmentFilter: "All Departments",
    placementSeason: "Both"
  });

  // ================= HANDLERS =================

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      setProfile(tempProfile);
      setIsEditingProfile(false);
      setIsSaving(false);
    }, 800);
  };

  const handleCancelProfile = () => {
    setTempProfile(profile);
    setIsEditingProfile(false);
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const removeTeamMember = (id: number) => {
    setTeam(team.filter(member => member.id !== id));
  };

  // ✅ Actual logic for submitting the invite form
  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteData.name || !inviteData.email) return;

    const newMember = {
      id: Date.now(), // Generate a unique ID
      name: inviteData.name,
      email: inviteData.email,
      role: inviteData.role,
      status: "Invited"
    };

    setTeam([...team, newMember]);
    setIsInviteModalOpen(false);
    setInviteData({ name: "", email: "", role: "Viewer" }); // Reset form
  };

  return (
    <UniversityLayout universityName={portalPrefs.displayName || "IIT Bombay"}>
      <div className="max-w-[1000px] mx-auto space-y-4 sm:space-y-6 pb-12">
        {/* Page Header */}
        <div className="px-2">
          <h1 className="text-[24px] sm:text-[28px] font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <SettingsIcon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-600" />
            Settings
          </h1>
          <p className="text-[14px] sm:text-[15px] font-medium text-gray-500 mt-1">
            Manage your university portal preferences
          </p>
        </div>

        {/* Main Settings Container */}
        <div className="bg-white border border-gray-200 rounded-[24px] shadow-sm p-4 sm:p-6 md:p-8 min-h-[600px] md:min-h-[700px]">
          
          {/* TOP SEGMENTED TABS */}
          <div className="flex p-1.5 space-x-1 bg-gray-50/80 rounded-2xl border border-gray-100 mb-6 sm:mb-8 overflow-x-auto [&::-webkit-scrollbar]:hidden snap-x">
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
                  className={`flex-1 min-w-[120px] py-2.5 px-4 text-[13px] sm:text-[14px] font-bold rounded-[12px] transition-all relative snap-center ${
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

          {/* TAB CONTENT AREA */}
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
                  <div className="space-y-6 sm:space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-[17px] sm:text-[18px] font-bold text-gray-900">University Profile</h2>
                        <p className="text-[13px] sm:text-[14px] text-gray-500 mt-1">Manage your institution's information</p>
                      </div>
                      
                      {!isEditingProfile ? (
                        <button 
                          onClick={() => setIsEditingProfile(true)}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-[13px] font-bold transition-colors shadow-sm w-full sm:w-auto"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> Edit Profile
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button 
                            onClick={handleCancelProfile}
                            disabled={isSaving}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-[13px] font-bold transition-colors shadow-sm disabled:opacity-50"
                          >
                            <X className="w-4 h-4" /> Cancel
                          </button>
                          <button 
                            onClick={handleSaveProfile}
                            disabled={isSaving}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-[13px] font-bold transition-colors shadow-sm disabled:opacity-50 min-w-[100px]"
                          >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><CheckCircle2 className="w-4 h-4" /> Save</>}
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 p-4 sm:p-5 bg-gray-50/80 rounded-[16px] border border-gray-100">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-600 rounded-full flex items-center justify-center shrink-0 shadow-inner">
                        <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-[15px] sm:text-[16px] font-bold text-gray-900 leading-tight truncate">
                          {tempProfile.name || "University Name"}
                        </h3>
                        <p className="text-[12px] sm:text-[13px] text-gray-500 mt-0.5">{tempProfile.aishe || "No Code"}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 sm:gap-y-6">
                      <InputField label="University Name" value={tempProfile.name} onChange={(val) => setTempProfile({...tempProfile, name: val})} readOnly={!isEditingProfile} className="md:col-span-2" />
                      <InputField label="AISHE Code" value={tempProfile.aishe} onChange={(val) => setTempProfile({...tempProfile, aishe: val})} readOnly={!isEditingProfile} />
                      <InputField label="Location / City" value={tempProfile.location} onChange={(val) => setTempProfile({...tempProfile, location: val})} readOnly={!isEditingProfile} />
                      <InputField label="Website URL" value={tempProfile.website} onChange={(val) => setTempProfile({...tempProfile, website: val})} readOnly={!isEditingProfile} className="md:col-span-2" />
                      <InputField label="TPO Name" value={tempProfile.tpoName} onChange={(val) => setTempProfile({...tempProfile, tpoName: val})} readOnly={!isEditingProfile} />
                      <InputField label="TPO Email" value={tempProfile.tpoEmail} onChange={(val) => setTempProfile({...tempProfile, tpoEmail: val})} readOnly={!isEditingProfile} />
                      <InputField label="TPO Phone" value={tempProfile.tpoPhone} onChange={(val) => setTempProfile({...tempProfile, tpoPhone: val})} readOnly={!isEditingProfile} />
                    </div>
                  </div>
                )}

                {/* ================= NOTIFICATIONS TAB ================= */}
                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <div className="mb-4 sm:mb-6">
                      <h2 className="text-[17px] sm:text-[18px] font-bold text-gray-900">Notification Preferences</h2>
                      <p className="text-[13px] sm:text-[14px] text-gray-500 mt-1">Choose what alerts you want to receive</p>
                    </div>

                    <div className="flex flex-col">
                      <ToggleRow title="New student verification requests" description="Get notified when a student submits documents" checked={notifications.verification} onChange={() => toggleNotification("verification")} />
                      <ToggleRow title="Endorsement proposals submitted" description="Alerts when students request endorsements" checked={notifications.endorsements} onChange={() => toggleNotification("endorsements")} />
                      <ToggleRow title="Student placement confirmed" description="Notifications for confirmed placement offers" checked={notifications.placements} onChange={() => toggleNotification("placements")} />
                      <ToggleRow title="Weekly placement summary" description="A weekly digest of placement activity" checked={notifications.weekly} onChange={() => toggleNotification("weekly")} />
                    </div>
                  </div>
                )}

                {/* ================= TEAM ACCESS TAB ================= */}
                {activeTab === "team" && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <h2 className="text-[17px] sm:text-[18px] font-bold text-gray-900">Team Members</h2>
                        <p className="text-[13px] sm:text-[14px] text-gray-500 mt-1">Manage who has access to the portal</p>
                      </div>
                      
                      {/* ✅ Wire up the Invite Button */}
                      <button 
                        onClick={() => setIsInviteModalOpen(true)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-[13px] font-bold transition-colors shadow-sm w-full sm:w-auto"
                      >
                        <UserPlus className="w-4 h-4" /> Invite Member
                      </button>
                    </div>

                    <div className="w-full overflow-x-auto pt-2 sm:pt-4 border border-gray-100 sm:border-transparent rounded-xl sm:rounded-none">
                      <table className="w-full text-left border-collapse whitespace-nowrap min-w-[600px]">
                        <thead>
                          <tr className="border-b border-gray-100 bg-gray-50/50 sm:bg-transparent">
                            <th className="py-3 sm:pb-4 px-4 sm:px-2 text-[12px] sm:text-[13px] font-semibold text-gray-500">Name</th>
                            <th className="py-3 sm:pb-4 px-4 sm:px-2 text-[12px] sm:text-[13px] font-semibold text-gray-500">Email</th>
                            <th className="py-3 sm:pb-4 px-4 sm:px-2 text-[12px] sm:text-[13px] font-semibold text-gray-500">Role</th>
                            <th className="py-3 sm:pb-4 px-4 sm:px-2 text-[12px] sm:text-[13px] font-semibold text-gray-500">Status</th>
                            <th className="py-3 sm:pb-4 px-4 sm:px-2 text-[12px] sm:text-[13px] font-semibold text-gray-500"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <AnimatePresence>
                            {team.map((member) => (
                              <motion.tr 
                                key={member.id}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="border-b border-gray-50 hover:bg-gray-50/80 transition-colors group"
                              >
                                <td className="py-4 px-4 sm:px-2 text-[13px] sm:text-[14px] font-bold text-gray-900">{member.name}</td>
                                <td className="py-4 px-4 sm:px-2 text-[13px] sm:text-[14px] text-gray-600">{member.email}</td>
                                <td className="py-4 px-4 sm:px-2 text-[12px] sm:text-[13px] font-bold text-gray-700">{member.role}</td>
                                <td className="py-4 px-4 sm:px-2">
                                  <span className={`text-[11px] sm:text-[12px] font-bold px-2.5 py-1 rounded-full ${
                                    member.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                                  }`}>
                                    {member.status}
                                  </span>
                                </td>
                                <td className="py-4 px-4 sm:px-2 text-right">
                                  <button 
                                    onClick={() => removeTeamMember(member.id)}
                                    className="p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors opacity-100 sm:opacity-0 group-hover:opacity-100"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </td>
                              </motion.tr>
                            ))}
                          </AnimatePresence>
                        </tbody>
                      </table>
                      {team.length === 0 && (
                        <div className="py-8 text-center text-[14px] text-gray-500 font-medium">
                          No team members found.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ================= PORTAL TAB ================= */}
                {activeTab === "portal" && (
                  <div className="space-y-6 sm:space-y-8">
                    <div>
                      <h2 className="text-[17px] sm:text-[18px] font-bold text-gray-900">Portal Preferences</h2>
                      <p className="text-[13px] sm:text-[14px] text-gray-500 mt-1">Customize your portal experience</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                      <InputField 
                        label="University Display Name" 
                        value={portalPrefs.displayName} 
                        onChange={(val) => setPortalPrefs({...portalPrefs, displayName: val})}
                        className="md:col-span-2 md:w-[calc(50%-12px)]" 
                      />
                      
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1">Academic Year</label>
                        <div className="relative">
                          <select 
                            value={portalPrefs.academicYear}
                            onChange={(e) => setPortalPrefs({...portalPrefs, academicYear: e.target.value})}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 sm:py-3.5 text-[13px] sm:text-[14px] font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-shadow appearance-none cursor-pointer shadow-sm"
                          >
                            <option>2024-25</option>
                            <option>2023-24</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1">Default Filter</label>
                        <div className="relative">
                          <select 
                            value={portalPrefs.departmentFilter}
                            onChange={(e) => setPortalPrefs({...portalPrefs, departmentFilter: e.target.value})}
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 sm:py-3.5 text-[13px] sm:text-[14px] font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-shadow appearance-none cursor-pointer shadow-sm"
                          >
                            <option>All Departments</option>
                            <option>Computer Science</option>
                            <option>Electronics</option>
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 sm:pt-8 mt-4 border-t border-gray-100">
                      <div className="space-y-2 md:w-[calc(50%-12px)]">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1">Data Export</label>
                        <button className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-[13px] sm:text-[14px] font-bold transition-colors shadow-sm active:scale-[0.98]">
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

      {/* ================= INVITE TEAM MEMBER MODAL ================= */}
      <AnimatePresence>
        {isInviteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-[24px] shadow-2xl w-full max-w-md overflow-hidden relative"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-gray-900 leading-tight">Invite Member</h3>
                    <p className="text-[12px] font-medium text-gray-500 mt-0.5">Send an email invitation</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsInviteModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleInviteSubmit} className="p-6 space-y-5">
                <InputField 
                  label="Full Name" 
                  placeholder="e.g. John Doe"
                  value={inviteData.name} 
                  onChange={(val) => setInviteData({...inviteData, name: val})} 
                />
                
                <InputField 
                  label="Email Address" 
                  placeholder="name@university.edu"
                  value={inviteData.email} 
                  onChange={(val) => setInviteData({...inviteData, email: val})} 
                />

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1 flex items-center gap-1.5">
                    <Shield className="w-3 h-3" /> Assign Role
                  </label>
                  <div className="relative">
                    <select 
                      value={inviteData.role}
                      onChange={(e) => setInviteData({...inviteData, role: e.target.value})}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-shadow appearance-none cursor-pointer shadow-sm"
                    >
                      <option value="Admin">Admin (Full Access)</option>
                      <option value="Editor">Editor (Manage Placements)</option>
                      <option value="Viewer">Viewer (Read Only)</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="pt-4 flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsInviteModalOpen(false)}
                    className="flex-1 py-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-[13px] font-bold transition-colors shadow-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={!inviteData.name || !inviteData.email}
                    className="flex-1 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-[13px] font-bold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send Invite
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </UniversityLayout>
  );
}

// --- Helper Components ---

interface InputFieldProps {
  label: string;
  value: string;
  onChange?: (val: string) => void;
  readOnly?: boolean;
  className?: string;
  placeholder?: string;
}

function InputField({ label, value, onChange, readOnly = false, className = "", placeholder="" }: InputFieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider pl-1">{label}</label>
      <input 
        type="text" 
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        readOnly={readOnly}
        required
        className={`w-full border rounded-xl px-4 py-3 sm:py-3.5 text-[13px] sm:text-[14px] font-medium transition-all focus:outline-none ${
          readOnly 
            ? "bg-gray-50/50 border-transparent text-gray-600 cursor-default" 
            : "bg-white border-gray-200 text-gray-900 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 shadow-sm placeholder:text-gray-400"
        }`}
      />
    </div>
  );
}

function ToggleRow({ title, description, checked, onChange }: { title: string, description: string, checked: boolean, onChange: () => void }) {
  return (
    <div className="flex items-center justify-between py-4 sm:py-5 border-b border-gray-100 last:border-0 cursor-pointer group" onClick={onChange}>
      <div className="pr-4 sm:pr-6 min-w-0">
        <p className="text-[14px] sm:text-[15px] font-bold text-gray-900 leading-tight truncate">{title}</p>
        <p className="text-[12px] sm:text-[13px] font-medium text-gray-500 mt-0.5 sm:mt-1 truncate">{description}</p>
      </div>
      <div className={`relative inline-flex h-6 sm:h-7 w-11 sm:w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${checked ? 'bg-primary-600' : 'bg-gray-200 group-hover:bg-gray-300'}`}>
        <span className={`pointer-events-none inline-block h-5 w-5 sm:h-6 sm:w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-300 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </div>
    </div>
  );
}