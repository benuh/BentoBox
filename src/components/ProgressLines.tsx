'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface ProgressLinesProps {
  slides: React.ComponentType[]
  currentSlide: number
  onSlideChange: (index: number) => void
  onShowPanel: () => void
}

export default function ProgressLines({
  slides,
  currentSlide,
  onSlideChange,
  onShowPanel
}: ProgressLinesProps) {
  const [hoveredSlide, setHoveredSlide] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50"
      onMouseLeave={() => setHoveredSlide(null)}
    >

      <div className="relative flex flex-col items-end" style={{ gap: '16px' }}>
        {/* Slide Indicators */}
        {slides.map((_, index) => (
          <div key={index} className="relative flex items-center">
            {/* Clickable Line */}
            <button
              onClick={() => onSlideChange(index)}
              onMouseEnter={() => setHoveredSlide(index)}
              className="relative z-10 p-2 group"
            >
              <motion.div
                className="w-4 h-px transition-colors duration-200"
                style={{
                  backgroundColor: currentSlide === index ? '#fafafa' : '#cccccc'
                }}
                animate={{
                  width: currentSlide === index ? '20px' : (hoveredSlide === index ? '16px' : '12px'),
                  backgroundColor: currentSlide === index ? '#fafafa' :
                                  hoveredSlide === index ? '#e5e5e5' : '#cccccc'
                }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        ))}

      </div>
    </div>
  )
}