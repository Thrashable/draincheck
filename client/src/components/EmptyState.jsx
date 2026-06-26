import { motion } from 'framer-motion';

export default function EmptyState({ onScan }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-20"
    >
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-surface-raised border border-surface-border mb-6">
        <span className="font-mono text-3xl text-text-muted">$?</span>
      </div>
      <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
        No subscriptions found
      </h3>
      <p className="text-text-secondary font-body max-w-sm mx-auto mb-6">
        We didn't find any subscription emails. Try scanning again, or check your spam folder for receipts.
      </p>
      <button
        onClick={onScan}
        className="px-6 py-3 bg-accent-coral text-white font-body font-semibold rounded-xl hover:bg-accent-coral/90 transition-colors"
      >
        Scan Again
      </button>
    </motion.div>
  );
}
