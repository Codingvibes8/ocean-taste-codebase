import { Product } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/store/cart-store'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountAmount = hasDiscount ? (product.originalPrice! - product.price) : 0

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col h-full">
      <div className="aspect-video bg-muted relative flex-shrink-0">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <ShoppingBag className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground/50" />
          </div>
        )}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex gap-1 sm:gap-2">
          {product.isFeatured && (
            <Badge className="text-xs">Featured</Badge>
          )}
          {hasDiscount && (
            <Badge variant="secondary" className="text-xs">
              Save £{discountAmount.toFixed(2)}
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="p-4 sm:p-5 flex flex-col flex-1">
        <h3 className="font-semibold mb-2 text-base sm:text-lg line-clamp-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2 flex-1 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          {hasDiscount ? (
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-bold" style={{ color: '#006994' }}>
                £{product.price.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                £{product.originalPrice!.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-lg sm:text-xl font-bold" style={{ color: '#006994' }}>
              £{product.price.toFixed(2)}
            </span>
          )}
          {!product.isAvailable && (
            <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
          )}
        </div>
        <Button
          className="w-full"
          style={{ backgroundColor: '#006994', color: '#ffffff' }}
          disabled={!product.isAvailable}
          onClick={() => addItem(product)}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          {product.isAvailable ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardContent>
    </Card>
  )
}
