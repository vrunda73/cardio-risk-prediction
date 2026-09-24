import { calculateBMI, getBMICategory } from '../../utils/calculations';

interface BMICardProps {
  height: number;
  weight: number;
}

export default function BMICard({ height, weight }: BMICardProps) {
  const bmi = calculateBMI(weight, height);
  const category = bmi > 0 ? getBMICategory(bmi) : null;

  // BMI scale: underweight < 18.5, normal 18.5-25, overweight 25-30, obese 30+
  // Map 10-45 onto 0-100%
  const pct = bmi > 0 ? Math.min(Math.max(((bmi - 10) / 35) * 100, 0), 100) : 0;

  return (
    <div className="rounded-2xl border border-gray-100 dark:border-navy-600 bg-white dark:bg-navy-800/60 p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
            Your BMI
          </div>
          {bmi > 0 ? (
            <div className="text-4xl font-bold mt-1" style={{ color: category?.color ?? '#94a3b8' }}>
              {bmi}
            </div>
          ) : (
            <div className="text-2xl font-bold text-gray-300 dark:text-slate-600 mt-1">—</div>
          )}
        </div>
        {category && (
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold mt-1"
            style={{
              backgroundColor: `${category.color}20`,
              color: category.color,
              border: `1px solid ${category.color}40`,
            }}
          >
            {category.label}
          </span>
        )}
      </div>

      {/* BMI Scale bar */}
      <div className="relative">
        <div className="h-3 rounded-full overflow-hidden bg-gray-100 dark:bg-navy-700">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              background: 'linear-gradient(90deg, #60a5fa 0%, #10b981 30%, #f59e0b 60%, #ef4444 100%)',
            }}
          />
        </div>
        {/* Marker */}
        {bmi > 0 && (
          <div
            className="absolute top-0 -translate-x-1/2 transition-all duration-700"
            style={{ left: `${pct}%` }}
          >
            <div className="w-4 h-4 rounded-full border-2 border-white shadow-md -mt-0.5"
              style={{ backgroundColor: category?.color ?? '#3b82f6' }}
            />
          </div>
        )}

        {/* Scale labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-400 dark:text-slate-500">
          <span>Underweight</span>
          <span>Normal</span>
          <span>Overweight</span>
          <span>Obese</span>
        </div>
      </div>

      {category && (
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-3 leading-relaxed">
          {category.description}
        </p>
      )}
      {!bmi && (
        <p className="text-xs text-gray-400 dark:text-slate-500 mt-3">
          Enter height and weight above to see your BMI.
        </p>
      )}
    </div>
  );
}
