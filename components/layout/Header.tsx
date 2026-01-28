import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-karrot-500">
          고구마마켓
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/search"
            className="text-gray-700 hover:text-gray-900 text-sm"
          >
            검색
          </Link>
          <Link
            href="/my"
            className="text-gray-700 hover:text-gray-900 text-sm"
          >
            나의 고구마
          </Link>
        </nav>
      </div>
    </header>
  )
}
