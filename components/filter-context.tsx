"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface FilterContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCategoryName: string | null
  setSelectedCategoryName: (categoryName: string | null) => void
  selectedSubcategoryName: string | null
  setSelectedSubcategoryName: (subcategoryName: string | null) => void
  showOnlyNew: boolean
  setShowOnlyNew: (show: boolean) => void
  showOnlyOnSale: boolean
  setShowOnlyOnSale: (show: boolean) => void
  clearFilters: () => void
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null)
  const [selectedSubcategoryName, setSelectedSubcategoryName] = useState<string | null>(null)
  const [showOnlyNew, setShowOnlyNew] = useState(false)
  const [showOnlyOnSale, setShowOnlyOnSale] = useState(false)

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategoryName(null)
    setSelectedSubcategoryName(null)
    setShowOnlyNew(false)
    setShowOnlyOnSale(false)
  }

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedCategoryName,
        setSelectedCategoryName,
        selectedSubcategoryName,
        setSelectedSubcategoryName,
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