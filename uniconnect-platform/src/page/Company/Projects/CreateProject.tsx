// page/Company/Projects/CreateProject.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Check,
  X,
  Plus,
  Sparkles,
  Code,
  Users,
  Eye,
  ChevronDown,
  Building2,
} from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";

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
    // Show success state
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
    <div className="min-h-screen bg-gray-50">
      <Sidebar companyName="BridgeHub" logoUrl="" />

      <div className="lg:pl-[280px]">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-8 h-16 flex items-center justify-between">
            <button
              onClick={() => navigate("/company/projects")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-semibold">Back to Projects</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">Last saved 10:32:47 PM</span>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Draft
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Post a New Project</h1>
            <p className="text-sm text-gray-600">Create a project to attract top student talent</p>
          </div>

          {/* Step Indicator */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  {/* Step */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
                        currentStep > step.number
                          ? "bg-primary-500 text-white"
                          : currentStep === step.number
                          ? "bg-primary-500 text-white"
                          : "bg-gray-100 text-gray-400"
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
                      <p className="text-xs text-gray-500">{step.subtitle}</p>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-0.5 mx-4 bg-gray-200 relative" style={{ marginTop: "-40px" }}>
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: currentStep > step.number ? "100%" : "0%" }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-0 left-0 h-full bg-primary-500"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${calculateProgress()}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-primary-500"
                />
              </div>
              <span className="text-sm font-bold text-gray-900">{Math.round(calculateProgress())}%</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">Step {currentStep} of {steps.length}</p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
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
                    <p className="text-xs text-gray-500 mt-1">A clear, specific title helps attract the right candidates</p>
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
                      placeholder="Describe the project goals, what students will work on, expected deliverables, and any relevant background information..."
                      rows={8}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-none text-sm ${
                        errors.description ? "border-rose-500" : "border-gray-300"
                      }`}
                    />
                    
                    {/* Tips */}
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs font-semibold text-blue-900 mb-2">Tips for a great description:</p>
                      <ul className="text-xs text-blue-800 space-y-1">
                        <li>• Clearly state the project objectives and expected outcomes</li>
                        <li>• Mention any technologies or tools that will be used</li>
                        <li>• Describe what students will learn from this experience</li>
                      </ul>
                    </div>
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
                      <p className="text-sm text-gray-600">Define the skills and team you need</p>
                    </div>
                  </div>

                  {/* Required Skills */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-900">
                        <Code className="h-4 w-4 text-gray-400" />
                        Required Skills
                      </label>
                      <span className="text-xs text-gray-500">{formData.skills.length}/10 skills</span>
                    </div>
                    
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill(skillInput))}
                        placeholder="Type a skill and press Enter..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                      />
                    </div>

                    {/* Skill Tags */}
                    {formData.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {formData.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-sm font-medium flex items-center gap-2"
                          >
                            {skill}
                            <button onClick={() => removeSkill(skill)} className="hover:text-gray-300">
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Quick Add */}
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Quick add:</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestedSkills
                          .filter((skill) => !formData.skills.includes(skill))
                          .map((skill) => (
                            <button
                              key={skill}
                              onClick={() => addSkill(skill)}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors"
                            >
                              + {skill}
                            </button>
                          ))}
                      </div>
                    </div>
                    {errors.skills && <p className="mt-2 text-xs text-rose-600">{errors.skills}</p>}
                  </div>

                  {/* Academic Level */}
                  <div className="mb-6">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                      <Users className="h-4 w-4 text-gray-400" />
                      Academic Level
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {academicLevels.map((level) => (
                        <button
                          key={level.value}
                          onClick={() => setFormData({ ...formData, academicLevel: level.value })}
                          className={`p-4 border-2 rounded-xl text-left transition-all ${
                            formData.academicLevel === level.value
                              ? "border-primary-500 bg-primary-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <p className="text-sm font-bold text-gray-900 mb-0.5">{level.label}</p>
                          <p className="text-xs text-gray-600">{level.subtitle}</p>
                        </button>
                      ))}
                    </div>
                    {errors.academicLevel && <p className="mt-2 text-xs text-rose-600">{errors.academicLevel}</p>}
                  </div>

                  {/* Team Size */}
                  <div className="mb-6">
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                      <Users className="h-4 w-4 text-gray-400" />
                      Team Size
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {teamSizes.map((size) => (
                        <button
                          key={size.value}
                          onClick={() => setFormData({ ...formData, teamSize: size.value })}
                          className={`p-4 border-2 rounded-xl text-left transition-all ${
                            formData.teamSize === size.value
                              ? "border-primary-500 bg-primary-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <p className="text-sm font-bold text-gray-900 mb-0.5">{size.label}</p>
                          <p className="text-xs text-gray-600">{size.subtitle}</p>
                        </button>
                      ))}
                    </div>
                    {errors.teamSize && <p className="mt-2 text-xs text-rose-600">{errors.teamSize}</p>}
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
                      <p className="text-sm text-gray-600">Set duration, compensation, and preferences</p>
                    </div>
                  </div>

                  {/* Project Duration */}
                  <div className="mb-6">
                    <label className="text-sm font-bold text-gray-900 mb-2 block">Project Duration</label>
                    <div className="flex gap-3">
                      <input
                        type="number"
                        min="1"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-24 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                      />
                      <div className="relative flex-1">
                        <select
                          value={formData.durationUnit}
                          onChange={(e) => setFormData({ ...formData, durationUnit: e.target.value as "weeks" | "months" })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none text-sm"
                        >
                          <option value="weeks">Weeks</option>
                          <option value="months">Months</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    {errors.duration && <p className="mt-1 text-xs text-rose-600">{errors.duration}</p>}
                  </div>

                  {/* Compensation (Optional) */}
                  <div className="mb-6">
                    <label className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                      $ Compensation <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                    </label>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                        <input
                          type="number"
                          min="0"
                          value={formData.compensation}
                          onChange={(e) => setFormData({ ...formData, compensation: e.target.value })}
                          placeholder="41"
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                        />
                      </div>
                      <div className="relative w-48">
                        <select
                          value={formData.compensationType}
                          onChange={(e) => setFormData({ ...formData, compensationType: e.target.value as any })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none text-sm"
                        >
                          <option value="total">Total Project</option>
                          <option value="perStudent">Per Student</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Projects with compensation receive 3x more applications</p>
                  </div>

                  {/* Preferred University */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        Preferred University <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.preferredUniversity}
                        onChange={(e) => setFormData({ ...formData, preferredUniversity: e.target.value })}
                        placeholder="e.g., MIT, Stanford"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-gray-900 mb-2 block">
                        Preferred Department <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.preferredDepartment}
                        onChange={(e) => setFormData({ ...formData, preferredDepartment: e.target.value })}
                        placeholder="e.g., Computer Science"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Project Tags */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-bold text-gray-900">
                        Project Tags <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                      </label>
                      <span className="text-xs text-gray-500">{formData.projectTags.length}/5 tags</span>
                    </div>
                    
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag(tagInput))}
                        placeholder="Add a tag and press Enter..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                      />
                    </div>

                    {formData.projectTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {formData.projectTags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold flex items-center gap-2"
                          >
                            {tag}
                            <button onClick={() => removeTag(tag)} className="hover:text-blue-900">
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    <div>
                      <p className="text-xs text-gray-600 mb-2">Suggested:</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestedTags
                          .filter((tag) => !formData.projectTags.includes(tag))
                          .map((tag) => (
                            <button
                              key={tag}
                              onClick={() => addTag(tag)}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors"
                            >
                              + {tag}
                            </button>
                          ))}
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
                      <h2 className="text-lg font-bold text-gray-900">Preview & Publish</h2>
                      <p className="text-sm text-gray-600">Review your project before publishing</p>
                    </div>
                  </div>

                  {/* Student View Preview */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-bold text-gray-700 uppercase tracking-wide flex items-center gap-2">
                        <Eye className="h-3.5 w-3.5" />
                        Student View Preview
                      </p>
                      <button className="text-xs text-primary-600 font-semibold hover:text-primary-700 flex items-center gap-1">
                        <span>Edit</span>
                      </button>
                    </div>

                    {/* Preview Card */}
                    <div className="border-2 border-gray-200 rounded-xl p-6 bg-white">
                      <div className="flex items-start justify-between mb-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-md">Open</span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">{formData.title || "Project Title"}</h3>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-600 mb-4">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-3.5 w-3.5" />
                          {formData.industry || "Technology"}
                        </span>
                        <span>•</span>
                        <span>{formData.duration} {formData.durationUnit}</span>
                        <span>•</span>
                        <span>${formData.compensation || "41"} total</span>
                      </div>

                      <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                        {formData.description || "Project description will appear here..."}
                      </p>

                      {/* Skills */}
                      {formData.skills.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-bold text-gray-700 mb-2">• Required Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {formData.skills.map((skill) => (
                              <span key={skill} className="px-2 py-1 bg-gray-900 text-white text-xs font-medium rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          {formData.academicLevel || "Undergraduate"}
                        </span>
                        <span>•</span>
                        <span>{formData.teamSize || "2-3"} Students</span>
                      </div>
                    </div>
                  </div>

                  {/* Edit Sections */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <p className="text-xs text-gray-500 mb-1">Step 1</p>
                      <p className="text-sm font-bold text-gray-900">Edit Basics</p>
                    </button>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <p className="text-xs text-gray-500 mb-1">Step 2</p>
                      <p className="text-sm font-bold text-gray-900">Edit Requirements</p>
                    </button>
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <p className="text-xs text-gray-500 mb-1">Step 3</p>
                      <p className="text-sm font-bold text-gray-900">Edit Details</p>
                    </button>
                  </div>

                  {/* Ready to Publish */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm font-bold text-blue-900 mb-2">Ready to publish?</p>
                    <ul className="text-xs text-blue-800 space-y-1">
                      <li>○ Your project will be visible to all students on the platform</li>
                      <li>○ You'll receive email notifications for new applications</li>
                      <li>○ You can edit or close the project at any time</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="px-8 py-6 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>

              {currentStep < steps.length ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-2.5 bg-primary-500 text-white rounded-lg text-sm font-semibold hover:bg-primary-600 transition-colors"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handlePublish}
                  className="px-6 py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Check className="h-4 w-4" />
                  Publish Project
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
