"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Eye } from "lucide-react"
import { ProductWhatsApp } from "./product-whatsapp"
import { useState } from "react"
import Image from "next/image"

interface Product {
  id: string
  name: string
  sku: string
  image: string
  price: number
  bulkPrice?: number
  stock: number
  moq: number
  isNew?: boolean
  isOnSale?: boolean
  brand: string
  category: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleAddToCart = () => {
    // Add to cart logic
    console.log("Added to cart:", product.id)
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <Card
      className="group cursor-pointer transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        {/* Image */}
        <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className={`w-full h-48 object-contain transition-transform duration-300 ${isHovered ? "scale-110" : ""}`}
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && <Badge className="bg-green-600 text-white">Nuevo</Badge>}
            {product.isOnSale && <Badge className="bg-red-600 text-white">Oferta</Badge>}
          </div>

          {/* Quick actions */}
          <div
            className={`absolute top-2 right-2 flex flex-col gap-1 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button size="sm" variant="secondary" className="w-8 h-8 p-0" onClick={handleToggleFavorite}>
              <Heart size={16} className={isFavorite ? "fill-red-500 text-red-500" : ""} />
            </Button>
            <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
              <Eye size={16} />
            </Button>
          </div>

          {/* Stock indicator */}
          <div className="absolute bottom-2 left-2">
            <Badge variant={product.stock > 10 ? "default" : "destructive"} className="text-xs">
              Stock: {product.stock}
            </Badge>
          </div>
        </div>

        {/* Product info */}
        <div className="space-y-2">
          <div className="text-xs text-gray-500 uppercase tracking-wide">
            {product.brand} • SKU: {product.sku}
          </div>

          <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem]">{product.name}</h3>

          {/* Pricing */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Por unidad:</span>
              <span className="font-bold text-lg text-emerald-600">${product.price.toLocaleString("es-AR")}</span>
            </div>
            {product.bulkPrice && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Por bulto:</span>
                <span className="font-semibold text-orange-600">${product.bulkPrice.toLocaleString("es-AR")}</span>
              </div>
            )}
          </div>

          {/* MOQ */}
          <div className="text-xs text-gray-500">Mínimo de compra: {product.moq} unidades</div>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              disabled={product.stock === 0}
            >
              <ShoppingCart size={16} className="mr-2" />
              {product.stock === 0 ? "Sin Stock" : "Agregar al Carrito"}
            </Button>

            <ProductWhatsApp productName={product.name} sku={product.sku} price={product.price} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
