export const SUB_SORT_OPTIONS = [
  { key: 'price-desc', label: 'Cost: High to Low' },
  { key: 'price-asc', label: 'Cost: Low to High' },
  { key: 'last-charge-desc', label: 'Last Paid: Newest First' },
  { key: 'last-charge-asc', label: 'Last Paid: Oldest First' },
  { key: 'renewal-asc', label: 'Renewal Date: Soonest First' },
  { key: 'renewal-desc', label: 'Renewal Date: Latest First' },
  { key: 'total-spent-desc', label: 'Total Spent: Most First' },
  { key: 'name-asc', label: 'Name: A to Z' },
];

export const ONETIME_SORT_OPTIONS = [
  { key: 'price-desc', label: 'Amount: High to Low' },
  { key: 'price-asc', label: 'Amount: Low to High' },
  { key: 'date-desc', label: 'Date: Newest First' },
  { key: 'date-asc', label: 'Date: Oldest First' },
];

export default function SortDropdown({ options, sortKey, onSort }) {
  return (
    <select
      value={sortKey}
      onChange={(e) => onSort(e.target.value)}
      className="bg-surface-raised border border-surface-border rounded-lg px-3 py-1.5 text-sm font-body text-text-secondary focus:outline-none focus:border-accent-coral/50 cursor-pointer appearance-none"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M3 5l3 3 3-3'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', paddingRight: '30px' }}
    >
      {options.map((opt) => (
        <option key={opt.key} value={opt.key}>{opt.label}</option>
      ))}
    </select>
  );
}

export function sortSubscriptions(subs, sortKey) {
  const sorted = [...subs];
  switch (sortKey) {
    case 'price-desc':
      return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
    case 'price-asc':
      return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
    case 'last-charge-desc':
      return sorted.sort((a, b) => (b.last_charge_date || '').localeCompare(a.last_charge_date || ''));
    case 'last-charge-asc':
      return sorted.sort((a, b) => (a.last_charge_date || '').localeCompare(b.last_charge_date || ''));
    case 'renewal-asc':
      return sorted.sort((a, b) => (a.renewal_date || 'z').localeCompare(b.renewal_date || 'z'));
    case 'renewal-desc':
      return sorted.sort((a, b) => (b.renewal_date || '').localeCompare(a.renewal_date || ''));
    case 'total-spent-desc':
      return sorted.sort((a, b) => (b.total_spent || 0) - (a.total_spent || 0));
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'date-desc':
      return sorted.sort((a, b) => (b.email_date || '').localeCompare(a.email_date || ''));
    case 'date-asc':
      return sorted.sort((a, b) => (a.email_date || '').localeCompare(b.email_date || ''));
    default:
      return sorted;
  }
}
