import { ReactNode } from 'react';

type Variant = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
type Size = 'sm' | 'md';

interface BadgeProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  dot?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-700/40',
  success:
    'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-700/40',
  warning:
    'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-100 dark:border-amber-700/40',
  error:
    'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-100 dark:border-red-700/40',
  info:
    'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border border-cyan-100 dark:border-cyan-700/40',
  neutral:
    'bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700/40',
};

const dotColors: Record<Variant, string> = {
  primary: 'bg-blue-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
  info: 'bg-cyan-500',
  neutral: 'bg-gray-500',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-2 py-0.5 text-xs rounded-md',
  md: 'px-3 py-1 text-sm rounded-lg',
};

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  dot = false,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} animate-pulse`} />
      )}
      {children}
    </span>
  );
}
