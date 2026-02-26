import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ClipboardSignature, Clock, CheckCircle2, RotateCcw, 
  Building2, Sparkles, Send, RefreshCw, Zap, Target,
  Search, LayoutGrid, List, FileText
} from "lucide-react";
import { UniversityLayout } from "@/components/university/UniversityLayout";

// --- Mock Data ---
const initialProposals = [
  { id: 1, company: "Stripe India", projectTitle: "Payment Gateway Integration", matchScore: 94, student: { name: "Aarav Sharma", initials: "AS", team: "Team Alpha" }, timeAgo: "2 hours ago", pitch: "Our team has extensive experience building payment systems using Node.js and React. We've previously integrated Razorpay and PayPal APIs for campus projects, and are confident we can deliver a robust, PCI-compliant gateway.", skills: ["React", "Node.js", "PostgreSQL"], status: "Needs Review" },
  { id: 2, company: "Freshworks", projectTitle: "AI Chatbot for Customer Support", matchScore: 88, student: { name: "Priya Patel", initials: "PP", team: "Solo" }, timeAgo: "5 hours ago", pitch: "I specialize in NLP and conversational AI. My final-year project involved building a multi-lingual chatbot using Rasa and fine-tuned transformer models. I can bring this expertise to build an intelligent support bot.", skills: ["Python", "NLP", "FastAPI"], status: "Needs Review" },
  { id: 3, company: "Razorpay", projectTitle: "Fraud Detection Engine", matchScore: 91, student: { name: "Rohan Mehta", initials: "RM", team: "Data Ninjas" }, timeAgo: "Yesterday", pitch: "We have a strong background in machine learning and anomaly detection. Our previous hackathon winning project was a credit card fraud detection model achieving 98% accuracy.", skills: ["Python", "Scikit-Learn", "AWS"], status: "Endorsed" },
  { id: 4, company: "Zomato", projectTitle: "Delivery Route Optimization", matchScore: 76, student: { name: "Vikram Singh", initials: "VS", team: "Optimus" }, timeAgo: "2 days ago", pitch: "We proposed using Graph Neural Networks to optimize real-time routing based on live traffic data.", skills: ["Go", "Redis", "Graphs"], status: "Returned" },
];

type TabType = "Needs Review" | "Endorsed" | "Returned";

