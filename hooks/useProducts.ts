import { useState, useEffect, useCallback } from 'react'
import { supabase, Database } from '@/lib/supabase'

// Types
type Product = Database['public']['Tables']['products']['Row']
type Category = Database['public']['Tables']['categories']['Row']

// Product with joined data
interface ProductWithJoins extends Product {
  category?: Category
  subcategory?: Category
}

// Transformed product for the UI
interface TransformedProduct {
  id: string
  name: string
  sku: string
  image: string
  price: number
  bulkPrice?: number
  isNew?: boolean
  isOnSale?: boolean
  brand: string
  category: string
  subcategory?: string
  stockQuantity?: number
  description?: string
}

// Filters interface (removed brandId)
interface ProductFilters {
  searchQuery?: string
  categoryId?: string
  subcategoryId?: string
  isNew?: boolean
  isOnSale?: boolean
  limit?: number
}

export function useProducts(filters: ProductFilters = {}) {
  const [products, setProducts] = useState<TransformedProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Extract individual filter values to avoid object recreation issues
  const { searchQuery, categoryId, subcategoryId, isNew, isOnSale, limit } = filters

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      let query = supabase
        .from('products')
        .select(`
          *,
          category:categories!category_id(name, slug),
          subcategory:categories!subcategory_id(name, slug)
        `)
        .eq('is_active', true)

      // Apply filters using individual values
      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,sku.ilike.%${searchQuery}%,brand.ilike.%${searchQuery}%`)
      }
      
      if (categoryId) {
        query = query.eq('category_id', categoryId)
      }
      
      if (subcategoryId) {
        query = query.eq('subcategory_id', subcategoryId)
      }
      
      if (isNew) {
        query = query.eq('is_new', true)
      }
      
      if (isOnSale) {
        query = query.eq('is_on_sale', true)
      }

      const { data, error } = await query
        .order('created_at', { ascending: false })
        .limit(limit || 50)

      if (error) throw error
      
      // Transform data to match your existing component structure
      const transformedProducts: TransformedProduct[] = (data as ProductWithJoins[]).map(product => ({
        id: product.id,
        name: product.name,
        sku: product.sku,
        image: product.image_url || '/placeholder.svg',
        price: product.unit_price,
        bulkPrice: product.bulk_price || undefined,
        isNew: product.is_new || false,
        isOnSale: product.is_on_sale || false,
        brand: product.brand || 'Sin marca',
        category: product.category?.name || 'Sin categoría',
        subcategory: product.subcategory?.name || 'Sin subcategoría',
        stockQuantity: product.stock_quantity || 0,
        description: product.description || undefined
      }))
      
      setProducts(transformedProducts)
    } catch (error: any) {
      setError(error.message)
      console.error('Error fetching products:', error)
      // Fallback to empty array if there's an error
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [searchQuery, categoryId, subcategoryId, isNew, isOnSale, limit])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, loading, error, refetch: fetchProducts }
}

// Hook to fetch categories
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .is('parent_id', null) // Only main categories
        .order('name')

      if (error) throw error
      setCategories(data || [])
    } catch (error: any) {
      setError(error.message)
      console.error('Error fetching categories:', error)
      setCategories([])
    } finally {
      setLoading(false)
    }
  }

  return { categories, loading, error, refetch: fetchCategories }
}

// Hook to fetch all subcategories grouped by parent category
export function useAllSubcategories() {
  const [subcategoriesByCategory, setSubcategoriesByCategory] = useState<Record<string, Category[]>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAllSubcategories()
  }, [])

  const fetchAllSubcategories = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .not('parent_id', 'is', null) // Only subcategories (has parent_id)
        .order('name')

      if (error) throw error
      
      // Group subcategories by parent_id
      const grouped = (data || []).reduce((acc, subcategory) => {
        const parentId = subcategory.parent_id!
        if (!acc[parentId]) {
          acc[parentId] = []
        }
        acc[parentId].push(subcategory)
        return acc
      }, {} as Record<string, Category[]>)
      
      setSubcategoriesByCategory(grouped)
    } catch (error: any) {
      setError(error.message)
      console.error('Error fetching all subcategories:', error)
      setSubcategoriesByCategory({})
    } finally {
      setLoading(false)
    }
  }

  return { subcategoriesByCategory, loading, error, refetch: fetchAllSubcategories }
}

// Hook to fetch subcategories
export function useSubcategories(categoryId?: string) {
  const [subcategories, setSubcategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (categoryId) {
      fetchSubcategories()
    } else {
      setSubcategories([])
      setLoading(false)
    }
  }, [categoryId])

  const fetchSubcategories = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .eq('parent_id', categoryId)
        .order('name')

      if (error) throw error
      setSubcategories(data || [])
    } catch (error: any) {
      setError(error.message)
      console.error('Error fetching subcategories:', error)
      setSubcategories([])
    } finally {
      setLoading(false)
    }
  }

  return { subcategories, loading, error, refetch: fetchSubcategories }
} 