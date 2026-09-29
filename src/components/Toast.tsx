import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300 pointer-events-none">
      <div className="flex items-center gap-2.5 rounded-2xl bg-zinc-900 border border-zinc-700/80 px-4 py-3 text-xs font-semibold text-white shadow-2xl shadow-black/80">
        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
