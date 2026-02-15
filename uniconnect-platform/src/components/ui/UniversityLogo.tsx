import React from 'react';
import { GraduationCap, BookOpen, Building2 } from 'lucide-react';

interface UniversityLogoProps {
  name: string;
  className?: string;
  variant?: 'icon' | 'full'; // Option to show just the seal or full name
}

export const UniversityLogo = ({ 
  name, 
  className = '', 
  variant = 'full' 
}: UniversityLogoProps) => {
  
  // Helper to get initials (e.g., "IIT Bombay" -> "IITB")
  const getInitials = (text: string) => {
    return text
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 3)
      .toUpperCase();
  };

  // Specific color branding for known universities (optional polish)
  const getUniversityColor = (uniName: string) => {
    const colors: Record<string, string> = {
      'Harvard': 'text-red-700',
      'Stanford': 'text-red-800',
      'MIT': 'text-gray-900',
      'Oxford': 'text-blue-900',
      'Cambridge': 'text-teal-700',
      'IIT Bombay': 'text-blue-700',
      'IIT Delhi': 'text-red-600',
      'BITS Pilani': 'text-yellow-600',
    };
    return colors[uniName] || 'text-gray-800';
  };

  return (
    <div className={`flex items-center gap-2.5 ${className} ${getUniversityColor(name)}`}>
      {/* University Seal / Icon */}
      <div className="relative flex items-center justify-center w-8 h-8 rounded-full border-2 border-current opacity-90">
        <span className="text-[10px] font-bold font-serif leading-none pt-0.5">
          {getInitials(name)}
        </span>
      </div>

      {/* Full Name (Only if variant is 'full') */}
      {variant === 'full' && (
        <span className="font-serif font-bold text-lg tracking-tight leading-none whitespace-nowrap">
          {name}
        </span>
      )}
    </div>
  );
};