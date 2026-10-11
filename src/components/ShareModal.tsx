import React, { useState } from 'react';
import { X, Share2, Copy, Check, Globe } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  onShowToast: (message: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  text,
  onShowToast,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ConvertCase Output',
          text: text,
        });
        onShowToast('Shared successfully!');
      } catch {
        // User cancelled or share failed
      }
    } else {
      // Fallback
      handleCopyText();
    }
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      onShowToast('Content copied to clipboard!');
      onClose();
    } catch {
      onShowToast('Unable to copy text');
    }
  };

  const handleCopyShareableUrl = async () => {
    try {
      const encoded = encodeURIComponent(text);
      const url = `${window.location.origin}${window.location.pathname}#text=${encoded}`;
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      onShowToast('Shareable link copied to clipboard!');
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      onShowToast('Failed to copy link');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-slate-700" />
            <h3 className="font-semibold text-slate-800 text-base">Share Content</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Share your converted text directly or create a link pre-loaded with this text.
          </p>

          <div className="space-y-2">
            {typeof navigator !== 'undefined' && 'share' in navigator && (
              <button
                onClick={handleNativeShare}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share via System Menu (Apps, Mail, Messages)
              </button>
            )}

            <button
              onClick={handleCopyShareableUrl}
              className="w-full flex items-center justify-between px-4 py-2.5 border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 rounded-lg text-xs font-medium text-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-500" />
                <span>Copy Shareable Web Link</span>
              </div>
              {copiedLink ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4 text-slate-400" />
              )}
            </button>

            <button
              onClick={handleCopyText}
              className="w-full flex items-center justify-between px-4 py-2.5 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 rounded-lg text-xs font-medium text-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Copy className="w-4 h-4 text-slate-500" />
                <span>Copy Text to Clipboard</span>
              </div>
            </button>
          </div>
        </div>

        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
