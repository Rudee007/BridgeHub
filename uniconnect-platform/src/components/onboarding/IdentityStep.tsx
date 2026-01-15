// components/onboarding/IdentityStep.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Building2, Sparkles } from "lucide-react";

interface CompanyData {
  websiteUrl: string;
  companyName: string;
  industry: string;
  location: string;
  phoneNumber: string;
  description: string;
  logoUrl: string;
}

interface IdentityStepProps {
  data: CompanyData;
  updateData: (field: keyof CompanyData, value: string) => void; // ✅ FIXED
  onNext: () => void;
}

const industries = [
  "SaaS", "EdTech", "FinTech", "HealthTech", "E-commerce", 
  "AI/ML", "Consulting", "Marketing", "Other"
];

export const IdentityStep = ({ data, updateData, onNext }: IdentityStepProps) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleWebsiteFetch = async (url: string) => {
    updateData("websiteUrl", url);
    
    // Only fetch if URL is valid
    if (!url.includes(".")) return;

    setIsFetching(true);
    
    // TODO: Replace with real API call (Clearbit, custom scraper, etc.)
    setTimeout(() => {
      // Mock auto-fill
      updateData("companyName", "BridgeHub Technologies");
      updateData("industry", "EdTech");
      updateData("logoUrl", "https://via.placeholder.com/120");
      setIsFetching(false);
    }, 1500);
  };

  const isValid = data.websiteUrl && data.companyName && data.industry;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Website URL Input (The Magic-Fetch Trigger) */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Company Website
        </label>
        <div className="relative">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="url"
            value={data.websiteUrl}
            onChange={(e) => handleWebsiteFetch(e.target.value)}
            placeholder="https://bridgehub.com"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 transition-all outline-none"
          />
          {isFetching && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Sparkles className="h-5 w-5 text-primary-500 animate-pulse" />
            </div>
          )}
        </div>
        <p className="mt-2 text-xs text-gray-500">
          We'll auto-fill your company details from your website
        </p>
      </div>

      {/* Company Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Company Name
        </label>
        <div className="relative">
          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={data.companyName}
            onChange={(e) => updateData("companyName", e.target.value)}
            placeholder="Your company name"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 transition-all outline-none"
          />
        </div>
      </div>

      {/* Industry Selector (Pill Tags) */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Industry
        </label>
        <div className="flex flex-wrap gap-2">
          {industries.map((industry) => (
            <button
              key={industry}
              type="button"
              onClick={() => updateData("industry", industry)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                data.industry === industry
                  ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-glow-primary"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {industry}
            </button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <motion.button
        onClick={onNext}
        disabled={!isValid}
        whileHover={isValid ? { scale: 1.02 } : {}}
        whileTap={isValid ? { scale: 0.98 } : {}}
        className={`mt-8 w-full py-4 rounded-lg font-semibold text-white transition-all ${
          isValid
            ? "bg-gradient-to-r from-primary-500 to-primary-600 hover:shadow-glow-primary cursor-pointer"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Continue to Reach
      </motion.button>
    </motion.div>
  );
};
