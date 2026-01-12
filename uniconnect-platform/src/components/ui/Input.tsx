import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  error?: string;
  success?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export const Input = ({
  label,
  placeholder,
  value = '',
  onChange,
  type = 'text',
  icon,
  iconPosition = 'left',
  error,
  success,
  disabled = false,
  required = false,
  className,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  const hasValue = internalValue.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={cn('relative', className)}>
      {/* Floating Label */}
      {label && (
        <motion.label
          initial={false}
          animate={{
            top: isFocused || hasValue ? '0.5rem' : '1.25rem',
            fontSize: isFocused || hasValue ? '0.75rem' : '1rem',
            color: error ? '#ef4444' : isFocused ? '#2563eb' : '#6b7280',
          }}
          transition={{ duration: 0.2 }}
          className={cn(
            'absolute left-4 pointer-events-none font-medium z-10 px-1 bg-white',
            icon && iconPosition === 'left' && 'left-12'
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>
      )}

      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {icon && iconPosition === 'left' && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}

        {/* Input Field */}
        <input
  type={type}
  value={internalValue}
  onChange={handleChange}
  onFocus={() => setIsFocused(true)}
  onBlur={() => setIsFocused(false)}
  placeholder={isFocused ? placeholder : ''}
  disabled={disabled}
  className={cn(
    'w-full h-14 px-4 rounded-xl border-2 transition-all duration-200',
    'font-medium text-gray-900 placeholder:text-gray-400',
    'focus:outline-none focus:ring-0',
    'disabled:bg-gray-50 disabled:cursor-not-allowed',
    icon && iconPosition === 'left' && 'pl-12',
    icon && iconPosition === 'right' && 'pr-12',
    error && 'border-red-500 focus:border-red-600 animate-shake',
    success && 'border-green-500 focus:border-green-600',
    !error && !success && 'border-slate-200 focus:border-primary-600',
    isFocused && !error && !success && 'animate-pulse-border'
  )}
/>
        {/* Right Icon */}
        {icon && iconPosition === 'right' && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        )}

        {/* Success/Error Icons */}
        {(success || error) && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              'absolute right-4 top-1/2 -translate-y-1/2',
              icon && iconPosition === 'right' && 'right-12'
            )}
          >
            {success && (
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {error && (
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </motion.div>
        )}
      </div>

      {/* Error/Success Messages */}
      <AnimatePresence>
        {(error || success) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              'mt-2 text-sm font-medium',
              error && 'text-red-500',
              success && 'text-green-500'
            )}
          >
            {error || success}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
