import { ProductStatus } from '@/lib/types/database'

interface StatusBadgeProps {
  status: ProductStatus
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  if (status === 'active') return null

  return (
    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-white">
      {status === 'reserved' ? '예약중' : '판매완료'}
    </div>
  )
}
