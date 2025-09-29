'use client'

export default function V3SlideOne() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-12">
      <div>
        <h1 style={{
          fontFamily: '"Inter", sans-serif',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 900,
          color: '#1a1a1a',
          margin: 0,
          letterSpacing: '-0.02em',
          lineHeight: '1.1'
        }}>
          Hi, we are Benjamin.
        </h1>
      </div>

      <div className="space-y-8">
        <div>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.875rem',
            color: '#666666',
            textTransform: 'uppercase',
            fontWeight: 600,
            letterSpacing: '0.05em',
            margin: 0
          }}>
            Here&apos;s how we got from 0 to 1
          </p>
        </div>

        <div>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#333333',
            lineHeight: '1.6',
            margin: 0
          }}>
            A solo developer and designer established in 2024 with passion for creating digital solutions. Products I work on are used by developers and creators worldwide.
          </p>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#333333',
            lineHeight: '1.6',
            margin: '1rem 0 0 0'
          }}>
            I help individuals and companies understand, develop, and position their products while solving their users&apos; pain points.
          </p>
        </div>
      </div>
    </div>
  )
}