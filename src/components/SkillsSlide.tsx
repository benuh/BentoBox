'use client'

export default function SkillsSlide() {
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
          Skills & Technologies
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-12">
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
            Frontend
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
            <li style={{ marginBottom: '0.5rem' }}>• React & Next.js</li>
            <li style={{ marginBottom: '0.5rem' }}>• TypeScript & JavaScript</li>
            <li style={{ marginBottom: '0.5rem' }}>• Tailwind CSS & Styled Components</li>
            <li style={{ marginBottom: '0.5rem' }}>• Framer Motion & Animations</li>
            <li style={{ marginBottom: '0.5rem' }}>• HTML5 & CSS3</li>
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
            Backend & Tools
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
            <li style={{ marginBottom: '0.5rem' }}>• Python & Node.js</li>
            <li style={{ marginBottom: '0.5rem' }}>• AI/ML & TensorFlow</li>
            <li style={{ marginBottom: '0.5rem' }}>• Docker & AWS</li>
            <li style={{ marginBottom: '0.5rem' }}>• PostgreSQL & MongoDB</li>
            <li style={{ marginBottom: '0.5rem' }}>• Git & CI/CD</li>
          </ul>
        </div>
      </div>
    </div>
  )
}