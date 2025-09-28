'use client'

export default function V3SlideTwo() {
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
          Meticulous and experienced.
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
            To get where I am today, I focus on quality and learning.
          </p>
        </div>

        <div>
          <ul style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#333333',
            lineHeight: '1.8',
            margin: 0,
            padding: 0,
            listStyle: 'none'
          }}>
            <li style={{ marginBottom: '0.5rem' }}>• I strive for excellence in every project</li>
            <li style={{ marginBottom: '0.5rem' }}>• Continuous learning and skill development</li>
            <li style={{ marginBottom: '0.5rem' }}>• Attention to detail is my core principle</li>
            <li style={{ marginBottom: '0.5rem' }}>• Delivering on time and budget always</li>
          </ul>
        </div>
      </div>
    </div>
  )
}