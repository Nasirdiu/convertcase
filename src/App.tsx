/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header, ThemeOption } from './components/Header';
import { ConverterCard } from './components/ConverterCard';
import { ToastContainer, ToastMessage } from './components/Toast';
import { ShortcutsModal } from './components/ShortcutsModal';
import { CaseGuideModal } from './components/CaseGuideModal';
import { ShieldCheck, Zap, Sparkles, Check } from 'lucide-react';

export default function App() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [isAdFreeMode, setIsAdFreeMode] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  // Default to 'side-black-white': sides/background are black, center editor is crisp white!
  const [theme, setTheme] = useState<ThemeOption>('side-black-white');

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

  const isLight = theme === 'full-light';

  return (
    <div
      className={`min-h-screen flex flex-col antialiased transition-colors duration-200 ${
        isLight
          ? 'bg-slate-100 text-slate-800 selection:bg-blue-100 selection:text-blue-900'
          : 'bg-[#09090b] text-white selection:bg-zinc-800 selection:text-white'
      }`}
    >
      {/* Top Header */}
      <Header
        onOpenShortcuts={() => setShowShortcuts(true)}
        onOpenGuide={() => setShowGuide(true)}
        onReset={handleNewDocument}
        theme={theme}
        onChangeTheme={setTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        {/* Section Intro */}
        <div className="text-center mb-6 sm:mb-8 max-w-2xl mx-auto">
          <h1
            className={`text-2xl sm:text-3xl font-bold tracking-tight mb-2 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            Online Text Case Converter
          </h1>
          <p
            className={`text-xs sm:text-sm leading-relaxed ${
              isLight ? 'text-slate-600' : 'text-zinc-400'
            }`}
          >
            Type or paste your content to instantly convert between Sentence case, lower case, UPPER CASE, Title Case, and developer formats with live word and character counters.
          </p>

          {isAdFreeMode && (
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950/60 border border-emerald-700/80 text-emerald-300 rounded-full text-xs font-medium animate-in fade-in">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ad-Free Focus Mode Active</span>
            </div>
          )}
        </div>

        {/* Primary Case Converter Card */}
        <section id="converter" aria-label="Text Case Converter">
          <ConverterCard
            key={resetKey}
            onShowToast={showToast}
            isAdFreeMode={isAdFreeMode}
            onToggleAdFree={handleToggleAdFree}
            theme={theme}
          />
        </section>

        {/* Informative Feature Highlights */}
        <section
          id="features"
          className={`mt-16 sm:mt-20 pt-10 border-t ${
            isLight ? 'border-slate-200/60' : 'border-zinc-800/80'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className={`rounded-xl p-5 border shadow-2xs transition-colors ${
                isLight
                  ? 'bg-white/80 border-slate-200 text-slate-800'
                  : 'bg-zinc-900/60 border-zinc-800 text-zinc-300'
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
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
                  ? 'bg-white/80 border-slate-200 text-slate-800'
                  : 'bg-zinc-900/60 border-zinc-800 text-zinc-300'
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
                  ? 'bg-white/80 border-slate-200 text-slate-800'
                  : 'bg-zinc-900/60 border-zinc-800 text-zinc-300'
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
            ? 'border-slate-200/80 bg-white/60 text-slate-500'
            : 'border-zinc-800/80 bg-zinc-950/80 text-zinc-500'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-medium">
            <span className={isLight ? 'text-slate-700' : 'text-zinc-300'}>ConvertCase</span>
            <span className="text-zinc-600">·</span>
            <span>
              Developed by{' '}
              <a
                href="https://nasir369.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className={`font-semibold underline underline-offset-2 transition-colors ${
                  isLight ? 'text-blue-600 hover:text-blue-700' : 'text-blue-400 hover:text-blue-300'
                }`}
              >
                nasir369
              </a>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://nasir369.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:underline font-medium transition-colors ${
                isLight ? 'text-slate-700 hover:text-black' : 'text-zinc-300 hover:text-white'
              }`}
            >
              nasir369 Portfolio
            </a>
            <span className="text-zinc-600">·</span>
            <button
              onClick={() => setShowGuide(true)}
              className="hover:text-zinc-200 transition-colors cursor-pointer"
            >
              Case Guide
            </button>
            <button
              onClick={() => setShowShortcuts(true)}
              className="hover:text-zinc-200 transition-colors cursor-pointer"
            >
              Shortcuts
            </button>
            <span className="text-zinc-600">·</span>
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
