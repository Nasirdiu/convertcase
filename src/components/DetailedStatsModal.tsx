import React from 'react';
import { X, BarChart3, Clock, AlignLeft, Type, Hash } from 'lucide-react';
import { TextStats } from '../utils/textTransform';

interface DetailedStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: TextStats;
  text: string;
}

export const DetailedStatsModal: React.FC<DetailedStatsModalProps> = ({
  isOpen,
  onClose,
  stats,
  text,
}) => {
  if (!isOpen) return null;

  const words = text.trim().split(/\s+/).filter(Boolean);
  const avgWordLength = words.length > 0
    ? (words.reduce((acc, w) => acc + w.length, 0) / words.length).toFixed(1)
    : '0';

  let longestWord = '';
  for (const w of words) {
    const clean = w.replace(/[^a-zA-Z0-9]/g, '');
    if (clean.length > longestWord.length) {
      longestWord = clean;
    }
  }

  const statItems = [
    { label: 'Total Characters (with spaces)', value: stats.characterCount, icon: Type },
    { label: 'Characters (no spaces)', value: stats.characterCountNoSpaces, icon: Type },
    { label: 'Word Count', value: stats.wordCount, icon: AlignLeft },
    { label: 'Line Count', value: stats.lineCount, icon: Hash },
    { label: 'Sentence Count', value: stats.sentenceCount, icon: AlignLeft },
    { label: 'Paragraph Count', value: stats.paragraphCount, icon: AlignLeft },
    { label: 'Estimated Reading Time', value: `~${stats.readingTimeMinutes} min`, icon: Clock },
    { label: 'Estimated Speaking Time', value: `~${stats.speakingTimeMinutes} min`, icon: Clock },
    { label: 'Average Word Length', value: `${avgWordLength} chars`, icon: Type },
    { label: 'Longest Word', value: longestWord || 'None', icon: Type },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-slate-700" />
            <h3 className="font-semibold text-slate-800 text-base">Detailed Text Analytics</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-2 gap-3">
            {statItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-3 rounded-lg border border-slate-100 bg-slate-50/40 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                    <Icon className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-lg font-bold text-slate-800 font-mono tabular-nums truncate">
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
