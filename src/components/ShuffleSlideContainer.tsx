'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ShuffleSlideContainerProps {
  slides: React.ComponentType[]
}

export default function ShuffleSlideContainer({ slides }: ShuffleSlideContainerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollAccumulator = useRef(0)
  const scrollDirection = useRef(0)

  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleScroll = useCallback((e: WheelEvent) => {
    e.preventDefault()

    const scrollSensitivity = 100

    // Clear any existing reset timeout
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current)
      resetTimeoutRef.current = null
    }

    // Update scroll state
    scrollAccumulator.current += e.deltaY
    scrollDirection.current = e.deltaY > 0 ? 1 : -1

    const rawProgress = Math.abs(scrollAccumulator.current) / scrollSensitivity
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
  }, [currentSlide, slides.length])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
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
  }, [handleScroll])

  const getSlideTransform = (slideIndex: number) => {
    const relativeIndex = slideIndex - currentSlide

    // Only render slides that should be visible
    if (!isScrolling) {
      // Static positions - only show current slide and immediate background layers
      if (relativeIndex === 0) {
        return { y: 0, scale: 1.0, opacity: 1.0, zIndex: 5, visible: true }
      } else if (relativeIndex === -1) {
        return { y: -2.9041, scale: 0.9419, opacity: 0.8064, zIndex: 4, visible: true }
      } else if (relativeIndex === -2) {
        return { y: -7.9041, scale: 0.8419, opacity: 0.4731, zIndex: 3, visible: true }
      } else if (relativeIndex === -3) {
        return { y: -12.9041, scale: 0.7419, opacity: 0.1397, zIndex: 2, visible: true }
      } else {
        // All other slides - completely hidden
        return { y: relativeIndex > 0 ? 100 : -15, scale: 0.7, opacity: 0, zIndex: 0, visible: false }
      }
    }

    // During scroll transitions
    if (scrollDirection.current > 0) {
      // Scrolling down
      if (relativeIndex === 0) {
        // Current slide moving down and scaling
        return {
          y: scrollProgress * 2.9041,
          scale: 1.0 - scrollProgress * 0.0581,
          opacity: Math.max(0, 1.0 - scrollProgress * 0.1936),
          zIndex: 5,
          visible: true
        }
      } else if (relativeIndex === 1) {
        // Next slide coming in from bottom
        return {
          y: 0,
          scale: 0.94 + scrollProgress * 0.06,
          opacity: scrollProgress,
          zIndex: 6,
          visible: true
        }
      } else if (relativeIndex < 0 && relativeIndex >= -3) {
        // Background slides - only show immediate layers
        const layerIndex = -relativeIndex - 1
        const layers = [
          { y: -2.9041, scale: 0.9419, opacity: 0.8064, zIndex: 4 },
          { y: -7.9041, scale: 0.8419, opacity: 0.4731, zIndex: 3 },
          { y: -12.9041, scale: 0.7419, opacity: 0.1397, zIndex: 2 }
        ]
        const layer = layers[layerIndex]
        return { ...layer, visible: true }
      } else {
        return { y: relativeIndex > 0 ? 100 : -15, scale: 0.7, opacity: 0, zIndex: 0, visible: false }
      }
    } else {
      // Scrolling up
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
      } else if (relativeIndex < -1 && relativeIndex >= -3) {
        const layerIndex = -relativeIndex - 2
        const layers = [
          { y: -7.9041, scale: 0.8419, opacity: 0.4731, zIndex: 3 },
          { y: -12.9041, scale: 0.7419, opacity: 0.1397, zIndex: 2 }
        ]
        const layer = layers[layerIndex]
        return layer ? { ...layer, visible: true } : { y: -15, scale: 0.7, opacity: 0, zIndex: 0, visible: false }
      } else {
        return { y: relativeIndex > 0 ? 100 : -15, scale: 0.7, opacity: 0, zIndex: 0, visible: false }
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: '#fafafa' }}
    >
      {slides.map((SlideComponent, index) => {
        const transform = getSlideTransform(index)

        // Only render visible slides to prevent overlapping
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
              duration: 0,
              ease: "linear"
            }}
          >
            <div className="w-full h-full p-16 flex items-center justify-center">
              <div
                className="w-full max-w-4xl h-full max-h-[600px] rounded-lg shadow-xl bg-white flex items-center justify-center"
                style={{
                  border: '1px solid #e5e5e5'
                }}
              >
                <SlideComponent />
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}