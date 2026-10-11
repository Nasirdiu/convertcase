import React from 'react';
import { X, BookOpen } from 'lucide-react';

interface CaseGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CaseGuideModal: React.FC<CaseGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const caseGuides = [
    {
      badge: 'Sc',
      color: 'bg-[#ffedd5] text-[#c2410c]',
      name: 'Sentence case',
      example: 'The quick brown fox jumps over the lazy dog.',
      desc: 'Capitalizes the first letter of each sentence and lowercases the remainder.',
    },
    {
      badge: 'lc',
      color: 'bg-[#dcfce7] text-[#15803d]',
      name: 'lower case',
      example: 'the quick brown fox jumps over the lazy dog.',
      desc: 'Changes every character in the document to lowercase.',
    },
    {
      badge: 'UC',
      color: 'bg-[#e0f2fe] text-[#0369a1]',
      name: 'UPPER CASE',
      example: 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.',
      desc: 'Transforms every letter in your text into capital uppercase letters.',
    },
    {
      badge: 'CC',
      color: 'bg-[#f3e8ff] text-[#7e22ce]',
      name: 'Capitalized Case',
      example: 'The Quick Brown Fox Jumps Over The Lazy Dog.',
      desc: 'Capitalizes the first letter of every single word.',
    },
    {
      badge: 'aC',
      color: 'bg-[#fef9c3] text-[#a16207]',
      name: 'aLtErNaTiNg cAsE',
      example: 'tHe qUiCk bRoWn fOx jUmPs oVeR ThE LaZy dOg.',
      desc: 'Alternates letters between lowercase and uppercase for playful emphasis.',
    },
    {
      badge: 'TC',
      color: 'bg-[#ccfbf1] text-[#0f766e]',
      name: 'Title Case',
      example: 'The Quick Brown Fox Jumps over the Lazy Dog.',
      desc: 'Capitalizes main words while preserving minor articles and prepositions in lowercase.',
    },
    {
      badge: 'iC',
      color: 'bg-[#fce7f3] text-[#be185d]',
      name: 'InVErsE CaSe',
      example: 'tHE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.',
      desc: 'Inverts each letter: lowercase becomes uppercase, uppercase becomes lowercase.',
    },
    {
      badge: 'dev',
      color: 'bg-slate-100 text-slate-700',
      name: 'Developer Cases',
      example: 'camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE',
      desc: 'Essential formatting tools for programming variable and file naming conventions.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/60 shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-slate-700" />
            <h3 className="font-semibold text-slate-800 text-base">Case Conversion Reference Guide</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-3.5 divide-y divide-slate-100">
          {caseGuides.map((guide, idx) => (
            <div key={idx} className={idx === 0 ? '' : 'pt-3'}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-2xs font-bold px-1.5 py-0.5 rounded ${guide.color}`}>
                  {guide.badge}
                </span>
                <span className="text-xs font-semibold text-slate-900">{guide.name}</span>
              </div>
              <p className="text-xs text-slate-600 mb-1.5">{guide.desc}</p>
              <div className="bg-slate-50 border border-slate-200/70 rounded px-2.5 py-1 text-2xs font-mono text-slate-700">
                {guide.example}
              </div>
            </div>
          ))}
        </div>

        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
