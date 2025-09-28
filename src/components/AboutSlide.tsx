'use client'

import Slide from './Slide'

export default function AboutSlide() {
  return (
    <Slide>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h1 style={{
          fontFamily: '"Inter", sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          color: '#ffffff',
          margin: 0,
          letterSpacing: '-0.02em',
          marginBottom: '2rem'
        }}>
          About Me
        </h1>

        <div className="max-w-4xl px-8">
          <p style={{
            fontFamily: '"Inter", sans-serif',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)',
            color: '#cccccc',
            lineHeight: 1.6,
            marginBottom: '2rem',
            fontWeight: 400
          }}>
            I'm a passionate software developer with expertise in full-stack development,
            machine learning, and creating innovative digital experiences.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <h3 style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '1.2rem',
                color: '#ffffff',
                marginBottom: '1rem',
                fontWeight: 600
              }}>
                Frontend
              </h3>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.95rem',
                color: '#999999',
                lineHeight: 1.5
              }}>
                React, Next.js, TypeScript, Tailwind CSS
              </p>
            </div>

            <div className="text-center">
              <h3 style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '1.2rem',
                color: '#ffffff',
                marginBottom: '1rem',
                fontWeight: 600
              }}>
                Backend
              </h3>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.95rem',
                color: '#999999',
                lineHeight: 1.5
              }}>
                Node.js, Python, PostgreSQL, MongoDB
              </p>
            </div>

            <div className="text-center">
              <h3 style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '1.2rem',
                color: '#ffffff',
                marginBottom: '1rem',
                fontWeight: 600
              }}>
                AI/ML
              </h3>
              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '0.95rem',
                color: '#999999',
                lineHeight: 1.5
              }}>
                TensorFlow, PyTorch, OpenAI APIs
              </p>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  )
}