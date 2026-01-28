import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

export function formatPrice(price: number): string {
  return price.toLocaleString('ko-KR') + '원'
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: ko
  })
}

export function getImageUrl(path: string, supabaseUrl: string): string {
  return `${supabaseUrl}/storage/v1/object/public/product-images/${path}`
}
