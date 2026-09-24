import { ShieldAlert } from 'lucide-react';

interface MedicalDisclaimerProps {
  compact?: boolean;
  className?: string;
}

export default function MedicalDisclaimer({ compact = false, className = '' }: MedicalDisclaimerProps) {
  if (compact) {
    return (
      <p className={`text-xs text-amber-700 dark:text-amber-400 text-center ${className}`}>
        <ShieldAlert className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />
        For educational purposes only — not a medical diagnosis. Always consult a qualified healthcare professional.
      </p>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-amber-200 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-900/15 p-5 ${className}`}
      role="note"
      aria-label="Medical disclaimer"
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-800/50 flex items-center justify-center">
          <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-1 text-sm">
            Important Medical Disclaimer
          </h4>
          <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
            CardioSense AI provides an estimated cardiovascular risk assessment for educational
            purposes. It does not provide a medical diagnosis and should not replace professional
            medical advice, diagnosis, or treatment. Always consult a qualified healthcare
            professional regarding any health concerns.
          </p>
        </div>
      </div>
    </div>
  );
}
