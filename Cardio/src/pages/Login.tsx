import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/common/Button';
import InputField from '../components/common/InputField';
import GlassCard from '../components/common/GlassCard';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      error('Validation Error', 'Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In demo mode, any login works
      login('demo-token', { id: '1', name: 'Demo User', email });
      success('Welcome back!', 'Successfully logged in to your account.');
      navigate('/dashboard');
    } catch (err) {
      error('Login Failed', 'Invalid credentials or server error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-950 flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-display mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 dark:text-slate-400">
            Sign in to access your assessment history.
          </p>
        </div>

        <GlassCard className="bg-white dark:bg-navy-900 shadow-xl border border-gray-100 dark:border-navy-700 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail size={18} />}
              required
            />
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-slate-300">
                  Password <span className="text-red-500">*</span>
                </label>
                <a href="#" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  Forgot password?
                </a>
              </div>
              <InputField
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock size={18} />}
                required
              />
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              fullWidth 
              size="lg"
              disabled={isLoading}
              leftIcon={!isLoading && <LogIn size={18} />}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-slate-400">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                Create one now
              </Link>
            </p>
          </div>
          
          {/* Demo helper */}
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-navy-700 text-center">
            <span className="text-xs text-gray-400 bg-gray-50 dark:bg-navy-800 px-3 py-1 rounded-full border border-gray-200 dark:border-navy-700">
              Demo Mode: Any credentials will work.
            </span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
