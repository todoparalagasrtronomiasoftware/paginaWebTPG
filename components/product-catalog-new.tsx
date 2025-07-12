"use client"

import { useMemo } from "react"
import { ProductCardNew as ProductCard } from "./product-card-new"
import { useFilter } from "@/components/filter-context"

// Productos expandidos con las nuevas imágenes y categorías del menú
const sampleProducts = [
  {
    id: "1",
    name: "Cumaná Palmitos en Conserva 800g",
    sku: "CUM-PAL-800",
    image: "/images/cumana-palmitos.png",
    price: 2850,
    bulkPrice: 2650,
    isNew: true,
    brand: "Cumaná",
    category: "Almacén",
    subcategory: "Enlatados",
  },
  {
    id: "2",
    name: "Cumaná Condimento para Pizza 1kg",
    sku: "CUM-PIZ-1KG",
    image: "/images/cumana-condimento.png",
    price: 1890,
    bulkPrice: 1750,
    brand: "Cumaná",
    category: "Almacén",
    subcategory: "Condimentos",
  },
  {
    id: "3",
    name: "Savora Mostaza Original 3kg",
    sku: "SAV-MOS-3KG",
    image: "/images/savora-mostaza.png",
    price: 4250,
    bulkPrice: 3950,
    isOnSale: true,
    brand: "Savora",
    category: "Almacén",
    subcategory: "Condimentos",
  },
  {
    id: "4",
    name: "Cumaná Pimienta Blanca en Grano 1kg",
    sku: "CUM-PIM-1KG",
    image: "/images/cumana-pimienta.png",
    price: 3200,
    bulkPrice: 2950,
    brand: "Cumaná",
    category: "Almacén",
    subcategory: "Condimentos",
  },
  {
    id: "5",
    name: "Pennisi Atún en Aceite 170g",
    sku: "PEN-ATU-170",
    image: "/images/pennisi-atun.png",
    price: 890,
    bulkPrice: 820,
    brand: "Pennisi",
    category: "Almacén",
    subcategory: "Enlatados",
  },
  {
    id: "6",
    name: "Marolio Duraznos en Almíbar 820g",
    sku: "MAR-DUR-820",
    image: "/images/marolio-duraznos.jpeg",
    price: 1650,
    bulkPrice: 1520,
    brand: "Marolio",
    category: "Almacén",
    subcategory: "Enlatados",
  },
  {
    id: "7",
    name: "La Paulina Manteca Calidad Extra 5kg",
    sku: "PAU-MAN-5KG",
    image: "/images/la-paulina-manteca.png",
    price: 8900,
    bulkPrice: 8200,
    brand: "La Paulina",
    category: "Lácteos",
    subcategory: "Mantecas",
  },
  {
    id: "8",
    name: "Genser Sal Clásica 66% Menos Sodio",
    sku: "GEN-SAL-CLA",
    image: "/images/genser-sal.png",
    price: 450,
    bulkPrice: 420,
    brand: "Genser",
    category: "Almacén",
    subcategory: "Condimentos",
  },
  {
    id: "9",
    name: "Safra Extracto de Carne",
    sku: "SAF-EXT-CAR",
    image: "/images/safra-extracto.png",
    price: 2100,
    bulkPrice: 1950,
    isNew: true,
    brand: "Safra",
    category: "Almacén",
    subcategory: "Condimentos",
  },
  {
    id: "10",
    name: "Emeth Dulce de Batata 5kg",
    sku: "EME-DUL-5KG",
    image: "/images/emeth-dulce.png",
    price: 6800,
    bulkPrice: 6300,
    brand: "Emeth",
    category: "Almacén",
    subcategory: "Enlatados",
  },
  {
    id: "11",
    name: "Cumaná Duraznos en Almíbar 820g",
    sku: "CUM-DUR-820",
    image: "/images/cumana-duraznos.png",
    price: 1750,
    bulkPrice: 1620,
    brand: "Cumaná",
    category: "Almacén",
    subcategory: "Enlatados",
  },
  {
    id: "12",
    name: "Cumaná Aceitunas Verdes 500g",
    sku: "CUM-ACE-500",
    image: "/placeholder.svg?height=300&width=300",
    price: 1200,
    bulkPrice: 1100,
    brand: "Cumaná",
    category: "Almacén",
    subcategory: "Enlatados",
  },
  {
    id: "13",
    name: "Savora Ketchup 1kg",
    sku: "SAV-KET-1KG",
    image: "/placeholder.svg?height=300&width=300",
    price: 2300,
    bulkPrice: 2150,
    isOnSale: true,
    brand: "Savora",
    category: "Almacén",
    subcategory: "Condimentos",
  },
  {
    id: "14",
    name: "La Paulina Queso Cremoso 1kg",
    sku: "PAU-QUE-1KG",
    image: "/placeholder.svg?height=300&width=300",
    price: 3500,
    bulkPrice: 3200,
    brand: "La Paulina",
    category: "Lácteos",
    subcategory: "Quesos",
  },
  {
    id: "15",
    name: "Marolio Tomate Triturado 520g",
    sku: "MAR-TOM-520",
    image: "/placeholder.svg?height=300&width=300",
    price: 980,
    bulkPrice: 890,
    isNew: true,
    brand: "Marolio",
    category: "Almacén",
    subcategory: "Enlatados",
  },
  // Productos adicionales para cubrir más categorías
  {
    id: "16",
    name: "Coca Cola 2.25L",
    sku: "COC-COL-225",
    image: "/placeholder.svg?height=300&width=300",
    price: 1450,
    bulkPrice: 1350,
    brand: "Coca Cola",
    category: "Bebidas",
    subcategory: "Gaseosas",
  },
  {
    id: "17",
    name: "Quilmes Cerveza 1L",
    sku: "QUI-CER-1L",
    image: "/placeholder.svg?height=300&width=300",
    price: 890,
    bulkPrice: 820,
    brand: "Quilmes",
    category: "Bebidas",
    subcategory: "Cervezas",
  },
  {
    id: "18",
    name: "Bife de Chorizo 1kg",
    sku: "CAR-BIF-1KG",
    image: "/placeholder.svg?height=300&width=300",
    price: 8500,
    bulkPrice: 8200,
    brand: "Frigorífico",
    category: "Carnes",
    subcategory: "Res",
  },
  {
    id: "19",
    name: "Pan Francés x6",
    sku: "PAN-FRA-6U",
    image: "/placeholder.svg?height=300&width=300",
    price: 650,
    bulkPrice: 600,
    brand: "Panadería",
    category: "Panadería",
    subcategory: "Panes",
  },
  {
    id: "20",
    name: "Espátula de Cocina",
    sku: "ESP-COC-001",
    image: "/placeholder.svg?height=300&width=300",
    price: 2200,
    bulkPrice: 2050,
    brand: "Tramontina",
    category: "Equipamiento",
    subcategory: "Utensilios",
  },
]

