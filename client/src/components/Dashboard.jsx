import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StatsRow from './StatsRow';
import CategoryBreakdown from './CategoryBreakdown';
import CategoryFilter from './CategoryFilter';
import SortDropdown, { sortSubscriptions, SUB_SORT_OPTIONS, ONETIME_SORT_OPTIONS } from './SortControls';
import SubscriptionCard from './SubscriptionCard';
import OneTimeCard from './OneTimeCard';
import ScanProgress from './ScanProgress';
import EmptyState from './EmptyState';
import { timeAgo } from '../utils/formatters';

export default function Dashboard({ user, onLogout }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [lastScanned, setLastScanned] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [subSort, setSubSort] = useState('price-desc');
  const [onetimeSort, setOnetimeSort] = useState('price-desc');
  const [onetimeExpanded, setOnetimeExpanded] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/subscriptions', { credentials: 'include' })
      .then(r => r.json())
      .then(data => {
        setSubscriptions(data.subscriptions || []);
        setLastScanned(data.lastScanned);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  async function handleScan() {
    setScanning(true);
    setError(null);
    try {
      const res = await fetch('/api/scan', { method: 'POST', credentials: 'include' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Scan failed');
      }
      const data = await res.json();
      setSubscriptions(data.subscriptions || []);
      setLastScanned(new Date().toISOString());
    } catch (err) {
      setError(err.message);
    } finally {
      setScanning(false);
    }
  }

  async function handleLogout() {
    await fetch('/auth/logout', { method: 'POST', credentials: 'include' });
    onLogout();
  }

  function handleUpdatePrice(id, newPrice) {
    setSubscriptions(prev => prev.map(s => s.id === id ? { ...s, price: newPrice } : s));
  }

  // Split into subscriptions and one-time payments
  const recurringSubs = subscriptions.filter(s => s.is_recurring !== false);
  const oneTimePayments = subscriptions.filter(s => s.is_recurring === false);

  // Category filter applies to subscriptions only
  const categories = [...new Set(recurringSubs.map(s => s.category))].sort();
  const filteredSubs = activeCategory
    ? recurringSubs.filter(s => s.category === activeCategory)
    : recurringSubs;

  const sortedSubs = sortSubscriptions(filteredSubs, subSort);
  const sortedOneTime = sortSubscriptions(oneTimePayments, onetimeSort);

  const hasResults = subscriptions.length > 0;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-surface-border bg-surface-base/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2L4 8V14C4 20 8 25 14 26C20 25 24 20 24 14V8L14 2Z" stroke="#FF6B6B" strokeWidth="1.5" fill="none" />
                <path d="M9 14L14 9L19 14" stroke="#FF6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 9V20" stroke="#FF6B6B" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="8" y1="18" x2="20" y2="18" stroke="#FF6B6B" strokeWidth="1" opacity="0.4" />
                <line x1="9" y1="21" x2="19" y2="21" stroke="#FF6B6B" strokeWidth="1" opacity="0.25" />
              </svg>
            </div>
            <span className="font-display text-lg font-bold text-text-primary tracking-tight">Draincheck</span>
          </div>
          <div className="flex items-center gap-4">
            {lastScanned && (
              <span className="text-text-muted text-xs font-body hidden sm:block">Last scan: {timeAgo(lastScanned)}</span>
            )}
            <span className="text-text-secondary text-sm font-body hidden sm:block">{user.email}</span>
            <button onClick={handleScan} disabled={scanning} className="px-5 py-2 bg-accent-coral text-white font-body font-semibold text-sm rounded-lg transition-all duration-200 hover:bg-accent-coral/90 hover:shadow-lg hover:shadow-accent-coral/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]">
              {scanning ? 'Scanning...' : hasResults ? 'Scan Again' : 'Scan My Gmail'}
            </button>
            <button onClick={handleLogout} className="text-text-muted text-sm font-body hover:text-text-secondary transition-colors">Sign out</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-accent-coral/10 border border-accent-coral/20 rounded-xl p-4 mb-6 flex items-center justify-between">
              <p className="text-accent-coral text-sm font-body">{error}</p>
              <button onClick={handleScan} className="text-accent-coral text-sm font-body font-semibold hover:underline ml-4">Retry</button>
            </motion.div>
          )}
        </AnimatePresence>

        {scanning && <ScanProgress />}

        {/* ═══════════════ SECTION A: SUBSCRIPTIONS ═══════════════ */}
        {!scanning && loaded && hasResults && (
          <>
            <StatsRow subscriptions={recurringSubs} />

            {recurringSubs.length > 0 && (
              <>
                <CategoryBreakdown subscriptions={recurringSubs} />
                <CategoryFilter categories={categories} activeCategory={activeCategory} onSelect={setActiveCategory} />

                {/* Section header with sort dropdown */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-bold text-text-primary">
                    Subscriptions
                    <span className="text-text-muted text-sm font-body font-normal ml-2">({filteredSubs.length})</span>
                  </h3>
                  <SortDropdown options={SUB_SORT_OPTIONS} sortKey={subSort} onSort={setSubSort} />
                </div>

                <div className="space-y-3 mb-12">
                  <AnimatePresence mode="popLayout">
                    {sortedSubs.map((sub, i) => (
                      <SubscriptionCard key={sub.id || `${sub.name}-${i}`} subscription={sub} index={i} onUpdatePrice={handleUpdatePrice} />
                    ))}
                  </AnimatePresence>
                </div>
              </>
            )}

            {recurringSubs.length === 0 && (
              <div className="text-center py-12 mb-8">
                <p className="text-text-secondary font-body">No recurring subscriptions detected. All charges appear to be one-time payments.</p>
              </div>
            )}

            {/* ═══════════════ SECTION B: ONE-TIME PAYMENTS ═══════════════ */}
            {oneTimePayments.length > 0 && (
              <div className="border-t border-surface-border/50 pt-8">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setOnetimeExpanded(!onetimeExpanded)}
                    className="flex items-center gap-2 group"
                  >
                    <h3 className="font-display text-base font-semibold text-text-muted group-hover:text-text-secondary transition-colors">
                      One-Time Payments
                      <span className="text-sm font-body font-normal ml-2">({oneTimePayments.length})</span>
                    </h3>
                    <motion.span
                      animate={{ rotate: onetimeExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-text-muted text-xs"
                    >
                      ▾
                    </motion.span>
                  </button>
                  {onetimeExpanded && (
                    <SortDropdown options={ONETIME_SORT_OPTIONS} sortKey={onetimeSort} onSort={setOnetimeSort} />
                  )}
                </div>

                <AnimatePresence>
                  {onetimeExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2">
                        {sortedOneTime.map((item, i) => (
                          <OneTimeCard key={item.id || `${item.name}-${i}`} item={item} index={i} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </>
        )}

        {/* Empty / Initial states */}
        {!scanning && loaded && !hasResults && lastScanned && <EmptyState onScan={handleScan} />}
        {!scanning && loaded && !hasResults && !lastScanned && (
          <div className="text-center py-24">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-surface-raised border border-surface-border mb-6">
                <svg width="40" height="40" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2L4 8V14C4 20 8 25 14 26C20 25 24 20 24 14V8L14 2Z" stroke="#FF6B6B" strokeWidth="1.5" fill="none" />
                  <path d="M9 14L14 9L19 14" stroke="#FF6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 9V20" stroke="#FF6B6B" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="8" y1="18" x2="20" y2="18" stroke="#FF6B6B" strokeWidth="1" opacity="0.4" />
                  <line x1="9" y1="21" x2="19" y2="21" stroke="#FF6B6B" strokeWidth="1" opacity="0.25" />
                </svg>
              </div>
              <h2 className="font-display text-2xl font-bold text-text-primary mb-3">Ready to scan</h2>
              <p className="text-text-secondary font-body max-w-md mx-auto mb-8">
                Click "Scan My Gmail" to search your inbox for subscription receipts, renewals, and signup confirmations from the last 12 months.
              </p>
              <button onClick={handleScan} className="px-8 py-3.5 bg-accent-coral text-white font-body font-semibold rounded-xl hover:bg-accent-coral/90 hover:shadow-lg hover:shadow-accent-coral/20 transition-all duration-200 active:scale-[0.98]">
                Scan My Gmail
              </button>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}
