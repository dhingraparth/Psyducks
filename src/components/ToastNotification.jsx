import React, { useEffect } from 'react';
import { Sparkles, CheckCircle2, X } from 'lucide-react';

export default function ToastNotification({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3800);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-subtle">
      <div className="glass-pill px-4 py-3 rounded-2xl shadow-soft-xl border border-terracotta/40 bg-charcoal text-ivory dark:bg-charcoal-700 flex items-center gap-3 max-w-md">
        <div className="w-7 h-7 rounded-full bg-terracotta/20 text-terracotta flex items-center justify-center shrink-0">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-semibold leading-snug">{message}</span>
        <button
          onClick={onClose}
          className="p-1 text-charcoal-300 hover:text-white transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
