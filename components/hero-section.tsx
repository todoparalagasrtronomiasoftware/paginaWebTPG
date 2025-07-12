"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Truck, Award, Users } from "lucide-react"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Tu socio en distribución gastronómica</h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-100">
              Más de 5000 productos para restaurantes, bares y hoteles. Precios mayoristas, entrega rápida y
              asesoramiento profesional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg">
                Ver Catálogo
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emerald-700 px-8 py-4 text-lg bg-transparent"
              >
                Solicitar Asesoramiento
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-emerald-500">
              <div className="text-center">
                <div className="text-2xl font-bold">5000+</div>
                <div className="text-emerald-200 text-sm">Productos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-emerald-200 text-sm">Clientes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24h</div>
                <div className="text-emerald-200 text-sm">Entrega</div>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-lg p-4 flex items-center justify-center">
                    <Truck size={40} />
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 flex items-center justify-center">
                    <Award size={40} />
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 flex items-center justify-center">
                    <Users size={40} />
                  </div>
                  <div className="bg-orange-600 rounded-lg p-4 flex items-center justify-center">
                    <span className="text-2xl font-bold">TPG</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
