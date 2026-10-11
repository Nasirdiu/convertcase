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

  // Close when clicking outside
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
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
          currentTheme.isDark
            ? 'bg-[#0a1428]/80 hover:bg-[#0f1d38] border-cyan-500/30 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
            : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800 shadow-2xs'
        }`}
        title="Change Color Theme"
      >
        <div
          className="w-3 h-3 rounded-full ring-2 ring-white/20 shrink-0"
          style={{ backgroundColor: currentTheme.dotColor }}
        />
        <Palette className="w-3.5 h-3.5" />
        <span className="truncate max-w-[120px] hidden sm:inline">
          {isCompact ? 'Color' : currentTheme.name}
        </span>
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-50 w-76 sm:w-80 rounded-xl bg-[#070e20] border border-cyan-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl p-3 animate-in fade-in zoom-in-95 duration-150 text-slate-100">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-cyan-900/40 px-1">
            <div className="flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-xs uppercase tracking-wider text-cyan-300">
                Choose Color
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-2xs text-slate-400 mb-2 px-1">
            Click any color to instantly change the interface theme:
          </p>

          <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
            {Object.values(COLOR_THEMES).map((theme: ThemeConfig) => {
              const isSelected = theme.id === currentThemeId;

              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    onSelectTheme(theme.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                      : 'bg-[#0a152e]/40 hover:bg-[#0c1a3b] border-cyan-950 hover:border-cyan-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <div
                      className="w-4 h-4 rounded-full shrink-0 ring-2 ring-white/20"
                      style={{ backgroundColor: theme.dotColor }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-xs text-white truncate">
                        {theme.name}
                      </div>
                      <div className="text-2xs text-slate-400 truncate mt-0.5">
                        {theme.description}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-4.5 h-4.5 rounded-full bg-cyan-400 text-black flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
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
