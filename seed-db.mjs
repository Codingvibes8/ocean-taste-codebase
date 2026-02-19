
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config()

async function seed() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
        console.error('Missing Supabase credentials')
        return
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // We need to parse the mock-data.ts file or import it. 
    // Since it's TS, it's easier to just paste the data here for the script or use a trick.
    // I'll define the data directly here to avoid TS compilation issues in a simple JS script.

    const categories = [
        { id: '550e8400-e29b-41d4-a716-446655440000', name: 'Fish', slug: 'fish', description: 'Fresh fish options', order: 1 },
        { id: '550e8400-e29b-41d4-a716-446655440001', name: 'Chips', slug: 'chips', description: 'Classic chips', order: 2 },
        { id: '550e8400-e29b-41d4-a716-446655440002', name: 'Drinks', slug: 'drinks', description: 'Refreshing beverages', order: 3 },
        { id: '550e8400-e29b-41d4-a716-446655440003', name: 'Family Deals', slug: 'family-deals', description: 'Value family meals', order: 4 },
        { id: '550e8400-e29b-41d4-a716-446655440004', name: 'Special Offers', slug: 'special-offers', description: 'Limited time offers', order: 5 },
    ]

    const products = [
        {
            name: 'Grilled Salmon',
            slug: 'grilled-salmon',
            description: 'Grilled Boneless salmon, perfectly cooked for a tender, flaky texture and rich flavor.',
            price: 17.50,
            image_url: '/grilled-salmon.jpg',
            category_id: '550e8400-e29b-41d4-a716-446655440000',
            category_slug: 'fish',
            is_available: true,
            is_featured: true,
        },
        {
            name: 'Grilled Seabass',
            slug: 'grilled-seabass',
            description: 'Fresh grilled seabass served with lemon and herbs.',
            price: 16.99,
            image_url: '/grilled-seabass.jpg',
            category_id: '550e8400-e29b-41d4-a716-446655440000',
            category_slug: 'fish',
            is_available: true,
            is_featured: true,
        },
        {
            name: 'Seabream',
            slug: 'seabream',
            description: 'Whole grilled seabream, a Mediterranean classic.',
            price: 15.99,
            image_url: '/seabream-med.jpg',
            category_id: '550e8400-e29b-41d4-a716-446655440000',
            category_slug: 'fish',
            is_available: true,
            is_featured: false,
        },
        {
            name: 'Grilled Prawns',
            slug: 'grilled-prawns',
            description: 'Succulent large prawns grilled to perfection.',
            price: 14.99,
            image_url: '/prawns.jpg',
            category_id: '550e8400-e29b-41d4-a716-446655440000',
            category_slug: 'fish',
            is_available: true,
            is_featured: true,
        },
        {
            name: 'Calamari Rings',
            slug: 'calamari-rings',
            description: 'Crispy fried calamari rings with tartar sauce.',
            price: 9.99,
            image_url: '/calamari-rings.jpg',
            category_id: '550e8400-e29b-41d4-a716-446655440000',
            category_slug: 'fish',
            is_available: true,
            is_featured: false,
        },
        {
            name: 'Fish Kebabs',
            slug: 'fish-kebabs',
            description: 'Grilled fish skewers with vegetables.',
            price: 13.99,
            image_url: '/fish-kebabs.jpg',
            category_id: '550e8400-e29b-41d4-a716-446655440000',
            category_slug: 'fish',
            is_available: true,
            is_featured: false,
        },
        {
            name: 'Grilled Sardines',
            slug: 'grilled-sardines',
            description: 'Fresh Atlantic sardines, grilled with sea salt.',
            price: 11.99,
            image_url: '/sardine.jpg',
            category_id: '550e8400-e29b-41d4-a716-446655440000',
            category_slug: 'fish',
            is_available: true,
            is_featured: false,
        },
        {
            name: 'Mix Masala Fish',
            slug: 'mix-masala-fish',
            description: 'Fish fillets marinated in a traditional masala spice mix.',
            price: 18.99,
            image_url: '/mix-masala.jpg',
            category_id: '550e8400-e29b-41d4-a716-446655440000',
            category_slug: 'fish',
            is_available: true,
            is_featured: true,
        },
        {
            name: 'Regular Chips',
            slug: 'regular-chips',
            description: 'Classic hand-cut chips with sea salt',
            price: 4.99,
            image_url: '/regular-chips',
            category_id: '550e8400-e29b-41d4-a716-446655440001',
            category_slug: 'chips',
            is_available: true,
            is_featured: false,
        },
        {
            name: 'Loaded Chips',
            slug: 'loaded-chips',
            description: 'Chips topped with cheese sauce and bacon bits',
            price: 7.99,
            image_url: '/loaded-chips.jpg',
            category_id: '550e8400-e29b-41d4-a716-446655440001',
            category_slug: 'chips',
            is_available: true,
            is_featured: true,
            original_price: 8.99,
        },
        {
            name: 'Soft Drink',
            slug: 'soft-drink',
            description: 'Coca-Cola, Sprite, or Fanta',
            price: 2.49,
            image_url: '/soft-drinks.jpg',
            category_id: '550e8400-e29b-41d4-a716-446655440002',
            category_slug: 'drinks',
            is_available: true,
            is_featured: false,
        },
        {
            name: 'Milkshake',
            slug: 'milkshake',
            description: 'Vanilla, Chocolate, or Strawberry',
            price: 4.99,
            image_url: '/milkshake',
            category_id: '550e8400-e29b-41d4-a716-446655440002',
            category_slug: 'drinks',
            is_available: true,
            is_featured: false,
        },
        {
            name: 'Fresh Lemonade',
            slug: 'fresh-lemonade',
            description: 'Homemade fresh lemonade with mint',
            price: 3.49,
            image_url: '/lemonade-drink.jpg',
            category_id: '550e8400-e29b-41d4-a716-446655440002',
            category_slug: 'drinks',
            is_available: true,
            is_featured: true,
        },
        {
            name: 'Large Seafood Platter',
            slug: 'seafood-platter',
            description: 'A massive platter for 5-6 people with a variety of fish and sides.',
            price: 54.99,
            image_url: '/platter-for5-6.jpg',
            category_id: '550e8400-e29b-41d4-a716-446655440003',
            category_slug: 'family-deals',
            is_available: true,
            is_featured: true,
            original_price: 65.00,
        },
        {
            name: 'Kids Meal',
            slug: 'kids-meal',
            description: '1 piece of fish, small chips, drink',
            price: 8.99,
            image_url: '//kids-meal.jpg',
            category_id: '550e8400-e29b-41d4-a716-446655440003',
            category_slug: 'family-deals',
            is_available: true,
            is_featured: false,
        },
        {
            name: 'Friday Special',
            slug: 'friday-special',
            description: 'Large cod & chips with drink',
            price: 11.99,
            image_url: '/grilled-salmon.jpg',
            category_id: '550e8400-e29b-41d4-a716-446655440004',
            category_slug: 'special-offers',
            is_available: true,
            is_featured: true,
            original_price: 13.99,
        },
        {
            name: 'Combo Deal',
            slug: 'combo-deal',
            description: 'Fish, chips, mushy peas, and drink',
            price: 13.99,
            image_url: '/grilled-seabass.jpg',
            category_id: '550e8400-e29b-41d4-a716-446655440004',
            category_slug: 'special-offers',
            is_available: true,
            is_featured: true,
        },
    ]

    console.log('Inserting categories...')
    const { error: catError } = await supabase
        .from('categories')
        .upsert(categories, { onConflict: 'slug' })

    if (catError) {
        console.error('Error inserting categories:', catError)
        return
    }
    console.log('Categories inserted successfully.')

    console.log('Inserting products...')
    const { error: prodError } = await supabase
        .from('products')
        .upsert(products, { onConflict: 'slug' })

    if (prodError) {
        console.error('Error inserting products:', prodError)
        return
    }
    console.log('Products inserted successfully.')
}

seed()
