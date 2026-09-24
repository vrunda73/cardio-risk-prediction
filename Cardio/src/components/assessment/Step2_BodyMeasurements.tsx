import { motion } from 'framer-motion';
import type { AssessmentInput } from '../../types';
import InputField from '../common/InputField';
import BMICard from './BMICard';
import BloodPressureCard from './BloodPressureCard';
import { Ruler, Weight, Activity } from 'lucide-react';

interface Step2Props {
  data: AssessmentInput;
  onChange: (field: keyof AssessmentInput, value: number) => void;
  errors: Partial<Record<keyof AssessmentInput, string>>;
}

export default function Step2_BodyMeasurements({ data, onChange, errors }: Step2Props) {
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
          Body & Blood Pressure
        </h2>
        <p className="text-gray-500 dark:text-slate-400 mt-1 text-sm">
          Physical measurements — BMI is calculated automatically.
        </p>
      </div>

      {/* Height & Weight */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          label="Height"
          id="input-height"
          name="height"
          type="number"
          min={50}
          max={250}
          value={data.height || ''}
          onChange={(e) => onChange('height', parseFloat(e.target.value) || 0)}
          placeholder="e.g. 170"
          error={errors.height}
          helpText="In centimetres (cm)"
          required
          leftIcon={<Ruler size={16} />}
          rightIcon={<span className="text-xs text-gray-400 font-medium">cm</span>}
        />
        <InputField
          label="Weight"
          id="input-weight"
          name="weight"
          type="number"
          min={20}
          max={300}
          value={data.weight || ''}
          onChange={(e) => onChange('weight', parseFloat(e.target.value) || 0)}
          placeholder="e.g. 70"
          error={errors.weight}
          helpText="In kilograms (kg)"
          required
          leftIcon={<Weight size={16} />}
          rightIcon={<span className="text-xs text-gray-400 font-medium">kg</span>}
        />
      </div>

      {/* Live BMI Card */}
      <BMICard height={data.height} weight={data.weight} />

      {/* Blood Pressure */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Activity size={16} className="text-blue-500" />
          <h3 className="font-semibold text-gray-800 dark:text-slate-200">Blood Pressure</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <InputField
            label="Systolic (Upper Number)"
            id="input-ap_hi"
            name="ap_hi"
            type="number"
            min={60}
            max={300}
            value={data.ap_hi || ''}
            onChange={(e) => onChange('ap_hi', parseInt(e.target.value) || 0)}
            placeholder="e.g. 120"
            error={errors.ap_hi}
            helpText="The pressure when your heart beats"
            required
            rightIcon={<span className="text-xs text-gray-400 font-medium">mmHg</span>}
          />
          <InputField
            label="Diastolic (Lower Number)"
            id="input-ap_lo"
            name="ap_lo"
            type="number"
            min={40}
            max={200}
            value={data.ap_lo || ''}
            onChange={(e) => onChange('ap_lo', parseInt(e.target.value) || 0)}
            placeholder="e.g. 80"
            error={errors.ap_lo}
            helpText="The pressure between heartbeats"
            required
            rightIcon={<span className="text-xs text-gray-400 font-medium">mmHg</span>}
          />
        </div>
        <BloodPressureCard systolic={data.ap_hi} diastolic={data.ap_lo} />
      </div>

      <div className="rounded-xl bg-blue-50 dark:bg-blue-900/15 border border-blue-100 dark:border-blue-800/40 p-4">
        <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
          <strong>Tip:</strong> Blood pressure readings are typically displayed as systolic over diastolic
          (e.g. 120/80). If you have a recent reading from a monitor or healthcare provider, use that value.
        </p>
      </div>
    </motion.div>
  );
}
