import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { useState } from 'react';
interface CardProps {
  children: ReactNode;
  variant?: 'feature' | 'testimonial' | 'stat';
  className?: string;
  hover?: boolean;
  gradient?: string;
}

export const Card = ({
  children,
  variant = 'feature',
  className,
  hover = true,
  gradient = 'from-blue-500 to-cyan-500',
}: CardProps) => {
  const baseStyles = 'rounded-2xl transition-all duration-300';

  const variantStyles = {
    feature: 'glass p-8 border border-white/20 shadow-card',
    testimonial: 'bg-white p-8 border-l-4 border-primary-600 shadow-soft',
    stat: `bg-gradient-to-br ${gradient} p-8 text-white shadow-xl`,
  };

  const hoverStyles = hover ? 'hover:shadow-card-hover hover:-translate-y-2' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={hover ? { y: -8, scale: 1.02 } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(baseStyles, variantStyles[variant], hoverStyles, className)}
    >
      {children}
    </motion.div>
  );
};

// Feature Card specific component
interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  stat?: string;
  gradient?: string;
}

// Add this enhanced version to Card.tsx
export const FeatureCard = ({ icon, title, description, stat, gradient = 'from-blue-500 to-cyan-500' }: FeatureCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <Card variant="feature" gradient={gradient}>
        <motion.div
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="relative"
        >
          {/* Animated gradient border on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 blur-sm"
          />
          
          <div className="relative bg-white rounded-2xl p-8">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
            >
              {icon}
            </motion.div>
            
            <h3 className="text-2xl font-bold mb-3 text-gray-900">
              {title}
            </h3>
            
            <p className="text-gray-600 mb-4 leading-relaxed">
              {description}
            </p>
            
            {stat && (
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${gradient} bg-opacity-10 text-sm font-bold text-primary-600`}
              >
                {stat}
              </motion.div>
            )}
          </div>
        </motion.div>
      </Card>
    );
  };
  
// Testimonial Card specific component
interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export const TestimonialCard = ({ quote, author, role, company, avatar }: TestimonialCardProps) => {
  return (
    <Card variant="testimonial">
      <div className="flex items-start gap-4 mb-4">
        {avatar ? (
          <img src={avatar} alt={author} className="w-12 h-12 rounded-full" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-lg">
            {author.charAt(0)}
          </div>
        )}
        <div className="flex-1">
          <p className="text-gray-700 text-lg leading-relaxed mb-4">"{quote}"</p>
        </div>
      </div>
      <div className="border-t pt-4">
        <p className="font-bold text-gray-900">{author}</p>
        <p className="text-sm text-gray-600">{role}</p>
        <p className="text-sm text-primary-600 font-medium">{company}</p>
      </div>
    </Card>
  );
};

// Stat Card specific component
interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
  subtext?: string;
  gradient?: string;
}

export const StatCard = ({ value, suffix = '', label, subtext, gradient = 'from-blue-500 to-cyan-500' }: StatCardProps) => {
  return (
    <Card variant="stat" gradient={gradient}>
      <div className="text-6xl font-bold font-display mb-2">
        {value}{suffix}
      </div>
      <div className="text-lg font-semibold mb-2">{label}</div>
      {subtext && <div className="text-sm opacity-80">{subtext}</div>}
    </Card>
  );
};
