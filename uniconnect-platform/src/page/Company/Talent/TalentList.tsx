// page/Company/Talent/TalentList.tsx
import { useState, useMemo } from "react";
import { Search, Trophy, Users, Zap, Award, GraduationCap, Clock } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { SmartFilter } from "@/components/shared/SmartFilter";
import { TalentCard } from "@/components/talent/TalentCard";
import { mockTalent } from "@/data/talentData";
import type { FilterSectionConfig } from "@/types/filters.types";
import type { TalentProfile } from "@/types/talent.types";
import { InviteModal } from "@/components/talent/InviteModal";
import { TalentProfileModal } from "@/components/talent/TalentProfileModal";

// --- FILTER CONFIGURATION FOR TALENT ---
const TALENT_FILTER_CONFIG: FilterSectionConfig[] = [
  {
    id: 'search',
    title: 'Search Talent',
    icon: Search,
    type: 'text',
    placeholder: 'Name, skill, or university...',
    isOpenDefault: true
  },
  {
    id: 'skills',
    title: 'Skills & Tech',
    icon: Zap,
    type: 'tags',
    options: [
      { label: 'React', value: 'React' },
      { label: 'Node.js', value: 'Node.js' },
      { label: 'Python', value: 'Python' },
      { label: 'Java', value: 'Java' },
      { label: 'AWS', value: 'AWS' },
      { label: 'Figma', value: 'Figma' },
      { label: 'Machine Learning', value: 'Machine Learning' },
    ],
    isOpenDefault: true
  },
  {
    id: 'status',
    title: 'Availability',
    icon: Clock,
    type: 'checkbox',
    options: [
      { label: 'Available Now', value: 'available', count: 8 },
      { label: 'Open to Offers', value: 'open_to_offers', count: 12 },
      { label: 'Busy', value: 'busy', count: 5 },
    ],
    isOpenDefault: true
  },
  {
    id: 'university',
    title: 'University',
    icon: GraduationCap,
    type: 'select',
    options: [
      { label: 'IIT Delhi', value: 'IIT Delhi' },
      { label: 'IIT Bombay', value: 'IIT Bombay' },
      { label: 'BITS Pilani', value: 'BITS Pilani' },
      { label: 'IIT Kanpur', value: 'IIT Kanpur' },
    ]
  }
];

export const TalentList = () => {
  const [filters, setFilters] = useState<any>({ search: "", skills: [], status: [], university: "" });

  const [selectedProfile, setSelectedProfile] = useState<TalentProfile | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const handleOpenProfile = (profile: TalentProfile) => {
    setSelectedProfile(profile);
    setIsProfileOpen(true);
  };

  const handleOpenInvite = (profile: TalentProfile) => {
    setSelectedProfile(profile);
    setIsInviteOpen(true);
  };

  const filteredTalent = useMemo(() => {
    return mockTalent.filter(t => {
       if (filters.search) {
         const q = filters.search.toLowerCase();
         const match = t.name.toLowerCase().includes(q) || t.primaryRole.toLowerCase().includes(q);
         if (!match) return false;
       }
       if (filters.skills.length > 0) {
         const hasSkill = filters.skills.some((s: string) => t.skills.includes(s));
         if (!hasSkill) return false;
       }
       if (filters.status.length > 0 && !filters.status.includes(t.status)) return false;
       if (filters.university && t.university !== filters.university) return false;
       return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      
        <div className="p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8">
           
           {/* Page Header */}
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div>
               <h1 className="text-2xl font-bold text-gray-900 font-display">Discover Talent</h1>
               <p className="text-gray-500 mt-1 text-sm">Find and connect with top student developers.</p>
             </div>
             <div className="flex gap-3">
                <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 shadow-sm transition-colors">
                  Saved Profiles (4)
                </button>
             </div>
           </div>

           {/* Stats */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Top Students" value={12} icon={<Trophy className="w-5 h-5"/>} color="blue" />
              <StatCard label="Available Now" value={8} icon={<Users className="w-5 h-5"/>} color="emerald" />
              <StatCard label="Avg Success Rate" value="95%" icon={<Users className="w-5 h-5"/>} color="orange" />
              <StatCard label="Top Rated (4.5+)" value={9} icon={<Award className="w-5 h-5"/>} color="purple" />
           </div>

           {/* Filters + Grid */}
           <div className="flex flex-col lg:flex-row gap-8 items-start">
              <aside className="w-full lg:w-[280px] shrink-0 space-y-4">
                 <SmartFilter 
                    config={TALENT_FILTER_CONFIG}
                    state={filters}
                    onChange={(k, v) => setFilters((prev: any) => ({ ...prev, [k]: v }))}
                    onClear={() => setFilters({ search: "", skills: [], status: [], university: "" })}
                 />
              </aside>

              <div className="flex-1 w-full min-w-0">
                 <div className="flex items-center justify-between mb-6 bg-white p-2 pl-4 rounded-xl border border-gray-200 shadow-sm">
                    <span className="text-sm font-medium text-gray-600">
                      Showing <span className="text-gray-900 font-bold">{filteredTalent.length}</span> candidates
                    </span>
                 </div>
                 
                 {filteredTalent.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-up">
                        {filteredTalent.map((profile, i) => (
                           <TalentCard 
                             key={profile.id} 
                             profile={profile} 
                             index={i} 
                             onInvite={handleOpenInvite}
                             // ✅ FIX: Passed handleOpenProfile correctly to the card
                             onViewProfile={handleOpenProfile}
                           />
                        ))}
                    </div>
                 ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500">No candidates found matching your filters.</p>
                        <button 
                           onClick={() => setFilters({ search: "", skills: [], status: [], university: "" })}
                           className="text-primary-600 font-medium mt-2 hover:underline"
                        >
                           Clear Filters
                        </button>
                    </div>
                 )}
              </div>
           </div>
        </div>

      {/* --- MODALS --- */}
      <TalentProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
        profile={selectedProfile}
        onInvite={(p) => {
           setIsProfileOpen(false);
           setTimeout(() => handleOpenInvite(p), 200);
        }}
      />
      
      <InviteModal 
        isOpen={isInviteOpen} 
        onClose={() => setIsInviteOpen(false)} 
        profile={selectedProfile}
        // ✅ FIX: Passed handleOpenProfile correctly to the modal
        onViewProfile={handleOpenProfile}
      />
    </div>
  );
};

const StatCard = ({ label, value, icon, color }: { label: string, value: number | string, icon: React.ReactNode, color: 'blue' | 'emerald' | 'orange' | 'purple' }) => {
    const colorStyles = {
      blue: "bg-blue-50 text-blue-600 border-blue-100",
      emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
      orange: "bg-orange-50 text-orange-600 border-orange-100",
      purple: "bg-purple-50 text-purple-600 border-purple-100",
    };
  
    return (
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-4 group cursor-default">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-110 ${colorStyles[color]}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
        </div>
      </div>
    );
};