const categories = ["Todas", "Almacén", "Bebidas", "Lácteos", "Carnes", "Panadería", "Equipamiento"]
const brands = ["Todas", "Cumaná", "Savora", "La Paulina", "Pennisi", "Marolio", "Genser", "Safra", "Emeth", "Coca Cola", "Quilmes", "Frigorífico", "Panadería", "Tramontina"]

export function ProductCatalogNew() {
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory, 
    selectedSubcategory, 
    setSelectedSubcategory, 
    selectedBrand, 
    setSelectedBrand, 
    showOnlyNew, 
    setShowOnlyNew 
  } = useFilter()

  const filteredProducts = useMemo(() => {
    return sampleProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "Todas" || product.category === selectedCategory
      const matchesSubcategory = selectedSubcategory === "Todas" || product.subcategory === selectedSubcategory
      const matchesBrand = selectedBrand === "Todas" || product.brand === selectedBrand
      const matchesNew = !showOnlyNew || product.isNew

      return matchesSearch && matchesCategory && matchesSubcategory && matchesBrand && matchesNew
    })
  }, [searchQuery, selectedCategory, selectedSubcategory, selectedBrand, showOnlyNew])

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Filtros Activos */}
      {(searchQuery || selectedCategory !== "Todas" || selectedSubcategory !== "Todas" || selectedBrand !== "Todas" || showOnlyNew) && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-600">Filtros activos:</span>
            {searchQuery && (
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                Búsqueda: "{searchQuery}"
              </span>
            )}
            {selectedCategory !== "Todas" && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Categoría: {selectedCategory}
              </span>
            )}
            {selectedSubcategory !== "Todas" && (
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                Subcategoría: {selectedSubcategory}
              </span>
            )}
            {selectedBrand !== "Todas" && (
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                Marca: {selectedBrand}
              </span>
            )}
            {showOnlyNew && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Solo nuevos
              </span>
            )}
          </div>
        </div>
      )}

      {/* Resultados */}
      <div className="mb-4">
        <span className="text-sm text-gray-600">
          {filteredProducts.length} productos encontrados
        </span>
      </div>

      {/* Grid de Productos - Optimizado para mostrar más productos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredProducts.slice(0, 20).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
