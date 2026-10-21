import type { Product, ProductsResponse } from '../types/product'

const PRODUCTS_URL = '/api/products'

function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== 'object') return false
  const product = value as Record<string, unknown>
  return typeof product.productName === 'string' && product.productName.trim().length > 0
    && (product.descriptionShort == null || typeof product.descriptionShort === 'string')
    && isHttpsUrl(product.photo)
    && typeof product.price === 'number' && Number.isFinite(product.price) && product.price >= 0
}

function isHttpsUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

function parseProducts(value: unknown): ProductsResponse {
  if (!value || typeof value !== 'object') throw new Error('Resposta de produtos inválida.')
  const response = value as Record<string, unknown>
  if (response.success !== true || !Array.isArray(response.products) || !response.products.every(isProduct)) {
    throw new Error('O serviço retornou dados de produtos inválidos.')
  }
  return { success: true, products: response.products }
}

export async function fetchProducts(signal: AbortSignal): Promise<Product[]> {
  const response = await fetch(PRODUCTS_URL, { signal })
  if (!response.ok) throw new Error(`Não foi possível carregar os produtos (HTTP ${response.status}).`)
  return parseProducts(await response.json()).products
}

// A API não documenta moeda ou escala; preservar o número sem supor centavos/reais.
export function formatProductPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR').format(price)
}
