'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingBag, Clock, CheckCircle, Truck, XCircle } from 'lucide-react'
import Link from 'next/link'

export default function OrdersPage() {
  // Mock order data - will be replaced with API calls
  const orders = [
    {
      id: '1',
      orderNumber: 'SF-2024-001',
      status: 'DELIVERED',
      total: 34.99,
      date: new Date('2024-01-15'),
      items: [
        { name: 'Family Box', quantity: 1 },
        { name: 'Soft Drink', quantity: 2 },
      ],
    },
    {
      id: '2',
      orderNumber: 'SF-2024-002',
      status: 'PREPARING',
      total: 15.99,
      date: new Date(),
      items: [
        { name: 'Classic Cod & Chips', quantity: 1 },
        { name: 'Loaded Chips', quantity: 1 },
      ],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return <CheckCircle className="h-4 w-4" />
      case 'PREPARING':
      case 'CONFIRMED':
      case 'READY':
        return <Clock className="h-4 w-4" />
      case 'CANCELLED':
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'DELIVERED':
        return 'default'
      case 'PREPARING':
      case 'CONFIRMED':
      case 'READY':
        return 'secondary'
      case 'CANCELLED':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'Delivered'
      case 'PREPARING':
        return 'Preparing'
      case 'CONFIRMED':
        return 'Confirmed'
      case 'READY':
        return 'Ready'
      case 'CANCELLED':
        return 'Cancelled'
      default:
        return status.replace('_', ' ').toLowerCase()
    }
  }

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            My Orders
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            View your order history and track your deliveries
          </p>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 md:py-20 px-4">
              <ShoppingBag className="h-16 w-16 sm:h-20 sm:w-20 text-muted-foreground/50 mb-6" />
              <h3 className="text-xl sm:text-2xl font-semibold mb-3">No orders yet</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-8 text-center max-w-md">
                You haven't placed any orders yet. Start browsing our menu!
              </p>
              <Button size="lg" asChild style={{ backgroundColor: '#006994', color: '#ffffff' }}>
                <Link href="/#menu">Browse Menu</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4 sm:pb-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg sm:text-xl font-semibold mb-2">
                        {order.orderNumber}
                      </CardTitle>
                      <CardDescription className="mt-1 text-sm">
                        {order.date.toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={getStatusVariant(order.status)}
                      className="flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 sm:py-2"
                    >
                      {getStatusIcon(order.status)}
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 sm:pt-6">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="space-y-2 sm:space-y-3">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm sm:text-base"
                        >
                          <span className="text-muted-foreground">
                            {item.name} × {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-3 sm:pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-base sm:text-lg">Total</span>
                        <span className="font-bold text-xl sm:text-2xl" style={{ color: '#006994' }}>
                          £{order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
