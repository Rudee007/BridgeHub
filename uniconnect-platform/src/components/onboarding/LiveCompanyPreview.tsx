// components/onboarding/LiveCompanyPreview.tsx
import { motion } from "framer-motion";
import { Building2, MapPin, Phone, Globe } from "lucide-react";

interface LiveCompanyPreviewProps {
  data: any;
  currentStep: number;
}

export const LiveCompanyPreview = ({ data, currentStep }: LiveCompanyPreviewProps) => {
  return (
    <div className="relative z-10 h-full flex flex-col justify-center p-12 text-white">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <p className="text-sm font-bold text-white/40 uppercase tracking-wider mb-2">
          Live Preview
        </p>
        <h2 className="text-3xl font-bold">Your Company Profile</h2>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        layout
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-6"
      >
        {/* Logo & Name */}
        <div className="flex items-start gap-4">
          <div className="h-20 w-20 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden flex-shrink-0">
            {data.logoUrl ? (
              <img src={data.logoUrl} alt="Logo" className="h-full w-full object-cover" />
            ) : (
              <Building2 className="h-10 w-10 text-white/30" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold">
              {data.companyName || "Company Name"}
            </h3>
            {data.industry && (
              <span className="inline-block mt-2 px-3 py-1 bg-primary-500/20 text-primary-300 text-xs font-semibold rounded-full">
                {data.industry}
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        {currentStep >= 2 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="space-y-3 pt-4 border-t border-white/10"
          >
            {data.location && (
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{data.location}</span>
              </div>
            )}
            {data.phoneNumber && (
              <div className="flex items-center gap-3 text-white/70">
                <Phone className="h-4 w-4" />
                <span className="text-sm">{data.phoneNumber}</span>
              </div>
            )}
            {data.websiteUrl && (
              <div className="flex items-center gap-3 text-white/70">
                <Globe className="h-4 w-4" />
                <span className="text-sm">{data.websiteUrl}</span>
              </div>
            )}
          </motion.div>
        )}

        {/* Description */}
        {currentStep >= 3 && data.description && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="pt-4 border-t border-white/10"
          >
            <p className="text-sm text-white/60 leading-relaxed">
              {data.description}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Bottom Encouragement Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center text-sm text-white/40"
      >
        Students will see this on your company profile
      </motion.p>
    </div>
  );
};
