import { Header } from "@/components/header"
import { ProductCatalogNew } from "@/components/product-catalog-new"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ProductCatalogNew />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
