// components/dashboard/ProfileBanner.tsx
import { motion } from "framer-motion";
import { AlertCircle, XCircle } from "lucide-react";

interface ProfileBannerProps {
  show: boolean;
  progress: number;
  onComplete: () => void;
  onDismiss: () => void;
}

export const ProfileBanner: React.FC<ProfileBannerProps> = ({ show, progress, onComplete, onDismiss }) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-b border-amber-200"
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <AlertCircle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Complete your company profile</p>
              <p className="text-xs text-gray-600 mt-0.5">
                Add more details to increase visibility and attract top talent
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                />
              </div>
              <span className="text-xs font-bold text-gray-700 min-w-[3ch]">{progress}%</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onComplete}
              className="px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-all shadow-sm whitespace-nowrap"
            >
              Complete Now
            </motion.button>

            <button
              onClick={onDismiss}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-colors"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
