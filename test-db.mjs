
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config()

async function testConnection() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
        console.error('Missing Supabase credentials')
        return
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log('Fetching products...')
    const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*')

    if (productsError) {
        console.error('Error fetching products:', productsError)
    } else {
        console.log(`Found ${products?.length || 0} products.`)
        console.log(JSON.stringify(products, null, 2))
    }

    console.log('Fetching categories...')
    const { data: categories, error: categoriesError } = await supabase
        .from('categories')
        .select('*')

    if (categoriesError) {
        console.error('Error fetching categories:', categoriesError)
    } else {
        console.log(`Found ${categories?.length || 0} categories.`)
        console.log(JSON.stringify(categories, null, 2))
    }
}

testConnection()
