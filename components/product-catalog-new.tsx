"use client"

import { useState, useMemo } from "react"
import { ProductCardNew as ProductCard } from "./product-card-new"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search } from "lucide-react"

// Productos expandidos con las nuevas imágenes
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
    category: "Conservas",
  },
  {
    id: "2",
    name: "Cumaná Condimento para Pizza 1kg",
    sku: "CUM-PIZ-1KG",
    image: "/images/cumana-condimento.png",
    price: 1890,
    bulkPrice: 1750,
    brand: "Cumaná",
    category: "Aderezos",
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
    category: "Aderezos",
  },
  {
    id: "4",
    name: "Cumaná Pimienta Blanca en Grano 1kg",
    sku: "CUM-PIM-1KG",
    image: "/images/cumana-pimienta.png",
    price: 3200,
    bulkPrice: 2950,
    brand: "Cumaná",
    category: "Aderezos",
  },
  {
    id: "5",
    name: "Pennisi Atún en Aceite 170g",
    sku: "PEN-ATU-170",
    image: "/images/pennisi-atun.png",
    price: 890,
    bulkPrice: 820,
    brand: "Pennisi",
    category: "Conservas",
  },
  {
    id: "6",
    name: "Marolio Duraznos en Almíbar 820g",
    sku: "MAR-DUR-820",
    image: "/images/marolio-duraznos.jpeg",
    price: 1650,
    bulkPrice: 1520,
    brand: "Marolio",
    category: "Conservas",
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
  },
  {
    id: "8",
    name: "Genser Sal Clásica 66% Menos Sodio",
    sku: "GEN-SAL-CLA",
    image: "/images/genser-sal.png",
    price: 450,
    bulkPrice: 420,
    brand: "Genser",
    category: "Aderezos",
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
    category: "Aderezos",
  },
  {
    id: "10",
    name: "Emeth Dulce de Batata 5kg",
    sku: "EME-DUL-5KG",
    image: "/images/emeth-dulce.png",
    price: 6800,
    bulkPrice: 6300,
    brand: "Emeth",
    category: "Conservas",
  },
  {
    id: "11",
    name: "Cumaná Duraznos en Almíbar 820g",
    sku: "CUM-DUR-820",
    image: "/images/cumana-duraznos.png",
    price: 1750,
    bulkPrice: 1620,
    brand: "Cumaná",
    category: "Conservas",
  },
  // Productos adicionales para llegar a 15
  {
    id: "12",
    name: "Cumaná Aceitunas Verdes 500g",
    sku: "CUM-ACE-500",
    image: "/placeholder.svg?height=300&width=300",
    price: 1200,
    bulkPrice: 1100,
    brand: "Cumaná",
    category: "Conservas",
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
    category: "Aderezos",
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
    category: "Conservas",
  },
]

const categories = ["Todas", "Conservas", "Aderezos", "Harinas", "Lácteos", "Bebidas"]
const brands = ["Todas", "Cumaná", "Savora", "La Paulina", "Pennisi", "Marolio", "Genser", "Safra", "Emeth"]

export function ProductCatalogNew() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [selectedBrand, setSelectedBrand] = useState("Todas")
  const [showOnlyNew, setShowOnlyNew] = useState(false)

  const filteredProducts = useMemo(() => {
    return sampleProducts.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "Todas" || product.category === selectedCategory
      const matchesBrand = selectedBrand === "Todas" || product.brand === selectedBrand
      const matchesNew = !showOnlyNew || product.isNew

      return matchesSearch && matchesCategory && matchesBrand && matchesNew
    })
  }, [searchQuery, selectedCategory, selectedBrand, showOnlyNew])

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Filtros Horizontales - Más compactos */}

      {/* Grid de Productos - Optimizado para mostrar más productos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredProducts.slice(0, 15).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
