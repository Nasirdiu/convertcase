import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check, X } from 'lucide-react';
import { COLOR_THEMES, ThemeConfig } from '../utils/themeConfig';

interface ThemeSelectorProps {
  currentThemeId: string;
  onSelectTheme: (themeId: string) => void;
  isCompact?: boolean;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentThemeId,
  onSelectTheme,
  isCompact = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentTheme = COLOR_THEMES[currentThemeId] || COLOR_THEMES['nasir-cyan'];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block" ref={containerRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
          currentTheme.isDark
            ? 'bg-[#0a1428]/90 hover:bg-[#0f1d38] border-cyan-500/40 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
            : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800 shadow-2xs'
        }`}
        title="Change Color Theme"
        aria-label="Change Color Theme"
      >
        <div
          className="w-2.5 h-2.5 rounded-full ring-2 ring-white/20 shrink-0"
          style={{ backgroundColor: currentTheme.dotColor }}
        />
        <Palette className="w-3.5 h-3.5 text-cyan-400" />
        <span className="truncate max-w-[100px] hidden sm:inline">
          {isCompact ? 'Color' : currentTheme.name}
        </span>
      </button>

      {/* DROPDOWN MENU: Exactly like Desktop on all devices, drops DOWNWARDS below button */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 z-50 w-72 sm:w-80 max-w-[calc(100vw-1rem)] rounded-2xl bg-[#070e20] border border-cyan-500/40 shadow-[0_15px_45px_rgba(0,0,0,0.95)] backdrop-blur-xl p-3 sm:p-3.5 animate-in fade-in zoom-in-95 duration-150 text-slate-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-cyan-900/40 px-1">
            <div className="flex items-center gap-1.5">
              <div className="p-1 rounded-md bg-cyan-950 border border-cyan-800 text-cyan-400">
                <Palette className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-xs uppercase tracking-wider text-cyan-300">
                Choose Color
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-2xs text-slate-400 mb-2.5 px-1 leading-tight">
            Tap any color to instantly change the theme:
          </p>

          {/* 2-Column Grid: Displays ALL 6 Colors cleanly with 100% visibility */}
          <div className="grid grid-cols-2 gap-2">
            {Object.values(COLOR_THEMES).map((theme: ThemeConfig) => {
              const isSelected = theme.id === currentThemeId;

              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    onSelectTheme(theme.id);
                    setIsOpen(false);
                  }}
                  className={`text-left p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 cursor-pointer active:scale-95 ${
                    isSelected
                      ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400'
                      : 'bg-[#0a152e]/60 hover:bg-[#0f1f3d] border-cyan-950 hover:border-cyan-700/60 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div
                      className="w-3.5 h-3.5 rounded-full shrink-0 ring-2 ring-white/20 shadow-xs"
                      style={{ backgroundColor: theme.dotColor }}
                    />
                    <span className="font-semibold text-xs text-white truncate">
                      {theme.name}
                    </span>
                  </div>

                  {isSelected && (
                    <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 text-black flex items-center justify-center shrink-0">
                      <Check className="w-2 h-2 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
