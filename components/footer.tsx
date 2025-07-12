"use client"

import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Footer() {
  const whatsappNumber = "5491123456789"
  const whatsappMessage = encodeURIComponent("Hola, necesito información sobre productos para mi restaurant")
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <Image
              src="/images/tpg-logo.png"
              alt="TPG - Todo Para la Gastronomía"
              width={150}
              height={75}
              className="h-16 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-300 mb-6 max-w-md">
              Distribuidor mayorista líder en Argentina. Más de 20 años abasteciendo a restaurantes, bares y hoteles con
              productos de la más alta calidad.
            </p>
            <Button
              className="bg-[#25D366] hover:bg-[#20BA5A] text-white"
              onClick={() => window.open(whatsappUrl, "_blank")}
            >
              <MessageCircle className="mr-2" size={16} />
              Contactar por WhatsApp
            </Button>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="mr-3 mt-1 text-emerald-400" size={16} />
                <div>
                  <p className="text-gray-300">Av. Corrientes 1234</p>
                  <p className="text-gray-300">CABA, Argentina</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 text-emerald-400" size={16} />
                <p className="text-gray-300">+54 11 2345-6789</p>
              </div>
              <div className="flex items-center">
                <Mail className="mr-3 text-emerald-400" size={16} />
                <p className="text-gray-300">ventas@tpg.com.ar</p>
              </div>
              <div className="flex items-start">
                <Clock className="mr-3 mt-1 text-emerald-400" size={16} />
                <div>
                  <p className="text-gray-300">Lun - Vie: 8:00 - 18:00</p>
                  <p className="text-gray-300">Sáb: 8:00 - 13:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="/catalogo" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Catálogo
                </a>
              </li>
              <li>
                <a href="/marcas" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Marcas
                </a>
              </li>
              <li>
                <a href="/promociones" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Promociones
                </a>
              </li>
              <li>
                <a href="/nosotros" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="/terminos" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="/privacidad" className="text-gray-300 hover:text-emerald-400 transition-colors">
                  Política de Privacidad
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 TPG - Todo Para la Gastronomía. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
