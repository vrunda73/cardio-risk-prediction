import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';
import MedicalDisclaimer from '../common/MedicalDisclaimer';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-navy-950 border-t border-gray-200 dark:border-navy-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
          {/* Column 1: Brand */}
          <div className="lg:pr-4">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center text-white">
                <Activity size={18} strokeWidth={2.5} />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                CardioSense <span className="text-blue-600 dark:text-blue-400 font-black">AI</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed mb-6">
              AI-assisted cardiovascular risk assessment designed to make health information easier to understand and act upon.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors" aria-label="Twitter">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors" aria-label="GitHub">
                GitHub
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors" aria-label="LinkedIn">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/assessment" className="text-sm text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Start Assessment
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/health-insights" className="text-sm text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Health Insights
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-sm text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-sm text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-sm text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <MedicalDisclaimer compact className="mb-6" />

        <div className="border-t border-gray-100 dark:border-navy-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400 dark:text-slate-500">
            &copy; {currentYear} CardioSense AI. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="text-xs text-gray-400 dark:text-slate-600 font-medium tracking-wide">
              DESIGNED FOR EDUCATIONAL PURPOSES
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
