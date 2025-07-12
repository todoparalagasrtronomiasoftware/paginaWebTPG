"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface FilterContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  selectedSubcategory: string
  setSelectedSubcategory: (subcategory: string) => void
  selectedBrand: string
  setSelectedBrand: (brand: string) => void
  showOnlyNew: boolean
  setShowOnlyNew: (show: boolean) => void
  clearFilters: () => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [selectedSubcategory, setSelectedSubcategory] = useState("Todas")
  const [selectedBrand, setSelectedBrand] = useState("Todas")
  const [showOnlyNew, setShowOnlyNew] = useState(false)

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("Todas")
    setSelectedSubcategory("Todas")
    setSelectedBrand("Todas")
    setShowOnlyNew(false)
  }

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedSubcategory,
        setSelectedSubcategory,
        selectedBrand,
        setSelectedBrand,
        showOnlyNew,
        setShowOnlyNew,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export function useFilter() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider")
  }
  return context
}
