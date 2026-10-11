import React from 'react';
import { Type } from 'lucide-react';
import { ThemeSelector } from './ThemeSelector';
import { COLOR_THEMES } from '../utils/themeConfig';

interface HeaderProps {
  onOpenShortcuts: () => void;
  onOpenGuide: () => void;
  onReset: () => void;
  themeId: string;
  onChangeTheme: (themeId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenShortcuts,
  onOpenGuide,
  onReset,
  themeId,
  onChangeTheme,
}) => {
  const currentTheme = COLOR_THEMES[themeId] || COLOR_THEMES['nasir-cyan'];
  const isLight = !currentTheme.isDark;

  return (
    <header
      className={`border-b sticky top-0 z-40 transition-colors backdrop-blur-md ${
        currentTheme.headerBgClass
      } ${currentTheme.headerBorderClass}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-6">
        {/* Zone 1: Single element wordmark */}
        <a
          href="/"
          className={`text-lg font-bold tracking-tight whitespace-nowrap shrink-0 flex items-center gap-2 hover:opacity-90 transition-opacity ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}
        >
          <div className="w-7 h-7 rounded-md bg-cyan-500 text-black flex items-center justify-center font-black text-sm shadow-[0_0_12px_rgba(6,182,212,0.4)]">
            <Type className="w-4 h-4 text-black stroke-[2.5]" />
          </div>
          <div className="flex items-center gap-1.5">
            <span>ConvertCase</span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Pro
            </span>
          </div>
        </a>

        {/* Zone 2: Concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
          <a
            href="#converter"
            className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0"
          >
            Case Converter
          </a>
          <button
            onClick={onOpenGuide}
            className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Guide & Rules
          </button>
          <button
            onClick={onOpenShortcuts}
            className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Shortcuts
          </button>
        </nav>

        {/* Zone 3: 1 primary action & theme picker */}
        <div className="flex items-center gap-2.5 shrink-0">
          <ThemeSelector
            currentThemeId={themeId}
            onSelectTheme={onChangeTheme}
          />

          <button
            onClick={onReset}
            className="px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-95"
          >
            New Document
          </button>
        </div>
      </div>
    </header>
  );
};
