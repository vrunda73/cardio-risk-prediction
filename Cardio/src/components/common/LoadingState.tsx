import { Loader2 } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Spinner
// ─────────────────────────────────────────────────────────────────────────────
type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

const spinnerSizes: Record<SpinnerSize, number> = { sm: 16, md: 24, lg: 36, xl: 48 };

export function Spinner({ size = 'md', className = '' }: { size?: SpinnerSize; className?: string }) {
  const px = spinnerSizes[size];
  return (
    <Loader2
      className={`animate-spin text-blue-500 ${className}`}
      style={{ width: px, height: px }}
      aria-label="Loading"
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SkeletonCard
// ─────────────────────────────────────────────────────────────────────────────
export function SkeletonCard({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div
      className={`rounded-2xl bg-white dark:bg-navy-800 border border-gray-100 dark:border-navy-700 p-6 ${className}`}
      aria-hidden="true"
    >
      <div className="skeleton h-4 w-1/3 mb-4 rounded" />
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-3 rounded mb-3"
          style={{ width: `${100 - i * 12}%`, animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FullPageLoader
// ─────────────────────────────────────────────────────────────────────────────
export function FullPageLoader({ message = 'Loading…' }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy-950/90 backdrop-blur-sm">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full border-4 border-blue-900 border-t-blue-500 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">🫀</span>
        </div>
      </div>
      <p className="text-slate-300 text-sm font-medium">{message}</p>
    </div>
  );
}
