import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  message?: string;
  action?: { label: string; onClick: () => void };
  className?: string;
}

export default function EmptyState({ icon, title, message, action, className = '' }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center text-center py-16 px-8 ${className}`}
    >
      {icon && (
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/10 to-teal-500/10 border border-blue-100 dark:border-blue-800/40 flex items-center justify-center mb-6 text-4xl">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      {message && (
        <p className="text-gray-500 dark:text-slate-400 max-w-sm leading-relaxed mb-6">{message}</p>
      )}
      {action && (
        <Button variant="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </motion.div>
  );
}
