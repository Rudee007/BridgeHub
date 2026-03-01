import React from "react";
import { GraduationCap, Building2, User } from "lucide-react";

interface DynamicLogoProps {
  name: string;
  type?: "university" | "company" | "student";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

export function DynamicLogo({ name, type = "university", size = "md", className = "" }: DynamicLogoProps) {
  // 1. Extract Initials (e.g., "IIT Bombay" -> "IB", "BITS Pilani" -> "BP")
  const getInitials = (str: string) => {
    const words = str.trim().split(" ");
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return str.substring(0, 2).toUpperCase();
  };

  // 2. Deterministic Hash (Always gives the same number for the same name)
  const getHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  // 3. Premium Gradient Palettes (Golden Ratio approved colors)
  const gradients = [
    "from-blue-600 to-indigo-600",
    "from-emerald-500 to-teal-600",
    "from-rose-500 to-pink-600",
    "from-amber-500 to-orange-600",
    "from-purple-600 to-fuchsia-600",
    "from-cyan-500 to-blue-600",
    "from-slate-700 to-gray-900",
  ];

  const colorIndex = getHash(name) % gradients.length;
  const selectedGradient = gradients[colorIndex];

  // 4. Size Mappings
  const sizeClasses = {
    sm: "w-8 h-8 text-[11px] rounded-lg",
    md: "w-12 h-12 text-[15px] rounded-xl",
    lg: "w-16 h-16 text-[20px] rounded-[18px]",
    xl: "w-20 h-20 text-[24px] rounded-[20px]",
    "2xl": "w-24 h-24 text-[32px] rounded-[24px]",
  };

  // Student avatars are circular, entities are rounded-squares
  const shapeClass = type === "student" ? "!rounded-full" : "";

  return (
    <div 
      className={`relative flex items-center justify-center shrink-0 shadow-inner bg-gradient-to-br ${selectedGradient} ${sizeClasses[size]} ${shapeClass} ${className}`}
    >
      {/* Glossy Overlay for premium feel */}
      <div className="absolute inset-0 bg-white/10 mix-blend-overlay rounded-inherit pointer-events-none" />
      
      {/* Initials */}
      <span className="font-extrabold text-white tracking-wider relative z-10 drop-shadow-md">
        {getInitials(name)}
      </span>

      {/* Tiny Context Icon in the bottom right (Optional but looks highly professional) */}
      {size !== "sm" && (
        <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm border border-gray-100 z-20">
          {type === "university" && <GraduationCap className="w-3 h-3 text-gray-600" />}
          {type === "company" && <Building2 className="w-3 h-3 text-gray-600" />}
          {type === "student" && <User className="w-3 h-3 text-gray-600" />}
        </div>
      )}
    </div>
  );
}