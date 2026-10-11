import React, { useState, useRef, useEffect } from 'react';
import {
  Copy,
  Check,
  Share2,
  Download,
  Trash2,
  Settings,
  Ban,
  Search,
  SlidersHorizontal,
  Upload,
  FileText,
  Columns,
  Square,
  ArrowRight,
} from 'lucide-react';
import {
  toSentenceCase,
  toLowerCase,
  toUpperCase,
  toCapitalizedCase,
  toAlternatingCase,
  toTitleCase,
  toInverseCase,
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toKebabCase,
  toConstantCase,
  toDotCase,
  toSlug,
  removeExtraSpaces,
  removeEmptyLines,
  removeDuplicateLines,
  sortLines,
  reverseText,
  calculateTextStats,
  TextStats,
} from '../utils/textTransform';
import { ConverterSettings, SettingsModal } from './SettingsModal';
import { DetailedStatsModal } from './DetailedStatsModal';
import { ShareModal } from './ShareModal';
import { FindReplaceBar } from './FindReplaceBar';
import { AdvancedToolsBar } from './AdvancedToolsBar';
import { COLOR_THEMES } from '../utils/themeConfig';

interface ConverterCardProps {
  onShowToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  isAdFreeMode: boolean;
  onToggleAdFree: () => void;
  themeId: string;
  onSelectTheme: (themeId: string) => void;
}

