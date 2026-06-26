import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCategoryColor } from '../utils/categories';
import { formatCurrency, formatDate } from '../utils/formatters';

const STATUS_LABELS = {
  active: { label: 'Active', color: 'text-emerald-400' },
  cancelled: { label: 'Cancelled', color: 'text-red-400' },
  payment_issue: { label: 'Payment Issue', color: 'text-amber-400' },
};

export default function SubscriptionCard({ subscription, index, onUpdatePrice }) {
  const [expanded, setExpanded] = useState(false);
  const [editingPrice, setEditingPrice] = useState(false);
  const [priceInput, setPriceInput] = useState('');
  const color = getCategoryColor(subscription.category);
  const hasPrice = subscription.price != null;
  const gmailUrl = subscription.gmail_message_id
    ? `https://mail.google.com/mail/u/0/#inbox/${subscription.gmail_message_id}`
    : null;
  const statusInfo = STATUS_LABELS[subscription.status] || STATUS_LABELS.active;

  // Format frequency display
  const freqLabel = subscription.frequency === 'Unknown' ? '' : ` / ${subscription.frequency === 'Monthly' ? 'month' : subscription.frequency === 'Yearly' ? 'year' : subscription.frequency === 'Weekly' ? 'week' : 'month'}`;

  function handlePriceSave(e) {
    e.preventDefault();
    e.stopPropagation();
    const val = parseFloat(priceInput);
    if (!isNaN(val) && val > 0) onUpdatePrice?.(subscription.id, val);
    setEditingPrice(false);
    setPriceInput('');
  }

  // Charge summary line
  const chargeLine = [];
  if (subscription.total_charges > 0) {
    chargeLine.push(`${subscription.total_charges} charge${subscription.total_charges !== 1 ? 's' : ''}`);
    if (subscription.failed_charges > 0) chargeLine.push(`${subscription.failed_charges} failed`);
  }
  const chargeStr = chargeLine.join(' (') + (subscription.failed_charges > 0 ? ')' : '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      onClick={() => setExpanded(!expanded)}
      className="group bg-surface-raised border border-surface-border rounded-xl p-5 relative overflow-hidden cursor-pointer transition-shadow duration-200 hover:shadow-lg hover:shadow-black/20 hover:border-surface-overlay"
    >
      {/* Left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ background: color }} />

      {/* Main row */}
      <div className="flex items-start justify-between gap-4 pl-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4 className="font-display text-base font-semibold text-text-primary truncate">
              {subscription.name}
            </h4>
            {subscription.plan_name && (
              <span className="text-xs font-body text-text-muted italic">{subscription.plan_name}</span>
            )}
            <span className="flex-shrink-0 px-2 py-0.5 rounded text-xs font-body font-medium" style={{ background: `${color}15`, color }}>
              {subscription.category}
            </span>
            {subscription.status === 'cancelled' && (
              <span className="flex-shrink-0 px-2 py-0.5 rounded text-xs font-body font-medium bg-red-500/10 text-red-400">Cancelled</span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-secondary font-body">
            {subscription.card_display && (
              <span className="text-xs font-mono text-text-muted">{subscription.card_display}</span>
            )}
            {subscription.last_charge_date && (
              <span className="text-xs text-text-muted">Last: {formatDate(subscription.last_charge_date)}</span>
            )}
            {subscription.renewal_date && (
              <span className="text-xs text-text-muted">Renews: {formatDate(subscription.renewal_date)}</span>
            )}
          </div>

          {/* Charge history line */}
          {(subscription.total_charges > 0 || subscription.total_spent > 0) && (
            <div className="mt-1 text-xs text-text-muted font-body">
              {chargeStr}
              {subscription.total_spent > 0 && ` · ${formatCurrency(subscription.total_spent)} total`}
              {subscription.first_charge_date && ` · Since ${formatDate(subscription.first_charge_date)}`}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          {hasPrice ? (
            <div className="text-right">
              <span className="font-mono text-lg font-bold text-text-primary">{formatCurrency(subscription.price)}</span>
              {freqLabel && <span className="text-text-muted text-xs font-body">{freqLabel}</span>}
            </div>
          ) : (
            <span className="text-xs font-body text-text-muted italic">No price found</span>
          )}
          <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-text-muted text-xs">▾</motion.span>
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mt-4 pt-4 pl-3 border-t border-surface-border/50 space-y-2.5">
              <Row label="Status"><span className={`font-medium ${statusInfo.color}`}>{statusInfo.label}</span></Row>
              {subscription.plan_name && <Row label="Plan">{subscription.plan_name}</Row>}

              {/* Editable price */}
              <div className="flex items-center gap-2">
                <span className="text-text-muted text-xs font-body w-20">Amount</span>
                {editingPrice ? (
                  <form onSubmit={handlePriceSave} className="flex items-center gap-2">
                    <span className="text-text-secondary text-sm">$</span>
                    <input type="number" step="0.01" min="0" value={priceInput} onChange={(e) => setPriceInput(e.target.value)} placeholder="0.00" autoFocus className="w-24 bg-surface-overlay border border-surface-border rounded px-2 py-1 text-sm font-mono text-text-primary focus:outline-none focus:border-accent-coral" />
                    <button type="submit" className="px-2 py-1 bg-accent-coral text-white text-xs font-body font-semibold rounded">Save</button>
                    <button type="button" onClick={() => setEditingPrice(false)} className="text-text-muted text-xs">Cancel</button>
                  </form>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-text-primary">{hasPrice ? formatCurrency(subscription.price) : 'No price found'}</span>
                    <button onClick={() => { setPriceInput(hasPrice ? subscription.price.toString() : ''); setEditingPrice(true); }} className="text-xs text-accent-coral hover:text-accent-coral/80">{hasPrice ? 'Edit' : 'Add price'}</button>
                  </div>
                )}
              </div>

              {subscription.card_display && <Row label="Payment">{subscription.card_display}</Row>}
              {subscription.last_charge_date && <Row label="Last charged">{formatDate(subscription.last_charge_date)}</Row>}
              {subscription.renewal_date && <Row label="Next renewal">{formatDate(subscription.renewal_date)}</Row>}
              {subscription.total_charges > 0 && (
                <Row label="Charges">
                  {subscription.total_charges} successful{subscription.failed_charges > 0 && <span className="text-amber-400">, {subscription.failed_charges} failed</span>}
                  {subscription.total_spent > 0 && ` · ${formatCurrency(subscription.total_spent)} total`}
                </Row>
              )}
              {subscription.first_charge_date && <Row label="Since">{formatDate(subscription.first_charge_date)}</Row>}
              {subscription.source_email && <Row label="From"><span className="font-mono">{subscription.source_email}</span></Row>}

              {gmailUrl && (
                <div className="pt-2">
                  <a href={gmailUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 bg-surface-overlay hover:bg-surface-border text-text-primary text-sm font-body font-medium rounded-lg transition-colors">
                    View in Gmail <span className="text-accent-coral">&rarr;</span>
                  </a>
                  {subscription.source_email_ids?.length > 1 && (
                    <span className="ml-3 text-text-muted text-xs">+ {subscription.source_email_ids.length - 1} more emails</span>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Row({ label, children }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-text-muted text-xs font-body w-20 flex-shrink-0">{label}</span>
      <span className="text-sm font-body text-text-secondary">{children}</span>
    </div>
  );
}
