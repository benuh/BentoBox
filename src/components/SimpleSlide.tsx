'use client'

import { ReactNode } from 'react'

interface SimpleSlideProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function SimpleSlide({ children, className = '', style = {} }: SimpleSlideProps) {
  return (
    <div className={`relative w-full h-screen flex items-center justify-center p-16 ${className}`}>
      <div
        className="w-full max-w-4xl h-full max-h-[600px] flex items-center justify-center rounded-lg shadow-lg"
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e5e5',
          ...style
        }}
      >
        {children}
      </div>
    </div>
  )
}