import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Check,
  X,
  Plus,
  Building2,
  FileText,
  DollarSign,
  Eye,
  ChevronDown,
} from "lucide-react";

interface FormData {
  // Step 1: Basics
  title: string;
  department: string;
  jobType: string;
  workMode: string;
  location: string;
  openings: number;

  // Step 2: Description & Requirements
  description: string;
  responsibilities: string[];
  skills: string[];
  experienceLevel: string;
  education: string;

  // Step 3: Compensation
  salaryMin: string;
  salaryMax: string;
  salaryPeriod: "year" | "month";
  showSalary: boolean;
  deadline: string;
}

const initialFormData: FormData = {
  title: "",
  department: "",
  jobType: "",
  workMode: "",
  location: "",
  openings: 1,
  description: "",
  responsibilities: [""],
  skills: [],
  experienceLevel: "",
  education: "",
  salaryMin: "",
  salaryMax: "",
  salaryPeriod: "year",
  showSalary: true,
  deadline: "",
};

export const CreateJob = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [skillInput, setSkillInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { number: 1, title: "Basics", icon: Building2 },
    { number: 2, title: "Description", icon: FileText },
    { number: 3, title: "Compensation", icon: DollarSign },
  ];

  const departments = ["Engineering", "Design", "Product", "Marketing", "Sales", "Operations"];
  const jobTypes = [
    { value: "full_time", label: "Full-time" },
    { value: "part_time", label: "Part-time" },
    { value: "internship", label: "Internship" },
    { value: "contract", label: "Contract" },
  ];
  const workModes = [
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
    { value: "onsite", label: "On-site" },
  ];
  const experienceLevels = [
    { value: "entry", label: "Entry Level", desc: "0-2 years" },
    { value: "mid", label: "Mid Level", desc: "2-5 years" },
    { value: "senior", label: "Senior Level", desc: "5+ years" },
    { value: "lead", label: "Lead/Principal", desc: "8+ years" },
  ];

  const suggestedSkills = [
    "React",
    "Node.js",
    "TypeScript",
    "Python",
    "AWS",
    "MongoDB",
    "PostgreSQL",
    "Docker",
    "Kubernetes",
    "GraphQL",
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = "Job title is required";
      if (!formData.department) newErrors.department = "Department is required";
      if (!formData.jobType) newErrors.jobType = "Job type is required";
      if (!formData.workMode) newErrors.workMode = "Work mode is required";
    }

    if (step === 2) {
      if (!formData.description.trim() || formData.description.length < 100) {
        newErrors.description = "Description must be at least 100 characters";
      }
      if (formData.responsibilities.filter((r) => r.trim()).length === 0) {
        newErrors.responsibilities = "Add at least one responsibility";
      }
      if (formData.skills.length === 0) newErrors.skills = "Add at least one required skill";
      if (!formData.experienceLevel) newErrors.experienceLevel = "Select experience level";
    }

    if (step === 3) {
      if (!formData.salaryMin || parseFloat(formData.salaryMin) <= 0) newErrors.salaryMin = "Enter minimum salary";
      if (!formData.salaryMax || parseFloat(formData.salaryMax) <= 0) newErrors.salaryMax = "Enter maximum salary";
      if (parseFloat(formData.salaryMax) < parseFloat(formData.salaryMin)) {
        newErrors.salaryMax = "Maximum must be greater than minimum";
      }
      if (!formData.deadline) newErrors.deadline = "Deadline is required";
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
    if (validateStep(currentStep)) {
      console.log("Publishing job:", formData);
      navigate("/company/jobs");
    }
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

  const addResponsibility = () => {
    setFormData({ ...formData, responsibilities: [...formData.responsibilities, ""] });
  };

  const updateResponsibility = (index: number, value: string) => {
    const newResp = [...formData.responsibilities];
    newResp[index] = value;
    setFormData({ ...formData, responsibilities: newResp });
  };

  const removeResponsibility = (index: number) => {
    setFormData({ ...formData, responsibilities: formData.responsibilities.filter((_, i) => i !== index) });
  };

  const calculateProgress = () => {
    return (currentStep / steps.length) * 100;
  };

  return (
    // ✅ No wrapper divs with padding. Layout handles it.
    <div className="space-y-8 animate-fade-in pb-10">
      
      {/* Top Bar Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/company/jobs")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-semibold">Back to Jobs</span>
        </button>

        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
          <Save className="h-4 w-4" />
          Save Draft
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
          <p className="text-gray-500">Create a job posting to attract top talent</p>
        </div>

        {/* Step Indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4 relative">
            {/* Background Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 -translate-y-1/2" />
            
            {/* Steps Loop */}
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center bg-gray-50 px-2">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all border-2 ${
                    currentStep > step.number
                      ? "bg-primary-500 border-primary-500 text-white"
                      : currentStep === step.number
                      ? "bg-primary-500 border-primary-500 text-white"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {currentStep > step.number ? <Check className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                </div>
                <p
                  className={`mt-2 text-xs font-bold ${
                    currentStep >= step.number ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {step.title}
                </p>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-600 font-semibold">Step {currentStep} of {steps.length}</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${calculateProgress()}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-primary-500"
              />
            </div>
            <span className="text-xs font-bold text-gray-900">{Math.round(calculateProgress())}% complete</span>
          </div>
        </div>

        {/* Form Container */}
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
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-1">Basics</h2>
                  <p className="text-sm text-gray-600">Start with essential job information</p>
                </div>

                {/* Job Title */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Job Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={100}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Senior Frontend Developer"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm ${
                      errors.title ? "border-rose-500" : "border-gray-300"
                    }`}
                  />
                  {errors.title && <p className="text-xs text-rose-600 mt-1">{errors.title}</p>}
                </div>

                {/* Department & Job Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Department <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all appearance-none text-sm ${
                          errors.department ? "border-rose-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Select department</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept.toLowerCase()}>
                            {dept}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.department && <p className="mt-1 text-xs text-rose-600">{errors.department}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Job Type <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.jobType}
                        onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all appearance-none text-sm ${
                          errors.jobType ? "border-rose-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Select type</option>
                        {jobTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.jobType && <p className="mt-1 text-xs text-rose-600">{errors.jobType}</p>}
                  </div>
                </div>

                {/* Work Mode */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Work Mode <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {workModes.map((mode) => (
                      <button
                        key={mode.value}
                        onClick={() => setFormData({ ...formData, workMode: mode.value })}
                        className={`p-4 border-2 rounded-xl text-sm font-semibold transition-all ${
                          formData.workMode === mode.value
                            ? "border-primary-500 bg-primary-50 text-primary-700 ring-1 ring-primary-500"
                            : "border-gray-200 hover:border-gray-300 text-gray-700"
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                  {errors.workMode && <p className="mt-2 text-xs text-rose-600">{errors.workMode}</p>}
                </div>

                {/* Location & Openings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {formData.workMode && formData.workMode !== "remote" && (
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g., Bangalore, Karnataka"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Number of Openings</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.openings}
                      onChange={(e) => setFormData({ ...formData, openings: parseInt(e.target.value) || 1 })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: DESCRIPTION & REQUIREMENTS */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-1">Description & Requirements</h2>
                  <p className="text-sm text-gray-600">Define the role and what you're looking for</p>
                </div>

                {/* Job Description */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Job Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the role, team, and what the candidate will work on..."
                    rows={6}
                    maxLength={2000}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-none text-sm ${
                      errors.description ? "border-rose-500" : "border-gray-300"
                    }`}
                  />
                  {errors.description && <p className="text-xs text-rose-600 mt-1">{errors.description}</p>}
                </div>

                {/* Responsibilities */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Responsibilities <span className="text-rose-500">*</span>
                  </label>
                  <div className="space-y-3">
                    {formData.responsibilities.map((resp, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={resp}
                          onChange={(e) => updateResponsibility(index, e.target.value)}
                          placeholder={`Responsibility ${index + 1}`}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                        />
                        {formData.responsibilities.length > 1 && (
                          <button
                            onClick={() => removeResponsibility(index)}
                            className="px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={addResponsibility}
                    className="mt-3 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 border border-gray-200 transition-colors font-semibold text-sm flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Responsibility
                  </button>
                  {errors.responsibilities && <p className="mt-2 text-xs text-rose-600">{errors.responsibilities}</p>}
                </div>

                {/* Required Skills */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Required Skills <span className="text-rose-500">*</span>
                  </label>
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

                  <div className="flex flex-wrap gap-2">
                    <p className="text-xs text-gray-500 my-auto mr-2">Quick Add:</p>
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
                  {errors.skills && <p className="mt-2 text-xs text-rose-600">{errors.skills}</p>}
                </div>

                {/* Experience Level & Education */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Experience Level <span className="text-rose-500">*</span>
                    </label>
                    <div className="space-y-2">
                      {experienceLevels.map((level) => (
                        <button
                          key={level.value}
                          onClick={() => setFormData({ ...formData, experienceLevel: level.value })}
                          className={`w-full p-3 border rounded-lg text-left transition-all ${
                            formData.experienceLevel === level.value
                              ? "border-primary-500 bg-primary-50 ring-1 ring-primary-500"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <p className="text-sm font-bold text-gray-900">{level.label}</p>
                          <p className="text-xs text-gray-600">{level.desc}</p>
                        </button>
                      ))}
                    </div>
                    {errors.experienceLevel && <p className="mt-2 text-xs text-rose-600">{errors.experienceLevel}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Education Requirement</label>
                    <textarea
                      value={formData.education}
                      onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                      placeholder="e.g., Bachelor's degree in Computer Science..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: COMPENSATION */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-1">Compensation & Timeline</h2>
                  <p className="text-sm text-gray-600">Set salary range and application deadline</p>
                </div>

                {/* Salary Range */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Salary Range <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-2">Minimum</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
                        <input
                          type="number"
                          min="0"
                          value={formData.salaryMin}
                          onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                          placeholder="800000"
                          className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm ${
                            errors.salaryMin ? "border-rose-500" : "border-gray-300"
                          }`}
                        />
                      </div>
                      {errors.salaryMin && <p className="mt-1 text-xs text-rose-600">{errors.salaryMin}</p>}
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-2">Maximum</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
                        <input
                          type="number"
                          min="0"
                          value={formData.salaryMax}
                          onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                          placeholder="1200000"
                          className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm ${
                            errors.salaryMax ? "border-rose-500" : "border-gray-300"
                          }`}
                        />
                      </div>
                      {errors.salaryMax && <p className="mt-1 text-xs text-rose-600">{errors.salaryMax}</p>}
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-2">Period</label>
                      <select
                        value={formData.salaryPeriod}
                        onChange={(e) => setFormData({ ...formData, salaryPeriod: e.target.value as "year" | "month" })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                      >
                        <option value="year">Per Year</option>
                        <option value="month">Per Month</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Show Salary Toggle */}
                <div className="mb-6">
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.showSalary}
                      onChange={(e) => setFormData({ ...formData, showSalary: e.target.checked })}
                      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Display salary range on job posting</p>
                      <p className="text-xs text-gray-600">Jobs with visible salaries get 30% more applications</p>
                    </div>
                  </label>
                </div>

                {/* Application Deadline */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Application Deadline <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm ${
                      errors.deadline ? "border-rose-500" : "border-gray-300"
                    }`}
                  />
                  {errors.deadline && <p className="mt-1 text-xs text-rose-600">{errors.deadline}</p>}
                </div>

                {/* Preview Box */}
                <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl mt-8">
                  <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Preview</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-600">Title</span>
                      <span className="font-semibold text-gray-900">{formData.title || "Not set"}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-600">Department</span>
                      <span className="font-semibold text-gray-900">{formData.department || "Not set"}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-600">Location</span>
                      <span className="font-semibold text-gray-900">
                        {formData.workMode === 'remote' ? 'Remote' : formData.location || "Not set"} ({formData.workMode || "Mode"})
                      </span>
                    </div>
                    {formData.salaryMin && formData.salaryMax && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Salary</span>
                        <span className="font-semibold text-gray-900">
                          ₹{parseInt(formData.salaryMin).toLocaleString()} - ₹{parseInt(formData.salaryMax).toLocaleString()} / {formData.salaryPeriod}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="px-8 py-6 border-t border-gray-200 flex items-center justify-between bg-gray-50">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                className="px-6 py-2.5 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors shadow-sm"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handlePublish}
                className="px-6 py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 shadow-sm"
              >
                <Check className="h-4 w-4" />
                Publish Job
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};