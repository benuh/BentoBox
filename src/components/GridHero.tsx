'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from '../contexts/ThemeContext'
import { themes } from '../utils/theme'

export default function GridHero() {
  const { theme } = useTheme()
  const currentTheme = themes[theme]

  // Add TV static effect styles
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes tv-static {
        0% {
          text-shadow:
            0 0 1px rgba(255,255,255,0.8),
            1px 1px 0px rgba(255,0,0,0.3),
            -1px -1px 0px rgba(0,255,0,0.3),
            1px -1px 0px rgba(0,0,255,0.3);
        }
        25% {
          text-shadow:
            0 0 2px rgba(255,255,255,0.9),
            -1px 1px 0px rgba(255,0,0,0.4),
            1px -1px 0px rgba(0,255,0,0.4),
            -1px 1px 0px rgba(0,0,255,0.4);
        }
        50% {
          text-shadow:
            0 0 1px rgba(255,255,255,1.0),
            1px -1px 0px rgba(255,0,0,0.5),
            -1px 1px 0px rgba(0,255,0,0.5),
            1px 1px 0px rgba(0,0,255,0.5);
        }
        75% {
          text-shadow:
            0 0 3px rgba(255,255,255,0.7),
            -1px -1px 0px rgba(255,0,0,0.3),
            1px 1px 0px rgba(0,255,0,0.3),
            -1px 1px 0px rgba(0,0,255,0.3);
        }
        100% {
          text-shadow:
            0 0 1px rgba(255,255,255,0.8),
            1px 1px 0px rgba(255,0,0,0.3),
            -1px -1px 0px rgba(0,255,0,0.3),
            1px -1px 0px rgba(0,0,255,0.3);
        }
      }

      @keyframes fade-in-up {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes text-glow {
        from {
          text-shadow:
            0 0 20px ${currentTheme.variable}60,
            0 0 40px ${currentTheme.variable}30,
            0 0 60px ${currentTheme.variable}20;
        }
        to {
          text-shadow:
            0 0 30px ${currentTheme.variable}80,
            0 0 50px ${currentTheme.variable}50,
            0 0 70px ${currentTheme.variable}30;
        }
      }

      @keyframes pulse-corner {
        0%, 100% {
          opacity: 0.3;
          transform: scale(1);
        }
        50% {
          opacity: 0.6;
          transform: scale(1.1);
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [currentTheme.variable])
  const [displayedName, setDisplayedName] = useState('')
  const [displayedTitle, setDisplayedTitle] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)

  const fullName = "BENJAMIN HU"
  const fullTitle = "Software Developer"

  useEffect(() => {
    // Typewriter effect for name
    let nameIndex = 0
    const nameInterval = setInterval(() => {
      if (nameIndex <= fullName.length) {
        setDisplayedName(fullName.slice(0, nameIndex))
        nameIndex++
      } else {
        clearInterval(nameInterval)
        // Start title typewriter after name is complete
        setTimeout(() => {
          let titleIndex = 0
          const titleInterval = setInterval(() => {
            if (titleIndex <= fullTitle.length) {
              setDisplayedTitle(fullTitle.slice(0, titleIndex))
              titleIndex++
            } else {
              clearInterval(titleInterval)
              // Hide cursor after everything is typed
              setTimeout(() => setShowCursor(false), 1000)
            }
          }, 80)
        }, 500)
      }
    }, 150)

    return () => clearInterval(nameInterval)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null)
    }

    if (activeDropdown !== null) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [activeDropdown])

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Grid of Interactive Boxes */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-3 gap-1 p-4">
        {(() => {
          const labels = ['WHO', 'PROJECTS', 'EXPERIENCE', 'GITHUB', 'LINKEDIN', 'X', 'INSTAGRAM', 'RESUME', 'INTRO', 'SKILLS']

          // Define specific positions for certain labels
          interface FixedPosition {
            boxIndex: number;
            corner: string;
            label?: string;
            type?: string;
            options?: Array<{ label: string; action: () => void }>;
            labels?: string[];
          }

          const fixedPositions: Record<string, FixedPosition> = {
            'HOME': { boxIndex: 0, corner: 'top-left', label: 'cd ~/' }, // First box (0-indexed: 0) - home navigation
            'EXPERIENCE': { boxIndex: 3, corner: 'bottom-left', label: 'EXP' }, // Row 1, Column 4 (0-indexed: 3) - left bottom align
            'WHO': { boxIndex: 8, corner: 'bottom-left' }, // Row 1, Column 9 (0-indexed: 8) - left align
            'RESUME': {
              boxIndex: 11,
              corner: 'top-left',
              type: 'dropdown',
              options: [
                { label: 'VIEW', action: () => window.open('/BH_Resume.pdf', '_blank') },
                { label: 'DOWNLOAD', action: () => {
                  const link = document.createElement('a');
                  link.href = '/BH_Resume.pdf';
                  link.download = 'Benjamin_Hu_Resume.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              ]
            }, // Row 1, Column 12 (0-indexed: 11) - top-right corner, left aligned, dropdown resume
            'SKILLS': { boxIndex: 22, corner: 'bottom-right' }, // Row 2, Column 11 (0-indexed: 22) - right bottom align
            'PROJECTS': { boxIndex: 26, corner: 'top-left' }, // Row 3, Column 3 (0-indexed: 26) - left top align
            'SOCIAL_MEDIA': {
              boxIndex: 35,
              corner: 'bottom-right',
              labels: ['GITHUB', 'LINKEDIN', 'X', 'INSTAGRAM']
            } // Row 3, Column 12 (0-indexed: 35) - all social media in one box
          }

          interface SelectedBox {
            label?: string;
            labels?: string[];
            boxIndex: number;
            corner: string;
            isMultiple?: boolean;
            isDropdown?: boolean;
            isClickable?: boolean;
            isScrollable?: boolean;
            scrollTarget?: string;
            options?: Array<{ label: string; action: () => void }>;
          }

          const selectedBoxes: SelectedBox[] = []
          const usedBoxes: number[] = []

          // First, place fixed position labels
          Object.entries(fixedPositions).forEach(([key, position]) => {
            if (position.labels) {
              // Multiple labels in one box
              selectedBoxes.push({
                labels: position.labels,
                boxIndex: position.boxIndex,
                corner: position.corner,
                isMultiple: true
              })
              // Mark all social media labels as used
              position.labels.forEach(label => {
                const labelIndex = labels.indexOf(label)
                if (labelIndex > -1) labels.splice(labelIndex, 1)
              })
            } else if (position.type === 'dropdown') {
              // Dropdown label
              selectedBoxes.push({
                label: key,
                boxIndex: position.boxIndex,
                corner: position.corner,
                isDropdown: true,
                options: position.options
              })
              const labelIndex = labels.indexOf(key)
              if (labelIndex > -1) labels.splice(labelIndex, 1)
            } else {
              // Single label (including HOME with custom label)
              selectedBoxes.push({
                label: position.label || key,
                boxIndex: position.boxIndex,
                corner: position.corner,
                isClickable: key === 'HOME',
                isScrollable: ['WHO', 'EXPERIENCE', 'SKILLS', 'PROJECTS'].includes(key),
                scrollTarget: key.toLowerCase()
              })
              const labelIndex = labels.indexOf(key)
              if (labelIndex > -1) labels.splice(labelIndex, 1)
            }
            usedBoxes.push(position.boxIndex)
          })

          // No random assignment - only use fixed positions

          return Array.from({ length: 36 }).map((_, i) => {
            const labelData = selectedBoxes.find(item => item.boxIndex === i)
            const hasLabel = !!labelData
            const isMultiple = labelData?.isMultiple
            const isDropdown = labelData?.isDropdown
            const isClickable = labelData?.isClickable
            const isScrollable = labelData?.isScrollable
            const scrollTarget = labelData?.scrollTarget
            const label = hasLabel ? (isMultiple ? null : labelData.label) : null
            const multipleLabels = hasLabel && isMultiple ? labelData.labels : null
            const dropdownOptions = hasLabel && isDropdown ? labelData.options : null
            const corner = hasLabel ? labelData.corner : null

            return (
              <div
                key={i}
                className="relative border border-white/5 hover:border-white/30 transition-all duration-500 cursor-pointer overflow-hidden group rounded-lg"
                style={{
                  animation: `fade-in-up 0.1s ease-out ${(i * 0.01)}s both`,
                  borderRadius: '0.75rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'
                  e.currentTarget.style.boxShadow = `
                    0 0 25px ${currentTheme.variable}50,
                    0 0 45px ${currentTheme.variable}25,
                    inset 0 0 25px rgba(255,255,255,0.15),
                    0 0 0 1px rgba(255,255,255,0.3)
                  `
                  e.currentTarget.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                {/* Luminous glow overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${currentTheme.variable}30 0%, ${currentTheme.variable}15 50%, transparent 70%)`,
                    filter: 'blur(8px)'
                  }}
                />
                {/* Inner glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${currentTheme.variable}20, transparent 50%, ${currentTheme.variable}10)`
                  }}
                />

                {/* Corner Label(s) */}
                {hasLabel && (
                  <div
                    className={`absolute z-10 ${
                      corner === 'top-left' ? 'top-3 left-3' :
                      corner === 'top-right' ? 'top-3 right-3' :
                      corner === 'bottom-left' ? 'bottom-3 left-3' :
                      'bottom-3 right-3'
                    }`}
                  >
                    {isMultiple ? (
                      <div className="flex flex-col gap-2 items-end text-right">
                        {multipleLabels?.map((multiLabel, idx) => {
                          const socialLinks: Record<string, string> = {
                            'GITHUB': 'https://github.com/benuh',
                            'LINKEDIN': 'https://www.linkedin.com/in/benjamin-hu-556104176/',
                            'X': 'https://x.com/benerichu',
                            'INSTAGRAM': 'https://www.instagram.com/benjamin.c.hu/#'
                          }

                          return (
                            <a
                              key={multiLabel}
                              href={socialLinks[multiLabel]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="transition-all duration-100 cursor-pointer inline-block"
                              style={{
                                fontFamily: '"JetBrains Mono", monospace',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                color: '#ffffff',
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                textDecoration: 'none'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.animation = 'tv-static 0.1s infinite'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.animation = 'none'
                              }}
                            >
                              {multiLabel}
                            </a>
                          )
                        })}
                      </div>
                    ) : isDropdown ? (
                      <div className="relative">
                        <span
                          className="transition-all duration-100 cursor-pointer inline-block"
                          style={{
                            fontFamily: '"JetBrains Mono", monospace',
                            fontSize: '0.9rem',
                            fontWeight: 700,
                            color: '#ffffff',
                            cursor: 'pointer',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase'
                          }}
                          onClick={() => setActiveDropdown(activeDropdown === i ? null : i)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.animation = 'tv-static 0.1s infinite'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.animation = 'none'
                          }}
                        >
                          {label}
                        </span>

                        {activeDropdown === i && (
                          <div
                            className="absolute z-30 py-1 w-full"
                            style={{
                              backgroundColor: 'transparent',
                              // Dynamic vertical positioning based on row
                              ...(Math.floor(i / 12) === 0 ?
                                { top: '100%', marginTop: '0.05rem' } : // Top row - dropdown down
                                Math.floor(i / 12) === 2 ?
                                { bottom: '100%', marginBottom: '0.05rem' } : // Bottom row - dropdown up
                                { top: '100%', marginTop: '0.05rem' } // Middle row - dropdown down
                              ),
                              // Match positioning with main label
                              left: '0',
                              right: '0'
                            }}
                          >
                            {dropdownOptions?.map((option, optionIdx) => (
                              <button
                                key={option.label}
                                className={`w-full py-1 transition-all duration-200 hover:bg-white/10 ${
                                  corner?.includes('left') ? 'text-left' :
                                  corner?.includes('right') ? 'text-right' :
                                  'text-center'
                                }`}
                                style={{
                                  fontFamily: '"JetBrains Mono", monospace',
                                  fontSize: '0.7rem',
                                  fontWeight: 600,
                                  color: '#ffffff',
                                  letterSpacing: '0.05em',
                                  backgroundColor: 'transparent',
                                  border: 'none',
                                  cursor: 'pointer',
                                  paddingLeft: corner?.includes('left') ? '0.25rem' : '0.75rem',
                                  paddingRight: corner?.includes('right') ? '0.5rem' : '0.75rem'
                                }}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  option.action()
                                  setActiveDropdown(null)
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.animation = 'tv-static 0.1s infinite'
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.animation = 'none'
                                }}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : isClickable ? (
                      <Link
                        href="/"
                        className="transition-all duration-100 cursor-pointer inline-block"
                        style={{
                          fontFamily: '"JetBrains Mono", monospace',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          color: '#ffffff',
                          letterSpacing: '0.1em',
                          textDecoration: 'none'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.animation = 'tv-static 0.1s infinite'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.animation = 'none'
                        }}
                      >
                        {label}
                      </Link>
                    ) : isScrollable ? (
                      <span
                        className="transition-all duration-100 cursor-pointer inline-block"
                        style={{
                          fontFamily: '"JetBrains Mono", monospace',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          color: '#ffffff',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase'
                        }}
                        onClick={() => scrollTarget && scrollToSection(scrollTarget)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.animation = 'tv-static 0.1s infinite'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.animation = 'none'
                        }}
                      >
                        {label}
                      </span>
                    ) : (
                      <span
                        className="transition-all duration-100 cursor-pointer inline-block"
                        style={{
                          fontFamily: '"JetBrains Mono", monospace',
                          fontSize: '0.9rem',
                          fontWeight: 700,
                          color: '#ffffff',
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.animation = 'tv-static 0.1s infinite'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.animation = 'none'
                        }}
                      >
                        {label}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )
          })
        })()}
      </div>

      {/* Central Name Display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        <div className="text-center">
          <h1 style={{
            fontFamily: '"Inter", sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            color: '#ffffff',
            margin: 0,
            letterSpacing: '-0.02em',
            textShadow: `
              0 0 20px ${currentTheme.variable}60,
              0 0 40px ${currentTheme.variable}30,
              0 0 60px ${currentTheme.variable}20
            `,
            animation: 'text-glow 3s ease-in-out infinite alternate'
          }}>
            {displayedName}
            {showCursor && displayedName.length < fullName.length && (
              <span className="animate-pulse">|</span>
            )}
          </h1>
          <div className="mt-4">
            <p style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 'clamp(0.9rem, 2vw, 1.4rem)',
              color: '#cccccc',
              margin: 0,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              opacity: 0.9
            }}>
              {displayedTitle}
              {showCursor && displayedTitle.length < fullTitle.length && displayedName.length >= fullName.length && (
                <span className="animate-pulse">|</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Animated Corner Accents */}
      <div className="absolute top-0 left-0 w-20 h-20 opacity-30" style={{
        background: `linear-gradient(135deg, ${currentTheme.variable}60, transparent)`,
        clipPath: 'polygon(0 0, 100% 0, 0 100%)',
        animation: 'pulse-corner 4s ease-in-out infinite'
      }}></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 opacity-30" style={{
        background: `linear-gradient(315deg, ${currentTheme.variable}60, transparent)`,
        clipPath: 'polygon(100% 100%, 0 100%, 100% 0)',
        animation: 'pulse-corner 4s ease-in-out infinite 2s'
      }}></div>
    </>
  )
}