import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  'Searching receipts & invoices...',
  'Scanning renewal emails...',
  'Checking signup confirmations...',
  'Analyzing with AI...',
];

export default function ScanProgress() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-lg mx-auto py-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-raised border border-surface-border rounded-2xl p-8"
      >
        {/* Scanning animation */}
        <div className="flex justify-center mb-8">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-accent-coral/20" />
            <div className="absolute inset-0 rounded-full border-2 border-accent-coral border-t-transparent animate-spin" />
            <div className="absolute inset-3 rounded-full border-2 border-category-music/30 border-b-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-accent-coral text-lg font-bold">$</span>
            </div>
          </div>
        </div>

        <h3 className="font-display text-lg font-semibold text-text-primary text-center mb-6">
          Scanning your inbox
        </h3>

        {/* Steps */}
        <div className="space-y-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: i <= currentStep ? 1 : 0.3, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                i < currentStep
                  ? 'bg-category-productivity/20 text-category-productivity'
                  : i === currentStep
                    ? 'bg-accent-coral/20 text-accent-coral'
                    : 'bg-surface-overlay text-text-muted'
              }`}>
                {i < currentStep ? (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : i === currentStep ? (
                  <div className="w-2 h-2 rounded-full bg-accent-coral animate-pulse" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-text-muted/50" />
                )}
              </div>
              <span className={`font-body text-sm ${
                i <= currentStep ? 'text-text-primary' : 'text-text-muted'
              }`}>
                {step}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Skeleton cards */}
        <div className="mt-8 space-y-3">
          {[0, 1, 2].map(i => (
            <div key={i} className="shimmer h-16 rounded-xl" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
