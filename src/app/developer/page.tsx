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
          <div className="relative group">
            <button
              className="inline-flex items-center rounded-lg transition-all duration-200"
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                color: currentTheme.navText,
                fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)',
                fontWeight: 500,
                padding: 'clamp(0.5rem, 1vw, 0.75rem) clamp(0.75rem, 1.5vw, 1rem)',
                backgroundColor: 'transparent',
                border: `1px solid ${currentTheme.navText}20`,
                cursor: 'pointer'
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
            </button>

            {/* Resume Dropdown Menu */}
            <div className="absolute top-full right-0 mt-2 py-2 w-48 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20"
                 style={{
                   backgroundColor: currentTheme.terminalBg,
                   border: `1px solid ${currentTheme.terminalBorder}`
                 }}>
              <a
                href="/BH_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 transition-colors duration-200"
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.8rem',
                  color: currentTheme.textPrimary,
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = currentTheme.terminalHeader
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <span>👁️</span>
                <span>View Resume</span>
              </a>
              <a
                href="/BH_Resume.pdf"
                download="Benjamin_Hu_Resume.pdf"
                className="flex items-center gap-2 px-4 py-2 transition-colors duration-200"
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.8rem',
                  color: currentTheme.textPrimary,
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = currentTheme.terminalHeader
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                <span>💾</span>
                <span>Download PDF</span>
              </a>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Desktop Layout - Redesigned */}
        <div className="hidden md:flex flex-col h-full min-h-screen">
          {/* Top Section - Profile Header */}
          <div className="flex items-center justify-between px-8 py-6" style={{
            backgroundColor: currentTheme.terminalHeader + '20',
            borderBottom: `1px solid ${currentTheme.terminalBorder}`
          }}>
            {/* Left - Profile Info */}
            <div className="flex items-center gap-6">
              <img
                src="/profile.jpg"
                alt="Benjamin Hu - Software Developer"
                className="rounded-full object-cover shadow-lg"
                style={{
                  width: '4rem',
                  height: '4rem',
                  transform: 'scaleX(-1)'
                }}
              />
              <div>
                <h1 style={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 700,
                  color: currentTheme.textPrimary,
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  margin: 0
                }}>
                  Benjamin Hu
                </h1>
                <h2 style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontWeight: 500,
                  color: currentTheme.textSecondary,
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
                  margin: 0
                }}>
                  &gt; Full Stack Engineer
                </h2>
              </div>
            </div>

            {/* Right - Social Icons (Horizontal) */}
            <div className="flex gap-3">
              <GitHubIcon
                href="https://github.com/benuh"
                size="2rem"
                backgroundColor={currentTheme.iconBg}
                color={currentTheme.iconColor}
              />
              <LinkedInIcon
                href="https://www.linkedin.com/in/benjamin-hu-556104176/"
                size="2rem"
                backgroundColor={currentTheme.iconBg}
                color={currentTheme.iconColor}
              />
              <InstagramIcon
                href="https://www.instagram.com/benjamin.c.hu/#"
                size="2rem"
                backgroundColor={currentTheme.iconBg}
                color={currentTheme.iconColor}
              />
              <XIcon
                href="https://x.com/benerichu"
                size="2rem"
                backgroundColor={currentTheme.iconBg}
                color={currentTheme.iconColor}
              />
            </div>
          </div>

          {/* Main Content - Two Column Layout */}
          <div className="flex-1 flex">
            {/* Left Column - Experience & Skills */}
            <div className="w-80 flex-shrink-0 p-6 overflow-y-auto" style={{
              backgroundColor: currentTheme.terminalHeader + '10',
              borderRight: `1px solid ${currentTheme.terminalBorder}`
            }}>
              {/* Current Status */}
              <div className="mb-6 p-4 rounded-lg" style={{
                backgroundColor: currentTheme.terminalBg,
                border: `1px solid ${currentTheme.terminalBorder}`
              }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '0.9rem',
                    color: currentTheme.variable,
                    fontWeight: 600
                  }}>
                    Currently Available
                  </span>
                </div>
                <p style={{
                  fontSize: '0.8rem',
                  color: currentTheme.textSecondary,
                  fontFamily: '"JetBrains Mono", monospace'
                }}>
                  Open to new opportunities in AI/ML, fintech, and full-stack development
                </p>
              </div>

              {/* Experience Timeline */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4" style={{
                  color: currentTheme.variable,
                  fontFamily: '"JetBrains Mono", monospace'
                }}>
                  💼 Experience
                </h3>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg" style={{
                    backgroundColor: currentTheme.terminalBg,
                    border: `1px solid ${currentTheme.terminalBorder}`
                  }}>
                    <div className="font-semibold" style={{ color: currentTheme.textPrimary, fontSize: '0.9rem' }}>
                      Vantage Risk
                    </div>
                    <div style={{ color: currentTheme.variable, fontSize: '0.8rem' }}>
                      Full Stack Engineer
                    </div>
                    <div style={{ color: currentTheme.textSecondary, fontSize: '0.75rem' }}>
                      Jan 2024 - Present
                    </div>
                  </div>

                  <div className="p-3 rounded-lg" style={{
                    backgroundColor: currentTheme.terminalBg,
                    border: `1px solid ${currentTheme.terminalBorder}`
                  }}>
                    <div className="font-semibold" style={{ color: currentTheme.textPrimary, fontSize: '0.9rem' }}>
                      Theom.AI
                    </div>
                    <div style={{ color: currentTheme.variable, fontSize: '0.8rem' }}>
                      Full Stack Engineer
                    </div>
                    <div style={{ color: currentTheme.textSecondary, fontSize: '0.75rem' }}>
                      Apr 2023 - Dec 2023
                    </div>
                  </div>

                  <div className="p-3 rounded-lg" style={{
                    backgroundColor: currentTheme.terminalBg,
                    border: `1px solid ${currentTheme.terminalBorder}`
                  }}>
                    <div className="font-semibold" style={{ color: currentTheme.textPrimary, fontSize: '0.9rem' }}>
                      UC Irvine
                    </div>
                    <div style={{ color: currentTheme.variable, fontSize: '0.8rem' }}>
                      Research Assistant
                    </div>
                    <div style={{ color: currentTheme.textSecondary, fontSize: '0.75rem' }}>
                      Jul 2021 - Jun 2022
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Skills */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4" style={{
                  color: currentTheme.variable,
                  fontFamily: '"JetBrains Mono", monospace'
                }}>
                  🚀 Core Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'React', 'AI/ML', 'Node.js', 'Docker', 'AWS'].map((skill) => (
                    <span key={skill} className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`,
                      fontFamily: '"JetBrains Mono", monospace'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Terminal/Projects */}
            <div className="flex-1 flex items-center justify-center p-6">
              <Terminal className="w-full h-full" style={{
                maxWidth: 'none',
                maxHeight: '80vh'
              }} />
            </div>
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

            {/* Resume Highlights - Mobile */}
            <div className="mb-6 p-3 rounded-lg" style={{
              backgroundColor: currentTheme.terminalHeader,
              border: `1px solid ${currentTheme.terminalBorder}`
            }}>
              <h3 className="text-sm font-semibold mb-2" style={{
                color: currentTheme.variable,
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                💼 Experience
              </h3>
              <div className="space-y-1" style={{
                fontSize: 'clamp(0.7rem, 3vw, 0.8rem)',
                color: currentTheme.textSecondary,
                fontFamily: '"JetBrains Mono", monospace'
              }}>
                <div>🏢 <strong>Vantage Risk</strong> - Current</div>
                <div>🔒 <strong>Theom.AI</strong> - 2023</div>
                <div>🎓 <strong>UC Irvine</strong> - Research</div>
              </div>
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