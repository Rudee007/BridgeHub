import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, MapPin, Download, ExternalLink, Github, Linkedin, Globe, 
  Mail, Calendar, Briefcase, GraduationCap, Award, ChevronRight 
} from "lucide-react";
import type { TalentProfile } from "@/types/talent.types";
import { cn } from "@/lib/utils";

interface TalentProfileModalProps {
  profile: TalentProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onInvite: (profile: TalentProfile) => void;
}

type Tab = 'overview' | 'projects' | 'experience';

export const TalentProfileModal: React.FC<TalentProfileModalProps> = ({ 
  profile, isOpen, onClose, onInvite 
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  if (!profile) return null;

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
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto z-50 w-full max-w-4xl h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* --- Header Section (Fixed) --- */}
            <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white shrink-0">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                {/* Avatar with Status Ring */}
                <div className="relative shrink-0">
                  <div className="w-24 h-24 rounded-full border-4 border-white/20 p-1">
                    <img 
                      src={profile.avatar} 
                      alt={profile.name} 
                      className="w-full h-full rounded-full object-cover bg-slate-700"
                    />
                  </div>
                  <div className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-2 border-slate-900 ${
                    profile.status === 'available' ? 'bg-green-500' : 
                    profile.status === 'busy' ? 'bg-amber-500' : 'bg-blue-500'
                  }`} />
                </div>

                {/* Basic Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-3xl font-bold truncate">{profile.name}</h2>
                    {profile.isVerified && (
                      <span className="px-2 py-0.5 bg-blue-500/20 text-blue-200 border border-blue-500/30 text-xs font-bold rounded uppercase tracking-wide">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-slate-300 text-lg mb-3">{profile.primaryRole}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4" /> {profile.university} ({profile.graduationYear})
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" /> {profile.location}
                    </span>
                    {profile.cgpa && (
                      <span className="flex items-center gap-1.5 text-amber-300">
                        <Award className="w-4 h-4" /> CGPA: {profile.cgpa}
                      </span>
                    )}
                  </div>
                </div>

                {/* Primary Actions */}
                <div className="flex gap-3 shrink-0 mt-4 md:mt-0">
                  <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium text-sm flex items-center gap-2 transition-colors">
                    <Download className="w-4 h-4" /> Resume
                  </button>
                  <button 
                    onClick={() => onInvite(profile)}
                    className="px-6 py-2 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-bold text-sm shadow-lg shadow-primary-600/20 transition-all hover:-translate-y-0.5"
                  >
                    Invite to Interview
                  </button>
                </div>
              </div>

        
            </div>

            {/* --- Scrollable Content Area --- */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-6 md:p-8">
              
              {/* TAB: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-up">
                  {/* Left Column: Bio & Skills */}
                  <div className="lg:col-span-2 space-y-6">
                    <SectionCard title="About">
                      <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
                    </SectionCard>

                    <SectionCard title="Technical Skills">
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map(skill => (
                          <span key={skill} className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium shadow-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </SectionCard>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-4">
                       <MetricBox label="Projects" value={profile.projectsCompleted} icon={<Briefcase className="w-5 h-5 text-blue-500"/>} />
                       <MetricBox label="Success Rate" value={`${profile.successRate}%`} icon={<Award className="w-5 h-5 text-green-500"/>} />
                       <MetricBox label="Rating" value={profile.rating} icon={<Award className="w-5 h-5 text-amber-500"/>} />
                    </div>
                  </div>

                  {/* Right Column: Sidebar Info */}
                  <div className="space-y-6">
                    <SectionCard title="Connect">
                      <div className="space-y-3">
                         {profile.socials.github && (
                           <SocialRow icon={<Github className="w-4 h-4"/>} label="GitHub" value="View Profile" href={profile.socials.github} />
                         )}
                         {profile.socials.linkedin && (
                           <SocialRow icon={<Linkedin className="w-4 h-4"/>} label="LinkedIn" value="Connect" href={profile.socials.linkedin} />
                         )}
                         {profile.socials.portfolio && (
                           <SocialRow icon={<Globe className="w-4 h-4"/>} label="Portfolio" value={new URL(profile.socials.portfolio).hostname} href={profile.socials.portfolio} />
                         )}
                         <SocialRow icon={<Mail className="w-4 h-4"/>} label="Email" value="Request Access" isAction />
                      </div>
                    </SectionCard>

                    <SectionCard title="Availability">
                       <div className="flex items-center gap-3 text-sm">
                          <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <div>
                             <p className="font-semibold text-gray-900">{profile.availability}</p>
                             <p className="text-gray-500 text-xs">Notice Period</p>
                          </div>
                       </div>
                    </SectionCard>
                  </div>
                </div>
              )}

              {/* TAB: PROJECTS */}
              {activeTab === 'projects' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-up">
                  {profile.projects?.map((project) => (
                    <div key={project.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow group">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary-600 transition-colors">{project.title}</h3>
                        <div className="flex gap-2">
                           {project.github && <a href={project.github} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-md"><Github className="w-4 h-4"/></a>}
                           {project.link && <a href={project.link} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-md"><ExternalLink className="w-4 h-4"/></a>}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.techStack.map(tech => (
                          <span key={tech} className="text-[10px] uppercase font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  {(!profile.projects || profile.projects.length === 0) && (
                    <div className="col-span-2 text-center py-12 text-gray-500">No projects listed yet.</div>
                  )}
                </div>
              )}

              {/* TAB: EXPERIENCE */}
              {activeTab === 'experience' && (
                <div className="space-y-6 max-w-2xl mx-auto animate-fade-up">
                  {profile.experience?.map((exp, i) => (
                    <div key={exp.id} className="relative pl-8 pb-8 border-l-2 border-gray-200 last:pb-0">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-primary-500" />
                      
                      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                           <div>
                             <h4 className="font-bold text-gray-900">{exp.role}</h4>
                             <p className="text-primary-600 font-medium text-sm">{exp.company}</p>
                           </div>
                           <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded">
                             {exp.duration}
                           </span>
                        </div>
                        <p className="text-gray-600 text-sm">{exp.description}</p>
                        <span className="inline-block mt-3 text-[10px] font-bold uppercase tracking-wide text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                          {exp.type}
                        </span>
                      </div>
                    </div>
                  ))}
                  {(!profile.experience || profile.experience.length === 0) && (
                    <div className="text-center py-12 text-gray-500">No experience listed yet.</div>
                  )}
                </div>
              )}

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Helper Components for Modal ---

const SectionCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
      {title}
    </h3>
    {children}
  </div>
);

const MetricBox = ({ label, value, icon }: { label: string, value: string | number, icon: React.ReactNode }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
    <div className="mb-2 p-2 bg-gray-50 rounded-lg">{icon}</div>
    <span className="text-xl font-bold text-gray-900">{value}</span>
    <span className="text-xs text-gray-500 uppercase font-bold tracking-wide mt-1">{label}</span>
  </div>
);

const SocialRow = ({ icon, label, value, href, isAction }: { icon: any, label: string, value: string, href?: string, isAction?: boolean }) => (
  <a 
    href={href || '#'} 
    target="_blank"
    rel="noreferrer"
    className={cn(
      "flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group",
      isAction && "cursor-pointer"
    )}
  >
    <div className="flex items-center gap-3">
      <div className="text-gray-400 group-hover:text-gray-600">{icon}</div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
    <div className="flex items-center gap-1 text-xs font-semibold text-primary-600">
      {value} <ChevronRight className="w-3 h-3" />
    </div>
  </a>
);