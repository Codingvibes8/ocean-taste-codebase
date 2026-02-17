import { NextResponse } from 'next/server'
import { mockProducts } from '@/lib/mock-data'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  let products = mockProducts

  if (category && category !== 'all') {
    products = products.filter((p) => p.categorySlug === category)
  }

  return NextResponse.json(products)
}
