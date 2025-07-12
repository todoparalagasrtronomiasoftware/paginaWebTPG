"use client"

import { Search, Menu, ShoppingCart, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)

  const navItems = [
    { name: "Catálogo", href: "/" },
    { name: "Marcas", href: "/marcas" },
    { name: "Promociones", href: "/promociones" },
    { name: "Nosotros", href: "/nosotros" },
  ]

  const categories = [
    {
      name: "Almacén",
      subcategories: [
        { name: "Aceites", href: "/categoria/almacen/aceites" },
        { name: "Enlatados", href: "/categoria/almacen/enlatados" },
        { name: "Snacks", href: "/categoria/almacen/snacks" },
        { name: "Harinas", href: "/categoria/almacen/harinas" },
        { name: "Condimentos", href: "/categoria/almacen/condimentos" },
      ],
    },
    {
      name: "Bebidas",
      subcategories: [
        { name: "Gaseosas", href: "/categoria/bebidas/gaseosas" },
        { name: "Cervezas", href: "/categoria/bebidas/cervezas" },
        { name: "Vinos", href: "/categoria/bebidas/vinos" },
        { name: "Jugos", href: "/categoria/bebidas/jugos" },
        { name: "Aguas", href: "/categoria/bebidas/aguas" },
      ],
    },
    {
      name: "Lácteos",
      subcategories: [
        { name: "Quesos", href: "/categoria/lacteos/quesos" },
        { name: "Leches", href: "/categoria/lacteos/leches" },
        { name: "Yogures", href: "/categoria/lacteos/yogures" },
        { name: "Mantecas", href: "/categoria/lacteos/mantecas" },
        { name: "Cremas", href: "/categoria/lacteos/cremas" },
      ],
    },
    {
      name: "Carnes",
      subcategories: [
        { name: "Res", href: "/categoria/carnes/res" },
        { name: "Pollo", href: "/categoria/carnes/pollo" },
        { name: "Cerdo", href: "/categoria/carnes/cerdo" },
        { name: "Pescados", href: "/categoria/carnes/pescados" },
        { name: "Embutidos", href: "/categoria/carnes/embutidos" },
      ],
    },
    {
      name: "Panadería",
      subcategories: [
        { name: "Panes", href: "/categoria/panaderia/panes" },
        { name: "Facturas", href: "/categoria/panaderia/facturas" },
        { name: "Masas", href: "/categoria/panaderia/masas" },
        { name: "Tortas", href: "/categoria/panaderia/tortas" },
        { name: "Ingredientes", href: "/categoria/panaderia/ingredientes" },
      ],
    },
    {
      name: "Equipamiento",
      subcategories: [
        { name: "Cocina", href: "/categoria/equipamiento/cocina" },
        { name: "Servicio", href: "/categoria/equipamiento/servicio" },
        { name: "Limpieza", href: "/categoria/equipamiento/limpieza" },
        { name: "Refrigeración", href: "/categoria/equipamiento/refrigeracion" },
        { name: "Utensilios", href: "/categoria/equipamiento/utensilios" },
      ],
    },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <div className="container mx-auto px-4">
        {/* Top bar - Más compacto */}
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/images/tpg-logo.webp"
              alt="TPG - Todo Para la Gastronomía"
              width={100}
              height={50}
              className="h-10 w-auto"
            />
          </div>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-6">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Buscar productos, marcas, categorías..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-12 py-2 text-base border-2 border-emerald-600 focus:border-emerald-700"
              />
              <Button size="sm" className="absolute right-1 top-1 bg-emerald-600 hover:bg-emerald-700 h-8 w-8 p-0">
                <Search size={16} />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="hidden md:flex text-sm">
              <User size={18} className="mr-1" />
              Mi Cuenta
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart size={18} />
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                3
              </span>
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu size={18} />
            </Button>
          </div>
        </div>

        {/* Navigation - Con dropdown de categorías */}
        <nav className={`${isMenuOpen ? "block" : "hidden"} md:block border-t md:border-t-0`}>
          <ul className="flex flex-col md:flex-row md:space-x-6 py-2 md:py-1">
            {/* Categorías con dropdown */}
            <li className="relative group">
              <button
                className="flex items-center py-1 px-3 md:px-0 text-gray-700 hover:text-emerald-600 font-medium transition-colors text-sm"
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
              >
                Categorías
                <ChevronDown size={14} className="ml-1" />
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-200 ${
                  isCategoriesOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
              >
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-0 p-4 w-[600px] lg:w-[800px]">
                  {categories.map((category) => (
                    <div key={category.name} className="p-3">
                      <h3 className="font-semibold text-emerald-600 text-sm mb-2 border-b border-gray-100 pb-1">
                        {category.name}
                      </h3>
                      <ul className="space-y-1">
                        {category.subcategories.map((subcategory) => (
                          <li key={subcategory.name}>
                            <a
                              href={subcategory.href}
                              className="block text-xs text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 px-2 py-1 rounded transition-colors"
                            >
                              {subcategory.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </li>

            {/* Otros items de navegación */}
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="block py-1 px-3 md:px-0 text-gray-700 hover:text-emerald-600 font-medium transition-colors text-sm"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile search - Más compacto */}
        <div className="md:hidden pb-2">
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10 border-2 border-emerald-600 h-9"
            />
            <Button size="sm" className="absolute right-1 top-1 bg-emerald-600 hover:bg-emerald-700 h-7 w-7 p-0">
              <Search size={14} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
