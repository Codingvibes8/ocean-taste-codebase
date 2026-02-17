'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useCartStore } from '@/lib/store/cart-store'
import { ShoppingBag, Trash2, CreditCard, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import Image from 'next/image'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, removeItem, updateQuantity, clearCart } = useCartStore()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(productId)
    } else {
      updateQuantity(productId, newQuantity)
    }
  }

  const subtotal = getTotalPrice()
  const deliveryFee = 2.99
  const total = subtotal + deliveryFee

  const handleCheckout = async () => {
    if (!formData.name || !formData.phone || !formData.address) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          total,
          subtotal,
          deliveryAddress: `${formData.address}, ${formData.city} ${formData.postalCode}`,
          phone: formData.phone,
        }),
      })

      if (response.ok) {
        clearCart()
        toast({
          title: 'Order Placed!',
          description: 'Your order has been successfully placed.',
        })
        router.push('/orders')
      } else {
        throw new Error('Failed to place order')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to place order. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Checkout
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Complete your order and enjoy delicious fish & chips
          </p>
        </div>

        {items.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 md:py-20">
              <ShoppingBag className="h-16 w-16 sm:h-20 sm:w-20 text-muted-foreground/50 mb-6" />
              <h3 className="text-xl sm:text-2xl font-semibold mb-3">Your cart is empty</h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-8 text-center max-w-md">
                Browse our menu and add some items to your cart
              </p>
              <Button size="lg" asChild>
                <Link href="/#menu">Browse Menu</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Order Details */}
            <div className="space-y-6 md:space-y-8">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <ShoppingBag className="h-5 w-5" />
                    Your Order
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Review your items before placing of order
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4 sm:space-y-6">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-3 sm:p-4 border rounded-lg">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          {item.product.imageUrl ? (
                            <Image
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              fill
                              sizes="96px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center w-full h-full">
                              <ShoppingBag className="h-8 w-8 text-muted-foreground/50" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm sm:text-base mb-1 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            £{item.product.price.toFixed(2)} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-auto">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center font-medium text-sm sm:text-base">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          >
                            +
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                            onClick={() => removeItem(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <CreditCard className="h-5 w-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="font-medium">£{deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg sm:text-xl font-bold">
                      <span>Total</span>
                      <span style={{ color: '#006994' }}>£{total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Delivery Details */}
            <div className="space-y-6 md:space-y-8">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <MapPin className="h-5 w-5" />
                    Delivery Details
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Provide your delivery information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-5 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm sm:text-base">
                      Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-10 sm:h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm sm:text-base flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+44 1234567890"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="h-10 sm:h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm sm:text-base">
                      Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="address"
                      placeholder="123 Main Street"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                      className="h-10 sm:h-11"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm sm:text-base">
                        City <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="city"
                        placeholder="London"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                        className="h-10 sm:h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode" className="text-sm sm:text-base">
                        Postal Code <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="postalCode"
                        placeholder="SW1A 1AA"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        required
                        className="h-10 sm:h-11"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Placeholder */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <CreditCard className="h-5 w-5" />
                    Payment
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Payment will be processed securely via Stripe
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 sm:p-6 border rounded-lg bg-muted/50">
                    <p className="text-sm sm:text-base text-center text-muted-foreground">
                      Secure payment with Stripe (Coming Soon)
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-3 sm:space-y-4">
                <Button
                  className="w-full h-12 sm:h-14 text-base sm:text-lg"
                  onClick={handleCheckout}
                  disabled={!formData.name || !formData.phone || !formData.address || isSubmitting}
                  style={{ backgroundColor: '#006994', color: '#ffffff' }}
                >
                  {isSubmitting ? 'Processing...' : `Place Order - £${total.toFixed(2)}`}
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 sm:h-14 text-base sm:text-lg"
                  asChild
                >
                  <Link href="/#menu">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
