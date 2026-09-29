import React from 'react';
import { CheckCircle2, MessageCircle, Snowflake, Package, Utensils, AlertTriangle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CraftStorySection: React.FC = () => {
  const { settings, submitWhatsAppOrder, products } = useStore();

  return (
    <section
      id="craft"
      className="py-16 sm:py-24 border-b border-zinc-800 bg-[#0C0C0E]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* =========================================================
              PRODUCT IMAGE
          ========================================================== */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-700/80 bg-zinc-900 shadow-2xl">

              <img
                src="/images/chilli_bang_signature_jar_1790685012781.jpg"
                alt="Chilly Bang - Homemade Chillie by OG"
                className="w-full aspect-[4/5] object-cover"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

              {/* Image Caption */}
              <div className="absolute bottom-6 inset-x-6">
                <span className="font-handwriting text-2xl text-amber-300 font-bold block mb-1">
                  Homemade With Care ♡
                </span>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  Chilly Bang — a versatile homemade chilli condiment
                  made for everyday meals.
                </p>
              </div>
            </div>
          </div>

          {/* =========================================================
              PRODUCT INFORMATION
          ========================================================== */}
          <div className="lg:col-span-7">

            {/* Eyebrow */}
            <span className="font-handwriting text-2xl text-amber-400 font-bold block mb-1">
              Homemade Chilli by OG
            </span>

            {/* Heading */}
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Chilly Bang
            </h2>

            {/* Intro */}
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
              A bold, versatile chilli condiment made to add flavour,
              heat and character to your favourite meals. Use it straight
              from the jar or as a cooking sauce.
            </p>

            {/* =========================================================
                PRODUCT DETAILS
            ========================================================== */}
            <div className="mb-8">

              <h3 className="font-display text-xl font-bold text-white mb-4">
                Product Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {/* Net Contents */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                  <Package className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />

                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1">
                      Net Contents
                    </span>

                    <span className="text-sm font-semibold text-white">
                      260ml
                    </span>
                  </div>
                </div>

                {/* Usage */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                  <Utensils className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />

                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1">
                      Usage
                    </span>

                    <span className="text-sm font-semibold text-white">
                      Condiment or cooking sauce
                    </span>
                  </div>
                </div>

                {/* Storage */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                  <Snowflake className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />

                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1">
                      Storage
                    </span>

                    <span className="text-sm font-semibold text-white">
                      Refrigerate after opening
                    </span>
                  </div>
                </div>

                {/* Best Before */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                  <CheckCircle2 className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />

                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1">
                      Best Before
                    </span>

                    <span className="text-sm font-semibold text-white">
                      8 months from date packaged
                    </span>
                  </div>
                </div>

              </div>

              {/* Manufacturer / Country */}
              <div className="mt-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1">
                      Manufacturer
                    </span>

                    <span className="text-sm font-semibold text-white">
                      OG · Chilly Bang
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-zinc-500 font-bold mb-1">
                      Country
                    </span>

                    <span className="text-sm font-semibold text-white">
                      Product of South Africa
                    </span>
                  </div>

                </div>
              </div>
            </div>

            {/* =========================================================
                INGREDIENTS
            ========================================================== */}
            <div className="mb-8">

              <h3 className="font-display text-xl font-bold text-white mb-4">
                Ingredients
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {[
                  'Selected Chilli',
                  'Garlic & Peppers',
                  'Sweetened Chilli Blend',
                  'Aromatic Herbs & Spices',
                  'Permitted Preservatives',
                ].map((ingredient, index) => (
                  <div
                    key={ingredient}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-950/50 border border-rose-500/30 shrink-0">
                      <span className="text-[11px] font-bold text-rose-300">
                        {index + 1}
                      </span>
                    </div>

                    <span className="text-sm text-zinc-200 font-medium">
                      {ingredient}
                    </span>
                  </div>
                ))}

              </div>
            </div>

            {/* =========================================================
                ALLERGEN INFORMATION
            ========================================================== */}
            <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-950/20 border border-amber-500/20">

              <div className="flex items-start gap-3">

                <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />

                <div>
                  <h3 className="text-sm font-bold text-amber-300 mb-2">
                    Allergen Information
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    May contain declared allergens.
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-2">
                    The sweetened chilli blend used in this sauce may
                    contain allergens such as gluten, soy or sulphites,
                    depending on the manufacturer's formulation.
                    If you have a known food allergy, please contact us
                    before consuming.
                  </p>
                </div>

              </div>
            </div>

            {/* =========================================================
                WHATSAPP CTA
            ========================================================== */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">

              <button
                onClick={() => {
                  if (products[0]) {
                    submitWhatsAppOrder(products[0], 1);
                  }
                }}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-950/40"
              >
                <MessageCircle className="h-4 w-4 fill-white" />

                <span>
                  Message OG on WhatsApp
                </span>
              </button>

              <span className="text-xs text-zinc-400 leading-relaxed">
                Have questions about ingredients, allergies or bulk orders?
                Ask us directly on WhatsApp.
              </span>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};