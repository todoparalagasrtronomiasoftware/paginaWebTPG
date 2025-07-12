"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Truck, Users, Clock } from "lucide-react"

const benefits = [
  {
    icon: DollarSign,
    title: "Precios Mayoristas",
    description: "Los mejores precios del mercado con descuentos por volumen",
    color: "text-green-600",
  },
  {
    icon: Truck,
    title: "Entrega Rápida",
    description: "Entrega en 24-48hs en CABA y GBA. Logística confiable",
    color: "text-blue-600",
  },
  {
    icon: Users,
    title: "Asesoramiento Profesional",
    description: "Equipo especializado para ayudarte a elegir los mejores productos",
    color: "text-purple-600",
  },
  {
    icon: Clock,
    title: "Atención 24/7",
    description: "Soporte continuo para resolver todas tus consultas",
    color: "text-orange-600",
  },
]

export function BenefitsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">¿Por qué elegir TPG?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Somos tu socio estratégico en el crecimiento de tu negocio gastronómico
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => {
            const IconComponent = benefit.icon
            return (
              <Card key={benefit.title} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center ${benefit.color}`}
                  >
                    <IconComponent size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
