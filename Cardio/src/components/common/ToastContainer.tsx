import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import type { ToastType } from '../../types';

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
};

const borderColors: Record<ToastType, string> = {
  success: 'border-l-emerald-500',
  error: 'border-l-red-500',
  warning: 'border-l-amber-500',
  info: 'border-l-blue-500',
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div
      className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-3 max-w-sm w-full"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`
              flex items-start gap-3 p-4 rounded-xl shadow-xl
              bg-white dark:bg-navy-800
              border border-gray-100 dark:border-navy-600
              border-l-4 ${borderColors[toast.type]}
            `}
            role="alert"
          >
            <div className="flex-shrink-0 mt-0.5">{icons[toast.type]}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">
                {toast.title}
              </p>
              {toast.message && (
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-0.5 leading-snug">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors mt-0.5"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
