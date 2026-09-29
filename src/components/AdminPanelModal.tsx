import React, { useState } from 'react';
import {
  X,
  Save,
  Plus,
  Trash2,
  Edit2,
  RefreshCw,
  Phone,
  Store,
  Layers,
  Sparkles,
  MessageCircle,
  FileCheck,
  Check,
  AlertTriangle,
  Download,
  Copy,
  Lock,
  ExternalLink,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types/store';

export const AdminPanelModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    settings,
    updateSettings,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    featureHighlights,
    updateFeatureHighlight,
    pairings,
    updatePairing,
    orderHistory,
    clearOrderHistory,
    resetAllToDefaults,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'content' | 'products' | 'pairings' | 'orders'>('content');
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Passcode gate state
  const [passcodeAttempt, setPasscodeAttempt] = useState('');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('admin_unlocked') === 'true';
    }
    return false;
  });
  const [passcodeError, setPasscodeError] = useState(false);

  // Form states for settings
  const [formSettings, setFormSettings] = useState(settings);

  // State for new product
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProd, setNewProd] = useState<Omit<Product, 'id'>>({
    name: '',
    tagline: '',
    price: 70,
    currency: 'R',
    jarSize: '250ml Glass Jar',
    heatLevel: 3,
    badge: 'New Batch',
    shortDesc: '',
    fullDesc: '',
    ingredients: ['Selected Garlic', 'Chilli Mash', 'Spices', 'Refined Oil'],
    features: ['Handcrafted batch', '100% natural', 'No artificial preservatives'],
    image: '/src/assets/images/chilli_bang_signature_jar_1790685012781.jpg',
    inStock: true,
  });

  if (!isAdminOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPass = settings.adminPasscode || 'og2026';
    if (passcodeAttempt.trim() === correctPass) {
      setIsUnlocked(true);
      sessionStorage.setItem('admin_unlocked', 'true');
      setPasscodeError(false);
      showToast('Admin access granted!');
    } else {
      setPasscodeError(true);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formSettings);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Copied ${label} to clipboard!`);
  };

  const clientUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}` : '';
  const adminUrl = typeof window !== 'undefined' ? `${window.location.origin}${window.location.pathname}#admin` : '';

  const handleAddNewProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name.trim()) return;
    addProduct(newProd);
    setIsAddingProduct(false);
    setNewProd({
      name: '',
      tagline: '',
      price: 70,
      currency: 'R',
      jarSize: '250ml Glass Jar',
      heatLevel: 3,
      badge: 'New Batch',
      shortDesc: '',
      fullDesc: '',
      ingredients: ['Selected Garlic', 'Chilli Mash', 'Spices', 'Refined Oil'],
      features: ['Handcrafted batch', '100% natural', 'No artificial preservatives'],
      image: '/src/assets/images/chilli_bang_signature_jar_1790685012781.jpg',
      inStock: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={() => setIsAdminOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Main Admin Window */}
      <div className="relative w-full max-w-5xl rounded-3xl bg-zinc-900 border border-zinc-700 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] z-10 text-white">
        {/* Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Store className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">
                Admin Management Portal
              </h2>
              <span className="text-xs text-zinc-400">
                Update headings, prices, WhatsApp phone number, and craft blends
              </span>
            </div>
          </div>

     
        </div>

        {!isUnlocked ? (
          /* Passcode Verification Screen */
          <div className="p-8 sm:p-14 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-4">
              <Lock className="h-7 w-7" />
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-1">
              Admin Verification
            </h3>
            <p className="text-xs text-zinc-400 mb-6">
              Enter the store manager passcode to access the product pricing and settings panel.
            </p>

            <form onSubmit={handleUnlock} className="w-full space-y-3">
              <input
                type="password"
                value={passcodeAttempt}
                onChange={(e) => {
                  setPasscodeAttempt(e.target.value);
                  setPasscodeError(false);
                }}
                placeholder="Enter passcode (default: og2026)"
                autoFocus
                className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm text-center text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
              />
              {passcodeError && (
                <p className="text-xs text-rose-400 font-medium">
                  Incorrect passcode. (Hint: default is og2026)
                </p>
              )}
              <button
                type="submit"
                className="w-full rounded-xl bg-amber-500 hover:bg-amber-400 py-3 text-xs font-bold text-zinc-950 transition-colors shadow-lg shadow-amber-950/40"
              >
                Unlock Admin Dashboard
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Tab Selector */}
            <div className="flex items-center border-b border-zinc-800 bg-zinc-950/60 px-5 gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('content')}
                className={`py-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeTab === 'content'
                    ? 'border-rose-500 text-rose-400'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                <Store className="h-4 w-4" />
                <span>Store Headings &amp; WhatsApp</span>
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`py-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeTab === 'products'
                    ? 'border-rose-500 text-rose-400'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                <Layers className="h-4 w-4" />
                <span>Products &amp; Pricing ({products.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('pairings')}
                className={`py-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeTab === 'pairings'
                    ? 'border-rose-500 text-rose-400'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                <Sparkles className="h-4 w-4" />
                <span>Features &amp; Food Pairings</span>
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeTab === 'orders'
                    ? 'border-rose-500 text-rose-400'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp Inquiries ({orderHistory.length})</span>
              </button>
            </div>

            {/* Body Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB 1: STORE & HEADINGS */}
              {activeTab === 'content' && (
                <form onSubmit={handleSaveSettings} className="space-y-6 max-w-3xl">
                  {/* Link Sharing Guide Card */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-950 via-zinc-950 to-zinc-900 border border-amber-500/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-amber-400" />
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                          Private Admin Link vs Client Link
                        </span>
                      </div>
                      <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-mono">
                        Alt + A to open
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      {/* Client Link */}
                      <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1.5">
                        <span className="text-[11px] font-bold text-emerald-400 block">
                          1. Client Storefront Link (Share with Customers)
                        </span>
                        <p className="text-[11px] text-zinc-400">
                          Clients will only see the customer storefront &amp; WhatsApp ordering without admin buttons.
                        </p>
                        <div className="flex items-center gap-1.5 pt-1">
                          <code className="flex-1 truncate bg-zinc-950 px-2 py-1.5 rounded text-[11px] text-zinc-300 border border-zinc-800">
                            {clientUrl}
                          </code>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(clientUrl, 'Client Link')}
                            className="p-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors"
                            title="Copy Client Link"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Admin Link */}
                      <div className="p-3 rounded-xl bg-zinc-900/90 border border-amber-500/20 space-y-1.5">
                        <span className="text-[11px] font-bold text-amber-400 block">
                          2. Private Admin Link (Keep Secret / Do Not Share)
                        </span>
                        <p className="text-[11px] text-zinc-400">
                          Bookmark this link to open the Admin Dashboard directly from your browser.
                        </p>
                        <div className="flex items-center gap-1.5 pt-1">
                          <code className="flex-1 truncate bg-zinc-950 px-2 py-1.5 rounded text-[11px] text-amber-300/90 border border-amber-500/20 font-mono">
                            {adminUrl}
                          </code>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(adminUrl, 'Private Admin Link')}
                            className="p-1.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 transition-colors"
                            title="Copy Private Admin Link"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Header Toggle */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-zinc-800 text-xs">
                      <div>
                        <span className="font-semibold text-zinc-200 block">
                          Show Admin Button in Public Navbar
                        </span>
                        <span className="text-[11px] text-zinc-400">
                          Currently disabled so clients visiting the main link do not see admin buttons.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setFormSettings({
                            ...formSettings,
                            showAdminInHeader: !formSettings.showAdminInHeader,
                          })
                        }
                        className={`px-3 py-1.5 rounded-xl font-semibold text-xs transition-colors shrink-0 ${
                          formSettings.showAdminInHeader
                            ? 'bg-amber-500 text-zinc-950 font-bold'
                            : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                        }`}
                      >
                        {formSettings.showAdminInHeader ? 'Enabled (Visible to all)' : 'Disabled (Hidden from clients)'}
                      </button>
                    </div>

                    {/* Passcode input */}
                    <div className="pt-2 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-xs text-zinc-400">
                        Admin Passcode (Protects this portal):
                      </span>
                      <input
                        type="text"
                        value={formSettings.adminPasscode || ''}
                        onChange={(e) =>
                          setFormSettings({
                            ...formSettings,
                            adminPasscode: e.target.value,
                          })
                        }
                        placeholder="e.g. og2026"
                        className="rounded-lg bg-zinc-900 border border-zinc-800 px-2.5 py-1 text-xs text-amber-300 font-mono focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={formSettings.brandName}
                    onChange={(e) =>
                      setFormSettings({ ...formSettings, brandName: e.target.value })
                    }
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Sub-Brand / Byline
                  </label>
                  <input
                    type="text"
                    value={formSettings.subBrand}
                    onChange={(e) =>
                      setFormSettings({ ...formSettings, subBrand: e.target.value })
                    }
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={formSettings.tagline}
                  onChange={(e) =>
                    setFormSettings({ ...formSettings, tagline: e.target.value })
                  }
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              {/* WhatsApp details */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-emerald-500/20 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <Phone className="h-4 w-4" />
                  <span>WhatsApp Receiving Destination</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">
                      Target WhatsApp Number (International Digits only, e.g. 27821234567)
                    </label>
                    <input
                      type="text"
                      value={formSettings.whatsappNumber}
                      onChange={(e) =>
                        setFormSettings({ ...formSettings, whatsappNumber: e.target.value })
                      }
                      className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">
                      Display Number Label (e.g. +27 82 123 4567)
                    </label>
                    <input
                      type="text"
                      value={formSettings.whatsappDisplayNumber}
                      onChange={(e) =>
                        setFormSettings({
                          ...formSettings,
                          whatsappDisplayNumber: e.target.value,
                        })
                      }
                      className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Headings */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Hero Main Heading
                </label>
                <input
                  type="text"
                  value={formSettings.heroHeading}
                  onChange={(e) =>
                    setFormSettings({ ...formSettings, heroHeading: e.target.value })
                  }
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Hero Subtitle Description
                </label>
                <textarea
                  rows={3}
                  value={formSettings.heroSubheading}
                  onChange={(e) =>
                    setFormSettings({ ...formSettings, heroSubheading: e.target.value })
                  }
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500 leading-relaxed"
                />
              </div>

              {/* Announcement Banner */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Top Announcement Ticker
                </label>
                <input
                  type="text"
                  value={formSettings.announcementNotice}
                  onChange={(e) =>
                    setFormSettings({
                      ...formSettings,
                      announcementNotice: e.target.value,
                    })
                  }
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              {/* Pricing & Delivery */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Currency Symbol
                  </label>
                  <input
                    type="text"
                    value={formSettings.currencySymbol}
                    onChange={(e) =>
                      setFormSettings({ ...formSettings, currencySymbol: e.target.value })
                    }
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Standard Delivery Fee (ZAR)
                  </label>
                  <input
                    type="number"
                    value={formSettings.standardDeliveryFee}
                    onChange={(e) =>
                      setFormSettings({
                        ...formSettings,
                        standardDeliveryFee: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-500 tabular-nums"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Free Delivery Threshold
                  </label>
                  <input
                    type="number"
                    value={formSettings.freeDeliveryThreshold}
                    onChange={(e) =>
                      setFormSettings({
                        ...formSettings,
                        freeDeliveryThreshold: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-500 tabular-nums"
                  />
                </div>
              </div>

              {/* Limited stock text */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Urgency / Stock Callout
                </label>
                <input
                  type="text"
                  value={formSettings.limitedStockText}
                  onChange={(e) =>
                    setFormSettings({
                      ...formSettings,
                      limitedStockText: e.target.value,
                    })
                  }
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Pickup Location Notice
                </label>
                <input
                  type="text"
                  value={formSettings.pickupLocation}
                  onChange={(e) =>
                    setFormSettings({
                      ...formSettings,
                      pickupLocation: e.target.value,
                    })
                  }
                  className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-rose-600 px-6 py-3 text-xs font-bold text-white hover:bg-rose-500 transition-colors shadow-lg shadow-rose-950/60"
              >
                <Save className="h-4 w-4" />
                <span>Save All Store Settings</span>
              </button>
            </form>
          )}

          {/* TAB 2: PRODUCTS & PRICING */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-base text-white">
                    Product Catalog Management
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Update prices, edit jar descriptions, change heat levels, or add new blends.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddingProduct(!isAddingProduct)}
                  className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-rose-500 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>{isAddingProduct ? 'Cancel' : 'Add New Jar / Bundle'}</span>
                </button>
              </div>

              {/* Add New Product Form */}
              {isAddingProduct && (
                <form
                  onSubmit={handleAddNewProductSubmit}
                  className="p-5 rounded-2xl bg-zinc-950 border border-rose-500/40 space-y-4"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block">
                    Create New Product
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] text-zinc-400 block mb-1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        value={newProd.name}
                        onChange={(e) =>
                          setNewProd({ ...newProd, name: e.target.value })
                        }
                        placeholder="e.g. Chilli Bang Smokey Chipotle"
                        required
                        className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-400 block mb-1">
                        Tagline
                      </label>
                      <input
                        type="text"
                        value={newProd.tagline}
                        onChange={(e) =>
                          setNewProd({ ...newProd, tagline: e.target.value })
                        }
                        placeholder="e.g. Slow wood-smoked peppers"
                        className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="text-[11px] text-zinc-400 block mb-1">
                        Price ({formSettings.currencySymbol})
                      </label>
                      <input
                        type="number"
                        value={newProd.price}
                        onChange={(e) =>
                          setNewProd({ ...newProd, price: Number(e.target.value) })
                        }
                        className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-400 block mb-1">
                        Jar Size
                      </label>
                      <input
                        type="text"
                        value={newProd.jarSize}
                        onChange={(e) =>
                          setNewProd({ ...newProd, jarSize: e.target.value })
                        }
                        className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-400 block mb-1">
                        Heat Rating (1-5)
                      </label>
                      <select
                        value={newProd.heatLevel}
                        onChange={(e) =>
                          setNewProd({
                            ...newProd,
                            heatLevel: Number(e.target.value) as any,
                          })
                        }
                        className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                      >
                        <option value={1}>1 - Mild</option>
                        <option value={2}>2 - Gentle Kick</option>
                        <option value={3}>3 - Signature Medium</option>
                        <option value={4}>4 - Hot</option>
                        <option value={5}>5 - Fiery Extravaganza</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-400 block mb-1">
                        Badge (Optional)
                      </label>
                      <input
                        type="text"
                        value={newProd.badge || ''}
                        onChange={(e) =>
                          setNewProd({ ...newProd, badge: e.target.value })
                        }
                        placeholder="e.g. Limited Batch"
                        className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-zinc-400 block mb-1">
                      Short Description
                    </label>
                    <input
                      type="text"
                      value={newProd.shortDesc}
                      onChange={(e) =>
                        setNewProd({ ...newProd, shortDesc: e.target.value })
                      }
                      placeholder="Brief 1-sentence teaser"
                      className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingProduct(false)}
                      className="px-4 py-2 rounded-xl bg-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-rose-600 text-xs font-bold text-white hover:bg-rose-500"
                    >
                      Save Product
                    </button>
                  </div>
                </form>
              )}

              {/* Existing Products List */}
              <div className="space-y-4">
                {products.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="h-14 w-14 rounded-xl object-cover bg-zinc-800 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-bold text-sm text-white">
                            {prod.name}
                          </h4>
                          {prod.badge && (
                            <span className="text-[10px] bg-rose-600/30 text-rose-300 px-2 py-0.5 rounded font-bold">
                              {prod.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-zinc-400 block">
                          {prod.jarSize} · Heat: {prod.heatLevel}/5 · {prod.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>

                    {/* Price editor and controls */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-1.5 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800">
                        <span className="text-xs text-zinc-400">{prod.currency}</span>
                        <input
                          type="number"
                          value={prod.price}
                          onChange={(e) =>
                            updateProduct(prod.id, { price: Number(e.target.value) })
                          }
                          className="w-16 bg-transparent text-sm font-bold text-amber-400 focus:outline-none tabular-nums"
                        />
                      </div>

                      <button
                        onClick={() =>
                          updateProduct(prod.id, { inStock: !prod.inStock })
                        }
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                          prod.inStock
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {prod.inStock ? 'In Stock' : 'Sold Out'}
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete product "${prod.name}"?`)) {
                            deleteProduct(prod.id);
                          }
                        }}
                        className="p-2 text-zinc-500 hover:text-rose-400 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FEATURES & PAIRINGS */}
          {activeTab === 'pairings' && (
            <div className="space-y-6">
              {/* Feature Highlights (The 3 circles from the poster) */}
              <div>
                <h3 className="font-display font-bold text-base text-white mb-3">
                  The 3 Core Guarantee Highlights (As shown on poster)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {featureHighlights.map((feat) => (
                    <div
                      key={feat.id}
                      className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2"
                    >
                      <label className="text-[11px] text-zinc-400 block">Title</label>
                      <input
                        type="text"
                        value={feat.title}
                        onChange={(e) =>
                          updateFeatureHighlight(feat.id, { title: e.target.value })
                        }
                        className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500 font-semibold"
                      />
                      <label className="text-[11px] text-zinc-400 block">Description</label>
                      <textarea
                        rows={2}
                        value={feat.description}
                        onChange={(e) =>
                          updateFeatureHighlight(feat.id, {
                            description: e.target.value,
                          })
                        }
                        className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Food Pairings */}
              <div>
                <h3 className="font-display font-bold text-base text-white mb-3">
                  Food Pairings ("Goes along with everything!")
                </h3>
                <div className="space-y-3">
                  {pairings.map((pair) => (
                    <div
                      key={pair.id}
                      className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] text-zinc-400 block mb-1">
                            Dish Category Name
                          </label>
                          <input
                            type="text"
                            value={pair.title}
                            onChange={(e) =>
                              updatePairing(pair.id, { title: e.target.value })
                            }
                            className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500 font-semibold"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-zinc-400 block mb-1">
                            Badge / Type
                          </label>
                          <input
                            type="text"
                            value={pair.badge}
                            onChange={(e) =>
                              updatePairing(pair.id, { badge: e.target.value })
                            }
                            className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[11px] text-zinc-400 block mb-1">
                          OG's Serving Tip
                        </label>
                        <input
                          type="text"
                          value={pair.bestWayToServe}
                          onChange={(e) =>
                            updatePairing(pair.id, { bestWayToServe: e.target.value })
                          }
                          className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-rose-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WHATSAPP ORDER LOGS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-base text-white">
                    Logged WhatsApp Enquiries
                  </h3>
                  <p className="text-xs text-zinc-400">
                    When visitors click "Order via WhatsApp", a record is saved here locally so you never miss an inquiry.
                  </p>
                </div>
                {orderHistory.length > 0 && (
                  <button
                    onClick={clearOrderHistory}
                    className="text-xs text-zinc-400 hover:text-rose-400 transition-colors"
                  >
                    Clear History
                  </button>
                )}
              </div>

              {orderHistory.length === 0 ? (
                <div className="p-8 text-center rounded-2xl bg-zinc-950 border border-zinc-800">
                  <MessageCircle className="h-8 w-8 text-zinc-600 mx-auto mb-2" />
                  <span className="text-xs text-zinc-400">
                    No orders logged yet. Once customers tap "Order via WhatsApp", summaries will appear here.
                  </span>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {orderHistory.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">
                            {item.customerName}
                          </span>
                          <span className="text-[10px] text-zinc-500">
                            {item.timestamp}
                          </span>
                        </div>
                        <span className="text-zinc-400 block mt-0.5">
                          {item.itemsSummary}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-display font-bold text-amber-400 tabular-nums">
                          {formSettings.currencySymbol}
                          {item.totalAmount}
                        </span>
                        <span className="rounded bg-emerald-950 text-emerald-400 px-2 py-0.5 text-[10px] font-semibold border border-emerald-500/20">
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
          </>
        )}
      </div>
    </div>
  );
};

