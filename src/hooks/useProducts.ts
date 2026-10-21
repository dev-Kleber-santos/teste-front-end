import { useEffect, useState } from 'react'
import { fetchProducts } from '../services/products'
import type { Product } from '../types/product'

type ProductsState = { status: 'loading' } | { status: 'error'; message: string } | { status: 'success'; products: Product[] }

export function useProducts() {
  const [state, setState] = useState<ProductsState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    let active = true
    fetchProducts(controller.signal).then(products => {
      if (active) setState({ status: 'success', products })
    }).catch((error: unknown) => {
      if (active && !controller.signal.aborted) setState({ status: 'error', message: error instanceof Error ? error.message : 'Não foi possível carregar os produtos.' })
    })
    return () => { active = false; controller.abort() }
  }, [attempt])
  function retry() { setState({ status: 'loading' }); setAttempt(value => value + 1) }
  return { state, retry }
}
