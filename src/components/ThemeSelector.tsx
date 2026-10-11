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
  const desktopPopoverRef = useRef<HTMLDivElement>(null);

  const currentTheme = COLOR_THEMES[currentThemeId] || COLOR_THEMES['nasir-cyan'];

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        desktopPopoverRef.current &&
        !desktopPopoverRef.current.contains(e.target as Node)
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

  // Lock body scroll on mobile when bottom drawer is open
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined' && window.innerWidth < 640) {
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

      {/* MOBILE: Anchored to the BOTTOM of the screen (Bottom Sheet Drawer) - Never goes upwards */}
      <div className="sm:hidden">
        {isOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-end animate-in fade-in"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="w-full bg-[#070e20] border-t-2 border-cyan-500/50 rounded-t-3xl shadow-[0_-15px_40px_rgba(0,0,0,0.9)] p-4 pb-8 text-slate-100 animate-in slide-in-from-bottom duration-200 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drag handle */}
              <div className="w-12 h-1.5 bg-cyan-900/80 rounded-full mx-auto mb-3" />

              {/* Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-cyan-950">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400">
                    <Palette className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">Choose Color</h3>
                    <p className="text-[11px] text-slate-400">Tap any color to apply theme</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 2-Column Grid showing ALL 6 Colors with 100% full visibility */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {Object.values(COLOR_THEMES).map((theme: ThemeConfig) => {
                  const isSelected = theme.id === currentThemeId;

                  return (
                    <button
                      key={theme.id}
                      onClick={() => {
                        onSelectTheme(theme.id);
                        setIsOpen(false);
                      }}
                      className={`text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-2.5 cursor-pointer active:scale-95 ${
                        isSelected
                          ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400'
                          : 'bg-[#0a152e]/70 hover:bg-[#0f1f3d] border-cyan-950 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <div
                          className="w-4.5 h-4.5 rounded-full shrink-0 ring-2 ring-white/20 shadow-xs"
                          style={{ backgroundColor: theme.dotColor }}
                        />
                        <span className="font-semibold text-xs text-white truncate">
                          {theme.name}
                        </span>
                      </div>

                      {isSelected && (
                        <div className="w-4.5 h-4.5 rounded-full bg-cyan-400 text-black flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Done / Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl transition-all cursor-pointer text-center active:scale-98 shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>

      {/* DESKTOP: Positioned popover dropdown opening DOWNWARDS from button */}
      <div className="hidden sm:block">
        {isOpen && (
          <div
            ref={desktopPopoverRef}
            className="absolute right-0 top-full mt-2 z-50 w-72 rounded-xl bg-[#070e20] border border-cyan-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl p-3 animate-in fade-in zoom-in-95 duration-150 text-slate-100"
          >
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
                aria-label="Close menu"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-2xs text-slate-400 mb-2 px-1">
              Click any color to change theme:
            </p>

            <div className="grid grid-cols-2 gap-2 mb-2">
              {Object.values(COLOR_THEMES).map((theme: ThemeConfig) => {
                const isSelected = theme.id === currentThemeId;

                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      onSelectTheme(theme.id);
                      setIsOpen(false);
                    }}
                    className={`text-left p-2 rounded-lg border transition-all flex items-center justify-between gap-2 cursor-pointer active:scale-95 ${
                      isSelected
                        ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-[0_0_12px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400'
                        : 'bg-[#0a152e]/60 hover:bg-[#0f1f3d] border-cyan-950 text-slate-300'
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
    </div>
  );
};
