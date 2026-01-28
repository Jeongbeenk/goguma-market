import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { formatPrice, formatRelativeTime } from '@/lib/utils/format'
import ImageGallery from '@/components/products/ImageGallery'
import StatusBadge from '@/components/products/StatusBadge'
import ProductActions from '@/components/products/ProductActions'

export const revalidate = 60

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (!product) {
    return {
      title: '상품을 찾을 수 없습니다 - 고구마마켓',
    }
  }

  const thumbnail = product.images[0] || '/images/placeholder.svg'

  return {
    title: `${product.title} - 고구마마켓`,
    description: product.description || `${product.location}에서 판매중인 ${product.title}`,
    openGraph: {
      title: product.title,
      description: product.description || `${formatPrice(product.price)}`,
      images: [thumbnail],
      locale: 'ko_KR',
    },
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (!product) {
    notFound()
  }

  // Increment view count
  await supabase
    .from('products')
    .update({ view_count: product.view_count + 1 })
    .eq('id', id)

  return (
    <>
      <div className="max-w-3xl mx-auto bg-white min-h-screen">
        {/* Image Gallery */}
        <ImageGallery images={product.images} alt={product.title} />

        {/* Product Info Section */}
        <div className="p-4">
          {/* Seller placeholder */}
          <div className="flex items-center gap-3 py-4 border-b border-gray-200">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <div className="text-sm text-gray-500">판매자 정보 (준비중)</div>
          </div>

          {/* Title & Status */}
          <div className="py-4 border-b border-gray-200">
            <h1 className="text-xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center gap-2 mb-3">
              {product.category && (
                <span className="text-sm text-gray-500">{product.category}</span>
              )}
              {product.category && product.status !== 'active' && (
                <span className="text-gray-300">•</span>
              )}
              <StatusBadge status={product.status} />
            </div>
            <p className="text-lg font-bold">{formatPrice(product.price)}</p>
          </div>

          {/* Description */}
          <div className="py-4 border-b border-gray-200">
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {product.description || '상품 설명이 없습니다'}
            </p>
          </div>

          {/* Meta Info */}
          <div className="py-4 text-sm text-gray-500">
            <div className="flex items-center justify-between mb-1">
              <span>{product.location}</span>
              <span>{formatRelativeTime(product.created_at)}</span>
            </div>
            <div>조회 {product.view_count + 1}</div>
          </div>
        </div>

        {/* Bottom padding for fixed actions */}
        <div className="h-20" />
      </div>

      {/* Fixed Actions Bar */}
      <ProductActions productId={product.id} />
    </>
  )
}
