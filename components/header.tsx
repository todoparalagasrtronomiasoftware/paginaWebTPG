"use client"

import { useState } from "react"
import { Search, Menu, ShoppingCart, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useFilter } from "@/components/filter-context"
import { useCategories, useAllSubcategories } from "@/hooks/useProducts"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const { searchQuery, setSearchQuery, setSelectedCategoryId, setSelectedSubcategoryId, clearFilters } = useFilter()
  
  // Fetch categories and all subcategories from database
  const { categories, loading: categoriesLoading } = useCategories()
  const { subcategoriesByCategory, loading: subcategoriesLoading } = useAllSubcategories()

  const navItems = [
    { name: "Nosotros", href: "/nosotros" },
    { name: "Catálogo", href: "/catalogo" },
    { name: "Contacto", href: "#contacto" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // La búsqueda se maneja automáticamente por el contexto
  }

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId)
    setSelectedSubcategoryId(null)
    setIsCategoriesOpen(false)
  }

  const handleSubcategoryClick = (categoryId: string, subcategoryId: string) => {
    setSelectedCategoryId(categoryId)
    setSelectedSubcategoryId(subcategoryId)
    setIsCategoriesOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <div className="container mx-auto px-4">
        {/* Main Header - Rediseñado */}
        <div className="flex items-center justify-between py-4">
          {/* Logo - Más grande */}
          <div className="flex items-center">
            <a href="/" className="flex items-center cursor-pointer">
              <Image
                src="/images/tpg-logo.png"
                alt="TPG - Todo Para la Gastronomía"
                width={160}
                height={80}
                className="h-16 w-auto hover:opacity-80 transition-opacity"
              />
            </a>
          </div>

          {/* Search bar - Desktop - Centrado */}
          <div className="hidden lg:flex flex-1 max-w-3xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                type="text"
                placeholder="Buscar productos, marcas, categorías..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-12 py-3 text-base border-2 border-emerald-600 focus:border-emerald-700 h-12"
              />
              <Button type="submit" size="sm" className="absolute right-2 top-2 bg-emerald-600 hover:bg-emerald-700 h-8 w-8 p-0">
                <Search size={16} />
              </Button>
            </form>
          </div>

          {/* Actions - Mejorado */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="hidden lg:flex text-sm px-3 py-2">
              <User size={20} className="mr-2" />
              Mi Cuenta
            </Button>
            <Button variant="ghost" size="sm" className="relative px-3 py-2">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center text-[10px]">
                3
              </span>
            </Button>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu size={20} />
            </Button>
          </div>
        </div>

        {/* Navigation Bar - Alineado */}
        <div className="border-t border-gray-200">
          <nav className={`${isMenuOpen ? "block" : "hidden"} lg:block`}>
            <ul className="flex flex-col lg:flex-row lg:items-center lg:space-x-8 py-2">
              {/* Categorías con dropdown */}
              <li className="relative group">
                <button
                  className="flex items-center py-3 px-4 lg:px-0 lg:py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors text-sm"
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
                    {!categoriesLoading && categories.map((category) => (
                      <div key={category.id} className="p-3">
                        <h3 
                          className="font-semibold text-emerald-600 text-sm mb-2 border-b border-gray-100 pb-1 cursor-pointer hover:text-emerald-700"
                          onClick={() => handleCategoryClick(category.id)}
                        >
                          {category.name}
                        </h3>
                        <ul className="space-y-1">
                          {!subcategoriesLoading && subcategoriesByCategory[category.id]?.map((subcategory) => (
                            <li key={subcategory.id}>
                              <button
                                onClick={() => handleSubcategoryClick(category.id, subcategory.id)}
                                className="block text-xs text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 px-2 py-1 rounded transition-colors w-full text-left"
                              >
                                {subcategory.name}
                              </button>
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
                    className="block py-3 px-4 lg:px-0 lg:py-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile search - Mejorado */}
        <div className="lg:hidden pb-3 border-t border-gray-100">
          <form onSubmit={handleSearch} className="relative mt-3">
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-12 border-2 border-emerald-600 h-10"
            />
            <Button type="submit" size="sm" className="absolute right-2 top-1 bg-emerald-600 hover:bg-emerald-700 h-8 w-8 p-0">
              <Search size={16} />
            </Button>
          </form>
        </div>
      </div>
    </header>
  )
}
