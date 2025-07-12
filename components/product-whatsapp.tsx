"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductWhatsAppProps {
  productName: string
  sku: string
  price: number
  variant?: "button" | "icon"
}

export function ProductWhatsApp({ productName, sku, price, variant = "button" }: ProductWhatsAppProps) {
  const phoneNumber = "5491123456789"
  const message = `Hola, me interesa ${productName} - SKU: ${sku} - Precio visto: $${price.toLocaleString("es-AR")}`
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  const handleClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "whatsapp_product_inquiry", {
        event_category: "engagement",
        event_label: sku,
        value: price,
      })
    }

    window.open(whatsappUrl, "_blank")
  }

  if (variant === "icon") {
    return (
      <Button
        onClick={handleClick}
        size="sm"
        variant="outline"
        className="border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white bg-transparent"
      >
        <MessageCircle size={16} />
      </Button>
    )
  }

  return (
    <Button onClick={handleClick} className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white">
      <MessageCircle size={16} className="mr-2" />
      Consultar por WhatsApp
    </Button>
  )
}
