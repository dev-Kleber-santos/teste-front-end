/** Contrato do endpoint oficial; price não documenta moeda ou unidade. */
export interface Product {
  productName: string
  descriptionShort?: string | null
  photo: string
  price: number
}

export interface ProductsResponse {
  success: boolean
  products: Product[]
}
