import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  INITIAL_FEATURE_HIGHLIGHTS,
  INITIAL_PAIRINGS,
  INITIAL_PRODUCTS,
  INITIAL_SETTINGS,
} from '../data/initialData';
import {
  CartItem,
  FeatureHighlight,
  OrderDetails,
  PairingItem,
  Product,
  StoreSettings,
  WhatsAppOrderLog,
} from '../types/store';

interface StoreContextType {
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  featureHighlights: FeatureHighlight[];
  updateFeatureHighlight: (id: string, updated: Partial<FeatureHighlight>) => void;
  pairings: PairingItem[];
  updatePairing: (id: string, updated: Partial<PairingItem>) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTotal: number;
  deliveryCost: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  selectedProductForModal: Product | null;
  setSelectedProductForModal: (product: Product | null) => void;
  orderDetails: OrderDetails;
  updateOrderDetails: (details: Partial<OrderDetails>) => void;
  generateWhatsAppLink: (singleProduct?: Product, singleQuantity?: number) => string;
  submitWhatsAppOrder: (singleProduct?: Product, singleQuantity?: number) => void;
  orderHistory: WhatsAppOrderLog[];
  clearOrderHistory: () => void;
  resetAllToDefaults: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

const STORAGE_KEYS = {
  SETTINGS: 'chillibang_settings_v1',
  PRODUCTS: 'chillibang_products_v1',
  FEATURES: 'chillibang_features_v1',
  PAIRINGS: 'chillibang_pairings_v1',
  ORDERS: 'chillibang_orders_v1',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? { ...INITIAL_SETTINGS, ...JSON.parse(saved) } : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [featureHighlights, setFeatureHighlights] = useState<FeatureHighlight[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FEATURES);
      return saved ? JSON.parse(saved) : INITIAL_FEATURE_HIGHLIGHTS;
    } catch {
      return INITIAL_FEATURE_HIGHLIGHTS;
    }
  });

  const [pairings, setPairings] = useState<PairingItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PAIRINGS);
      return saved ? JSON.parse(saved) : INITIAL_PAIRINGS;
    } catch {
      return INITIAL_PAIRINGS;
    }
  });

  const [orderHistory, setOrderHistory] = useState<WhatsAppOrderLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      return hash === '#admin' || params.get('admin') === 'true';
    }
    return false;
  });
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Listen for hash changes or keyboard shortcut for admin
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      const params = new URLSearchParams(window.location.search);
      if (hash === '#admin' || params.get('admin') === 'true') {
        setIsAdminOpen(true);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret Admin hotkey: Ctrl + Shift + A or Alt + A
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    customerName: '',
    customerPhone: '',
    deliveryMethod: 'courier',
    address: '',
    suburbCity: '',
    notes: '',
  });

  // Local storage synchronizers
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FEATURES, JSON.stringify(featureHighlights));
  }, [featureHighlights]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PAIRINGS, JSON.stringify(pairings));
  }, [pairings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orderHistory));
  }, [orderHistory]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Store settings updated successfully!');
  };

  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...newProdData,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Added product "${newProduct.name}"`);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
    showToast('Product updated successfully!');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    setCart((prev) => prev.filter((item) => item.product.id !== id));
    showToast('Product removed');
  };

  const updateFeatureHighlight = (id: string, updated: Partial<FeatureHighlight>) => {
    setFeatureHighlights((prev) =>
      prev.map((feat) => (feat.id === id ? { ...feat, ...updated } : feat))
    );
    showToast('Highlight updated!');
  };

  const updatePairing = (id: string, updated: Partial<PairingItem>) => {
    setPairings((prev) =>
      prev.map((pair) => (pair.id === id ? { ...pair, ...updated } : pair))
    );
    showToast('Food pairing updated!');
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity}x "${product.name}" to order`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const deliveryCost =
    orderDetails.deliveryMethod === 'pickup'
      ? 0
      : cartSubtotal >= settings.freeDeliveryThreshold
      ? 0
      : settings.standardDeliveryFee;

  const cartTotal = cartSubtotal + deliveryCost;

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const updateOrderDetails = (details: Partial<OrderDetails>) => {
    setOrderDetails((prev) => ({ ...prev, ...details }));
  };

  // WhatsApp order text formatting
  const generateWhatsAppLink = (
    singleProduct?: Product,
    singleQuantity = 1
  ): string => {
    const rawNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
    let text = `🌶️ *ORDER FOR ${settings.brandName.toUpperCase()} ${settings.subBrand}*\n`;
    text += `──────────────────\n`;

    if (singleProduct) {
      const lineTotal = singleProduct.price * singleQuantity;
      text += `*Item:* ${singleQuantity}x ${singleProduct.name} (${singleProduct.jarSize})\n`;
      text += `*Unit Price:* ${settings.currencySymbol}${singleProduct.price}\n`;
      text += `*Total:* ${settings.currencySymbol}${lineTotal}\n\n`;
    } else {
      if (cart.length === 0) {
        text += `Hi OG! I want to enquire about ordering your homemade Chilli Bang jars.\n\n`;
      } else {
        cart.forEach((item, index) => {
          const itemTotal = item.product.price * item.quantity;
          text += `${index + 1}. *${item.quantity}x* ${item.product.name} — ${settings.currencySymbol}${itemTotal} (${settings.currencySymbol}${item.product.price} each)\n`;
        });
        text += `──────────────────\n`;
        text += `*Subtotal:* ${settings.currencySymbol}${cartSubtotal}\n`;
        if (orderDetails.deliveryMethod === 'pickup') {
          text += `*Collection:* Free (Local Pickup)\n`;
        } else {
          text += `*Delivery Fee:* ${deliveryCost === 0 ? 'FREE (Threshold met)' : `${settings.currencySymbol}${deliveryCost}`}\n`;
        }
        text += `*Grand Total:* *${settings.currencySymbol}${cartTotal}*\n\n`;
      }
    }

    // Customer & delivery info
    text += `*CUSTOMER DETAILS:*\n`;
    text += `👤 *Name:* ${orderDetails.customerName.trim() || 'Not specified'}\n`;
    text += `📱 *Phone:* ${orderDetails.customerPhone.trim() || 'Via this WhatsApp chat'}\n`;
    text += `🚚 *Method:* ${orderDetails.deliveryMethod === 'pickup' ? `Local Pickup (${settings.pickupLocation})` : 'Courier / Doorstep Delivery'}\n`;

    if (orderDetails.deliveryMethod === 'courier') {
      text += `📍 *Delivery Address:* ${orderDetails.address.trim() || 'Will provide in chat'}\n`;
      if (orderDetails.suburbCity.trim()) {
        text += `🏙️ *Area/City:* ${orderDetails.suburbCity.trim()}\n`;
      }
    }

    if (orderDetails.notes.trim()) {
      text += `📝 *Notes:* ${orderDetails.notes.trim()}\n`;
    }

    text += `\n_Please confirm stock availability and send payment / EFT details. Thank you!_ 🔥`;

    return `https://wa.me/${rawNumber}?text=${encodeURIComponent(text)}`;
  };

  const submitWhatsAppOrder = (singleProduct?: Product, singleQuantity = 1) => {
    const waUrl = generateWhatsAppLink(singleProduct, singleQuantity);

    // Save to local order inquiry log
    const newLog: WhatsAppOrderLog = {
      id: `ord-${Date.now()}`,
      timestamp: new Date().toLocaleString('en-ZA', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      customerName: orderDetails.customerName || 'Direct WhatsApp Customer',
      customerPhone: orderDetails.customerPhone || 'Via WhatsApp',
      deliveryMethod: orderDetails.deliveryMethod,
      totalAmount: singleProduct ? singleProduct.price * singleQuantity : cartTotal,
      itemsSummary: singleProduct
        ? `${singleQuantity}x ${singleProduct.name}`
        : cart.map((i) => `${i.quantity}x ${i.product.name}`).join(', ') || 'Direct Enquiry',
      status: 'Sent to WhatsApp',
    };

    setOrderHistory((prev) => [newLog, ...prev]);

    // Open WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    showToast('Opening WhatsApp with your order details...');
  };

  const clearOrderHistory = () => {
    setOrderHistory([]);
    showToast('Order history cleared');
  };

  const resetAllToDefaults = () => {
    setSettings(INITIAL_SETTINGS);
    setProducts(INITIAL_PRODUCTS);
    setFeatureHighlights(INITIAL_FEATURE_HIGHLIGHTS);
    setPairings(INITIAL_PAIRINGS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.FEATURES);
    localStorage.removeItem(STORAGE_KEYS.PAIRINGS);
    showToast('Reset all store content to original Chilli Bang branding!');
  };

  return (
    <StoreContext.Provider
      value={{
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
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartTotal,
        deliveryCost,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        isAdminOpen,
        setIsAdminOpen,
        selectedProductForModal,
        setSelectedProductForModal,
        orderDetails,
        updateOrderDetails,
        generateWhatsAppLink,
        submitWhatsAppOrder,
        orderHistory,
        clearOrderHistory,
        resetAllToDefaults,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
