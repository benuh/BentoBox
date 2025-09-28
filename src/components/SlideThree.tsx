'use client'

import SimpleSlide from './SimpleSlide'

export default function SlideThree() {
  return (
    <SimpleSlide>
      <div className="text-center">
        <h1 style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          fontWeight: 900,
          color: '#1a1a1a',
          margin: 0,
          letterSpacing: '-0.02em'
        }}>
          Slide Three
        </h1>
        <p style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 'clamp(1rem, 3vw, 1.5rem)',
          color: '#666666',
          marginTop: '2rem',
          fontWeight: 400
        }}>
          This is the third slide
        </p>
      </div>
    </SimpleSlide>
  )
}