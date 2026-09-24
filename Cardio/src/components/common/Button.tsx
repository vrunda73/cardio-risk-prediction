import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-blue-600 via-blue-600 to-teal-500 text-white shadow-[0_8px_18px_rgba(14,116,144,0.22)] hover:from-cyan-50 hover:via-blue-50 hover:to-blue-100 hover:text-blue-900 hover:shadow-glow-blue dark:hover:from-cyan-100 dark:hover:via-blue-100 dark:hover:to-blue-200 focus:ring-blue-500',
  secondary:
    'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:border-cyan-100 hover:bg-cyan-50 hover:text-blue-900 focus:ring-white/50',
  outline:
    'border border-blue-500/80 bg-white text-blue-700 shadow-sm dark:bg-navy-900 dark:text-blue-300 dark:border-blue-400/80 hover:border-blue-700 hover:bg-blue-50 hover:text-blue-800 hover:shadow-[0_8px_18px_rgba(37,99,235,0.14)] dark:hover:border-blue-300 dark:hover:bg-blue-900/40 dark:hover:text-blue-100 focus:ring-blue-500',
  ghost:
    'text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-900 dark:hover:bg-blue-900/40 dark:hover:text-blue-100 focus:ring-gray-400',
  danger:
    'bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-rose-50 hover:to-red-100 hover:text-blue-900 focus:ring-red-500',
};

const sizeClasses: Record<Size, string> = {
  sm: 'min-h-9 px-3 py-1.5 text-sm rounded-lg gap-1.5',
  md: 'min-h-11 px-4 sm:px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'min-h-12 px-5 sm:px-6 py-3 text-sm sm:text-base rounded-xl gap-2',
  xl: 'min-h-13 px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg rounded-2xl gap-3',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  fullWidth = false,
  disabled,
  ...rest
}: ButtonProps) {
  const base =
    'inline-flex max-w-full items-center justify-center text-center font-semibold leading-tight tracking-[-0.01em] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  return (
    <motion.button
      whileHover={disabled || isLoading ? {} : { y: -2 }}
      whileTap={disabled || isLoading ? {} : { y: 0 }}
      className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || isLoading}
      {...(rest as object)}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'xl' ? 20 : 16} />
      ) : (
        leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </motion.button>
  );
}
