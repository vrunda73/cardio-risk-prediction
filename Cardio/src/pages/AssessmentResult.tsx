import { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, RefreshCw, LayoutDashboard, ArrowRight, HeartPulse, Activity } from 'lucide-react';
import type { AssessmentInput, PredictionResponse } from '../types';
import { GENERAL_RECOMMENDATIONS } from '../data';
import { getBMICategory, getBPCategory } from '../utils/calculations';

import Button from '../components/common/Button';
import GlassCard from '../components/common/GlassCard';
import SectionHeader from '../components/common/SectionHeader';
import MedicalDisclaimer from '../components/common/MedicalDisclaimer';
import RiskGauge from '../components/charts/RiskGauge';
import FeatureImportanceChart from '../components/charts/FeatureImportanceChart';
import ModelPredictionsPanel from '../components/charts/ModelPredictionsPanel';

export default function AssessmentResult() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const state = location.state as { input: AssessmentInput; result: PredictionResponse } | undefined;
  
  useEffect(() => {
    // Redirect if accessed directly without state
    if (!state?.result || !state?.input) {
      navigate('/assessment');
    }
    window.scrollTo(0, 0);
  }, [state, navigate]);

  if (!state?.result || !state?.input) return null;

  const { input, result } = state;
  const bmiCategory = result.bmi ? getBMICategory(result.bmi) : null;
  const bpCategory = getBPCategory(input.ap_hi, input.ap_lo);

  const isRisk = result.prediction === 1 || result.risk === 'YES';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-950 pt-24 pb-20 print:bg-white print:pt-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 print:hidden">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-display">
              Your Assessment Result
            </h1>
            <p className="text-gray-500 dark:text-slate-400 mt-1">
              Generated on {new Date().toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={handlePrint} leftIcon={<Download size={16} />}>
              Save / Print
            </Button>
            <Link to="/assessment">
              <Button variant="secondary" size="sm" leftIcon={<RefreshCw size={16} />}>
                Retake
              </Button>
            </Link>
          </div>
        </div>

        {/* ─── Prominent Prediction Verdict Banner ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`p-6 sm:p-7 rounded-3xl mb-8 border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-card ${
            isRisk
              ? 'bg-red-50/90 dark:bg-red-950/40 border-red-200 dark:border-red-800/60 text-red-950 dark:text-red-100'
              : 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-950 dark:text-emerald-100'
          }`}
        >
          <div className="flex items-start sm:items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-sm ${
                isRisk
                  ? 'bg-red-100 dark:bg-red-900/60 border border-red-300 dark:border-red-700'
                  : 'bg-emerald-100 dark:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700'
              }`}
            >
              {isRisk ? '⚠️' : '✅'}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider opacity-75 mb-1">
                Final ML Model Prediction
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {isRisk ? '⚠️ YES — Cardio Risk Detected' : '✅ NO — No Cardio Risk Detected'}
              </h2>
              <p className="text-sm opacity-90 mt-1 max-w-2xl leading-relaxed">
                {isRisk
                  ? 'The primary Logistic Regression model detected cardiovascular disease risk patterns for the evaluated clinical features.'
                  : 'The primary Logistic Regression model detected no significant cardiovascular risk patterns for the evaluated clinical features.'}
              </p>
            </div>
          </div>

          <div className="flex sm:flex-col items-baseline sm:items-end justify-between w-full md:w-auto gap-1 bg-white/80 dark:bg-navy-900/80 px-5 py-3.5 rounded-2xl border border-black/5 dark:border-white/10 shrink-0 shadow-sm">
            <span className="text-xs font-semibold text-gray-500 dark:text-slate-400">
              Logistic Regression
            </span>
            <span className={`text-2xl sm:text-3xl font-extrabold ${isRisk ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
              {result.performance_percentage ?? (result.probability !== undefined ? `${(result.probability * 100).toFixed(2)}%` : `${result.percentage ?? 0}%`)}
            </span>
            <span className="text-[11px] text-gray-500 dark:text-slate-400">
              Risk Probability
            </span>
          </div>
        </motion.div>

        {/* Main Result Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          
          {/* Left: The Gauge */}
          <GlassCard className="lg:col-span-1 flex flex-col items-center justify-center p-8 bg-white dark:bg-navy-900 text-center">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-6">
              Overall Result
            </h2>
            <RiskGauge probability={result.probability} riskLevel={result.risk_level} size={240} />
            
            {result.message && (
              <p className="mt-8 text-sm text-gray-600 dark:text-slate-300 leading-relaxed bg-gray-50 dark:bg-navy-800 p-4 rounded-xl">
                {result.message}
              </p>
            )}
          </GlassCard>

          {/* Right: Key Metrics Summary */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GlassCard padding="sm" className="bg-white dark:bg-navy-900 flex items-start gap-4">
               <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 shrink-0">
                 <Activity size={20} />
               </div>
               <div>
                 <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">Blood Pressure</p>
                 <p className="text-lg font-bold text-gray-900 dark:text-white">
                   {input.ap_hi} / {input.ap_lo} <span className="text-sm font-normal text-gray-400">mmHg</span>
                 </p>
                 {bpCategory && (
                   <p className="text-xs mt-1 font-medium" style={{ color: bpCategory.color }}>
                     {bpCategory.label}
                   </p>
                 )}
               </div>
            </GlassCard>
            
            <GlassCard padding="sm" className="bg-white dark:bg-navy-900 flex items-start gap-4">
               <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-500 shrink-0">
                 <HeartPulse size={20} />
               </div>
               <div>
                 <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">BMI</p>
                 <p className="text-lg font-bold text-gray-900 dark:text-white">
                   {result.bmi ?? ((input.weight / ((input.height/100) * (input.height/100))).toFixed(1))}
                 </p>
                 {bmiCategory && (
                   <p className="text-xs mt-1 font-medium" style={{ color: bmiCategory.color }}>
                     {bmiCategory.label}
                   </p>
                 )}
               </div>
            </GlassCard>

            <GlassCard padding="sm" className="bg-white dark:bg-navy-900 sm:col-span-2">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-3 border-b border-gray-100 dark:border-navy-700 pb-2">
                Other Factors Considered
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-xs text-gray-400 block mb-0.5">Age</span>
                  <span className="font-medium text-gray-800 dark:text-slate-200">{input.age}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block mb-0.5">Smoking</span>
                  <span className="font-medium text-gray-800 dark:text-slate-200">{input.smoke ? 'Yes' : 'No'}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block mb-0.5">Activity</span>
                  <span className="font-medium text-gray-800 dark:text-slate-200">{input.active ? 'Active' : 'Inactive'}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block mb-0.5">Cholesterol</span>
                  <span className="font-medium text-gray-800 dark:text-slate-200">
                    {input.cholesterol === 1 ? 'Normal' : input.cholesterol === 2 ? 'Elevated' : 'High'}
                  </span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Feature Importance (if provided) */}
        {result.feature_importance && Object.keys(result.feature_importance).length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-display mb-4">
              Model Insights
            </h3>
            <GlassCard className="bg-white dark:bg-navy-900">
              <FeatureImportanceChart data={result.feature_importance} />
            </GlassCard>
          </div>
        )}

        {/* ─── Per-Model Prediction Breakdown ─────────────────────────────── */}
        {(result.models || result.model_predictions) && (
          <div className="mb-10">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-display">
                  Prediction by Model
                </h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                  Four independent machine learning algorithms analyzed your data.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-700/40 self-start">
                ⚙ Multi-Model Analysis
              </span>
            </div>
            <GlassCard className="bg-white dark:bg-navy-900">
              <ModelPredictionsPanel data={result.model_predictions} models={result.models} />
            </GlassCard>
          </div>
        )}

        {/* Recommendations */}
        <div className="mb-10">
          <SectionHeader
            title="General Health Recommendations"
            subtitle="These are general wellness practices associated with supporting cardiovascular health. They are not personalized medical advice."
            className="mb-6"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(result.recommendations?.length ? result.recommendations.map(r => ({ title: r, description: '', icon: '💡' })) : GENERAL_RECOMMENDATIONS.slice(0, 6)).map((rec, i) => (
              <GlassCard key={i} padding="sm" className="bg-white dark:bg-navy-900 h-full">
                <div className="flex items-start gap-3">
                  {typeof rec === 'object' && 'icon' in rec ? (
                    <div className="text-2xl mt-1">{rec.icon}</div>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                      {typeof rec === 'object' && 'title' in rec ? rec.title : rec}
                    </h4>
                    {typeof rec === 'object' && 'description' in rec && (
                      <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                        {rec.description}
                      </p>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Next Steps (hidden when printing) */}
        <div className="mb-12 print:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/dashboard" className="block h-full">
            <GlassCard hover className="h-full bg-gradient-to-br from-blue-600 to-blue-700 !border-none !text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                  <LayoutDashboard size={18} /> View Dashboard
                </h3>
                <p className="text-blue-100 text-sm">Track your assessments over time.</p>
              </div>
              <ArrowRight className="text-white opacity-80" />
            </GlassCard>
          </Link>
          <Link to="/health-insights" className="block h-full">
            <GlassCard hover className="h-full bg-white dark:bg-navy-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">
                  Explore Insights
                </h3>
                <p className="text-gray-500 dark:text-slate-400 text-sm">Read educational articles on heart health.</p>
              </div>
              <ArrowRight className="text-gray-400" />
            </GlassCard>
          </Link>
        </div>

        <MedicalDisclaimer />
      </div>
    </div>
  );
}
