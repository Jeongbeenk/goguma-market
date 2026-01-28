export type ProductStatus = 'active' | 'reserved' | 'sold'

export interface Product {
  id: string
  title: string
  description: string | null
  price: number
  location: string
  images: string[]
  category: string | null
  status: ProductStatus
  user_id: string | null
  view_count: number
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      products: {
        Row: Product
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at' | 'view_count'>
        Update: Partial<Product>
      }
    }
  }
}
