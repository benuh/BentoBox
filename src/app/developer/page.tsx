'use client'

import Link from 'next/link'
import PageTransition from '../../components/PageTransition'
import Terminal from '../../components/Terminal'
import GitHubIcon from '../../components/icons/GitHubIcon'
import LinkedInIcon from '../../components/icons/LinkedInIcon'
import InstagramIcon from '../../components/icons/InstagramIcon'
import XIcon from '../../components/icons/XIcon'

export default function DeveloperPage() {
  return (
    <PageTransition>
      <div className="min-h-screen" style={{
        backgroundColor: 'rgb(15, 23, 42)',
        padding: 'clamp(1rem, 3vw, 2rem)'
      }}>
        {/* Navigation - Top Left */}
        <div className="absolute z-10" style={{
          top: 'clamp(1rem, 2vw, 1.5rem)',
          left: 'clamp(1rem, 2vw, 1.5rem)'
        }}>
          <Link
            href="/"
            className="inline-flex items-center rounded-lg transition-all duration-200 hover:bg-slate-700 hover:bg-opacity-10"
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              color: 'rgb(248, 250, 252)',
              textDecoration: 'none',
              fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)',
              fontWeight: 500,
              padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(0.75rem, 1.5vw, 1rem)'
            }}
          >
            &lt;- cd ~/
          </Link>
        </div>

        <div className="flex h-full min-h-screen">
          {/* Left Side - Profile */}
          <div className="w-1/3 flex flex-col justify-start items-start text-left" style={{
            paddingLeft: 'clamp(1rem, 4vw, 3rem)',
            paddingRight: 'clamp(1rem, 2vw, 2rem)',
            paddingTop: 'clamp(3rem, 8vh, 6rem)'
          }}>
            {/* Profile Section */}
            <div
              className="p-6"
              style={{
                marginBottom: 'clamp(1.5rem, 4vw, 3rem)'
              }}
            >
              {/* Profile Picture */}
              <div className="flex justify-center mb-6">
                <img
                  src="/profile.jpg"
                  alt="Benjamin Hu - Software Developer"
                  className="rounded-full object-cover shadow-2xl"
                  style={{
                    width: 'clamp(8rem, 12vw, 12rem)',
                    height: 'clamp(8rem, 12vw, 12rem)',
                    boxShadow: '0 clamp(1rem, 2vw, 2rem) clamp(2rem, 4vw, 4rem) rgba(0,0,0,0.3)',
                    transform: 'scaleX(-1)'
                  }}
                />
              </div>

              {/* Name and Title */}
              <div className="mb-6">
                <h1 style={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 700,
                  color: 'rgb(248, 250, 252)',
                  letterSpacing: '-0.025em',
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  margin: 0,
                  marginBottom: '0.75rem'
                }}>
                  Benjamin Hu
                </h1>

                <h2 style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontWeight: 500,
                  color: 'rgb(148, 163, 184)',
                  letterSpacing: '0.05em',
                  fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                  margin: 0
                }}>
                  &gt; Software Developer
                </h2>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4 justify-center">
                <GitHubIcon
                  href="https://github.com/benuh"
                  size="3rem"
                  style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                />
                <LinkedInIcon
                  href="https://www.linkedin.com/in/benjamin-hu-556104176/"
                  size="3rem"
                  style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                />
                <InstagramIcon
                  href="https://www.instagram.com/benjamin.c.hu/#"
                  size="3rem"
                  style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                />
                <XIcon
                  href="https://x.com/benerichu"
                  size="3rem"
                  style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                />
              </div>
            </div>
          </div>

          {/* Right Side - Terminal */}
          <div className="w-2/3 flex items-center justify-center" style={{
            paddingLeft: 'clamp(1rem, 2vw, 2rem)',
            paddingRight: 'clamp(1rem, 4vw, 3rem)'
          }}>
            <Terminal className="w-full" style={{ maxWidth: 'clamp(35rem, 85vw, 70rem)' }} />
          </div>
        </div>
      </div>
    </PageTransition>
  )
}