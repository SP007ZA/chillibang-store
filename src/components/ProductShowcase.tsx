import React, { useState } from 'react';
import {
  MessageCircle,
  ShoppingBag,
  Flame,
  Info,
  Check,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types/store';

export const ProductShowcase: React.FC = () => {
  const { products, addToCart, submitWhatsAppOrder, setSelectedProductForModal } =
    useStore();
  const [activeFilter, setActiveFilter] = useState<'all' | 'single' | 'bundle'>('all');
  
 

  const filteredProducts = products.filter((prod) => {
    if (activeFilter === 'single') return !prod.id.includes('bundle') && !prod.id.includes('trio');
    if (activeFilter === 'bundle') return prod.id.includes('bundle') || prod.id.includes('trio');
    return true;
  });

  return (
    <section id="products" className="py-16 sm:py-24 border-b border-zinc-800 bg-[#0E0E10]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-handwriting text-2xl text-amber-400 font-bold block mb-1">
              Small Batch Selection
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Artisanal Jars &amp; Bundles
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              Every jar is hand-filled, sealed with our signature label, and made with 100% natural aromatics. Direct from OG’s kitchen to your table.
            </p>
          </div>

          {/* Interactive Filter Control */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Blends ({products.length})
            </button>
            <button
              onClick={() => setActiveFilter('single')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'single'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Individual Jars
            </button>
            <button
              onClick={() => setActiveFilter('bundle')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'bundle'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Gift Sets
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, submitWhatsAppOrder, setSelectedProductForModal } = useStore();
  const [imgError, setImgError] = useState(false);

  const renderHeatRating = (level: number) => {
    return (
      <div className="flex items-center gap-0.5 text-xs">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={i < level ? 'opacity-100' : 'opacity-20 grayscale'}
            title={`Heat level ${level}/5`}
          >
            🌶️
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="group relative flex flex-col rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Product Image Slot */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-zinc-900">
            <Flame className="h-10 w-10 text-rose-500 mb-1" />
            <span className="text-xs text-zinc-400">{product.name}</span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {product.badge && (
            <span className="rounded-md bg-rose-600/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-white uppercase tracking-wider shadow-sm">
              {product.badge}
            </span>
          )}
          <span className="rounded-md bg-zinc-900/90 backdrop-blur-md border border-zinc-700/80 px-2 py-0.5 text-[10px] font-semibold text-zinc-300">
            {product.jarSize}
          </span>
        </div>

        {/* Quick View Button overlay on hover */}
        <button
          onClick={() => setSelectedProductForModal(product)}
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-xs font-semibold text-white gap-1.5"
        >
          <Info className="h-4 w-4" />
          <span>View Ingredients &amp; Recipe</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[11px] font-semibold text-zinc-400">
            Heat: {renderHeatRating(product.heatLevel)}
          </span>
          <span className="text-[11px] font-medium text-emerald-400">
            {product.inStock ? 'In Stock' : 'Pre-Order'}
          </span>
        </div>

        <h3 className="font-display text-lg font-bold text-white group-hover:text-rose-400 transition-colors line-clamp-1">
          {product.name}
        </h3>

        <p className="text-xs text-zinc-400 mt-1 mb-4 line-clamp-2 leading-relaxed flex-1">
          {product.shortDesc}
        </p>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-zinc-800/80">
          <div className="flex items-baseline justify-between mb-3">
            <span className="text-xs text-zinc-400">Price</span>
            <span className="font-display text-2xl font-black text-amber-400 tabular-nums">
              {product.currency}
              {product.price}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Direct WhatsApp Order */}
            <button
              onClick={() => submitWhatsAppOrder(product, 1)}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 py-2.5 px-3 text-xs font-bold text-white transition-colors shadow-sm"
              title="Order this jar immediately on WhatsApp"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>WhatsApp</span>
            </button>

            {/* Add to Cart */}
            <button
              onClick={() => addToCart(product, 1)}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 py-2.5 px-3 text-xs font-semibold text-zinc-200 hover:text-white transition-colors"
              title="Add to basket"
            >
              <ShoppingBag className="h-3.5 w-3.5 text-zinc-400" />
              <span>Add Jar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
