export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  currency: string;
  jarSize: string;
  heatLevel: 1 | 2 | 3 | 4 | 5; // 1 = mild, 3 = signature just right, 5 = extra fiery
  badge?: string;
  shortDesc: string;
  fullDesc: string;
  ingredients: string[];
  features: string[];
  image: string;
  inStock: boolean;
  stockNote?: string;
}

export interface PairingItem {
  id: string;
  title: string;
  description: string;
  bestWayToServe: string;
  badge: string;
}

export interface FeatureHighlight {
  id: string;
  title: string;
  description: string;
  iconName: 'Pepper' | 'Flame' | 'Leaf' | 'Heart' | 'Sparkles' | 'ShieldCheck';
}

export interface StoreSettings {
  brandName: string;
  subBrand: string;
  tagline: string;
  whatsappNumber: string; // e.g. "27821234567"
  whatsappDisplayNumber: string; // e.g. "+27 82 123 4567"
  announcementNotice: string;
  heroHeading: string;
  heroSubheading: string;
  currencySymbol: string;
  standardDeliveryFee: number;
  freeDeliveryThreshold: number;
  pickupLocation: string;
  limitedStockText: string;
  footerNote: string;
  showAdminInHeader: boolean;
  adminPasscode?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderDetails {
  customerName: string;
  customerPhone: string;
  deliveryMethod: 'courier' | 'pickup';
  address: string;
  suburbCity: string;
  notes: string;
}

export interface WhatsAppOrderLog {
  id: string;
  timestamp: string;
  customerName: string;
  customerPhone: string;
  deliveryMethod: 'courier' | 'pickup';
  totalAmount: number;
  itemsSummary: string;
  status: 'Sent to WhatsApp' | 'Confirmed' | 'Delivered';
}
