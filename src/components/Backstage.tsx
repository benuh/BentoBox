'use client'

import { ReactNode } from 'react'

interface BackstageProps {
  children: ReactNode
}

export default function Backstage({ children }: BackstageProps) {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: '#000000',
        padding: 'clamp(1rem, 3vw, 2rem)'
      }}
    >
      {children}
    </div>
  )
}