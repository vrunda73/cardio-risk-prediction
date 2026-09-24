import { motion } from 'framer-motion';
import { ClipboardList, Send, BrainCircuit, LineChart } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import GlassCard from '../components/common/GlassCard';
import Heart3D from '../components/3d/Heart3D';

const STEPS = [
  {
    icon: <ClipboardList size={32} />,
    title: 'Enter Your Information',
    description: 'Provide basic health measurements and lifestyle details in our simple, secure form. We only ask for information relevant to the assessment.',
  },
  {
    icon: <Send size={32} />,
    title: 'Data is Submitted',
    description: 'Your information is securely transmitted to our connected prediction service. No personal identifiers are required for the assessment.',
  },
  {
    icon: <BrainCircuit size={32} />,
    title: 'AI Model Analyzes It',
    description: 'An existing Machine Learning model, trained on cardiovascular datasets, evaluates how your indicators combine to estimate risk.',
  },
  {
    icon: <LineChart size={32} />,
    title: 'Understand Your Result',
    description: 'Receive a clear, visual report detailing your estimated risk level, the factors considered, and general health recommendations.',
  },
];

export default function HowItWorks() {
  return (
    <div className="pt-24 pb-20 bg-white dark:bg-navy-950 min-h-screen overflow-hidden">
      <div className="container-max">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <SectionHeader
            title="How the Assessment Works"
            subtitle="From your input to actionable insights in four simple steps."
            centered
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-blue-200 via-teal-200 to-blue-200 dark:from-navy-700 dark:via-blue-800 dark:to-navy-700 hidden sm:block" />

            <div className="space-y-12">
              {STEPS.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-start gap-6"
                >
                  {/* Icon Circle */}
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-white dark:bg-navy-900 border-4 border-blue-50 dark:border-navy-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-xl hidden sm:flex">
                    {step.icon}
                  </div>
                  
                  {/* Content Card */}
                  <GlassCard hover className="flex-1 bg-gray-50 dark:bg-navy-900 border border-gray-100 dark:border-navy-700">
                    <div className="flex items-center gap-3 mb-3 sm:hidden text-blue-600 dark:text-blue-400">
                       {step.icon}
                    </div>
                    <div className="text-sm font-bold text-blue-500 mb-1 tracking-wider uppercase">
                      Step {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-slate-400 leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] lg:h-[700px] flex items-center justify-center hidden lg:flex"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 rounded-[3rem] -rotate-3" />
            <Heart3D className="w-full h-full scale-110" reduced />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
