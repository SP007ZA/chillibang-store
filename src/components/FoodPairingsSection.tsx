import React, { useEffect, useRef, useState } from 'react';
import { ChefHat } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FoodPairingsSection: React.FC = () => {
  const { pairings } = useStore();

  const [selectedPairingId, setSelectedPairingId] = useState<string>(
    pairings[0]?.id || 'pair-1'
  );

  // Reference to the selected pairing detail box
  const detailRef = useRef<HTMLDivElement>(null);

  const selectedPairing =
    pairings.find((p) => p.id === selectedPairingId) || pairings[0];

  // Pairing images
  const pairingIcons: Record<string, string> = {
    Meats: '/images/pairings/chillibang-meats.jpeg',
    Pasta: '/images/pairings/chillibang-pasta.jpeg',
    Rice: '/images/pairings/chillibang-rice.jpeg',
    Veggies: '/images/pairings/chillibang-veggies.jpeg',
    'Wraps & Sandwiches': '/images/pairings/chillibang-wraps.jpeg',
  };

  // Automatically scroll to the selected pairing on mobile
  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;

    if (!isMobile || !detailRef.current) return;

    const timer = setTimeout(() => {
      detailRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 120);

    return () => clearTimeout(timer);
  }, [selectedPairingId]);

  return (
    <section
      id="pairings"
      className="py-16 sm:py-24 border-b border-zinc-800 bg-[#121214] relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Banner Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-rose-500 font-bold">✨</span>

            <span className="font-handwriting text-3xl sm:text-4xl text-amber-400 font-bold tracking-wide">
              Goes along with everything!
            </span>

            <span className="text-rose-500 font-bold">✨</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Versatile Culinary Soul
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base mt-2">
            Chilli Bang is formulated not just for heat, but as a rich
            umami-packed seasoning sauce that complements any comfort dish.
          </p>
        </div>

        {/* Pairing Selection Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 mb-10">
          {pairings.map((item) => {
            const isSelected = item.id === selectedPairingId;

            return (
              <button
                key={item.id}
                onClick={() => setSelectedPairingId(item.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all text-center ${
                  isSelected
                    ? 'bg-rose-950/40 border-rose-500 shadow-lg shadow-rose-950/50 scale-[1.03]'
                    : 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                }`}
              >
                {/* Pairing Image */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800/80 mb-2.5 shadow-inner overflow-hidden">
                  <img
                    src={
                      pairingIcons[item.title] ||
                      '/images/pairings/default.png'
                    }
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Pairing Name */}
                <span className="font-handwriting text-lg text-white font-bold block leading-tight">
                  {item.title}
                </span>

                {/* Badge */}
                <span className="text-[10px] text-zinc-400 mt-1 uppercase tracking-wider font-semibold">
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Pairing Detail */}
        {selectedPairing && (
          <div
            ref={detailRef}
            className="rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-700/80 p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl scroll-mt-24"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

              <div className="flex-1">

                {/* Pairing Spotlight Header */}
                <div className="flex items-center gap-2 mb-2">

                  {/* Small Pairing Image */}
                  <div className="h-8 w-8 rounded-full overflow-hidden shrink-0 ring-1 ring-rose-500/30 shadow-md">
                    <img
                      src={
                        pairingIcons[selectedPairing.title] ||
                        '/images/pairings/default.png'
                      }
                      alt={selectedPairing.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                    Pairing Spotlight
                  </span>

                  <span className="text-xs text-zinc-500">
                    ·
                  </span>

                  <span className="text-xs font-semibold text-amber-400">
                    {selectedPairing.badge}
                  </span>
                </div>

                {/* Selected Pairing Title */}
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  Chilli Bang + {selectedPairing.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                  {selectedPairing.description}
                </p>

                {/* Serving Tip */}
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-zinc-950/80 border border-amber-500/20">

                  <ChefHat className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />

                  <div className="text-xs text-zinc-300">
                    <strong className="text-amber-300 font-semibold block mb-0.5">
                      OG's Serving Tip:
                    </strong>

                    {selectedPairing.bestWayToServe}
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};