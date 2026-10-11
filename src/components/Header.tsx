import React from 'react';
import { Type, Sun, Moon, Contrast } from 'lucide-react';

export type ThemeOption = 'side-black-white' | 'full-dark' | 'full-light';

interface HeaderProps {
  onOpenShortcuts: () => void;
  onOpenGuide: () => void;
  onReset: () => void;
  theme: ThemeOption;
  onChangeTheme: (theme: ThemeOption) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenShortcuts,
  onOpenGuide,
  onReset,
  theme,
  onChangeTheme,
}) => {
  const isLight = theme === 'full-light';

  const cycleTheme = () => {
    if (theme === 'side-black-white') onChangeTheme('full-dark');
    else if (theme === 'full-dark') onChangeTheme('full-light');
    else onChangeTheme('side-black-white');
  };

  const themeLabel =
    theme === 'side-black-white'
      ? 'Side Black / Center White'
      : theme === 'full-dark'
      ? 'Full Dark'
      : 'Full Light';

  return (
    <header
      className={`border-b sticky top-0 z-40 transition-colors backdrop-blur-md ${
        isLight
          ? 'border-slate-200/80 bg-white/80 text-slate-900'
          : 'border-zinc-800/80 bg-zinc-950/80 text-white'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-8">
        {/* Zone 1: Single element wordmark */}
        <a
          href="/"
          className={`text-lg font-bold tracking-tight whitespace-nowrap shrink-0 flex items-center gap-2 hover:opacity-90 transition-opacity ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}
        >
          <div className="w-7 h-7 rounded-md bg-white text-black flex items-center justify-center font-black text-sm shadow-xs border border-zinc-200">
            <Type className="w-4 h-4 text-black" />
          </div>
          <span>ConvertCase</span>
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-400">
          <a
            href="#converter"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Case Converter
          </a>
          <button
            onClick={onOpenGuide}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Guide & Rules
          </button>
          <button
            onClick={onOpenShortcuts}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Shortcuts
          </button>
          <button
            onClick={cycleTheme}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="Cycle theme appearance"
          >
            <Contrast className="w-3.5 h-3.5 text-zinc-300" />
            <span>Theme: {themeLabel}</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onReset}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isLight
                ? 'bg-slate-900 hover:bg-slate-800 text-white'
                : 'bg-white hover:bg-zinc-200 text-black shadow-sm'
            }`}
          >
            New Document
          </button>
        </div>
      </div>
    </header>
  );
};
