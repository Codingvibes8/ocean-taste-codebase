'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Truck, Star, ChefHat, Menu as MenuIcon } from 'lucide-react'
import { useState, useMemo } from 'react'
import { mockCategories, mockProducts } from '@/lib/mock-data'
import { CategoryFilter } from '@/components/menu/category-filter'
import { ProductCard } from '@/components/menu/product-card'
import { Category, Product } from '@/lib/types'

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredProducts = useMemo(() => {
    if (!activeCategory) return mockProducts
    return mockProducts.filter((product) => product.categorySlug === activeCategory)
  }, [activeCategory])

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 min-h-[600px] sm:min-h-[700px] overflow-hidden">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1504674260159-40d1f6a?w=1920&q=80"
          alt="Fresh fish and chips"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/30 to-transparent min-h-[400px] sm:min-h-[500px]" />

        <div className="container px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 md:mb-8 text-center md:text-left text-white drop-shadow-lg">
              Fresh Fish & Chips
              <span className="block text-white/90 mt-2 md:mt-0">Delivered to You</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/95 mb-8 md:mb-10 text-center md:text-left max-w-3xl mx-auto md:mx-0 drop-shadow-md">
              Experience the best traditional fish & chips in town. Fresh ingredients,
              crispy batter, and fast delivery right to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto min-w-[160px]"
                style={{ backgroundColor: '#006994', color: '#ffffff' }}
              >
                <Link href="#menu">
                  <MenuIcon className="mr-2 h-5 w-5" />
                  View Menu
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto min-w-[160px]"
                style={{ backgroundColor: '#006994', color: '#ffffff' }}
              >
                <Link href="#about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
              Why Choose Sushi Flex?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
              We're committed to providing the best fish & chips experience with quality,
              taste, and convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-primary/10">
                    <ChefHat className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2 md:mb-3 text-base sm:text-lg">Fresh Ingredients</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We use only the freshest fish and locally sourced ingredients
                </p>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-primary/10">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2 md:mb-3 text-base sm:text-lg">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Quick and reliable delivery straight to your doorstep
                </p>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-primary/10">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2 md:mb-3 text-base sm:text-lg">Quality Taste</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Traditional recipes with a modern twist for amazing flavor
                </p>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-primary/10">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2 md:mb-3 text-base sm:text-lg">Quick Service</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Order online and get your food in no time
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
              Our Menu
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
              Explore our delicious selection of fish, chips, drinks, and more
            </p>
          </div>

          <div className="mb-8 md:mb-10">
            <CategoryFilter
              categories={mockCategories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 md:py-20">
              <p className="text-muted-foreground text-base sm:text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8">
              About Sushi Flex
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed max-w-3xl mx-auto">
              At Sushi Flex, we're passionate about bringing you the finest fish & chips experience.
              Our journey started with a simple mission: to serve quality, delicious food that brings
              families and friends together.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed max-w-3xl mx-auto">
              With years of experience in the restaurant industry, we've perfected our recipes to
              deliver consistently amazing taste. We source our fish from sustainable fisheries and
              prepare everything fresh in our kitchen.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
