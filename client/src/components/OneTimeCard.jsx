import { motion } from 'framer-motion';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function OneTimeCard({ item, index }) {
  const gmailUrl = item.gmail_message_id
    ? `https://mail.google.com/mail/u/0/#inbox/${item.gmail_message_id}`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className="bg-surface-raised/60 border border-surface-border/60 rounded-lg px-4 py-3 flex items-center justify-between gap-3"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h5 className="font-display text-sm font-semibold text-text-secondary truncate">{item.name}</h5>
          {item.email_date && (
            <span className="text-xs text-text-muted font-body">{formatDate(item.email_date)}</span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-3 text-xs text-text-muted font-body">
          {item.card_display && <span className="font-mono">{item.card_display}</span>}
          {item.description && <span className="truncate max-w-[300px]">{item.description}</span>}
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="font-mono text-sm font-semibold text-text-secondary">
          {item.price != null ? formatCurrency(item.price) : '--'}
        </span>
        {gmailUrl && (
          <a
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-xs text-accent-coral hover:text-accent-coral/80 transition-colors font-body"
          >
            View &rarr;
          </a>
        )}
      </div>
    </motion.div>
  );
}
