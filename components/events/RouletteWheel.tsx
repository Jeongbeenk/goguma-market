'use client'

import { useState } from 'react'

interface Prize {
  id: number
  name: string
  color: string
  textColor: string
}

const prizes: Prize[] = [
  { id: 1, name: '10% 할인', color: 'bg-red-500', textColor: 'text-white' },
  { id: 2, name: '무료배송', color: 'bg-blue-500', textColor: 'text-white' },
  { id: 3, name: '5% 할인', color: 'bg-yellow-400', textColor: 'text-gray-900' },
  { id: 4, name: '1000P 적립', color: 'bg-green-500', textColor: 'text-white' },
  { id: 5, name: '20% 할인', color: 'bg-purple-500', textColor: 'text-white' },
  { id: 6, name: '다음 기회에', color: 'bg-gray-400', textColor: 'text-white' },
  { id: 7, name: '15% 할인', color: 'bg-pink-500', textColor: 'text-white' },
  { id: 8, name: '500P 적립', color: 'bg-indigo-500', textColor: 'text-white' },
]

export default function RouletteWheel() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState<Prize | null>(null)
  const [hasSpun, setHasSpun] = useState(false)

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setResult(null)

    // 랜덤 회전 각도 (최소 5바퀴 + 랜덤)
    const randomPrize = Math.floor(Math.random() * prizes.length)
    const prizeAngle = 360 / prizes.length
    const baseRotation = 360 * 5 // 5바퀴
    const targetRotation = baseRotation + (360 - randomPrize * prizeAngle) + prizeAngle / 2

    setRotation(rotation + targetRotation)

    setTimeout(() => {
      setIsSpinning(false)
      setResult(prizes[randomPrize])
      setHasSpun(true)
    }, 4000)
  }

  const resetWheel = () => {
    setHasSpun(false)
    setResult(null)
    setRotation(0)
  }

  return (
    <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-8 shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">오늘의 럭키 룰렛</h2>
        <p className="text-gray-600">룰렛을 돌려서 특별한 혜택을 받으세요!</p>
      </div>

      <div className="flex flex-col items-center gap-6">
        {/* 룰렛 컨테이너 */}
        <div className="relative">
          {/* 화살표 표시 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
            <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-red-600 drop-shadow-lg"></div>
          </div>

          {/* 룰렛 휠 */}
          <div className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl border-8 border-white">
            <div
              className="w-full h-full relative transition-transform duration-[4000ms] ease-out"
              style={{
                transform: `rotate(${rotation}deg)`,
                transitionTimingFunction: 'cubic-bezier(0.17, 0.67, 0.12, 0.99)',
              }}
            >
              {prizes.map((prize, index) => {
                const angle = (360 / prizes.length) * index
                return (
                  <div
                    key={prize.id}
                    className={`absolute w-full h-full ${prize.color} flex items-start justify-center pt-8`}
                    style={{
                      clipPath: `polygon(50% 50%, 50% 0%, ${
                        50 + 50 * Math.sin((Math.PI * 2) / prizes.length)
                      }% ${50 - 50 * Math.cos((Math.PI * 2) / prizes.length)}%)`,
                      transform: `rotate(${angle}deg)`,
                      transformOrigin: 'center center',
                    }}
                  >
                    <span
                      className={`${prize.textColor} font-bold text-sm whitespace-nowrap`}
                      style={{
                        transform: `rotate(${360 / prizes.length / 2}deg)`,
                      }}
                    >
                      {prize.name}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* 중앙 원 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg border-4 border-orange-500 flex items-center justify-center z-20">
              <span className="text-2xl">🎁</span>
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className={`px-8 py-4 rounded-full font-bold text-xl shadow-lg transition-all ${
            isSpinning
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 hover:scale-105'
          } text-white`}
        >
          {isSpinning ? '돌리는 중...' : hasSpun ? '다시 돌리기' : '룰렛 돌리기'}
        </button>

        {/* 결과 표시 */}
        {result && (
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-300 animate-bounce">
            <div className="text-center">
              <p className="text-gray-600 mb-2">축하합니다!</p>
              <p className="text-3xl font-bold text-orange-600">{result.name}</p>
              <p className="text-sm text-gray-500 mt-2">혜택이 적용되었습니다</p>
            </div>
          </div>
        )}
      </div>

      {hasSpun && (
        <div className="text-center mt-6">
          <button
            onClick={resetWheel}
            className="text-gray-600 hover:text-gray-800 underline text-sm"
          >
            초기화
          </button>
        </div>
      )}
    </div>
  )
}
