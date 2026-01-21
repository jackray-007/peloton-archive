import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Lazy initialization - only create Stripe instance when needed
function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('Stripe secret key is not configured');
  }
  return new Stripe(secretKey);
}

export async function GET(request: NextRequest) {
  try {
    const stripe = getStripe();
    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      session,
      customer: session.customer_details,
      paymentStatus: session.payment_status,
    });
  } catch (error: any) {
    console.error('Stripe session retrieval error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to retrieve session' },
      { status: 500 }
    );
  }
}

