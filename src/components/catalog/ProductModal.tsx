import { useEffect, useRef, type KeyboardEvent } from 'react'
import type { Product } from '../../types/product'
import { ProductImage, ProductPrice } from './ProductCard'
import './ProductModal.scss'

export function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const hasDescription = Boolean(product.descriptionShort?.trim())

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      trigger?.focus()
    }
  }, [])

  function containFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Tab') return

    const elements = event.currentTarget.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), [tabindex="0"]',
    )
    const first = elements[0]
    const last = elements[elements.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="product-modal"
      aria-labelledby="modal-product-name"
      aria-describedby={hasDescription ? 'modal-product-description' : undefined}
      onKeyDown={containFocus}
      onCancel={event => {
        event.preventDefault()
        onClose()
      }}
    >
      <button
        className="modal-close"
        type="button"
        aria-label="Fechar detalhes do produto"
        autoFocus
        onClick={onClose}
      >
        ×
      </button>
      <ProductImage key={product.photo} product={product} />
      <div className="modal-info">
        <h2 id="modal-product-name">{product.productName}</h2>
        <ProductPrice price={product.price} />
        {hasDescription ? <p id="modal-product-description">{product.descriptionShort}</p> : null}
      </div>
    </dialog>
  )
}
