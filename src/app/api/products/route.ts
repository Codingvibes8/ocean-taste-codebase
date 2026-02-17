import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const supabase = await createClient()

  try {
    let query = supabase
      .from('products')
      .select('*, categories(*)')
      .eq('is_available', true)

    if (category && category !== 'all') {
      query = query.eq('categories.slug', category)
    }

    const { data: productsData, error } = await query

    if (error) throw error

    const products = (productsData || []).map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: Number(p.price),
      originalPrice: p.original_price ? Number(p.original_price) : null,
      categoryId: p.category_id,
      imageUrl: p.image_url,
      isFeatured: p.is_featured,
      isAvailable: p.is_available,
    }))

    return NextResponse.json(products)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
