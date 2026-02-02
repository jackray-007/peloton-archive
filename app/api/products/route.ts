import { NextRequest, NextResponse } from 'next/server';
import { getProductsFromStore, upsertProductInStore, deleteProductFromStore } from '@/lib/products-store';
import { Product } from '@/types';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin';

function isAdmin(request: NextRequest): boolean {
  const auth = request.headers.get('x-admin-password') || request.headers.get('authorization')?.replace('Bearer ', '');
  return auth === ADMIN_PASSWORD;
}

export async function GET() {
  try {
    const products = await getProductsFromStore();
    return NextResponse.json(products);
  } catch (e) {
    console.error('GET /api/products', e);
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = await request.json();
    if (body.delete && typeof body.id === 'string') {
      await deleteProductFromStore(body.id);
      const products = await getProductsFromStore();
      return NextResponse.json(products);
    }
    const product = body.product as Product;
    if (!product || !product.name || typeof product.price !== 'number') {
      return NextResponse.json({ error: 'Invalid product (need name, price)' }, { status: 400 });
    }
    if (!product.id) {
      product.id = String(Date.now());
    }
    if (!product.images?.length && product.image) {
      product.images = [product.image];
    }
    await upsertProductInStore(product);
    const products = await getProductsFromStore();
    return NextResponse.json(products);
  } catch (e) {
    console.error('POST /api/products', e);
    return NextResponse.json({ error: 'Failed to save product' }, { status: 500 });
  }
}
