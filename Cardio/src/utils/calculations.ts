// BMI Calculation
export function calculateBMI(weightKg: number, heightCm: number): number {
  if (heightCm <= 0 || weightKg <= 0) return 0;
  const heightM = heightCm / 100;
  return parseFloat((weightKg / (heightM * heightM)).toFixed(1));
}

export function getBMICategory(bmi: number): {
  label: string;
  color: string;
  description: string;
  min: number;
  max: number;
} {
  if (bmi < 18.5)
    return { label: 'Underweight', color: '#60a5fa', description: 'Below normal range', min: 0, max: 18.5 };
  if (bmi < 25)
    return { label: 'Normal Weight', color: '#10b981', description: 'Healthy range', min: 18.5, max: 25 };
  if (bmi < 30)
    return { label: 'Overweight', color: '#f59e0b', description: 'Above normal range', min: 25, max: 30 };
  return { label: 'Obese', color: '#ef4444', description: 'Significantly above normal range', min: 30, max: 45 };
}

// Blood Pressure Categories
export function getBPCategory(systolic: number, diastolic: number) {
  if (!systolic || !diastolic) return null;
  if (systolic < 120 && diastolic < 80)
    return { label: 'Normal', color: '#10b981', description: 'Optimal range', severity: 0 };
  if (systolic < 130 && diastolic < 80)
    return { label: 'Elevated', color: '#f59e0b', description: 'Slightly above normal', severity: 1 };
  if (systolic < 140 || diastolic < 90)
    return { label: 'High — Stage 1', color: '#f97316', description: 'Consult a healthcare provider', severity: 2 };
  if (systolic >= 180 || diastolic >= 120)
    return { label: 'Crisis — Seek Care', color: '#991b1b', description: 'Seek immediate medical attention', severity: 4 };
  return { label: 'High — Stage 2', color: '#ef4444', description: 'Seek medical advice', severity: 3 };
}

// Format a probability (0–1) as a percentage string
export function formatProbability(probability: number): string {
  return `${Math.round(probability * 100)}%`;
}

// Format a number to one decimal place
export function formatNumber(n: number, decimals = 1): string {
  return n.toFixed(decimals);
}

// Format a date string to a readable format
export function formatDate(dateString: string): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
}

// Clamp a value between min and max
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// Validate assessment input
export function validateAssessmentStep(
  step: number,
  data: Partial<{
    age: number;
    gender: number;
    height: number;
    weight: number;
    ap_hi: number;
    ap_lo: number;
  }>,
): string[] {
  const errors: string[] = [];
  if (step === 1) {
    if (!data.age || data.age < 1 || data.age > 120)
      errors.push('Please enter a valid age between 1 and 120.');
    if (!data.gender) errors.push('Please select a gender.');
  }
  if (step === 2) {
    if (!data.height || data.height < 50 || data.height > 250)
      errors.push('Please enter a valid height between 50 and 250 cm.');
    if (!data.weight || data.weight < 20 || data.weight > 300)
      errors.push('Please enter a valid weight between 20 and 300 kg.');
    if (!data.ap_hi || data.ap_hi < 60 || data.ap_hi > 300)
      errors.push('Please enter a valid systolic blood pressure.');
    if (!data.ap_lo || data.ap_lo < 40 || data.ap_lo > 200)
      errors.push('Please enter a valid diastolic blood pressure.');
    if (data.ap_lo && data.ap_hi && data.ap_lo >= data.ap_hi)
      errors.push('Diastolic pressure must be lower than systolic pressure.');
  }
  return errors;
}

// Validate email
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
