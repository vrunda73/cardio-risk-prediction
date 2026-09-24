import { AlertTriangle, WifiOff, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  variant?: 'api-unavailable' | 'generic';
  className?: string;
}

export default function ErrorState({
  title,
  message,
  onRetry,
  variant = 'generic',
  className = '',
}: ErrorStateProps) {
  const isApiError = variant === 'api-unavailable';
  const Icon = isApiError ? WifiOff : AlertTriangle;
  const defaultTitle = isApiError
    ? "We couldn't connect to the assessment service."
    : "Something went wrong.";
  const defaultMessage = isApiError
    ? 'Please check your internet connection or try again shortly. If the problem persists, the service may be temporarily unavailable.'
    : 'An unexpected error occurred. Please try again.';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center justify-center text-center p-10 ${className}`}
    >
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500/10 to-rose-500/10 border border-red-200 dark:border-red-800/50 flex items-center justify-center mb-5">
        <Icon className="w-9 h-9 text-red-500 dark:text-red-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {title ?? defaultTitle}
      </h3>
      <p className="text-gray-500 dark:text-slate-400 max-w-sm leading-relaxed mb-6">
        {message ?? defaultMessage}
      </p>
      {onRetry && (
        <Button variant="outline" leftIcon={<RefreshCw size={16} />} onClick={onRetry}>
          Try Again
        </Button>
      )}
    </motion.div>
  );
}
