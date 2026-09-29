import React from 'react';
import { Flame, ShieldCheck, HeartHandshake, CheckCircle2, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CraftStorySection: React.FC = () => {
  const { settings, submitWhatsAppOrder, products } = useStore();

  return (
    <section id="craft" className="py-16 sm:py-24 border-b border-zinc-800 bg-[#0C0C0E]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-700/80 bg-zinc-900 shadow-2xl">
              <img
                src="/src/assets/images/chilli_bang_signature_jar_1790685012781.jpg"
                alt="Chilli Bang Kitchen Craft"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-6 inset-x-6">
                <span className="font-handwriting text-2xl text-amber-300 font-bold block mb-1">
                  Made in Small Batches ♡
                </span>
                <p className="text-xs text-zinc-300">
                  Every jar is slowly simmered, hand-stirred, and sealed to ensure maximum aroma and flavour retention.
                </p>
              </div>
            </div>
          </div>

          {/* Copy and Ingredients Breakdown */}
          <div className="lg:col-span-7">
            <span className="font-handwriting text-2xl text-amber-400 font-bold block mb-1">
              Real Ingredients &amp; Homemade With Care
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              What Goes Into Every Single Jar
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
              Unlike commercial sauces watered down with vinegar, xanthan gum, or artificial thickeners, <strong>{settings.brandName}</strong> is a rich, dense artisan relish made from raw aromatics cooked slow in quality oils.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="flex items-center gap-2 mb-1.5 text-rose-400 font-semibold text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Selected Fresh Garlic</span>
                </div>
                <p className="text-xs text-zinc-400 leading-normal">
                  Peeled whole cloves gently crushed to release essential allicin oils and deep savory sweetness.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="flex items-center gap-2 mb-1.5 text-rose-400 font-semibold text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Sweetened Chilli Mash</span>
                </div>
                <p className="text-xs text-zinc-400 leading-normal">
                  Sun-ripened red peppers and chillies balanced with natural sweetness to tame raw acidity.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="flex items-center gap-2 mb-1.5 text-rose-400 font-semibold text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Aromatic Herbs &amp; Spices</span>
                </div>
                <p className="text-xs text-zinc-400 leading-normal">
                  Secret herbal blend that blooms when warmed, creating an intoxicating aroma over sizzling meals.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="flex items-center gap-2 mb-1.5 text-rose-400 font-semibold text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Pure Refined Oils</span>
                </div>
                <p className="text-xs text-zinc-400 leading-normal">
                  Naturally seals and preserves freshness without requiring chemical stabilizers or refrigeration before opening.
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Prompt */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => submitWhatsAppOrder(products[0], 1)}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-950/40"
              >
                <MessageCircle className="h-4 w-4 fill-white" />
                <span>Message OG on WhatsApp</span>
              </button>
              <span className="text-xs text-zinc-400">
                Have special dietary requests or need bulk jars for events? Ask directly on WhatsApp.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
