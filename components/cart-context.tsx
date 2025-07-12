"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface CartItem {
  id: string
  name: string
  sku: string
  image: string
  price: number
  bulkPrice?: number
  brand: string
  category: string
  quantity: number
  unitType: 'unit' | 'bulk' // To track if buying per unit or bulk
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: any, unitType: 'unit' | 'bulk') => void
  removeItem: (id: string, unitType: 'unit' | 'bulk') => void
  updateQuantity: (id: string, unitType: 'unit' | 'bulk', quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getCartSummary: () => string
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (product: any, unitType: 'unit' | 'bulk') => {
    const itemKey = `${product.id}_${unitType}`
    
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id && item.unitType === unitType)
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.unitType === unitType
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prevItems, {
          ...product,
          quantity: 1,
          unitType
        }]
      }
    })
  }

  const removeItem = (id: string, unitType: 'unit' | 'bulk') => {
    setItems(prevItems => prevItems.filter(item => !(item.id === id && item.unitType === unitType)))
  }

  const updateQuantity = (id: string, unitType: 'unit' | 'bulk', quantity: number) => {
    if (quantity <= 0) {
      removeItem(id, unitType)
      return
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.unitType === unitType
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = item.unitType === 'bulk' && item.bulkPrice ? item.bulkPrice : item.price
      return total + (price * item.quantity)
    }, 0)
  }

  const getCartSummary = () => {
    if (items.length === 0) return "El carrito está vacío"
    
    let summary = "🛒 PEDIDO - TPG DISTRIBUIDORA\n\n"
    
    items.forEach(item => {
      const price = item.unitType === 'bulk' && item.bulkPrice ? item.bulkPrice : item.price
      const unitText = item.unitType === 'bulk' ? 'bulto(s)' : 'unidad(es)'
      
      summary += `• ${item.name}\n`
      summary += `  ${item.brand} - ${item.sku}\n`
      summary += `  ${item.quantity} ${unitText} x $${price.toLocaleString("es-AR")}\n`
      summary += `  Subtotal: $${(price * item.quantity).toLocaleString("es-AR")}\n\n`
    })
    
    summary += `💰 TOTAL: $${getTotalPrice().toLocaleString("es-AR")}\n\n`
    summary += "¡Gracias por tu pedido!"
    
    return summary
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        getCartSummary,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
} 