'use client'

export default function ExperienceSlide() {
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
          Experience
        </h1>
      </div>

      <div className="space-y-8">
        <div className="border-l-4 border-blue-500 pl-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#1a1a1a',
                margin: 0
              }}>
                Full Stack Engineer
              </h3>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#3b82f6',
                margin: '0.25rem 0 0 0'
              }}>
                Vantage Risk
              </p>
            </div>
            <span style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.875rem',
              color: '#666666',
              fontWeight: 500
            }}>
              Jan 2024 - Present
            </span>
          </div>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.9rem',
            color: '#333333',
            lineHeight: '1.6',
            margin: 0
          }}>
            Developing AI-powered risk assessment tools and fintech solutions. Leading frontend architecture and implementing machine learning integrations.
          </p>
        </div>

        <div className="border-l-4 border-green-500 pl-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#1a1a1a',
                margin: 0
              }}>
                Full Stack Engineer
              </h3>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#10b981',
                margin: '0.25rem 0 0 0'
              }}>
                Theom.AI
              </p>
            </div>
            <span style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.875rem',
              color: '#666666',
              fontWeight: 500
            }}>
              Apr 2023 - Dec 2023
            </span>
          </div>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.9rem',
            color: '#333333',
            lineHeight: '1.6',
            margin: 0
          }}>
            Built cybersecurity platforms with AI-driven threat detection. Developed scalable web applications and integrated machine learning models.
          </p>
        </div>

        <div className="border-l-4 border-purple-500 pl-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#1a1a1a',
                margin: 0
              }}>
                Research Assistant
              </h3>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#8b5cf6',
                margin: '0.25rem 0 0 0'
              }}>
                UC Irvine
              </p>
            </div>
            <span style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '0.875rem',
              color: '#666666',
              fontWeight: 500
            }}>
              Jul 2021 - Jun 2022
            </span>
          </div>
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: '0.9rem',
            color: '#333333',
            lineHeight: '1.6',
            margin: 0
          }}>
            Conducted research in machine learning and data analysis. Published papers and contributed to open-source research projects.
          </p>
        </div>
      </div>
    </div>
  )
}