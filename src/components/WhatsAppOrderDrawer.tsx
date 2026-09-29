import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  Truck,
  MapPin,
  FileText,
  User,
  Phone,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WhatsAppOrderDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartTotal,
    deliveryCost,
    settings,
    orderDetails,
    updateOrderDetails,
    generateWhatsAppLink,
    submitWhatsAppOrder,
    clearCart,
  } = useStore();

  const [showPreview, setShowPreview] = useState(false);

  if (!isCartOpen) return null;

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitWhatsAppOrder();
  };

  const previewText = generateWhatsAppLink();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-900 border-l border-zinc-800 shadow-2xl flex flex-col text-white">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg text-white">
                Your Order
              </span>
              <span className="text-xs bg-rose-600/30 text-rose-400 font-semibold px-2 py-0.5 rounded-full border border-rose-500/20">
                via WhatsApp
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="py-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 text-zinc-500 mb-3">
                  🌶️
                </div>
                <h4 className="font-display font-semibold text-zinc-200">
                  Your basket is empty
                </h4>
                <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
                  Add some delicious homemade Chilli Bang jars or message OG directly on WhatsApp.
                </p>
                <div className="mt-5">
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      const el = document.getElementById('products');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 hover:text-rose-300"
                  >
                    <span>Browse All Blends</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Selected Jars ({cart.length})
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-xs text-zinc-500 hover:text-rose-400 transition-colors"
                  >
                    Clear all
                  </button>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-12 w-12 rounded-lg object-cover bg-zinc-800 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">
                        {item.product.name}
                      </h4>
                      <span className="text-[11px] text-zinc-400 block">
                        {settings.currencySymbol}
                        {item.product.price} each · {item.product.jarSize}
                      </span>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-lg p-1 shrink-0">
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.quantity - 1)
                        }
                        className="h-6 w-6 rounded bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300 transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-white tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.quantity + 1)
                        }
                        className="h-6 w-6 rounded bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-zinc-500 hover:text-rose-400 p-1 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Customer Details Form */}
            <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-4 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                Delivery &amp; Customer Info
              </span>

              {/* Delivery method toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-900 rounded-xl border border-zinc-800">
                <button
                  type="button"
                  onClick={() => updateOrderDetails({ deliveryMethod: 'courier' })}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-colors ${
                    orderDetails.deliveryMethod === 'courier'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Truck className="h-3.5 w-3.5" />
                  <span>Courier / Doorstep</span>
                </button>
                <button
                  type="button"
                  onClick={() => updateOrderDetails({ deliveryMethod: 'pickup' })}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-colors ${
                    orderDetails.deliveryMethod === 'pickup'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Local Pickup</span>
                </button>
              </div>

              {/* Name */}
              <div>
                <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
                  <input
                    type="text"
                    value={orderDetails.customerName}
                    onChange={(e) => updateOrderDetails({ customerName: e.target.value })}
                    placeholder="e.g. John Miller"
                    className="w-full rounded-xl bg-zinc-900 border border-zinc-800 pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                  Your WhatsApp Contact Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
                  <input
                    type="tel"
                    value={orderDetails.customerPhone}
                    onChange={(e) => updateOrderDetails({ customerPhone: e.target.value })}
                    placeholder="e.g. 082 123 4567"
                    className="w-full rounded-xl bg-zinc-900 border border-zinc-800 pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Address (if courier) */}
              {orderDetails.deliveryMethod === 'courier' ? (
                <>
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={orderDetails.address}
                      onChange={(e) => updateOrderDetails({ address: e.target.value })}
                      placeholder="e.g. 14 Protea Crescent"
                      className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                      Suburb &amp; City (e.g. Durban North / Cape Town)
                    </label>
                    <input
                      type="text"
                      value={orderDetails.suburbCity}
                      onChange={(e) => updateOrderDetails({ suburbCity: e.target.value })}
                      placeholder="e.g. Umhlanga, Durban"
                      className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </>
              ) : (
                <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-400">
                  <strong className="text-zinc-200 block mb-0.5">Pickup Location:</strong>
                  {settings.pickupLocation}
                </div>
              )}

              {/* Special Note */}
              <div>
                <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                  Optional Notes (e.g. Gift note, Braai event)
                </label>
                <input
                  type="text"
                  value={orderDetails.notes}
                  onChange={(e) => updateOrderDetails({ notes: e.target.value })}
                  placeholder="Any custom requests for OG?"
                  className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            {/* Live WhatsApp Text Preview Toggle */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center justify-between w-full text-xs font-medium text-zinc-400 hover:text-white"
              >
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Preview WhatsApp Message</span>
                </span>
                {showPreview ? (
                  <EyeOff className="h-3.5 w-3.5" />
                ) : (
                  <Eye className="h-3.5 w-3.5" />
                )}
              </button>

              {showPreview && (
                <div className="mt-3 p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-[11px] font-mono text-emerald-200 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                  {decodeURIComponent(previewText.split('?text=')[1] || '')}
                </div>
              )}
            </div>
          </div>

          {/* Footer & Checkout Action */}
          <div className="p-5 border-t border-zinc-800 bg-zinc-950 space-y-3">
            <div className="space-y-1.5 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white tabular-nums font-semibold">
                  {settings.currencySymbol}
                  {cartSubtotal}
                </span>
              </div>
              <div className="flex justify-between">
                <span>
                  {orderDetails.deliveryMethod === 'pickup'
                    ? 'Local Collection'
                    : 'Courier Delivery'}
                </span>
                <span className="text-white tabular-nums">
                  {orderDetails.deliveryMethod === 'pickup'
                    ? 'Free'
                    : deliveryCost === 0
                    ? 'FREE (Promo)'
                    : `${settings.currencySymbol}${deliveryCost}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-800">
                <span>Total Due</span>
                <span className="text-amber-400 font-display text-lg tabular-nums">
                  {settings.currencySymbol}
                  {cartTotal}
                </span>
              </div>
            </div>

            {/* Primary Order via WhatsApp Button */}
            <button
              onClick={handleOrderSubmit}
              disabled={cart.length === 0}
              className={`w-full flex items-center justify-center gap-2 rounded-xl py-3.5 px-4 text-sm font-bold text-white shadow-xl transition-all ${
                cart.length > 0
                  ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-950/50 active:scale-[0.99]'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              <MessageCircle className="h-4 w-4 fill-white" />
              <span>Send Order to OG via WhatsApp</span>
            </button>

            <p className="text-[10px] text-center text-zinc-500">
              No credit card required. Chat directly with OG to confirm stock &amp; EFT/Cash arrangements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
