'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProgressLines from './ProgressLines'

interface SimpleSlideContainerProps {
  slides: React.ComponentType[]
}

export default function SimpleSlideContainer({ slides }: SimpleSlideContainerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showPanelView, setShowPanelView] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [direction, setDirection] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollAccumulator = useRef(0)
  const scrollDirection = useRef(0)
  const lastScrollTime = useRef(0)
  const scrollCooldown = 150

  const handleScroll = useCallback((e: WheelEvent) => {
    e.preventDefault()

    const scrollSensitivity = 80

    // Immediately update scroll state on ANY scroll input - even tiny amounts
    scrollAccumulator.current += e.deltaY
    scrollDirection.current = e.deltaY > 0 ? 1 : -1

    const rawProgress = Math.abs(scrollAccumulator.current) / scrollSensitivity
    const progress = Math.min(Math.max(rawProgress, 0), 1)

    // Always set scrolling state - movement starts instantly
    setScrollProgress(progress)
    setIsScrolling(true)

    // Complete transition when scroll reaches threshold
    if (progress >= 1.0) {
      if (scrollDirection.current > 0) {
        // Scrolling down
        if (!showPanelView && currentSlide < slides.length - 1) {
          setCurrentSlide(prev => prev + 1)
        } else if (!showPanelView && currentSlide === slides.length - 1) {
          setShowPanelView(true)
        }
      } else {
        // Scrolling up
        if (showPanelView) {
          setShowPanelView(false)
          setCurrentSlide(slides.length - 1)
        } else if (currentSlide > 0) {
          setCurrentSlide(prev => prev - 1)
        }
      }

      scrollAccumulator.current = 0
      setScrollProgress(0)
      setIsScrolling(false)
    }

    // Reset after inactivity
    const resetTimeout = setTimeout(() => {
      if (progress < 1.0) {
        scrollAccumulator.current = 0
        setScrollProgress(0)
        setIsScrolling(false)
      }
    }, 200)

    return () => clearTimeout(resetTimeout)
  }, [currentSlide, showPanelView, slides.length])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const now = Date.now()

    if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
      if (now - lastScrollTime.current < scrollCooldown) return

      e.preventDefault()
      lastScrollTime.current = now

      // Go forward
      setDirection(1)
      if (!showPanelView && currentSlide < slides.length - 1) {
        setCurrentSlide(prev => prev + 1)
      } else if (!showPanelView && currentSlide === slides.length - 1) {
        setShowPanelView(true)
      }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      if (now - lastScrollTime.current < scrollCooldown) return

      e.preventDefault()
      lastScrollTime.current = now

      // Go backward
      setDirection(-1)
      if (showPanelView) {
        setShowPanelView(false)
        setCurrentSlide(slides.length - 1)
      } else if (currentSlide > 0) {
        setCurrentSlide(prev => prev - 1)
      }
    } else if (e.key === 'Escape' && showPanelView) {
      setShowPanelView(false)
    } else if (e.key === 'Home') {
      e.preventDefault()
      setCurrentSlide(0)
      setShowPanelView(false)
    } else if (e.key === 'End') {
      e.preventDefault()
      setShowPanelView(true)
    }
  }, [currentSlide, showPanelView, slides.length])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: false })
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleScroll)
      }
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleScroll, handleKeyDown])

  const getNextSlide = () => {
    if (scrollDirection.current > 0) {
      // Scrolling down - show next slide
      if (!showPanelView && currentSlide < slides.length - 1) {
        return currentSlide + 1
      }
    } else {
      // Scrolling up - show previous slide
      if (showPanelView) {
        return slides.length - 1
      } else if (currentSlide > 0) {
        return currentSlide - 1
      }
    }
    return null
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Dynamic Progress Lines */}
      {!showPanelView && (
        <ProgressLines
          slides={slides}
          currentSlide={currentSlide}
          onSlideChange={setCurrentSlide}
          onShowPanel={() => setShowPanelView(true)}
        />
      )}

      {/* Slide View */}
      {!showPanelView && (
        <div className="relative w-full h-full overflow-hidden">
          {/* Current Slide - gets pushed behind */}
          <motion.div
            className="absolute inset-0"
            animate={{
              y: isScrolling
                ? `${scrollDirection.current > 0 ? -scrollProgress * 100 : scrollProgress * 100}%`
                : '0%'
            }}
            style={{
              zIndex: isScrolling ? 1 : 2
            }}
            transition={{
              type: "tween",
              duration: 0,
              ease: "linear"
            }}
          >
            {slides[currentSlide] && React.createElement(slides[currentSlide])}
          </motion.div>

          {/* Next/Previous Slide - always rendered for smooth transitions */}
          {getNextSlide() !== null && (
            <motion.div
              className="absolute inset-0"
              animate={{
                y: isScrolling
                  ? scrollDirection.current > 0
                    ? `${100 - scrollProgress * 100}%`  // Pulls up from bottom
                    : `${-100 + scrollProgress * 100}%` // Pulls down from top
                  : scrollDirection.current > 0
                    ? '100%' // Hidden below
                    : '-100%' // Hidden above
              }}
              style={{
                zIndex: isScrolling ? 2 : 0 // On top only during scrolling
              }}
              transition={{
                type: "tween",
                duration: 0,
                ease: "linear"
              }}
            >
              {React.createElement(slides[getNextSlide()!])}
            </motion.div>
          )}
        </div>
      )}

      {/* Panel View */}
      {showPanelView && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 p-12 overflow-y-auto"
          style={{ backgroundColor: '#000000' }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-16"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 900,
                color: '#1a1a1a',
                letterSpacing: '-0.02em'
              }}
            >
              All Slides
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {slides.map((SlideComponent, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="relative group cursor-pointer"
                  onClick={() => {
                    setCurrentSlide(index)
                    setShowPanelView(false)
                  }}
                >
                  {/* Slide Number */}
                  <div className="mb-4">
                    <span
                      style={{
                        fontFamily: '"Inter", sans-serif',
                        fontSize: '0.875rem',
                        color: '#666666',
                        fontWeight: 500
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Slide Preview */}
                  <div
                    className="w-full h-64 overflow-hidden border border-gray-200 transition-all duration-300 group-hover:border-gray-400 group-hover:shadow-lg"
                    style={{
                      backgroundColor: '#000000',
                      borderRadius: '8px'
                    }}
                  >
                    <div className="w-full h-full overflow-hidden relative">
                      <div
                        className="absolute inset-0 origin-top-left"
                        style={{
                          transform: 'scale(0.27)',
                          width: '370vh',
                          height: '370vh'
                        }}
                      >
                        <SlideComponent />
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg mt-10" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}