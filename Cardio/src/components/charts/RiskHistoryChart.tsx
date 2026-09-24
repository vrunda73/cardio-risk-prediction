import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine
} from 'recharts';
import type { Assessment } from '../../types';
import { formatDate } from '../../utils/calculations';

interface RiskHistoryChartProps {
  assessments: Assessment[];
  mode?: 'risk' | 'bmi' | 'bp';
  className?: string;
}

export default function RiskHistoryChart({ assessments, mode = 'risk', className = '' }: RiskHistoryChartProps) {
  const sorted = [...assessments].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );

  const data = sorted.map((a) => ({
    date: formatDate(a.created_at),
    risk: a.result.probability !== undefined ? Math.round(a.result.probability * 100) : null,
    bmi: a.result.bmi ?? null,
    systolic: a.input.ap_hi,
    diastolic: a.input.ap_lo,
  }));

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string; color: string }[]; label?: string }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-navy-800 border border-navy-600 rounded-xl px-4 py-3 shadow-xl text-sm">
          <p className="text-slate-300 font-medium mb-1">{label}</p>
          {payload.map((p, i) => (
            <p key={i} style={{ color: p.color }} className="font-semibold">
              {p.name}: {p.value}{mode === 'risk' ? '%' : mode === 'bp' ? ' mmHg' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 8, right: 16, left: -8, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            domain={mode === 'risk' ? [0, 100] : ['auto', 'auto']}
            tickFormatter={(v) => mode === 'risk' ? `${v}%` : v}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />

          {mode === 'risk' && (
            <>
              <ReferenceLine y={50} stroke="#f59e0b" strokeDasharray="4 4" strokeOpacity={0.5} />
              <Line
                type="monotone"
                dataKey="risk"
                name="Estimated Risk"
                stroke="#3b82f6"
                strokeWidth={2.5}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#22d3ee' }}
              />
            </>
          )}

          {mode === 'bmi' && (
            <>
              <ReferenceLine y={25} stroke="#f59e0b" strokeDasharray="4 4" strokeOpacity={0.5} />
              <ReferenceLine y={18.5} stroke="#10b981" strokeDasharray="4 4" strokeOpacity={0.5} />
              <Line
                type="monotone"
                dataKey="bmi"
                name="BMI"
                stroke="#14b8a6"
                strokeWidth={2.5}
                dot={{ fill: '#14b8a6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#5eead4' }}
              />
            </>
          )}

          {mode === 'bp' && (
            <>
              <Line
                type="monotone"
                dataKey="systolic"
                name="Systolic"
                stroke="#3b82f6"
                strokeWidth={2.5}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="diastolic"
                name="Diastolic"
                stroke="#14b8a6"
                strokeWidth={2}
                strokeDasharray="5 3"
                dot={{ fill: '#14b8a6', strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5 }}
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
