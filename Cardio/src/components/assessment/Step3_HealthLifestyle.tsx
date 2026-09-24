import { motion } from 'framer-motion';
import type { AssessmentInput } from '../../types';
import { CHOLESTEROL_OPTIONS, GLUCOSE_OPTIONS } from '../../data';
import SelectCard from './SelectCard';
import ToggleCard from './ToggleCard';

interface Step3Props {
  data: AssessmentInput;
  onChange: (field: keyof AssessmentInput, value: number) => void;
}

export default function Step3_HealthLifestyle({ data, onChange }: Step3Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-display">
          Your Health & Lifestyle
        </h2>
        <p className="text-gray-500 dark:text-slate-400 mt-1 text-sm">
          Health indicators and lifestyle factors used in the assessment model.
        </p>
      </div>

      {/* Cholesterol */}
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-slate-300">
            Cholesterol Level <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
            Choose the category that best matches your most recent reading.
          </p>
        </div>
        <SelectCard
          options={CHOLESTEROL_OPTIONS}
          value={data.cholesterol}
          onChange={(v) => onChange('cholesterol', v)}
          columns={3}
        />
      </div>

      {/* Glucose */}
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-slate-300">
            Blood Glucose Level <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
            Choose the category that best matches your most recent result.
          </p>
        </div>
        <SelectCard
          options={GLUCOSE_OPTIONS}
          value={data.gluc}
          onChange={(v) => onChange('gluc', v)}
          columns={3}
        />
      </div>

      {/* Lifestyle toggles */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700 dark:text-slate-300">Lifestyle Factors</label>
        <ToggleCard
          label="Smoking"
          description="Are you a current smoker?"
          value={data.smoke}
          onChange={(v) => onChange('smoke', v)}
          icon="🚭"
        />
        <ToggleCard
          label="Alcohol Consumption"
          description="Do you regularly consume alcohol?"
          value={data.alco}
          onChange={(v) => onChange('alco', v)}
          icon="🍷"
        />
        <ToggleCard
          label="Physical Activity"
          description="Are you physically active on a regular basis?"
          value={data.active}
          onChange={(v) => onChange('active', v)}
          yesLabel="Active"
          noLabel="Inactive"
          icon="🏃"
        />
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-900/15 border border-blue-100 dark:border-blue-800/40 p-4">
        <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
          <strong>Not sure about your cholesterol or glucose?</strong> If you haven't had a recent blood
          test, choose "Normal" as a starting point, and discuss testing with your healthcare provider.
        </p>
      </div>
    </motion.div>
  );
}
