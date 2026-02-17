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
    const { items, total, subtotal, deliveryAddress, phone } = body

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Order must contain at least one item' },
        { status: 400 }
      )
    }

    // Generate order number
    const orderNumber = `SF-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`

    // Create order in database (for now, we'll return a mock response)
    // In production, this would insert into your Supabase database
    const order = {
      id: crypto.randomUUID(),
      userId: user.id,
      orderNumber,
      status: 'PENDING',
      total,
      subtotal,
      deliveryFee: 2.99,
      tax: 0,
      deliveryAddress,
      phone,
      paymentStatus: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      items: items.map((item: any) => ({
        id: crypto.randomUUID(),
        orderId: crypto.randomUUID(),
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
        product: item.product,
      })),
    }

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred while creating the order' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Return mock orders for now
    // In production, this would fetch from your Supabase database
    const orders = []

    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred while fetching orders' },
      { status: 500 }
    )
  }
}
