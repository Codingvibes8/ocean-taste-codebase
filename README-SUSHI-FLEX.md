# Sushi Flex - Modern Fish & Chips Restaurant Website

A full-stack restaurant website built with Next.js 16, featuring online ordering, authentication with Supabase, and payment processing.

## Features

- **Browse Menu** - View all dishes with images, prices, and special offers
- **Category Filtering** - Filter menu by Fish, Chips, Drinks, Family Deals, and Special Offers
- **Shopping Cart** - Add items to cart with real-time updates and persistent storage
- **User Authentication** - Secure sign-in/sign-up with Supabase
- **Payment Processing** - Complete checkout with Stripe integration (ready to implement)
- **Order Management** - View order history and track deliveries
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Dark/Light Mode** - Theme toggle for user preference

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe (integration ready)
- **State Management**: Zustand
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account
- A Stripe account (for payments, optional)

### Installation

1. Clone the repository and install dependencies:

```bash
bun install
```

1. Set up environment variables:

Copy `.env.example` to `.env` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

1. Start the development server:

```bash
bun run dev
```

1. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

### Supabase

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Stripe (Optional)

```
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Application

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Setting Up Supabase

1. Create a new project in Supabase
2. Run the SQL migration script in your Supabase SQL editor:

```sql
-- Categories
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products
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

-- Users (Supabase auth handles this, but we can add profile data)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  name TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  order_number TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'PENDING',
  total DECIMAL NOT NULL,
  subtotal DECIMAL NOT NULL,
  delivery_fee DECIMAL DEFAULT 0,
  tax DECIMAL DEFAULT 0,
  notes TEXT,
  delivery_address TEXT,
  phone TEXT,
  payment_intent_id TEXT,
  payment_status TEXT DEFAULT 'PENDING',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Items
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
```

1. Log in to your Supabase SQL editor and run the following to insert sample data:

```sql
-- Insert a category (Fish)
INSERT INTO categories (id, name, slug, description, "order")
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'Fish', 'fish', 'Fresh fish options', 1);

-- Insert Grilled Salmon (Fixes the reported error)
INSERT INTO products (
  name, 
  slug, 
  description, 
  price, 
  original_price, 
  category_id, 
  category_slug,
  image_url, 
  is_available, 
  is_featured
) VALUES (
  'Grilled Salmon', 
  'grilled-salmon', 
  'Grilled Boneless salmon, perfectly cooked for a tender, flaky texture and rich flavor. With Chips, salads and 1 bread.', 
  17.50, 
  NULL, 
  '550e8400-e29b-41d4-a716-446655440000', 
  'fish',
  '/placeholder.svg?height=300&width=400', 
  true, 
  true
);

```

## Project Structure

```
sushi-flex/
├── app/                          # Next.js App Router pages
│   ├── api/                      # API routes
│   │   ├── products/             # Products API
│   │   ├── categories/           # Categories API
│   │   ├── payment/             # Payment API
│   │   └── auth/               # Authentication API
│   ├── checkout/                 # Checkout page
│   ├── sign-in/                 # Authentication pages
│   ├── orders/                   # Order history
│   └── page.tsx                 # Home page
├── components/                   # React components
│   ├── layout/                   # Header, footer, theme toggle
│   ├── menu/                     # Product cards, filters
│   ├── cart/                     # Cart drawer and items
│   ├── checkout/                 # Checkout and payment forms
│   └── ui/                       # shadcn/ui components
├── lib/                          # Utilities and configurations
│   ├── supabase.ts              # Supabase client
│   ├── supabase-server.ts       # Supabase server utilities
│   ├── store/                   # Zustand state management
│   ├── types/                   # TypeScript interfaces
│   └── mock-data.ts             # Sample data
└── prisma/                      # Database schema (for reference)
```

## Key Features

### Menu System

- Dynamic menu with category filtering
- Product cards with images, prices, discounts, and badges
- Responsive grid layout

### Shopping Cart

- Persistent cart with Zustand and localStorage
- Real-time item quantity updates
- Sliding cart drawer with checkout button

### Authentication Flow

- Public browsing without sign-in
- Sign-in required for checkout and orders
- Protected routes for order history
- Supabase Auth integration

### Payment Processing

- Stripe integration ready
- Secure payment intent creation
- Order confirmation and tracking

## API Endpoints

- `GET /api/products` - Fetch all products with optional category filtering
- `GET /api/categories` - Fetch all product categories
- `POST /api/auth/sign-in` - Sign in with Supabase
- `POST /api/auth/sign-up` - Sign up with Supabase
- `POST /api/auth/sign-out` - Sign out
- `POST /api/payment/intent` - Create Stripe payment intent
- `GET /api/orders` - Fetch user orders
- `POST /api/orders` - Create new order

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
