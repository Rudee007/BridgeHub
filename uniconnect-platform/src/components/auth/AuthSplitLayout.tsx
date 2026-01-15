import { type ReactNode } from "react";
import { motion } from "framer-motion";

export const AuthSplitLayout = ({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) => {
  return (
    // ✅ h-screen + overflow-hidden to fix it perfectly to the viewport
    <div className="h-screen w-full flex overflow-hidden bg-white">
      <div className="flex w-full h-full">
        
        {/* ✅ Left Section: Marketing (Fixed 50% width on desktop) */}
        <div className="hidden lg:flex lg:w-1/2 h-full relative overflow-hidden bg-[#0a0a0a]">
          {/* Subtle Background Effects */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-600 blur-[120px]" />
            <div className="absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-secondary-600 blur-[100px]" />
          </div>

          <div className="relative z-10 w-full h-full flex items-center justify-center px-12 xl:px-20 py-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full"
            >
              {left}
            </motion.div>
          </div>
        </div>

        {/* ✅ Right Section: Form (Full width on mobile, 50% on desktop) */}
        <div className="w-full lg:w-1/2 h-full bg-white flex items-center justify-center p-6 md:p-12 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto"
          >
            {right}
          </motion.div>
        </div>

      </div>
    </div>
  );
};
