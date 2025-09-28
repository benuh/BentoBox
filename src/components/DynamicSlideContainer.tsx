'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'

export type TransitionEffect = 'shuffle' | 'fade' | 'slide' | 'scale' | 'none'

export interface SlideContainerConfig {
  effect: TransitionEffect
  scrollSensitivity?: number
  transitionDuration?: number
  enableScroll?: boolean
  autoPlay?: boolean
  autoPlayDuration?: number
  showIndicators?: boolean
  backgroundColor?: string
  cardStyle?: {
    maxWidth?: string
    maxHeight?: string
    borderRadius?: string
    shadow?: string
    border?: string
    padding?: string
  }
}

interface DynamicSlideContainerProps {
  slides: React.ComponentType[]
  config?: Partial<SlideContainerConfig>
  className?: string
}

const defaultConfig: SlideContainerConfig = {
  effect: 'shuffle',
  scrollSensitivity: 100,
  transitionDuration: 0.3,
  enableScroll: true,
  autoPlay: false,
  autoPlayDuration: 3000,
  showIndicators: false,
  backgroundColor: '#fafafa',
  cardStyle: {
    maxWidth: '4xl',
    maxHeight: '600px',
    borderRadius: 'lg',
    shadow: 'xl',
    border: '1px solid #e5e5e5',
    padding: '16'
  }
}

