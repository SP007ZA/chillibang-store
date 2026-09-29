import React from 'react';
import { MessageCircle, ShieldCheck, Heart, Settings, Flame } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { settings, setIsAdminOpen, submitWhatsAppOrder, products } = useStore();

  return (
    <footer id="order-info" className="bg-[#09090B] border-t border-zinc-800 text-zinc-400 text-xs">
      {/* Big Poster Call to Action Banner: "Want to try it? MESSAGE ME DIRECTLY TO PLACE YOUR ORDER." */}
      <div className="bg-gradient-to-b from-zinc-900 to-[#09090B] border-b border-zinc-800 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-2 text-rose-500 font-bold">
            <span>🌶️</span>
            <span className="font-handwriting text-3xl sm:text-4xl text-amber-300 font-bold">
              Want to try it?
            </span>
            <span>🌶️</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
            MESSAGE ME DIRECTLY TO PLACE YOUR ORDER.
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-lg mx-auto mb-6">
            Small batches made fresh weekly. Get yours before this week's limited stock sells out.
          </p>

          <button
            onClick={() => submitWhatsAppOrder(products[0], 1)}
            className="inline-flex items-center gap-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-emerald-950/60 active:scale-95 transition-all"
          >
            <MessageCircle className="h-5 w-5 fill-white" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-rose-500 fill-rose-500" />
              <span className="font-display font-extrabold text-white text-base">
                {settings.brandName}
              </span>
              <span className="text-xs text-amber-400 font-bold">
                {settings.subBrand}
              </span>
            </div>
            <p className="text-zinc-400 max-w-sm text-xs leading-relaxed">
              {settings.footerNote}
            </p>
            <div className="pt-2 text-[11px] text-zinc-500">
              South Africa · Small Batch Homemade Relish
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Quick Nav
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#signature" className="hover:text-white transition-colors">
                  Signature Jar ({settings.currencySymbol}70)
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  All Blends &amp; Gift Bundles
                </a>
              </li>
              <li>
                <a href="#pairings" className="hover:text-white transition-colors">
                  Food Pairings Guide
                </a>
              </li>
              <li>
                <a href="#craft" className="hover:text-white transition-colors">
                  Ingredients &amp; Craft
                </a>
              </li>
            </ul>
          </div>

          {/* Order & Delivery */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Ordering &amp; Delivery
            </h4>
            <p className="text-xs text-zinc-400">
              Doorstep courier delivery across South Africa. Local collection available by prior WhatsApp arrangement.
            </p>
         
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} {settings.brandName} {settings.subBrand}. All rights reserved.
          </div>
          <div className="flex items-center gap-1 font-handwriting text-base text-zinc-400">
            <span>Made with genuine passion for good food</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500 inline ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