export const ConverterCard: React.FC<ConverterCardProps> = ({
  onShowToast,
  isAdFreeMode,
  onToggleAdFree,
  themeId,
  onSelectTheme,
}) => {
  const [text, setText] = useState<string>('');
  const [convertedText, setConvertedText] = useState<string>('');
  const [activeCaseName, setActiveCaseName] = useState<string>('Sentence case');
  const [viewMode, setViewMode] = useState<'single' | 'split'>('single');
  const [history, setHistory] = useState<string[]>(['']);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isCopiedSplit, setIsCopiedSplit] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [showAdvancedTools, setShowAdvancedTools] = useState(false);

  const [settings, setSettings] = useState<ConverterSettings>({
    preserveAcronyms: true,
    autoCopyOnConvert: false,
    fontSize: 'base',
    fontFamily: 'sans',
    trimTrailingSpaces: false,
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentTheme = COLOR_THEMES[themeId] || COLOR_THEMES['nasir-cyan'];
  const isCardDark = currentTheme.cardBgClass !== 'bg-white';

  // Check URL hash for pre-filled text
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const sharedText = hashParams.get('text');
      if (sharedText) {
        setText(sharedText);
        setHistory([sharedText]);
        setHistoryIndex(0);
        setConvertedText(toSentenceCase(sharedText));
        onShowToast('Text loaded from shareable link!', 'info');
      }
    }
  }, []);

  // Update history helper
  const pushToHistory = (newText: string) => {
    if (newText === text) return;
    const updated = history.slice(0, historyIndex + 1);
    updated.push(newText);
    if (updated.length > 50) updated.shift();
    setHistory(updated);
    setHistoryIndex(updated.length - 1);
    setText(newText);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setText(prev);
      setConvertedText(transformByCurrentCase(prev, activeCaseName));
      onShowToast('Action undone', 'info');
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setText(next);
      setConvertedText(transformByCurrentCase(next, activeCaseName));
      onShowToast('Action redone', 'info');
    }
  };

  // Helper to re-apply current case on input change in split view
  const transformByCurrentCase = (input: string, caseName: string): string => {
    switch (caseName) {
      case 'Sentence case': return toSentenceCase(input);
      case 'lower case': return toLowerCase(input);
      case 'UPPER CASE': return toUpperCase(input);
      case 'Capitalized Case': return toCapitalizedCase(input);
      case 'aLtErNaTiNg cAsE': return toAlternatingCase(input);
      case 'Title Case': return toTitleCase(input, settings.preserveAcronyms);
      case 'InVErsE CaSe': return toInverseCase(input);
      default: return input;
    }
  };

  // Keyboard shortcuts (Ctrl+Z, Ctrl+Y, Ctrl+F)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setShowFindReplace((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history]);

  // Handle case conversion
  const finalizeConversion = (transformedText: string, caseName: string) => {
    let finalOutput = transformedText;
    if (settings.trimTrailingSpaces) {
      finalOutput = finalOutput.replace(/[ \t]+$/gm, '');
    }

    setActiveCaseName(caseName);
    setConvertedText(finalOutput);

    if (viewMode === 'single') {
      pushToHistory(finalOutput);
    }

    if (settings.autoCopyOnConvert && finalOutput) {
      navigator.clipboard.writeText(finalOutput).catch(() => {});
      onShowToast(`Converted to ${caseName} & copied to clipboard!`, 'success');
    } else {
      onShowToast(`Converted to ${caseName}`, 'success');
    }
  };

  // Primary Case Handlers
  const handleSentenceCase = () => finalizeConversion(toSentenceCase(text), 'Sentence case');
  const handleLowerCase = () => finalizeConversion(toLowerCase(text), 'lower case');
  const handleUpperCase = () => finalizeConversion(toUpperCase(text), 'UPPER CASE');
  const handleCapitalizedCase = () => finalizeConversion(toCapitalizedCase(text), 'Capitalized Case');
  const handleAlternatingCase = () => finalizeConversion(toAlternatingCase(text), 'aLtErNaTiNg cAsE');
  const handleTitleCase = () =>
    finalizeConversion(toTitleCase(text, settings.preserveAcronyms), 'Title Case');
  const handleInverseCase = () => finalizeConversion(toInverseCase(text), 'InVErsE CaSe');

  // Developer cases
  const handleDeveloperCase = (type: string) => {
    switch (type) {
      case 'camelCase': finalizeConversion(toCamelCase(text), 'camelCase'); break;
      case 'PascalCase': finalizeConversion(toPascalCase(text), 'PascalCase'); break;
      case 'snake_case': finalizeConversion(toSnakeCase(text), 'snake_case'); break;
      case 'kebab-case': finalizeConversion(toKebabCase(text), 'kebab-case'); break;
      case 'CONSTANT_CASE': finalizeConversion(toConstantCase(text), 'CONSTANT_CASE'); break;
      case 'dot.case': finalizeConversion(toDotCase(text), 'dot.case'); break;
      case 'slug': finalizeConversion(toSlug(text), 'URL slug'); break;
    }
  };

  // Cleaning tools
  const handleCleanTool = (type: string) => {
    switch (type) {
      case 'extraSpaces': finalizeConversion(removeExtraSpaces(text), 'Cleaned extra spaces'); break;
      case 'emptyLines': finalizeConversion(removeEmptyLines(text), 'Removed empty lines'); break;
      case 'duplicateLines': finalizeConversion(removeDuplicateLines(text), 'Removed duplicate lines'); break;
      case 'sortAsc': finalizeConversion(sortLines(text, 'asc'), 'Sorted lines (A-Z)'); break;
      case 'sortDesc': finalizeConversion(sortLines(text, 'desc'), 'Sorted lines (Z-A)'); break;
      case 'reverse': finalizeConversion(reverseText(text), 'Reversed text'); break;
    }
  };

  // Presets
  const handleLoadSample = (sampleType: string) => {
    let sample = '';
    if (sampleType === 'article') {
      sample =
        'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.\n\nconvert case is an easy-to-use online tool that allows you to change between lowercase, UPPERCASE, sentence case, and title case with a single click. Try clicking any button below to see the instant transformation!';
    } else if (sampleType === 'messy') {
      sample =
        'tHiS iS aN eXaMpLe oF MeSsY aNd uNeVeN cAsInG! sOmE wOrDs aRe uPPerCASe, wHiLe oThErs aRe lOwErCaSe. LeTs cOnVeRt iT tO a bEaUtIfUl fOrMaT!';
    } else if (sampleType === 'code') {
      sample =
        'userProfileData\nfetchApiEndpoint\ncalculateTotalPrice\nisAccountVerified\nmaximum_retry_count\nDEFAULT_PAGE_SIZE';
    }
    pushToHistory(sample);
    setConvertedText(transformByCurrentCase(sample, activeCaseName));
    onShowToast('Sample text loaded!', 'info');
  };

  // Actions
  const handleCopy = async (targetText = text) => {
    if (!targetText) {
      onShowToast('Text is empty, nothing to copy!', 'warning');
      return;
    }
    try {
      await navigator.clipboard.writeText(targetText);
      setIsCopied(true);
      onShowToast('Copied to clipboard!', 'success');
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      onShowToast('Failed to copy', 'warning');
    }
  };

  const handleCopySplit = async () => {
    if (!convertedText) {
      onShowToast('Converted text is empty!', 'warning');
      return;
    }
    try {
      await navigator.clipboard.writeText(convertedText);
      setIsCopiedSplit(true);
      onShowToast('Copied converted text!', 'success');
      setTimeout(() => setIsCopiedSplit(false), 2000);
    } catch {
      onShowToast('Failed to copy', 'warning');
    }
  };

  const handleDownload = (targetText = text) => {
    if (!targetText) {
      onShowToast('Text is empty, nothing to download!', 'warning');
      return;
    }
    const blob = new Blob([targetText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'converted-text.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    onShowToast('Downloaded as converted-text.txt', 'success');
  };

  const handleClear = () => {
    if (!text && !convertedText) return;
    pushToHistory('');
    setConvertedText('');
    onShowToast('Text cleared. You can Undo (Ctrl+Z) anytime.', 'info');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content !== undefined) {
        pushToHistory(content);
        setConvertedText(transformByCurrentCase(content, activeCaseName));
        onShowToast(`Loaded file: ${file.name}`, 'success');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const stats: TextStats = calculateTextStats(text);
  const splitStats: TextStats = calculateTextStats(convertedText || text);

  const fontSizeClasses = {
    sm: 'text-xs leading-relaxed',
    base: 'text-sm leading-relaxed',
    lg: 'text-base leading-relaxed',
    xl: 'text-lg leading-relaxed',
  };

  const isMono = settings.fontFamily === 'mono';

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Top helper utilities bar */}
      <div className="flex flex-wrap items-center justify-between mb-3 px-1 text-xs text-zinc-400 gap-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleLoadSample('article')}
            className="hover:text-white font-medium flex items-center gap-1 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-zinc-400" />
            <span>Load Sample Text</span>
          </button>
          <span className="text-zinc-600">|</span>
          <label className="hover:text-white font-medium flex items-center gap-1 transition-colors cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-zinc-400" />
            <span>Upload .txt File</span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.md,.json,.csv,.text"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* View Mode & Extra Tools Switchers */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggle: Single vs Side-by-Side (Split) */}
          <div className="flex items-center p-0.5 rounded-lg border border-zinc-800 bg-zinc-900 text-xs">
            <button
              onClick={() => setViewMode('single')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                viewMode === 'single'
                  ? 'bg-white text-zinc-950 font-semibold shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Single Unified Editor (like original image)"
            >
              <Square className="w-3 h-3" />
              <span>Single Box</span>
            </button>
            <button
              onClick={() => {
                setViewMode('split');
                if (!convertedText) {
                  setConvertedText(toSentenceCase(text));
                }
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                viewMode === 'split'
                  ? 'bg-white text-zinc-950 font-semibold shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
              title="Side-by-Side Split View (Input on Left, Converted Output on Right)"
            >
              <Columns className="w-3 h-3" />
              <span>Side-by-Side</span>
            </button>
          </div>

          <button
            onClick={() => setShowFindReplace((prev) => !prev)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
              showFindReplace
                ? 'bg-zinc-800 text-white border-zinc-700'
                : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Find & Replace</span>
          </button>

          <button
            onClick={() => setShowAdvancedTools((prev) => !prev)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
              showAdvancedTools
                ? 'bg-zinc-800 text-white border-zinc-700'
                : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{showAdvancedTools ? 'Hide Extra' : 'More Tools'}</span>
          </button>
        </div>
      </div>

      {/* Main Converter Card */}
      <div
        className={`rounded-xl border overflow-hidden transition-all duration-200 ${
          currentTheme.cardBgClass
        } ${currentTheme.cardBorderClass} ${currentTheme.cardShadowClass}`}
      >
        {/* Find & Replace Bar (Collapsible) */}
        <FindReplaceBar
          isOpen={showFindReplace}
          onClose={() => setShowFindReplace(false)}
          text={text}
          onReplace={(newText, count) => {
            pushToHistory(newText);
            setConvertedText(transformByCurrentCase(newText, activeCaseName));
            onShowToast(`Replaced ${count} occurrences!`, 'success');
          }}
        />

        {/* EDITOR AREA: Single View vs Side-by-Side View */}
        {viewMode === 'single' ? (
          /* Single Textarea View (Exact match to user's uploaded screenshot) */
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => {
                const val = e.target.value;
                setText(val);
                setConvertedText(transformByCurrentCase(val, activeCaseName));
                const updated = history.slice(0, historyIndex + 1);
                updated.push(val);
                if (updated.length > 50) updated.shift();
                setHistory(updated);
                setHistoryIndex(updated.length - 1);
              }}
              placeholder="Type or paste your content here"
              className={`w-full min-h-[280px] md:min-h-[320px] p-5 md:p-6 resize-y bg-transparent focus:outline-none placeholder:text-slate-400 ${
                fontSizeClasses[settings.fontSize]
              } ${isMono ? 'font-mono' : 'font-sans'} ${
                isCardDark ? 'text-white' : 'text-slate-900'
              }`}
              spellCheck="true"
            />
          </div>
        ) : (
          /* Side-by-Side Split View (Left: Original, Right: Converted Output) */
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800">
            {/* Left Side: Original Input */}
            <div className="flex flex-col">
              <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 flex items-center justify-between text-2xs uppercase tracking-wider text-zinc-500 font-semibold">
                <span>Original Input</span>
                <span className="font-mono">{stats.wordCount} words</span>
              </div>
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => {
                  const val = e.target.value;
                  setText(val);
                  setConvertedText(transformByCurrentCase(val, activeCaseName));
                  const updated = history.slice(0, historyIndex + 1);
                  updated.push(val);
                  if (updated.length > 50) updated.shift();
                  setHistory(updated);
                  setHistoryIndex(updated.length - 1);
                }}
                placeholder="Type or paste text to convert..."
                className={`w-full flex-1 min-h-[260px] md:min-h-[300px] p-4 resize-none bg-transparent focus:outline-none placeholder:text-slate-400 ${
                  fontSizeClasses[settings.fontSize]
                } ${isMono ? 'font-mono' : 'font-sans'}`}
              />
            </div>

            {/* Right Side: Converted Output */}
            <div className="flex flex-col bg-zinc-50/40 dark:bg-zinc-950/30">
              <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/80 flex items-center justify-between text-2xs uppercase tracking-wider text-zinc-500 font-semibold">
                <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                  <ArrowRight className="w-3 h-3" />
                  <span>Converted ({activeCaseName})</span>
                </div>
                <button
                  onClick={handleCopySplit}
                  className="flex items-center gap-1 text-2xs normal-case font-medium text-slate-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                >
                  {isCopiedSplit ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{isCopiedSplit ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <textarea
                readOnly
                value={convertedText || text}
                placeholder="Converted text will appear here automatically..."
                className={`w-full flex-1 min-h-[260px] md:min-h-[300px] p-4 resize-none bg-transparent focus:outline-none placeholder:text-slate-400 select-all ${
                  fontSizeClasses[settings.fontSize]
                } ${isMono ? 'font-mono' : 'font-sans'} text-slate-800 dark:text-zinc-100`}
              />
            </div>
          </div>
        )}

        {/* Bottom Toolbar inside the editor card */}
        <div
          className={`px-4 py-3 border-t flex flex-wrap items-center justify-between gap-3 select-none ${
            isCardDark
              ? 'bg-[#040814]/80 border-cyan-900/40 text-slate-300'
              : 'bg-slate-50/80 border-slate-200/90 text-slate-700'
          }`}
        >
          {/* Action icon group */}
          <div className="flex items-center gap-2">
            {/* Copy button */}
            <button
              onClick={() => handleCopy(viewMode === 'split' ? convertedText || text : text)}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                isCopied
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                  : isCardDark
                  ? 'bg-[#0a152e] border-cyan-900/50 hover:bg-[#0f1d38] hover:border-cyan-500/40 text-cyan-200'
                  : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700 shadow-2xs'
              }`}
              title="Copy to clipboard"
              aria-label="Copy to clipboard"
            >
              {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Share button */}
            <button
              onClick={() => setShowShareModal(true)}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                isCardDark
                  ? 'bg-[#0a152e] border-cyan-900/50 hover:bg-[#0f1d38] hover:border-cyan-500/40 text-cyan-200'
                  : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700 shadow-2xs'
              }`}
              title="Share or create link"
              aria-label="Share text"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Download button */}
            <button
              onClick={() => handleDownload(viewMode === 'split' ? convertedText || text : text)}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                isCardDark
                  ? 'bg-[#0a152e] border-cyan-900/50 hover:bg-[#0f1d38] hover:border-cyan-500/40 text-cyan-200'
                  : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700 shadow-2xs'
              }`}
              title="Download text file (.txt)"
              aria-label="Download text file"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Trash / Clear button */}
            <button
              onClick={handleClear}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                isCardDark
                  ? 'bg-[#0a152e] border-cyan-900/50 hover:bg-rose-950/60 hover:text-rose-400 text-cyan-200'
                  : 'bg-white border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-700 shadow-2xs'
              }`}
              title="Clear text"
              aria-label="Clear text"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Settings button */}
            <button
              onClick={() => setShowSettingsModal(true)}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                isCardDark
                  ? 'bg-[#0a152e] border-cyan-900/50 hover:bg-[#0f1d38] hover:border-cyan-500/40 text-cyan-200'
                  : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700 shadow-2xs'
              }`}
              title="Converter settings"
              aria-label="Converter settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {/* Statistics text */}
          <button
            onClick={() => setShowStatsModal(true)}
            className={`text-xs font-mono tabular-nums transition-colors cursor-pointer px-2.5 py-1 rounded-md ${
              isCardDark
                ? 'text-cyan-300/80 hover:text-cyan-200 hover:bg-cyan-950/40'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
            title="Click for full text analytics"
          >
            Character Count:{' '}
            <span className="font-semibold text-slate-900 dark:text-cyan-200">
              {viewMode === 'split' ? splitStats.characterCount : stats.characterCount}
            </span>{' '}
            | Word Count:{' '}
            <span className="font-semibold text-slate-900 dark:text-cyan-200">
              {viewMode === 'split' ? splitStats.wordCount : stats.wordCount}
            </span>{' '}
            | Line Count:{' '}
            <span className="font-semibold text-slate-900 dark:text-cyan-200">
              {viewMode === 'split' ? splitStats.lineCount : stats.lineCount}
            </span>
          </button>
        </div>
      </div>

      {/* Case Conversion Buttons Bar - Exact match to user screenshot */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          {/* Sentence case */}
          <button
            onClick={handleSentenceCase}
            className={`group border px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-2xs transition-all active:scale-98 cursor-pointer ${
              activeCaseName === 'Sentence case' ? 'ring-2 ring-cyan-400' : ''
            } ${
              isCardDark
                ? 'bg-[#0a152e] hover:bg-[#0f1d38] border-cyan-950 hover:border-cyan-500/40 text-slate-100'
                : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
            }`}
          >
            <span className="bg-[#ffedd5] text-[#c2410c] text-xs font-bold px-1.5 py-0.5 rounded leading-none shrink-0">
              Sc
            </span>
            <span className="text-xs font-medium whitespace-nowrap">
              Sentence case
            </span>
          </button>

          {/* lower case */}
          <button
            onClick={handleLowerCase}
            className={`group border px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-2xs transition-all active:scale-98 cursor-pointer ${
              activeCaseName === 'lower case' ? 'ring-2 ring-cyan-400' : ''
            } ${
              isCardDark
                ? 'bg-[#0a152e] hover:bg-[#0f1d38] border-cyan-950 hover:border-cyan-500/40 text-slate-100'
                : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
            }`}
          >
            <span className="bg-[#dcfce7] text-[#15803d] text-xs font-bold px-1.5 py-0.5 rounded leading-none shrink-0">
              lc
            </span>
            <span className="text-xs font-medium whitespace-nowrap">
              lower case
            </span>
          </button>

          {/* UPPER CASE */}
          <button
            onClick={handleUpperCase}
            className={`group border px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-2xs transition-all active:scale-98 cursor-pointer ${
              activeCaseName === 'UPPER CASE' ? 'ring-2 ring-cyan-400' : ''
            } ${
              isCardDark
                ? 'bg-[#0a152e] hover:bg-[#0f1d38] border-cyan-950 hover:border-cyan-500/40 text-slate-100'
                : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
            }`}
          >
            <span className="bg-[#e0f2fe] text-[#0369a1] text-xs font-bold px-1.5 py-0.5 rounded leading-none shrink-0">
              UC
            </span>
            <span className="text-xs font-medium whitespace-nowrap">
              UPPER CASE
            </span>
          </button>

          {/* Capitalized Case */}
          <button
            onClick={handleCapitalizedCase}
            className={`group border px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-2xs transition-all active:scale-98 cursor-pointer ${
              activeCaseName === 'Capitalized Case' ? 'ring-2 ring-cyan-400' : ''
            } ${
              isCardDark
                ? 'bg-[#0a152e] hover:bg-[#0f1d38] border-cyan-950 hover:border-cyan-500/40 text-slate-100'
                : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
            }`}
          >
            <span className="bg-[#f3e8ff] text-[#7e22ce] text-xs font-bold px-1.5 py-0.5 rounded leading-none shrink-0">
              CC
            </span>
            <span className="text-xs font-medium whitespace-nowrap">
              Capitalized Case
            </span>
          </button>

          {/* aLtErNaTiNg cAsE */}
          <button
            onClick={handleAlternatingCase}
            className={`group border px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-2xs transition-all active:scale-98 cursor-pointer ${
              activeCaseName === 'aLtErNaTiNg cAsE' ? 'ring-2 ring-cyan-400' : ''
            } ${
              isCardDark
                ? 'bg-[#0a152e] hover:bg-[#0f1d38] border-cyan-950 hover:border-cyan-500/40 text-slate-100'
                : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
            }`}
          >
            <span className="bg-[#fef9c3] text-[#a16207] text-xs font-bold px-1.5 py-0.5 rounded leading-none shrink-0">
              aC
            </span>
            <span className="text-xs font-medium whitespace-nowrap">
              aLtErNaTiNg cAsE
            </span>
          </button>

          {/* Title Case */}
          <button
            onClick={handleTitleCase}
            className={`group border px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-2xs transition-all active:scale-98 cursor-pointer ${
              activeCaseName === 'Title Case' ? 'ring-2 ring-cyan-400' : ''
            } ${
              isCardDark
                ? 'bg-[#0a152e] hover:bg-[#0f1d38] border-cyan-950 hover:border-cyan-500/40 text-slate-100'
                : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
            }`}
          >
            <span className="bg-[#ccfbf1] text-[#0f766e] text-xs font-bold px-1.5 py-0.5 rounded leading-none shrink-0">
              TC
            </span>
            <span className="text-xs font-medium whitespace-nowrap">
              Title Case
            </span>
          </button>

          {/* InVErsE CaSe */}
          <button
            onClick={handleInverseCase}
            className={`group border px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-2xs transition-all active:scale-98 cursor-pointer ${
              activeCaseName === 'InVErsE CaSe' ? 'ring-2 ring-cyan-400' : ''
            } ${
              isCardDark
                ? 'bg-[#0a152e] hover:bg-[#0f1d38] border-cyan-950 hover:border-cyan-500/40 text-slate-100'
                : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
            }`}
          >
            <span className="bg-[#fce7f3] text-[#be185d] text-xs font-bold px-1.5 py-0.5 rounded leading-none shrink-0">
              iC
            </span>
            <span className="text-xs font-medium whitespace-nowrap">
              InVErsE CaSe
            </span>
          </button>
        </div>

        {/* Remove Ads button */}
        <button
          onClick={onToggleAdFree}
          className={`px-3.5 py-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold shadow-xs transition-colors shrink-0 cursor-pointer ${
            isAdFreeMode
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : isCardDark
              ? 'bg-[#040814] hover:bg-[#0a152e] text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
              : 'bg-zinc-950 hover:bg-zinc-800 text-white border border-zinc-800'
          }`}
          title="Toggle 100% Ad-Free Focus Mode"
        >
          <Ban className="w-3.5 h-3.5" />
          <span>{isAdFreeMode ? 'Ad-free Active' : 'Remove ads'}</span>
        </button>
      </div>

      {/* Advanced Tools Drawer */}
      {showAdvancedTools && (
        <AdvancedToolsBar
          onApplyCase={handleDeveloperCase}
          onApplyClean={handleCleanTool}
          onLoadSample={handleLoadSample}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          onUndo={handleUndo}
          onRedo={handleRedo}
        />
      )}

      {/* Modals */}
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        settings={settings}
        onUpdateSettings={setSettings}
      />

      <DetailedStatsModal
        isOpen={showStatsModal}
        onClose={() => setShowStatsModal(false)}
        stats={viewMode === 'split' ? splitStats : stats}
        text={viewMode === 'split' ? convertedText || text : text}
      />

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        text={viewMode === 'split' ? convertedText || text : text}
        onShowToast={(msg) => onShowToast(msg, 'success')}
      />
    </div>
  );
};