export function EndorsementPipeline() {
  const [proposals, setProposals] = useState(initialProposals);
  const [activeTab, setActiveTab] = useState<TabType>("Needs Review");
  const [searchQuery, setSearchQuery] = useState("");
  const [scoreFilter, setScoreFilter] = useState("All Scores");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  // --- Handlers ---
  const handleEndorse = (id: number) => setProposals(prev => prev.map(p => p.id === id ? { ...p, status: "Endorsed" } : p));
  const handleReturn = (id: number) => setProposals(prev => prev.map(p => p.id === id ? { ...p, status: "Returned" } : p));

  // --- Derived State & Filtering ---
  const filteredProposals = useMemo(() => {
    return proposals.filter(p => {
      const matchesTab = p.status === activeTab;
      const matchesSearch = p.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.student.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesScore = scoreFilter === "All Scores" ? true :
                           scoreFilter === "> 90% Match" ? p.matchScore >= 90 :
                           scoreFilter === "> 80% Match" ? p.matchScore >= 80 : true;
      return matchesTab && matchesSearch && matchesScore;
    });
  }, [proposals, activeTab, searchQuery, scoreFilter]);

  const counts = {
    "Needs Review": proposals.filter(p => p.status === "Needs Review").length,
    "Endorsed": proposals.filter(p => p.status === "Endorsed").length,
    "Returned": proposals.filter(p => p.status === "Returned").length,
  };

  return (
    <UniversityLayout universityName="IIT Bombay">
      <div className="max-w-[1400px] mx-auto space-y-6 pb-12">
        
        {/* 1. Header */}
        <div>
          <h1 className="text-2xl md:text-[28px] font-bold text-gray-900 tracking-tight flex items-center gap-3">
            <ClipboardSignature className="w-7 h-7 text-secondary-600" />
            Endorsement Pipeline
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-1">
            Review and endorse student proposals before they reach companies.
          </p>
        </div>

        {/* 2. 4-Card KPI Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[22px] font-bold text-gray-900 leading-tight">{counts["Needs Review"]}</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Pending Review</p>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[22px] font-bold text-gray-900 leading-tight">{counts["Endorsed"]}</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Endorsed Total</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[22px] font-bold text-gray-900 leading-tight">12 hrs</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Avg Turnaround</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[22px] font-bold text-gray-900 leading-tight">86%</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Approval Rate</p>
            </div>
          </div>
        </div>

        {/* 3. Advanced Filters Bar */}
        <div className="bg-white p-4 rounded-[16px] border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by student, project, or company..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-500/20 focus:border-secondary-500 transition-all"
            />
          </div>
          <div className="flex gap-3">
            <select 
              value={scoreFilter}
              onChange={(e) => setScoreFilter(e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary-500/20 focus:border-secondary-500 cursor-pointer min-w-[160px]"
            >
              <option>All Scores</option>
              <option>&gt; 90% Match</option>
              <option>&gt; 80% Match</option>
            </select>
          </div>
        </div>

        {/* 4. White View Toggle & Tab Bar */}
        <div className="bg-white px-3 py-2.5 rounded-[16px] border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Animated Segmented Tabs */}
          <div className="flex items-center gap-1 bg-gray-50/80 p-1 rounded-xl border border-gray-100 w-full md:w-auto">
            {(["Needs Review", "Endorsed", "Returned"] as TabType[]).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 py-2 text-[13px] font-bold transition-all rounded-lg flex-1 md:flex-none flex items-center justify-center gap-2 ${
                    isActive ? "text-gray-900 shadow-sm bg-white" : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
                  }`}
                >
                  {tab === "Needs Review" && <Clock className="w-3.5 h-3.5" />}
                  {tab === "Endorsed" && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {tab === "Returned" && <RotateCcw className="w-3.5 h-3.5" />}
                  {tab}
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] ml-0.5 ${isActive ? "bg-secondary-100 text-secondary-700" : "bg-gray-200 text-gray-600"}`}>
                    {counts[tab]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* List/Grid View Toggle */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end px-2 md:px-0">
            <span className="text-[13px] text-gray-600">
              Showing <span className="font-bold text-gray-900">{filteredProposals.length}</span> proposals
            </span>
            <div className="flex items-center bg-gray-50 p-1 rounded-lg border border-gray-100">
              <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded-md transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-secondary-600" : "text-gray-400 hover:text-gray-900"}`}>
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode("list")} className={`p-1.5 rounded-md transition-all ${viewMode === "list" ? "bg-white shadow-sm text-secondary-600" : "text-gray-400 hover:text-gray-900"}`}>
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 5. Content Area (Grid & List Views) */}
        <AnimatePresence mode="wait">
          {filteredProposals.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[20px] border border-gray-200 shadow-sm">
              <ClipboardSignature className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-lg font-bold text-gray-900">No proposals here!</p>
              <p className="text-sm text-gray-500 mt-1">You're all caught up with the {activeTab.toLowerCase()} queue.</p>
            </motion.div>
          ) : viewMode === "grid" ? (
            
            /* --- GRID VIEW --- */
            <motion.div key="grid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProposals.map((proposal, index) => (
                <motion.div layout key={proposal.id} transition={{ duration: 0.2, delay: index * 0.05 }} className="bg-white rounded-[20px] border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-secondary-200 transition-all flex flex-col h-full group">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{proposal.company}</p>
                        <div className="flex items-center gap-1.5 mt-0.5 px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md text-[10px] font-bold w-fit">
                          <Sparkles className="w-3 h-3" /> {proposal.matchScore}% Match
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-[17px] font-bold text-gray-900 leading-tight mb-3 group-hover:text-secondary-600 transition-colors">
                    {proposal.projectTitle}
                  </h3>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-full bg-secondary-50 text-secondary-700 flex items-center justify-center font-bold text-[10px] border border-secondary-100 shrink-0">
                      {proposal.student.initials}
                    </div>
                    <span className="text-[13px] font-bold text-gray-800">{proposal.student.name}</span>
                    <span className="text-[12px] text-gray-400 flex items-center gap-1 ml-auto"><Clock className="w-3 h-3"/> {proposal.timeAgo}</span>
                  </div>

                  <div className="pl-3 border-l-2 border-gray-200 mb-5 flex-1">
                    <p className="text-[13px] text-gray-600 italic line-clamp-3">"{proposal.pitch}"</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {proposal.skills.map(skill => <span key={skill} className="px-2 py-1 bg-gray-50 text-gray-600 text-[10px] font-semibold rounded-md border border-gray-100">{skill}</span>)}
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
                    {activeTab === "Needs Review" ? (
                      <>
                        <button onClick={() => handleEndorse(proposal.id)} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-[12px] font-bold transition-all">
                          <Send className="w-3.5 h-3.5" /> Endorse & Forward
                        </button>
                        <button onClick={() => handleReturn(proposal.id)} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-full text-[12px] font-bold transition-colors">
                          <RefreshCw className="w-3.5 h-3.5" /> Request Revision
                        </button>
                      </>
                    ) : activeTab === "Endorsed" ? (
                      <span className="w-full flex items-center justify-center gap-2 text-[12px] font-bold text-emerald-600 bg-emerald-50 py-2 rounded-full border border-emerald-100">
                        <CheckCircle2 className="w-4 h-4" /> Endorsed Successfully
                      </span>
                    ) : (
                      <span className="w-full flex items-center justify-center gap-2 text-[12px] font-bold text-gray-500 bg-gray-50 py-2 rounded-full border border-gray-200">
                        <RotateCcw className="w-4 h-4" /> Returned for Revision
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (

            /* --- LIST VIEW --- */
            <motion.div key="list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="space-y-4">
              {filteredProposals.map((proposal, index) => (
                <motion.div layout key={proposal.id} transition={{ duration: 0.2, delay: index * 0.05 }} className="bg-white rounded-[20px] border border-gray-200 p-6 shadow-sm hover:border-secondary-200 transition-all group">
                  
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    {/* Left: Project & Student Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5"/> {proposal.company}</span>
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md text-[10px] font-bold">
                          <Sparkles className="w-3 h-3" /> {proposal.matchScore}% Match
                        </div>
                      </div>
                      <h3 className="text-[18px] font-bold text-gray-900 leading-tight mb-2 group-hover:text-secondary-600 transition-colors">{proposal.projectTitle}</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-secondary-50 text-secondary-700 flex items-center justify-center font-bold text-[9px] border border-secondary-100">{proposal.student.initials}</div>
                        <span className="text-[13px] font-bold text-gray-800">{proposal.student.name}</span>
                        <span className="text-[13px] text-gray-400">· {proposal.student.team}</span>
                        <span className="text-[12px] text-gray-400 flex items-center gap-1 ml-2"><Clock className="w-3 h-3"/> {proposal.timeAgo}</span>
                      </div>
                    </div>

                    {/* Middle: Pitch */}
                    <div className="flex-1 md:max-w-[40%] pl-4 border-l-2 border-gray-100 hidden md:block">
                      <p className="text-[13px] text-gray-600 italic line-clamp-3 leading-relaxed">"{proposal.pitch}"</p>
                    </div>

                    {/* Right: Actions */}
                    <div className="w-full md:w-auto flex flex-col gap-2 shrink-0 border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                      {activeTab === "Needs Review" ? (
                        <>
                          <button onClick={() => handleEndorse(proposal.id)} className="w-full flex items-center justify-center md:justify-start gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-full text-[13px] font-bold transition-all shadow-sm">
                            <Send className="w-4 h-4" /> Endorse & Forward
                          </button>
                          <button onClick={() => handleReturn(proposal.id)} className="w-full flex items-center justify-center md:justify-start gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-full text-[13px] font-bold transition-colors">
                            <RefreshCw className="w-4 h-4" /> Request Revision
                          </button>
                        </>
                      ) : activeTab === "Endorsed" ? (
                        <span className="w-full flex items-center justify-center md:justify-start gap-2 text-[13px] font-bold text-emerald-600 bg-emerald-50 px-5 py-2.5 rounded-full border border-emerald-100">
                          <CheckCircle2 className="w-4 h-4" /> Endorsed Successfully
                        </span>
                      ) : (
                        <span className="w-full flex items-center justify-center md:justify-start gap-2 text-[13px] font-bold text-gray-500 bg-gray-50 px-5 py-2.5 rounded-full border border-gray-200">
                          <RotateCcw className="w-4 h-4" /> Returned for Revision
                        </span>
                      )}
                    </div>
                  </div>

                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </UniversityLayout>
  );
}