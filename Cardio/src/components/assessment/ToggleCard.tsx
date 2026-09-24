import { motion } from 'framer-motion';

interface ToggleCardProps {
  label: string;
  description?: string;
  value: number;
  onChange: (v: number) => void;
  yesLabel?: string;
  noLabel?: string;
  yesValue?: number;
  noValue?: number;
  icon?: string;
}

export default function ToggleCard({
  label,
  description,
  value,
  onChange,
  yesLabel = 'Yes',
  noLabel = 'No',
  yesValue = 1,
  noValue = 0,
  icon,
}: ToggleCardProps) {
  const isYes = value === yesValue;

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-800/60 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {icon && <span className="text-2xl mt-0.5" aria-hidden="true">{icon}</span>}
          <div>
            <div className="font-semibold text-gray-800 dark:text-slate-200 text-sm">{label}</div>
            {description && (
              <div className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{description}</div>
            )}
          </div>
        </div>

        <div
          className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-navy-600 flex-shrink-0"
          role="group"
          aria-label={label}
        >
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => onChange(yesValue)}
            aria-pressed={isYes}
            className={`
              px-4 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none
              ${isYes
                ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white'
                : 'bg-transparent text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-navy-700'
              }
            `}
          >
            {yesLabel}
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => onChange(noValue)}
            aria-pressed={!isYes}
            className={`
              px-4 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none border-l border-gray-200 dark:border-navy-600
              ${!isYes
                ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white'
                : 'bg-transparent text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-navy-700'
              }
            `}
          >
            {noLabel}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
