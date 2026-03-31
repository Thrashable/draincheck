export const CATEGORY_COLORS = {
  Entertainment: '#FF6B6B',
  Music: '#A78BFA',
  Productivity: '#34D399',
  Cloud: '#60A5FA',
  Finance: '#FBBF24',
  Health: '#F472B6',
  Shopping: '#FB923C',
  News: '#94A3B8',
  Other: '#6B7280',
};

export const ALL_CATEGORIES = Object.keys(CATEGORY_COLORS);

export function getCategoryColor(category) {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS.Other;
}
