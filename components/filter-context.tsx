"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface FilterContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCategoryId: string | null
  setSelectedCategoryId: (categoryId: string | null) => void
  selectedSubcategoryId: string | null
  setSelectedSubcategoryId: (subcategoryId: string | null) => void
  showOnlyNew: boolean
  setShowOnlyNew: (show: boolean) => void
  showOnlyOnSale: boolean
  setShowOnlyOnSale: (show: boolean) => void
  clearFilters: () => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(null)
  const [showOnlyNew, setShowOnlyNew] = useState(false)
  const [showOnlyOnSale, setShowOnlyOnSale] = useState(false)

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategoryId(null)
    setSelectedSubcategoryId(null)
    setShowOnlyNew(false)
    setShowOnlyOnSale(false)
  }

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedCategoryId,
        setSelectedCategoryId,
        selectedSubcategoryId,
        setSelectedSubcategoryId,
        showOnlyNew,
        setShowOnlyNew,
        showOnlyOnSale,
        setShowOnlyOnSale,
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