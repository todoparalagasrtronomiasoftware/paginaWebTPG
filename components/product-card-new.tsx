"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface Product {
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
}

interface ProductCardProps {
  product: Product
}

export function ProductCardNew({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = () => {
    console.log("Added to cart:", product.id)
  }

  return (
    <Card
      className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-3">
        {/* Image - Optimizada */}
        <div className="relative mb-3 overflow-hidden rounded-lg bg-gray-50">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className={`w-full h-40 object-contain transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <Badge className="bg-green-600 text-white font-semibold px-2 py-0.5 text-xs">NUEVO</Badge>
            )}
            {product.isOnSale && (
              <Badge className="bg-red-600 text-white font-semibold px-2 py-0.5 text-xs">OFERTA</Badge>
            )}
          </div>
        </div>

        {/* Product info */}
        <div className="space-y-2">
          {/* Brand y SKU */}
          <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">
            {product.brand} • {product.sku}
          </div>

          {/* Nombre del producto */}
          <h3 className="font-bold text-gray-900 text-sm leading-tight min-h-[2.5rem] line-clamp-2">{product.name}</h3>

          {/* Precios */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600 font-medium">Por unidad:</span>
              <span className="font-bold text-lg text-emerald-600">${product.price.toLocaleString("es-AR")}</span>
            </div>
            {product.bulkPrice && (
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600 font-medium">Por bulto:</span>
                <span className="font-bold text-base text-orange-600">
                  ${product.bulkPrice.toLocaleString("es-AR")}
                </span>
              </div>
            )}
          </div>

          {/* Botón Agregar al Carrito */}
          <Button
            onClick={handleAddToCart}
            className="w-full bg-emerald-600 hover:bg-emerald-700 h-9 text-sm font-semibold"
          >
            <ShoppingCart size={16} className="mr-1" />
            Agregar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export { ProductCardNew as ProductCard }
