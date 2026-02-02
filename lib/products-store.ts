import { put, list } from '@vercel/blob';
import { Product } from '@/types';
import { staticProducts } from '@/lib/products-static';

const BLOB_KEY = 'peloton-archive/products.json';

/**
 * Read products from Vercel Blob. If empty, returns static list and seeds Blob.
 * Use this server-side (API routes, server components).
 */
export async function getProductsFromStore(): Promise<Product[]> {
  try {
    const blobs = await list({ prefix: 'peloton-archive/' });
    const productsBlob = blobs.blobs.find((b) => b.pathname === BLOB_KEY || b.pathname?.endsWith('products.json'));
    if (productsBlob?.url) {
      const res = await fetch(productsBlob.url);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data as Product[];
      }
    }
  } catch (_) {
    // Blob not configured or empty
  }
  // Seed Blob with static products so next time we have data
  try {
    await put(BLOB_KEY, JSON.stringify(staticProducts, null, 2), {
      access: 'public',
      contentType: 'application/json',
    });
  } catch (_) {
    // Ignore seed errors (e.g. no token in dev)
  }
  return staticProducts;
}

/**
 * Save full product list to Blob. Admin only.
 */
export async function saveProductsToStore(products: Product[]): Promise<void> {
  await put(BLOB_KEY, JSON.stringify(products, null, 2), {
    access: 'public',
    contentType: 'application/json',
  });
}

/**
 * Add or update a single product in the store.
 */
export async function upsertProductInStore(product: Product): Promise<Product[]> {
  const current = await getProductsFromStore();
  const index = current.findIndex((p) => p.id === product.id);
  const next = [...current];
  if (index >= 0) {
    next[index] = product;
  } else {
    next.push(product);
  }
  await saveProductsToStore(next);
  return next;
}

/**
 * Delete a product from the store.
 */
export async function deleteProductFromStore(id: string): Promise<Product[]> {
  const current = await getProductsFromStore();
  const next = current.filter((p) => p.id !== id);
  await saveProductsToStore(next);
  return next;
}
