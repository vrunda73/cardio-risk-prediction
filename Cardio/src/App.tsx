import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Providers
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Layout & Common
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ToastContainer from './components/common/ToastContainer';
import { FullPageLoader } from './components/common/LoadingState';

// Lazy loaded pages (Implemented)
const Home = lazy(() => import('./pages/Home'));
const Assessment = lazy(() => import('./pages/Assessment'));
const AssessmentResult = lazy(() => import('./pages/AssessmentResult'));
const About = lazy(() => import('./pages/About'));
const HeartHealth = lazy(() => import('./pages/HeartHealth'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const HealthInsights = lazy(() => import('./pages/HealthInsights'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Temporary Fallback Pages (until implemented)
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-screen flex items-center justify-center pt-20 bg-gray-50 dark:bg-navy-950">
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h1>
      <p className="text-gray-500 dark:text-slate-400">This page is currently under construction in the frontend prototype.</p>
    </div>
  </div>
);

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <Router>
            <div className="flex flex-col min-h-screen selection:bg-blue-500/30">
              <Navbar />
              
              <main className="flex-grow">
                <Suspense fallback={<FullPageLoader message="Loading application..." />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/assessment" element={<Assessment />} />
                    <Route path="/assessment/result" element={<AssessmentResult />} />
                    
                    <Route path="/about" element={<About />} />
                    <Route path="/heart-health" element={<HeartHealth />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/health-insights" element={<HealthInsights />} />
                    
                    <Route path="/dashboard" element={<Dashboard />} />
                    
                    {/* Placeholders for unimplemented routes */}
                    <Route path="/testimonials" element={<PlaceholderPage title="Testimonials" />} />
                    <Route path="/faq" element={<PlaceholderPage title="FAQ" />} />
                    <Route path="/contact" element={<PlaceholderPage title="Contact" />} />
                    <Route path="/assessments" element={<PlaceholderPage title="Assessment History" />} />
                    <Route path="/profile" element={<PlaceholderPage title="Profile" />} />
                    <Route path="/register" element={<PlaceholderPage title="Register" />} />
                    <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
                    <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
                    
                    <Route path="*" element={<PlaceholderPage title="404 - Page Not Found" />} />
                  </Routes>
                </Suspense>
              </main>

              <Footer />
              <ToastContainer />
            </div>
          </Router>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
