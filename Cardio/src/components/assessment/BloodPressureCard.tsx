import { getBPCategory } from '../../utils/calculations';

interface BloodPressureCardProps {
  systolic: number;
  diastolic: number;
}

export default function BloodPressureCard({ systolic, diastolic }: BloodPressureCardProps) {
  const category = systolic > 0 && diastolic > 0 ? getBPCategory(systolic, diastolic) : null;
  const hasValues = systolic > 0 && diastolic > 0;

  // Visual bar: map systolic to percent for display (60–200 range)
  const sysPct = hasValues ? Math.min(Math.max(((systolic - 60) / 140) * 100, 5), 95) : 0;
  const diaPct = hasValues ? Math.min(Math.max(((diastolic - 40) / 100) * 100, 5), 95) : 0;

  return (
    <div className="rounded-2xl border border-gray-100 dark:border-navy-600 bg-white dark:bg-navy-800/60 p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
            Blood Pressure
          </div>
          {hasValues ? (
            <div className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
              {systolic}
              <span className="text-gray-400 dark:text-slate-500 mx-1 font-normal">/</span>
              {diastolic}
              <span className="text-sm font-medium text-gray-400 dark:text-slate-500 ml-1">mmHg</span>
            </div>
          ) : (
            <div className="text-2xl font-bold text-gray-300 dark:text-slate-600 mt-1">— / —</div>
          )}
        </div>
        {category && (
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold mt-1 text-center max-w-[110px]"
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

      {/* Dual bar visualization */}
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-slate-400 mb-1">
            <span>Systolic (upper)</span>
            <span className="font-medium">{systolic || '—'} mmHg</span>
          </div>
          <div className="h-2.5 bg-gray-100 dark:bg-navy-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-blue-500 to-blue-600"
              style={{ width: `${sysPct}%` }}
            />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-slate-400 mb-1">
            <span>Diastolic (lower)</span>
            <span className="font-medium">{diastolic || '—'} mmHg</span>
          </div>
          <div className="h-2.5 bg-gray-100 dark:bg-navy-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-teal-400 to-teal-500"
              style={{ width: `${diaPct}%` }}
            />
          </div>
        </div>
      </div>

      {category && (
        <p className="text-xs mt-3 leading-relaxed" style={{ color: category.color }}>
          {category.description}
        </p>
      )}
      {!hasValues && (
        <p className="text-xs text-gray-400 dark:text-slate-500 mt-3">
          Enter blood pressure values above to see the category.
        </p>
      )}
    </div>
  );
}
