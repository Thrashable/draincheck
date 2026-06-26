import { motion } from 'framer-motion';
import { getCategoryColor } from '../utils/categories';

export default function CategoryFilter({ categories, activeCategory, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-1.5 rounded-full text-sm font-body font-medium transition-all duration-200 ${
          activeCategory === null
            ? 'bg-text-primary text-surface-base'
            : 'bg-surface-overlay text-text-secondary hover:text-text-primary border border-surface-border'
        }`}
      >
        All
      </button>
      {categories.map(cat => {
        const color = getCategoryColor(cat);
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className="px-4 py-1.5 rounded-full text-sm font-body font-medium transition-all duration-200 border"
            style={{
              background: isActive ? `${color}20` : 'transparent',
              borderColor: isActive ? `${color}50` : 'var(--surface-border)',
              color: isActive ? color : 'var(--text-secondary)',
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
