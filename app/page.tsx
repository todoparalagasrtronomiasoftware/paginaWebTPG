import { Header } from "@/components/header"
import { ProductCatalogNew } from "@/components/product-catalog-new"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { FilterProvider } from "@/components/filter-context"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <FilterProvider>
        <Header />
        <ProductCatalogNew />
      </FilterProvider>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
