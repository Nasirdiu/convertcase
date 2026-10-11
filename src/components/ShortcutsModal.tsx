import React from 'react';
import { X, Keyboard } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Ctrl + Z / ⌘ + Z', desc: 'Undo last case conversion or edit' },
    { key: 'Ctrl + Y / ⌘ + Shift + Z', desc: 'Redo previously undone change' },
    { key: 'Ctrl + F / ⌘ + F', desc: 'Toggle Find & Replace drawer' },
    { key: 'Tab', desc: 'Navigate between conversion buttons' },
    { key: 'Enter / Space', desc: 'Trigger selected conversion button' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-slate-700" />
            <h3 className="font-semibold text-slate-800 text-base">Keyboard Shortcuts</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          {shortcuts.map((sc, i) => (
            <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 last:border-none">
              <span className="text-slate-600">{sc.desc}</span>
              <kbd className="px-2 py-1 bg-slate-100 text-slate-800 font-mono font-medium rounded border border-slate-200 text-2xs">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
