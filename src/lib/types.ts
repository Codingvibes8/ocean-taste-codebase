export interface Category {
  id: string
  name: string
  slug: string
  description?: string | null
}

export interface Product {
  id: string
  name: string
  slug: string
  description?: string | null
  price: number // Decimal in DB, but usually handled as number/string in frontend. Using number for simplicity if precision isn't critical for display, or string if using Decimal.
  originalPrice?: number | null
  categoryId?: string | null
  categorySlug: string
  imageUrl?: string | null
  isFeatured?: boolean | null
  isAvailable?: boolean | null
}


export interface CartItem {
  id: string
  userId: string
  productId?: string | null
  quantity: number
  product?: Product | null
}

export interface Order {
  id: string
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
  id: string
  orderId?: string | null
  productId?: string | null
  quantity: number
  price: number
  product?: Product | null
}

