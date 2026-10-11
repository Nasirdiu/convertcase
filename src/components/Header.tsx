import React, { useState } from 'react';
import { Type, Menu, X, BookOpen, Keyboard, Palette } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentTheme = COLOR_THEMES[themeId] || COLOR_THEMES['nasir-cyan'];
  const isLight = !currentTheme.isDark;

  return (
    <header
      className={`border-b sticky top-0 z-40 transition-colors backdrop-blur-md ${
        currentTheme.headerBgClass
      } ${currentTheme.headerBorderClass}`}
    >
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 h-14 flex items-center justify-between gap-3 sm:gap-6">
        {/* Zone 1: Single element wordmark */}
        <a
          href="/"
          className={`text-base sm:text-lg font-bold tracking-tight whitespace-nowrap shrink-0 flex items-center gap-2 hover:opacity-90 transition-opacity ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}
        >
          <div className="w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-md bg-cyan-500 text-black flex items-center justify-center font-black text-sm shadow-[0_0_12px_rgba(6,182,212,0.4)]">
            <Type className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black stroke-[2.5]" />
          </div>
          <div className="flex items-center gap-1.5">
            <span>ConvertCase</span>
            <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Pro
            </span>
          </div>
        </a>

        {/* Zone 2: Desktop nav links */}
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

        {/* Zone 3: Actions & Color Theme Picker */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Centered color selector trigger */}
          <ThemeSelector
            currentThemeId={themeId}
            onSelectTheme={onChangeTheme}
          />

          <button
            onClick={onReset}
            className="hidden sm:inline-flex px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-95"
          >
            New Document
          </button>

          {/* Mobile hamburger menu button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-1.5 rounded-lg border border-cyan-500/30 bg-[#0a152e]/80 text-cyan-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle mobile navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown / Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-cyan-950/80 bg-[#040814]/95 backdrop-blur-xl px-4 py-3.5 space-y-2.5 animate-in slide-in-from-top-2 text-xs">
          <a
            href="#converter"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1.5 text-slate-200 hover:text-cyan-300 font-medium transition-colors"
          >
            Case Converter
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenGuide();
            }}
            className="w-full text-left py-1.5 text-slate-200 hover:text-cyan-300 font-medium transition-colors flex items-center gap-2"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Guide & Rules</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenShortcuts();
            }}
            className="w-full text-left py-1.5 text-slate-200 hover:text-cyan-300 font-medium transition-colors flex items-center gap-2"
          >
            <Keyboard className="w-3.5 h-3.5 text-cyan-400" />
            <span>Keyboard Shortcuts</span>
          </button>
          <div className="pt-2 border-t border-cyan-950/60 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onReset();
              }}
              className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg text-center"
            >
              New Document
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
