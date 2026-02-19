import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Truck, Star, ChefHat, Menu as MenuIcon } from 'lucide-react'
import { MenuSection } from '@/components/menu/menu-section'
import { createClient } from '@/lib/supabase'
import Image from 'next/image'

export default async function Home() {
  const supabase = await createClient()

  // Fetch categories
  const { data: categoriesData } = await supabase
    .from('categories')
    .select('*')
    .order('id', { ascending: true })

  const categories = categoriesData || []

  // Fetch products
  const { data: productsData } = await supabase
    .from('products')
    .select(`
      *,
      categories (*)
    `)
    .eq('is_available', true)

  const products = (productsData || []).map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    price: Number(p.price),
    originalPrice: p.original_price ? Number(p.original_price) : null,
    categoryId: p.category_id,
    categorySlug: p.category_slug,
    imageUrl: p.image_url,
    isFeatured: p.is_featured,
    isAvailable: p.is_available,
    createdAt: p.created_at,
    updatedAt: p.updated_at
  }))


  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-24 sm:py-32 md:py-40 min-h-screen overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=1920&q=80"

          alt="Fresh fish and chips"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/30 to-transparent min-h-[400px] sm:min-h-[500px]" />

        <div className="container px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col items-center justify-center">
          <div className="max-w-4xl  mx-auto">
            <h1 className=" text-3xl text-white/90  sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 md:mb-8 text-center md:text-left text-white drop-shadow-lg">
              Premium Fresh Fish,
              <span className="block mt-2 md:mt-0 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Grilled or Fried to Perfection</span>
            </h1>
            <p className="text-base text-white/80 sm:text-lg md:text-xl text-white/95 mb-8 md:mb-10 text-center md:text-left max-w-3xl mx-auto md:mx-0 drop-shadow-md">
              Savor the finest traditional seafood, prepared fresh with premium ingredients. 
              Whether you crave it perfectly grilled or golden-fried, we deliver excellence to your door.
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
              Why Choose OceanTaste?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
              We're committed to providing the best fried or grilledfresh fish experience with quality,
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
      <MenuSection categories={categories} products={products} />

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8">
              About OceanTaste
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed max-w-3xl mx-auto">
              At OceanTaste, we're passionate about bringing you the finest fish grilled or fried.
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
