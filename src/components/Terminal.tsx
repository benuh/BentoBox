'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { themes } from '../utils/theme'

interface TerminalProps {
  className?: string
  style?: React.CSSProperties
}

export default function Terminal({ className, style }: TerminalProps) {
  const { theme } = useTheme()
  const currentTheme = themes[theme]
  const [activeTab, setActiveTab] = useState('intro')
  const [skillsInput, setSkillsInput] = useState('')
  const [skillsOutput, setSkillsOutput] = useState('all')
  const [showAutocomplete, setShowAutocomplete] = useState(false)
  const [selectedOption, setSelectedOption] = useState(0)
  const [typedContent, setTypedContent] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [expandedProject, setExpandedProject] = useState<string | null>(null)

  const tabs = [
    { id: 'intro', name: 'intro.md', active: true },
    { id: 'skills', name: 'skills.py', active: false },
    { id: 'projects', name: 'projects.html', active: false }
  ]

  const skillsData = useMemo(() => ({
    languages: [
      "Python", "JavaScript", "TypeScript",
      "C", "C++", "C#", "Java", "Swift",
      "Go", "R", "Verilog"
    ],
    frontend: [
      "React", "Vue.js", "Angular", "Redux",
      "Three.js", "Tailwind CSS", "Vite"
    ],
    backend: [
      "Node.js", "Django", "Flask",
      "SpringBoot", "ASP.NET"
    ],
    databases: [
      "MySQL", "PostgreSQL", "MongoDB"
    ],
    cloud_devops: [
      "AWS", "Google Cloud",
      "Kubernetes", "Docker"
    ],
    ai_ml: [
      "TensorFlow", "PyTorch", "OpenCV"
    ],
    specialized: [
      "Full Stack", "Cryptography", "Operational Research",
      "Physical Modeling", "OpenGL",
      "Computer Vision", "Computer Graphics"
    ]
  }), [])

  // Get filtered autocomplete options
  const getAutocompleteOptions = () => {
    const availableKeys = [...Object.keys(skillsData), 'all']
    if (!skillsInput) return availableKeys
    return availableKeys.filter(key =>
      key.toLowerCase().includes(skillsInput.toLowerCase())
    )
  }

  const handleSkillsSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const options = getAutocompleteOptions()

    if (e.key === 'Enter') {
      e.preventDefault()
      let input = skillsInput.toLowerCase().trim()

      // If there are autocomplete options and user hasn't typed a complete match
      if (showAutocomplete && options.length > 0 && selectedOption < options.length) {
        input = options[selectedOption].toLowerCase()
      }

      if (input === '' || input === 'skills' || input === 'all') {
        setSkillsOutput('all')
      } else if (skillsData[input as keyof typeof skillsData]) {
        setSkillsOutput(input)
      } else {
        setSkillsOutput('error')
      }
      setSkillsInput('')
      setShowAutocomplete(false)
      setSelectedOption(0)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (showAutocomplete && selectedOption < options.length - 1) {
        setSelectedOption(selectedOption + 1)
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (showAutocomplete && selectedOption > 0) {
        setSelectedOption(selectedOption - 1)
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      if (showAutocomplete && options.length > 0) {
        setSkillsInput(options[selectedOption])
        setShowAutocomplete(false)
        setSelectedOption(0)
      }
    } else if (e.key === 'Escape') {
      setShowAutocomplete(false)
      setSelectedOption(0)
    }
  }

  // Generate content string for typewriter effect
  const generateSkillsContent = useCallback((outputType: string) => {
    if (outputType === 'all') {
      let content = 'skills = {\n'
      Object.entries(skillsData).forEach(([key, values], index) => {
        // More compact format - all skills on one line per category
        const skillsStr = values.map(skill => `"${skill}"`).join(', ')
        content += `  "${key}": [${skillsStr}]${index < Object.entries(skillsData).length - 1 ? ',' : ''}\n`
      })
      content += '}\n'
      return content
    } else if (outputType !== 'error' && skillsData[outputType as keyof typeof skillsData]) {
      const skills = skillsData[outputType as keyof typeof skillsData]
      const skillsStr = skills.map(skill => `"${skill}"`).join(', ')
      const content = `skills["${outputType}"] = [${skillsStr}]\n`
      return content
    } else if (outputType === 'error') {
      return `KeyError: Invalid key. Available keys: ${Object.keys(skillsData).join(', ')}\n`
    }
    return ''
  }, [skillsData])

  // Typewriter effect
  useEffect(() => {
    if (activeTab === 'skills') {
      const content = generateSkillsContent(skillsOutput)
      setIsTyping(true)
      setTypedContent('')

      let currentIndex = 0
      const typeInterval = setInterval(() => {
        if (currentIndex >= content.length) {
          setIsTyping(false)
          clearInterval(typeInterval)
          return
        }
        setTypedContent(content.slice(0, currentIndex + 1))
        currentIndex += 1
      }, 1) // Adjust speed here (lower = faster)

      return () => clearInterval(typeInterval)
    }
  }, [skillsOutput, activeTab, generateSkillsContent])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSkillsInput(value)

    const options = getAutocompleteOptions()
    setShowAutocomplete(value.length > 0 && options.length > 0)
    setSelectedOption(0)
  }

  return (
    <div className={`rounded-lg overflow-hidden ${theme === 'dark' ? 'shadow-2xl' : 'shadow-sm'} ${className}`}
         style={{ backgroundColor: currentTheme.terminalBg, border: `1px solid ${currentTheme.terminalBorder}`, ...style }}>
      {/* Terminal Header */}
      <div className="px-4 py-3 flex items-center justify-between"
           style={{ backgroundColor: currentTheme.terminalHeader, borderBottom: `1px solid ${currentTheme.terminalBorder}` }}>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentTheme.terminalDots.red }}></div>
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentTheme.terminalDots.yellow }}></div>
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: currentTheme.terminalDots.green }}></div>
        </div>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '12px',
          color: currentTheme.textMuted
        }}>
          benjamin@portfolio:~
        </div>
      </div>

      {/* Tab Bar */}
      <div className="flex" style={{ backgroundColor: currentTheme.terminalHeader, borderBottom: `1px solid ${currentTheme.terminalBorder}` }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-4 py-2 text-sm transition-colors"
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '12px',
              backgroundColor: activeTab === tab.id ? currentTheme.terminalTabActive : currentTheme.terminalTab,
              color: activeTab === tab.id ? currentTheme.textPrimary : currentTheme.textMuted,
              borderRight: `1px solid ${currentTheme.terminalBorder}`,
              borderBottom: activeTab === tab.id ? `2px solid ${currentTheme.textPrimary}` : 'none'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.color = currentTheme.textSecondary
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.currentTarget.style.color = currentTheme.textMuted
              }
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Terminal Content */}
      <div className="p-6 h-[500px] overflow-y-auto">
        {activeTab === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '14px',
              lineHeight: '1.6',
              color: currentTheme.textPrimary
            }}>
              <div className="mb-4" style={{ color: currentTheme.command }}>
                $ cat intro.md
              </div>

              <div className="space-y-4">
                <div className="text-lg font-medium" style={{ color: currentTheme.variable }}>
                  # Hello! Welcome to my World 👋
                </div>

                <div style={{ color: currentTheme.textSecondary }}>
                  <div className="mb-3">
                    <span style={{ color: currentTheme.keyword }}>const</span>{' '}
                    <span style={{ color: currentTheme.variable }}>philosophy</span> = {'{'}
                  </div>
                  <div className="pl-4 space-y-2">
                    <div>
                      <span style={{ color: currentTheme.command }}>build:</span>{' '}
                      <span style={{ color: currentTheme.string }}>&quot;thoughtful solutions&quot;</span>,
                    </div>
                    <div>
                      <span style={{ color: currentTheme.command }}>create:</span>{' '}
                      <span style={{ color: currentTheme.string }}>&quot;with intention and care&quot;</span>,
                    </div>
                    <div>
                      <span style={{ color: currentTheme.command }}>think:</span>{' '}
                      <span style={{ color: currentTheme.string }}>&quot;from angles and dimensions&quot;</span>
                    </div>
                  </div>
                  <div className="mt-3">{'}'}</div>
                </div>

                <div className="mt-6" style={{ color: currentTheme.textMuted }}>
                  <div className="mb-2">
                    <span style={{ color: currentTheme.comment }}>{'//'}</span> Always learning, always building
                  </div>
                  <div>
                    <span style={{ color: currentTheme.comment }}>{'//'}</span> Let&apos;s create something amazing together
                  </div>
                </div>

                <div className="mt-6" style={{ color: currentTheme.cursor }}>
                  <span className="animate-pulse">▊</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'skills' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '12px',
              lineHeight: '1.6',
              color: currentTheme.textPrimary
            }}
          >
            <div className="text-green-400 mb-4">
              $ python3 skills.py
            </div>

            <div className="space-y-4">
              <div className="text-gray-400">
                <div className="text-green-300"># Interactive Python Shell</div>
                <div className="text-green-300"># Try: skills[&quot;languages&quot;] or type a key name</div>
              </div>

              <div className="mb-4 relative">
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">&gt;&gt;&gt; skills[</span>
                  <input
                    type="text"
                    value={skillsInput}
                    onChange={handleInputChange}
                    onKeyDown={handleSkillsSubmit}
                    className="bg-transparent text-orange-300 outline-none flex-1"
                    placeholder="key_name # type 'all' for all skills"
                    style={{ fontFamily: '"JetBrains Mono", monospace' }}
                  />
                  <span className="text-green-400">]</span>
                </div>

                {/* Autocomplete Dropdown */}
                {showAutocomplete && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-600 rounded shadow-lg z-10">
                    {getAutocompleteOptions().map((option, index) => (
                      <div
                        key={option}
                        className={`px-3 py-2 cursor-pointer transition-colors ${
                          index === selectedOption
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-300 hover:bg-gray-700'
                        }`}
                        style={{
                          fontFamily: '"JetBrains Mono", monospace',
                          fontSize: '12px'
                        }}
                        onClick={() => {
                          setSkillsInput(option)
                          setShowAutocomplete(false)
                          setSelectedOption(0)
                        }}
                      >
                        <span className="text-cyan-400">&quot;{option}&quot;</span>
                        {option === 'all' && (
                          <span className="text-gray-500 ml-2"># show all skills</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Typewriter Output */}
              <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed" style={{ color: currentTheme.textSecondary }}>
                {typedContent.split('\n').map((line, index) => {
                  // Determine line type and apply appropriate styling
                  let styledLine = line

                  if (line.includes('skills') && line.includes('=')) {
                    // Main skills declaration
                    styledLine = line.replace(/^(\s*)skills/, `$1<span style="color: ${currentTheme.variable}; font-weight: 600;">skills</span>`)
                  } else if (line.includes('":') && line.includes('[') && !line.includes('skills')) {
                    // Compact format: "key": [values] on one line
                    // First highlight the key with a distinct color
                    styledLine = line.replace(/"([^"]+)":\s*\[/, `<span style="color: ${currentTheme.variable}; font-weight: 600;">"$1"</span><span style="color: ${currentTheme.textSecondary};">:</span> <span style="color: ${currentTheme.textSecondary};">[</span>`)
                    // Then highlight all the skill values with alternating colors for better readability
                    styledLine = styledLine.replace(/\[([^\]]+)\]/, (match: string, content: string) => {
                      const skills = content.split(',').map((skill: string) => skill.trim())
                      const highlightedSkills = skills.map((skill: string, index: number) => {
                        // Alternate between string color and a slightly different shade for better readability
                        const color = index % 2 === 0 ? currentTheme.string : currentTheme.keyword
                        return skill.replace(/"([^"]+)"/, `<span style="color: ${color}; font-weight: 500;">"$1"</span>`)
                      })
                      return `${highlightedSkills.join('<span style="color: ' + currentTheme.textSecondary + ';">, </span>')}<span style="color: ${currentTheme.textSecondary};">]</span>`
                    })
                  } else if (line.includes('[') && line.includes(']') && line.includes('"') && !line.includes('KeyError') && !line.includes(':')) {
                    // Single line skill arrays (for individual category queries)
                    // Highlight the skills["key"] part first
                    styledLine = line.replace(/skills\["([^"]+)"\]/, `<span style="color: ${currentTheme.variable}; font-weight: 600;">skills</span><span style="color: ${currentTheme.textSecondary};">[</span><span style="color: ${currentTheme.command}; font-weight: 500;">"$1"</span><span style="color: ${currentTheme.textSecondary};">]</span>`)
                    // Then highlight the array content with alternating colors
                    styledLine = styledLine.replace(/=\s*\[([^\]]+)\]/, (match: string, content: string) => {
                      const skills = content.split(',').map((skill: string) => skill.trim())
                      const highlightedSkills = skills.map((skill: string, index: number) => {
                        const color = index % 2 === 0 ? currentTheme.string : currentTheme.keyword
                        return skill.replace(/"([^"]+)"/, `<span style="color: ${color}; font-weight: 500;">"$1"</span>`)
                      })
                      return ` <span style="color: ${currentTheme.textSecondary};">=</span> <span style="color: ${currentTheme.textSecondary};">[</span>${highlightedSkills.join('<span style="color: ' + currentTheme.textSecondary + ';">, </span>')}<span style="color: ${currentTheme.textSecondary};">]</span>`
                    })
                  } else if (line.includes('KeyError') || line.includes('Available keys')) {
                    // Error messages
                    styledLine = `<span style="color: ${currentTheme.error};">${line}</span>`
                  }

                  return (
                    <div key={index} className="min-h-[1.2em]">
                      <span dangerouslySetInnerHTML={{ __html: styledLine || '&nbsp;' }} />
                    </div>
                  )
                })}
                {isTyping && (
                  <span style={{ color: currentTheme.cursor }} className="animate-pulse">▊</span>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '12px',
              lineHeight: '1.6',
              color: currentTheme.textPrimary
            }}
          >
            <div className="mb-4" style={{ color: currentTheme.command }}>
              $ open projects.html
            </div>

            <div className="space-y-6">
              {/* Project 1: MiniGPT */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="border-l-2 pl-4"
                style={{ borderColor: currentTheme.cursor }}
              >
                <div className="mb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold" style={{ color: currentTheme.variable }}>
                      MiniGPT
                    </h3>
                    <span className="px-2 py-1 text-xs rounded flex items-center gap-1" style={{
                      backgroundColor: currentTheme.cursor,
                      color: currentTheme.terminalBg,
                      fontWeight: '500'
                    }}>
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{
                        backgroundColor: currentTheme.terminalBg
                      }}></span>
                      Active Development
                    </span>
                  </div>
                  <div className="mb-2 space-y-1">
                    <div>
                      <span style={{ color: currentTheme.keyword }}>Educational Framework:</span>{' '}
                      <a
                        href="https://github.com/benuh/MiniGPT"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline transition-colors"
                        style={{ color: currentTheme.string }}
                      >
                        github.com/benuh/MiniGPT
                      </a>
                    </div>
                    <div>
                      <span style={{ color: currentTheme.keyword }}>Production Backend:</span>{' '}
                      <a
                        href="https://github.com/benuh/llm-chatbot-backend"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline transition-colors"
                        style={{ color: currentTheme.string }}
                      >
                        github.com/benuh/llm-chatbot-backend
                      </a>
                    </div>
                  </div>
                  <div className="mb-3" style={{ color: currentTheme.textSecondary, lineHeight: '1.5' }}>
                    Dual-approach AI project: educational transformer implementation from scratch in PyTorch, plus production chatbot
                    backend achieving 300+ tokens/sec via Groq API. The first taught me multi-head attention and positional embeddings;
                    the second handles real conversations with multiple LLM providers. Bridging theory and practice in modern AI development.
                  </div>
                  <div className="mb-3" style={{ color: currentTheme.textMuted, fontSize: '11px', fontStyle: 'italic' }}>
                    📚 Detailed architecture references and implementation guides available on the{' '}
                    <span style={{ color: currentTheme.string, fontFamily: '"JetBrains Mono", monospace' }}>CoreInfrastructure</span> page
                  </div>

                  <button
                    onClick={() => setExpandedProject(expandedProject === 'minigpt' ? null : 'minigpt')}
                    className="mb-3 text-xs hover:underline transition-colors flex items-center gap-1"
                    style={{ color: currentTheme.command }}
                  >
                    <span>{expandedProject === 'minigpt' ? '▼' : '▶'}</span>
                    {expandedProject === 'minigpt' ? 'Hide Platform Details' : 'Show AI/ML Platform Architecture'}
                  </button>

                  {expandedProject === 'minigpt' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 p-3 rounded"
                      style={{
                        backgroundColor: currentTheme.terminalHeader,
                        border: `1px solid ${currentTheme.terminalBorder}`,
                        fontSize: '11px',
                        lineHeight: '1.4'
                      }}
                    >
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🎓 Educational Framework (MiniGPT)
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.keyword }}>Multi-head attention</span> with causal masking implementation</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Learned position embeddings</span> for sequence understanding</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>GELU activation</span> functions with layer normalization</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Modular transformer blocks</span> (~87K parameters, 4 layers)</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Interactive training</span> with W&B monitoring and experimentation</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🚀 Production Backend (LLM Chatbot)
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.string }}>FastAPI framework</span> with professional REST API design</li>
                            <li>• <span style={{ color: currentTheme.string }}>Multi-provider support</span> (OpenRouter, Groq) with runtime switching</li>
                            <li>• <span style={{ color: currentTheme.string }}>Ultra-fast inference</span> up to 300+ tokens/second with Groq</li>
                            <li>• <span style={{ color: currentTheme.string }}>Multiple LLMs</span> (DeepSeek, Llama 3.3 70B, Gemma 2, Mixtral 8x7B)</li>
                            <li>• <span style={{ color: currentTheme.string }}>Conversation management</span> with 128K token context windows</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🔄 Integrated Architecture
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.cursor }}>Educational-to-production</span> workflow demonstration</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Custom model training</span> with production deployment pipeline</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Docker containerization</span> with Kubernetes orchestration</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Interactive CLI client</span> and web interface components</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            ⚡ Key Platform Features
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.comment }}>Free AI model integration</span> for cost-effective development</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Temperature & sampling controls</span> for response customization</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Comprehensive error handling</span> and monitoring systems</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Real-time chat interface</span> with context preservation</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      PyTorch
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      FastAPI
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Transformers
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      LLM Integration
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      React
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Docker
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      OpenRouter
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Groq
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Project 2: Stem Cell Therapy Analysis */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="border-l-2 pl-4"
                style={{ borderColor: currentTheme.cursor }}
              >
                <div className="mb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold" style={{ color: currentTheme.variable }}>
                      Stem Cell Therapy Analysis
                    </h3>
                    <span className="px-2 py-1 text-xs rounded flex items-center gap-1" style={{
                      backgroundColor: currentTheme.cursor,
                      color: currentTheme.terminalBg,
                      fontWeight: '500'
                    }}>
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{
                        backgroundColor: currentTheme.terminalBg
                      }}></span>
                      Active Development
                    </span>
                  </div>
                  <div className="mb-2">
                    <span style={{ color: currentTheme.keyword }}>Repository:</span>{' '}
                    <a
                      href="https://github.com/benuh/stem-cell-therapy-analysis"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline transition-colors"
                      style={{ color: currentTheme.string }}
                    >
                      github.com/benuh/stem-cell-therapy-analysis
                    </a>
                  </div>
                  <div className="mb-3" style={{ color: currentTheme.textSecondary, lineHeight: '1.5' }}>
                    Clinical research project analyzing 750+ patients across 15 stem cell therapy trials. Built predictive models using
                    Bayesian meta-analysis and survival analysis, achieving 85% accuracy in treatment response prediction. Combined traditional
                    biostatistics with machine learning to identify patient subgroups most likely to benefit from therapy.
                  </div>

                  <button
                    onClick={() => setExpandedProject(expandedProject === 'stemcell' ? null : 'stemcell')}
                    className="mb-3 text-xs hover:underline transition-colors flex items-center gap-1"
                    style={{ color: currentTheme.command }}
                  >
                    <span>{expandedProject === 'stemcell' ? '▼' : '▶'}</span>
                    {expandedProject === 'stemcell' ? 'Hide Clinical Details' : 'Show Research Analytics'}
                  </button>

                  {expandedProject === 'stemcell' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 p-3 rounded"
                      style={{
                        backgroundColor: currentTheme.terminalHeader,
                        border: `1px solid ${currentTheme.terminalBorder}`,
                        fontSize: '11px',
                        lineHeight: '1.4'
                      }}
                    >
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🧬 Clinical Trial Analysis
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.keyword }}>Bayesian meta-analysis</span> for treatment efficacy assessment</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Survival analysis</span> with Kaplan-Meier estimators</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Hypothesis testing</span> for statistical significance evaluation</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Anomaly detection</span> for identifying unusual trial patterns</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🤖 Machine Learning Pipeline
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.string }}>15+ predictive algorithms</span> for treatment outcome forecasting</li>
                            <li>• <span style={{ color: currentTheme.string }}>Pattern recognition</span> for identifying successful therapy protocols</li>
                            <li>• <span style={{ color: currentTheme.string }}>Cross-validation techniques</span> achieving 85% prediction accuracy</li>
                            <li>• <span style={{ color: currentTheme.string }}>Feature engineering</span> for patient demographic optimization</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            📊 Statistical Modeling & Visualization
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.cursor }}>Interactive dashboards</span> for real-time clinical monitoring</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Comprehensive visualization</span> of treatment correlations</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Treatment protocol optimization</span> algorithms</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>FDA regulatory database</span> integration planning</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            ⚡ Technical Infrastructure
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.comment }}>Python 3.8+</span> with advanced data science libraries</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Machine learning frameworks</span> for scalable model deployment</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Statistical analysis tools</span> for robust clinical insights</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Federated learning architecture</span> for multi-site collaboration</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Python
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Machine Learning
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Clinical Analytics
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Bayesian Analysis
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Data Science
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Survival Analysis
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Project 3: Risk Calculation Data */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="border-l-2 pl-4"
                style={{ borderColor: currentTheme.cursor }}
              >
                <div className="mb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold" style={{ color: currentTheme.variable }}>
                      Risk Calculation Data
                    </h3>
                    <span className="px-2 py-1 text-xs rounded flex items-center gap-1" style={{
                      backgroundColor: currentTheme.cursor,
                      color: currentTheme.terminalBg,
                      fontWeight: '500'
                    }}>
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{
                        backgroundColor: currentTheme.terminalBg
                      }}></span>
                      Active Development
                    </span>
                  </div>
                  <div className="mb-2">
                    <span style={{ color: currentTheme.keyword }}>Repository:</span>{' '}
                    <a
                      href="https://github.com/benuh/risk-calculation-data"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline transition-colors"
                      style={{ color: currentTheme.string }}
                    >
                      github.com/benuh/risk-calculation-data
                    </a>
                  </div>
                  <div className="mb-3" style={{ color: currentTheme.textSecondary, lineHeight: '1.5' }}>
                    Financial risk calculation engine for portfolio management at Vantage Risk. Implements Monte Carlo simulations
                    for Value-at-Risk calculations, correlation matrix analysis, and stress testing scenarios. Optimized for sub-2-second
                    response times using Node.js with custom C++ modules for computationally intensive statistical operations.
                  </div>

                  <button
                    onClick={() => setExpandedProject(expandedProject === 'riskdata' ? null : 'riskdata')}
                    className="mb-3 text-xs hover:underline transition-colors flex items-center gap-1"
                    style={{ color: currentTheme.command }}
                  >
                    <span>{expandedProject === 'riskdata' ? '▼' : '▶'}</span>
                    {expandedProject === 'riskdata' ? 'Hide Financial Details' : 'Show Risk Analytics Stack'}
                  </button>

                  {expandedProject === 'riskdata' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 p-3 rounded"
                      style={{
                        backgroundColor: currentTheme.terminalHeader,
                        border: `1px solid ${currentTheme.terminalBorder}`,
                        fontSize: '11px',
                        lineHeight: '1.4'
                      }}
                    >
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            📊 Financial Risk Modeling
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.keyword }}>Value at Risk (VaR)</span> calculations with Monte Carlo simulation</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Beta coefficient analysis</span> for systematic risk assessment</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Sharpe ratio optimization</span> for risk-adjusted return analysis</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Portfolio volatility modeling</span> with correlation matrix computation</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🔄 Real-Time Data Integration
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.string }}>Financial Modeling Prep API</span> for live market data</li>
                            <li>• <span style={{ color: currentTheme.string }}>Quandl API integration</span> for economic indicators</li>
                            <li>• <span style={{ color: currentTheme.string }}>Multi-symbol data processing</span> with concurrent API requests</li>
                            <li>• <span style={{ color: currentTheme.string }}>ESG scoring integration</span> for sustainable investment analysis</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            📈 Statistical Analysis & Algorithms
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.cursor }}>Time series analysis</span> for trend identification and forecasting</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Correlation analysis</span> for portfolio diversification optimization</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Statistical volatility models</span> including GARCH implementations</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Risk attribution analysis</span> for factor-based portfolio decomposition</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            ⚡ Technical Implementation
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.comment }}>Node.js backend</span> with modular architecture design</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Asynchronous data processing</span> for high-throughput calculations</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Configuration-driven</span> risk parameter management</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Extensible framework</span> for custom risk metric implementation</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Node.js
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Financial Modeling
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Risk Analytics
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      API Integration
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Quantitative Finance
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Statistical Modeling
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Project 4: LitLMC */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="border-l-2 pl-4"
                style={{ borderColor: currentTheme.comment }}
              >
                <div className="mb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold" style={{ color: currentTheme.variable }}>
                      LitLMC
                    </h3>
                    <span className="px-2 py-1 text-xs rounded flex items-center gap-1" style={{
                      backgroundColor: currentTheme.cursor,
                      color: currentTheme.terminalBg,
                      fontWeight: '500'
                    }}>
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{
                        backgroundColor: currentTheme.terminalBg
                      }}></span>
                      Complete
                    </span>
                  </div>
                  <div className="mb-2">
                    <span style={{ color: currentTheme.keyword }}>Repository:</span>{' '}
                    <a
                      href="https://github.com/benuh/LitLMC"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline transition-colors"
                      style={{ color: currentTheme.string }}
                    >
                      github.com/benuh/LitLMC
                    </a>
                  </div>
                  <div className="mb-3" style={{ color: currentTheme.textSecondary, lineHeight: '1.5' }}>
                    Educational transformer implementation built from first principles in PyTorch. Implements multi-head attention,
                    learned positional embeddings, and GELU activation with layer normalization. Small-scale (~87K parameters) but
                    demonstrates deep understanding of transformer architecture beyond API consumption. Includes training pipeline
                    with W&B monitoring and deployment infrastructure.
                  </div>

                  <button
                    onClick={() => setExpandedProject(expandedProject === 'litlmc' ? null : 'litlmc')}
                    className="mb-3 text-xs hover:underline transition-colors flex items-center gap-1"
                    style={{ color: currentTheme.command }}
                  >
                    <span>{expandedProject === 'litlmc' ? '▼' : '▶'}</span>
                    {expandedProject === 'litlmc' ? 'Hide Implementation Details' : 'Show C++ Architecture'}
                  </button>

                  {expandedProject === 'litlmc' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 p-3 rounded"
                      style={{
                        backgroundColor: currentTheme.terminalHeader,
                        border: `1px solid ${currentTheme.terminalBorder}`,
                        fontSize: '11px',
                        lineHeight: '1.4'
                      }}
                    >
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🏗️ Core Architecture
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.keyword }}>Multi-head attention</span> with causal masking</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Learned position embeddings</span> for sequence understanding</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>GELU activation</span> functions with layer normalization</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Modular transformer blocks</span> (~87K parameters, 4 layers)</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🔄 Training Pipeline
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.string }}>AdamW optimizer</span> with linear warmup scheduling</li>
                            <li>• <span style={{ color: currentTheme.string }}>Automatic checkpointing</span> and validation tracking</li>
                            <li>• <span style={{ color: currentTheme.string }}>Cross-entropy loss</span> for next-token prediction</li>
                            <li>• <span style={{ color: currentTheme.string }}>Real-time monitoring</span> with Weights & Biases integration</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🚀 Deployment Stack
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.cursor }}>React frontend</span> with interactive parameter controls</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>REST API server</span> for model inference</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Docker containerization</span> with Kubernetes orchestration</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>YAML-based configuration</span> management</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🎯 Key Features
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.comment }}>Temperature & top-k sampling</span> for controlled generation</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Configurable context window</span> management</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Device-agnostic deployment</span> (GPU/MPS/CPU)</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Interactive chat interface</span> with real-time inference</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      PyTorch
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Transformers
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      React
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      REST API
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Docker
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      W&B
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Kubernetes
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      YAML
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Project 4: FPGA Game Engine */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="border-l-2 pl-4"
                style={{ borderColor: currentTheme.comment }}
              >
                <div className="mb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold" style={{ color: currentTheme.variable }}>
                      FPGA Game Engine
                    </h3>
                    <span className="px-2 py-1 text-xs rounded flex items-center gap-1" style={{
                      backgroundColor: currentTheme.cursor,
                      color: currentTheme.terminalBg,
                      fontWeight: '500'
                    }}>
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{
                        backgroundColor: currentTheme.terminalBg
                      }}></span>
                      Complete
                    </span>
                  </div>
                  <div className="mb-2">
                    <span style={{ color: currentTheme.keyword }}>Repository:</span>{' '}
                    <a
                      href="https://github.com/benuh/FPGA-Game-Engine"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline transition-colors"
                      style={{ color: currentTheme.string }}
                    >
                      github.com/benuh/FPGA-Game-Engine
                    </a>
                  </div>
                  <div className="mb-3" style={{ color: currentTheme.textSecondary, lineHeight: '1.5' }}>
                    Complete game engine implemented in Verilog HDL for FPGA deployment. Features custom audio synthesis, VGA graphics
                    rendering, collision detection, and procedural map generation. Demonstrates hardware-software co-design with multiple
                    parallel subsystems coordinated through finite state machines. Successfully deployed on Nexys 4 DDR with responsive
                    real-time gameplay.
                  </div>

                  <button
                    onClick={() => setExpandedProject(expandedProject === 'fpga-game' ? null : 'fpga-game')}
                    className="mb-3 text-xs hover:underline transition-colors flex items-center gap-1"
                    style={{ color: currentTheme.command }}
                  >
                    <span>{expandedProject === 'fpga-game' ? '▼' : '▶'}</span>
                    {expandedProject === 'fpga-game' ? 'Hide Hardware Details' : 'Show FPGA Architecture'}
                  </button>

                  {expandedProject === 'fpga-game' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 p-3 rounded"
                      style={{
                        backgroundColor: currentTheme.terminalHeader,
                        border: `1px solid ${currentTheme.terminalBorder}`,
                        fontSize: '11px',
                        lineHeight: '1.4'
                      }}
                    >
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🔧 Computer Engineering Design
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.keyword }}>Microcontroller principles</span> applied to FPGA architecture</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Hardware-software co-design</span> methodology</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Digital system integration</span> across multiple subsystems</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Real-time embedded processing</span> constraints and optimization</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🏗️ Verilog Engine Architecture
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.string }}>Audio Engine</span> - Custom sound synthesis and playback</li>
                            <li>• <span style={{ color: currentTheme.string }}>Display Engine</span> - Real-time graphics rendering and scanning</li>
                            <li>• <span style={{ color: currentTheme.string }}>Physics Engine</span> - Collision detection and game mechanics</li>
                            <li>• <span style={{ color: currentTheme.string }}>Map Generator</span> - Dynamic level creation and management</li>
                            <li>• <span style={{ color: currentTheme.string }}>Score Engine</span> - Game state tracking and scoring system</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🎮 Game Features
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.cursor }}>Interactive gameplay</span> with responsive controls</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Digital audio output</span> with custom sound effects</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Real-time graphics</span> on VGA display interface</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Addictive arcade mechanics</span> with scoring system</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            💻 Microcontroller & Digital Systems
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.comment }}>Low-level hardware programming</span> in Verilog HDL</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Finite state machine design</span> for embedded control logic</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Clock domain crossing</span> and timing constraint management</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Memory-mapped I/O</span> and peripheral interface design</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Interrupt handling</span> and real-time response systems</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Computer Engineering
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Microcontroller
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Verilog HDL
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      FPGA
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Digital Systems
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Embedded Hardware
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Project 5: Unicorn-Explosion */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="border-l-2 pl-4"
                style={{ borderColor: currentTheme.string }}
              >
                <div className="mb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold" style={{ color: currentTheme.variable }}>
                      Unicorn-Explosion
                    </h3>
                    <span className="px-2 py-1 text-xs rounded flex items-center gap-1" style={{
                      backgroundColor: currentTheme.cursor,
                      color: currentTheme.terminalBg,
                      fontWeight: '500'
                    }}>
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{
                        backgroundColor: currentTheme.terminalBg
                      }}></span>
                      Complete
                    </span>
                  </div>
                  <div className="mb-2">
                    <span style={{ color: currentTheme.keyword }}>Repository:</span>{' '}
                    <a
                      href="https://github.com/benuh/Unicorn-Explosion"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline transition-colors"
                      style={{ color: currentTheme.string }}
                    >
                      github.com/benuh/Unicorn-Explosion
                    </a>
                  </div>
                  <div className="mb-3" style={{ color: currentTheme.textSecondary, lineHeight: '1.5' }}>
                    Whimsical arcade shooter implemented entirely in Verilog HDL on Nexys 4 DDR FPGA. Features complete VGA graphics
                    pipeline, custom sound synthesis, collision detection algorithms, and real-time user interaction. Demonstrates
                    low-level digital system design with careful attention to timing constraints and clock domain management across
                    multiple concurrent hardware modules.
                  </div>

                  <button
                    onClick={() => setExpandedProject(expandedProject === 'unicorn' ? null : 'unicorn')}
                    className="mb-3 text-xs hover:underline transition-colors flex items-center gap-1"
                    style={{ color: currentTheme.command }}
                  >
                    <span>{expandedProject === 'unicorn' ? '▼' : '▶'}</span>
                    {expandedProject === 'unicorn' ? 'Hide Technical Details' : 'Show FPGA Architecture'}
                  </button>

                  {expandedProject === 'unicorn' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 p-3 rounded"
                      style={{
                        backgroundColor: currentTheme.terminalHeader,
                        border: `1px solid ${currentTheme.terminalBorder}`,
                        fontSize: '11px',
                        lineHeight: '1.4'
                      }}
                    >
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🔧 Computer Engineering Design
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.keyword }}>Microcontroller principles</span> applied to FPGA architecture</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Hardware-software co-design</span> methodology</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Digital system integration</span> across multiple subsystems</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Real-time embedded processing</span> constraints and optimization</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🏗️ Verilog Engine Architecture
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.string }}>Audio Engine</span> - Custom sound synthesis and playback</li>
                            <li>• <span style={{ color: currentTheme.string }}>Display Engine</span> - Real-time graphics rendering and scanning</li>
                            <li>• <span style={{ color: currentTheme.string }}>Physics Engine</span> - Collision detection and game mechanics</li>
                            <li>• <span style={{ color: currentTheme.string }}>Map Generator</span> - Dynamic level creation and management</li>
                            <li>• <span style={{ color: currentTheme.string }}>Score Engine</span> - Game state tracking and scoring system</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🎮 Game Features
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.cursor }}>Interactive gameplay</span> with responsive controls</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Digital audio output</span> with custom sound effects</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Real-time graphics</span> on VGA display interface</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Addictive arcade mechanics</span> with scoring system</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            💻 Microcontroller & Digital Systems
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.comment }}>Low-level hardware programming</span> in Verilog HDL</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Finite state machine design</span> for embedded control logic</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Clock domain crossing</span> and timing constraint management</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Memory-mapped I/O</span> and peripheral interface design</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Interrupt handling</span> and real-time response systems</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Computer Engineering
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Microcontroller
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Verilog HDL
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      FPGA
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Digital Systems
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Embedded Hardware
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Project 6: threeJSPortfolio */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="border-l-2 pl-4"
                style={{ borderColor: currentTheme.variable }}
              >
                <div className="mb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold" style={{ color: currentTheme.variable }}>
                      threeJSPortfolio
                    </h3>
                    <span className="px-2 py-1 text-xs rounded flex items-center gap-1" style={{
                      backgroundColor: currentTheme.keyword,
                      color: currentTheme.terminalBg,
                      fontWeight: '500'
                    }}>
                      🎮 Complete
                    </span>
                  </div>
                  <div className="mb-2">
                    <span style={{ color: currentTheme.keyword }}>Repository:</span>{' '}
                    <a
                      href="https://github.com/benuh/threeJSPortfolio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline transition-colors"
                      style={{ color: currentTheme.string }}
                    >
                      github.com/benuh/threeJSPortfolio
                    </a>
                  </div>
                  <div className="mb-3" style={{ color: currentTheme.textSecondary, lineHeight: '1.5' }}>
                    3D interactive portfolio exploring CAD modeling principles and Three.js graphics programming.
                    Educational project focused on learning 3D web graphics, interactive design patterns,
                    and immersive user experiences. Demonstrates modern web development with JavaScript,
                    3D scene management, and interactive visualization techniques.
                  </div>

                  <button
                    onClick={() => setExpandedProject(expandedProject === 'threejs' ? null : 'threejs')}
                    className="mb-3 text-xs hover:underline transition-colors flex items-center gap-1"
                    style={{ color: currentTheme.command }}
                  >
                    <span>{expandedProject === 'threejs' ? '▼' : '▶'}</span>
                    {expandedProject === 'threejs' ? 'Hide Learning Details' : 'Show 3D Graphics Stack'}
                  </button>

                  {expandedProject === 'threejs' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 p-3 rounded"
                      style={{
                        backgroundColor: currentTheme.terminalHeader,
                        border: `1px solid ${currentTheme.terminalBorder}`,
                        fontSize: '11px',
                        lineHeight: '1.4'
                      }}
                    >
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🎨 3D Graphics & CAD Modeling
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.keyword }}>Three.js 3D rendering</span> with WebGL backend</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>CAD modeling principles</span> applied to web graphics</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Scene composition</span> and 3D object management</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Interactive visualization</span> and user experience design</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            💻 Web Development Stack
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.string }}>Modern JavaScript ES6+</span> for interactive functionality</li>
                            <li>• <span style={{ color: currentTheme.string }}>HTML5 Canvas</span> and WebGL integration</li>
                            <li>• <span style={{ color: currentTheme.string }}>CSS animations</span> and responsive design</li>
                            <li>• <span style={{ color: currentTheme.string }}>Build tooling</span> with modern web development practices</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🎯 Learning Objectives
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.cursor }}>3D graphics programming</span> fundamentals</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Interactive design patterns</span> for web applications</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Performance optimization</span> for 3D web experiences</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Creative coding</span> and visual storytelling</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Three.js
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      WebGL
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      JavaScript
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      3D Graphics
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      CAD Modeling
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Interactive Design
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Project 7: OpenGL Ray Tracing */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="border-l-2 pl-4"
                style={{ borderColor: currentTheme.error }}
              >
                <div className="mb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold" style={{ color: currentTheme.variable }}>
                      OpenGL Ray Tracer
                    </h3>
                    <span className="px-2 py-1 text-xs rounded flex items-center gap-1" style={{
                      backgroundColor: currentTheme.keyword,
                      color: currentTheme.terminalBg,
                      fontWeight: '500'
                    }}>
                      🎮 Complete
                    </span>
                  </div>
                  <div className="mb-3" style={{ color: currentTheme.textSecondary, lineHeight: '1.5' }}>
                    Advanced C++ ray tracing engine implementing modern rendering techniques and physically-based algorithms.
                    Features bidirectional path tracing, volumetric scattering, subsurface scattering, and spectral rendering.
                    Implements sophisticated algorithms including importance sampling, Russian roulette termination, multiple importance sampling,
                    and optimized acceleration structures with custom SIMD vectorization for high-performance rendering.
                  </div>

                  <button
                    onClick={() => setExpandedProject(expandedProject === 'raytracer' ? null : 'raytracer')}
                    className="mb-3 text-xs hover:underline transition-colors flex items-center gap-1"
                    style={{ color: currentTheme.command }}
                  >
                    <span>{expandedProject === 'raytracer' ? '▼' : '▶'}</span>
                    {expandedProject === 'raytracer' ? 'Hide Graphics Details' : 'Show Ray Tracing Architecture'}
                  </button>

                  {expandedProject === 'raytracer' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 p-3 rounded"
                      style={{
                        backgroundColor: currentTheme.terminalHeader,
                        border: `1px solid ${currentTheme.terminalBorder}`,
                        fontSize: '11px',
                        lineHeight: '1.4'
                      }}
                    >
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🧮 Advanced Mathematical Foundations & Algorithms
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.keyword }}>Quaternion mathematics</span> for robust 3D rotations and camera transformations</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Spectral power distribution</span> calculations for wavelength-dependent rendering</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Stochastic sampling theory</span> with low-discrepancy sequences (Halton, Sobol)</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Probability density functions</span> for importance sampling and BRDF evaluation</li>
                            <li>• <span style={{ color: currentTheme.keyword }}>Fourier analysis</span> for procedural texture synthesis and filtering</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            💡 Advanced Rendering & Light Transport Theory
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.string }}>Bidirectional path tracing</span> with multiple importance sampling for unbiased rendering</li>
                            <li>• <span style={{ color: currentTheme.string }}>Metropolis light transport</span> for complex caustic and indirect illumination</li>
                            <li>• <span style={{ color: currentTheme.string }}>Microfacet BRDF models</span> (Cook-Torrance, GGX/Trowbridge-Reitz distribution)</li>
                            <li>• <span style={{ color: currentTheme.string }}>Volumetric scattering</span> with phase functions and participating media simulation</li>
                            <li>• <span style={{ color: currentTheme.string }}>Subsurface scattering</span> using dipole approximation and BSSRDF evaluation</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            🎨 Advanced Scene Architecture & Materials
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.cursor }}>Constructive solid geometry</span> (CSG) with boolean operations on implicit surfaces</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Procedural material networks</span> with node-based shader composition</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Displacement mapping</span> and tessellation for micro-geometry detail</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Adaptive mesh refinement</span> for dynamic level-of-detail rendering</li>
                            <li>• <span style={{ color: currentTheme.cursor }}>Instanced geometry</span> with transform hierarchies and motion blur support</li>
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2" style={{ color: currentTheme.variable }}>
                            ⚡ High-Performance Computing & Architecture
                          </h4>
                          <ul className="space-y-1 pl-4" style={{ color: currentTheme.textSecondary }}>
                            <li>• <span style={{ color: currentTheme.comment }}>Custom SIMD kernels</span> (AVX2/AVX-512) for vectorized ray-triangle intersection</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Lock-free data structures</span> for multi-threaded tile-based rendering</li>
                            <li>• <span style={{ color: currentTheme.comment }}>NUMA-aware memory allocation</span> with custom allocators for cache optimization</li>
                            <li>• <span style={{ color: currentTheme.comment }}>Branch prediction optimization</span> and instruction-level parallelism techniques</li>
                            <li>• <span style={{ color: currentTheme.comment }}>GPU compute shaders</span> for hybrid CPU/GPU acceleration with CUDA interop</li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      C++
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Path Tracing
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      SIMD/AVX
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      BRDF/BSSRDF
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Metropolis Sampling
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Spectral Rendering
                    </span>
                    <span className="px-2 py-1 text-xs rounded" style={{
                      backgroundColor: currentTheme.terminalHeader,
                      color: currentTheme.command,
                      border: `1px solid ${currentTheme.terminalBorder}`
                    }}>
                      Volumetric Media
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="mt-6"
                style={{ color: currentTheme.textMuted }}
              >
                <div className="mb-2">
                  <span style={{ color: currentTheme.comment }}>{'//'}</span> More projects coming soon...
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.1 }}
                className="mt-6"
                style={{ color: currentTheme.cursor }}
              >
                <span className="animate-pulse">▊</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}