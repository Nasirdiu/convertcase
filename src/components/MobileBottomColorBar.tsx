import React from 'react';
import { Palette, Check } from 'lucide-react';
import { COLOR_THEMES, ThemeConfig } from '../utils/themeConfig';

interface MobileBottomColorBarProps {
  currentThemeId: string;
  onSelectTheme: (themeId: string) => void;
}

export const MobileBottomColorBar: React.FC<MobileBottomColorBarProps> = ({
  currentThemeId,
  onSelectTheme,
}) => {
  return (
    <aside
      aria-label="Mobile Theme Selector"
      className="sm:hidden fixed bottom-3 inset-x-2.5 z-40"
    >
      <div className="bg-[#070e20]/95 backdrop-blur-xl border border-cyan-500/40 shadow-[0_12px_40px_rgba(0,0,0,0.95)] rounded-2xl p-2 px-2.5 flex items-center justify-between gap-1 text-slate-100">
        {/* Left Icon & Label */}
        <div className="flex items-center gap-1.5 shrink-0 pr-1.5 border-r border-cyan-900/60">
          <div className="w-5 h-5 rounded-md bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center">
            <Palette className="w-3 h-3" />
          </div>
          <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
            Colors
          </span>
        </div>

        {/* 6 Color Buttons shown all at once at the bottom */}
        <div className="flex items-center justify-around flex-1 gap-1 py-0.5">
          {Object.values(COLOR_THEMES).map((theme: ThemeConfig) => {
            const isSelected = theme.id === currentThemeId;

            // Short label for compact mobile bottom bar
            const shortName =
              theme.id === 'nasir-cyan'
                ? 'Cyan'
                : theme.id === 'nasir-contrast'
                ? 'Navy'
                : theme.id === 'side-black-white'
                ? 'B&W'
                : theme.id === 'emerald-glow'
                ? 'Green'
                : theme.id === 'violet-luxury'
                ? 'Purple'
                : 'Light';

            return (
              <button
                key={theme.id}
                onClick={() => onSelectTheme(theme.id)}
                className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all active:scale-95 shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/90 border border-cyan-400 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400'
                    : 'bg-[#0a152e]/50 border border-transparent text-slate-400 hover:text-white'
                }`}
                title={theme.name}
                aria-label={`Select ${theme.name} theme`}
              >
                <div className="relative">
                  <div
                    className="w-4 h-4 rounded-full ring-2 ring-white/20 shadow-xs"
                    style={{ backgroundColor: theme.dotColor }}
                  />
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 text-black flex items-center justify-center">
                      <Check className="w-2 h-2 stroke-[3]" />
                    </div>
                  )}
                </div>
                <span className="text-[9px] font-semibold mt-0.5 leading-tight truncate">
                  {shortName}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
