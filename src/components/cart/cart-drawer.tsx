'use client'

import { useCartStore } from '@/lib/store/cart-store'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

interface CartDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore()

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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
        <SheetHeader className="p-4 sm:p-6 border-b">
          <SheetTitle className="text-xl sm:text-2xl">Shopping Cart</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6 sm:px-8">
            <ShoppingBag className="h-14 w-14 sm:h-16 sm:w-16 text-muted-foreground/50 mb-4 sm:mb-6" />
            <p className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Your cart is empty</p>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Add some delicious items to get started
            </p>
            <Button
              onClick={() => onOpenChange(false)}
              style={{ backgroundColor: '#006994', color: '#ffffff' }}
              className="min-w-[160px]"
            >
              Browse Menu
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 max-h-[60vh] sm:max-h-[calc(100vh-300px)]">
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {items.map((item) => (
                  <div key={item.product.id} className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        {item.product.image ? (
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full">
                            <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground/50" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm sm:text-base mb-1 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1 mb-1">
                          {item.product.description}
                        </p>
                        <p className="font-bold text-primary text-sm sm:text-base">
                          £{item.product.price.toFixed(2)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeItem(item.product.id)}
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-end gap-1 sm:gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 sm:h-9 sm:w-9"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                      <span className="w-8 sm:w-10 text-center font-medium text-sm sm:text-base">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 sm:h-9 sm:w-9"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Separator />

            <SheetFooter className="flex-col p-4 sm:p-6 space-y-3 sm:space-y-4 border-t">
              <div className="space-y-2 sm:space-y-3 w-full">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-medium">£{deliveryFee.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg sm:text-xl font-bold">
                  <span>Total</span>
                  <span style={{ color: '#006994' }}>£{total.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3 w-full pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => clearCart()}
                >
                  Clear
                </Button>
                <Button
                  className="flex-1"
                  style={{ backgroundColor: '#006994', color: '#ffffff' }}
                  asChild
                >
                  <Link href="/checkout" onClick={() => onOpenChange(false)}>
                    Checkout
                  </Link>
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
