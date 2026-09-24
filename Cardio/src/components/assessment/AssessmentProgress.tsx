import { Check } from 'lucide-react';

const STEPS = [
  { number: '01', label: 'Basic Information' },
  { number: '02', label: 'Body & Blood Pressure' },
  { number: '03', label: 'Health & Lifestyle' },
  { number: '04', label: 'Review' },
];

interface AssessmentProgressProps {
  currentStep: number;
}

export default function AssessmentProgress({ currentStep }: AssessmentProgressProps) {
  return (
    <div className="w-full" role="navigation" aria-label="Assessment progress">
      {/* Desktop */}
      <div className="hidden sm:flex items-center justify-between relative">
        {/* Connector line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 dark:bg-navy-700 z-0" />
        <div
          className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-teal-500 z-0 transition-all duration-700"
          style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((step, i) => {
          const stepNum = i + 1;
          const isDone = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          return (
            <div key={step.number} className="flex flex-col items-center relative z-10">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                  transition-all duration-300 border-2
                  ${isDone
                    ? 'bg-gradient-to-br from-blue-600 to-teal-500 border-transparent text-white'
                    : isActive
                    ? 'bg-white dark:bg-navy-800 border-blue-500 text-blue-600 dark:text-blue-400 shadow-glow-blue'
                    : 'bg-white dark:bg-navy-800 border-gray-200 dark:border-navy-600 text-gray-400'
                  }
                `}
                aria-current={isActive ? 'step' : undefined}
              >
                {isDone ? <Check size={16} /> : step.number}
              </div>
              <span
                className={`mt-2 text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : isDone
                    ? 'text-teal-600 dark:text-teal-400'
                    : 'text-gray-400 dark:text-slate-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile: compact */}
      <div className="flex sm:hidden items-center justify-between px-2">
        {STEPS.map((step, i) => {
          const stepNum = i + 1;
          const isDone = stepNum < currentStep;
          const isActive = stepNum === currentStep;
          return (
            <div key={step.number} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all
                  ${isDone ? 'bg-gradient-to-br from-blue-600 to-teal-500 border-transparent text-white'
                    : isActive ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-white dark:bg-navy-800'
                    : 'border-gray-200 dark:border-navy-600 text-gray-400'}`}
              >
                {isDone ? <Check size={12} /> : step.number}
              </div>
              {isActive && (
                <span className="mt-1 text-xs font-medium text-blue-600 dark:text-blue-400 whitespace-nowrap">
                  {step.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
