import { motion } from 'framer-motion';
import { monthlyPrice, formatCurrency } from '../utils/formatters';

export default function StatsRow({ subscriptions }) {
  // Only recurring subscriptions for stats
  const recurring = subscriptions.filter(s => s.is_recurring !== false);

  const totalMonthly = recurring.reduce((sum, s) => {
    const mp = monthlyPrice(s.price, s.frequency);
    return sum + (mp || 0);
  }, 0);

  const totalSpent = recurring.reduce((sum, s) => sum + (s.total_spent || 0), 0);
  const categories = new Set(recurring.map(s => s.category)).size;

  const stats = [
    {
      label: 'Monthly Cost',
      value: formatCurrency(totalMonthly),
      suffix: '/mo',
      detail: `${recurring.length} active subscription${recurring.length !== 1 ? 's' : ''}`,
      color: '#FF6B6B',
      bg: 'rgba(255,107,107,0.08)',
    },
    {
      label: 'Total Spent (12mo)',
      value: formatCurrency(totalSpent),
      suffix: '',
      detail: `across ${categories} categor${categories !== 1 ? 'ies' : 'y'}`,
      color: '#A78BFA',
      bg: 'rgba(167,139,250,0.08)',
    },
    {
      label: 'Subscriptions Found',
      value: recurring.length,
      suffix: '',
      detail: `${recurring.reduce((s, r) => s + (r.total_charges || 0), 0)} charges tracked`,
      color: '#34D399',
      bg: 'rgba(52,211,153,0.08)',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="bg-surface-raised border border-surface-border rounded-xl p-6 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${stat.color}40, transparent)` }} />
          <p className="text-text-secondary text-sm font-body mb-2">{stat.label}</p>
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</span>
            {stat.suffix && <span className="text-text-muted text-sm font-body">{stat.suffix}</span>}
          </div>
          {stat.detail && <p className="text-text-muted text-xs font-body mt-1.5">{stat.detail}</p>}
          <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full blur-2xl" style={{ background: stat.bg }} />
        </motion.div>
      ))}
    </div>
  );
}
