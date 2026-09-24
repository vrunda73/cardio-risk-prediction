import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type Padding = 'none' | 'sm' | 'md' | 'lg';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  padding?: Padding;
  onClick?: () => void;
  as?: 'div' | 'article' | 'section' | 'li';
}

const paddingClasses: Record<Padding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function GlassCard({
  children,
  className = '',
  hover = false,
  gradient = false,
  padding = 'md',
  onClick,
  as: Tag = 'div',
}: GlassCardProps) {
  const base = `
    relative rounded-2xl overflow-hidden
    bg-white/[0.88] dark:bg-navy-800/[0.72]
    backdrop-blur-xl
    border border-slate-200/70 dark:border-white/10
    shadow-card dark:shadow-glass-dark
    transition-all duration-300
  `;

  const hoverClass = hover
    ? 'cursor-pointer hover:shadow-card-hover hover:-translate-y-1 hover:border-blue-200/90 dark:hover:border-blue-400/30'
    : '';

  const gradientOverlay = gradient ? (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 pointer-events-none rounded-2xl" />
  ) : null;

  if (onClick || hover) {
    return (
      <motion.div
        whileHover={hover ? { y: -4 } : {}}
        whileTap={onClick ? { y: -1 } : {}}
        className={`${base} ${hoverClass} ${paddingClasses[padding]} ${className}`}
        onClick={onClick}
      >
        {gradientOverlay}
        {children}
      </motion.div>
    );
  }

  return (
    <Tag className={`${base} ${paddingClasses[padding]} ${className}`}>
      {gradientOverlay}
      {children}
    </Tag>
  );
}
