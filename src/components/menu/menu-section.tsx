'use client'

import { useState, useMemo } from 'react'
import { CategoryFilter } from '@/components/menu/category-filter'
import { ProductCard } from '@/components/menu/product-card'
import { Category, Product } from '@/lib/types'

interface MenuSectionProps {
  categories: Category[]
  products: Product[]
}

export function MenuSection({ categories, products }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredProducts = useMemo(() => {
    if (!activeCategory || activeCategory === 'all') return products
    return products.filter((product) => {
        const category = categories.find(c => c.slug === activeCategory)
        return category ? product.categoryId === category.id : true
    })
  }, [activeCategory, products, categories])

  return (
    <section id="menu" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/50">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
            Our Menu
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
            Explore our delicious selection of fresh fish dishes and more
          </p>
        </div>

        <div className="mb-8 md:mb-10">
          <CategoryFilter
            categories={categories}
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
  )
}
