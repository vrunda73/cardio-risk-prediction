import { InputHTMLAttributes, ReactNode } from 'react';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export default function InputField({
  label,
  error,
  helpText,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...rest
}: InputFieldProps) {
  const inputId = id || `input-${rest.name}`;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-700 dark:text-slate-300"
        >
          {label}
          {rest.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helpText ? `${inputId}-help` : undefined}
          className={`
            w-full px-4 py-3 rounded-xl border transition-all duration-200
            bg-white dark:bg-navy-800/80
            text-gray-900 dark:text-slate-100
            placeholder-gray-400 dark:placeholder-slate-500
            focus:outline-none focus:ring-2 focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            ${error
              ? 'border-red-400 dark:border-red-600 focus:ring-red-400'
              : 'border-gray-200 dark:border-navy-600 focus:ring-blue-500 hover:border-blue-300 dark:hover:border-blue-600'
            }
          `}
          {...rest}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p id={`${inputId}-error`} className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
      {!error && helpText && (
        <p id={`${inputId}-help`} className="text-xs text-gray-400 dark:text-slate-500">
          {helpText}
        </p>
      )}
    </div>
  );
}
