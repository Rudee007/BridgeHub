// components/onboarding/ReachStep.tsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";

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
  updateData: (field: keyof CompanyData, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const ReachStep = ({ data, updateData, onNext, onBack }: ReachStepProps) => {
  const [phoneError, setPhoneError] = useState('');
  const [locationError, setLocationError] = useState('');

  // ✅ Phone number validation
  const validatePhoneNumber = (phone: string): boolean => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    // Valid if 10-15 digits (international formats)
    return cleaned.length >= 10 && cleaned.length <= 15;
  };

  // ✅ Format phone number as user types (optional)
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');
    
    // Format as user types (US format example)
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else if (cleaned.length <= 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else {
      // International format
      return `+${cleaned.slice(0, cleaned.length - 10)} (${cleaned.slice(-10, -7)}) ${cleaned.slice(-7, -4)}-${cleaned.slice(-4)}`;
    }
  };

  // ✅ Handle phone input with validation
  const handlePhoneChange = (value: string) => {
    updateData("phoneNumber", value);
    
    if (value && !validatePhoneNumber(value)) {
      setPhoneError('Please enter a valid phone number (10-15 digits)');
    } else {
      setPhoneError('');
    }
  };

  // ✅ Handle location input with validation
  const handleLocationChange = (value: string) => {
    updateData("location", value);
    
    if (value && value.length < 3) {
      setLocationError('Location must be at least 3 characters');
    } else {
      setLocationError('');
    }
  };

  const isPhoneValid = data.phoneNumber && validatePhoneNumber(data.phoneNumber);
  const isLocationValid = data.location && data.location.length >= 3;
  const isValid = isPhoneValid && isLocationValid;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 font-sans"
    >
      {/* Location Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Company Location
        </label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={data.location}
            onChange={(e) => handleLocationChange(e.target.value)}
            placeholder="San Francisco, CA"
            className={`w-full pl-12 pr-12 py-3 border rounded-lg transition-all outline-none font-sans ${
              data.location && isLocationValid
                ? 'border-green-500 focus:ring-2 focus:ring-green-200'
                : locationError
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:ring-2 focus:ring-secondary-200 focus:border-secondary-500'
            }`}
          />
          
          {/* Validation Icon */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <AnimatePresence mode="wait">
              {data.location && isLocationValid && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </motion.div>
              )}
              {locationError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Helper/Error Text */}
        <AnimatePresence mode="wait">
          {locationError ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 overflow-hidden"
            >
              <div className="flex items-center gap-2 text-xs text-red-700 bg-red-50 px-3 py-2 rounded-md">
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="font-medium">{locationError}</span>
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="helper"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 text-xs text-gray-500"
            >
              This helps students find local or remote opportunities
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Phone Number Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Contact Number
        </label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="tel"
            value={data.phoneNumber}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder="+1 (555) 123-4567"
            className={`w-full pl-12 pr-12 py-3 border rounded-lg transition-all outline-none font-sans ${
              data.phoneNumber && isPhoneValid
                ? 'border-green-500 focus:ring-2 focus:ring-green-200'
                : phoneError
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:ring-2 focus:ring-secondary-200 focus:border-secondary-500'
            }`}
          />
          
          {/* Validation Icon */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <AnimatePresence mode="wait">
              {data.phoneNumber && isPhoneValid && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </motion.div>
              )}
              {phoneError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <AlertCircle className="h-5 w-5 text-red-600" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Helper/Error Text */}
        <AnimatePresence mode="wait">
          {phoneError ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 overflow-hidden"
            >
              <div className="flex items-center gap-2 text-xs text-red-700 bg-red-50 px-3 py-2 rounded-md">
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="font-medium">{phoneError}</span>
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="helper"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 text-xs text-gray-500"
            >
              Include country code for international numbers (e.g., +1, +91)
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8 pt-4">
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
          onClick={onNext}
          disabled={!isValid}
          whileHover={isValid ? { scale: 1.01 } : {}}
          whileTap={isValid ? { scale: 0.99 } : {}}
          className={`flex-[2] py-4 rounded-lg font-semibold text-white transition-all font-display ${
            isValid
              ? "bg-gradient-to-r from-secondary-600 to-secondary-700 hover:shadow-lg hover:shadow-secondary-500/25 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed opacity-60"
          }`}
        >
          Continue to Story
        </motion.button>
      </div>

      {/* Progress Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-center gap-2 pt-4"
      >
        <div className="h-1.5 w-1.5 rounded-full bg-primary-600"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-secondary-600"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-gray-300"></div>
      </motion.div>
    </motion.div>
  );
};
