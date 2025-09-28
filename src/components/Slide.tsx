'use client'

import { ReactNode } from 'react'

interface SlideProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function Slide({ children, className = '', style = {} }: SlideProps) {
  return (
    <div
      className={`relative overflow-hidden w-full ${className}`}
      style={{
        height: '80vh',
        background: 'rgb(40, 40, 40)',
        borderRadius: '1.5rem',
        margin: 'clamp(1rem, 3vw, 2rem)',
        marginTop: 'clamp(1rem, 2vw, 1.5rem)',
        ...style
      }}
    >
      {children}
    </div>
  )
}