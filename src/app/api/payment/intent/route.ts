import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { amount, items } = body

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    // For now, return a mock payment intent
    // In production, you would use the Stripe SDK to create a payment intent
    const paymentIntent = {
      id: `pi_${Math.random().toString(36).substr(2, 9)}`,
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'gbp',
      status: 'requires_payment_method',
      clientSecret: `pi_${Math.random().toString(36).substr(2, 9)}_secret_${Math.random().toString(36).substr(2, 9)}`,
    }

    return NextResponse.json(paymentIntent)
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred while creating payment intent' },
      { status: 500 }
    )
  }
}
