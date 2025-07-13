"use client"

import { useCart } from "@/components/cart-context"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, Copy, Trash2, CheckCircle } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface CartModalProps {
  children: React.ReactNode
}

export function CartModal({ children }: CartModalProps) {
  const { items, updateQuantity, removeItem, clearCart, getTotalItems, getTotalPrice, getCartSummary } = useCart()
  const [copied, setCopied] = useState(false)

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getCartSummary())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col [&>button.absolute]:hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center justify-between gap-3 text-xl font-bold w-full">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-emerald-600" />
            </div>
            <span className="flex-1 text-center">Carrito de Compras</span>
            <DialogClose asChild>
              <button
                className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                aria-label="Cerrar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </DialogClose>
            
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 min-h-0 flex flex-col">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-gray-500 flex-1">
              <div className="p-6 bg-gray-100 rounded-full mb-6">
                <ShoppingCart className="h-16 w-16 text-gray-400" />
              </div>
              <p className="text-xl font-semibold text-gray-700 mb-2">Tu carrito está vacío</p>
              <p className="text-sm text-gray-500">Agrega algunos productos para empezar</p>
            </div>
          ) : (
            <>
              <ScrollArea className="h-[400px] max-h-[400px]">
                <div className="space-y-4 pr-4">
                  {items.map((item) => (
                    <div key={`${item.id}_${item.unitType}`} className="bg-white border-2 border-gray-100 rounded-xl px-4 py-3 hover:border-emerald-200 transition-colors shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        {/* Left: Image + Info */}
                        <div className="flex items-center gap-3 min-w-0 flex-1 mb-2 sm:mb-0">
                          <div className="w-16 h-16 bg-white rounded-lg border flex items-center justify-center overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-sm text-gray-900 leading-tight mb-0.5 line-clamp-2">{item.name}</h4>
                            <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                              <span className="font-medium truncate">{item.brand}</span>
                              <span className="text-gray-400">•</span>
                              <span className="font-mono text-[11px] bg-gray-100 px-1.5 py-0.5 rounded truncate">{item.sku}</span>
                            </div>
                          </div>
                        </div>
                        {/* Right: Controls */}
                        <div className="flex flex-col items-end gap-1 min-w-0 w-full sm:w-auto">
                          <div className="flex items-center gap-2 mb-1 w-full sm:w-auto justify-end">
                            <Badge 
                              variant="outline" 
                              className={`text-xs px-2 py-0.5 ${item.unitType === 'bulk' ? 'border-orange-200 text-orange-700 bg-orange-50' : 'border-emerald-200 text-emerald-700 bg-emerald-50'}`}
                            >
                              {item.unitType === 'bulk' ? 'Por bulto' : 'Por unidad'}
                            </Badge>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full border hover:bg-red-50 hover:border-red-200"
                              onClick={() => updateQuantity(item.id, item.unitType, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-bold text-base text-gray-900 w-7 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full border hover:bg-emerald-50 hover:border-emerald-200"
                              onClick={() => updateQuantity(item.id, item.unitType, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2 mt-1 w-full sm:w-auto justify-end">
                            <span className="text-xs text-gray-500">Subtotal</span>
                            <span className="font-bold text-emerald-600 text-base ml-1">
                              ${((item.unitType === 'bulk' && item.bulkPrice ? item.bulkPrice : item.price) * item.quantity).toLocaleString("es-AR")}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 ml-2"
                              onClick={() => removeItem(item.id, item.unitType)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <Separator className="my-4" />
              <div className="space-y-3 bg-white z-10">
                <div className="bg-gray-50 rounded-lg px-4 py-2 flex items-center justify-between text-base">
                  <span className="font-semibold text-gray-800">Total:</span>
                  <span className="font-bold text-emerald-600 text-lg">${getTotalPrice().toLocaleString("es-AR")}</span>
                  <span className="text-xs text-gray-500 ml-2">({getTotalItems()} {getTotalItems() === 1 ? 'artículo' : 'artículos'})</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleCopyToClipboard}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 text-sm rounded-lg shadow"
                    disabled={copied}
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        ¡Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        Copiar Pedido
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-semibold py-2 px-4 rounded-lg text-sm"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Vaciar
                  </Button>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 bg-blue-50 border border-blue-100 rounded p-2">
                    💬 <strong>Siguiente paso:</strong> Copia tu pedido y envíalo por WhatsApp
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 