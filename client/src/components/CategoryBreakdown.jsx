import { motion } from 'framer-motion';
import { getCategoryColor } from '../utils/categories';
import { monthlyPrice, formatCurrency } from '../utils/formatters';

export default function CategoryBreakdown({ subscriptions }) {
  // Calculate spend per category
  const categorySpend = {};
  for (const sub of subscriptions) {
    const mp = monthlyPrice(sub.price, sub.frequency) || 0;
    categorySpend[sub.category] = (categorySpend[sub.category] || 0) + mp;
  }

  const sorted = Object.entries(categorySpend)
    .sort(([, a], [, b]) => b - a)
    .filter(([, amount]) => amount > 0);

  if (sorted.length === 0) return null;

  const maxSpend = sorted[0][1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="bg-surface-raised border border-surface-border rounded-xl p-6 mb-8"
    >
      <h3 className="font-display text-lg font-semibold text-text-primary mb-5">
        Spend by Category
      </h3>

      <div className="space-y-4">
        {sorted.map(([category, amount], i) => {
          const color = getCategoryColor(category);
          const width = (amount / maxSpend) * 100;

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
            >
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-text-secondary text-sm font-body">{category}</span>
                <span className="font-mono text-sm font-medium" style={{ color }}>
                  {formatCurrency(amount)}/mo
                </span>
              </div>
              <div className="h-3 bg-surface-overlay rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${width}%` }}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${color}, ${color}CC)` }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
