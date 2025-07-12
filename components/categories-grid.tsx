"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Wheat, Droplets, Package, Milk, Coffee, ChefHat } from "lucide-react"

const categories = [
  {
    name: "Harinas",
    icon: Wheat,
    description: "Harinas especiales para panadería y pastelería",
    color: "bg-amber-100 text-amber-700",
    hoverColor: "hover:bg-amber-200",
  },
  {
    name: "Aderezos",
    icon: Droplets,
    description: "Salsas, condimentos y especias",
    color: "bg-red-100 text-red-700",
    hoverColor: "hover:bg-red-200",
  },
  {
    name: "Conservas",
    icon: Package,
    description: "Productos enlatados y conservados",
    color: "bg-green-100 text-green-700",
    hoverColor: "hover:bg-green-200",
  },
  {
    name: "Lácteos",
    icon: Milk,
    description: "Quesos, leches y derivados lácteos",
    color: "bg-blue-100 text-blue-700",
    hoverColor: "hover:bg-blue-200",
  },
  {
    name: "Bebidas",
    icon: Coffee,
    description: "Bebidas, jugos y concentrados",
    color: "bg-purple-100 text-purple-700",
    hoverColor: "hover:bg-purple-200",
  },
  {
    name: "Equipamiento",
    icon: ChefHat,
    description: "Utensilios y equipos de cocina",
    color: "bg-orange-100 text-orange-700",
    hoverColor: "hover:bg-orange-200",
  },
]

export function CategoriesGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestras Categorías</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encuentra todo lo que necesitas para tu negocio gastronómico
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.name}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${category.hoverColor}`}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${category.color}`}
                  >
                    <IconComponent size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
