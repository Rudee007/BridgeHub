// components/onboarding/LiveCompanyPreview.tsx
import { motion, AnimatePresence } from "framer-motion";
import { Building2, MapPin, Phone, Globe, Sparkles } from "lucide-react";

interface CompanyData {
  websiteUrl: string;
  companyName: string;
  industry: string;
  location: string;
  phoneNumber: string;
  description: string;
  logoUrl: string;
}

interface LiveCompanyPreviewProps {
  data: CompanyData;
  currentStep: number;
}

export const LiveCompanyPreview = ({ data, currentStep }: LiveCompanyPreviewProps) => {
  return (
    <div className="relative z-10 h-full flex flex-col justify-center p-8 lg:p-12 text-white">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="flex items-center gap-2 mb-3">
         
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          Your Company Profile
        </h2>
        <p className="text-sm text-white/40 mt-1">
          See how students will view your profile
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 lg:p-8 shadow-2xl space-y-6"
      >
        {/* Logo & Name Section */}
        <div className="flex items-start gap-4">
          {/* Logo Container - Fixed Display */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative h-20 w-20 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden flex-shrink-0 group"
          >
            {data.logoUrl ? (
              <>
                <img 
                  src={data.logoUrl} 
                  alt="Company Logo" 
                  className="h-16 w-16 object-contain p-2" // ✅ Fixed: object-contain + padding
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Building2 className="h-8 w-8 text-white/40" />
              </div>
            )}
          </motion.div>

          {/* Company Name & Industry */}
          <div className="flex-1 min-w-0">
            <motion.h3 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl lg:text-2xl font-bold text-white truncate"
            >
              {data.companyName || (
                <span className="text-white/30">Company Name</span>
              )}
            </motion.h3>
            
            <AnimatePresence>
              {data.industry && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.4 }}
                  className="inline-block mt-2 px-3 py-1 bg-gradient-to-r from-primary-500/30 to-secondary-500/30 border border-primary-400/30 text-primary-200 text-xs font-semibold rounded-full"
                >
                  {data.industry}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Contact Details Section */}
        <AnimatePresence>
          {currentStep >= 2 && (data.location || data.phoneNumber || data.websiteUrl) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-3 pt-4 border-t border-white/10"
            >
              {data.location && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3 text-white/70 hover:text-white/90 transition-colors group"
                >
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{data.location}</span>
                </motion.div>
              )}
              
              {data.phoneNumber && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 text-white/70 hover:text-white/90 transition-colors group"
                >
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{data.phoneNumber}</span>
                </motion.div>
              )}
              
              {data.websiteUrl && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-3 text-white/70 hover:text-white/90 transition-colors group"
                >
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                    <Globe className="h-4 w-4" />
                  </div>
                  <span className="text-sm truncate">{data.websiteUrl}</span>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Description Section */}
        <AnimatePresence>
          {currentStep >= 3 && data.description && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="pt-4 border-t border-white/10"
            >
              <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                About
              </p>
              <p className="text-sm text-white/70 leading-relaxed">
                {data.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State Placeholder */}
        {!data.companyName && !data.industry && currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-8 text-center"
          >
            <div className="inline-flex items-center justify-center h-16 w-16 bg-white/5 rounded-full mb-3">
              <Building2 className="h-8 w-8 text-white/30" />
            </div>
            <p className="text-sm text-white/40">
              Enter your details to see the preview
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Bottom Encouragement Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center"
      >
        <p className="text-xs text-white/30 flex items-center justify-center gap-2">
          <Sparkles className="h-3 w-3" />
          This is how students will discover your company
        </p>
      </motion.div>

      {/* Decorative gradient orbs (subtle) */}
      <div className="absolute top-1/4 right-0 h-32 w-32 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 h-40 w-40 bg-secondary-500/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