export default function DynamicSlideContainer({
  slides,
  config = {},
  className = ""
}: DynamicSlideContainerProps) {
  const finalConfig = { ...defaultConfig, ...config }

  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const scrollAccumulator = useRef(0)
  const scrollDirection = useRef(0)
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-play functionality
  useEffect(() => {
    if (finalConfig.autoPlay && slides.length > 1) {
      autoPlayIntervalRef.current = setInterval(() => {
        if (!isScrolling && !isTransitioning) {
          setCurrentSlide(prev => (prev + 1) % slides.length)
        }
      }, finalConfig.autoPlayDuration)
    }

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current)
      }
    }
  }, [finalConfig.autoPlay, finalConfig.autoPlayDuration, slides.length, isScrolling, isTransitioning])

  const handleScroll = useCallback((e: WheelEvent) => {
    if (!finalConfig.enableScroll || slides.length <= 1) return

    e.preventDefault()

    // Clear any existing reset timeout
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current)
      resetTimeoutRef.current = null
    }

    // Update scroll state
    scrollAccumulator.current += e.deltaY
    scrollDirection.current = e.deltaY > 0 ? 1 : -1

    const rawProgress = Math.abs(scrollAccumulator.current) / finalConfig.scrollSensitivity!
    const progress = Math.min(Math.max(rawProgress, 0), 1)

    setScrollProgress(progress)
    setIsScrolling(true)

    // Complete transition when scroll reaches threshold
    if (progress >= 1.0) {
      if (scrollDirection.current > 0) {
        if (currentSlide < slides.length - 1) {
          setCurrentSlide(prev => prev + 1)
        }
      } else {
        if (currentSlide > 0) {
          setCurrentSlide(prev => prev - 1)
        }
      }

      // Reset state
      scrollAccumulator.current = 0
      setScrollProgress(0)
      setIsScrolling(false)
    } else {
      // Set timeout for incomplete scrolls
      resetTimeoutRef.current = setTimeout(() => {
        scrollAccumulator.current = 0
        setScrollProgress(0)
        setIsScrolling(false)
        resetTimeoutRef.current = null
      }, 150)
    }
  }, [currentSlide, slides.length, finalConfig.enableScroll, finalConfig.scrollSensitivity])

  useEffect(() => {
    const container = containerRef.current
    if (container && finalConfig.enableScroll) {
      container.addEventListener('wheel', handleScroll, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleScroll)
      }
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
      }
    }
  }, [handleScroll, finalConfig.enableScroll])

  const getSlideTransform = (slideIndex: number) => {
    const relativeIndex = slideIndex - currentSlide

    switch (finalConfig.effect) {
      case 'shuffle':
        return getShuffleTransform(relativeIndex)
      case 'fade':
        return getFadeTransform(relativeIndex)
      case 'slide':
        return getSlideTransform_Effect(relativeIndex)
      case 'scale':
        return getScaleTransform(relativeIndex)
      case 'none':
        return getNoneTransform(relativeIndex)
      default:
        return getShuffleTransform(relativeIndex)
    }
  }

  const getShuffleTransform = (relativeIndex: number) => {
    if (!isScrolling) {
      if (relativeIndex === 0) {
        return { y: 0, scale: 1.0, opacity: 1.0, zIndex: 5, visible: true }
      } else if (relativeIndex === -1) {
        return { y: -2.9041, scale: 0.9419, opacity: 0.8064, zIndex: 4, visible: true }
      } else if (relativeIndex === -2) {
        return { y: -7.9041, scale: 0.8419, opacity: 0.4731, zIndex: 3, visible: true }
      } else if (relativeIndex === -3) {
        return { y: -12.9041, scale: 0.7419, opacity: 0.1397, zIndex: 2, visible: true }
      } else {
        return { y: relativeIndex > 0 ? 100 : -15, scale: 0.7, opacity: 0, zIndex: 0, visible: false }
      }
    }

    // During scroll transitions
    if (scrollDirection.current > 0) {
      if (relativeIndex === 0) {
        return {
          y: scrollProgress * 2.9041,
          scale: 1.0 - scrollProgress * 0.0581,
          opacity: Math.max(0, 1.0 - scrollProgress * 0.1936),
          zIndex: 5,
          visible: true
        }
      } else if (relativeIndex === 1) {
        return {
          y: 0,
          scale: 0.94 + scrollProgress * 0.06,
          opacity: scrollProgress,
          zIndex: 6,
          visible: true
        }
      }
    } else {
      if (relativeIndex === 0) {
        return {
          y: -scrollProgress * 2.9041,
          scale: 1.0 - scrollProgress * 0.0581,
          opacity: Math.max(0, 1.0 - scrollProgress * 0.1936),
          zIndex: 5,
          visible: true
        }
      } else if (relativeIndex === -1) {
        return {
          y: -2.9041 + scrollProgress * 2.9041,
          scale: 0.9419 + scrollProgress * 0.0581,
          opacity: 0.8064 + scrollProgress * 0.1936,
          zIndex: 6,
          visible: true
        }
      }
    }

    return { y: 0, scale: 1, opacity: 0, zIndex: 0, visible: false }
  }

  const getFadeTransform = (relativeIndex: number) => {
    if (relativeIndex === 0) {
      return {
        y: 0,
        scale: 1,
        opacity: isScrolling ? 1 - scrollProgress : 1,
        zIndex: 5,
        visible: true
      }
    } else if (relativeIndex === 1 && isScrolling && scrollDirection.current > 0) {
      return {
        y: 0,
        scale: 1,
        opacity: scrollProgress,
        zIndex: 6,
        visible: true
      }
    } else if (relativeIndex === -1 && isScrolling && scrollDirection.current < 0) {
      return {
        y: 0,
        scale: 1,
        opacity: scrollProgress,
        zIndex: 6,
        visible: true
      }
    }

    return { y: 0, scale: 1, opacity: 0, zIndex: 0, visible: false }
  }

  const getSlideTransform_Effect = (relativeIndex: number) => {
    if (!isScrolling) {
      if (relativeIndex === 0) {
        return { y: 0, scale: 1, opacity: 1, zIndex: 5, visible: true }
      }
      return { y: relativeIndex > 0 ? 100 : -100, scale: 1, opacity: 0, zIndex: 0, visible: false }
    }

    if (scrollDirection.current > 0) {
      if (relativeIndex === 0) {
        return {
          y: -scrollProgress * 100,
          scale: 1,
          opacity: 1,
          zIndex: 5,
          visible: true
        }
      } else if (relativeIndex === 1) {
        return {
          y: 100 - scrollProgress * 100,
          scale: 1,
          opacity: 1,
          zIndex: 6,
          visible: true
        }
      }
    } else {
      if (relativeIndex === 0) {
        return {
          y: scrollProgress * 100,
          scale: 1,
          opacity: 1,
          zIndex: 5,
          visible: true
        }
      } else if (relativeIndex === -1) {
        return {
          y: -100 + scrollProgress * 100,
          scale: 1,
          opacity: 1,
          zIndex: 6,
          visible: true
        }
      }
    }

    return { y: 0, scale: 1, opacity: 0, zIndex: 0, visible: false }
  }

  const getScaleTransform = (relativeIndex: number) => {
    if (!isScrolling) {
      if (relativeIndex === 0) {
        return { y: 0, scale: 1, opacity: 1, zIndex: 5, visible: true }
      }
      return { y: 0, scale: 0.8, opacity: 0, zIndex: 0, visible: false }
    }

    if (relativeIndex === 0) {
      return {
        y: 0,
        scale: 1 - scrollProgress * 0.2,
        opacity: 1 - scrollProgress,
        zIndex: 5,
        visible: true
      }
    } else if ((relativeIndex === 1 && scrollDirection.current > 0) ||
               (relativeIndex === -1 && scrollDirection.current < 0)) {
      return {
        y: 0,
        scale: 0.8 + scrollProgress * 0.2,
        opacity: scrollProgress,
        zIndex: 6,
        visible: true
      }
    }

    return { y: 0, scale: 0.8, opacity: 0, zIndex: 0, visible: false }
  }

  const getNoneTransform = (relativeIndex: number) => {
    if (relativeIndex === 0) {
      return { y: 0, scale: 1, opacity: 1, zIndex: 5, visible: true }
    }
    return { y: 0, scale: 1, opacity: 0, zIndex: 0, visible: false }
  }

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.length && index !== currentSlide) {
      setIsTransitioning(true)
      setCurrentSlide(index)
      setTimeout(() => setIsTransitioning(false), finalConfig.transitionDuration! * 1000)
    }
  }

  return (
    <div className={`relative w-full h-screen overflow-hidden ${className}`}>
      <div
        ref={containerRef}
        className="relative w-full h-full"
        style={{ backgroundColor: finalConfig.backgroundColor }}
      >
        {slides.map((SlideComponent, index) => {
          const transform = getSlideTransform(index)

          if (!transform.visible) return null

          return (
            <motion.div
              key={index}
              className="absolute inset-0"
              animate={{
                y: `${transform.y}%`,
                scale: transform.scale,
                opacity: transform.opacity
              }}
              style={{
                zIndex: Math.round(transform.zIndex)
              }}
              transition={{
                type: "tween",
                duration: finalConfig.effect === 'none' ? 0 : finalConfig.transitionDuration,
                ease: "easeOut"
              }}
            >
              <div className={`w-full h-full p-${finalConfig.cardStyle?.padding} flex items-center justify-center`}>
                <div
                  className={`w-full max-w-${finalConfig.cardStyle?.maxWidth} h-full max-h-[${finalConfig.cardStyle?.maxHeight}] rounded-${finalConfig.cardStyle?.borderRadius} shadow-${finalConfig.cardStyle?.shadow} bg-white flex items-center justify-center`}
                  style={{
                    border: finalConfig.cardStyle?.border
                  }}
                >
                  <SlideComponent />
                </div>
              </div>
            </motion.div>
          )
        })}

        {/* Slide Indicators */}
        {finalConfig.showIndicators && slides.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-blue-500 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}