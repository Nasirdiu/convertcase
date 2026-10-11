import React from 'react';
import {
  Code2,
  ListFilter,
  Sparkles,
  ArrowDownAZ,
  ArrowUpAZ,
  Space,
  ListRestart,
  Repeat,
  RotateCcw,
  RotateCw,
} from 'lucide-react';

interface AdvancedToolsBarProps {
  onApplyCase: (caseType: string) => void;
  onApplyClean: (cleanType: string) => void;
  onLoadSample: (sampleType: string) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export const AdvancedToolsBar: React.FC<AdvancedToolsBarProps> = ({
  onApplyCase,
  onApplyClean,
  onLoadSample,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}) => {
  return (
    <div className="mt-4 pt-4 border-t border-slate-200/70 space-y-4">
      {/* Undo/Redo & Quick Presets Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 font-medium mr-1 text-2xs uppercase tracking-wider">History:</span>
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="flex items-center gap-1 px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            title="Undo (Ctrl+Z)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Undo</span>
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="flex items-center gap-1 px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            title="Redo (Ctrl+Y)"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Redo</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-500 font-medium mr-1 text-2xs uppercase tracking-wider">Try Sample:</span>
          <button
            onClick={() => onLoadSample('article')}
            className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors text-xs"
          >
            Article
          </button>
          <button
            onClick={() => onLoadSample('messy')}
            className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors text-xs"
          >
            Mixed Casing
          </button>
          <button
            onClick={() => onLoadSample('code')}
            className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors text-xs"
          >
            Variable Names
          </button>
        </div>
      </div>

      {/* Developer & Code Cases */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-2">
          <Code2 className="w-3.5 h-3.5 text-slate-500" />
          <span>Developer & Variable Cases</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'camelCase', label: 'camelCase' },
            { id: 'PascalCase', label: 'PascalCase' },
            { id: 'snake_case', label: 'snake_case' },
            { id: 'kebab-case', label: 'kebab-case' },
            { id: 'CONSTANT_CASE', label: 'CONSTANT_CASE' },
            { id: 'dot.case', label: 'dot.case' },
            { id: 'slug', label: 'slug-url' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onApplyCase(item.id)}
              className="px-2.5 py-1.5 text-xs font-mono font-medium rounded-md border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 transition-colors shadow-2xs"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Text Cleaning & Line Manipulation Tools */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mb-2">
          <ListFilter className="w-3.5 h-3.5 text-slate-500" />
          <span>Text & Line Utilities</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onApplyClean('extraSpaces')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs"
          >
            <Space className="w-3.5 h-3.5 text-slate-400" />
            <span>Remove Extra Spaces</span>
          </button>
          <button
            onClick={() => onApplyClean('emptyLines')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs"
          >
            <ListRestart className="w-3.5 h-3.5 text-slate-400" />
            <span>Remove Empty Lines</span>
          </button>
          <button
            onClick={() => onApplyClean('duplicateLines')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs"
          >
            <Repeat className="w-3.5 h-3.5 text-slate-400" />
            <span>Remove Duplicate Lines</span>
          </button>
          <button
            onClick={() => onApplyClean('sortAsc')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs"
          >
            <ArrowDownAZ className="w-3.5 h-3.5 text-slate-400" />
            <span>Sort Lines A-Z</span>
          </button>
          <button
            onClick={() => onApplyClean('sortDesc')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs"
          >
            <ArrowUpAZ className="w-3.5 h-3.5 text-slate-400" />
            <span>Sort Lines Z-A</span>
          </button>
          <button
            onClick={() => onApplyClean('reverse')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-400" />
            <span>Reverse Characters</span>
          </button>
        </div>
      </div>
    </div>
  );
};
