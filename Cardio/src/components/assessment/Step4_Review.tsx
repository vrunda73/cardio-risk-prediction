import { motion } from 'framer-motion';
import type { AssessmentInput } from '../../types';
import {
  getBPCategory,
  calculateBMI,
  getBMICategory,
} from '../../utils/calculations';
import Button from '../common/Button';
import GlassCard from '../common/GlassCard';
import { Edit2 } from 'lucide-react';
import { GENDER_MAP as DATA_GENDER_MAP, CHOLESTEROL_MAP as DATA_CHOLESTEROL_MAP, GLUCOSE_MAP as DATA_GLUCOSE_MAP } from '../../data';

interface Step4Props {
  data: AssessmentInput;
  onEdit: (step: number) => void;
}

export default function Step4_Review({ data, onEdit }: Step4Props) {
  const bmi = calculateBMI(data.weight, data.height);
  const bmiCategory = bmi > 0 ? getBMICategory(bmi) : null;
  const bpCategory = getBPCategory(data.ap_hi, data.ap_lo);

  const Section = ({ title, step, children }: { title: string; step: number; children: React.ReactNode }) => (
    <GlassCard padding="sm" className="mb-4">
      <div className="flex justify-between items-center mb-3 border-b border-gray-100 dark:border-navy-600 pb-2">
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
        <button
          onClick={() => onEdit(step)}
          className="text-blue-500 hover:text-blue-600 flex items-center gap-1 text-sm font-medium transition-colors"
        >
          <Edit2 size={14} /> Edit
        </button>
      </div>
      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
        {children}
      </div>
    </GlassCard>
  );

  const DataRow = ({ label, value, highlight }: { label: string; value: React.ReactNode; highlight?: string }) => (
    <div>
      <div className="text-gray-500 dark:text-slate-400 text-xs mb-0.5">{label}</div>
      <div className={`font-medium ${highlight ? highlight : 'text-gray-900 dark:text-slate-200'}`}>
        {value}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-display">
          Review Your Information
        </h2>
        <p className="text-gray-500 dark:text-slate-400 mt-1 text-sm">
          Please check your details before starting the assessment.
        </p>
      </div>

      <div className="space-y-4">
        <Section title="Personal Information" step={1}>
          <DataRow label="Age" value={`${data.age} years`} />
          <DataRow label="Gender" value={DATA_GENDER_MAP[data.gender] || 'Unknown'} />
        </Section>

        <Section title="Body Measurements" step={2}>
          <DataRow label="Height" value={`${data.height} cm`} />
          <DataRow label="Weight" value={`${data.weight} kg`} />
          <DataRow 
            label="BMI" 
            value={`${bmi} (${bmiCategory?.label || 'Unknown'})`} 
            highlight={bmiCategory ? `text-[${bmiCategory.color}]` : undefined}
          />
        </Section>

        <Section title="Blood Pressure" step={2}>
          <DataRow label="Systolic (Upper)" value={`${data.ap_hi} mmHg`} />
          <DataRow label="Diastolic (Lower)" value={`${data.ap_lo} mmHg`} />
          <DataRow 
            label="Category" 
            value={bpCategory?.label || 'Unknown'}
            highlight={bpCategory ? bpCategory.color.replace('text-', 'text-') : undefined} // Keep tailwind class
          />
        </Section>

        <Section title="Health Indicators" step={3}>
          <DataRow label="Cholesterol" value={DATA_CHOLESTEROL_MAP[data.cholesterol] || 'Unknown'} />
          <DataRow label="Blood Glucose" value={DATA_GLUCOSE_MAP[data.gluc] || 'Unknown'} />
        </Section>

        <Section title="Lifestyle Factors" step={3}>
          <DataRow label="Smoking" value={data.smoke === 1 ? 'Yes' : 'No'} />
          <DataRow label="Alcohol Consumption" value={data.alco === 1 ? 'Yes' : 'No'} />
          <DataRow label="Physical Activity" value={data.active === 1 ? 'Active' : 'Inactive'} />
        </Section>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 p-4 rounded-xl flex gap-3">
        <div className="text-blue-500 mt-0.5">ℹ️</div>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          By clicking "Analyze My Risk", your information will be processed by the connected machine learning model to generate a risk assessment.
        </p>
      </div>
    </motion.div>
  );
}
