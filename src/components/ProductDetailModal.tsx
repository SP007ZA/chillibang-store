import React, { useState } from 'react';
import {
  X,
  Flame,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductForModal,
    setSelectedProductForModal,
    addToCart,
    submitWhatsAppOrder,
    setIsCartOpen,
  } = useStore();

  const [quantity, setQuantity] = useState(1);

  if (!selectedProductForModal) return null;

  const product = selectedProductForModal;

  const handleWhatsApp = () => {
    submitWhatsAppOrder(product, quantity);
    setSelectedProductForModal(null);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setSelectedProductForModal(null);
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={() => setSelectedProductForModal(null)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-zinc-900 border border-zinc-700/80 shadow-2xl overflow-hidden text-white z-10">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-4 right-4 z-20 rounded-full bg-zinc-800/80 p-2 text-zinc-300 hover:text-white hover:bg-zinc-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image */}
          <div className="relative aspect-[4/3] md:aspect-auto bg-zinc-950">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 rounded-md bg-rose-600 px-2.5 py-1 text-xs font-bold text-white uppercase tracking-wider">
                {product.badge}
              </span>
            )}
            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-medium text-zinc-200">
              {product.jarSize}
            </div>
          </div>

          {/* Right: Details & Order */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
                <span>Heat Level:</span>
                <span className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < product.heatLevel ? 'opacity-100' : 'opacity-20'
                      }
                    >
                      🌶️
                    </span>
                  ))}
                </span>
                <span className="text-zinc-400">({product.heatLevel}/5)</span>
              </div>

              <h2 className="font-display text-2xl font-black text-white leading-tight">
                {product.name}
              </h2>
              <span className="text-xs text-zinc-400 block mb-3 font-medium">
                {product.tagline}
              </span>

              <div className="text-3xl font-black text-amber-400 font-display mb-4 tabular-nums">
                {product.currency}
                {product.price}
                <span className="text-xs font-normal text-zinc-400 ml-1">
                  / jar
                </span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                {product.fullDesc}
              </p>

              {/* Ingredients List */}
              <div className="mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Ingredients
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-md border border-zinc-700/60"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Craft Highlights */}
              <div className="space-y-1 mb-5">
                {product.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 text-xs text-zinc-300"
                  >
                    <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ordering Action Area */}
            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center border border-zinc-700 rounded-lg bg-zinc-950 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="h-6 w-6 rounded bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="h-6 w-6 rounded bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-white flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <div className="text-right">
                  <span className="text-xs text-zinc-400">Total:</span>
                  <span className="text-lg font-bold text-amber-400 ml-1.5 tabular-nums">
                    {product.currency}
                    {product.price * quantity}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 px-3 text-xs font-bold text-white transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp Order</span>
                </button>
                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 py-2.5 px-3 text-xs font-bold text-white transition-colors"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Add to Basket</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
