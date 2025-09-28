'use client'

import React, { useState } from 'react'

interface SimpleSlideTransitionProps {
  children: React.ReactNode[]
  className?: string
  showIndicators?: boolean
}

export default function SimpleSlideTransition({
  children,
  className = "",
  showIndicators = false
}: SimpleSlideTransitionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const slides = React.Children.toArray(children)
  const scrollAccumulator = React.useRef(0)
  const scrollTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)


  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    if (!isScrolling) {
      setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)
    }
  }

  // Handle wheel scroll
  const handleWheel = React.useCallback((e: WheelEvent) => {
    if (slides.length <= 1) return

    e.preventDefault()

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    scrollAccumulator.current += e.deltaY
    setIsScrolling(true)

    const threshold = 100

    if (Math.abs(scrollAccumulator.current) >= threshold) {
      if (scrollAccumulator.current > 0) {
        // Scroll down - next slide
        if (currentSlide < slides.length - 1) {
          setCurrentSlide(prev => prev + 1)
        }
      } else {
        // Scroll up - previous slide
        if (currentSlide > 0) {
          setCurrentSlide(prev => prev - 1)
        }
      }

      scrollAccumulator.current = 0
    }

    // Reset scrolling state after delay
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false)
      scrollAccumulator.current = 0
    }, 200)
  }, [currentSlide, slides.length])

  // Add wheel event listener
  React.useEffect(() => {
    const container = document.querySelector('.slide-container')
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [handleWheel])

  const getTransitionClasses = (index: number) => {
    const isActive = index === currentSlide

    return `absolute inset-0 transition-transform duration-300 ease-out ${
      isActive ? 'translate-x-0' :
      index < currentSlide ? '-translate-x-full' : 'translate-x-full'
    }`
  }

  return (
    <div className={`slide-container relative w-full h-full overflow-hidden ${className}`}>
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={getTransitionClasses(index)}
        >
          {slide}
        </div>
      ))}

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125 shadow-lg'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Keyboard navigation hook
export const useSlideKeyboard = (
  nextSlide: () => void,
  prevSlide: () => void,
  goToSlide: (index: number) => void,
  slideCount: number
) => {
  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
        case ' ':
          event.preventDefault()
          nextSlide()
          break
        case 'ArrowLeft':
          event.preventDefault()
          prevSlide()
          break
        case 'Home':
          event.preventDefault()
          goToSlide(0)
          break
        case 'End':
          event.preventDefault()
          goToSlide(slideCount - 1)
          break
        default:
          // Number keys 1-9
          const num = parseInt(event.key)
          if (num >= 1 && num <= Math.min(9, slideCount)) {
            event.preventDefault()
            goToSlide(num - 1)
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [nextSlide, prevSlide, goToSlide, slideCount])
}