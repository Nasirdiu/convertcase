import React from 'react';
import { X, Sliders, Check } from 'lucide-react';

export interface ConverterSettings {
  preserveAcronyms: boolean;
  autoCopyOnConvert: boolean;
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  fontFamily: 'sans' | 'mono';
  trimTrailingSpaces: boolean;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ConverterSettings;
  onUpdateSettings: (newSettings: ConverterSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-slate-700" />
            <h3 className="font-semibold text-slate-800 text-base">Converter Settings</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Title Case Acronym preservation */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <label className="text-sm font-medium text-slate-800 block">
                Preserve Acronyms in Title Case
              </label>
              <p className="text-xs text-slate-500 mt-0.5">
                Keep words like "NASA", "USA", "HTML" in uppercase when converting to Title Case.
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.preserveAcronyms}
              onChange={(e) =>
                onUpdateSettings({ ...settings, preserveAcronyms: e.target.checked })
              }
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
          </div>

          <hr className="border-slate-100" />

          {/* Auto Copy on Conversion */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <label className="text-sm font-medium text-slate-800 block">
                Auto-Copy on Click
              </label>
              <p className="text-xs text-slate-500 mt-0.5">
                Automatically copy result to clipboard whenever any case button is pressed.
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.autoCopyOnConvert}
              onChange={(e) =>
                onUpdateSettings({ ...settings, autoCopyOnConvert: e.target.checked })
              }
              className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
          </div>

          <hr className="border-slate-100" />

          {/* Font Family */}
          <div>
            <label className="text-sm font-medium text-slate-800 block mb-2">
              Editor Font Style
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onUpdateSettings({ ...settings, fontFamily: 'sans' })}
                className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all flex items-center justify-center gap-1.5 ${
                  settings.fontFamily === 'sans'
                    ? 'border-blue-500 bg-blue-50/50 text-blue-700 font-semibold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {settings.fontFamily === 'sans' && <Check className="w-3.5 h-3.5" />}
                Sans-Serif (Standard)
              </button>
              <button
                type="button"
                onClick={() => onUpdateSettings({ ...settings, fontFamily: 'mono' })}
                className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all flex items-center justify-center gap-1.5 font-mono ${
                  settings.fontFamily === 'mono'
                    ? 'border-blue-500 bg-blue-50/50 text-blue-700 font-semibold'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {settings.fontFamily === 'mono' && <Check className="w-3.5 h-3.5" />}
                Monospace (Code)
              </button>
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label className="text-sm font-medium text-slate-800 block mb-2">
              Text Editor Size
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['sm', 'base', 'lg', 'xl'] as const).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => onUpdateSettings({ ...settings, fontSize: size })}
                  className={`py-1.5 text-xs font-medium rounded-lg border text-center uppercase transition-all ${
                    settings.fontSize === size
                      ? 'border-blue-500 bg-blue-50/50 text-blue-700 font-semibold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
          <button
            onClick={() =>
              onUpdateSettings({
                preserveAcronyms: false,
                autoCopyOnConvert: false,
                fontSize: 'base',
                fontFamily: 'sans',
                trimTrailingSpaces: false,
              })
            }
            className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 font-medium transition-colors"
          >
            Reset Defaults
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
