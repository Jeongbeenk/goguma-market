import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { ITEMS_PER_PAGE } from '@/lib/utils/constants'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')

  const supabase = await createClient()

  const start = (page - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE - 1

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .range(start, end)

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({
    products: products || [],
    hasMore: (products?.length || 0) === ITEMS_PER_PAGE,
    page,
  })
}
