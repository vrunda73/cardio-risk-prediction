import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  AssessmentInput,
  PredictionResponse,
  Assessment,
  User,
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  DashboardData,
  ContactForm,
  ContactResponse,
} from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// API Configuration
// ─────────────────────────────────────────────────────────────────────────────
const API_URL = import.meta.env.VITE_API_URL || 'https://cardio-risk-prediction-qlox.onrender.com';
const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

// ─────────────────────────────────────────────────────────────────────────────
// Axios Instance
// ─────────────────────────────────────────────────────────────────────────────
const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000,
});

// Attach auth token to all requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('cardiosense_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 — clear token and redirect to login
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('cardiosense_token');
      localStorage.removeItem('cardiosense_user');
      // Don't redirect forcibly — let the component handle it
    }
    return Promise.reject(error);
  },
);

// ─────────────────────────────────────────────────────────────────────────────
// Demo Data
// ─────────────────────────────────────────────────────────────────────────────
const DEMO_PREDICTION: PredictionResponse = {
  prediction: 0,
  result: 'No Cardio Risk Detected',
  risk: 'NO',
  risk_level: 'Lower Risk',
  probability: 0.23,
  percentage: 23.0,
  performance_percentage: '23.00%',
  bmi: 24.8,
  message: '[DEMO MODE] This is sample data for visual development.',
  recommendations: [
    'Maintain a regular exercise routine of at least 150 minutes per week.',
    'Monitor your blood pressure regularly.',
    'Follow a heart-healthy, balanced diet.',
    'Schedule regular check-ups with your healthcare provider.',
  ],
  feature_importance: {
    age: 0.35,
    ap_hi: 0.28,
    cholesterol: 0.18,
    bmi: 0.12,
    active: 0.07,
  },
  model_predictions: {
    logistic_regression: 0.21,
    knn: 0.26,
    naive_bayes: 0.19,
    decision_tree: 0.28,
  },
  models: {
    logistic_regression: {
      prediction: 0,
      risk: 'NO',
      probability: 0.21,
      percentage: 21.0,
      performance_percentage: '21.00%',
      accuracy_percentage: '72.79%',
    },
    knn: {
      prediction: 0,
      risk: 'NO',
      probability: 0.26,
      percentage: 26.0,
      performance_percentage: '26.00%',
      accuracy_percentage: '69.16%',
    },
    naive_bayes: {
      prediction: 0,
      risk: 'NO',
      probability: 0.19,
      percentage: 19.0,
      performance_percentage: '19.00%',
      accuracy_percentage: '71.45%',
    },
    decision_tree: {
      prediction: 0,
      risk: 'NO',
      probability: 0.28,
      percentage: 28.0,
      performance_percentage: '28.00%',
      accuracy_percentage: '63.05%',
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Helper — extract error message
// ─────────────────────────────────────────────────────────────────────────────
function extractError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (typeof data === 'object' && data !== null) {
      return (data as Record<string, string>).detail
        || (data as Record<string, string>).message
        || (data as Record<string, string>).error
        || 'An unexpected error occurred.';
    }
    if (error.code === 'ECONNABORTED') return 'Request timed out. Please try again.';
    if (!error.response) return 'Unable to connect to prediction server. Please make sure the FastAPI backend is running.';
  }
  return 'An unexpected error occurred.';
}

// ─────────────────────────────────────────────────────────────────────────────
// Prediction / Assessment
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Submit health data to the prediction API.
 * In DEMO_MODE, returns static mock data with a brief delay.
 */
export async function predictCardiovascularRisk(
  data: AssessmentInput,
): Promise<PredictionResponse> {
  if (DEMO_MODE) {
    await new Promise((r) => setTimeout(r, 3000));
    return DEMO_PREDICTION;
  }
  try {
    const response = await apiClient.post<PredictionResponse>('/predict', data);
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Authentication
// ─────────────────────────────────────────────────────────────────────────────

export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
  try {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
}

export async function registerUser(credentials: RegisterCredentials): Promise<AuthResponse> {
  try {
    const response = await apiClient.post<AuthResponse>('/auth/register', credentials);
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
}

export async function getCurrentUser(): Promise<User> {
  try {
    const response = await apiClient.get<User>('/auth/me');
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await apiClient.post('/auth/logout');
  } finally {
    localStorage.removeItem('cardiosense_token');
    localStorage.removeItem('cardiosense_user');
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Dashboard
// ─────────────────────────────────────────────────────────────────────────────

export async function getDashboard(): Promise<DashboardData> {
  try {
    const response = await apiClient.get<DashboardData>('/dashboard');
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Assessment History
// ─────────────────────────────────────────────────────────────────────────────

export async function getAssessments(): Promise<Assessment[]> {
  try {
    const response = await apiClient.get<Assessment[]>('/assessments');
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
}

export async function getAssessmentById(id: string): Promise<Assessment> {
  try {
    const response = await apiClient.get<Assessment>(`/assessments/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
}

export async function deleteAssessment(id: string): Promise<void> {
  try {
    await apiClient.delete(`/assessments/${id}`);
  } catch (error) {
    throw new Error(extractError(error));
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact
// ─────────────────────────────────────────────────────────────────────────────

export async function submitContactForm(data: ContactForm): Promise<ContactResponse> {
  try {
    const response = await apiClient.post<ContactResponse>('/contact', data);
    return response.data;
  } catch (error) {
    throw new Error(extractError(error));
  }
}

export { DEMO_MODE, API_URL };
export default apiClient;
