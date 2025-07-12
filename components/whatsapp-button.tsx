"use client"

import { MessageCircle } from "lucide-react"
import { useState } from "react"

interface WhatsAppButtonProps {
  message?: string
  className?: string
}

export function WhatsAppButton({
  message = "Hola, necesito información sobre productos para mi restaurant",
  className = "",
}: WhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const phoneNumber = "5491123456789" // Número argentino de ejemplo
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  const handleClick = () => {
    // Analytics tracking
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "whatsapp_click", {
        event_category: "engagement",
        event_label: "floating_button",
      })
    }

    window.open(whatsappUrl, "_blank")
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300 ${className}`}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={24} className={`transition-transform duration-300 ${isHovered ? "scale-110" : ""}`} />
      {isHovered && (
        <div className="absolute bottom-16 right-0 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap">
          Contactanos por WhatsApp
        </div>
      )}
    </button>
  )
}
