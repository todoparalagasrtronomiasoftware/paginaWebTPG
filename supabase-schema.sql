-- TPG Simplified Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create companies table (for B2B customers)
CREATE TABLE IF NOT EXISTS companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100) DEFAULT 'Argentina',
    tax_id VARCHAR(50), -- CUIT/CUIL
    contact_person VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table (supports hierarchy)
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    image_url VARCHAR(500),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table (simplified without brands)
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    sku VARCHAR(100) UNIQUE NOT NULL,
    brand VARCHAR(255), -- Simple text field instead of reference
    description TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    subcategory_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    bulk_price DECIMAL(10,2),
    stock_quantity INTEGER DEFAULT 0,
    min_stock_level INTEGER DEFAULT 5,
    image_url VARCHAR(500),
    images_urls TEXT[], -- Array of image URLs
    is_new BOOLEAN DEFAULT false,
    is_on_sale BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    weight_kg DECIMAL(8,3),
    dimensions_cm VARCHAR(50), -- e.g., "10x20x30"
    package_size VARCHAR(100), -- e.g., "Caja x 12 unidades"
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table (directly reference companies)
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    shipping_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    notes TEXT,
    shipping_address TEXT,
    estimated_delivery_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cart_items table (reference companies directly)
CREATE TABLE IF NOT EXISTS cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(company_id, product_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_subcategory_id ON products(subcategory_id);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_is_new ON products(is_new);
CREATE INDEX IF NOT EXISTS idx_products_is_on_sale ON products(is_on_sale);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_orders_company_id ON orders(company_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_company_id ON cart_items(company_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Public read access for products and categories
CREATE POLICY "Public can view products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view categories" ON categories FOR SELECT USING (is_active = true);

-- Companies can view their own data
CREATE POLICY "Companies can view own data" ON companies FOR SELECT USING (true); -- Public for now, can be restricted later

-- Companies can view their own orders
CREATE POLICY "Companies can view own orders" ON orders FOR SELECT USING (true); -- Can be restricted by company authentication later

-- Companies can view their own order items
CREATE POLICY "Companies can view own order items" ON order_items FOR SELECT USING (true);

-- Companies can manage their own cart
CREATE POLICY "Companies can manage own cart" ON cart_items FOR ALL USING (true);

-- Insert main categories
INSERT INTO categories (name, slug, description, parent_id) VALUES
('Almacén', 'almacen', 'Productos de almacén y despensa', NULL),
('Bebidas', 'bebidas', 'Bebidas y líquidos', NULL),
('Lácteos', 'lacteos', 'Productos lácteos y derivados', NULL),
('Carnes', 'carnes', 'Carnes y embutidos', NULL),
('Panadería', 'panaderia', 'Productos de panadería', NULL),
('Equipamiento', 'equipamiento', 'Equipamiento y utensilios', NULL)
ON CONFLICT (slug) DO NOTHING;

-- Insert subcategories
INSERT INTO categories (name, slug, description, parent_id) VALUES
-- Almacén subcategories
('Conservas', 'conservas', 'Conservas y enlatados', (SELECT id FROM categories WHERE slug = 'almacen')),
('Condimentos', 'condimentos', 'Condimentos y especias', (SELECT id FROM categories WHERE slug = 'almacen')),
('Aceites', 'aceites', 'Aceites y vinagres', (SELECT id FROM categories WHERE slug = 'almacen')),
('Harinas', 'harinas', 'Harinas y cereales', (SELECT id FROM categories WHERE slug = 'almacen')),
('Dulces', 'dulces', 'Dulces y mermeladas', (SELECT id FROM categories WHERE slug = 'almacen')),
-- Bebidas subcategories
('Gaseosas', 'gaseosas', 'Gaseosas y refrescos', (SELECT id FROM categories WHERE slug = 'bebidas')),
('Jugos', 'jugos', 'Jugos y néctares', (SELECT id FROM categories WHERE slug = 'bebidas')),
('Aguas', 'aguas', 'Aguas y aguas saborizadas', (SELECT id FROM categories WHERE slug = 'bebidas')),
-- Lácteos subcategories
('Leches', 'leches', 'Leches y bebidas lácteas', (SELECT id FROM categories WHERE slug = 'lacteos')),
('Quesos', 'quesos', 'Quesos y productos lácteos', (SELECT id FROM categories WHERE slug = 'lacteos')),
('Mantecas', 'mantecas', 'Mantecas y margarinas', (SELECT id FROM categories WHERE slug = 'lacteos')),
-- Carnes subcategories
('Carnes Rojas', 'carnes-rojas', 'Carnes rojas y derivados', (SELECT id FROM categories WHERE slug = 'carnes')),
('Pollo', 'pollo', 'Pollo y derivados', (SELECT id FROM categories WHERE slug = 'carnes')),
('Pescados', 'pescados', 'Pescados y mariscos', (SELECT id FROM categories WHERE slug = 'carnes')),
-- Panadería subcategories
('Panes', 'panes', 'Panes y productos de panadería', (SELECT id FROM categories WHERE slug = 'panaderia')),
('Facturas', 'facturas', 'Facturas y productos dulces', (SELECT id FROM categories WHERE slug = 'panaderia')),
-- Equipamiento subcategories
('Utensilios', 'utensilios', 'Utensilios de cocina', (SELECT id FROM categories WHERE slug = 'equipamiento')),
('Equipos', 'equipos', 'Equipos y maquinaria', (SELECT id FROM categories WHERE slug = 'equipamiento'))
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products (simplified without brand references)
INSERT INTO products (name, slug, sku, brand, description, category_id, subcategory_id, unit_price, bulk_price, stock_quantity, image_url, is_new, is_on_sale, is_featured) VALUES
('Duraznos en Almíbar Marolio 820g', 'duraznos-almibar-marolio-820g', 'MAR-DUR-820', 'Marolio', 'Duraznos en almíbar, lata de 820g', 
 (SELECT id FROM categories WHERE slug = 'almacen'), 
 (SELECT id FROM categories WHERE slug = 'conservas'), 
 850, 780, 100, '/images/marolio-duraznos.jpeg', true, false, true),

('Condimento Completo Cumana 500g', 'condimento-completo-cumana-500g', 'CUM-CON-500', 'Cumana', 'Condimento completo para carnes, envase de 500g', 
 (SELECT id FROM categories WHERE slug = 'almacen'), 
 (SELECT id FROM categories WHERE slug = 'condimentos'), 
 450, 400, 150, '/images/cumana-condimento.png', false, true, true),

('Palmitos en Conserva Cumana 400g', 'palmitos-conserva-cumana-400g', 'CUM-PAL-400', 'Cumana', 'Palmitos en conserva, lata de 400g', 
 (SELECT id FROM categories WHERE slug = 'almacen'), 
 (SELECT id FROM categories WHERE slug = 'conservas'), 
 1200, 1100, 80, '/images/cumana-palmitos.png', false, false, false),

('Pimienta Negra Cumana 100g', 'pimienta-negra-cumana-100g', 'CUM-PIM-100', 'Cumana', 'Pimienta negra molida, envase de 100g', 
 (SELECT id FROM categories WHERE slug = 'almacen'), 
 (SELECT id FROM categories WHERE slug = 'condimentos'), 
 350, 320, 200, '/images/cumana-pimienta.png', false, true, false),

('Sal Fina Genser 1kg', 'sal-fina-genser-1kg', 'GEN-SAL-1KG', 'Genser', 'Sal fina de mesa, paquete de 1kg', 
 (SELECT id FROM categories WHERE slug = 'almacen'), 
 (SELECT id FROM categories WHERE slug = 'condimentos'), 
 180, 150, 300, '/images/genser-sal.png', false, false, false),

('Manteca La Paulina 200g', 'manteca-la-paulina-200g', 'LAP-MAN-200', 'La Paulina', 'Manteca sin sal, envase de 200g', 
 (SELECT id FROM categories WHERE slug = 'lacteos'), 
 (SELECT id FROM categories WHERE slug = 'mantecas'), 
 680, 620, 120, '/images/la-paulina-manteca.png', false, false, true),

('Atún en Aceite Pennisi 170g', 'atun-aceite-pennisi-170g', 'PEN-ATU-170', 'Pennisi', 'Atún en aceite, lata de 170g', 
 (SELECT id FROM categories WHERE slug = 'carnes'), 
 (SELECT id FROM categories WHERE slug = 'pescados'), 
 920, 850, 90, '/images/pennisi-atun.png', true, false, false),

('Extracto de Tomate Safra 340g', 'extracto-tomate-safra-340g', 'SAF-EXT-340', 'Safra', 'Extracto de tomate concentrado, lata de 340g', 
 (SELECT id FROM categories WHERE slug = 'almacen'), 
 (SELECT id FROM categories WHERE slug = 'conservas'), 
 420, 380, 180, '/images/safra-extracto.png', false, true, false),

('Mostaza Savora 250g', 'mostaza-savora-250g', 'SAV-MOS-250', 'Savora', 'Mostaza tradicional, envase de 250g', 
 (SELECT id FROM categories WHERE slug = 'almacen'), 
 (SELECT id FROM categories WHERE slug = 'condimentos'), 
 380, 340, 160, '/images/savora-mostaza.png', false, false, true),

('Dulce de Leche Emeth 400g', 'dulce-leche-emeth-400g', 'EME-DUL-400', 'Emeth', 'Dulce de leche tradicional, envase de 400g', 
 (SELECT id FROM categories WHERE slug = 'almacen'), 
 (SELECT id FROM categories WHERE slug = 'dulces'), 
 750, 690, 140, '/images/emeth-dulce.png', true, true, true)
ON CONFLICT (slug) DO NOTHING;

-- Create a sample company for testing
INSERT INTO companies (name, slug, email, phone, address, city, state, country, tax_id, contact_person) VALUES
('Restaurante Demo', 'restaurante-demo', 'demo@restaurante.com', '+54 11 1234-5678', 'Av. Corrientes 1234', 'Buenos Aires', 'CABA', 'Argentina', '20-12345678-9', 'Juan Pérez')
ON CONFLICT (slug) DO NOTHING;

-- Update success message
SELECT 'Simplified database schema created successfully! You can now test the application.' as message; 