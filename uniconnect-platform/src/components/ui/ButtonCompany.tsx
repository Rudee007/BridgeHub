import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps {
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  className,
  onClick,
  disabled = false,
  type = 'button',
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl',
  };

  const variantStyles = {
    primary: 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg hover:shadow-glow-primary hover:shadow-xl',
    secondary: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white',
    tertiary: 'text-primary-600 hover:underline underline-offset-4',
    icon: 'rounded-full p-3 bg-white border-2 border-gray-200 hover:border-primary-600 hover:rotate-90 hover:scale-110',
  };

  if (variant === 'icon') {
    return (
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        className={cn(baseStyles, variantStyles.icon, className)}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {icon || children}
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: variant === 'tertiary' ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {icon && iconPosition === 'left' && <span className="inline-flex">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="inline-flex">{icon}</span>}
    </motion.button>
  );
};
