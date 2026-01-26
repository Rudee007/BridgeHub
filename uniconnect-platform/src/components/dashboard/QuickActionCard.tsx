// components/dashboard/QuickActionCard.tsx
import { motion } from "framer-motion";

interface QuickActionCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  onClick: () => void;
  primary?: boolean;
  color?: "green" | "secondary" | "accent";
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon: Icon,
  title,
  description,
  onClick,
  primary = false,
  color = "green",
}) => {
  const colorClasses = {
    green: "bg-success-500 hover:bg-success-600",
    secondary: "bg-secondary-500 hover:bg-secondary-600",
    accent: "bg-accent-500 hover:bg-accent-600",
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`p-6 rounded-xl text-left transition-all shadow-sm ${
        primary ? "bg-primary-500 hover:bg-primary-600 text-white" : `${colorClasses[color]} text-white`
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <h3 className="font-bold text-base mb-1.5">{title}</h3>
      <p className="text-sm opacity-90 font-medium">{description}</p>
    </motion.button>
  );
};
