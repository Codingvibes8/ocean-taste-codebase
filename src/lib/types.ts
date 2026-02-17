export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  order: number
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image?: string
  categorySlug: string
  categoryId: string
  inStock: boolean
  featured: boolean
  discount?: number
}

export interface CartItem {
  id: string
  userId: string
  productId: string
  quantity: number
  product: Product
}

export interface Order {
  id: string
  userId: string
  orderNumber: string
  status: OrderStatus
  total: number
  subtotal: number
  deliveryFee: number
  tax: number
  notes?: string
  deliveryAddress?: string
  phone?: string
  paymentIntentId?: string
  paymentStatus: PaymentStatus
  createdAt: Date
  updatedAt: Date
  items: OrderItem[]
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  price: number
  product: Product
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}
