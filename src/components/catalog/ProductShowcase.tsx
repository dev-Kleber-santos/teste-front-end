import type { Product } from '../../types/product'
import { ProductCard } from './ProductCard'
import './ProductShowcase.scss'

interface Props {
  id: string
  showCategories?: boolean
  products?: readonly Product[]
  onSelectProduct: (product: Product) => void
  loading?: boolean
  error?: string
  onRetry: () => void
}
const categories = ['Celular', 'Acessórios', 'Tablets', 'Notebooks', 'TVs', 'Ver todos']

export function ProductShowcase({ id, showCategories = false, products = [], onSelectProduct, loading = false, error, onRetry }: Props) {
  return <section className="showcase container" aria-labelledby={`${id}-title`}>
    <h2 className="section-heading" id={`${id}-title`}>Produtos relacionados</h2>
    {showCategories ? <ul className="product-categories" aria-label="Categorias da vitrine">{categories.map(name => <li key={name}><span aria-disabled="true">{name}</span></li>)}</ul> : <p className="view-all" aria-disabled="true">Ver todos</p>}
    {loading ? <p className="catalog-state" role="status">Carregando produtos…</p> : error ? <div className="catalog-state" role="alert"><p>{error}</p><button className="button" type="button" onClick={onRetry}>Tentar novamente</button></div> : products.length ? <ul className="product-track" aria-label="Produtos; deslize para ver mais" tabIndex={0}>{products.map((product, index) => <li key={`${product.productName}-${index}`}><ProductCard product={product} onSelect={onSelectProduct} /></li>)}</ul> : <p className="catalog-state" role="status">Nenhum produto disponível.</p>}
  </section>
}
