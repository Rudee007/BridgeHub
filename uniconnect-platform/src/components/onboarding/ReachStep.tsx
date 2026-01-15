// components/onboarding/ReachStep.tsx
import { motion } from "framer-motion";
import { MapPin, Phone, ArrowLeft } from "lucide-react";

interface CompanyData {
  websiteUrl: string;
  companyName: string;
  industry: string;
  location: string;
  phoneNumber: string;
  description: string;
  logoUrl: string;
}

interface ReachStepProps {
  data: CompanyData;
  updateData: (field: keyof CompanyData, value: string) => void; // ✅ FIXED
  onNext: () => void;
  onBack: () => void;
}

export const ReachStep = ({ data, updateData, onNext, onBack }: ReachStepProps) => {
  const isValid = data.location && data.phoneNumber;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Location Input (With Google Places Autocomplete in production) */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Company Location
        </label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={data.location}
            onChange={(e) => updateData("location", e.target.value)}
            placeholder="San Francisco, CA"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-200 focus:border-secondary-500 transition-all outline-none"
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">
          This helps students find remote or local opportunities
        </p>
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Contact Number
        </label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="tel"
            value={data.phoneNumber}
            onChange={(e) => updateData("phoneNumber", e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-200 focus:border-secondary-500 transition-all outline-none"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
        <motion.button
          onClick={onNext}
          disabled={!isValid}
          whileHover={isValid ? { scale: 1.02 } : {}}
          whileTap={isValid ? { scale: 0.98 } : {}}
          className={`flex-[2] py-4 rounded-lg font-semibold text-white transition-all ${
            isValid
              ? "bg-gradient-to-r from-secondary-500 to-secondary-600 hover:shadow-glow-secondary cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Continue to Story
        </motion.button>
      </div>
    </motion.div>
  );
};
