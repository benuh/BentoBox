'use client'

import Link from 'next/link'
import PageTransition from '../../components/PageTransition'
import Terminal from '../../components/Terminal'
import GitHubIcon from '../../components/icons/GitHubIcon'
import LinkedInIcon from '../../components/icons/LinkedInIcon'
import InstagramIcon from '../../components/icons/InstagramIcon'
import XIcon from '../../components/icons/XIcon'
import ThemeToggle from '../../components/ThemeToggle'
import { useTheme } from '../../contexts/ThemeContext'
import { themes } from '../../utils/theme'

export default function DeveloperPage() {
  const { theme } = useTheme()
  const currentTheme = themes[theme]

  return (
    <PageTransition>
      <div className="min-h-screen" style={{
        backgroundColor: currentTheme.background,
        padding: 'clamp(1rem, 3vw, 2rem)'
      }}>
        {/* Navigation - Top Left */}
        <div className="absolute z-10" style={{
          top: 'clamp(1rem, 2vw, 1.5rem)',
          left: 'clamp(1rem, 2vw, 1.5rem)'
        }}>
          <Link
            href="/"
            className="inline-flex items-center rounded-lg transition-all duration-200"
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              color: currentTheme.navText,
              textDecoration: 'none',
              fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)',
              fontWeight: 500,
              padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(0.75rem, 1.5vw, 1rem)',
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = currentTheme.navHover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            &lt;- cd ~/
          </Link>
        </div>

        {/* Theme Toggle and Resume - Top Right */}
        <div className="absolute z-10 flex gap-3" style={{
          top: 'clamp(1rem, 2vw, 1.5rem)',
          right: 'clamp(1rem, 2vw, 1.5rem)'
        }}>
          <a
            href="/BH_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg transition-all duration-200"
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              color: currentTheme.navText,
              textDecoration: 'none',
              fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)',
              fontWeight: 500,
              padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(0.75rem, 1.5vw, 1rem)',
              backgroundColor: 'transparent',
              border: `1px solid ${currentTheme.navText}20`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = currentTheme.navHover
              e.currentTarget.style.borderColor = currentTheme.navText + '40'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.borderColor = currentTheme.navText + '20'
            }}
          >
            📄 Resume
          </a>
          <ThemeToggle />
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex h-full min-h-screen">
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
                  color: currentTheme.textPrimary,
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
                  color: currentTheme.textSecondary,
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
                  backgroundColor={currentTheme.iconBg}
                  color={currentTheme.iconColor}
                  style={{
                    boxShadow: theme === 'dark' ? '0 4px 12px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <LinkedInIcon
                  href="https://www.linkedin.com/in/benjamin-hu-556104176/"
                  size="3rem"
                  backgroundColor={currentTheme.iconBg}
                  color={currentTheme.iconColor}
                  style={{
                    boxShadow: theme === 'dark' ? '0 4px 12px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <InstagramIcon
                  href="https://www.instagram.com/benjamin.c.hu/#"
                  size="3rem"
                  backgroundColor={currentTheme.iconBg}
                  color={currentTheme.iconColor}
                  style={{
                    boxShadow: theme === 'dark' ? '0 4px 12px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <XIcon
                  href="https://x.com/benerichu"
                  size="3rem"
                  backgroundColor={currentTheme.iconBg}
                  color={currentTheme.iconColor}
                  style={{
                    boxShadow: theme === 'dark' ? '0 4px 12px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.1)'
                  }}
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

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col min-h-screen" style={{ padding: 'clamp(1rem, 4vw, 2rem)' }}>
          {/* Profile Section - Top */}
          <div className="flex flex-col items-center text-center mb-8" style={{ paddingTop: '3rem' }}>
            {/* Profile Picture */}
            <div className="mb-6">
              <img
                src="/profile.jpg"
                alt="Benjamin Hu - Software Developer"
                className="rounded-full object-cover shadow-2xl"
                style={{
                  width: 'clamp(6rem, 25vw, 8rem)',
                  height: 'clamp(6rem, 25vw, 8rem)',
                  boxShadow: '0 1rem 2rem rgba(0,0,0,0.3)',
                  transform: 'scaleX(-1)'
                }}
              />
            </div>

            {/* Name and Title */}
            <div className="mb-6">
              <h1 style={{
                fontFamily: '"Inter", sans-serif',
                fontWeight: 700,
                color: currentTheme.textPrimary,
                letterSpacing: '-0.025em',
                fontSize: 'clamp(1.8rem, 8vw, 2.5rem)',
                margin: 0,
                marginBottom: '0.5rem'
              }}>
                Benjamin Hu
              </h1>

              <h2 style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 500,
                color: currentTheme.textSecondary,
                letterSpacing: '0.05em',
                fontSize: 'clamp(0.9rem, 4vw, 1.2rem)',
                margin: 0
              }}>
                &gt; Software Developer
              </h2>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 justify-center">
              <GitHubIcon
                href="https://github.com/benuh"
                size="2.5rem"
                backgroundColor={currentTheme.iconBg}
                color={currentTheme.iconColor}
                style={{
                  boxShadow: theme === 'dark' ? '0 4px 12px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <LinkedInIcon
                href="https://www.linkedin.com/in/benjamin-hu-556104176/"
                size="2.5rem"
                backgroundColor={currentTheme.iconBg}
                color={currentTheme.iconColor}
                style={{
                  boxShadow: theme === 'dark' ? '0 4px 12px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <InstagramIcon
                href="https://www.instagram.com/benjamin.c.hu/#"
                size="2.5rem"
                backgroundColor={currentTheme.iconBg}
                color={currentTheme.iconColor}
                style={{
                  boxShadow: theme === 'dark' ? '0 4px 12px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <XIcon
                href="https://x.com/benerichu"
                size="2.5rem"
                backgroundColor={currentTheme.iconBg}
                color={currentTheme.iconColor}
                style={{
                  boxShadow: theme === 'dark' ? '0 4px 12px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
            </div>
          </div>

          {/* Terminal Section - Bottom */}
          <div className="flex-1 flex items-start justify-center">
            <Terminal className="w-full" style={{ maxWidth: '100%' }} />
          </div>
        </div>
      </div>
    </PageTransition>
  )
}