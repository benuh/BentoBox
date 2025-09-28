'use client'

export default function ProjectsSlide() {
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
          Featured Projects
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="p-6 rounded-lg" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <div className="mb-4">
            <h3 style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#1a1a1a',
              margin: 0
            }}>
              AI Risk Assessment Platform
            </h3>
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.875rem',
              color: '#64748b',
              margin: '0.5rem 0 0 0'
            }}>
              React • Python • TensorFlow • AWS
            </p>
          </div>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.9rem',
            color: '#334155',
            lineHeight: '1.6',
            margin: 0
          }}>
            Built a comprehensive platform for automated risk assessment using machine learning models. Processes thousands of data points to provide real-time risk scores.
          </p>
        </div>

        <div className="p-6 rounded-lg" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
          <div className="mb-4">
            <h3 style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#1a1a1a',
              margin: 0
            }}>
              Cybersecurity Dashboard
            </h3>
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.875rem',
              color: '#64748b',
              margin: '0.5rem 0 0 0'
            }}>
              Next.js • Node.js • PostgreSQL • Docker
            </p>
          </div>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.9rem',
            color: '#334155',
            lineHeight: '1.6',
            margin: 0
          }}>
            Developed a real-time security monitoring dashboard with threat detection capabilities. Features automated alerts and comprehensive reporting.
          </p>
        </div>

        <div className="p-6 rounded-lg" style={{ backgroundColor: '#fefce8', border: '1px solid #fef08a' }}>
          <div className="mb-4">
            <h3 style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#1a1a1a',
              margin: 0
            }}>
              Portfolio Terminal
            </h3>
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.875rem',
              color: '#64748b',
              margin: '0.5rem 0 0 0'
            }}>
              TypeScript • React • Framer Motion
            </p>
          </div>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.9rem',
            color: '#334155',
            lineHeight: '1.6',
            margin: 0
          }}>
            Interactive terminal-style portfolio with custom commands, animations, and dynamic content. Features advanced typing effects and smooth transitions.
          </p>
        </div>

        <div className="p-6 rounded-lg" style={{ backgroundColor: '#fdf2f8', border: '1px solid #fbcfe8' }}>
          <div className="mb-4">
            <h3 style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#1a1a1a',
              margin: 0
            }}>
              Research Platform
            </h3>
            <p style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.875rem',
              color: '#64748b',
              margin: '0.5rem 0 0 0'
            }}>
              Python • Jupyter • Pandas • Matplotlib
            </p>
          </div>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.9rem',
            color: '#334155',
            lineHeight: '1.6',
            margin: 0
          }}>
            Built data analysis tools for academic research, processing large datasets and generating insights. Published findings in peer-reviewed journals.
          </p>
        </div>
      </div>
    </div>
  )
}