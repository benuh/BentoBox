'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SlideContainerProps {
  slides: React.ComponentType[]
  showProgressIndicator?: boolean
}

export default function SlideContainer({ slides, showProgressIndicator = true }: SlideContainerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showPanelView, setShowPanelView] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = (e: WheelEvent) => {
      if (isScrolling) return

      e.preventDefault()
      setIsScrolling(true)

      if (e.deltaY > 0) {
        // Scrolling down
        if (showPanelView) {
          // If in panel view, do nothing (stay in panel view)
          setIsScrolling(false)
          return
        } else if (currentSlide < slides.length - 1) {
          setCurrentSlide(prev => prev + 1)
        } else {
          // Reached the end of slides, show panel view
          setShowPanelView(true)
        }
      } else {
        // Scrolling up
        if (showPanelView) {
          setShowPanelView(false)
          setCurrentSlide(slides.length - 1) // Go to last slide when leaving panel view
        } else if (currentSlide > 0) {
          setCurrentSlide(prev => prev - 1)
        }
      }

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
      }, 600) // Reduced timeout for more responsive scrolling
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return

      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        setIsScrolling(true)

        if (showPanelView) {
          setIsScrolling(false)
          return
        } else if (currentSlide < slides.length - 1) {
          setCurrentSlide(prev => prev + 1)
        } else {
          setShowPanelView(true)
        }

        setTimeout(() => setIsScrolling(false), 600)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setIsScrolling(true)

        if (showPanelView) {
          setShowPanelView(false)
          setCurrentSlide(slides.length - 1)
        } else if (currentSlide > 0) {
          setCurrentSlide(prev => prev - 1)
        }

        setTimeout(() => setIsScrolling(false), 600)
      } else if (e.key === 'Escape' && showPanelView) {
        setShowPanelView(false)
      }
    }

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
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
    }
  }, [currentSlide, slides.length, showPanelView, isScrolling])

  const slideVariants = {
    enter: {
      y: '100%',
      opacity: 0
    },
    center: {
      y: 0,
      opacity: 1
    },
    exit: {
      y: '-100%',
      opacity: 0
    }
  }

  const panelVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Progress Indicator */}
      {showProgressIndicator && !showPanelView && (
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="w-3 h-3 rounded-full border border-white/30 transition-all duration-300 hover:scale-125"
              style={{
                backgroundColor: currentSlide === index ? '#ffffff' : 'transparent',
                boxShadow: currentSlide === index ? '0 0 10px rgba(255,255,255,0.5)' : 'none'
              }}
            />
          ))}
          {/* Panel view indicator */}
          <div className="w-6 h-px bg-white/30 my-2" />
          <button
            onClick={() => setShowPanelView(true)}
            className="w-3 h-6 rounded border border-white/30 transition-all duration-300 hover:scale-125 flex items-center justify-center"
            style={{
              backgroundColor: showPanelView ? '#ffffff' : 'transparent'
            }}
          >
            <div className="w-1 h-3 bg-current opacity-50" />
          </button>
        </div>
      )}

      {/* Slide View */}
      {!showPanelView && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="absolute inset-0"
          >
            {slides[currentSlide] && React.createElement(slides[currentSlide])}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Panel View */}
      {showPanelView && (
        <motion.div
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 p-8 overflow-y-auto"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-12"
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '-0.02em'
              }}
            >
              Overview
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
                  <div
                    className="w-full h-64 rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 group-hover:border-white/30 group-hover:scale-105"
                    style={{
                      backgroundColor: 'rgb(40, 40, 40)',
                      transform: 'scale(0.9)'
                    }}
                  >
                    <div className="w-full h-full transform scale-75 origin-top-left">
                      <SlideComponent />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                  <div className="mt-4 text-center">
                    <span
                      style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: '0.9rem',
                        color: '#cccccc',
                        fontWeight: 600
                      }}
                    >
                      Slide {index + 1}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}