import React from 'react';
import { ShoppingBag, MessageCircle, Settings, Flame } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Navbar: React.FC = () => {
  const { settings, cartCount, setIsCartOpen, setIsAdminOpen } = useStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#121214]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text wordmark */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-600/20 text-rose-500 border border-rose-600/30 group-hover:scale-105 transition-transform">
            <Flame className="h-5 w-5 fill-rose-500 text-rose-500" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-xl font-extrabold tracking-tight text-white group-hover:text-rose-400 transition-colors">
                {settings.brandName}
              </span>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                {settings.subBrand}
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 -mt-1 hidden sm:inline">
              {settings.tagline}
            </span>
          </div>
        </a>

        {/* Zone 2: Clean navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
          <a href="#signature" className="hover:text-rose-400 transition-colors">
            The Blend
          </a>
          <a href="#products" className="hover:text-rose-400 transition-colors">
            Jars & Blends
          </a>
          <a href="#pairings" className="hover:text-rose-400 transition-colors">
            Food Pairings
          </a>
          <a href="#craft" className="hover:text-rose-400 transition-colors">
            OG's Secret
          </a>
          <a href="#order-info" className="hover:text-rose-400 transition-colors">
            How to Order
          </a>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Admin shortcut button (Hidden from clients by default, enabled only via settings or private admin link) */}
          {settings.showAdminInHeader && (
            <button
              onClick={() => setIsAdminOpen(true)}
              title="Admin Portal (Edit Products & Content)"
              className="flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-950/30 px-2.5 py-1.5 text-xs font-medium text-amber-300 hover:border-amber-400 hover:text-white transition-colors"
            >
              <Settings className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden lg:inline">Admin</span>
            </button>
          )}

          {/* Direct WhatsApp Quick Chat */}
          <a
            href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi OG! I'm interested in ordering some ${settings.brandName} jars.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/40 px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-900/50 hover:text-emerald-300 transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5 fill-emerald-500/30" />
            <span className="hidden sm:inline">WhatsApp OG</span>
            <span className="sm:hidden">Chat</span>
          </a>

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 rounded-lg bg-rose-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-rose-500 transition-colors shadow-sm shadow-rose-950/50"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>Order</span>
            {cartCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-black text-rose-600">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
