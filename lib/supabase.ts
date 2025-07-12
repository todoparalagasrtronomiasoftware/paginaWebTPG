import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export type Database = {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
          slug: string
          email: string
          phone: string | null
          address: string | null
          city: string | null
          state: string | null
          postal_code: string | null
          country: string | null
          tax_id: string | null
          contact_person: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          email: string
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          country?: string | null
          tax_id?: string | null
          contact_person?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          email?: string
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          postal_code?: string | null
          country?: string | null
          tax_id?: string | null
          contact_person?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          parent_id: string | null
          image_url: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          parent_id?: string | null
          image_url?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          parent_id?: string | null
          image_url?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          sku: string
          brand: string | null
          description: string | null
          category_id: string | null
          subcategory_id: string | null
          unit_price: number
          bulk_price: number | null
          stock_quantity: number
          min_stock_level: number
          image_url: string | null
          images_urls: string[] | null
          is_new: boolean
          is_on_sale: boolean
          is_featured: boolean
          is_active: boolean
          weight_kg: number | null
          dimensions_cm: string | null
          package_size: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          sku: string
          brand?: string | null
          description?: string | null
          category_id?: string | null
          subcategory_id?: string | null
          unit_price: number
          bulk_price?: number | null
          stock_quantity?: number
          min_stock_level?: number
          image_url?: string | null
          images_urls?: string[] | null
          is_new?: boolean
          is_on_sale?: boolean
          is_featured?: boolean
          is_active?: boolean
          weight_kg?: number | null
          dimensions_cm?: string | null
          package_size?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          sku?: string
          brand?: string | null
          description?: string | null
          category_id?: string | null
          subcategory_id?: string | null
          unit_price?: number
          bulk_price?: number | null
          stock_quantity?: number
          min_stock_level?: number
          image_url?: string | null
          images_urls?: string[] | null
          is_new?: boolean
          is_on_sale?: boolean
          is_featured?: boolean
          is_active?: boolean
          weight_kg?: number | null
          dimensions_cm?: string | null
          package_size?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          company_id: string
          order_number: string
          status: string
          subtotal: number
          tax_amount: number
          shipping_amount: number
          total_amount: number
          notes: string | null
          shipping_address: string | null
          estimated_delivery_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          order_number: string
          status?: string
          subtotal: number
          tax_amount?: number
          shipping_amount?: number
          total_amount: number
          notes?: string | null
          shipping_address?: string | null
          estimated_delivery_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          order_number?: string
          status?: string
          subtotal?: number
          tax_amount?: number
          shipping_amount?: number
          total_amount?: number
          notes?: string | null
          shipping_address?: string | null
          estimated_delivery_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          total_price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
          total_price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
          total_price?: number
          created_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          company_id: string
          product_id: string
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          product_id: string
          quantity: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          product_id?: string
          quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
} 