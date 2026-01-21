export interface Product {
  id: string;
  name: string;
  team: string;
  category: 'jersey' | 'shorts' | 'bibs' | 'gloves' | 'socks' | 'accessories' | 'equipment';
  year: number;
  condition: 'new' | 'like-new' | 'excellent' | 'good' | 'fair';
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  description: string;
  size?: string;
  inStock: boolean;
  featured?: boolean;
  tour?: 'world-tour' | 'pro-tour' | 'continental';
}

export interface CartItem {
  product: Product;
  quantity: number;
}


