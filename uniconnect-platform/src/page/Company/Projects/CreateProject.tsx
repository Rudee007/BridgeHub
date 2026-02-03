import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Check,
  X,
  Sparkles,
  Code,
  Users,
  Eye,
  ChevronDown,
  Building2,
} from "lucide-react";

interface FormData {
  title: string;
  description: string;
  industry: string;
  skills: string[];
  academicLevel: string;
  teamSize: string;
  duration: string;
  durationUnit: "weeks" | "months";
  compensation: string;
  compensationType: "total" | "perStudent";
  preferredUniversity: string;
  preferredDepartment: string;
  projectTags: string[];
}

const initialFormData: FormData = {
  title: "",
  description: "",
  industry: "",
  skills: [],
  academicLevel: "",
  teamSize: "",
  duration: "6",
  durationUnit: "weeks",
  compensation: "",
  compensationType: "total",
  preferredUniversity: "",
  preferredDepartment: "",
  projectTags: [],
};

export const CreateProject = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [skillInput, setSkillInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { number: 1, title: "Basics", subtitle: "Project overview", icon: Sparkles },
    { number: 2, title: "Requirements", subtitle: "Skills & team", icon: Code },
    { number: 3, title: "Details", subtitle: "Duration & compensation", icon: Users },
    { number: 4, title: "Preview", subtitle: "Review & publish", icon: Eye },
  ];

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "E-commerce",
    "Manufacturing",
    "Media & Entertainment",
    "Real Estate",
    "Other",
  ];

  const academicLevels = [
    { value: "undergraduate", label: "Undergraduate", subtitle: "Bachelor's students" },
    { value: "graduate", label: "Graduate", subtitle: "Master's students" },
    { value: "phd", label: "PhD", subtitle: "Doctoral candidates" },
    { value: "any", label: "Any Level", subtitle: "Open to all" },
  ];

  const teamSizes = [
    { value: "1", label: "1 Student", subtitle: "Individual project" },
    { value: "2-3", label: "2-3 Students", subtitle: "Small team" },
    { value: "4-5", label: "4-5 Students", subtitle: "Medium team" },
    { value: "6+", label: "6+ Students", subtitle: "Large team" },
  ];

  const suggestedSkills = [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "Machine Learning",
    "Data Analysis",
    "UI/UX Design",
    "Product Management",
  ];

  const suggestedTags = [
    "Remote",
    "On-site",
    "Hybrid",
    "Flexible Hours",
    "Mentorship",
    "Publication Opportunity",
  ];

  const calculateProgress = () => {
    return (currentStep / steps.length) * 100;
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = "Project title is required";
      if (formData.description.length < 100) newErrors.description = "Description must be at least 100 characters";
      if (!formData.industry) newErrors.industry = "Please select an industry";
    }

    if (step === 2) {
      if (formData.skills.length === 0) newErrors.skills = "Add at least one required skill";
      if (!formData.academicLevel) newErrors.academicLevel = "Select academic level";
      if (!formData.teamSize) newErrors.teamSize = "Select team size";
    }

    if (step === 3) {
      if (!formData.duration || parseInt(formData.duration) <= 0) newErrors.duration = "Enter valid duration";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handlePublish = () => {
    console.log("Publishing project:", formData);
    navigate("/company/projects");
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !formData.skills.includes(skill.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, skill.trim()] });
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter((s) => s !== skill) });
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !formData.projectTags.includes(tag.trim())) {
      setFormData({ ...formData, projectTags: [...formData.projectTags, tag.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, projectTags: formData.projectTags.filter((t) => t !== tag) });
  };

  return (
    // ✅ NO wrapper div (lg:pl-[280px]). Layout handles it.
    <div className="space-y-8 animate-fade-in pb-10">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/company/projects")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-semibold">Back to Projects</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 hidden sm:block">Last saved just now</span>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
            <Save className="h-4 w-4" />
            Save Draft
          </button>
        </div>
      </div>

      {/* Main Form Area */}
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Project</h1>
          <p className="text-gray-500">Create an engaging project to attract top student talent</p>
        </div>

        {/* Step Indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4 relative">
            {/* Background Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 -translate-y-1/2" />
            
            {/* Active Line Progress */}
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-primary-600 -z-10 -translate-y-1/2 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />

            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center bg-gray-50 px-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all border-2 ${
                    currentStep >= step.number
                      ? "bg-primary-600 text-white border-primary-600"
                      : "bg-white text-gray-400 border-gray-300"
                  }`}
                >
                  {currentStep > step.number ? <Check className="h-5 w-5" /> : step.number}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={`text-xs font-bold ${
                      currentStep >= step.number ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: BASICS */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Project Basics</h2>
                    <p className="text-sm text-gray-600">Start with a compelling title and description</p>
                  </div>
                </div>

                {/* Project Title */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      Project Title
                    </label>
                    <span className="text-xs text-gray-500">{formData.title.length}/100</span>
                  </div>
                  <input
                    type="text"
                    maxLength={100}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., AI-Powered Customer Analytics Dashboard"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm ${
                      errors.title ? "border-rose-500" : "border-gray-300"
                    }`}
                  />
                  {errors.title && <p className="mt-1 text-xs text-rose-600">{errors.title}</p>}
                </div>

                {/* Project Description */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-bold text-gray-900">Project Description</label>
                    <span
                      className={`text-xs ${
                        formData.description.length >= 100 ? "text-green-600" : "text-amber-600"
                      }`}
                    >
                      {formData.description.length}/2000 (min. 100)
                    </span>
                  </div>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    maxLength={2000}
                    placeholder="Describe the project goals, expected deliverables, and background..."
                    rows={8}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-none text-sm ${
                      errors.description ? "border-rose-500" : "border-gray-300"
                    }`}
                  />
                  {errors.description && <p className="mt-2 text-xs text-rose-600">{errors.description}</p>}
                </div>

                {/* Industry */}
                <div className="mb-6">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                    <Building2 className="h-4 w-4 text-gray-400" />
                    Industry
                  </label>
                  <div className="relative">
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all appearance-none text-sm ${
                        errors.industry ? "border-rose-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select industry</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.industry && <p className="mt-1 text-xs text-rose-600">{errors.industry}</p>}
                </div>
              </motion.div>
            )}

            {/* STEP 2: REQUIREMENTS */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Code className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Requirements</h2>
                    <p className="text-sm text-gray-600">Define the skills and team needed</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-2">
                    <Code className="h-4 w-4 text-gray-400" /> Required Skills
                  </label>
                  
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill(skillInput))}
                      placeholder="Type a skill and press Enter..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                    />
                  </div>

                  {formData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium flex items-center gap-2">
                          {skill} <button onClick={() => removeSkill(skill)}><X className="h-3 w-3 hover:text-red-500"/></button>
                        </span>
                      ))}
                    </div>
                  )}
                  {errors.skills && <p className="mt-2 text-xs text-rose-600">{errors.skills}</p>}
                </div>

                {/* Academic Level & Team Size */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-bold text-gray-900 mb-3 block">Academic Level</label>
                    <div className="space-y-2">
                      {academicLevels.map((level) => (
                        <button
                          key={level.value}
                          onClick={() => setFormData({ ...formData, academicLevel: level.value })}
                          className={`w-full p-3 border rounded-lg text-left transition-all ${
                            formData.academicLevel === level.value
                              ? "border-primary-500 bg-primary-50 ring-1 ring-primary-500"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <span className="text-sm font-bold text-gray-900 block">{level.label}</span>
                          <span className="text-xs text-gray-500">{level.subtitle}</span>
                        </button>
                      ))}
                    </div>
                    {errors.academicLevel && <p className="mt-2 text-xs text-rose-600">{errors.academicLevel}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-bold text-gray-900 mb-3 block">Team Size</label>
                    <div className="space-y-2">
                      {teamSizes.map((size) => (
                        <button
                          key={size.value}
                          onClick={() => setFormData({ ...formData, teamSize: size.value })}
                          className={`w-full p-3 border rounded-lg text-left transition-all ${
                            formData.teamSize === size.value
                              ? "border-primary-500 bg-primary-50 ring-1 ring-primary-500"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <span className="text-sm font-bold text-gray-900 block">{size.label}</span>
                          <span className="text-xs text-gray-500">{size.subtitle}</span>
                        </button>
                      ))}
                    </div>
                    {errors.teamSize && <p className="mt-2 text-xs text-rose-600">{errors.teamSize}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: DETAILS */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Project Details</h2>
                    <p className="text-sm text-gray-600">Duration & Compensation</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-bold text-gray-900 mb-2 block">Duration</label>
                    <div className="flex gap-4">
                      <input
                        type="number"
                        min="1"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-24 px-4 py-3 border border-gray-300 rounded-lg text-sm"
                      />
                      <select
                        value={formData.durationUnit}
                        onChange={(e) => setFormData({ ...formData, durationUnit: e.target.value as any })}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="weeks">Weeks</option>
                        <option value="months">Months</option>
                      </select>
                    </div>
                    {errors.duration && <p className="mt-1 text-xs text-rose-600">{errors.duration}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-bold text-gray-900 mb-2 block">Compensation (Optional)</label>
                    <div className="flex gap-4">
                      <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          value={formData.compensation}
                          onChange={(e) => setFormData({ ...formData, compensation: e.target.value })}
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg text-sm"
                          placeholder="Amount"
                        />
                      </div>
                      <select
                        value={formData.compensationType}
                        onChange={(e) => setFormData({ ...formData, compensationType: e.target.value as any })}
                        className="w-40 px-4 py-3 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="total">Total</option>
                        <option value="perStudent">Per Student</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: PREVIEW */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Eye className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Review & Publish</h2>
                    <p className="text-sm text-gray-600">Check everything before going live</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{formData.title || "Untitled Project"}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <span>{formData.industry}</span>
                    <span>•</span>
                    <span>{formData.duration} {formData.durationUnit}</span>
                    <span>•</span>
                    <span>{formData.compensation ? `$${formData.compensation}` : "Unpaid"}</span>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-6 whitespace-pre-line">{formData.description || "No description provided."}</p>

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold text-gray-500 uppercase">Skills</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {formData.skills.map(s => (
                          <span key={s} className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-medium">{s}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs font-bold text-gray-500 uppercase">Level</span>
                        <p className="text-sm font-medium">{formData.academicLevel}</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-500 uppercase">Team</span>
                        <p className="text-sm font-medium">{formData.teamSize}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Back
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                className="px-6 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 shadow-sm transition-colors"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handlePublish}
                className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 shadow-sm flex items-center gap-2 transition-colors"
              >
                <Check className="h-4 w-4" />
                Publish Project
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;