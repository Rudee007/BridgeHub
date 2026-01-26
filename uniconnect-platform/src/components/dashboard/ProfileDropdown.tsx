// components/dashboard/ProfileDropdown.tsx
import { motion, AnimatePresence } from "framer-motion";
import { Building2, ChevronDown, AlertCircle, Settings, LogOut } from "lucide-react";

interface ProfileDropdownProps {
  show: boolean;
  companyName: string;
  industry: string;
  logoUrl?: string;
  profileComplete: boolean;
  onToggle: () => void;
  onCompleteProfile: () => void;
  onSettings: () => void;
  onLogout: () => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  show,
  companyName,
  industry,
  logoUrl,
  profileComplete,
  onToggle,
  onCompleteProfile,
  onSettings,
  onLogout,
}) => {
  return (
    <div className="relative">
      <button onClick={onToggle} className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
        {logoUrl ? (
          <img src={logoUrl} alt={companyName} className="w-8 h-8 rounded-lg object-cover ring-1 ring-gray-200" />
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-lg flex items-center justify-center ring-1 ring-primary-200">
            <Building2 className="h-4 w-4 text-white" />
          </div>
        )}
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      <AnimatePresence>
        {show && (
          <>
            <div className="fixed inset-0 z-40" onClick={onToggle} />

            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
            >
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="font-semibold text-sm text-gray-900 truncate">{companyName}</p>
                <p className="text-xs text-gray-500 truncate">{industry}</p>
              </div>

              {!profileComplete && (
                <button
                  onClick={() => {
                    onCompleteProfile();
                    onToggle();
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-amber-600 hover:bg-amber-50 flex items-center gap-2 transition-colors"
                >
                  <AlertCircle className="h-4 w-4" />
                  Complete Profile
                </button>
              )}

              <button
                onClick={() => {
                  onSettings();
                  onToggle();
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
              >
                <Settings className="h-4 w-4" />
                Settings
              </button>

              <button
                onClick={onLogout}
                className="w-full px-4 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
