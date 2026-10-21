import { useState } from 'react'
import type { Product } from '../../types/product'
import { formatProductPrice } from '../../services/products'

export function ProductImage({ product }: { product: Product }) {
  const [failed, setFailed] = useState(false)
  return failed ? <div className="product-image-slot" role="img" aria-label={`Imagem indisponível: ${product.productName}`}>Imagem indisponível</div> : <img src={product.photo} alt={product.productName} loading="lazy" onError={() => setFailed(true)} />
}

export function ProductPrice({ price }: { price: number }) {
  return <p className="product-price"><strong>{formatProductPrice(price)}</strong><small>Preço informado pela API · unidade não especificada</small></p>
}

export function ProductCard({ product, onSelect }: { product: Product; onSelect: (product: Product) => void }) {
  return <article className="product-card">
    <h3>
      <button
        className="product-open"
        type="button"
        aria-label={`Ver detalhes de ${product.productName}`}
        onClick={() => onSelect(product)}
      >
        <ProductImage key={product.photo} product={product} />
        <span>{product.productName}</span>
      </button>
    </h3>
    <ProductPrice price={product.price} />
    <button className="button button--blue" type="button" onClick={() => onSelect(product)} aria-label={`Ver produto: ${product.productName}`}>Ver produto</button>
  </article>
}
