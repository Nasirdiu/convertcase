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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const currentTheme = COLOR_THEMES[currentThemeId] || COLOR_THEMES['nasir-cyan'];

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
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

  // Lock body scroll on mobile when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block">
      {/* Trigger Button */}
      <button
        ref={triggerRef}
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

      {/* MODAL: Perfectly Centered on Mobile, Showing ALL 6 Colors in a 2-Column Grid */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs animate-in fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            ref={popoverRef}
            className="w-full max-w-[340px] sm:max-w-md rounded-2xl bg-[#070e20] border border-cyan-500/40 shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-4 text-slate-100 animate-in zoom-in-95 duration-150 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-cyan-900/40">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Choose Color</h3>
                  <p className="text-[11px] text-slate-400">Select any theme color</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 2-Column Grid showing ALL 6 Colors with 100% Visibility (Zero Scroll Needed) */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mb-3.5">
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
                        ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400'
                        : 'bg-[#0a152e]/60 hover:bg-[#0f1f3d] border-cyan-950 hover:border-cyan-700/60 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div
                        className="w-4 h-4 rounded-full shrink-0 ring-2 ring-white/20 shadow-xs"
                        style={{ backgroundColor: theme.dotColor }}
                      />
                      <span className="font-semibold text-xs text-white truncate">
                        {theme.name}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-cyan-400 text-black flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl transition-all cursor-pointer text-center active:scale-98 shadow-sm"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
