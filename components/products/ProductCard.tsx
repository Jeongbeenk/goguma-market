import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/types/database'
import { formatPrice, formatRelativeTime } from '@/lib/utils/format'
import { PLACEHOLDER_IMAGE } from '@/lib/utils/constants'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const thumbnailUrl = product.images[0] || PLACEHOLDER_IMAGE

  return (
    <Link
      href={`/products/${product.id}`}
      className="block bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={thumbnailUrl}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        {product.status !== 'active' && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {product.status === 'reserved' ? '예약중' : '판매완료'}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-medium text-base line-clamp-2 mb-1">
          {product.title}
        </h3>
        <p className="font-bold text-lg mb-2">
          {formatPrice(product.price)}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{product.location}</span>
          <span>{formatRelativeTime(product.created_at)}</span>
        </div>
      </div>
    </Link>
  )
}
