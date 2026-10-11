/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ConverterCard } from './components/ConverterCard';
import { ToastContainer, ToastMessage } from './components/Toast';
import { ShortcutsModal } from './components/ShortcutsModal';
import { CaseGuideModal } from './components/CaseGuideModal';
import { ShieldCheck, Zap, Sparkles, Check } from 'lucide-react';
import { COLOR_THEMES } from './utils/themeConfig';

export default function App() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [isAdFreeMode, setIsAdFreeMode] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  // Default to Nasir Portfolio theme ('nasir-cyan') matching nasir369.vercel.app
  const [themeId, setThemeId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('convertcase_theme') || 'nasir-cyan';
    }
    return 'nasir-cyan';
  });

  const currentTheme = COLOR_THEMES[themeId] || COLOR_THEMES['nasir-cyan'];

  // Sync full mobile viewport background and browser theme-color
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.backgroundColor = currentTheme.bgHex;
      document.documentElement.style.backgroundColor = currentTheme.bgHex;
      let metaTheme = document.querySelector('meta[name="theme-color"]');
      if (!metaTheme) {
        metaTheme = document.createElement('meta');
        metaTheme.setAttribute('name', 'theme-color');
        document.head.appendChild(metaTheme);
      }
      metaTheme.setAttribute('content', currentTheme.bgHex);
    }
  }, [themeId, currentTheme]);

  const handleSelectTheme = (newThemeId: string) => {
    setThemeId(newThemeId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('convertcase_theme', newThemeId);
    }
  };

  const showToast = (text: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleAdFree = () => {
    setIsAdFreeMode((prev) => {
      const next = !prev;
      if (next) {
        showToast('Ad-free mode activated! Enjoy a distraction-free experience.', 'success');
      } else {
        showToast('Standard mode restored.', 'info');
      }
      return next;
    });
  };

  const handleNewDocument = () => {
    setResetKey((prev) => prev + 1);
    showToast('New document created', 'info');
  };

  const isLight = !currentTheme.isDark;

  return (
    <div
      className={`min-h-screen flex flex-col antialiased transition-colors duration-200 ${
        currentTheme.bgClass
      } ${currentTheme.textColor} ${currentTheme.selectionClass}`}
    >
      {/* Top Header */}
      <Header
        onOpenShortcuts={() => setShowShortcuts(true)}
        onOpenGuide={() => setShowGuide(true)}
        onReset={handleNewDocument}
        themeId={themeId}
        onChangeTheme={handleSelectTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-4 sm:py-10 px-3 sm:px-6 max-w-6xl mx-auto w-full">
        {/* Section Intro */}
        <div className="text-center mb-4 sm:mb-8 max-w-2xl mx-auto">
          <h1
            className={`text-2xl sm:text-3xl font-bold tracking-tight mb-2 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            Online Text Case Converter
          </h1>
          <p
            className={`text-xs sm:text-sm leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            Convert between Sentence case, lower case, UPPER CASE, Title Case, and developer formats with live word and character counters.
          </p>

          <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-2xs font-semibold bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentTheme.dotColor }} />
              <span>{currentTheme.name}</span>
            </span>

            {isAdFreeMode && (
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-emerald-950/60 border border-emerald-700/80 text-emerald-300 rounded-full text-2xs font-medium animate-in fade-in">
                <Check className="w-3 h-3 text-emerald-400" />
                <span>Ad-Free Focus Active</span>
              </span>
            )}
          </div>
        </div>

        {/* Primary Case Converter Card */}
        <section id="converter" aria-label="Text Case Converter">
          <ConverterCard
            key={resetKey}
            onShowToast={showToast}
            isAdFreeMode={isAdFreeMode}
            onToggleAdFree={handleToggleAdFree}
            themeId={themeId}
            onSelectTheme={handleSelectTheme}
          />
        </section>

        {/* Informative Feature Highlights */}
        <section
          id="features"
          className={`mt-16 sm:mt-20 pt-10 border-t ${
            isLight ? 'border-slate-200' : 'border-cyan-950/60'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className={`rounded-xl p-5 border shadow-2xs transition-colors ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-800'
                  : 'bg-[#070e20] border-cyan-900/40 text-slate-300'
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className={`text-sm font-semibold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Instant Conversions
              </h3>
              <p className="text-xs leading-relaxed opacity-80">
                Transform paragraphs, essays, code identifiers, or lists with zero latency right in your browser.
              </p>
            </div>

            <div
              className={`rounded-xl p-5 border shadow-2xs transition-colors ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-800'
                  : 'bg-[#070e20] border-cyan-900/40 text-slate-300'
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className={`text-sm font-semibold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                100% Client-Side Privacy
              </h3>
              <p className="text-xs leading-relaxed opacity-80">
                Your text stays strictly on your computer and is never sent to external servers or stored in any database.
              </p>
            </div>

            <div
              className={`rounded-xl p-5 border shadow-2xs transition-colors ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-800'
                  : 'bg-[#070e20] border-cyan-900/40 text-slate-300'
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-3">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className={`text-sm font-semibold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Developer & Text Tools
              </h3>
              <p className="text-xs leading-relaxed opacity-80">
                Includes camelCase, PascalCase, snake_case, line sorting, duplicate line removal, and live statistics.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className={`mt-auto border-t py-6 text-center text-xs transition-colors ${
          isLight
            ? 'border-slate-200 bg-white/80 text-slate-500'
            : 'border-cyan-950/60 bg-[#040814]/90 text-slate-400'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-medium">
            <span className={isLight ? 'text-slate-700' : 'text-slate-200'}>ConvertCase</span>
            <span className="text-slate-600">·</span>
            <span>
              Developed by{' '}
              <a
                href="https://nasir369.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                nasir369
              </a>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowGuide(true)}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Case Guide
            </button>
            <button
              onClick={() => setShowShortcuts(true)}
              className="hover:text-cyan-300 transition-colors cursor-pointer"
            >
              Shortcuts
            </button>
            <span className="text-slate-600">·</span>
            <span>Private & Browser-Based</span>
          </div>
        </div>
      </footer>

      {/* Modal Dialogs */}
      <ShortcutsModal isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />
      <CaseGuideModal isOpen={showGuide} onClose={() => setShowGuide(false)} />

      {/* Global Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
