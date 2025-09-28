'use client'

export default function V3SlideThree() {
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
          Specialized in
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.875rem',
            color: '#666666',
            textTransform: 'uppercase',
            fontWeight: 600,
            letterSpacing: '0.05em',
            margin: '0 0 1rem 0'
          }}>
            Development
          </p>
          <ul style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '1rem',
            color: '#333333',
            lineHeight: '1.6',
            margin: 0,
            padding: 0,
            listStyle: 'none'
          }}>
            <li style={{ marginBottom: '0.25rem' }}>• React & Next.js</li>
            <li style={{ marginBottom: '0.25rem' }}>• TypeScript & JavaScript</li>
            <li style={{ marginBottom: '0.25rem' }}>• API & Backend Development</li>
          </ul>
        </div>

        <div>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.875rem',
            color: '#666666',
            textTransform: 'uppercase',
            fontWeight: 600,
            letterSpacing: '0.05em',
            margin: '0 0 1rem 0'
          }}>
            Design
          </p>
          <ul style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '1rem',
            color: '#333333',
            lineHeight: '1.6',
            margin: 0,
            padding: 0,
            listStyle: 'none'
          }}>
            <li style={{ marginBottom: '0.25rem' }}>• UI/UX Design</li>
            <li style={{ marginBottom: '0.25rem' }}>• Design Systems</li>
            <li style={{ marginBottom: '0.25rem' }}>• Motion Design</li>
          </ul>
        </div>
      </div>
    </div>
  )
}