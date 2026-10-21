import { Header, Footer } from '../components/layout/Layout'
import { Hero, Categories, Partners, Brands } from '../components/marketing/Sections'
import { ProductShowcase } from '../components/catalog/ProductShowcase'
import { ProductModal } from '../components/catalog/ProductModal'
import { useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import type { Product } from '../types/product'

export function Home() {
  const { state, retry } = useProducts()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const showcaseProps = {
    products: state.status === 'success' ? state.products : [],
    loading: state.status === 'loading',
    error: state.status === 'error' ? state.message : undefined,
    onRetry: retry,
    onSelectProduct: setSelectedProduct,
  }
  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <Header />
    <main id="conteudo">
      <Hero /><Categories />
      <div className="home-sections">
        <ProductShowcase id="vitrine-1" showCategories {...showcaseProps} />
        <Partners /><ProductShowcase id="vitrine-2" {...showcaseProps} /><Partners provisional />
        <Brands /><ProductShowcase id="vitrine-3" {...showcaseProps} />
      </div>
    </main>
    <Footer />
    {selectedProduct ? <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} /> : null}
  </>
}
