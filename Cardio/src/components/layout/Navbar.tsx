import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import { useTheme } from '../../context/ThemeContext';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Heart Health', path: '/heart-health' },
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'Insights', path: '/health-insights' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navClass = `
    fixed top-0 inset-x-0 z-50 transition-all duration-300
    ${isScrolled
      ? 'bg-white/88 dark:bg-navy-950/85 backdrop-blur-xl border-b border-gray-200/70 dark:border-white/10 shadow-[0_4px_24px_rgba(15,23,42,0.06)]'
      : 'bg-transparent border-b border-transparent'
    }
  `;

  return (
    <>
      <nav className={navClass}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center text-white shadow-lg group-hover:shadow-glow-blue transition-all">
                <Activity size={22} strokeWidth={2.5} />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                CardioSense <span className="text-blue-600 dark:text-blue-400 font-black">AI</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => `
                    px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                    ${isActive
                      ? 'text-blue-700 dark:text-blue-300 bg-blue-50/90 dark:bg-blue-900/25 shadow-sm'
                      : 'text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-navy-800/50'
                    }
                  `}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Desktop Right Actions */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-white transition-colors hover:bg-gray-100 dark:hover:bg-navy-800"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>

              <Link to="/assessment">
                <Button variant="primary" size="sm">
                  Start Assessment
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 dark:text-slate-400"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-navy-800 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white dark:bg-navy-950 pt-24 px-6 pb-6 overflow-y-auto md:hidden"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) => `
                      px-4 py-3 rounded-xl text-lg font-semibold
                      ${isActive
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'text-gray-900 dark:text-slate-200'
                      }
                    `}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>

              <div className="h-px bg-gray-200 dark:bg-navy-800 w-full" />

              <div className="flex flex-col gap-3">
                <Link to="/assessment" className="w-full">
                  <Button variant="primary" fullWidth size="lg">
                    Start Assessment
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
