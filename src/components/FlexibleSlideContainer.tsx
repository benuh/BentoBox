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
  slideStyle?: React.CSSProperties
}

interface FlexibleSlideContainerProps {
  children: React.ReactNode[]
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
  slideStyle: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default function FlexibleSlideContainer({
  children,
  config = {},
  className = ""
}: FlexibleSlideContainerProps) {
  const finalConfig = { ...defaultConfig, ...config }
  const slides = React.Children.toArray(children)

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

    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current)
      resetTimeoutRef.current = null
    }

    scrollAccumulator.current += e.deltaY
    scrollDirection.current = e.deltaY > 0 ? 1 : -1

    const rawProgress = Math.abs(scrollAccumulator.current) / finalConfig.scrollSensitivity!
    const progress = Math.min(Math.max(rawProgress, 0), 1)

    setScrollProgress(progress)
    setIsScrolling(true)

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

      scrollAccumulator.current = 0
      setScrollProgress(0)
      setIsScrolling(false)
    } else {
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
    // Only show max 3 slides in stack
    const maxStackSize = 3
    const stackPosition = currentSlide - relativeIndex // How deep in the stack (0 = top, 1 = middle, 2 = bottom)

    if (!isScrolling) {
      // Static stacking positions
      if (relativeIndex >= 0) {
        // Current and future slides
        if (relativeIndex === 0) {
          // Top slide - fully visible
          return { y: 0, scale: 1.0, opacity: 1.0, zIndex: 10, visible: true }
        } else {
          // Future slides - hidden above
          return { y: -100, scale: 1.0, opacity: 0, zIndex: 0, visible: false }
        }
      } else {
        // Past slides stacked below
        if (stackPosition <= maxStackSize) {
          const opacityLevels = [1.0, 0.7, 0.4] // Top to bottom opacity
          const scaleLevels = [1.0, 0.95, 0.9]   // Top to bottom scale
          const yLevels = [0, 2, 4]              // Slight vertical offset for stacking

          return {
            y: yLevels[stackPosition - 1] || 4,
            scale: scaleLevels[stackPosition - 1] || 0.9,
            opacity: opacityLevels[stackPosition - 1] || 0,
            zIndex: 10 - stackPosition,
            visible: stackPosition <= maxStackSize
          }
        } else {
          // Too deep in stack - invisible
          return { y: 4, scale: 0.9, opacity: 0, zIndex: 0, visible: false }
        }
      }
    }

    // During scroll transitions
    if (scrollDirection.current > 0) {
      // Scrolling down - next slide comes from below and moves up to top
      if (relativeIndex === 0) {
        // Current slide staying in place as new slide covers it
        return {
          y: 0,
          scale: 1.0 - scrollProgress * 0.05,
          opacity: 1.0,
          zIndex: 9,
          visible: true
        }
      } else if (relativeIndex === 1) {
        // Next slide coming up from below
        return {
          y: 100 - scrollProgress * 100,
          scale: 1.0,
          opacity: scrollProgress,
          zIndex: 10,
          visible: true
        }
      } else if (relativeIndex < 0) {
        // Background stack slides - adjust positions
        const newStackPosition = stackPosition + 1
        if (newStackPosition <= maxStackSize) {
          const opacityLevels = [0.7, 0.4, 0.0]
          const scaleLevels = [0.95, 0.9, 0.85]
          const yLevels = [2, 4, 6]

          return {
            y: yLevels[newStackPosition - 1] || 6,
            scale: scaleLevels[newStackPosition - 1] || 0.85,
            opacity: opacityLevels[newStackPosition - 1] || 0,
            zIndex: 9 - newStackPosition,
            visible: newStackPosition <= maxStackSize
          }
        } else {
          return { y: 6, scale: 0.85, opacity: 0, zIndex: 0, visible: false }
        }
      }
    } else {
      // Scrolling up - previous slide comes from above
      if (relativeIndex === 0) {
        // Current slide moving down as previous slide covers it
        return {
          y: scrollProgress * 100,
          scale: 1.0,
          opacity: 1.0,
          zIndex: 9,
          visible: true
        }
      } else if (relativeIndex === -1) {
        // Previous slide coming down from above
        return {
          y: -100 + scrollProgress * 100,
          scale: 1.0,
          opacity: scrollProgress,
          zIndex: 10,
          visible: true
        }
      } else if (relativeIndex < -1) {
        // Other stack slides - adjust positions
        const newStackPosition = stackPosition - 1
        if (newStackPosition >= 1 && newStackPosition <= maxStackSize) {
          const opacityLevels = [1.0, 0.7, 0.4]
          const scaleLevels = [1.0, 0.95, 0.9]
          const yLevels = [0, 2, 4]

          return {
            y: yLevels[newStackPosition - 1],
            scale: scaleLevels[newStackPosition - 1],
            opacity: opacityLevels[newStackPosition - 1],
            zIndex: 10 - newStackPosition,
            visible: true
          }
        } else {
          return { y: 4, scale: 0.9, opacity: 0, zIndex: 0, visible: false }
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
        {slides.map((slide, index) => {
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
              <div style={finalConfig.slideStyle}>
                {slide}
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

// Helper hook for easy slide creation
export const useSlides = () => {
  const [slides, setSlides] = useState<React.ReactNode[]>([])

  const addSlide = useCallback((content: React.ReactNode) => {
    setSlides(prev => [...prev, content])
  }, [])

  const removeSlide = useCallback((index: number) => {
    setSlides(prev => prev.filter((_, i) => i !== index))
  }, [])

  const updateSlide = useCallback((index: number, content: React.ReactNode) => {
    setSlides(prev => prev.map((slide, i) => i === index ? content : slide))
  }, [])

  const clearSlides = useCallback(() => {
    setSlides([])
  }, [])

  return {
    slides,
    addSlide,
    removeSlide,
    updateSlide,
    clearSlides,
    slideCount: slides.length
  }
}