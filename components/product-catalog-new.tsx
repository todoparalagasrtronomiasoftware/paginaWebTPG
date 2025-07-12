"use client"

import { ProductCardNew as ProductCard } from "./product-card-new"
import { useFilter } from "@/components/filter-context"
import { useProducts, useCategories } from "@/hooks/useProducts"
import { Database } from "@/lib/supabase"

type Category = Database['public']['Tables']['categories']['Row']

export function ProductCatalogNew() {
  const { 
    searchQuery, 
    selectedCategoryId, 
    selectedSubcategoryId, 
    showOnlyNew,
    showOnlyOnSale
  } = useFilter()

  // Fetch data from Supabase
  const { products, loading: productsLoading, error: productsError } = useProducts({
    searchQuery,
    categoryId: selectedCategoryId || undefined,
    subcategoryId: selectedSubcategoryId || undefined,
    isNew: showOnlyNew,
    isOnSale: showOnlyOnSale,
    limit: 50
  })

  const { categories, loading: categoriesLoading } = useCategories()

  // Find category names for display
  const getCategoryName = (categoryId: string | null): string | null => {
    if (!categoryId || !categories || categories.length === 0) return null
    const category = categories.find((cat: Category) => cat.id === categoryId)
    return category?.name || null
  }

  if (productsError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error al cargar productos</h2>
          <p className="text-gray-600">{productsError}</p>
          <p className="text-sm text-gray-500 mt-2">
            Verifica tu conexión a internet y que las credenciales de Supabase estén configuradas correctamente.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Filtros Activos */}
      {(searchQuery || selectedCategoryId || selectedSubcategoryId || showOnlyNew || showOnlyOnSale) && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-600">Filtros activos:</span>
            {searchQuery && (
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                Búsqueda: "{searchQuery}"
              </span>
            )}
            {selectedCategoryId && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Categoría: {getCategoryName(selectedCategoryId)}
              </span>
            )}
            {selectedSubcategoryId && (
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                Subcategoría: {getCategoryName(selectedSubcategoryId)}
              </span>
            )}
            {showOnlyNew && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Solo nuevos
              </span>
            )}
            {showOnlyOnSale && (
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                En oferta
              </span>
            )}
          </div>
        </div>
      )}

      {/* Loading State */}
      {productsLoading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          <p className="mt-2 text-gray-600">Cargando productos...</p>
        </div>
      )}

      {/* Resultados */}
      {!productsLoading && (
        <div className="mb-4">
          <span className="text-sm text-gray-600">
            {products.length} productos encontrados
          </span>
        </div>
      )}

      {/* Grid de Productos - Optimizado para mostrar más productos */}
      {!productsLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!productsLoading && products.length === 0 && (
        <div className="text-center py-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
          <p className="text-gray-600">
            Intenta ajustar tus filtros de búsqueda o{' '}
            <button 
              onClick={() => window.location.reload()} 
              className="text-emerald-600 hover:text-emerald-700 underline"
            >
              recargar la página
            </button>
          </p>
        </div>
      )}
    </div>
  )
}
