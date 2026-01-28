import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="text-center bg-white rounded-lg p-12 border border-gray-200">
        <div className="mb-6">
          <svg
            className="mx-auto w-16 h-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-3 text-gray-900">
          상품을 찾을 수 없습니다
        </h2>
        <p className="text-gray-500 mb-8">
          삭제되었거나 존재하지 않는 상품입니다
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-karrot-500 text-white font-medium rounded-md hover:bg-karrot-600 transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
