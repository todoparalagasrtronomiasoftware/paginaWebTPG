import { Header } from "@/components/header"
import { ProductCatalogNew } from "@/components/product-catalog-new"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { FilterProvider } from "@/components/filter-context"
import { CartProvider } from "@/components/cart-context"

export default function CatalogoPage() {
  return (
    <div className="min-h-screen bg-white">
      <CartProvider>
        <FilterProvider>
          <Header />
          <ProductCatalogNew />
        </FilterProvider>
      </CartProvider>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
