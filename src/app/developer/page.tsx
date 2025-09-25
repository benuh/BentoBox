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

// Tech Animations CSS
const techAnimations = `
  @keyframes matrix-drift {
    0% { transform: translateY(0px) translateX(0px); }
    50% { transform: translateY(-10px) translateX(-5px); }
    100% { transform: translateY(0px) translateX(0px); }
  }

  @keyframes grid-drift {
    0% { transform: translate(0, 0); }
    100% { transform: translate(30px, 30px); }
  }

  @keyframes gradient-shift {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(5deg); }
  }

  @keyframes scanline {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100vw); }
  }

  @keyframes typing-animation {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0.5; }
  }

  .typing-animation {
    animation: typing-animation 2s ease-in-out infinite;
  }

  .typing-animation::after {
    content: "|";
    animation: typing-animation 1s ease-in-out infinite;
    color: var(--variable-color);
  }
`

export default function DeveloperPage() {
  const { theme } = useTheme()
  const currentTheme = themes[theme]

  return (
    <PageTransition>
      {/* Inject Tech Animations */}
      <style>{techAnimations}</style>
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

        {/* Desktop Layout - Clean Grid System */}
        <div className="hidden md:grid grid-cols-12 gap-6 min-h-screen p-6">

          {/* Top Header - Full Width */}
          <div className="col-span-12 mb-4">
            <div className="relative flex items-center justify-between px-8 py-6 rounded-xl overflow-hidden" style={{
              background: `linear-gradient(135deg, ${currentTheme.terminalHeader}15, ${currentTheme.terminalBg}25)`,
              border: `1px solid ${currentTheme.variable}20`,
              boxShadow: `0 8px 32px ${currentTheme.terminalBorder}20`
            }}>
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 20px 20px, ${currentTheme.variable} 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              animation: 'matrix-drift 20s linear infinite'
            }}></div>

            {/* Left - Profile Info with Glitch Effect */}
            <div className="flex items-center gap-6 relative z-10">
              <div className="relative">
                <img
                  src="/profile.jpg"
                  alt="Benjamin Hu - Software Developer"
                  className="rounded-full object-cover shadow-2xl transition-all duration-300 hover:shadow-cyan-500/20"
                  style={{
                    width: '4.5rem',
                    height: '4.5rem',
                    transform: 'scaleX(-1)',
                    border: `3px solid ${currentTheme.variable}60`,
                    filter: 'brightness(1.1) contrast(1.1)'
                  }}
                />
                {/* Pulse Ring */}
                <div className="absolute inset-0 rounded-full border-2 animate-ping" style={{
                  borderColor: currentTheme.variable + '40',
                  animationDuration: '3s'
                }}></div>
              </div>
              <div>
                <h1 className="relative" style={{
                  fontFamily: '"Inter", sans-serif',
                  fontWeight: 700,
                  color: currentTheme.textPrimary,
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  margin: 0,
                  textShadow: `0 0 10px ${currentTheme.variable}30`
                }}>
                  Benjamin Hu
                  <span className="absolute -top-1 -right-8 text-xs px-2 py-1 rounded-full animate-pulse" style={{
                    backgroundColor: currentTheme.variable,
                    color: currentTheme.background,
                    fontSize: '0.6rem',
                    fontFamily: '"JetBrains Mono", monospace'
                  }}>
                    v2.0
                  </span>
                </h1>
                <div className="flex items-center gap-2">
                  <h2 style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontWeight: 500,
                    color: currentTheme.variable,
                    fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
                    margin: 0
                  }}>
                    &gt; Full Stack Engineer
                  </h2>
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{
                    backgroundColor: currentTheme.variable
                  }}></div>
                </div>
                {/* Typing Animation */}
                <div style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.75rem',
                  color: currentTheme.textSecondary,
                  marginTop: '0.25rem'
                }}>
                  <span className="typing-animation">crafting digital solutions...</span>
                </div>
              </div>
            </div>

            {/* Right - Social Icons with Hover Effects */}
            <div className="flex gap-3 relative z-10">
              <div className="flex gap-3 p-2 rounded-lg backdrop-blur-sm" style={{
                backgroundColor: currentTheme.terminalBg + '60',
                border: `1px solid ${currentTheme.terminalBorder}40`
              }}>
                <GitHubIcon
                  href="https://github.com/benuh"
                  size="2.2rem"
                  backgroundColor={currentTheme.iconBg}
                  color={currentTheme.iconColor}
                />
                <LinkedInIcon
                  href="https://www.linkedin.com/in/benjamin-hu-556104176/"
                  size="2.2rem"
                  backgroundColor={currentTheme.iconBg}
                  color={currentTheme.iconColor}
                />
                <InstagramIcon
                  href="https://www.instagram.com/benjamin.c.hu/#"
                  size="2.2rem"
                  backgroundColor={currentTheme.iconBg}
                  color={currentTheme.iconColor}
                />
                <XIcon
                  href="https://x.com/benerichu"
                  size="2.2rem"
                  backgroundColor={currentTheme.iconBg}
                  color={currentTheme.iconColor}
                />
              </div>
            </div>
          </div>

          {/* Status Card - Clean and Organized */}
          <div className="col-span-12 lg:col-span-4 space-y-6">

            {/* Current Status */}
            <div className="p-6 rounded-xl" style={{
              background: `linear-gradient(135deg, ${currentTheme.terminalBg}90, ${currentTheme.terminalHeader}40)`,
              border: `1px solid ${currentTheme.variable}30`,
              boxShadow: `0 8px 32px ${currentTheme.terminalBorder}15`
            }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" style={{
                  boxShadow: '0 0 15px rgba(16, 185, 129, 0.6)'
                }}></div>
                <h3 style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '1rem',
                  color: currentTheme.variable,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Available for Work
                </h3>
              </div>
              <p style={{
                fontSize: '0.9rem',
                color: currentTheme.textSecondary,
                fontFamily: '"Inter", sans-serif',
                lineHeight: '1.6'
              }}>
                Open to opportunities in AI/ML, fintech, and full-stack development
              </p>
            </div>

            {/* Experience Timeline */}
            <div className="p-6 rounded-xl" style={{
              background: `linear-gradient(135deg, ${currentTheme.terminalBg}90, ${currentTheme.terminalHeader}40)`,
              border: `1px solid ${currentTheme.variable}30`,
              boxShadow: `0 8px 32px ${currentTheme.terminalBorder}15`
            }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{
                  backgroundColor: currentTheme.variable + '20',
                  border: `1px solid ${currentTheme.variable}40`
                }}>
                  <span style={{ fontSize: '1rem' }}>💼</span>
                </div>
                <h3 style={{
                  color: currentTheme.textPrimary,
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1.2rem',
                  fontWeight: 700
                }}>
                  Experience
                </h3>
              </div>

              <div className="space-y-4">
                {[
                  { company: 'Vantage Risk', role: 'Full Stack Engineer', period: 'Jan 2024 - Present', status: 'Current', color: '#10B981' },
                  { company: 'Theom.AI', role: 'Full Stack Engineer', period: 'Apr 2023 - Dec 2023', status: 'Complete', color: '#3B82F6' },
                  { company: 'UC Irvine', role: 'Research Assistant', period: 'Jul 2021 - Jun 2022', status: 'Complete', color: '#8B5CF6' }
                ].map((exp, i) => (
                  <div key={i} className="p-4 rounded-lg transition-all duration-200 hover:scale-[1.02]" style={{
                    background: `linear-gradient(135deg, ${currentTheme.terminalHeader}60, ${currentTheme.terminalBg}80)`,
                    border: `1px solid ${exp.color}30`,
                    borderLeft: `4px solid ${exp.color}`
                  }}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 style={{
                          color: currentTheme.textPrimary,
                          fontSize: '1rem',
                          fontWeight: 600,
                          fontFamily: '"Inter", sans-serif'
                        }}>
                          {exp.company}
                        </h4>
                        <p style={{
                          color: currentTheme.variable,
                          fontSize: '0.85rem',
                          fontFamily: '"Inter", sans-serif',
                          marginTop: '2px'
                        }}>
                          {exp.role}
                        </p>
                      </div>
                      <span className="px-3 py-1 text-xs rounded-full" style={{
                        backgroundColor: exp.color + '20',
                        color: exp.color,
                        fontFamily: '"Inter", sans-serif',
                        fontWeight: 600
                      }}>
                        {exp.status}
                      </span>
                    </div>
                    <p style={{
                      color: currentTheme.textSecondary,
                      fontSize: '0.8rem',
                      fontFamily: '"Inter", sans-serif'
                    }}>
                      {exp.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Grid - Top Right */}
          <div className="col-span-12 lg:col-span-8">
            <div className="p-6 rounded-xl" style={{
              background: `linear-gradient(135deg, ${currentTheme.terminalBg}90, ${currentTheme.terminalHeader}40)`,
              border: `1px solid ${currentTheme.variable}30`,
              boxShadow: `0 8px 32px ${currentTheme.terminalBorder}15`
            }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{
                  backgroundColor: currentTheme.variable + '20',
                  border: `1px solid ${currentTheme.variable}40`
                }}>
                  <span style={{ fontSize: '1rem' }}>⚡</span>
                </div>
                <h3 style={{
                  color: currentTheme.textPrimary,
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1.2rem',
                  fontWeight: 700
                }}>
                  Core Skills
                </h3>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Python', icon: '🐍', color: '#3B82F6' },
                  { name: 'React', icon: '⚛️', color: '#10B981' },
                  { name: 'AI/ML', icon: '🤖', color: '#8B5CF6' },
                  { name: 'Node.js', icon: '📗', color: '#F59E0B' },
                  { name: 'Docker', icon: '🐳', color: '#06B6D4' },
                  { name: 'AWS', icon: '☁️', color: '#EF4444' }
                ].map((skill, i) => (
                  <div
                    key={skill.name}
                    className="p-4 rounded-lg transition-all duration-200 hover:scale-[1.02] text-center"
                    style={{
                      background: `linear-gradient(135deg, ${currentTheme.terminalHeader}60, ${currentTheme.terminalBg}80)`,
                      border: `1px solid ${skill.color}30`
                    }}
                  >
                    <div className="text-2xl mb-2">{skill.icon}</div>
                    <div style={{
                      color: currentTheme.textPrimary,
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      fontFamily: '"Inter", sans-serif'
                    }}>
                      {skill.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Terminal - Full Width Bottom */}
          <div className="col-span-12">
            <div className="p-6 rounded-xl relative overflow-hidden" style={{
              background: `linear-gradient(135deg, ${currentTheme.terminalBg}95, ${currentTheme.terminalHeader}30)`,
              border: `1px solid ${currentTheme.variable}20`,
              boxShadow: `0 8px 32px ${currentTheme.terminalBorder}15`,
              minHeight: '60vh'
            }}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `radial-gradient(circle at 20px 20px, ${currentTheme.variable} 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}></div>

              {/* Terminal Header */}
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 opacity-80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 opacity-80 animate-pulse"></div>
                </div>
                <h3 style={{
                  color: currentTheme.textPrimary,
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '1rem',
                  fontWeight: 700
                }}>
                  Portfolio Terminal
                </h3>
                <div className="flex-1 h-px" style={{
                  background: `linear-gradient(to right, ${currentTheme.variable}40, transparent)`
                }}></div>
              </div>

              {/* Terminal Content */}
              <div className="relative z-10 h-full">
                <Terminal className="w-full h-full" style={{
                  maxWidth: 'none',
                  minHeight: '50vh',
                  background: 'transparent'
                }} />
              </div>
            </div>
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