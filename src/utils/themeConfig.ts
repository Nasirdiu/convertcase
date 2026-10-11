/**
 * Professional color palettes and theme configurations.
 * Pure color names only with exact background hexes for 100% mobile coverage.
 */

export interface ThemeConfig {
  id: string;
  name: string;
  dotColor: string; // for theme switcher preview
  bgHex: string; // for body and meta theme-color sync
  description: string;
  isDark: boolean;
  bgClass: string;
  headerBgClass: string;
  headerBorderClass: string;
  cardBgClass: string;
  cardBorderClass: string;
  cardShadowClass: string;
  textColor: string;
  mutedTextColor: string;
  accentBg: string;
  accentHoverBg: string;
  accentText: string;
  accentBorder: string;
  selectionClass: string;
  badgeAccent: string;
}

export const COLOR_THEMES: Record<string, ThemeConfig> = {
  'nasir-cyan': {
    id: 'nasir-cyan',
    name: 'Cyan Blue',
    dotColor: '#06b6d4',
    bgHex: '#040814',
    description: 'Midnight navy canvas with electric cyan blue accents',
    isDark: true,
    bgClass: 'bg-[#040814]',
    headerBgClass: 'bg-[#040814]/90',
    headerBorderClass: 'border-cyan-900/40',
    cardBgClass: 'bg-[#070e20]',
    cardBorderClass: 'border-cyan-500/30',
    cardShadowClass: 'shadow-[0_0_35px_rgba(6,182,212,0.15)]',
    textColor: 'text-slate-100',
    mutedTextColor: 'text-cyan-200/70',
    accentBg: 'bg-cyan-500',
    accentHoverBg: 'hover:bg-cyan-400',
    accentText: 'text-cyan-400',
    accentBorder: 'border-cyan-500/40',
    selectionClass: 'selection:bg-cyan-500/25 selection:text-cyan-300',
    badgeAccent: 'text-cyan-300 bg-cyan-950/80 border-cyan-800',
  },
  'nasir-contrast': {
    id: 'nasir-contrast',
    name: 'Navy & White',
    dotColor: '#38bdf8',
    bgHex: '#040814',
    description: 'Dark navy canvas with high-contrast crisp white editor card',
    isDark: true,
    bgClass: 'bg-[#040814]',
    headerBgClass: 'bg-[#0b0f19]/90',
    headerBorderClass: 'border-cyan-900/40',
    cardBgClass: 'bg-white',
    cardBorderClass: 'border-cyan-200',
    cardShadowClass: 'shadow-[0_10px_40px_rgba(6,182,212,0.12)]',
    textColor: 'text-slate-900',
    mutedTextColor: 'text-cyan-200/70',
    accentBg: 'bg-cyan-600',
    accentHoverBg: 'hover:bg-cyan-500',
    accentText: 'text-cyan-600',
    accentBorder: 'border-cyan-300',
    selectionClass: 'selection:bg-cyan-100 selection:text-cyan-900',
    badgeAccent: 'text-cyan-800 bg-cyan-50 border-cyan-200',
  },
  'side-black-white': {
    id: 'side-black-white',
    name: 'Black & White',
    dotColor: '#ffffff',
    bgHex: '#09090b',
    description: 'Pitch black sides with crisp white center card',
    isDark: true,
    bgClass: 'bg-[#09090b]',
    headerBgClass: 'bg-zinc-950/90',
    headerBorderClass: 'border-zinc-800',
    cardBgClass: 'bg-white',
    cardBorderClass: 'border-zinc-200',
    cardShadowClass: 'shadow-2xl',
    textColor: 'text-slate-900',
    mutedTextColor: 'text-zinc-400',
    accentBg: 'bg-zinc-900',
    accentHoverBg: 'hover:bg-zinc-800',
    accentText: 'text-zinc-900',
    accentBorder: 'border-zinc-300',
    selectionClass: 'selection:bg-zinc-200 selection:text-black',
    badgeAccent: 'text-zinc-800 bg-zinc-100 border-zinc-300',
  },
  'emerald-glow': {
    id: 'emerald-glow',
    name: 'Emerald Green',
    dotColor: '#10b981',
    bgHex: '#02130e',
    description: 'Deep dark canvas with radiant emerald green accents',
    isDark: true,
    bgClass: 'bg-[#02130e]',
    headerBgClass: 'bg-[#02130e]/90',
    headerBorderClass: 'border-emerald-900/40',
    cardBgClass: 'bg-[#052219]',
    cardBorderClass: 'border-emerald-500/30',
    cardShadowClass: 'shadow-[0_0_35px_rgba(16,185,129,0.15)]',
    textColor: 'text-emerald-50',
    mutedTextColor: 'text-emerald-300/70',
    accentBg: 'bg-emerald-500',
    accentHoverBg: 'hover:bg-emerald-400',
    accentText: 'text-emerald-400',
    accentBorder: 'border-emerald-500/40',
    selectionClass: 'selection:bg-emerald-500/25 selection:text-emerald-300',
    badgeAccent: 'text-emerald-300 bg-emerald-950 border-emerald-800',
  },
  'violet-luxury': {
    id: 'violet-luxury',
    name: 'Purple & Violet',
    dotColor: '#a855f7',
    bgHex: '#0b071a',
    description: 'Deep dark canvas with luminous purple and violet accents',
    isDark: true,
    bgClass: 'bg-[#0b071a]',
    headerBgClass: 'bg-[#0b071a]/90',
    headerBorderClass: 'border-purple-900/40',
    cardBgClass: 'bg-[#130d2e]',
    cardBorderClass: 'border-purple-500/30',
    cardShadowClass: 'shadow-[0_0_35px_rgba(168,85,247,0.15)]',
    textColor: 'text-purple-50',
    mutedTextColor: 'text-purple-300/70',
    accentBg: 'bg-purple-600',
    accentHoverBg: 'hover:bg-purple-500',
    accentText: 'text-purple-400',
    accentBorder: 'border-purple-500/40',
    selectionClass: 'selection:bg-purple-500/25 selection:text-purple-300',
    badgeAccent: 'text-purple-300 bg-purple-950 border-purple-800',
  },
  'clean-light': {
    id: 'clean-light',
    name: 'Clean Light',
    dotColor: '#3b82f6',
    bgHex: '#f1f5f9',
    description: 'Clean light canvas with white card & soft blue accents',
    isDark: false,
    bgClass: 'bg-slate-100',
    headerBgClass: 'bg-white/90',
    headerBorderClass: 'border-slate-200',
    cardBgClass: 'bg-white',
    cardBorderClass: 'border-slate-200',
    cardShadowClass: 'shadow-sm',
    textColor: 'text-slate-900',
    mutedTextColor: 'text-slate-600',
    accentBg: 'bg-blue-600',
    accentHoverBg: 'hover:bg-blue-700',
    accentText: 'text-blue-600',
    accentBorder: 'border-blue-200',
    selectionClass: 'selection:bg-blue-100 selection:text-blue-900',
    badgeAccent: 'text-blue-800 bg-blue-50 border-blue-200',
  },
};
