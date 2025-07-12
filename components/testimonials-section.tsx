"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Restaurant El Parador",
    type: "Restaurante",
    rating: 5,
    comment:
      "TPG nos ha permitido optimizar nuestros costos sin comprometer la calidad. Su servicio de entrega es impecable.",
    logo: "/placeholder.svg?height=60&width=120",
  },
  {
    name: "Hotel Plaza Mayor",
    type: "Hotel 4 estrellas",
    rating: 5,
    comment:
      "La variedad de productos y el asesoramiento profesional han sido clave para mejorar nuestro servicio de catering.",
    logo: "/placeholder.svg?height=60&width=120",
  },
  {
    name: "Bar & Grill Sunset",
    type: "Bar Restaurante",
    rating: 5,
    comment:
      "Excelente relación precio-calidad. El equipo de TPG siempre está disponible para resolver nuestras consultas.",
    logo: "/placeholder.svg?height=60&width=120",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Más de 500 establecimientos confían en nosotros</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="text-emerald-600 mr-2" size={24} />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={16} />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 mb-6 italic">"{testimonial.comment}"</p>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.type}</p>
                  </div>
                  <img
                    src={testimonial.logo || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="h-8 w-16 object-contain opacity-60"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
