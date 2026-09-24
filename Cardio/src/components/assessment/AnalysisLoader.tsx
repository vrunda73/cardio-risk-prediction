import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ECGAnimation from '../3d/ECGAnimation';

const MESSAGES = [
  'Analyzing your health profile...',
  'Processing cardiovascular indicators...',
  'Evaluating risk factors...',
  'Preparing your personalized assessment...',
];

export default function AnalysisLoader() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cycle messages every 2.5 seconds
    const msgInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 2500);

    // Fake progress over 10 seconds (in case real API takes long)
    const progInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 5;
      });
    }, 500);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-950 overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle bg-blue-400 w-1 h-1"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${10 + Math.random() * 20}s`,
              animationDelay: `-${Math.random() * 20}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-md px-6">
        {/* Pulsing Heart Icon */}
        <motion.div
          animate={{ scale: [1, 1.15, 1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-6xl sm:text-7xl mb-8 drop-shadow-[0_0_40px_rgba(34,211,238,0.6)]"
        >
          🫀
        </motion.div>

        {/* ECG Line */}
        <div className="w-full h-16 mb-8 opacity-70">
          <ECGAnimation color="#38bdf8" height={60} />
        </div>

        {/* Rotating Message */}
        <div className="h-8 mb-6 flex items-center justify-center relative w-full text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-blue-200 text-lg font-medium absolute"
            >
              {MESSAGES[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-xs h-1.5 bg-navy-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
      </div>
    </div>
  );
}
