'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { Product } from '@/lib/types/database'
import ProductCard from './ProductCard'

interface ProductGridProps {
  initialProducts: Product[]
  hasMore: boolean
}

export default function ProductGrid({
  initialProducts,
  hasMore: initialHasMore
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [isLoading, setIsLoading] = useState(false)

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  })

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMore()
    }
  }, [inView, hasMore, isLoading])

  const loadMore = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/products?page=${page + 1}`)
      const data = await response.json()

      setProducts(prev => [...prev, ...data.products])
      setPage(prev => prev + 1)
      setHasMore(data.hasMore)
    } catch (error) {
      console.error('Failed to load more products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && (
        <div ref={ref} className="mt-8 text-center text-gray-500">
          {isLoading && '로딩 중...'}
        </div>
      )}
    </>
  )
}
