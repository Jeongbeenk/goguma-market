import { createClient } from '@/lib/supabase/server'
import ProductGrid from '@/components/products/ProductGrid'
import { ITEMS_PER_PAGE } from '@/lib/utils/constants'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Home() {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .range(0, ITEMS_PER_PAGE - 1)

  if (error) {
    console.error('Error fetching products:', error)
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <p className="text-red-500">상품을 불러올 수 없습니다</p>
      </div>
    )
  }

  const hasMore = (products?.length || 0) === ITEMS_PER_PAGE

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">중고거래</h1>
      <ProductGrid
        initialProducts={products || []}
        hasMore={hasMore}
      />
    </div>
  )
}
