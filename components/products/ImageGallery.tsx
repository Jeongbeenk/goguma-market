'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PLACEHOLDER_IMAGE } from '@/lib/utils/constants'

interface ImageGalleryProps {
  images: string[]
  alt: string
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const imageUrls = images.length > 0 ? images : [PLACEHOLDER_IMAGE]
  const totalImages = imageUrls.length

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalImages)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative aspect-square bg-gray-100">
      {/* Main Image */}
      <Image
        src={imageUrls[currentIndex]}
        alt={`${alt} ${currentIndex + 1}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 768px"
        priority={currentIndex === 0}
      />

      {/* Navigation Buttons - Only show if multiple images */}
      {totalImages > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-opacity flex items-center justify-center text-2xl"
            aria-label="이전 이미지"
          >
            ‹
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-opacity flex items-center justify-center text-2xl"
            aria-label="다음 이미지"
          >
            ›
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {imageUrls.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-4'
                    : 'bg-white bg-opacity-50 w-2'
                }`}
                aria-label={`이미지 ${index + 1}로 이동`}
              />
            ))}
          </div>

          {/* Image Counter */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-black bg-opacity-50 text-white text-sm rounded-full">
            {currentIndex + 1} / {totalImages}
          </div>
        </>
      )}
    </div>
  )
}
