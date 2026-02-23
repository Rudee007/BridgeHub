import { Users, User, ClipboardCheck, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const kpiData = [
  {
    id: 1,
    title: "Active Students",
    value: "1,240",
    trendNum: "+58",
    trendText: "this month",
    icon: Users,
    color: "primary", // Blue
    sparkline: "M 5 25 Q 40 15 75 5" // Simple upward curve
  },
  {
    id: 2,
    title: "Pending Verification",
    value: "38",
    trendNum: "+12",
    trendText: "since yesterday",
    icon: User,
    color: "warning", // Orange
    sparkline: "M 5 15 Q 20 5 35 15 T 75 10" // Wavy line
  },
  {
    id: 3,
    title: "Proposals to Endorse",
    value: "12",
    trendNum: "+5",
    trendText: "awaiting review",
    icon: ClipboardCheck,
    color: "secondary", // Purple
    sparkline: "M 5 20 Q 40 25 75 5" // Smooth swoop
  },
  {
    id: 4,
    title: "Students Placed",
    value: "94",
    trendNum: "+7",
    trendText: "this semester",
    icon: Award,
    color: "success", // Green
    sparkline: "M 5 25 Q 50 25 75 5" // Sharp hook up
  }
];

// Mapped directly to your Tailwind config for vibrant, fully opaque colors
const getColorClasses = (color: string) => {
  const map: Record<string, { iconBg: string, stroke: string }> = {
    primary: { iconBg: "bg-primary-600", stroke: "stroke-primary-600" },
    warning: { iconBg: "bg-orange-500", stroke: "stroke-orange-500" }, // standard orange
    secondary: { iconBg: "bg-secondary-500", stroke: "stroke-secondary-500" },
    success: { iconBg: "bg-success-500", stroke: "stroke-success-500" },
  };
  return map[color] || map.primary;
};

export function UniKPICards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon;
        const colors = getColorClasses(kpi.color);

        return (
          <motion.div
            key={kpi.id}
            whileHover={{ y: -4 }}
            // ✅ Crisp white background (bg-card), no muddy gradients, soft visible shadow
            className="bg-card rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all"
          >
            {/* Top Row: Solid Icon Box & Fully Opaque Sparkline */}
            <div className="flex justify-between items-start mb-6">
              
              {/* Vibrant solid icon box */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.iconBg}`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              
              {/* ✅ Opacity removed so the sparkline pops properly */}
              <div className="w-[72px] h-8">
                <svg viewBox="0 0 80 30" className="w-full h-full overflow-visible">
                  <motion.path
                    d={kpi.sparkline}
                    fill="none"
                    className={colors.stroke}
                    strokeWidth="2.5" // Slightly thicker for better visibility
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                  />
                </svg>
              </div>
            </div>

            {/* Middle: Big Number & Title */}
            <div>
              <h3 className="text-[32px] font-bold text-gray-900 leading-none mb-1.5 tracking-tight">
                {kpi.value}
              </h3>
              <p className="text-[13px] font-medium text-gray-500">
                {kpi.title}
              </p>
            </div>

            {/* Bottom: Trend Indicator Pill - Crisp Green */}
            <div className="mt-5 flex items-center gap-2">
              <span className="flex items-center gap-1 bg-success-50 text-success-600 px-2 py-0.5 rounded-md text-[11px] font-bold">
                <TrendingUp className="w-3 h-3" />
                {kpi.trendNum}
              </span>
              <span className="text-[11px] font-medium text-gray-400">
                {kpi.trendText}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}