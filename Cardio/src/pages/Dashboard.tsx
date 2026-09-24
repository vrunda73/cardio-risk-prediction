import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Plus, Clock, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getAssessments } from '../services/api';
import type { Assessment } from '../types';
import { formatDate } from '../utils/calculations';

import Button from '../components/common/Button';
import SectionHeader from '../components/common/SectionHeader';
import GlassCard from '../components/common/GlassCard';
import RiskHistoryChart from '../components/charts/RiskHistoryChart';
import { Spinner, SkeletonCard } from '../components/common/LoadingState';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [history, setHistory] = useState<Assessment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchHistory = async () => {
      try {
        const data = await getAssessments();
        setHistory(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load history');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="pt-24 pb-20 bg-gray-50 dark:bg-navy-950 min-h-screen">
      <div className="container-max">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-display">
              Hello, {user?.name || 'User'}
            </h1>
            <p className="text-gray-500 dark:text-slate-400 mt-1">
              Welcome to your personal dashboard.
            </p>
          </div>
          <Button variant="primary" leftIcon={<Plus size={18} />} onClick={() => navigate('/assessment')}>
            New Assessment
          </Button>
        </div>

        {isLoading ? (
          <GlassCard padding="lg" className="bg-white dark:bg-navy-900 min-h-[400px] flex flex-col items-center justify-center">
            <Spinner size="lg" className="mb-4" />
            <p className="text-gray-500">Loading your health data...</p>
          </GlassCard>
        ) : error ? (
          <GlassCard padding="lg" className="bg-white dark:bg-navy-900 min-h-[400px]">
             <ErrorState 
                title="Error Loading Dashboard" 
                message={error} 
                onRetry={() => window.location.reload()} 
             />
          </GlassCard>
        ) : history.length === 0 ? (
          <GlassCard padding="lg" className="bg-white dark:bg-navy-900 min-h-[400px]">
             <EmptyState 
                icon={<Activity size={48} />}
                title="No Assessments Yet" 
                message="You haven't taken a cardiovascular risk assessment yet. Start one now to establish your baseline."
                action={{ label: 'Start Assessment', onClick: () => navigate('/assessment') }}
             />
          </GlassCard>
        ) : (
          <div className="space-y-8">
            {/* Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GlassCard padding="md" className="bg-white dark:bg-navy-900">
                <h3 className="font-bold text-gray-900 dark:text-white mb-6">Estimated Risk History</h3>
                <RiskHistoryChart assessments={history} mode="risk" />
              </GlassCard>
              
              <GlassCard padding="md" className="bg-white dark:bg-navy-900">
                <h3 className="font-bold text-gray-900 dark:text-white mb-6">Blood Pressure History</h3>
                <RiskHistoryChart assessments={history} mode="bp" />
              </GlassCard>
            </div>

            {/* History Table */}
            <GlassCard padding="md" className="bg-white dark:bg-navy-900 overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Clock size={18} className="text-gray-400" /> Recent Assessments
                </h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 dark:bg-navy-800/50 text-gray-500 dark:text-slate-400">
                    <tr>
                      <th className="px-4 py-3 font-medium rounded-tl-lg">Date</th>
                      <th className="px-4 py-3 font-medium">Risk Level</th>
                      <th className="px-4 py-3 font-medium">BP (mmHg)</th>
                      <th className="px-4 py-3 font-medium">BMI</th>
                      <th className="px-4 py-3 font-medium rounded-tr-lg text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-navy-800">
                    {history.slice(0, 5).map((a) => {
                      const riskNum = a.result.probability !== undefined ? a.result.probability * 100 : 0;
                      const isHigh = riskNum > 50 || a.result.risk_level?.toLowerCase().includes('high');
                      
                      return (
                        <motion.tr 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          key={a.id} 
                          className="hover:bg-gray-50/50 dark:hover:bg-navy-800/30 transition-colors"
                        >
                          <td className="px-4 py-3 text-gray-900 dark:text-slate-200 whitespace-nowrap">
                            {formatDate(a.created_at)}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${isHigh ? 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'}`}>
                              {a.result.risk_level || `${Math.round(riskNum)}%`}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-600 dark:text-slate-400 whitespace-nowrap">
                            {a.input.ap_hi} / {a.input.ap_lo}
                          </td>
                          <td className="px-4 py-3 text-gray-600 dark:text-slate-400">
                            {a.result.bmi}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="!px-2 text-blue-600"
                              onClick={() => navigate('/assessment/result', { state: { input: a.input, result: a.result } })}
                            >
                              View <FileText size={14} className="ml-1" />
                            </Button>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
}
