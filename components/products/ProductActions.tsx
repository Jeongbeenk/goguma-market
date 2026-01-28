'use client'

interface ProductActionsProps {
  productId: string
}

export default function ProductActions({ productId }: ProductActionsProps) {
  const handleInterest = () => {
    alert('로그인이 필요합니다')
  }

  const handleChat = () => {
    alert('로그인이 필요합니다')
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex gap-3 z-40">
      <button
        onClick={handleInterest}
        className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        aria-label="관심 상품 등록"
      >
        {/* Heart icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-gray-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>
      <button
        onClick={handleChat}
        className="flex-1 h-12 bg-karrot-500 text-white font-medium rounded-md hover:bg-karrot-600 transition-colors"
      >
        채팅하기
      </button>
    </div>
  )
}
