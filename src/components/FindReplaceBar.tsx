import React, { useState } from 'react';
import { Search, Replace, X, ChevronRight } from 'lucide-react';

interface FindReplaceBarProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  onReplace: (newText: string, count: number) => void;
}

export const FindReplaceBar: React.FC<FindReplaceBarProps> = ({
  isOpen,
  onClose,
  text,
  onReplace,
}) => {
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [matchCase, setMatchCase] = useState(false);
  const [useRegex, setUseRegex] = useState(false);

  if (!isOpen) return null;

  // Calculate matches count
  let matchCount = 0;
  if (findText.trim().length > 0) {
    try {
      const flags = matchCase ? 'g' : 'gi';
      const regex = useRegex
        ? new RegExp(findText, flags)
        : new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
      const matches = text.match(regex);
      matchCount = matches ? matches.length : 0;
    } catch {
      matchCount = 0;
    }
  }

  const handleReplaceAll = () => {
    if (!findText) return;
    try {
      const flags = matchCase ? 'g' : 'gi';
      const regex = useRegex
        ? new RegExp(findText, flags)
        : new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
      const newText = text.replace(regex, replaceText);
      onReplace(newText, matchCount);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReplaceFirst = () => {
    if (!findText) return;
    try {
      const flags = matchCase ? '' : 'i';
      const regex = useRegex
        ? new RegExp(findText, flags)
        : new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
      const newText = text.replace(regex, replaceText);
      onReplace(newText, 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex flex-wrap items-center gap-3 text-xs animate-in slide-in-from-top-1">
      <div className="flex items-center gap-2 flex-1 min-w-[200px]">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Find text..."
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <div className="relative flex-1">
          <Replace className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Replace with..."
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Match counter badge */}
      {findText.length > 0 && (
        <span className="font-mono text-slate-500 text-2xs px-2 py-0.5 bg-slate-200/60 rounded">
          {matchCount} {matchCount === 1 ? 'match' : 'matches'}
        </span>
      )}

      {/* Options */}
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-1 cursor-pointer select-none text-slate-600 hover:text-slate-900">
          <input
            type="checkbox"
            checked={matchCase}
            onChange={(e) => setMatchCase(e.target.checked)}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3 h-3"
          />
          <span>Match case</span>
        </label>
        <label className="flex items-center gap-1 cursor-pointer select-none text-slate-600 hover:text-slate-900">
          <input
            type="checkbox"
            checked={useRegex}
            onChange={(e) => setUseRegex(e.target.checked)}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3 h-3"
          />
          <span>Regex</span>
        </label>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={handleReplaceFirst}
          disabled={!findText || matchCount === 0}
          className="px-2.5 py-1.5 rounded bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-50 text-slate-700 font-medium transition-colors"
        >
          Replace
        </button>
        <button
          onClick={handleReplaceAll}
          disabled={!findText || matchCount === 0}
          className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-white font-medium transition-colors"
        >
          Replace All
        </button>
        <button
          onClick={onClose}
          className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
          title="Close Find & Replace"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
