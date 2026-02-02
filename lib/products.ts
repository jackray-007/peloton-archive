import { Product } from '@/types';
import { staticProducts } from '@/lib/products-static';

export const products = staticProducts;

export async function getProducts(): Promise<Product[]> {
  if (typeof window === 'undefined') {
    const { getProductsFromStore } = await import('@/lib/products-store');
    return getProductsFromStore();
  }
  try {
    const res = await fetch('/api/products');
    if (!res.ok) return staticProducts;
    const data = await res.json();
    return Array.isArray(data) ? data : staticProducts;
  } catch {
    return staticProducts;
  }
}

export async function getProductByIdAsync(id: string): Promise<Product | undefined> {
  const list = await getProducts();
  return list.find((p) => p.id === id);
}

export const getProductById = (id: string) => products.find((p) => p.id === id);
export const getFeaturedProducts = (list?: Product[]) => (list || products).filter((p) => p.featured);
export const getProductsByCategory = (category: string, list?: Product[]) => (list || products).filter((p) => p.category === category);
export const getProductsByTeam = (team: string, list?: Product[]) => (list || products).filter((p) => p.team === team);
