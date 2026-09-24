// ─────────────────────────────────────────────────────────────────────────────
// Assessment Input — matches the cardiovascular dataset field names exactly
// ─────────────────────────────────────────────────────────────────────────────
export interface AssessmentInput {
  id?: number;
  age: number;
  gender: number;      // 1 = Female, 2 = Male (dataset convention)
  height: number;      // cm
  weight: number;      // kg
  ap_hi: number;       // systolic blood pressure
  ap_lo: number;       // diastolic blood pressure
  cholesterol: number; // 1 = Normal, 2 = Above Normal, 3 = Well Above Normal
  gluc: number;        // 1 = Normal, 2 = Above Normal, 3 = Well Above Normal
  smoke: number;       // 0 = No, 1 = Yes
  alco: number;        // 0 = No, 1 = Yes
  active: number;      // 0 = Inactive, 1 = Active
}

// Individual model detailed prediction & performance metrics
export interface ModelPredictionDetail {
  prediction: number;
  risk: 'YES' | 'NO';
  probability: number;
  percentage: number;
  performance_percentage: string;
  accuracy_percentage?: string;
}

// Individual model probabilities returned by the backend
export interface ModelPredictions {
  logistic_regression?: number;  // 0.0 – 1.0
  knn?: number;
  naive_bayes?: number;
  decision_tree?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// API Response — flexible to handle various backend response shapes
// ─────────────────────────────────────────────────────────────────────────────
export interface PredictionResponse {
  prediction: number;            // 0 = lower risk / NO, 1 = higher risk / YES
  result?: string;               // e.g. "No Cardio Risk Detected" | "Cardio Risk Detected"
  risk?: 'YES' | 'NO';           // Primary risk assessment: YES / NO
  risk_level?: string;           // e.g. "Lower Risk" | "Higher Risk"
  probability?: number;          // 0.0 – 1.0 (Logistic Regression primary model)
  percentage?: number;           // 0.0 – 100.0%
  performance_percentage?: string; // e.g. "31.28%"
  bmi?: number;
  message?: string;
  recommendations?: string[];
  feature_importance?: Record<string, number>;
  model_predictions?: ModelPredictions; // per-model probability breakdown
  models?: {
    logistic_regression?: ModelPredictionDetail;
    knn?: ModelPredictionDetail;
    naive_bayes?: ModelPredictionDetail;
    decision_tree?: ModelPredictionDetail;
    [key: string]: ModelPredictionDetail | undefined;
  };
  error?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Stored Assessment (history record)
// ─────────────────────────────────────────────────────────────────────────────
export interface Assessment {
  id: string;
  created_at: string;
  input: AssessmentInput;
  result: PredictionResponse;
}

// ─────────────────────────────────────────────────────────────────────────────
// Auth
// ─────────────────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  created_at?: string;
  assessment_count?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Dashboard
// ─────────────────────────────────────────────────────────────────────────────
export interface DashboardData {
  user?: User;
  latest_assessment?: Assessment;
  total_assessments?: number;
  assessments?: Assessment[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Health Insights
// ─────────────────────────────────────────────────────────────────────────────
export interface HealthInsight {
  id: string;
  title: string;
  summary: string;
  category: HealthCategory;
  read_time: number;
  icon: string;
  content?: string;
}

export type HealthCategory =
  | 'Heart Health'
  | 'Blood Pressure'
  | 'Cholesterol'
  | 'Glucose'
  | 'Exercise'
  | 'Nutrition'
  | 'Weight'
  | 'Smoking'
  | 'Alcohol'
  | 'Sleep'
  | 'Stress';

// ─────────────────────────────────────────────────────────────────────────────
// Contact Form
// ─────────────────────────────────────────────────────────────────────────────
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Testimonial
// ─────────────────────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  content: string;
  rating: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────────────
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Field Mapping — user-facing label ↔ API field name
// ─────────────────────────────────────────────────────────────────────────────
export interface FieldMapping {
  key: keyof AssessmentInput;
  label: string;
  description?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Toast
// ─────────────────────────────────────────────────────────────────────────────
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Theme
// ─────────────────────────────────────────────────────────────────────────────
export type Theme = 'light' | 'dark';

// ─────────────────────────────────────────────────────────────────────────────
// Option selectors (SelectCard / ToggleCard)
// ─────────────────────────────────────────────────────────────────────────────
export interface SelectOption {
  label: string;
  value: number;
  description?: string;
  icon?: string;
}
