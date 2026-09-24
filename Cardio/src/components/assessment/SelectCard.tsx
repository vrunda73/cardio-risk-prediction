import { motion } from 'framer-motion';
import type { SelectOption } from '../../types';

interface SelectCardProps {
  options: SelectOption[];
  value: number | null;
  onChange: (value: number) => void;
  columns?: 1 | 2 | 3;
  className?: string;
}

const colClass: Record<1 | 2 | 3, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-3',
};

export default function SelectCard({ options, value, onChange, columns = 2, className = '' }: SelectCardProps) {
  return (
    <div className={`grid ${colClass[columns]} gap-3 ${className}`} role="group">
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <motion.button
            key={opt.label}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(opt.value)}
            aria-pressed={isSelected}
            className={`
              relative text-left rounded-2xl border-2 p-4 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              dark:focus:ring-offset-navy-900
              ${isSelected
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/25 shadow-glow-blue'
                : 'border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-800/60 hover:border-blue-300 dark:hover:border-blue-600'
              }
            `}
          >
            {isSelected && (
              <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
                ✓
              </span>
            )}
            {opt.icon && (
              <div
                className={`text-2xl mb-2 ${isSelected ? 'opacity-100' : 'opacity-60'}`}
                aria-hidden="true"
              >
                {opt.icon}
              </div>
            )}
            <div className={`font-semibold text-sm ${isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-gray-800 dark:text-slate-200'}`}>
              {opt.label}
            </div>
            {opt.description && (
              <div className="text-xs text-gray-500 dark:text-slate-400 mt-0.5 leading-snug">
                {opt.description}
              </div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
