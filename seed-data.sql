
-- Drop existing tables to refresh with new images
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- Recreate Categories Table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recreate Products Table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  price DECIMAL NOT NULL,
  original_price DECIMAL,
  image_url TEXT,
  category_slug TEXT NOT NULL,
  category_id UUID REFERENCES categories(id),
  is_available BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed Categories
INSERT INTO categories (id, name, slug, description, "order")
VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Fish', 'fish', 'Fresh fish options', 1),
('550e8400-e29b-41d4-a716-446655440001', 'Chips', 'chips', 'Classic chips', 2),
('550e8400-e29b-41d4-a716-446655440002', 'Drinks', 'drinks', 'Refreshing beverages', 3),
('550e8400-e29b-41d4-a716-446655440003', 'Family Deals', 'family-deals', 'Value family meals', 4),
('550e8400-e29b-41d4-a716-446655440004', 'Special Offers', 'special-offers', 'Limited time offers', 5);

-- Seed Products
INSERT INTO products (name, slug, description, price, original_price, image_url, category_id, category_slug, is_available, is_featured)
VALUES 
('Grilled Salmon', 'grilled-salmon', 'Grilled Boneless salmon, perfectly cooked for a tender, flaky texture and rich flavor.', 17.50, NULL, '/grilled-salmon.jpg', '550e8400-e29b-41d4-a716-446655440000', 'fish', true, true),
('Grilled Seabass', 'grilled-seabass', 'Fresh grilled seabass served with lemon and herbs.', 16.99, NULL, '/grilled-seabass.jpg', '550e8400-e29b-41d4-a716-446655440000', 'fish', true, true),
('Seabream', 'seabream', 'Whole grilled seabream, a Mediterranean classic.', 15.99, NULL, '/seabream-med.jpg', '550e8400-e29b-41d4-a716-446655440000', 'fish', true, false),
('Grilled Prawns', 'grilled-prawns', 'Succulent large prawns grilled to perfection.', 14.99, NULL, '/prawns.jpg', '550e8400-e29b-41d4-a716-446655440000', 'fish', true, true),
('Calamari Rings', 'calamari-rings', 'Crispy fried calamari rings with tartar sauce.', 9.99, NULL, '/calamari-rings.jpg', '550e8400-e29b-41d4-a716-446655440000', 'fish', true, false),
('Fish Kebabs', 'fish-kebabs', 'Grilled fish skewers with vegetables.', 13.99, NULL, '/fish-kebabs.jpg', '550e8400-e29b-41d4-a716-446655440000', 'fish', true, false),
('Grilled Sardines', 'grilled-sardines', 'Fresh Atlantic sardines, grilled with sea salt.', 11.99, NULL, '/sardine.jpg', '550e8400-e29b-41d4-a716-446655440000', 'fish', true, false),
('Mix Masala Fish', 'mix-masala-fish', 'Fish fillets marinated in a traditional masala spice mix.', 18.99, NULL, '/mix-masala.jpg', '550e8400-e29b-41d4-a716-446655440000', 'fish', true, true),
('Regular Chips', 'regular-chips', 'Classic hand-cut chips with sea salt', 4.99, NULL, '/rustic_serving_of_three_wh_3.jpg', '550e8400-e29b-41d4-a716-446655440001', 'chips', true, false),
('Loaded Chips', 'loaded-chips', 'Chips topped with cheese sauce and bacon bits', 7.99, 8.99, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop', '550e8400-e29b-41d4-a716-446655440001', 'chips', true, true),
('Soft Drink', 'soft-drink', 'Coca-Cola, Sprite, or Fanta', 2.49, NULL, '/soft-drinks.jpg', '550e8400-e29b-41d4-a716-446655440002', 'drinks', true, false),
('Milkshake', 'milkshake', 'Vanilla, Chocolate, or Strawberry', 4.99, NULL, '/milkshake.jpg', '550e8400-e29b-41d4-a716-446655440002', 'drinks', true, false),
('Fresh Lemonade', 'fresh-lemonade', 'Homemade fresh lemonade with mint', 3.49, NULL, '/lemonade-drink.jpg', '550e8400-e29b-41d4-a716-446655440002', 'drinks', true, true),
('Large Seafood Platter', 'seafood-platter', 'A massive platter for 5-6 people with a variety of fish and sides.', 54.99, 65.00, '/platter-for5-6.jpg', '550e8400-e29b-41d4-a716-446655440003', 'family-deals', true, true),
('Kids Meal', 'kids-meal', '1 piece of fish, small chips, drink', 8.99, NULL, '/kids-meal.jpg', '550e8400-e29b-41d4-a716-446655440003', 'family-deals', true, false),
('Friday Special', 'friday-special', 'Large cod & chips with drink', 11.99, 13.99, '/friday-special.jpg', '550e8400-e29b-41d4-a716-446655440004', 'special-offers', true, true),
('Combo Deal', 'combo-deal', 'Fish, chips, mushy peas, and drink', 13.99, NULL, '/combo-deal.jpg', '550e8400-e29b-41d4-a716-446655440004', 'special-offers', true, true);
