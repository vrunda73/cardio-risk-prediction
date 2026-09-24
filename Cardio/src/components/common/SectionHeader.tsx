import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  badge?: string;
  title: ReactNode;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  centered = false,
  light = false,
  className = '',
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`${centered ? 'text-center' : ''} ${className}`}
    >
      {badge && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className={`
            inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4
            ${light
              ? 'bg-white/15 text-white border border-white/25'
              : 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-700/40'
            }
          `}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
          {badge}
        </motion.span>
      )}

      <h2
        className={`
          font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4
          ${light ? 'text-white' : 'text-gray-900 dark:text-white'}
        `}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`
            text-lg leading-relaxed max-w-2xl
            ${centered ? 'mx-auto' : ''}
            ${light ? 'text-blue-100' : 'text-gray-500 dark:text-slate-400'}
          `}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
