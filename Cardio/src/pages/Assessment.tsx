import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ShieldAlert } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { predictCardiovascularRisk } from '../services/api';
import type { AssessmentInput } from '../types';
import { DEFAULT_ASSESSMENT } from '../data';
import { validateAssessmentStep } from '../utils/calculations';

// Components
import Button from '../components/common/Button';
import MedicalDisclaimer from '../components/common/MedicalDisclaimer';
import AssessmentProgress from '../components/assessment/AssessmentProgress';
import Step1_BasicInfo from '../components/assessment/Step1_BasicInfo';
import Step2_BodyMeasurements from '../components/assessment/Step2_BodyMeasurements';
import Step3_HealthLifestyle from '../components/assessment/Step3_HealthLifestyle';
import Step4_Review from '../components/assessment/Step4_Review';
import AnalysisLoader from '../components/assessment/AnalysisLoader';

export default function Assessment() {
  const navigate = useNavigate();
  const { error } = useToast();
  
  const [step, setStep] = useState(1);
  const [data, setData] = useState<AssessmentInput>(DEFAULT_ASSESSMENT);
  const [errors, setErrors] = useState<Partial<Record<keyof AssessmentInput, string>>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const handleChange = (field: keyof AssessmentInput, value: number) => {
    setData((prev) => ({ ...prev, [field]: value }));
    // Clear error for field when changed
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateCurrentStep = (): boolean => {
    const stepErrors = validateAssessmentStep(step, data);
    if (stepErrors.length > 0) {
      // For simplicity, just map the first error string to a general form error, or map specific fields if you expanded the util.
      // The util returns an array of strings. We'll show a toast for the first one.
      error('Please complete all required fields correctly', stepErrors[0]);
      
      // Basic field-level highlighting (could be improved with a more robust validation library like Zod)
      const newErrors: Partial<Record<keyof AssessmentInput, string>> = {};
      if (step === 1) {
        if (!data.age || data.age < 1) newErrors.age = 'Required';
        if (!data.gender) newErrors.gender = 'Required';
      }
      if (step === 2) {
        if (!data.height) newErrors.height = 'Required';
        if (!data.weight) newErrors.weight = 'Required';
        if (!data.ap_hi) newErrors.ap_hi = 'Required';
        if (!data.ap_lo) newErrors.ap_lo = 'Required';
      }
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return;
    
    setIsAnalyzing(true);
    
    try {
      // Call API
      const result = await predictCardiovascularRisk(data);
      
      // In a real app with global state/redux, we'd store the result.
      // For this frontend-only build, we'll pass it via location state.
      navigate('/assessment/result', { state: { input: data, result } });
      
    } catch (err: any) {
      error('Assessment Failed', err.message);
      setIsAnalyzing(false);
    }
  };

  if (isAnalyzing) {
    return <AnalysisLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-950 pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Stepper */}
        <div className="mb-10">
          <AssessmentProgress currentStep={step} />
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-navy-900 rounded-3xl shadow-card dark:shadow-glass-dark border border-gray-100 dark:border-navy-700 overflow-hidden mb-6">
          <div className="p-6 sm:p-10 min-h-[400px]">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <Step1_BasicInfo key="s1" data={data} onChange={handleChange} errors={errors} />
              )}
              {step === 2 && (
                <Step2_BodyMeasurements key="s2" data={data} onChange={handleChange} errors={errors} />
              )}
              {step === 3 && (
                <Step3_HealthLifestyle key="s3" data={data} onChange={handleChange} />
              )}
              {step === 4 && (
                <Step4_Review key="s4" data={data} onEdit={setStep} />
              )}
            </AnimatePresence>
          </div>

          {/* Footer Actions */}
          <div className="px-4 py-4 sm:px-10 sm:py-5 bg-gray-50 dark:bg-navy-800/50 border-t border-gray-100 dark:border-navy-700 flex items-center justify-between gap-3">
            {step > 1 ? (
              <Button variant="ghost" onClick={handleBack} leftIcon={<ChevronLeft size={18} />}>
                Back
              </Button>
            ) : (
              <div></div> // Empty div for spacing if no back button
            )}

            {step < 4 ? (
              <Button variant="primary" onClick={handleNext} rightIcon={<ChevronRight size={18} />}>
                Next Step
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={handleSubmit}
                className="px-8 shadow-glow-blue"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze My Risk'}
              </Button>
            )}
          </div>
        </div>

        <MedicalDisclaimer compact />
      </div>
    </div>
  );
}
