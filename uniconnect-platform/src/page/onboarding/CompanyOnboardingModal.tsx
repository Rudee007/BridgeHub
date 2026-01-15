// components/onboarding/CompanyOnboardingModal.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IdentityStep } from "@/components/onboarding/IdentityStep";
import { ReachStep } from "@/components/onboarding/ReachStep";
import { StoryStep } from "@/components/onboarding/StoryStep";
import { LiveCompanyPreview } from "@/components/onboarding/LiveCompanyPreview";
import { Building2, MapPin, FileText, X } from "lucide-react";

interface CompanyData {
  websiteUrl: string;
  companyName: string;
  industry: string;
  location: string;
  phoneNumber: string;
  description: string;
  logoUrl: string;
}

interface CompanyOnboardingModalProps {
  onComplete: (data: CompanyData) => void;
  onDismiss: () => void;
  initialData?: Partial<CompanyData>;
}

const steps = [
  { 
    id: 1, 
    title: "Identity", 
    subtitle: "Let's start with the basics",
    icon: Building2,
    color: "from-primary-500 to-primary-600"
  },
  { 
    id: 2, 
    title: "Reach", 
    subtitle: "How can students connect?",
    icon: MapPin,
    color: "from-secondary-500 to-secondary-600"
  },
  { 
    id: 3, 
    title: "Story", 
    subtitle: "Tell us what makes you unique",
    icon: FileText,
    color: "from-pink-500 to-rose-600"
  },
];

export const CompanyOnboardingModal = ({ 
  onComplete, 
  onDismiss,
  initialData = {}
}: CompanyOnboardingModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [companyData, setCompanyData] = useState<CompanyData>({
    websiteUrl: initialData.websiteUrl || "",
    companyName: initialData.companyName || "",
    industry: initialData.industry || "",
    location: initialData.location || "",
    phoneNumber: initialData.phoneNumber || "",
    description: initialData.description || "",
    logoUrl: initialData.logoUrl || "",
  });

  const updateData = (field: keyof CompanyData, value: string) => {
    setCompanyData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    onComplete(companyData);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        
        {/* Backdrop with blur effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onDismiss}
          className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-6xl h-[85vh] flex gap-6 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          
          {/* LEFT SIDE: Form (Golden Ratio: 61.8%) */}
          <div className="flex-[1.618] bg-white rounded-2xl shadow-2xl p-10 flex flex-col relative">
            
            {/* Close Button */}
            <button
              onClick={onDismiss}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Progress Indicator */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-6">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center flex-1">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: currentStep === step.id ? 1 : 0.9,
                        opacity: currentStep >= step.id ? 1 : 0.4,
                      }}
                      className="flex items-center gap-2"
                    >
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all ${
                          currentStep >= step.id
                            ? "border-primary-500 bg-primary-50"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <step.icon
                          className={`h-5 w-5 ${
                            currentStep >= step.id ? "text-primary-600" : "text-gray-400"
                          }`}
                        />
                      </div>
                      <div className="hidden lg:block">
                        <p className={`text-xs font-semibold ${
                          currentStep === step.id ? "text-gray-900" : "text-gray-400"
                        }`}>
                          {step.title}
                        </p>
                      </div>
                    </motion.div>
                    
                    {/* Connecting Line */}
                    {index < steps.length - 1 && (
                      <div className="flex-1 h-0.5 mx-3 bg-gray-200 relative overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: currentStep > step.id ? 1 : 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ transformOrigin: "left" }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Step Title */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {steps[currentStep - 1].title}
                </h2>
                <p className="text-sm text-gray-600">{steps[currentStep - 1].subtitle}</p>
              </motion.div>
            </div>

            {/* Step Content */}
            <div className="flex-1 overflow-y-auto pr-2">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <IdentityStep
                    key="identity"
                    data={companyData}
                    updateData={updateData}
                    onNext={nextStep}
                  />
                )}
                {currentStep === 2 && (
                  <ReachStep
                    key="reach"
                    data={companyData}
                    updateData={updateData}
                    onNext={nextStep}
                    onBack={prevStep}
                  />
                )}
                {currentStep === 3 && (
                  <StoryStep
                    key="story"
                    data={companyData}
                    updateData={updateData}
                    onBack={prevStep}
                    onSubmit={handleSubmit}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Do it Later Button */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={onDismiss}
                className="w-full py-3 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                I'll do this later
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: Live Preview (Golden Ratio: 38.2%) */}
          <div className="hidden md:block flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden relative">
            {/* Subtle background effects */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 h-96 w-96 bg-primary-500 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 h-80 w-80 bg-secondary-500 rounded-full blur-3xl" />
            </div>
            
            <LiveCompanyPreview data={companyData} currentStep={currentStep} />
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
