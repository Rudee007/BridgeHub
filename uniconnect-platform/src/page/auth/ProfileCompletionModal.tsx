// components/auth/ProfileCompletionModal.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Building2, 
  MapPin, 
  Phone, 
  Globe, 
  Users, 
  Briefcase,
  Upload,
  Check,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface ProfileCompletionModalProps {
  onComplete: (data: any) => void;
  onDismiss: () => void;
  userData: any;
}

export const ProfileCompletionModal = ({ onComplete, onDismiss, userData }: ProfileCompletionModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    website: '',
    location: '',
    phone: '',
    about: '',
    logo: null as File | null,
  });

  const totalSteps = 3;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, logo: e.target.files![0] }));
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    onComplete(formData);
  };

  const handleSkip = () => {
    onDismiss();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-8 py-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Complete Your Profile</h2>
            <button
              onClick={handleSkip}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center gap-2">
            {[...Array(totalSteps)].map((_, i) => (
              <div
                key={i}
                className="flex-1 h-2 rounded-full bg-white/20 overflow-hidden"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: currentStep > i ? '100%' : '0%' }}
                  className="h-full bg-white"
                  transition={{ duration: 0.3 }}
                />
              </div>
            ))}
          </div>
          <p className="text-sm text-white/80 mt-2">
            Step {currentStep} of {totalSteps}
          </p>
        </div>

        {/* Content */}
        <div className="px-8 py-6 max-h-[calc(90vh-200px)] overflow-y-auto">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <Step1Content
                formData={formData}
                handleChange={handleChange}
                handleFileChange={handleFileChange}
              />
            )}
            {currentStep === 2 && (
              <Step2Content
                formData={formData}
                handleChange={handleChange}
              />
            )}
            {currentStep === 3 && (
              <Step3Content
                formData={formData}
                handleChange={handleChange}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-8 py-4 flex items-center justify-between bg-gray-50">
          <button
            onClick={handleSkip}
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Skip for now
          </button>

          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
              >
                <ArrowLeft size={18} />
                Back
              </button>
            )}
            
            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
              >
                Next
                <ArrowRight size={18} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all font-medium"
              >
                Complete
                <Check size={18} />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ✅ Step 1: Company Basics
const Step1Content = ({ formData, handleChange, handleFileChange }: any) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Company Basics</h3>
      <p className="text-gray-600">Tell us about your company</p>
    </div>

    {/* Company Logo */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Company Logo
      </label>
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
          {formData.logo ? (
            <img
              src={URL.createObjectURL(formData.logo)}
              alt="Logo"
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <Building2 className="w-8 h-8 text-gray-400" />
          )}
        </div>
        <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
          <Upload size={18} />
          <span>Upload Logo</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
    </div>

    {/* Company Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Company Name *
      </label>
      <input
        type="text"
        name="companyName"
        value={formData.companyName}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
        placeholder="Acme Corporation"
      />
    </div>

    {/* Industry */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Industry *
      </label>
      <select
        name="industry"
        value={formData.industry}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
      >
        <option value="">Select industry</option>
        <option value="technology">Technology</option>
        <option value="healthcare">Healthcare</option>
        <option value="finance">Finance</option>
        <option value="education">Education</option>
        <option value="manufacturing">Manufacturing</option>
        <option value="retail">Retail</option>
        <option value="other">Other</option>
      </select>
    </div>

    {/* Company Size */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Company Size *
      </label>
      <select
        name="companySize"
        value={formData.companySize}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
      >
        <option value="">Select size</option>
        <option value="1-10">1-10 employees</option>
        <option value="11-50">11-50 employees</option>
        <option value="51-200">51-200 employees</option>
        <option value="201-500">201-500 employees</option>
        <option value="501-1000">501-1000 employees</option>
        <option value="1000+">1000+ employees</option>
      </select>
    </div>
  </motion.div>
);

// ✅ Step 2: Contact Information
const Step2Content = ({ formData, handleChange }: any) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Contact Information</h3>
      <p className="text-gray-600">How can candidates reach you?</p>
    </div>

    {/* Website */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Website
      </label>
      <div className="relative">
        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          placeholder="https://yourcompany.com"
        />
      </div>
    </div>

    {/* Location */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Location *
      </label>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          placeholder="San Francisco, CA"
        />
      </div>
    </div>

    {/* Phone */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Phone Number
      </label>
      <div className="relative">
        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          placeholder="+1 (555) 000-0000"
        />
      </div>
    </div>
  </motion.div>
);

// ✅ Step 3: About Company
const Step3Content = ({ formData, handleChange }: any) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">About Your Company</h3>
      <p className="text-gray-600">Help candidates learn more about you</p>
    </div>

    {/* About */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Company Description *
      </label>
      <textarea
        name="about"
        value={formData.about}
        onChange={handleChange}
        required
        rows={6}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
        placeholder="Tell candidates about your company culture, mission, and what makes you unique..."
      />
      <p className="text-sm text-gray-500 mt-2">
        {formData.about.length} / 500 characters
      </p>
    </div>

    {/* Success Message */}
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <Check className="w-5 h-5 text-green-600 mt-0.5" />
        <div>
          <p className="font-medium text-green-900">Almost done!</p>
          <p className="text-sm text-green-700 mt-1">
            Click "Complete" to finish setting up your profile and unlock all features.
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);
