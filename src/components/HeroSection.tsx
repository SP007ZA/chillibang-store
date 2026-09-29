import React, { useState } from 'react';
import {
  Flame,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  Check,
  ShieldCheck,
  Heart,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HeroSection: React.FC = () => {
  const {
    settings,
    products,
    featureHighlights,
    addToCart,
    submitWhatsAppOrder,
    setIsCartOpen,
  } = useStore();

  const signatureProduct = products[0] || {
    id: 'prod-original',
    name: 'Chilli Bang Original Blend',
    price: 70,
    currency: 'R',
    jarSize: '250ml Glass Jar',
    image: 'images/chilli_bang_signature_jar_1790685012781.jpg',
  };

  const [heroQuantity, setHeroQuantity] = useState(1);
  const [imgLoaded, setImgLoaded] = useState(true);

  const handleQuickWhatsApp = () => {
    submitWhatsAppOrder(signatureProduct, heroQuantity);
  };

  const handleQuickAddToCart = () => {
    addToCart(signatureProduct, heroQuantity);
    setIsCartOpen(true);
  };

  return (
    <section id="signature" className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-zinc-800">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand copy, Key Guarantees, & WhatsApp CTA */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            {/* Homemade brand kicker */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-handwriting text-2xl sm:text-3xl text-amber-400 font-bold tracking-wide rotate-[-1deg]">
                Homemade Chilli Blend
              </span>
              <span className="text-rose-500 font-bold text-sm">🌶️</span>
            </div>

            {/* Main Title Lockup */}
            <div className="mb-4">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-display text-white leading-[1.05]">
                {settings.brandName}{' '}
                <span className="inline-block text-rose-500 text-3xl sm:text-4xl font-black bg-rose-950/70 border border-rose-500/30 px-3 py-1 rounded-md ml-1 align-middle">
                  {settings.subBrand}
                </span>
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-xl leading-relaxed mb-6 font-normal">
              {settings.heroSubheading}
            </p>

            {/* The 3 Circular Guarantees (From the poster) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
              {featureHighlights.slice(0, 3).map((feat, idx) => (
                <div
                  key={feat.id || idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-600/15 border border-rose-500/30 text-rose-400">
                    {idx === 0 && <Flame className="h-4 w-4 fill-rose-500/40 text-rose-400" />}
                    {idx === 1 && <Sparkles className="h-4 w-4 text-amber-400" />}
                    {idx === 2 && <ShieldCheck className="h-4 w-4 text-emerald-400" />}
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-zinc-100 leading-tight mb-1">
                      {feat.title}
                    </h3>
                    <p className="text-[11px] text-zinc-400 line-clamp-2 leading-snug">
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct WhatsApp Ordering Card */}
            <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-700/80 shadow-2xl relative">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-zinc-800">
                <div>
                  <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider block">
                    Direct Maker Order
                  </span>
                  <span className="text-sm font-bold text-white">
                    {signatureProduct.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-amber-400 font-display tabular-nums">
                    {signatureProduct.currency}
                    {signatureProduct.price * heroQuantity}
                  </span>
                  <span className="text-[11px] text-zinc-400 block">
                    ({signatureProduct.currency}
                    {signatureProduct.price} per jar)
                  </span>
                </div>
              </div>

              {/* Quantity Stepper & CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex items-center justify-between sm:justify-center border border-zinc-700 rounded-xl bg-zinc-950 px-3 py-2 shrink-0">
                  <span className="text-xs text-zinc-400 mr-3">Qty:</span>
                  <button
                    onClick={() => setHeroQuantity((q) => Math.max(1, q - 1))}
                    className="h-7 w-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-white tabular-nums">
                    {heroQuantity}
                  </span>
                  <button
                    onClick={() => setHeroQuantity((q) => q + 1)}
                    className="h-7 w-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-sm flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Primary WhatsApp Order Button */}
                <button
                  onClick={handleQuickWhatsApp}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-500 active:scale-[0.98] transition-all shadow-lg shadow-emerald-950/50"
                >
                  <MessageCircle className="h-4 w-4 fill-white" />
                  <span>Order Now via WhatsApp</span>
                </button>

                {/* Add to Basket */}
                <button
                  onClick={handleQuickAddToCart}
                  className="flex items-center justify-center gap-2 rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-sm font-semibold text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors"
                  title="Add to basket for multiple flavours"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span className="sm:hidden">Add</span>
                </button>
              </div>

              {/* Urgency subtext from poster */}
              <div className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs">
                <span className="font-handwriting text-base text-amber-300 font-bold">
                  {settings.limitedStockText}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Product Showcase with Big R70 Stamp */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            {/* Giant Circular Price Stamp (Exactly like the poster's top-right R70) */}
            <div className="absolute -top-3 sm:top-2 -right-1 sm:right-4 z-20 rotate-12 transition-transform hover:rotate-6">
              <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-rose-600 to-red-700 border-2 border-amber-300/40 px-5 py-3.5 shadow-2xl shadow-rose-950/80">
                <span className="font-display text-4xl sm:text-5xl font-black text-white leading-none tracking-tight">
                  {settings.currencySymbol}
                  {signatureProduct.price}
                </span>
                <span className="text-[11px] font-black uppercase tracking-widest text-amber-200 mt-1">
                  PER JAR
                </span>
              </div>
            </div>

            {/* Handwritten "Packed with flavour!" sticker (from poster) */}
            <div className="absolute -left-2 sm:left-4 top-10 sm:top-14 z-20 -rotate-12 bg-zinc-950/90 border border-amber-400/40 px-4 py-2 rounded-xl backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-1.5 font-handwriting text-xl sm:text-2xl text-amber-300 font-bold whitespace-nowrap">
                <Heart className="h-4 w-4 fill-rose-500 text-rose-500 inline" />
                <span>Packed with flavour!</span>
              </div>
            </div>

            {/* Main Jar Image Container */}
            <div className="relative w-full max-w-[430px] aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-700/60 shadow-2xl group">
              {imgLoaded ? (
                <img
                  src={signatureProduct.image}
                  alt={signatureProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={() => setImgLoaded(false)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-zinc-900">
                  <Flame className="h-16 w-16 text-rose-500 mb-3" />
                  <span className="font-display font-bold text-lg text-white">
                    {signatureProduct.name}
                  </span>
                  <span className="text-sm text-zinc-400 mt-1">
                    {signatureProduct.jarSize}
                  </span>
                </div>
              )}

              {/* Gradient scrim for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Bottom image overlay details */}
              <div className="absolute bottom-0 inset-x-0 p-6 z-10">
                <div className="flex items-center justify-between text-xs text-zinc-300 mb-1.5">
                  <span className="font-semibold text-amber-400 tracking-wide uppercase">
                    Signature 250ml Jar
                  </span>
                  <span className="flex items-center gap-1 text-zinc-200">
                    Heat:
                    <span className="text-rose-500">🌶️🌶️🌶️</span>
                    <span className="text-zinc-600">🌶️🌶️</span>
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-snug line-clamp-2">
                  Selected garlic, sweetened chilli blend, aromatic herbs, spices, sea salt & refined oils.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
