// components/onboarding/StoryStep.tsx
import { motion } from "framer-motion";
import { Upload, ArrowLeft, Check } from "lucide-react";
import { useState } from "react";

interface CompanyData {
  websiteUrl: string;
  companyName: string;
  industry: string;
  location: string;
  phoneNumber: string;
  description: string;
  logoUrl: string;
}

interface StoryStepProps {
  data: CompanyData;
  updateData: (field: keyof CompanyData, value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export const StoryStep = ({ data, updateData, onBack, onSubmit }: StoryStepProps) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(data.logoUrl || null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoPreview(result);
        updateData("logoUrl", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const isValid = data.description && data.logoUrl;
  const charLimit = 500;
  const remaining = charLimit - data.description.length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 font-sans"
    >
      {/* Logo Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Company Logo
        </label>
        <label
          htmlFor="logo-upload"
          className="relative flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-400 transition-all cursor-pointer group overflow-hidden"
        >
          {logoPreview ? (
            <img src={logoPreview} alt="Logo" className="h-24 w-24 object-contain" />
          ) : (
            <>
              <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Upload className="h-8 w-8 text-primary-600" />
              </div>
              <p className="text-sm font-medium text-gray-600">Click to upload logo</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
            </>
          )}
          <input
            id="logo-upload"
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Description Textarea */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Company Description
        </label>
        <textarea
          value={data.description}
          onChange={(e) => {
            if (e.target.value.length <= charLimit) {
              updateData("description", e.target.value);
            }
          }}
          placeholder="Tell students what makes your company unique..."
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 transition-all outline-none resize-none font-sans"
        />
        <p className={`mt-2 text-xs ${remaining < 50 ? 'text-amber-600' : 'text-gray-500'}`}>
          {data.description.length} / {charLimit} characters
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="flex-1 py-4 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all flex items-center justify-center gap-2 border border-gray-200"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </motion.button>
        <motion.button
          onClick={onSubmit}
          disabled={!isValid}
          whileHover={isValid ? { scale: 1.01 } : {}}
          whileTap={isValid ? { scale: 0.99 } : {}}
          className={`flex-[2] py-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 font-display ${
            isValid
              ? "bg-gradient-to-r from-primary-600 to-secondary-600 hover:shadow-lg hover:shadow-primary-500/25 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          <Check className="h-5 w-5" />
          Complete Profile
        </motion.button>
      </div>
    </motion.div>
  );
};
