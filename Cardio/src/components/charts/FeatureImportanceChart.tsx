import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { FEATURE_LABEL_MAP } from '../../data';

interface FeatureImportanceChartProps {
  data: Record<string, number>;
  className?: string;
}

function getBarColor(value: number): string {
  if (value >= 0.3) return '#3b82f6';
  if (value >= 0.15) return '#14b8a6';
  return '#818cf8';
}

export default function FeatureImportanceChart({ data, className = '' }: FeatureImportanceChartProps) {
  const chartData = Object.entries(data)
    .map(([key, value]) => ({
      name: FEATURE_LABEL_MAP[key] ?? key,
      value: parseFloat((value * 100).toFixed(1)),
      raw: value,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { payload: { name: string; value: number } }[] }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-navy-800 dark:bg-navy-900 border border-navy-600 rounded-xl px-4 py-3 shadow-xl text-sm">
          <p className="text-white font-semibold">{payload[0].payload.name}</p>
          <p className="text-cyan-400 mt-0.5">
            Relative importance: <strong>{payload[0].payload.value}%</strong>
          </p>
          <p className="text-slate-400 text-xs mt-1">
            This factor contributed to the model's assessment.
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={className}>
      <p className="text-xs text-gray-400 dark:text-slate-500 mb-4 italic">
        Relative importance of each factor in the model's assessment. This does not imply causation.
      </p>
      <ResponsiveContainer width="100%" height={Math.max(220, chartData.length * 42)}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 4, right: 60, left: 0, bottom: 4 }}
        >
          <XAxis
            type="number"
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={160}
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148,163,184,0.06)' }} />
          <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={20}>
            {chartData.map((entry, i) => (
              <Cell key={i} fill={getBarColor(entry.raw)} />
            ))}
            <LabelList
              dataKey="value"
              position="right"
              formatter={(v: any) => `${v}%`}
              style={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
