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

        {/* Desktop Layout - Redesigned */}
        <div className="hidden md:flex flex-col h-full min-h-screen">
          {/* Top Section - Profile Header with Tech Aesthetic */}
          <div className="relative flex items-center justify-between px-8 py-6 overflow-hidden" style={{
            background: `linear-gradient(135deg, ${currentTheme.terminalHeader}15, ${currentTheme.terminalBg}25)`,
            borderBottom: `2px solid ${currentTheme.variable}40`,
            boxShadow: `0 4px 20px ${currentTheme.terminalBorder}30`
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

          {/* Main Content - Two Column Layout */}
          <div className="flex-1 flex">
            {/* Left Column - Experience & Skills with Tech Styling */}
            <div className="w-80 flex-shrink-0 p-6 overflow-y-auto relative" style={{
              background: `linear-gradient(180deg, ${currentTheme.terminalHeader}08, ${currentTheme.terminalBg}15)`,
              borderRight: `2px solid ${currentTheme.variable}20`,
              backdropFilter: 'blur(10px)'
            }}>
              {/* Matrix-style side decoration */}
              <div className="absolute left-0 top-0 w-1 h-full opacity-50" style={{
                background: `linear-gradient(to bottom, ${currentTheme.variable}00, ${currentTheme.variable}, ${currentTheme.variable}00)`,
                animation: 'pulse 2s ease-in-out infinite alternate'
              }}></div>

              {/* Current Status with Enhanced Styling */}
              <div className="mb-6 p-4 rounded-lg relative overflow-hidden" style={{
                backgroundColor: currentTheme.terminalBg + '80',
                border: `2px solid ${currentTheme.variable}30`,
                boxShadow: `0 8px 25px ${currentTheme.terminalBorder}20`,
                backdropFilter: 'blur(5px)'
              }}>
                {/* Animated border gradient */}
                <div className="absolute inset-0 rounded-lg opacity-30" style={{
                  background: `linear-gradient(45deg, ${currentTheme.variable}20, transparent, ${currentTheme.variable}20)`,
                  animation: 'gradient-shift 3s ease-in-out infinite'
                }}></div>

                <div className="flex items-center gap-3 mb-3 relative z-10">
                  <div className="relative">
                    <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse flex items-center justify-center" style={{
                      boxShadow: '0 0 10px #10B981'
                    }}>
                      <span className="w-1 h-1 rounded-full bg-white"></span>
                    </span>
                    <span className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping opacity-30"></span>
                  </div>
                  <span style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '0.9rem',
                    color: currentTheme.variable,
                    fontWeight: 700,
                    letterSpacing: '0.05em'
                  }}>
                    SYSTEM.STATUS: ONLINE
                  </span>
                </div>
                <p className="relative z-10" style={{
                  fontSize: '0.8rem',
                  color: currentTheme.textSecondary,
                  fontFamily: '"JetBrains Mono", monospace',
                  lineHeight: '1.6'
                }}>
                  <span style={{ color: currentTheme.variable }}>{'>'}</span> Seeking opportunities in AI/ML, fintech, and full-stack development
                </p>

                {/* Tech readout style decoration */}
                <div className="flex gap-1 mt-3 relative z-10">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-1 rounded-full animate-pulse"
                      style={{
                        backgroundColor: i % 2 === 0 ? currentTheme.variable : currentTheme.textSecondary,
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: '1.5s'
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Experience Timeline with Tech Enhancement */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{
                    backgroundColor: currentTheme.variable + '20',
                    border: `1px solid ${currentTheme.variable}50`
                  }}>
                    <span style={{ fontSize: '0.8rem' }}>💻</span>
                  </div>
                  <h3 style={{
                    color: currentTheme.variable,
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '1rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}>
                    Experience.Log
                  </h3>
                  <div className="flex-1 h-px" style={{
                    background: `linear-gradient(to right, ${currentTheme.variable}60, transparent)`
                  }}></div>
                </div>

                <div className="space-y-3 relative">
                  {/* Timeline Line */}
                  <div className="absolute left-4 top-0 w-0.5 h-full" style={{
                    background: `linear-gradient(to bottom, ${currentTheme.variable}60, ${currentTheme.variable}20, transparent)`
                  }}></div>

                  {/* Experience Cards */}
                  {[
                    { company: 'Vantage Risk', role: 'Full Stack Engineer', period: 'Jan 2024 - Present', status: 'ACTIVE', accent: '#10B981' },
                    { company: 'Theom.AI', role: 'Full Stack Engineer', period: 'Apr 2023 - Dec 2023', status: 'COMPLETED', accent: '#3B82F6' },
                    { company: 'UC Irvine', role: 'Research Assistant', period: 'Jul 2021 - Jun 2022', status: 'COMPLETED', accent: '#8B5CF6' }
                  ].map((exp, i) => (
                    <div key={i} className="relative pl-8 group">
                      {/* Timeline dot */}
                      <div className="absolute left-2.5 top-3 w-3 h-3 rounded-full border-2 group-hover:scale-125 transition-transform duration-200" style={{
                        backgroundColor: exp.accent,
                        borderColor: currentTheme.terminalBg,
                        boxShadow: `0 0 10px ${exp.accent}40`
                      }}></div>

                      <div className="p-4 rounded-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-105" style={{
                        backgroundColor: currentTheme.terminalBg + '60',
                        border: `1px solid ${currentTheme.terminalBorder}40`,
                        borderLeftColor: exp.accent + '60',
                        borderLeftWidth: '3px',
                        boxShadow: `0 4px 15px ${currentTheme.terminalBorder}20`
                      }}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-semibold" style={{
                            color: currentTheme.textPrimary,
                            fontSize: '0.9rem',
                            fontFamily: '"JetBrains Mono", monospace'
                          }}>
                            {exp.company}
                          </div>
                          <span className="px-2 py-1 text-xs rounded-full" style={{
                            backgroundColor: exp.accent + '20',
                            color: exp.accent,
                            fontFamily: '"JetBrains Mono", monospace',
                            fontWeight: 600
                          }}>
                            {exp.status}
                          </span>
                        </div>
                        <div style={{
                          color: currentTheme.variable,
                          fontSize: '0.8rem',
                          fontFamily: '"JetBrains Mono", monospace',
                          marginBottom: '0.25rem'
                        }}>
                          {exp.role}
                        </div>
                        <div className="flex items-center gap-2">
                          <span style={{
                            color: currentTheme.textSecondary,
                            fontSize: '0.75rem',
                            fontFamily: '"JetBrains Mono", monospace'
                          }}>
                            {exp.period}
                          </span>
                          <div className="flex gap-1">
                            {[...Array(3)].map((_, j) => (
                              <div
                                key={j}
                                className="w-1 h-1 rounded-full opacity-60"
                                style={{
                                  backgroundColor: exp.accent,
                                  animation: `pulse 1.5s ease-in-out infinite`,
                                  animationDelay: `${j * 0.3}s`
                                }}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Skills Section */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{
                    backgroundColor: currentTheme.variable + '20',
                    border: `1px solid ${currentTheme.variable}50`
                  }}>
                    <span style={{ fontSize: '0.8rem' }}>⚡</span>
                  </div>
                  <h3 style={{
                    color: currentTheme.variable,
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '1rem',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}>
                    Tech.Stack
                  </h3>
                  <div className="flex-1 h-px" style={{
                    background: `linear-gradient(to right, ${currentTheme.variable}60, transparent)`
                  }}></div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Python', level: 95, icon: '🐍' },
                    { name: 'React', level: 90, icon: '⚛️' },
                    { name: 'AI/ML', level: 85, icon: '🤖' },
                    { name: 'Node.js', level: 88, icon: '📗' },
                    { name: 'Docker', level: 82, icon: '🐳' },
                    { name: 'AWS', level: 80, icon: '☁️' }
                  ].map((skill, i) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-lg backdrop-blur-sm group hover:scale-105 transition-all duration-300"
                      style={{
                        backgroundColor: currentTheme.terminalBg + '40',
                        border: `1px solid ${currentTheme.variable}30`,
                        boxShadow: `0 2px 10px ${currentTheme.terminalBorder}20`
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span style={{ fontSize: '0.8rem' }}>{skill.icon}</span>
                          <span style={{
                            fontFamily: '"JetBrains Mono", monospace',
                            fontSize: '0.8rem',
                            color: currentTheme.textPrimary,
                            fontWeight: 600
                          }}>
                            {skill.name}
                          </span>
                        </div>
                        <span style={{
                          fontSize: '0.7rem',
                          color: currentTheme.variable,
                          fontFamily: '"JetBrains Mono", monospace'
                        }}>
                          {skill.level}%
                        </span>
                      </div>

                      {/* Skill Progress Bar */}
                      <div className="w-full h-1 rounded-full overflow-hidden" style={{
                        backgroundColor: currentTheme.terminalBorder + '30'
                      }}>
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${skill.level}%`,
                            background: `linear-gradient(90deg, ${currentTheme.variable}80, ${currentTheme.variable})`,
                            boxShadow: `0 0 10px ${currentTheme.variable}60`,
                            animation: `skill-load-${i} 2s ease-out`
                          }}
                        ></div>
                      </div>

                      {/* Binary decoration */}
                      <div className="mt-2 opacity-30 text-xs" style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        color: currentTheme.textSecondary,
                        fontSize: '0.6rem',
                        lineHeight: 1
                      }}>
                        {Math.random().toString(2).substr(2, 8)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* System Resource Monitor Style */}
                <div className="mt-4 p-3 rounded-lg" style={{
                  backgroundColor: currentTheme.terminalBg + '30',
                  border: `1px solid ${currentTheme.variable}20`
                }}>
                  <div className="flex items-center justify-between text-xs" style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    color: currentTheme.textSecondary
                  }}>
                    <span>SKILL.METRICS</span>
                    <div className="flex gap-2">
                      <span style={{ color: currentTheme.variable }}>CPU: 85%</span>
                      <span style={{ color: '#10B981' }}>MEM: 78%</span>
                      <span style={{ color: '#F59E0B' }}>NET: 92%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Enhanced Terminal/Projects */}
            <div className="flex-1 flex items-center justify-center p-6 relative">
              {/* Background Tech Grid */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `
                  linear-gradient(${currentTheme.variable}20 1px, transparent 1px),
                  linear-gradient(90deg, ${currentTheme.variable}20 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px',
                animation: 'grid-drift 30s linear infinite'
              }}></div>

              {/* Floating Tech Elements */}
              <div className="absolute top-10 right-10 opacity-20 text-4xl animate-pulse" style={{
                animationDuration: '4s',
                color: currentTheme.variable
              }}>
                {'{ }'}
              </div>
              <div className="absolute bottom-20 left-10 opacity-15 text-2xl" style={{
                fontFamily: '"JetBrains Mono", monospace',
                color: currentTheme.variable,
                animation: 'float 6s ease-in-out infinite'
              }}>
                &lt;/&gt;
              </div>

              {/* Main Terminal Container */}
              <div className="relative w-full h-full max-h-[80vh] rounded-lg overflow-hidden" style={{
                boxShadow: `
                  0 25px 50px -12px ${currentTheme.terminalBorder}40,
                  0 0 0 1px ${currentTheme.variable}20,
                  inset 0 1px 0 ${currentTheme.variable}10
                `,
                background: `linear-gradient(135deg, ${currentTheme.terminalBg}95, ${currentTheme.terminalHeader}30)`
              }}>
                {/* Terminal Header Enhancement */}
                <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-between px-4 z-10" style={{
                  background: `linear-gradient(90deg, ${currentTheme.terminalHeader}, ${currentTheme.terminalHeader}80)`,
                  borderBottom: `2px solid ${currentTheme.variable}30`
                }}>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 opacity-80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 opacity-80 animate-pulse"></div>
                  </div>
                  <div style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '0.7rem',
                    color: currentTheme.textSecondary,
                    letterSpacing: '0.05em'
                  }}>
                    benjamin@devbox:~$
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: currentTheme.variable }}></div>
                    <div className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: currentTheme.variable, animationDelay: '0.3s' }}></div>
                    <div className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: currentTheme.variable, animationDelay: '0.6s' }}></div>
                  </div>
                </div>

                {/* Enhanced Terminal Component */}
                <div className="pt-8">
                  <Terminal className="w-full h-full" style={{
                    maxWidth: 'none',
                    maxHeight: 'calc(80vh - 2rem)',
                    background: 'transparent'
                  }} />
                </div>

                {/* Scan line effect */}
                <div className="absolute top-0 left-0 right-0 h-0.5 opacity-30" style={{
                  background: `linear-gradient(90deg, transparent, ${currentTheme.variable}, transparent)`,
                  animation: 'scanline 3s ease-in-out infinite'
                }}></div>
              </div>

              {/* Corner Tech Decorations */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-10" style={{
                background: `radial-gradient(circle, ${currentTheme.variable}40, transparent)`,
                clipPath: 'polygon(100% 0, 0 0, 100% 100%)'
              }}></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 opacity-10" style={{
                background: `radial-gradient(circle, ${currentTheme.variable}40, transparent)`,
                clipPath: 'polygon(0 100%, 0 0, 100% 100%)'
              }}></div>
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