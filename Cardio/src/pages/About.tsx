import { motion } from 'framer-motion';
import SectionHeader from '../components/common/SectionHeader';
import GlassCard from '../components/common/GlassCard';
import { Target, Activity, ShieldCheck, Heart } from 'lucide-react';
import MedicalDisclaimer from '../components/common/MedicalDisclaimer';

export default function About() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="section-padding bg-navy-950 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-90" />
        <div className="container-max relative z-10 py-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-display mb-6"
          >
            About <span className="text-teal-400">CardioSense AI</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed"
          >
            Bridging the gap between complex health data and clear, actionable awareness.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-gray-50 dark:bg-navy-900">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader title="Our Mission" badge="Purpose" />
              <p className="text-gray-600 dark:text-slate-300 leading-relaxed mb-6 text-lg">
                Cardiovascular disease remains a leading health challenge globally. Yet, many people struggle to understand how their lifestyle choices and basic health metrics combine to influence their overall risk.
              </p>
              <p className="text-gray-600 dark:text-slate-300 leading-relaxed text-lg">
                Our mission is to make cardiovascular risk awareness accessible, understandable, and visually engaging. By leveraging modern technology, we aim to empower individuals to have more informed conversations with their healthcare providers.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <GlassCard padding="lg" className="bg-white dark:bg-navy-800 text-center flex flex-col items-center">
                <Target size={32} className="text-blue-500 mb-4" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Clarity</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400">Making complex data easy to read.</p>
              </GlassCard>
              <GlassCard padding="lg" className="bg-white dark:bg-navy-800 text-center flex flex-col items-center mt-8">
                <Heart size={32} className="text-red-500 mb-4" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Health First</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400">Focusing on educational awareness.</p>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="section-padding bg-white dark:bg-navy-950">
        <div className="container-max">
          <SectionHeader
            title="Our Technology"
            subtitle="How we bring data and design together."
            centered
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlassCard hover padding="lg" className="bg-gray-50 dark:bg-navy-900 border-gray-100 dark:border-navy-700">
              <Activity size={28} className="text-blue-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Machine Learning</h3>
              <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm">
                Our assessment relies on a connected prediction API trained on established cardiovascular health datasets, allowing it to evaluate multiple indicators simultaneously.
              </p>
            </GlassCard>
            <GlassCard hover padding="lg" className="bg-gray-50 dark:bg-navy-900 border-gray-100 dark:border-navy-700">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Data Visualization</h3>
              <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm">
                We use modern web technologies, including interactive charts and 3D rendering, to present your results in a way that is immediately understandable.
              </p>
            </GlassCard>
            <GlassCard hover padding="lg" className="bg-gray-50 dark:bg-navy-900 border-gray-100 dark:border-navy-700">
              <ShieldCheck size={28} className="text-teal-500 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Privacy & Security</h3>
              <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm">
                Your health data is transmitted securely to the assessment service and is never sold to third-party advertisers. We prioritize your privacy at every step.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Responsible AI */}
      <section className="section-padding bg-blue-50 dark:bg-navy-900">
        <div className="container-max max-w-4xl text-center">
          <SectionHeader
            title="Responsible AI"
            subtitle="Understanding the limits of technology."
            centered
          />
          <div className="mt-8 text-left bg-white dark:bg-navy-800 p-8 rounded-3xl shadow-xl">
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-6">
              Artificial Intelligence and Machine Learning are powerful tools for pattern recognition in large datasets. However, they are statistical models, not medical professionals.
            </p>
            <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-8">
              The CardioSense AI tool is designed to provide an <strong>estimated assessment</strong> based on the information provided. It does not account for your complete medical history, genetics, or nuanced clinical factors that a doctor would consider.
            </p>
            <MedicalDisclaimer />
          </div>
        </div>
      </section>
    </div>
  );
}
