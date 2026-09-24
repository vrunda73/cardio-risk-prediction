import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Zap, BarChart3, Heart, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';
import SectionHeader from '../components/common/SectionHeader';
import GlassCard from '../components/common/GlassCard';
import Heart3D from '../components/3d/Heart3D';
import ECGAnimation from '../components/3d/ECGAnimation';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ─────────────────────────────────────────────────────────────────────────────
          Hero Section
      ───────────────────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-hero-gradient">
        {/* Background elements */}
        <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-200 text-sm font-semibold mb-6 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                AI-Assisted Assessment
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight font-display mb-6">
                Understand Your <span className="gradient-text">Heart Health</span> Before It's Too Late.
              </h1>
              
              <p className="text-lg sm:text-xl text-blue-100/90 leading-relaxed mb-10 max-w-xl">
                An advanced cardiovascular risk assessment designed to help you understand important health factors and make informed lifestyle decisions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/assessment">
                  <Button variant="primary" size="xl" fullWidth>
                    Start My Assessment
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button variant="secondary" size="xl" fullWidth>
                    How It Works
                  </Button>
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6 text-sm font-medium text-blue-200/80">
                <div className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-teal-400"/> Privacy Focused</div>
                <div className="flex items-center gap-1.5"><Zap size={16} className="text-teal-400"/> Quick & Easy</div>
                <div className="flex items-center gap-1.5"><BarChart3 size={16} className="text-teal-400"/> Data-Driven</div>
              </div>
            </motion.div>

            {/* Right: 3D Heart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[300px] sm:h-[430px] lg:h-[600px] w-full"
            >
              <Heart3D className="w-full h-full" />
              
              {/* Floating badges around heart */}
              <motion.div 
                className="absolute top-1/4 left-2 sm:left-4 glass-dark px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-semibold text-white animate-float"
                style={{ animationDelay: '0s' }}
              >
                AI Risk Analysis
              </motion.div>
              <motion.div 
                className="absolute bottom-1/4 right-2 sm:right-4 glass-dark px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-semibold text-white animate-float"
                style={{ animationDelay: '1.5s' }}
              >
                Personalized Insights
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          ECG Divider
      ───────────────────────────────────────────────────────────────────────────── */}
      <div className="w-full h-24 bg-navy-950 flex items-center overflow-hidden">
        <ECGAnimation color="#22d3ee" height={80} />
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          Trust / Features Section
      ───────────────────────────────────────────────────────────────────────────── */}
      <section className="section-padding bg-gray-50 dark:bg-navy-900">
        <div className="container-max">
          <SectionHeader
            badge="Features"
            title="Smarter Health Insights"
            subtitle="Our assessment combines your basic health information with advanced statistical modeling to provide a clearer picture of your cardiovascular health."
            centered
            className="mb-16"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard hover className="flex flex-col items-start bg-white dark:bg-navy-800">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5">
                <Activity size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">AI-Assisted</h3>
              <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed">
                Health data is analyzed through our connected prediction system based on established cardiovascular datasets.
              </p>
            </GlassCard>
            
            <GlassCard hover className="flex flex-col items-start bg-white dark:bg-navy-800">
              <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-5">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Data-Driven</h3>
              <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed">
                The assessment evaluates multiple health and lifestyle indicators together rather than in isolation.
              </p>
            </GlassCard>

            <GlassCard hover className="flex flex-col items-start bg-white dark:bg-navy-800">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-5">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Quick & Easy</h3>
              <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed">
                Complete the step-by-step assessment in just a few minutes using basic health measurements.
              </p>
            </GlassCard>

            <GlassCard hover className="flex flex-col items-start bg-white dark:bg-navy-800">
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-5">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Clear Results</h3>
              <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed">
                Results are presented using clear visualizations without overwhelming medical jargon.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          Why It Matters
      ───────────────────────────────────────────────────────────────────────────── */}
      <section className="section-padding bg-white dark:bg-navy-950">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                badge="Education"
                title="Your Heart Health Is Shaped by More Than One Number."
                subtitle="Cardiovascular risk is complex. It's the combination of multiple factors — blood pressure, cholesterol, lifestyle choices, and age — that paints the full picture of your health."
              />
              
              <div className="mt-8 space-y-4">
                {[
                  'Elevated blood pressure strains your heart over time.',
                  'High cholesterol can lead to arterial changes.',
                  'Physical inactivity weakens cardiovascular efficiency.',
                  'Smoking damages blood vessels and reduces oxygen.'
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-gray-700 dark:text-slate-300 font-medium">{text}</p>
                  </div>
                ))}
              </div>

              <Link to="/heart-health" className="inline-block mt-8">
                <Button variant="outline" rightIcon={<ArrowRight size={16} />}>
                  Learn About Risk Factors
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-teal-500/10 rounded-[2.5rem] transform rotate-3" />
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Healthcare professional reviewing data" 
                className="rounded-3xl shadow-2xl relative z-10 object-cover h-[320px] sm:h-[420px] lg:h-[500px] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          Final CTA
      ───────────────────────────────────────────────────────────────────────────── */}
      <section className="section-padding bg-blue-600 dark:bg-blue-900 relative overflow-hidden">
        {/* Abstract BG */}
        <div className="absolute inset-0 opacity-10">
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container-max relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white font-display mb-6">
              Your Heart Deserves Your Attention.
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Take a simple 3-minute assessment and understand the health factors that matter most to your cardiovascular future.
            </p>
            <Link to="/assessment">
              <Button 
                className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                rightIcon={<ArrowRight size={20} />}
              >
                Start My Assessment Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Simple check icon for list
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
