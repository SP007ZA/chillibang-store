import React from 'react';
import { useStore } from '../context/StoreContext';

export const AnnouncementBar: React.FC = () => {
  const { settings } = useStore();

  if (!settings.announcementNotice) return null;

  return (
    <div className="bg-gradient-to-r from-rose-950 via-zinc-900 to-amber-950 border-b border-rose-900/30 py-2 px-4 text-center">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 text-xs font-medium text-amber-200/90">
        <span>{settings.announcementNotice}</span>
      </div>
    </div>
  );
};
