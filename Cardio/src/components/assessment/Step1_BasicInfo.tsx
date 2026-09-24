import { motion } from 'framer-motion';
import type { AssessmentInput } from '../../types';
import { GENDER_OPTIONS } from '../../data';
import InputField from '../common/InputField';
import SelectCard from './SelectCard';
import { User, Calendar } from 'lucide-react';

interface Step1Props {
  data: AssessmentInput;
  onChange: (field: keyof AssessmentInput, value: number) => void;
  errors: Partial<Record<keyof AssessmentInput, string>>;
}

export default function Step1_BasicInfo({ data, onChange, errors }: Step1Props) {
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
          Let's Start With You
        </h2>
        <p className="text-gray-500 dark:text-slate-400 mt-1 text-sm">
          Basic personal information to begin your assessment.
        </p>
      </div>

      <div className="space-y-6">
        {/* Age */}
        <InputField
          label="Age"
          id="input-age"
          name="age"
          type="number"
          min={1}
          max={120}
          value={data.age || ''}
          onChange={(e) => onChange('age', parseInt(e.target.value) || 0)}
          placeholder="e.g. 45"
          error={errors.age}
          helpText="Enter your age in years."
          required
          leftIcon={<Calendar size={16} />}
        />

        {/* Gender */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <User size={15} className="text-gray-500" />
            <label className="text-sm font-medium text-gray-700 dark:text-slate-300">
              Gender <span className="text-red-500" aria-hidden="true">*</span>
            </label>
          </div>
          <SelectCard
            options={GENDER_OPTIONS}
            value={data.gender}
            onChange={(v) => onChange('gender', v)}
            columns={3}
          />
          {errors.gender && (
            <p className="text-sm text-red-500 mt-2">⚠ {errors.gender}</p>
          )}
        </div>
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-900/15 border border-blue-100 dark:border-blue-800/40 p-4">
        <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
          <strong>Why do we ask?</strong> Age and gender are established indicators used in cardiovascular
          risk models. This information helps the prediction model provide a more relevant assessment.
        </p>
      </div>
    </motion.div>
  );
}
