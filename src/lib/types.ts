export interface Category {
  id: number
  name: string
  slug: string
  description?: string | null
}

export interface Product {
  id: number
  name: string
  slug: string
  description?: string | null
  price: number // Decimal in DB, but usually handled as number/string in frontend. Using number for simplicity if precision isn't critical for display, or string if using Decimal.
  originalPrice?: number | null
  categoryId?: number | null
  imageUrl?: string | null
  isFeatured?: boolean | null
  isAvailable?: boolean | null
}

export interface CartItem {
  id: number
  userId: string
  productId?: number | null
  quantity: number
  product?: Product | null
}

export interface Order {
  id: number
  userId: string
  totalAmount: number
  status?: string | null
  stripePaymentIntentId?: string | null
  customerName?: string | null
  customerEmail?: string | null
  customerPhone?: string | null
  deliveryAddress?: string | null
  notes?: string | null
  createdAt: Date
  updatedAt: Date
  items: OrderItem[]
}

export interface OrderItem {
  id: number
  orderId?: number | null
  productId?: number | null
  quantity: number
  price: number
  product?: Product | null
}
